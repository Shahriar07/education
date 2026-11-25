/* ৫ঙ: the cover goes back into line, the flame is seen again; the straight path from the flame to the eye: a ray of light */
part('s05_p05', { scene: 5, label: '৫ঙ', last: true, title: "আলোকরশ্মি",
  screen: "কভারটা আবার আগের জায়গায় ফিরে আসে; শিখা আবার দেখা যায় (সবুজ টিক)। পাশ থেকে শিখা থেকে চোখ পর্যন্ত একটা উজ্জ্বল সোজা রেখা, তীর চোখের দিকে। শব্দ-কার্ড: সরলরেখা (Straight line), তারপর আলোকরশ্মি (Ray of light)।" }, [
  { c: "কভারটা আবার জায়গায় আনো, শিখা আবার দেখা যায়।" },
  { c: "তাহলে কী সিদ্ধান্ত নেবে?" },
  { c: "আলো বাঁকা পথে চলে না, চলে সরলরেখায়।" },
  { c: "আলোর এই সরলরৈখিক পথকেই বলে আলোকরশ্মি।" }
], function (t, S) {
  const back = ease(S.P(0, 0.1, 0.5)), shift = [0, SHIFT2 * (1 - back), 0], clear = back > 0.999;
  const kr = clear ? ease(S.P(0, 0.55, 0.95)) : 0;
  const P = W3.frame({ cam: C9.side(), t, dim: 0.55, exp: { shift, lit: 1 }, ray: kr > 0 ? { a: EXP.CANDLE, b: EXP.CANDLE + (EXP.EYE - EXP.CANDLE) * kr, r: 0.0022 } : undefined });
  let s = '', u = figTag('চিত্র ৯.১: আলো সরলরেখায় চলে', S.P(0, 0, 0.15) * (1 - S.P(2, 0, 0.1)));
  const [ex, ey] = P(...expPt(EXP.EYE)), ob = observer(ex, ey, 'তুমি', 1, 0.3); s += ob.svg; u += ob.ui;
  s += tick(ex + 10, ey - 120, 26, S.P(0, 0.9, 1));
  /* an arrow along the ray, near the eye, pointing at it */
  if (kr > 0.99) { const [a1, b1] = P(...expPt(EXP.CARDS[0] - 0.05)), [a2, b2] = P(...expPt(EXP.EYE + 0.05)); s += arrow2(a1, b1 - 36, a2, b2 - 36, S.P(1, 0, 0.3)); }
  u += termCard('সরলরেখা', 'Straight line', S.P(2, 0.3, 0.5), 1 - S.P(3, 0, 0.1), 960, 340, 0.72);
  u += termCard('আলোকরশ্মি', 'Ray of light', S.P(3, 0.25, 0.45), 1, 960, 340, 0.8);
  return { gl: true, svg: s, ui: u };
});
