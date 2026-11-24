/* ৯ক: recap */
part('s09_p01', { scene: 9, label: '৯ক', first: true, title: "আজ যা শিখলাম",
  screen: "নেভি পটভূমি, ব্যানার \"আজ যা শিখলাম\"। তিনটি নম্বর দেওয়া সারি, প্রতিটির ডানে ছোট চলমান ছবি।" }, [
  { c: "আজ যা শিখলাম। এক, মোট পথ হলো দূরত্ব; শুরু থেকে শেষ পর্যন্ত নির্দিষ্ট দিকে সোজা দূরত্ব হলো সরণ।" },
  { c: "দুই, একক সময়ে দূরত্ব হলো দ্রুতি; নির্দিষ্ট দিকে দ্রুতি হলো বেগ।" },
  { c: "তিন, বেগ বৃদ্ধির হার ত্বরণ, বেগ কমলে মন্দন। আর অতিরিক্ত গতি মানেই ঝুঁকি।" }
], function (t, S) {
  let s = bg(NAVY), u = banner('আজ যা শিখলাম', S.P(0, 0.02, 0.12), 1, 130);
  [`মোট পথ: ${yel('দূরত্ব')}; শুরু থেকে শেষ, সোজা: ${yel('সরণ')}`, `একক সময়ে দূরত্ব: ${yel('দ্রুতি')}; নির্দিষ্ট দিকে: ${yel('বেগ')}`, `বেগ বাড়ার হার: ${yel('ত্বরণ')}; কমলে: ${yel('মন্দন')}। অতিরিক্ত গতি নয়!`].forEach((r, i) => { const p = i ? S.P(i, 0, 0.12) : S.P(0, 0.15, 0.27); if (p <= 0) return; const top = 320 + i * 195, cx = 1670, cy = top + 78; u += `<div class="abs rrow" style="left:80px;width:1400px;top:${top}px;opacity:${cl(p * 2).toFixed(2)};transform:translateX(${F(-80 * (1 - ease(p)))}px)"><div class="num">${BN(i + 1)}</div><div>${r}</div></div>`;
    let d = `<rect x="${cx - 150}" y="${cy - 80}" width="300" height="160" rx="26" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>`; const c = t % 4, w = Math.min(1.4, c / 2.4) ;
    if (i === 0) { const m = Math.min(14, c * 5), q = m <= 10 ? m : 20 - m; d += `<path d="M${cx - 110} ${cy - 20} H${F(cx - 110 + Math.min(m, 10) * 20)}${m > 10 ? ` V${cy + 10} H${F(cx - 110 + q * 20)}` : ''}" stroke="${Y}" stroke-width="9" fill="none"/>` + (q > 1.6 ? hArrow(cx - 110, cx - 110 + q * 20, cy + 48, 1, BLUE) : '') + `<circle cx="${F(cx - 110 + q * 20)}" cy="${m > 10 ? cy + 10 : cy - 20}" r="13" fill="#fff"/>`; }
    if (i === 1) d += `<line x1="${cx - 130}" y1="${cy + 30}" x2="${cx + 130}" y2="${cy + 30}" stroke="#5d6f9e" stroke-width="5"/><circle cx="${F(cx - 115 + c * 45)}" cy="${cy + 12}" r="17" fill="${Y}"/>` + hArrow(cx - 95 + c * 45, cx - 35 + c * 45, cy - 30, 1, BLUE);
    if (i === 2) [0, 1, 2, 3].forEach(n => { const h = 25 + 25 * n; d += `<rect x="${cx - 110 + n * 58}" y="${cy + 60 - h * Math.min(1, Math.max(0, c - n * 0.5) * 2)}" width="42" height="${F(h * Math.min(1, Math.max(0, c - n * 0.5) * 2))}" fill="${n ? Y : BLUE}"/>`; });
    s += g(p, `<clipPath id="q${i}"><rect x="${cx - 150}" y="${cy - 80}" width="300" height="160" rx="26"/></clipPath><g clip-path="url(#q${i})">${d}</g>`); });
  return { svg: s, ui: u };
});
