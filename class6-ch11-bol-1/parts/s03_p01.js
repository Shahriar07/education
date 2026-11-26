/* ৩ক:  */
part('s03_p01', { scene: 3, label: '৩ক', first: true, title: "মার্বেল: স্থির থেকে গতিশীল",
  screen: "3D উঠান; মার্বেল মার্বেলকে আঘাত করে, ধীর গতিতে আবার।" }, [
  { c: "বল দিলে কী ঘটে? চলো মার্বেল খেলি। সামনের মার্বেলটা স্থির।" },
  { c: "তুমি আরেকটা মার্বেল ছুড়লে। ঠক!" },
  { c: "আঘাত পেয়ে স্থির মার্বেলটা গতিশীল হলো।" },
  { c: "ধীরে আবার দেখো। ছোঁয়ার ওই এক মুহূর্তেই প্রথম মার্বেলটা বল দিল দ্বিতীয়টাকে, সামনের দিকে।" }
], function (t, S) {
  const tHit = S.A(1) + 0.6 + MB2.TIN, slow = t >= S.A(3), tau = slow ? -0.12 + (t - S.A(3)) * 0.1 : t - tHit, m = marbles(Math.min(tau, MB2.T2 + 0.5));
  const cx = slow ? MB2.X + 0.02 + 0.08 * cl(tau / 0.5) : t < tHit ? MB2.X - 0.12 : Math.max(MB2.X - 0.12, m.m2 - 0.12);
  const P = W3.frame({ cam: C11.marble(cx), marbles: { m1: t < S.A(1) + 0.6 - 0.01 && !slow ? null : m.m1, m2: m.m2 }, sun: [-14, 34, 26] });
  let s = '', u = ''; const pm = pxpm(P, [MB2.X, 0, MB2.Z]), at = x => P(x, MB2.R, MB2.Z);
  const [x2, y2] = at(m.m2); u += lab(x2, y2 - 95, t < tHit || slow && tau < 0 ? 'স্থির' : 'গতিশীল', t < tHit || slow && tau < 0 ? 'rest' : 'move', S.P(0, 0.4, 0.55));
  if (m.m1 !== null && (t >= S.A(1) + 0.6 || slow)) { const [x1, y1] = at(m.m1); if (tau < 0 && tau > -MB2.TIN) s += arrow2(x1 - 40, y1 - 70, x1 + 60, y1 - 70, 1, '#7fd1ff'); }
  if (t >= tHit && t < tHit + 0.5 && !slow) u += lab(x2 - 30, y2 - 180, big('ঠক!'), 'name', 1);
  if (slow) { u += lab(1700, 220, 'ধীরে', 'name'); if (tau >= 0) { const L = 140 * cl(1 - tau / 0.3); if (L > 30) { const xc = x2 - MB2.R * pm; s += arrow2(xc, y2, xc + L + 40, y2, 1); u += lab(xc + 60, y2 + 70, big('বল'), 'move'); } } }
  return { gl: true, svg: s, ui: u };
});
