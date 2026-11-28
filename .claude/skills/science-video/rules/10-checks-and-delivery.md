# 10. Checks and delivery

Read at: stage 5 (checking before the full render), stage 6 (rendering, delivery note, sending).

## Checks that must be repeated every video

These caught problems before and must be done every time:

1. Stills of every part before the full render: 2 to 4 frames per part, tiled into one sheet (`render.py stills`).
2. A close look at every sign, shop and labelled object, and at every real object by itself.
3. A phone-size sheet (`render.py phone`, 640x360 per frame) in which every word must be readable, the chip included.
4. After joining, one frame per part taken from the joined video near the end of each part.

## Checklist before sending

- [ ] Every figure and activity of the topic in the textbook is animated, or its omission was approved.
- [ ] Nothing is taught that is beyond the textbook for this class, unless approved.
- [ ] Every angle, path, speed and force is calculated, and on-screen numbers agree with the motion.
- [ ] Light direction, shadows and lit sides agree in every frame; day and night sides are correct in space scenes.
- [ ] Every real object looks like the real thing.
- [ ] Experiments and set-ups are shown from the side, matching the textbook figure.
- [ ] No complete living creature, face, silhouette, tree, plant or crop field appears.
- [ ] Every hand does an action that is shown, is a 3D mesh at true scale, and a person's two hands are a right hand and its mirror image.
- [ ] The video is made of separate parts of 10 to 30 seconds, and the parts list is included.
- [ ] Bangla text renders correctly, and captions do not cover anything important.
- [ ] Title, chip and term cards follow the fixed format.
- [ ] Every "who sees what" is filmed from that person's eyes, after one outside view of who is where.
- [ ] Every moving thing stays in view for its whole sentence, including near the end of each part.
- [ ] Every change from the textbook (a person moved, an object replaced or left out) is listed in the delivery note and was approved.
- [ ] Every word on screen is readable in frames shrunk to phone size (640x360), the chip included.
- [ ] Every sign, shop and labelled object shows what it says (a fruit shop shows fruit).

## What to deliver

1. The script as a doc: a details table (title, textbook reference, length, narration style, visual rule), the table of textbook figures and where each is animated, then every scene and part with an "On screen" paragraph and the Bangla narration, then recording notes and a glossary (Bangla term, English, first used in which part).
2. The full video as one MP4, and the separate clip for every part.
3. The parts list (scene, part, start time, length, description, file name).
4. An `.srt` file with every caption and its timing.
5. A short note with: the physics calculations used, anything you could not verify against the textbook, and which parts you checked frame by frame (template: `templates/delivery-note.md`).

## Sending video to me

- Files over 30 MB cannot be sent to my phone or the web. When a video is bigger, run `render.py chunks` (cap 30 MB, set by me on 2026-11-17): it groups whole parts, in order, into `out\send\video_1_of_N.mp4` ... of at most 30 MB each (joined with `-c copy`, so nothing is re-encoded) plus `join-list.txt`. Send those pieces; I join them myself. Cut only between parts, never inside one.
