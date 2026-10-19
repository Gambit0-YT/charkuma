# CHARKUMA — Figuras 3D en Blender (script Python / bpy)
#
# Genera figuras 3D listas para renderizar y para imprimir en 3D:
#   - "mascota": la mascota lagarto de CHARKUMA sobre una peana con el nombre
#     (idea de Hecho a Mano "Figura impresa en 3D de mascota").
#   - "mando":   un mando retro estilo NES (idea "Cojín tufting de un mando retro").
#   - "trofeo":  un trofeo de Retro 365 con el "365" en el frontal.
#   - "todas":   las tres, una al lado de otra.
#
# Probado con Blender 5.2. Dos formas de usarlo:
#
#   1) Dentro de Blender: pestaña "Scripting" → Abrir este archivo → cambiar
#      las opciones de abajo (FIGURA, STL, RENDER…) → botón ▶ "Run Script".
#
#   2) Desde la terminal, sin abrir la interfaz:
#        blender --background --python blender/charkuma_figuras.py -- \
#            --figura mascota --stl mascota.stl --render mascota.png
#      Opciones tras "--": --figura, --stl, --render, --altura-mm,
#      --muestras, --resolucion, --blend (guardar el .blend).
#
# El script BORRA la escena actual antes de crear la figura.
#
# Para impresión 3D: al exportar a STL se duplican las piezas, se convierten
# a malla, se unen y se pasa un "voxel remesh" para obtener UNA sola malla
# cerrada (manifold), escalada para que mida ALTURA_MM de alto. Los colores
# se quedan solo en la versión de render; la figura impresa se pinta a mano.

import math
import sys

import bpy
import bmesh  # después de bpy (necesario con el módulo bpy de pip)
from mathutils import Euler, Vector

# ---------------------------------------------------------------- opciones
FIGURA = "mascota"   # "mascota", "mando", "trofeo" o "todas"
STL = ""             # ruta del .stl a exportar ("" = no exportar)
RENDER = ""          # ruta del .png a renderizar ("" = no renderizar)
BLEND = ""           # ruta del .blend a guardar ("" = no guardar)
ALTURA_MM = 80.0     # altura final de la pieza impresa, en mm
MUESTRAS = 64        # muestras de Cycles para el render
RESOLUCION = 1080    # render cuadrado RESOLUCION x RESOLUCION
VOXEL = 0.008        # tamaño de vóxel del remesh (más pequeño = más detalle)

# Paleta de la marca (los mismos colores que el logo de la web).
COLORES = {
    "naranja": "#ff7a18",
    "morado": "#8b5cf6",
    "crema": "#ffd29a",
    "fondo": "#09070f",
    "peana": "#1c1530",
    "blanco": "#f7f4ff",
    "negro": "#0b0b10",
    "rosa": "#ff8fb1",
    "gris": "#b9b4c4",
    "gris_oscuro": "#3a3644",
    "rojo": "#e2333b",
    "oro": "#ffb627",
}


# ---------------------------------------------------------------- utilidades
def hex_a_lineal(hex_color):
    """'#rrggbb' (sRGB) -> RGBA lineal, que es lo que espera Blender."""
    h = hex_color.lstrip("#")
    rgb = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    return (*lin, 1.0)


_materiales = {}


def material(nombre, rugosidad=0.45, metal=0.0):
    clave = (nombre, rugosidad, metal)
    if clave in _materiales:
        return _materiales[clave]
    mat = bpy.data.materials.new(f"CK_{nombre}")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = hex_a_lineal(COLORES[nombre])
    bsdf.inputs["Roughness"].default_value = rugosidad
    bsdf.inputs["Metallic"].default_value = metal
    mat.diffuse_color = hex_a_lineal(COLORES[nombre])  # color en vista sólida
    _materiales[clave] = mat
    return mat


def _preparar(obj, nombre, color, coleccion, suave=True, **mat_kw):
    obj.name = nombre
    if color:
        obj.data.materials.append(material(color, **mat_kw))
    if suave and obj.type == "MESH":
        for p in obj.data.polygons:
            p.use_smooth = True
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    coleccion.objects.link(obj)
    return obj


def esfera(nombre, coleccion, pos, escala=(1, 1, 1), radio=1.0, color="naranja",
           rot=(0, 0, 0), **mat_kw):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=radio,
                                         location=pos, rotation=rot)
    obj = bpy.context.active_object
    obj.scale = escala
    return _preparar(obj, nombre, color, coleccion, **mat_kw)


