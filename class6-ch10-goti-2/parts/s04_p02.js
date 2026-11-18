/* ৪খ: the four-lap race (p. 86) in the 3D school field. A runner (labelled marker, never drawn) runs lane 1 of the
   200 m track (r = 19.4 m: 201.9 m a lap) at 5 m/s, 40 s a lap; shown 10× faster (4.04 s a lap on screen, noted).
   You stand outside the track near the end of the home straight. First from above (who is where), then a continuous
   camera flight into your eyes; each time the runner passes you the counter goes up: 1, 2, 3, 4, always 40 s apart. */
const RACE = { V: 5, K: 10, YOU: [12, 23.5], PASS_S: 32, T_FIRST: 2.0 };   // you stand 4 m outside lane 1, level with x = 12 m (s = 32 m along the lap)

part('s04_p02', { scene: 4, label: '৪খ', title: "চারপাক দৌড়: তোমার চোখে",
  screen: "3D স্কুলের মাঠ। প্রথমে ওপর থেকে কোনাকুনি: চুনের দাগে দৌড়ের ট্র্যাক, কোণে \"তুমি\" লেখা চোখ, ট্র্যাকে \"প্রতিযোগী\" লেখা চিহ্ন। ক্যামেরা উড়ে তোমার চোখে যায় (\"কে দেখছে: তুমি\")। প্রতিযোগী একই দিক থেকে এসে সামনে দিয়ে চলে যায়; পার হওয়ার গণনা ১ থেকে ৪, প্রতি পাকে ৪০ সেকেন্ড (দ্রুত করে দেখানো)।" }, [
  { c: "স্কুলের বার্ষিক খেলায় চারপাক দৌড় হচ্ছে। তুমি মাঠের এক কোণায় দাঁড়িয়ে।" },
  { c: "একজন প্রতিযোগী তোমাকে একই দিক থেকে চারবার পার হয়ে যাবে।" },
  { c: "প্রতিবার একই পথ, একই সময় পর পর। এটাও পর্যাবৃত্ত গতি।" }
], function (t, S) {
  const Fd = ROAD.FIELD, X = Fd.X, r = Fd.RUN_LANE_R, L = W3.trackLen(r), vS = RACE.V * RACE.K, TL = L / vS;
  const s0 = RACE.PASS_S - vS * RACE.T_FIRST, sNow = s0 + vS * t;
  const [rx, rz] = W3.trackPt(r, sNow);
  const eyes = { pos: [X + RACE.YOU[0], 1.5, RACE.YOU[1]], look: [X - 3, 0.5, 3], fov: 64 };   // looking across the field: the runner is seen round most of the lap and passes in front of you
  const tf0 = 3.6, tf1 = 5.4, k = ease(pr(t, tf0, tf1));
  const P = W3.frame({ cam: W3.mix(W3.fieldHigh(), eyes, k) });
  let s = '', u = '';
  // the runner's last 20 m along lane 1, drawn on the ground, and a dot where the runner is: always on the lane
  const tr = []; for (let k = 0; k <= 40; k++) { const [x, z] = W3.trackPt(r, sNow - 20 + 20 * k / 40); tr.push([X + x, 0.03, z]); }
  s += path3(P, tr, Y, 7, '');
  s += dot3(P, [X + rx, 0.03, rz], Y, 9);
  const ob = placed(P, X + rx, 1.6, rz, 0.03, 'প্রতিযোগী');
  s += ob.svg; u += ob.ui;
  if (k < 0.85) { const me = placed(P, X + RACE.YOU[0], 1.5, RACE.YOU[1], 0.02, 'তুমি', 1 - pr(k, 0.6, 0.85)); s += me.svg; u += me.ui; }
  if (k > 0.5) u += whoTag('কে দেখছে: তুমি', pr(k, 0.6, 1));
  const passes = Math.max(0, Math.min(4, Math.floor((t - RACE.T_FIRST) / TL) + 1));
  u += readout(60, 150, 'পার হলো', BN(passes) + ' বার', 1);
  u += lab(330 + 30, 290, 'প্রতি পাকে ৪০ সেকেন্ড', 'move', S.P(2, 0.15, 0.3));
  if (k <= 0.5) u += speedNote('দ্রুত করে দেখানো (১০ গুণ)', 1);
  else u += lab(360, 370, 'দ্রুত করে দেখানো (১০ গুণ)', 'name', 1);   // the who-tag takes the top right while in your eyes
  if (t >= S.A(2)) u += lab(960, 820, 'পর্যাবৃত্ত গতি', 'move', S.P(2, 0.6, 0.75));
  return { gl: true, svg: s, ui: u };
});
