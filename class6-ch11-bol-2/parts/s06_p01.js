/* ৬ক: drawn */
part('s06_p01', { scene: 6, label: '৬ক', first: true, title: "মানবদেহ ও সরল যন্ত্র",
  screen: "তিনটি হাড়ের নকশা একসাথে।" }, [
  { c: "আমাদের শরীরও এক জটিল যন্ত্র। এর বেশ কিছু অঙ্গ লিভারের নীতি মেনে কাজ করে।" },
  { c: "এখানে হাড় শক্ত দণ্ডের কাজ করে, হাড়ের জোড়া ফালক্রাম, আর পেশি টেনে বল দেয়।" },
  { c: "চলো চোয়াল, পায়ের পাতা আর হাত দেখি।" }
], function (t, S) {
  /* the three body levers side by side, then what plays the rod, the fulcrum and the force */
  let s = bg(NAVY), u = '';
  const k = 0.52, a = 0.1 * (0.5 - 0.5 * Math.cos(t * 2.6)), b = 0.25 * (0.5 - 0.5 * Math.cos(t * 1.9 + 1));
  s += grp(S.P(0, 0.05, 0.2), `<g transform="translate(60,190) scale(0.85)">${skull2d(a)}</g>`) + grp(S.P(0, 0.2, 0.35), `<g transform="translate(660,190) scale(0.72)">${foot2d(b)}</g>`) + grp(S.P(0, 0.35, 0.5), `<g transform="translate(1180,190) scale(0.7)">${arm2d()}${stone2d(30)}</g>`);
  u += lab(270, 640, 'চোয়াল', 'name', S.P(0, 0.05, 0.2)) + lab(860, 640, 'পায়ের পাতা', 'name', S.P(0, 0.2, 0.35)) + lab(1560, 640, 'হাত', 'name', S.P(0, 0.35, 0.5));
  if (t >= S.A(1)) [['হাড়', 'শক্ত দণ্ড'], ['হাড়ের জোড়া', 'ফালক্রাম'], ['পেশি', 'টেনে বল দেয়']].forEach(([x, y], i) => u += lab(380 + i * 580, 790, big(x + ' &nbsp;→&nbsp; ' + y), 'move', S.P(1, 0.1 + i * 0.25, 0.25 + i * 0.25)));
  return { svg: s, ui: u };
});
