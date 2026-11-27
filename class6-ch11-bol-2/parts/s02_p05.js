/* ২ঙ: drawn */
part('s02_p05', { scene: 2, label: '২ঙ', title: "সমাধান করা উদাহরণ",
  screen: "ধাঁধার দণ্ড, সংখ্যা: ৪০ কেজি, ৩০ ও ১২০ সেমি।" }, [
  { c: "একটা উদাহরণ দেখি। ভার ৪০ কেজির, ভারবাহু ৩০ সেন্টিমিটার, বলবাহু ১২০ সেন্টিমিটার।" },
  { c: "বল গুণ ১২০ সমান ৪০ গুণ ৩০। তাই বল মাত্র ১০ কেজি ভারের সমান। যান্ত্রিক সুবিধা ৪।" },
  { c: "ধাঁধার উত্তরও এখানেই। ঠেস কাছে আনলে ভারবাহু ছোট, বলবাহু বড়। তাই বল কমে।" }
], function (t, S) {
  /* the hook's rod with numbers: 40 kg stone, load arm 30 cm, effort arm 120 cm: effort = 40 x 30 / 120 = 10 kg-weight */
  lvSet(1.20, 0.30);
  const th = lvTilt(0.5), P = W3.frame({ cam: C11.lever(), lever: th, hands: lvHands2(th), sun: [-14, 34, 26] });
  let s = '', u = '';
  const [sx, sy] = P(...lvStone(th)), pm = pxpm(P, [LV.X, 0.2, LV.Z]), q = u0 => P(...lvPt(th, u0, -0.10)), o = S.P(0, 0.2, 0.5);
  const [ax, ay] = q(-LV.A), [cx, cy] = q(0), [bx, by] = q(LV.B);
  s += `<g opacity="${cl(o * 2).toFixed(2)}" stroke-linecap="round"><line x1="${F(ax)}" y1="${F(ay)}" x2="${F(cx)}" y2="${F(cy)}" stroke="${Y}" stroke-width="10"/><line x1="${F(cx)}" y1="${F(cy)}" x2="${F(bx)}" y2="${F(by)}" stroke="#7fd1ff" stroke-width="10"/></g>`;
  u += lab((ax + cx) / 2 - 20, (ay + cy) / 2 + 60, 'বলবাহু ১২০ সেমি', 'move', o) + lab((cx + bx) / 2 + 40, (cy + by) / 2 + 70, 'ভারবাহু ৩০ সেমি', 'move', o) + lab(sx, sy - 0.22 * pm, 'ভার ৪০ কেজি', 'name', S.P(0, 0.05, 0.2));
  if (t >= S.A(1) && t < S.A(2)) { const p1 = S.P(1, 0.05, 0.2), p2 = S.P(1, 0.4, 0.55), p3 = S.P(1, 0.7, 0.85);
    u += `<div class="abs" style="left:0;width:1920px;top:150px;display:flex;justify-content:center"><div class="qcard" style="width:1150px;font-size:58px;line-height:1.45;transform:scale(${back(p1).toFixed(3)});opacity:${cl(p1 * 3).toFixed(2)}">বল × ১২০ = ৪০ × ৩০<br><span style="opacity:${cl(p2 * 3).toFixed(2)}">বল = ১০ কেজির ভার</span><br><span style="opacity:${cl(p3 * 3).toFixed(2)}">যান্ত্রিক সুবিধা = ৪০ ÷ ১০ = <b>৪</b></span></div></div>`; }
  if (t >= S.A(2)) u += card('ঠেস কাছে &nbsp;→&nbsp; ভারবাহু ছোট, বলবাহু বড় &nbsp;→&nbsp; বল কম', S.P(2, 0.3, 0.5), 1, 150, 1400, 54);
  return { gl: true, svg: s, ui: u };
});
