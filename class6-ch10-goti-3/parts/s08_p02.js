/* ৮খ: the result is left to the student: first the 4 s run again, then a slower one (2 m in 6 s); formula as a hint, no numbers */
part('s08_p02', { scene: 8, label: '৮খ', last: true, title: "নিজে করো: হিন্ট ও প্রশ্ন",
  screen: "3D একই মেঝে: মার্বেল একবার জোরে, একবার আস্তে গড়ায়। হিন্ট-কার্ড: দূরত্ব ÷ সময়। প্রশ্ন-কার্ড: \"কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও\"।" }, [
  { c: "দ্রুতি কত হলো? হিন্ট: দূরত্বকে সময় দিয়ে ভাগ করো।" },
  { c: "এবার আরও আস্তে গড়িয়ে দাও। সময় বাড়ল, না কমল?" },
  { c: "কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও।" }
], function (t, S) {
  const slow = t >= S.A(1), q = slow ? cl(t - S.A(1) - 0.4, 0, 6) : cl(t - 0.5, 0, 4), st = slow ? marbleSlow(q) : marbleS(q), P = W3.frame({ cam: C3.marble(), lab: {}, v3: { marble: st } });
  let s = '', u = ''; const [mx, my] = P(MB.X0 + st, 0.0125, MB.Z); s += path3(P, [[MB.X0, 0.01, MB.Z], [MB.X0 + st, 0.01, MB.Z]], Y, 6, '3 12') + `<circle cx="${F(mx)}" cy="${F(my)}" r="40" fill="none" stroke="${Y}" stroke-width="6"/>`; u += lab(mx, my - 80, 'মার্বেল', 'name');
  s += clock(1640, 300, 95, q); u += lab(1640, 440, BNF(Math.floor(q + 1e-6)) + ' সে.', 'move');
  if (!slow) u += hintCard('দ্রুতি = দূরত্ব ÷ সময়', S.P(0, 0.4, 0.55), 790); else if (t < S.A(2)) u += lab(800, 220, '<span style="font-size:52px">আরও আস্তে: সময় বাড়ল, না কমল?</span>', 'move', S.P(1, 0.1, 0.3));
  if (t >= S.A(2)) u += card('কেন এমন হলো?<br><span style="font-size:52px;font-weight:600">উত্তরটা কমেন্টে লিখে জানাও</span>', S.P(2, 0, 0.2), 1, 200, 1100, 66);
  return { gl: true, svg: s, ui: u };
});
