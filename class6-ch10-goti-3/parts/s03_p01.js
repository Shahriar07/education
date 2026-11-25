/* ৩ক: village path: Robin 1600 m in 20 min, Shahin 2000 m in 40 min (1 m of the model = 40 m); both steady; time runs fast */
part('s03_p01', { scene: 3, label: '৩ক', first: true, title: "রবিন ও শাহীন: কে বেশি দ্রুত?",
  screen: "3D গ্রামের পথ, উঁচু কোণ থেকে। দুটি টিনের বাড়ি, একটি স্কুল; \"রবিন\" ও \"শাহীন\" লেখা চোখ নিজ নিজ পথে স্কুলে যায়। পাশে চলমান ঘড়ি ও দূরত্ব: ১৬০০ মি, ২০ মিনিট; ২০০০ মি, ৪০ মিনিট (দ্রুত করে দেখানো)।" }, [
  { c: "গ্রামের পথে দুই বন্ধু স্কুলে যাচ্ছে। রবিন ১৬০০ মিটার গেল ২০ মিনিটে।" },
  { c: "শাহীন গেল ২০০০ মিটার, সময় লাগল ৪০ মিনিট।" },
  { c: "পথও আলাদা, সময়ও আলাদা। তাহলে কে বেশি দ্রুত গেল? একটু ভাবো।" },
  { d: 1.5 }
], function (t, S) {
  const X = Z3.VILL, min = 40 * pr(t, 1.0, S.E(1) - 0.2), fr = Math.min(1, min / 20), fs = min / 40, P = W3.frame({ cam: C3.vill() });
  const xr = X - 6 - 40 * (1 - fr), xs = X + 6 + 50 * (1 - fs); let s = '', u = speedNote('দ্রুত করে দেখানো', 1);
  s += path3(P, [[X - 46, 0.04, 1.4], [xr, 0.04, 1.4]], Y, 9, '') + path3(P, [[X + 56, 0.04, 2.6], [xs, 0.04, 2.6]], Y, 9, '');
  const a = placed(P, xr, 4.2, 1.4, 0.05, 'রবিন'), b = placed(P, xs, 4.2, 2.6, 0.05, 'শাহীন'); s += a.svg + b.svg; u += a.ui + b.ui;
  const [hx, hy] = P(X - 49, 6.2, -4), [kx, ky] = P(X + 59, 6.2, -4); u += lab(hx + 70, hy - 30, 'রবিনের বাড়ি', 'name') + lab(kx - 70, ky - 30, 'শাহীনের বাড়ি', 'name');
  s += clock(960, 285, 92, min * 60); u += lab(960, 415, BNF(Math.floor(min)) + ' মিনিট', 'move');
  u += readout(120, 800, 'রবিন', `${BNF(1600 * fr)} মি., ${BNF(Math.floor(Math.min(min, 20)))} মিনিট`, 1) + readout(1060, 800, 'শাহীন', `${BNF(2000 * fs)} মি., ${BNF(Math.floor(min))} মিনিট`, 1);
  if (t >= S.A(2)) u += qTop('কে বেশি দ্রুত গেল?', S.P(2, 0.4, 0.6), 640, 60);
  return { gl: true, svg: s, ui: u };
});
