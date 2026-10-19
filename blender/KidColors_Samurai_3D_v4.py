"""KidColors Samurai figurine generator for Blender 3.6+ — v4.

Run from Blender's Scripting workspace. The script clears the current scene,
builds a stylized cat-skull samurai from editable mesh primitives, and sets up
a camera and lights for a first render. Front of the character faces -Y.

v3 follows the concept render: a big cat skull with a snout, open fanged jaw
and glowing slit eyes; cat ears; swept-back black hair; sheathed katanas on
the back with the hilts over the shoulders; laced armor rows with gold studs;
a knotted purple obi; paw boots; the ace of spades in the raised hand.

v4 (five render-vs-reference rounds): camera and lights on the concept's
side, a 15% bigger chibi head, angry slanted sockets with small glowing eyes,
squared skull teeth, bigger ears, a layered swept-back mane, deeper purples,
rounded shoulder plates, both hilts clear of the head, the tail reaching out.
"""

import bpy
import math
from mathutils import Euler, Vector

PLINTH_NAME = ""   # e.g. "KiDD COLORS" to write a name on the base


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


INK = material('Midnight charcoal', (0.02, 0.018, 0.03), 0.1, 0.35)
ARMOR = material('Charcoal armor', (0.05, 0.045, 0.07), 0.3, 0.32)
HAIR = material('Glossy black hair', (0.012, 0.01, 0.018), 0.0, 0.28)
PURPLE = material('Charkuma purple', (0.075, 0.01, 0.22), 0.0, 0.6)
PURPLE_HI = material('Purple lacing', (0.26, 0.07, 0.6), 0.1, 0.4)
BONE = material('Warm ivory bone', (0.85, 0.74, 0.55), 0.0, 0.42)
BONE_HI = material('Bone highlights', (0.95, 0.88, 0.74), 0.0, 0.38)
CARD = material('Card white', (0.92, 0.9, 0.86), 0.0, 0.3)
PEACH = material('Inner ear peach', (1.0, 0.55, 0.3), 0.0, 0.45)
ORANGE = material('Glowing orange', (1.0, 0.28, 0.0), 0.0, 0.25, 2.6)
GOLD = material('Aged gold', (0.9, 0.45, 0.08), 0.85, 0.25)


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


def smooth(obj):
    for p in obj.data.polygons:
        p.use_smooth = True
    return obj


def uv(name, loc, scale, mat, segments=32, rings=16, rotation=None):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, location=loc)
    obj = bpy.context.object
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if rotation:
        obj.rotation_euler = rotation
    return finish(smooth(obj), name, mat)


def cube(name, loc, scale, mat, bevel=0.08, rotation=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.object
    obj.dimensions = scale
    if rotation:
        obj.rotation_euler = rotation
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return finish(obj, name, mat, bevel)


def cylinder_between(name, a, b, radius, mat, vertices=24, radius2=None):
    a, b = Vector(a), Vector(b)
    vec = b - a
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radius,
                                    radius2=radius if radius2 is None else radius2,
                                    depth=vec.length, location=(a + b) / 2)
    obj = bpy.context.object
    obj.rotation_euler = vec.to_track_quat('Z', 'Y').to_euler()
    return finish(smooth(obj), name, mat)


def torus(name, loc, major, minor, mat, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor,
                                     major_segments=48, minor_segments=12,
                                     location=loc, rotation=rotation)
    return finish(smooth(bpy.context.object), name, mat)


def ring_along(name, center, direction, major, minor, mat):
    """A torus whose hole points along `direction` (cuffs, wraps, guards)."""
    obj = torus(name, center, major, minor, mat)
    obj.rotation_euler = Vector(direction).to_track_quat('Z', 'Y').to_euler()
    return obj


