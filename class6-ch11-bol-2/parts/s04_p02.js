/* ৪খ: drawn */
part('s04_p02', { scene: 4, label: '৪খ', title: "হেলানো তল",
  screen: "ঢালু তক্তা বেয়ে ড্রাম গড়িয়ে ওঠে; সোজা ও ঢালুর তীর তুলনা; শব্দ-কার্ড।" }, [
  { c: "ঢালু তক্তা বেয়ে গড়িয়ে তুললে পথ বেশি, কিন্তু বল লাগে অনেক কম। এই ঢালু তলকে বলে হেলানো তল।" },
  { c: "হেলানো তলের যান্ত্রিক সুবিধা হলো তলের দৈর্ঘ্য ভাগ উচ্চতা।" },
  { c: "তক্তা ৩ মিটার লম্বা, ট্রাক ১ মিটার উঁচু হলে সুবিধা ৩। মানে বল লাগে তিন ভাগের এক ভাগ।" }
], function (t, S) {
  /* the drum rolls up the 3 m plank to the 1 m high bed: push along the ramp = W / 3 = 653 N (98 px) against W = 1960 N
     (294 px, dashed) for a straight lift. Then length and height are measured: 3 / 1 = 3 */
  const dash = (pts, c = '#fff', o = 1) => o > 0 ? `<polyline points="${pts.map(p => F(p[0]) + ',' + F(p[1])).join(' ')}" fill="none" stroke="${c}" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round" opacity="${cl(o).toFixed(2)}"/>` : '';
  const bar = (a, b, c, o) => o > 0 ? `<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="${cl(o * 2).toFixed(2)}"/>` : '';
  const g = t < S.A(1) ? -0.6 + 4.0 * ease(S.P(0, 0.1, 0.85)) : 3.4, P = W3.frame({ cam: C11.ramp(), drum: g, sun: [-14, 34, 26] });
  let s = '', u = '';
  const c = drumPos(g), onR = g > 0 && g < TR.L, dir = onR ? [TR.COS, TR.SIN] : [1, 0], back = [c[0] - dir[0] * TR.R, c[1] - dir[1] * TR.R, 0.5];
  const [px, py] = P(...back), [qx, qy] = P(back[0] + dir[0] * 0.2, back[1] + dir[1] * 0.2, 0.5), n = Math.hypot(qx - px, qy - py), ux = (qx - px) / n, uy = (qy - py) / n;
  if (t < S.A(1)) { const Fp = onR ? TR.W * TR.SIN * 0.15 : 40, o = S.P(0, 0.1, 0.2); s += arrow2(px - ux * (Fp + 10), py - uy * (Fp + 10), px - ux * 10, py - uy * 10, o, Y); u += lab(px - ux * Fp - 120, py - uy * Fp + 60, 'ঠেলা: ভারের ৩ ভাগের ১', 'name', o * (onR ? 1 : 0));
    const [cx, cy] = P(c[0], c[1], 0.5); s += dashArrow(cx + 80, cy, cx + 80, cy - TR.W * 0.15, o * (onR ? 1 : 0), '#ff6b5e'); u += lab(cx + 240, cy - 200, 'সোজা তুললে', 'name', o * (onR ? 1 : 0));
    u += termCard('হেলানো তল', 'Inclined plane', S.P(0, 0.55, 0.75), 1 - S.P(0, 0.95, 1), 520, 330, 0.75); }
  else { const o1 = S.P(1, 0.05, 0.3), f0 = P(TR.FOOT + 0.05 * TR.SIN, -0.05 * TR.COS - 0.02, 0.5), f1 = P(TR.X + 0.05 * TR.SIN, TR.H - 0.05 * TR.COS - 0.02, 0.5), h0 = P(TR.X - 0.15, 0, 0.5), h1 = P(TR.X - 0.15, TR.H, 0.5);
    s += bar([f0[0], f0[1] + 40], [f1[0], f1[1] + 40], Y, o1) + bar(h0, h1, '#7fd1ff', o1); u += lab((f0[0] + f1[0]) / 2 - 60, (f0[1] + f1[1]) / 2 + 90, 'দৈর্ঘ্য ৩ মিটার', 'move', o1) + lab(h0[0] + 120, (h0[1] + h1[1]) / 2, 'উচ্চতা ১ মিটার', 'move', o1);
    u += card(t < S.A(2) ? 'যান্ত্রিক সুবিধা &nbsp;=&nbsp; দৈর্ঘ্য ÷ উচ্চতা' : '৩ ÷ ১ = ৩ &nbsp;→&nbsp; বল লাগে ভারের ৩ ভাগের ১ ভাগ', t < S.A(2) ? S.P(1, 0.1, 0.3) : S.P(2, 0.2, 0.4), 1, 150, 1300, 58); }
  return { gl: true, svg: s, ui: u };
});
