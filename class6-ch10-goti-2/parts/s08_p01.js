/* ৮ক: নিজে করো. The textbook's ruler activity, in the same 3D scene as ৫চ (rulerScene, F109, tip109): materials (2D card),
   then three numbered steps acted out in 3D: slide half the ruler beyond the edge, press it, push the end down and let go. */
part('s08_p01', { scene: 8, label: '৮ক', first: true, title: "নিজে করো: উপকরণ ও ধাপ",
  screen: "ব্যানার: নিজে করো। উপকরণ দুটি ছবি-সহ: প্লাস্টিকের স্কেল, টেবিল। তারপর 3D-তে পাশ থেকে টেবিল আর স্কেল; ধাপ ১ (হাত দিয়ে স্কেলের অর্ধেক বাইরে সরানো), ধাপ ২ (হাত চেপে ধরে), ধাপ ৩ (আঙুল নামিয়ে ছেড়ে দেয়), ওপরে হলুদ নম্বর আর ধাপের কথা।" }, [
  { c: "এবার নিজে করো।" },
  { c: "লাগবে একটা প্লাস্টিকের স্কেল আর একটা টেবিল।" },
  { c: "এক, স্কেলের প্রায় অর্ধেকটা টেবিলের বাইরে রাখো।" },
  { c: "দুই, ওপরের অংশটা এক হাতে শক্ত করে চেপে ধরো।" },
  { c: "তিন, বাইরের অংশটা একটু নামিয়ে ছেড়ে দাও।", d: 4.4 }
], function (t, S) {
  const { L_OUT, PUSH } = F109;
  let u = '';
  if (t < S.A(2)) {
    let s = bg(NAVY);
    u += banner('নিজে করো', S.P(0, 0.05, 0.4), 1, 140);
    if (t >= S.A(1)) {
      const p1 = S.P(1, 0.1, 0.3), p2 = S.P(1, 0.45, 0.65);
      s += g(p1, `<g transform="translate(560,560)">` + rulerSide(-260, 20, 0, 520, 8 * Math.sin(t * 2)) + `</g>`);
      s += g(p2, `<defs><linearGradient id="woodg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8703d"/><stop offset="1" stop-color="#7d4e27"/></linearGradient></defs>` + tableSide(1100, 1620, 520, 760));
      u += lab(560, 700, 'প্লাস্টিকের স্কেল', 'name', p1) + lab(1360, 820, 'টেবিল', 'name', p2);
    }
    return { svg: s, ui: u };
  }
  // step 1: the ruler is slid out until half of it is beyond the edge (a flat hand moves it); step 2: press; step 3: push, let go
  const slide = ease(S.P(2, 0.1, 0.6)), out = L_OUT * slide;
  const tp0 = S.A(4) + 0.6, trel = S.A(4) + 2.0;
  let tip = 0;
  if (t >= tp0 && t < trel) tip = PUSH * ease(pr(t, tp0, tp0 + 0.8));
  if (t >= trel) tip = tip109(t - trel);
  let finger = null;
  if (t >= S.A(4)) { let fy = 0, fo = 1; if (t < tp0) { const p = ease(pr(t, S.A(4), tp0)); fy = 0.08 * (1 - p); fo = p; } if (t >= trel) { const p = ease(pr(t, trel, trel + 0.7)); fy = tip + 0.02 + 0.08 * p; fo = 1 - p; } finger = { y: -fy, o: fo }; }
  const press = t >= S.A(3) ? ease(S.P(3, 0.1, 0.5)) : (slide < 1 && t >= S.A(2) ? 0.85 * (1 - S.P(2, 0.65, 0.85)) : 0);
  const R = rulerScene(out, tip, press, finger);
  let s = R.s;
  const steps = ['স্কেলের অর্ধেকটা বাইরে', 'ওপরের অংশ চেপে ধরো', 'নামিয়ে ছেড়ে দাও'];
  const k = t >= S.A(4) ? 2 : t >= S.A(3) ? 1 : 0;
  s += badge(560, 200, k + 1, S.P(2 + k, 0, 0.15));
  u += lab(860, 200, steps[k], 'move', S.P(2 + k, 0.05, 0.2));
  if (t >= trel) u += speedNote('ধীর করে দেখানো (১৬ গুণ)', pr(t, trel, trel + 0.4));
  return { gl: true, svg: s, ui: u };
});
