/* ৬ঘ: drawn */
part('s06_p04', { scene: 6, label: '৬ঘ', last: true, title: "হাত ও বইয়ের কাজ",
  screen: "হাতের হাড়, কনুই ফালক্রাম; পাথর তিন জায়গায়, পেশির তীর বদলায়।" }, [
  { c: "হাতে কনুই হলো ফালক্রাম। তালুর জিনিস ভার, আর কনুইয়ের কাছের পেশি বল দেয়।" },
  { c: "বইয়ের কাজ। এক কেজির মতো একটা পাথর আঙুলের ডগা থেকে কনুই পর্যন্ত নানা জায়গায় রাখো।" },
  { c: "কনুইয়ের যত কাছে রাখবে, তত হালকা লাগবে। কারণ ভারবাহু ছোট হয়ে যায়।" }
], function (t, S) {
  /* arm: fulcrum = the elbow; the biceps pulls 4 cm from it; a 1 kg stone at d cm. Pull = weight x d / 4:
     d = 35 cm: 8.8 x, 20 cm: 5 x, 10 cm: 2.5 x. Stone's weight drawn 40 px, the pull 10 d px */
  let s = bg(NAVY), u = '';
  const ox = 190, oy = 60, Sx = p => [ox + p[0], oy + p[1]];
  const d = t < S.A(1) ? 35 : t < S.A(2) ? 40 - 20 * ease(S.P(1, 0.4, 0.95)) : 20 - 10 * ease(S.P(2, 0.05, 0.4));
  s += `<g transform="translate(${ox},${oy})">${arm2d()}${stone2d(d)}</g>`;
  const [ex, ey] = Sx(AR.E), [ix, iy] = Sx([AR.E[0] + AR.INS * AR.PX, AR.E[1] - 14]), [sx, sy] = Sx([AR.E[0] + d * AR.PX, AR.E[1] - 20]);
  const o1 = S.P(0, 0.05, 0.2), o2 = S.P(0, 0.3, 0.45), o3 = S.P(0, 0.55, 0.7);
  s += ringDot(ex - 6, ey, o1); u += lab(ex - 230, ey + 10, 'কনুই: ফালক্রাম', 'name', o1);
  s += arrow2(ix, iy, ix, iy - 10 * d, o2); u += lab(ix - 230, iy - 10 * d - 10, 'পেশির টান: বল', 'name', o2);
  s += arrow2(sx + 60, sy - 34, sx + 60, sy + 12, o3, '#ff6b5e'); u += lab(sx + 190, sy - 110, 'পাথর: ভার', 'name', o3);
  s += `<line x1="${F(ex)}" y1="${F(ey + 80)}" x2="${F(sx)}" y2="${F(ey + 80)}" stroke="#7fd1ff" stroke-width="10" stroke-linecap="round" opacity="${cl(o3 * 2).toFixed(2)}"/>`;
  u += lab((ex + sx) / 2, ey + 140, 'ভারবাহু ' + BNF(d, 0) + ' সেমি', 'move', o3);
  if (t >= S.A(1)) u += lab(1480, 260, big('পেশির টান = ভারের ' + BNF(d / 4, 1) + ' গুণ'), 'move', S.P(1, 0.05, 0.2));
  if (t >= S.A(2)) u += lab(1480, 360, big('কনুইয়ের কাছে: হালকা'), 'move', S.P(2, 0.45, 0.6));
  return { svg: s, ui: u };
});
