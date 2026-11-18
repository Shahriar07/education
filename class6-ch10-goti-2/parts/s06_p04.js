/* ৬ঘ: the five kinds side by side, each a small moving picture with its marked point and path.
   চলন: a box slides and returns (equal arrows); ঘূর্ণন: fan; জটিল: rolling rim (path from x = r(θ − sinθ));
   পর্যাবৃত্ত: clock hand; দোলন: pendulum (T = 2π√(L/g), L = 0.5 m → 1.42 s). The fan tile then gets two tags. */
part('s06_p04', { scene: 6, label: '৬ঘ', last: true, title: "পাঁচটি গতি পাশাপাশি",
  screen: "পাঁচটি টাইল পাশাপাশি, প্রতিটিতে চলমান ছোট ছবি আর দাগ দেওয়া বিন্দুর পথ: চলন (কার্টন), ঘূর্ণন (পাখা), জটিল (গড়ানো রিম), পর্যাবৃত্ত (ঘড়ির কাঁটা), দোলন (দোলক); নিচে নাম একে একে। তারপর পাখার টাইলে দ্বিতীয় ট্যাগ \"পর্যাবৃত্ত গতি\"।" }, [
  { c: "পাঁচটা গতি এখন পাশাপাশি।" },
  { c: "চলন, ঘূর্ণন, জটিল, পর্যাবৃত্ত আর দোলন।" },
  { c: "কোনো গতি একসাথে দুই দলেও পড়তে পারে, যেমন পাখা।" },
  { c: "প্রতিটার দাগটা কোন পথে যাচ্ছে, মিলিয়ে নাও।", d: 4.6 }
], function (t, S) {
  let s = bg(NAVY), u = '';
  const TW = 340, TH = 460, GAP = 20, X0 = (1920 - 5 * TW - 4 * GAP) / 2, TY = 220;
  const names = ['চলন', 'ঘূর্ণন', 'জটিল', 'পর্যাবৃত্ত', 'দোলন'];
  for (let i = 0; i < 5; i++) {
    const p = S.P(0, i * 0.12, i * 0.12 + 0.3), x = X0 + i * (TW + GAP), cx = x + TW / 2, cy = TY + 200;
    if (p <= 0) continue;
    let g2 = `<rect x="${x}" y="${TY}" width="${TW}" height="${TH}" rx="28" fill="#1b2b5c" stroke="#33488c" stroke-width="4"/>`;
    if (i === 0) {           // box slides 140 px and back, smooth (2 s each way)
      const ph = (t % 4) / 4, f = ph < 0.5 ? ease(ph * 2) : ease(2 - ph * 2), bx = x + 40 + 140 * f;
      g2 += `<line x1="${x + 20}" y1="${cy + 80}" x2="${x + TW - 20}" y2="${cy + 80}" stroke="#5d6f9e" stroke-width="4"/>` + carton(bx, cy + 80, 120, 100);
      g2 += hArrow(x + 58, bx + 18, cy + 30, 1, '#e63946') + hArrow(x + 130, bx + 90, cy - 20, 1, Y);
    } else if (i === 1) {    // fan
      const ang = t * 90; g2 += fanCircle(cx, cy, 130 * 0.9, Y, 1, 0) + fan2d(cx, cy, 130, ang, { rodTop: TY + 20, canopy: false });
      const [mx, my] = fanPt(cx, cy, 130, ang, 0, 0.9); g2 += `<circle cx="${F(mx)}" cy="${F(my)}" r="10" fill="${Y}" stroke="#0f1b3d" stroke-width="3"/>`;
    } else if (i === 2) {    // rolling rim, repeats every 3 s
      const r = 50, v = 80, tt = t % 3, d0 = v * tt, th = d0 / r, x0 = x + 20, yg = cy + 90;
      let d = ''; for (let k = 0; k <= 60; k++) { const a = th * k / 60; d += (k ? 'L' : 'M') + F(x0 + r * (a - Math.sin(a))) + ' ' + F(yg - r * (1 - Math.cos(a))); }
      g2 += `<line x1="${x + 10}" y1="${yg}" x2="${x + TW - 10}" y2="${yg}" stroke="#5d6f9e" stroke-width="4"/><path d="${d}" fill="none" stroke="${Y}" stroke-width="4" stroke-dasharray="2 8"/>` + rim2d(x0 + d0, yg - r, r, 90 + th * 180 / Math.PI);
    } else if (i === 3) {    // clock second hand, 6× faster
      g2 += clock(cx, cy, 120, 6 * t);
    } else {                 // pendulum
      const T = 2 * Math.PI * Math.sqrt(0.5 / 9.8), th = 0.3 * Math.cos(2 * Math.PI * t / T), L = 200, bx = cx + L * Math.sin(th), by = TY + 40 + L * Math.cos(th);
      g2 += `<line x1="${cx}" y1="${TY + 40}" x2="${cx}" y2="${TY + 300}" stroke="${Y}" stroke-width="3" stroke-dasharray="8 8"/><line x1="${cx}" y1="${TY + 40}" x2="${F(bx)}" y2="${F(by)}" stroke="#e6e6e6" stroke-width="4"/><circle cx="${F(bx)}" cy="${F(by)}" r="26" fill="#c9a24a" stroke="#fff" stroke-width="3"/>`;
    }
    s += g(p, g2);
    u += lab(cx, TY + TH - 50, names[i] + (i === 0 || i === 1 || i === 2 ? ' গতি' : ' গতি'), 'move', S.P(1, i * 0.16, i * 0.16 + 0.15));
  }
  if (t >= S.A(2)) {
    const cx = X0 + TW + GAP + TW / 2;
    u += lab(cx, TY + TH + 30, '+ পর্যাবৃত্ত গতি', 'move', S.P(2, 0.45, 0.6));
    s += `<rect x="${X0 + TW + GAP - 8}" y="${TY - 8}" width="${TW + 16}" height="${TH + 16}" rx="34" fill="none" stroke="${Y}" stroke-width="8" opacity="${S.P(2, 0.3, 0.45).toFixed(2)}"/>`;
  }
  return { svg: s, ui: u };
});
