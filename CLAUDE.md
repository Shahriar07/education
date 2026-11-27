# CLAUDE.md: Bangla science video series

This is the project instruction file for Claude Code. Keep it in the project root. The rules below apply to every video in this project.

An online copy, readable and editable from any computer, is the Claude Doc "বিজ্ঞান ভিডিও সিরিজ: নির্দেশনা ও CLAUDE.md": https://claude.ai/artifact/SbedAWR74MootFgSQL74QL (tab 1 = this file, tab 2 = `science-video-instructions.md`, which this file imports at the end). Whenever you change either file, make the same change in the doc, and before starting work read the doc for edits the user made there and bring them into these files.

## Project setup on this computer

This project lives on two computers, each with a clone of the same git repository (GitHub `Shahriar07/education`). Check which one you are on before using a path. Pull `main` before starting work, and work on a branch with a pull request, so the two computers never edit the same file at once.

| | Other laptop | Home PC |
|---|---|---|
| Project root | `D:\Personal\Self-Study\education\education` (moved here from `C:\Users\h.m.shahriar\Downloads\goti` on 2026-11-18) | `D:\Projects\AI-educational-video\education` (cloned 2026-11-25) |
| Class six science book | `Science_compressed.pdf` in the root | `C:\Users\H M Shahriar\Downloads\books\Science_compressed-6.pdf` (the path contains spaces: always quote it). The same folder has the class 7, class 8 and class 9-10 books |
| Python environment | `.venv` in the root | Not created yet: follow "Setting up on a new computer" in `README.md` before the first render |
| Used for | Chapters 10 and 11 | Chapter 9 (the first videos), review and backup |

