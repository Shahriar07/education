/* ৬গ: case 3. A point goes round the same circle once every TP = 2.0 s; each time it passes the top a mark is put on
   a time line below, and the marks are equally spaced → পর্যাবৃত্ত গতি. Then a simple pendulum, L = 1 m:
   T = 2π√(L/g) = 2.01 s, θ = 14° cos(2πt/T), going to both sides of the rest line → দোলন গতি. */
part('s06_p03', { scene: 6, label: '৬গ', title: "ঘটনা ৩: পর্যাবৃত্ত ও দোলন গতি",
  screen: "হলুদ বৃত্তে ৩। একটা বিন্দু একই বৃত্তপথে বারবার ঘোরে; নিচের সময়-রেখায় প্রতি পাকে একটা দাগ, দাগগুলোর ফাঁক সমান; শব্দ-কার্ড: পর্যাবৃত্ত গতি। তারপর একটা দোলক মাঝের খাড়া ডটেড রেখার দুই পাশে দোলে; শব্দ-কার্ড: দোলন গতি।" }, [
  { c: "তিন: একই পথ নির্দিষ্ট সময় পর পর বারবার এলে, সেটা পর্যাবৃত্ত গতি।" },
  { c: "আর একটা অবস্থানের দুই পাশে আসা-যাওয়া হলে, সেটা দোলন গতি।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  s += badge(200, 260, 3, S.P(0, 0, 0.1));
  if (t < S.A(1)) {
    const TP = 2.0, cx = 700, cy = 470, r = 210, a = -Math.PI / 2 + 2 * Math.PI * t / TP;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#5d6f9e" stroke-width="6" stroke-dasharray="4 12"/>`;
    s += `<line x1="${cx}" y1="${cy}" x2="${F(cx + r * Math.cos(a))}" y2="${F(cy + r * Math.sin(a))}" stroke="#cfd8ee" stroke-width="6"/><circle cx="${cx}" cy="${cy}" r="10" fill="#cfd8ee"/>`;
    s += `<circle cx="${F(cx + r * Math.cos(a))}" cy="${F(cy + r * Math.sin(a))}" r="18" fill="${Y}" stroke="#fff" stroke-width="4"/>`;
    // time line: one mark per finished turn, TP apart
    const X0 = 1050, PXs = 160, YT = 470;
    s += `<line x1="${X0}" y1="${YT}" x2="${X0 + PXs * 4.4}" y2="${YT}" stroke="#cfd8ee" stroke-width="5"/>`;
    for (let k = 0; k * TP <= t; k++) { s += `<circle cx="${X0 + PXs * k}" cy="${YT}" r="14" fill="${Y}"/>`; if (k) u += lab(X0 + PXs * (k - 0.5), YT + 60, '২ সে', 'name', 1); }
    s += `<circle cx="${F(X0 + PXs * Math.min(t / TP, 4.4))}" cy="${YT}" r="8" fill="#fff"/>`;
    u += lab(X0 + PXs * 2.2, YT - 70, 'প্রতি পাকে সমান সময়', 'move', S.P(0, 0.4, 0.55));
    if (S.on(0)) u += termCard('পর্যাবৃত্ত গতি', 'Periodic motion', S.P(0, 0.78, 0.9), 1, 960, 760, 0.8);
  } else {
    const L = 1.0, T = 2 * Math.PI * Math.sqrt(L / 9.8), th = 14 * Math.PI / 180 * Math.cos(2 * Math.PI * (t - S.A(1)) / T);
    const px = 960, py = 200, Lp = 430, bx = px + Lp * Math.sin(th), by = py + Lp * Math.cos(th);
    s += `<rect x="${px - 120}" y="${py - 16}" width="240" height="16" fill="#cfd8ee"/>`;
    s += `<line x1="${px}" y1="${py}" x2="${px}" y2="${py + Lp + 80}" stroke="${Y}" stroke-width="4" stroke-dasharray="10 10"/>`;
    s += `<line x1="${px}" y1="${py}" x2="${F(bx)}" y2="${F(by)}" stroke="#e6e6e6" stroke-width="4"/><circle cx="${F(bx)}" cy="${F(by)}" r="34" fill="#c9a24a" stroke="#fff" stroke-width="4"/>`;
    s += arrow2(px - 40, py + Lp + 40, px - 200, py + Lp + 20, 1) + arrow2(px + 40, py + Lp + 40, px + 200, py + Lp + 20, 1);
    u += lab(px + 240, py + Lp - 60, 'স্থির অবস্থান', 'rest', S.fin(1));
    if (S.on(1)) u += termCard('দোলন গতি', 'Oscillatory motion', S.P(1, 0.7, 0.82), 1, 1460, 420, 0.8);
  }
  return { svg: s, ui: u };
});
