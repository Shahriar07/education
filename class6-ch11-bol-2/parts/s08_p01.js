/* ৮ক: drawn */
part('s08_p01', { scene: 8, label: '৮ক', first: true, title: "নিজে করো: উপকরণ ও ধাপ",
  screen: "ব্যানার; স্কেল, পেনসিল, রাবার ব্যান্ড, ৫ টাকার মুদ্রা; 3D পাশ থেকে।" }, [
  { c: "এবার নিজে করো। লাগবে একটা স্কেল, একটা পেনসিল, একটা রাবার ব্যান্ড আর কয়েকটা ৫ টাকার মুদ্রা।" },
  { c: "এক, পেনসিলটা স্কেলের নিচে আড়াআড়ি রাবার ব্যান্ড দিয়ে বাঁধো। পেনসিলটাই ফালক্রাম।" },
  { c: "দুই, দুই পাশে ৫টা করে মুদ্রা রেখে স্কেলটা সরিয়ে সমান করো।" }
], function (t, S) {
  /* the book's activity: materials, the pencil tied under the 15 cm mark, then 5 coins at 5 cm and 5 at 25 cm: level */
  const show = t < S.A(1) ? 0 : t < S.A(2) ? 1 : 2, c = { p: 15, nR: 5, show: show || 1 }, P = W3.frame({ cam: C11.coins(), coins: c, sun: [-14, 34, 26] });
  let s = '', u = banner('নিজে করো', S.P(0, 0.02, 0.15), 1, 130);
  if (show === 0) ['স্কেল', 'পেনসিল', 'রাবার ব্যান্ড', '৫ টাকার মুদ্রা'].forEach((n, i) => u += lab(330 + i * 420, 880, big(n), 'name', S.P(0, 0.25 + i * 0.12, 0.33 + i * 0.12)));
  const [px, py] = P(CN.X, WS.TY + CN.R, CN.Z + 0.03);
  if (show >= 1) { s += ringDot(px, py, S.P(1, 0.4, 0.55)); u += lab(px, py + 110, 'পেনসিল: ফালক্রাম', 'name', S.P(1, 0.4, 0.55)); }
  if (show === 2) { const [lx, ly] = P(...coinPt(c, 5, 0.012)), [rx, ry] = P(...coinPt(c, 25, 0.012)), o = S.P(2, 0.2, 0.35); u += lab(lx, ly - 90, '৫টি মুদ্রা', 'name', o) + lab(rx, ry - 90, '৫টি মুদ্রা', 'name', o) + lab(960, 400, big('স্কেল সমান'), 'move', S.P(2, 0.7, 0.85)); }
  return { gl: true, svg: s, ui: u };
});
