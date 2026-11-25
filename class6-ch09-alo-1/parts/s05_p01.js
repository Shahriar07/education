/* ৫ক: the textbook activity, step 1: three equal covers in a stack, edges together; a finger presses a pin through all
   three at once, so the three holes are at the same place on each cover */
part('s05_p01', { scene: 5, label: '৫ক', first: true, title: "কাজ, ধাপ ১: তিন কভারে ছিদ্র",
  screen: "ব্যানার \"বইয়ের কাজ\"। 3D টেবিলে খাতার তিনটি সমান কভার, একটার ওপর আরেকটা, কিনারা মেলানো। একটা আঙুল একটা মোটা পিন ওপর থেকে চেপে তিনটিকে একসাথে ফুঁড়ে দেয়। কাছ থেকে: তিন কভারে একই জায়গায় ছিদ্র। নম্বর ১।" }, [
  { c: "এসো, বইয়ের কাজটা করি।" },
  { c: "তোমার খাতার তিনটি সমান কভার নাও।" },
  { c: "একটার ওপর আরেকটা রাখো, যেন সব কিনারা মিলে যায়।" },
  { c: "এবার একটা মোটা পিন দিয়ে তিনটিকে একসাথে ফুটো করো।" },
  { c: "ফলে তিন কভারের ঠিক একই জায়গায় ছিদ্র হলো।" }
], function (t, S) {
  /* the pin: comes down over the stack, then is pressed through (the head stops 6 mm above the top cover), then lifted away */
  const down = ease(S.P(3, 0.15, 0.55)), press = ease(S.P(3, 0.6, 0.9)), lift = ease(S.P(4, 0, 0.3));
  const pinY = t < S.A(3) ? undefined : 0.09 - 0.05 * down - 0.034 * press + 0.12 * lift, pierced = press > 0.99;
  const cam = W3.mix(C9.stack(), { pos: [EXP.ox + 0.3 - EXP.H - 0.06, EXP.TOP + 0.14, 0.12], look: [EXP.ox + 0.3 - EXP.H, EXP.TOP, 0], fov: 34 }, ease(S.P(4, 0.2, 0.7)));
  /* the covers arrive one by one during sentences 2 and 3 (dropped flat onto the stack) */
  const P = W3.frame({ cam, t, dim: 0.1, exp: { stack: 0, n: 1.0 * ease(S.P(1, 0.3, 0.8)) + 2 * S.P(2, 0.1, 0.8), holes: pierced, pinY, candle: false } });
  let s = '', u = banner('বইয়ের কাজ', S.P(0, 0.05, 0.2), 1 - S.P(1, 0, 0.15), 130);
  s += badge(150, 300, 1, S.P(1, 0, 0.15));
  if (pinY !== undefined && pinY < 0.11) { const top = [EXP.ox + 0.3 - EXP.H, EXP.TOP + 3 * EXP.CT + pinY + 0.034, EXP.Z], [x, y] = P(...top), pm = pxpm(P, top); s += handPoint(x, y - 4, 0, pm, 1 - lift); }
  const [hx, hy] = P(EXP.ox + 0.3 - EXP.H, EXP.TOP + 3 * EXP.CT, EXP.Z); u += lab(hx + 200, hy - 40, 'একই জায়গায় ছিদ্র', 'rest', S.P(4, 0.55, 0.7));
  return { gl: true, svg: s, ui: u };
});
