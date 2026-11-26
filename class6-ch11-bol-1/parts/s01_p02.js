/* ১খ:  */
part('s01_p02', { scene: 1, label: '১খ', title: "দণ্ড দিয়ে পাথর ওঠে",
  screen: "দণ্ড, ঠেস দেওয়া ছোট পাথর; হাত চাপ দেয়, ভারী পাথর ওঠে। প্রশ্ন-কার্ড।" }, [
  { c: "এবার একটা লম্বা শক্ত দণ্ড আর একটা ছোট পাথর নিলে।" },
  { c: "দণ্ডের মাথায় চাপ দিতেই ভারী পাথরটা উঠে গেল!" },
  { c: "তোমার শক্তি তো একই আছে। তাহলে কীভাবে উঠল?" }
], function (t, S) {
  const k = ease(S.P(1, 0.15, 0.9)), th = lvTilt(k), o0 = S.P(1, 0, 0.12), P = W3.frame({ cam: C11.lever(), lever: th, hands: o0 > 0 ? [lvHand3(th, 0.15 * (1 - ease(o0)))] : [], sun: [-14, 34, 26] });
  let s = '', u = ''; const o = S.P(1, 0, 0.12), [rx, ry] = P(...lvPt(th, -0.62)), [fx, fy] = P(LV.X, 0, LV.Z + 0.1), [sx, sy] = P(...lvStone(th)), pm = pxpm(P, [LV.X, 0.2, LV.Z]);
  
  const q = 1 - (t >= S.A(2) ? S.P(2, 0, 0.1) : 0); u += lab(rx, ry - 60, 'শক্ত দণ্ড', 'name', S.P(0, 0.35, 0.5) * q) + lab(fx - 235, fy - 42, 'ছোট পাথর', 'name', S.P(0, 0.75, 0.9) * q);
  if (t >= S.A(1) && t < S.A(2)) { const [hx, hy] = P(...lvPt(th, -LV.A)), [ux] = P(...lvStone(LV.TH0)), p = S.P(1, 0.2, 0.4); s += arrow2(hx, hy + pm * 0.075, hx, hy + pm * 0.075 + 90 * p, p); s += arrow2(sx + 190, sy + 60, sx + 190, sy + 60 - 120 * p, p, '#7fd1ff'); void ux; u += lab(hx + 120, hy + 130, 'চাপ', 'move', p) + lab(sx + 290, sy, 'উঠছে', 'move', p); }
  if (t >= S.A(2)) u += card('তোমার শক্তি তো একই।<br>তাহলে কীভাবে উঠল?', S.P(2, 0.35, 0.55), 1, 190, 1000, 68);
  return { gl: true, svg: s, ui: u };
});
