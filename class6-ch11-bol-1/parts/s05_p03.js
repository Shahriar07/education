/* ৫গ:  */
part('s05_p03', { scene: 5, label: '৫গ', title: "চিত্র ১১.২: চাপা",
  screen: "রাবার চ্যাপ্টা হয়, আয়তন একই।" }, [
  { c: "উপর থেকে চেপে ধরলে খাটো আর মোটা হয়ে যায়।" },
  { c: "রাবার কিন্তু কমেনি। উপর থেকে কমে পাশে ছড়িয়ে গেছে। বল এখানে নিচের দিকে।" }
], function (t, S) {
  const k = ease(S.P(0, 0.3, 0.9)), r = { mode: 'press', k }, P = W3.frame({ cam: C11.rub(), rubber: r, lab: {}, sun: [-14, 34, 26] }), pm = pxpm(P, [RB.X, RB.Y0 + 0.1, RB.Z]);
  let s = '', u = figTag('চিত্র ১১.২: বস্তুর উপর বলের প্রভাব'); const top = rubPt(r, 0, RB.H, RB.D / 2), [x, y] = P(...top), o = S.P(0, 0.05, 0.25);
  s += handPush3(x, y - 40 * (1 - o), 90, pm, o);
  if (t >= S.A(1)) { const p = S.P(1, 0.55, 0.7); s += arrow2(x + 0.13 * pm, y - 200, x + 0.13 * pm, y - 20, p); u += lab(x + 0.13 * pm + 120, y - 120, big('বল নিচে'), 'move', p);
    const [a1] = P(...rubPt(r, -RB.W / 2, RB.H * 0.5, RB.D / 2)), [a2] = P(...rubPt(r, RB.W / 2, RB.H * 0.5, RB.D / 2)), [, yy] = P(...rubPt(r, 0, RB.H * 0.25, RB.D / 2)), q = S.P(1, 0.2, 0.35);
    s += arrow2(a1 - 10, yy, a1 - 120, yy, q, '#7fd1ff') + arrow2(a2 + 10, yy, a2 + 120, yy, q, '#7fd1ff'); u += lab(a2 + 220, yy, 'পাশে ছড়ায়', 'name', q); }
  const [rx, ry] = P(RB.X - 0.04, RB.Y0 + 0.03, RB.Z); u += lab(rx - 230, ry, 'চাপা', 'name', S.P(0, 0.85, 0.95));
  return { gl: true, svg: s, ui: u };
});
