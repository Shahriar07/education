/* ৫খ: drawn */
part('s05_p02', { scene: 5, label: '৫খ', title: "অনড় কপিকল ও পতাকা",
  screen: "অনড় কপিকল; দড়ি নিচে, বালতি উপরে, সমান পথ; চিত্র ১১.১৩ পতাকা।" }, [
  { c: "অনড় কপিকলে ব্লক স্থির, শুধু চাকা ঘোরে। দড়ির এক মাথায় বালতি, অন্য মাথা তুমি নিচের দিকে টানো।" },
  { c: "দড়ি যতটা টানো, বালতি ততটাই ওঠে। বল কমে না, শুধু দিক বদলায়। নিচে টানা তো উপরে তোলার চেয়ে সহজ, কারণ শরীরের ভারও কাজে লাগে।" },
  { c: "পতাকা তোলার কপিকলও এমন। খুঁটির মাথায় চাকা, দড়ি টানো নিচে, পতাকা ওঠে উপরে।" }
], function (t, S) {
  /* fixed pulley: rope pulled down 0.6 m, the bucket rises 0.6 m; the two arrows are equal (force not reduced, only turned).
     Then the flag pole: rope down 2.6 m, flag up 2.6 m */
  const dash = (pts, c = '#fff', o = 1) => o > 0 ? `<polyline points="${pts.map(p => F(p[0]) + ',' + F(p[1])).join(' ')}" fill="none" stroke="${c}" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round" opacity="${cl(o).toFixed(2)}"/>` : '';
  const bar = (a, b, c, o) => o > 0 ? `<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="${cl(o * 2).toFixed(2)}"/>` : '';
  let s = '', u = '', P;
  if (t < S.A(2)) { const W = TL.WELL, d = t < S.A(1) ? 0.3 * ease(S.P(0, 0.4, 0.95)) : 0.3 + 0.3 * ease(S.P(1, 0, 0.6)), hy3 = 1.35 - d + 0.08;
    P = W3.frame({ cam: C11.well(), well: d, hands: [H3.grip([W.X + W.PR, hy3, 0], [0, -1, 0], [1, 0, 0], 'gripD')], sun: [-14, 34, 26] });
    const [rx, ry] = P(W.X + W.PR, 1.35 - d + 0.05, 0), [bx, by] = P(W.X - W.PR, 0.05 + d + 0.12, 0), o = S.P(0, 0.3, 0.45);
    s += arrow2(rx + 70, ry - 20, rx + 70, ry + 150, o) + arrow2(bx - 80, by + 80, bx - 80, by - 90, o, '#7fd1ff'); u += lab(rx + 220, ry + 60, 'টানো নিচে', 'move', o) + lab(bx - 250, by, 'ওঠে উপরে', 'move', o);
    if (t >= S.A(1)) u += card('বল কমে না, শুধু দিক বদলায়', S.P(1, 0.1, 0.3), 1, 150, 1000, 58); u += lab(1640, 170, 'অনড় কপিকল', 'name'); }
  else { const d = 2.6 * ease(S.P(2, 0.3, 0.95)); P = W3.frame({ cam: C11.flag(), flag: d, sun: [-14, 34, 26] });
    const [px, py] = P(FL.X + 0.01, 1.6, 0), [fx, fy] = P(FL.X + 0.63, 1.3 + d + 0.35, 0), [wx, wy] = P(FL.X + 0.07, FL.H + 0.02, 0), o = S.P(2, 0.25, 0.4);
    s += arrow2(px - 60, py - 60, px - 60, py + 110, o) + arrow2(fx + 130, fy + 60, fx + 130, fy - 110, o, '#7fd1ff'); u += lab(px - 220, py + 20, 'দড়ি টানো নিচে', 'move', o) + lab(fx + 300, fy - 20, 'পতাকা ওঠে উপরে', 'move', o) + lab(wx + 130, wy, 'কপিকল', 'name', S.P(2, 0.05, 0.2)); }
  return { gl: true, svg: s, ui: u };
});
