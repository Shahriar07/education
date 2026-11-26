/* ৮খ:  */
part('s08_p02', { scene: 8, label: '৮খ', last: true, title: "পেনসিল সরালে কী হয়?",
  screen: "পেনসিল বইয়ের কাছে ও দূরে; আঙুলের তীর ছোট-বড়।" }, [
  { c: "এবার পেনসিলটা বইয়ের কাছে আনো, আবার চাপ দাও। তারপর দূরে সরিয়ে চাপ দাও।" },
  { c: "দুইবারই হাতের তালু রাখবে স্কেলের একদম মাথায়। হাতে কতটা চাপ লাগছে, মন দিয়ে অনুভব করো।" },
  { c: "কখন সহজ লাগল? কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও।" }
], function (t, S) {
  const far = t >= S.A(0) + (S.E(0) - S.A(0)) * 0.55, p = far ? 0.25 : 0.05, ph = far ? (t - S.A(0) - (S.E(0) - S.A(0)) * 0.55) : t, k = t >= S.A(2) ? 1 : ease(cl((ph - 1.2) / 1.2)), P = W3.frame({ cam: C11.ruler(), ruler: { p, k }, room: {} }), pm = pxpm(P, [V16.RX, V16.TOP, V16.TZ]);
  let s = '', u = ''; const e = rulerEnd(p, k), [x, y] = P(...e), F2 = RL.W * p / (RL.L - p), L = Math.min(330, F2 * 30);
  s += handPalmDown(x - 0.02 * pm, y - 2, pm); s += arrow2(x + 80, y - 40 - L, x + 80, y - 40, cl((ph - 0.6) * 2));
  const [px2, py2] = P(V16.RX + 0.12 + p, V16.TOP, V16.TZ); u += lab(px2, py2 + 70, far ? 'পেনসিল দূরে' : 'পেনসিল কাছে', 'name');
  u += lab(x + 220, y - 40 - L / 2, big(far ? 'অনেক জোর' : 'অল্প জোর'), 'move', cl((ph - 0.8) * 2));
  if (t >= S.A(2)) u += card('কখন সহজ লাগল? কেন?<br><span style="font-size:52px">উত্তরটা কমেন্টে লিখে জানাও</span>', S.P(2, 0.05, 0.25), 1, 150, 1150, 66);
  return { gl: true, svg: s, ui: u };
});
