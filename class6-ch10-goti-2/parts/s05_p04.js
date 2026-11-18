/* ৫ঘ: চিত্র ১০.৬ (ঘূর্ণনগতি) in 3D: the ceiling fan of your room seen a little from below, as in the book. ক, খ, গ are on
   the three blades at 0.9, 0.62 and 0.36 of the tip radius (0.61 m): 0.55, 0.38, 0.22 m. The fan turns DANG = 55°
   (ক→ক′ …), then keeps turning at 72°/s (slowed; a real fan ≈ 1800°/s) while each point's own circle is drawn.
   A point on blade i at radius r is at centre + (r cos(aᵢ − φ), 0, −r sin(aᵢ − φ)), aᵢ = 120°·i, φ = fan angle. */
const F106 = { DANG: 55, OMEGA: 72, A0: 200, PTS: [['ক', 0, 0.55, '#e63946'], ['খ', 1, 0.38, Y], ['গ', 2, 0.22, '#2e86de']] };

part('s05_p04', { scene: 5, label: '৫ঘ', title: "চিত্র ১০.৬: পাখার ক, খ, গ",
  screen: "3D, তোমার ঘরের সিলিং ফ্যান, বইয়ের মতো একটু নিচ থেকে। তিন ব্লেডে ক, খ, গ বিন্দু, কেন্দ্র থেকে আলাদা দূরত্বে। পাখা খানিকটা ঘোরে, বিন্দুগুলো ক′, খ′, গ′-তে যায়, পেছনে বৃত্তচাপ। তারপর পাখা ঘুরতে থাকে (ধীর করে দেখানো), তিনটি আলাদা মাপের বৃত্ত পূর্ণ হয়। চিত্র-লেবেল: চিত্র ১০.৬: ঘূর্ণনগতি।" }, [
  { c: "চিত্র ১০.৬। পাখার ব্লেডে তিনটা বিন্দু: ক, খ আর গ।" },
  { c: "পাখা খানিকটা ঘুরল। ক গেল ক′-তে, খ গেল খ′-তে, গ গেল গ′-তে।" },
  { c: "প্রতিটা বিন্দু চলছে কেন্দ্রের চারদিকে আলাদা আলাদা বৃত্তে।" }
], function (t, S) {
  const { DANG, OMEGA, A0, PTS } = F106, R = ROAD.ROOM, X = R.X, Fn = R.FAN;
  const t1 = S.A(1) + 0.4, t2 = S.A(1) + 2.4;
  let ang = A0 + DANG * ease(pr(t, t1, t2));
  if (t >= S.A(2)) ang = A0 + DANG + OMEGA * (t - S.A(2));
  const P = W3.frame({ cam: W3.roomFan(), room: { fan: ang, marks2: true, pend: 0, sec: 1300 } });
  const cy = Fn[1] - 0.48 - 0.025, at = (i, r, phiDeg) => { const a = i * 2 * Math.PI / 3 - phiDeg * Math.PI / 180; return [X + Fn[0] + r * Math.cos(a), cy, Fn[2] - r * Math.sin(a)]; };
  let s = '', u = '';
  PTS.forEach(([nm, i, r, col], j) => {
    if (t >= t1) { const pts = []; const end = Math.min(ang, A0 + DANG); for (let k = 0; k <= 30; k++) pts.push(at(i, r, A0 + (end - A0) * k / 30)); s += path3(P, pts, col, 6, '2 10'); }
    if (t >= S.A(2)) { const span = Math.min(360, ang - A0 - DANG), pts = []; for (let k = 0; k <= 96; k++) pts.push(at(i, r, A0 + DANG + span * k / 96)); s += path3(P, pts, col, 6, '4 12'); }
    const [x0, y0] = P(...at(i, r, A0)), [x, y] = P(...at(i, r, ang));
    if (t >= t1) { s += `<circle cx="${F(x0)}" cy="${F(y0)}" r="12" fill="none" stroke="${col}" stroke-width="5"/>`; u += lab(x0 + (x0 < 960 ? -50 : 50), y0 - 44, nm, 'name', 1); }
    else u += lab(x + (x < 960 ? -50 : 50), y - 44, nm, 'name', S.P(0, 0.35 + j * 0.15, 0.45 + j * 0.15));
    if (t >= t1 && t < S.A(2) + 0.3) u += lab(x + (x < 960 ? -60 : 60), y + 46, nm + '′', 'move', S.P(1, 0.45 + j * 0.15, 0.55 + j * 0.15));
  });
  u += figTag('চিত্র ১০.৬: ঘূর্ণনগতি', S.fin(0));
  if (t >= S.A(2)) u += speedNote('ধীর করে দেখানো', S.fin(2));
  return { gl: true, svg: s, ui: u };
});
