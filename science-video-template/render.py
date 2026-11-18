import asyncio, subprocess, sys, os, json
from playwright.async_api import async_playwright

FPS = 30
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)


async def main():
    mode = sys.argv[1]
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox", "--allow-file-access-from-files"])
        pg = await b.new_page(viewport={"width": 1920, "height": 1080})
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("file://" + os.path.join(HERE, "index.html"))
        await pg.evaluate("document.fonts.ready")
        info = await pg.evaluate("window.sceneInfo()")
        if mode == "info":
            json.dump(info, open(os.path.join(OUT, "info.json"), "w"), ensure_ascii=False)
            tot = 0
            for i, s in enumerate(info):
                print(i + 1, round(s["dur"], 1)); tot += s["dur"]
            print("total", round(tot, 1), "=", int(tot // 60), "min", round(tot % 60), "s")
        elif mode == "stills":
            k = int(sys.argv[2]) - 1
            n = int(sys.argv[3])
            dur = info[k]["dur"]
            ts = [float(x) for x in sys.argv[4:]] or [dur * (i + 0.5) / n for i in range(n)]
            for j, t in enumerate(ts):
                await pg.evaluate(f"window.setTime({k},{t})")
                await pg.screenshot(path=os.path.join(OUT, f"st_{k+1}_{j:02d}.jpg"), type="jpeg", quality=80)
            print("stills", k + 1, [round(t, 1) for t in ts])
        elif mode == "video":
            k = int(sys.argv[2]) - 1
            dur = info[k]["dur"]
            out = os.path.join(OUT, f"scene{k+1}.mp4")
            tmp = os.path.join(OUT, f"scene{k+1}.part.mp4")
            ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                                   "-c:v", "libx264", "-crf", "19", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-r", str(FPS), tmp], stdin=subprocess.PIPE)
            n = int(round(dur * FPS))
            for i in range(n):
                await pg.evaluate(f"window.setTime({k},{i / FPS})")
                ff.stdin.write(await pg.screenshot(type="jpeg", quality=90))
            ff.stdin.close()
            if ff.wait() == 0:
                os.rename(tmp, out)
                print("wrote", out, n, "frames")
        if errs:
            print("PAGE ERRORS:", errs[:5])
        await b.close()

asyncio.run(main())
