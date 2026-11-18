/* ৯গ: puzzle and next-video teaser. Fan: steady turning. Swing: a pendulum of length L = 2 m,
   θ = θ0 cos(2πt/T) with T = 2π√(L/g) = 2.84 s (g = 9.8 m/s²), θ0 = 18°. Bus: uniform speed. */
const SWING = { L: 2.0, G: 9.8, TH0: 18 };
part('s09_p03', { scene: 9, label: '৯গ', last: true, title: 'ধাঁধা ও পরের ভিডিও',
  screen: 'নেভি পটভূমি। তিনটি ছবি একে একে: ঘুরন্ত সিলিং ফ্যান, পাশ থেকে দেখা দুলন্ত দোলনা (বাঁশের কাঠামো, দড়ি, পিঁড়ি; সামনে-পেছনে দোলে), সোজা ছুটন্ত বাস। মাঝে প্রশ্নচিহ্ন। তারপর কার্ড "পরের ভিডিও: নানা প্রকার গতি"।' }, [
  { c: "শেষে একটা ধাঁধা। সিলিং ফ্যান ঘোরে, দোলনা দোলে, আর বাস সোজা ছুটে যায়।" },
  { c: "সবই তো গতি। কিন্তু সব গতি কি একরকম?" },
  { c: "পরের ভিডিওতে দেখব, নানা প্রকার গতি। ততক্ষণ ভালো থেকো।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  const T = 2 * Math.PI * Math.sqrt(SWING.L / SWING.G), th = SWING.TH0 * Math.cos(2 * Math.PI * t / T);
  const a = S.P(0, 0.05, 0.2), b = S.P(0, 0.3, 0.45), c = S.P(0, 0.6, 0.75), dim = 1 - 0.6 * S.P(2, 0, 0.15);
  s += g(a * dim, fanIcon(380, 520, 1.0, t * 300)) + txt(380, 820, 'ঘোরে', 52, { c: Y, op: a * dim });
  s += g(b * dim, swingSide(960, 330, 340, th, 760)) + txt(960, 820, 'দোলে', 52, { c: Y, op: b * dim });   // seen from the side: it swings forward and back, not along its beam
  const bx = 1380 + ((t * 120) % 400);
  s += g(c * dim, `<clipPath id="bc"><rect x="1300" y="400" width="600" height="400"/></clipPath><g clip-path="url(#bc)">${busIcon(bx, 690, 0.42)}</g><rect x="1320" y="690" width="560" height="6" fill="#33488c"/>`) + txt(1580, 820, 'সোজা ছোটে', 52, { c: Y, op: c * dim });
  s += txt(960, 180, '?', 150, { c: Y, op: S.P(1, 0.1, 0.3) * dim });
  if (S.on(2)) u += card('পরের ভিডিও<br><span style="color:#c77d00;font-size:90px">নানা প্রকার গতি</span>', S.P(2, 0.05, 0.2), 1, 300, 1100, 64);
  return { svg: s, ui: u };
});
