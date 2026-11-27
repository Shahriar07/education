/* ৬খ: case 2: a non-luminous object: the candle's light falls on the book's page and comes back from it to your eye */
const page6 = () => [ST.X + 0.22, ST.top + 0.025, -1.42];
part('s06_p02', { scene: 6, label: '৬খ', title: "ঘটনা ২: অনুজ্জ্বল বস্তু আলো ফেরায়",
  screen: "নম্বর ২। একই ঘর। মোমবাতির পাশে টেবিলে খোলা বই। রশ্মি শিখা থেকে বইয়ের পাতায় পড়ে, সেখান থেকে চোখে আসে। শব্দ-কার্ড: প্রতিফলিত (Reflected)। শিরোনাম: \"অন্যের আলো ফিরে চোখে\"।" }, [
  { c: "ঘটনা দুই। বইয়ের নিজের আলো নেই।" },
  { c: "মোমবাতির আলো বইয়ের পাতায় পড়ে, তারপর সেখান থেকে ফিরে তোমার চোখে আসে।" },
  { c: "আলোর এই ফিরে আসাকে বলে প্রতিফলিত হওয়া।" },
  { c: "প্রতিফলন নিয়ে বিস্তারিত জানব পরের ভিডিওতে।" }
], function (t, S) {
  const k1 = ease(S.P(1, 0.1, 0.5)), k2 = ease(S.P(1, 0.55, 0.95)), rays = [];
  if (k1 > 0) rays.push({ a: flame6(), b: lerp3(flame6(), page6(), k1), r: 0.004 });
  if (k2 > 0) rays.push({ a: page6(), b: lerp3(page6(), EYE6, k2), r: 0.004 });
  const P = W3.frame({ cam: cam6(), t, dim: 1, bg: 'night', st: { night: true, bulb: 0, candle: 1, desk: true }, rays });
  let s = '', u = '';
  s += badge(150, 300, 2, S.P(0, 0, 0.12)); u += lab(560, 300, 'অন্যের আলো ফিরে চোখে', 'move', S.P(0, 0.2, 0.35));
  const [ex, ey] = P(...EYE6), ob = observer(ex, ey, 'তুমি', 1, 0.36); s += ob.svg; u += ob.ui;
  const [bx, by] = P(...page6()); u += lab(bx, by + 70, 'বই: অনুজ্জ্বল বস্তু', 'name', S.P(0, 0.4, 0.55));
  u += termCard('প্রতিফলিত', 'Reflected', S.P(2, 0.2, 0.4), 1 - S.P(3, 0.6, 0.8), 960, 470, 0.75);
  return { gl: true, svg: s, ui: u };
});
