"""KidColors Samurai figurine generator for Blender 3.6+ — v2.

Run from Blender's Scripting workspace. The script clears the current scene,
builds a stylized skull samurai from editable mesh primitives, and sets up a
camera and lights for a first render. Front of the character faces -Y.

v2: real arms (the left hand holds the ace card), katanas with proper
proportions (short grip, long flat blade), a headband that wraps the skull
with the knot and tails at the back, layered chest plates instead of the
"radiator" bars, a ring of skirt plates instead of the stepped hip blocks,
and the KiDD COLORS name on the plinth.
"""

import bpy
import math
from mathutils import Euler, Vector


# ---------- Scene and materials ----------
if bpy.context.object and bpy.context.object.mode != 'OBJECT':
    bpy.ops.object.mode_set(mode='OBJECT')
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
# Remove leftovers so running the script twice doesn't pile up ".001" copies.
for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.lights,
                   bpy.data.cameras, bpy.data.materials):
    for item in list(datablocks):
        if item.users == 0:
            datablocks.remove(item)


def material(name, color, metallic=0.0, roughness=0.45, emission=0.0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    bs = mat.node_tree.nodes.get('Principled BSDF')
    bs.inputs['Base Color'].default_value = (*color, 1)
    bs.inputs['Metallic'].default_value = metallic
    bs.inputs['Roughness'].default_value = roughness
    if emission:
        bs.inputs['Emission Color'].default_value = (*color, 1)
        bs.inputs['Emission Strength'].default_value = emission
    return mat


INK = material('Midnight charcoal', (0.025, 0.022, 0.04), 0.15, 0.32)
ARMOR = material('Charcoal armor', (0.075, 0.065, 0.10), 0.35, 0.3)
PURPLE = material('Charkuma purple', (0.22, 0.055, 0.38), 0.15, 0.35)
PURPLE_HI = material('Purple edge stitching', (0.48, 0.18, 0.68), 0.2, 0.3)
BONE = material('Warm ivory bone', (0.92, 0.79, 0.52), 0.05, 0.34)
BONE_HI = material('Bone highlights', (1.0, 0.9, 0.68), 0.0, 0.3)
ORANGE = material('Glowing orange', (1.0, 0.22, 0.015), 0.1, 0.25, 2.2)
GOLD = material('Aged gold', (0.9, 0.37, 0.025), 0.62, 0.25)
STEEL = material('Katana steel', (0.34, 0.43, 0.58), 0.8, 0.22)


def finish(obj, name, mat, bevel=0.0):
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    if bevel and obj.type == 'MESH':
        mod = obj.modifiers.new('Soft crafted edges', 'BEVEL')
        mod.width = bevel
        mod.segments = 2
        obj.modifiers.new('Weighted corner normals', 'WEIGHTED_NORMAL')
    return obj


def uv(name, loc, scale, mat, segments=24, rings=16):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, location=loc)
    obj = bpy.context.object
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    for p in obj.data.polygons:
        p.use_smooth = True
    return finish(obj, name, mat)


def cube(name, loc, scale, mat, bevel=0.08, rotation=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.object
    obj.dimensions = scale
    if rotation:
        obj.rotation_euler = rotation
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return finish(obj, name, mat, bevel)


def cylinder_between(name, a, b, radius, mat, vertices=16, radius2=None):
    a, b = Vector(a), Vector(b)
    vec = b - a
    mid = (a + b) / 2
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radius,
                                    radius2=radius if radius2 is None else radius2,
                                    depth=vec.length, location=mid)
    obj = bpy.context.object
    obj.rotation_euler = vec.to_track_quat('Z', 'Y').to_euler()
    for p in obj.data.polygons:
        p.use_smooth = True
    return finish(obj, name, mat)


def torus(name, loc, major, minor, mat, rotation=(math.pi/2, 0, 0)):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor,
                                     major_segments=32, minor_segments=10,
                                     location=loc, rotation=rotation)
    obj = bpy.context.object
    for p in obj.data.polygons:
        p.use_smooth = True
    return finish(obj, name, mat)


def curve_tube(name, points, radius, mat, bevel_resolution=3):
    cu = bpy.data.curves.new(name, 'CURVE')
    cu.dimensions = '3D'
    cu.resolution_u = 12
    cu.bevel_depth = radius
    cu.bevel_resolution = bevel_resolution
    spline = cu.splines.new('BEZIER')
    spline.bezier_points.add(len(points) - 1)
    for bp, pt in zip(spline.bezier_points, points):
        bp.co = pt
        bp.handle_left_type = 'AUTO'
        bp.handle_right_type = 'AUTO'
    obj = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(obj)
    return finish(obj, name, mat)


