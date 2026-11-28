"""Regenerate a finished video from its code, without the AI agent.

Double-click make_video.bat (it asks which video), or run from the project root:

    python make_video.py                                   ask which video, then render all of it
    python make_video.py class6-ch10-goti-2                render every part, join, split into 30 MB pieces
    python make_video.py class6-ch10-goti-2 --parts s05_p03 s07_p01     only these parts, then join again
    python make_video.py class6-ch10-goti-2 --scenes 5 7                every part of scenes 5 and 7
    python make_video.py class6-ch10-goti-2 --changed      only parts whose clip is missing or whose code changed since it was rendered
    python make_video.py class6-ch10-goti-2 --mark-done    record the clips already in out/ as up to date (once, for clips made before this file)
    python make_video.py --list                            the videos and their parts
    python make_video.py --check                           check Python, the .venv, Chrome and the fonts, then stop

Options:
    --workers N        parts rendered at the same time (default: from the CPU count and free memory, at most 6)
    --batch N          parts per Chrome process before a fresh one starts (default 3: a long process ran out of memory)
    --no-join          render only; do not join the clips
    --no-chunks        do not split the joined video into pieces for sending
    --chunk-mb MB      largest piece for sending (default 30, the phone limit)
    --allow-missing    join even if some parts have no clip yet
    --dry-run          show what would be rendered, render nothing
    --chrome PATH      Google Chrome to use (also CHROME_PATH)

Only the Python standard library is used here. The first run creates .venv in the project root and installs
playwright and imageio-ffmpeg into it (internet needed once); Playwright drives the installed Google Chrome.
Each video folder keeps its own render.py: this file only calls its info, clip, join and chunks commands, so a
video is always rebuilt by the same code that made it.
"""
import argparse
import hashlib
import json
import os
import queue
import re
import shutil
import subprocess
import sys
import threading
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
# from a git worktree under .claude, the project root and the out folders are in the main checkout
ROOT = next((p.parent for p in HERE.parents if p.name == ".claude"), HERE)
VENV = ROOT / ".venv"
VPY = VENV / ("Scripts/python.exe" if os.name == "nt" else "bin/python")
PACKAGES = ["playwright", "imageio-ffmpeg"]
CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser",
]

for s in (sys.stdout, sys.stderr):
    try:
        s.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass


def say(*a):
    print(*a, flush=True)


def stop(msg):
    say("\n*** " + msg)
    sys.exit(1)


# ---------------------------------------------------------------- environment

def find_chrome(given=None):
    for c in [given, os.environ.get("CHROME_PATH")] + CHROME_CANDIDATES:
        if c and Path(c).is_file():
            return str(Path(c))
    for name in ("chrome", "google-chrome", "chromium"):
        if shutil.which(name):
            return shutil.which(name)
    return None


def ensure_venv():
    if not VPY.exists():
        say(f"Creating the Python environment {VENV} (once) ...")
        subprocess.check_call([sys.executable, "-m", "venv", str(VENV)])
    ok = subprocess.run([str(VPY), "-c", "import playwright, imageio_ffmpeg"], capture_output=True).returncode == 0
    if not ok:
        say("Installing " + " and ".join(PACKAGES) + " into .venv (once, needs internet) ...")
        subprocess.check_call([str(VPY), "-m", "pip", "install", "--disable-pip-version-check", "-q", *PACKAGES])
    return True


def free_gb():
    try:
        if os.name == "nt":
            import ctypes

            class MS(ctypes.Structure):
                _fields_ = [("len", ctypes.c_ulong), ("load", ctypes.c_ulong)] + [(n, ctypes.c_ulonglong) for n in
                                                                                  ("total", "avail", "tp", "ap", "tv", "av", "ae")]
            m = MS(); m.len = ctypes.sizeof(MS)
            return m.avail / 2**30 if ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(m)) else None
        for line in open("/proc/meminfo"):
            if line.startswith("MemAvailable:"):
                return int(line.split()[1]) / 2**20
    except Exception:
        return None


