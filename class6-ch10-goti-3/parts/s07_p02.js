/* ৭খ: Rimi: 8 m, then 6 m back, 1.6 m/s; hints only */
part('s07_p02', { scene: 7, label: '৭খ', title: "হিন্ট: রিমির দূরত্ব ও সরণ",
  screen: "3D মাঠ, পাশ থেকে। \"রিমি\" লেখা চোখ ৮ মিটার যায়, একই পথে ৬ মিটার ফেরে; হলুদ পথ, তারপর নীল তীরের জায়গায় \"?\"।" }, [
  { c: "রিমি সোজা ৮ মিটার গিয়ে, একই পথে ৬ মিটার ফিরে এলো।" },
  { c: "দূরত্বের হিন্ট: দুই পথই তাকে হাঁটতে হয়েছে।" },
  { d: 1.5 },
  { c: "সরণের হিন্ট: শুরু আর শেষের মাঝে একটা সোজা দাগ টানো।" },
  { d: 2.0 }
], function (t, S) {
  const X = ROAD.NS.X, Z = ROAD.NS.Z, tA = 0.5, d = cl(2.2 * (t - tA), 0, 14), pos = d <= 8 ? d : 16 - d, P = W3.frame({ cam: W3.nsSide(), sun: ANI.SUN });
  let s = nsTrail(P, d, 8, 1) + dot3(P, [X, 0.02, Z], '#fff', 13), u = ''; const [sx, sy] = P(X, 0.02, Z); u += lab(sx - 105, sy + 8, 'শুরু', 'name');
  const m1 = nsMeasure(P, 0, 8, 140, '৮ মি.', pr(d, 7.6, 8)), m2 = nsMeasure(P, 2, 8, 70, '৬ মি.', pr(d, 13.6, 14)); s += m1.svg + m2.svg; u += m1.ui + m2.ui;
  const ob = placed(P, X + pos, 1.4, Z + nsZ(d, 8), 0.02, 'রিমি'); s += ob.svg; u += ob.ui;
  u += qTop('রিমির দূরত্ব কত? সরণ কত?', S.P(0, 0.5, 0.65), 160, 54);
  if (t >= S.A(1) && t < S.A(3)) u += hintCard('দূরত্ব: দুই পথই হাঁটতে হয়েছে', S.P(1, 0.05, 0.25), 330);
  if (t >= S.A(3)) { u += hintCard('সরণ: শুরু আর শেষের মাঝে সোজা দাগ', S.P(3, 0.05, 0.2), 330); const p = ease(S.P(3, 0.4, 0.9)); s += dispArrow(P, 0, 2, p, 0); const [qx, qy] = P(X + 1, 0.02, Z); u += lab(qx - 70, qy - 60, '?', 'move', p); }
  return { gl: true, svg: s, ui: u };
});
