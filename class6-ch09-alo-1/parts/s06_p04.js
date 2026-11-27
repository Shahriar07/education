/* ৬ঘ: the three cases side by side, then the hook's answer: in the dark no light falls on the book, so none comes back;
   the candle lights, the light falls on the book and comes back to your eyes (the camera) */
part('s06_p04', { scene: 6, label: '৬ঘ', last: true, title: "তিন ঘটনা পাশাপাশি",
  screen: "\"এক নজরে\": তিনটি কার্ড পাশাপাশি, প্রতিটির নিচে এক লাইন: সরাসরি চোখে, ফিরে চোখে, শোষিত। তারপর হুকের পড়ার ঘর, অন্ধকার: কোনো রশ্মি নেই; মোমবাতি জ্বলে, রশ্মি বইয়ে পড়ে তোমার চোখে ফেরে।" }, [
  { c: "তাহলে হুকের প্রশ্নের উত্তর কী?" },
  { c: "আমরা কোনো বস্তু তখনই দেখি, যখন সেই বস্তু থেকে আলো এসে আমাদের চোখে পড়ে।" },
  { c: "লোডশেডিংয়ের অন্ধকারে বইয়ের ওপর কোনো আলোই পড়েনি, তাই কিছু ফিরেও আসেনি।" },
  { c: "মোমবাতি জ্বলতেই আলো এল, আর তুমি সব দেখতে পেলে।" }
], function (t, S) {
  if (t < S.A(2)) {
    let s = bg(NAVY), u = banner('এক নজরে', S.P(0, 0.05, 0.25), 1, 120);
    const cards = [['সরাসরি চোখে', 0], ['ফিরে চোখে', 1], ['শোষিত', 2]];
    cards.forEach(([n, i]) => { const p = pr(t, 0.3 + i * 0.35, 0.7 + i * 0.35); if (p <= 0) return; const x0 = 140 + i * 570, cx = x0 + 260, cy = 560;
      let d = `<rect x="${x0}" y="300" width="520" height="460" rx="34" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>`;
      d += eye(cx + 150, cy, 0.6, -6, 0);
      if (i === 0) { d += `<g transform="translate(${cx - 150},${cy + 70}) scale(0.5)">${candle(0, 0, 150, 1, t)}</g>` + arrow2(cx - 110, cy - 50, cx + 85, cy - 5, 1, Y); }
      if (i === 1) { d += `<g transform="translate(${cx - 180},${cy - 20}) scale(0.35)">${candle(0, 0, 150, 1, t)}</g><path d="M${cx - 90} ${cy + 110} L${cx + 10} ${cy + 125} L${cx + 10} ${cy + 80} L${cx - 90} ${cy + 65} Z" fill="#fbf8ef" stroke="#7b2a22" stroke-width="5"/>` + arrow2(cx - 160, cy - 60, cx - 50, cy + 70, 1, Y) + arrow2(cx - 30, cy + 70, cx + 90, cy + 10, 1, Y); }
      if (i === 2) { d += `<rect x="${cx - 120}" y="${cy + 40}" width="150" height="90" rx="10" fill="#111"/>` + arrow2(cx - 190, cy - 110, cx - 60, cy + 40, 1, Y) + cross(cx + 70, cy - 40, 30, 1); }
      s += g(p, d); u += `<div class="abs" style="left:${x0}px;width:520px;top:690px;text-align:center;opacity:${p.toFixed(2)}"><span class="lab move" style="transform:none">${n}</span></div>`; });
    if (t >= S.A(1)) u += card('বস্তু থেকে আলো চোখে এলে, তবেই দেখি', S.P(1, 0.1, 0.3), 1, 820, 1400, 60);
    return { svg: s, ui: u };
  }
  /* the hook again, from your eyes: dark, then the candle; light falls on the book and comes back to you */
  const lit = ease(S.P(3, 0.05, 0.35)), k1 = ease(S.P(3, 0.35, 0.6)), k2 = ease(S.P(3, 0.6, 0.9)), cam = seatCam();
  const flame = [ST.X + ST.CANDLE.x, ST.top + 0.135, ST.CANDLE.z], pg = [ST.X + 0.22, ST.top + 0.025, -1.42], me = lerp3(cam.pos, pg, 0.18).map((v, i) => v - [0, 0.12, 0][i]);
  const rays = []; if (k1 > 0) rays.push({ a: flame, b: lerp3(flame, pg, k1), r: 0.004 }); if (k2 > 0) rays.push({ a: pg, b: lerp3(pg, me, k2), r: 0.004 });
  const P = W3.frame({ cam, t, dim: 1, bg: 'night', st: { night: true, bulb: 0, candle: lit, desk: true }, rays });
  let s = `<rect width="1920" height="1080" fill="#000" opacity="${(0.62 * (1 - 0.75 * lit)).toFixed(2)}"/>`, u = whoTag('কে দেখছে: তুমি', 1);
  if (t < S.A(3)) u += lab(960, 300, 'কোনো আলো পড়েনি, কিছু ফেরেনি', 'name', S.P(2, 0.3, 0.45));
  return { gl: true, svg: s, ui: u };
});
