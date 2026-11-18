/* ৬ঘ: both cases side by side, then the term card প্রসঙ্গ-কাঠামো */
part('s06_p04', { scene: 6, label: '৬ঘ', last: true, title: 'দুই কেস পাশাপাশি; প্রসঙ্গ-কাঠামো',
  screen: 'নেভি পটভূমি, দুই কেস পাশাপাশি। বাঁয়ে "১": দাঁড়ানো চোখ, গাড়ি তার পাশ দিয়ে চলে যায়, "গতিশীল"। ডানে "২": গাড়ির ভেতরে দুটো চোখ, মাঝের রেখা একই থাকে, "স্থির"। টার্ম-কার্ড: প্রসঙ্গ-কাঠামো / Frame of reference। তারপর কার্ড "কার সাপেক্ষে?" ও "কোনো বস্তুই পরম স্থিতি বা পরম গতিতে নেই"।' }, [
  { c: "যার সাপেক্ষে আমরা স্থিতি বা গতি মাপি, তাকে বলে প্রসঙ্গ-কাঠামো।" },
  { c: "প্রসঙ্গ-কাঠামো বদলালে উত্তরও বদলে যায়। তাই মাপার আগে ঠিক করে নিতে হয়, কার সাপেক্ষে মাপছি।" },
  { c: "এই মহাবিশ্বে কোনো বস্তুই পরম স্থিতি বা পরম গতিতে নেই।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  const dim = 1 - 0.75 * Math.max(S.P(0, 0.45, 0.6) * (1 - S.P(1, 0, 0.1)), S.P(2, 0, 0.1));
  // case 1: the car passes a standing eye, left to right, uniform
  const x1 = 120 + ((t * 160) % 760);
  s += g(dim, `<rect x="60" y="300" width="860" height="560" rx="36" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>` + badge(120, 360, 1) +
    `<rect x="60" y="740" width="860" height="8" fill="#33488c"/>` + carIcon(x1, 740, 0.62) + eye(490, 840 - 40, 0.6) + txt(490, 870 - 20, '', 1) +
    txt(640, 400, 'দাঁড়ানো বন্ধুর চোখে', 44, { c: '#fff', w: 600 }) + txt(490, 600, 'গতিশীল', 64, { c: Y }));
  // case 2: two eyes inside the car, the line between them does not change
  s += g(dim, `<rect x="1000" y="300" width="860" height="560" rx="36" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>` + badge(1060, 360, 2) +
    carIcon(1430, 760, 1.15) + eye(1340, 615, 0.32) + eye(1520, 615, 0.32) + measure(1370, 650, 1490, 650, Y) +
    txt(1580, 400, 'তোমার চোখে', 44, { c: '#fff', w: 600 }) + txt(1430, 520, 'স্থির', 64, { c: '#7ee2a8' }));
  if (S.on(0)) u += termCard('প্রসঙ্গ-কাঠামো', 'Frame of reference', S.P(0, 0.5, 0.65), 1, 960, 560);
  if (S.on(1)) u += card('কার সাপেক্ষে?', S.P(1, 0.55, 0.7), 1, 120, 700, 80);
  if (S.on(2)) u += card('কোনো বস্তুই <span style="color:#c77d00">পরম স্থিতি</span> বা <span style="color:#c77d00">পরম গতিতে</span> নেই', S.P(2, 0.1, 0.25), 1, 420, 1300, 64);
  return { svg: s, ui: u };
});
