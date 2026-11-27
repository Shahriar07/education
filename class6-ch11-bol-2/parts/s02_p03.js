/* ২গ: drawn */
part('s02_p03', { scene: 2, label: '২গ', title: "চিত্র ১১.৫: বলবাহু ও ভারবাহু",
  screen: "3D দণ্ড, ত্রিভুজ ফালক্রাম, বল ও ভার; দুই বাহু মাপের দাগ দিয়ে।" }, [
  { c: "এবার চিত্র ১১.৫। বল যেখানে দিচ্ছি, সেখান থেকে ফালক্রাম পর্যন্ত দূরত্ব হলো বলবাহু।" },
  { c: "আর ভার থেকে ফালক্রাম পর্যন্ত দূরত্ব হলো ভারবাহু।" }
], function (t, S) {
  /* fig 11.5: plank on a wedge, effort arm a = 1.0 m, load arm b = 0.5 m; the three parts, then the two arms measured */
  const a = 1.0, P = W3.frame({ cam: C11.plank(), plank: { a }, sun: [-14, 34, 26] });
  let s = '', u = figTag('চিত্র ১১.৫: লিভারের অংশ');
  const [fx, fy] = P(PL.XF, PL.YT, PL.Z), [lx, ly] = P(PL.XL, PL.YT + 2 * PL.BR[1], PL.Z), [wx, wy] = P(PL.XF + a, PL.H, PL.Z + 0.1), [, by] = P(PL.X, PL.H - 0.07, PL.Z + 0.1);
  const N = 3, o = S.P(0, 0, 0.15);   // 3 px per newton for both arrows
  s += arrow2(fx, fy - 30 - plForce(a) * N, fx, fy - 6, o, Y) + arrow2(lx, ly, lx, ly + PL.Wt * N, o, '#ff6b5e');
  u += lab(fx, fy - 70 - plForce(a) * N, 'বল', 'name', o) + lab(lx + 120, ly - 30, 'ভার', 'name', o) + lab(wx, wy + 160, 'ফালক্রাম', 'name', o);
  const o1 = S.P(0, 0.3, 0.6), o2 = t >= S.A(1) ? S.P(1, 0.15, 0.45) : 0, [lxb] = P(PL.XL, PL.H, PL.Z + 0.1);
  s += armBar(fx, wx, by + 40, Y, o1); u += lab((fx + wx) / 2, by + 90, 'বলবাহু', 'move', o1);
  s += armBar(wx, lxb, by + 40, '#7fd1ff', o2); u += lab((wx + lxb) / 2, by + 90, 'ভারবাহু', 'move', o2);
  return { gl: true, svg: s, ui: u };
});
