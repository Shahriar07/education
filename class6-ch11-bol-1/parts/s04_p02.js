/* ৪খ:  */
part('s04_p02', { scene: 4, label: '৪খ', title: "পাঁচজন ঠেললে",
  screen: "পাঁচ জোড়া হাত; তীর যোগ হয়ে ঘর্ষণের চেয়ে বড়, গাড়ি চলে।" }, [
  { c: "এবার চার বন্ধু এল। পাঁচজন একসাথে ঠেললে।" },
  { c: "সবার বল মিলে ঘর্ষণের চেয়ে বড় হলো। মাইক্রোবাস চলতে শুরু করল!" },
  { c: "সব তীর একই দিকে, তাই বলগুলো যোগ হয়ে গেল। যত বেশি মানুষ, তত বেশি বল।" }
], function (t, S) {
  const tm = S.A(1) + 0.4, q = Math.max(0, t - tm), x = MBUS.X + MBUS.ACC * q * q / 2, v = MBUS.ACC * q, P = W3.frame({ cam: C11.mbus(x), mbus: x, sun: [-14, 34, 26] }), pm = pxpm(P, [x - 2.4, 1, MBUS.Z]), N = 0.35;
  let s = '', u = ''; const n = Math.min(5, 1 + Math.floor(S.P(0, 0.15, 0.85) * 5)), [rx, ry] = P(x - 2.4, 1.05, MBUS.Z + 0.4); s += pushHands(rx, ry, pm, n, 1, 4);
  const L1 = MBUS.ONE * N; if (t < S.A(2)) for (let i = 0; i < n; i++) s += arrow2(rx - 30 - L1, ry - 150 + i * 30, rx - 30, ry - 150 + i * 30, 1);
  else { const L = MBUS.FIVE * N, a = S.P(2, 0.05, 0.3); s += arrow2(rx - 30 - L * a, ry + 150, rx - 30, ry + 150); u += lab(rx - 30 - L / 2, ry + 215, 'পাঁচজনের বল', 'move'); }
  const [gx, gy] = P(x + 1.55, 0.02, MBUS.Z + 0.85), Lf = (q > 0 ? MBUS.RES : MBUS.FIVE * Math.min(1, n / 5)) * N; s += arrow2(gx + 20, gy + 30, gx + 20 - Math.min(Lf, MBUS.RES * N), gy + 30, 1, RED); u += lab(gx - 70, gy + 95, 'ঘর্ষণ', 'move');
  if (v > 0.02) { const [mx, my] = P(x, 2.2, MBUS.Z); s += arrow2(mx - 80, my - 20, mx - 80 + 400 * v, my - 20, 1, '#7fd1ff'); u += lab(mx - 160, my - 20, 'চলছে', 'name'); }
  return { gl: true, svg: s, ui: u };
});
