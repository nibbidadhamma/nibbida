#!/usr/bin/env python3
"""Puts the compass emblem (design/SVG-labyrinths/nibbida-c3.svg) into the gaps of the wallpaper tiles
(src/assets/wallpaper-light.svg and wallpaper-dark.svg), in place of the four-pointed stars.

Usage: python3 tools/add-emblem-to-wallpaper.py [SCALE]     (default 0.33)

The emblem is a black drawing with white cuts. Here the black parts become a mask, so the white
cuts are transparent and the wallpaper colour shows only where the drawing is black. Run again with
another SCALE to resize it; the tile is rewritten in place.
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "design", "SVG-labyrinths", "nibbida-c3.svg")
TILES = [os.path.join(ROOT, "src", "assets", f"wallpaper-{t}.svg") for t in ("light", "dark")]
VIEW = (107, 2, 1040, 1040)   # viewBox of the drawing
CENTER = (627, 521)           # centre of the rings and of the four spikes
SCALE = float(sys.argv[1]) if len(sys.argv) > 1 else 0.33
SPOTS = [(500, 0), (0, 500), (1000, 500), (500, 1000)]

def mask_body():
    s = open(SRC).read()
    s = re.sub(r"^<svg[^>]*>", "", s.strip()).rsplit("</svg>", 1)[0]
    s = re.sub(r'\sid="[^"]*"', "", s)
    # swap colours: black drawing becomes white (visible), white cuts become black (hidden)
    return s.replace("#000000", "@@").replace("#ffffff", "#000000").replace("@@", "#ffffff")

def block():
    x, y, w, h = VIEW
    cx, cy = CENTER
    uses = "".join(
        f'<g transform="translate({px} {py}) scale({SCALE}) translate({-cx} {-cy})">'
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" mask="url(#emblem-mask)"/></g>'
        for px, py in SPOTS)
    return (f'<!--emblem--><defs><mask id="emblem-mask" fill-opacity="1" opacity="1" maskUnits="userSpaceOnUse" x="{x}" y="{y}" width="{w}" height="{h}">'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#000000"/>{mask_body()}</mask></defs>{uses}<!--/emblem-->')

STAR = re.compile(r'<g transform="translate\((?:380 -120|-120 380|880 380|380 880)\) scale\(40\)">.*?</g>', re.S)
OLD = re.compile(r"<!--emblem-->.*?<!--/emblem-->", re.S)

for f in TILES:
    s = open(f).read()
    s = OLD.sub("", STAR.sub("", s))
    i = s.rindex("</g>\n</svg>") if "</g>\n</svg>" in s else s.rindex("</g></svg>")
    s = s[:i] + block() + s[i:]
    open(f, "w").write(s)
    print(f, len(s))
