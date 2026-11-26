/* ৬ক:  */
part('s06_p01', { scene: 6, label: '৬ক', first: true, title: "কম বল, বেশি পথ",
  screen: "একই দৃশ্য; হাতের পথ ও পাথরের পথ পাশাপাশি মাপা।" }, [
  { c: "রহস্যটা এখানেই। হাত অনেকটা পথ নামল। পাথর উঠল অল্প একটু।" },
  { c: "মেপে দেখো, হাতের পথটা পাথরের পথের চেয়ে কত বড়!" },
  { c: "কম বল, কিন্তু বেশি পথ। দণ্ডটা আমাদের বলকে কৌশলে কাজে লাগাল।" }
], function (t, S) {
  const k = t < S.A(1) ? ease(S.P(0, 0.1, 0.7)) : 1, th = lvTilt(k), P = W3.frame({ cam: C11.lever(), lever: th, hands: [lvHand3(th)], sun: [-14, 34, 26] });
  let s = '', u = ''; const h0 = lvPt(LV.TH0, -LV.A), h1 = lvPt(th, -LV.A), s0 = lvStone(LV.TH0), s1 = lvStone(th);
  const bar = (p0, p1, dx, c, txt, o) => { const [x0, y0] = P(p0[0], p0[1], LV.Z), [, y1] = P(p0[0], p1[1], LV.Z); return { s: `<g opacity="${o.toFixed(2)}"><line x1="${F(x0 + dx)}" y1="${F(y0)}" x2="${F(x0 + dx)}" y2="${F(y1)}" stroke="${c}" stroke-width="12" stroke-linecap="round"/><line x1="${F(x0 + dx - 22)}" y1="${F(y0)}" x2="${F(x0 + dx + 22)}" y2="${F(y0)}" stroke="${c}" stroke-width="6"/><line x1="${F(x0 + dx - 22)}" y1="${F(y1)}" x2="${F(x0 + dx + 22)}" y2="${F(y1)}" stroke="${c}" stroke-width="6"/></g>`, u: lab(x0 + dx + (dx < 0 ? -110 : 110), (y0 + y1) / 2, txt, 'move', o) }; };
  const o = t >= S.A(1) ? S.P(1, 0.1, 0.3) : S.P(0, 0.5, 0.7), a = bar(h0, h1, -90, Y, big(BNF((h0[1] - h1[1]) * 100) + ' সেমি'), o), b = bar(s0, s1, 210, '#7fd1ff', big(BNF((s1[1] - s0[1]) * 100) + ' সেমি'), o);
  s += a.s + b.s; u += a.u + b.u;
  if (t >= S.A(2)) { u += card('কম বল &nbsp;→&nbsp; বেশি পথ', S.P(2, 0.15, 0.35), 1, 160, 900, 70); }
  return { gl: true, svg: s, ui: u };
});
