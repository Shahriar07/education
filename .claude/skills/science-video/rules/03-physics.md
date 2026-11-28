# 3. Physics: every motion, angle and force is calculated

Read at: stage 2 (the plan lists the physics), stage 4 (building each part), stage 6 (the delivery note lists the calculations).

Every diagram and motion must be physically correct, calculated and not drawn by eye.

- **Angles:** compute them. In reflection the angle of incidence equals the angle of reflection, measured from the normal, and the normal is drawn. In refraction use Snell's law with real refractive indices (air 1.00, water 1.33, glass about 1.5).
- **Motion:** compute positions from the real equations for each frame (uniform velocity: s = vt; uniform acceleration: v = u + at, s = ut + ½at²; free fall with g = 9.8 m/s²; projectile paths as parabolas). If a speed, distance or time is shown on screen, the numbers must be consistent with each other and with the motion drawn.
- **Forces:** arrows point in the true direction, and their lengths are proportional to the magnitudes. The arrow of a hand's force starts just outside the hand, never over the fingers. Every force and machine is explained simply in the same order: who applies it, where and in which direction (arrow proportional to the force), what happens, where it is used.
- **Light and shadow:** all rays from a distant source are parallel; shadows fall on the side away from the source and in line with the rays; the lit side of any object faces the source.
- **Space scenes:** the lit half of the Earth, Moon or a planet always faces the Sun. Day and night sides must be drawn and must agree with every ray in the scene.
- **Scale:** when true scale is impossible (Sun and Earth, atoms), keep directions and proportions correct where you can and put a small on-screen note: "স্কেল অনুযায়ী নয়".
- **Direction of motion:** every motion goes in its real direction (a swing hangs on two ropes from its beam and swings forward and back, not sideways along the beam).
- **Paths:** when something must move along a drawn line, draw its computed points over a rendered frame once and check that they lie on the line.
- Put physical quantities in named constants and compute geometry from them (for example `n_water = 1.33`, `g = 9.8`), never as hand-picked pixel positions.
- In the delivery note, list each calculation you used (formula and values), so I can check it.

## Lessons (do not repeat)

| What was wrong | Rule for every video |
|---|---|
| (Video 1) The Moon was drawn between the Sun and the Earth while the narration said sunlight bounces off it to us. | Place the Moon above and to the right of the Earth, on the night side. Draw the Earth with a day half facing the Sun and a night half. The ray goes Sun to Moon, then Moon to the night side of the Earth, so it is clear that moonlight reaches the side where it is night. |
| (Video 1) Some diagrams were drawn by eye. | Compute angles, paths and proportions from the physics. |
| (Motion video) The village swing (৪গ) swung sideways along its beam; a swing hangs on two ropes from the beam and swings forward and back. | Every motion goes in its real direction. (Its camera rule is in 06-camera-and-observer.md.) |
| (Motion video) On the field (৪খ) the runner seemed to run off the track: the chalk lines were a lit strip and the inner line went dark on half the loop, so only the outer lines showed. | Painted ground lines use an unlit material. When something must move along a drawn line, draw its computed points over a rendered frame once and check that they lie on the line. |
| (Chapter 11) The shooting marble stopped dead after the hit. | Rolling balls keep their spin: after a hit each rolls on at v = (5/7) v_slide + (2/7) R w. |
| (Chapter 11) The শিল rolled on the পাটা. | The শিল slides forward and back, level with the পাটা; it does not roll. |
