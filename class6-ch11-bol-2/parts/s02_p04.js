/* ২ঘ: drawn */
part('s02_p04', { scene: 2, label: '২ঘ', title: "লিভারের নীতি",
  screen: "নীতির কার্ড; দুই বাহু বদলায়, তীর বদলায়।" }, [
  { c: "লিভারের নীতি হলো, বল গুণ বলবাহু সমান ভার গুণ ভারবাহু।" },
  { c: "তাই ভারবাহু যত ছোট আর বলবাহু যত বড়, তত কম বলে কাজ হয়।" },
  { c: "ভার ভাগ প্রযুক্ত বল, একে বলে যান্ত্রিক সুবিধা।" }
], function (t, S) {
  /* the law on the plank: the wedge slides so the effort arm a goes 1.0 -> 1.25 -> 0.75 -> 1.0 m; the effort arrow is the
     force that holds the plank level, F = W b / a, at 3 px per newton (the load arrow is W = 49 N) */
  const m = t < S.A(1) ? 0 : S.P(1, 0.05, 0.95), a = 1.0 + 0.25 * Math.sin(2 * Math.PI * ease(m)), b = PL.L - 0.14 - a;
  const P = W3.frame({ cam: C11.plank(), plank: { a }, sun: [-14, 34, 26] });
  let s = '', u = '';
  const N = 3, F = plForce(a), [fx, fy] = P(PL.XF, PL.YT, PL.Z), [lx, ly] = P(PL.XL, PL.YT + 2 * PL.BR[1], PL.Z), [wx] = P(PL.XF + a, PL.H, PL.Z + 0.1), [, by] = P(PL.X, PL.H - 0.07, PL.Z + 0.1), [lxb] = P(PL.XL, PL.H, PL.Z + 0.1);
  s += arrow2(fx, fy - 30 - F * N, fx, fy - 6, 1, Y) + arrow2(lx, ly, lx, ly + PL.Wt * N, 1, '#ff6b5e');
  u += lab(fx, fy - 70 - F * N, 'বল', 'name') + lab(lx + 120, ly - 30, 'ভার', 'name');
  s += armBar(fx, wx, by + 40, Y, 1) + armBar(wx, lxb, by + 40, '#7fd1ff', 1);
  u += lab((fx + wx) / 2, by + 90, 'বলবাহু ' + BNF(a * 100) + ' সেমি', 'move') + lab((wx + lxb) / 2 + 30, by + 150, 'ভারবাহু ' + BNF(b * 100) + ' সেমি', 'move');
  u += card('বল × বলবাহু &nbsp;=&nbsp; ভার × ভারবাহু', S.P(0, 0.1, 0.3), t < S.A(2) ? 1 : 0, 150, 1200, 62);
  if (t >= S.A(2)) u += card('যান্ত্রিক সুবিধা &nbsp;=&nbsp; ভার ÷ প্রযুক্ত বল', S.P(2, 0.1, 0.3), 1, 150, 1200, 62);
  if (t >= S.A(2)) u += termCard('যান্ত্রিক সুবিধা', 'Mechanical advantage', S.P(2, 0.45, 0.65), 1 - S.P(2, 0.92, 1), 1460, 390, 0.62);
  return { gl: true, svg: s, ui: u };
});
