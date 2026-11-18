/* ১ক: the hook. Outside view of the bus, the camera flies in through the window to your seat,
   and the lamp posts slide backwards past the window. Bus: uniform velocity, x = x0 + V t. */
part('s01_p01', { scene: 1, label: '১ক', first: true, title: 'বাসের জানালা দিয়ে: ল্যাম্পপোস্ট পেছনে ছোটে',
  screen: '3D। রাস্তায় চলন্ত বাস, বাইরে থেকে; জানালায় "তুমি" লেখা চোখ। ক্যামেরা জানালা দিয়ে ভেতরে ঢুকে তোমার সিটে বসে। জানালার বাইরে ল্যাম্পপোস্ট, দোকান, বাসস্টপ পেছনে সরে যায়, প্রতিটি ল্যাম্পপোস্টে পেছনমুখী তীর।' }, [
  { c: "ধরো, সকালবেলা তুমি বাসে চড়ে স্কুলে যাচ্ছ।" },
  { c: "জানালার পাশের সিটটা পেয়ে গেছ, তাই বাইরে তাকিয়ে আছ।" },
  { c: "দেখো, রাস্তার ল্যাম্পপোস্টগুলো একটার পর একটা পেছনের দিকে ছুটে যাচ্ছে।" },
  { c: "দোকান, দালান, বাসস্টপ, সবকিছুই যেন পেছনে দৌড়াচ্ছে।" },
  { c: "যেন সবাই মিলে উল্টো দিকে দৌড়ের প্রতিযোগিতায় নেমেছে!" }
], function (t, S) {
  const R = ROAD, V = R.V_BUS;
  const tStop = S.A(3) + 1.2;                                   // the bus stop passes your window here
  const xb = R.STOP_X - R.SEAT.dx + V * (t - tStop);
  const k = ease(pr(t, S.A(1) - 0.3, S.E(1) - 0.3));
  const cam = W3.mix(W3.third(xb), W3.seat(xb), k);
  const P = W3.frame({ cam, busX: xb });
  let s = '', u = '';
  if (k < 0.6) { const [ex, ey] = P(xb + R.SEAT.dx, 2.38, R.LANE_Z + R.BUS_W / 2); const m = observer(ex, ey, 'তুমি', 1 - pr(k, 0.2, 0.55), 0.3); s += m.svg; u += m.ui; }
  u += whoTag('কে দেখছে: তুমি', pr(k, 0.9, 1));
  if (k >= 1) { const a = backArrows(P, xb - 4, xb + 70, V, S.fin(2, 0.4), ''); s += a.svg; }
  return { gl: true, svg: s, ui: u };
});
