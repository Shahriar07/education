/* ৮খ: the result, 3D (rulerScene). The ruler released in ৮ক keeps vibrating (tip109; released 2.4 s before this part
   began) and dies away. Then it is slid 5 cm further out with a "?" for the viewer to try; finally the question card. */
part('s08_p02', { scene: 8, label: '৮খ', last: true, title: "নিজে করো: ফল ও প্রশ্ন",
  screen: "3D, পাশ থেকে একই টেবিল। স্কেলের মাথা ওপরে-নিচে কাঁপে, ধীরে ধীরে থামে (ধীর করে দেখানো)। তারপর স্কেল আরও খানিকটা বাইরে সরে, পাশে \"?\"। প্রশ্ন-কার্ড: \"কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও\"।" }, [
  { c: "দেখবে, স্কেলের মাথাটা দ্রুত ওপরে-নিচে কাঁপছে, তারপর ধীরে ধীরে থেমে যাচ্ছে।" },
  { c: "বাইরের অংশ আরও লম্বা রাখলে কী হয়, সেটাও দেখো।" },
  { c: "কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও।", d: 5.0 }
], function (t, S) {
  const X = ROAD.LAB.X, { L_OUT, XE, YT, Z } = F109;
  const more = 0.05 * ease(S.P(1, 0.2, 0.7));
  let tip = tip109(t + 2.4);
  if (t >= S.A(1)) tip *= 1 - pr(t, S.A(1), S.A(1) + 0.4);
  const R = rulerScene(L_OUT + more, tip, 1, null), P = R.P;
  let s = R.s, u = '';
  if (t < S.A(1)) { s += path3(P, [[X + XE - 0.02, YT + 0.003, Z], [X + XE + L_OUT + 0.08, YT + 0.003, Z]], '#0f1b3d', 4, '10 10', 0.7); u += speedNote('ধীর করে দেখানো (১৬ গুণ)', 1); }
  if (t >= S.A(1)) { const [qx, qy] = P(X + XE + L_OUT + more + 0.05, YT + 0.06, Z), [mx, my] = P(X + XE + (L_OUT + more) / 2, YT - 0.04, Z); u += lab(qx, qy, '?', 'move', S.P(1, 0.6, 0.75)) + lab(mx, my, 'আরও লম্বা', 'name', S.P(1, 0.5, 0.7)); }
  if (t >= S.A(2)) u += `<div class="abs" style="left:260px;width:1400px;top:260px;opacity:${S.fin(2).toFixed(2)}"><div class="qcard" style="font-size:64px;transform:scale(${back(S.P(2, 0, 0.25)).toFixed(3)})">কেন এমন হলো?<br><span style="font-size:52px;font-weight:600">উত্তরটা কমেন্টে লিখে জানাও</span></div></div>`;
  return { gl: true, svg: s, ui: u };
});
