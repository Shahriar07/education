/* The pose of the hand and the camera views. Hand frame (mm): wrist at the origin, +y towards the fingers,
   +z the back of the hand, -x the thumb side. Flexion (degrees) bends a joint towards the palm.
   The pen is given as a line; the finger angles below come from solve.js (make_hand.py solve) for that line. */
const POSE = {
  size: 0.9,                                                       // a twelve-year-old's hand ≈ 0.9 of an adult's
  pen: { tip: [-28, 108, -72], web: [-30, 68, 4], roll: 0 },       // tip below the fingers; shaft across the web
  index: { abd: 9, flex: [34, 62, -10] },
  middle: { abd: 8, flex: [48, 52, 16] },
  ring: { abd: -4, flex: [78, 95, 45] },                           // curled into the palm
  little: { abd: -8, flex: [82, 95, 45] },
  thumb: { dir: [-0.321, 0.883, -0.342], up: [-0.872, -0.136, 0.47], flex: [0, 21] },
  // where each finger meets the pen, in mm from the pen tip
  contact: { index: [20, 32], thumb: [24, 40], middle: [12, 24] }
};
const VIEWS = {
  // the view used in the videos: from the thumb side and a little above, as in a photo of a real grip
  side: { from: HAND.V(-0.9, -0.15, 0.4), up: HAND.V(0, 0, 1), target: HAND.V(-10, -250, -20), span: 800 },
  front: { from: HAND.V(-0.2, 1, 0.1), up: HAND.V(0, 0, 1), target: HAND.V(-10, 60, -20), span: 300 },
  top: { from: HAND.V(0, 0, 1), up: HAND.V(0, 1, 0), target: HAND.V(-10, 60, -20), span: 300 },
  palm: { from: HAND.V(0, 0, -1), up: HAND.V(0, 1, 0), target: HAND.V(-10, 60, -20), span: 300 },
  flatTop: { from: HAND.V(0, 0, 1), up: HAND.V(0, 1, 0), target: HAND.V(-5, 80, 0), span: 260 },
  flatPalm: { from: HAND.V(0, 0, -1), up: HAND.V(0, 1, 0), target: HAND.V(-5, 80, 0), span: 260 },
  thumbside: { from: HAND.V(-1, 0, 0), up: HAND.V(0, 0, 1), target: HAND.V(-10, 60, -20), span: 300 },
  ...(() => {   // the side view with the hand turned about the forearm by r degrees (camera turned by -r about +y)
    const o = {};
    for (const r of [-30, -15, 0, 15, 30, 45]) {
      const t = -r * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
      const rot = v => HAND.V(v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
      o['roll' + r] = { from: rot(HAND.V(-0.9, -0.15, 0.4)), up: rot(HAND.V(0, 0, 1)), target: HAND.V(-10, 60, -20), span: 300, roll: r };
    }
    return o;
  })(),
  s1: { from: HAND.V(-0.9, -0.15, 0.4), up: HAND.V(0, 0, 1), target: HAND.V(-10, 60, -20), span: 300 },
  s2: { from: HAND.V(-0.85, -0.35, 0.4), up: HAND.V(0, 0, 1), target: HAND.V(-10, 60, -20), span: 300 },
  s3: { from: HAND.V(-0.9, 0.05, 0.45), up: HAND.V(0, 0, 1), target: HAND.V(-10, 60, -20), span: 300 },
  s4: { from: HAND.V(-0.8, -0.2, 0.6), up: HAND.V(0, 0, 1), target: HAND.V(-10, 60, -20), span: 300 },
  s5: { from: HAND.V(-0.95, -0.15, 0.2), up: HAND.V(0, 0, 1), target: HAND.V(-10, 60, -20), span: 300 },
  s6: { from: HAND.V(-0.75, -0.4, 0.55), up: HAND.V(0, 0, 1), target: HAND.V(-10, 60, -20), span: 300 }
};
