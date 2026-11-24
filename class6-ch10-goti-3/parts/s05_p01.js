/* ৫ক: acceleration from the book: 20 m/s, then +5 m/s every second for 5 s (s = 20t + 2.5t²: 22.5, 50, 82.5, 120, 162.5 m). Then the marks seen from far. */
part('s05_p01', { scene: 5, label: '৫ক', first: true, title: "ত্বরণ: বেগ বাড়ছে",
  screen: "3D সোজা রাস্তা, ক্যামেরা গাড়ির সাথে পাশ থেকে। গাড়ির বেগ ২০, ২৫, ৩০, ৩৫, ৪০, ৪৫ মি/সে; প্রতি সেকেন্ডে রাস্তায় দাগ, দাগের ফাঁক বাড়ে। শব্দ-কার্ড: ত্বরণ (Acceleration)।" }, [
  { c: "বইয়ে আছে একটা মোটরসাইকেলের কথা। আমরা দেখি গাড়িতে। বেগ এখন সেকেন্ডে ২০ মিটার।" },
  { c: "চালক অ্যাকসিলারেটর চাপলেন। ১ সেকেন্ড পরে বেগ ২৫, তারপর ৩০, ৩৫, ৪০, ৪৫।" },
  { c: "রাস্তার দাগগুলো দেখো। প্রতি সেকেন্ডে গাড়িটা আগের চেয়ে বেশি পথ পার হচ্ছে।" },
  { c: "প্রতি সেকেন্ডে বেগ যতটা বাড়ে, সেটাই ত্বরণ।" },
  { d: 1.2 }
], function (t, S) {
  const tA = S.A(1) + 0.8, a = t - tA, xA = Z3.HWY + 260, x = a < 0 ? xA + 20 * a : xA + accS(a), v = a < 0 ? 20 : Math.min(45, 20 + 5 * a);
  let s = '', u = '', P;
  if (t < S.A(2)) {
    P = W3.frame({ cam: C3.hwy(x), v3: { cars: [{ x, z: -2 }] } });
    for (let k = 0; k <= 5; k++) if (a >= k) s += dot3(P, [xA + accS(k), 0.03, -2], Y, 15);
    s += arrow2(960, 560, 960 + v * 11, 560, 0, BLUE); const [cx, cy] = P(x + 2.4, 0.8, -2); s += arrow2(cx + 20, cy, cx + 20 + v * 9, cy, 1, BLUE);
    u += readout(60, 160, 'বেগ', BNF(Math.floor(v + 1e-6)) + ' মি./সে.', 1) + readout(1380, 160, 'সময়', BNF(Math.floor(cl(a, 0, 5) + 1e-6)) + ' সে.', pr(t, tA, tA + 0.3));
  } else { const M = accMarks(t, S.P(2, 0, 0.5), false, S); s = M.s; u = M.u; }
  if (t >= S.A(3)) u += termCard('ত্বরণ', 'Acceleration', S.P(3, 0.4, 0.6), 1, 960, 260, 0.75);
  return { gl: true, svg: s, ui: u };
});
