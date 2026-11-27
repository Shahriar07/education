/* ৩চ: drawn */
part('s03_p06', { scene: 3, label: '৩চ', last: true, title: "চিত্র ১১.১০: সাঁড়াশি",
  screen: "3D সাঁড়াশি; হাতলে বল, মুখে ভার।" }, [
  { c: "সাঁড়াশিও প্রথম শ্রেণির লিভার। হাতলে বল, মুখে ভার, ফালক্রাম মাঝখানে।" },
  { c: "এর ভারবাহু বদলায় না। তাই হাতলের দিকে আরো দূরে ধরলে, মানে বলবাহু বাড়ালে, সুবিধা বাড়ে।" }
], function (t, S) {
  /* সাঁড়াশি: pivot = fulcrum, jaws 0.032 m from it (fixed), the hand on the handles at h from it. The jaws' grip on the
     nail head is drawn 160 px, the hand needs F = 160 x 0.032 / h: h = 0.08 m (64 px), then 0.16 m (32 px) */
  const a = 0.3, P = W3.frame({ cam: C11.bench(TL.X - 0.47, 24), pin: a, sun: [-14, 34, 26] });
  let s = '', u = '';
  const pt = (r, side) => { const ang = side * a / 2; return P(PINP[0] - r * Math.cos(-ang), PINP[1] + r * Math.sin(-ang), PINP[2]); };
  const h = t < S.A(1) + (S.A(2) - S.A(1)) * 0.5 ? 0.08 : 0.08 + 0.08 * ease(S.P(1, 0.55, 0.95)), Fh = 160 * TL.PIN.J / h;
  const [hx1, hy1] = pt(-h, 1), [hx2, hy2] = pt(-h, -1), [jx1, jy1] = pt(TL.PIN.J, 1), [jx2, jy2] = pt(TL.PIN.J, -1), [cx, cy] = pt(0, 1);
  const oA = S.P(0, 0.1, 0.3), oB = S.P(0, 0.35, 0.55), oC = S.P(0, 0.6, 0.8);
  s += arrow2(hx1, hy1 - 22 - Fh, hx1, hy1 - 22, oA) + arrow2(hx2, hy2 + 22 + Fh, hx2, hy2 + 22, oA); u += lab(hx1 + 40, hy1 - 70 - Fh, 'হাতলে বল', 'name', oA);
  s += arrow2(jx1 - 30, jy1 - 190, jx1 - 30, jy1 - 30, oC, '#ff6b5e') + arrow2(jx2 - 30, jy2 + 190, jx2 - 30, jy2 + 30, oC, '#ff6b5e'); u += lab(jx1 - 250, jy1 - 120, 'মুখে ভার', 'name', oC);
  s += ringDot(cx, cy, oB); u += lab(cx + 20, cy - 120, 'ফালক্রাম', 'name', oB);
  if (t >= S.A(1)) { const ob = S.P(1, 0.1, 0.3); s += `<g opacity="${cl(ob * 2).toFixed(2)}" stroke-linecap="round" stroke-width="10"><line x1="${F(cx)}" y1="${F(cy + 60)}" x2="${F(hx2)}" y2="${F(hy2 + 60)}" stroke="${Y}"/><line x1="${F(cx)}" y1="${F(cy + 60)}" x2="${F(jx2)}" y2="${F(jy2 + 60)}" stroke="#7fd1ff"/></g>`;
    u += lab(hx2 + 170, cy + 120, 'বলবাহু বাড়ে', 'move', S.P(1, 0.55, 0.7)) + lab(jx2 - 230, cy + 170, 'ভারবাহু বদলায় না', 'move', ob); }
  u += lab(1640, 170, 'সাঁড়াশি', 'name');
  return { gl: true, svg: s, ui: u };
});
