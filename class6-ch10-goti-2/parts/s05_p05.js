/* ৫ঙ: চিত্র ১০.৮ (পর্যাবৃত্ত গতি) in 3D: a wooden table clock on the study table and the ceiling fan of your room.
   Real periods: second hand 60 s, fan ≈ 0.2 s (300 turns a minute). Shown: clock 15× faster, fan 12× slower (noted).
   Each finished turn adds to a counter; every turn takes the same time. Paths from the 3D geometry. */
const F108 = { SPEED_CLOCK: 15, T_FAN: 0.2, SLOW_FAN: 12 };

part('s05_p05', { scene: 5, label: '৫ঙ', title: "চিত্র ১০.৮: ঘড়ি ও পাখা",
  screen: "3D, তোমার ঘর: টেবিলে কাঠের টেবিলঘড়ি, ওপরে সিলিং ফ্যান। ঘড়ির সেকেন্ডের কাঁটা (দ্রুত করে দেখানো) আর পাখার একটা ব্লেডের মাথা (ধীর করে দেখানো) একই পথে ঘোরে; প্রতিটির পথ আঁকা, পাশে পাক-গণনা আর \"প্রতি পাকে ৬০ সেকেন্ড\", \"প্রতি পাকে ০.২ সেকেন্ড\"। চিত্র-লেবেল: চিত্র ১০.৮: পর্যাবৃত্ত গতি।" }, [
  { c: "চিত্র ১০.৮। একটা টেবিলঘড়ি আর একটা পাখা।" },
  { c: "ঘড়ির কাঁটা আর পাখার ব্লেড, দুটোই একই পথে বারবার ফিরে আসে।" },
  { c: "তাই দুটোই পর্যাবৃত্ত গতি।", d: 3.2 }
], function (t, S) {
  const { SPEED_CLOCK, T_FAN, SLOW_FAN } = F108, R = ROAD.ROOM, X = R.X, Fn = R.FAN, T = R.TABLE;
  const sec = 15 + t * SPEED_CLOCK, fan = 90 + 360 * t / (T_FAN * SLOW_FAN);
  const P = W3.frame({ cam: W3.roomTclock(), room: { fan, tclock: sec, sec: 1300, pend: 7 * Math.sin(2 * Math.PI * t / 1.14) } });
  let s = '', u = '';
  // table clock: face centre and the second-hand tip circle (tip 0.065 m)
  const cc = [X + T[0] - 0.42, T[1] + 0.025 + 0.135, T[2] + 0.12 + 0.054], rt = 0.065;
  if (t >= S.A(1)) { const pts = []; for (let k = 0; k <= 72; k++) { const a = k * 2 * Math.PI / 72; pts.push([cc[0] + rt * Math.sin(a), cc[1] + rt * Math.cos(a), cc[2]]); } s += path3(P, pts, '#e63946', 4, '2 8'); }
  // fan: the tip circle of blade 0 and its dot
  const cy = Fn[1] - 0.48 - 0.025, tipAt = phi => { const a = -phi * Math.PI / 180; return [X + Fn[0] + 0.58 * Math.cos(a), cy, Fn[2] - 0.58 * Math.sin(a)]; };
  if (t >= S.A(1)) { const pts = []; for (let k = 0; k <= 96; k++) pts.push(tipAt(k * 360 / 96)); s += path3(P, pts, Y, 5, '4 10'); }
  s += dot3(P, tipAt(fan), Y, 11);
  const [cx, cyy] = P(...cc), fc = P(X + Fn[0], cy, Fn[2]);
  const laps = Math.floor((sec - 15) / 60), fanLaps = Math.floor(t / (T_FAN * SLOW_FAN));
  if (t >= S.A(1)) {
    const pl = S.P(1, 0.5, 0.7);
    u += readout(cx + 90, cyy - 40, 'পাক', BN(laps), S.fin(1)) + lab(cx + 300, cyy - 110, 'প্রতি পাকে ৬০ সেকেন্ড', 'move', pl);
    u += readout(fc[0] + 300, fc[1] + 10, 'পাক', BN(fanLaps), S.fin(1)) + lab(fc[0] + 400, fc[1] + 120, 'প্রতি পাকে ০.২ সেকেন্ড', 'move', pl);
  }
  u += lab(cx + 300, cyy - 170, 'দ্রুত করে দেখানো', 'name', S.fin(0)) + lab(fc[0] + 400, fc[1] + 180, 'ধীর করে দেখানো', 'name', S.fin(0));  u += figTag('চিত্র ১০.৮: পর্যাবৃত্ত গতি', S.fin(0));
  if (t >= S.A(2)) u += lab(560, 820, 'পর্যাবৃত্ত গতি', 'move', S.P(2, 0.05, 0.3));
  return { gl: true, svg: s, ui: u };
});
