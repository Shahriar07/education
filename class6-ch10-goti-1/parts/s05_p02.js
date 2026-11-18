/* ৫খ: চিত্র ১০.২ in motion: the same street with traffic.
   Bus +x at 5 m/s (far lane), car -x at 8 m/s (near lane). A mark is dropped under the bus's nose every whole second:
   the marks are 5 m apart, because the speed is uniform. */
part('s05_p02', { scene: 5, label: '৫খ', title: 'চিত্র ১০.২: গতিশীল অবস্থা',
  screen: '3D, একই রাস্তা একই কোণ থেকে। বাস বাঁ থেকে ডানে, গাড়ি ডান থেকে বাঁয়ে চলে। ওপরে লেখা "চিত্র ১০.২: গতিশীল অবস্থা"। প্রতি সেকেন্ডে বাসের সামনের জায়গায় রাস্তায় একটা হলুদ দাগ পড়ে (০ সে, ১ সে, ২ সে ...), দাগগুলো সমান দূরে।' }, [
  { c: "এবার চিত্র দশ দশমিক দুই। সেই একই রাস্তায় এখন বাস আর গাড়ি চলছে।" },
  { c: "প্রতি সেকেন্ডে রাস্তায় একটা করে দাগ পড়ছে। দেখো, দাগগুলো একটার পর একটা সামনে এগিয়ে যাচ্ছে।" },
  { c: "অর্থাৎ প্রতি সেকেন্ডে এদের অবস্থান বদলাচ্ছে। এটাই গতিশীল অবস্থা।" },
  { c: "দাগগুলো সমান দূরে দূরে পড়ছে, কারণ বাসটা সমান বেগে চলছে।" }
], function (t, S) {
  const R = ROAD, V = R.V_BUS, x0 = W3.edgeX(24, -1) + 1;        // nose position when the marks start
  const t0 = S.A(1) - 0.2, nose = x0 + V * (t - t0) + 2 * V, xb = nose - R.BUS_L / 2;
  const xc = 70 - R.V_CAR * t;
  const P = W3.frame({ cam: W3.third(24), busX: xb, car2: { x: xc, dir: -1 } });
  let s = '', u = figTag('চিত্র ১০.২: গতিশীল অবস্থা', S.fin(0, 0.5));
  if (t >= t0) for (let k = 0; k <= Math.floor(t - t0); k++) {
    const [mx, my] = P(x0 + 2 * V + V * k, 0.02, R.LANE_Z + R.BUS_W / 2 + 0.5);
    s += `<ellipse cx="${F(mx)}" cy="${F(my)}" rx="16" ry="8" fill="${Y}" stroke="#1a1a2e" stroke-width="3"/>` + txt(mx, my + 46, BN(k) + ' সে', 40, { c: '#fff' });
  }
  if (t > S.A(2)) { const [a, b] = P(nose + 0.4, 1.6, R.LANE_Z), [c] = P(nose + 0.4 + V, 1.6, R.LANE_Z); s += arrow2(a, b, c, b, S.fin(2, 0.4)); u += lab(c + 110, b, 'গতিশীল', 'move', S.fin(2, 0.4)); }
  return { gl: true, svg: s, ui: u };
});
