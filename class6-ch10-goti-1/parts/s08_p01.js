/* ৮ক: নিজে করো, materials */
part('s08_p01', { scene: 8, label: '৮ক', first: true, title: 'নিজে করো: যা লাগবে',
  screen: 'ব্যানার "নিজে করো"। পাশ থেকে দেখা টেবিল। একে একে ঢোকে: বই, খাতা, কলম; প্রতিটির পাশে নাম।' }, [
  { c: "এবার নিজে করে দেখো। লাগবে শুধু তিনটি জিনিস।" },
  { c: "একটা কলম, আর টেবিলের ওপর রাখা একটা বই ও একটা খাতা।" },
  { c: "সবই তোমার পড়ার টেবিলেই আছে।" }
], function (t, S) {
  let s = wallBg() + desk(), u = banner('নিজে করো', S.P(0, 0.05, 0.25), 1, 110);
  const b = ease(S.P(1, 0.3, 0.5)), k = ease(S.P(1, 0.55, 0.75)), p = ease(S.P(1, 0.0, 0.2));
  s += g(b, `<g transform="translate(0,${F(-300 * (1 - b))})">${bookSide(380, 320)}</g>`) + txt(540, DESK.TOP + 110, 'বই', 44, { c: INK, op: b });
  s += g(k, `<g transform="translate(0,${F(-300 * (1 - k))})">${khataSide(1250, 280)}</g>`) + txt(1390, DESK.TOP + 80, 'খাতা', 44, { c: INK, op: k });
  s += g(p, `<g transform="translate(${F(820 + 900 * (1 - p))},${DESK.TOP - 9})">${penShape()}</g>`) + txt(970, DESK.TOP + 80, 'কলম', 44, { c: INK, op: p });
  return { svg: s, ui: u };
});
