/* ৩ক: the ceiling fan of your room in a city flat (village example comes in ৩গ). The camera tilts from the window
   (buildings outside) up to the fan. Three marks on one blade at 0.2, 0.4 and 0.58 m from the axis; each draws its own
   circle (2πr: 1.26 m, 2.51 m, 3.64 m per turn), the outer one the largest. Fan shown slowed: 60°/s. */
part('s03_p01', { scene: 3, label: '৩ক', first: true, title: "শহরের ফ্ল্যাটে সিলিং ফ্যান: ঘূর্ণন গতি",
  screen: "3D, শহরের ফ্ল্যাটে তোমার ঘর: জানালায় বাইরের দালান, তারপর ক্যামেরা ওপরে পাখার দিকে। একটা ব্লেডে কেন্দ্রের কাছে, মাঝে আর কিনারে তিনটি দাগ; প্রতিটি দাগ নিজের বৃত্ত আঁকে, কিনারেরটা সবচেয়ে বড়। কোণে \"ধীর করে দেখানো\"। শব্দ-কার্ড: ঘূর্ণন গতি / Rotational motion।" }, [
  { c: "শহরের ফ্ল্যাটে তোমার ঘরের সিলিং ফ্যানটা আবার দেখো।" },
  { c: "পাখার ব্লেডে তিনটা দাগ দিলাম: কেন্দ্রের কাছে, মাঝখানে, আর কিনারে।" },
  { c: "বলো তো, কোন দাগটা এক পাকে সবচেয়ে বেশি পথ যায়?", d: 4.4 },
  { c: "প্রতিটা দাগ কেন্দ্রের চারদিকে একটা বৃত্ত আঁকছে। কিনারের দাগের বৃত্তটা সবচেয়ে বড়।" },
  { c: "বস্তুর প্রতিটি বিন্দু যখন একটা কেন্দ্রের চারদিকে বৃত্তাকার পথে চলে, তাকে বলে ঘূর্ণন গতি।" }
], function (t, S) {
  const R = ROAD.ROOM, X = R.X, Fn = R.FAN, W = 60, fan = 20 + W * t;
  const win = { pos: [X - 0.6, 1.6, 1.2], look: [X - 1.7, 1.7, -2.5], fov: 42 };
  const cam = W3.mix(win, W3.roomFan(), ease(S.P(0, 0.35, 1)));
  const P = W3.frame({ cam, room: { fan, pend: 7 * Math.sin(2 * Math.PI * t / 1.14), sec: 1300 + Math.floor(t), drawer: 0, marks: t >= S.A(1) } });
  let s = '', u = '';
  if (t < S.A(1)) u += lab(960, 200, 'শহরের ফ্ল্যাট', 'name', S.fin(0) * (1 - S.P(0, 0.6, 0.8)));
  const fy = Fn[1] - 0.48 - 0.025, radii = [0.2, 0.4, 0.58], cols = ['#2e86de', Y, '#e63946'];
  if (t >= S.A(3)) {
    radii.forEach((r, i) => { const p = S.P(3, i * 0.1, 0.45 + i * 0.1), pts = [];
      for (let k = 0; k <= Math.round(96 * p); k++) { const a = -(fan * Math.PI / 180) - 2 * Math.PI * p * (1 - k / Math.max(1, Math.round(96 * p))); pts.push([X + Fn[0] + r * Math.cos(a), fy, Fn[2] - r * Math.sin(a)]); }
      s += path3(P, pts, cols[i], 6, '2 10', p > 0 ? 1 : 0); });
    const [lx, ly] = P(X + Fn[0] + 0.58, fy, Fn[2] + 0.62);
    u += lab(lx + 60, ly + 70, 'সবচেয়ে বড় বৃত্ত', 'move', S.P(3, 0.6, 0.75));
  }
  if (t >= S.A(2) && t < S.A(3)) u += lab(960, 820, '?', 'move', S.P(2, 0.3, 0.45));
  if (t >= S.A(1)) u += speedNote('ধীর করে দেখানো', S.fin(1));
  if (S.on(4)) u += termCard('ঘূর্ণন গতি', 'Rotational motion', S.P(4, 0.7, 0.82), 1, 960, 760, 0.8);
  return { gl: true, svg: s, ui: u };
});