def cilindro(nombre, coleccion, pos, radio, alto, color, rot=(0, 0, 0),
             biselar=0.0, vertices=64, **mat_kw):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radio, depth=alto,
                                        location=pos, rotation=rot)
    obj = _preparar(bpy.context.active_object, nombre, color, coleccion, **mat_kw)
    if biselar:
        _biselar(obj, biselar)
    return obj


def cono(nombre, coleccion, pos, r1, r2, alto, color, rot=(0, 0, 0), **mat_kw):
    bpy.ops.mesh.primitive_cone_add(vertices=48, radius1=r1, radius2=r2, depth=alto,
                                    location=pos, rotation=rot)
    return _preparar(bpy.context.active_object, nombre, color, coleccion, **mat_kw)


def caja(nombre, coleccion, pos, medidas, color, biselar=0.0, rot=(0, 0, 0), **mat_kw):
    bpy.ops.mesh.primitive_cube_add(size=1, location=pos, rotation=rot)
    obj = bpy.context.active_object
    obj.scale = medidas
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj = _preparar(obj, nombre, color, coleccion, **mat_kw)
    if biselar:
        _biselar(obj, biselar)
    return obj


def toroide(nombre, coleccion, pos, r_mayor, r_menor, color, rot=(0, 0, 0), **mat_kw):
    bpy.ops.mesh.primitive_torus_add(major_radius=r_mayor, minor_radius=r_menor,
                                     major_segments=64, minor_segments=24,
                                     location=pos, rotation=rot)
    return _preparar(bpy.context.active_object, nombre, color, coleccion, **mat_kw)


def texto(nombre, coleccion, cuerpo, pos, tam, grosor, color, rot=(0, 0, 0)):
    bpy.ops.object.text_add(location=pos, rotation=rot)
    obj = bpy.context.active_object
    obj.data.body = cuerpo
    obj.data.size = tam
    obj.data.extrude = grosor / 2
    obj.data.align_x = "CENTER"
    obj.data.align_y = "CENTER"
    obj.data.bevel_depth = grosor * 0.15
    return _preparar(obj, nombre, color, coleccion, suave=False)


def _biselar(obj, ancho):
    mod = obj.modifiers.new("Bisel", "BEVEL")
    mod.width = ancho
    mod.segments = 4
    mod.limit_method = "ANGLE"


def nueva_coleccion(nombre):
    col = bpy.data.collections.new(nombre)
    bpy.context.scene.collection.children.link(col)
    return col


def mover_coleccion(col, desplazamiento):
    for obj in col.objects:
        if obj.parent is None:
            obj.location += Vector(desplazamiento)


