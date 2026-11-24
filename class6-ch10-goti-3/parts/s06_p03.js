/* ৬গ: speed-limit sign 40 km/h = 11.1 m/s: the car brakes from 20 to 11.1 m/s at 4 m/s² (34.6 m, 2.2 s), then the three cases side by side */
part('s06_p03', { scene: 6, label: '৬গ', title: "গতিসীমা মেনে চলা",
  screen: "3D রাস্তার পাশে গতিসীমার সাইন; গাড়ি কাছে এসে মন্দনে আস্তে হয়, সবুজ টিক। তারপর তিন ঘটনার ছবি পাশাপাশি।" }, [
  { c: "তাই অনেক রাস্তায় যানবাহনের গতিসীমা ঠিক করা থাকে। সাইন দেখে চালক বেগ কমালেন, মানে মন্দন হলো।" },
  { c: "বাঁকে, সরু রাস্তায়, সেতুতে গতি কমাতেই হবে।" },
  { c: "বড় হয়ে তুমি অতিরিক্ত বেগে গাড়ি চালাবে না, অন্যকেও নিষেধ করবে।" }
], function (t, S) {
  let s = '', u = '';
  if (t < S.A(1)) { const t1 = 2.2, V1 = 40 / 3.6, T = (20 - V1) / 4, d1 = 20 * T - 2 * T * T, sx = Z3.HWY + Z3.SIGN, q = t - t1, x = sx - 18 - d1 + (q < 0 ? 20 * q : q < T ? 20 * q - 2 * q * q : d1 + V1 * (q - T)), v = q < 0 ? 20 : Math.max(V1, 20 - 4 * q);
    const cam = C3.sign(); const P = W3.frame({ cam: { pos: [Math.min(cam.pos[0], x - 4), cam.pos[1], cam.pos[2]], look: [Math.min(cam.look[0], x + 9), cam.look[1], cam.look[2]], fov: cam.fov }, v3: { cars: [{ x, z: -2 }] } });
    const [a, b] = P(sx, 3.3, -5.4); if (a > 100 && a < 1800) u += lab(a - 20, b - 50, 'গতিসীমা ৪০ কিমি/ঘণ্টা', 'name', pr(t, 1.0, 1.4));
    u += readout(60, 160, 'বেগ', BNF(v) + ' মি./সে.', 1) + lab(1560, 200, 'মন্দন', 'move', pr(t, t1, t1 + 0.4)); s += tick(1730, 300, 42, pr(t, t1 + T + 0.3, t1 + T + 0.8));
    return { gl: true, svg: s, ui: u }; }
  s = bg(NAVY);
  ['রাস্তার বাঁক', 'সরু রাস্তা', 'সেতু'].forEach((n, i) => { const p = S.P(1, 0.02 + i * 0.25, 0.2 + i * 0.25), x = 110 + i * 580, cx = x + 270, r = 'stroke="#59616b" stroke-linecap="butt" fill="none"', w = 'stroke="#fff" stroke-width="5" stroke-dasharray="22 18" fill="none"', off = -F(t * 40); let d = '';
    if (i === 0) { const pth = `M${x + 60} 440 H${cx} Q${cx + 130} 440 ${cx + 130} 600`; d = `<path d="${pth}" ${r} stroke-width="110"/><path d="${pth}" ${w} stroke-dashoffset="${off}"/>`; }
    if (i === 1) d = `<path d="M${x + 60} 490 H${x + 480}" ${r} stroke-width="60"/><path d="M${x + 60} 490 H${x + 480}" ${w} stroke-dashoffset="${off}"/><rect x="${x + 60}" y="440" width="420" height="16" fill="#b56b4a"/><rect x="${x + 60}" y="526" width="420" height="16" fill="#b56b4a"/>`;
    if (i === 2) d = `<rect x="${x + 60}" y="520" width="420" height="80" fill="#4f93b8"/><rect x="${x + 60}" y="470" width="420" height="30" fill="#9d9a92"/>` + [0, 1, 2, 3, 4, 5].map(k => `<rect x="${x + 75 + k * 78}" y="420" width="10" height="52" fill="#f3f0e6"/>`).join('') + `<rect x="${x + 60}" y="412" width="420" height="10" fill="#f3f0e6"/><rect x="${x + 160}" y="500" width="30" height="100" fill="#8d897f"/><rect x="${x + 350}" y="500" width="30" height="100" fill="#8d897f"/>`;
    s += g(p, `<rect x="${x}" y="200" width="540" height="520" rx="36" fill="#1b2b5c" stroke="#33488c" stroke-width="4"/>${d}`) + badge(x + 70, 280, i + 1, p); u += lab(cx + 30, 280, `<span style="font-size:48px">${n}</span>`, 'move', p) + lab(cx, 660, 'গতি কমাও', 'rest', p); });
  if (t >= S.A(2)) u += eqn('অতিরিক্ত বেগে গাড়ি ' + yel('কখনো নয়'), S.P(2, 0.1, 0.25), 775, 60);
  return { svg: s, ui: u };
});
