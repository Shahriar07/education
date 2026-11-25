/* ১গ: title card */
part('s01_p03', { scene: 1, label: '১গ', last: true, title: "শিরোনাম ও আজ যা জানব",
  screen: "শিরোনাম কার্ড: তিনটি চিপ, বড় করে \"সরণ, বেগ ও ত্বরণ\", নিচে হলুদ রেখা। তারপর \"আজ যা জানব\": তিনটি নম্বর দেওয়া কার্ড।" }, [
  { c: "আজ আমরা চলার মাপজোখ শিখব, আর গতি অধ্যায়টা শেষ করব।" },
  { c: "এক, দূরত্ব আর সরণ।" },
  { c: "দুই, দ্রুতি আর বেগ।" },
  { c: "তিন, ত্বরণ, মন্দন, আর অতিরিক্ত গতির ঝুঁকি।" },
  { d: 1.2 }
], function (t, S) {
  let s = bg(NAVY), u = '';
  for (let i = 0; i < 16; i++) { const q = d => `${F(960 + 1500 * Math.cos((i * 22.5 + t * 3) * Math.PI / 180 + d))},${F(560 + 1500 * Math.sin((i * 22.5 + t * 3) * Math.PI / 180 + d))}`; s += `<polygon points="960,560 ${q(-0.05)} ${q(0.05)}" fill="#fff" opacity=".035"/>`; }
  const up = k => `opacity:${cl(k).toFixed(2)};transform:translateY(${F(30 * (1 - ease(cl(k))))}px)`;
  u += `<div class="abs trow" style="${up(pr(t, 0.3, 0.9))}"><span class="tchip">ষষ্ঠ শ্রেণি</span><span class="tchip o">বিজ্ঞান</span><span class="tchip">অধ্যায় ১০: গতি</span></div>`;
  u += `<div class="abs title" style="${up(pr(t, 0.7, 1.4))}">সরণ, <b>বেগ</b> ও ত্বরণ</div>`;
  const lw = 1000 * ease(pr(t, 1.3, 2.3)); s += `<rect x="${F(960 - lw / 2)}" y="478" width="${F(lw)}" height="12" rx="6" fill="${Y}"/>`;
  if (t >= S.A(1) - 0.6) {
    u += `<div class="abs learn" style="${up(pr(t, S.A(1) - 0.6, S.A(1)))}">আজ যা জানব</div>`;
    u += `<div class="abs cards">` + ['দূরত্ব ও সরণ', 'দ্রুতি ও বেগ', 'ত্বরণ, মন্দন ও অতিরিক্ত গতি'].map((c, i) => { const p = S.P(1 + i, 0, 0.3); return `<div class="card" style="opacity:${cl(p * 3).toFixed(2)};transform:scale(${back(p).toFixed(3)})"><div class="num">${BN(i + 1)}</div>${c}</div>`; }).join('') + `</div>`;
  }
  return { svg: s, ui: u, noChip: true };
});
