/* ৫ঙ:  */
part('s05_p05', { scene: 5, label: '৫ঙ', title: "খাতায় আঁকো",
  screen: "খাতায় কলম-ধরা হাত চারটি আকৃতি আঁকে।" }, [
  { c: "বই তোমাকে এই ছবিগুলো আঁকতে বলেছে। ভিডিও থামিয়ে খাতায় আঁকো।" },
  { c: "প্রতিটা ছবিতে বলের তীরও দেবে। কোন দিকে বল, ভেবে দেখো।" }
], function (t, S) {
  const XL = ROAD.LAB.X, P = W3.frame({ cam: W3.labCam.khata(), lab: {}, sun: [-14, 34, 26] }), pm = pxpm(P, [XL + 5, 0.777, -3.45]);
  const kp = (u, v) => P(XL + 5 - 0.15 + u, 0.777, -3.45 - 0.09 + v);   /* (u, v) metres from the page's top-left corner, v towards you */
  /* the side outline of each shape of fig 11.2, drawn at 0.4 of its size, bottoms on one line */
  const K = 0.4, base = 0.15, cxs = [0.045, 0.11, 0.18, 0.25], modes = ['twist', 'bend', 'press', 'stretch'], O = modes.map(m => rubOutline(m));
  const pg = (j, p) => kp(cxs[j] + K * p[0], base - K * p[1]);
  let s = '', u = '', tip = null; const t0 = 0.6, T = (S.dur - t0 - 0.8) / 4;
  O.forEach((pts, j) => { const q = cl((t - t0 - j * T) / (T * 0.85)); if (q <= 0) return; const n = Math.round((pts.length - 1) * q), d = [];
    for (let i = 0; i <= n; i++) { const [x, y] = pg(j, pts[i]); d.push((i ? 'L' : 'M') + F(x) + ' ' + F(y)); }
    s += `<path d="${d.join(' ')}" fill="none" stroke="#1f2a6b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`; if (q < 1) tip = pg(j, pts[n]); });
  if (t >= S.A(1)) { const p = S.P(1, 0.1, 0.4), H = RB.H, A = (j, a, b, c, d) => { const [x1, y1] = pg(j, a), [x2, y2] = pg(j, b); return arrow2(x1, y1, x2, y2, p); };
    s += A(0, [-0.05, H], [0.03, H]) + A(0, [0.05, 0.004], [-0.03, 0.004]);
    s += A(1, [-0.075, H - 0.012], [-0.006, H - 0.012]);
    s += A(2, [0, H * 0.6 + 0.06], [0, H * 0.6 + 0.006]);
    s += A(3, [0.03, H * 1.3 - 0.01], [0.03, H * 1.3 + 0.05]) + A(3, [0.03, 0.03], [0.03, -0.035]); }
  if (tip) s += handWrite(tip[0], tip[1], pm * 0.148 / 300);
  u += lab(960, 200, big('খাতায় আঁকো'), 'move', S.P(0, 0, 0.1));
  return { gl: true, svg: s, ui: u };
});
