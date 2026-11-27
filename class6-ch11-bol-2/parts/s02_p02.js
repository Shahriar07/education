/* ২খ: drawn */
part('s02_p02', { scene: 2, label: '২খ', title: "ভার, প্রযুক্ত বল, ফালক্রাম",
  screen: "একই দৃশ্যে তিনটি অংশ একে একে চিহ্নিত; শব্দ-কার্ড।" }, [
  { c: "লিভারের তিনটি অংশ। যে ভারী বস্তুটা তুলছি, সেটা ভার।" },
  { c: "হাত দিয়ে যে বল দিচ্ছি, সেটা প্রযুক্ত বল।" },
  { c: "আর দণ্ড যে বিন্দুতে ঠেস দিয়ে ঘোরে, সেটা ফালক্রাম।" }
], function (t, S) {
  /* the three parts, one per sentence, each with its term card: ভার, প্রযুক্ত বল, ফালক্রাম. The rod is held part way down */
  lvSet(1.20, 0.30);
  const th = lvTilt(0.6), P = W3.frame({ cam: C11.lever(), lever: th, hands: lvHands2(th), sun: [-14, 34, 26] });
  let s = '', u = figTag('চিত্র ১১.৪: লিভার');
  const pm = pxpm(P, [LV.X, 0.2, LV.Z]), [hx, hy] = P(...lvPt(th, -LV.A, LV.R)), [sx, sy] = P(...lvStone(th)), [cx, cy] = P(...lvContact(th));
  const N = 0.62, W = LV.M * LV.G, o0 = S.P(0, 0.4, 0.55), o1 = S.P(1, 0.15, 0.35), o2 = S.P(2, 0.25, 0.45);
  if (t >= S.A(0)) { s += arrow2(sx, sy, sx, sy + W * N * ease(o0), o0, '#ff6b5e'); u += lab(sx + 150, sy + 90, 'ভার', 'name', o0); }
  if (t >= S.A(1)) { const ay = hy + pm * 0.075; s += arrow2(hx, ay, hx, ay + lvForce(th) * N * ease(o1), o1, Y); u += lab(hx + 20, ay + lvForce(th) * N + 60, 'প্রযুক্ত বল', 'name', o1); }
  if (t >= S.A(2)) { s += ringDot(cx, cy, o2); u += lab(cx + 30, cy + 150, 'ফালক্রাম', 'name', o2); }
  const tc = (i, bn, en) => t >= S.A(i) ? termCard(bn, en, S.P(i, 0.05, 0.3), 1 - S.P(i, 0.88, 1), 1460, 330, 0.7) : '';
  u += tc(0, 'ভার', 'Load') + tc(1, 'প্রযুক্ত বল', 'Effort') + tc(2, 'ফালক্রাম', 'Fulcrum');
  return { gl: true, svg: s, ui: u };
});
