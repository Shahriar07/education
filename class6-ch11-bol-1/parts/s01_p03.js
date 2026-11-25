/* ১গ:  */
part('s01_p03', { scene: 1, label: '১গ', last: true, title: "শিরোনাম ও আজ যা জানব",
  screen: "শিরোনাম কার্ড ও তিনটি নম্বর কার্ড।" }, [
  { c: "আজ আমরা সেই রহস্যটাই জানব।" },
  { c: "এক, বল কী।" },
  { c: "দুই, বল প্রয়োগে কী কী ঘটে।" },
  { c: "তিন, সরল যন্ত্র কীভাবে কাজ সহজ করে।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  for (let i = 0; i < 16; i++) { const q = d => `${F(960 + 1500 * Math.cos((i * 22.5 + t * 3) * Math.PI / 180 + d))},${F(560 + 1500 * Math.sin((i * 22.5 + t * 3) * Math.PI / 180 + d))}`; s += `<polygon points="960,560 ${q(-0.05)} ${q(0.05)}" fill="#fff" opacity=".035"/>`; }
  const up = k => `opacity:${cl(k).toFixed(2)};transform:translateY(${F(30 * (1 - ease(cl(k))))}px)`;
  u += `<div class="abs trow" style="${up(pr(t, 0.3, 0.9))}"><span class="tchip">ষষ্ঠ শ্রেণি</span><span class="tchip o">বিজ্ঞান</span><span class="tchip">অধ্যায় ১১: বল ও সরল যন্ত্র</span></div>`;
  u += `<div class="abs title" style="${up(pr(t, 0.7, 1.4))}"><b>বল</b> ও <b>সরল যন্ত্র</b> কী</div>`;
  const lw = 1000 * ease(pr(t, 1.3, 2.3)); s += `<rect x="${F(960 - lw / 2)}" y="478" width="${F(lw)}" height="12" rx="6" fill="${Y}"/>`;
  if (t >= S.A(1) - 0.6) {
    u += `<div class="abs learn" style="${up(pr(t, S.A(1) - 0.6, S.A(1)))}">আজ যা জানব</div>`;
    u += `<div class="abs cards">` + ['বল কী', 'বল প্রয়োগে কী কী ঘটে', 'সরল যন্ত্র কীভাবে কাজ সহজ করে'].map((c, i) => { const p = S.P(1 + i, 0, 0.3); return `<div class="card" style="opacity:${cl(p * 3).toFixed(2)};transform:scale(${back(p).toFixed(3)})"><div class="num">${BN(i + 1)}</div>${c}</div>`; }).join('') + `</div>`;
  }
  return { svg: s, ui: u, noChip: true };
});
