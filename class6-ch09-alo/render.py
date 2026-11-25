"""Render parts. Usage (from this folder, with .venv):
  python render.py info
  python render.py stills s05_p02 0.5 3 7        -> out/still_s05_p02_<t>.png
  python render.py clip s05_p02 [s05_p03 ...]    -> out/s05_p02.mp4  (1920x1080, 30 fps, H.264)
  python render.py join                          -> out/video.mp4 (concat, -c copy) + parts list
"""
import asyncio, subprocess, sys, os, json
from playwright.async_api import async_playwright
import imageio_ffmpeg

FPS = 30
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out"); os.makedirs(OUT, exist_ok=True)
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ENC = ["-vf", "scale=in_range=pc:out_range=tv,format=yuv420p", "-c:v", "libx264", "-crf", "18", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS), "-an"]


async def main():
    mode = sys.argv[1]
    if mode == "join":
        return join()
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME, args=["--allow-file-access-from-files"])
        pg = await b.new_page(viewport={"width": 1920, "height": 1080})
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await pg.goto("file:///" + os.path.join(HERE, "index.html").replace("\\", "/"))
        await pg.evaluate("document.fonts.ready")
        info = await pg.evaluate("window.partInfo()")
        if mode == "info":
            json.dump(info, open(os.path.join(OUT, "info.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            for i in info: print(i["name"], round(i["dur"], 1), "s")
        elif mode == "stills":
            name = sys.argv[2]
            for t in [float(x) for x in sys.argv[3:]]:
                await pg.evaluate(f"window.setPart('{name}',{t})")
                f = os.path.join(OUT, f"still_{name}_{t:05.1f}.png")
                await pg.screenshot(path=f); print(f)
        elif mode == "sheet":   # contact sheet: python render.py sheet <part> [n=6]  -> out/sheet_<part>.jpg
            name = sys.argv[2]; n = int(sys.argv[3]) if len(sys.argv) > 3 else 6
            dur = next(i["dur"] for i in info if i["name"] == name)
            ts = [float(x) for x in sys.argv[4:]] or [dur * (i + 0.6) / n for i in range(n)]
            cols = 3; rows = -(-len(ts) // cols)
            f = os.path.join(OUT, f"sheet_{name}.jpg")
            ff = subprocess.Popen([FFMPEG, "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", "1", "-c:v", "mjpeg", "-i", "-", "-vf", f"scale=640:-1,tile={cols}x{rows}", "-frames:v", "1", "-q:v", "3", f], stdin=subprocess.PIPE)
            for t in ts:
                await pg.evaluate(f"window.setPart('{name}',{t})")
                ff.stdin.write(await pg.screenshot(type="jpeg", quality=90))
            ff.stdin.close(); ff.wait(); print(f, [round(t, 1) for t in ts])
        elif mode == "clip":
            for name in sys.argv[2:]:
                dur = next(i["dur"] for i in info if i["name"] == name)
                out = os.path.join(OUT, name + ".mp4"); tmp = os.path.join(OUT, name + ".part.mp4")
                ff = subprocess.Popen([FFMPEG, "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-"] + ENC + [tmp], stdin=subprocess.PIPE)
                n = int(round(dur * FPS))
                for i in range(n):
                    await pg.evaluate(f"window.setPart('{name}',{i / FPS})")
                    ff.stdin.write(await pg.screenshot(type="jpeg", quality=92))
                ff.stdin.close()
                if ff.wait() == 0:
                    os.replace(tmp, out); print("wrote", out, n, "frames", round(dur, 2), "s")
        if errs: print("PAGE ERRORS:", errs[:6])
        await b.close()


def join():
    info = json.load(open(os.path.join(OUT, "info.json"), encoding="utf-8"))
    names = [i["name"] for i in info if os.path.exists(os.path.join(OUT, i["name"] + ".mp4"))]
    lst = os.path.join(OUT, "list.txt")
    open(lst, "w").write("".join(f"file '{n}.mp4'\n" for n in names))
    subprocess.check_call([FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", os.path.join(OUT, "video.mp4")])
    print("joined", names)


asyncio.run(main())
