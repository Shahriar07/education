# 8. 2D diagrams, formulas and worked examples

Read at: stage 2 (the plan), stage 4 (building a diagram part).

2D is only for diagrams (paths, arrows, number lines, angle diagrams), term cards, title, recap and question cards, and space scenes (see 06-camera-and-observer.md). Everything else is 3D. All screen-style rules (07) apply here too, above all the 40 px minimum.

## Patterns for diagram parts (added 2026-11-28, from the review of the 3brown1blue skill)

These ways of showing an idea were taken from the 3brown1blue Manim skill (MIT licence) and rewritten for our pipeline. They are built with our own SVG and three.js helpers (`stage.js`, `draw2d.js`), never with Manim.

1. **The picture first, the formula after.** Let the motion or the figure play for a few seconds before any formula or term appears; the formula names what the student has just watched.
2. **A formula built term by term.** A formula (দ্রুতি = দূরত্ব ÷ সময়, ত্বরণ = (৪৫ − ২০) ÷ ৫) appears one term at a time, as the narration names it. The term being talked about is bright and the rest is dimmed. Each term has the colour of the thing it measures in the picture (দূরত্ব the colour of the path, সময় the colour of the clock). Numbers count up from the motion, never typed in.
3. **The scene and its diagram side by side, on one clock.** The 3D scene on one side and its 2D diagram on the other, both computed from the same time value, so the diagram draws itself while the motion happens. Example: the torch on the mirror next to the চিত্র ৯.৭ angle diagram, with আপতন কোণ and প্রতিফলন কোণ growing together.
4. **The set-up stays on screen.** While an explanation builds step by step, the figure it explains stays in view (smaller, to one side); do not jump to an empty card in the middle of an explanation.
5. **One colour per quantity.** Give each quantity in the video one colour and keep it in every part (light and energy stay yellow, as in 07). List the colours in the plan.
6. **Dim, do not remove.** When moving on to the next step, dim what is done instead of removing it, so the student can still see where the step came from; remove it only when the scene changes.
