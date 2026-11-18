# বিজ্ঞান ভিডিও সিরিজ (ষষ্ঠ শ্রেণি, NCTB)

Animated Bangla videos for class six science. Each video turns the figures and activities of one textbook chapter into motion. The video has no voice: the narration appears as captions, and the voice is recorded later, part by part.

This repository holds the instructions, scripts and source code, so that any computer can read the same instructions and rebuild the same videos. The rendered videos, the textbook PDF and the Python environment are not in git (see [What is not in git](#what-is-not-in-git)).

## Read first

| File | What it is |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Project instructions: setup on each computer, the reference build, chapter tables, lessons learned, and the general rules (from the `---` line on) |
| [`science-video-instructions.md`](science-video-instructions.md) | The general rules for every episode (structure, visual rules, physics, checklist), portable to any project |
| Online copy | Claude Doc "বিজ্ঞান ভিডিও সিরিজ: নির্দেশনা ও CLAUDE.md": https://claude.ai/artifact/SbedAWR74MootFgSQL74QL (tab 1 = `CLAUDE.md` down to the `---` line, tab 2 = `science-video-instructions.md`) |

Keep the three in step: a rule changed in one is changed in the others.

## Videos

| Folder | Video | Lessons | Parts | Length | Status |
|---|---|---|---|---|---|
| [`class6-ch10-goti-1/`](class6-ch10-goti-1/) | স্থিতি ও গতি কী | অধ্যায় ১০, পাঠ ১-২ | 32 | 9:36 | Finished |
| [`class6-ch10-goti-2/`](class6-ch10-goti-2/) | নানা প্রকার গতি | অধ্যায় ১০, পাঠ ৩-৮ | 34 | 9:55 | Finished |
| `class6-ch10-goti-3/` | দূরত্ব ও সরণ, দ্রুতি ও বেগ | অধ্যায় ১০, পাঠ ৯-১০ | | | Not started: copy `class6-ch10-goti-2/` |

Each video folder contains:

| Path | What it is |
|---|---|
| `plan.md` | The approved plan: scenes, parts, table of textbook figures, physics, approved changes from the book (video 2 on) |
| `script.md` | The full script with every part's on-screen text and narration. Generated from the parts by `render.py script`; do not edit by hand |
| `parts/sNN_pMM.js` | One file per part: its narration segments and its draw function. The narration lives only here |
| `index.html`, `stage.js`, `world3d.js`, `draw2d.js` | The page, the part registry and overlay helpers, the three.js world (in metres), and the 2D drawings |
| `render.py` | Renders and joins the clips (commands below) |
| `out/parts-list.md`, `out/video.srt`, `out/delivery-note.md` | Parts list with start times, captions, and the delivery note (physics used, changes from the book, checks done) |

[`science-video-template/`](science-video-template/) holds the shared fonts (Hind Siliguri), `lib/three.min.js` and the old `core.js`. Its `render.py` is the old per-scene one: do not use it.

## Setting up on a new computer

1. Clone the repository.
2. Put the class six science book in the root as `Science_compressed.pdf` (the NCTB PDF, 139 pages, scanned). It is only needed for reading the chapters, not for rendering.
3. Install Google Chrome and Python 3.
4. Create the Python environment in the root (it stays inside the project; nothing is installed system-wide):

   ```bash
   python -m venv .venv
   ```

   ```bash
   .venv\Scripts\python.exe -m pip install playwright imageio-ffmpeg
   ```

   `imageio-ffmpeg` brings its own ffmpeg with libx264. Playwright drives the installed Google Chrome, so `playwright install` is not needed.

## Rendering

Run every command from inside a video folder:

```bash
cd class6-ch10-goti-2
```

| Command | What it does |
|---|---|
| `..\.venv\Scripts\python.exe -X utf8 render.py info` | Length of every part |
| `..\.venv\Scripts\python.exe -X utf8 render.py stills s05_p03 2 8 14` | Check frames of one part at the given seconds |
| `..\.venv\Scripts\python.exe -X utf8 render.py phone s05_p03:4 s07_p01:9` | Frames shrunk to phone size (640x360), tiled into `out\phone.png`. Every word must be readable |
| `..\.venv\Scripts\python.exe -X utf8 render.py clip s05_p03` | Render one part to `out\s05_p03.mp4` (`clip all` renders every part, about 30 minutes: run it in the background) |
| `..\.venv\Scripts\python.exe -X utf8 render.py join` | Join the clips without re-encoding into `out\video.mp4`, and write `out\video.srt` and `out\parts-list.md` |
| `..\.venv\Scripts\python.exe -X utf8 render.py script` | Rewrite the scenes of `script.md` from the parts (after any narration change) |
| `..\.venv\Scripts\python.exe -X utf8 render.py chunks` | Split the joined video at part boundaries into pieces of at most 30 MB in `out\send\`, for sending to a phone |

After a change to one part, render only that part and run `join` again.

## What is not in git

[`.gitignore`](.gitignore) keeps these out, because they are large or can be made again:

| Left out | How to get it back |
|---|---|
| `*.mp4` (every clip and joined video, about 450 MB) | `render.py clip all`, then `join` |
| `*.pdf` (the textbook) | Download it again (step 2 above) |
| `*.zip` | Old copies of the project; not needed |
| `.venv/` | Step 4 above |
| `out/send/`, `out/*.png`, `out/*.jpg`, `out/*.log`, `out/info.json`, `out/list.txt` | Made again by `render.py` |

Everything else, including the `.srt` captions, the parts lists and the delivery notes, stays in git.
