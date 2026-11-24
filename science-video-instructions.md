# Instructions: Bangla science video series (class 6-10, Bangladesh board)

Version 3 (after the class 6 motion video). This file replaces `science-video-series-prompt.md`. Paste everything below the line into a new chat, fill in "This video", and attach `science-video-template.zip` and the textbook chapter pages if you have them.

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
- A hand that holds something (a pen, a tool) is not drawn freehand: build it as a 3D model from the bones of a real hand (a broad palm with the four knuckles along its top, the thumb from the base of the palm beside the index finger) and fit its pose to a photo of a real hand holding the same thing, from the same side. Check the model laid over the photo, and its mismatch map, before using it. Draw the held object after the hand, so it never disappears into the skin; only the parts of the hand that are really in front of it (a thumb pad) are drawn over it.
- A hand writing in a khata is seen from above as the writer sees it: upright (long up and down), wrist and sleeve coming up from the bottom of the picture. The pen or pencil is held correctly (tripod grip: between thumb and index finger, resting on the middle finger, ring and little fingers curled under), tilted, with its tip on the paper. Students learn the grip from the picture.
- Do not draw trees, plants or crop fields. A fruit such as a mango is allowed. Sky, sun, moon, stars, water, buildings and objects are allowed.
- Everything must move: rays travel, objects slide in, numbers count up. No static slides, except title and recap cards.
- Voice is recorded by me afterwards. Render the video without audio, with the full narration shown as captions at the bottom.

## Viewing angle

- Show experiments and set-ups from the side, at eye level, the way the textbook figure shows them. Example of what went wrong in video 1: the three-cards-and-candle experiment was shown from above, which made the cards, the candle and the table hard to recognise.
- Do not use a top view for objects that students know from the side (candle, table, card, glass, bottle).
- If something cannot be seen from the side (for example a card sliding sideways), use a slightly raised three-quarter view that still shows the objects' familiar shapes. Use a top view only when the textbook figure itself is a top view.
- 3D is always preferred (my rule, 2026-11-18): it helps students see the content. Everything with real objects or places is built in 3D: experiments, activities, textbook figures that show objects (a box, a slope, a fan, a ruler, a pebble on a thread), rooms, yards and streets. Keep the textbook figure's arrangement and viewing angle by putting the 3D camera at that angle (a side view at eye level is a 3D camera at eye level); when depth helps, as with a swing, use a slightly raised three-quarter view. Only diagrams (paths, arrows, number lines), term cards, title, recap and question cards, and space scenes stay 2D.

## Showing what an observer sees

- When the narration says what someone sees, the camera is that person's eyes (standing at the bus stop, sitting in the bus, standing by the road). Never show it from a third place.
- Things at rest for that observer keep their place in the picture; things moving for that observer move across it. The picture itself must prove the caption.
- Before the first eye view, show one short part from outside (raised three-quarter view) with each person as a labelled eye, so it is clear who is where. Nothing is called at rest or moving in that part.
- Move into an observer's eyes with a continuous camera flight, not a cut. While looking through someone's eyes, show "কে দেখছে: <name>" at the top right and hide that person's own marker.
- Inside a vehicle, its fixed parts (window frame, seat in front) must be visible and marked as at rest, and seats line up with the windows as in a real vehicle.
- Textbook names may be kept as the student's friends in the narration ("তোমার বন্ধু আরিয়ান"), but they are never drawn: a labelled eye shows where each one is. If a textbook activity needs a person to be drawn (for example a cycle rider), redo it with a closed vehicle, after approval.

## Lessons from video 1 (do not repeat)

| What was wrong | Rule for every video |
|---|---|
| The Moon was drawn between the Sun and the Earth while the narration said sunlight bounces off it to us. | Place the Moon above and to the right of the Earth, on the night side. Draw the Earth with a day half facing the Sun and a night half. The ray goes Sun to Moon, then Moon to the night side of the Earth, so it is clear that moonlight reaches the side where it is night. |
| The experiment was shown from above. | Side view, as in the textbook figure. |
| The mango did not look real. | Realistic objects, checked frame by frame. |
| Electrons and waves were used to explain light for class six. | Stay inside the textbook for that class. |
| The video was built as nine long scenes. | Small parts of 10 to 30 seconds, each a separate clip. |
| Some diagrams were drawn by eye. | Compute angles, paths and proportions from the physics. |
| (Motion video) "Who sees what" was filmed from a third place. | The camera is the observer's eyes; show who is where from outside first. |
| (Motion video) Inside the bus the window could not be seen, and the seats did not match the windows. | Visible tinted glass with frames; camera far enough back to see frame, seat and outside together; inside matches outside (window count, spacing, one forward-facing seat row per window). |
| (Motion video) A car cabin was too dark. | Light the inside of closed spaces; use contrasting colours for seats, panels and pillars. |
| (Motion video) A vehicle crossed the picture in about a second, or drove off screen after the narration grew. | A moving thing stays in view for its whole sentence; re-check the end of every part whose narration changed. |
| (Motion video) A rickshaw and a cycle could not be shown without their riders. | Use a closed vehicle, say in the narration what the book uses, and get approval in the plan. |
| (Motion video) On a phone the chip "অধ্যায় ১০" ran together: 34 px semi-bold was too small. | No text below 40 px; chip 42 px bold with the number set apart; check frames shrunk to phone size before the full render. |
| (Motion video) Every shop showed the same coloured boxes; the fruit shop had no fruit. | Everything shows what it is or what its label says: a fruit shop shows fruit, a bookshop books, a pharmacy medicine. Look closely at every sign and shop before the full render. |
| (Motion video) A swing swung sideways along its beam instead of forward and back; a flat side view of it was hard to read. | Every motion goes in its real direction. A motion that needs depth to be understood (a swing) is shown in 3D from a raised three-quarter view. |
| (Motion video) A runner seemed to leave the track because a line was not drawn on half the loop. | When something moves along a drawn line, check once that its computed points lie on the rendered line. |
| (Motion video) Hands looked like mittens; the writing hand came in sideways with no clear pen grip. | Realistic hands; the writing hand upright, seen from above, the pen in the tripod grip. |
| (Motion video) Redrawn pen hands were still wrong: the thumb and index finger did not read as neighbours, the palm was missing, the pen sank into the hand. | A hand holding something is a 3D model from real bones, fitted to a photo of a real hand in that grip; the held object is drawn over the hand. |

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
- Everything with real objects or places is 3D (three.js on a canvas under the SVG and caption layers), built in metres; 3D is always preferred. Only diagrams, term cards, title, recap and question cards, and space scenes stay 2D. The caption bar, chip, cards and colours stay the same in both.
- Keep the narration only in the part files and generate the script's scene section from them, so the script and the video never disagree.
- Before the full render, look at 2 to 4 still frames of every part; after joining, look at one frame per part taken near its end.

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
