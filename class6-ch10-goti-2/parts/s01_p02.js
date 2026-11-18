/* ১খ: the puzzle. Same room (hookRoom from ১ক). Each motion gets its path drawn from the 3D geometry: the circle of
   a blade tip, the arc of the pendulum bob, the straight line of the drawer. Then the question card. */
part('s01_p02', { scene: 1, label: '১খ', title: "প্রশ্ন: সব গতি কি একই রকম?",
  screen: "3D, একই ঘর। পাখার ব্লেডের মাথা হলুদ বৃত্ত আঁকে, দোলকের দুই পাশে বাঁকা আসা-যাওয়ার দাগ, ড্রয়ার আবার বেরিয়ে আসে আর তার পাশে সোজা তীর। প্রশ্ন-কার্ড: \"সব গতি কি একই রকম?\"" }, [
  { c: "কিন্তু একটু ভালো করে দেখো।" },
  { c: "পাখা ঘুরছে এক জায়গায় থেকেই। দোলক যাচ্ছে আর ফিরছে। ড্রয়ার সোজা বেরিয়ে আসছে।" },
  { c: "সবাই চলছে। কিন্তু সবার চলা কি একই রকম?" },
  { d: 2.0 }
], function (t, S) {
  const R = ROAD.ROOM, X = R.X, T = R.TABLE, tt = t + 17;                      // continues the hook's clock
  // the drawer goes back in during sentence 1, then comes out again in the last third of sentence 2
  const back = HOOK.DRAW * (1 - ease(S.P(0, 0.1, 0.8)));
  const tp = S.A(1) + (S.E(1) - S.A(1)) * 0.66, out = trap(t - tp, HOOK.DRAW, 1.4, 0.35);
  const dr = t < tp ? back : out;
  const P = W3.frame({ cam: W3.mix(W3.roomWide(), { pos: [X + 0.3, 1.62, 3.2], look: [X + 0.35, 1.86, -2.4], fov: 46 }, 1), room: hookRoom(tt, dr) });
  let s = '', u = '';
  const L = S.E(1) - S.A(1), p1 = S.P(1, 0.0, 0.3), p2 = S.P(1, 0.33, 0.6), p3 = S.P(1, 0.66, 0.95);
  // fan: circle of the blade tip (blade from 0.15 to 0.61 m from the axis, at blade height)
  const Fn = R.FAN, fy = Fn[1] - 0.49, rr = 0.61;
  if (p1 > 0) { const pts = []; for (let k = 0; k <= 72 * Math.min(1, p1 * 1.2); k++) { const a = k * Math.PI / 36; pts.push([X + Fn[0] + rr * Math.cos(a), fy, Fn[2] + rr * Math.sin(a)]); } s += path3(P, pts, Y, 7); }
  // pendulum: the arc of the bob between ±7° (bob 0.325 m below the pivot)
  const C = R.CLOCK, piv = [X + C[0], C[1] - 0.06 * 1.3, C[2] + 0.1], Lb = 0.325;
  if (p2 > 0) { const pts = []; for (let k = 0; k <= 20; k++) { const a = (-HOOK.TH0 + 2 * HOOK.TH0 * k / 20) * Math.PI / 180; pts.push([piv[0] + Lb * Math.sin(a), piv[1] - Lb * Math.cos(a), piv[2]]); } s += path3(P, pts, '#e63946', 7, '', p2); }
  // drawer: a straight arrow along its runners
  if (p3 > 0) { const [x1, y1] = P(X + T[0] + 0.42, T[1] - 0.1, T[2] + 0.3), [x2, y2] = P(X + T[0] + 0.42, T[1] - 0.1, T[2] + 0.3 + 0.55 * p3); s += arrow2(x1, y1, x2, y2, 1, '#7fd1ff'); }
  const tg = (x3, y3, z3, txtS, p) => { const [x, y] = P(x3, y3, z3); return lab(x, y, txtS, 'name', p); };
  u += tg(X + Fn[0] + 1.05, fy + 0.05, Fn[2], 'ঘোরে এক জায়গায়', p1) + tg(X + C[0] + 0.62, C[1] - 0.5, C[2], 'যায় আর ফেরে', p2) + tg(X + T[0] + 0.62, T[1] - 0.32, T[2] + 0.5, 'সোজা আসে', p3);
  if (t >= S.A(2)) u += card('সব গতি কি একই রকম?', S.P(2, 0.45, 0.7), 1, 160, 1100, 76);
  void L;
  return { gl: true, svg: s, ui: u };
});
