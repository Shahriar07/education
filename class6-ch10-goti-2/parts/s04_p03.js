/* ৪গ: two things that go to both sides of one position, at real speed.
   Left (2D panel, the clock is flat on a wall): wall-clock pendulum, L = 0.25 m, T = 2π√(L/g) = 1.00 s, θ0 = 7°.
   Right (3D, village yard, seen from a raised three-quarter view so the forward-and-back swing reads clearly):
   swing with 2.0 m ropes, T = 2.84 s, θ0 = 18°, slowly dying (τ = 40 s). θ = θ0 e^(−t/τ) sin(2πt/T). */
const OSC = { G: 9.8, L1: 0.25, A1: 7, L2: 2.0, A2: 18, TAU2: 40 };
OSC.T1 = 2 * Math.PI * Math.sqrt(OSC.L1 / OSC.G); OSC.T2 = 2 * Math.PI * Math.sqrt(OSC.L2 / OSC.G);

part('s04_p03', { scene: 4, label: '৪গ', title: "দোলক ও দোলনা: দোলন গতি",
  screen: "আসল গতিতে। বাঁয়ে একটা প্যানেলে কাঠের বাক্সে দেয়ালঘড়ির দোলক দোলে, মাঝে খাড়া ডটেড রেখা আর দুই পাশে তীর। ডানে 3D গ্রামের উঠান, একটু ওপর থেকে কোনাকুনি: বাঁশের দুই কাঠামোয় আড়া, দুই দড়িতে পিঁড়ি; দোলনা সামনে-পেছনে দোলে, পিঁড়ির পথে ডটেড বাঁকা দাগ, দুই প্রান্তে তীর, স্থির অবস্থানে খাড়া ডটেড রেখা। শব্দ-কার্ড: দোলন গতি বা স্পন্দন গতি / Oscillatory or vibratory motion।" }, [
  { c: "দেয়ালঘড়ির দোলকটা একটা জায়গার দুই পাশে যায় আর আসে।" },
  { c: "উঠানের দোলনাও তাই।" },
  { c: "কোনো বস্তু যখন একটা অবস্থানের দুই পাশে সমানভাবে আসা-যাওয়া করে, তাকে বলে দোলন গতি বা স্পন্দন গতি।", d: 8.6 }
], function (t, S) {
  const { A1, A2, T1, T2, TAU2 } = OSC;
  const th1 = A1 * Math.sin(2 * Math.PI * t / T1);
  const th2 = A2 * Math.exp(-t / TAU2) * Math.sin(2 * Math.PI * t / T2);
  const P = W3.frame({ cam: W3.yardSwing(), swing: th2 });
  // right: the swing's paths, from the 3D geometry (seat 2.0 m below the beam, beam 2.45 m up)
  const SW = ROAD.SWING, L = SW.L, H = SW.H, seat = a => [SW.X, H - (L + 0.02) * Math.cos(a), SW.Z + (L + 0.02) * Math.sin(a)];
  let s = '';
  const arc = []; for (let k = 0; k <= 30; k++) arc.push(seat((-A2 + 2 * A2 * k / 30) * Math.PI / 180));
  s += path3(P, arc, Y, 6, '3 12', S.fin(1) + (t < S.A(1) ? 0.6 : 0));
  s += path3(P, [[SW.X, H, SW.Z], [SW.X, -0.0, SW.Z]].map(p => [p[0], Math.max(p[1], 0.05), p[2]]), '#0f1b3d', 4, '8 10', 0.7);
  if (t >= S.A(1)) {
    const tipA = seat((A2 + 4) * Math.PI / 180), inA = seat((A2 - 6) * Math.PI / 180), tipB = seat(-(A2 + 4) * Math.PI / 180), inB = seat(-(A2 - 6) * Math.PI / 180);
    const [a1, b1] = P(...inA), [a2, b2] = P(...tipA), [c1, d1] = P(...inB), [c2, d2] = P(...tipB);
    s += `<g opacity="${S.fin(1).toFixed(2)}">` + arrow2(a1, b1 + 60, a2, b2 + 60, 1) + arrow2(c1, d1 + 60, c2, d2 + 60, 1) + `</g>`;
  }
  // left: a panel with the wall clock (flat on its wall, so it is clear from the front)
  s += `<rect x="0" y="0" width="840" height="1080" fill="#e9dbbd"/><rect x="836" y="0" width="8" height="1080" fill="#0f1b3d" opacity=".5"/>`;
  const CX = 420, CY = 330, sc = 1.1;
  s += pendulumClock(CX, CY, sc, th1, 25 + t);
  s += `<line x1="${CX}" y1="${CY + 120 * sc}" x2="${CX}" y2="${CY + 470 * sc}" stroke="#f2c230" stroke-width="4" stroke-dasharray="8 10" opacity=".9"/>`;
  s += `<g opacity="${S.fin(0).toFixed(2)}">` + arrow2(CX - 30, CY + 520 * sc, CX - 130, CY + 520 * sc - 18, 1) + arrow2(CX + 30, CY + 520 * sc, CX + 130, CY + 520 * sc - 18, 1) + `</g>`;
  const [rx, ry] = P(SW.X, 0.2, SW.Z);
  let u = lab(CX, 190, 'দেয়ালঘড়ির দোলক', 'name', S.fin(0)) + lab(1380, 150, 'উঠানের দোলনা', 'name', S.fin(1));
  if (t >= S.A(1)) u += lab(rx + 40, ry + 90, 'স্থির অবস্থান', 'rest', S.P(1, 0.3, 0.6));
  if (S.on(2)) u += termCard('দোলন গতি বা স্পন্দন গতি', 'Oscillatory or vibratory motion', S.P(2, 0.45, 0.6), 1, 960, 540, 0.8);
  return { gl: true, svg: s, ui: u };
});
