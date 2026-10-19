# CHARKUMA — Mejorar una figura ya hecha en Blender (script Python / bpy)
#
# A diferencia de charkuma_figuras.py, este script NO BORRA NADA: trabaja
# sobre la escena que tengas abierta y solo añade cosas encima.
#
#   1) Sombreado suave por ángulo en todas las mallas (adiós a las facetas,
#      pero las aristas marcadas de verdad siguen marcadas).
#   2) Un bisel pequeño en cada pieza (modificador "Bisel_CK"), para que los
#      bordes cojan brillo en vez de verse como cortes de cartón.
#   3) Iluminación de estudio de tres luces (principal, relleno naranja y
#      contraluz morada) alrededor de la figura, mirando desde la cámara.
#   4) Fondo oscuro y render con EEVEE + AgX, listo para pulsar F12.
#
# Uso: pestaña Scripting → Open → este archivo → ▶ (Run Script).
# Si no te gusta, Ctrl+Z lo deshace. Si lo ejecutas otra vez, sustituye las
# luces y biseles anteriores en vez de duplicarlos.
#
# Probado con Blender 5.2.

import math

import bpy
from mathutils import Vector

# ---------------------------------------------------------------- opciones
BISEL = 0.03            # tamaño del bisel, en proporción a cada pieza (0 = sin bisel)
ANGULO_SUAVE = 35       # aristas con más ángulo que esto siguen viéndose marcadas
LUCES = True            # añadir la iluminación de tres luces
APAGAR_OTRAS_LUCES = True  # ocultar (no borrar) las luces que ya hubiera
FONDO = "#120d1f"       # color del fondo ("" = no tocarlo)
MOTOR = "EEVEE"         # "EEVEE" (rápido) o "CYCLES" (más realista, más lento)

PREFIJO = "CK_"         # todo lo que añade el script empieza por esto


def hex_a_lineal(hex_color):
    h = hex_color.lstrip("#")
    rgb = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]


def mallas_visibles():
    return [o for o in bpy.context.scene.objects
            if o.type == "MESH" and o.visible_get() and not o.name.startswith(PREFIJO)]


def caja_envolvente(objetos):
    puntos = [o.matrix_world @ Vector(c) for o in objetos for c in o.bound_box]
    minimo = Vector(min(p[i] for p in puntos) for i in range(3))
    maximo = Vector(max(p[i] for p in puntos) for i in range(3))
    return minimo, maximo


NOMBRES_SUELO = ("ground", "floor", "suelo", "plane", "plano", "fondo", "backdrop")


def es_suelo(obj):
    """Suelos y fondos (planos finos o con nombre de suelo) no son la figura."""
    d = sorted(obj.dimensions)
    plano = d[2] > 0 and d[0] < d[2] * 0.01
    return plano or any(n in obj.name.lower() for n in NOMBRES_SUELO)


def suavizar(objetos):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objetos:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objetos[0]
    try:
        bpy.ops.object.shade_smooth_by_angle(angle=math.radians(ANGULO_SUAVE))
    except (AttributeError, RuntimeError):
        bpy.ops.object.shade_smooth()


def biselar(objetos):
    for o in objetos:
        anterior = o.modifiers.get(f"{PREFIJO}Bisel")
        if anterior:
            o.modifiers.remove(anterior)
        if BISEL <= 0 or len(o.data.polygons) > 20000:
            continue  # piezas muy detalladas (esculpidas) no lo necesitan
        lado = min(d for d in o.dimensions if d > 0) if any(o.dimensions) else 0
        if lado == 0:
            continue
        mod = o.modifiers.new(f"{PREFIJO}Bisel", "BEVEL")
        mod.width = lado * BISEL / max(o.scale)  # el bisel va en coordenadas locales
        mod.segments = 3
        mod.limit_method = "ANGLE"
        mod.angle_limit = math.radians(ANGULO_SUAVE)
        mod.harden_normals = True
        # Si la pieza ya tiene un "Smooth by Angle" (modificador de nodos),
        # el bisel va justo antes para que el suavizado lo tenga en cuenta.
        nodos = [i for i, m in enumerate(o.modifiers) if m.type == "NODES"]
        if nodos:
            o.modifiers.move(len(o.modifiers) - 1, nodos[0])


