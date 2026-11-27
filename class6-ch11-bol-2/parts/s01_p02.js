/* ১খ: drawn */
part('s01_p02', { scene: 1, label: '১খ', title: "ধাঁধা: ঠেস কাছে",
  screen: "ছোট পাথর ভারী পাথরের কাছে; অল্প চাপে পাথর ওঠে, হাতের তীর ছোট। প্রশ্ন-কার্ড।" }, [
  { c: "এবার ছোট পাথরটা ভারী পাথরের কাছে আনি। অল্প চাপেই ভারী পাথর উঠে গেল!" },
  { c: "দণ্ড একই, পাথর একই। শুধু ঠেসের জায়গা বদলেছে। তাহলে বল কেন কমে গেল?" }
], function (t, S) {
  /* the hand lets go, the small stone slides from B = 0.9 m to B = 0.3 m (the heavy stone stays), the hand comes back and
     presses with the force that balances the stone, W B / A = 98 N, and the stone goes up */
  const mv = ease(S.P(0, 0.08, 0.38)), B = 0.90 - 0.60 * mv; lvSet(1.50 - B, B);
  const up = S.P(0, 0.0, 0.08), back2 = S.P(0, 0.40, 0.52), k = ease(S.P(0, 0.55, 0.95));
  const th = lvTilt(k), drop = S.P(0, 0, 1) < 0.39 ? 0.15 * ease(up) : 0.15 * (1 - ease(back2));
  const P = W3.frame({ cam: C11.lever(), lever: th, hands: drop < 0.149 ? lvHands2(th, drop) : [], sun: [-14, 34, 26] });
  let s = '', u = '';
  const pm = pxpm(P, [LV.X, 0.2, LV.Z]), [hx, hy] = P(...lvPt(th, -LV.A, LV.R)), [sx, sy] = P(...lvStone(th)), [fx, fy] = P(LV.X, 0, LV.Z + 0.1);
  u += lab(sx, sy - 0.22 * pm, 'ভারী পাথর', 'name', 1) + lab(fx, fy + 70, 'ছোট পাথর', 'name', 1);
  const N = 0.62, a1 = k > 0 ? cl(S.P(0, 0.55, 0.65)) : 0, ay = hy + pm * 0.075;
  if (a1 > 0) { s += arrow2(hx, ay, hx, ay + lvForce(th) * N, a1, Y); u += lab(hx, ay + lvForce(th) * N + 55, 'হাতের বল', 'move', a1); }
  if (t >= S.A(1)) u += card('ঠেসের জায়গা বদলালে বল কেন কমে?', S.P(1, 0.45, 0.65), 1, 170, 1250, 66);
  return { gl: true, svg: s, ui: u };
});
