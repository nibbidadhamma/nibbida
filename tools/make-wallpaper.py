#!/usr/bin/env python3
"""Draws the wallpaper tiles and the hidden cat as SVG files.

Usage: python3 tools/make-wallpaper.py OUTPUT_DIR [VARIANT ...]

Variants (A, B, C) differ in the small labyrinth that fills the gaps between the big ones
and in the cat. The source drawings are read from design/SVG-labyrinths/.
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "design", "SVG-labyrinths")

def inner(name):
    s = open(os.path.join(SRC, name + ".svg")).read()
    paths = "".join(re.findall(r"<path[^>]*/>", s))
    return paths.replace("#000000", "currentColor")

# name, drawing coordinates of the centre, radius of the outer ring (measured with getBBox)
LAB = {
    "16": ("labyrinth-black", (0, 0), 115.8),           # paths already centred on 0,0
    "12": ("twelve-12-black-transparent", (0, 0), 500.75),
    "7":  ("B3-7-black-transparent", (500, 500), 405.8 * 0.9864),
    "5":  ("compact-5-black-transparent", (0, 0), 407.0),
}

def place(key, x, y, radius, rotate=0):
    name, (cx, cy), r = LAB[key]
    k = radius / r
    rot = f" rotate({rotate})" if rotate else ""
    return f'<g transform="translate({x} {y}){rot} scale({k:.5f}) translate({-cx} {-cy})">{inner(name)}</g>'

COLORS = {"dark": ("#eee7da", 0.034), "light": ("#3F2713", 0.040)}

# The entrance of the 16-band labyrinth is a gap in its outer ring at about 121 degrees
# (measured clockwise from the right). Turning the centre labyrinth by 59 degrees puts the
# entrance on its left side, where the cat sits.
ENTRANCE_TURN = 59

def tile(small, theme):
    colour, op = COLORS[theme]
    big = 340
    parts = []
    for x, y in [(0, 0), (1000, 0), (0, 1000), (1000, 1000)]:
        parts.append(place("16", x, y, big))
    parts.append(place("16", 500, 500, big, ENTRANCE_TURN))
    for x, y in [(500, 0), (0, 500), (1000, 500), (500, 1000)]:
        parts.append(place(small, x, y, 116))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">'
            f'<g fill="currentColor" color="{colour}" opacity="{op}">{"".join(parts)}</g></svg>\n')

SIT = ('M 26 96 C 20 80 24 56 40 44 C 40 36 42 28 46 24 L 46 6 L 58 16 L 70 6 L 72 24 '
       'C 76 34 70 44 62 46 C 74 52 80 76 76 96 Z')
SIT_TAIL = 'M 30 94 C 4 98 2 66 16 62'
WALK_BODY = ('M 20 30 C 20 18 38 16 52 18 C 66 16 74 20 74 30 C 74 40 66 44 52 44 L 30 44 C 22 44 20 38 20 30 Z')
WALK_HEAD = '<circle cx="80" cy="22" r="10"/><path d="M 74 15 L 75 4 L 82 11 Z M 82 11 L 90 4 L 90 16 Z"/>'
WALK_LEGS = 'M 28 44 L 26 62 M 36 44 L 38 62 M 62 44 L 60 62 M 70 44 L 74 60'
WALK_TAIL = 'M 20 28 C 8 28 4 16 8 6'

BG = {"dark": "#1b1917", "light": "#FAF5E8"}

def cat(kind, theme):
    """The cat sits on a round patch in the page colour. The patch hides one small labyrinth,
    so the cat has a clear spot beside the entrance of the big labyrinth."""
    colour = COLORS[theme][0]
    if kind == "sit":      # quiet silhouette
        w, h, op = 100, 100, 0.075
        body = (f'<path d="{SIT}" fill="{colour}"/>'
                f'<path d="{SIT_TAIL}" fill="none" stroke="{colour}" stroke-width="6" stroke-linecap="round"/>')
    elif kind == "line":   # outline
        w, h, op = 100, 100, 0.17
        body = (f'<path d="{SIT}" fill="none" stroke="{colour}" stroke-width="2.4" stroke-linejoin="round"/>'
                f'<path d="{SIT_TAIL}" fill="none" stroke="{colour}" stroke-width="2.4" stroke-linecap="round"/>')
    else:                  # walking cat, clearer
        w, h, op = 100, 70, 0.14
        head = WALK_HEAD.replace("<circle", f'<circle fill="{colour}"').replace("<path", f'<path fill="{colour}"')
        body = (f'<path d="{WALK_BODY}" fill="{colour}"/>{head}'
                f'<path d="{WALK_LEGS}" fill="none" stroke="{colour}" stroke-width="5" stroke-linecap="round"/>'
                f'<path d="{WALK_TAIL}" fill="none" stroke="{colour}" stroke-width="5" stroke-linecap="round"/>')
    k = 0.64
    tx, ty = 118 - w * k / 2, 118 - h * k / 2
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="236" height="236" viewBox="0 0 236 236">'
            f'<circle cx="118" cy="118" r="118" fill="{BG[theme]}"/>'
            f'<g transform="translate({tx:.1f} {ty:.1f}) scale({k})" opacity="{op}">{body}</g></svg>\n')

VARIANTS = {"A": ("12", "sit"), "B": ("7", "line"), "C": ("5", "walk")}

if __name__ == "__main__":
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    for v in (sys.argv[2:] or VARIANTS):
        small, kind = VARIANTS[v]
        for theme in COLORS:
            open(f"{out}/wp-{v}-{theme}.svg", "w").write(tile(small, theme))
            open(f"{out}/cat-{v}-{theme}.svg", "w").write(cat(kind, theme))
