/* ৮গ: result side by side, and the question for the comments */
part('s08_p03', { scene: 8, label: '৮গ', last: true, title: 'নিজে করো: ফলাফল ও প্রশ্ন',
  screen: 'দুই ধাপের ছবি পাশাপাশি, ছোট করে: বাঁয়ে কলম স্থির, সবুজ লেখা "বদলায়নি"; ডানে কলম নড়ে, হলুদ লেখা "বারবার বদলেছে"। কার্ড: "কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও"।' }, [
  { c: "প্রথমবার কিছুই বদলাল না। দ্বিতীয়বার বারবার বদলে গেল।" },
  { c: "কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও।" },
  { c: "একটা ইঙ্গিত দিই: বই আর খাতা থেকে কলমের দূরত্বের কথা ভাবো।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  const p = PEN_REST, bx = 540, by = DESK.TOP - 46, kx = 1390, ky = DESK.TOP - 14;
  const scene = (hx, hy, a) => wallBg() + desk() + bookSide(380, 320) + khataSide(1250, 280) + measure(hx, hy, bx, by, NAVY) + measure(hx, hy, kx, ky, NAVY) + handPen(hx, hy, a);
  const hx = p.x + 170 * Math.sin(2 * Math.PI * t / 2.4), hy = p.y + 70 * Math.sin(2 * Math.PI * t / 1.7);
  const o1 = ease(S.P(0, 0, 0.2)), o2 = ease(S.P(0, 0.4, 0.6));
  s += g(o1, `<g transform="translate(70,260) scale(0.43)"><clipPath id="c81"><rect width="1920" height="1080" rx="40"/></clipPath><g clip-path="url(#c81)">${scene(p.x, p.y, p.a)}</g></g>`) + badge(110, 290, 1, o1);
  s += g(o2, `<g transform="translate(1024,260) scale(0.43)"><clipPath id="c82"><rect width="1920" height="1080" rx="40"/></clipPath><g clip-path="url(#c82)">${scene(hx, hy, p.a + 9 * Math.sin(2 * Math.PI * t / 2.1))}</g></g>`) + badge(1064, 290, 2, o2);
  s += txt(483, 820, 'বদলায়নি', 60, { c: '#7ee2a8', op: o1 }) + txt(1437, 820, 'বারবার বদলেছে', 60, { c: Y, op: o2 });
  if (t >= S.A(1)) u += card('কেন এমন হলো?<br><span style="font-size:48px;color:#3a4a7a">উত্তরটা কমেন্টে লিখে জানাও</span>', S.P(1, 0.05, 0.2), 1, 300, 1100, 72);
  return { svg: s, ui: u };
});
