/* ৩ঘ:  */
part('s03_p04', { scene: 3, label: '৩ঘ', last: true, title: "ব্যাট ও বল: দিক বদল",
  screen: "ক্রিকেট বল আসে, ব্যাটে লেগে অন্য দিকে যায়; হিসাব করা অধিবৃত্ত পথ।" }, [
  { c: "ক্রিকেট বল তোমার দিকে ছুটে আসছে। ব্যাট দিয়ে আঘাত করলে।" },
  { c: "বলটা অন্য দিকে ছুটল! বল প্রয়োগে চলন্ত বস্তুর গতির দিকও বদলায়।" },
  { c: "কে বল দিল? ব্যাট। কোথায়? বলের গায়ে, ঠিক ছোঁয়ার জায়গায়। তাতেই পথটা ঘুরে গেল।" }
], function (t, S) {
  const tHit = S.A(1) + 0.4, tau = (t - tHit) * BAT.SLOW, rep = t >= S.A(2), ball = tau > -BAT.TIN && (tau < 1.0 || rep) ? batBall(rep ? -0.02 : tau) : null;
  const P = W3.frame({ cam: C11.bat(), cricket: { phi: batPhi(rep ? -0.02 / 20 : tau), ball: rep ? batBall(0) : ball }, sun: [-14, 34, 26] }), pm = pxpm(P, [BAT.X, 1, BAT.Z]);
  let s = '', u = ''; const H = [BAT.X - 0.02, 1.05], ph = batPhi(rep ? 0 : tau), hp = d => P(H[0] + d * Math.sin(ph), H[1] - d * Math.cos(ph), BAT.Z), [ax, ay] = hp(0.06), [bx, by] = hp(0.3);
  const ang = Math.atan2(by - ay, bx - ax) * 180 / Math.PI; s += handGrip(...hp(0.07).slice(0, 2), ang, pm) + handGrip(...hp(0.17).slice(0, 2), ang, pm);
  const path = (a, b) => { const p = []; for (let k = 0; k <= 30; k++) { const q = a + (b - a) * k / 30, [x, y] = batBall(q); p.push([x, y, BAT.Z]); } return p; };
  if (tau > -BAT.TIN) s += path3(P, path(-BAT.TIN, Math.min(0, rep ? 0 : tau)), '#fff', 5, '3 12');
  if (tau > 0 || rep) s += path3(P, path(0, rep ? 0.9 : Math.min(tau, 0.9)), Y, 6, '3 12');
  if (rep) { const [cx, cy] = P(BAT.X + BAT.HIT[0], BAT.HIT[1], BAT.Z), vy = BAT.VIN[1] - BAT.G * BAT.TIN, dv = [BAT.VOUT[0] - BAT.VIN[0], BAT.VOUT[1] - vy], n = Math.hypot(...dv), L = 230 * S.P(2, 0.3, 0.45);
    s += arrow2(cx + 30, cy, cx + 30 + L * dv[0] / n, cy - L * dv[1] / n, S.P(2, 0.3, 0.45)); u += lab(cx + 120 + 0.6 * L, cy - 0.55 * L - 40, big('ব্যাটের বল'), 'move', S.P(2, 0.3, 0.45)); }
  u += lab(1700, 220, 'ধীরে', 'name', cl((t - tHit + 3.5) * 2)); if (t >= tHit + 1.2 && !rep) u += lab(1100, 250, big('দিক বদলাল!'), 'move');
  return { gl: true, svg: s, ui: u };
});