def curve_tube(name, points, radius, mat, radii=None, bevel_resolution=4):
    """A smooth tube through `points`; `radii` tapers it (hair locks, tail)."""
    cu = bpy.data.curves.new(name, 'CURVE')
    cu.dimensions = '3D'
    cu.resolution_u = 16
    cu.bevel_depth = radius
    cu.bevel_resolution = bevel_resolution
    cu.use_fill_caps = True
    spline = cu.splines.new('BEZIER')
    spline.bezier_points.add(len(points) - 1)
    for i, (bp, pt) in enumerate(zip(spline.bezier_points, points)):
        bp.co = pt
        bp.handle_left_type = 'AUTO'
        bp.handle_right_type = 'AUTO'
        if radii:
            bp.radius = radii[i]
    obj = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(obj)
    return finish(obj, name, mat)


def ribbon_loop(name, center, rx, ry, height, mat, thickness=0.03):
    """A closed flat band (headband, obi) around an ellipse, rounded edges."""
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


def text(name, body, loc, size, mat, rotation, depth=0.01):
    bpy.ops.object.text_add(location=loc, rotation=rotation)
    obj = bpy.context.object
    obj.data.body = body
    obj.data.size = size
    obj.data.extrude = depth
    obj.data.align_x = 'CENTER'
    obj.data.align_y = 'CENTER'
    return finish(obj, name, mat)


# ---------- Katanas, sheathed on the back ----------
# Hilts rise over the shoulders; the black scabbards cross behind the back.
def katana(hilt_end, toward):
    top = Vector(hilt_end)
    down = (Vector(toward) - top).normalized()
    guard = top + down * 0.62
    cylinder_between('Katana pommel cap', top - down * 0.03, top + down * 0.06, 0.1, GOLD)
    cylinder_between('Katana grip', top + down * 0.05, guard, 0.085, INK)
    # Two sets of slanted cord wraps cross over each other: the diamond
    # pattern of a wrapped tsuka.
    side = Vector((0, 1, 0)).cross(down).normalized()
    for i in range(1, 6):
        c = top.lerp(guard, i / 6)
        for tilt in (-0.55, 0.55):
            ring_along('Grip cord wrap', c, (down + side * tilt).normalized(), 0.088, 0.018,
                       PURPLE_HI)
    ring_along('Katana guard', guard, down, 0.14, 0.04, GOLD)
    cylinder_between('Katana collar', guard, guard + down * 0.08, 0.1, GOLD)
    cylinder_between('Katana scabbard', guard + down * 0.08, guard + down * 1.9, 0.1, INK,
                     24, 0.085)
    ring_along('Scabbard mouth ring', guard + down * 0.12, down, 0.1, 0.02, GOLD)


katana((-0.92, 0.42, 3.55), (0.75, 0.42, 1.25))
katana((1.22, 0.47, 3.38), (-0.55, 0.47, 1.2))


# ---------- Legs and paw boots ----------
for side in (-1, 1):
    x = side * 0.3
    uv('Paw boot', (x, -0.1, 0.36), (0.27, 0.34, 0.17), INK)
    for i, dx in enumerate((-0.11, 0, 0.11)):
        uv('Boot toe stud', (x + dx, -0.42 + abs(dx) * 0.5, 0.36), (0.04, 0.035, 0.04), GOLD,
           16, 8)
    cylinder_between('Shin guard', (x, -0.02, 0.48), (x, -0.02, 1.02), 0.19, ARMOR)
    for z in (0.58, 0.72, 0.86):  # rope wraps around the shins
        torus('Shin rope wrap', (x, -0.02, z), 0.19, 0.026, PURPLE_HI)
    uv('Knee guard', (x, -0.12, 1.02), (0.2, 0.14, 0.13), ARMOR)
    uv('Knee stud', (x, -0.26, 1.03), (0.04, 0.03, 0.04), GOLD, 16, 8)


# ---------- Waist: skirt plates and knotted obi ----------
for i in range(10):
    a = math.radians(18 + i * 36)
    rot = (-0.3, 0, a)
    out = Vector((math.sin(a), -math.cos(a), 0))
    center = Vector((0.5 * out.x, 0.4 * out.y, 1.16))
    cube('Skirt plate', center, (0.3, 0.06, 0.36), ARMOR, 0.025, rotation=rot)
    for dz in (0.06, -0.07):
        lace = center + out * (0.04 - dz * 0.3) + Vector((0, 0, dz))
        cube('Skirt plate lacing', lace, (0.27, 0.025, 0.028), PURPLE_HI, 0.008, rotation=rot)
    for dx in (-0.09, 0.09):
        stud = center + out * 0.06 + Vector((math.cos(a) * dx, math.sin(a) * dx, -0.12))
        uv('Skirt stud', stud, (0.025, 0.025, 0.025), GOLD, 12, 8)

