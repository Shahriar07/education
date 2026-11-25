/* ৮গ: tape off: window light (parallel rays) comes in through the big hole and falls on the pebble; from the pebble it comes
   out through the small hole to the eye; through the hole the pebble is seen */
part('s08_p03', { scene: 8, label: '৮গ', last: true, title: "পাশের ছিদ্র খোলা",
  screen: "টেপ সরে যায়। জানালার আলো পাশের ছিদ্র দিয়ে ঢুকে নুড়িতে পড়ে; নুড়ি থেকে আলো ঢাকনার ছিদ্র দিয়ে চোখে আসে (কাছের দেয়াল স্বচ্ছ করে দেখানো)। তোমার চোখে: নুড়ি দেখা যায়। সবুজ টিক। প্রশ্ন-কার্ড: \"কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও\"।" }, [
  { c: "এবার টেপটা সরিয়ে নাও। এই ছিদ্র দিয়ে বাক্সে আলো ঢুকবে।" },
  { c: "আবার ওপরের ছিদ্র দিয়ে তাকাও।" },
  { c: "নুড়িটা দেখা যাচ্ছে কি? হ্যাঁ, দেখা যাচ্ছে!" },
  { c: "কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও।" }
], function (t, S) {
  const tape = t < S.A(0) + 0.8, see = t >= S.A(2) && t < S.A(3);
  if (!see) {
    const hole = boxW(-ST.BOX.L / 2, ST.BOX.H * 0.55, 0), peb = boxW(0, 0.02, 0), lidH = boxW(0, ST.BOX.H, 0), eyeP = eyeBox();
    const dir = hole.map((v, i) => v - peb[i]), n = Math.hypot(...dir), out = hole.map((v, i) => v + dir[i] / n * 0.45);
    const k1 = ease(S.P(0, 0.45, 0.95)), k2 = ease(S.P(1, 0.1, 0.8)), rays = [];
    if (!tape && k1 > 0) rays.push({ a: out, b: lerp3(out, peb, k1), r: 0.0025 });
    if (k2 > 0) rays.push({ a: peb, b: lerp3(peb, eyeP, k2), r: 0.0025 });
    const P = W3.frame({ cam: camBox(), t, dim: 0.25, sunDir: [10, 30, -40], st: { night: false, bulb: 0, desk: false, box: { front: 0.3, tape, lid: true } }, rays });
    let s = '', u = figTag('চিত্র ৯.৩', 1);
    const [ex, ey] = P(...eyeP), ob = observer(ex, ey, 'তুমি', 1, 0.32); s += ob.svg; u += ob.ui;
    const [ox, oy] = P(...out); u += lab(cl(ox + 60, 260, 1700), cl(oy + 40, 200, 900), 'জানালার আলো', 'move', S.P(0, 0.5, 0.65));
    if (t >= S.A(3)) u += card('কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও', S.P(3, 0.05, 0.25), 1, 760, 1400, 60);
    return { gl: true, svg: s, ui: u };
  }
  /* your eye at the small hole: the pebble, lit, seen in a round view */
  const c = boxW(0, 0.015, 0), P = W3.frame({ cam: { pos: boxW(0.001, 0.2, 0), look: c, fov: 30 }, t, dim: 0, sunDir: [10, 30, -40], st: { night: false, bulb: 0, desk: false, box: { front: 1, tape: false, lid: false } } });
  void P; let s = `<path d="M0 0 H1920 V1080 H0 Z M960 180 A360 360 0 1 0 960 900 A360 360 0 1 0 960 180 Z" fill="#0b0b0b" fill-rule="evenodd"/><circle cx="960" cy="540" r="360" fill="none" stroke="#b99366" stroke-width="60"/>`, u = whoTag('কে দেখছে: তুমি', 1);
  s += tick(1380, 260, 40, S.P(2, 0.45, 0.65)); u += lab(960, 120, 'নুড়ি দেখা যাচ্ছে', 'rest', S.P(2, 0.4, 0.55));
  return { gl: true, svg: s, ui: u };
});
