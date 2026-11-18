/* ১খ: the puzzle. The camera stands by one lamp post and moves slowly towards its foot, set in the ground. */
part('s01_p02', { scene: 1, label: '১খ', title: 'প্রশ্ন: ল্যাম্পপোস্ট কি সত্যিই ছোটে?',
  screen: '3D। রাস্তার পাশে একটা ল্যাম্পপোস্ট, ক্যামেরা ধীরে তার গোড়ার দিকে এগোয়; গোড়ায় পিন। প্রশ্ন-কার্ড: "ল্যাম্পপোস্ট কি সত্যিই ছোটে?"' }, [
  { c: "কিন্তু একটু ভাবো তো। ল্যাম্পপোস্ট তো মাটিতে শক্ত করে পোঁতা।" },
  { c: "ও কি সত্যিই দৌড়াতে পারে?" },
  { c: "তাহলে আসলে কে চলছে, আর কে দাঁড়িয়ে আছে?" },
  { c: "নাকি রাতে সে চুপিচুপি হেঁটে বেড়ায়?" }
], function (t, S) {
  const R = ROAD, x = -30, k = ease(pr(t, 0, S.dur));
  const cam = W3.mix({ pos: [x - 8, 2.2, 2.6], look: [x, 3.2, R.LAMP_Z], fov: 52 }, { pos: [x - 4.8, 1.4, -1.2], look: [x, 2.2, R.LAMP_Z], fov: 52 }, k);
  const P = W3.frame({ cam });
  let s = '', u = '';
  const [px, py] = P(x, 0.2, R.LAMP_Z + 0.4); s += pin(px, py, 1.5, S.P(0, 0.5, 0.7));
  u += card('ল্যাম্পপোস্ট কি সত্যিই <span style="color:#c77d00">ছোটে?</span>', S.P(1, 0.05, 0.25), 1, 150, 1180, 70);
  return { gl: true, svg: s, ui: u };
});
