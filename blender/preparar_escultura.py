# CHARKUMA — Preparar el samurái KiDD COLORS (v3) para esculpir en Blender
#
# Ejecútalo DESPUÉS de KidColors_Samurai_3D_v3.py, en la misma escena.
# Une las partes orgánicas en una sola pieza cada una, las convierte en malla
# y les pone una malla uniforme (voxel remesh), lista para el modo Sculpt:
#
#   Craneo_esculpir   cráneo + hocico + pómulos + mandíbula
#   Pelo_esculpir     gorro de pelo + todos los mechones
#   Bufanda_esculpir  cuello + caída + pliegue de la bufanda
#   Faja_esculpir     nudo de la faja + las dos caídas
#
# No pierde nada: antes de unir, guarda una copia de las piezas originales en
# la colección oculta "Originales (copia)". Si lo ejecutas otra vez, salta las
# partes ya preparadas. Al terminar entra en Sculpt Mode con el cráneo
# seleccionado y la simetría X activada.
#
# Uso: Scripting → Open → este archivo → ▶ (Run Script). Probado con Blender 5.2.

import re

import bpy

# nombre de la pieza final: (nombres de las piezas a unir, tamaño de vóxel, simetría X)
GRUPOS = {
    "Craneo_esculpir": (("Skull cranium", "Snout", "Cheekbone", "Lower jaw"), 0.015, True),
    "Pelo_esculpir": (("Hair cap", "Hair lock", "Hair quiff", "Side hair lock"), 0.012, False),
    "Bufanda_esculpir": (("Scarf collar", "Scarf drape", "Scarf fold"), 0.015, True),
    "Faja_esculpir": (("Obi knot", "Obi hanging end"), 0.012, False),
}
COPIAS = "Originales (copia)"


def nombre_base(obj):
    """'Cheekbone.001' -> 'Cheekbone'."""
    return re.sub(r"\.\d{3}$", "", obj.name)


def coleccion_copias():
    col = bpy.data.collections.get(COPIAS)
    if col is None:
        col = bpy.data.collections.new(COPIAS)
        bpy.context.scene.collection.children.link(col)
    capa = bpy.context.view_layer.layer_collection.children.get(COPIAS)
    if capa:
        capa.exclude = True  # oculta y fuera del render
    return col


def guardar_copia(obj, col):
    copia = obj.copy()
    copia.data = obj.data.copy()
    copia.name = f"{obj.name} (original)"
    col.objects.link(copia)


def preparar(nombre, piezas, voxel, simetria, copias):
    if bpy.data.objects.get(nombre):
        print(f"{nombre}: ya estaba preparado, lo salto.")
        return bpy.data.objects[nombre]
    objetos = [o for o in bpy.context.view_layer.objects
               if nombre_base(o) in piezas and o.type in {"MESH", "CURVE"}]
    if not objetos:
        print(f"{nombre}: no encuentro las piezas {piezas}. ¿Has ejecutado antes la v3?")
        return None

    for o in objetos:
        guardar_copia(o, copias)

    bpy.ops.object.select_all(action="DESELECT")
    for o in objetos:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objetos[0]
    # Convertir a malla también aplica los biseles y vuelve malla las curvas.
    bpy.ops.object.convert(target="MESH")
    if len(objetos) > 1:
        bpy.ops.object.join()
    pieza = bpy.context.view_layer.objects.active
    pieza.name = nombre

    pieza.data.remesh_voxel_size = voxel
    bpy.ops.object.voxel_remesh()
    pieza.data.use_mirror_x = simetria
    for p in pieza.data.polygons:
        p.use_smooth = True
    print(f"{nombre}: {len(objetos)} piezas unidas → {len(pieza.data.polygons)} caras.")
    return pieza


def main():
    if bpy.context.object and bpy.context.object.mode != "OBJECT":
        bpy.ops.object.mode_set(mode="OBJECT")
    copias = coleccion_copias()
    preparadas = [preparar(n, *datos, copias) for n, datos in GRUPOS.items()]

    craneo = preparadas[0]
    if craneo is None:
        return
    bpy.ops.object.select_all(action="DESELECT")
    craneo.select_set(True)
    bpy.context.view_layer.objects.active = craneo
    if not bpy.app.background:
        bpy.ops.object.mode_set(mode="SCULPT")

        def aviso(menu, _context):
            menu.layout.label(text="Cráneo, pelo, bufanda y faja listos para esculpir.")
            menu.layout.label(text="Estás en Sculpt Mode con el cráneo. Guarda con Ctrl+S.")

        bpy.context.window_manager.popup_menu(aviso, title="Preparado", icon="SCULPTMODE_HLT")


if __name__ == "__main__":
    main()
