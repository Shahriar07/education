/* ৩গ: a village yard (3D). An old cycle rim (R = 0.31 m) is driven with a stick, the game চাকা চালানো. It rolls
   without slipping: turn = distance / R. First pass at 0.43 m/s, second pass 0.35 m/s, both in view for their sentences with a yellow mark whose
   path is drawn from the rolling equations: centre (x, R), mark = centre + R(sinθ, −cosθ), θ = −x/R. */
const RIMV = { V1: 0.43, V2: 0.35 };   // both passes stay in view for their whole sentences (view ≈ V.X−3.6 … V.X+1.6 at the rim)   // second pass slow, so the rim and its path stay in view for both sentences

part('s03_p03', { scene: 3, label: '৩গ', title: "গ্রামের উঠানে চাকা চালানো: জটিল গতি",
  screen: "3D গ্রামের উঠান: টিনের চালের ঘর, কলসি, কাপড় শুকানোর দড়ি। পুরোনো সাইকেলের চাকা (রিম ও স্পোক) গড়িয়ে চলে, একটা হাতে ধরা কাঠি পেছন থেকে ঠেলে। দ্বিতীয়বার রিমের হলুদ দাগ তার পথ আঁকে, কেন্দ্রের সামনে-চলার তীর। শব্দ-কার্ড: ঘূর্ণন চলন গতি বা জটিল গতি / Complex motion।" }, [
  { c: "গ্রামের উঠানে পুরোনো সাইকেলের চাকা কাঠি দিয়ে চালানোর খেলা তুমি নিশ্চয়ই দেখেছ।" },
  { c: "বইয়ে বলা আছে বন্ধুর সাইকেলের চাকা লক্ষ করতে। এই চাকাও ঠিক তেমন।" },
  { c: "চাকার দাগটা দেখো। সে কেন্দ্রের চারদিকে ঘুরছে, আবার পুরো চাকাটাই সামনে এগোচ্ছে।" },
  { c: "ঘূর্ণন আর চলন একসাথে। একে বলে ঘূর্ণন চলন গতি বা জটিল গতি।" }
], function (t, S) {
  const V = ROAD.VIL, R = ROAD.RIM.R, Z = ROAD.RIM.Z;
  const second = t >= S.A(2);
  const xs = second ? V.X - 3.4 : V.X - 3.8, v = second ? RIMV.V2 : RIMV.V1, ts = second ? S.A(2) : 0.3;
  const x = xs + v * Math.max(0, t - ts);
  const P = W3.frame({ cam: W3.yardRim(), rim: { x } });
  let s = '', u = '';
  const yc = R + 0.016;
  if (second && x > xs) {
    const pts = []; for (let k = 0; k <= 160; k++) { const xx = xs + (x - xs) * k / 160, th = -xx / R; pts.push([xx + R * Math.sin(th), yc - R * Math.cos(th), Z + 0.02]); }
    s += path3(P, pts, Y, 6, '2 10');
    const [ax, ay] = P(xs, yc, Z), [bx, by] = P(x, yc, Z);
    s += arrow2(ax, ay, bx, by, S.fin(2), '#7fd1ff');
  }
  // the hand holding the stick (stick top, as placed by W3.frame)
  const [hx, hy, ok] = P(x - 0.95, 0.95, Z + 0.12);
  if (ok && hx > -100 && hx < 2020) s += gripHand(hx + 4, hy + 10, 0.36, 1);
  if (t >= S.A(1)) { const [lx, ly] = P(x, yc + 0.6, Z); u += lab(lx, ly, 'সাইকেলের চাকা', 'name', S.P(1, 0.4, 0.55) * (second ? 0 : 1)); }
  if (S.on(3)) u += termCard('ঘূর্ণন চলন গতি বা জটিল গতি', 'Complex motion', S.P(3, 0.62, 0.75), 1, 960, 300, 0.8);
  return { gl: true, svg: s, ui: u };
});
