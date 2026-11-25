/* ৫গ: braking: 45 m/s, then -5 m/s every second for 5 s, back to 20 m/s; the same gaps in the opposite order */
part('s05_p03', { scene: 5, label: '৫গ', last: true, title: "মন্দন: বেগ কমছে",
  screen: "3D একই রাস্তা। গাড়ির পেছনের লাল বাতি জ্বলে, বেগ ৪৫ থেকে প্রতি সেকেন্ডে ৫ করে কমে ২০; দাগের ফাঁক কমে। শব্দ-কার্ড: মন্দন (Deceleration)।" }, [
  { c: "আর চালক যদি ব্রেক চাপেন? বেগ প্রতি সেকেন্ডে ৫ মিটার প্রতি সেকেন্ড করে কমতে থাকে।" },
  { c: "প্রতি সেকেন্ডে বেগ যতটা কমে, তাকে বলে মন্দন।" },
  { c: "মন্দন মানে ঋণাত্মক ত্বরণ।" },
  { d: 1.2 }
], function (t, S) {
  const tA = 2.2, a = t - tA, xA = Z3.HWY + 260, dec = q => 45 * q - 2.5 * q * q, x = a < 0 ? xA + 45 * a : a < 5 ? xA + dec(a) : xA + dec(5) + 20 * (a - 5), v = a < 0 ? 45 : Math.max(20, 45 - 5 * a);
  let s = '', u = '', P;
  if (t < S.A(1)) {
    P = W3.frame({ cam: C3.hwy(x), v3: { cars: [{ x, z: -2 }] } });
    for (let k = 0; k <= 5; k++) if (a >= k) s += dot3(P, [xA + dec(k), 0.03, -2], Y, 15);
    const [cx, cy] = P(x + 2.4, 0.8, -2), [bx, by] = P(x - 2.25, 0.78, -1.4); s += arrow2(cx + 20, cy, cx + 20 + v * 9, cy, 1, BLUE);
    if (a > 0 && a < 5) s += `<circle cx="${F(bx)}" cy="${F(by)}" r="44" fill="#ff2a2a" opacity=".35"/><circle cx="${F(bx)}" cy="${F(by)}" r="18" fill="#ff5a5a"/>`;
    u += readout(60, 160, 'বেগ', BNF(Math.ceil(v - 1e-6)) + ' মি./সে.', 1) + lab(1560, 200, 'ব্রেক!', 'move', pr(t, tA, tA + 0.3));
  } else { const M = accMarks(t, 1, true, S); s = M.s; u = M.u; }
  if (t >= S.A(1)) u += termCard('মন্দন', 'Deceleration', S.P(1, 0.5, 0.7), 1, 960, 260, 0.75);
  if (t >= S.A(2)) u += lab(960, 730, '<span style="font-size:54px">ঋণাত্মক ত্বরণ</span>', 'name', S.P(2, 0.2, 0.5));
  return { gl: true, svg: s, ui: u };
});
