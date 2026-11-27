/* ১গ: title card and "আজ যা জানব" */
part('s01_p03', { scene: 1, label: '১গ', last: true, title: "শিরোনাম ও আজ যা জানব",
  screen: "শিরোনাম কার্ড: নেভি পটভূমিতে ঘুরতে থাকা আবছা রশ্মি, তিনটি চিপ (ষষ্ঠ শ্রেণি, বিজ্ঞান, অধ্যায় ৯: আলোর ঘটনা), বড় করে \"আলো কীভাবে চলে ও আমরা কীভাবে দেখি\" (\"আলো\" হলুদে), নিচে নিজে আঁকা হলুদ রেখা। তারপর \"আজ যা জানব\": তিনটি নম্বর দেওয়া কার্ড।" }, [
  { c: "উত্তরটা লুকিয়ে আছে আলোর মধ্যে।" },
  { c: "আজ আমরা জানব তিনটি কথা।" },
  { c: "এক, আলো কী।" },
  { c: "দুই, আলো কোন পথে চলে।" },
  { c: "তিন, আমরা কোনো কিছু দেখি কীভাবে।" },
  { d: 1.2 }
], function (t, S) {
  let s = bg(NAVY), u = '';
  for (let i = 0; i < 16; i++) { const q = d => `${F(960 + 1500 * Math.cos((i * 22.5 + t * 3) * Math.PI / 180 + d))},${F(560 + 1500 * Math.sin((i * 22.5 + t * 3) * Math.PI / 180 + d))}`; s += `<polygon points="960,560 ${q(-0.05)} ${q(0.05)}" fill="#fff" opacity=".035"/>`; }
  const up = k => `opacity:${cl(k).toFixed(2)};transform:translateY(${F(30 * (1 - ease(cl(k))))}px)`;
  u += `<div class="abs trow" style="${up(pr(t, 0.3, 0.9))}"><span class="tchip">ষষ্ঠ শ্রেণি</span><span class="tchip o">বিজ্ঞান</span><span class="tchip">অধ্যায় ৯: আলোর ঘটনা</span></div>`;
  u += `<div class="abs title" style="top:232px;font-size:104px;line-height:1.22;${up(pr(t, 0.7, 1.4))}"><b>আলো</b> কীভাবে চলে ও<br>আমরা কীভাবে দেখি</div>`;
  const lw = 1100 * ease(pr(t, 1.3, 2.3)); s += `<rect x="${F(960 - lw / 2)}" y="506" width="${F(lw)}" height="12" rx="6" fill="${Y}"/>`;
  if (t >= S.A(2) - 0.6) {
    u += `<div class="abs learn" style="top:556px;${up(pr(t, S.A(2) - 0.6, S.A(2)))}">আজ যা জানব</div>`;
    u += `<div class="abs cards">` + ['আলো কী', 'আলো কোন পথে চলে', 'আমরা কীভাবে দেখি'].map((c, i) => { const p = S.P(2 + i, 0, 0.3); return `<div class="card" style="opacity:${cl(p * 3).toFixed(2)};transform:scale(${back(p).toFixed(3)})"><div class="num">${BN(i + 1)}</div>${c}</div>`; }).join('') + `</div>`;
  }
  return { svg: s, ui: u, noChip: true };
});
