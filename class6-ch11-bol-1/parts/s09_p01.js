/* ৯ক:  */
part('s09_p01', { scene: 9, label: '৯ক', first: true, title: "আজ যা শিখলাম",
  screen: "তিনটি নম্বর দেওয়া সারি।" }, [
  { c: "আজ যা শিখলাম। এক, ধাক্কা বা টানই বল।" },
  { c: "দুই, বল স্থিরকে চালায়, চলন্তকে থামায়, গতি বাড়ায়-কমায়, দিক আর আকৃতি বদলায়।" },
  { c: "তিন, সরল যন্ত্র কৌশলে বল কাজে লাগিয়ে কাজ সহজ করে।" }
], function (t, S) {
  let s = bg(NAVY), u = banner('আজ যা শিখলাম', S.P(0, 0.02, 0.12), 1, 130);
  [`ধাক্কা বা টানই ${yel('বল')}`, `বল চালায়, থামায়, গতি ও দিক বদলায়, ${yel('আকৃতিও')}`, `${yel('সরল যন্ত্র')} কৌশলে কাজ সহজ করে`].forEach((r, i) => { const p = i ? S.P(i, 0, 0.12) : S.P(0, 0.15, 0.27); if (p <= 0) return; const top = 320 + i * 195, cx = 1670, cy = top + 78;
    u += `<div class="abs rrow" style="left:80px;width:1400px;top:${top}px;opacity:${cl(p * 2).toFixed(2)};transform:translateX(${F(-80 * (1 - ease(p)))}px)"><div class="num">${BN(i + 1)}</div><div>${r}</div></div>`;
    let d = `<rect x="${cx - 150}" y="${cy - 80}" width="300" height="160" rx="26" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>`; const c = t % 3;
    if (i === 0) { const k = 10 * Math.sin(t * 3); d += `<rect x="${F(cx - 20 + k)}" y="${cy - 30}" width="70" height="60" rx="8" fill="#a9743f"/>` + arrow2(cx - 130 + k, cy, cx - 30 + k, cy, 1); }
    if (i === 1) { const x = Math.min(c, 1.6) * 110 - 0.5 * 55 * Math.min(c, 1.6) ** 2 / 1.6 * 1; d += `<line x1="${cx - 130}" y1="${cy + 30}" x2="${cx + 130}" y2="${cy + 30}" stroke="#5d6f9e" stroke-width="5"/><circle cx="${F(cx - 110 + x)}" cy="${cy + 15}" r="15" fill="${Y}"/>`; }
    if (i === 2) { const a = 0.35 * Math.sin(t * 2); d += `<polygon points="${cx},${cy + 50} ${cx - 20},${cy + 70} ${cx + 20},${cy + 70}" fill="#9aa3a8"/><g transform="rotate(${F(a * 30)} ${cx} ${cy + 48})"><rect x="${cx - 120}" y="${cy + 42}" width="240" height="10" rx="4" fill="#a9743f"/><circle cx="${cx + 95}" cy="${cy + 26}" r="18" fill="#9aa3a8"/></g>`; }
    s += g(p, d); });
  return { svg: s, ui: u };
});
