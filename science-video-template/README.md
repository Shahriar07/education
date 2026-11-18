# Science video template

Source of video 1 (ষষ্ঠ শ্রেণি, আলো কী ও কীভাবে চলে). Reuse for new topics.

- `core.js`: shared helpers (captions, timing, term cards, banners, rays, sun, eye, etc.). Keep unchanged.
- `index.html`: page, styles and font loading. Change only the list of scene scripts and the chip text in `core.js` (`renderScene`).
- `s1.js` ... `s9.js`: one file per scene. Replace with new scenes for a new topic.
- `render.py`: needs Python Playwright, Google Chrome and ffmpeg.
  - `python3 render.py info` prints scene lengths.
  - `python3 render.py stills <scene> <count>` saves check frames to `out/`.
  - `python3 render.py video <scene>` renders `out/scene<N>.mp4`.
  - Join with: `ffmpeg -f concat -safe 0 -i list.txt -c copy video.mp4`
- `fonts/`: Hind Siliguri (SIL Open Font License).
