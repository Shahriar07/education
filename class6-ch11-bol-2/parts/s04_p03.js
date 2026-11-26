/* ৪গ: drawn */
part('s04_p03', { scene: 4, label: '৪গ', title: "চারপাশের হেলানো তল",
  screen: "উঁচু সেতুর ঢালু রাস্তা, ছাদের সিঁড়ি।" }, [
  { c: "এজন্যই উঁচু সেতুতে ওঠার রাস্তা আর ছাদে ওঠার সিঁড়ি খাড়া না বানিয়ে হেলানো বানানো হয়।" },
  { c: "একই উচ্চতায় তলের দৈর্ঘ্য যত বেশি, যান্ত্রিক সুবিধাও তত বেশি।" }
], function (t, S) {
  /* the bridge ramp (10 m long, 2.5 m up: advantage 4) and the stairs (4.4 m along the slope, 2.5 m up: advantage 1.8) */
  const dash = (pts, c = '#fff', o = 1) => o > 0 ? `<polyline points="${pts.map(p => F(p[0]) + ',' + F(p[1])).join(' ')}" fill="none" stroke="${c}" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round" opacity="${cl(o).toFixed(2)}"/>` : '';
  const bar = (a, b, c, o) => o > 0 ? `<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="${cl(o * 2).toFixed(2)}"/>` : '';
  const P = W3.frame({ cam: C11.bridge(), yard: true, sun: [-14, 34, 26] });
  let s = '', u = '';
  const rh = Math.sqrt(BR.RL * BR.RL - BR.H * BR.H), [ax, ay] = P(BR.X - rh / 2, BR.H / 2 + 0.6, -3), [sx, sy] = P(BR.X + 5.8, BR.H / 2 + 0.9, -3);
  u += lab(ax - 60, ay - 40, 'সেতুর ঢালু রাস্তা', 'name', S.P(0, 0.1, 0.25)) + lab(sx - 150, sy - 40, 'ছাদে ওঠার সিঁড়ি', 'name', S.P(0, 0.4, 0.55));
  if (t >= S.A(1)) { const o = S.P(1, 0.1, 0.3); u += lab(ax - 60, ay + 50, 'উচ্চতা ২.৫ মি, দৈর্ঘ্য ১০ মি: সুবিধা ৪', 'move', o) + lab(sx - 150, sy + 50, 'উচ্চতা ২.৫ মি, দৈর্ঘ্য ৪.৪ মি: সুবিধা ১.৮', 'move', S.P(1, 0.35, 0.55));
    u += card('উচ্চতা একই, দৈর্ঘ্য বেশি &nbsp;→&nbsp; সুবিধা বেশি', S.P(1, 0.6, 0.8), 1, 150, 1200, 56); }
  return { gl: true, svg: s, ui: u };
});
