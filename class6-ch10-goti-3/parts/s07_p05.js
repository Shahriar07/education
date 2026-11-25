/* ৭ঙ: short questions: ceiling fan with marked points, a rolling rim (no slipping), and the two kinds of quantity */
part('s07_p05', { scene: 7, label: '৭ঙ', last: true, title: "হিন্ট: সংক্ষিপ্ত প্রশ্ন",
  screen: "তিন ভাগে 3D: সিলিং ফ্যানের ব্লেডে দাগ, গড়ানো চাকা, উল্টো দিকে দুই তীর। প্রতিটির নিচে হিন্ট-কার্ড।" }, [
  { c: "সংক্ষিপ্ত প্রশ্ন। সিলিং ফ্যান: একটা বিন্দুতে দাগ দাও, দেখো কোন পথে যায়, আবার ফেরে কি না।" },
  { d: 1.5 },
  { c: "সাইকেলের চাকা: চাকা একসাথে কয়টা কাজ করে?" },
  { d: 1.5 },
  { c: "দ্রুতি ও বেগের পার্থক্য: কার দিক আছে, কার নেই? কোনটা দূরত্ব থেকে, কোনটা সরণ থেকে?" },
  { d: 1.5 }
], function (t, S) {
  let s = '', u = '', P;
  if (t < S.A(2)) { P = W3.frame({ cam: W3.roomFan(), room: { fan: 60 * t, marks: true } }); u += qTop('সিলিং ফ্যানের গতি কোন ধরনের?', S.P(0, 0.02, 0.1), 160, 52) + hintCard('বিন্দুটা কোন পথে যায়? আবার ফেরে কি?', S.P(0, 0.4, 0.55), 800) + speedNote('ধীর করে দেখানো', 1); }
  else if (t < S.A(4)) { const V = ROAD.VIL, R = ROAD.RIM.R, q = t - S.A(2), x0 = V.X - 2.9, x = x0 + 0.55 * q; P = W3.frame({ cam: W3.yardRim(), rim: { x } }); const pt = []; for (let k = 0; k <= 80; k++) { const xx = x0 + (x - x0) * k / 80, th = -xx / R; pt.push([xx - 0 + R * Math.sin(th), R + 0.016 - R * Math.cos(th), ROAD.RIM.Z]); } s += path3(P, pt, Y, 6, '2 10'); u += qTop('সাইকেলের চাকার গতি কেন জটিল গতি?', S.P(2, 0.02, 0.2), 160, 52) + hintCard('চাকা একসাথে কয়টা কাজ করে?', S.P(2, 0.4, 0.6), 290); }
  else { const V = 4, q = t - S.A(4), xa = -4 + V * q; P = W3.frame({ cam: W3.third(10), car1: { x: xa, z: ROAD.LANE_Z, dir: 1 } }); const [a, b] = P(xa + 2.4, 0.8, ROAD.LANE_Z); s += arrow2(a + 10, b, a + 190, b, 1, BLUE); u += qTop('দ্রুতি ও বেগের দুটি পার্থক্য কী?', S.P(4, 0.02, 0.15), 160, 52) + hintCard('কার দিক আছে? কোনটা সরণ থেকে আসে?', S.P(4, 0.4, 0.55), 800); }
  return { gl: true, svg: s, ui: u };
});
