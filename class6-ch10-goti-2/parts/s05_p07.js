/* ৫ছ: চিত্র ১০.১০ (স্পন্দন গতি) in the 3D lab, side view as in the book: a pebble on a 40 cm thread hangs from the table
   edge; the other end of the thread lies under a book. A hand pushes the pebble aside to θ0 and lets go:
   θ(t) = θ0 e^(−t/τ) cos(2πt/T), T = 2π√(L/g) = 1.27 s, τ = 25 s. Real speed. Pivot at the table edge (lab x = −2.0). */
const F1010 = { L: 0.40, G: 9.8, TH0: 16, TAU: 25, PX: -2.0, PY: 0.7775, PZ: -3.3 };
F1010.T = 2 * Math.PI * Math.sqrt(F1010.L / F1010.G);

part('s05_p07', { scene: 5, label: '৫ছ', last: true, title: "চিত্র ১০.১০: সুতায় নুড়ি পাথর",
  screen: "3D, বইয়ের মতো পাশ থেকে: টেবিলের ওপর একটা বই, তার নিচে চাপা সুতা কিনার দিয়ে নেমে গেছে, নিচে ঝুলছে নুড়ি পাথর। একটা হাত পাথরটা এক পাশে ঠেলে ছেড়ে দেয়; পাথর স্থির অবস্থানের খাড়া ডটেড রেখার দুই পাশে দোলে, পথে ডটেড বাঁকা দাগ, দুই পাশে তীর। চিত্র-লেবেল: চিত্র ১০.১০: স্পন্দন গতি।" }, [
  { c: "চিত্র ১০.১০। সুতার এক প্রান্তে ছোট্ট একটা নুড়ি পাথর বাঁধা, অন্য প্রান্ত টেবিলে বই দিয়ে চাপা।" },
  { c: "পাথরটা এক পাশে টেনে ছেড়ে দিলাম।" },
  { c: "সে স্থির অবস্থানে ফিরে আসে, তারপর উল্টো দিকে যায়, আবার ফেরে।" },
  { c: "স্থির অবস্থানের দুই পাশে এই আসা-যাওয়াই দোলন গতি।" }
], function (t, S) {
  const X = ROAD.LAB.X, { L, TH0, TAU, T, PX, PY, PZ } = F1010;
  const tPush = S.A(1) + 0.2, tRel = S.E(1) - 0.2;
  let th = 0;
  if (t >= tPush && t < tRel) th = TH0 * ease(pr(t, tPush, tPush + 1.0));
  if (t >= tRel) th = TH0 * Math.exp(-(t - tRel) / TAU) * Math.cos(2 * Math.PI * (t - tRel) / T);
  const P = W3.frame({ cam: W3.labCam.pebble(), lab: { pebble: th } });
  const at = (deg, r) => [X + PX + r * Math.sin(deg * Math.PI / 180), PY - r * Math.cos(deg * Math.PI / 180), PZ];
  let s = '', u = '';
  s += path3(P, [[X + PX, PY, PZ], [X + PX, PY - L - 0.12, PZ]], '#0f1b3d', 4, '10 10', 0.7 * S.fin(0));
  if (t >= tRel) {
    const pts = []; for (let k = 0; k <= 30; k++) pts.push(at(-TH0 + 2 * TH0 * k / 30, L + 0.03)); s += path3(P, pts, '#0f1b3d', 5, '3 12', 0.8);
    const [a1, b1] = P(...at(TH0 - 6, L + 0.08)), [a2, b2] = P(...at(TH0 + 4, L + 0.08)), [c1, d1] = P(...at(-TH0 + 6, L + 0.08)), [c2, d2] = P(...at(-TH0 - 4, L + 0.08));
    s += `<g opacity="${S.fin(2).toFixed(2)}">` + arrow2(a1, b1, a2, b2, 1) + arrow2(c1, d1, c2, d2, 1) + `</g>`;
    const [rx, ry] = P(X + PX + 0.1, PY - L + 0.12, PZ); u += lab(rx + 60, ry, 'স্থির অবস্থান', 'rest', S.fin(2));
  }
  // the hand that pushes the pebble aside, then draws back (real size ≈ 17 cm)
  if (t >= S.A(1) - 0.4 && t < tRel + 1.0) {
    const pb = at(th, L + 0.026), k = pxpm(P, pb);
    let off = 0.032, ho = 1;
    if (t < tPush) { const p = ease(pr(t, S.A(1) - 0.4, tPush)); off = 0.032 + 0.12 * (1 - p); ho = p; }
    if (t >= tRel) { const p = ease(pr(t, tRel, tRel + 1.0)); off = 0.032 + 0.16 * p; ho = 1 - p; }
    const hp = t >= tRel ? at(TH0, L + 0.026) : pb, [hx, hy] = P(hp[0] - off, hp[1], hp[2] + 0.02);
    s += handPush(hx, hy, 0.17 * k / 235, ho);
  }
  u += figTag('চিত্র ১০.১০: স্পন্দন গতি', S.fin(0));
  if (t >= S.A(3)) u += lab(1500, 360, 'দোলন গতি', 'move', S.P(3, 0.55, 0.75));
  return { gl: true, svg: s, ui: u };
});
