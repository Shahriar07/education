/* ২ঘ: fig 10.12: 7 km forward, 5 km back (map-like line: people and kilometres are not to one scale). Only a hint, no answer. */
part('s02_p04', { scene: 2, label: '২ঘ', last: true, title: "চিত্র ১০.১২: মিসেস রাশিদা, হিন্ট",
  screen: "চিত্র ১০.১২-এর মতো রেখা, \"স্কেল অনুযায়ী নয়\"। \"মিসেস রাশিদা\" লেখা চোখ সামনে ৭ কিলোমিটার যায়, বাঁক নিয়ে পেছনে ৫ কিলোমিটার আসে। প্রশ্ন: দূরত্ব? সরণ? হিন্ট-কার্ড। উত্তর দেখানো হয় না।" }, [
  { c: "এবার তোমার পালা। মিসেস রাশিদা সামনের দিকে ৭ কিলোমিটার হাঁটলেন।" },
  { c: "তারপর বাঁক নিয়ে পেছনের দিকে এলেন ৫ কিলোমিটার।" },
  { c: "তাঁর দূরত্ব কত? সরণ কত?" },
  { c: "হিন্ট: একটার জন্য যোগ লাগবে, আরেকটার জন্য বিয়োগ। কোনটার জন্য কোনটা, সেটা তুমি ভাবো।" },
  { d: 2.5 }
], function (t, S) {
  const PX = 150, X0 = 420, YL = 520, t0 = S.A(0) + 1.2, V = 1.8, d = cl(V * (t - t0), 0, t < S.A(1) + 0.3 ? 7 : 12 - Math.max(0, 5 - V * Math.max(0, t - S.A(1) - 0.3))), pos = d <= 7 ? d : 14 - d;
  let s = bg(NAVY), u = `<div class="abs" style="right:60px;top:48px"><span class="fig">চিত্র ১০.১২</span></div>` + lab(300, 190, 'স্কেল অনুযায়ী নয়', 'name');
  s += `<line x1="${X0 - 160}" y1="${YL}" x2="${X0 + 7 * PX + 160}" y2="${YL}" stroke="#7d90c4" stroke-width="10"/>`;
  for (let k = 0; k <= 7; k++) s += `<line x1="${X0 + k * PX}" y1="${YL - 16}" x2="${X0 + k * PX}" y2="${YL + 16}" stroke="#7d90c4" stroke-width="6"/>`;
  s += hArrow(X0, X0 + Math.min(d, 7) * PX, YL + 62, d > 0.3 ? 1 : 0, Y); if (d > 7.3) s += hArrow(X0 + 7 * PX, X0 + pos * PX, YL + 150, 1, Y);
  s += `<circle cx="${X0}" cy="${YL}" r="16" fill="#fff"/>`; u += lab(X0 - 130, YL - 60, 'শুরু', 'name');
  if (d >= 7) u += lab(X0 + 3.5 * PX, YL + 62, '৭ কিলোমিটার', 'move'); if (d >= 11.9) u += lab(X0 + 4.5 * PX, YL + 150, '৫ কিলোমিটার', 'move');
  const ob = observer(X0 + pos * PX, YL - 190, 'মিসেস রাশিদা', 1, 0.5); s += ob.svg + `<line x1="${F(X0 + pos * PX)}" y1="${YL - 60}" x2="${F(X0 + pos * PX)}" y2="${YL - 8}" stroke="#fff" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round"/>`; u += ob.ui;
  if (t >= S.A(2)) u += lab(700, 190, '<span style="font-size:56px">দূরত্ব = ?</span>', 'move', S.P(2, 0.05, 0.3)) + lab(1200, 190, '<span style="font-size:56px">সরণ = ?</span>', 'move', S.P(2, 0.4, 0.65));
  if (t >= S.A(3)) u += hintCard('কোনটায় যোগ, কোনটায় বিয়োগ?', S.P(3, 0.05, 0.2), 780);
  return { svg: s, ui: u };
});
