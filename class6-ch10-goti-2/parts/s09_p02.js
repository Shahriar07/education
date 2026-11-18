/* ৯খ: ভেবে বলো, three questions taken from the textbook's sample questions (p. 91–92), each with a small moving hint. */
part('s09_p02', { scene: 9, label: '৯খ', title: "ভেবে বলো",
  screen: "নেভি পটভূমি, ব্যানার \"ভেবে বলো\"। তিনটি প্রশ্নের সারি একে একে, প্রতিটির ডানে ছোট চলমান ছবি: সিলিং ফ্যান, গড়ানো চাকা, সেকেন্ডের কাঁটা।" }, [
  { c: "ভেবে বলো।" },
  { c: "সিলিং ফ্যানের গতি কোন ধরনের?", d: 3.6 },
  { c: "সাইকেলের চাকার গতিকে জটিল গতি বলা হয় কেন?", d: 4.6 },
  { c: "ঘড়ির সেকেন্ডের কাঁটার গতি কোন ধরনের?", d: 4.0 }
], function (t, S) {
  let s = bg(NAVY), u = banner('ভেবে বলো', S.P(0, 0.1, 0.5), 1, 110);
  const rows = ['সিলিং ফ্যানের গতি কোন ধরনের?', 'সাইকেলের চাকার গতিকে জটিল গতি বলা হয় কেন?', 'ঘড়ির সেকেন্ডের কাঁটার গতি কোন ধরনের?'];
  rows.forEach((r, i) => {
    const p = S.P(1 + i, 0, 0.2); if (p <= 0) return;
    const top = 300 + i * 200;
    u += `<div class="abs rrow" style="left:90px;width:1380px;top:${top}px;opacity:${cl(p * 2).toFixed(2)};transform:translateX(${F(-80 * (1 - ease(p)))}px)"><div class="num">${BN(i + 1)}</div><div>${r}</div></div>`;
    const cx = 1660, cy = top + 70;
    let g2 = `<rect x="${cx - 150}" y="${cy - 85}" width="300" height="170" rx="26" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>`;
    if (i === 0) g2 += fan2d(cx, cy + 10, 120, t * 80, { rodTop: cy - 85, canopy: false });
    else if (i === 1) { const r = 50, tt = t % 4, d0 = 55 * tt; g2 += `<line x1="${cx - 140}" y1="${cy + 60}" x2="${cx + 140}" y2="${cy + 60}" stroke="#5d6f9e" stroke-width="4"/>` + rim2d(cx - 100 + d0, cy + 10, r, 90 + d0 / r * 180 / Math.PI); }
    else g2 += clock(cx, cy, 70, t * 6);
    s += g(p, `<clipPath id="qc${i}"><rect x="${cx - 150}" y="${cy - 85}" width="300" height="170" rx="26"/></clipPath><g clip-path="url(#qc${i})">${g2}</g>`);
  });
  return { svg: s, ui: u };
});
