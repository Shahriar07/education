/* ৩ক: village: morning sun through a small hole in the tin roof. Sun elevation 60° from the back (-z); every ray of the
   sun is parallel; the spot on the floor is where the straight line from the hole meets the floor. */
const tinSide = () => ({ pos: [TN.X + 2.3, 1.5, 1.85], look: [TN.X + 0.3, 1.2, -0.25], fov: 84 });   // inside, standing in the front-right corner: the hole and the spot on the floor both in view
const TIN_SUN = () => { const e = TN.SUN_EL * Math.PI / 180; return [0, 40 * Math.sin(e), -40 * Math.cos(e)]; };
part('s03_p01', { scene: 3, label: '৩ক', first: true, title: "গ্রাম: চালের ফুটো দিয়ে রোদ",
  screen: "3D গ্রামের টিনের ঘরের ভেতর, সকাল, পাশ থেকে চোখের উচ্চতায়। চালে ছোট একটা ফুটো। ফুটো দিয়ে রোদের সোজা রেখা নেমে মাটির মেঝেতে গোল উজ্জ্বল দাগ; রেখায় ধুলোর কণা ভাসে। রোদের কোণ ৬০°, দাগ ফুটো থেকে ১.৬৭ মি দূরে।" }, [
  { c: "গ্রামের টিনের ঘরে সকালবেলা কখনো খেয়াল করেছ?" },
  { c: "চালের ছোট্ট একটা ফুটো দিয়ে রোদ ঢোকে।" },
  { c: "ভাসমান ধুলোয় দেখা যায় রোদের একটা রেখা, ফুটো থেকে সোজা নেমে এসেছে মেঝেতে।" },
  { c: "রেখাটা কি কোথাও বেঁকেছে?" }
], function (t, S) {
  const k = ease(S.P(1, 0.2, 0.9));
  const P = W3.frame({ cam: tinSide(), t, dim: 0.62, sunDir: TIN_SUN(), tin: { beam: Math.max(k, 0.0001), yard: false } });
  let s = '', u = '';
  const [hx, hy] = P(...TN.HOLE_P); u += lab(hx + 40, hy - 70, 'চালের ফুটো', 'name', S.P(1, 0, 0.15));
  if (TN.FLOOR) { const [fx, fy] = P(...TN.FLOOR); u += lab(fx + 230, fy - 40, 'মেঝেতে রোদের দাগ', 'name', S.P(2, 0.55, 0.7));
    /* a ruler-straight check line along the beam, in the last sentence */
    const q = S.P(3, 0.2, 0.6); if (q > 0) s += `<line x1="${F(hx)}" y1="${F(hy)}" x2="${F(hx + (fx - hx) * ease(q))}" y2="${F(hy + (fy - hy) * ease(q))}" stroke="#fff" stroke-width="5" stroke-dasharray="14 12" opacity=".9"/>`;
    u += lab((hx + fx) / 2 + 170, (hy + fy) / 2, 'সোজা', 'rest', S.P(3, 0.6, 0.75)); }
  return { gl: true, svg: s, ui: u };
});
