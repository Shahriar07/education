/* ১খ: the candle's flame lights by itself (no hand); the desk comes back into view; the question card */
part('s01_p02', { scene: 1, label: '১খ', title: "মোমবাতি জ্বলল",
  screen: "অন্ধকার ঘর। মোমবাতির সলতেতে একটা ছোট শিখা জ্বলে ওঠে (হাত দেখানো হয় না)। শিখার আলোয় টেবিল, বই, খাতা, কলম ধীরে ফুটে ওঠে। প্রশ্ন-কার্ড: \"জিনিসগুলো তো ছিলই, তাহলে অন্ধকারে দেখলে না কেন?\"" }, [
  { c: "একটু পরে মোমবাতি জ্বলল।" },
  { c: "আর অমনি বই, খাতা, কলম সব আবার দেখা গেল!" },
  { c: "কিন্তু একটু ভাবো।" },
  { c: "জিনিসগুলো তো টেবিলেই ছিল, কোথাও যায়নি।" },
  { c: "তাহলে অন্ধকারে তুমি এদের দেখলে না কেন?" }
], function (t, S) {
  const lit = ease(S.P(0, 0.35, 0.75)), P = W3.frame({ cam: seatCam(), t, dim: 1, bg: 'night', st: { night: true, bulb: 0, candle: lit, desk: true } });
  let s = `<rect width="1920" height="1080" fill="#000" opacity="${(0.62 * (1 - 0.75 * lit)).toFixed(2)}"/>`, u = whoTag('কে দেখছে: তুমি', 1);
  u += deskLabels(P, [S.P(1, 0.2, 0.3), S.P(1, 0.35, 0.45), S.P(1, 0.5, 0.6)].map(v => v * (1 - S.P(4, 0, 0.1))));
  if (t >= S.A(4)) u += card('জিনিসগুলো তো ছিলই, তাহলে অন্ধকারে দেখলে না কেন?', S.P(4, 0.05, 0.25), 1, 300, 1500, 76);
  return { gl: true, svg: s, ui: u };
});
