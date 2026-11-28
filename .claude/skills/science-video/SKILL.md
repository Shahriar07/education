---
name: science-video
description: Use for any work on the Bangla science videos for classes 6-10 (NCTB): reading a textbook chapter, the brief, splitting a chapter into videos, the plan, the script, building parts in three.js and SVG, rendering, checking frames, the delivery note, sending pieces, or changing a rule after feedback. It gives the stages of the work, the approval points, and which rule file to read at each stage.
---

# Bangla science video series: how we work

Version 4 (2026-11-28): the rules of `science-video-instructions.md` (version 3) and the lessons tables of `CLAUDE.md` were split by topic into this skill. Nothing was dropped; every rule keeps its date and the reason it was made.

## Where things are

| What | Where |
|---|---|
| How we work (this file): the stages, the approval points, how to change a rule | `SKILL.md` |
| The rules, one topic per file, each with its own "Lessons (do not repeat)" table | `rules/01-textbook.md` to `rules/10-checks-and-delivery.md` (list below) |
| Blank forms for the brief, the plan, the delivery note and a new video's details | `templates/` |
| A single file of all rules, to paste into a chat outside this project, or a zip to upload as a claude.ai skill | `bundle.py` (see the end of this file) |
| Project facts: computers and paths, the reference build and its commands, the chapter tables, what each video folder holds | `CLAUDE.md` and `README.md` in the project root |
| Online copy, readable and editable from any computer | Claude Doc "বিজ্ঞান ভিডিও সিরিজ: নির্দেশনা ও CLAUDE.md": https://claude.ai/artifact/SbedAWR74MootFgSQL74QL. One tab per file: `CLAUDE.md`, this `SKILL.md`, and one sub-tab per rule file |

| Rule file | Topic |
|---|---|
| `rules/01-textbook.md` | Figures into motion, staying inside the textbook, splitting a chapter, changes from the book |
| `rules/02-episode-and-narration.md` | The fixed 9-scene structure, title format, narration, teaching checks |
| `rules/03-physics.md` | Angles, motion, forces, light, space, scale, paths; every number calculated |
| `rules/04-what-is-drawn.md` | No living creatures or trees; realistic objects; labels show what they say |
| `rules/05-hands.md` | When a hand is drawn and how: 3D meshes, poses, mirrored hands, tools without hands |
| `rules/06-camera-and-observer.md` | Side views, 3D, observer's eyes, vehicle interiors, keeping moving things in view |
| `rules/07-screen-style.md` | 1920x1080, colours, chip, 40 px minimum, caption bar, cards |
| `rules/08-diagrams-2d.md` | 2D diagram parts: formulas term by term, scene and diagram on one clock |
| `rules/09-build-and-render.md` | Small parts, segment timing, zone files, rendering without running out of memory |
| `rules/10-checks-and-delivery.md` | The checks every video, the checklist, what to deliver, 30 MB pieces |

In this project `CLAUDE.md` imports this file and every rule file, so they are already in context; read a rule file again only when it is not.

## The stages

Never skip a stage marked **wait**: it ends with something sent to me, and the next stage starts only after my approval.

### 0. Start of a session

- Check which computer you are on and use only its paths (table in `CLAUDE.md`).
- Pull `main`, then work on a branch with a pull request, so the two computers never edit the same file at once.
- Read the Claude Doc for edits I made there, and bring them into the files before anything else.

### 1. Read the chapter, then the brief (**wait**)

Rules: `01-textbook.md`. Form: `templates/brief.md`. How to read the scanned PDF on each computer: `CLAUDE.md`, "Project setup".

Read the textbook chapter for this class and topic (search the web, or use the pages I attach). List what it covers, with its figures and activities. Tell me if the topic belongs to a different class or chapter than I wrote. Then start by giving me a brief of what the textbook has, before any plan: for each lesson of the topic, its main points and definitions in the book's own terms, its figures, activities, worked examples with their numbers, the exercise questions that belong to it, and any mistake or mismatch in the book. Keep it short, only what the book says, with page numbers and none of our own ideas. Read the whole chapter from the PDF, including the exercise pages, and build the table of figures and activities from what you actually see.