def ring_along(name, center, direction, major, minor, mat):
    """A torus whose hole points along `direction` (cuffs, grip wraps)."""
    obj = torus(name, center, major, minor, mat, rotation=(0, 0, 0))
    obj.rotation_euler = Vector(direction).to_track_quat('Z', 'Y').to_euler()
    return obj


def ribbon_loop(name, center, rx, ry, height, mat, thickness=0.025):
    """A closed flat band (headband) around an ellipse, with rounded edges."""
    cu = bpy.data.curves.new(name, 'CURVE')
    cu.dimensions = '3D'
    cu.extrude = height / 2
    cu.bevel_depth = thickness
    cu.bevel_resolution = 3
    spline = cu.splines.new('POLY')
    n = 64
    spline.points.add(n - 1)
    for i, pt in enumerate(spline.points):
        a = 2 * math.pi * i / n
        pt.co = (center[0] + rx * math.cos(a), center[1] + ry * math.sin(a), center[2], 1)
    spline.use_cyclic_u = True
    obj = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(obj)
    return finish(obj, name, mat)


def arm(side, shoulder, elbow, wrist, hand_scale=(0.17, 0.16, 0.17)):
    """Sleeve, elbow, bracer, gold cuff and glove from shoulder to wrist."""
    s, e, w = Vector(shoulder), Vector(elbow), Vector(wrist)
    cylinder_between('Upper arm sleeve', s, e, 0.16, INK)
    uv('Elbow guard', e, (0.17, 0.17, 0.17), ARMOR)
    cylinder_between('Forearm bracer', e, w, 0.17, ARMOR, 16, 0.14)
    ring_along('Gold wrist cuff', e.lerp(w, 0.85), w - e, 0.15, 0.035, GOLD)
    hand = w + (w - e).normalized() * 0.12
    uv('Glove', hand, hand_scale, INK)
    return hand


def pointed_ear(name, side, mat, y=-0.02):
    """A softly beveled, pointed ear silhouette behind the skull."""
    outline = [(side*0.43, 3.34), (side*0.50, 3.86),
               (side*0.82, 3.56), (side*0.73, 3.24)]
    verts = [(x, y-0.09, z) for x, z in outline] + [(x, y+0.09, z) for x, z in outline]
    faces = [(0, 1, 2, 3), (7, 6, 5, 4),
             (0, 4, 5, 1), (1, 5, 6, 2), (2, 6, 7, 3), (3, 7, 4, 0)]
    mesh = bpy.data.meshes.new(name + ' mesh')
    mesh.from_pydata(verts, [], faces)
    mesh.materials.append(mat)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    bevel = obj.modifiers.new('Rounded ear edges', 'BEVEL')
    bevel.width = 0.08
    bevel.segments = 3
    obj.modifiers.new('Ear normals', 'WEIGHTED_NORMAL')
    return obj


# ---------- Crossed swords behind the body ----------
# The handles and blade tips angle up and outward, like the reference mascot.
# v2: a katana is mostly blade — short wrapped grip hidden behind the
# shoulder, a gold guard, then a long flat blade. One sword sits a bit higher
# so the silhouette isn't a mirror image.
for side, lift in ((-1, 0.0), (1, 0.12)):
    up = Vector((side * 0.62, 0, 0.78)).normalized()
    pommel = Vector((side * 0.40, 0.32, 2.20 + lift))
    guard = pommel + up * 0.62
    tip = guard + up * 1.55
    uv('Katana pommel', pommel, (0.11, 0.11, 0.11), GOLD)
    cylinder_between('Katana wrapped grip', pommel, guard, 0.085, INK)
    for i in range(1, 5):  # purple cord wraps around the grip
        ring_along('Grip wrap band', pommel.lerp(guard, i / 5), up, 0.085, 0.014, PURPLE_HI)
    ring_along('Katana guard', guard, up, 0.12, 0.05, GOLD)
    cylinder_between('Katana collar', guard, guard + up * 0.1, 0.07, GOLD, 12)
    # Four-sided pieces flattened front-to-back read as a blade, not a spike:
    # an almost straight body and a short pointed tip.
    point = tip - up * 0.28
    for part in (cylinder_between('Katana blade', guard + up * 0.08, point, 0.1, STEEL, 4, 0.085),
                 cylinder_between('Katana blade tip', point, tip, 0.085, STEEL, 4, 0.004)):
        part.scale = (0.28, 1, 1)  # local X is world Y here: thin front-to-back


