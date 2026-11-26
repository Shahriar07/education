/* ২ক: drawn */
part('s02_p01', { scene: 2, label: '২ক', first: true, title: "চিত্র ১১.৪: লিভার",
  screen: "3D: দুই হাতে দণ্ড, অর্ধগোল ঠেস, ভারী পাথর; শব্দ-কার্ড লিভার।" }, [
  { c: "বইয়ের চিত্র ১১.৪ দেখো। একটা শক্ত দণ্ড, তার নিচে একটা অবলম্বন। দণ্ডটা এর ওপর ভর করে ওঠানামা করে।" },
  { c: "এমন সরল যন্ত্রকে বলে লিভার। শাবল দিয়ে ইটের ওপর ভর করে পাথর তোলা, এটাও লিভার।" }
], function (t, S) {
  /* fig 11.4: two hands at the end of the rod; the rod goes down and up once on the small stone, then the term card */
  lvSet(1.20, 0.30);
  const ho = S.P(0, 0.05, 0.25), k = t < S.A(1) ? Math.sin(Math.PI * ease(S.P(0, 0.45, 0.98))) : ease(S.P(1, 0.5, 0.9)) * 0.8, th = lvTilt(k);
  const P = W3.frame({ cam: C11.lever(), lever: th, hands: ho > 0 ? lvHands2(th, 0.15 * (1 - ease(ho))) : [], sun: [-14, 34, 26] });
  let s = '', u = figTag('চিত্র ১১.৪: লিভার');
  const pm = pxpm(P, [LV.X, 0.2, LV.Z]), [rx, ry] = P(...lvPt(th, -0.55)), [fx, fy] = P(LV.X, 0, LV.Z + 0.1);
  u += lab(rx, ry - 70, 'শক্ত দণ্ড', 'name', S.P(0, 0.12, 0.22));
  u += lab(fx, fy + 70, 'অবলম্বন', 'name', S.P(0, 0.25, 0.35));
  if (t >= S.A(1)) u += termCard('লিভার', 'Lever', S.P(1, 0.05, 0.25), 1 - S.P(1, 0.85, 1), 960, 360, 0.85);
  return { gl: true, svg: s, ui: u };
});
