# বিজ্ঞান ভিডিও সিরিজ (ষষ্ঠ শ্রেণি, NCTB)

Animated Bangla videos for class six science. Each video turns the figures and activities of one textbook chapter into motion. The video has no voice: the narration appears as captions, and the voice is recorded later, part by part.

This repository holds the instructions, scripts and source code, so that any computer can read the same instructions and rebuild the same videos. The rendered videos, the textbook PDF and the Python environment are not in git (see [What is not in git](#what-is-not-in-git)).

## Read first

| File | What it is |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Project facts: setup on each computer, the reference build and its commands, the chapter tables. At its end it imports the skill's `SKILL.md` and every rule file, so Claude Code reads them all |
| [`.claude/skills/science-video/`](.claude/skills/science-video/) | The skill `science-video`: [`SKILL.md`](.claude/skills/science-video/SKILL.md) (the stages of the work, the approval points, how to change a rule), [`rules/`](.claude/skills/science-video/rules/) (the rules for every video, one topic per file, each with its lessons table), [`templates/`](.claude/skills/science-video/templates/) (brief, plan, delivery note) and `bundle.py` (one Markdown file or a zip for use outside this project). The only copy of the rules |
| Online copy | Claude Doc "বিজ্ঞান ভিডিও সিরিজ: নির্দেশনা ও CLAUDE.md": https://claude.ai/artifact/SbedAWR74MootFgSQL74QL (one tab per file: `CLAUDE.md`, `SKILL.md`, and under it one sub-tab per rule file) |

A rule is changed only in its rule file (and its doc tab), as "Changing a rule" in `SKILL.md` describes; a project fact only in `CLAUDE.md` or this README (and the doc tab).

## Computers

| | Other laptop | Home PC |
|---|---|---|
| Project root | `D:\Personal\Self-Study\education\education` | `D:\Projects\AI-educational-video\education` |
| Textbooks | `Science_compressed.pdf` in the root | `C:\Users\H M Shahriar\Downloads\books\` (class 6 science is `Science_compressed-6.pdf`; also class 7, class 8 and class 9-10) |
| Used for | Chapters 10 and 11 | Chapter 9, review and backup |

Both are clones of this repository. Pull `main` before starting, work on a branch, and merge through a pull request, so the two computers do not change the same file at once.

## Videos

| Folder | Video | Lessons | Parts | Length | Status |
|---|---|---|---|---|---|
| [`class6-ch09-alo/`](class6-ch09-alo/) | আলো কী ও কীভাবে চলে | অধ্যায় ৯, পাঠ ১-২ | 31 | 9:31 | Partly rendered: 20 of 31 parts (stopped at `s06_p04`). Older 2D build, see below |
| [`class6-ch10-goti-1/`](class6-ch10-goti-1/) | স্থিতি ও গতি কী | অধ্যায় ১০, পাঠ ১-২ | 32 | 9:36 | Finished |
| [`class6-ch10-goti-2/`](class6-ch10-goti-2/) | নানা প্রকার গতি | অধ্যায় ১০, পাঠ ৩-৮ | 34 | 9:55 | Finished |
| [`class6-ch10-goti-3/`](class6-ch10-goti-3/) | দূরত্ব ও সরণ, দ্রুতি ও বেগ | অধ্যায় ১০, পাঠ ৯-১২ | 30 | 9:21 | Finished |
| [`class6-ch11-bol-1/`](class6-ch11-bol-1/) | বল ও সরল যন্ত্র কী | অধ্যায় ১১, পাঠ ১-৩ | 35 | 9:49 | Finished |
| [`class6-ch11-bol-2/`](class6-ch11-bol-2/) | লিভার, হেলানো তল, কপিকল ও মানবদেহ | অধ্যায় ১১, পাঠ ৪-১২ | 36 | 11:25 | Finished |
| [`class6-ch09-alo-1/`](class6-ch09-alo-1/) | আলো কীভাবে চলে ও আমরা কীভাবে দেখি | অধ্যায় ৯, পাঠ ১-৩ | 32 | 9:29 | Finished; replaces `class6-ch09-alo/`. Chapter 9 video 2 (পাঠ ৪-১০) goes in `class6-ch09-alo-2/` |

New videos start from a copy of the latest finished 3D video folder (see "Reference build" in `CLAUDE.md`).

Each video folder contains:

| Path | What it is |
|---|---|
| `plan.md` | The approved plan: scenes, parts, table of textbook figures, physics, approved changes from the book (video 2 on) |
| `script.md` | The full script with every part's on-screen text and narration. Generated from the parts by `render.py script`; do not edit by hand |
| `parts/sNN_pMM.js` | One file per part: its narration segments and its draw function. The narration lives only here |
| `index.html`, `stage.js`, `world3d.js`, `draw2d.js` | The page, the part registry and overlay helpers, the three.js world (in metres), and the 2D drawings |
| `render.py` | Renders and joins the clips (commands below) |
| `out/parts-list.md`, `out/video.srt`, `out/delivery-note.md` | Parts list with start times, captions, and the delivery note (physics used, changes from the book, checks done) |

From video 3 on, new places live in their own files next to `world3d.js` (`zones3.js`, `zones11.js`).

`class6-ch09-alo/` is the older build of the light video and works differently: 2D only (SVG drawings, no three.js), using `science-video-template/core.js` and `parts.js`; the narration is in `narration.json` (`gen.py` turns it into `narration.js`), the part notes in `parts_meta.json`, and `deliver.py` writes the script, captions and parts list. Its commands are at the end of [`class6-ch09-alo/out/delivery-note.md`](class6-ch09-alo/out/delivery-note.md). Do not copy it for a new video.

[`science-video-template/`](science-video-template/) holds the shared fonts (Hind Siliguri), `lib/three.min.js` and `core.js` (used by `class6-ch09-alo/`). Its scene files `s1.js` to `s9.js` are the first, nine-scene build of the light video, and its `render.py` is the old per-scene one: do not use them for new videos.

[`science-video-template/hand/`](science-video-template/hand/) is the hand that holds the pen: a 3D model of a right hand built from real bone lengths, with one smooth skin, fitted to a photo of a real writing hand (12 measured points and the photo's whole outline), and rendered once to `hand_side.png`. Every video uses that picture through `handPen` and `handWrite` in `draw2d.js`. The first version is kept in [`hand_v1/`](science-video-template/hand_v1/).

| File | What it does |
|---|---|
| `hand3d.js` | Skeleton: palm, four fingers, thumb, forearm, sleeve; bone lengths and proportions |
| `skin.js` | One smooth skin over the skeleton, knuckles, crease shading, nails |
| `fit.js` | Fits camera, joint angles, proportions and the pen to the photo; keeps the grip correct |
| `pose.js`, `fit_pose.js` | The pose and views; `fit_pose.js` is written by the fit |
| `solve.js` | Older helper: finger angles for a given pen line |
| `make_hand.py` | Runs the fit and renders the picture |
| `make_grip.py` | The hand closed round a rod (same bones and skin), rendered to `hand_grip.png` and `grip.json`; used in chapter 11 through `handGrip` in `zones11.js` |
| `make_pose.py` | Open hands: `hand_push.png` (palm flat, pushing) and `hand_point.png` (index finger pressing), with their anchors in `poses.json` |

To fit to a photo (the photo is only read, never stored in the project) and render:

```bash
.venv\Scripts\python.exe -X utf8 science-video-template\hand\make_hand.py fit path\to\photo.jpg
```

```bash
.venv\Scripts\python.exe -X utf8 science-video-template\hand\make_hand.py
```

Then copy the numbers in `hand.json` (pen tip, angle, `penPx`) into `HAND_IMG` in each video's `draw2d.js`.

## Setting up on a new computer

1. Clone the repository.
2. Get the class six science book (the NCTB PDF, 139 pages, scanned). On the other laptop it is `Science_compressed.pdf` in the root; on the home PC it stays in `C:\Users\H M Shahriar\Downloads\books\`. It is only needed for reading the chapters, not for rendering. Add the new computer's paths to the table in `CLAUDE.md`.
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
