/* ৩খ: চিত্র ১০.৭ and its activity in a 3D school field (bare earth). A bamboo pole stands firmly in the ground; you
   (labelled eye, 1.45 m up) go round it holding it with one hand, at arm's length RW = 0.65 m and a walking speed of
   1.0 m/s (one turn every 2πRW/v = 4.1 s). Your path on the ground is drawn as it grows: a circle round the pole. */
const POLE = { RW: 0.65, V: 1.0 };

part('s03_p02', { scene: 3, label: '৩খ', title: "চিত্র ১০.৭: বাঁশের খুঁটির চারদিকে",
  screen: "3D স্কুলের মাঠ (মাটির মাঠ, পেছনে স্কুল ভবন), একটু ওপর থেকে। মাটিতে পোঁতা বাঁশের খুঁটি, গোড়ায় পিন \"স্থির\"। \"তুমি\" লেখা চোখ খুঁটির চারদিকে ঘোরে; মাটিতে বৃত্তের দাগ বাড়তে থাকে, কেন্দ্রে খুঁটি। চিত্র-লেবেল: চিত্র ১০.৭: ঘূর্ণনগতি।" }, [
  { c: "স্কুলের মাঠে একটা বাঁশের খুঁটি শক্ত করে পোঁতা।" },
  { c: "এক হাতে খুঁটি ধরে তুমি এর চারদিকে ঘুরছ।" },
  { c: "খুঁটিটা থাকে মাঝখানে, এক জায়গায়। তুমি ঘুরছ তার চারপাশে।" },
  { c: "তুমি চলছ খুঁটিকে কেন্দ্র করে একটা বৃত্তে। এটাও ঘূর্ণন গতি।" }
], function (t, S) {
  const Fd = ROAD.FIELD, px = Fd.X + Fd.POLE[0], pz = Fd.POLE[2], { RW, V } = POLE, W = V / RW;
  const P = W3.frame({ cam: W3.fieldPole() });
  const t0 = S.A(1) + 0.3, ph = 1.2 + W * Math.max(0, t - t0);        // your angle round the pole (rad), start in front-right
  const ex = px + RW * Math.cos(ph), ez = pz + RW * Math.sin(ph);
  let s = '', u = '';
  if (t > t0) { const pts = []; const n = Math.min(160, Math.round((ph - 1.2) / (2 * Math.PI) * 120) + 1); for (let k = 0; k <= n; k++) { const a = 1.2 + (ph - 1.2) * k / n; pts.push([px + RW * Math.cos(a), 0.02, pz + RW * Math.sin(a)]); } s += path3(P, pts, Y, 8, '2 12'); }
  // the pole stays where it is
  const [bx, by] = P(px, 0, pz); s += pin(bx, by, 0.9, S.P(2, 0.05, 0.3) + (t >= S.A(3) ? 1 : 0));
  if (t >= S.A(2)) u += lab(bx - 110, by + 30, 'স্থির', 'rest', S.P(2, 0.15, 0.35));
  // you: labelled eye at 1.45 m (no hand drawn at the pole)
  if (t >= S.A(1) - 0.4) {
    const ob = placed(P, ex, 1.45, ez, 0.02, 'তুমি', S.fin(1, 0.4) + (t >= S.A(1) ? 1 : 0));
    s += ob.svg; u += ob.ui;
  }
  u += figTag('চিত্র ১০.৭: ঘূর্ণনগতি', S.fin(0));
  if (t >= S.A(3)) u += lab(1400, 640, 'ঘূর্ণন গতি', 'move', S.P(3, 0.55, 0.7));
  return { gl: true, svg: s, ui: u };
});
