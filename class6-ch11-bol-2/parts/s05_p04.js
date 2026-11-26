/* ৫ঘ: drawn */
part('s05_p04', { scene: 5, label: '৫ঘ', title: "চিত্র ১১.১৪: চাকা-অক্ষদণ্ড",
  screen: "3D বড় চাকা, সরু দণ্ড; দড়ি দণ্ডে জড়ায়; ৬ : ১।" }, [
  { c: "চাকা-অক্ষদণ্ডে বড় একটা চাকা আর সরু একটা দণ্ড একসাথে ঘোরে। এটা লিভারেরই আরেক রূপ।" },
  { c: "চাকার দড়িতে বল দিলে, দণ্ডে জড়ানো দড়ির ভার ওঠে।" },
  { c: "চাকার ব্যাসার্ধ দণ্ডের ৬ গুণ হলে, ১ কেজির বলে ৬ কেজির ভার ওঠে।" }
], function (t, S) {
  /* wheel and axle: R = 30 cm, r = 5 cm. 1 kg on the wheel rope (50 px) holds 6 kg on the axle rope (300 px). With a little
     more pull the weight goes down 30 cm and the bucket up 5 cm */
  const dash = (pts, c = '#fff', o = 1) => o > 0 ? `<polyline points="${pts.map(p => F(p[0]) + ',' + F(p[1])).join(' ')}" fill="none" stroke="${c}" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round" opacity="${cl(o).toFixed(2)}"/>` : '';
  const bar = (a, b, c, o) => o > 0 ? `<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="${cl(o * 2).toFixed(2)}"/>` : '';
  const d = t < S.A(1) ? 0 : 0.3 * ease(S.P(1, 0.1, 0.9)), P = W3.frame({ cam: C11.wax(), wax: d, sun: [-14, 34, 26] });
  let s = '', u = '';
  const [cx, cy] = P(WA.X, WA.Y, 0.1), [rx, ry] = P(WA.X + WA.R, WA.Y, 0.1), [ax, ay] = P(WA.X - WA.r, WA.Y, -0.06), [kx, ky] = P(WA.X + WA.R, WA.Y - 0.45 - d, 0.1), [bx, by] = P(WA.X - WA.r, WA.Y - 0.55 + d / 6, -0.06);
  u += lab(rx + 170, ry - 120, 'চাকা', 'name', S.P(0, 0.15, 0.3)) + lab(ax - 230, ay + 50, 'অক্ষদণ্ড', 'name', S.P(0, 0.35, 0.5));
  if (t >= S.A(0)) u += termCard('চাকা-অক্ষদণ্ড', 'Wheel and axle', S.P(0, 0.55, 0.75), 1 - S.P(0, 0.95, 1), 960, 300, 0.7);
  if (t >= S.A(1)) { const o = S.P(1, 0, 0.15); s += arrow2(kx + 70, ky - 10, kx + 70, ky + 40, o) + arrow2(bx - 110, by - 10, bx - 110, by + 290, o, '#ff6b5e');
    u += lab(kx + 210, ky + 10, 'বল ১ কেজি', 'name', o) + lab(bx - 290, by + 60, 'ভার ৬ কেজি', 'name', o); }
  if (t >= S.A(2)) { const o = S.P(2, 0.05, 0.25); s += `<g opacity="${cl(o * 2).toFixed(2)}" stroke-linecap="round" stroke-width="9"><line x1="${F(cx)}" y1="${F(cy)}" x2="${F(rx)}" y2="${F(ry)}" stroke="${Y}"/><line x1="${F(cx)}" y1="${F(cy)}" x2="${F(ax)}" y2="${F(ay)}" stroke="#7fd1ff"/></g>`;
    u += lab((cx + rx) / 2 + 60, cy + 60, '৩০ সেমি', 'move', o) + lab((cx + ax) / 2 - 20, cy - 60, '৫ সেমি', 'move', o) + lab(380, 150, big('৩০ ÷ ৫ = ৬'), 'move', S.P(2, 0.4, 0.55)) + lab(380, 240, big('১ কেজির বলে ৬ কেজি ওঠে'), 'move', S.P(2, 0.6, 0.75)); }
  return { gl: true, svg: s, ui: u };
});
