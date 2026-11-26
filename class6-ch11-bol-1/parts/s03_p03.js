/* ৩গ:  */
part('s03_p03', { scene: 3, label: '৩গ', title: "গতি বাড়ে, গতি কমে",
  screen: "গ্রামের উঠানে ঠেলাগাড়ি, শহরের ফ্ল্যাটে খেলনা গাড়ি।" }, [
  { c: "গ্রামের পথে চলন্ত ঠেলাগাড়িকে পেছন থেকে জোরে ঠেললে গতি বাড়ে। বল আর গতি একই দিকে।" },
  { c: "শহরের ফ্ল্যাটে মেঝেতে খেলনা গাড়ি চলছে। সামনে থেকে হাত দিয়ে ঠেকালে গতি কমে। বল গতির উল্টো দিকে।" }
], function (t, S) {
  let s = '', u = '';
  if (t < S.A(1)) { const q = Math.max(0, t - 1.2), x = -2.4 + 0.45 * t + 0.15 * q * q, v = 0.45 + 0.3 * q, P = W3.frame({ cam: C11.cart(-1.6 + 0.45 * t + 0.11 * q * q), cart: x, sun: [-14, 34, 26] }), C = ST.CART + x, pm = pxpm(P, [C, 0.8, ST.CZ + 0.5]);
    const [rx, ry] = P(C - 1.12, 0.74, ST.CZ + 0.4); s += pushHands(rx, ry, pm, 2); const [mx, my] = P(C, 1.35, ST.CZ); s += arrow2(mx - 60, my - 30, mx - 60 + 260 * v, my - 30, 1, '#7fd1ff'); u += lab(mx - 160, my - 30, 'গতি', 'name');
    const f = S.P(0, 0.15, 0.25); s += arrow2(rx - 270, ry + 150, rx - 30, ry + 150, f); u += lab(rx - 150, ry + 215, big('জোরে ধাক্কা'), 'move', f); u += lab(1640, 170, 'গ্রামের পথ', 'name'); }
  else { const q = t - S.A(1), stop = 3.0, x0 = 1200 - 0.6, v0 = 0.3, a = 0.6, tq = Math.min(q, stop), x = q < stop ? x0 + v0 * q : x0 + v0 * stop + v0 * Math.min(q - stop, v0 / a) - a * Math.min(q - stop, v0 / a) ** 2 / 2, v = q < stop ? v0 : Math.max(0, v0 - a * (q - stop));
    const xe = x0 + v0 * stop + v0 * v0 / (2 * a) + 0.14 + 0.02, P = W3.frame({ cam: C11.toy(1200.18), toy: x, room: {} }), pm = pxpm(P, [x, 0.05, 0.9]); void tq;
    const [hx, hy] = P(xe + Math.max(0, 0.12 * (1 - q / stop)), 0.09, 0.9); s += handStop(hx, hy, -6, pm, cl(q - 0.6));
    const [cx, cy] = P(x, 0.16, 0.9); if (v > 0.01) s += arrow2(cx - 40, cy - 40, cx - 40 + 300 * v, cy - 40, 1, '#7fd1ff'); else u += lab(cx, cy - 60, 'থেমে গেল', 'rest');
    if (q > stop && v > 0.01) { s += arrow2(hx - 20, hy - 120, hx - 230, hy - 120, 1, RED); u += lab(hx - 125, hy - 190, big('বল উল্টো দিকে'), 'move'); } u += lab(1640, 170, 'শহরের ফ্ল্যাট', 'name'); }
  return { gl: true, svg: s, ui: u };
});
