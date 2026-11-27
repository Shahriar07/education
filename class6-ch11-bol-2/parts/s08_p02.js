/* ৮খ: drawn */
part('s08_p02', { scene: 8, label: '৮খ', last: true, title: "৫ বনাম ১০",
  screen: "ডানে আরো ৫টা, স্কেল হেলে; সরিয়ে আবার সমান; বাহু ২ : ১।" }, [
  { c: "তিন, ডান পাশে আরো ৫টা মুদ্রা রাখো। ডান দিক ঝুঁকে পড়ল, তাই না?" },
  { c: "চার, এবার স্কেলটা সরিয়ে বাঁয়ে ৫টা আর ডানে ১০টা মুদ্রায় সমান করো। দেখো, বাঁয়ের বাহু ডানের বাহুর দ্বিগুণ।" },
  { c: "কম মুদ্রায় বেশি মুদ্রা তোলা গেল। কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও।" }
], function (t, S) {
  /* 5 more coins on the right: the right end goes down. Then the ruler is slid until the pencil is under the 18.3 cm mark:
     5 x 13.3 = 10 x 6.7, level again; the left arm is twice the right arm */
  let p = 15, k = 1, nR = 10;
  if (t < S.A(1)) { k = ease(S.P(0, 0.25, 0.45)); nR = S.P(0, 0.15) > 0 ? 10 : 5; }
  else { const m = ease(S.P(1, 0.2, 0.6)); p = 15 + (55 / 3 - 15) * m; k = 1 - m; }
  const c = { p, nR, show: 2, k }, P = W3.frame({ cam: C11.coins(), coins: c, sun: [-14, 34, 26] });
  let s = '', u = banner('নিজে করো', 1, 1, 130);
  const [lx, ly] = P(...coinPt(c, 5, 0.012)), [rx, ry] = P(...coinPt(c, 25, 0.02)), [px, py] = P(CN.X, WS.TY + CN.R, CN.Z + 0.03);
  u += lab(lx, ly - 90, '৫টি', 'name') + lab(rx, ry - 90, nR + '' === '10' ? '১০টি' : '৫টি', 'name');
  if (t < S.A(1)) u += lab(960, 400, big('ডান দিক ঝুঁকে পড়ল'), 'move', S.P(0, 0.5, 0.65));
  else { const o = S.P(1, 0.6, 0.75), [ax, ay] = P(...coinPt(c, 5)), [bx, by] = P(...coinPt(c, 25)), yb = py + 60;
    s += `<g opacity="${cl(o * 2).toFixed(2)}" stroke-linecap="round" stroke-width="10"><line x1="${F(ax)}" y1="${F(yb)}" x2="${F(px)}" y2="${F(yb)}" stroke="${Y}"/><line x1="${F(px)}" y1="${F(yb)}" x2="${F(bx)}" y2="${F(yb)}" stroke="#7fd1ff"/></g>`;
    u += lab((ax + px) / 2, yb + 60, 'বাম বাহু ১৩.৩ সেমি', 'move', o) + lab((px + bx) / 2 + 30, yb + 120, 'ডান বাহু ৬.৭ সেমি', 'move', o); s += ringDot(px, py, 1); }
  if (t >= S.A(2)) u += card('কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও', S.P(2, 0.45, 0.65), 1, 250, 1200, 56);
  return { gl: true, svg: s, ui: u };
});
