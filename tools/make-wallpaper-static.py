#!/usr/bin/env python3
"""Draws the wallpaper (src/assets/wallpaper-light.svg, wallpaper-dark.svg and the phone versions
wallpaper-tall-light.svg, wallpaper-tall-dark.svg).

The wallpaper is one fixed picture the size of the screen: it does not repeat and does not move when the
page scrolls (see pages.css). Composition "C": one large labyrinth fills the right side, a smaller one sits
at the bottom-left, and a compass emblem is at the top-left and at the bottom-right. The picture is drawn
for a landscape screen (1440 x 900) and for a portrait screen (390 x 844); the CSS scales it to cover.

Usage: python3 tools/make-wallpaper-static.py

The labyrinth comes from tools/make-wallpaper.py; the emblem is one plain shape made by tools/flatten-emblem.py.
"""
import os, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("mw", os.path.join(ROOT, "tools", "make-wallpaper.py"))
mw = importlib.util.module_from_spec(spec); spec.loader.exec_module(mw)
SHAPE = open(os.path.join(ROOT, "design", "SVG-labyrinths", "nibbida-c3-shape.txt")).read()
CENTER = (627, 521)      # centre of the emblem drawing
HALF = 464               # distance from the centre to the tip of its long spikes
STRENGTH = {"light": ("#3F2713", 0.032), "dark": ("#eee7da", 0.027)}

# name: (width, height, labyrinths (x, y, radius, turn in degrees), emblems (x, y, half-length of the spikes))
PICTURES = {
    "wallpaper": (1440, 900, [(1390, 430, 310, 100), (90, 830, 200, 250)], [(120, 180, 120), (1250, 860, 120)]),
    "wallpaper-tall": (390, 844, [(420, 420, 210, 100), (20, 820, 130, 250)], [(70, 130, 80), (300, 700, 80)]),
}

def picture(spec_, theme):
    w, h, labs, embs = spec_
    colour, op = STRENGTH[theme]
    cx, cy = CENTER
    labyrinths = "".join(mw.place("16", x, y, r, turn) for x, y, r, turn in labs).replace("currentColor", colour)
    emblems = "".join(
        f'<use href="#emblem" transform="translate({x} {y}) scale({half / HALF:.4f}) translate({-cx} {-cy})"/>'
        for x, y, half in embs)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<g fill="{colour}" fill-opacity="{op}"><defs><path id="emblem" fill-rule="evenodd" d="{SHAPE}"/></defs>'
            f'{labyrinths}{emblems}</g></svg>\n')

if __name__ == "__main__":
    for name, spec_ in PICTURES.items():
        for theme in STRENGTH:
            path = os.path.join(ROOT, "src", "assets", f"{name}-{theme}.svg")
            open(path, "w").write(picture(spec_, theme))
            print(path, os.path.getsize(path))
