#!/usr/bin/env python3
"""Draws the wallpaper tiles (src/assets/wallpaper-light.svg and wallpaper-dark.svg).

A sparse pattern: in a 2000 x 2000 tile there are five 16-band labyrinths (each turned a different way)
and four compass emblems (design/SVG-labyrinths/nibbida-c3.svg), placed off the grid so the repetition
is hard to see. The CSS shows the tile at 1520 px (see pages.css), so the labyrinths keep their old size
but are about 60 % as many per screen as before.

Usage: python3 tools/make-wallpaper-sparse.py

The emblem is a black drawing with white cuts. Its black parts become a mask, so the white cuts are
transparent and the wallpaper colour shows only where the drawing is black.
"""
import os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import importlib.util
spec = importlib.util.spec_from_file_location("mw", os.path.join(os.path.dirname(os.path.abspath(__file__)), "make-wallpaper.py"))
mw = importlib.util.module_from_spec(spec); spec.loader.exec_module(mw)

ROOT = mw.ROOT
EMBLEM = os.path.join(ROOT, "design", "SVG-labyrinths", "nibbida-c3.svg")
VIEW = (107, 2, 1040, 1040)    # viewBox of the emblem drawing
CENTER = (627, 521)            # centre of its rings and spikes
SIZE = 2000                    # tile size in drawing units
LAB_R = 340                    # radius of a labyrinth (as in the old tile)
EMB_SCALE = 0.34               # emblem: spikes reach about 158, rings about 112

# (x, y, turn in degrees) of the labyrinths and (x, y) of the emblems, on a 2000 x 2000 tile that repeats.
# The positions were found by a random search for the widest spacing on the repeating tile.
LABYRINTHS = [(689, 924, 0), (1973, 492, 70), (498, 1757, 140), (1757, 1465, 210), (1209, 272, 290)]
EMBLEMS = [(1176, 1645), (1657, 38), (1302, 915), (249, 1234)]
STRENGTH = {"light": ("#3F2713", 0.032), "dark": ("#eee7da", 0.027)}

def mask_body():
    s = open(EMBLEM).read()
    s = re.sub(r"^<svg[^>]*>", "", s.strip()).rsplit("</svg>", 1)[0]
    s = re.sub(r'\sid="[^"]*"', "", s)
    return s.replace("#000000", "@@").replace("#ffffff", "#000000").replace("@@", "#ffffff")

def wrapped(x, y, r):
    """A position drawn also at the opposite edge when it reaches over the border, so the tile repeats cleanly."""
    out = []
    for dx in (-SIZE, 0, SIZE):
        for dy in (-SIZE, 0, SIZE):
            if -r < x + dx < SIZE + r and -r < y + dy < SIZE + r:
                out.append((x + dx, y + dy))
    return out

def tile(theme):
    colour, op = STRENGTH[theme]
    x0, y0, w, h = VIEW
    cx, cy = CENTER
    labs = "".join(mw.place("16", px, py, LAB_R, turn) for x, y, turn in LABYRINTHS for px, py in wrapped(x, y, LAB_R))
    embs = "".join(
        f'<g transform="translate({px} {py}) scale({EMB_SCALE}) translate({-cx} {-cy})">'
        f'<rect x="{x0}" y="{y0}" width="{w}" height="{h}" mask="url(#emblem-mask)"/></g>'
        for x, y in EMBLEMS for px, py in wrapped(x, y, 170))
    mask = (f'<defs><mask id="emblem-mask" fill-opacity="1" opacity="1" maskUnits="userSpaceOnUse" x="{x0}" y="{y0}" width="{w}" height="{h}">'
            f'<rect x="{x0}" y="{y0}" width="{w}" height="{h}" fill="#000000"/>{mask_body()}</mask></defs>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{SIZE}" height="{SIZE}" viewBox="0 0 {SIZE} {SIZE}">'
            f'<g fill="{colour}" fill-opacity="{op}" color="{colour}">{mask}{labs.replace("currentColor", colour)}{embs}</g></svg>\n')

if __name__ == "__main__":
    for theme in STRENGTH:
        path = os.path.join(ROOT, "src", "assets", f"wallpaper-{theme}.svg")
        open(path, "w").write(tile(theme))
        print(path, os.path.getsize(path))