At the start of a new chapter, also propose how the chapter is split into videos (`01-textbook.md`, "Splitting a chapter into videos").

### 2. The plan (**wait**)

Rules: `01` to `08`. Form: `templates/plan.md`.

After the brief, send me a one-page plan for me to check, and wait for my approval. The plan contains:

- the hook and the three learning points;
- the scenes and their parts, one line each;
- the table of textbook figures and activities and where each is animated;
- the physics that will be calculated (which laws, which values);
- the home experiment and the next-video teaser;
- every change from the textbook (a person replaced by an eye, a cycle by a closed vehicle, an object left out), for approval;
- anything beyond the textbook that you propose, marked clearly;
- your questions.

Before sending it, check it against "Teaching checks" in `02-episode-and-narration.md`.

### 3. The script

Rules: `02-episode-and-narration.md`. After I approve the plan, write the full script. The narration lives only in the part files; `render.py script` writes the scene section of `script.md` from them.

### 4. Build the parts (**wait** after the first one)

Rules: `03` to `09`. Start from a copy of the latest finished 3D video folder (`CLAUDE.md`, "Reference build"). Send me one finished part early (the first diagram-heavy one) so I can confirm the look before you build the rest.

### 5. Check before the full render

Rules: `10-checks-and-delivery.md`. Stills of every part, a close look at every labelled object, the phone-size sheet. Before sending the full video, check still frames from every part against the checklist in `10`.

### 6. Render, join, deliver (**wait** for my notes)

Rules: `09` and `10`. Form: `templates/delivery-note.md`. Render, join and split into 30 MB pieces with `make_video.bat <video folder>` (or `--changed` after a fix), take one frame per part near its end, write the delivery note, and update the video's line in `CLAUDE.md` and `README.md`.

### 7. After my notes

Change and re-render only the affected parts, then join again. Then record what was learned (below), so the same mistake is not made in the next video.

## Changing a rule

The rules are meant to grow. When I correct something, or a check finds a problem that a rule would have prevented:

1. Find the one rule file whose topic it is (table above). A rule lives in exactly one file: never copy it into another file or into `CLAUDE.md`; point to it instead.
2. Write the rule in that file's main section, in plain words, with the date and my reason in brackets, as the other rules are written ("(my rule, 2026-11-26: a hand on a tool did not look properly held)"). Keep my own words when I gave them.
3. Add a row to that file's "Lessons (do not repeat)" table: what was wrong (with the video and part, for example "chapter 11, ৬ঘ"), and the rule for every video.
4. If the rule needs a new check, add it to the checklist in `10-checks-and-delivery.md`.
5. A new topic that fits no file gets a new file `rules/11-<topic>.md`: add it to the table above, to the import list at the end of `CLAUDE.md`, to the order in `bundle.py`, and as a new sub-tab in the Claude Doc.
6. A project fact (a path, a folder, what a video contains, a chapter table) is not a rule: it goes in `CLAUDE.md` or `README.md`.
7. Make the same change in the Claude Doc tab of that file, commit on the branch, and say in the pull request which rules changed.
8. Run `python -X utf8 .claude\skills\science-video\bundle.py check` before committing: it confirms that `CLAUDE.md` imports every rule file and that every rule file is in the bundle order.

## Outside this project

- `python -X utf8 .claude\skills\science-video\bundle.py md <file>` writes this file, every rule file and the "This video" form into one Markdown file, to paste into a new chat with the textbook pages and `science-video-template.zip` attached.
- `python -X utf8 .claude\skills\science-video\bundle.py zip <file>` packs the skill folder into a zip that can be uploaded as a custom skill in claude.ai.
