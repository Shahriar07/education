/* ৫ক:  */
part('s05_p01', { scene: 5, label: '৫ক', first: true, title: "চিত্র ১১.২: মোচড়ানো",
  screen: "3D রাবার; মোচড়, দুই বাঁকা তীর।" }, [
  { c: "বল আকৃতিও বদলায়। চিত্র ১১.২-এর রাবারটা দেখো।" },
  { c: "দুই মাথা দুই দিকে ঘোরালে রাবারটা মুচড়ে যায়।" },
  { c: "বল দুটো উল্টো দিকে ঘোরাচ্ছে, তাই মাঝখানটা পেঁচিয়ে গেল।" }
], function (t, S) {
  const k = ease(S.P(1, 0.1, 0.8)), r = { mode: 'twist', k }, P = W3.frame({ cam: C11.rub(), rubber: r, lab: {}, sun: [-14, 34, 26] });
  let s = '', u = figTag('চিত্র ১১.২: বস্তুর উপর বলের প্রভাব'); const o = S.P(1, 0, 0.12);
  s += turnArrow3(P, RB.Y0 + RB.H - 0.012, -0.6, 1.6, Y, o) + turnArrow3(P, RB.Y0 + 0.014, 1.6, -0.6, Y, o);
  const [tx, ty] = P(RB.X + 0.05, RB.Y0 + RB.H, RB.Z), [bx, by] = P(RB.X + 0.05, RB.Y0 + 0.01, RB.Z);
  u += lab(tx + 190, ty - 30, big('এদিকে ঘোরাও'), 'move', o) + lab(bx + 190, by + 10, big('ওদিকে ঘোরাও'), 'move', o);
  const [rx, ry] = P(RB.X - 0.03, RB.Y0 + 0.06, RB.Z); u += lab(rx - 200, ry, k > 0.5 ? 'মোচড়ানো' : 'রাবার', 'name', S.P(0, 0.4, 0.55));
  return { gl: true, svg: s, ui: u };
});
