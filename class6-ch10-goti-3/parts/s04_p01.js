/* ৪ক: Lubaba walks 15 m north (left) in 10 s, real time, 1.5 m/s */
part('s04_p01', { scene: 4, label: '৪ক', first: true, title: "লুবাবার বেগ",
  screen: "3D মাঠ, পাশ থেকে। \"লুবাবা\" লেখা চোখ উত্তর দিকে আসল সময়ে ১০ সেকেন্ডে ১৫ মিটার যায়; সেকেন্ড ও মিটার গণনা, উত্তরমুখী নীল তীর। হিসাব ১৫ ÷ ১০ = ১.৫। শব্দ-কার্ড: বেগ (Velocity)।" }, [
  { c: "লুবাবা সোজা উত্তর দিকে হাঁটছে। ১০ সেকেন্ডে সে গেল ১৫ মিটার।" },
  { c: "১৫ ভাগ ১০, মানে সেকেন্ডে দেড় মিটার, উত্তর দিকে।" },
  { c: "নির্দিষ্ট দিকে এই দ্রুতিকেই বলে বেগ।" },
  { c: "বেগ বলতে গেলে মানের সাথে দিকটাও বলতে হবে।" },
  { d: 1.2 }
], function (t, S) {
  const X = Z3.LX, z = Z3.LZ[0], tA = 0.8, sec = cl(t - tA, 0, 10), d = 1.5 * sec, P = W3.frame({ cam: C3.lane15(), sun: ANI.SUN });
  let s = nsHeadSvg(), u = '';
  s += path3(P, [[X + 15, 0.02, z], [X + 15 - d, 0.02, z]], Y, 11, '') + dot3(P, [X + 15, 0.02, z], '#fff', 13);
  const [sx, sy] = P(X + 15, 0.02, z); u += lab(sx + 20, sy + 60, 'শুরু', 'name');
  const ob = placed(P, X + 15 - d, 1.4, z, 0.02, 'লুবাবা'); s += ob.svg; u += ob.ui;
  if (d > 0.1 && sec < 10) { const [ax, ay] = P(X + 15 - d, 0.02, z); s += arrow2(ax - 80, ay - 120, ax - 250, ay - 120, 1, BLUE); }
  u += readout(60, 360, 'সময়', BNF(Math.floor(sec + 1e-6)) + ' সে.', 1) + readout(1430, 360, 'পথ', BNF(d, d % 1 ? 1 : 0) + ' মি.', 1);
  if (t >= S.A(1)) u += eqn(`১৫ ÷ ১০ = ${yel('১.৫ মি./সে., উত্তর দিকে')}`, pr(t, Math.max(tA + 10, S.A(1)), Math.max(tA + 10, S.A(1)) + 0.5), 800, 52);
  if (t >= S.A(2)) u += termCard('বেগ', 'Velocity', S.P(2, 0.4, 0.6), 1 - S.P(3, 0.1, 0.2), 960, 400, 0.8);
  if (t >= S.A(3)) u += lab(700, 420, '<span style="font-size:56px">মান: ১.৫ মি./সে.</span>', 'move', S.P(3, 0.25, 0.4)) + lab(1250, 420, '<span style="font-size:56px">দিক: উত্তর</span>', 'move', S.P(3, 0.5, 0.65));
  return { gl: true, svg: s, ui: u };
});
