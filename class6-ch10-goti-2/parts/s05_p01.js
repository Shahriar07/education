/* ৫ক: চিত্র ১০.৩ (চলন গতি) in the 3D lab, seen from the front at a low height as in the book. A carton (50 x 42 x 40 cm)
   on a wooden floor is pushed by a hand; its bottom corners A and C end at B and D. The push is computed: speeds up evenly
   for TAU s, steady, slows evenly for TAU s, covering D_M metres in T_PUSH s (trap()). */
const F103 = { X0: -1.0, W: 0.5, H: 0.42, D_M: 1.0, T_PUSH: 2.2, TAU: 0.5, ZF: -1.0 };
F103.V = F103.D_M / (F103.T_PUSH - F103.TAU); F103.A = F103.V / F103.TAU;   // 0.59 m/s, 1.18 m/s²

part('s05_p01', { scene: 5, label: '৫ক', first: true, title: "চিত্র ১০.৩: বাক্স AC থেকে BD",
  screen: "3D, বইয়ের মতো সামনে থেকে নিচু উচ্চতায়। কাঠের মেঝেতে একটা কার্টন, নিচের দুই কোণে A ও C। একটা হাত কার্টন ঠেলে; ওপরে বইয়ের মতো তীর; কার্টন সরে গিয়ে থামে, নতুন জায়গায় B ও D, পুরোনো জায়গায় ডটেড রেখা। মেঝেতে A থেকে B আর C থেকে D দুটি সমান তীর, \"১ মিটার\"। চিত্র-লেবেল: চিত্র ১০.৩: চলন গতি।" }, [
  { c: "এবার বইয়ের ছবিগুলো চলতে দেখি। চিত্র ১০.৩। কাঠের মেঝেতে একটা বাক্স, এর দুই কোণ A আর C।" },
  { c: "বাক্সটা ঠেলে নেওয়া হলো।", d: 3.2 },
  { c: "A গেল B-তে, আর C গেল D-তে।" },
  { c: "A থেকে B আর C থেকে D, দুটো দূরত্ব সমান। এটাই চলন গতি।" }
], function (t, S) {
  const X = ROAD.LAB.X, { X0, W, H, D_M, T_PUSH, TAU, ZF } = F103;
  const t0 = S.A(1) + 0.3, x = X0 + trap(t - t0, D_M, T_PUSH, TAU);
  const P = W3.frame({ cam: W3.labCam.carton(), lab: { carton: x } });
  let s = '', u = '';
  // where the carton started: dashed outline (front face and top edge)
  if (x > X0 + 0.01) { const a = X + X0, zb = ZF - 0.4; s += path3(P, [[a, 0, ZF], [a, H, ZF], [a + W, H, ZF], [a + W, 0, ZF]], '#0f1b3d', 4, '12 10', 0.8) + path3(P, [[a, H, ZF], [a, H, zb], [a + W, H, zb], [a + W, H, ZF]], '#0f1b3d', 4, '12 10', 0.6); }
  // the hand pushes the back face (real size ≈ 19 cm)
  const hb = [X + x - 0.004, H * 0.45, ZF - 0.12], k = pxpm(P, hb), tIn = S.A(1) - 0.6;
  let hx3 = x - 0.004, ho = 1;
  if (t < tIn + 0.6) { const p = ease(pr(t, tIn - 0.4, tIn + 0.6)); hx3 = X0 - 0.004 - 0.18 * (1 - p); ho = p; }
  if (t > t0 + T_PUSH) { const p = ease(pr(t, t0 + T_PUSH + 0.2, t0 + T_PUSH + 1.2)); hx3 = X0 + D_M - 0.004 - 0.2 * p; ho = 1 - p; }
  const [hx, hy] = P(X + hx3, H * 0.45, ZF - 0.12);
  s += handPush(hx, hy, 0.19 * k / 235, ho);
  // corner points (they move with the carton) and floor marks A, C, B, D
  const pA = S.P(0, 0.62, 0.72), pC = S.P(0, 0.80, 0.90), pB = S.P(2, 0.0, 0.12), pD = S.P(2, 0.5, 0.62);
  s += dot3(P, [X + x, 0.004, ZF], Y, 12 * back(pA), pA > 0 ? 1 : 0) + dot3(P, [X + x + W, 0.004, ZF], Y, 12 * back(pC), pC > 0 ? 1 : 0);
  const mark = (xx, L, p) => { if (p <= 0) return ''; const [mx, my] = P(X + xx, 0.003, ZF + 0.12); u += lab(mx, my + 34, L, 'name', p); return path3(P, [[X + xx, 0.003, ZF], [X + xx, 0.003, ZF + 0.1]], '#0f1b3d', 5, '', p); };
  s += mark(X0, 'A', pA) + mark(X0 + W, 'C', pC) + mark(X0 + D_M, 'B', pB) + mark(X0 + W + D_M, 'D', pD);
  // the book's arrow above the carton while it moves
  if (t >= t0 && t < t0 + T_PUSH + 0.6) { const [a1, b1] = P(X + x + 0.05, H + 0.16, ZF - 0.2), [a2, b2] = P(X + x + W + 0.2, H + 0.16, ZF - 0.2); s += g(1 - pr(t, t0 + T_PUSH, t0 + T_PUSH + 0.6), hArrow(a1, a2, b1, 1)); void b2; }
  // AB and CD on the floor in front: two arrows of the same 3D length 1 m
  if (t >= S.A(2)) {
    const zr1 = ZF + 0.24, zr2 = ZF + 0.4;
    const [a1, ay] = P(X + X0, 0.003, zr1), [a2] = P(X + X0 + D_M, 0.003, zr1), [c1, cy] = P(X + X0 + W, 0.003, zr2), [c2] = P(X + X0 + W + D_M, 0.003, zr2);
    s += hArrow(a1, a2, ay, S.P(2, 0.1, 0.45), Y) + hArrow(c1, c2, cy, S.P(2, 0.6, 0.95), '#7fd1ff');
    const pm = S.P(3, 0.0, 0.18);
    if (pm > 0) { u += lab((a1 + a2) / 2, ay - 42, 'AB = ১ মিটার', 'move', pm); u += lab((c1 + c2) / 2, cy + 44, 'CD = ১ মিটার', 'move', pm); }
    if (S.P(3, 0.35, 0.5) > 0) u += `<div class="abs" style="left:1460px;top:${F(cy - 40)}px;opacity:${S.P(3, 0.35, 0.5).toFixed(2)}"><div class="vs">AB = CD</div></div>`;
    s += tick(1770, cy - 10, 30, S.P(3, 0.45, 0.6));
    if (t >= S.A(3)) { const [lx, ly] = P(X + X0 + D_M + W / 2, H + 0.2, ZF - 0.2); u += lab(lx, ly, 'চলন গতি', 'move', S.P(3, 0.62, 0.78)); }
  }
  u += figTag('চিত্র ১০.৩: চলন গতি', S.fin(0));
  return { gl: true, svg: s, ui: u };
});