def check(chrome_arg=None, quiet=False):
    problems = []
    if sys.version_info < (3, 8):
        problems.append(f"Python 3.8 or newer is needed (this is {sys.version.split()[0]})")
    chrome = find_chrome(chrome_arg)
    if not chrome:
        problems.append("Google Chrome not found. Install it, or give its path with --chrome or CHROME_PATH")
    if not (ROOT / "science-video-template" / "fonts").is_dir():
        problems.append("science-video-template/fonts is missing (the Hind Siliguri fonts): is this the project root?")
    if problems:
        for p in problems:
            say("PROBLEM:", p)
        stop("Fix the problems above, then run again.")
    ensure_venv()
    if not quiet:
        mem = free_gb()
        say(f"Python {sys.version.split()[0]}, .venv ok ({VPY})")
        say(f"Chrome: {chrome}")
        say(f"CPU threads: {os.cpu_count()}, free memory: {mem:.1f} GB" if mem else f"CPU threads: {os.cpu_count()}")
    return chrome


# ---------------------------------------------------------------- videos and parts

def videos():
    return sorted(p.parent for p in ROOT.glob("*/render.py")
                  if (p.parent / "index.html").exists() and p.parent.name != "science-video-template")


def out_dir(folder):
    return folder / "out"


def has_mode(folder, mode):
    return f'"{mode}"' in (folder / "render.py").read_text(encoding="utf-8", errors="replace")


def run_render(folder, args, chrome, log=None):
    env = {**os.environ, "PYTHONIOENCODING": "utf-8", "CHROME_PATH": chrome}
    return subprocess.run([str(VPY), "-X", "utf8", "render.py", *args], cwd=folder, env=env,
                          stdout=log or subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding="utf-8", errors="replace")


def part_info(folder, chrome):
    r = run_render(folder, ["info"], chrome)
    f = out_dir(folder) / "info.json"
    if r.returncode != 0 or not f.exists():
        say(r.stdout[-3000:] if r.stdout else "")
        stop(f"render.py info failed in {folder.name}")
    return json.load(open(f, encoding="utf-8"))


# "--changed" compares the contents of the code, not file times (git sets new times on every checkout):
# after each clip is rendered, a fingerprint of its part file and of the shared code is kept in out/make-state.json.

def _digest(files):
    h = hashlib.sha256()
    for f in sorted(files):
        h.update(str(f.relative_to(ROOT)).replace("\\", "/").encode())
        h.update(f.read_bytes().replace(b"\r\n", b"\n"))
    return h.hexdigest()[:16]


def shared_digest(folder):
    """The code every part of the video uses: the page, stage, world, zones, drawings and the shared template."""
    return _digest([*folder.glob("*.js"), *folder.glob("*.html"), *(ROOT / "science-video-template").rglob("*.js")])


def part_digest(folder, name, shared):
    src = folder / "parts" / f"{name}.js"
    return shared + ":" + (_digest([src]) if src.exists() else "-")


def load_state(folder):
    f = out_dir(folder) / "make-state.json"
    return json.load(open(f, encoding="utf-8")) if f.exists() else {}


def save_state(folder, state):
    out_dir(folder).mkdir(exist_ok=True)
    json.dump(state, open(out_dir(folder) / "make-state.json", "w", encoding="utf-8"), indent=1, sort_keys=True)


def stale(folder, part, shared, state):
    mp4 = out_dir(folder) / f"{part['name']}.mp4"
    return not mp4.exists() or state.get(part["name"]) != part_digest(folder, part["name"], shared)


def length(part):
    return float(part.get("dur") or 0)


def scene_of(part):
    """The scene number: from info.json, or from the part name (s05_p03 is scene 5) where info has none."""
    if str(part.get("scene", "")).isdigit():
        return int(part["scene"])
    m = re.match(r"s(\d+)_", part["name"])
    return int(m.group(1)) if m else -1


# ---------------------------------------------------------------- rendering

def wrote_names(text, names):
    """The parts that render.py reports as written ("wrote s05_p03.mp4 ..." or "wrote <path>\\s05_p03.mp4 ...")."""
    lines = [l for l in text.splitlines() if l.startswith("wrote ")]
    return [n for n in names if any(re.search(r"(^|[\\/ ])" + re.escape(n) + r"\.mp4\b", l[6:]) for l in lines)]


