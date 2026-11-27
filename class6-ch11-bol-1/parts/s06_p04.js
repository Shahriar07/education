/* ৬ঘ:  */
part('s06_p04', { scene: 6, label: '৬ঘ', title: "পাঁচ উপায়: চার, পাঁচ",
  screen: "3D। কাঁচি কাপড় কাটে: দুই ফলা দুই দিক থেকে চাপে। চিমটা: আঙুলের জায়গার ছোট পথ আর মাথার বড় পথ দাগ দিয়ে, দৈর্ঘ্য হিসাব করা।" }, [
  { c: "চার, অন্যভাবে করা কঠিন এমন কাজ করে দেয়। কাপড় হাতে টেনে সোজা করে ছেঁড়া যায়? খুব কঠিন।" },
  { c: "কাঁচির দুই ফলা দুই দিক থেকে চাপ দেয়, কাপড় সোজা কেটে যায়।" },
  { c: "পাঁচ, গতি ও দূরত্ব বাড়ায়। যেমন চিমটা।" },
  { c: "আঙুল চাপ দেয় মাঝখানে, নড়ে অল্প। একই সময়ে মাথা দুটো নড়ে অনেক বেশি।" }
], function (t, S) {
  let s = '', u = '', P; const head = n => badge(150, 230, n, 1), hd = w => lab(470, 230, big(w), 'move');
  if (t < S.A(2)) {
    /* কাঁচি upright at 90 degrees to the cloth (video 2's model): open 30 degrees with the cloth's edge in the middle of the blades;
       in sentence 2 three cuts: the blades close until they cross a little (the finger bows just touch), open, move 4.5 cm on */
    const A0 = SCI_UP.A0, X0 = SCI_UP.EDGE, T = 1.5, x00 = X0 - 0.045, ST = 0.045, AMIN = -0.035; let a = A0, xp = x00, cutEnd = X0;
    if (t >= S.A(1)) { const q = Math.max(0, t - S.A(1) - 0.3), n = Math.min(2, Math.floor(q / T)), ph = q >= 3 * T ? 1 : (q % T) / T;
      for (let i = 0; i < n; i++) cutEnd = Math.max(cutEnd, x00 + ST * i + 0.09);
      xp = x00 + ST * n + (q >= 3 * T ? 0 : ST * ease(cl((ph - 0.62) / 0.38)) * (n < 2 ? 1 : 0));
      const close = ph < 0.45 ? ease(ph / 0.45) : ph < 0.62 ? 1 : 1 - ease((ph - 0.62) / 0.38); a = A0 - (A0 - AMIN) * close;
      if (q < 3 * T) cutEnd = Math.max(cutEnd, x00 + ST * n + 0.09 * (ph < 0.62 ? close : 1)); else { cutEnd = Math.max(cutEnd, x00 + ST * 2 + 0.09); a = A0; xp = x00 + ST * 2; } }
    P = W3.frame({ cam: { pos: [TL.X + 0.27, TL.TY + 0.2, SCI_UP.Z + 0.5], look: [TL.X + 0.27, TL.TY - 0.01, SCI_UP.Z], fov: 32 }, sci: { a, cut: 0 }, sciUp: { a, xp }, sun: [-14, 34, 26] });
    if (cutEnd > X0 + 0.002) s += path3(P, [[X0, TL.TY + 0.0025, SCI_UP.Z], [cutEnd, TL.TY + 0.0025, SCI_UP.Z]], '#14110e', 6, '');
    if (t >= S.A(1)) { const d = Math.max(0.01, cutEnd - xp), [ux, uy] = P(...sciPt(xp, a, d / Math.cos(a), 0.004)), [lx, ly] = P(...sciPt(xp, 0, d, -0.004));
      s += arrow2(ux, uy - 150, ux, uy - 14, 1) + arrow2(lx, ly + 150, lx, ly + 14, 1); u += lab(ux + 190, uy - 100, 'দুই দিক থেকে চাপ', 'move'); }
    else u += lab(960, 400, big('টেনে ছেঁড়া কঠিন'), 'name', S.P(0, 0.5, 0.65)); u += lab(1640, 170, 'কাঁচি', 'name'); s += head(4); u += hd('কঠিন কাজ সহজ'); }
  else { /* the top strip closes onto the potato in 1.6 s, then the tongs lift it 4 cm */
    const sq = t < S.A(3) ? 0 : ease(cl((t - S.A(3) - 0.3) / 1.6)), a0 = 0.36, a = a0 - (a0 - TL.TONG.AMIN) * sq, lift = t < S.A(3) ? 0 : 0.04 * ease(cl((t - S.A(3) - 2.3) / 1.2)); P = W3.frame({ cam: C11.bench(TL.X + 0.2, 22), tong: { a, lift }, sun: [-14, 34, 26] });
    const pt = (r, side) => { const ang = tongTop(a); return P(TONGP[0] + r * Math.cos(ang), TONGP[1] + lift * 0 + r * Math.sin(ang), TONGP[2] + 0.01); };
    const [fx, fy] = pt(TL.TONG.F, 1), [ex, ey] = pt(TL.TONG.L, 1), [fx0, fy0] = (() => { const ang = tongTop(a0); return P(TONGP[0] + TL.TONG.F * Math.cos(ang), TONGP[1] + TL.TONG.F * Math.sin(ang), TONGP[2] + 0.01); })(), [ex0, ey0] = (() => { const ang = tongTop(a0); return P(TONGP[0] + TL.TONG.L * Math.cos(ang), TONGP[1] + TL.TONG.L * Math.sin(ang), TONGP[2] + 0.01); })();
    { const [qx, qy] = pt(TL.TONG.F, 1), bang = TL.TONG.PHIB, [bx2, by2] = P(TONGP[0] + TL.TONG.F * Math.cos(bang), TONGP[1] + lift + TL.TONG.F * Math.sin(bang), TONGP[2] + 0.01), o = S.P(2, 0.1, 0.3); s += arrow2(qx, qy - 130, qx, qy - 14, o) + arrow2(bx2, by2 + 130, bx2, by2 + 14, o); u += lab(qx + 150, qy - 100, 'আঙুলের চাপ', 'move', o * (1 - S.P(3, 0.2, 0.3))); }
    if (t >= S.A(3)) { s += `<line x1="${F(fx0 + 60)}" y1="${F(fy0)}" x2="${F(fx + 60)}" y2="${F(fy)}" stroke="${Y}" stroke-width="12" stroke-linecap="round"/><line x1="${F(ex0 + 50)}" y1="${F(ey0)}" x2="${F(ex + 50)}" y2="${F(ey)}" stroke="#7fd1ff" stroke-width="12" stroke-linecap="round"/>`;
      u += lab(fx + 190, fy - 30, 'মাঝখানে: অল্প', 'move', S.P(3, 0.3, 0.45)) + lab(ex + 190, ey - 30, 'মাথা: ২.৫ গুণ', 'move', S.P(3, 0.55, 0.7)); }
    u += lab(1640, 170, 'চিমটা', 'name'); s += head(5); u += hd('গতি ও দূরত্ব বাড়ায়'); }
  return { gl: true, svg: s, ui: u };
});
