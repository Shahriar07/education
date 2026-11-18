/* ৫ঘ: the road through Ariyan's eyes. The camera flies to where he stands at the bus stop and stays there.
   Physics: the camera is fixed to the ground, so the lamp post keeps its place in the picture;
   the bus has uniform velocity, x = x0 + V t. The arrow on the road is the distance it covers in one second. */
part('s05_p04', { screen: 'ক্যামেরা উড়ে গিয়ে বাসস্টপে আরিয়ানের চোখের জায়গায় বসে, তারপর আর নড়ে না। ওপরে "কে দেখছে: আরিয়ান"। পাশের ল্যাম্পপোস্টের গোড়ায় পিন ও "স্থির", ছবিতে তার জায়গা বদলায় না। দূর থেকে বাস এগিয়ে আসে, রাস্তায় তীর (আধা সেকেন্ডে যতটা যায়), "গতিশীল"; শেষে বাস আরিয়ানের পাশ দিয়ে চলে যায়।', scene: 5, label: '৫ঘ', title: 'আরিয়ানের চোখে: ল্যাম্পপোস্ট স্থির, বাস গতিশীল' }, [
  { c: "প্রথমে দেখি বাসস্টপ থেকে, তোমার বন্ধু আরিয়ানের চোখ দিয়ে।" },
  { c: "আরিয়ানের পাশের ল্যাম্পপোস্টটা একই জায়গায় দাঁড়িয়ে আছে। আরিয়ানের সাপেক্ষে সে স্থির।" },
  { c: "আর বাসটি, সাথে বাসের যাত্রী তুমি, সামনে দিয়ে চলে যাচ্ছ।" },
  { c: "আরিয়ানের কাছে তোমরা গতিশীল।" }
], function (t, S) {
  const R = ROAD, V = R.V_BUS, L = R.BUS_L;
  const tIn = S.E(0) - 0.8, k = ease(pr(t, 0.6, tIn));        // fly from the outside view into Ariyan's eyes
  const cam = W3.mix(W3.third(0), W3.ariyan(), k);
  const tPass = S.E(3) - 1.4;                                 // the bus nose draws level with Ariyan here
  const nose = R.ARI.x - 1 + V * (t - tPass), xb = nose - L / 2;   // uniform velocity
  const P = W3.frame({ cam, busX: xb });
  let s = '', u = '';

  const a = placed(P, R.ARI.x, 6.6, R.ARI.z, 1.9, 'আরিয়ান', 1 - pr(k, 0.45, 0.8)); s += a.svg; u += a.ui;
  u += whoTag('কে দেখছে: আরিয়ান', pr(t, tIn - 0.2, tIn + 0.3));

  // the lamp post beside him: pinned, its place in the picture never changes
  const oL = S.fin(1, 0.4), lx = W3.lamps(R.ARI.x - 13, R.ARI.x - 1)[0];
  if (oL > 0) {
    const [px, py] = P(lx, 0.22, R.LAMP_Z + 0.4), [mx, my] = P(lx, 5.6, R.LAMP_Z);
    s += pin(px, py, 1.5, oL); u += lab(mx + 120, my, 'স্থির', 'rest', oL);
  }

  // the bus: arrow on the road ahead of it, and its label
  const oB = S.fin(2, 0.4);
  if (oB > 0) {
    const far = nose < R.ARI.x - 9;                           // only while it is still well in front of him
    if (far) { const [x1, y1, ok1] = P(nose + 0.8, 0.05, R.LANE_Z), [x2, y2, ok2] = P(nose + 0.8 + V * 0.5, 0.05, R.LANE_Z); if (ok1 && ok2) s += arrow2(x1, y1, x2, y2, oB); }   // half a second of travel
    const [bx, by] = P(Math.min(nose, R.ARI.x - 9), 1.6, R.LANE_Z + R.BUS_W / 2 + 0.3);
    u += lab(cl(bx - 150, 220, 1500), cl(by, 230, 700), 'গতিশীল', 'move', oB);                 // beside the bus, on the road side
    const m = far ? placed(P, xb + R.SEAT.dx, 5.6, R.LANE_Z, 3.35, 'তুমি', oB) : { svg: '', ui: '' }; s += m.svg; u += m.ui;
  }
  return { gl: true, svg: s, ui: u };
});