cube('Obi sash', (0, -0.02, 1.42), (1.06, 0.74, 0.22), PURPLE, 0.09)
cube('Obi buckle', (0.06, -0.4, 1.42), (0.24, 0.06, 0.15), GOLD, 0.025)
uv('Obi knot', (-0.24, -0.41, 1.43), (0.13, 0.08, 0.12), PURPLE)
cube('Obi hanging end', (-0.33, -0.41, 1.12), (0.24, 0.05, 0.5), PURPLE, 0.02,
     rotation=(-0.08, 0.22, 0))
cube('Obi hanging end', (-0.13, -0.43, 1.08), (0.2, 0.05, 0.46), PURPLE, 0.02,
     rotation=(-0.12, -0.08, 0))


# ---------- Torso: laced chest rows with gold studs ----------
cube('Chest cuirass', (0, 0, 1.88), (1.0, 0.62, 0.78), ARMOR, 0.15)
for z in (1.62, 1.79, 1.96, 2.13):
    cube('Chest plate row', (0, -0.32, z), (0.86, 0.06, 0.15), ARMOR, 0.03)
    cylinder_between('Chest lacing', (-0.42, -0.355, z - 0.085), (0.42, -0.355, z - 0.085),
                     0.026, PURPLE_HI)
    for x in (-0.31, 0.31):
        cube('Chest gold stud', (x, -0.365, z + 0.01), (0.075, 0.03, 0.075), GOLD, 0.012)

# Shoulder guards (sode): three plates per side, sloping down and out.
for side in (-1, 1):
    for i in range(3):
        c = Vector((side * (0.6 + i * 0.05), -0.02, 2.24 - i * 0.14))
        rot = (0, side * 0.4, 0)
        uv('Shoulder plate', c, (0.24, 0.32, 0.07), ARMOR, rotation=rot)
        edge = c + Vector((0, -0.31, -0.02))
        cube('Shoulder lacing', edge, (0.36, 0.025, 0.028), PURPLE_HI, 0.008, rotation=rot)
        for dx in (-0.12, 0.12):
            stud = edge + Vector((dx * math.cos(0.4), -0.015, -side * dx * math.sin(0.4) + 0.04))
            uv('Shoulder stud', stud, (0.028, 0.02, 0.028), GOLD, 12, 8)


# ---------- Arms ----------
def arm(shoulder, elbow, wrist, hand_scale=(0.16, 0.15, 0.16)):
    """Sleeve, elbow, laced bracer, gold cuff and glove; returns hand centre."""
    s, e, w = Vector(shoulder), Vector(elbow), Vector(wrist)
    cylinder_between('Upper arm sleeve', s, e, 0.15, INK)
    uv('Elbow guard', e, (0.16, 0.16, 0.16), ARMOR)
    cylinder_between('Forearm bracer', e, w, 0.16, ARMOR, 24, 0.14)
    for t in (0.3, 0.6):
        ring_along('Bracer lacing', e.lerp(w, t), w - e, 0.155 - t * 0.02, 0.022, PURPLE_HI)
    ring_along('Gold wrist cuff', e.lerp(w, 0.9), w - e, 0.145, 0.03, GOLD)
    hand = w + (w - e).normalized() * 0.11
    uv('Glove', hand, hand_scale, INK)
    return hand


card_hand = arm((-0.62, 0, 2.1), (-0.88, -0.12, 1.7), (-0.96, -0.34, 2.05))
uv('Glove thumb', card_hand + Vector((0.07, -0.12, 0.04)), (0.055, 0.05, 0.075), INK)
arm((0.62, 0, 2.1), (0.86, 0.02, 1.72), (0.82, -0.12, 1.44), (0.17, 0.16, 0.15))


