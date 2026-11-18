/* ২খ: the textbook activity (p. 85) in the 3D lab: a brick on a table, seen from the side at eye level. Chalk marks at
   its back and front, a hand pushes it 0.20 m (speeds up evenly for 0.4 s, steady, slows evenly: trap()), and both ends
   move the same distance. Brick 23 x 7.5 cm, back end starts at x = −3.62 (lab coordinates). */
const BRK = { X0: -3.62, W: 0.23, H: 0.075, D: 0.20, T_PUSH: 1.6, TAU: 0.4, YT: 0.775, ZF: -3.265 };

part('s02_p02', { scene: 2, label: '২খ', title: "বইয়ের কাজ: টেবিলে ইট ঠেলা",
  screen: "3D, টেবিলের পাশ থেকে চোখের উচ্চতায়। টেবিলে একটা ইট; ইটের পেছনে আর সামনে টেবিলে চকের সাদা দাগ পড়ে। একটা হাত ইটটা সামনে ঠেলে। টেবিলের কিনারের নিচে দুটি মাপের তীর: পেছনের দাগ থেকে পেছনের প্রান্ত, সামনের দাগ থেকে সামনের প্রান্ত; প্রশ্নচিহ্ন, তারপর দুটোতেই ২০ সেমি, সবুজ টিক।" }, [
  { c: "বইয়ের একটা কাজ করে দেখি।" },
  { c: "টেবিলে একটা ইট রাখো, চক দিয়ে এর সামনে আর পেছনে দাগ দাও।" },
  { c: "এবার ইটটা সামনে ঠেলে দাও।" },
  { c: "সামনের দাগ থেকে সামনের প্রান্ত, পেছনের দাগ থেকে পেছনের প্রান্ত মাপো।" },
  { c: "মাপ দুটো কি সমান হবে, নাকি আলাদা?", d: 4.2 },
  { c: "দুটো দূরত্ব সমান। ইটের গতিও চলন গতি।" }
], function (t, S) {
  const { X0, W, H, D, T_PUSH, TAU, YT, ZF } = BRK, X = ROAD.LAB.X;
  const t0 = S.A(2) + 0.5, x = X0 + trap(t - t0, D, T_PUSH, TAU);
  const P = W3.frame({ cam: W3.labCam.brick(), lab: { brick: x } });
  let s = '', u = '';
  // chalk marks on the table top, just in front of the brick (back mark, then front mark, drawn during sentence 2)
  const chalk = (xx, p) => p > 0 ? path3(P, [[X + xx, YT + 0.001, ZF + 0.002], [X + xx, YT + 0.001, ZF + 0.002 + 0.06 * p]], '#f7f7f2', 8, '') : '';
  s += chalk(X0, S.P(1, 0.55, 0.7)) + chalk(X0 + W, S.P(1, 0.8, 0.95));
  // the hand pushes the back face of the brick (palm on it, real size ≈ 19 cm)
  if (t >= S.A(2) - 0.1) {
    const pb = [X + x - 0.002, YT + H / 2, ZF - 0.03], k = pxpm(P, pb);
    let hx3 = x - 0.002, ho = 1;
    if (t < t0) { const p = ease(pr(t, S.A(2), t0)); hx3 = X0 - 0.002 - 0.12 * (1 - p); ho = p; }
    if (t > t0 + T_PUSH) { const p = ease(pr(t, t0 + T_PUSH + 0.2, t0 + T_PUSH + 1.0)); hx3 = X0 + D - 0.002 - 0.14 * p; ho = 1 - p; }
    const [hx, hy] = P(X + hx3, YT + H * 0.55, ZF - 0.03);
    s += handPush(hx, hy - 0.04 * k, 0.19 * k / 235, ho);
  }
  // the two measurements, along the table's front edge
  if (t >= S.A(3)) {
    const ya = YT - 0.03, yb = YT - 0.075, z = -3.1;
    const pt = (xx, yy) => P(X + xx, yy, z);
    const [a1, a1y] = pt(X0, ya), [a2, a2y] = pt(X0 + D, ya), [b1, b1y] = pt(X0 + W, yb), [b2, b2y] = pt(X0 + W + D, yb);
    s += arrow2(a1, a1y, a1 + (a2 - a1) * S.P(3, 0.1, 0.45), a2y, S.P(3, 0.1, 0.12) > 0 ? 1 : 0, '#7fd1ff');
    s += arrow2(b1, b1y, b1 + (b2 - b1) * S.P(3, 0.5, 0.85), b2y, S.P(3, 0.5, 0.52) > 0 ? 1 : 0, Y);
    u += lab((a1 + a2) / 2, a1y - 50, 'পেছনের প্রান্ত', 'name', S.P(3, 0.2, 0.4)) + lab((b1 + b2) / 2, b1y + 52, 'সামনের প্রান্ত', 'name', S.P(3, 0.6, 0.8));
    if (t >= S.A(4) && t < S.A(5)) u += lab(1660, 560, '?', 'move', S.P(4, 0, 0.2));
    if (t >= S.A(5)) {
      const p = S.P(5, 0, 0.2);
      u += lab((a1 + a2) / 2, a1y + 50, '২০ সেমি', 'move', p) + lab((b1 + b2) / 2, b1y + 112, '২০ সেমি', 'move', p);
      s += tick(1700, 560, 30, S.P(5, 0.25, 0.4));
      const [cx, cy] = P(X + X0 + D + W / 2, YT + H + 0.05, ZF - 0.05);
      u += lab(cx, cy, 'চলন গতি', 'move', S.P(5, 0.6, 0.75));
    }
  }
  return { gl: true, svg: s, ui: u };
});