- `C:\Users\H M Shahriar\Downloads\books` on the home PC is where chapter 9 was first built (`class6-ch09-alo\`, using `template\`). Its source is now in this repository as `class6-ch09-alo\`. Read the textbooks there, but do not build in that folder.

- The book has 139 pages, about 38 MB, and no text layer: text extraction returns nothing. To read it, render the needed pages to images and look at them. Render only the pages of the chapter you need, not the whole book.
- PDF page numbers differ from printed page numbers. In the class six book, PDF page = printed page + 5 for chapters nine and ten. Check the offset again for other chapters and books.
- Before planning any video, read the whole chapter from the PDF, including the exercise pages, and build the table of figures and activities from what you actually see. Send me the brief of the textbook first, then the plan (see "How to work").
- On the other laptop the Read tool cannot render PDF pages (no poppler). What works: copy the PDF into a scratch folder under a non-.pdf name, serve the folder with `python -m http.server` on 127.0.0.1, and render the pages with pdf.js (cdnjs) in the built-in browser, then screenshot them. Navigating straight to a .pdf opens a save dialog for the user, so do not.
- Where videos are kept: never anywhere under a `.claude` folder (my rule, 2026-11-24: it would fill drive C). Every video goes in its own sub-directory of the project root (see the table above): `<video folder>\out\` (full video, clips, `send\`). When working in a git worktree under `.claude\worktrees\`, the rendered files still go to that folder; `render.py` from video 3 on does this by itself. Keep temporary pages, frames and PDF copies small and delete them when done. Never use one computer's path on the other. On any further computer, use the folder that holds this CLAUDE.md as the project root, and if it is not clear, ask me once and add a column to the table above.
- Layout: the shared template folder, then one folder per video with `parts/` (one source file per part, `s05_p03.js`), `out/` (clips, joined video, srt, parts list) and `script.md`.
- Rendering needs Python with Playwright, Google Chrome, ffmpeg, and the Hind Siliguri font files from the template. Do not install these system-wide. On each computer they are in `.venv` in the project root (`playwright` and `imageio-ffmpeg`, which carries an ffmpeg with libx264); Playwright drives the installed Google Chrome. Run everything as `..\.venv\Scripts\python.exe -X utf8 render.py ...` from the video folder. Check that these work before building, and tell me what is missing.
- The `render.py` inside the template is the old per-scene one from video 1 (Linux Chrome path). Do not use it.

### Reference build: `class6-ch10-goti-1\` (start every new video from a copy of the latest finished 3D video folder, by date; never from `class6-ch09-alo\`)

| File | What it is | Copy as is? |
|---|---|---|
| `index.html` | Page: canvas (3D) under SVG (drawings) under HTML (captions, cards); styles; the list of part scripts in play order | Yes; replace the part list |
| `stage.js` | Part registry `part(name, meta, segments, draw)`, frame renderer, and overlay helpers: `pin`, `lab`, `observer`, `placed`, `whoTag`, `arrow2`, `backArrows`, `readout`, `figTag`, `badge` | Yes; change `CHIP` |
| `world3d.js` | three.js world in metres: street with buildings, lamp posts, bus stop, lake; bus with interior; two cars, one with interior; railway station and train; village yard with tin house, kolshi, football; balcony. Camera presets: `third`, `ariyan`, `seat`, `carYou`, `platform`, `yard`, `flat`, and `mix` for camera flights | Yes; add new places as new zones far along x |
| `draw2d.js` | 2D drawings: study desk, book, khata, pen in hand, clock, Earth and Moon lit from one side, fan, swing, icons | Yes; add to it |
| `parts\sNN_pMM.js` | One file per part: `meta` (scene, label, title, `screen` = the On-screen text for the script, `first`/`last` for the navy fade), the narration segments, and the draw function | No; write new ones |
| `render.py` | `info` (part lengths), `stills <part> [t ...]` (check frames), `clip <part...>` or `clip all`, `join` (concat `-c copy`, video.srt, parts-list.md), `script` (rewrites the scene section of script.md from the parts), `phone <part:t ...>` (frames shrunk to phone size, tiled into out\phone.png), `chunks` (pieces to send) | Yes |

- The narration lives only in the part files. After changing narration, run `render.py script` so script.md follows.
- A part's draw function times its animation by segment index (`S.A(i)`, `S.P(i, a, b)`, `S.on(i)`). Add a new sentence at the end of a part, or shift every index in that part; check that anything shown "until the end" uses `t >= S.A(i)` rather than `S.on(i)`.
- A full render of a 10-minute video takes about 30 minutes; run it in the background.
- Sending video to me: files over 30 MB cannot be sent to my phone or the web. When a video is bigger, run `render.py chunks` (cap 30 MB, set by me on 2026-11-17): it groups whole parts, in order, into `out\send\video_1_of_N.mp4` ... of at most 30 MB each (joined with `-c copy`, so nothing is re-encoded) plus `join-list.txt`. Send those pieces; I join them myself. Cut only between parts, never inside one.

## Chapter index found so far (class six science)

| Chapter | Name | PDF pages |
|---|---|---|
| 9 | আলোর ঘটনা | 78 to 86 |
| 10 | গতি | 87 to 97 |
| 11 | বল ও সরল যন্ত্র | starts at 98 |

### Chapter 9, আলোর ঘটনা: lessons and figures

| Lesson | Content | Figures and activities |
|---|---|---|
| পাঠ ১-২: আলো কীভাবে চলে | Light is energy; about 3 lakh km per second; travels in straight lines; আলোকরশ্মি | চিত্র ৯.১: three cards with holes and a candle, seen from the side on a table |
| পাঠ ৩: আমরা কীভাবে দেখি | We see an object when light from it reaches the eye; উজ্জ্বল and অনুজ্জ্বল বস্তু; black objects absorb light | চিত্র ৯.২: bulb, cricket ball, eye. চিত্র ৯.৩: shoebox with a pebble and two holes |
| পাঠ ৪-৫: আলোর প্রতিফলন ও শোষণ | প্রতিফলন, শোষণ, আপতন; নিয়মিত and বিক্ষিপ্ত (ব্যাপ্ত) প্রতিফলন; smoother surfaces reflect more | চিত্র ৯.৪ (ক, খ): torch on a smooth and a rough surface. Activity: torch on mirror, wood, paper, steel plate, plastic plate |
| পাঠ ৬-৭: দর্পণে আলোর প্রতিফলনের নিয়ম | Ball thrown at a wall; অভিলম্ব, আপতন কোণ, প্রতিফলন কোণ; আপতন কোণ = প্রতিফলন কোণ | চিত্র ৯.৫: ball bouncing off a wall. চিত্র ৯.৬: torch on a mirror on the floor. চিত্র ৯.৭: angle diagram |
| পাঠ ৮: দর্পণে সৃষ্ট প্রতিবিম্ব | Image is the same size, the same distance behind the mirror, and laterally inverted | চিত্র ৯.৮: glass sheet with two candles |
| পাঠ ৯-১০: কিছু আলোকীয় ঘটনা | How a plane mirror forms an image (points O, I, mirror MM′); periscope with two mirrors at 45° | চিত্র ৯.৯: image formation. চিত্র ৯.১০: periscope |

Notes for this chapter:

- Several textbook figures show a person (৯.১, ৯.৩, ৯.৬). Keep the arrangement of the figure but replace the person with a single eye or a hand, as the visual rules require.
- The chapter does not cover atoms, electrons, waves, transparency, shadows, or the Sun-to-Earth travel time. Video 1 included these; they are outside the textbook.
- Video 1 (আলো কী ও কীভাবে চলে, পাঠ ১-২) was built twice on the home PC. The first build (nine long scenes) is the old scene files in `science-video-template\`; its video was delivered. The second build, in small parts, is `class6-ch09-alo\` (31 parts, 9 min 31 s, 2D only: SVG drawings with `science-video-template\core.js`, no three.js). Only 20 of its 31 parts were rendered: the render stopped at `s06_p04` on a 30-second screenshot timeout, so its joined video ends after `s06_p03`. Its own commands are in `class6-ch09-alo\out\delivery-note.md` (`gen.py`, `render.py`, `deliver.py`). It is older than the motion videos and does not follow the later rules (3D, text size, hands), so do not use it as a reference build.

### Chapter 10, গতি: lessons and figures (printed pages 82 to 92)

| Lesson | Content | Figures and activities |
|---|---|---|
| পাঠ ১: স্থিতি ও গতি | An object that does not change position with time relative to the observer is at rest (স্থিতি); one that does is in motion (গতি). Anusheh at a bus stand; Ariyan at a railway station | চিত্র ১০.১: buildings and a street, at rest. চিত্র ১০.২: bus, cars, rickshaw, cycle in motion. Two activities with a pen held in the hand |
| পাঠ ২: স্থিতি ও গতি আপেক্ষিক | The same object is at rest for one observer and in motion for another; nothing is in absolute rest or motion; প্রসঙ্গ-কাঠামো; the Earth itself turns | No figure. Activity: three friends and a cycle on a field |
| পাঠ ৩-৪: নানা প্রকার গতি, চলন গতি | Five kinds of motion; চলন গতি: every point moves the same distance the same way; সরল রৈখিক গতি and বক্রগতি | চিত্র ১০.৩: a box AC pushed to BD. চিত্র ১০.৪: a box sliding down a slope. চিত্র ১০.৫: a curved path. Activities: a brick pushed on a table; walking straight and zigzag |
| পাঠ ৫: ঘূর্ণনগতি | Every point moves on a circle round a centre | চিত্র ১০.৬: ceiling fan with points ক, খ, গ. চিত্র ১০.৭: going round a bamboo pole |
| পাঠ ৬: ঘূর্ণন চলন গতি বা জটিলগতি | A cycle wheel turns and moves forward at once; rolling ball, drill | Activity: watch a cycle wheel |
| পাঠ ৭: পর্যাবৃত্ত গতি | The same path repeated after equal times: clock hand, four-lap race, fan | চিত্র ১০.৮: clock and fan. Activity: bouncing a football |
| পাঠ ৮: দোলন বা স্পন্দন গতি | Periodic motion to both sides of one position | চিত্র ১০.৯: ruler on a table edge. চিত্র ১০.১০: stone on a thread |
| পাঠ ৯: দূরত্ব ও সরণ | Anila: 10 m south then 4 m north, distance 14 m, displacement 6 m. Mrs Rashida: 7 km and 5 km back, 12 km and 2 km | চিত্র ১০.১১ and ১০.১২ |
| পাঠ ১০: দ্রুতি ও বেগ | দ্রুতি = দূরত্ব ÷ সময় (Robin 1600 m in 20 min = 80 m/min; Shahin 2000 m in 40 min = 50 m/min; car 60 m in 3 s = 20 m/s); বেগ is speed in a stated direction (15 m in 10 s = 1.5 m/s north) | No figure |
| পাঠ ১১: ত্বরণ, মন্দন | Motorcycle 20 to 45 m/s in 5 s, ত্বরণ 5 m/s²; মন্দন is negative ত্বরণ | No figure |
| পাঠ ১২: অতিরিক্ত গতি ও জীবনের ঝুঁকি | Speeding causes accidents; obey speed limits | No figure. Group activity on causes of accidents |

Notes for this chapter:

- Three videos: (1) পাঠ ১-২, (2) পাঠ ৩-৮, (3) পাঠ ৯-১২, which ends the chapter (my decision, 2026-11-24). In video 3, one solved example per idea; the book's নমুনা প্রশ্ন get hints only, no answers, so students think for themselves. It is built in `class6-ch10-goti-3\` (30 parts, 9 min 21 s); its new 3D places and shared helpers (hint card, displacement arrow, bend, highway) are in `zones3.js`, called by hooks in `world3d.js`. Start the next video from this folder. Render in foreground batches of a few clips: a long background render was stopped when memory ran low.
- Video 1 (স্থিতি ও গতি কী) is finished in `class6-ch10-goti-1\`: 32 parts, 9 min 36 s, 1,090 words, every open question approved. On 2026-11-18 the chip and the small labels were enlarged after I found them unreadable on my phone, and every part was re-rendered.
- Video 2 (নানা প্রকার গতি, পাঠ ৩-৮) is built in `class6-ch10-goti-2\` (34 parts, about 9 min 55 s, 1,075 words). Its `world3d.js` adds a 3D lab at x 1700 (wooden floor, wall, three tables; brick, ruler that bends in the clamped-beam shape, book with a pebble on a thread, carton, 27° wooden slope with a sliding carton, footballs, workbench with a block and a drill, khata on a desk; cameras in `W3.labCam`), a table clock and a mark on each fan blade in the room, and four zones: your study room in a city flat at x 1200 (fan, pendulum clock, table with drawer), a classroom at x 1300, a school field at x 1500 (earth, 200 m track, bamboo pole), and a cycle rim for the village yard. Its `draw2d.js` adds a carton, plank floor, hands (pushing, flat, finger, grip), fan seen from below, table clock, ruler, pebble, brick, football, rim, drill and pendulum clock; `stage.js` adds `path3`, `dot3` and `trap`. Start video 3 from this folder. Its plan (`plan.md`: 9 scenes, 34 parts, about 10 minutes) was approved on 2026-11-18 with these changes from the book: the friends walking straight and zigzag are labelled eyes with a trail on the floor; in চিত্র ১০.৭ the person going round the bamboo pole is a labelled eye "তুমি" and a hand on the pole, with a circle on the ground; the cycle wheel activity uses an old cycle rim rolled with a stick (চাকা চালানো) and a car wheel, and the narration says the book uses a cycle; the four-lap race runner is a labelled marker "প্রতিযোগী", shown from outside first and then from your eyes at the corner of the field; scene 5 is about 2:00 (eight figures) and the other scenes are a little shorter.
- Most figures show a person or trees. Keep the arrangement but replace the person with a hand or an eye, and trees with a lamp post (the book itself lists the lamp post as a thing at rest).
- The cycle activity of পাঠ ২ is done with a car instead (approved): two friends in the car, one standing by the road, each shown only as a labelled eye. A cycle was rejected because its rider would have to be drawn. For the same reason the rickshaw example of পাঠ ২ (frame of reference: your house) is shown with a car (approved); the narration says the book uses a rickshaw. In চিত্র ১০.২ only the bus and cars are shown; its rickshaw and cycle are left out (approved).
- Street, bus and car scenes are 3D (three.js, `science-video-template\lib\three.min.js`), under the usual SVG and caption layers.

### Chapter 11, বল ও সরল যন্ত্র (PDF pages 98 to 107, printed 93 to 102)

- Three videos (approved 2026-11-25): (1) পাঠ ১-৩ in `class6-ch11-bol-1\`, (2) পাঠ ৪-৭ লিভার, (3) পাঠ ৮-১২. Plan: `class6-ch11-bol-1\plan.md`.
- A skull may be shown (2026-11-25: it is not a living being); in video 3 the jaw, foot and arm are shown as bones.
- Every force and machine is explained simply in the same order: who applies it, where and in which direction (arrow proportional to the force), what happens, where it is used.
- The book numbers two figures ১১.১৫ (screwdrivers; human body).
- Video 1 (বল ও সরল যন্ত্র কী) is finished in `class6-ch11-bol-1\`: 35 parts, 9 min 49 s, 1,130 words; first render 2026-11-26, then 23 parts re-rendered after my notes and ৭খ again on 2026-11-27. New files: `zones11.js` to `zones11e.js` (rod and stones, room set with door, switch and chair, tubewell, cart, marbles, bat, microbus, rubber, tools and well, can, shil-pata, mouse, ruler) and, in `science-video-template\hand\`, `hands3d.js` with `mesh_<pose>.js` (the 3D hands). The rod of চিত্র ১১.৩ is called "শক্ত দণ্ড" and rests on a small rounded stone as in the book. Start video 2 (লিভার, পাঠ ৪-৭) from a copy of this folder.

## Showing what an observer sees (every video, approved 2026-11-17)

- When the narration says what someone sees, the camera is that person's eyes: on the ground at the bus stop for a friend standing there, inside the vehicle at the seat for "তুমি". Never show it from a third place.
- Things that are at rest for that observer keep their place in the picture; things that move for that observer move across it. The picture itself must prove the statement in the caption.
- Before the first eye view, show one short part from outside (third person, raised three-quarter view) with each person as a labelled eye, so it is clear who is where. Nothing is called স্থির or গতিশীল in that part.
- Move between views with a continuous camera flight into the observer's eyes, not a cut. While looking through someone's eyes, show "কে দেখছে: <name>" at the top right and hide that person's own marker.
- Inside a vehicle, its fixed parts (window frame, seat in front) must be visible and pinned as স্থির; seats line up with the windows as in a real bus.

## Lessons from the motion video (do not repeat)

| What was wrong | Rule for every video |
|---|---|
| Both views of "who sees what" were filmed from across the road. | The camera is the observer's eyes (see the section above). |
| Inside the bus the window could not be seen: the glass was almost invisible and the camera was too close to it. Seats faced backwards and did not match the windows. | Glass has a visible tint and a highlight, every window has a frame; keep the camera far enough from the glass to see a frame, a seat and the outside at once. Check the inside against the outside: same window count and spacing, seats facing forward, one seat row per window. |
| Inside a closed space (car cabin) everything was dark. | Add a soft light inside the cabin; use contrasting colours for seats, door panel and pillars. |
| From a balcony looking straight down, the bus and car crossed the picture in about a second. | A moving thing must stay in view for the whole sentence about it. Look along the road, not across it, or time the vehicle so it is mid-picture during its sentence. |
| A lamp post stood right in front of the balcony camera. | After choosing a camera spot, look at a frame and move the camera if a nearby object blocks the view. |
| When narration was added, a part got longer and the bus drove off the screen before the end. | After any narration change, check a frame near the end of every changed part. |
| A rickshaw or cycle cannot be shown without drawing its rider. | Use a closed vehicle (car, bus, train with dark windows) and say in the narration what the book uses; ask for approval in the plan. |
| A textbook person (Anusheh at the bus stand) was moved to another place to fit a scene. | Allowed, but list every such change in the plan and in the delivery note for approval. |
| On my phone the chip "অধ্যায় ১০" ran together: it was 34 px and semi-bold, the smallest text in the video, and on a phone it shrank to about 11 px. Some labels were 28 to 38 px. | No text below 40 px in the 1920x1080 frame, and bold for short labels. The chip is 42 px bold and its chapter number sits in its own yellow `<span class="cn">` with a gap after অধ্যায়. Before the full render, look at frames shrunk to phone size with `render.py phone`. |
| Every shop on the street showed the same coloured boxes, so the fruit shop (ফল ঘর) had no fruit. I pointed this out on 2026-11-18. | Everything on screen shows what it is or what its label says: a fruit shop shows fruit, a bookshop books, a pharmacy medicine, a tea stall a kettle and glasses. Draw goods per shop type (shopGoods in world3d.js), and before the full render take a close look at every sign, shop and labelled object. |
| The village swing (৪গ) swung sideways along its beam; a swing hangs on two ropes from the beam and swings forward and back. A flat side view of it was hard to read, and I asked for 3D from a raised angle (2026-11-18). | Every motion goes in its real direction. Things whose motion needs depth to be understood (a swing, anything moving towards or away from us) are shown in 3D from a raised three-quarter view, not as a flat side view. |
| On the field (৪খ) the runner seemed to run off the track: the chalk lines were a lit strip and the inner line went dark on half the loop, so only the outer lines showed. | Painted ground lines use an unlit material. When something must move along a drawn line, draw its computed points over a rendered frame once and check that they lie on the line. |
| A hand was drawn at the bamboo pole in ৩খ; I asked for it to be removed. | Draw a hand only where it does the action that is being shown (pushing, pressing, pulling); a labelled eye is enough to show where someone is. |
| Hands looked like mittens, and the writing hand came in sideways with no clear grip on the pen. I asked for realistic hands, an upright writing hand and a correct pen grip (2026-11-18). | Realistic hands (fingers, knuckles, nails, thumb, shading, cuff; handPush, handFlat, handFinger, gripHand, handWrite in draw2d.js). The writing hand is upright, seen from above, the pen in the tripod grip. |
| The pen hand still did not look like a real grip: in video 1 the fingers were flat plates, in video 2 the thumb and index finger were thin sticks with the pen across the palm. I sent a photo of a real grip (2026-11-18): the pen held by the thumb and the index finger, the other fingers supporting. A 2D redraw from that photo was still wrong: the thumb and index finger did not read as neighbours, so the finger on the pen looked like a little finger (I sent a photo of both sides of a right hand). Then the palm was missing (four sticks, fingers seeming to start at the wrist), the pen sank into the hand, and the first fit still left gaps and edges off the photo. I asked for a new version beside the old one and chose v2 (2026-11-18). | The pen hand is a 3D model built from the bones of a real right hand and fitted to the reference photo (`science-video-template\hand\`; the first version is kept in `hand_v1\`). `hand3d.js` builds the skeleton (four knuckles index, middle, ring, little along the top of a broad palm; the thumb from the base of the palm beside the index finger); `skin.js` lays one smooth skin over it (blended shapes, knuckles, crease shading); `fit.js` fits camera, joint angles, proportions, wrist and pen line to 12 points measured on the photo and to the photo's whole outline, while the thumb and index pads stay on the pen and the middle finger under it; `make_hand.py fit <photo>` runs the fit (the photo is only read, never stored in the project), `make_hand.py` renders `hand_side.png` and `hand.json`. The pen is drawn after the hand and only the thumb's last segment over the pen, so the pen never disappears into the hand. Outline match with the photo: v2 90.7 %, v1 84.7 %. `handPen` and `handWrite` in draw2d.js place the picture by its pen tip and pen angle (`HAND_IMG`). A hand in any new pose is made the same way, never drawn freehand: measure a photo of a real hand, fit, and check the overlay and the mismatch map before using it. |

## Lessons from chapter 11, video 1 (do not repeat)

| What was wrong | Rule for every video |
|---|---|
| Hands were flat pictures pasted over the 3D scene; their angle and size never matched the objects. | Hands are 3D meshes placed in the scene by coordinates (see the visual rules). |
| Fingertip presses; one fingertip on a mouse. | Press with the palm, pull with a bent finger hooked in, the whole hand resting on a mouse. |
| Hands on the pincers, scissors and tongs did not look properly held. | Tools are shown without hands; arrows show the force in and out. |
| (Video 2) The scissors lay flat on the cloth; the finger holes did not open with the blades and overlapped when closed (2026-11-27). | Scissors stand at 90° to the cloth with the cloth inside the open blades; each finger hole turns with its blade, and when the blades close the holes just touch, never overlap. |
| The cart puller's arm first went back, then looked like someone outside holding the shaft. | First work out where the person stands. A cart is pulled from between the shafts: one hand on each handle, four fingers outside, thumb inside, arms hanging nearly upright from the shoulders; the left hand is the mirrored right hand. |
| The drawer was pulled from above. | Pull from the front, as a person standing in front of it would. |
| On the switchboard the middle rocker looked off and the other two on. | Off = every rocker alike; on = the pressed one flipped. |
| The label said গ্রামের পথ but the scene was a city, and the cart looked too big. | The scene matches its label; show true size next to known things (a house, a road). |
| The shooting marble stopped dead after the hit. | Rolling balls keep their spin: after a hit each rolls on at v = (5/7) v_slide + (2/7) R w. |
| The শিল rolled on the পাটা. | The শিল slides forward and back, level with the পাটা; it does not roll. |
| The microbus pushers' hands were one above another. | People stand side by side; film them from behind at an angle. |
| The hand pulling the well rope came from above. | Pulling down, the forearm is below the hand. |
| A background render was stopped for low memory; one part failed when it was the first in a fresh page. | Render in the foreground, 3 parts per batch, each batch a fresh process. A part must not ask for a scene object before the first `W3.frame` has built the world. |

Checks that caught problems and must be repeated every video: stills of every part before the full render (2 to 4 frames per part, tiled into one sheet), a phone-size sheet (`render.py phone`, 640x360 per frame) in which every word must be readable, then one frame per part taken from the joined video near the end of each part.

---

## General rules for every episode

The general rules (structure, core principles, visual rules, narration, style, how to work, what to deliver, checklist) are kept in one place, `science-video-instructions.md`, and imported here. Change a rule only in that file, never by copying it into this one.

@science-video-instructions.md

For this project, "How to build it" also means: start from the reference build described under "Project setup".
