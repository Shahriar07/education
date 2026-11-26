/* ৩খ: drawn */
part('s03_p02', { scene: 3, label: '৩খ', title: "চিত্র ১১.৬: কাঁচি",
  screen: "3D কাঁচি, কাপড় ফালক্রামের দূরে ও কাছে; ভারবাহু মাপা।" }, [
  { c: "কাঁচির দুই হাতলে আঙুলের চাপ পড়ে, মানে বল। দুই ফলা যে স্ক্রুতে জোড়া, সেটা ফালক্রাম। আর ফলার মাঝের কাপড় বাধা দেয়, সেটা ভার।" },
  { c: "হাতল কাছে আসে, ফলা বন্ধ হয়, কাপড় কাটে। কাপড়টা ফালক্রামের যত কাছে রাখবে, তত সহজে কাটবে।" },
  { c: "কারণ ভারবাহু ছোট হয়ে যায়, তাই যান্ত্রিক সুবিধা বাড়ে। এজন্য মোটা কাপড় কাঁচির গোড়ার দিক দিয়ে কাটা হয়।" }
], function (t, S) {
  /* কাঁচি: blades 0.09 m, handles 0.08 m from the pivot. The cloth's edge is the load; first near the tips (8 cm from the
     pivot), then deep near the pivot (2 cm). Hand force F = R d / 0.08, drawn with R = 160 px */
  const deep = t < S.A(2) ? 0 : ease(S.P(2, 0.0, 0.3)), cut = -0.06 + 0.06 * deep, cyc = t < S.A(1) ? 0 : (t - S.A(1)) * 1.4, a = t < S.A(1) || t >= S.A(2) ? 0.3 : 0.18 + 0.12 * Math.cos(cyc * Math.PI);
  const P = W3.frame({ cam: { pos: [TL.X + 0.22, TL.TY + 0.42, TL.Z + 0.42], look: [TL.X + 0.24, TL.TY, TL.Z + 0.03], fov: 32 }, sci: { a, cut }, sun: [-14, 34, 26] });
  let s = '', u = '';
  const pv = [SCIP[0] + cut, SCIP[1] + 0.012, SCIP[2]], d = TL.X + 0.27 - pv[0], [px, py] = P(...pv), [lx, ly] = P(TL.X + 0.27, pv[1], pv[2]);
  const hp = side => P(pv[0] - 0.075, pv[1], pv[2] + side * 0.075 * Math.sin(a / 2)), [h1x, h1y] = hp(1), [h2x, h2y] = hp(-1);
  const o = S.P(0, 0.15, 0.35), Fl = 160 * d / 0.08;
  s += ringDot(px, py, o); u += lab(px, py - 80, 'ফালক্রাম', 'name', o);
  const dir = (x1, y1, x2, y2) => { const n = Math.hypot(x2 - x1, y2 - y1); return [(x2 - x1) / n, (y2 - y1) / n]; }, [ux, uy] = dir(h1x, h1y, h2x, h2y);
  s += arrow2(h1x - ux * (Fl + 20), h1y - uy * (Fl + 20), h1x - ux * 20, h1y - uy * 20, o) + arrow2(h2x + ux * (Fl + 20), h2y + uy * (Fl + 20), h2x + ux * 20, h2y + uy * 20, o);
  u += lab(h1x - 150, h1y - 80, 'আঙুলের চাপ', 'move', o);
  s += arrow2(lx, ly + 150, lx, ly + 12, o, '#ff6b5e'); u += lab(lx + 60, ly + 200, 'কাপড়: ভার', 'name', o);
  if (t >= S.A(2)) { const ob = S.P(2, 0.3, 0.5); s += `<line x1="${F(px)}" y1="${F(py + 60)}" x2="${F(lx)}" y2="${F(ly + 60)}" stroke="#7fd1ff" stroke-width="10" stroke-linecap="round" opacity="${cl(ob * 2).toFixed(2)}"/>`; u += lab((px + lx) / 2, py - 150, 'ভারবাহু ছোট', 'move', ob); }
  u += lab(1640, 170, 'কাঁচি', 'name');
  return { gl: true, svg: s, ui: u };
});
