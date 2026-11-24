/* ৭গ: creative 1: periodic motion and the pendulum first (T = 2 pi sqrt(0.25 / 9.8) = 1.00 s), then three friends on three lanes: 1500 m / 15 min, 1800 / 20, 2100 / 30 (1 m of lane = 25 m) */
part('s07_p03', { scene: 7, label: '৭গ', title: "হিন্ট: সৃজনশীল ১",
  screen: "তিনটি সমান্তরাল পথ, শেষে স্কুল। \"ফাতিমা\", \"খাদিজা\", \"আয়েশা\" লেখা চোখ একই সময়-রেখায় চলে: ১৫০০ মি ১৫ মিনিট, ১৮০০ মি ২০ মিনিট, ২১০০ মি ৩০ মিনিট। পাশে দোলক দোলে। উত্তর দেখানো হয় না।" }, [
  { c: "সৃজনশীল প্রশ্ন এক। পর্যাবৃত্ত গতির হিন্ট: একই পথ, বারবার।" },
  { c: "দেয়ালঘড়ির দোলক? দেখো, মাঝের অবস্থানের কোন কোন পাশে যায়।" },
  { d: 1.5 },
  { c: "ফাতিমা, খাদিজা, আয়েশার দ্রুতি চাইলে সবার এক মিনিটের পথ বের করো, তারপর মেলাও।" },
  { d: 2.0 }
], function (t, S) {
  let s = '', u = '';
  if (t < S.A(3)) { s = bg(NAVY); const th = 14 * Math.cos(2 * Math.PI * t / 1.003); s += pendulumClock(960, 390, 0.95, th, t * 1); u += banner('সৃজনশীল প্রশ্ন ১', S.P(0, 0.02, 0.15), 1, 30).replace('left:0;width:1920px', 'left:900px;width:1000px').replace('font-size', 'x');
    u += lab(420, 400, 'পর্যাবৃত্ত গতি', 'name', S.P(0, 0.4, 0.55)) + lab(420, 480, '<span style="font-size:50px">একই পথ, বারবার</span>', 'move', S.P(0, 0.65, 0.8)); if (t >= S.A(1)) u += lab(1500, 400, 'দোলক', 'name', S.P(1, 0.05, 0.2)) + lab(1500, 480, '<span style="font-size:50px">মাঝের কোন কোন পাশে?</span>', 'move', S.P(1, 0.4, 0.55)); return { svg: s, ui: u }; }
  const P = W3.frame({ cam: C3.lanes() }), X = Z3.LX, min = 30 * pr(t, S.A(3) + 0.6, S.E(4) - 0.8);
  [['ফাতিমা', 1500, 15], ['খাদিজা', 1800, 20], ['আয়েশা', 2100, 30]].forEach(([n, D, T], i) => { const z = Z3.LZ[i], d = D / 25 * Math.min(1, min / T); s += path3(P, [[X, 0.03, z], [X + d, 0.03, z]], Y, 9, ''); const o = placed(P, X + d, 2.5 + (2 - i) * 8.5, z, 0.03, n); s += o.svg; u += o.ui; });
  u += readout(60, 150, 'সময়', BNF(Math.floor(min)) + ' মিনিট', 1) + speedNote('দ্রুত করে দেখানো', 1);
  u += `<div class="abs" style="left:60px;top:290px"><div class="vs" style="font-size:40px;display:block">ফাতিমা: ১৫০০ মি., ১৫ মিনিট<br>খাদিজা: ১৮০০ মি., ২০ মিনিট<br>আয়েশা: ২১০০ মি., ৩০ মিনিট</div></div>`;
  u += hintCard('সবার ১ মিনিটের পথ বের করে মেলাও', S.P(3, 0.45, 0.6), 820);
  return { gl: true, svg: s, ui: u };
});
