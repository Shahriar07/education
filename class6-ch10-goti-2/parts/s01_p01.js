/* ১ক: hook. 3D: your study room in a city flat, seen from the open side like a stage. The fan turns (shown slowed),
   the wall-clock pendulum swings (L = 0.25 m in a clock drawn 1.3× = 0.325 m, T = 2π√(L/g) = 1.14 s, θ0 = 7°), the second
   hand ticks once a second, and a hand pulls the drawer out 0.25 m (speeds up, steady, slows: trap()). "তুমি" sits at the
   table (labelled eye). */
const HOOK = { FAN_W: 90, TH0: 7, T: 2 * Math.PI * Math.sqrt(0.25 * 1.3 / 9.8), DRAW: 0.25 };
function hookRoom(t, drawer) {
  return { fan: 40 + HOOK.FAN_W * t, pend: HOOK.TH0 * Math.sin(2 * Math.PI * t / HOOK.T), sec: 1250 + Math.floor(t), drawer };
}

part('s01_p01', { scene: 1, label: '১ক', first: true, title: "তোমার ঘরে নানা গতি",
  screen: "3D। শহরের ফ্ল্যাটে তোমার পড়ার ঘর, সামনের খোলা দিক থেকে একটু ওপরে; জানালা দিয়ে বাইরের দালান। টেবিলের সামনে \"তুমি\" লেখা চোখ। সিলিং ফ্যান ঘোরে, দেয়ালঘড়ির দোলক দোলে, সেকেন্ডের কাঁটা এগোয়, একটা হাত টেবিলের ড্রয়ার টেনে খোলে। ক্যামেরা ধীরে ঘরের দিকে এগোয়।" }, [
  { c: "ধরো, বিকেলবেলা তুমি তোমার ঘরে পড়তে বসেছ।" },
  { c: "মাথার ওপর পাখা ঘুরছে।" },
  { c: "দেয়ালঘড়ির দোলকটা একবার এদিকে যায়, একবার ওদিকে। কাঁটাটা টিক টিক করে এগোচ্ছে।" },
  { c: "তুমি টেবিলের ড্রয়ারটা টেনে খুললে।" },
  { c: "ঘরের সবকিছুই এখন গতিশীল।" }
], function (t, S) {
  const R = ROAD.ROOM, X = R.X, T = R.TABLE;
  const tp = S.A(3) + 0.5, dr = trap(t - tp, HOOK.DRAW, 1.4, 0.35);
  const c0 = W3.roomWide(), c1 = { pos: [c0.pos[0], c0.pos[1] - 0.05, c0.pos[2] - 0.5], look: c0.look, fov: c0.fov };
  const P = W3.frame({ cam: W3.mix(c0, c1, ease(t / S.dur)), room: hookRoom(t, dr) });
  let s = '', u = '';
  const ob = placed(P, X + T[0] - 0.1, 1.35, T[2] + 0.95, 0.5, 'তুমি', S.fin(0));
  s += ob.svg; u += ob.ui;
  // the hand on the drawer knob during sentence 4
  if (t >= S.A(3)) {
    const [kx, ky] = P(X + T[0], T[1] - 0.095, T[2] + 0.33 + dr);
    s += gripHand(kx + 14, ky + 30, 0.42, 1);
    void kx;
  }
  const tag = (x3, y3, z3, txtS, p) => { const [x, y] = P(x3, y3, z3); return lab(x, y, txtS, 'name', p); };
  u += tag(X + R.FAN[0] + 0.9, R.FAN[1] - 0.42, R.FAN[2], 'পাখা', S.P(1, 0.1, 0.3));
  u += tag(X + R.CLOCK[0] + 0.55, R.CLOCK[1] - 0.2, R.CLOCK[2], 'দোলক', S.P(2, 0.1, 0.25));
  u += tag(X + T[0] + 0.55, T[1] - 0.25, T[2] + 0.4, 'ড্রয়ার', S.P(3, 0.1, 0.25));
  if (t >= S.A(4)) u += lab(1250, 520, 'সবকিছুই গতিশীল', 'move', S.P(4, 0.1, 0.3));
  return { gl: true, svg: s, ui: u };
});
