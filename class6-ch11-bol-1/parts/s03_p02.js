/* ৩খ:  */
part('s03_p02', { scene: 3, label: '৩খ', title: "ঘর্ষণ বল",
  screen: "মার্বেল ধীর হয়ে থামে; ঘর্ষণের তীর পেছন দিকে।" }, [
  { c: "কিন্তু মার্বেলটা একটু পরেই থেমে গেল। কে থামাল? কেউ তো ছোঁয়নি!" },
  { c: "থামিয়েছে মাটি। মাটির ঘর্ষণ বল কাজ করেছে গতির উল্টো দিকে।" },
  { c: "তাই বল গতিশীল বস্তুকে থামাতেও পারে।" },
  { c: "ঘর্ষণ না থাকলে, আর কোনো বল না লাগলে, মার্বেলটা চলতেই থাকত।" }
], function (t, S) {
  const sl = t >= S.A(1) && t < S.A(3), tau = t < S.A(1) ? t - 0.6 : sl ? (t - S.A(1) - 0.4) * 0.35 : t - S.A(3) - 0.4, m = marbles(Math.max(0, tau));
  const ghost = t >= S.A(3) ? MB2.X + MB2.V2 * Math.max(0, tau) : undefined, cx = MB2.X + 0.32;
  const P = W3.frame({ cam: { pos: [cx, 0.11, MB2.Z + 0.95], look: [cx, 0.012, MB2.Z], fov: 40 }, marbles: { m1: MB2.X - 2 * MB2.R + 0.0004, m2: m.m2, ghost }, sun: [-14, 34, 26] });
  let s = '', u = ''; const [x2, y2] = P(m.m2, MB2.R, MB2.Z), pm = pxpm(P, [MB2.X, 0, MB2.Z]);
  if (sl && tau >= 0) { const v = m.v2; if (v > 0.01) { s += arrow2(x2 + 30, y2 - 70, x2 + 30 + 300 * v, y2 - 70, 1, '#7fd1ff'); u += lab(x2 + 120, y2 - 135, 'গতি', 'name'); s += arrow2(x2 - MB2.R * pm, y2 + 22, x2 - MB2.R * pm - 160, y2 + 22, 1, RED); u += lab(x2 - 120, y2 + 90, big('ঘর্ষণ'), 'move'); } else u += lab(x2, y2 - 90, 'থেমে গেল', 'rest'); }
  if (t >= S.A(2) && t < S.A(3)) u += lab(x2, y2 - 90, 'থেমে গেল', 'rest');
  if (ghost !== undefined) { const [gx, gy] = P(Math.min(ghost, MB2.X + 1.2), MB2.R, MB2.Z); s += arrow2(gx + 20, gy - 60, gx + 150, gy - 60, cl(tau * 3), '#7fd1ff'); u += lab(Math.min(gx, 1600), gy - 130, 'ঘর্ষণ না থাকলে', 'name', cl(tau * 3)); }
  return { gl: true, svg: s, ui: u };
});
