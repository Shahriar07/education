/* ২চ: drawn */
part('s02_p06', { scene: 2, label: '২চ', last: true, title: "গ্রামের ঢেঁকি, শহরের নিক্তি",
  screen: "গ্রাম: ঢেঁকি, পায়ের জায়গায় তীর; শহর: দোকানের নিক্তি।" }, [
  { c: "গ্রামে ঢেঁকিতে ধান ভানা হয়। এক মাথায় পায়ের চাপ দিলে অন্য মাথার ভারী মুষল উপরে ওঠে।" },
  { c: "শহরের দোকানের নিক্তিও লিভার। এর দুই বাহু সমান, তাই দুই পাশে সমান ভার হলে দাঁড়ি সোজা থাকে।" }
], function (t, S) {
  let s = '', u = '', P;
  if (t < S.A(1)) {
    /* ঢেঁকি: rest tilt 0.06 rad (pestle in the mortar); each press tilts it to 0.35 rad in 0.8 s and back */
    const q = Math.max(0, t - 1.2), ph = (q % 1.8) / 1.8, k = q > 0 ? Math.sin(Math.PI * ph) : 0, th = 0.06 + 0.29 * k, rising = q > 0 && ph < 0.5;
    P = W3.frame({ cam: C11.dheki(), dheki: th, sun: [-14, 34, 26] });
    const pt = (x, y) => P(...rotPt([DK.X, DK.PH, DK.Z], th, x, y, 0.07)), [fx, fy] = pt(-DK.PIV + 0.12, 0.06), [cx, cy] = P(DK.X, DK.PH, DK.Z + 0.07), [hx, hy] = pt(DK.L - DK.PIV - 0.12, 0.08);
    if (rising) s += arrow2(fx, fy - 150, fx, fy - 10, 1);
    u += lab(fx - 40, fy - 200, 'পায়ের চাপ', 'move', S.P(0, 0.25, 0.4)) + lab(hx - 170, hy + 60, 'ভারী মুষল', 'name', S.P(0, 0.5, 0.6));
    s += ringDot(cx, cy, S.P(0, 0.1, 0.25)); u += lab(cx, cy + 90, 'ফালক্রাম', 'name', S.P(0, 0.1, 0.25)) + lab(1640, 170, 'ঢেঁকি', 'name');
  } else {
    /* নিক্তি: equal arms, 1 kg sugar against a 1 kg weight: the beam settles level (a damped swing after the sugar is put in) */
    const q = Math.max(0, t - S.A(1) - 0.4), th = -0.16 * Math.exp(-q / 1.4) * Math.cos(2 * Math.PI * q / 1.5);
    P = W3.frame({ cam: C11.nikti(), nikti: th });
    const [lx, ly] = P(NK.X - NK.ARM, NK.Y + 0.33, 0.15), [cx, cy] = P(NK.X, NK.Y + 0.33, 0.15), [rx, ry] = P(NK.X + NK.ARM, NK.Y + 0.33, 0.15), o = S.P(1, 0.45, 0.6);
    s += `<g opacity="${cl(o * 2).toFixed(2)}" stroke-linecap="round" stroke-width="10"><line x1="${F(lx)}" y1="${F(ly - 40)}" x2="${F(cx)}" y2="${F(cy - 40)}" stroke="${Y}"/><line x1="${F(cx)}" y1="${F(cy - 40)}" x2="${F(rx)}" y2="${F(ry - 40)}" stroke="${Y}"/></g>`;
    u += lab(cx, cy - 110, 'দুই বাহু সমান', 'move', o);
    const [px, py] = P(NK.X - NK.ARM, NK.Y + 0.08, 0.15), [qx, qy] = P(NK.X + NK.ARM, NK.Y + 0.08, 0.15);
    u += lab(px - 40, py + 70, 'চিনি ১ কেজি', 'name', S.P(1, 0, 0.1)) + lab(qx + 40, qy + 70, 'বাটখারা ১ কেজি', 'name', S.P(1, 0, 0.1)) + lab(1640, 170, 'দোকানের নিক্তি', 'name');
  }
  return { gl: true, svg: s, ui: u };
});
