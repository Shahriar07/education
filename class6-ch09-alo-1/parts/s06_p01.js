/* ৬ক: case 1: a luminous object: the candle's own light comes straight to your eye */
const EYE6 = [ST.X - 0.25, 1.0, -1.15];
const cam6 = () => ({ pos: [ST.X + 0.35, 1.28, 0.25], look: [ST.X + 0.38, 0.95, -1.4], fov: 50 });
const flame6 = () => [ST.X + ST.CANDLE.x, ST.top + 0.135, ST.CANDLE.z];
part('s06_p01', { scene: 6, label: '৬ক', first: true, title: "ঘটনা ১: উজ্জ্বল বস্তুর আলো",
  screen: "নম্বর ১। 3D অন্ধকার ঘরে টেবিলে জ্বলন্ত মোমবাতি, বাঁয়ে \"তুমি\" লেখা চোখ। শিখা থেকে হলুদ রশ্মি সোজা চোখে আসে। শিরোনাম: \"নিজের আলো সোজা চোখে\"।" }, [
  { c: "এবার হুকের প্রশ্নে ফিরি।" },
  { c: "ঘটনা এক। মোমবাতি একটা উজ্জ্বল বস্তু।" },
  { c: "তার নিজের আলো আলোকরশ্মি হয়ে সোজা তোমার চোখে আসে।" },
  { c: "তাই তুমি শিখাটা দেখো।" }
], function (t, S) {
  const k = ease(S.P(2, 0.15, 0.75));
  const P = W3.frame({ cam: cam6(), t, dim: 1, bg: 'night', st: { night: true, bulb: 0, candle: 1, desk: false }, rays: k > 0 ? [{ a: flame6(), b: lerp3(flame6(), EYE6, k), r: 0.004 }] : [] });
  let s = '', u = '';
  s += badge(150, 300, 1, S.P(1, 0, 0.12)); u += lab(560, 300, 'নিজের আলো সোজা চোখে', 'move', S.P(1, 0.2, 0.35));
  const [ex, ey] = P(...EYE6), ob = observer(ex, ey, 'তুমি', S.P(0, 0.4, 0.6), 0.36); s += ob.svg; u += ob.ui;
  const [fx, fy] = P(...flame6()); u += lab(fx + 30, fy - 120, 'উজ্জ্বল বস্তু', 'name', S.P(1, 0.4, 0.55));
  s += tick(ex, ey - 130, 28, S.P(3, 0.2, 0.4));
  return { gl: true, svg: s, ui: u };
});
