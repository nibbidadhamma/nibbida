#!/usr/bin/env python3
"""Turns the compass emblem (design/SVG-labyrinths/nibbida-c3.svg: black drawing with white cuts on top)
into one plain black shape without any white parts, saved as design/SVG-labyrinths/nibbida-c3-shape.txt
(the path data, in the drawing's own coordinates). The wallpaper script uses it, so the wallpaper needs
no SVG mask and stays sharp in every browser.

Needs shapely and svgpathtools:  python3 -m venv v && v/bin/pip install shapely svgpathtools
"""
import os, re
from shapely.geometry import Polygon, box
from shapely.ops import unary_union
from shapely import affinity
from svgpathtools import parse_path

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "design", "SVG-labyrinths", "nibbida-c3.svg")
OUT = os.path.join(ROOT, "design", "SVG-labyrinths", "nibbida-c3-shape.txt")
STEP = 0.25      # distance between sampled points on curves, in drawing units (finer than a screen pixel)

def rings(d):
    out = []
    for sub in parse_path(d).continuous_subpaths():
        pts = []
        for seg in sub:
            n = max(2, int(seg.length() / STEP))
            pts += [(seg.point(i / n).real, seg.point(i / n).imag) for i in range(n)]
        if len(pts) > 2:
            out.append(Polygon(pts).buffer(0))
    return out

def shape(d, evenodd):
    rs = rings(d)
    if evenodd:
        s = Polygon()
        for r in rs: s = s.symmetric_difference(r)
        return s
    return unary_union(rs)

s = open(SRC).read()
def group(gid):
    m = re.search(r'<g id="%s"([^>]*)>(.*?)</g>' % gid, s, re.S)
    return m.group(1), m.group(2)

attrs, body = group("scaled-labyrinth")
tx, ty, k = map(float, re.search(r"translate\(([\d.]+) ([\d.]+)\) scale\(([\d.]+)\)", attrs).groups())
lab = unary_union([shape(d, False) for d in re.findall(r'<path d="([^"]+)"', body)])
lab = affinity.translate(affinity.scale(lab, k, k, origin=(0, 0)), tx, ty)

cuts = unary_union([shape(d, False) for d in re.findall(r'<path d="([^"]+)"', group("white-cuts")[1])])
rects = unary_union([box(float(x), float(y), float(x) + float(w), float(y) + float(h))
                     for x, y, w, h in re.findall(r'<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"', group("cut-remnant-cleanup")[1])])
ebody = shape(re.search(r'id="emblem-body"[^>]* d="([^"]+)"', s).group(1), True)
edet = shape(re.search(r'id="filled-details"[^>]* d="([^"]+)"', s).group(1), True)

final = lab.difference(cuts).difference(rects).union(ebody).difference(edet).buffer(0).simplify(0.02)

def ring_d(coords):
    c = list(coords)[:-1]
    return "M" + "L".join(f"{x:.2f} {y:.2f}" for x, y in c) + "Z"
parts = []
for g in (final.geoms if hasattr(final, "geoms") else [final]):
    parts.append(ring_d(g.exterior.coords))
    parts += [ring_d(i.coords) for i in g.interiors]
open(OUT, "w").write("".join(parts))
print(len(parts), "rings,", os.path.getsize(OUT), "bytes")
