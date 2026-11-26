/* ৬গ: drawn */
part('s06_p03', { scene: 6, label: '৬গ', title: "পায়ের পাতা",
  screen: "পায়ের হাড়; গোড়ালি ওঠে; ফালক্রাম, ভার, বল।" }, [
  { c: "গোড়ালি তুলে আঙুলে ভর দিয়ে দাঁড়াও। পায়ের আঙুলের গোড়া মাটিতে থাকে, সেটা ফালক্রাম।" },
  { c: "শরীরের ভার পড়ে মাঝখানে, গোড়ালির জোড়ায়। আর পায়ের পেছনের পেশি গোড়ালিকে উপরে টেনে বল দেয়।" },
  { c: "তাই পুরো শরীরটা উপরে উঠে যায়। দৌড়ানো আর লাফানোর সময় এটাই হয়।" }
], function (t, S) {
  /* foot on tiptoe: fulcrum = the ball of the foot F; the body's weight acts at the ankle (203 px from F), the calf muscle
     pulls the heel up: horizontal distances from F 185 and 321 px, pull = weight x 185 / 321 = 0.58 x weight. Weight 200 px, pull 116 px */
  let s = bg(NAVY), u = '';
  const ox = 640, oy = 150, k = 1.3, Sx = p => [ox + k * p[0], oy + k * p[1]];
  const b = t < S.A(2) ? 0.3 * ease(S.P(0, 0.25, 0.6)) : 0.3 * (0.6 + 0.4 * Math.cos((t - S.A(2)) * 2.4));
  s += `<g transform="translate(${ox},${oy}) scale(${k})">${foot2d(b)}</g>`;
  const [fx, fy] = Sx(FT.F), [ax, ay] = Sx(footPt(FT.ANK, b)), [hx, hy] = Sx(footPt(FT.HEEL, b));
  const o1 = S.P(0, 0.55, 0.7), o2 = S.P(1, 0.05, 0.25), o3 = S.P(1, 0.45, 0.6);
  s += ringDot(fx, fy, o1); u += lab(fx + 40, fy + 90, 'আঙুলের গোড়া: ফালক্রাম', 'name', o1);
  s += arrow2(ax + 60, ay - 40, ax + 60, ay + 160, o2, '#ff6b5e'); u += lab(ax + 240, ay + 40, 'শরীরের ভার', 'name', o2);
  s += arrow2(hx - 40, hy + 10, hx - 40, hy - 106, o3); u += lab(hx - 250, hy - 40, 'পেশির টান: বল', 'name', o3);
  if (t >= S.A(2)) u += lab(960, 220, big('পুরো শরীর উপরে ওঠে'), 'move', S.P(2, 0.1, 0.25));
  u += lab(1640, 170, 'পায়ের পাতা', 'name');
  return { svg: s, ui: u };
});
