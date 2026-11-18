/* ৫গ: চিত্র ১০.৫ (বক্রগতি). A wavy path with a dot at each end, as in the book. A point travels along it at a
   steady speed (equal path length each second, from an arc-length table), its direction arrow turning with the path. */
const F105 = (function () {
  const X0 = 280, X1 = 1640, Y0 = 560, N = 600;
  const at = u => [X0 + (X1 - X0) * u, Y0 - 120 * Math.sin(2 * Math.PI * 1.75 * u) * (0.55 + 0.45 * u) + 40 * Math.sin(2 * Math.PI * 4.2 * u)];
  const pts = [], cum = [0];
  for (let k = 0; k <= N; k++) pts.push(at(k / N));
  for (let k = 1; k <= N; k++) cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
  const len = cum[N];
  function point(sPx) {                 // point and tangent angle at path length sPx
    sPx = cl(sPx, 0, len); let k = 1; while (k < N && cum[k] < sPx) k++;
    const f = (sPx - cum[k - 1]) / (cum[k] - cum[k - 1] || 1), p = pts[k - 1], q = pts[k];
    return [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f, Math.atan2(q[1] - p[1], q[0] - p[0])];
  }
  return { pts, len, point, V: 0 };
})();

part('s05_p03', { scene: 5, label: '৫গ', title: "চিত্র ১০.৫: বক্রপথ",
  screen: "2D, বইয়ের মতো একটা ঢেউখেলানো বাঁকা পথ, শুরুতে আর শেষে বিন্দু। একটা হলুদ বিন্দু সমান বেগে পথ ধরে চলে, পেছনে পথ উজ্জ্বল হয়, সামনের তীর পথের সাথে দিক বদলায়। শেষ বাক্যে একই পথে ওপর থেকে দেখা একটা বাস মোড় নিতে নিতে চলে। চিত্র-লেবেল: চিত্র ১০.৫: বক্রগতি।" }, [
  { c: "চিত্র ১০.৫। এখানে একটা বস্তু চলছে বাঁকা পথে।" },
  { c: "পথের প্রতিটা জায়গায় তার দিক বদলাচ্ছে। এটা বক্রগতি।" },
  { c: "বাঁকা রাস্তায় বাস যখন মোড় নেয়, তখনও তাই।" }
], function (t, S) {
  const { pts, len, point } = F105;
  let s = bg(NAVY), u = '';
  const d = pts.map((p, k) => (k ? 'L' : 'M') + F(p[0]) + ' ' + F(p[1])).join(' ');
  if (t < S.A(2)) {
    // the point: one pass from the start of sentence 1 to the end of sentence 2, at a steady speed
    const tA = S.A(0) + 0.8, tB = S.E(1) - 0.3, sp = len * cl((t - tA) / (tB - tA));
    s += `<path d="${d}" fill="none" stroke="#5d6f9e" stroke-width="7" stroke-dasharray="3 14" stroke-linecap="round"/>`;
    s += `<path d="${d}" fill="none" stroke="${Y}" stroke-width="7" stroke-dasharray="${F(sp)} 99999" stroke-linecap="round"/>`;
    s += `<circle cx="${F(pts[0][0])}" cy="${F(pts[0][1])}" r="14" fill="#fff"/><circle cx="${F(pts[pts.length - 1][0])}" cy="${F(pts[pts.length - 1][1])}" r="14" fill="#fff"/>`;
    const [x, y, a] = point(sp);
    const L = 120 * S.fin(1);                         // the direction arrow: shown once the sentence names it
    if (L > 30) s += arrow2(x, y, x + L * Math.cos(a), y + L * Math.sin(a), 1);
    s += `<circle cx="${F(x)}" cy="${F(y)}" r="20" fill="${Y}" stroke="#0f1b3d" stroke-width="5"/>`;
  } else {
    // a bus seen from above takes the same bends, at a steady speed
    const p = S.P(2, 0.05, 0.98), sp = len * p;
    s += `<path d="${d}" fill="none" stroke="#3c4656" stroke-width="150" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<path d="${d}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="30 30" opacity=".7"/>`;
    const [x, y, a] = point(sp);
    s += `<g transform="translate(${F(x)},${F(y)}) rotate(${F(a * 180 / Math.PI)})"><rect x="-120" y="-34" width="240" height="68" rx="14" fill="#f1e7cf" stroke="#1f7a4d" stroke-width="8"/>
      <rect x="70" y="-26" width="40" height="52" rx="6" fill="#1d2a36"/><rect x="-80" y="-16" width="44" height="32" rx="4" fill="#d6ccb4"/><rect x="-10" y="-16" width="44" height="32" rx="4" fill="#d6ccb4"/></g>`;
    s += arrow2(x, y, x + 200 * Math.cos(a), y + 200 * Math.sin(a), S.fin(2));
    u += lab(960, 860, 'ওপর থেকে দেখা', 'name', S.fin(2));
  }
  u += figTag('চিত্র ১০.৫: বক্রগতি', S.fin(0));
  return { svg: s, ui: u };
});
