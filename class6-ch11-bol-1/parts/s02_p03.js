/* ২গ:  */
part('s02_p03', { scene: 2, label: '২গ', title: "চিত্র ১১.১: ঠেলাগাড়ি",
  screen: "3D ঠেলাগাড়ি পাশ থেকে; পেছনে ঠেলা হাত, সামনে টানা হাত, দুই তীর একই দিকে।" }, [
  { c: "বইয়ের চিত্র ১১.১ দেখো। ভারী বোঝা নিয়ে একটা ঠেলাগাড়ি চলছে।" },
  { c: "পেছনের হাত গাড়িকে ধাক্কা দিচ্ছে। সামনের হাত টান দিচ্ছে।" },
  { c: "দুটো বলই একই দিকে, তাই গাড়িটা সামনে এগোয়।" },
  { c: "হলুদ তীর দুটো দেখো। তীর যেদিকে, বলও সেদিকে। তীর যত লম্বা, বল তত বেশি।" }
], function (t, S) {
  /* steady 0.45 m/s; push 150 N + pull 150 N = resistance 300 N, so both arrows are equal */
  const x = -2.4 + 0.45 * t, P = W3.frame({ cam: C11.cart(-2.4 + 0.45 * t + 0.15), cart: x, sun: [-14, 34, 26] }), C = ST.CART + x, pm = pxpm(P, [C, 0.8, ST.CZ + 0.5]);
  let s = '', u = figTag('চিত্র ১১.১: বল হচ্ছে ধাক্কা বা টান'); const [rx, ry] = P(C - 1.12, 0.74, ST.CZ + 0.4), [gx, gy] = P(C + 1.75, 0.68, ST.CZ + 0.46), [ex, ey] = P(C + 2.0, 0.68, ST.CZ + 0.46);
  s += handPush3(rx - 5, ry - 14, 8, pm) + handPush3(rx, ry + 6, 8, pm) + handGrip(gx, gy, Math.atan2(ey - gy, ex - gx) * 180 / Math.PI, pm);
  const a = S.P(1, 0.15, 0.3), b = S.P(1, 0.6, 0.75); s += arrow2(rx - 235, ry + 120, rx - 35, ry + 120, a) + arrow2(gx + 70, gy + 120, gx + 270, gy + 120, b);
  u += lab(rx - 130, ry + 190, big('ধাক্কা'), 'move', a) + lab(gx + 170, gy + 190, big('টান'), 'move', b);
  if (t >= S.A(2)) { const [mx, my] = P(C, 1.35, ST.CZ); s += arrow2(mx - 130, my - 30, mx + 170, my - 30, S.P(2, 0.4, 0.55), '#7fd1ff'); u += lab(mx + 330, my - 30, 'গাড়ি এগোয়', 'name', S.P(2, 0.4, 0.55)); }
  return { gl: true, svg: s, ui: u };
});
