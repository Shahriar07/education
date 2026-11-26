/* ৬গ:  */
part('s06_p03', { scene: 6, label: '৬গ', title: "পাঁচ উপায়: এক, দুই, তিন",
  screen: "3D, একে একে, বাঁয়ে সংখ্যা। সাঁড়াশি পেরেক চেপে ধরে: হাতের ছোট তীর, মুখের বড় তীর। শাবল ভারী পাথর তোলে: হাতের ছোট তীর, ভারের বড় তীর। অনড় কপিকলে দড়ি নিচে, বালতি উপরে: দুই উল্টো তীর।" }, [
  { c: "সরল যন্ত্র পাঁচভাবে সাহায্য করে। এক, বল কয়েকগুণ বাড়ায়।" },
  { c: "যেমন সাঁড়াশি। হাতলে অল্প চাপ দিলে, মুখটা পেরেককে অনেক জোরে চেপে ধরে।" },
  { c: "দুই, কম বলে কাজ সারে। খালি হাতে যে পাথর নড়ে না, শাবলের মাথায় অল্প চাপেই তা উঠে আসে।" },
  { c: "তিন, সুবিধাজনক দিকে বল দিতে দেয়। যেমন কপিকল।" },
  { c: "দড়ি টানো নিচের দিকে, বালতি ওঠে উপরে।" }
], function (t, S) {
  let s = '', u = '', P; const head = (n, w) => badge(150, 230, n, 1) + '', hd = (w) => lab(470, 230, big(w), 'move');
  if (t < S.A(2)) { const sq = ease(S.P(1, 0.15, 0.55)), a = 0.42 - 0.16 * sq; P = W3.frame({ cam: C11.bench(TL.X - 0.47, 24), pin: a, sun: [-14, 34, 26] });
    const ad = (r, sgn) => { const ang = sgn * a / 2, x = PINP[0] + r * Math.cos(Math.PI - ang) * 1, y = PINP[1] + r * Math.sin(ang); return P(PINP[0] - r * Math.cos(ang), PINP[1] + r * Math.sin(ang) * -1 * -1, PINP[2]); }; void ad;
    const pt = (r, side) => { const ang = side * a / 2; return P(PINP[0] - r * Math.cos(-ang), PINP[1] + r * Math.sin(-ang), PINP[2]); };
    const f = S.P(1, 0.3, 0.45), Fh = 60, [hx1, hy1] = pt(-TL.PIN.H * 0.75, 1), [hx2, hy2] = pt(-TL.PIN.H * 0.75, -1), [jx1, jy1] = pt(TL.PIN.J, 1), [jx2, jy2] = pt(TL.PIN.J, -1);
    s += arrow2(hx1, hy1 - 20 - Fh, hx1, hy1 - 20, f) + arrow2(hx2, hy2 + 20 + Fh, hx2, hy2 + 20, f) + arrow2(jx1 - 30, jy1 - 30 - Fh * 5, jx1 - 30, jy1 - 30, f, RED) + arrow2(jx2 - 30, jy2 + 30 + Fh * 5, jx2 - 30, jy2 + 30, f, RED);
    s += handPin(P, a); u += lab(hx1 + 140, hy1 - 70, 'হাতের চাপ', 'move', f) + lab(jx1 - 220, jy1 - 160, big('৫ গুণ জোরে'), 'move', f) + lab(1640, 170, 'সাঁড়াশি', 'name'); s += head(1); u += hd('বল কয়েকগুণ বাড়ায়'); }
  else if (t < S.A(3)) { const k = ease(S.P(2, 0.3, 0.8)), th = lvTilt(k); P = W3.frame({ cam: C11.lever(), lever: th, iron: true, sun: [-14, 34, 26] }); s += lvHand(P, th, 1);
    const [hx, hy] = P(...lvPt(th, -LV.A)), [sx, sy] = P(...lvStone(th)), pm = pxpm(P, [LV.X, 0.2, LV.Z]), W = LV.M * LV.G, N = 0.62;
    s += arrow2(hx, hy + pm * 0.075, hx, hy + pm * 0.075 + lvForce(th) * N) + arrow2(sx, sy, sx, sy + W * N, 1, RED); u += lab(hx - 150, hy + 150, 'অল্প চাপ', 'move') + lab(sx + 200, sy + 120, 'পাথরের ভার', 'move') + lab(1640, 170, 'শাবল', 'name'); s += head(2); u += hd('কম বলে কাজ'); }
  else { const d = t < S.A(4) ? 0 : 0.6 * ease(S.P(4, 0.05, 0.9)); P = W3.frame({ cam: C11.well(), well: d, sun: [-14, 34, 26] }); const W = TL.WELL, [rx, ry] = P(W.X + W.PR, 1.35 - d + 0.05, 0), [bx, by] = P(W.X - W.PR, 0.05 + d + 0.12, 0), pm = pxpm(P, [W.X, 1, 0]);
    s += handGrip(rx, ry, 90, pm); if (t >= S.A(4)) { const o = S.P(4, 0.1, 0.25); s += arrow2(rx + 60, ry - 40, rx + 60, ry + 130, o) + arrow2(bx - 70, by + 60, bx - 70, by - 110, o, '#7fd1ff'); u += lab(rx + 200, ry + 50, big('টানো নিচে'), 'move', o) + lab(bx - 230, by - 30, big('ওঠে উপরে'), 'move', o); }
    u += lab(1640, 170, 'কপিকল', 'name'); s += head(3); u += hd('সুবিধার দিকে বল'); }
  return { gl: true, svg: s, ui: u };
});
