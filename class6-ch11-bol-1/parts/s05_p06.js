/* ৫চ: fig 11.3: rod, small stone, heavy stone; from the side, as in the book */
part('s05_p06', { scene: 5, label: '৫চ', last: true, title: "চিত্র ১১.৩: দণ্ড ও ভারী পাথর",
  screen: "3D উঠান, পাশ থেকে: দণ্ড, ঠেস দেওয়া পাথর, ভারী পাথর; হাত নিচে চাপ দেয়, পাথর ওঠে; তীরের দৈর্ঘ্য হিসাব করা।" }, [
  { c: "এবার চিত্র ১১.৩। ছোট পাথরে ঠেস দেওয়া একটা শক্ত দণ্ড। এক মাথায় ভারী পাথর।" },
  { c: "অন্য মাথায় হাত নিচের দিকে বল দিচ্ছে।" },
  { c: "দেখো, হাত নামছে নিচে, আর ভারী পাথর উঠছে উপরে!" },
  { c: "হাতের তীরটা ছোট, পাথরের ভারের তীরটা বড়। কম বলেই কাজ হয়ে গেল।" }
], function (t, S) {
  /* the hand goes down smoothly during sentence 2; the tilt follows from the hand's height */
  const k = ease(S.P(2, 0.1, 0.95)), yA = th => lvPt(th, -LV.A)[1], yh = yA(LV.TH0) + (yA(LV.TH1) - yA(LV.TH0)) * k;
  let lo = LV.TH1, hi = LV.TH0; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; yA(m) < yh ? lo = m : hi = m; } const th = t < S.A(2) ? LV.TH0 : (lo + hi) / 2;
  const P = W3.frame({ cam: C11.lever(), lever: th, sun: [-14, 34, 26] });
  let s = '', u = figTag('চিত্র ১১.৩: সরল যন্ত্র');
  const pm = pxpm(P, [LV.X, 0.2, LV.Z]), hp = lvPt(th, -LV.A, LV.R), [hx, hy] = P(...hp), ho = S.P(1, 0, 0.25), lift = 120 * (1 - ease(ho));
  /* the hand: 0.19 m long; pressing on the top of the rod, turned with it */
  if (ho > 0 && window.FLAT_HAND) s += `<g transform="translate(${F(hx)},${F(hy - lift)}) rotate(${F(th * 180 / Math.PI)})"><path transform="scale(${(pm * 0.19 / 200).toFixed(3)})" d="M-250 -97 L-232 -41 L-640 -168 L-680 -262 Z" fill="#2a6f97" stroke="#1f5577" stroke-width="2" opacity="${ho.toFixed(2)}"/>${handFlat(0, 2, pm * 0.19 / 200, ho)}</g>`;
  if (ho > 0 && !window.FLAT_HAND) { const [gx, gy] = P(...lvPt(th, -LV.A)), [ex, ey] = P(...lvPt(th, -LV.A + 0.3)); s += handGrip(gx, gy - lift, Math.atan2(ey - gy, ex - gx) * 180 / Math.PI, pm, ho); }
  const [sx, sy] = P(...lvStone(th)), [fx] = P(LV.X, 0, LV.Z + 0.1), [, fy] = P(LV.X, 0, LV.Z + 0.1), [rx, ry] = P(...lvPt(th, -0.62));
  u += lab(rx, ry - 60, 'শক্ত দণ্ড', 'name', S.P(0, 0.35, 0.45)) ;
  u += lab(fx - 265, fy - 42, 'ঠেস দেওয়া পাথর', 'name', S.P(0, 0.15, 0.25));
  u += lab(sx, sy - 0.2 * pm, 'ভারী পাথর', 'name', S.P(0, 0.75, 0.85));
  /* arrows: 1 N = 0.55 px, straight down; weight from the middle of the heavy stone, the hand's force from the rod */
  const W = LV.M * LV.G, N = 0.62, a1 = S.P(1, 0.3, 0.6), a2 = t >= S.A(3) ? S.P(3, 0.3, 0.45) : 0;
  const f = lvForce(th) * N * ease(a1); const ay = hy + pm * 0.075; s += arrow2(hx, ay, hx, ay + f, a1, Y); u += lab(hx - 180, ay + f * 0.55, 'হাতের বল', 'move', a1);
  if (a2) { s += arrow2(sx, sy, sx, sy + W * N * ease(a2), a2, '#ff6b5e'); u += lab(sx + 235, sy + W * N * 0.5, 'পাথরের ভার', 'move', a2); }
  return { gl: true, svg: s, ui: u };
});
