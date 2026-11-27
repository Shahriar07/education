/* ৩ক: drawn */
part('s03_p01', { scene: 3, label: '৩ক', first: true, title: "লিভারের তিন শ্রেণি",
  screen: "তিনটি 3D নকশা: ফালক্রাম, ভার, বল কোথায়।" }, [
  { c: "ফালক্রাম, ভার আর বল কোথায় আছে, তা দেখে লিভার তিন রকম।" },
  { c: "প্রথম শ্রেণিতে ফালক্রাম মাঝখানে। যেমন কাঁচি, সাঁড়াশি, নলকূপের হাতল আর ঢেঁকি।" },
  { c: "দ্বিতীয় শ্রেণিতে ভার মাঝখানে। যেমন জাঁতি, এক চাকার ঠেলাগাড়ি আর বোতল খোলার যন্ত্র।" },
  { c: "তৃতীয় শ্রেণিতে বল মাঝখানে। যেমন চিমটা।" }
], function (t, S) {
  /* three classes as clean diagrams: where the fulcrum (triangle), the load (red box, its weight down) and the effort
     (yellow arrow) are; the one in the middle glows */
  let s = bg(NAVY), u = '';
  u += lab(960, 150, big('কোনটা মাঝখানে?'), 'name', S.P(0, 0.1, 0.3));
  const row = (i, y, o, kind) => {
    if (o <= 0) return; const x0 = 190, x1 = 790, xm = (x0 + x1) / 2, pos = { f: kind === 1 ? xm : x0 + 30, l: kind === 2 ? xm : x1 - 50, e: kind === 3 ? xm : (kind === 1 ? x0 + 30 : x1 - 30) };
    if (kind === 1) pos.e = x0 + 30; const mid = kind === 1 ? pos.f : kind === 2 ? pos.l : pos.e, up = kind !== 1;
    let g = `<g opacity="${cl(o).toFixed(2)}"><circle cx="${F(mid)}" cy="${F(y)}" r="62" fill="none" stroke="${Y}" stroke-width="7" stroke-dasharray="14 9"/>`;
    g += `<rect x="${x0}" y="${y - 9}" width="${x1 - x0}" height="18" rx="6" fill="#c08a52" stroke="#1a1a2e" stroke-width="4"/>`;
    g += `<polygon points="${F(pos.f)},${F(y + 9)} ${F(pos.f - 34)},${F(y + 70)} ${F(pos.f + 34)},${F(y + 70)}" fill="#8a5a2e" stroke="#1a1a2e" stroke-width="4"/>`;
    g += `<rect x="${F(pos.l - 36)}" y="${F(y - 75)}" width="72" height="66" rx="6" fill="#a8492c" stroke="#1a1a2e" stroke-width="4"/>`;
    g += `</g>` + arrow2(pos.l + 55, y - 60, pos.l + 55, y + 50, o, '#ff6b5e') + (up ? arrow2(pos.e, y + 110, pos.e, y + 14, o, Y) : arrow2(pos.e, y - 110, pos.e, y - 14, o, Y));
    s += g;
  };
  const names = ['প্রথম শ্রেণি: ফালক্রাম মাঝখানে', 'দ্বিতীয় শ্রেণি: ভার মাঝখানে', 'তৃতীয় শ্রেণি: বল মাঝখানে'], ex = ['কাঁচি, সাঁড়াশি, নলকূপের হাতল, ঢেঁকি', 'জাঁতি, এক চাকার ঠেলাগাড়ি, বোতল খোলার যন্ত্র', 'চিমটা'];
  [0, 1, 2].forEach(i => { const o = S.P(1 + i, 0, 0.2), y = 330 + i * 225; row(i, y, o, i + 1);
    if (o > 0) u += `<div class="abs" style="left:880px;top:${y - 70}px;width:960px;opacity:${cl(o).toFixed(2)};color:#fff"><div style="font-size:54px;font-weight:700;color:${Y}">${names[i]}</div><div style="font-size:44px;font-weight:600">${ex[i]}</div></div>`; });
  return { svg: s, ui: u };
});
