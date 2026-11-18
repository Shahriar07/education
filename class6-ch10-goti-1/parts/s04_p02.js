/* ৪খ: back in the bus, your eyes. Anusheh sits in the seat in front: pinned, at rest for you.
   Outside, the lamp posts slide backwards at V_BUS. */
part('s04_p02', { scene: 4, label: '৪খ', title: 'বাসে: আনুশেহ স্থির, ল্যাম্পপোস্ট গতিশীল',
  screen: '3D। ক্যামেরা বাইরে থেকে জানালা দিয়ে ঢুকে তোমার সিটে বসে। ওপরে "কে দেখছে: তুমি"। সামনের সিটে নাম-লেখা চোখ "আনুশেহ", তার নিচে পিন ও "স্থির"। জানালার বাইরে ল্যাম্পপোস্টে পেছনমুখী তীর ও "গতিশীল"।' }, [
  { c: "আবার সেই বাসে ফিরে যাই। তোমার সামনের সিটে বসে আছে তোমার বন্ধু আনুশেহ।" },
  { c: "বাস ছুটছে, কিন্তু তোমার সাপেক্ষে আনুশেহের অবস্থান একটুও বদলাচ্ছে না। তোমার কাছে সে স্থির।" },
  { c: "অথচ জানালার বাইরের ল্যাম্পপোস্ট তোমার সাপেক্ষে পেছনে সরে যাচ্ছে। তোমার কাছে সে গতিশীল।" }
], function (t, S) {
  const R = ROAD, V = R.V_BUS, xb = -95 + V * t;
  const k = ease(pr(t, 0.3, S.E(0) - 0.8));
  const cam = W3.mix(W3.third(xb), W3.seat(xb), k);
  const P = W3.frame({ cam, busX: xb });
  let s = '', u = '';
  u += whoTag('কে দেখছে: তুমি', pr(k, 0.9, 1));
  if (k >= 1) {
    const oA = S.fin(0, 0.3) * pr(t, S.E(0) - 0.6, S.E(0) - 0.1);
    const [ax, ay] = P(xb + 0.75, 2.62, R.LANE_Z - 0.75);       // above the seat in front, where her head would be
    const [hx, hy] = P(xb + 0.4, 2.11, R.LANE_Z - 0.75);        // its grab handle
    const ob = observer(ax, ay, 'আনুশেহ', Math.max(oA, t > S.E(0) ? 1 : 0), 0.32); s += ob.svg; u += ob.ui;
    const o1 = S.fin(1, 0.4); s += pin(hx, hy, 1.3, o1); u += lab(hx - 130, hy - 50, 'স্থির', 'rest', o1);
    const a = backArrows(P, xb - 4, xb + 70, V, S.fin(2, 0.4), 'গতিশীল'); s += a.svg; u += a.ui;
  }
  return { gl: true, svg: s, ui: u };
});
