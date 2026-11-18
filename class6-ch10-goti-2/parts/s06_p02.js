/* ৬খ: case 2. A cycle rim turns about its fixed centre: its mark goes round a circle → ঘূর্ণন গতি.
   Then the same rim rolls without slipping (centre x = rθ): the mark turns round the centre while the centre moves on;
   its path x = x0 + r(θ − sinθ), y = r(1 − cosθ) above the ground → ঘূর্ণন চলন গতি বা জটিল গতি. */
part('s06_p02', { scene: 6, label: '৬খ', title: "ঘটনা ২: ঘূর্ণন ও জটিল গতি",
  screen: "হলুদ বৃত্তে ২। সাইকেলের একটা রিম এক জায়গায় ঘোরে, তার হলুদ দাগ একটা বৃত্ত আঁকে; শব্দ-কার্ড: ঘূর্ণন গতি। তারপর একই রিম মাটিতে গড়িয়ে এগোয়, কেন্দ্রের সোজা তীর আর দাগের ঢেউয়ের মতো পথ; শব্দ-কার্ড: ঘূর্ণন চলন গতি বা জটিল গতি / Complex motion।" }, [
  { c: "দুই: প্রতিটা বিন্দু একটা কেন্দ্রের চারদিকে বৃত্তে ঘুরলে, সেটা ঘূর্ণন গতি।" },
  { c: "ঘোরার সাথে কেন্দ্রটাও সামনে এগোলে, সেটা ঘূর্ণন চলন গতি বা জটিল গতি।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  const R = 150, YG = 800;
  s += badge(200, 260, 2, S.P(0, 0, 0.1));
  if (t < S.A(1)) {
    // turning in place, 90°/s; the mark starts at the bottom (θ = 90° on screen, y down)
    const ang = 90 + 90 * t, cx = 960, cy = 560;
    s += `<rect x="${cx - 12}" y="${cy}" width="24" height="${YG - cy}" fill="#5d6f9e"/><line x1="600" y1="${YG}" x2="1320" y2="${YG}" stroke="#5d6f9e" stroke-width="6"/>`;
    s += fanCircle(cx, cy, R * 0.95, Y, Math.min(1, (ang - 90) / 360), 90, 1);
    s += rim2d(cx, cy, R, ang);
    if (S.on(0)) u += termCard('ঘূর্ণন গতি', 'Rotational motion', S.P(0, 0.75, 0.88), 1, 1460, 400, 0.8);
  } else {
    // rolling: centre moves v px/s, θ = distance / R (clockwise on screen when moving right)
    const x0 = 240, v = 230, tt = t - S.A(1), dist = v * tt, th = dist / R;
    const cx = x0 + dist, cy = YG - R;
    s += `<line x1="100" y1="${YG}" x2="1820" y2="${YG}" stroke="#5d6f9e" stroke-width="6"/>`;
    // the mark's path, from the moment it touched the ground at x0
    let d = ''; for (let k = 0; k <= 160; k++) { const a = th * k / 160; d += (k ? 'L' : 'M') + F(x0 + R * (a - Math.sin(a))) + ' ' + F(YG - R * (1 - Math.cos(a))); }
    s += `<path d="${d}" fill="none" stroke="${Y}" stroke-width="6" stroke-dasharray="3 12" stroke-linecap="round"/>`;
    s += arrow2(x0, cy, cx, cy, tt > 0.3 ? 1 : 0, '#7fd1ff');
    s += rim2d(cx, cy, R, 90 + th * 180 / Math.PI);
    if (S.on(1)) u += termCard('ঘূর্ণন চলন গতি বা জটিল গতি', 'Complex motion', S.P(1, 0.72, 0.85), 1, 960, 330, 0.8);
  }
  return { svg: s, ui: u };
});