def render(folder, todo, chrome, workers, batch):
    """Render parts in batches; every batch is a fresh render.py process (a fresh Chrome)."""
    todo = sorted(todo, key=length, reverse=True)          # longest first, so the end is not one long part alone
    jobs = queue.Queue()
    for i in range(0, len(todo), batch):
        jobs.put([p["name"] for p in todo[i:i + batch]])
    out = out_dir(folder); out.mkdir(exist_ok=True)
    done, failed, lock = [], [], threading.Lock()
    t0 = time.time()

    def worker(k):
        while True:
            try:
                names = jobs.get_nowait()
            except queue.Empty:
                return
            logf = out / f"make-{k}.log"
            with open(logf, "a", encoding="utf-8") as log:
                log.write(f"\n=== clip {' '.join(names)}\n"); log.flush()
                r = run_render(folder, ["clip", *names], chrome, log)
            text = logf.read_text(encoding="utf-8", errors="replace").rsplit("=== clip", 1)[-1]
            wrote = wrote_names(text, names)
            bad = [n for n in names if n not in wrote]
            with lock:
                done.extend(wrote)
                if "PAGE ERRORS" in text:
                    say(f"  note: page errors while rendering {' '.join(names)} (see {logf.name})")
                if bad:
                    failed.extend(bad)
                    say(f"  FAILED: {' '.join(bad)} (see out/{logf.name})")
                m = (time.time() - t0) / 60
                say(f"  {len(done)}/{len(todo)} parts done, {m:.0f} min")

    threads = [threading.Thread(target=worker, args=(k + 1,)) for k in range(workers)]
    for th in threads:
        th.start()
    for th in threads:
        th.join()
    if failed:   # a part can fail when it is the first in a fresh page: try each failed part once more, alone
        say(f"Trying the {len(failed)} failed part(s) once more, one at a time ...")
        again = []
        for n in failed:
            logf = out / "make-retry.log"
            with open(logf, "a", encoding="utf-8") as log:
                log.write(f"\n=== clip {n}\n"); log.flush()
                run_render(folder, ["clip", n], chrome, log)
            text = logf.read_text(encoding="utf-8", errors="replace").rsplit("=== clip", 1)[-1]
            (done if wrote_names(text, [n]) else again).append(n)
        failed = again
    return done, failed, time.time() - t0


# ---------------------------------------------------------------- main

def choose_video():
    vs = videos()
    say("Videos in this project:")
    for i, v in enumerate(vs, 1):
        say(f"  {i}. {v.name}")
    try:
        a = input("Number of the video to render (Enter to stop): ").strip()
    except EOFError:
        a = ""
    if not a:
        sys.exit(0)
    if not a.isdigit() or not 1 <= int(a) <= len(vs):
        stop(f"No video number {a}.")
    return vs[int(a) - 1]


