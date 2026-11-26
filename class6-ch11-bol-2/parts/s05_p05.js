/* ৫ঙ: drawn */
part('s05_p05', { scene: 5, label: '৫ঙ', last: true, title: "চিত্র ১১.১৫: স্ক্রু-ড্রাইভার",
  screen: "সরু ও মোটা হাতলের স্ক্রু-ড্রাইভার, ৫ পাক।" }, [
  { c: "স্ক্রু-ড্রাইভারও চাকা-অক্ষদণ্ড। হাতলটা চাকা, ধাতুর দণ্ডটা অক্ষ।" },
  { c: "বইয়ের কাজ। সরু হাতলে স্ক্রুটা ৫ পাক ঘোরাও, তারপর মোটা হাতলে ৫ পাক।" },
  { c: "মোটা হাতলে কম কষ্ট লাগে, কারণ চাকা বড়। গাড়ির স্টিয়ারিং হুইলও এভাবে কাজ করে।" }
], function (t, S) {
  /* screwdrivers: the handle is the wheel, the blade the axle. Each is turned 5 times; the push at the rim for the same
     turning effect: thin (9 mm) 115 px, thick (21 mm) 115 x 9 / 21 = 49 px */
  const n1 = t < S.A(1) ? 0 : 5 * ease(S.P(1, 0.35, 0.65)), n2 = t < S.A(1) ? 0 : 5 * ease(S.P(1, 0.7, 0.98)), P = W3.frame({ cam: C11.sd(), sd: [n1, n2], sun: [-14, 34, 26] });
  let s = '', u = '';
  const y = WS.TY + 0.06 + 0.17 + 0.0075, rim = (x, r) => [P(x, y, r), P(x + 0.03, y, r)], [p1, q1] = rim(SD.X, 0.009), [p2, q2] = rim(SD.X2, 0.021);
  const tang = (x, r, L, o) => { const [ex] = P(x - r, y, 0), [, ey] = P(x, y, r); return arrow2(ex - L - 4, ey, ex - 4, ey, o); };
  const [h1x, h1y] = P(SD.X, y + 0.06, 0), [h2x, h2y] = P(SD.X2, y + 0.06, 0), [bx, by] = P(SD.X2, WS.TY + 0.12, 0);
  u += lab(h2x - 250, h2y + 60, 'হাতল: চাকা', 'name', S.P(0, 0.3, 0.45)) + lab(bx + 180, by, 'ধাতুর দণ্ড: অক্ষ', 'name', S.P(0, 0.45, 0.6));
  if (t >= S.A(1)) { const [ax, ay] = P(SD.X, WS.TY + 0.1, 0), [bx2, by2] = P(SD.X2, WS.TY + 0.1, 0); u += lab(ax - 170, ay, 'সরু: ' + BNF(n1, 0) + ' পাক', 'move', S.P(1, 0.3, 0.4)) + lab(bx2 - 170, by2, 'মোটা: ' + BNF(n2, 0) + ' পাক', 'move', S.P(1, 0.66, 0.72)); }
  if (t >= S.A(2)) { const o = S.P(2, 0.05, 0.2); s += tang(SD.X, 0.009, 115, o) + tang(SD.X2, 0.021, 49, o); u += lab(p1[0] - 200, p1[1] + 90, 'সরু: বেশি বল', 'name', o) + lab(p2[0] + 200, p2[1] + 90, 'মোটা: কম বল', 'name', o) + lab(960, 870, big('গাড়ির স্টিয়ারিং হুইলও এভাবে কাজ করে'), 'move', S.P(2, 0.7, 0.85)); }
  u += lab(1640, 170, 'স্ক্রু-ড্রাইভার', 'name');
  return { gl: true, svg: s, ui: u };
});
