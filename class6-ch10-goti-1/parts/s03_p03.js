/* ৩গ: a village example and a city example.
   Village: a kicked football slows by friction, s = ut + ½at² (u = 3.2 m/s, a = -0.8 m/s²) until it stops at t = u/|a| = 4 s.
   City: from a third-floor balcony, a bus (+x, far lane, 5 m/s) and a car (-x, near lane, 8 m/s). */
part('s03_p03', { scene: 3, label: '৩গ', title: 'গ্রামে ও শহরে: অবস্থান বদলায়',
  screen: '3D। প্রথমে গ্রামের উঠান: টিনের চালের ঘর, কলসি, কাপড় শুকানোর দড়ি; একটা ফুটবল গড়িয়ে ধীরে থামে, প্রতি সেকেন্ডে মাটিতে বলের জায়গায় একটা দাগ। ট্যাগ "গ্রাম"। তারপর শহরের ফ্ল্যাটের বারান্দা থেকে রাস্তা: বাস ও গাড়ি দুই দিকে চলে। ট্যাগ "শহর"।' }, [
  { c: "গ্রামের উঠানে কেউ একটা ফুটবলে লাথি দিয়েছে। বলটা গড়িয়ে যাচ্ছে।" },
  { c: "আর শহরের ফ্ল্যাটের বারান্দা থেকে দেখো, রাস্তায় বাস আর গাড়ি ছুটে চলেছে।" },
  { c: "দুই জায়গাতেই একই ঘটনা। সময়ের সাথে সাথে বস্তুগুলোর অবস্থান বদলে যাচ্ছে।" }
], function (t, S) {
  const R = ROAD, V = R.VIL;
  let s = '', u = '';
  if (t < S.A(1)) {
    const tk = 0.6, tStop = V.BALL_U / -V.BALL_A;               // 4 s
    const sAt = q => { q = cl(q, 0, tStop); return V.BALL_U * q + 0.5 * V.BALL_A * q * q; };
    const tb = Math.max(0, t - tk), P = W3.frame({ cam: W3.yard(), ballS: sAt(tb) });
    for (let k = 1; k <= Math.floor(Math.min(tb, tStop)); k++) {      // one mark for every whole second
      const [mx, my] = P(V.X - 5 + sAt(k), 0.01, 1.2 + 0.32); s += `<ellipse cx="${F(mx)}" cy="${F(my)}" rx="12" ry="6" fill="${Y}" stroke="#1a1a2e" stroke-width="3"/>` + txt(mx, my + 44, BN(k) + ' সে', 40, { c: INK });
    }
    const [mx, my] = P(V.X - 5, 0.01, 1.52); s += `<ellipse cx="${F(mx)}" cy="${F(my)}" rx="12" ry="6" fill="#fff" stroke="#1a1a2e" stroke-width="3"/>` + txt(mx, my + 44, '০ সে', 40, { c: INK });
    u += lab(250, 250, 'গ্রাম', 'name', S.fin(0, 0.4));
  } else {
    // the bus comes up the road towards the balcony and passes below it as the sentence ends; the car leaves from below it
    const B = R.BALCONY, xb = B.x - 6 + R.V_BUS * (t - S.E(1)), xc = B.x + 2 - R.V_CAR * (t - S.A(2) + 0.6);
    const P = W3.frame({ cam: W3.flat(), balcony: true, busX: xb, car2: { x: xc, dir: -1 } });
    u += lab(250, 250, 'শহর', 'name', S.fin(1, 0.4));
    const o = S.fin(2, 0.4);
    if (o > 0) {
      const [b1x, b1y] = P(xb + R.BUS_L / 2 + 0.5, 1.6, R.LANE_Z), [b2x, b2y] = P(xb + R.BUS_L / 2 + 0.5 + R.V_BUS, 1.6, R.LANE_Z);
      const [c1x, c1y] = P(xc - R.CAR_L / 2 - 0.4, 0.8, R.NEAR_Z), [c2x, c2y] = P(xc - R.CAR_L / 2 - 0.4 - R.V_CAR * 0.6, 0.8, R.NEAR_Z);
      s += arrow2(b1x, b1y, b2x, b2y, o) + arrow2(c1x, c1y, c2x, c2y, o);
    }
  }
  return { gl: true, svg: s, ui: u };
});
