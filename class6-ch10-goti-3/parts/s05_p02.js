/* ৫খ: six speed bars, each 5 m/s taller; then the sum */
part('s05_p02', { scene: 5, label: '৫খ', title: "ত্বরণের হিসাব",
  screen: "ছয়টি বেগ-দণ্ড পাশাপাশি বড় হয়, প্রতিটি ধাপ ৫। হিসাব ফুটে ওঠে: ৪৫ − ২০ = ২৫; ২৫ ÷ ৫ = ৫ মি/সে²।" }, [
  { c: "হিসাবটা করি। শেষ বেগ ৪৫, শুরুর বেগ ২০। বেগ মোট বাড়ল ২৫ মিটার প্রতি সেকেন্ড।" },
  { c: "এই বাড়াটা হতে সময় লাগল ৫ সেকেন্ড।" },
  { c: "২৫ ভাগ ৫, মানে ত্বরণ ৫ মিটার প্রতি সেকেন্ড স্কয়ার।" },
  { c: "সময়ের সাথে বেগ বৃদ্ধির হারই ত্বরণ।" }
], function (t, S) {
  let s = bg(NAVY), u = ''; const X0 = 110, YB = 790, K = 10.5;
  [20, 25, 30, 35, 40, 45].forEach((v, i) => { const p = ease(pr(t, 0.3 + i * 0.35, 0.8 + i * 0.35)), h = v * K * p, x = X0 + i * 172; s += `<rect x="${x}" y="${F(YB - h)}" width="120" height="${F(h)}" rx="14" fill="#4db2ff"/>`; if (i) s += `<rect x="${x}" y="${F(YB - h)}" width="120" height="${F(5 * K * p)}" rx="10" fill="${Y}"/>`; if (p > 0.9) { u += lab(x + 60, YB - h - 46, BN(v), 'move') + lab(x + 60, YB + 46, BN(i) + ' সে.', 'name'); } });
  s += `<line x1="80" y1="${YB}" x2="1120" y2="${YB}" stroke="#fff" stroke-width="5"/>`;
  u += lab(260, 250, 'বেগ (মি./সে.)', 'name');
  u += eqn('৪৫ − ২০ = ' + yel('২৫ মি./সে.'), S.P(0, 0.6, 0.75), 230, 50).replace('left:0;width:1920px', 'left:1130px;width:780px');
  u += eqn('সময় = ' + yel('৫ সে.'), S.P(1, 0.2, 0.4), 380, 50).replace('left:0;width:1920px', 'left:1130px;width:780px');
  u += eqn('২৫ ÷ ৫ = ' + yel('৫ মি./সে.<sup style="font-size:36px">২</sup>'), S.P(2, 0.15, 0.3), 530, 56).replace('left:0;width:1920px', 'left:1130px;width:780px');
  if (t >= S.A(3)) u += lab(1520, 720, '<span style="font-size:50px">ত্বরণ</span>', 'move', S.P(3, 0.1, 0.3)) + lab(1520, 800, 'প্রতি সেকেন্ডে +৫', 'name', S.P(3, 0.3, 0.5));
  return { svg: s, ui: u };
});
