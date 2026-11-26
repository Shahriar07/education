/* ৫ঘ:  */
part('s05_p04', { scene: 5, label: '৫ঘ', title: "চিত্র ১১.২: লম্বা করা",
  screen: "রাবার লম্বা ও সরু হয়।" }, [
  { c: "আর দুই দিকে টানলে লম্বা আর সরু হয়।" },
  { c: "বল দুটো এবার বাইরের দিকে, একটা উপরে, একটা নিচে।" },
  { c: "ছেড়ে দিলে আবার আগের মতো।" }
], function (t, S) {
  const k = t < S.A(2) ? ease(S.P(0, 0.2, 0.9)) : 1 - ease(S.P(2, 0.15, 0.6)), r = { mode: 'stretch', k }, P = W3.frame({ cam: C11.rub(44, 0.02), rubber: r, lab: {}, sun: [-14, 34, 26] });
  let s = '', u = figTag('চিত্র ১১.২: বস্তুর উপর বলের প্রভাব'); const [x, y] = P(...rubPt(r, 0, RB.H, 0)), [bx, by] = P(RB.X, RB.Y0 + 0.012, RB.Z), o = t < S.A(2) ? S.P(0, 0.05, 0.2) : 1 - S.P(2, 0, 0.1);
  s += arrow2(x + 0, y - 20, x, y - 180, o) + arrow2(bx + 110, by - 30, bx + 110, by + 130, o); u += lab(x + 140, y - 120, big('টান উপরে'), 'move', o) + lab(bx + 250, by + 70, big('টান নিচে'), 'move', o);
  const [rx, ry] = P(RB.X - 0.03, RB.Y0 + 0.08, RB.Z); u += lab(rx - 210, ry, k > 0.5 ? 'লম্বা ও সরু' : 'রাবার', 'name', S.P(0, 0.8, 0.9));
  if (t >= S.A(2)) u += lab(1500, 300, big('আগের মতো'), 'rest', S.P(2, 0.6, 0.75));
  return { gl: true, svg: s, ui: u };
});
