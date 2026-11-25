/* ২গ: wrong belief: Anila walks on, 6 m more north at 1 m/s: distance 14 -> 20 m, displacement 6 -> 0 m */
part('s02_p03', { scene: 2, label: '২গ', title: "ভুল ধারণা: বেশি হাঁটলে বেশি সরণ?",
  screen: "একই মাঠ। আনিলা উত্তরে শুরু পর্যন্ত ফিরে আসে; দুটি চলমান ঘর: দূরত্ব বাড়ে (১৪ থেকে ২০ মি), সরণ কমে (৬ থেকে ০ মি)। লাল ক্রস আর সবুজ টিক।" }, [
  { c: "অনেকে ভাবে, যত হাঁটব, সরণ তত বাড়বে।" },
  { c: "আসলে ফিরতে শুরু করলে ঘটনা ঠিক উল্টো।" },
  { c: "দেখো, আনিলা আরও উত্তরে ফিরছে। প্রতি পায়ে দূরত্ব বাড়ছে, অথচ সরণ কমছে।" },
  { c: "শুরুর জায়গায় পৌঁছালে দূরত্ব ২০ মিটার, কিন্তু সরণ শূন্য!" }
], function (t, S) {
  const X = ROAD.NS.X, Z = ROAD.NS.Z, tA = S.A(2) + 0.2, d = 14 + cl(t - tA, 0, 6), pos = 20 - d, P = W3.frame({ cam: W3.nsSide(), sun: ANI.SUN });
  let s = nsTrail(P, d, 10, 0.8), u = nsHead('');
  s += nsHeadSvg() + dot3(P, [X, 0.02, Z], '#fff', 13); const [sx, sy] = P(X, 0.02, Z); u += lab(sx - 105, sy + 8, 'শুরু', 'name');
  if (pos > 0.35) s += dispArrow(P, 0, pos, 1, 95);
  const ob = placed(P, X + pos, 1.4, Z + ANI.ZB, 0.02, 'আনিলা'); s += ob.svg; u += ob.ui;
  if (t < S.A(1)) { u += qTop('যত হাঁটব, সরণ তত বাড়বে?', S.P(0, 0.2, 0.4), 340); } else { u += qTop('যত হাঁটব, সরণ তত বাড়বে?', 1 - S.P(2, 0, 0.1), 340); s += cross(1480, 400, 46, S.P(1, 0.2, 0.4) * (1 - S.P(2, 0, 0.1))); }
  if (t >= S.A(2)) { const p = S.P(2, 0, 0.1); u += readout(60, 360, 'দূরত্ব', BNF(Math.floor(d + 1e-6)) + ' মি. ▲', p) + readout(1330, 360, 'সরণ', BNF(Math.ceil(pos - 1e-6)) + ' মি. ▼', p); }
  return { gl: true, svg: s, ui: u };
});
