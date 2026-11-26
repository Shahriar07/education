/* ৫খ:  */
part('s05_p02', { scene: 5, label: '৫খ', title: "চিত্র ১১.২: বাঁকানো",
  screen: "রাবার বাঁকে।" }, [
  { c: "উপরের মাথাটা একপাশে ঠেললে রাবারটা বেঁকে যায়।" },
  { c: "নিচের মাথাটা আটকানো, তাই শুধু উপরটা সরল। একপাশের বলে সোজা জিনিস বাঁকা হলো।" }
], function (t, S) {
  const k = ease(S.P(0, 0.35, 0.95)), r = { mode: 'bend', k }, P = W3.frame({ cam: C11.rub(40, 0.02), rubber: r, lab: {}, sun: [-14, 34, 26] }), pm = pxpm(P, [RB.X, RB.Y0 + 0.1, RB.Z]);
  let s = '', u = figTag('চিত্র ১১.২: বস্তুর উপর বলের প্রভাব'); const [x, y] = P(...rubPt(r, -RB.W / 2, RB.H - 0.012, 0)), o = S.P(0, 0.1, 0.3);
  s += handPoint(x - 4, y, -90, pm, o) + arrow2(x - 250, y - 130, x - 20, y - 130, S.P(0, 0.3, 0.45)); u += lab(x + 70, y - 130, big('ঠেলা'), 'move', S.P(0, 0.3, 0.45));
  const [cx, cy] = P(RB.X + 0.08, RB.Y0 + 0.012, RB.Z); u += lab(cx + 130, cy - 50, 'আটকানো', 'rest', S.P(1, 0.1, 0.25));
  const [rx, ry] = P(RB.X + 0.07, RB.Y0 + 0.09, RB.Z); u += lab(rx + 180, ry, 'বাঁকানো', 'name', S.P(0, 0.85, 0.95));
  return { gl: true, svg: s, ui: u };
});