# ---------------------------------------------------------------- figuras
def crear_mascota(col):
    """Mascota lagarto chibi de CHARKUMA sobre peana con el nombre. Alto ≈ 1.2."""
    # Peana
    cilindro("Peana", col, (0, 0, 0.06), 0.6, 0.12, "peana", biselar=0.02,
             rugosidad=0.3)
    texto("Nombre", col, "CHARKUMA", (0, -0.4, 0.125), 0.11, 0.02, "naranja")

    # Patas, cuerpo y barriga
    for lado in (-1, 1):
        esfera(f"Pata_{'izq' if lado < 0 else 'der'}", col, (0.17 * lado, -0.1, 0.17),
               (0.12, 0.16, 0.09))
        esfera(f"Brazo_{'izq' if lado < 0 else 'der'}", col, (0.27 * lado, -0.12, 0.52),
               (0.08, 0.08, 0.15), rot=(0.3, -0.5 * lado, 0))
    esfera("Cuerpo", col, (0, 0, 0.44), (0.3, 0.28, 0.34))
    esfera("Barriga", col, (0, -0.15, 0.42), (0.21, 0.14, 0.25), color="crema")

    # Cabeza, hocico, mejillas y ojos
    esfera("Cabeza", col, (0, -0.04, 0.9), (0.34, 0.3, 0.28))
    esfera("Hocico", col, (0, -0.25, 0.83), (0.22, 0.16, 0.13))
    for lado in (-1, 1):
        s = "izq" if lado < 0 else "der"
        esfera(f"Mejilla_{s}", col, (0.21 * lado, -0.27, 0.8), (0.06, 0.03, 0.04),
               color="rosa")
        esfera(f"Ojo_{s}", col, (0.14 * lado, -0.2, 1.0), radio=0.1, color="blanco",
               rugosidad=0.15)
        esfera(f"Pupila_{s}", col, (0.15 * lado, -0.285, 1.0), radio=0.05,
               color="negro", rugosidad=0.1)
        esfera(f"Brillo_{s}", col, (0.165 * lado, -0.325, 1.025), radio=0.014,
               color="blanco", rugosidad=0.05)
    toroide("Sonrisa", col, (0, -0.37, 0.82), 0.06, 0.012, "negro",
            rot=(math.radians(70), 0, 0))

    # Cola: cadena de esferas que se curva hacia un lado, apoyada en la peana
    pasos = 14
    for i in range(pasos):
        t = i / (pasos - 1)
        r = 0.14 * (1 - 0.75 * t)
        x = 0.32 * math.sin(t * math.pi * 0.85)
        y = 0.2 + 0.32 * t - 0.12 * t * t
        z = 0.12 + r + 0.08 * (1 - t)
        esfera(f"Cola_{i:02d}", col, (x, y, z), radio=r)

    # Cresta morada: pinchos por la espalda, de la cabeza a la cola
    for i in range(7):
        a = math.radians(-35 + i * 25)       # ángulo sobre el arco de la espalda
        cy = -0.02 if i < 3 else 0.0
        cz = 0.9 if i < 3 else 0.44
        ry, rz = (0.29, 0.27) if i < 3 else (0.27, 0.32)
        if i >= 3:
            a = math.radians(20 + (i - 3) * 22)
        pos = (0, cy + ry * math.sin(a), cz + rz * math.cos(a))
        cono(f"Cresta_{i}", col, pos, 0.065, 0.0, 0.18 - 0.012 * i, "morado",
             rot=(-a, 0, 0))

    # Mando retro pequeño en las manos (guiño gamer)
    caja("Mando_mini", col, (0, -0.3, 0.5), (0.24, 0.05, 0.1), "gris_oscuro",
         biselar=0.015, rot=(math.radians(15), 0, 0))
    for dx in (0.06, 0.09):
        cilindro(f"Boton_mini_{dx}", col, (dx, -0.33, 0.51), 0.012, 0.02, "rojo",
                 rot=(math.radians(105), 0, 0))
    caja("Cruceta_mini", col, (-0.07, -0.33, 0.51), (0.05, 0.02, 0.015), "negro",
         rot=(math.radians(15), 0, 0))
    caja("Cruceta_mini_v", col, (-0.07, -0.33, 0.51), (0.015, 0.02, 0.05), "negro",
         rot=(math.radians(15), 0, 0))
    return 1.2


def crear_mando(col):
    """Mando retro estilo NES, apoyado en un atril. Alto ≈ 0.5."""
    inclinacion = Euler((math.radians(-20), 0, 0))  # recostado 20° hacia atrás
    centro = Vector((0, 0.04, 0.29))
    rot = tuple(inclinacion)
    rot_cara = (math.radians(70), 0, 0)  # botones y texto mirando al frente

    def en_mando(x, y, z):
        """Coordenadas locales del mando (x ancho, -y frente, z alto) -> escena."""
        v = Vector((x, y, z))
        v.rotate(inclinacion)
        return tuple(v + centro)

    caja("Atril", col, (0, 0.04, 0.03), (0.7, 0.36, 0.06), "peana", biselar=0.02)
    caja("Tope", col, (0, -0.07, 0.08), (0.7, 0.04, 0.06), "peana", biselar=0.01)
    caja("Respaldo", col, en_mando(0, 0.06, -0.06), (0.4, 0.05, 0.26), "peana",
         biselar=0.01, rot=rot)
    caja("Cuerpo", col, en_mando(0, 0, 0), (1.0, 0.07, 0.42), "gris", biselar=0.03,
         rot=rot)
    caja("Franja", col, en_mando(0.12, -0.036, 0), (0.62, 0.005, 0.3), "gris_oscuro",
         biselar=0.01, rot=rot)
    caja("Cruceta_h", col, en_mando(-0.33, -0.045, 0), (0.15, 0.03, 0.05), "negro",
         biselar=0.005, rot=rot)
    caja("Cruceta_v", col, en_mando(-0.33, -0.045, 0), (0.05, 0.03, 0.15), "negro",
         biselar=0.005, rot=rot)
    for i, nombre in enumerate(("Select", "Start")):
        caja(nombre, col, en_mando(-0.06 + i * 0.13, -0.045, -0.04), (0.09, 0.02, 0.025),
             "negro", biselar=0.008, rot=rot)
    for i, nombre in enumerate(("B", "A")):
        cilindro(f"Boton_{nombre}", col, en_mando(0.24 + i * 0.13, -0.045, -0.02),
                 0.045, 0.04, "rojo", rot=rot_cara, biselar=0.006)
    texto("Marca", col, "CHARKUMA", en_mando(0.12, -0.04, 0.178), 0.045, 0.008,
          "morado", rot=rot_cara)
    return 0.5


