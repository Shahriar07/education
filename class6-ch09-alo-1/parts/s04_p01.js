/* ৪ক: the wrong idea: light goes out of the eye. Fig 9.2's arrangement in your study room at night, the bulb off. */
const EYE92 = [ST.X + 1.08, 1.12, -1.02];                  // your eye, to the right of the desk, looking at the ball
const fig92Cam = () => ({ pos: [ST.X + 0.55, 1.42, 0.55], look: [ST.X + 0.55, 1.18, -1.35], fov: 50 });
part('s04_p01', { scene: 4, label: '৪ক', first: true, title: "ভুল ধারণা: চোখ থেকে আলো?",
  screen: "3D ঘর, চিত্র ৯.২-এর সাজানো: ছাদ থেকে ঝোলানো শেডওয়ালা বাল্ব, নিচে টেবিলে ক্রিকেট বল, ডানে \"তুমি\" লেখা চোখ। বাল্ব নেভানো, ঘর অন্ধকার। চোখ থেকে বলের দিকে একটা ধূসর তীর যায়। লাল ক্রস।" }, [
  { c: "কিন্তু তার আগে, দেখা ব্যাপারটা নিয়ে একটা কথা।" },
  { c: "অনেকে ভাবে, আমাদের চোখ থেকে আলো বেরিয়ে জিনিসের ওপর পড়ে, তাই আমরা দেখি।" },
  { c: "তাই যদি হতো, তাহলে অন্ধকারেও তো সব দেখা যেত!" }
], function (t, S) {
  const dark = ease(S.P(2, 0.1, 0.5));
  const P = W3.frame({ cam: fig92Cam(), t, dim: 0.55 + 0.45 * dark, bg: 'night', st: { night: true, bulb: 0, desk: false, ball: true } });
  let s = `<rect width="1920" height="1080" fill="#000" opacity="${(0.55 * dark).toFixed(2)}"/>`, u = '';
  const [ex, ey] = P(...EYE92), [bx, by] = P(ST.X + ST.BALL.x, ST.top + ST.BALL.r, ST.BALL.z);
  const ob = observer(ex, ey, 'তুমি', S.P(0, 0.3, 0.5), 0.36); s += ob.svg; u += ob.ui;
  const a = S.P(1, 0.4, 0.75); s += arrow2(ex - 60, ey + 10, ex - 60 + (bx + 40 - ex + 60) * ease(a), ey + 10 + (by - ey - 10) * ease(a), a > 0.02 ? 1 : 0, '#a9b3c2');
  u += lab((ex + bx) / 2, (ey + by) / 2 - 70, 'চোখ থেকে আলো?', 'name', S.P(1, 0.6, 0.75));
  s += cross((ex + bx) / 2, (ey + by) / 2 + 40, 40, S.P(2, 0.45, 0.65));
  return { gl: true, svg: s, ui: u };
});
