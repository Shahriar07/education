/* ৬গ, case 2: through your eyes inside the car. The friend beside you is 0.84 m away (both on the rear seat,
   0.42 m either side of the centre line) and stays so; the lamp posts outside move back at 8 m/s. */
part('s06_p03', { scene: 6, label: '৬গ', title: 'কেস ২: তোমার চোখে, পাশের বন্ধু স্থির',
  screen: '3D। ক্যামেরা বাইরে থেকে গাড়ির ভেতরে তোমার সিটে ঢোকে। কোণে হলুদ বৃত্তে "২", ওপরে "কে দেখছে: তুমি"। পাশের সিটে নাম-লেখা চোখ "পাশের বন্ধু", পিন ও "স্থির"; লেখা: পাশের বন্ধুর দূরত্ব ০.৮৪ মিটার, বদলায় না। জানালার বাইরে ল্যাম্পপোস্টে পেছনমুখী তীর।' }, [
  { c: "দুই। এবার দেখি গাড়ির ভেতর থেকে, তোমার চোখ দিয়ে।" },
  { c: "তোমার পাশে বসা বন্ধুটি সারাক্ষণ ঠিক একই জায়গায় আছে। তার দূরত্বও বদলায় না, দিকও না।" },
  { c: "তাই তোমার কাছে সে স্থির। আর জানালার বাইরের সবকিছু পেছনে সরে যাচ্ছে।" }
], function (t, S) {
  const R = ROAD, V = R.V_CAR, xc = -95 + V * t;
  const k = ease(pr(t, 0.3, S.E(0) - 0.4)), cam = W3.mix(W3.third(xc), W3.carYou(xc), k);
  const P = W3.frame({ cam, car1: { x: xc } });
  let s = badge(130, 190, 2, S.P(0, 0, 0.15)), u = '';
  u += whoTag('কে দেখছে: তুমি', pr(k, 0.9, 1));
  if (k >= 1) {
    const [fx, fy] = P(xc + R.CAR_FRIEND.dx + 0.05, 1.05, R.LANE_Z + R.CAR_FRIEND.dz);   // where the friend's head would be
    const o1 = S.fin(1, 0.4) || (t > S.E(1) ? 1 : 0);
    const f = observer(fx, fy, 'পাশের বন্ধু', Math.max(o1, pr(t, S.E(0) - 0.4, S.E(0))), 0.4); s += f.svg; u += f.ui;
    s += pin(fx, fy + 150, 1.2, o1); u += lab(fx + 120, fy + 100, 'স্থির', 'rest', o1);
    const d = Math.abs(R.CAR_YOU.dz - R.CAR_FRIEND.dz);
    u += readout(560, 150, 'পাশের বন্ধুর দূরত্ব:', BNF(d, 2) + ' মি', o1);
    const a = backArrows(P, xc - 4, xc + 60, V, S.fin(2, 0.4), 'গতিশীল', 1.22); s += a.svg; u += a.ui;
  }
  return { gl: true, svg: s, ui: u };
});
