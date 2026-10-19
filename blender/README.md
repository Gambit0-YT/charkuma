# Figuras 3D en Blender

`charkuma_figuras.py` genera figuras 3D de CHARKUMA con Python (bpy), listas
para renderizar y para imprimir en 3D. Probado con Blender 5.2.

| Figura    | Qué es                                                          |
|-----------|-----------------------------------------------------------------|
| `mascota` | La mascota lagarto, con un mando en las manos, sobre una peana con el nombre |
| `mando`   | Mando retro estilo NES en un atril                              |
| `trofeo`  | Trofeo dorado de Retro 365                                      |
| `todas`   | Las tres juntas (render panorámico 16:9)                        |

## Dentro de Blender

1. Pestaña **Scripting** → **Abrir** → `blender/charkuma_figuras.py`.
2. Cambiar arriba del todo `FIGURA`, y si quieres `STL`, `RENDER`, `ALTURA_MM`…
3. Botón ▶ **Run Script**. (Ojo: borra la escena actual.)

## Desde la terminal

```bash
blender --background --python blender/charkuma_figuras.py -- \
    --figura mascota --stl mascota.stl --render mascota.png --altura-mm 80
```

Opciones: `--figura`, `--stl`, `--render`, `--blend`, `--altura-mm`,
`--muestras` (Cycles, por defecto 64) y `--resolucion` (por defecto 1080).

## Impresión 3D

El STL sale como **una sola malla cerrada** (las piezas se unen con un voxel
remesh) y escalada a `ALTURA_MM` de alto. Si el script avisa de aristas no
manifold, baja `VOXEL` en el script. Los colores solo existen en el render:
la pieza impresa sale de un color y se pinta a mano.
