#!/usr/bin/env python3
"""Lists a public Google Drive folder recursively through its embedded view (no sign-in needed).
Usage: python3 tools/list-drive-folder.py FOLDER_ID OUT.csv
The folder must be shared with "anyone with the link". Gives folder, file name, last modified, id and link."""
import csv, html, re, subprocess, sys, time

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"

def fetch(fid):
    for _ in range(3):
        r = subprocess.run(["curl", "-s", "-m", "40", "-A", UA,
                            f"https://drive.google.com/embeddedfolderview?id={fid}"],
                           capture_output=True, text=True)
        if r.stdout and "flip-entry" in r.stdout or "<title>" in r.stdout:
            return r.stdout
        time.sleep(2)
    return ""

def entries(page):
    out = []
    for chunk in page.split('<div class="flip-entry" id="entry-')[1:]:
        eid = chunk.split('"', 1)[0]
        href = re.search(r'href="([^"]+)"', chunk)
        title = re.search(r'<div class="flip-entry-title">(.*?)</div>', chunk, re.S)
        mod = re.search(r'flip-entry-last-modified"><div>(.*?)</div>', chunk, re.S)
        out.append((eid, html.unescape(title.group(1)).strip() if title else "",
                    html.unescape(href.group(1)) if href else "", mod.group(1) if mod else ""))
    return out

def walk(fid, path, rows):
    for eid, title, href, mod in entries(fetch(fid)):
        if "/folders/" in href:
            walk(eid, path + [title], rows)
        else:
            rows.append(("/".join(path), title, mod, eid, f"https://drive.google.com/file/d/{eid}/view"))

if __name__ == "__main__":
    rows = []
    walk(sys.argv[1], [], rows)
    with open(sys.argv[2], "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["folder", "file", "last modified", "id", "link"])
        w.writerows(rows)
    print(len(rows), "files")
