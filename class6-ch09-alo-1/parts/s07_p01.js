/* ৭ক: headlights on a village path at night: the light goes straight ahead; only the road in front of the car is lit */
part('s07_p01', { scene: 7, label: '৭ক', first: true, title: "গাড়ির হেডলাইট",
  screen: "3D গ্রামের রাস্তা, রাত। একটা গাড়ি এগিয়ে আসে; হেডলাইটের দুটি সোজা আলোর পথ রাস্তায় পড়ে। ট্যাগ: \"আলো সরলরেখায় চলে\"।" }, [
  { c: "রাতে গ্রামের রাস্তায় গাড়ির হেডলাইট দেখেছ?" },
  { c: "হেডলাইটের আলো সোজা সামনে যায়, তাই গাড়ির ঠিক সামনের রাস্তাটুকুই আলোকিত হয়।" },
  { c: "আলো যে সরলরেখায় চলে, এটা তারই উদাহরণ।" }
], function (t, S) {
  const X = Z3.VILL, x = X - 24 + 1.6 * t;            // 1.6 m/s: the car creeps along the path
  const P = W3.frame({ cam: { pos: [X - 8, 3.4, 16], look: [X - 6, 0.6, 1.5], fov: 50 }, t, dim: 1, bg: 'night', car9: { x, z: 2, lights: ease(pr(t, 0.6, 1.2)) } });
  let s = `<rect width="1920" height="1080" fill="#000" opacity="0.25"/>`, u = '';
  const [hx, hy] = P(x + 2.3, 0.7, 2); u += lab(hx + 40, hy - 110, 'হেডলাইট', 'name', S.P(0, 0.4, 0.55));
  u += lab(960, 260, 'আলো সরলরেখায় চলে', 'move', S.P(2, 0.1, 0.25));
  return { gl: true, svg: s, ui: u };
});
