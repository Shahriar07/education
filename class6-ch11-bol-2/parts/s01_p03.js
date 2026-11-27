/* ১গ: drawn */
part('s01_p03', { scene: 1, label: '১গ', last: true, title: "শিরোনাম ও আজ যা জানব",
  screen: "শিরোনাম কার্ড, তিনটি নম্বর দেওয়া কার্ড।" }, [
  { c: "আজ এর উত্তর জানব, আর বল ও সরল যন্ত্র অধ্যায়টা শেষ করব।" },
  { c: "এক, লিভারের নীতি আর তিন শ্রেণি।" },
  { c: "দুই, হেলানো তল, কপিকল আর চাকা-অক্ষদণ্ড।" },
  { c: "তিন, আমাদের শরীরে সরল যন্ত্র।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  for (let i = 0; i < 16; i++) { const q = d => `${F(960 + 1500 * Math.cos((i * 22.5 + t * 3) * Math.PI / 180 + d))},${F(560 + 1500 * Math.sin((i * 22.5 + t * 3) * Math.PI / 180 + d))}`; s += `<polygon points="960,560 ${q(-0.05)} ${q(0.05)}" fill="#fff" opacity=".035"/>`; }
  const up = k => `opacity:${cl(k).toFixed(2)};transform:translateY(${F(30 * (1 - ease(cl(k))))}px)`;
  u += `<div class="abs trow" style="${up(pr(t, 0.3, 0.9))}"><span class="tchip">ষষ্ঠ শ্রেণি</span><span class="tchip o">বিজ্ঞান</span><span class="tchip">অধ্যায় ১১: বল ও সরল যন্ত্র</span></div>`;
  u += `<div class="abs title" style="${up(pr(t, 0.7, 1.4))}"><b>লিভার</b>, হেলানো তল ও কপিকল</div>`;
  const lw = 1100 * ease(pr(t, 1.3, 2.3)); s += `<rect x="${F(960 - lw / 2)}" y="478" width="${F(lw)}" height="12" rx="6" fill="${Y}"/>`;
  if (t >= S.A(1) - 0.6) {
    u += `<div class="abs learn" style="${up(pr(t, S.A(1) - 0.6, S.A(1)))}">আজ যা জানব</div>`;
    u += `<div class="abs cards">` + ['লিভারের নীতি ও তিন শ্রেণি', 'হেলানো তল, কপিকল, চাকা-অক্ষদণ্ড', 'শরীরে সরল যন্ত্র'].map((c, i) => { const p = S.P(1 + i, 0, 0.3); return `<div class="card" style="opacity:${cl(p * 3).toFixed(2)};transform:scale(${back(p).toFixed(3)})"><div class="num">${BN(i + 1)}</div>${c}</div>`; }).join('') + `</div>`;
  }
  return { svg: s, ui: u, noChip: true };
});
