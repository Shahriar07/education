/* ৬খ, case 1: through the eyes of the friend standing by the road. The car comes and goes at 8 m/s.
   Readout = |x_car - x_friend| along the road, which changes 8 m every second. */
part('s06_p02', { scene: 6, label: '৬খ', title: 'কেস ১: দাঁড়ানো বন্ধুর চোখে, তোমরা গতিশীল',
  screen: '3D। ক্যামেরা উড়ে গিয়ে দাঁড়ানো বন্ধুর চোখে বসে, তারপর আর নড়ে না। কোণে হলুদ বৃত্তে "১", ওপরে "কে দেখছে: দাঁড়ানো বন্ধু"। গাড়ি দূর থেকে এসে পাশ দিয়ে চলে যায়। লেখা: দাঁড়ানো বন্ধু থেকে গাড়ির দূরত্ব, সংখ্যা প্রতি মুহূর্তে বদলায়। শেষে "গতিশীল"।' }, [
  { c: "এক। আগে দেখি রাস্তার পাশে দাঁড়ানো বন্ধুর চোখ দিয়ে।" },
  { c: "গাড়িটা এগিয়ে আসছে, তারপর পাশ দিয়ে চলে যাচ্ছে। তার কাছ থেকে তোমাদের দূরত্ব প্রতি মুহূর্তে বদলাচ্ছে।" },
  { c: "তাই তার কাছে তোমরা দুজনই গতিশীল।" }
], function (t, S) {
  const R = ROAD, V = R.V_CAR;
  const eyes = { pos: [F2.x, 1.5, F2.z], look: [F2.x - 10, 2.3, F2.z + 3.6], fov: 58 };
  const k = ease(pr(t, 0.3, S.E(0) - 0.5)), cam = W3.mix(W3.third(F2.x - 8), eyes, k);
  const tPass = S.E(1) - 0.9, xc = F2.x + V * (t - tPass);
  const P = W3.frame({ cam, car1: { x: xc } });
  let s = badge(130, 190, 1, S.P(0, 0, 0.15)), u = '';
  u += whoTag('কে দেখছে: দাঁড়ানো বন্ধু', pr(k, 0.9, 1));
  if (k < 0.7) { const f = placed(P, F2.x, 4.0, F2.z, 1.7, 'দাঁড়ানো বন্ধু', 1 - pr(k, 0.3, 0.7)); s += f.svg; u += f.ui; }
  u += readout(600, 150, 'দাঁড়ানো বন্ধু থেকে গাড়ির দূরত্ব:', BNF(Math.abs(xc - F2.x)) + ' মি', S.fin(1, 0.4));
  if (xc < F2.x - 7) { const [cx, cy, ok] = P(xc, 2.2, R.LANE_Z); if (ok) u += lab(cl(cx, 260, 1660), cl(cy, 330, 760), 'গতিশীল', 'move', S.fin(2, 0.4)); }
  else u += lab(480, 520, 'গতিশীল', 'move', S.fin(2, 0.4));
  return { gl: true, svg: s, ui: u };
});