def iluminar(centro, tam):
    scene = bpy.context.scene
    for obj in [o for o in scene.objects if o.name.startswith(f"{PREFIJO}Luz")]:
        bpy.data.objects.remove(obj)

    objetivo = bpy.data.objects.get(f"{PREFIJO}Objetivo")
    if objetivo is None:
        objetivo = bpy.data.objects.new(f"{PREFIJO}Objetivo", None)
        scene.collection.objects.link(objetivo)
    objetivo.location = centro

    # Dirección desde la figura hacia la cámara (o hacia -Y si no hay cámara)
    if scene.camera:
        hacia_cam = scene.camera.matrix_world.translation - centro
        hacia_cam.z = 0
    else:
        hacia_cam = Vector((0, -1, 0))
    hacia_cam = hacia_cam.normalized() if hacia_cam.length else Vector((0, -1, 0))

    def girado(v, grados):
        a = math.radians(grados)
        return Vector((v.x * math.cos(a) - v.y * math.sin(a),
                       v.x * math.sin(a) + v.y * math.cos(a), 0))

    dist = tam * 2.2
    luces = [  # nombre, giro respecto a la cámara, altura, potencia, color
        ("Principal", 40, 1.0, 600, "#fff4e8"),
        ("Relleno", -60, 0.3, 200, "#ff9d3d"),
        ("Contra", 180, 1.1, 900, "#8b5cf6"),
    ]
    if APAGAR_OTRAS_LUCES:
        for obj in scene.objects:
            if obj.type == "LIGHT" and not obj.name.startswith(PREFIJO):
                obj.hide_render = True
                obj.hide_viewport = True

    for nombre, giro, altura, potencia, color in luces:
        data = bpy.data.lights.new(f"{PREFIJO}Luz_{nombre}", "AREA")
        data.size = tam
        data.energy = potencia * (dist / 4.4) ** 2  # misma luz a cualquier escala
        data.color = hex_a_lineal(color)
        obj = bpy.data.objects.new(f"{PREFIJO}Luz_{nombre}", data)
        obj.location = centro + girado(hacia_cam, giro) * dist + Vector((0, 0, tam * altura * 1.5))
        scene.collection.objects.link(obj)
        seguir = obj.constraints.new("TRACK_TO")
        seguir.target = objetivo


def ajustar_render():
    scene = bpy.context.scene
    if MOTOR == "CYCLES":
        scene.render.engine = "CYCLES"
        scene.cycles.samples = 128
        scene.cycles.use_denoising = True
    else:
        motores = {i.identifier for i in
                   bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items}
        scene.render.engine = "BLENDER_EEVEE" if "BLENDER_EEVEE" in motores \
            else "BLENDER_EEVEE_NEXT"
        if hasattr(scene.eevee, "use_raytracing"):
            scene.eevee.use_raytracing = True
        if hasattr(scene.eevee, "use_shadows"):
            scene.eevee.use_shadows = True
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"

    if FONDO:
        if scene.world is None:
            scene.world = bpy.data.worlds.new("Mundo")
        if not scene.world.use_nodes:
            scene.world.use_nodes = True
        fondo = scene.world.node_tree.nodes.get("Background")
        if fondo:
            fondo.inputs["Color"].default_value = (*hex_a_lineal(FONDO), 1)
            fondo.inputs["Strength"].default_value = 0.5


def main():
    if bpy.context.object and bpy.context.object.mode != "OBJECT":
        bpy.ops.object.mode_set(mode="OBJECT")
    mallas = mallas_visibles()
    if not mallas:
        raise SystemExit("No hay ninguna malla visible en la escena.")

    figura = [o for o in mallas if not es_suelo(o)] or mallas
    minimo, maximo = caja_envolvente(figura)
    centro = (minimo + maximo) / 2
    tam = max(maximo - minimo)

    suavizar(figura)
    biselar(figura)
    if LUCES:
        iluminar(centro, tam)
    ajustar_render()

    for ventana in bpy.context.window_manager.windows:
        for area in ventana.screen.areas:
            if area.type == "VIEW_3D":
                area.spaces.active.shading.type = "RENDERED"

    print(f"Figura mejorada: {len(figura)} piezas suavizadas"
          f"{' y biseladas' if BISEL > 0 else ''}"
          f"{', 3 luces añadidas' if LUCES else ''}. Pulsa F12 para el render.")


if __name__ == "__main__":
    main()
