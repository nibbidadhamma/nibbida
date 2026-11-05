#!/usr/bin/env python3
"""Draws the wallpaper (src/assets/wallpaper-light.svg, wallpaper-dark.svg and the portrait versions
wallpaper-tall-light.svg, wallpaper-tall-dark.svg).

The wallpaper is one fixed picture the size of the screen: it does not repeat and does not move when the
page scrolls (see pages.css). It is the largest labyrinth (the 16-band one), scaled up so that its rings reach
every corner of the screen. The heart of the labyrinth lies near the bottom-right corner, and the rings
spread out from there across the whole screen. The picture is drawn for a landscape screen (1440 x 900) and
for a portrait screen (390 x 844); the CSS scales it to cover whatever size the screen has.

Usage: python3 tools/make-wallpaper-static.py

The labyrinth comes from tools/make-wallpaper.py.
"""
import os, math, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("mw", os.path.join(ROOT, "tools", "make-wallpaper.py"))
mw = importlib.util.module_from_spec(spec); spec.loader.exec_module(mw)
STRENGTH = {"light": ("#3F2713", 0.032), "dark": ("#eee7da", 0.027)}

# name: (width, height, x and y of the heart of the labyrinth as a share of the width and height, turn in degrees)
PICTURES = {
    "wallpaper": (1440, 900, 0.93, 0.91, 0),
    "wallpaper-tall": (390, 844, 0.93, 0.91, 0),
}

def picture(spec_, theme):
    w, h, fx, fy, turn = spec_
    colour, op = STRENGTH[theme]
    cx, cy = w * fx, h * fy
    # radius: far enough that the outer ring passes beyond the farthest corner
    r = 1.01 * max(math.hypot(cx - x, cy - y) for x in (0, w) for y in (0, h))
    lab = mw.place("16", round(cx, 1), round(cy, 1), round(r, 1), turn).replace("currentColor", colour)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<g fill="{colour}" fill-opacity="{op}">{lab}</g></svg>\n')

if __name__ == "__main__":
    for name, spec_ in PICTURES.items():
        for theme in STRENGTH:
            path = os.path.join(ROOT, "src", "assets", f"{name}-{theme}.svg")
            open(path, "w").write(picture(spec_, theme))
            print(path, os.path.getsize(path))
