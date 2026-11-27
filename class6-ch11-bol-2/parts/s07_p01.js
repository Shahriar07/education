/* ৭ক: drawn */
part('s07_p01', { scene: 7, label: '৭ক', first: true, title: "নলকূপ আর বোতল খোলা",
  screen: "নলকূপের হাতল, বোতল খোলার যন্ত্র; ট্যাগ।" }, [
  { c: "চারপাশে তাকাও। নলকূপের হাতলের এক মাথায় নিচে চাপ দিলে অন্য মাথা উপরে ওঠে, আর পানি আসে। ফালক্রাম মাঝখানে, তাই এটা প্রথম শ্রেণির লিভার।" },
  { c: "বোতল খোলার যন্ত্রের মাথা ঢাকনার উপরে ঠেস দেয়, সেটা ফালক্রাম। আটকে থাকা ঢাকনার কিনারা ভার, আর হাতলে বল।" },
  { c: "ভার মাঝখানে, তাই এটা দ্বিতীয় শ্রেণির লিভার।" }
], function (t, S) {
  let s = '', u = '', P;
  if (t < S.A(1)) {
    /* tubewell handle (video 1's pump): pivot = fulcrum; the hand end goes down, the plunger rod on the other side goes up */
    const cyc = Math.max(0, t - 1.0), ang = 4 - 16 + 32 * (0.5 - 0.5 * Math.cos(cyc * Math.PI / 1.1)) * -1 + 16 * 0, a = -20 + 32 * (0.5 - 0.5 * Math.cos(cyc * Math.PI / 1.1)), down = Math.sin(cyc * Math.PI / 1.1) > 0 && cyc > 0;
    void ang; P = W3.frame({ cam: C11.pump(), pump: a, water: down && cyc > 0.3, sun: [-14, 34, 26] });
    const r = a * Math.PI / 180, pt = d => P(ST.TW[0] - 0.09 - d * Math.cos(r), 1.13 - d * Math.sin(r), ST.TW[1]), [gx, gy] = pt(0.62), [cx, cy] = P(ST.TW[0] - 0.09, 1.13, ST.TW[1]), [rx, ry] = P(ST.TW[0] + 0.02, 1.2, ST.TW[1]);
    if (down) s += arrow2(gx, gy - 130, gx, gy - 14, 1); u += lab(gx - 150, gy - 120, 'বল', 'name', S.P(0, 0.2, 0.3));
    s += ringDot(cx, cy, S.P(0, 0.4, 0.5)); u += lab(cx + 30, cy - 90, 'ফালক্রাম', 'name', S.P(0, 0.4, 0.5)) + lab(rx + 210, ry + 40, 'ভার: পানির নল', 'name', S.P(0, 0.55, 0.65)) + lab(1640, 170, 'নলকূপ', 'name');
    u += lab(960, 220, big('ফালক্রাম মাঝখানে: প্রথম শ্রেণি'), 'move', S.P(0, 0.75, 0.88));
  } else {
    /* bottle opener: fulcrum on the cap's far edge, the lip under the near edge 3.4 cm away, the handle end 11.8 cm away */
    const b = 0.32 * ease(S.P(1, 0.45, 0.95)) + (t >= S.A(2) ? 0 : 0); P = W3.frame({ cam: C11.bopen(), bopen: t >= S.A(2) ? 0.32 : b, sun: [-14, 34, 26] });
    const bb = t >= S.A(2) ? 0.32 : b, fx = BO.X - BO.CR, fy = WS.TY + BO.H + 0.002, q = d => P(fx + d * Math.cos(bb), fy + d * Math.sin(bb), 0.014), [cx, cy] = q(0), [lx, ly] = q(BO.LIP), [hx, hy] = q(BO.HND);
    const o1 = S.P(1, 0.05, 0.2), o2 = S.P(1, 0.2, 0.35), o3 = S.P(1, 0.35, 0.5);
    s += ringDot(cx, cy, o1); u += lab(cx - 140, cy - 80, 'ফালক্রাম', 'name', o1);
    s += arrow2(lx, ly + 20, lx, ly + 230, o2, '#ff6b5e'); u += lab(lx + 200, ly + 150, 'ঢাকনা: ভার', 'name', o2);
    s += arrow2(hx, hy + 70, hx, hy + 10, o3);   // 60 px against the cap's 210 px: 3.5 times u += lab(hx + 120, hy - 40, 'বল', 'name', o3);
    if (t >= S.A(2)) u += lab(960, 220, big('ভার মাঝখানে: দ্বিতীয় শ্রেণি'), 'move', S.P(2, 0.1, 0.25)); u += lab(1640, 170, 'বোতল খোলার যন্ত্র', 'name');
  }
  return { gl: true, svg: s, ui: u };
});