# ---------- Body and samurai armor ----------
# Legs, boots and waist.
for side in (-1, 1):
    x = side * 0.31
    uv('Armored boot', (x, 0, 0.38), (0.28, 0.38, 0.27), INK)
    cube('Boot toe guard', (x, -0.30, 0.42), (0.38, 0.12, 0.13), ARMOR, 0.05)
    cylinder_between('Greave', (x, 0, 0.55), (x, 0, 1.17), 0.22, ARMOR)
    for z in (0.68, 0.85, 1.02):
        cube('Greave lacing', (x, -0.205, z), (0.34, 0.035, 0.045), PURPLE_HI, 0.015)
    uv('Knee plate', (x, -0.11, 1.18), (0.25, 0.18, 0.16), GOLD)

uv('Waist armor', (0, 0.02, 1.47), (0.57, 0.38, 0.35), ARMOR)
cube('Chest cuirass', (0, 0, 1.95), (1.22, 0.62, 0.78), ARMOR, 0.18)
cube('Cuirass front panel', (0, -0.32, 1.98), (0.90, 0.10, 0.57), INK, 0.07)
# v2: three overlapping lamellar plates, each with a gold lower edge and two
# purple cord ties, instead of four identical bars.
for i, z in enumerate((2.17, 1.98, 1.79)):
    w = 0.84 - i * 0.05
    y = -0.395 - i * 0.012
    cube('Chest plate', (0, y, z), (w, 0.06, 0.2), ARMOR, 0.03, rotation=(0.1, 0, 0))
    cube('Chest plate gold edge', (0, y - 0.03, z - 0.085), (w - 0.04, 0.03, 0.03), GOLD, 0.01)
    for x in (-0.24, 0.24):
        cube('Purple cord tie', (x, y - 0.035, z + 0.02), (0.045, 0.02, 0.12), PURPLE_HI, 0.008)
# Clan crest (mon) on the top plate.
cylinder_between('Chest crest', (0, -0.42, 2.2), (0, -0.46, 2.2), 0.1, GOLD, 32)
cylinder_between('Chest crest flame', (0, -0.455, 2.2), (0, -0.475, 2.2), 0.06, ORANGE, 32)
for side in (-1, 1):
    x = side * 0.70
    # segmented shoulder guards
    uv('Shoulder pauldron', (x, 0, 2.27), (0.48, 0.40, 0.25), ARMOR)
    for i in range(3):
        cube('Pauldron gold trim', (x, -0.30, 2.14 + i*0.13),
             (0.64 - i*0.07, 0.07, 0.035), GOLD, 0.016,
             rotation=(0, side*0.13, side*0.08))

# v2: arms that actually come out from under the pauldrons. The left hand is
# raised holding the ace card; the right one hangs as a fist by the hip.
card_hand = arm(-1, (-0.74, 0, 2.2), (-1.02, -0.12, 1.78), (-1.08, -0.36, 2.12))
uv('Glove thumb', card_hand + Vector((0.07, -0.13, 0.04)), (0.06, 0.05, 0.08), INK)
arm(1, (0.74, 0, 2.2), (1.0, 0.0, 1.8), (0.95, -0.14, 1.5), (0.18, 0.17, 0.16))

# Purple waist sash and hanging split cloth.
cube('Purple waist sash', (0, -0.05, 1.50), (1.05, 0.80, 0.19), PURPLE, 0.07)
cube('Sash knot', (0.15, -0.48, 1.48), (0.28, 0.14, 0.23), GOLD, 0.06)
# v2: a ring of skirt plates (kusazuri) flaring out below the sash, each
# with a gold hem, replaces the two flat sash blocks and the stepped plates.
for i in range(10):
    a = math.radians(18 + i * 36)
    pos = (0.47 * math.sin(a), -0.37 * math.cos(a), 1.22)
    cube('Skirt plate', pos, (0.3, 0.06, 0.36), ARMOR, 0.03, rotation=(-0.28, 0, a))
    hem = (0.51 * math.sin(a), -0.42 * math.cos(a), 1.06)
    cube('Skirt plate gold hem', hem, (0.28, 0.035, 0.03), GOLD, 0.01, rotation=(-0.28, 0, a))
cube('Front sash tail', (-0.12, -0.5, 1.2), (0.17, 0.05, 0.4), PURPLE, 0.03,
     rotation=(-0.12, 0.08, 0))

