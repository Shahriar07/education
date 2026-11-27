/* ৩গ: drawn */
part('s03_p03', { scene: 3, label: '৩গ', title: "চিত্র ১১.৭: জাঁতি",
  screen: "3D জাঁতি, সুপারি দূরে ও কাছে; তীর।" }, [
  { c: "জাঁতির দুই বাহু এক মাথায় জোড়া, সেটা ফালক্রাম। অন্য মাথায় হাতলে চাপ পড়ে, মানে বল।" },
  { c: "মাঝখানে রাখা সুপারি বাধা দেয়, সেটা ভার। ভার মাঝখানে, তাই জাঁতি দ্বিতীয় শ্রেণির লিভার।" },
  { c: "সুপারিটা ফালক্রামের কাছে রাখলে ভারবাহু ছোট হয়, তাই অল্প বলেই সুপারি কেটে যায়।" }
], function (t, S) {
  /* জাঁতি: hinge = fulcrum at the left end, hand on the handles 0.17 m out, the nut between: d = 0.10 m, then 0.035 m.
     F = R d / 0.17 with R drawn as 150 px; the top arm rests on the nut: a = atan(0.018 / d) */
  const k = t < S.A(2) ? 0 : ease(S.P(2, 0.05, 0.35)), d = 0.10 - 0.065 * k, a = Math.atan(0.018 / d);
  const P = W3.frame({ cam: C11.ws(JT.X - WS.X + 0.09, 20, 0.16, 0.62), jati: { a, d }, sun: [-14, 34, 26] });
  let s = '', u = '';
  const o0 = [JT.X, WS.TY + 0.03, 0.012], [hx, hy] = P(...o0), [ex, ey] = P(...rotPt(o0, a, JT.H, 0.012)), [nx, ny] = P(JT.X + d, WS.TY + 0.05, 0.012), R = 150, Fh = R * d / JT.H;
  const oA = S.P(0, 0.1, 0.25), oB = S.P(0, 0.4, 0.55), oC = S.P(1, 0.0, 0.15);
  s += ringDot(hx, hy, oA); u += lab(hx - 60, hy + 80, 'ফালক্রাম', 'name', oA);
  s += arrow2(ex, ey - 20 - Fh, ex, ey - 20, oB); u += lab(ex + 40, ey - 60 - Fh, 'বল', 'name', oB);
  s += arrow2(nx, ny + 170, nx, ny + 20, oC, '#ff6b5e'); u += lab(nx + 30, ny + 210, 'সুপারি: ভার', 'name', oC);
  if (t >= S.A(1)) u += lab(960, 240, big('ভার মাঝখানে: দ্বিতীয় শ্রেণি'), 'move', S.P(1, 0.4, 0.6));
  u += lab(1640, 170, 'জাঁতি', 'name');
  return { gl: true, svg: s, ui: u };
});
