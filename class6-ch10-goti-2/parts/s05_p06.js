/* ৫চ: চিত্র ১০.৯ (দোলন গতি) in the 3D lab, seen from the side at eye level as in the book: a 30 cm plastic ruler, half of
   it beyond the table edge. One hand presses the part on the table; a finger pushes the free end down 3.3 cm and lets go.
   The free end vibrates in the clamped-beam shape: f = (β²/2πL²)·√(E t²/12ρ), β = 1.875, L = 0.15 m, t = 2 mm, E = 3 GPa,
   ρ = 1050 kg/m³ → ≈ 24 Hz, dying away with τ ≈ 0.4 s. Shown 16 times slower (noted). Table edge at lab x = −2.0. */
const F109 = { L_OUT: 0.15, PUSH: 0.033, SLOW: 16, XE: -2.0, YT: 0.7765, Z: -3.27 };
F109.F_REAL = (1.8751 ** 2 / (2 * Math.PI * F109.L_OUT ** 2)) * Math.sqrt(3e9 * 0.002 ** 2 / (12 * 1050));   // ≈ 24.3 Hz
F109.TAU_REAL = 0.4;
/* tip displacement in metres (down +) u seconds of screen time after release */
function tip109(u) { const f = F109.F_REAL / F109.SLOW, tau = F109.TAU_REAL * F109.SLOW; return F109.PUSH * Math.exp(-u / tau) * Math.cos(2 * Math.PI * f * u); }
/* the ruler scene used by ৫চ, ৮ক and ৮খ: out = length beyond the edge (m), tip = tip displacement (m, down +),
   press = 0..1 for the pressing hand, finger = {y: fingertip height offset (m), o} or null */
function rulerScene(out, tip, press, finger) {
  const X = ROAD.LAB.X, { XE, YT, Z } = F109;
  const P = W3.frame({ cam: W3.labCam.ruler(), lab: { ruler: { out, tip } } });
  let s = '';
  if (press > 0) { const pp = [X + XE - (0.30 - out) * 0.55, YT + 0.002, Z], [hx, hy] = P(...pp), k = pxpm(P, pp); s += handFlat(hx, hy - 0.12 * (1 - press) * k, 0.19 * k / 200, press); }
  if (finger) { const ft = [X + XE + out - 0.008, YT - tip - finger.y, Z], [fx, fy] = P(...ft), k = pxpm(P, ft); s += handFinger(fx, fy, 0.12 * k / 220, finger.o); }
  return { P, s };
}

part('s05_p06', { scene: 5, label: '৫চ', title: "চিত্র ১০.৯: টেবিলের কিনারে স্কেল",
  screen: "3D, বইয়ের মতো পাশ থেকে চোখের উচ্চতায়: টেবিলের কিনারে ৩০ সেমি প্লাস্টিকের স্কেল, অর্ধেক বাইরে। একটা হাত টেবিলের ওপরের অংশ চেপে ধরে, অন্য হাতের আঙুল বাইরের মাথা নামিয়ে ছেড়ে দেয়। স্কেলের মাথা ওপরে-নিচে কাঁপে, ধীরে থামে; মাথার পাশে ওপর-নিচ তীর, স্থির অবস্থানে ডটেড রেখা। কোণে \"ধীর করে দেখানো\"। চিত্র-লেবেল: চিত্র ১০.৯: দোলন গতি।" }, [
  { c: "চিত্র ১০.৯। টেবিলের কিনারে একটা প্লাস্টিকের স্কেল, প্রায় অর্ধেকটা বাইরে।" },
  { c: "এক হাতে টেবিলের ওপরের অংশ চেপে ধরা।" },
  { c: "অন্য হাতে বাইরের অংশটা একটু নামিয়ে ছেড়ে দিলাম।" },
  { c: "স্কেলটা ওপরে-নিচে উঠানামা করছে। এটা দোলন বা স্পন্দন গতি।", d: 6.4 }
], function (t, S) {
  const X = ROAD.LAB.X, { L_OUT, PUSH, XE, YT, Z } = F109;
  const tp0 = S.A(2) + 0.3, tp1 = tp0 + 0.9, trel = S.E(2) - 0.4;
  let tip = 0;
  if (t >= tp0 && t < trel) tip = PUSH * ease(pr(t, tp0, tp1));
  if (t >= trel) tip = tip109(t - trel);
  let finger = null;
  if (t >= S.A(2)) {
    let fy = 0, fo = 1;
    if (t < tp0) { const p = ease(S.P(2, 0, 0.12 + 0.3 / (S.E(2) - S.A(2)))); fy = 0.08 * (1 - p); fo = p; }
    if (t >= trel) { const p = ease(pr(t, trel, trel + 0.7)); fy = -tip + PUSH * 0 + 0.02 + 0.08 * p; fo = 1 - p; }
    finger = { y: -fy, o: fo };
  }
  const R = rulerScene(L_OUT, tip, ease(S.P(1, 0.05, 0.5)), finger), P = R.P;
  let s = R.s, u = '';
  if (t >= trel) {
    s += path3(P, [[X + XE - 0.02, YT + 0.003, Z], [X + XE + L_OUT + 0.06, YT + 0.003, Z]], '#0f1b3d', 4, '10 10', 0.7);
    const [ax, ay] = P(X + XE + L_OUT + 0.045, YT, Z), k = pxpm(P, [X + XE + L_OUT, YT, Z]);
    s += `<g opacity="${S.fin(3).toFixed(2)}">` + arrow2(ax, ay - 14, ax, ay - 14 - 0.05 * k, 1) + arrow2(ax, ay + 14, ax, ay + 14 + 0.05 * k, 1) + `</g>`;
  }
  u += figTag('চিত্র ১০.৯: দোলন গতি', S.fin(0));
  if (t >= trel) u += speedNote('ধীর করে দেখানো (১৬ গুণ)', pr(t, trel, trel + 0.4));
  if (t >= S.A(3)) { const [lx, ly] = P(X + XE + 0.09, YT + 0.075, Z); u += lab(lx, ly, 'দোলন বা স্পন্দন গতি', 'move', S.P(3, 0.55, 0.7)); }
  return { gl: true, svg: s, ui: u };
});
