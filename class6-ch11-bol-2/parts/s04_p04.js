/* ৪ঘ: drawn */
part('s04_p04', { scene: 4, label: '৪ঘ', last: true, title: "চিত্র ১১.১১: জ্যাক স্ক্রু",
  screen: "3D জ্যাক স্ক্রু, হাতল ঘোরে, মাথা অল্প ওঠে; প্যাঁচ হেলানো তল হিসেবে খুলে দেখানো।" }, [
  { c: "গাড়ির চাকা বদলাতে জ্যাক স্ক্রু দিয়ে গাড়ির এক দিক তোলা হয়।" },
  { c: "স্ক্রুর প্যাঁচ আসলে পেঁচানো একটা হেলানো তল। এক পাক ঘোরার পথটা তলের দৈর্ঘ্য, প্যাঁচের উচ্চতা তলের উচ্চতা।" },
  { c: "হাতল ঘোরে অনেকটা, ভার ওঠে অল্প। জ্যাক স্ক্রু লিভার আর হেলানো তল, দুইয়ের নীতিতেই কাজ করে।" }
], function (t, S) {
  /* jack screw: pitch 6 mm, bar radius 0.30 m. Three turns over the part: the truck rises 18 mm while the bar's end travels
     3 x 1.88 m. The thread unrolled is an inclined plane 188 cm long and 0.6 cm high (drawn not to scale) */
  const dash = (pts, c = '#fff', o = 1) => o > 0 ? `<polyline points="${pts.map(p => F(p[0]) + ',' + F(p[1])).join(' ')}" fill="none" stroke="${c}" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round" opacity="${cl(o).toFixed(2)}"/>` : '';
  const bar = (a, b, c, o) => o > 0 ? `<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="${cl(o * 2).toFixed(2)}"/>` : '';
  const n = 3 * ease(S.P(0, 0.2, 1) * 0.4 + (t >= S.A(1) ? 0.3 : 0) + (t >= S.A(2) ? 0.3 * S.P(2, 0, 1) : 0)), P = W3.frame({ cam: C11.jack(), jack: n, sun: [-14, 34, 26] });
  let s = '', u = '';
  const yb = JK.TOP0 - 0.058 - 0.008 + JK.P * n + 0.025, ring = []; for (let i = 0; i <= 48; i++) { const a = i / 48 * 2 * Math.PI; ring.push(P(JK.X + JK.HR * Math.cos(a), yb, JK.Z + JK.HR * Math.sin(a))); }
  s += dash(ring, Y, S.P(0, 0.4, 0.6));
  const [jx, jy] = P(JK.X, 0.18, JK.Z); u += lab(jx - 260, jy, 'জ্যাক স্ক্রু', 'name', S.P(0, 0.05, 0.2)) + lab(960, 335, big('পাক: ' + BNF(n, 1) + ' &nbsp; গাড়ি উঠল ' + BNF(JK.P * n * 1000, 0) + ' মিমি'), 'move', S.P(0, 0.3, 0.45));
  if (t >= S.A(1)) { const o = S.P(1, 0.05, 0.25), x0 = 150, y0 = 820, w = 560, h = 150;
    s += `<g opacity="${cl(o).toFixed(2)}"><rect x="${x0 - 40}" y="${y0 - h - 110}" width="${w + 80}" height="${h + 200}" rx="24" fill="#0f1b3d" opacity="0.88"/><polygon points="${x0},${y0} ${x0 + w},${y0} ${x0 + w},${y0 - h}" fill="${Y}" opacity="0.25" stroke="${Y}" stroke-width="6"/><line x1="${x0}" y1="${y0}" x2="${x0 + w}" y2="${y0 - h}" stroke="${Y}" stroke-width="10"/></g>`;
    u += lab(x0 + w / 2, y0 + 45, 'এক পাকের পথ: তলের দৈর্ঘ্য', 'move', o) + lab(x0 + w / 2 + 40, y0 - h - 60, 'প্যাঁচের উচ্চতা: তলের উচ্চতা', 'move', S.P(1, 0.3, 0.45)) + lab(x0 + 120, y0 - h - 140, 'স্কেল অনুযায়ী নয়', 'name', o); }
  if (t >= S.A(2)) u += card('হাতল ঘোরে ১৮৮ সেমি &nbsp;→&nbsp; ভার ওঠে ০.৬ সেমি', S.P(2, 0.1, 0.3), 1, 150, 1150, 54);
  return { gl: true, svg: s, ui: u };
});
