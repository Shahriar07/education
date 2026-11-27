/* ১ক: drawn */
part('s01_p01', { scene: 1, label: '১ক', first: true, title: "ধাঁধা: ঠেস দূরে",
  screen: "উঠান, শক্ত দণ্ড, ভারী পাথর; ছোট পাথর ভারী পাথর থেকে দূরে; হাত চাপ দেয়, পাথর ওঠে না, হাতের তীর অনেক বড়।" }, [
  { c: "মনে আছে আগের ভিডিওর ধাঁধা? একই শক্ত দণ্ড, একই ভারী পাথর। ছোট পাথরটা কোথায় রাখলে কাজ সবচেয়ে সহজ?" },
  { c: "প্রথমে ছোট পাথরটা ভারী পাথর থেকে দূরে রাখি। হাতে অনেক জোর দিতে হচ্ছে, তবু পাথর নড়ছে না।" }
], function (t, S) {
  /* the small stone far from the heavy one: B = 0.9 m, A = 0.6 m. The hand pushes as hard as it can, 250 N; to lift the
     40 kg stone it would need W B / A = 588 N (dashed), so nothing moves */
  lvSet(0.60, 0.90);
  const th = LV.TH0, ho = S.P(1, 0, 0.2), P = W3.frame({ cam: C11.lever(), lever: th, hands: ho > 0 ? lvHands2(th, 0.15 * (1 - ease(ho))) : [], sun: [-14, 34, 26] });
  let s = '', u = '';
  const pm = pxpm(P, [LV.X, 0.2, LV.Z]), [hx, hy] = P(...lvPt(th, -LV.A, LV.R)), [sx, sy] = P(...lvStone(th)), [fx, fy] = P(LV.X, 0, LV.Z + 0.1);
  u += lab(sx, sy - 0.22 * pm, 'ভারী পাথর', 'name', S.P(0, 0.15, 0.3));
  u += lab(fx, fy + 70, 'ছোট পাথর', 'name', S.P(0, 0.45, 0.6));
  const N = 0.62, a1 = S.P(1, 0.25, 0.5), a2 = S.P(1, 0.55, 0.75), ay = hy + pm * 0.075;
  s += arrow2(hx, ay, hx, ay + 250 * N * ease(a1), a1, Y); u += lab(hx - 40, ay + 250 * N + 55, 'হাতের বল', 'move', a1);
  s += dashArrow(hx + 75, ay, hx + 75, ay + lvForce(th) * N, a2); u += lab(hx + 210, ay + lvForce(th) * N * 0.55, 'দরকার', 'move', a2);
  return { gl: true, svg: s, ui: u };
});