# ---------- Skull head ----------
# Large animal-like ears widen the silhouette and echo the original mascot.
for side in (-1, 1):
    pointed_ear('Dark outer ear', side, INK, 0.02)
    uv('Ivory inner ear', (side*0.64, -0.125, 3.54), (0.105, 0.055, 0.23), BONE)
    uv('Orange ear accent', (side*0.64, -0.175, 3.48), (0.055, 0.025, 0.13), ORANGE)

uv('Skull cranium', (0, -0.02, 3.02), (0.67, 0.48, 0.69), BONE, 32, 24)
uv('Jaw', (0, -0.10, 2.72), (0.48, 0.40, 0.33), BONE)
# Dark sockets and glowing orange eyes, set on the forward (-Y) face.
for side in (-1, 1):
    x = side * 0.28
    uv('Eye socket', (x, -0.439, 3.10), (0.235, 0.105, 0.245), INK)
    uv('Orange eye', (x, -0.535, 3.10), (0.105, 0.055, 0.15), ORANGE)
    uv('Eye glint', (x-0.025, -0.582, 3.16), (0.022, 0.012, 0.035), BONE_HI, 12, 8)
    uv('Cheekbone', (side*0.44, -0.405, 2.88), (0.22, 0.14, 0.13), BONE_HI)
    # angry brow slashes
    cylinder_between('Angry brow', (x-side*0.18, -0.53, 3.34),
                     (x+side*0.17, -0.53, 3.39), 0.075, BONE_HI, 12, 0.045)

# Nose cavity and grin.
uv('Nasal cavity', (0, -0.50, 2.87), (0.12, 0.055, 0.13), INK)
cube('Mouth shadow', (0, -0.493, 2.68), (0.60, 0.07, 0.19), INK, 0.06)
for x in (-0.22, -0.11, 0, 0.11, 0.22):
    tooth = cube('Upper tooth', (x, -0.55, 2.74), (0.065, 0.055, 0.10), BONE_HI, 0.02)
for x in (-0.17, 0.17):
    cylinder_between('Ivory fang', (x, -0.56, 2.77), (x, -0.56, 2.57), 0.055, BONE_HI, 12, 0.006)

# Hair swept up in a cluster of tapered locks.
uv('Hair cap', (0, 0.02, 3.59), (0.60, 0.45, 0.28), INK)
for i, (x, h, lean) in enumerate(((-0.39, 0.42, -0.19), (-0.20, 0.60, -0.07),
                                   (0.02, 0.68, 0.03), (0.25, 0.55, 0.15),
                                   (0.43, 0.38, 0.22))):
    cylinder_between('Swept hair lock', (x, -0.01, 3.62),
                     (x+lean, 0.01, 3.62+h), 0.19, ARMOR, 12, 0.008)

# v2: the headband is a real band that wraps the skull (instead of a straight
# bar poking out both sides), with the knot at the back and two tails
# fluttering out to one side.
ribbon_loop('Purple headband', (0, -0.02, 3.46), 0.55, 0.405, 0.12, PURPLE)
uv('Headband medallion', (0, -0.455, 3.46), (0.11, 0.05, 0.10), GOLD)
for side in (-1, 1):
    uv('Headband knot', (side * 0.09, 0.42, 3.47), (0.1, 0.07, 0.08), PURPLE_HI)
curve_tube('Headband tail', [(0.05, 0.43, 3.44), (0.42, 0.62, 3.36),
                             (0.82, 0.62, 3.12), (1.12, 0.52, 3.16)], 0.05, PURPLE)
curve_tube('Headband tail', [(0.0, 0.43, 3.42), (0.3, 0.6, 3.2),
                             (0.62, 0.62, 2.95), (0.86, 0.55, 2.86)], 0.045, PURPLE_HI)

# Neck wrap and layered scarf, to connect the head cleanly to the cuirass.
uv('Neck', (0, 0, 2.52), (0.27, 0.28, 0.28), INK)
torus('Scarf collar', (0, -0.01, 2.47), 0.34, 0.08, PURPLE, rotation=(0, 0, 0))
curve_tube('Scarf drape', [(-0.47, -0.39, 2.45), (-0.28, -0.48, 2.30),
                           (0.05, -0.49, 2.25), (0.39, -0.39, 2.40)], 0.07, PURPLE)
