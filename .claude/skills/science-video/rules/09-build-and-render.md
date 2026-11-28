# 9. Building and rendering

Read at: stage 4 (building), stage 6 (rendering and joining). The files of the reference build and the `render.py` commands are listed in CLAUDE.md ("Reference build") and README.md ("Rendering").

## Build the video in small parts

- Split every scene into short parts (shots) of roughly 10 to 30 seconds, each showing one idea. A part that grows past 30 seconds is split in two.
- Each part is its own source file and its own rendered clip, named by scene and part: `s03_p02.mp4`. All clips use identical size, frame rate and encoder settings.
- The full video is made by joining the clips without re-encoding.
- When I ask for a change, change and re-render only the affected part, then re-join. Never rebuild the whole video for a local change.
- Keep a parts list (scene, part, start time, length, one-line description, file name) and deliver it with the video, so I can point to a part by its name.
- Captions and narration are also split by part, so I can record and re-record voice part by part.

## How to build it

- If `science-video-template.zip` is attached (in a chat outside this project), reuse `core.js` (captions, timing, term cards, banners, rays) and the styles in `index.html`. Its scene files are the old video 1 and show the look only; they do not follow the rules on parts, side views, realism or textbook level, so do not copy their content or structure.
- If it is not attached, build the same thing: an HTML page with an SVG layer for drawings and an HTML layer for text, a function that draws any frame of any part, and a script that screenshots each frame with headless Chrome and pipes them to ffmpeg.
- In this project, start from the reference build described under "Project setup" in CLAUDE.md: a copy of the latest finished 3D video folder.
- One source file and one MP4 per part. Join with ffmpeg's concat demuxer and `-c copy`.
- Drive all timing from the captions: each part is a list of caption segments, each segment's length is calculated from its word count, and every animation is keyed to a segment. This lets you refit a part to my recorded voice by changing only its segment durations.
- Everything with real objects or places is 3D (three.js on a canvas under the SVG and caption layers), built in metres; 3D is always preferred. Only diagrams, term cards, title, recap and question cards, and space scenes stay 2D.
- New places and objects go into their own zone files next to `world3d.js` (`zones3.js`, `zones9.js`, `zones11.js` ...), placed far along x, called by hooks in `world3d.js`.
- Keep the narration only in the part files and generate the script's scene section from them, so the script and the video never disagree. After changing narration, run `render.py script` so script.md follows.
- A part's draw function times its animation by segment index (`S.A(i)`, `S.P(i, a, b)`, `S.on(i)`). Add a new sentence at the end of a part, or shift every index in that part; check that anything shown "until the end" uses `t >= S.A(i)` rather than `S.on(i)`.
- A part must not ask for a scene object before the first `W3.frame` has built the world.
- Before the full render, look at 2 to 4 still frames of every part; after joining, look at one frame per part taken near its end (see 10-checks-and-delivery.md).

## Rendering

- A full render of a 10-minute video takes about 30 minutes of machine time.
- Never one long background render of every part in one process: it was stopped twice when memory ran low (chapter 10 video 3, chapter 11 video 1). Render a few parts (about 3) per `render.py clip` call, each call a fresh process, in the foreground.
- From `class6-ch09-alo-1\` on, `render.py parallel` runs several such fresh `clip` processes at once (about 1 GB of free memory per worker; `RENDER_WORKERS` or a number sets how many), and `render-all.bat` does setup, render, join, chunks, commit, push and pull request in one click.

## Lessons (do not repeat)

| What was wrong | Rule for every video |
|---|---|
| (Video 1) The video was built as nine long scenes. | Small parts of 10 to 30 seconds, each a separate clip. |
| (Chapter 10 video 3, chapter 11 video 1) A background render was stopped for low memory; one part failed when it was the first in a fresh page. | Render in the foreground, 3 parts per batch, each batch a fresh process (or `render.py parallel`). A part must not ask for a scene object before the first `W3.frame` has built the world. |
