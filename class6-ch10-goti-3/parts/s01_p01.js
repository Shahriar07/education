/* ১ক: hook: outside first (who is where), then the camera flies into your eyes. The car starts from rest: a = 1 m/s² up to 14 m/s. */
part('s01_p01', { scene: 1, label: '১ক', first: true, title: "গাড়ির জানালায়",
  screen: "3D রাস্তা। আগে বাইরে থেকে কোনাকুনি: থামা গাড়ি, ভেতরে \"তুমি\" লেখা চোখ। ক্যামেরা উড়ে তোমার চোখে যায় (\"কে দেখছে: তুমি\")। জানালার ফ্রেম স্থির, বাইরের দোকান ও ল্যাম্পপোস্ট প্রথমে আস্তে, পরে দ্রুত পেছনে সরে।" }, [
  { c: "ধরো, তুমি গাড়ির পেছনের সিটে বসে জানালা দিয়ে তাকিয়ে আছ।" },
  { c: "গাড়ি ছাড়ল। বাইরের দোকান আর ল্যাম্পপোস্ট প্রথমে আস্তে আস্তে পেছনে সরছে।" },
  { c: "একটু পরেই সরছে অনেক তাড়াতাড়ি! অথচ জানালার ফ্রেমটা তোমার কাছে একই জায়গায়।" }
], function (t, S) {
  const H = HOOK, tS = S.A(1) + 0.2, xc = H.X0 + hookS(t - tS), v = hookV(t - tS);
  const k = ease(pr(t, 1.8, S.A(1) - 0.2)), P = W3.frame({ cam: W3.mix(W3.third(xc), hookCam(xc), k), car1: { x: xc, z: ROAD.LANE_Z, dir: 1 } });
  let s = '', u = '';
  if (k < 0.7) { const me = placed(P, xc - 0.75, 2.9, ROAD.LANE_Z + 0.4, 1.2, 'তুমি', 1 - pr(k, 0.4, 0.7)); s += me.svg; u += me.ui; }
  u += whoTag('কে দেখছে: তুমি', pr(k, 0.9, 1));
  if (t > tS) { W3.lamps(xc - 6, xc + 8).forEach(x => { const [a, b, ok] = P(x, 1.15, ROAD.LAMP_Z); if (ok && a > 150 && a < 830) { u += lab(a, 250, 'ল্যাম্পপোস্ট', 'move', Math.min(pr(a, 150, 230), 1 - pr(a, 770, 830))); } }); s += arrow2(640, 560, 640 - 60 - v * 34, 560, pr(t, tS + 0.6, tS + 1), BLUE); }
  if (t >= S.A(2)) { const p = S.P(2, 0.55, 0.65), [px, py] = P(xc - 0.2, 1.17, ROAD.LANE_Z - 0.8); s += pin(px, py + 40, 1.2, p); u += lab(px + 190, py, 'জানালার ফ্রেম', 'rest', p); }
  return { gl: true, svg: s, ui: u };
});
