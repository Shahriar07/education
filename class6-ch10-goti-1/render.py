"""Render this video part by part.

  python render.py info                       part lengths, writes out/info.json
  python render.py stills <part> [t1 t2 ...]  check frames -> out/still_<part>_<t>.jpg  (default: 6 evenly spaced)
  python render.py clip <part> [<part> ...]   out/<part>.mp4 and out/<part>.srt   ("all" = every part)
  python render.py join                       out/video.mp4, out/video.srt, out/parts-list.md (no re-encoding)
  python render.py phone <part:t> [...]       frames shrunk to phone size (640x360), tiled -> out/phone.png
  python render.py chunks [MB]                whole parts grouped into out/send/ pieces of at most 30 MB

Run with the project venv:  ..\\.venv\\Scripts\\python.exe render.py ...
"""
import json, os, subprocess, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
import imageio_ffmpeg

FPS = 30
HERE = Path(__file__).resolve().parent
OUT = HERE / "out"
OUT.mkdir(exist_ok=True)
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
BN = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def stamp(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def write_srt(path, caps, offset=0.0, start=1):
    with open(path, "w", encoding="utf-8") as f:
        for i, c in enumerate(caps):
            f.write(f"{start + i}\n{stamp(c['a'] + offset)} --> {stamp(c['b'] + offset)}\n{c['c']}\n\n")
    return start + len(caps)


def frames(part):
    return int(round(part["dur"] * FPS))


SCENES = {1: "হুক ও শিরোনাম", 2: "স্থিতি", 3: "গতি", 4: "স্থিতি ও গতি আপেক্ষিক", 5: "বইয়ের চিত্র চলমান",
          6: "কেন এমন হয়", 7: "চারপাশে", 8: "নিজে করো", 9: "রিক্যাপ ও টিজার"}


def script():
    """Rewrite the scene section of script.md from the part files (out/info.json), so narration lives in one place."""
    info = json.load(open(OUT / "info.json", encoding="utf-8"))
    path = HERE / "script.md"
    text = path.read_text(encoding="utf-8")
    head, rest = text.split("## দৃশ্য ১", 1)
    head = "".join(l for l in head.splitlines(keepends=True) if not l.startswith("<!-- generated")).rstrip() + "\n\n"
    tail = "## রেকর্ডিং নোট" + rest.split("## রেকর্ডিং নোট", 1)[1]
    body, scene, words, total = [], None, 0, 0.0
    for p in info:
        if p["scene"] != scene:
            scene = p["scene"]
            body.append(f"## দৃশ্য {str(scene).translate(BN)}: {SCENES[scene]}\n")
        narration = " ".join(c["c"] for c in p["caps"])
        words += len(narration.split()); total += frames(p) / FPS
        body.append(f"### {p['label']} ({p['name']}): {p['title']}\n**On screen:** {p['screen']}\n\n{narration}\n")
        if p is info[-1] or info[info.index(p) + 1]["scene"] != scene:
            body.append("---\n")
    stats = f"<!-- generated: {len(info)} parts, {words} words, {int(total // 60)} min {round(total % 60)} s -->\n\n"
    path.write_text(head + stats + "\n".join(body) + "\n" + tail, encoding="utf-8")
    print("script.md:", len(info), "parts,", words, "words,", round(total, 1), "s")


def chunks(limit_mb=30.0):
    """Group whole parts, in order, into files of at most limit_mb each (out/send/), joined with -c copy.
    Cutting only between parts keeps every piece playable and lets the pieces be joined again without re-encoding."""
    info = json.load(open(OUT / "info.json", encoding="utf-8"))
    send = OUT / "send"; send.mkdir(exist_ok=True)
    for f in send.glob("*"): f.unlink()
    groups, cur, size = [], [], 0
    for p in info:
        s = (OUT / f"{p['name']}.mp4").stat().st_size
        if s > limit_mb * 1024 * 1024: print("WARNING: one part alone is over the limit:", p["name"], round(s / 2**20, 1), "MB")
        if cur and size + s > limit_mb * 1024 * 1024:
            groups.append(cur); cur, size = [], 0
        cur.append(p["name"]); size += s
    if cur: groups.append(cur)
    n = len(groups)
    for i, g in enumerate(groups, 1):
        lst = send / f"list{i}.txt"
        lst.write_text("".join(f"file '../{x}.mp4'\n" for x in g), encoding="utf-8")
        name = f"video_{i}_of_{n}.mp4"
        subprocess.check_call([FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst.name, "-c", "copy", name], cwd=send)
        lst.unlink()
        print(name, g[0], "...", g[-1], round((send / name).stat().st_size / 2**20, 1), "MB")
    (send / "join-list.txt").write_text("".join(f"file 'video_{i}_of_{n}.mp4'\n" for i in range(1, n + 1)), encoding="utf-8")


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "info"
    if mode == "join":
        return join()
    if mode == "chunks":
        return chunks(float(sys.argv[2]) if len(sys.argv) > 2 else 30.0)   # MiB, the same unit as the 30 MiB send limit
    if mode == "script":
        return script()
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME, args=["--allow-file-access-from-files", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader", "--hide-scrollbars"])
        pg = b.new_page(viewport={"width": 1920, "height": 1080})
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg.goto((HERE / "index.html").as_uri())
        pg.evaluate("window.ready")
        info = pg.evaluate("window.partInfo()")
        by = {i["name"]: i for i in info}
        json.dump(info, open(OUT / "info.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        if mode == "info":
            tot = 0
            for i in info:
                print(i["name"], i["label"], round(i["dur"], 1), i["title"]); tot += frames(i) / FPS
            print("total", round(tot, 1), "s =", int(tot // 60), "min", round(tot % 60), "s")
        elif mode == "stills":
            name = sys.argv[2]; dur = by[name]["dur"]
            ts = [float(x) for x in sys.argv[3:]] or [dur * (i + 0.5) / 6 for i in range(6)]
            for t in ts:
                pg.evaluate("([n,t])=>window.setTime(n,t)", [name, t])
                pg.screenshot(path=str(OUT / f"still_{name}_{t:05.1f}.jpg"), type="jpeg", quality=85)
            print("stills", name, [round(t, 1) for t in ts])
        elif mode == "phone":
            # phone-size check: each part:t frame shrunk to 640x360 (a phone held sideways), tiled into out/phone.png
            import base64
            imgs = []
            for a in sys.argv[2:]:
                n, t = a.split(":"); pg.evaluate("([n,t])=>window.setTime(n,t)", [n, float(t)])
                imgs.append(base64.b64encode(pg.screenshot(type="png")).decode())
            sh = b.new_page(viewport={"width": 1300, "height": 380 * ((len(imgs) + 1) // 2)})
            sh.set_content('<body style="margin:0;background:#222;display:flex;flex-wrap:wrap;gap:10px;padding:5px">' +
                           "".join(f'<img src="data:image/png;base64,{i}" style="width:640px;height:360px">' for i in imgs) + "</body>")
            sh.screenshot(path=str(OUT / "phone.png"), full_page=True)
            print("phone check -> out/phone.png,", len(imgs), "frames")
        elif mode == "clip":
            names = [i["name"] for i in info] if sys.argv[2:] == ["all"] else sys.argv[2:]
            for name in names:
                part = by[name]; n = frames(part)
                out = OUT / f"{name}.mp4"; tmp = OUT / f"{name}.part.mp4"
                # identical settings for every clip so that join can use -c copy
                ff = subprocess.Popen([FFMPEG, "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                                       "-vf", "scale=in_range=pc:out_range=tv,format=yuv420p", "-color_range", "tv",
                                       "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-r", str(FPS),
                                       "-video_track_timescale", "15360", "-an", str(tmp)], stdin=subprocess.PIPE)
                for i in range(n):
                    pg.evaluate("([n,t])=>window.setTime(n,t)", [name, i / FPS])
                    ff.stdin.write(pg.screenshot(type="jpeg", quality=93))
                ff.stdin.close()
                if ff.wait() == 0:
                    os.replace(tmp, out)
                    write_srt(OUT / f"{name}.srt", part["caps"])
                    print("wrote", out.name, n, "frames", round(n / FPS, 2), "s", flush=True)
                else:
                    print("FFMPEG FAILED", name)
        if errs:
            print("PAGE ERRORS:", errs[:8])
        b.close()


def join():
    info = json.load(open(OUT / "info.json", encoding="utf-8"))
    have = [i for i in info if (OUT / f"{i['name']}.mp4").exists()]
    with open(OUT / "list.txt", "w", encoding="utf-8") as f:
        for i in have:
            f.write(f"file '{i['name']}.mp4'\n")
    subprocess.check_call([FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", "list.txt", "-c", "copy", "video.mp4"], cwd=OUT)
    t = 0.0; k = 1
    rows = ["| দৃশ্য | পর্ব | শুরু | দৈর্ঘ্য (সে) | বিবরণ | ফাইল |", "|---|---|---|---|---|---|"]
    srt = open(OUT / "video.srt", "w", encoding="utf-8"); srt.close()
    allcaps = []
    for i in have:
        d = frames(i) / FPS
        rows.append(f"| {str(i['scene']).translate(BN)} | {i['label']} | {int(t // 60)}:{int(t % 60):02d} | {d:.1f} | {i['title']} | {i['name']}.mp4 |")
        allcaps += [{"a": c["a"] + t, "b": c["b"] + t, "c": c["c"]} for c in i["caps"]]
        t += d
    write_srt(OUT / "video.srt", allcaps)
    missing = [i["name"] for i in info if i not in have]
    with open(OUT / "parts-list.md", "w", encoding="utf-8") as f:
        f.write("# পর্বের তালিকা\n\n" + "\n".join(rows) + f"\n\nমোট: {int(t // 60)} মিনিট {round(t % 60)} সেকেন্ড, {len(have)}টি পর্ব।\n")
        if missing:
            f.write("\nএখনো রেন্ডার হয়নি: " + ", ".join(missing) + "\n")
    print("joined", len(have), "parts,", round(t, 1), "s")


main()
