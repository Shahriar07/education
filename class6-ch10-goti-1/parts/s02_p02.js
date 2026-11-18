/* ২খ: the textbook's pen activity (p. 83), first half: the pen held still. Side view of the study desk. */
const PEN_REST = { x: 860, y: 470, a: -24 };
part('s02_p02', { scene: 2, label: '২খ', title: 'বইয়ের কাজ: হাতে স্থির কলম',
  screen: 'পাশ থেকে দেখা পড়ার টেবিল, ওপরে একটা বই ও একটা খাতা। একটা হাত কলম ধরে আছে। কলমের ডগা থেকে বই ও খাতা পর্যন্ত দুটো ডটেড রেখা আঁকা হয়; ঘড়ির কাঁটা ঘোরে, রেখার দৈর্ঘ্য ও দিক একই থাকে, তারপর "স্থির"।' }, [
  { c: "এবার বাড়িতে পড়ার টেবিলে বসো। হাতে একটা কলম শক্ত করে ধরে রাখো।" },
  { c: "টেবিলের বই থেকে, খাতা থেকে কলমটা কত দূরে আর কোন দিকে আছে, দেখে নাও।" },
  { c: "একটু পরে আবার দেখো। দূরত্বও এক, দিকও এক।" },
  { c: "অর্থাৎ আশপাশের সবকিছুর সাপেক্ষে কলমটি স্থির।" },
  { c: "যেন কলমটা টেবিলের সাথে অদৃশ্য সুতোয় বাঁধা।" }
], function (t, S) {
  let s = wallBg() + desk() + bookSide(380, 320) + khataSide(1250, 280);
  const p = PEN_REST, bx = 540, by = DESK.TOP - 46, kx = 1390, ky = DESK.TOP - 14;
  const enter = ease(S.P(0, 0.2, 0.6));
  const hx = p.x + 700 * (1 - enter), hy = p.y - 260 * (1 - enter);
  const l1 = S.P(1, 0.1, 0.5), l2 = S.P(1, 0.4, 0.8);
  s += measure(hx, hy, hx + (bx - hx) * l1, hy + (by - hy) * l1, NAVY, l1 > 0 ? 1 : 0);
  s += measure(hx, hy, hx + (kx - hx) * l2, hy + (ky - hy) * l2, NAVY, l2 > 0 ? 1 : 0);
  s += handPen(hx, hy, p.a);
  s += txt(bx, by + 110, 'বই', 44, { c: INK, op: S.fin(1) }) + txt(kx, ky + 80, 'খাতা', 44, { c: INK, op: S.fin(1) });
  s += clock(1700, 220, 80, 25 * pr(t, S.A(2), S.dur), S.fin(2, 0.4));
  let u = '';
  if (t >= S.A(2)) { s += tick(700, 420, 26, S.P(2, 0.5, 0.65)) + tick(1180, 420, 26, S.P(2, 0.6, 0.75)); }
  u += lab(hx + 40, hy - 150, 'স্থির', 'rest', S.fin(3, 0.4));
  return { svg: s, ui: u };
});
