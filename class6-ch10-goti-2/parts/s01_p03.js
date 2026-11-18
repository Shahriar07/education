/* ১গ: title card and "আজ যা জানব" (same layout as video 1) */
part('s01_p03', { scene: 1, label: '১গ', last: true, title: "শিরোনাম ও আজ যা জানব",
  screen: "শিরোনাম কার্ড: নেভি পটভূমি, ধীরে ঘোরা আলোর রেখা, তিনটি চিপ (ষষ্ঠ শ্রেণি, বিজ্ঞান, অধ্যায় ১০: গতি), বড় করে \"নানা প্রকার গতি\", \"গতি\" হলুদে, নিচে নিজে নিজে আঁকা হলুদ রেখা। তারপর \"আজ যা জানব\": তিনটি নম্বর দেওয়া কার্ড একে একে।" }, [
  { c: "আজ আমরা জানব নানা প্রকার গতির কথা।", d: 4.6 },
  { c: "এক, চলন গতি: সোজা পথে আর বাঁকা পথে।" },
  { c: "দুই, ঘূর্ণন গতি, আর ঘূর্ণন চলন গতি।" },
  { c: "তিন, পর্যাবৃত্ত গতি আর দোলন গতি।" },
  { d: 1.2 }
], function (t, S) {
  let s = bg(NAVY), u = '';
  for (let i = 0; i < 16; i++) s += `<polygon points="960,560 ${F(960 + 1500 * Math.cos((i * 22.5 + t * 3) * Math.PI / 180 - 0.05))},${F(560 + 1500 * Math.sin((i * 22.5 + t * 3) * Math.PI / 180 - 0.05))} ${F(960 + 1500 * Math.cos((i * 22.5 + t * 3) * Math.PI / 180 + 0.05))},${F(560 + 1500 * Math.sin((i * 22.5 + t * 3) * Math.PI / 180 + 0.05))}" fill="#fff" opacity=".035"/>`;
  const up = k => `opacity:${cl(k).toFixed(2)};transform:translateY(${F(30 * (1 - ease(cl(k))))}px)`;
  u += `<div class="abs trow" style="${up(pr(t, 0.3, 0.9))}"><span class="tchip">ষষ্ঠ শ্রেণি</span><span class="tchip o">বিজ্ঞান</span><span class="tchip">অধ্যায় ১০: গতি</span></div>`;
  u += `<div class="abs title" style="${up(pr(t, 0.7, 1.4))}">নানা প্রকার <b>গতি</b></div>`;
  const lw = 1000 * ease(pr(t, 1.3, 2.3)); s += `<rect x="${F(960 - lw / 2)}" y="478" width="${F(lw)}" height="12" rx="6" fill="${Y}"/>`;
  if (t >= S.A(1) - 0.6) {
    u += `<div class="abs learn" style="${up(pr(t, S.A(1) - 0.6, S.A(1)))}">আজ যা জানব</div>`;
    const items = ['চলন গতি: সোজা ও বাঁকা পথে', 'ঘূর্ণন ও ঘূর্ণন চলন গতি', 'পর্যাবৃত্ত ও দোলন গতি'];
    u += `<div class="abs cards">` + items.map((c, i) => { const p = S.P(1 + i, 0, 0.3); return `<div class="card" style="opacity:${cl(p * 3).toFixed(2)};transform:scale(${back(p).toFixed(3)})"><div class="num">${BN(i + 1)}</div>${c}</div>`; }).join('') + `</div>`;
  }
  return { svg: s, ui: u, noChip: true };
});
