/* ৩খ: the same minute for both: 80 m and 50 m, on two chalk lanes to one scale */
part('s03_p02', { scene: 3, label: '৩খ', title: "এক মিনিটের পথ",
  screen: "একই স্কেলে দুটি সোজা পথ, পাশ থেকে 3D। ঘড়িতে এক মিনিট চলে; রবিন ৮০ মিটার, শাহীন ৫০ মিটার। ভাগের হিসাব ফুটে ওঠে।" }, [
  { c: "উপায় সহজ। দেখো, দুজনে একই সময়ে কে কতটা যায়। ধরো, ১ মিনিটে।" },
  { c: "রবিন: ১৬০০ ভাগ ২০, মানে মিনিটে ৮০ মিটার।" },
  { c: "শাহীন: ২০০০ ভাগ ৪০, মানে মিনিটে ৫০ মিটার।" },
  { c: "তাই রবিনই বেশি দ্রুত।" }
], function (t, S) {
  const t0 = S.A(0) + 1.2, sec = 60 * pr(t, t0, S.A(2) + 0.5), X = Z3.LX, P = W3.frame({ cam: C3.lanes() }), dR = 80 * sec / 60, dS = 50 * sec / 60;
  let s = '', u = speedNote('দ্রুত করে দেখানো', 1);
  [[0, dR, 'রবিন'], [2, dS, 'শাহীন']].forEach(([i, d, n]) => { const z = Z3.LZ[i]; s += path3(P, [[X, 0.03, z], [X + d, 0.03, z]], Y, 9, ''); const o = placed(P, X + d, i ? 4 : 7, z, 0.03, n); s += o.svg; u += o.ui;
    const [x0, y0] = P(X, 0, z); u += lab(x0 + 10, y0 + (i ? 52 : -52), 'শুরু', 'name', pr(d, 12, 16)); });
  s += clock(960, 225, 88, sec); u += lab(960, 350, BNF(Math.floor(sec)) + ' সেকেন্ড', 'move');
  u += eqn(`রবিন: ১৬০০ ÷ ২০ = ${yel('মিনিটে ৮০ মি.')}`, S.P(1, 0.2, 0.35), 690, 48).replace('left:0;width:1920px', 'left:30px;width:930px') + eqn(`শাহীন: ২০০০ ÷ ৪০ = ${yel('মিনিটে ৫০ মি.')}`, S.P(2, 0.2, 0.35), 690, 48).replace('left:0;width:1920px', 'left:960px;width:930px');
  if (t >= S.A(3)) { u += qTop('রবিন বেশি দ্রুত', S.P(3, 0.05, 0.3), 800, 56); s += tick(1290, 860, 34, S.P(3, 0.3, 0.6)); }
  return { gl: true, svg: s, ui: u };
});
