/* ৬গ: case 3: black absorbs. The page, close up (3D), and a magnified circle (diagram): equal rays fall on white paper and
   on black letters; from the white about 80 % comes back (long arrows), from the black ink about 5 % (short, faint) */
part('s06_p03', { scene: 6, label: '৬গ', title: "ঘটনা ৩: কালো বস্তু আলো শোষণ করে",
  screen: "নম্বর ৩। খাতার পাতা খুব কাছ থেকে, কালো কালিতে \"আলো\" লেখা (বড় করে দেখানো গোল অংশে)। অনেকগুলো রশ্মি পাতায় পড়ে: সাদা অংশ থেকে বেশিরভাগ ফিরে আসে (উজ্জ্বল রেখা), কালো অক্ষরে পড়া রশ্মি প্রায় মিলিয়ে যায়। শিরোনাম: \"কালো আলো শোষণ করে\"।" }, [
  { c: "ঘটনা তিন। কিছু বস্তু আলো ফেরায় না, বেশিরভাগ শুষে নেয়।" },
  { c: "এদের দেখায় কালো।" },
  { c: "এই পাতার লেখাগুলো পড়তে পারছ কেন?" },
  { c: "সাদা কাগজ থেকে অনেক আলো ফিরে তোমার চোখে আসে, কিন্তু কালো অক্ষর আলো শোষণ করে, ফেরায় খুব কম।" },
  { c: "তাই সাদার মাঝে কালো অক্ষর ফুটে ওঠে।" }
], function (t, S) {
  const P = W3.frame({ cam: { pos: [ST.X + 0.2, ST.top + 0.42, -1.12], look: [ST.X + 0.22, ST.top, -1.43], fov: 48 }, t, dim: 0.9, bg: 'night', st: { night: true, bulb: 0, candle: 1, desk: true } });
  let s = `<rect width="1920" height="1080" fill="#0f1b3d" opacity="${(0.55 * S.P(0, 0.4, 0.7)).toFixed(2)}"/>`, u = '';
  s += badge(150, 300, 3, S.P(0, 0, 0.12)); u += lab(560, 300, 'কালো আলো শোষণ করে', 'move', S.P(0, 0.2, 0.35));
  /* the magnified circle */
  const m = S.P(0, 0.4, 0.75); if (m > 0) {
    const cx = 1000, cy = 560, R = 270;
    let d = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fbf8ef" stroke="#c9a24a" stroke-width="14"/><text x="${cx}" y="${cy + 58}" text-anchor="middle" font-size="190" font-weight="700" fill="#1a1712" font-family="Hind Siliguri">আলো</text>`;
    /* five rays from upper left; white hits at the paper (positions between letters), black hits on the strokes */
    const hits = [[cx - 200, cy + 120, 'w'], [cx - 98, cy + 6, 'b'], [cx + 10, cy + 150, 'w'], [cx + 86, cy - 8, 'b'], [cx + 180, cy - 130, 'w']];
    const kin = S.P(3, 0.0, 0.3), kout = S.P(3, 0.3, 0.6);
    hits.forEach(([x, y, c], i) => { const ax = x - 120, ay = y - 150; d += arrow2(ax, ay, ax + (x - ax) * ease(kin), ay + (y - ay) * ease(kin), kin > 0.05 ? 1 : 0, Y);
      if (c === 'w') d += arrow2(x, y, x + 120 * ease(kout), y - 150 * ease(kout), kout > 0.05 ? 1 : 0, Y);
      else { d += arrow2(x, y, x + 120 * 0.06 * 8 * ease(kout), y - 150 * 0.06 * 8 * ease(kout), kout > 0.05 ? 0.35 : 0, Y); d += `<circle cx="${x}" cy="${y}" r="${F(22 * kout)}" fill="#000" opacity=".5"/>`; } });
    s += `<g opacity="${m.toFixed(2)}" transform="translate(${cx},${cy}) scale(${back(m).toFixed(3)}) translate(${-cx},${-cy})">${d}</g>`;
    u += lab(cx - 470, cy + 120, 'সাদা: বেশি ফেরায়', 'rest', S.P(3, 0.55, 0.7)); u += lab(cx + 480, cy + 120, 'কালো: শোষণ করে', 'name', S.P(3, 0.65, 0.8));
  }
  return { gl: true, svg: s, ui: u };
});