curve_tube('Scarf gold piping', [(-0.44, -0.47, 2.39), (-0.22, -0.55, 2.27),
                                (0.05, -0.56, 2.23), (0.36, -0.47, 2.36)], 0.022, GOLD)

# A curled mascot tail and a small ace card carry over details from the toy render.
curve_tube('Curled tail', [(0.36, 0.24, 1.25), (0.82, 0.38, 1.18),
                          (1.05, 0.40, 1.42), (0.96, 0.38, 1.65)], 0.10, INK)
uv('Tail ivory tip', (0.96, 0.38, 1.66), (0.11, 0.10, 0.15), BONE)
# v2: the card sits in the raised left glove, and its marks are placed
# relative to the card so they follow its tilt instead of floating.
card_rot = Euler((0, -0.12, -0.10))
card_center = card_hand + Vector((0, -0.06, 0.36))


def on_card(offset):
    v = Vector(offset)
    v.rotate(card_rot)
    return card_center + v


cube('Ace of spades card', card_center, (0.42, 0.08, 0.60), BONE_HI, 0.045,
     rotation=tuple(card_rot))
for name, offset, scale in (('Card spade center', (0, -0.05, 0.02), (0.105, 0.025, 0.14)),
                            ('Card spade stem', (0, -0.05, -0.08), (0.035, 0.02, 0.07)),
                            ('Card corner pip', (-0.14, -0.05, 0.23), (0.035, 0.02, 0.045))):
    pip = uv(name, on_card(offset), scale, INK, 12, 8)
    pip.rotation_euler = card_rot

# Small skull cheek markings and decorative gold rivets.
for side in (-1, 1):
    for z in (1.86, 2.02, 2.18):
        uv('Armor rivet', (side*0.49, -0.39, z), (0.035, 0.025, 0.035), GOLD, 12, 8)

# ---------- Display base, lighting and camera ----------
base_mat = material('Display base purple', (0.08, 0.025, 0.14), 0.35, 0.28)
bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=1.35, depth=0.20, location=(0, 0, 0.12))
base = bpy.context.object
finish(base, 'Round display plinth', base_mat, 0.06)
torus('Gold plinth rim', (0, 0, 0.22), 1.25, 0.035, GOLD, rotation=(0, 0, 0))
bpy.ops.object.text_add(location=(0, -0.9, 0.225))
name_plate = bpy.context.object
name_plate.data.body = 'KiDD COLORS'
name_plate.data.size = 0.22
name_plate.data.extrude = 0.012
name_plate.data.bevel_depth = 0.004
name_plate.data.align_x = 'CENTER'
name_plate.data.align_y = 'CENTER'
finish(name_plate, 'Plinth name', GOLD)

ground_mat = material('Studio ground', (0.025, 0.018, 0.04), 0.05, 0.7)
cube('Ground', (0, 0, -0.06), (200, 200, 0.10), ground_mat, 0)

def aim(obj, point):
    obj.rotation_euler = (Vector(point) - obj.location).to_track_quat('-Z', 'Y').to_euler()

bpy.ops.object.camera_add(location=(5.8, -10.5, 5.1))
camera = bpy.context.object
camera.name = 'Portrait camera'
aim(camera, (0, 0, 2.05))
camera.data.type = 'ORTHO'
camera.data.ortho_scale = 5.6
bpy.context.scene.camera = camera

def area_light(name, loc, energy, color, size, target):
    bpy.ops.object.light_add(type='AREA', location=loc)
    light = bpy.context.object
    light.name = name
    light.data.energy = energy
    light.data.color = color
    light.data.shape = 'DISK'
    light.data.size = size
    aim(light, target)

area_light('Warm key light', (4, -6, 7), 850, (1.0, 0.69, 0.42), 5, (0, 0, 2.2))
area_light('Purple fill', (-4, -3, 4), 700, (0.45, 0.22, 1.0), 4, (0, 0, 2.2))
area_light('Orange rim', (1, 4, 5), 1100, (1.0, 0.20, 0.035), 3, (0, 0, 2.5))

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 32
scene.render.resolution_x = 900
scene.render.resolution_y = 1100
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.render.film_transparent = False
scene.world.color = (0.025, 0.018, 0.04)
scene.view_settings.view_transform = 'AgX'

# Select the head so the first opened scene is easy to inspect.
bpy.ops.object.select_all(action='DESELECT')
head = bpy.data.objects.get('Skull cranium')
if head:
    head.select_set(True)
    bpy.context.view_layer.objects.active = head

print('KidColors Samurai generated. Rotate the viewport to inspect; render with F12.')
