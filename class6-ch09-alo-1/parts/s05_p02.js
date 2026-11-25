/* ৫খ: step 2: the covers stand up one behind the other, holes on one straight line; a candle behind, lit, its flame at the
   height of the holes (12 cm above the table), shown with two height marks */
part('s05_p02', { scene: 5, label: '৫খ', title: "ধাপ ২: সারি করে দাঁড় করানো",
  screen: "চিত্র ৯.১-এর মতো পাশ থেকে, চোখের উচ্চতায়: টেবিলে তিন কভার খাড়া, ১৫ সেমি পর পর; পেছনে মোমবাতি জ্বলে ওঠে, শিখা ছিদ্রের উচ্চতায় (১২ সেমি)। ছিদ্রগুলো আর শিখার মধ্য দিয়ে একটা হালকা ডট রেখা: সব এক রেখায়। নম্বর ২। চিত্র-ট্যাগ: \"চিত্র ৯.১\"।" }, [
  { c: "এবার কভার তিনটি টেবিলের ওপর খাড়া করে দাঁড় করাও, যেন তিনটি ছিদ্র একই সরলরেখায় থাকে।" },
  { c: "পেছনে একটা মোমবাতি জ্বালিয়ে বসাও।" },
  { c: "শিখার উচ্চতা হবে ঠিক ছিদ্রগুলোর উচ্চতার সমান।" }
], function (t, S) {
  const stand = ease(S.P(0, 0.1, 0.7)), lit = ease(S.P(1, 0.3, 0.6));
  const P = W3.frame({ cam: C9.side(), t, dim: 0.35 + 0.2 * lit, exp: { stack: stand, lit, candle: t >= S.A(1) } });
  let s = '', u = figTag('চিত্র ৯.১', S.P(0, 0.1, 0.3));
  s += badge(150, 300, 2, S.P(0, 0, 0.12));
  /* the line through the holes and the flame (dotted), once everything stands */
  const q = S.P(0, 0.75, 0.95); if (q > 0) s += path3(P, [expPt(EXP.CARDS[0] - 0.08), expPt(EXP.CANDLE + 0.04)], '#fff', 4, '4 12', q * (1 - S.P(2, 0, 0.1)));
  /* height marks: from the table up to a hole and up to the flame centre, both 12 cm */
  const hm = S.P(2, 0.1, 0.35);
  if (hm > 0) [EXP.CARDS[0] - 0.035, EXP.CANDLE + 0.045].forEach((x, i) => { const [x1, y1] = P(...expPt(x, 0)), [x2, y2] = P(...expPt(x, EXP.H));
    s += `<g opacity="${hm.toFixed(2)}"><line x1="${F(x1)}" y1="${F(y1)}" x2="${F(x2)}" y2="${F(y2)}" stroke="#fff" stroke-width="5"/><line x1="${F(x1 - 14)}" y1="${F(y1)}" x2="${F(x1 + 14)}" y2="${F(y1)}" stroke="#fff" stroke-width="5"/><line x1="${F(x2 - 14)}" y1="${F(y2)}" x2="${F(x2 + 14)}" y2="${F(y2)}" stroke="#fff" stroke-width="5"/></g>`;
    u += lab(x1 + (i ? 95 : -95), (y1 + y2) / 2, '১২ সেমি', 'move', hm); });
  s += path3(P, [expPt(EXP.CARDS[0] - 0.035), expPt(EXP.CANDLE + 0.045)], Y, 4, '2 10', S.P(2, 0.4, 0.6));   // one height: the hole of cover 1 to the flame
  u += lab(...P(...expPt(EXP.CANDLE, EXP.H + 0.075)).slice(0, 2), 'মোমবাতি', 'name', S.P(1, 0.1, 0.25));
  return { gl: true, svg: s, ui: u };
});
