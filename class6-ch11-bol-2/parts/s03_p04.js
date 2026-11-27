/* ৩ঘ: drawn */
part('s03_p04', { scene: 3, label: '৩ঘ', title: "চিত্র ১১.৮: চিমটা",
  screen: "3D চিমটা, চাপের জায়গা বস্তুর কাছে ও দূরে।" }, [
  { c: "চিমটার দুই বাহু এক মাথায় জোড়া, সেটা ফালক্রাম। মাঝখানে আঙুলের চাপ, মানে বল। আর অন্য মাথায় ধরা বস্তু, সেটা ভার।" },
  { c: "বল মাঝখানে, তাই চিমটা তৃতীয় শ্রেণির লিভার।" },
  { c: "আঙুলের চাপ বস্তুর যত কাছে দেবে, ধরে রাখা তত সহজ হবে। রান্নাঘরে গরম রুটি উল্টাতে বা কয়লা ধরতে চিমটা লাগে।" }
], function (t, S) {
  /* চিমটা: joint = fulcrum, the potato at 0.275 m is the load, the fingers press between. To hold the potato with grip G
     the fingers press F = G 0.275 / r: r = 0.12 m (2.3 G), then r = 0.08 m (3.4 G) and r = 0.20 m (1.4 G); G drawn 45 px */
  const a = TL.TONG.AMIN, P = W3.frame({ cam: C11.bench(TL.X + 0.2, 22), tong: { a, lift: 0 }, sun: [-14, 34, 26] });
  let s = '', u = '';
  const pt = (r, top) => { const ang = top ? tongTop(a) : TL.TONG.PHIB; return P(TONGP[0] + r * Math.cos(ang), TONGP[1] + r * Math.sin(ang), TONGP[2] + 0.01); };
  const r = t < S.A(2) ? 0.12 : 0.08 + 0.12 * ease(S.P(2, 0.45, 0.85)), Fh = 45 * TL.TONG.RP / r, [qx, qy] = pt(r, true), [bx, by] = pt(r, false), [jx, jy] = pt(0, true), [lx, ly] = pt(TL.TONG.RP, true);
  const oA = S.P(0, 0.05, 0.2), oB = S.P(0, 0.3, 0.45), oC = S.P(0, 0.55, 0.7);
  s += ringDot(jx, jy, oA); u += lab(jx - 40, jy + 90, 'ফালক্রাম', 'name', oA);
  s += arrow2(qx, qy - 14 - Fh, qx, qy - 14, oB) + arrow2(bx, by + 14 + Fh, bx, by + 14, oB); u += lab(qx, qy - 60 - Fh, 'আঙুলের চাপ: বল', 'name', oB);
  u += lab(lx + 40, ly - 110, 'আলু: ভার', 'name', oC);
  if (t >= S.A(1) && t < S.A(2)) u += lab(960, 240, big('বল মাঝখানে: তৃতীয় শ্রেণি'), 'move', S.P(1, 0.15, 0.35));
  if (t >= S.A(2)) u += lab(960, 240, big(r < 0.15 ? 'বস্তু থেকে দূরে: বেশি বল' : 'বস্তুর কাছে: কম বল'), 'move', S.P(2, 0.1, 0.25));
  u += lab(1640, 170, 'চিমটা', 'name');
  return { gl: true, svg: s, ui: u };
});