def crear_trofeo(col):
    """Trofeo de Retro 365. Alto ≈ 1.15."""
    caja("Base", col, (0, 0, 0.08), (0.5, 0.5, 0.16), "peana", biselar=0.02)
    caja("Placa", col, (0, -0.252, 0.08), (0.36, 0.01, 0.09), "oro", biselar=0.004,
         rugosidad=0.25, metal=1.0)
    texto("Texto_placa", col, "RETRO 365", (0, -0.26, 0.08), 0.05, 0.008, "fondo",
          rot=(math.pi / 2, 0, 0))
    oro = dict(rugosidad=0.2, metal=1.0)
    cilindro("Pie", col, (0, 0, 0.2), 0.16, 0.08, "oro", biselar=0.01, **oro)
    cono("Tallo", col, (0, 0, 0.36), 0.12, 0.05, 0.24, "oro", **oro)
    esfera("Nudo", col, (0, 0, 0.5), (0.09, 0.09, 0.06), color="oro", **oro)
    cono("Copa", col, (0, 0, 0.78), 0.1, 0.3, 0.5, "oro", **oro)
    toroide("Borde", col, (0, 0, 1.03), 0.29, 0.025, "oro", **oro)
    for lado in (-1, 1):
        toroide(f"Asa_{'izq' if lado < 0 else 'der'}", col, (0.3 * lado, 0, 0.82),
                0.12, 0.025, "oro", rot=(math.pi / 2, 0, 0), **oro)
    texto("Numero", col, "365", (0, -0.22, 0.8), 0.17, 0.03, "morado",
          rot=(math.radians(68), 0, 0))
    esfera("Estrella", col, (0, 0, 1.05), (0.08, 0.08, 0.02), color="naranja")
    return 1.15


FIGURAS = {"mascota": crear_mascota, "mando": crear_mando, "trofeo": crear_trofeo}


# ---------------------------------------------------------------- escena
def limpiar_escena():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    _materiales.clear()


def montar_escena(centro_z, ancho_total):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = MUESTRAS
    scene.cycles.use_denoising = True
    scene.render.resolution_y = RESOLUCION
    # Cuadrado para una figura; panorámico 16:9 para varias.
    scene.render.resolution_x = RESOLUCION if ancho_total == 0 else RESOLUCION * 16 // 9
    scene.view_settings.view_transform = "AgX"

    mundo = bpy.data.worlds.new("Mundo")
    mundo.use_nodes = True
    mundo.node_tree.nodes["Background"].inputs["Color"].default_value = \
        hex_a_lineal(COLORES["fondo"])
    mundo.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6
    scene.world = mundo

    # Suelo infinito oscuro
    bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, 0))
    suelo = bpy.context.active_object
    suelo.name = "Suelo"
    suelo.data.materials.append(material("fondo", rugosidad=0.6))

    objetivo = bpy.data.objects.new("Objetivo", None)
    objetivo.location = (0, 0, centro_z)
    scene.collection.objects.link(objetivo)

    distancia = 2.6 + ancho_total * 1.5
    cam_data = bpy.data.cameras.new("Camara")
    cam_data.lens = 60
    cam = bpy.data.objects.new("Camara", cam_data)
    cam.location = (distancia * 0.35, -distancia, centro_z + distancia * 0.35)
    scene.collection.objects.link(cam)
    seguir = cam.constraints.new("TRACK_TO")
    seguir.target = objetivo
    scene.camera = cam

    def luz(nombre, tipo, pos, energia, color="blanco", tam=2.0):
        data = bpy.data.lights.new(nombre, tipo)
        data.energy = energia
        data.color = hex_a_lineal(COLORES[color])[:3]
        if tipo == "AREA":
            data.size = tam
        obj = bpy.data.objects.new(nombre, data)
        obj.location = pos
        scene.collection.objects.link(obj)
        c = obj.constraints.new("TRACK_TO")
        c.target = objetivo

    luz("Principal", "AREA", (2.5, -3.0, 3.5), 900)
    luz("Relleno", "AREA", (-3.0, -2.0, 1.5), 250, color="naranja")
    luz("Contra", "AREA", (0.0, 3.5, 3.0), 600, color="morado")


