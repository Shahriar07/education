/* ৬খ: drawn */
part('s06_p02', { scene: 6, label: '৬খ', title: "চোয়াল",
  screen: "3D খুলি, চোয়াল খোলে-বন্ধ হয়; ফালক্রাম, বল, ভার।" }, [
  { c: "চোয়ালের জোড়াটা ফালক্রাম। চিবানোর পেশি বল দেয়, আর দাঁতের মাঝের খাবার হলো ভার।" },
  { c: "মাড়ির দাঁত ফালক্রামের কাছে, তাই সেখানে চাপ বেশি পড়ে। এজন্যই শক্ত খাবার মাড়ির দাঁত দিয়ে চিবাই।" }
], function (t, S) {
  /* jaw: fulcrum = the jaw joint J; the chewing muscle pulls up near the jaw's angle (5 cm from J in the drawing's scale);
     food between the back teeth (13 cm) or the front teeth (22.5 cm). Bite = muscle x 5 / distance: muscle drawn 260 px,
     back teeth 100 px, front teeth 58 px */
  let s = bg(NAVY), u = '';
  const ox = 520, oy = 150, k = 1.6, Sx = p => [ox + k * p[0], oy + k * p[1]];
  const a = t < S.A(1) ? 0.13 * (0.5 - 0.5 * Math.cos(t * 2 * Math.PI / 1.6)) * (1 - S.P(0, 0.85, 1)) : 0;
  s += `<g transform="translate(${ox},${oy}) scale(${k})">${skull2d(a)}</g>`;
  const [jx, jy] = Sx(SK.J), [mx, my] = Sx(jawPt(SK.MUS, a)), [fx, fy] = Sx(jawPt([SK.MOL[0] + 8, SK.MOL[1] + 18], a)), [ix, iy] = Sx(jawPt([SK.INC[0], SK.INC[1] + 18], a));
  const o1 = S.P(0, 0.05, 0.2), o2 = S.P(0, 0.25, 0.4), o3 = S.P(0, 0.5, 0.65);
  s += ringDot(jx, jy, o1); u += lab(jx - 150, jy + 20, 'জোড়া: ফালক্রাম', 'name', o1);
  s += arrow2(mx, my + 10, mx, my - 250, o2); u += lab(mx + 170, my - 200, 'পেশি: বল', 'name', o2);
  s += `<ellipse cx="${F(fx)}" cy="${F(fy - 30)}" rx="22" ry="14" fill="#c9893d" stroke="#5a3a18" stroke-width="3" opacity="${cl(o3 * 2).toFixed(2)}"/>` + arrow2(fx, fy, fx, fy + 100, o3, '#ff6b5e'); if (t < S.A(1)) u += lab(fx + 40, fy + 150, 'খাবার: ভার', 'name', o3);
  if (t >= S.A(1)) { const o = S.P(1, 0.3, 0.45); s += arrow2(ix, iy, ix, iy + 58, o, '#ff6b5e'); u += lab(fx - 150, fy + 150, 'মাড়ির দাঁত: চাপ বেশি', 'move', S.P(1, 0.1, 0.25)) + lab(ix + 270, iy + 40, 'সামনের দাঁত: চাপ কম', 'move', o); }
  u += lab(1640, 170, 'চোয়াল', 'name');
  return { svg: s, ui: u };
});
