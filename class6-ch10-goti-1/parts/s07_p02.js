/* ৭খ: the Moon goes round the Earth; the Earth is the frame of reference.
   Sunlight comes from the left, all rays parallel; the lit half of the Earth and of the Moon faces left in every frame.
   The Moon moves anticlockwise (seen from above the north pole). Not to scale. */
part('s07_p02', { scene: 7, label: '৭খ', title: 'চারপাশে: পৃথিবীর সাপেক্ষে চাঁদ',
  screen: 'মহাকাশ, তারা। বাঁ দিক থেকে সূর্যের সমান্তরাল আলো আসে (সূর্য পর্দার বাইরে)। পৃথিবী ও চাঁদ, দুটোরই বাঁ অর্ধেক আলোকিত। চাঁদ পৃথিবীর চারদিকে বৃত্তপথে সরে, গায়ে তীর। পৃথিবীতে পিন ও ট্যাগ "প্রসঙ্গ-কাঠামো: পৃথিবী"। কোণে "স্কেল অনুযায়ী নয়"।' }, [
  { c: "রাতের আকাশে চাঁদ দেখেছ নিশ্চয়ই। চাঁদ পৃথিবীর চারদিকে ঘোরে।" },
  { c: "পৃথিবীর সাপেক্ষে চাঁদের গতি জানতে চাইলে, প্রসঙ্গ-কাঠামো হবে পৃথিবী।" },
  { c: "এখানে আমরা পৃথিবীকে স্থির ধরে নিয়ে চাঁদের অবস্থান বদলানো দেখছি।" }
], function (t, S) {
  let s = bg('#060a1a') + stars(t, 90, 3), u = '';
  for (let i = 0; i < 7; i++) { const y = 170 + i * 120, off = (t * 160 + i * 70) % 220; s += `<line x1="0" y1="${y}" x2="1920" y2="${y}" stroke="${Y}" stroke-width="3" stroke-dasharray="70 150" stroke-dashoffset="${F(-off)}" opacity=".22"/>`; }
  s += txt(70, 200, 'সূর্যের আলো →', 42, { c: Y, a: 'start', w: 600, op: 0.8 });
  const ex = 960, ey = 560, R = 380;
  s += `<ellipse cx="${ex}" cy="${ey}" rx="${R}" ry="${R * 0.42}" fill="none" stroke="#9fb3d9" stroke-width="3" stroke-dasharray="10 14" opacity=".6"/>`;
  const th = 2.6 + 0.32 * t;                                   // anticlockwise from above: on this tilted view, the near side moves left to right
  const mx = ex + R * Math.cos(th), my = ey + R * 0.42 * Math.sin(th), behind = Math.sin(th) < 0;
  const moon = litSphere(mx, my, 46, `<circle r="46" fill="#d9d6c7"/><circle cx="-14" cy="-10" r="9" fill="#bdb9a8"/><circle cx="12" cy="14" r="12" fill="#bdb9a8"/>`, 'mc');
  const earthS = litSphere(ex, ey, 150, earthFace(150, t * 20), 'ec');
  s += behind ? moon + earthS : earthS + moon;
  const dx = -Math.sin(th), dy = 0.42 * Math.cos(th), n = Math.hypot(dx, dy);
  s += arrow2(mx + dx / n * 60, my + dy / n * 60, mx + dx / n * 170, my + dy / n * 170, 1);
  s += txt(mx, my + 92, 'চাঁদ', 40, { op: 1 }) + txt(ex, ey + 210, 'পৃথিবী', 44);
  const o = S.fin(1, 0.4); s += pin(ex, ey - 150, 1.3, o); u += lab(ex, ey - 300, 'প্রসঙ্গ-কাঠামো: পৃথিবী', 'name', o);
  s += txt(1860, 1000 - 40, 'স্কেল অনুযায়ী নয়', 40, { c: '#9fb3d9', a: 'end', w: 600 });
  return { svg: s, ui: u };
});
