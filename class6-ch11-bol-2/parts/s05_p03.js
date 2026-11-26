/* ৫গ: drawn */
part('s05_p03', { scene: 5, label: '৫গ', title: "নড়নক্ষম কপিকল",
  screen: "নড়নক্ষম কপিকল; চাকা ভারের সাথে ওঠে; দুই দড়ি, অর্ধেক বল, দ্বিগুণ দড়ি।" }, [
  { c: "নড়নক্ষম কপিকলে ব্লকটা স্থির নয়। ভার ঝোলে চাকার ব্লকে, দড়ির এক মাথা উপরে বাঁধা, অন্য মাথা তুমি উপরে টানো।" },
  { c: "টানলে ভারের সাথে চাকাও উপরে ওঠে। ভার ঝোলে দুই পাশের দড়িতে, তাই টানতে হয় অর্ধেক বল।" },
  { c: "তবে দড়ি টানতে হয় দ্বিগুণ। ভার এক মিটার উঠলে দড়ি টানতে হয় দুই মিটার। কম বল, বেশি পথ।" }
], function (t, S) {
  /* movable pulley: rope tied to the beam, under the pulley, up to the free end. 20 kg sack: W = 196 N (red, 1 px/N);
     each rope side holds W/2 (yellow 98 px); the pull at the free end is W/2. Rope end up 0.8 m, sack up 0.4 m */
  const dash = (pts, c = '#fff', o = 1) => o > 0 ? `<polyline points="${pts.map(p => F(p[0]) + ',' + F(p[1])).join(' ')}" fill="none" stroke="${c}" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round" opacity="${cl(o).toFixed(2)}"/>` : '';
  const bar = (a, b, c, o) => o > 0 ? `<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="${cl(o * 2).toFixed(2)}"/>` : '';
  const d = t < S.A(1) ? 0 : 0.8 * ease(S.P(1, 0.25, 0.95)), P = W3.frame({ cam: C11.mpul(), mpul: d, sun: [-14, 34, 26] });
  let s = '', u = '';
  const yp = 1.1 + d / 2, [sx, sy] = P(MP.X, yp - 0.5, 0.2), [lx, ly] = P(MP.X - MP.R, yp + 0.3, 0), [rx, ry] = P(MP.X + MP.R, yp + 0.3, 0), [ex, ey] = P(MP.X + MP.R, MP.H + 0.4 + d, 0), [tx, ty] = P(MP.X - MP.R, MP.H - 0.06, 0);
  u += lab(tx - 200, ty, 'দড়ি এখানে বাঁধা', 'name', S.P(0, 0.2, 0.35)) + lab(sx - 260, sy, 'ভার ২০ কেজি', 'name', S.P(0, 0.4, 0.55));
  if (t >= S.A(1)) { const o = S.P(1, 0.05, 0.25); s += arrow2(sx + 120, sy - 20, sx + 120, sy + 196, o, '#ff6b5e') + arrow2(lx - 40, ly + 30, lx - 40, ly - 68, o) + arrow2(rx + 40, ly + 30, rx + 40, ly - 68, o) + arrow2(ex + 50, ey + 60, ex + 50, ey - 38, o);
    u += lab(ex + 230, ey, 'টান: অর্ধেক বল', 'move', o) + lab((lx + rx) / 2, ly + 100, 'দুই দড়ি ভাগ করে ধরে', 'move', S.P(1, 0.2, 0.35)); }
  if (t >= S.A(2)) { const o = S.P(2, 0.3, 0.5), [a0x, a0y] = P(MP.X + 0.45, MP.H + 0.4, 0), [a1x, a1y] = P(MP.X + 0.45, MP.H + 0.4 + 0.8, 0), [b0x, b0y] = P(MP.X - 0.55, 1.1 - 0.7, 0), [b1x, b1y] = P(MP.X - 0.55, 1.1 + 0.4 - 0.7, 0);
    s += bar([a0x, a0y], [a1x, a1y], Y, o) + bar([b0x, b0y], [b1x, b1y], '#7fd1ff', o); u += lab(a0x + 160, (a0y + a1y) / 2, 'দড়ি ৮০ সেমি', 'move', o) + lab(b0x - 160, (b0y + b1y) / 2, 'ভার ৪০ সেমি', 'move', o); }
  u += lab(1640, 170, 'নড়নক্ষম কপিকল', 'name');
  return { gl: true, svg: s, ui: u };
});
