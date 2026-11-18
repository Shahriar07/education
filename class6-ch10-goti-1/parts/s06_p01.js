/* ৬ক: the textbook's three-friends activity (p. 84), done with a car (approved): who is where, from outside.
   Car: far lane, +x, uniform 8 m/s. The camera follows it until the friend standing by the road comes into view. */
const F2 = { x: 46, z: -4.1 };   // the friend standing on the footpath
part('s06_p01', { scene: 6, label: '৬ক', first: true, title: 'কে কোথায়: গাড়িতে দুই বন্ধু, রাস্তায় এক বন্ধু',
  screen: '3D, বাইরে থেকে। সোজা রাস্তায় একটা লাল গাড়ি সমান বেগে চলে। গাড়ির পেছনের সিটে দুটো নাম-লেখা চোখ: "তুমি" ও "পাশের বন্ধু"। রাস্তার পাশের ফুটপাতে আরেকটা চোখ: "দাঁড়ানো বন্ধু"। (বইয়ের কাজে সাইকেল ছিল; আঁকতে চালক লাগে বলে গাড়ি দিয়ে করা।)' }, [
  { c: "কেন এমন হয়? বইয়ের একটা কাজ গাড়ি দিয়ে করে দেখি।" },
  { c: "ধরো, তুমি আর তোমার এক বন্ধু গাড়ির পেছনের সিটে পাশাপাশি বসে আছ।" },
  { c: "গাড়িটা সোজা রাস্তায় সমান বেগে চলছে।" },
  { c: "আর তোমাদের আরেক বন্ধু রাস্তার পাশে এক জায়গায় দাঁড়িয়ে আছে।" }
], function (t, S) {
  const R = ROAD, xc = F2.x - 8 + R.V_CAR * (t - S.A(3));          // the car reaches 8 m before the friend as the last sentence starts
  const camX = Math.min(xc, F2.x - 8);
  const P = W3.frame({ cam: W3.third(camX), car1: { x: xc } });
  let s = '', u = '';
  const o1 = S.fin(1, 0.5);
  if (o1 > 0) {
    const [ax, ay] = P(xc + R.CAR_YOU.dx, 1.2, R.LANE_Z + R.CAR_W / 2); const a = observer(ax, ay, 'তুমি', o1, 0.28); s += a.svg; u += a.ui;
    const b = placed(P, xc + R.CAR_FRIEND.dx, 3.2, R.LANE_Z + R.CAR_FRIEND.dz, 1.45, 'পাশের বন্ধু', o1); s += b.svg; u += b.ui;
  }
  if (S.on(2)) { const [a1, b1] = P(xc + R.CAR_L / 2 + 0.3, 0.7, R.LANE_Z), [a2] = P(xc + R.CAR_L / 2 + 0.3 + R.V_CAR * 0.5, 0.7, R.LANE_Z); s += arrow2(a1, b1, a2, b1, S.fin(2, 0.4)); }
  const f = placed(P, F2.x, 4.0, F2.z, 1.7, 'দাঁড়ানো বন্ধু', S.fin(3, 0.5)); s += f.svg; u += f.ui;
  return { gl: true, svg: s, ui: u };
});
