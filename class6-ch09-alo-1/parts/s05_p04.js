/* ৫ঘ: step 3: a finger pushes the middle cover 1.5 cm sideways (more than the radius of its hole), so the holes are no longer
   on one line; in your eye the flame is gone; from the side, the light from the flame goes straight and stops on cover 2 */
const SHIFT2 = -0.015;
part('s05_p04', { scene: 5, label: '৫ঘ', title: "ধাপ ৩: একটা কভার সরালে",
  screen: "পাশ থেকে। একটা আঙুল মাঝের কভারটা সামান্য পাশে ঠেলে দেয় (১.৫ সেমি)। তোমার চোখে: ছিদ্রে আর শিখা নেই, শুধু কভারের কাগজ। আবার পাশ থেকে: আলোর হলুদ রেখা মাঝের কভারে এসে থেমে যায়, লাল ক্রস।" }, [
  { c: "এবার মাঝের কভারটা একটু পাশে সরিয়ে দাও, যাতে তিনটি ছিদ্র আর এক রেখায় না থাকে।" },
  { c: "এবার তাকাও। শিখাটা দেখতে পাচ্ছ কি?" },
  { c: "না! আলো বাঁকা পথে ঘুরে তোমার চোখে আসতে পারেনি।" },
  { c: "সোজা এসে কভারেই আটকে গেছে।" }
], function (t, S) {
  const push = ease(S.P(0, 0.35, 0.8)), shift = [0, SHIFT2 * push, 0];
  const kin = ease(S.P(1, 0, 0.35)), kout = ease(S.P(3, 0, 0.35));
  const back9 = () => ({ pos: expPt(EXP.EYE - 0.45, EXP.H + 0.12), look: expPt(0.3), fov: 30 });
  const cam = kout > 0 ? (kout < 0.5 ? W3.mix(C9.eye(), back9(), ease(kout / 0.5)) : W3.mix(back9(), C9.side(), ease((kout - 0.5) / 0.5))) : W3.mix(C9.side(), C9.eye(), kin);
  const inEye = kin > 0.999 && kout < 0.001;
  const stop = expStop(shift), kr = ease(S.P(3, 0.4, 0.85));
  const P = W3.frame({ cam, t, dim: 0.55, exp: { shift, lit: 1, glow: inEye ? 0.45 : 0.8 }, ray: kr > 0 ? { a: EXP.CANDLE, b: EXP.CANDLE + (stop - EXP.CANDLE) * kr } : undefined });
  let s = '', u = '';
  if (kin < 0.3) { s += badge(150, 300, 3, S.P(0, 0, 0.12));
    /* the finger on the near edge of cover 2, pushing it away from you (-z) */
    const tip = expPt(EXP.CARDS[1], EXP.H, EXP.CW / 2 + shift[1]), [x, y] = P(...tip), [x2, y2] = P(tip[0], tip[1], tip[2] - 0.05), a = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI - 90;
    s += handPoint(x, y, a, pxpm(P, tip), S.P(0, 0.15, 0.3) * (1 - S.P(0, 0.85, 1))); }
  u += whoTag('কে দেখছে: তুমি', inEye ? 1 : 0);
  if (inEye) { u += lab(960, 300, 'শিখা দেখা যাচ্ছে না', 'move', S.P(2, 0, 0.15)); s += cross(1240, 300, 30, S.P(2, 0.1, 0.25)); }
  if (kout > 0.99) { EXP.CARDS.forEach((sx, i) => { const [x, y] = P(...expPt(sx, EXP.CH + 0.03, i === 1 ? shift[1] : 0)); u += lab(x, y, 'কভার ' + BN(i + 1), 'name', 1); });
    const [ex, ey] = P(...expPt(EXP.EYE)), ob = observer(ex, ey, 'তুমি', 1, 0.3); s += ob.svg; u += ob.ui;
    const [cx, cy] = P(...expPt(stop, EXP.H + 0.03)); s += cross(cx + 10, cy - 60, 26, S.P(3, 0.85, 0.98)); }
  return { gl: true, svg: s, ui: u };
});
