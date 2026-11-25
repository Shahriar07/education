/* ৯ক: recap */
part('s09_p01', { scene: 9, label: '৯ক', first: true, title: "আজ যা শিখলাম",
  screen: "নেভি পটভূমি, ব্যানার \"আজ যা শিখলাম\"। তিনটি নম্বর দেওয়া সারি, প্রতিটির ডানে ছোট চলমান ছবি (সূর্য ও দ্রুতি, তিন কভার ও শিখা, বাল্ব-বল-চোখ)।" }, [
  { c: "আজ যা শিখলাম।" },
  { c: "এক, আলো এক প্রকার শক্তি, চলে সেকেন্ডে প্রায় তিন লক্ষ কিলোমিটার বেগে।" },
  { c: "দুই, আলো সরলরেখায় চলে; এই সরলরৈখিক পথই আলোকরশ্মি।" },
  { c: "তিন, কোনো বস্তু থেকে আলো আমাদের চোখে এলে তবেই আমরা বস্তুটি দেখি।" }
], function (t, S) {
  let s = bg(NAVY), u = banner('আজ যা শিখলাম', S.P(0, 0.05, 0.3), 1, 130);
  const rows = [`আলো ${yel9('শক্তি')}; সেকেন্ডে প্রায় ${yel9('৩ লক্ষ কিমি')}`, `আলো চলে ${yel9('সরলরেখায়')}; এই পথই ${yel9('আলোকরশ্মি')}`, `বস্তু থেকে আলো ${yel9('চোখে এলে')} তবেই দেখি`];
  rows.forEach((r, i) => { const p = S.P(i + 1, 0, 0.15); if (p <= 0) return; const top = 320 + i * 195, cx = 1670, cy = top + 78;
    u += `<div class="abs rrow" style="left:80px;width:1400px;top:${top}px;opacity:${cl(p * 2).toFixed(2)};transform:translateX(${F(-80 * (1 - ease(p)))}px)"><div class="num">${BN(i + 1)}</div><div>${r}</div></div>`;
    let d = `<rect x="${cx - 150}" y="${cy - 80}" width="300" height="160" rx="26" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>`; const c = t % 3;
    if (i === 0) { d += sun(cx - 80, cy, 34, t); const x = cx - 30 + (c / 3) * 160; d += `<line x1="${cx - 30}" y1="${cy}" x2="${F(x)}" y2="${cy}" stroke="${Y}" stroke-width="7"/><circle cx="${F(x)}" cy="${cy}" r="9" fill="#fff6d2"/>`; }
    if (i === 1) { [cx - 90, cx - 30, cx + 30].forEach(x => d += `<rect x="${x - 6}" y="${cy - 50}" width="12" height="90" fill="#2f6fa8"/>`); d += `<g transform="translate(${cx + 95},${cy + 42}) scale(0.32)">${candle(0, 0, 150, 1, t)}</g>` + `<line x1="${cx + 92}" y1="${cy - 8}" x2="${F(cx + 92 - Math.min(1, c / 1.5) * 220)}" y2="${cy - 8}" stroke="${Y}" stroke-width="6"/>`; }
    if (i === 2) { d += `<circle cx="${cx - 95}" cy="${cy - 45}" r="16" fill="#fff2b8"/><circle cx="${cx - 20}" cy="${cy + 45}" r="16" fill="#a3161a"/>` + eye(cx + 95, cy - 10, 0.42, -5, 0) + `<polyline points="${cx - 95},${cy - 45} ${cx - 20},${cy + 45} ${cx + 65},${cy - 10}" fill="none" stroke="${Y}" stroke-width="5" opacity="${(0.4 + 0.6 * Math.min(1, c)).toFixed(2)}"/>`; }
    s += g(p, `<clipPath id="r${i}"><rect x="${cx - 150}" y="${cy - 80}" width="300" height="160" rx="26"/></clipPath><g clip-path="url(#r${i})">${d}</g>`); });
  return { svg: s, ui: u };
});