# ---------- Neck and scarf ----------
uv('Neck', (0, 0, 2.36), (0.24, 0.24, 0.2), INK)
torus('Scarf collar', (0, -0.02, 2.34), 0.3, 0.13, PURPLE)
uv('Scarf drape', (0.04, -0.38, 2.17), (0.28, 0.1, 0.19), PURPLE, rotation=(0.25, 0, 0.12))
curve_tube('Scarf fold', [(-0.3, -0.4, 2.3), (-0.05, -0.47, 2.14), (0.25, -0.44, 2.04)],
           0.05, PURPLE)


# ---------- Cat skull head ----------
_before_head = {o.name for o in bpy.data.objects}
HEAD = Vector((0, -0.02, 3.08))
uv('Skull cranium', HEAD, (0.6, 0.52, 0.55), BONE, 48, 24)
for side in (-1, 1):  # wide cheekbones under the eyes
    uv('Cheekbone', (side * 0.34, -0.33, 2.9), (0.12, 0.14, 0.09), BONE)
uv('Snout', (0, -0.36, 2.84), (0.3, 0.3, 0.18), BONE)
uv('Mouth cavity', (0, -0.38, 2.68), (0.25, 0.22, 0.1), INK)
uv('Lower jaw', (0, -0.3, 2.53), (0.27, 0.27, 0.1), BONE)

# Upper teeth: squared skull teeth along the snout's front arc, with two
# long fangs at the corners; a lower row facing them.
for i in range(8):
    t = -1 + i / 3.5
    x = 0.22 * t
    y = -0.37 - 0.26 * math.sqrt(max(0.0, 1 - 0.75 * t * t))
    if i in (1, 6):
        cylinder_between('Ivory fang', (x, y, 2.73), (x, y, 2.5), 0.05, BONE_HI, 16, 0.006)
    else:
        cube('Upper tooth', (x, y, 2.68), (0.06, 0.05, 0.1), BONE_HI, 0.018,
             rotation=(0, 0, -t * 0.6))
for i in range(6):
    t = -1 + i / 2.5
    x = 0.17 * t
    y = -0.31 - 0.24 * math.sqrt(max(0.0, 1 - 0.8 * t * t))
    cube('Lower tooth', (x, y, 2.6), (0.055, 0.045, 0.08), BONE_HI, 0.016,
         rotation=(0, 0, -t * 0.6))

# Nose: two slanted nostril holes forming an inverted heart.
for side in (-1, 1):
    uv('Nasal cavity', (side * 0.05, -0.6, 2.95), (0.06, 0.035, 0.09), INK, 16, 8,
       rotation=(0, side * 0.5, 0))

# Big dark sockets slanted inward (that slant is what makes it look angry),
# small glowing orange eyes with vertical cat pupils.
for side in (-1, 1):
    x = side * 0.255
    slant = (0, -side * 0.38, 0)  # inner corner low = angry
    uv('Eye socket', (x, -0.46, 3.1), (0.175, 0.11, 0.23), INK, rotation=slant)
    uv('Orange eye', (x, -0.54, 3.08), (0.07, 0.04, 0.11), ORANGE, rotation=slant)
    uv('Cat pupil', (x, -0.575, 3.08), (0.017, 0.015, 0.075), INK, 16, 8)

# Cat ears on top: ivory outside, peach inside, tilted out.
for side in (-1, 1):
    tilt = (0, side * 0.5, 0)
    for name, loc, r, depth, mat in (('Cat ear', (side * 0.55, 0.0, 3.7), 0.27, 0.62, BONE),
                                     ('Inner ear', (side * 0.545, -0.1, 3.68), 0.18, 0.46, PEACH)):
        bpy.ops.mesh.primitive_cone_add(vertices=24, radius1=r, radius2=0.015, depth=depth,
                                        location=loc)
        ear = bpy.context.object
        ear.scale = (1, 0.38, 1)
        ear.rotation_euler = tilt
        finish(smooth(ear), name, mat)


