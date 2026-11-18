/* ২ঘ: the textbook activity (p. 85) in a 3D classroom. Friend 1 (labelled eye) walks straight from one wall to the
   other at 1.2 m/s; friend 2 walks a zigzag (z = z0 + 0.6 sin(2πx/2.8)) at 1.5 m/s, a steady speed along the path
   (arc-length table). Each leaves a trail on the floor. People are never drawn, only their labelled eyes. */
const WALK = (function () {
  const X0 = -4.2, X1 = 4.2, N = 400, zig = x => 1.7 + 0.6 * Math.sin(2 * Math.PI * (x - X0) / 2.8);
  const pts = [], cum = [0];
  for (let k = 0; k <= N; k++) { const x = X0 + (X1 - X0) * k / N; pts.push([x, zig(x)]); if (k) cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1])); }
  const at = s => { s = cl(s, 0, cum[N]); let k = 1; while (k < N && cum[k] < s) k++; const f = (s - cum[k - 1]) / (cum[k] - cum[k - 1]); return [pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * f, pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * f]; };
  return { X0, X1, ZS: -0.5, V1: 1.2, V2: 1.5, len2: cum[N], at, pts };
})();

part('s02_p04', { scene: 2, label: '২ঘ', last: true, title: "বইয়ের কাজ: সোজা ও আঁকাবাঁকা হাঁটা",
  screen: "3D শ্রেণিকক্ষ, সামনে থেকে একটু ওপরে: পেছনের দেয়ালে ব্ল্যাকবোর্ড, পেছনে দুই সারি বেঞ্চ, সামনে খোলা মেঝে। \"বন্ধু ১\" লেখা চোখ এক দেয়াল থেকে অন্য দেয়ালে সোজা যায়, মেঝেতে সোজা দাগ পড়ে, ট্যাগ \"সরল রৈখিক গতি\"। তারপর \"বন্ধু ২\" লেখা চোখ আঁকাবাঁকা পথে যায়, মেঝেতে বাঁকা দাগ, ট্যাগ \"বক্রগতি\"।" }, [
  { c: "ক্লাসে এক বন্ধু এক মাথা থেকে অন্য মাথায় সোজা হেঁটে গেল: সরল রৈখিক গতি।" },
  { c: "আরেক বন্ধু গেল আঁকাবাঁকা পথে: বক্রগতি।", d: 8.4 }
], function (t, S) {
  const X = ROAD.CLS.X, { X0, X1, ZS, V1, V2, len2, at, pts } = WALK;
  const P = W3.frame({ cam: W3.clsWide() });
  let s = '', u = '';
  const t1 = S.A(0) + 0.3, x1 = Math.min(X1, X0 + V1 * Math.max(0, t - t1));
  const t2 = S.A(1) + 0.2, s2 = V2 * Math.max(0, t - t2), [x2, z2] = at(s2);
  // trails on the floor
  if (x1 > X0) s += path3(P, [[X + X0, 0.01, ZS], [X + x1, 0.01, ZS]], '#7fd1ff', 8, '2 14');
  if (t > t2) { const tr = pts.filter(p => p[0] <= x2).map(p => [X + p[0], 0.01, p[1]]); tr.push([X + x2, 0.01, z2]); s += path3(P, tr, Y, 8, '2 14'); }
  const o1 = placed(P, X + x1, 1.45, ZS, 0.02, 'বন্ধু ১'), o2 = t >= S.A(1) - 0.3 ? placed(P, X + x2, 1.45, z2, 0.02, 'বন্ধু ২', S.fin(1) + (t >= S.A(1) ? 1 : 0)) : { svg: '', ui: '' };
  s += o1.svg + o2.svg; u += o1.ui + o2.ui;
  if (x1 >= X1 - 0.01 || t > S.E(0) - 0.6) { const [lx, ly] = P(X + 1.0, 0.01, ZS); u += lab(lx, ly + 44, 'সরল রৈখিক গতি', 'move', pr(t, S.E(0) - 0.8, S.E(0) - 0.4)); }
  if (s2 >= len2 * 0.55) { const [lx, ly] = P(X - 1.0, 0.01, 2.5); u += lab(lx, ly + 40, 'বক্রগতি', 'move', pr(t, t2 + len2 * 0.55 / V2, t2 + len2 * 0.55 / V2 + 0.4)); }
  return { gl: true, svg: s, ui: u };
});
