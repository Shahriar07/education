/* ৩খ: drawn */
part('s03_p02', { scene: 3, label: '৩খ', title: "চিত্র ১১.৬: কাঁচি",
  screen: "3D কাঁচি খাড়া, কাপড়ের সাথে ৯০ ডিগ্রি; ফলা খোলে ৩০ ডিগ্রি, আংটা দুটোও সমানুপাতে দূরে; তিনবার কাটে; তারপর কাপড় ফালক্রামের কাছে, তীর ছোট।" }, [
  { c: "কাঁচির দুই হাতলে আঙুলের চাপ পড়ে, মানে বল। দুই ফলা যে স্ক্রুতে জোড়া, সেটা ফালক্রাম। আর ফলার মাঝের কাপড় বাধা দেয়, সেটা ভার।" },
  { c: "হাতল কাছে আসে, ফলা বন্ধ হয়, কাপড় কাটে। কাপড়টা ফালক্রামের যত কাছে রাখবে, তত সহজে কাটবে।" },
  { c: "কারণ ভারবাহু ছোট হয়ে যায়, তাই যান্ত্রিক সুবিধা বাড়ে। এজন্য মোটা কাপড় কাঁচির গোড়ার দিক দিয়ে কাটা হয়।" }
], function (t, S) {
  /* কাঁচি (fig 11.6), standing upright at 90 degrees to the cloth. Blades 9 cm, rings 8 cm from the pivot (the fulcrum).
     Open: a = 30 degrees: tips 4.7 cm apart, rings 4.1 cm apart. The cloth's edge starts in the middle of the blades (4.5 cm from
     the pivot, inside the open jaws). Three cuts: the blades close until they cross a little (a = -2 degrees, they slide past each
     other), the meeting point runs from the pivot to the tips and cuts the cloth it passes; then they open and move 4.5 cm on. Then the scissors are pushed deep:
     the cloth (the load) only 2 cm from the pivot. Finger force F = R d / 0.08 (R drawn 160 px, F at most 160 px) */
  const A0 = SCI_UP.A0, X0 = SCI_UP.EDGE, T = 1.7, x00 = X0 - 0.045, ST = 0.045, AMIN = -0.035;
  let a = A0, xp = x00, cutEnd = X0;
  if (t >= S.A(1)) { const q = Math.max(0, t - S.A(1) - 0.4), n = Math.min(2, Math.floor(q / T)), ph = q >= 3 * T ? 1 : (q % T) / T;
    for (let i = 0; i < n; i++) cutEnd = Math.max(cutEnd, x00 + ST * i + 0.09);
    xp = x00 + ST * n + (q >= 3 * T ? 0 : ST * ease(cl((ph - 0.62) / 0.38)) * (n < 2 ? 1 : 0));
    const close = ph < 0.45 ? ease(ph / 0.45) : ph < 0.62 ? 1 : 1 - ease((ph - 0.62) / 0.38); a = A0 - (A0 - AMIN) * close;
    if (q < 3 * T) cutEnd = Math.max(cutEnd, x00 + ST * n + 0.09 * (ph < 0.62 ? close : 1));
    else { cutEnd = Math.max(cutEnd, x00 + ST * 2 + 0.09); a = A0; xp = x00 + ST * 2; } }
  if (t >= S.A(2)) { const k = ease(S.P(2, 0.05, 0.35)); xp = xp + (cutEnd - 0.02 - xp) * k; a = A0 - (A0 - 0.3) * k; }
  const P = W3.frame({ cam: { pos: [TL.X + 0.27, TL.TY + 0.2, SCI_UP.Z + 0.5], look: [TL.X + 0.27, TL.TY - 0.01, SCI_UP.Z], fov: 32 }, sci: { a, cut: 0 }, sciUp: { a, xp }, sun: [-14, 34, 26] });
  let s = '', u = '';
  if (cutEnd > X0 + 0.002) s += path3(P, [[X0, TL.TY + 0.0025, SCI_UP.Z], [cutEnd, TL.TY + 0.0025, SCI_UP.Z]], '#14110e', 6, '');
  const d = Math.max(0.005, cutEnd - xp), R = 160, Fh = Math.min(160, R * d / TL.SC.H), [px, py] = P(xp, SCI_UP.Y, SCI_UP.Z);
  const r1 = P(...sciPt(xp, a, -0.068, -0.01)), r2 = P(...sciPt(xp, 0, -0.068, 0.01)), dir = [r2[0] - r1[0], r2[1] - r1[1]], nn = Math.hypot(...dir), ux = dir[0] / nn, uy = dir[1] / nn;
  const oA = S.P(0, 0.05, 0.2), oB = S.P(0, 0.3, 0.45), oC = S.P(0, 0.55, 0.7);
  s += ringDot(px, py, oA); u += lab(px + 10, py + 110, 'ফালক্রাম', 'name', oA);
  s += arrow2(r1[0] - ux * (Fh + 34), r1[1] - uy * (Fh + 34), r1[0] - ux * 34, r1[1] - uy * 34, oB) + arrow2(r2[0] + ux * (Fh + 34), r2[1] + uy * (Fh + 34), r2[0] + ux * 34, r2[1] + uy * 34, oB);
  u += lab(r1[0] - 200, r1[1] + 40, 'আঙুলের চাপ: বল', 'name', oB);
  const [lx, ly] = P(...sciPt(xp, a, d / Math.cos(a), 0.003)); s += arrow2(lx + 4, ly - 150, lx + 4, ly - 14, oC, '#ff6b5e'); u += lab(lx + 40, ly - 200, 'কাপড়: ভার', 'name', oC);
  if (t >= S.A(2)) { const ob = S.P(2, 0.35, 0.55), [cx2, cy2] = P(cutEnd, SCI_UP.Y, SCI_UP.Z); s += `<line x1="${F(px)}" y1="${F(py + 70)}" x2="${F(cx2)}" y2="${F(cy2 + 70)}" stroke="#7fd1ff" stroke-width="10" stroke-linecap="round" opacity="${cl(ob * 2).toFixed(2)}"/>`; u += lab((px + cx2) / 2 + 60, py + 130, 'ভারবাহু ছোট: কম বল', 'move', ob); }
  u += lab(1640, 170, 'কাঁচি', 'name');
  return { gl: true, svg: s, ui: u };
});
