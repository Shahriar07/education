/* ৪খ: lap race (direction keeps changing) and the straight 100 m run (one direction). Both 5 m/s, shown 5 times faster. */
part('s04_p02', { scene: 4, label: '৪খ', title: "পাকদৌড় আর সোজা দৌড়",
  screen: "3D স্কুলের মাঠ, উঁচু কোণ থেকে। \"প্রতিযোগী\" লেখা চিহ্ন প্রথমে ট্র্যাকে ঘোরে: তীরের দৈর্ঘ্য সমান, দিক বারবার বদলায়, ট্যাগ \"দ্রুতি\"। তারপর সোজা ১০০ মিটার: তীর এক দিকেই, ট্যাগ \"বেগ\"।" }, [
  { c: "স্কুলের পাকদৌড়ে দৌড়ানোর দিক বারবার বদলায়। নির্দিষ্ট কোনো দিক নেই, শুধু মান।" },
  { c: "তাই প্রতি সেকেন্ডের পথটা এখানে দ্রুতির উদাহরণ।" },
  { c: "আর ১০০ মিটার দৌড় হয় সোজা এক দিকে। এটা বেগের উদাহরণ।" }
], function (t, S) {
  let s = '', u = speedNote('দ্রুত করে দেখানো (৫ গুণ)', 1), P;
  if (t < S.A(2)) {
    const Fd = ROAD.FIELD, r = Fd.RUN_LANE_R, sN = 25 * t, [x, z] = W3.trackPt(r, sN), [x2, z2] = W3.trackPt(r, sN + 0.1); P = W3.frame({ cam: W3.fieldHigh() });
    const L = Math.hypot(x2 - x, z2 - z), q = [(x2 - x) / L * 13, (z2 - z) / L * 13], [a, b] = P(Fd.X + x, 0.05, z), [c, d] = P(Fd.X + x + q[0], 0.05, z + q[1]);
    const tr = []; for (let k = 0; k <= 30; k++) { const [m, n] = W3.trackPt(r, sN - 25 + 25 * k / 30); tr.push([Fd.X + m, 0.03, n]); }
    s += path3(P, tr, Y, 7, '') + arrow2(a, b, c, d, 1, BLUE); const ob = placed(P, Fd.X + x, 4, z, 0.05, 'প্রতিযোগী'); s += ob.svg; u += ob.ui;
    u += lab(960, 210, '<span style="font-size:52px">দিক বারবার বদলায়</span>', 'name', S.P(0, 0.3, 0.45)) + lab(960, 300, '<span style="font-size:60px">দ্রুতি: শুধু মান</span>', 'move', S.P(1, 0.4, 0.55));
  } else {
    const X = Z3.LX, z = Z3.LZ[1], d = cl(25 * (t - S.A(2) - 0.8), 0, 100); P = W3.frame({ cam: C3.lanes() });
    s += path3(P, [[X, 0.03, z], [X + d, 0.03, z]], Y, 9, ''); const ob = placed(P, X + d, 5, z, 0.05, 'প্রতিযোগী'); s += ob.svg; u += ob.ui;
    if (d < 100) { const [a, b] = P(X + d, 0.05, z), [c, e] = P(X + d + 13, 0.05, z); s += arrow2(a, b + 40, c, e + 40, 1, BLUE); }
    const [m0, n0] = P(X, 0, Z3.LZ[2]), [m1] = P(X + 100, 0, Z3.LZ[2]); u += lab((m0 + m1) / 2, n0 + 90, '১০০ মিটার', 'name');
    u += lab(960, 210, '<span style="font-size:52px">দিক একটাই</span>', 'name', S.P(2, 0.25, 0.4)) + lab(960, 300, '<span style="font-size:60px">বেগ: মান ও দিক</span>', 'move', S.P(2, 0.6, 0.75));
  }
  return { gl: true, svg: s, ui: u };
});
