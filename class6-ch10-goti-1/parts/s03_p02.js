/* ৩খ: the textbook's pen activity, second half: the pen moved to and fro. The dotted lines follow it. */
part('s03_p02', { scene: 3, label: '৩খ', title: 'বইয়ের কাজ: কলম নাড়ানো',
  screen: 'আবার সেই টেবিল। হাত কলমটাকে এদিক-সেদিক নাড়ায়। কলমের ডগা থেকে বই ও খাতা পর্যন্ত ডটেড রেখা দুটো বারবার ছোট-বড় হয় ও দিক বদলায়, তারপর "গতিশীল"।' }, [
  { c: "আবার পড়ার টেবিলে ফিরি। এবার হাতের কলমটা এদিক-সেদিক নাড়াতে থাকো।" },
  { c: "বই আর খাতা থেকে কলমের দূরত্ব আর দিক এখন বারবার বদলে যাচ্ছে।" },
  { c: "অর্থাৎ আশপাশের সবকিছুর সাপেক্ষে কলমটি এখন গতিশীল।" },
  { c: "দেখো, রেখা দুটো যেন রবারের মতো বারবার ছোট-বড় হচ্ছে।" }
], function (t, S) {
  let s = wallBg() + desk() + bookSide(380, 320) + khataSide(1250, 280);
  const p = PEN_REST, bx = 540, by = DESK.TOP - 46, kx = 1390, ky = DESK.TOP - 14;
  const m = ease(S.P(0, 0.45, 0.75));                           // the waving starts during the first sentence
  const hx = p.x + m * (170 * Math.sin(2 * Math.PI * t / 2.4)), hy = p.y + m * (70 * Math.sin(2 * Math.PI * t / 1.7));
  const a = p.a + m * 9 * Math.sin(2 * Math.PI * t / 2.1);
  s += measure(hx, hy, bx, by, NAVY) + measure(hx, hy, kx, ky, NAVY);
  s += handPen(hx, hy, a);
  s += txt(bx, by + 110, 'বই', 44, { c: INK }) + txt(kx, ky + 80, 'খাতা', 44, { c: INK });
  const u = lab(cl(hx + 40, 300, 1600), hy - 150, 'গতিশীল', 'move', S.fin(2, 0.4));
  return { svg: s, ui: u };
});
