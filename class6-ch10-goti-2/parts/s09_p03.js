/* ৯গ: teaser from পাঠ ৯ (p. 87): Anila (a labelled eye) walks 10 m south, then 4 m north, at a steady 1.4 m/s,
   along a north–south line drawn as in চিত্র ১০.১১ (উত্তর to the left, দক্ষিণ to the right). Scale 90 px per metre.
   Then the two questions and the next-video card. The answers (14 m and 6 m) are left for the next video. */
const ANL = { PX: 90, X0: 600, YL: 560, V: 1.4, S: 10, N: 4 };

part('s09_p03', { scene: 9, label: '৯গ', last: true, title: "ধাঁধা ও পরের ভিডিও",
  screen: "নেভি পটভূমি, বইয়ের চিত্র ১০.১১-এর মতো উত্তর-দক্ষিণ রেখা (উত্তর বাঁয়ে, দক্ষিণ ডানে)। \"আনিলা\" লেখা চোখ ১০ মিটার দক্ষিণে যায় (ওপরে পথের দাগ, \"১০ মি\"), তারপর ৪ মিটার উত্তরে ফেরে (নিচে পথের দাগ, \"৪ মি\")। প্রশ্ন-কার্ড: \"মোট কত পথ হাঁটল? শুরু থেকে কতদূরে?\" তারপর \"পরের ভিডিও\" কার্ড: দূরত্ব ও সরণ, দ্রুতি ও বেগ।" }, [
  { c: "শেষে একটা ধাঁধা। আনিলা ১০ মিটার দক্ষিণে গেল, তারপর ৪ মিটার উত্তরে ফিরে এলো।" },
  { c: "সে মোট কতটা পথ হাঁটল? আর শুরুর জায়গা থেকে এখন কতদূরে?" },
  { c: "দুটো উত্তর আলাদা কেন? জানব পরের ভিডিওতে: দূরত্ব ও সরণ।" },
  { d: 2.5 }
], function (t, S) {
  const { PX, X0, YL, V, S: SM, N } = ANL;
  let s = bg(NAVY), u = '';
  const t0 = S.A(0) + 1.2, tS = SM / V, tN = N / V;                // 7.1 s south, 2.9 s north
  const u1 = t - t0;
  let pos = 0;                                                      // metres south of the start
  if (u1 > 0) pos = u1 < tS ? V * u1 : Math.max(SM - N, SM - V * (u1 - tS));
  if (t >= S.A(2)) { s += ''; }
  const fade = 1 - S.P(2, 0, 0.2);
  // the line and directions
  let d = `<line x1="${X0 - 200}" y1="${YL + 80}" x2="${X0 + SM * PX + 200}" y2="${YL + 80}" stroke="#5d6f9e" stroke-width="6"/>`;
  d += `<circle cx="${X0}" cy="${YL + 80}" r="12" fill="#fff"/>`;
  if (u1 > 0) d += hArrow(X0, X0 + Math.min(V * u1, SM) * PX, YL + 10, 1, Y);
  if (u1 > tS) d += hArrow(X0 + SM * PX, X0 + pos * PX, YL + 130, 1, '#7fd1ff');
  s += g(fade, d);
  u += lab(X0 + SM * PX / 2, YL - 380, 'উত্তর ⟵ ⟶ দক্ষিণ', 'name', fade);   // as in চিত্র ১০.১১
  if (u1 > 0) u += lab(X0 + SM * PX / 2, YL - 40, '১০ মি', 'move', pr(t, t0 + tS - 0.3, t0 + tS) * fade);
  if (u1 > tS) u += lab(X0 + (SM - N / 2) * PX, YL + 185, '৪ মি', 'move', pr(t, t0 + tS + tN - 0.3, t0 + tS + tN) * fade);
  const ob = observer(X0 + pos * PX, YL - 230, 'আনিলা', fade, 0.5);
  s += ob.svg; u += ob.ui;
  u += lab(X0, YL + 130, 'শুরু', 'name', fade);
  if (t >= S.A(1) && t < S.A(2) + 0.4) u += `<div class="abs" style="left:310px;width:1300px;top:770px;opacity:${(S.fin(1) * fade).toFixed(2)}"><div class="qcard" style="font-size:56px;padding:26px 40px 20px;transform:scale(${back(S.P(1, 0, 0.25)).toFixed(3)})">মোট কত পথ হাঁটল? শুরু থেকে এখন কতদূরে?</div></div>`;
  if (t >= S.A(2)) {
    const p = S.P(2, 0.15, 0.4);
    u += `<div class="abs" style="left:0;width:1920px;top:260px;display:flex;justify-content:center;opacity:${cl(p).toFixed(2)}"><div style="transform:scale(${back(p).toFixed(3)})"><div class="banner" style="font-size:64px;padding:18px 60px 10px">পরের ভিডিও</div></div></div>`;
    u += `<div class="abs" style="left:0;width:1920px;top:470px;display:flex;justify-content:center;gap:40px;opacity:${S.P(2, 0.35, 0.55).toFixed(2)}"><div class="card" style="width:640px">দূরত্ব ও সরণ</div><div class="card" style="width:640px">দ্রুতি ও বেগ</div></div>`;
  }
  return { svg: s, ui: u };
});
