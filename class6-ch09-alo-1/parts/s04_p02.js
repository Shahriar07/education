/* ৪খ: fig 9.2 in motion: light goes from the bulb straight to the eye; and from the bulb to the ball, then from the ball to
   the eye. Every path is a straight line (3D tubes, hidden where the shade or the ball is in front). */
const ballC = () => [ST.X + ST.BALL.x, ST.top + ST.BALL.r, ST.BALL.z];
const bulbC = () => [ST.X + ST.BULB.x, ST.BULB.y - 0.05, ST.BULB.z];
/* the point of the ball that sends light to your eye: on the ball, halfway (in direction) between the bulb and the eye */
function ballPt() { const c = ballC(), u = v => { const n = Math.hypot(...v); return v.map(q => q / n); }, a = u(bulbC().map((v, i) => v - c[i])), b = u(EYE92.map((v, i) => v - c[i])), h = u(a.map((v, i) => v + b[i])); return c.map((v, i) => v + h[i] * (ST.BALL.r + 0.002)); }
const lerp3 = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
part('s04_p02', { scene: 4, label: '৪খ', title: "চিত্র ৯.২: আলো আসে চোখে",
  screen: "একই সাজানো। বাল্ব জ্বলে ওঠে। হলুদ আলোর রেখা বাল্ব থেকে সোজা চোখে আসে; তারপর আরেকটা বাল্ব থেকে বলের আলোকিত দিকে, সেখান থেকে চোখে। সবুজ টিক। চিত্র-ট্যাগ: \"চিত্র ৯.২\"। বলের আলোকিত অর্ধেক বাল্বের দিকে, টেবিলে ছায়া উল্টো দিকে।" }, [
  { c: "আসলে ঘটনা ঠিক উল্টো। চোখ থেকে আলো বস্তুতে যায় না।" },
  { c: "বাল্ব থেকে আলো সরাসরি তোমার চোখে আসে, তাই তুমি বাল্বটা দেখো।" },
  { c: "আবার বাল্বের আলো বলে পড়ে, সেখান থেকে ফিরে আসে তোমার চোখে।" },
  { c: "তাই তুমি বলটাও দেখো।" }
], function (t, S) {
  const on = ease(S.P(0, 0.3, 0.55)), r1 = ease(S.P(1, 0.15, 0.6)), r2 = ease(S.P(2, 0.05, 0.45)), r3 = ease(S.P(2, 0.5, 0.95));
  const rays = [];
  if (r1 > 0) rays.push({ a: bulbC(), b: lerp3(bulbC(), EYE92, r1), r: 0.004 });
  if (r2 > 0) rays.push({ a: bulbC(), b: lerp3(bulbC(), ballPt(), r2), r: 0.004 });
  if (r3 > 0) rays.push({ a: ballPt(), b: lerp3(ballPt(), EYE92, r3), r: 0.004 });
  const P = W3.frame({ cam: fig92Cam(), t, dim: 0.75, bg: 'night', st: { night: true, bulb: on, desk: false, ball: true }, rays });
  let s = '', u = figTag('চিত্র ৯.২: আমরা যেভাবে দেখি', S.P(0, 0.1, 0.3));
  const [ex, ey] = P(...EYE92), ob = observer(ex, ey, 'তুমি', 1, 0.36); s += ob.svg; u += ob.ui;
  const [lx, ly] = P(...bulbC()), [bx, by] = P(...ballC());
  u += lab(lx - 170, ly, 'বাল্ব', 'name', S.P(1, 0, 0.15)); u += lab(bx - 40, by + 80, 'বল', 'name', S.P(2, 0, 0.15));
  s += tick(ex - 20, ey - 140, 30, S.P(3, 0.2, 0.45));
  return { gl: true, svg: s, ui: u };
});
