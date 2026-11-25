# CLAUDE.md: Bangla science video series

This is the project instruction file for Claude Code. Keep it in the project root. The rules below apply to every video in this project.

An online copy, readable and editable from any computer, is the Claude Doc "বিজ্ঞান ভিডিও সিরিজ: নির্দেশনা ও CLAUDE.md": https://claude.ai/artifact/SbedAWR74MootFgSQL74QL (tab 1 = this file down to the `---` line, tab 2 = `science-video-instructions.md`). Whenever you change either file, make the same change in the doc, and before starting work read the doc for edits the user made there and bring them into these files.

## Project setup on this computer

This project lives on two computers. Check which one you are on before using a path.

| | Chapter 10 computer (this folder) | Chapter 9 computer |
|---|---|---|
| Project root | `D:\Personal\Self-Study\education\education` (moved here from `C:\Users\h.m.shahriar\Downloads\goti` on 2026-11-18; it is a git repository) | `C:\Users\H M Shahriar\Downloads\books` (contains spaces: always quote it) |
| Class six science book | `Science_compressed.pdf` in the root | `Science_compressed-6.pdf` |
| Shared template | `science-video-template\` | `template\` |
| Video folders | `class6-ch10-goti-1\` ... | `class6-ch09-alo\` |

- The book has 139 pages, about 38 MB, and no text layer: text extraction returns nothing. To read it, render the needed pages to images and look at them. Render only the pages of the chapter you need, not the whole book.
- PDF page numbers differ from printed page numbers. In the class six book, PDF page = printed page + 5 for chapters nine and ten. Check the offset again for other chapters and books.
- Before planning any video, read the whole chapter from the PDF, including the exercise pages, and build the table of figures and activities from what you actually see. Send me the brief of the textbook first, then the plan (see "How to work").
- On this computer the Read tool cannot render PDF pages (no poppler). What works: copy the PDF into a scratch folder under a non-.pdf name, serve the folder with `python -m http.server` on 127.0.0.1, and render the pages with pdf.js (cdnjs) in the built-in browser, then screenshot them. Navigating straight to a .pdf opens a save dialog for the user, so do not.
- Where videos are kept: never anywhere under a `.claude` folder (my rule, 2026-11-24: it would fill drive C). On this computer every video goes in its own sub-directory of `D:\Personal\Self-Study\education\education\`: `<video folder>\out\` (full video, clips, `send\`). When working in a git worktree under `.claude\worktrees\`, the rendered files still go to that folder; `render.py` from video 3 on does this by itself. Keep temporary pages, frames and PDF copies small and delete them when done. The home laptop has a different directory: never use the D: path there; use the folder that holds this CLAUDE.md on that computer as the project root, and if it is not clear, ask me once and write it in the table above.
- Layout: the shared template folder, then one folder per video with `parts/` (one source file per part, `s05_p03.js`), `out/` (clips, joined video, srt, parts list) and `script.md`.
- Rendering needs Python with Playwright, Google Chrome, ffmpeg, and the Hind Siliguri font files from the template. Do not install these system-wide. On this computer they are in `.venv` in the project root (`playwright` and `imageio-ffmpeg`, which carries an ffmpeg with libx264); Playwright drives the installed Google Chrome. Run everything as `..\.venv\Scripts\python.exe -X utf8 render.py ...` from the video folder. Check that these work before building, and tell me what is missing.
- The `render.py` inside the template is the old per-scene one from video 1 (Linux Chrome path). Do not use it.

### Reference build: `class6-ch10-goti-1\` (start every new video from a copy of the latest video folder; for video 3 that is `class6-ch10-goti-2\`)

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

Checks that caught problems and must be repeated every video: stills of every part before the full render (2 to 4 frames per part, tiled into one sheet), a phone-size sheet (`render.py phone`, 640x360 per frame) in which every word must be readable, then one frame per part taken from the joined video near the end of each part.

---

You are making one episode of a Bangla educational YouTube series for school science (Bangladesh NCTB curriculum, classes 6 to 10). Every episode follows the same structure, look and rules, so students recognise the format. Only the topic content changes. Follow every rule in this file; where two rules seem to conflict, ask me.

## This video

- Class: [e.g. সপ্তম শ্রেণি]
- Subject: [e.g. বিজ্ঞান]
- Chapter number and name: [e.g. অধ্যায় ১০: বিদ্যুৎ ও চুম্বকের ঘটনা]
- Topic: [e.g. চুম্বক কী ও কীভাবে কাজ করে]
- Part, only if this topic is split across videos: [e.g. পর্ব ১/২, otherwise leave empty]

## Core principles (most important)

### 1. Turn the textbook's static pictures into motion

The main purpose of the series is to show, as animation, what the textbook can only show as a still figure.

- Before planning, go through the chapter and list every figure, diagram and activity (চিত্র and কাজ) that belongs to this topic.
- Each of them must appear in the video as a moving version: the ray travels, the object falls, the magnet pulls, the needle turns.
- Keep the same arrangement and viewing angle as the textbook figure, so a student can match the video to the book page.
- In the plan, include a table: textbook figure or activity number, what it shows, which scene animates it. A figure may be left out only if I approve it.
- If you cannot read the textbook pages, say so and ask me to attach them. Do not guess what the figures contain.

### 2. Stay inside the textbook for that class

- Teach only what the textbook chapter for that class teaches, at the depth it teaches it, using its terms and definitions.
- Do not add explanations from higher classes. Example of what went wrong in video 1: explaining light with electrons and waves is too advanced for class six, where the book stops at light travelling in straight lines, reflection and absorption.
- Simple everyday analogies are welcome when they explain a textbook idea. A new scientific concept that is not in the chapter is not.
- If you think one idea beyond the textbook is necessary, propose it in the plan as a separate, clearly marked item and wait for my approval. The default is to leave it out.

### 3. Follow the laws of physics exactly

Every diagram and motion must be physically correct, calculated and not drawn by eye.

- **Angles:** compute them. In reflection the angle of incidence equals the angle of reflection, measured from the normal, and the normal is drawn. In refraction use Snell's law with real refractive indices (air 1.00, water 1.33, glass about 1.5).
- **Motion:** compute positions from the real equations for each frame (uniform velocity: s = vt; uniform acceleration: v = u + at, s = ut + ½at²; free fall with g = 9.8 m/s²; projectile paths as parabolas). If a speed, distance or time is shown on screen, the numbers must be consistent with each other and with the motion drawn.
- **Forces:** arrows point in the true direction, and their lengths are proportional to the magnitudes.
- **Light and shadow:** all rays from a distant source are parallel; shadows fall on the side away from the source and in line with the rays; the lit side of any object faces the source.
- **Space scenes:** the lit half of the Earth, Moon or a planet always faces the Sun. Day and night sides must be drawn and must agree with every ray in the scene.
- **Scale:** when true scale is impossible (Sun and Earth, atoms), keep directions and proportions correct where you can and put a small on-screen note: "স্কেল অনুযায়ী নয়".
- In the delivery note, list each calculation you used (formula and values), so I can check it.

### 4. Draw real things realistically

- Everyday objects must look like the real thing in shape, proportion, colour and shading. A student should recognise the object instantly without a label.
- Whatever a label or sign names must be there: a shop sign "ফল ঘর" needs fruit in the shop, a "বই ঘর" books, a "ফার্মেসি" medicine boxes.
- Example of what went wrong in video 1: the mango was a flat yellow blob and did not look real. A mango needs its true shape (fuller at the shoulder, a slight beak near the tip), a colour gradient (green to yellow with a red-orange blush), a highlight, a shadow and a short stem.
- Before using an object, look at a frame of it by itself and ask whether it would pass for that object. If not, redraw it. Check mentally against how the real object looks in Bangladesh (a kolshi, a tin roof, a rickshaw, a hurricane lamp).
- Diagram elements (rays, arrows, labels) stay simple and clean. Realism applies to the objects, not to the diagram marks.

### 5. Build the video in small parts

- Split every scene into short parts (shots) of roughly 10 to 30 seconds, each showing one idea.
- Each part is its own source file and its own rendered clip, named by scene and part: `s03_p02.mp4`. All clips use identical size, frame rate and encoder settings.
- The full video is made by joining the clips without re-encoding.
- When I ask for a change, change and re-render only the affected part, then re-join. Never rebuild the whole video for a local change.
- Keep a parts list (scene, part, start time, length, one-line description, file name) and deliver it with the video, so I can point to a part by its name.
- Captions and narration are also split by part, so I can record and re-record voice part by part.

## Visual rules (strict)

- Never draw a complete living creature: no human, animal, bird, fish or insect, and no face, head or human-shaped shadow or silhouette.
- A separate hand, finger or eye may be drawn when needed (a hand lighting a candle, an eye at the end of a light ray).
- Hands are drawn realistically: palm and five separate fingers with knuckles and nails, the thumb coming from the right place, skin with light and shade, a wrist and a shirt cuff. Never a mitten or a blob.
- A hand writing in a khata is seen from above as the writer sees it: upright (long up and down), wrist and sleeve coming up from the bottom of the picture. The pen or pencil is held correctly (tripod grip: between thumb and index finger, resting on the middle finger, ring and little fingers curled under), tilted, with its tip on the paper. Students learn the grip from the picture.
- Do not draw trees, plants or crop fields. A fruit such as a mango is allowed. Sky, sun, moon, stars, water, buildings and objects are allowed.
- Everything must move: rays travel, objects slide in, numbers count up. No static slides, except title and recap cards.
- Voice is recorded by me afterwards. Render the video without audio, with the full narration shown as captions at the bottom.

## Viewing angle

- Show experiments and set-ups from the side, at eye level, the way the textbook figure shows them. Example of what went wrong in video 1: the three-cards-and-candle experiment was shown from above, which made the cards, the candle and the table hard to recognise.
- Do not use a top view for objects that students know from the side (candle, table, card, glass, bottle).
- If something cannot be seen from the side (for example a card sliding sideways), use a slightly raised three-quarter view that still shows the objects' familiar shapes. Use a top view only when the textbook figure itself is a top view.
- 3D is always preferred (my rule, 2026-11-18): it helps students see the content. Everything with real objects or places is built in 3D: experiments, activities, textbook figures that show objects (a box, a slope, a fan, a ruler, a pebble on a thread), rooms, yards and streets. Keep the textbook figure's arrangement and viewing angle by putting the 3D camera at that angle (a side view at eye level is a 3D camera at eye level); when depth helps, as with a swing, use a slightly raised three-quarter view. Only diagrams (paths, arrows, number lines), term cards, title, recap and question cards, and space scenes stay 2D.

## Lessons from video 1 (do not repeat)

| What was wrong | Rule for every video |
|---|---|
| The Moon was drawn between the Sun and the Earth while the narration said sunlight bounces off it to us. | Place the Moon above and to the right of the Earth, on the night side. Draw the Earth with a day half facing the Sun and a night half. The ray goes Sun to Moon, then Moon to the night side of the Earth, so it is clear that moonlight reaches the side where it is night. |
| The experiment was shown from above. | Side view, as in the textbook figure. |
| The mango did not look real. | Realistic objects, checked frame by frame. |
| Electrons and waves were used to explain light for class six. | Stay inside the textbook for that class. |
| The video was built as nine long scenes. | Small parts of 10 to 30 seconds, each a separate clip. |
| Some diagrams were drawn by eye. | Compute angles, paths and proportions from the physics. |

## How to work

1. Read the textbook chapter for this class and topic (search the web, or use the pages I attach). List what it covers, with its figures and activities. Tell me if the topic belongs to a different class or chapter than I wrote. Then start by giving me a brief of what the textbook has, before any plan: for each lesson of the topic, its main points and definitions in the book's own terms, its figures, activities, worked examples with their numbers, the exercise questions that belong to it, and any mistake or mismatch in the book. Keep it short, only what the book says, with page numbers and none of our own ideas.
2. After the brief, send me a one-page plan for me to check, and wait for my approval. The plan contains:
   - the hook and the three learning points;
   - the scenes and their parts, one line each;
   - the table of textbook figures and activities and where each is animated;
   - the physics that will be calculated (which laws, which values);
   - the home experiment and the next-video teaser;
   - anything beyond the textbook that you propose, marked clearly;
   - your questions.
3. After I approve, write the full script.
4. Build the parts. Send me one finished part early (the first diagram-heavy one) so I can confirm the look before you build the rest.
5. Before sending the full video, check still frames from every part against the checklist at the end of this file.

## Fixed episode structure (about 10 minutes)

| Scene | Length | What it does |
|---|---|---|
| 1. Hook and title | about 1:00 | An everyday situation that poses a puzzle, told as "ধরো, তুমি ...". Ends with the question on a card, then the title card and "আজ যা জানব" with exactly three points. |
| 2. Core idea 1 | about 1:00 | The first idea from the chapter, starting from things the student sees every day. |
| 3. Core idea 2 | about 1:00 | The second idea. Includes one example for a village home and one for a city flat. |
| 4. Core idea 3 | about 1:00 | The third idea. Corrects one common wrong belief ("অনেকে ভাবে ... আসলে ঘটনা ঠিক উল্টো"). |
| 5. The textbook figures in motion | about 1:30 | The chapter's main diagrams, animated step by step in the same arrangement as the book, with each label appearing as it is named. |
| 6. Why it happens | about 1:30 | The explanation at the textbook's own level, as 2 or 3 numbered cases shown one at a time, each ending with its term card, then all cases side by side. |
| 7. Around us | about 0:55 | 3 or 4 quick real-life examples, each tagged with the idea it belongs to. Ends with a question the student answers, then the answer. |
| 8. নিজে করো | about 0:50 | One safe experiment with household items, preferably the textbook's own activity, shown from the side. Materials list, numbered steps, result, and "কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও". Add a safety notice if fire, blades, electricity or heat is involved. |
| 9. Recap and teaser | about 1:00 | "আজ যা শিখলাম" with three numbered points, "ভেবে বলো" with three questions, then a puzzle that leads to the next video and a "পরের ভিডিও" card. |

Title format, used for the YouTube title and the on-screen title card:
`শ্রেণি | বিষয় | অধ্যায় নম্বর ও নাম | টপিক`, with `পর্ব ১/২` at the end only when one topic is split across videos.

## Narration rules

- One narrator, speaking directly to the student as "তুমি". No dialogue. When the textbook uses named people, the narration may keep those names as the student's friends ("তুমি আর তোমার বন্ধু আরিয়ান", "তোমার বন্ধুরা"). They are still never drawn: show where a friend is with a labelled eye.
- Friendly storyteller tone, not a classroom lecture. Short sentences. Standard Bangla (চলিত).
- Put the student inside each situation ("ধরো, তুমি ..."), and ask real questions with a pause before answering.
- About 1,100 to 1,200 Bangla words in total, at roughly 2 words per second.
- Every new term is introduced once, slowly, with a term card showing the Bangla word and the English word below it. Use the textbook's own Bangla terms.
- Use examples that both village and city students know: tin roof, pond, clay pot, clothesline, rickshaw, bus window, mango, load-shedding. Avoid examples that need expensive items.

## Visual style (same in every episode)

- 1920x1080, 30 fps, MP4 (H.264). Font: Hind Siliguri for all Bangla text.
- Colours: navy `#0f1b3d` for explanation backgrounds, yellow `#FFC83D` as the accent and for light or energy, dark ink `#1a1a2e` for text on yellow. Everyday scenes use warm, natural colours.
- Persistent chip at the top left: "শ্রেণি · বিষয় · অধ্যায় নম্বর", 42 px bold, with the chapter number in yellow and a clear gap before it.
- Text size: nothing below 40 px in the 1920x1080 frame, labels bold. Most students watch on a phone, where the frame shrinks to about a third.
- Caption bar: dark rounded bar at the bottom centre, white text, at most two lines, one or two sentences at a time. Nothing important is drawn behind it.
- Term card: yellow rounded card with a white border, large Bangla term and smaller English term, pops in and stays about 3 seconds.
- Banner: yellow pill for segment names ("নিজে করো", "আজ যা শিখলাম", "ভেবে বলো").
- Question card: white rounded card with navy text.
- Title card: navy background with slowly rotating faint rays, three chips (class, subject, chapter), the topic in very large type with the key word in yellow, a yellow line that draws itself under the title, then three numbered cards for "আজ যা জানব".
- Numbered steps and cases use a yellow circle with a Bangla numeral. Correct and wrong results use a green tick and a red cross.
- Each scene fades in and out through navy. Parts inside a scene cut directly.

