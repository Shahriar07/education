/* ৬ক: bend, radius 32 m for the car's lane. 10 m/s: keeps the lane. 20 m/s: tyres give at most mu g = 0.7 x 9.8 = 6.86 m/s², so the tightest path has radius v²/(mu g) = 58.3 m: it leaves the road and stops on open ground (6 m/s²). */
part('s06_p01', { scene: 6, label: '৬ক', first: true, title: "ঘটনা ১: রাস্তার বাঁক",
  screen: "3D রাস্তার বাঁক, উঁচু কোণ থেকে। ধীরে চলা গাড়ি (১০ মি/সে) বাঁক ধরে যায়, সবুজ টিক। দ্রুত গাড়ি (২০ মি/সে) বাঁক ধরতে পারে না, পিছলে রাস্তার বাইরে গিয়ে থামে, লাল ক্রস। কোনো আঘাত দেখানো হয় না।" }, [
  { c: "আমাদের দেশে প্রায় প্রতিদিন সড়ক দুর্ঘটনা ঘটে। একটা বড় কারণ অতিরিক্ত বেগ।" },
  { c: "বিপদ কোথায় বেশি? ঘটনা এক, রাস্তার বাঁক।" },
  { c: "আস্তে চলা গাড়ি ঠিকমতো বাঁক নিল।" },
  { c: "কিন্তু অতিরিক্ত বেগে চললে গাড়ির ওপর চালকের নিয়ন্ত্রণ থাকে না। গাড়িটা রাস্তার বাইরে চলে গেল!" }
], function (t, S) {
  let s = '', u = '', P; const X = Z3.BEND;
  if (t < S.A(1)) { const x = Z3.HWY + 60 + 28 * t; P = W3.frame({ cam: C3.hwy(x), v3: { cars: [{ x, z: -2 }] } }); u += banner('অতিরিক্ত গতি ও ঝুঁকি', S.P(0, 0.05, 0.25), 1, 190); }
  else if (t < S.A(3)) { const c = bendSafe(-38 + 10 * (t - S.A(1))); P = W3.frame({ cam: C3.bend(), v3: { cars: [c] } }); const [ax, ay] = P(c.x, 2, c.z); u += lab(ax, ay - 40, '১০ মি./সে.', 'move', S.P(1, 0.3, 0.5)); s += tick(1650, 220, 50, S.P(2, 0.4, 0.6)); }
  else { const c = bendFast(0, t - S.A(3)), tr = []; for (let q = 0; q <= t - S.A(3); q += 0.05) { const e = bendFast(0, q); tr.push([e.x, 0.03, e.z]); } P = W3.frame({ cam: C3.bend(), v3: { cars: [c] } }); s += path3(P, tr, '#ff7a5c', 6, '3 12'); const [ax, ay] = P(c.x, 2, c.z); u += lab(ax, ay - 40, c.v > 0.1 ? BNF(c.v) + ' মি./সে.' : 'রাস্তার বাইরে!', 'move'); s += cross(1650, 220, 50, S.P(3, 0.75, 0.85)); }
  if (t >= S.A(1)) { s += badge(760, 190, 1, S.P(1, 0, 0.2)); u += lab(1000, 190, '<span style="font-size:52px">রাস্তার বাঁক</span>', 'move', S.P(1, 0.1, 0.3)); }
  return { gl: true, svg: s, ui: u };
});
