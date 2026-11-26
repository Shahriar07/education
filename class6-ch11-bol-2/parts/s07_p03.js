/* ৭গ: drawn */
part('s07_p03', { scene: 7, label: '৭গ', last: true, title: "প্রশ্ন: কোন যন্ত্র?",
  screen: "প্রশ্ন-কার্ড, বিরতি, উত্তর।" }, [
  { c: "বলো তো, পাহাড়ের রাস্তা কেন এঁকেবেঁকে ওঠে, সোজা নয়?" },
  { c: "ভাবো।" },
  { c: "ঠিক! এঁকেবেঁকে ওঠা রাস্তা আসলে লম্বা একটা হেলানো তল। পথ বেশি, কিন্তু উঠতে বল লাগে কম।" }
], function (t, S) {
  /* a bare rocky hill: the straight road up is steep, the winding road is a long, gentle inclined plane to the same height */
  let s = `<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ec3ee"/><stop offset="1" stop-color="#d9eefa"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#sk)"/>`, u = '';
  s += `<polygon points="200,900 560,560 760,420 960,250 1180,400 1400,560 1760,900" fill="#9c7a54" stroke="#6e5234" stroke-width="6"/><polygon points="760,420 960,250 1020,300 900,360" fill="#b8956a"/><rect x="0" y="880" width="1920" height="200" fill="#b99a6a"/>`;
  const zig = [[620, 880], [1380, 820], [700, 700], [1260, 640], [800, 520], [1120, 470], [900, 380], [1030, 330], [960, 262]];
  const o2 = t >= S.A(2) ? S.P(2, 0.2, 0.4) : 0;
  s += `<polyline points="${zig.map(p => p.join(',')).join(' ')}" fill="none" stroke="#4a4a4e" stroke-width="22" stroke-linejoin="round" stroke-linecap="round"/><polyline points="${zig.map(p => p.join(',')).join(' ')}" fill="none" stroke="${o2 > 0 ? Y : '#e8e2d2'}" stroke-width="5" stroke-dasharray="20 14"/>`;
  s += `<line x1="960" y1="880" x2="960" y2="262" stroke="#ff6b5e" stroke-width="8" stroke-dasharray="16 12" opacity="0.8"/>`;
  u += card('পাহাড়ের রাস্তা কেন এঁকেবেঁকে ওঠে, সোজা নয়?', S.P(0, 0.1, 0.3), 1, 110, 1250, 56);
  if (t >= S.A(1) && t < S.A(2)) u += lab(960, 560, `<span style="font-size:80px">ভাবো...</span>`, 'name', S.P(1, 0.05, 0.2));
  if (t >= S.A(2)) { u += lab(1500, 700, 'এঁকেবেঁকে: লম্বা হেলানো তল, বল কম', 'name', o2) + lab(720, 980 - 140, 'সোজা: খাড়া, বল বেশি', 'name', o2); s += grp(o2, `<path d="M1500,600 l20,24 l40,-46" fill="none" stroke="#2fbf5a" stroke-width="14" stroke-linecap="round"/>`); }
  return { svg: s, ui: u };
});
