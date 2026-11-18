/* ৫খ: চিত্র ১০.৪ (সরলগতি) in the 3D lab: a wooden wedge as in the book (upright side on the left, slope down to the
   right), slope 3.0 m at θ = 27°. A carton is let go near the top and slides down: s = s0 + ½at², a = g(sinθ − μcosθ),
   μ = 0.42 → a = 0.78 m/s². Two runs; dashed ghost boxes every 0.5 s; in the second run three points draw parallel lines. */
const F104 = { TH: 27, MU: 0.42, G: 9.8, L: 3.0, BOX: 0.4, S0: 0.1, X0: 2.3, ZF: -1.02 };
F104.A = F104.G * (Math.sin(F104.TH * Math.PI / 180) - F104.MU * Math.cos(F104.TH * Math.PI / 180));
F104.SEND = F104.L - F104.BOX - 0.08; F104.TRUN = Math.sqrt(2 * (F104.SEND - F104.S0) / F104.A);

part('s05_p02', { scene: 5, label: '৫খ', title: "চিত্র ১০.৪: ঢালু তলে বাক্স",
  screen: "3D, বইয়ের মতো: কাঠের ঢালু তল (বাঁ দিকে খাড়া, ডানে নিচে নামা ঢাল), ওপরের দিকে একটা কার্টন। কার্টন পিছলে নামে, প্রতি আধা সেকেন্ডে পেছনে ডটেড ছায়া-বাক্স, ফাঁক বাড়তে থাকে। দ্বিতীয়বার নামার সময় কার্টনের তিনটি বিন্দু তিনটি সমান্তরাল সোজা দাগ আঁকে; ঢাল বরাবর তীর। চিত্র-লেবেল: চিত্র ১০.৪: সরলগতি।" }, [
  { c: "চিত্র ১০.৪। ঢালু তল বেয়ে একটা বাক্স পিছলে নামছে।" },
  { c: "বাক্সের সব বিন্দু একই দিকে, একই সরলরেখা বরাবর চলছে।" },
  { c: "এটা সরল রৈখিক গতি।", d: 3.4 }
], function (t, S) {
  const X = ROAD.LAB.X, { TH, L, BOX, S0, X0, ZF, A, SEND, TRUN } = F104;
  const th = TH * Math.PI / 180, c = Math.cos(th), sn = Math.sin(th), H0 = L * sn;
  const r1 = S.A(0) + 1.4, r2 = S.A(1) + 0.4, run = t >= r2 ? 2 : 1, t0 = run === 2 ? r2 : r1, u0 = Math.max(0, t - t0);
  const sNow = Math.min(SEND, S0 + 0.5 * A * u0 * u0);
  const P = W3.frame({ cam: W3.labCam.slope(), lab: { slide: sNow } });
  // a point of the carton's front face: fx along the slope, fy along the normal (0..1 of the box size)
  const pt = (sv, fx, fy) => [X + X0 + sv * c + BOX * (fx * c + fy * sn), H0 - sv * sn + BOX * (-fx * sn + fy * c), ZF];
  let s = '', u = '';
  for (let k = 1; k * 0.5 < Math.min(u0, TRUN); k++) { const sv = S0 + 0.5 * A * (k * 0.5) ** 2; s += path3(P, [pt(sv, 0, 0), pt(sv, 1, 0), pt(sv, 1, 1), pt(sv, 0, 1), pt(sv, 0, 0)], '#0f1b3d', 3, '10 8', 0.6); }
  if (run === 2) [[0, 0, '#e63946'], [0.5, 0.5, Y], [1, 1, '#2e86de']].forEach(([fx, fy, col]) => { s += path3(P, [pt(S0, fx, fy), pt(sNow, fx, fy)], col, 6, '2 12'); s += dot3(P, pt(sNow, fx, fy), col, 10); });
  const [ax, ay] = P(...pt(0.8, 0, 2.2)), [bx, by] = P(...pt(2.2, 0, 2.2));
  s += arrow2(ax, ay, bx, by, S.fin(1) * 0.95);
  u += figTag('চিত্র ১০.৪: সরলগতি', S.fin(0));
  if (t >= S.A(2)) u += lab(960, 300, 'সরল রৈখিক গতি', 'move', S.P(2, 0.05, 0.3));
  return { gl: true, svg: s, ui: u };
});
