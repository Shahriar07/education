/* ৭ঘ: creative 2: the A-B-C figure (p. 92). The particle covers AB (8 m) in 3 s and BC (4 m) in 1 s, real time, again and again. Hints only. */
part('s07_p04', { scene: 7, label: '৭ঘ', title: "হিন্ট: সৃজনশীল ২ (A–B–C)",
  screen: "বইয়ের রেখাচিত্র চলমান: A থেকে কণা ৩ সেকেন্ডে ৮ মিটার গিয়ে B, আরও ১ সেকেন্ডে ৪ মিটার গিয়ে C। দুই অংশ আলাদা রঙে। উত্তর দেখানো হয় না।" }, [
  { c: "সৃজনশীল প্রশ্ন দুই। স্থিতি আর প্রসঙ্গ কাঠামোর হিন্ট: কার সাপেক্ষে দেখছ?" },
  { c: "কণাটা দেখো। A থেকে B আট মিটার, তিন সেকেন্ডে। B থেকে C চার মিটার, এক সেকেন্ডে।" },
  { c: "গড় বেগের হিন্ট: পুরো সরণ, পুরো সময়, আর দিক।" },
  { c: "বেগের পার্থক্য চাইলে দুই অংশের বেগ আলাদা বের করো।" },
  { d: 2.0 }
], function (t, S) {
  let s = bg(NAVY), u = ''; const X0 = 390, PX = 95, YL = 500, q = Math.max(0, t - S.A(1)) % 6, d = q < 3 ? 8 * q / 3 : Math.min(12, 8 + 4 * (q - 3)), xA = X0, xB = X0 + 8 * PX, xC = X0 + 12 * PX;
  s += `<line x1="${xA}" y1="${YL}" x2="${xB}" y2="${YL}" stroke="#fff" stroke-width="8"/><line x1="${xB}" y1="${YL}" x2="${xC}" y2="${YL}" stroke="#7fd1ff" stroke-width="8"/>`;
  s += hArrow((xA + xB) / 2, xA, YL - 110, 1, '#fff') + hArrow((xA + xB) / 2, xB, YL - 110, 1, '#fff') + hArrow((xB + xC) / 2, xB, YL - 110, 1, '#7fd1ff') + hArrow((xB + xC) / 2, xC, YL - 110, 1, '#7fd1ff');
  [[xA, 'A'], [xB, 'B'], [xC, 'C']].forEach(([x, n]) => { s += `<circle cx="${x}" cy="${YL}" r="15" fill="#fff"/>` + txt(x, YL + 76, n, 56); });
  u += lab((xA + xB) / 2, YL - 170, '৮ মিটার', 'name') + lab((xB + xC) / 2, YL - 170, '৪ মিটার', 'name') + lab((xA + xB) / 2, YL + 60, '৩ সেকেন্ড', 'name') + lab((xB + xC) / 2, YL + 60, '১ সেকেন্ড', 'name');
  s += `<circle cx="${F(X0 + d * PX)}" cy="${YL}" r="26" fill="${Y}" stroke="#0f1b3d" stroke-width="5"/>`; s += clock(1720, 460, 90, q);
  u += qTop('সৃজনশীল প্রশ্ন ২', S.P(0, 0.02, 0.15), 160, 54);
  if (t < S.A(1)) u += hintCard('স্থিতি, প্রসঙ্গ কাঠামো: কার সাপেক্ষে দেখছ?', S.P(0, 0.4, 0.55), 750);
  if (t >= S.A(2) && t < S.A(3)) u += hintCard('গড় বেগ: পুরো সরণ, পুরো সময়, আর দিক', S.P(2, 0.05, 0.25), 750);
  if (t >= S.A(3)) u += hintCard('AB আর BC-র বেগ আলাদা বের করো', S.P(3, 0.05, 0.25), 750);
  return { svg: s, ui: u };
});
