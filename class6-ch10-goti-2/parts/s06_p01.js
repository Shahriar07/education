/* ৬ক: how to tell the kinds apart: mark a point and watch its path. Case 1: every point of a box moves the same
   distance the same way (the three trails are equal and parallel) → চলন গতি. Push profile as in ৫ক. */
part('s06_p01', { scene: 6, label: '৬ক', first: true, title: "ঘটনা ১: চলন গতি",
  screen: "নেভি পটভূমি। ব্যানার: \"একটা বিন্দুতে দাগ দাও\"। মেঝের রেখায় একটা কার্টন, তার গায়ে তিনটি রঙিন দাগ পড়ে। হলুদ বৃত্তে ১। কার্টন সরে যায়, তিন দাগের পেছনে তিনটি সমান ও সমান্তরাল তীর। শব্দ-কার্ড: চলন গতি / Translational motion।" }, [
  { c: "তাহলে কোন গতি কোনটা, চিনবে কীভাবে? একটা বিন্দুতে দাগ দাও, আর দেখো সে কোন পথে যায়।" },
  { c: "এক: সব বিন্দু একসাথে একই দিকে সমান দূরত্ব গেলে, সেটা চলন গতি।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  const YF = 700, W = 260, H = 220, X0 = 380, D = 640;
  const t0 = S.A(1) + 1.0, T = 2.0, k = 0.5, V = 1 / (T - k), A = V / k;
  const f = u2 => u2 <= 0 ? 0 : u2 < k ? 0.5 * A * u2 * u2 : u2 < T - k ? 0.5 * A * k * k + V * (u2 - k) : u2 < T ? 1 - 0.5 * A * (T - u2) ** 2 : 1;
  const x = X0 + D * f(t - t0);
  s += `<line x1="120" y1="${YF}" x2="1800" y2="${YF}" stroke="#5d6f9e" stroke-width="6"/>`;
  s += carton(x, YF, W, H);
  const marks = [[0.15, 0.25, '#e63946'], [0.5, 0.6, Y], [0.85, 0.9, '#2e86de']];
  marks.forEach(([fx, fy, c], i) => {
    const p = S.P(0, 0.55 + i * 0.12, 0.65 + i * 0.12);
    const mx = x + W * fx, my = YF - H * fy;
    if (t >= t0) s += hArrow(X0 + W * fx, mx, my, 1, c);
    s += `<circle cx="${F(mx)}" cy="${F(my)}" r="${F(15 * back(p))}" fill="${c}" stroke="#fff" stroke-width="4"/>`;
  });
  u += banner('একটা বিন্দুতে দাগ দাও', S.P(0, 0.35, 0.5), 1 - S.P(1, 0.55, 0.7), 150);
  if (t >= S.A(1)) s += badge(200, 330, 1, S.P(1, 0, 0.1));
  if (t >= t0 + T) u += lab(X0 + D + W / 2 + 20, YF + 80, 'তিনটা তীর সমান, একই দিকে', 'name', pr(t, t0 + T, t0 + T + 0.4));
  if (S.on(1)) u += termCard('চলন গতি', 'Translational motion', S.P(1, 0.72, 0.85), 1, 960, 330, 0.8);
  return { svg: s, ui: u };
});
