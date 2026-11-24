/* ২খ: fig 10.11 again: the straight blue arrow from the first to the last position, 10 - 4 = 6 m south */
part('s02_p02', { scene: 2, label: '২খ', title: "চিত্র ১০.১১: আনিলার সরণ",
  screen: "একই দৃশ্য। হলুদ পথ হালকা হয়, শুরু থেকে শেষ অবস্থান পর্যন্ত সোজা নীল তীর আঁকা হয়: ৬ মিটার, দক্ষিণ দিকে। শব্দ-কার্ড: সরণ (Displacement)।" }, [
  { c: "কিন্তু শুরুর জায়গা থেকে আনিলা এখন কত দূরে? একটা সোজা দাগ টানো।" },
  { c: "১০ বিয়োগ ৪, মানে মাত্র ৬ মিটার, দক্ষিণ দিকে।" },
  { c: "প্রথম অবস্থান থেকে শেষ অবস্থান পর্যন্ত, নির্দিষ্ট দিকে এই সোজা দূরত্বটাই সরণ।" },
  { d: 1.2 }
], function (t, S) {
  const X = ROAD.NS.X, Z = ROAD.NS.Z, P = W3.frame({ cam: W3.nsSide(), sun: ANI.SUN });
  let s = nsTrail(P, 14, 10, 1 - 0.6 * S.P(0, 0.4, 0.7)), u = nsHead('চিত্র ১০.১১');
  s += nsHeadSvg() + dot3(P, [X, 0.02, Z], '#fff', 13); const [sx, sy] = P(X, 0.02, Z); u += lab(sx - 105, sy + 8, 'শুরু', 'name');
  s += dispArrow(P, 0, 6, ease(S.P(0, 0.6, 1)), 0);
  const m = nsMeasure(P, 0, 6, 95, '৬ মি.', S.P(1, 0.1, 0.25)); s += m.svg; u += m.ui;
  const ob = placed(P, X + 6, 1.4, Z + ANI.ZB, 0.02, 'আনিলা'); s += ob.svg; u += ob.ui;
  if (t >= S.A(1)) u += lab(1500, 420, '১০ − ৪ = ৬ মিটার, দক্ষিণে', 'move', S.P(1, 0.2, 0.35) * (1 - S.P(2, 0, 0.08)));
  if (t >= S.A(2)) u += termCard('সরণ', 'Displacement', S.P(2, 0.15, 0.3), 1, 1560, 470, 0.75);
  return { gl: true, svg: s, ui: u };
});