def exportar_stl(colecciones, ruta):
    """Une las piezas de las colecciones en una malla cerrada y la exporta."""
    bpy.ops.object.select_all(action="DESELECT")
    copias = []
    for col in colecciones:
        for obj in col.objects:
            if obj.type not in {"MESH", "FONT", "CURVE"}:
                continue
            copia = obj.copy()
            copia.data = obj.data.copy()
            bpy.context.scene.collection.objects.link(copia)
            copias.append(copia)
    for c in copias:
        c.select_set(True)
    bpy.context.view_layer.objects.active = copias[0]
    bpy.ops.object.convert(target="MESH")  # aplica biseles y convierte textos
    bpy.ops.object.join()
    pieza = bpy.context.active_object
    pieza.name = "Pieza_impresion"
    remesh = pieza.modifiers.new("Remesh", "REMESH")
    remesh.mode = "VOXEL"
    remesh.voxel_size = VOXEL
    bpy.ops.object.convert(target="MESH")

    # Escala según la altura real de la malla unida (no la aproximada).
    escala = ALTURA_MM / pieza.dimensions.z
    bm = bmesh.new()
    bm.from_mesh(pieza.data)
    abiertas = sum(1 for e in bm.edges if not e.is_manifold)
    bm.free()
    if abiertas:
        print(f"AVISO: {abiertas} aristas no manifold; prueba un VOXEL más pequeño.")
    bpy.ops.wm.stl_export(filepath=ruta, export_selected_objects=True,
                          global_scale=escala, apply_modifiers=True)
    print(f"STL exportado: {ruta} ({len(pieza.data.polygons)} caras, "
          f"escala x{escala:.1f} → {ALTURA_MM:.0f} mm)")
    bpy.data.objects.remove(pieza)


def leer_argumentos():
    global FIGURA, STL, RENDER, BLEND, ALTURA_MM, MUESTRAS, RESOLUCION
    if "--" not in sys.argv:
        return
    args = sys.argv[sys.argv.index("--") + 1:]
    opciones = {"--figura": "FIGURA", "--stl": "STL", "--render": "RENDER",
                "--blend": "BLEND", "--altura-mm": "ALTURA_MM",
                "--muestras": "MUESTRAS", "--resolucion": "RESOLUCION"}
    tipos = {"ALTURA_MM": float, "MUESTRAS": int, "RESOLUCION": int}
    for clave, valor in zip(args[::2], args[1::2]):
        if clave not in opciones:
            raise SystemExit(f"Opción desconocida: {clave}")
        nombre = opciones[clave]
        globals()[nombre] = tipos.get(nombre, str)(valor)


def main():
    leer_argumentos()
    nombres = list(FIGURAS) if FIGURA == "todas" else [FIGURA]
    if any(n not in FIGURAS for n in nombres):
        raise SystemExit(f"FIGURA debe ser una de: {', '.join(FIGURAS)} o 'todas'")

    limpiar_escena()
    colecciones, alturas = [], []
    separacion = 1.5
    for i, nombre in enumerate(nombres):
        col = nueva_coleccion(f"CHARKUMA_{nombre}")
        alturas.append(FIGURAS[nombre](col))
        mover_coleccion(col, ((i - (len(nombres) - 1) / 2) * separacion, 0, 0))
        colecciones.append(col)

    montar_escena(max(alturas) * 0.5, (len(nombres) - 1) * separacion)

    if STL:
        exportar_stl(colecciones, bpy.path.abspath(STL))
    if RENDER:
        bpy.context.scene.render.filepath = bpy.path.abspath(RENDER)
        bpy.ops.render.render(write_still=True)
        print(f"Render guardado: {RENDER}")
    if BLEND:
        bpy.ops.wm.save_as_mainfile(filepath=bpy.path.abspath(BLEND))
        print(f".blend guardado: {BLEND}")


if __name__ == "__main__":
    main()
