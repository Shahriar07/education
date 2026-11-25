/* ৭গ: a black umbrella and a white shirt in the sun: equal parallel rays fall on both; most comes back from the shirt,
   little from the umbrella */
part('s07_p03', { scene: 7, label: '৭গ', title: "কালো ছাতা ও সাদা জামা",
  screen: "3D উঠোনে রোদ। খোলা কালো ছাতা আর দড়িতে ঝোলানো সাদা জামা। দুটির ওপর একই রকম রশ্মি পড়ে: জামা থেকে অনেক রশ্মি ফেরে, ছাতায় পড়া রশ্মি মিলিয়ে যায়। ট্যাগ: \"কালো আলো শোষণ করে\"।" }, [
  { c: "রোদে একটা কালো ছাতা আর একটা সাদা জামা রাখো।" },
  { c: "সাদা জামা অনেক আলো ফিরিয়ে দেয়, তাই ঝকঝকে দেখায়।" },
  { c: "কালো ছাতা আলোর বেশিরভাগ শোষণ করে, তাই কালো দেখায়।" }
], function (t, S) {
  const P = W3.frame({ cam: { pos: [TN.X - 0.3, 1.55, 8.6], look: [TN.X - 0.3, 1.1, 4], fov: 44 }, t, tin: { yard: true } });
  let s = '', u = '';
  const n = Math.hypot(...SUN9), d = SUN9.map(v => v / n);
  const shirt = [TN.X - 1.2, 1.6, 4.21], umb = [TN.X + 0.6, 0.98, 3.7];
  const kin = S.P(1, 0, 0.35), ko = S.P(1, 0.35, 0.7), ku = S.P(2, 0, 0.35);
  [[shirt, kin, ko, 1], [umb, ku, S.P(2, 0.35, 0.7), 0.15]].forEach(([p, a, b, back], j) => { [-0.25, 0, 0.25].forEach((off, i) => { const hit = [p[0] + off, p[1] + off * 0.4, p[2]], st = hit.map((v, k) => v + d[k] * 1.6);
      const [x1, y1] = P(...st), [x2, y2] = P(...hit.map((v, k) => st[k] + (v - st[k]) * ease(a)));
      if (a > 0.02) s += arrow2(x1, y1, x2, y2, 1);
      if (b > 0.02) { const out = [hit[0] - d[0] * 1.2 * back, hit[1] + d[1] * 1.2 * back, hit[2] + d[2] * 1.2 * back], [o1, o2] = P(...hit), [o3, o4] = P(...hit.map((v, k) => v + (out[k] - v) * ease(b))); s += arrow2(o1, o2, o3, o4, back < 0.5 ? 0.45 : 1); } }); });
  const [sx, sy] = P(shirt[0], 2.1, shirt[2]), [ux, uy] = P(umb[0], 1.25, umb[2]);
  u += lab(sx, sy - 60, 'সাদা জামা: বেশি ফেরায়', 'rest', S.P(1, 0.6, 0.75)); u += lab(ux + 60, uy - 70, 'কালো ছাতা: শোষণ করে', 'name', S.P(2, 0.6, 0.75));
  return { gl: true, svg: s, ui: u };
});
