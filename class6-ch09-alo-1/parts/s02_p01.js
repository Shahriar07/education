/* ২ক: without light: rice, a mango and a shirt on your desk by day; the light goes, they vanish */
part('s02_p01', { scene: 2, label: '২ক', first: true, title: "আলো না থাকলে",
  screen: "3D পড়ার ঘর, দিন: টেবিলে ভাতের থালা, একটা পাকা আম, চেয়ারে ভাঁজ করা জামা। আলো কমে যায়, জিনিসগুলো অন্ধকারে মিলিয়ে যায়; আবার আলো এলে ফিরে আসে। গাছ আঁকা হয় না।" }, [
  { c: "আলো না থাকলে আমরা কিছুই দেখতে পেতাম না।" },
  { c: "শুধু তাই নয়।" },
  { c: "বই বলছে, আলো না থাকলে গাছপালা জন্মাত না, প্রাণীরা খাবার পেত না।" },
  { c: "এই ভাত, এই আম, এমনকি তোমার জামার সুতোও আসে আলোর জোরে বেড়ে ওঠা জীব থেকে।" },
  { c: "আলো ছাড়া তাই জীবন কল্পনা করাই কঠিন।" }
], function (t, S) {
  /* darkness: falls during sentence 1, lifts in sentence 2, falls slowly again in the last sentence */
  const dk = Math.max(ease(S.P(0, 0.35, 0.9)) * (1 - ease(S.P(1, 0, 0.8))), ease(S.P(4, 0.3, 0.95)));
  const cam = { pos: [ST.X + 0.25, 1.25, -0.15], look: [ST.X + 0.32, 0.72, -1.3], fov: 50 };
  const P = W3.frame({ cam, t, dim: 0.15 + 0.85 * dk, st: { night: false, bulb: 0, desk: false, food: true, curtain: 0 } });
  let s = `<rect width="1920" height="1080" fill="#000" opacity="${(0.88 * dk).toFixed(2)}"/>`, u = '';
  const T = ST.top, o3 = S.P(3, 0.05, 0.15) * (1 - dk);
  [['ভাত', [0.15, T + 0.06, -1.4]], ['আম', [0.5, T + 0.1, -1.38]], ['জামা', [0.35, 0.55, -0.85]]].forEach(([q, p], i) => { const [x, y] = P(ST.X + p[0], p[1], p[2]); u += lab(x, y - 60, q, 'name', S.P(3, 0.05 + i * 0.22, 0.15 + i * 0.22) * (1 - dk)); });
  void o3; return { gl: true, svg: s, ui: u };
});
