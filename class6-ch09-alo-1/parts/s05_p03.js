/* ৫গ: fig 9.1, the covers in line: first a raised view from your end of the table (who is where), the camera flies into your
   eye and sees the flame through the three holes; then the side view as in the book, with the light's straight path from the
   flame through the holes to the eye. The light is drawn travelling slowly (in reality it takes about 2.4 billionths of a
   second for these 72 cm). */
part('s05_p03', { scene: 5, label: '৫গ', title: "তোমার চোখে: শিখা দেখা যায়",
  screen: "আগে কোনাকুনি ওপর থেকে: টেবিল, কভার, মোমবাতি, আর অন্য পাশে \"তুমি\" লেখা চোখ। ক্যামেরা উড়ে চোখের ভেতর যায় (\"কে দেখছে: তুমি\")। সামনের কভারের ছিদ্রে উজ্জ্বল শিখা দেখা যায়। তারপর আবার পাশ থেকে: শিখা থেকে তিন ছিদ্র দিয়ে চোখ পর্যন্ত হলুদ আলোর রেখা ধীরে আসে। নোট: \"ছিদ্র বড় ও আলোর চলা ধীর করে দেখানো\"।" }, [
  { c: "এবার কভারগুলোর উল্টো দিক থেকে মোমবাতির দিকে তাকাও।" },
  { c: "কী দেখছ?" },
  { c: "ছিদ্র দিয়ে মোমবাতির শিখাটা দেখা যাচ্ছে!" },
  { c: "শিখার আলো তিনটি ছিদ্র পার হয়ে সোজা এসে পৌঁছেছে তোমার চোখে।" }
], function (t, S) {
  const shift = [0, 0, 0];
  /* camera: overview -> your eye during sentence 1; back out to the side view at the start of sentence 4 */
  const kin = ease(pr(t, 0.9, S.A(1) - 0.1)), kout = ease(S.P(3, 0, 0.3));
  const inEye = kin > 0.999 && kout < 0.001;
  /* flying out, the camera first backs away from the covers along the line (so it never passes through them), then swings round */
  const back9 = () => { const p = expPt(EXP.EYE - 0.45, EXP.H + 0.12); return { pos: p, look: expPt(0.3), fov: 30 }; };
  const cam = kout > 0 ? (kout < 0.5 ? W3.mix(C9.eye(), back9(), ease(kout / 0.5)) : W3.mix(back9(), C9.side(), ease((kout - 0.5) / 0.5)))
                       : W3.mix(C9.overview(), C9.eye(), kin);
  /* the light's path, revealed from the flame to the eye in the second half of sentence 4 (drawn in 3D, behind the covers) */
  const kr = kout > 0 ? ease(S.P(3, 0.35, 0.85)) : 0, rb = EXP.CANDLE + (EXP.EYE - EXP.CANDLE) * kr;
  const P = W3.frame({ cam, dim: 0.55, glow: inEye ? 0.45 : 0.8, exp: { shift, lit: 1, t }, ray: kr > 0 ? { a: EXP.CANDLE, b: rb } : undefined });
  let s = '', u = '';
  /* who is where, before the flight: your eye at your end of the line */
  /* your eye sits exactly on the line of the flame and the holes */
  if (kin < 0.7 && kout === 0) { const [ex, ey] = P(...expPt(EXP.EYE)), ob = observer(ex, ey, 'তুমি', 1 - pr(kin, 0.35, 0.7), 0.3); s += ob.svg; u += ob.ui; }
  u += whoTag('কে দেখছে: তুমি', inEye ? 1 : pr(kin, 0.9, 1) * (1 - pr(kout, 0, 0.1)));
  if (inEye) {
    /* the flame seen through the hole: label and tick when sentence 3 says so */
    const [fx, fy] = P(...expPt(EXP.CANDLE)), p = S.P(2, 0.15, 0.3);
    u += lab(fx, fy - 250, 'শিখা দেখা যাচ্ছে', 'rest', p); s += tick(fx + 250, fy - 250, 30, S.P(2, 0.3, 0.45));
  }
  if (kout > 0) {
    /* side view: labels, the eye, and the light's path drawn from the flame to the eye */
    u += figTag('চিত্র ৯.১: আলো সরলরেখায় চলে', pr(kout, 0.6, 1));
    const ap = pr(kout, 0.7, 1);
    EXP.CARDS.forEach((sx, i) => { const [x, y] = P(...expPt(sx, EXP.CH + 0.03)); u += lab(x, y, 'কভার ' + BN(i + 1), 'name', ap); });
    const [cx, cy] = P(...expPt(EXP.CANDLE, EXP.H + 0.075)); u += lab(cx + 30, cy, 'মোমবাতি', 'name', ap);
    const [ex, ey] = P(...expPt(EXP.EYE)), ob = observer(ex, ey, 'তুমি', ap, 0.3); s += ob.svg; u += ob.ui;
    u += `<div class="abs" style="right:60px;bottom:170px;opacity:${(ap * 0.95).toFixed(2)}"><span class="lab name" style="transform:none;font-size:40px">ছিদ্র বড় ও আলোর চলা ধীর করে দেখানো</span></div>`;
  }
  return { gl: true, svg: s, ui: u };
});
