/* ৪গ: luminous and non-luminous objects (a sorting card): left, things that give their own light (sun, stars, fireflies as
   small blinking lights, never the insect, candle, bulb); right, things that only send back the light that falls on them */
part('s04_p03', { scene: 4, label: '৪গ', last: true, title: "উজ্জ্বল ও অনুজ্জ্বল বস্তু",
  screen: "দুই ভাগ। বাঁ ভাগে নিজে আলো দেওয়া জিনিস এক এক করে: সূর্য, রাতের তারা, অন্ধকারে ছোট ছোট হলদে-সবুজ জ্বলা-নেভা আলোর বিন্দু (জোনাকি; পোকা আঁকা হয় না), মোমবাতি, বাল্ব; শব্দ-কার্ড: উজ্জ্বল বস্তু। ডান ভাগে: বই, ক্রিকেট বল, মাটির কলস, এদের ওপর বাইরের আলো পড়ে ফিরে যায়; শব্দ-কার্ড: অনুজ্জ্বল বস্তু।" }, [
  { c: "কিছু বস্তুর নিজের আলো আছে, যেমন সূর্য, তারা, জোনাকি পোকা, মোমবাতি, বৈদ্যুতিক বাল্ব।" },
  { c: "এদের বলে উজ্জ্বল বস্তু।" },
  { c: "আবার কিছু বস্তুর নিজের কোনো আলো নেই। এরা অন্য বস্তুর আলো ফিরিয়ে দেয়, যেমন বই, বল, কলস।" },
  { c: "এদের বলে অনুজ্জ্বল বস্তু।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  const panel = (x, w, title, p) => p > 0 ? `<g opacity="${cl(p).toFixed(2)}"><rect x="${x}" y="200" width="${w}" height="720" rx="34" fill="#13224a" stroke="#33488c" stroke-width="4"/></g>` : '';
  s += panel(70, 860, '', S.P(0, 0, 0.1)) + panel(990, 860, '', S.P(2, 0, 0.1));
  /* left: own light (rays drawn outwards) */
  const L = [[230, 350, 'সূর্য'], [500, 350, 'তারা'], [770, 350, 'জোনাকি'], [360, 545, 'মোমবাতি'], [640, 545, 'বাল্ব']];
  L.forEach(([x, y, n], i) => { const p = S.P(0, 0.1 + i * 0.16, 0.22 + i * 0.16); if (p <= 0) return; let d = '';
    if (i === 0) d = sun(x, y, 52, t);
    if (i === 1) for (let k = 0; k < 7; k++) { const a = k * 2.4, rr = 30 + (k * 37) % 60, xx = x + rr * Math.cos(a), yy = y + rr * Math.sin(a) * 0.8, z = 10 + 4 * Math.sin(t * 3 + k); d += `<path d="M${F(xx)} ${F(yy - z)} L${F(xx + z * 0.3)} ${F(yy - z * 0.3)} L${F(xx + z)} ${F(yy)} L${F(xx + z * 0.3)} ${F(yy + z * 0.3)} L${F(xx)} ${F(yy + z)} L${F(xx - z * 0.3)} ${F(yy + z * 0.3)} L${F(xx - z)} ${F(yy)} L${F(xx - z * 0.3)} ${F(yy - z * 0.3)} Z" fill="#fff6c8"/>`; }
    if (i === 2) { d += `<rect x="${x - 95}" y="${y - 85}" width="190" height="170" rx="20" fill="#050a18"/>`; for (let k = 0; k < 9; k++) { const b = Math.max(0, Math.sin(t * (2.2 + k * 0.37) + k * 1.7)), xx = x - 70 + (k * 53) % 140, yy = y - 60 + (k * 41) % 120; d += `<circle cx="${xx}" cy="${yy}" r="${F(14 * b)}" fill="#d9ff7a" opacity="${(0.25 * b).toFixed(2)}"/><circle cx="${xx}" cy="${yy}" r="${F(4.5 * b + 0.5)}" fill="#f2ffb0" opacity="${(0.3 + 0.7 * b).toFixed(2)}"/>`; } }
    if (i === 3) d = `<g transform="translate(${x},${y + 70}) scale(0.62)">${candle(0, 0, 170, 1, t)}</g>`;
    if (i === 4) d = `<circle cx="${x}" cy="${y - 10}" r="90" fill="#ffe7a8" opacity=".22"/><path d="M${x - 38} ${y + 8} C${x - 62} ${y - 40} ${x - 48} ${y - 92} ${x} ${y - 92} C${x + 48} ${y - 92} ${x + 62} ${y - 40} ${x + 38} ${y + 8} Z" fill="#fff2b8" stroke="#e0b84c" stroke-width="4"/><rect x="${x - 26}" y="${y + 8}" width="52" height="40" rx="6" fill="#9aa3a8"/>`;
    s += g(p, d); u += lab(x, y + 105, n, 'name', p); });
  u += termCard('উজ্জ্বল বস্তু', 'Luminous object', S.P(1, 0.05, 0.25), 1, 500, 835, 0.8);
  /* right: no light of their own: a lamp's light comes in and goes back out */
  const R = [[1190, 500, 'বই'], [1420, 500, 'বল'], [1650, 500, 'কলস']];
  R.forEach(([x, y, n], i) => { const p = S.P(2, 0.45 + i * 0.12, 0.55 + i * 0.12); if (p <= 0) return; let d = '';
    if (i === 0) d = `<path d="M${x - 90} ${y + 40} L${x} ${y + 55} L${x + 90} ${y + 40} L${x + 90} ${y - 40} L${x} ${y - 25} L${x - 90} ${y - 40} Z" fill="#fbf8ef" stroke="#7b2a22" stroke-width="8"/><line x1="${x}" y1="${y - 25}" x2="${x}" y2="${y + 55}" stroke="#c9c2b0" stroke-width="3"/>`;
    if (i === 1) d = `<circle cx="${x}" cy="${y}" r="56" fill="#a3161a"/><path d="M${x - 56} ${y} Q${x} ${y - 22} ${x + 56} ${y}" stroke="#f3ece0" stroke-width="4" fill="none"/><circle cx="${x - 18}" cy="${y - 20}" r="12" fill="#fff" opacity=".35"/>`;
    if (i === 2) d = `<g transform="translate(${x},${y + 70}) scale(0.55)">${kolshi(0, 0, 1)}</g>`;
    const ia = S.P(2, 0.8, 0.95), ob = S.P(3, 0.1, 0.4);
    d += arrow2(x - 120, y - 210, x - 30, y - 70, ia, Y) + arrow2(x + 20, y - 70, x + 110, y - 200, ob, Y);
    s += g(p, d); u += lab(x, y + 120, n, 'name', p); });
  if (S.P(2, 0.45, 0.5) > 0) u += `<div class="abs" style="left:990px;width:860px;top:225px;text-align:center;opacity:${S.P(2, 0.45, 0.6).toFixed(2)}"><span class="lab move" style="transform:none">বাইরের আলো পড়ে ফিরে যায়</span></div>`;
  u += `<div class="abs" style="left:70px;width:860px;top:225px;text-align:center;opacity:${S.P(0, 0.05, 0.15).toFixed(2)}"><span class="lab move" style="transform:none">নিজের আলো আছে</span></div>`;
  u += termCard('অনুজ্জ্বল বস্তু', 'Non-luminous object', S.P(3, 0.05, 0.25), 1, 1420, 835, 0.8);
  return { svg: s, ui: u };
});