# ---------- Swept-back hair ----------
uv('Hair cap', (0, 0.1, 3.36), (0.6, 0.52, 0.4), HAIR)  # covers the back of the skull
# A mane of locks: each starts above the headband, sweeps back, and its tip
# curls up again. A second, higher layer adds volume.
for x, lift in ((-0.32, 0.0), (-0.16, 0.06), (0.0, 0.1), (0.16, 0.07), (0.32, 0.0)):
    curve_tube('Hair lock', [(x, -0.36, 3.5), (x * 1.05, -0.12, 3.72 + lift),
                             (x * 1.15, 0.28, 3.78 + lift), (x * 1.3, 0.66, 3.64 + lift),
                             (x * 1.45, 0.92, 3.78 + lift * 0.5)],
               0.16, HAIR, radii=(1.0, 1.0, 0.9, 0.6, 0.05))
for x, lift in ((-0.24, 0.1), (-0.08, 0.16), (0.08, 0.18), (0.24, 0.1)):
    curve_tube('Hair lock', [(x, -0.1, 3.72), (x * 1.1, 0.16, 3.84 + lift * 0.6),
                             (x * 1.25, 0.52, 3.8 + lift * 0.6), (x * 1.4, 0.84, 3.92 + lift * 0.4)],
               0.13, HAIR, radii=(1.0, 0.9, 0.6, 0.05))
curve_tube('Hair quiff', [(0.04, -0.42, 3.52), (0.1, -0.44, 3.76), (0.18, -0.2, 3.9),
                          (0.3, 0.2, 3.86), (0.4, 0.55, 3.7)],
           0.15, HAIR, radii=(1.0, 1.0, 0.85, 0.5, 0.06))
for side in (-1, 1):  # side locks sweeping back behind the ears
    curve_tube('Side hair lock', [(side * 0.5, -0.12, 3.4), (side * 0.62, 0.25, 3.5),
                                  (side * 0.66, 0.6, 3.24)], 0.13, HAIR, radii=(1.0, 0.7, 0.08))

# Purple headband wrapped round the skull, gold medallion, knot on the side.
ribbon_loop('Purple headband', (0, -0.02, 3.4), 0.56, 0.49, 0.15, PURPLE)
cylinder_between('Headband medallion', (0, -0.52, 3.4), (0, -0.57, 3.4), 0.085, GOLD, 32)
uv('Medallion dome', (0, -0.565, 3.4), (0.055, 0.03, 0.055), GOLD)
uv('Headband knot', (0.5, 0.3, 3.4), (0.1, 0.09, 0.09), PURPLE)
curve_tube('Headband tail', [(0.5, 0.33, 3.38), (0.66, 0.45, 3.22), (0.72, 0.5, 2.98)],
           0.05, PURPLE, radii=(1.0, 0.9, 0.6))
curve_tube('Headband tail', [(0.47, 0.36, 3.36), (0.56, 0.55, 3.15), (0.56, 0.62, 2.92)],
           0.045, PURPLE, radii=(1.0, 0.9, 0.6))


# Chibi proportions: the whole head (skull, ears, hair, headband) is scaled up
# together around the bottom of the jaw.
HEAD_SCALE = 1.15
_pivot = Vector((0, -0.1, 2.45))
for o in [o for o in bpy.data.objects if o.name not in _before_head]:
    o.location = _pivot + (o.location - _pivot) * HEAD_SCALE
    o.scale = o.scale * HEAD_SCALE


# ---------- Cat tail ----------
curve_tube('Curled tail', [(0.3, 0.3, 1.25), (0.9, 0.42, 1.08), (1.32, 0.3, 1.36),
                           (1.25, 0.2, 1.78)], 0.1, INK, radii=(1.0, 1.0, 0.95, 0.9))
uv('Tail tip', (1.25, 0.2, 1.82), (0.13, 0.12, 0.14), BONE_HI)
for dx, dz in ((-0.05, 0.11), (0.04, 0.13), (0.0, 0.16)):  # fur tuft
    uv('Tail tuft', (1.25 + dx, 0.2, 1.82 + dz), (0.05, 0.05, 0.07), BONE_HI, 16, 8)


