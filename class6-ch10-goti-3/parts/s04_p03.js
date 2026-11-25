/* ৪গ: two cars, both 20 m/s, opposite ways, shown 10 times slower (2 m/s on screen); they pass in the middle of the picture */
part('s04_p03', { scene: 4, label: '৪গ', last: true, title: "ভুল ধারণা: দ্রুতি আর বেগ একই?",
  screen: "3D শহরের রাস্তা। দুটি গাড়ি সমান ২০ মি/সে-এ উল্টো দিকে যায়; ওপরে \"দ্রুতি ২০ মি/সে\" দুটোতেই সবুজ টিক, \"বেগ\" তীর দুটি উল্টো দিকে।" }, [
  { c: "অনেকে ভাবে, দ্রুতি আর বেগ একই কথা।" },
  { c: "শহরের রাস্তায় দেখো, দুটো গাড়িই চলছে সেকেন্ডে ২০ মিটার। দ্রুতি সমান।" },
  { c: "কিন্তু একটা যাচ্ছে পূর্বে, আরেকটা পশ্চিমে। দিক আলাদা, তাই বেগও আলাদা!" }
], function (t, S) {
  const V = 20 / 10, tm = S.A(1) + 4.2, xa = 8 + V * (t - tm), xb = 8 - V * (t - tm), P = W3.frame({ cam: { pos: [8, 8, 27], look: [8, 1.5, -2], fov: 44 }, car1: { x: xa, z: ROAD.LANE_Z, dir: 1 }, car2: { x: xb, z: ROAD.NEAR_Z, dir: -1 } });
  let s = '', u = speedNote('ধীর করে দেখানো (১০ গুণ)', 1);
  const [ax, ay] = P(xa, 2.0, ROAD.LANE_Z), [bx, by] = P(xb, 0.1, ROAD.NEAR_Z);
  if (t >= S.A(1)) { const o = S.P(1, 0.2, 0.35); u += lab(ax, ay - 50, '২০ মি./সে.', 'move', o) + lab(bx, by + 60, '২০ মি./সে.', 'move', o); }
  u += qTop('দ্রুতি আর বেগ একই?', S.P(0, 0.2, 0.5) * (1 - S.P(1, 0, 0.1)), 170, 60);
  if (t >= S.A(1)) { u += lab(700, 200, '<span style="font-size:52px">দ্রুতি: সমান</span>', 'rest', S.P(1, 0.6, 0.75)); }
  if (t >= S.A(2)) { s += arrow2(ax + 130, ay + 60, ax + 330, ay + 60, 1, BLUE) + arrow2(bx - 130, by - 30, bx - 330, by - 30, 1, BLUE); u += lab(1180, 200, '<span style="font-size:52px">বেগ: আলাদা</span>', 'move', S.P(2, 0.5, 0.65)) + lab(1800, 320, 'পূর্ব', 'name') + lab(130, 320, 'পশ্চিম', 'name'); }
  return { gl: true, svg: s, ui: u };
});
