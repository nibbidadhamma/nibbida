#!/usr/bin/env python3
"""Draws the wallpaper (src/assets/wallpaper-light.svg, wallpaper-dark.svg and the portrait versions
wallpaper-tall-light.svg, wallpaper-tall-dark.svg).

The wallpaper is one fixed picture: it does not repeat and does not move when the page scrolls (see pages.css).
It is the largest labyrinth (the 16-band one). Its heart lies near the bottom-right corner, and its rings spread
out from there over about two thirds of the screen (SIZE is the radius as a share of the screen's diagonal), so
the lines stay fine. The picture is drawn for a landscape screen (1440 x 900) and for a portrait screen (390 x 844);
the CSS keeps it at a steady size and anchors it to the bottom-right corner.

Usage: python3 tools/make-wallpaper-static.py

The labyrinth comes from tools/make-wallpaper.py.
"""
import os, math, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("mw", os.path.join(ROOT, "tools", "make-wallpaper.py"))
mw = importlib.util.module_from_spec(spec); spec.loader.exec_module(mw)
SIZE = 0.42          # radius of the labyrinth as a share of the diagonal of the picture
STRENGTH = {"light": ("#3F2713", 0.032), "dark": ("#eee7da", 0.027)}

# name: (width, height, x and y of the heart of the labyrinth as a share of the width and height, turn in degrees,
#         strength: 1 = the values in STRENGTH). The portrait picture is stronger, because on a phone the text box
#         hides most of it.
PICTURES = {
    "wallpaper": (1440, 900, 0.93, 0.91, 0, 1.0),
    "wallpaper-tall": (390, 844, 0.93, 0.91, 0, 1.6),
}

def picture(spec_, theme):
    w, h, fx, fy, turn, k = spec_
    colour, op = STRENGTH[theme]
    op = round(op * k, 4)
    cx, cy = w * fx, h * fy
    r = SIZE * math.hypot(w, h)
    lab = mw.place("16", round(cx, 1), round(cy, 1), round(r, 1), turn).replace("currentColor", colour)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<g fill="{colour}" fill-opacity="{op}">{lab}</g></svg>\n')

if __name__ == "__main__":
    for name, spec_ in PICTURES.items():
        for theme in STRENGTH:
            path = os.path.join(ROOT, "src", "assets", f"{name}-{theme}.svg")
            open(path, "w").write(picture(spec_, theme))
            print(path, os.path.getsize(path))
