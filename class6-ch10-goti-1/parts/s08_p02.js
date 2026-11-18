/* ৮খ: the two steps of the pen activity */
part('s08_p02', { scene: 8, label: '৮খ', title: 'নিজে করো: দুই ধাপ',
  screen: 'হলুদ বৃত্তে "১": হাত কলম স্থির ধরে আছে, বই ও খাতা পর্যন্ত ডটেড রেখা একই থাকে। হলুদ বৃত্তে "২": হাত কলম নাড়ায়, রেখা বারবার বদলায়।' }, [
  { c: "এক। কলমটা হাতে স্থির করে ধরো। বই আর খাতা থেকে কলমের দূরত্ব ও দিক লক্ষ করো।" },
  { c: "দুই। এবার কলমটা এদিক-সেদিক নাড়াতে থাকো। আবার দূরত্ব ও দিক লক্ষ করো।" }
], function (t, S) {
  let s = wallBg() + desk() + bookSide(380, 320) + khataSide(1250, 280);
  const p = PEN_REST, bx = 540, by = DESK.TOP - 46, kx = 1390, ky = DESK.TOP - 14;
  const m = ease(S.P(1, 0.1, 0.3));
  const hx = p.x + m * 170 * Math.sin(2 * Math.PI * t / 2.4), hy = p.y + m * 70 * Math.sin(2 * Math.PI * t / 1.7), a = p.a + m * 9 * Math.sin(2 * Math.PI * t / 2.1);
  s += measure(hx, hy, bx, by, NAVY, S.P(0, 0.3, 0.45)) + measure(hx, hy, kx, ky, NAVY, S.P(0, 0.4, 0.55));
  s += handPen(hx, hy, a);
  s += badge(150, 220, S.on(0) ? 1 : 2, S.on(0) ? S.P(0, 0, 0.12) : S.P(1, 0, 0.12));
  return { svg: s, ui: '' };
});
