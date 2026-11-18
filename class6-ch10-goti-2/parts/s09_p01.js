/* ৯ক: আজ যা শিখলাম, three numbered rows, each with a small moving picture beside it (box, rim, pendulum). */
part('s09_p01', { scene: 9, label: '৯ক', first: true, title: "আজ যা শিখলাম",
  screen: "নেভি পটভূমি, ব্যানার \"আজ যা শিখলাম\"। তিনটি নম্বর-দেওয়া সারি একে একে, প্রতিটির ডানে ছোট চলমান ছবি: সরে যাওয়া কার্টন, গড়ানো রিম, দোলক।" }, [
  { c: "আজ যা শিখলাম।" },
  { c: "এক, সব বিন্দু একসাথে একই দিকে সমান দূরত্ব গেলে চলন গতি; সোজা পথে সরল রৈখিক, বাঁকা পথে বক্রগতি।" },
  { c: "দুই, কেন্দ্রের চারদিকে বৃত্তে ঘোরা হলো ঘূর্ণন গতি; ঘোরা আর এগোনো একসাথে হলে জটিল গতি।" },
  { c: "তিন, একই পথ সমান সময় পর পর বারবার হলে পর্যাবৃত্ত গতি; একটা অবস্থানের দুই পাশে আসা-যাওয়া হলে দোলন গতি।" }
], function (t, S) {
  let s = bg(NAVY), u = banner('আজ যা শিখলাম', S.P(0, 0.1, 0.5), 1, 110);
  const B = '<b style="color:#FFC83D">', E = '</b>';
  const rows = [`সব বিন্দু একই দিকে সমান দূরত্ব: ${B}চলন গতি${E} (সরল রৈখিক, বক্র)`,
                `কেন্দ্রের চারদিকে বৃত্তে: ${B}ঘূর্ণন${E}; সাথে এগোলে: ${B}জটিল গতি${E}`,
                `একই পথ সমান সময় পর পর: ${B}পর্যাবৃত্ত${E}; দুই পাশে: ${B}দোলন${E}`];
  rows.forEach((r, i) => {
    const p = S.P(1 + i, 0, 0.15); if (p <= 0) return;
    const top = 300 + i * 200;
    u += `<div class="abs rrow" style="left:90px;width:1380px;top:${top}px;opacity:${cl(p * 2).toFixed(2)};transform:translateX(${F(-80 * (1 - ease(p)))}px)"><div class="num">${BN(i + 1)}</div><div>${r}</div></div>`;
    const cx = 1660, cy = top + 85;
    let g2 = `<rect x="${cx - 150}" y="${cy - 85}" width="300" height="170" rx="26" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>`;
    if (i === 0) { const f = ease((Math.sin(t * 1.6) + 1) / 2); g2 += `<line x1="${cx - 130}" y1="${cy + 55}" x2="${cx + 130}" y2="${cy + 55}" stroke="#5d6f9e" stroke-width="4"/>` + carton(cx - 120 + 120 * f, cy + 55, 100, 80); }
    else if (i === 1) { const r = 50, tt = t % 4, d0 = 55 * tt, th = d0 / r; g2 += `<line x1="${cx - 140}" y1="${cy + 60}" x2="${cx + 140}" y2="${cy + 60}" stroke="#5d6f9e" stroke-width="4"/>` + rim2d(cx - 100 + d0, cy + 60 - r, r, 90 + th * 180 / Math.PI); }
    else { const T = 2 * Math.PI * Math.sqrt(0.3 / 9.8), th = 0.35 * Math.cos(2 * Math.PI * t / T), bx = cx + 120 * Math.sin(th), by = cy - 70 + 120 * Math.cos(th);
      g2 += `<line x1="${cx}" y1="${cy - 70}" x2="${F(bx)}" y2="${F(by)}" stroke="#e6e6e6" stroke-width="4"/><circle cx="${F(bx)}" cy="${F(by)}" r="20" fill="#c9a24a" stroke="#fff" stroke-width="3"/>`; }
    s += g(p, `<clipPath id="rc${i}"><rect x="${cx - 150}" y="${cy - 85}" width="300" height="170" rx="26"/></clipPath><g clip-path="url(#rc${i})">${g2}</g>`);
  });
  return { svg: s, ui: u };
});
