/* ৩ঙ: drawn */
part('s03_p05', { scene: 3, label: '৩ঙ', title: "চিত্র ১১.৯: হাতুড়ি",
  screen: "3D কাঠে পেরেক, হাতুড়ির নখ; বল, ফালক্রাম, ভার চিহ্নিত।" }, [
  { c: "হাতুড়ির এক মাথা দিয়ে পেরেক ঢোকানো হয়, অন্য মাথা দিয়ে পেরেক তোলা হয়।" },
  { c: "হাতলে বল দাও। পেরেকের পাশে যেখানে ঠেস দেয়, সেটা ফালক্রাম। পেরেক যে বাধা দেয়, সেটা ভার।" },
  { c: "ফালক্রাম মাঝখানে, তাই হাতুড়ি প্রথম শ্রেণির লিভার। হাতল লম্বা, তাই বল বাড়ে অনেক গুণ।" }
], function (t, S) {
  /* হাতুড়ি pulling a nail (fig 11.9): fulcrum = where the claw's curved back rests on the board; the claw holds the nail
     0.05 m from it; the handle is pushed sideways 0.30 m above it. Push drawn 60 px, the nail's pull 6 x 60 = 360 px.
     phi = turn of the hammer (clockwise: the handle top goes right, the claw lifts the nail by hmNailY) */
  const phi = t < S.A(2) ? 0 : 0.42 * ease(S.P(2, 0.25, 0.8));
  const P = W3.frame({ cam: { pos: [HM.X + 0.0, WS.TY + 0.13, 1.05], look: [HM.X + 0.0, WS.TY + 0.10, 0], fov: 34 }, ham: { phi }, sun: [-14, 34, 26] });
  let s = '', u = '';
  const o0 = [HM.X, WS.TY + 0.05, 0.03], [cx, cy] = P(...o0), hp = rotPt(o0, -phi, 0.036 - 0.014, 0.30), [hx, hy] = P(...hp);
  const tg = [Math.cos(-phi), Math.sin(-phi)], [tx, ty] = P(hp[0] + tg[0] * 0.05, hp[1] + tg[1] * 0.05, hp[2]), n = Math.hypot(tx - hx, ty - hy), ux = (tx - hx) / n, uy = (ty - hy) / n;
  const [nx, ny] = P(HM.X - HM.C, WS.TY + 0.05 + hmNailY(phi) + 0.004, 0.03);
  const oA = S.P(0, 0.4, 0.55), oB = S.P(1, 0.0, 0.15), oC = S.P(1, 0.3, 0.45), oD = S.P(1, 0.55, 0.7);
  const [kx, ky] = P(HM.X - 0.05, WS.TY + 0.05 + 0.04, 0.03), [fx, fy] = P(HM.X + 0.09, WS.TY + 0.05 + 0.07, 0.03);
  u += lab(kx - 110, ky - 70, 'নখ', 'name', oA) + lab(fx + 110, fy - 50, 'মাথা', 'name', oA) + lab(nx - 150, ny + 70, 'পেরেক', 'name', oA);
  s += arrow2(hx - ux * 68, hy - uy * 68, hx - ux * 8, hy - uy * 8, oB); u += lab(hx + 150, hy - 10, 'হাতলে বল', 'name', oB);
  s += ringDot(cx, cy, oC); u += lab(cx + 60, cy + 70, 'ফালক্রাম', 'name', oC);
  s += arrow2(nx - 30, ny, nx - 30, ny + 360, oD, '#ff6b5e'); u += lab(nx - 250, ny + 160, 'পেরেকের বাধা: ভার', 'name', oD);
  if (t >= S.A(2)) u += lab(480, 300, big('বলবাহু ৩০ সেমি ÷ ভারবাহু ৫ সেমি'), 'move', S.P(2, 0.5, 0.65)) + lab(480, 390, big('= ৬ গুণ বল'), 'move', S.P(2, 0.7, 0.85));
  u += lab(1640, 170, 'হাতুড়ি', 'name');
  return { gl: true, svg: s, ui: u };
});
