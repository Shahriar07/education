/* ৪ক:  */
part('s04_p01', { scene: 4, label: '৪ক', first: true, title: "একজন ঠেললে মাইক্রোবাস",
  screen: "এক জোড়া হাত; হাতের তীর আর ঘর্ষণের তীর সমান।" }, [
  { c: "অনেকে ভাবে, বল দিলেই বস্তু নড়ে। আসলে কি তাই?" },
  { c: "রাস্তায় একটা মাইক্রোবাস বিকল। তুমি একা ঠেলছ। নড়ছে না!" },
  { c: "বল কিন্তু দিচ্ছ। ঘর্ষণ ঠিক ততটাই উল্টো দিকে ঠেকিয়ে রাখছে।" }
], function (t, S) {
  const o0 = t >= S.A(1) ? S.P(1, 0.2, 0.35) : 0, P = W3.frame({ cam: C11.mbus(MBUS.X), mbus: MBUS.X, hands: o0 > 0 ? mbusHands(MBUS.X, 1, 0.3 * (1 - ease(o0))) : [], sun: [-14, 34, 26] }), pm = pxpm(P, [MBUS.X - 2.4, 1, MBUS.Z]), N = 0.35;
  let s = '', u = ''; if (t < S.A(1)) u += card('বল দিলেই কি বস্তু নড়ে?', S.P(0, 0.2, 0.4), 1, 170, 1000, 70);
  const o = t >= S.A(1) ? S.P(1, 0.2, 0.35) : 0, [rx, ry] = P(MBUS.X - 2.4, 1.05, MBUS.Z + 0.4); void o;
  if (t >= S.A(1)) u += lab(rx + 420, ry - 260, big('নড়ছে না!'), 'move', S.P(1, 0.6, 0.75));
  if (t >= S.A(2)) { const a = S.P(2, 0.05, 0.2), b = S.P(2, 0.45, 0.6), L = MBUS.ONE * N; s += arrow2(rx - 30 - L, ry + 120, rx - 30, ry + 120, a); u += lab(rx - 30 - L / 2, ry + 185, 'হাতের বল', 'move', a);
    const [gx, gy] = P(MBUS.X + 1.55, 0.02, MBUS.Z + 0.85); s += arrow2(gx + 20, gy + 30, gx + 20 - L, gy + 30, b, RED); u += lab(gx - L / 2 + 20, gy + 95, 'ঘর্ষণ', 'move', b); u += lab(1500, 250, big('সমান সমান'), 'name', S.P(2, 0.7, 0.85)); }
  return { gl: true, svg: s, ui: u };
});
