/* ৫গ: who is where, seen from outside (third person), before we look through each one's eyes.
   Physics: the bus has uniform velocity, x = x0 + V t. Nothing is called "at rest" or "moving" yet. */
part('s05_p03', { screen: '3D, বাইরে থেকে (রাস্তার ওপারের রেলিং থেকে, একটু ওপর থেকে)। বাসস্টপের ওপরে নাম-লেখা চোখ "আরিয়ান"। বাস বাঁ দিক থেকে ঢোকে, জানালায় নাম-লেখা চোখ "তুমি"। এখানে কাউকে স্থির বা গতিশীল বলা হয় না।', scene: 5, label: '৫গ', title: 'কে কোথায়: বাইরে থেকে দেখা' }, [
  { c: "এবার একই রাস্তা দুজনের চোখ দিয়ে দেখব।" },
  { c: "বাসস্টপে দাঁড়িয়ে আছে তোমার বন্ধু আরিয়ান।" },
  { c: "আর চলন্ত বাসের জানালার পাশে বসে আছ তুমি।" },
  { c: "একই রাস্তা, একই সময়, কিন্তু দুজন দুই জায়গায়।" }
], function (t, S) {
  const R = ROAD, V = R.V_BUS, L = R.BUS_L, cam = W3.third(0);
  const tb = S.A(2) - 1.0;                                   // moment the bus nose reaches the left edge of the view
  const xb = W3.edgeX(0, -1) - L / 2 - 1 + V * (t - tb);     // uniform velocity for the whole part
  const P = W3.frame({ cam, busX: xb });
  let s = '', u = '';
  const a = placed(P, R.ARI.x, 6.6, R.ARI.z, 1.9, 'আরিয়ান', S.fin(1, 0.5)); s += a.svg; u += a.ui;
  if (t >= tb) {                                             // you: a small eye at a bus window
    const [ex, ey] = P(xb + R.SEAT.dx, 2.38, R.LANE_Z + R.BUS_W / 2);
    const m = observer(ex, ey, 'তুমি', pr(t, tb + 0.6, tb + 1.1), 0.3); s += m.svg; u += m.ui;
  }
  return { gl: true, svg: s, ui: u };
});
