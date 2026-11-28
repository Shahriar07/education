# 7. Screen style: size, colours, text, cards (same in every episode)

Read at: stage 4 (building), stage 5 (the phone-size check).

- 1920x1080, 30 fps, MP4 (H.264). Font: Hind Siliguri for all Bangla text.
- Voice is recorded by me afterwards. Render the video without audio, with the full narration shown as captions at the bottom.
- Colours: navy `#0f1b3d` for explanation backgrounds, yellow `#FFC83D` as the accent and for light or energy, dark ink `#1a1a2e` for text on yellow. Everyday scenes use warm, natural colours.
- Persistent chip at the top left: "শ্রেণি · বিষয় · অধ্যায় নম্বর", 42 px bold, with the chapter number in its own yellow `<span class="cn">` and a clear gap after অধ্যায়.
- Text size: nothing below 40 px in the 1920x1080 frame, labels bold. Most students watch on a phone, where the frame shrinks to about a third. Before the full render, look at frames shrunk to phone size (`render.py phone`).
- Caption bar: dark rounded bar at the bottom centre, white text, at most two lines, one or two sentences at a time. Nothing important is drawn behind it.
- Term card: yellow rounded card with a white border, large Bangla term and smaller English term, pops in and stays about 3 seconds.
- Banner: yellow pill for segment names ("নিজে করো", "আজ যা শিখলাম", "ভেবে বলো").
- Question card: white rounded card with navy text.
- Title card: navy background with slowly rotating faint rays, three chips (class, subject, chapter), the topic in very large type with the key word in yellow, a yellow line that draws itself under the title, then three numbered cards for "আজ যা জানব".
- Numbered steps and cases use a yellow circle with a Bangla numeral. Correct and wrong results use a green tick and a red cross.
- Each scene fades in and out through navy. Parts inside a scene cut directly.
- The caption bar, chip, cards and colours stay the same in 3D and 2D parts.

## Lessons (do not repeat)

| What was wrong | Rule for every video |
|---|---|
| (Motion video) On my phone the chip "অধ্যায় ১০" ran together: it was 34 px and semi-bold, the smallest text in the video, and on a phone it shrank to about 11 px. Some labels were 28 to 38 px. | No text below 40 px in the 1920x1080 frame, and bold for short labels. The chip is 42 px bold and its chapter number sits in its own yellow `<span class="cn">` with a gap after অধ্যায়. Before the full render, look at frames shrunk to phone size with `render.py phone`. |
