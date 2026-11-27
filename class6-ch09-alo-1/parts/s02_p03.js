/* ২গ: the speed of light: 3 lakh km per second; round the Earth more than 7 times in a second (2D, space).
   laps = c × t ÷ circumference = 300000 × t ÷ 40000 = 7.5 t; shown 10 times slower, the stopwatch shows the real time. */
const C_LIGHT = 300000, EARTH_C = 40000, SLOW9 = 10;
part('s02_p03', { scene: 2, label: '২গ', title: "আলোর দ্রুতি",
  screen: "২D মহাকাশ, তারা। পৃথিবী (বাঁ দিক থেকে আলো, অন্য অর্ধেক অন্ধকার)। একটা উজ্জ্বল হলুদ বিন্দু পৃথিবীর চারদিকে সমবেগে ঘোরে; পাশে স্টপওয়াচ ০ থেকে ১ সেকেন্ড, পাক-গণনা ১, ২ ... ৭, তারপর ৭.৫। নোট: \"১০ গুণ ধীরে দেখানো\"। বড় লেখা: \"সেকেন্ডে প্রায় ৩ লক্ষ কিলোমিটার\"।" }, [
  { c: "আর আলো চলে ভীষণ দ্রুত।" },
  { c: "সেকেন্ডে প্রায় তিন লক্ষ কিলোমিটার!" },
  { c: "এই দ্রুতিতে তুমি চলতে পারলে এক সেকেন্ডে পৃথিবীর চারদিকে সাত বারেরও বেশি ঘুরে আসতে।" },
  { c: "গুনে দেখো।" },
  { d: 2.2 },
  { c: "বিজ্ঞানীরা বলেন, কোনো কিছুই আলোর চেয়ে বেশি বেগে চলতে পারে না।" }
], function (t, S) {
  let s = bg('#070d22') + stars(t, 90, 3), u = '';
  const cx = 820, cy = 560, r = 210, R = 290;
  /* the Earth, lit from the left: the right half is night */
  s += earth(cx, cy, r) + `<path d="M${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx} ${cy + r} A${r * 0.25} ${r} 0 0 0 ${cx} ${cy - r} Z" fill="#000" opacity=".55"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#9cc8ff" stroke-width="3" opacity=".5"/>`;
  const t0 = S.A(2) + 0.4, real = cl((t - t0) / SLOW9, 0, 1), laps = real * C_LIGHT / EARTH_C, a = -Math.PI / 2 + laps * 2 * Math.PI;
  const on = pr(t, t0 - 0.4, t0);
  if (on > 0) { s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${Y}" stroke-width="3" stroke-dasharray="6 14" opacity="${(0.5 * on).toFixed(2)}"/>`;
    for (let k = 1; k <= 14; k++) { const b = a - k * 0.06; s += `<circle cx="${F(cx + R * Math.cos(b))}" cy="${F(cy + R * Math.sin(b))}" r="${F(14 - k * 0.8)}" fill="${Y}" opacity="${(on * (0.5 - k * 0.03)).toFixed(2)}"/>`; }
    s += `<circle cx="${F(cx + R * Math.cos(a))}" cy="${F(cy + R * Math.sin(a))}" r="16" fill="#fff6d2" stroke="${Y}" stroke-width="6" opacity="${on.toFixed(2)}"/>`;
    u += readout(1300, 330, 'সময়', BN(real.toFixed(2)) + ' সে', on) + readout(1300, 470, 'পাক', BN(laps < 7.5 ? Math.floor(laps) : '৭.৫'), on) + note9('১০ গুণ ধীরে দেখানো', on * (1 - S.P(5, 0, 0.1))); }
  u += `<div class="abs" style="left:0;width:1920px;top:150px;text-align:center;opacity:${S.P(1, 0, 0.2).toFixed(2)}"><span class="lab move" style="transform:none;font-size:64px">সেকেন্ডে প্রায় ৩ লক্ষ কিলোমিটার</span></div>`;
  if (t >= S.A(5)) u += card('কোনো কিছুই আলোর চেয়ে বেশি বেগে চলে না', S.P(5, 0.1, 0.3), 1, 820, 1400, 60);
  return { svg: s, ui: u };
});