## How to build it

- If `science-video-template.zip` is attached, reuse `core.js` (captions, timing, term cards, banners, rays) and the styles in `index.html`. Its scene files are the old video 1 and show the look only; they do not follow the rules on parts, side views, realism or textbook level, so do not copy their content or structure.
- If it is not attached, build the same thing: an HTML page with an SVG layer for drawings and an HTML layer for text, a function that draws any frame of any part, and a script that screenshots each frame with headless Chrome and pipes them to ffmpeg.
- One source file and one MP4 per part. Join with ffmpeg's concat demuxer and `-c copy`.
- Drive all timing from the captions: each part is a list of caption segments, each segment's length is calculated from its word count, and every animation is keyed to a segment. This lets you refit a part to my recorded voice by changing only its segment durations.
- Put physical quantities in named constants and compute geometry from them (for example `n_water = 1.33`, `g = 9.8`), never as hand-picked pixel positions.
- Everything with real objects or places is 3D, built in metres (3D is always preferred); only diagrams, term cards, title, recap and question cards, and space scenes stay 2D. On this computer, start from the reference build described under "Project setup".

## What to deliver

1. The script as a doc: a details table (title, textbook reference, length, narration style, visual rule), the table of textbook figures and where each is animated, then every scene and part with an "On screen" paragraph and the Bangla narration, then recording notes and a glossary (Bangla term, English, first used in which part).
2. The full video as one MP4, and the separate clip for every part.
3. The parts list (scene, part, start time, length, description, file name).
4. An `.srt` file with every caption and its timing.
5. A short note with: the physics calculations used, anything you could not verify against the textbook, and which parts you checked frame by frame.

## Checklist before sending

- [ ] Every figure and activity of the topic in the textbook is animated, or its omission was approved.
- [ ] Nothing is taught that is beyond the textbook for this class, unless approved.
- [ ] Every angle, path, speed and force is calculated, and on-screen numbers agree with the motion.
- [ ] Light direction, shadows and lit sides agree in every frame; day and night sides are correct in space scenes.
- [ ] Every real object looks like the real thing.
- [ ] Experiments and set-ups are shown from the side, matching the textbook figure.
- [ ] No complete living creature, face, silhouette, tree, plant or crop field appears.
- [ ] The video is made of separate parts of 10 to 30 seconds, and the parts list is included.
- [ ] Bangla text renders correctly, and captions do not cover anything important.
- [ ] Title, chip and term cards follow the fixed format.
- [ ] Every "who sees what" is filmed from that person's eyes, after one outside view of who is where.
- [ ] Every moving thing stays in view for its whole sentence, including near the end of each part.
- [ ] Every change from the textbook (a person moved, an object replaced or left out) is listed in the delivery note and was approved.
- [ ] Every word on screen is readable in frames shrunk to phone size (640x360), the chip included.
- [ ] Every sign, shop and labelled object shows what it says (a fruit shop shows fruit).
