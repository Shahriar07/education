/* ২ঘ:  */
part('s02_p04', { scene: 2, label: '২ঘ', last: true, title: "শব্দ-কার্ড: বল",
  screen: "শব্দ-কার্ড বল (Force)।" }, [
  { c: "তাহলে সব ঘটনায় একটা জিনিস মিলে গেল। হয় ধাক্কা, না হয় টান।" },
  { c: "এই ধাক্কা বা টানই হলো বল।" },
  { c: "বল চোখে দেখা যায় না। কিন্তু বল কী ঘটায়, তা দেখা যায়। চলো, এবার সেটাই দেখি।" }
], function (t, S) {
  let s = bg(NAVY), u = ''; const a = S.P(0, 0.35, 0.6), b = S.P(0, 0.65, 0.9), k = 18 * Math.sin(t * 2.2);
  s += g(a, `<rect x="${F(480 + k)}" y="650" width="190" height="150" rx="14" fill="#a9743f" stroke="#6b4324" stroke-width="6"/>`) + arrow2(230 + k, 725, 470 + k, 725, a) + g(b, `<rect x="${F(1180 + k)}" y="650" width="190" height="150" rx="14" fill="#a9743f" stroke="#6b4324" stroke-width="6"/><circle cx="${F(1380 + k)}" cy="725" r="16" fill="#d9b27a"/>`) + arrow2(1400 + k, 725, 1640 + k, 725, b);
  u += lab(520, 870, big('ধাক্কা'), 'move', a) + lab(1400, 870, big('টান'), 'move', b);
  if (t >= S.A(1)) u += termCard('বল', 'Force', S.P(1, 0.2, 0.4), 1, 960, 400);
  return { svg: s, ui: u };
});