# ---------- Ace of spades in the raised hand ----------
card_rot = Euler((0, -0.12, -0.12))
card_center = card_hand + Vector((0.02, -0.07, 0.34))


def on_card(offset):
    v = Vector(offset)
    v.rotate(card_rot)
    return card_center + v


cube('Ace of spades card', card_center, (0.4, 0.04, 0.56), CARD, 0.03,
     rotation=tuple(card_rot))
face = -0.025  # just in front of the card face
for name, offset, scale in (('Spade lobe', (-0.05, face, -0.03), (0.06, 0.012, 0.055)),
                            ('Spade lobe', (0.05, face, -0.03), (0.06, 0.012, 0.055)),
                            ('Spade stem', (0, face, -0.1), (0.022, 0.012, 0.055))):
    uv(name, on_card(offset), scale, INK, 24, 12, rotation=tuple(card_rot))
bpy.ops.mesh.primitive_cone_add(vertices=32, radius1=0.105, radius2=0.0, depth=0.17,
                                location=on_card((0, face, 0.045)))
spade_point = bpy.context.object
spade_point.scale = (1, 0.1, 1)
spade_point.rotation_euler = card_rot
finish(spade_point, 'Spade point', INK)
text_rot = (card_rot.to_matrix() @ Euler((math.pi / 2, 0, 0)).to_matrix()).to_euler()
text('Card letter A', 'A', on_card((-0.13, face, 0.19)), 0.13, INK, tuple(text_rot), 0.004)


# ---------- Display base, lighting and camera ----------
base_mat = material('Display base purple', (0.08, 0.025, 0.14), 0.35, 0.28)
bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=1.35, depth=0.2, location=(0, 0, 0.12))
finish(bpy.context.object, 'Round display plinth', base_mat, 0.06)
torus('Gold plinth rim', (0, 0, 0.22), 1.25, 0.035, GOLD)
if PLINTH_NAME:
    text('Plinth name', PLINTH_NAME, (0, -0.9, 0.225), 0.22, GOLD, (0, 0, 0), 0.012)

ground_mat = material('Studio ground', (0.025, 0.018, 0.04), 0.05, 0.7)
cube('Ground', (0, 0, -0.06), (200, 200, 0.10), ground_mat, 0)


def aim(obj, point):
    obj.rotation_euler = (Vector(point) - obj.location).to_track_quat('-Z', 'Y').to_euler()


bpy.ops.object.camera_add(location=(-4.4, -11.0, 4.6))  # same side as the concept render
camera = bpy.context.object
camera.name = 'Portrait camera'
aim(camera, (0, 0, 2.05))
camera.data.type = 'ORTHO'
camera.data.ortho_scale = 5.0
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


area_light('Warm key light', (-4, -6.5, 6.5), 1000, (1.0, 0.86, 0.72), 5, (0, 0, 2.4))
area_light('Purple fill', (-6, -1, 3), 600, (0.5, 0.28, 1.0), 5, (0, 0, 2.0))
area_light('Orange rim', (4, 2, 3.5), 1500, (1.0, 0.3, 0.05), 3, (0, 0, 2.2))
area_light('Orange floor glow', (5, -4, 0.8), 900, (1.0, 0.25, 0.05), 4, (0, 0, 0.8))
area_light('Purple rim', (-3, 4, 4.5), 800, (0.55, 0.25, 1.0), 3, (0, 0, 2.8))

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 64
scene.render.resolution_x = 900
scene.render.resolution_y = 1100
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.render.film_transparent = False
if scene.world is None:
    scene.world = bpy.data.worlds.new('World')
scene.world.color = (0.025, 0.018, 0.04)
scene.view_settings.view_transform = 'AgX'

# Select the head so the first opened scene is easy to inspect.
bpy.ops.object.select_all(action='DESELECT')
head = bpy.data.objects.get('Skull cranium')
if head:
    head.select_set(True)
    bpy.context.view_layer.objects.active = head

print('KidColors Samurai v3 generated. Rotate the viewport to inspect; render with F12.')
