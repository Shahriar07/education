/* ৩খ:  */
part('s03_p02', { scene: 3, label: '৩খ', title: "ঘর্ষণ বল",
  screen: "মার্বেল ধীর হয়ে থামে; ঘর্ষণের তীর পেছন দিকে।" }, [
  { c: "কিন্তু মার্বেলটা একটু পরেই থেমে গেল। কে থামাল? কেউ তো ছোঁয়নি!" },
  { c: "থামিয়েছে মাটি। মাটির ঘর্ষণ বল কাজ করেছে গতির উল্টো দিকে।" },
  { c: "তাই বল গতিশীল বস্তুকে থামাতেও পারে।" },
  { c: "ঘর্ষণ না থাকলে, আর কোনো বল না লাগলে, মার্বেলটা চলতেই থাকত।" }
], function (t, S) {
  /* one consistent story (MB2 physics): sentence 1, the shooter rolls in (1.02 m/s, slowing at 0.49 m/s^2), hits the target
     hard, the target rolls on at 0.56 m/s and stops after 1.14 s (32 cm), the shooter rolls on at 0.24 m/s and stops after 6 cm.
     Sentences 2-3: the same, again, at 0.35 x speed with friction and motion arrows ("ধীরে আবার"). Sentence 4: both marbles
     stay where they stopped; only the faint marble shows what would happen without friction, from the hit point */
  const t1 = 0.5 + MB2.TIN, sl = t >= S.A(1) && t < S.A(3), last = t >= S.A(3);
  const tau = !sl && !last ? t - t1 : sl ? (t - S.A(1) - 0.4) * 0.35 - 0.15 : 9, m = marbles(Math.min(tau, MB2.T2 + 1)), end = marbles(9);
  const show1 = tau >= -MB2.TIN;
  const ghost = last ? MB2.X + MB2.V2 * Math.max(0, t - S.A(3) - 0.4) : undefined, cx = ghost !== undefined ? Math.max(MB2.X + 0.2, ghost - 0.3) : MB2.X + 0.2;   // the camera follows the marble that keeps rolling
  const P = W3.frame({ cam: { pos: [cx, 0.11, MB2.Z + 0.95], look: [cx, 0.012, MB2.Z], fov: 40 }, marbles: { m1: last ? end.m1 : show1 ? m.m1 : null, m2: last ? end.m2 : m.m2, ghost }, sun: [-14, 34, 26] });
  let s = '', u = ''; const at = x => P(x, MB2.R, MB2.Z), [x2, y2] = at(last ? end.m2 : m.m2), pm = pxpm(P, [MB2.X, 0, MB2.Z]);
  if (!last && show1 && tau < 0) { const [x1, y1] = at(m.m1); s += arrow2(x1 - 40, y1 - 70, x1 + 60, y1 - 70, 1, '#7fd1ff'); }
  if (!sl && !last && tau >= 0 && tau < 0.5) u += lab(x2 - 30, y2 - 180, big('ঠক!'), 'name', 1);
  if (sl) { u += lab(1700, 220, 'ধীরে আবার', 'name');
    if (tau >= 0) { const v = m.v2; if (v > 0.01) { s += arrow2(x2 + 30, y2 - 70, x2 + 30 + 300 * v, y2 - 70, 1, '#7fd1ff'); u += lab(x2 + 120, y2 - 135, 'গতি', 'name'); s += arrow2(x2 - MB2.R * pm, y2 + 22, x2 - MB2.R * pm - 160, y2 + 22, 1, RED); u += lab(x2 - 120, y2 + 90, big('ঘর্ষণ'), 'move'); } else u += lab(x2, y2 - 90, 'থেমে গেল', 'rest'); } }
  if (!sl && !last && tau > MB2.T2 + 0.2) u += lab(x2, y2 - 90, 'থেমে গেল', 'rest');
  if (last) { u += lab(x2, y2 - 90, 'থেমে আছে', 'rest'); const q = cl((t - S.A(3) - 0.4) * 3), [gx, gy] = at(ghost); s += arrow2(gx + 20, gy - 60, gx + 150, gy - 60, q, '#7fd1ff'); u += lab(Math.min(gx, 1600), gy - 130, 'ঘর্ষণ না থাকলে', 'name', q); }
  return { gl: true, svg: s, ui: u };
});
