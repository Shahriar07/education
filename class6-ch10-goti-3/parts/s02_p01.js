/* ২ক: চিত্র ১০.১১ (p. 87) in the 3D school field, seen from the side: north left, south right. Anila (a labelled eye)
   walks 10 m south, turns, and walks 4 m north, steadily at ANI.V. The yellow trail is the path walked (distance); the
   return leg lies 0.7 m nearer so both legs can be seen. Sun from the south-west: every shadow falls to the north-east. */
const ANI = { V: 1.6, S: 10, N: 4, SUN: [24, 38, 20], ZB: 0.7, T0: 2.0,
  /* metres walked -> position south of the start, and distance nearer than the line */
  pos: d => d <= 10 ? d : 10 - (d - 10), z: d => d <= 10 ? 0 : ANI.ZB * Math.min(1, (d - 10) / 0.7) };
/* the yellow trail of the first d metres walked */
function aniTrail(P, d, o = 1) {
  const X = ROAD.NS.X, Z = ROAD.NS.Z; if (d <= 0.02) return '';
  let s = path3(P, [[X, 0.02, Z], [X + Math.min(d, 10), 0.02, Z]], Y, 11, '', o);
  if (d > 10) { const p = []; for (let k = 0; k <= 12; k++) { const u = 10 + (d - 10) * k / 12; p.push([X + ANI.pos(u), 0.02, Z + ANI.z(u)]); } s += path3(P, p, Y, 11, '', o); }
  return s;
}
/* "উত্তর <-> দক্ষিণ" as in the figure */
function nsCompass(y, o = 1) {
  return g(o, `<rect x="560" y="${y - 48}" width="800" height="96" rx="48" fill="#0f1b3d" opacity=".9"/>` + txt(690, y + 17, 'উত্তর', 52) + txt(1235, y + 17, 'দক্ষিণ', 52))
    + arrow2(945, y, 800, y, o, '#fff') + arrow2(975, y, 1120, y, o, '#fff');
}
/* a measure below the line, its ends exactly under the a and b metre marks of the line */
function nsMeasure(P, a, b, dy, label, o) {
  const X = ROAD.NS.X, Z = ROAD.NS.Z; if (o <= 0) return { svg: '', ui: '' };
  const [x1, y0] = P(X + a, 0.02, Z), [x2] = P(X + b, 0.02, Z), y1 = y0 + dy, y2 = y1, m = (x1 + x2) / 2;
  return { svg: arrow2(m, y1, x1, y1, o, '#fff') + arrow2(m, y2, x2, y2, o, '#fff'), ui: lab(m, y1, label, 'move', o) };
}

part('s02_p01', { scene: 2, label: '২ক', first: true, title: "চিত্র ১০.১১: আনিলার দূরত্ব",
  screen: "3D স্কুলের মাঠ, পাশ থেকে, চিত্র ১০.১১-এর মতো: উত্তর বাঁয়ে, দক্ষিণ ডানে। মাটিতে এক মিটার পর পর চুনের দাগ, শুরুতে খুঁটি। \"আনিলা\" লেখা চোখ ১০ মিটার দক্ষিণে যায়, তারপর ৪ মিটার উত্তরে ফেরে; পেছনে হলুদ পথের দাগ, পাশে চলমান \"মোট পথ\" গণনা। শব্দ-কার্ড: দূরত্ব (Distance)।" }, [
  { c: "গত ভিডিওর ধাঁধাটা মনে আছে? আনিলা এক জায়গা থেকে ১০ মিটার দক্ষিণে গেল।" },
  { c: "তারপর উল্টো দিকে ঘুরে ৪ মিটার উত্তরে এলো।" },
  { c: "সে মোট পথ হাঁটল ১০ যোগ ৪, মানে ১৪ মিটার।" },
  { c: "যেদিকেই যাও, মোট যতটা পথ চললে, সেটাই দূরত্ব।" },
  { d: 1.2 }
], function (t, S) {
  const X = ROAD.NS.X, Z = ROAD.NS.Z, tA = S.A(0) + ANI.T0, t10 = tA + ANI.S / ANI.V, tTurn = Math.max(t10, S.A(1) + 0.3), tB = tTurn + ANI.N / ANI.V;
  const d = t < tA ? 0 : t < tTurn ? Math.min(10, ANI.V * (t - tA)) : Math.min(14, 10 + ANI.V * (t - tTurn));
  const P = W3.frame({ cam: W3.nsSide(), sun: ANI.SUN });
  let s = aniTrail(P, d), u = `<div class="abs" style="right:60px;top:48px"><span class="fig">চিত্র ১০.১১</span></div>`;
  s += `<g transform="translate(200,0)">${nsCompass(80)}</g>`;
  s += dot3(P, [X, 0.02, Z], '#fff', 13);
  const [sx, sy] = P(X, 0.02, Z); u += lab(sx - 105, sy + 8, 'শুরু', 'name');
  const m1 = nsMeasure(P, 0, 10, 150, '১০ মি.', pr(t, t10 - 0.2, t10 + 0.2)); s += m1.svg; u += m1.ui;
  const m2 = nsMeasure(P, 6, 10, 80, '৪ মি.', pr(t, tB - 0.2, tB + 0.2)); s += m2.svg; u += m2.ui;
  const ob = placed(P, X + ANI.pos(d), 1.4, Z + ANI.z(d), 0.02, 'আনিলা'); s += ob.svg; u += ob.ui;
  u += readout(60, 360, 'মোট পথ', BNF(Math.floor(d + 1e-6)) + ' মি.', pr(t, tA, tA + 0.4));
  if (t >= S.A(2)) u += lab(1500, 420, '১০ + ৪ = ১৪ মিটার', 'move', S.P(2, 0.3, 0.45) * (1 - S.P(3, 0, 0.08)));
  if (t >= S.A(3)) u += termCard('দূরত্ব', 'Distance', S.P(3, 0.15, 0.3), 1, 1560, 470, 0.75);
  return { gl: true, svg: s, ui: u };
});
