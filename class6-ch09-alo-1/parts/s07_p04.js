/* ৭ঘ: does the Moon have its own light? The Moon over the city roof at night; then a space diagram (not to scale): the Sun on
   the left; the Earth with its day half towards the Sun; the Moon above and to the right of the Earth, on the night side;
   sunlight to the Moon, and from the Moon to the Earth's night side. The lit half of the Moon faces the Sun. */
part('s07_p04', { scene: 7, label: '৭ঘ', last: true, title: "প্রশ্ন: চাঁদের কি নিজের আলো আছে?",
  screen: "রাতের 3D ছাদ, আকাশে পূর্ণ চাঁদ। প্রশ্ন-কার্ড: \"চাঁদের কি নিজের আলো আছে?\" ভাবার বিরতি। তারপর ২D মহাকাশ, \"স্কেল অনুযায়ী নয়\": বাঁয়ে সূর্য, মাঝে পৃথিবী (সূর্যের দিকে দিন, অন্য দিকে রাত), পৃথিবীর রাতের দিকে ওপরে ডানে চাঁদ। রশ্মি সূর্য থেকে চাঁদে, চাঁদ থেকে পৃথিবীর রাতের দিকে। শব্দ-কার্ড: অনুজ্জ্বল বস্তু।" }, [
  { c: "এবার তোমার জন্য একটা প্রশ্ন।" },
  { c: "রাতে আকাশে চাঁদ ঝলমল করে।" },
  { c: "চাঁদের কি নিজের আলো আছে?" },
  { c: "একটু ভেবে নাও।" },
  { d: 2.0 },
  { c: "না, নেই। চাঁদ অনুজ্জ্বল বস্তু।" },
  { c: "সূর্যের আলো চাঁদে পড়ে, সেখান থেকে ফিরে আসে পৃথিবীর রাতের দিকে, তোমার চোখে।" }
], function (t, S) {
  if (t < S.A(5)) {
    W3.frame({ cam: { pos: [RF.X + 0.6, 1.4, 5.2], look: [RF.X + 1.5, 4.5, -6], fov: 55 }, t, dim: 1, bg: 'night', roof: { night: true, moonEl: 26 } });
    let u = card('চাঁদের কি নিজের আলো আছে?', S.P(2, 0.05, 0.3), 1, 760, 1100, 70);
    if (t >= S.A(3)) u += lab(960, 300, 'একটু ভেবে নাও...', 'move', S.P(3, 0, 0.2));
    return { gl: true, svg: `<rect width="1920" height="1080" fill="#000" opacity="0.15"/>`, ui: u };
  }
  let s = bg('#070d22') + stars(t, 90, 5), u = note9('স্কেল অনুযায়ী নয়', S.P(5, 0, 0.2));
  const sx = 230, sy = 600, ex = 960, ey = 640, er = 120, mx = 1400, my = 330, mr = 46;
  s += sun(sx, sy, 110, t);
  /* Earth: day half towards the Sun (left), night half dark */
  s += earth(ex, ey, er) + `<path d="M${ex} ${ey - er} A${er} ${er} 0 0 1 ${ex} ${ey + er} Z" fill="#000" opacity=".6"/>`;
  u += lab(ex - 60, ey + er + 50, 'দিন', 'move', S.P(5, 0.2, 0.4)) + lab(ex + 70, ey + er + 50, 'রাত', 'name', S.P(5, 0.2, 0.4));
  /* Moon: lit half towards the Sun */
  const am = Math.atan2(sy - my, sx - mx) * 180 / Math.PI;
  s += `<circle cx="${mx}" cy="${my}" r="${mr}" fill="#3a3f4f"/><path d="M0 ${-mr} A${mr} ${mr} 0 0 0 0 ${mr} Z" fill="#e8e6dc" transform="translate(${mx},${my}) rotate(${F(am + 90)})"/>`;
  u += lab(mx + 110, my - 40, 'চাঁদ', 'name', S.P(5, 0, 0.2));
  u += termCard('অনুজ্জ্বল বস্তু', 'Non-luminous object', S.P(5, 0.35, 0.55), 1 - S.P(6, 0, 0.1), 1450, 800, 0.8);
  /* rays: Sun -> Moon, then Moon -> the Earth's night side */
  const k1 = ease(S.P(6, 0.05, 0.4)), k2 = ease(S.P(6, 0.45, 0.85)), a = [sx + 120, sy - 30], b = [mx - mr * 0.9, my + mr * 0.35], c = [mx - mr * 0.3, my + mr * 0.9], dpt = [ex + er * 0.75, ey - er * 0.55];
  if (k1 > 0) s += arrow2(a[0], a[1], a[0] + (b[0] - a[0]) * k1, a[1] + (b[1] - a[1]) * k1, 1);
  if (k2 > 0) s += arrow2(c[0], c[1], c[0] + (dpt[0] - c[0]) * k2, c[1] + (dpt[1] - c[1]) * k2, 1);
  return { svg: s, ui: u };
});
