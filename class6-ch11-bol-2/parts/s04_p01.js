/* ৪ক: drawn */
part('s04_p01', { scene: 4, label: '৪ক', first: true, title: "ভুল ধারণা: ঢালু পথ",
  screen: "ট্রাকের পেছনে ভারী ড্রাম; সোজা তোলার চেষ্টা।" }, [
  { c: "ধরো, একটা ভারী ড্রাম ট্রাকে তুলতে হবে। অনেকে ভাবে, সোজা তুলে দেওয়াই সহজ।" },
  { c: "ঢালু পথে ঘুরে যেতে হয়, পথ বেশি, তাই কষ্টও বেশি। আসলে ঘটনা ঠিক উল্টো।" }
], function (t, S) {
  /* the belief: lifting straight up looks easier than going the long way up the ramp. 200 kg drum, W = 1960 N, 0.15 px/N */
  const dash = (pts, c = '#fff', o = 1) => o > 0 ? `<polyline points="${pts.map(p => F(p[0]) + ',' + F(p[1])).join(' ')}" fill="none" stroke="${c}" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round" opacity="${cl(o).toFixed(2)}"/>` : '';
  const bar = (a, b, c, o) => o > 0 ? `<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="${cl(o * 2).toFixed(2)}"/>` : '';
  const g0 = -1.3, P = W3.frame({ cam: C11.ramp(), drum: g0, sun: [-14, 34, 26] });
  let s = '', u = '';
  const c = drumPos(g0), [cx, cy] = P(...c), [tx, ty] = P(c[0], c[1] + TR.R, 0), [ux, uy] = P(c[0], TR.H + 2 * TR.R + 0.1, 0), [bx, by] = P(TR.X + 0.4, TR.H + TR.R, 0);
  const o0 = S.P(0, 0.35, 0.55);
  s += dash([[tx, ty], [ux, uy], [bx, uy], [bx, by - 40]], '#fff', o0) + arrow2(cx + 70, cy, cx + 70, cy - TR.W * 0.15, o0, Y);
  u += lab(cx + 260, cy - 200, 'সোজা তোলা: পুরো ভার', 'name', o0) + lab(960, 200, big('অনেকে ভাবে: সোজা তোলাই সহজ'), 'move', S.P(0, 0.05, 0.2));
  if (t >= S.A(1)) { const o1 = S.P(1, 0.05, 0.3), path = [drumPos(g0), drumPos(0), drumPos(1.5), drumPos(TR.L), drumPos(TR.L + 0.4)].map(p => P(p[0], p[1] + TR.R + 0.05, 0));
    s += dash(path, '#7fd1ff', o1); const [mx, my] = P(...drumPos(1.6)); u += lab(mx - 120, my - 130, 'ঢালু পথ: পথ বেশি', 'name', o1);
    u += lab(960, 300, big('আসলে ঘটনা ঠিক উল্টো!'), 'move', S.P(1, 0.72, 0.85)); }
  u += lab(1640, 170, 'ট্রাকে ড্রাম তোলা', 'name');
  return { gl: true, svg: s, ui: u };
});