def main():
    ap = argparse.ArgumentParser(description="Regenerate a video from its code.", formatter_class=argparse.RawDescriptionHelpFormatter,
                                 epilog=__doc__.split("Options:")[0])
    ap.add_argument("video", nargs="?", help="video folder, e.g. class6-ch10-goti-2")
    ap.add_argument("--parts", nargs="+", default=[], help="part names, e.g. s05_p03")
    ap.add_argument("--scenes", nargs="+", type=int, default=[], help="scene numbers, e.g. 5 7")
    ap.add_argument("--changed", action="store_true", help="only parts whose clip is missing or whose code changed since it was rendered")
    ap.add_argument("--mark-done", action="store_true", help="record the existing clips as up to date, render nothing")
    ap.add_argument("--workers", type=int, default=0)
    ap.add_argument("--batch", type=int, default=3)
    ap.add_argument("--no-join", action="store_true")
    ap.add_argument("--no-chunks", action="store_true")
    ap.add_argument("--chunk-mb", type=float, default=30.0)
    ap.add_argument("--allow-missing", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--chrome")
    ap.add_argument("--list", action="store_true", help="list the videos (and the parts of the given video)")
    ap.add_argument("--check", action="store_true", help="check the environment only")
    a = ap.parse_args()

    if a.list and not a.video:
        for v in videos():
            say(v.name)
        return
    chrome = check(a.chrome, quiet=False)
    if a.check:
        say("Everything needed is there.")
        return

    folder = (ROOT / a.video).resolve() if a.video else choose_video()
    if not (folder / "render.py").exists():
        stop(f"{a.video} is not a video folder (no render.py). Use --list to see the videos.")
    say(f"\nVideo: {folder.name}")
    info = part_info(folder, chrome)
    total = sum(length(p) for p in info)
    say(f"{len(info)} parts, {int(total // 60)} min {round(total % 60)} s")
    if a.list:
        for p in info:
            say(f"  {p['name']}  {p.get('label', ''):6} {length(p):5.1f} s  {p.get('title', '')}")
        return

    names = {p["name"] for p in info}
    unknown = [n for n in a.parts if n not in names]
    if unknown:
        stop("Unknown parts: " + " ".join(unknown) + ". Use --list with the video to see its parts.")
    todo = [p for p in info
            if (not a.parts and not a.scenes) or p["name"] in a.parts or scene_of(p) in a.scenes]
    shared, state = shared_digest(folder), load_state(folder)
    if a.mark_done:
        have = [p["name"] for p in todo if (out_dir(folder) / f"{p['name']}.mp4").exists()]
        state.update({n: part_digest(folder, n, shared) for n in have})
        save_state(folder, state)
        say(f"Recorded {len(have)} existing clip(s) as made from the code as it is now; --changed will skip them.")
        return
    if a.changed:
        todo = [p for p in todo if stale(folder, p, shared, state)]
    secs = sum(length(p) for p in todo)
    mem = free_gb()
    workers = a.workers or max(1, min(6, (os.cpu_count() or 2) // 2, int(mem) if mem else 6))
    workers = max(1, min(workers, -(-len(todo) // a.batch) or 1))
    say(f"To render: {len(todo)} part(s), {round(secs)} s of video, {workers} at a time, {a.batch} per Chrome process")
    if todo and len(todo) <= 12:
        say("  " + " ".join(p["name"] for p in todo))
    if a.dry_run:
        return

    if todo:
        say("Rendering (a 10-minute video takes about 30 minutes on one worker; keep the PC awake and plugged in) ...")
        done, failed, took = render(folder, todo, chrome, workers, a.batch)
        state = load_state(folder)
        state.update({n: part_digest(folder, n, shared) for n in done})
        save_state(folder, state)
        say(f"Rendered {len(done)} part(s) in {took / 60:.1f} min.")
        if failed:
            stop("Not rendered: " + " ".join(failed) + f". Look in {folder.name}\\out\\make-*.log, fix, and run again "
                 f"with --parts {' '.join(failed)}")
    else:
        say("Nothing to render: every selected clip is up to date with its code.")

    if a.no_join:
        return
    missing = [p["name"] for p in info if not (out_dir(folder) / f"{p['name']}.mp4").exists()]
    if missing and not a.allow_missing:
        stop(f"{len(missing)} part(s) have no clip yet, so the video was not joined: " + " ".join(missing) +
             f"\nRender them with: python make_video.py {folder.name} --changed   (or join anyway with --allow-missing)")
    r = run_render(folder, ["join"], chrome)
    say(r.stdout.strip()[-500:])
    if r.returncode != 0:
        stop("join failed")
    if not a.no_chunks and has_mode(folder, "chunks"):
        r = run_render(folder, ["chunks", str(a.chunk_mb)], chrome)
        say(r.stdout.strip()[-800:])
        if r.returncode != 0:
            stop("chunks failed")
    out = out_dir(folder)
    say(f"\nDone.\n  Video:     {out / 'video.mp4'}\n  Captions:  {out / 'video.srt'}")
    if (out / "parts-list.md").exists():
        say(f"  Parts:     {out / 'parts-list.md'}")
    if (out / "send").is_dir():
        say(f"  To send:   {out / 'send'}  (pieces of at most {a.chunk_mb:g} MB, join with join-list.txt)")


if __name__ == "__main__":
    main()
