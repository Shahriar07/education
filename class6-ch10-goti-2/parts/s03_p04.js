/* ৩ঘ: two more examples of ঘূর্ণন চলন গতি, 3D lab, seen from the front. Left: a football rolls on the floor without
   slipping (turn = distance / r), slowing evenly to rest at the end of the part: s = ut + ½at², u = 0.2 m/s, a = −u/T.
   Right: a drill bit turns while it feeds 6 cm into a wooden block on a workbench (spin shown slowed, noted). */
const RB = { U: 0.2, R: 0.11, FEED: 0.06, SPIN: 160 };

part('s03_p04', { scene: 3, label: '৩ঘ', last: true, title: "গড়ানো বল ও ড্রিল",
  screen: "3D, ঘরের মেঝে আর ওয়ার্কবেঞ্চ, সামনে থেকে একটু ওপর। বাঁয়ে মেঝেতে একটা ফুটবল গড়িয়ে ধীরে থামে, গায়ের ছক ঘোরে; ঘোরার বাঁকা তীর আর এগোনোর সোজা তীর। ডানে হাতে ধরা ড্রিল মেশিনের মাথা ঘুরতে ঘুরতে কাঠের টুকরোয় ঢোকে, কাঠের গুঁড়ো পড়ে। তারপর দুটোতেই \"জটিল গতি\" ট্যাগ।" }, [
  { c: "গড়িয়ে যাওয়া বলও তাই।" },
  { c: "ড্রিল মেশিনের মাথাও ঘোরে, আবার কাঠের ভেতরে ঢুকতে থাকে।" },
  { c: "দুটোতেই ঘূর্ণন আর চলন একসাথে, তাই দুটোই জটিল গতি।" }
], function (t, S) {
  const X = ROAD.LAB.X, { U, R, FEED, SPIN } = RB, T = S.dur - 0.5, a = -U / T;
  const tt = Math.min(t, T), sM = U * tt + 0.5 * a * tt * tt;
  const feed = FEED * (S.P(1, 0.1, 1) * 0.5 + (t >= S.A(2) ? S.P(2, 0, 1) * 0.5 : 0));
  const P = W3.frame({ cam: W3.labCam.drill(), lab: { roll: sM, drill: { feed, spin: SPIN * t } } });
  let s = '', u = '';
  // ball: rolling arrows
  const bc = [X + 9 + sM, R, -1.0], [bx, by] = P(...bc), rp = R * pxpm(P, bc);
  if (t < T) s += `<g opacity="${S.fin(0).toFixed(2)}">` + arrow2(bx, by, bx + rp * 2.6, by, 1) + turnArrow(bx, by, rp + 22) + `</g>`;
  // drill: the hand on the handle, wood dust, arrows
  const hp = [X + 11.71 + feed - 0.31, 0.92 - 0.075, -0.97], [hx, hy] = P(...hp), k = pxpm(P, hp);
  s += gripHand(hx, hy, 0.11 * k / 150, 1);
  const [fx, fy] = P(X + 11.71, 0.92, -0.85);
  for (let i = 0; i < Math.min(14, Math.floor(feed / 0.004)); i++) { const ph = (t * 1.3 + i * 0.37) % 1; s += `<circle cx="${F(fx - 6 - (i * 3) % 14)}" cy="${F(fy + ph * 120)}" r="${2 + i % 2}" fill="#d9b37a" opacity="${(1 - ph).toFixed(2)}"/>`; }
  if (t >= S.A(1)) { const [ax, ay] = P(X + 11.71 + feed - 0.2, 0.74, -0.9); s += `<g opacity="${S.fin(1).toFixed(2)}">` + arrow2(ax - 60, ay, ax + 80, ay, 1) + `</g>`; }
  const [lx1, ly1] = P(X + 9.4, 0.5, -1.0), [lx2, ly2] = P(X + 11.45, 1.18, -1.0);
  u += lab(lx1, ly1, 'গড়ানো বল', 'name', S.fin(0)) + lab(lx2, ly2, 'ড্রিল মেশিন', 'name', S.fin(1));
  if (t >= S.A(2)) { const p = S.P(2, 0.55, 0.75); u += lab(lx1, ly1 + 70, 'জটিল গতি', 'move', p) + lab(lx2, ly2 + 70, 'জটিল গতি', 'move', p); }
  u += speedNote('ড্রিলের ঘোরা ধীর করে দেখানো', S.fin(1));
  return { gl: true, svg: s, ui: u };
});
