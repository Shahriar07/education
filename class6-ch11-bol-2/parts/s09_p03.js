/* ৯গ: drawn */
part('s09_p03', { scene: 9, label: '৯গ', last: true, title: "অধ্যায় শেষ, পরের ভিডিও",
  screen: "অধ্যায় শেষের ব্যানার; পরের ভিডিও: অধ্যায় ১২, পৃথিবীর উৎপত্তি ও গঠন।" }, [
  { c: "বল ও সরল যন্ত্র অধ্যায় এখানেই শেষ। যন্ত্র যত সরলই হোক, কাজ সহজ করে কৌশলে বল খাটিয়ে।" },
  { c: "পরের ভিডিওতে নতুন অধ্যায়: পৃথিবীর উৎপত্তি ও গঠন। পৃথিবী কীভাবে তৈরি হলো, ভেতরে কী আছে? দেখা হবে!" }
], function (t, S) {
  /* chapter end, then the next chapter: the Earth cut open (crust, mantle, outer and inner core), lit from the left (the Sun
     is off to the left), its right half in shadow; layer radii in proportion: crust thin, mantle to 0.55, outer core 0.55 to 0.19 */
  let s = '', u = '';
  if (t < S.A(1)) { s = bg(NAVY); u += banner('অধ্যায় শেষ', S.P(0, 0.02, 0.12), 1, 150);
    u += `<div class="abs" style="left:260px;width:1400px;top:380px;text-align:center;color:#fff;font-size:60px;font-weight:700;line-height:1.5;opacity:${cl(S.P(0, 0.2, 0.4) * 2).toFixed(2)}">যন্ত্র যত সরলই হোক,<br>কাজ সহজ করে ${yel('কৌশলে বল খাটিয়ে')}</div>`; }
  else { s = bg('#060b1e'); for (let i = 0; i < 90; i++) { const x = (i * 977) % 1920, y = (i * 613) % 1080; s += `<circle cx="${x}" cy="${y}" r="${1 + (i % 3)}" fill="#fff" opacity="${0.3 + (i % 5) * 0.12}"/>`; }
    const cx = 1350, cy = 560, R = 300, o = S.P(1, 0.05, 0.25), w = 0.7 + 0.3 * ease(S.P(1, 0.3, 0.6));
    s += `<defs><radialGradient id="ea" cx="0.3" cy="0.4" r="0.8"><stop offset="0" stop-color="#4a9be0"/><stop offset="0.6" stop-color="#1f5fa8"/><stop offset="1" stop-color="#0b2448"/></radialGradient><linearGradient id="nt" x1="0" y1="0" x2="1" y2="0"><stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.65"/></linearGradient></defs>`;
    let e = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#ea)"/><path d="M${cx - 200},${cy - 150} q60,-60 130,-20 q40,40 -10,90 q-60,30 -120,-10 z M${cx - 60},${cy + 80} q70,-30 120,20 q10,70 -60,90 q-60,-20 -60,-110 z" fill="#5f9a4e" opacity="0.9"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#nt)"/>`;
    const wedge = (r, c) => `<path d="M${cx},${cy} L${cx + r},${cy} A${r},${r} 0 0,0 ${F(cx + r * Math.cos(-Math.PI / 2 * w))},${F(cy + r * Math.sin(-Math.PI / 2 * w))} Z" fill="${c}"/>`;
    e += wedge(R, '#8a5a30') + wedge(R * 0.97, '#e07b39') + wedge(R * 0.55, '#f2b33a') + wedge(R * 0.19, '#fff2b0');
    s += grp(o, e); u += banner('পরের ভিডিও', S.P(1, 0.02, 0.12), 1, 150) + lab(560, 470, big('অধ্যায় ১২'), 'move', S.P(1, 0.15, 0.3)) + lab(560, 570, big('পৃথিবীর উৎপত্তি ও গঠন'), 'name', S.P(1, 0.25, 0.4)) + lab(560, 690, big('ভেতরে কী আছে?'), 'move', S.P(1, 0.5, 0.65)); }
  return { svg: s, ui: u, noChip: t >= S.A(1) };
});
