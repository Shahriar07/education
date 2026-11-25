/* ৮ক: do it yourself (the textbook's own activity, fig 9.3): materials and the box. The wall towards the camera is shown
   see-through, so the black lining and the pebble inside can be seen. */
const camBox = () => { const c = boxW(0, 0.06, 0); return { pos: [c[0] - 0.62, c[1] + 0.32, c[2] + 0.28], look: [c[0], c[1] - 0.01, c[2] - 0.02], fov: 38 }; };
part('s08_p01', { scene: 8, label: '৮ক', first: true, title: "উপকরণ ও বাক্স তৈরি",
  screen: "ব্যানার \"নিজে করো\"। উপকরণের তালিকা: ঢাকনাসহ জুতার বাক্স, নুড়ি পাথর, কালো কাগজ, কালো টেপ। 3D টেবিলে বাক্স, পাশ থেকে সামান্য ওপর থেকে (চিত্র ৯.৩-এর মতো): ভেতরের দেয়ালে কালো কাগজ, ঢাকনায় ছোট ছিদ্র, পাশের দেয়ালে বড় ছিদ্র (জানালার দিকে), ঢাকনার ছিদ্রের ঠিক নিচে নুড়ি। কাছের দেয়াল স্বচ্ছ করে ভেতরটা দেখানো। নম্বর ১–৩। চিত্র-ট্যাগ: \"চিত্র ৯.৩\"।" }, [
  { c: "এবার নিজে করে দেখো।" },
  { c: "লাগবে ঢাকনাসহ একটা জুতার বাক্স, একটা নুড়ি পাথর আর কালো কাগজ।" },
  { c: "বাক্সের ভেতরটা কালো কাগজে মুড়ে দাও।" },
  { c: "ঢাকনায় একটা ছোট ছিদ্র করো, আর পাশের দেয়ালে একটা বড় ছিদ্র।" },
  { c: "ঢাকনার ছিদ্রের ঠিক নিচে নুড়িটা রাখো।" }
], function (t, S) {
  if (t < S.A(2)) {
    let s = bg(NAVY), u = banner('নিজে করো', S.P(0, 0.05, 0.3), 1, 140);
    ['ঢাকনাসহ জুতার বাক্স', 'নুড়ি পাথর', 'কালো কাগজ ও কালো টেপ'].forEach((m, i) => { const p = S.P(1, 0.1 + i * 0.25, 0.25 + i * 0.25); if (p <= 0) return;
      u += `<div class="abs rrow" style="left:360px;width:1200px;top:${330 + i * 170}px;opacity:${cl(p * 2).toFixed(2)};transform:translateX(${F(-60 * (1 - ease(p)))}px)"><div class="num">${BN(i + 1)}</div><div>${m}</div></div>`; });
    return { svg: s, ui: u };
  }
  const front = 1 - 0.75 * ease(S.P(2, 0, 0.4)), lid = t >= S.A(3);
  const P = W3.frame({ cam: camBox(), t, dim: 0.25, sunDir: [10, 30, -40], st: { night: false, bulb: 0, desk: false, box: { front, tape: false, lid } } });
  let s = '', u = figTag('চিত্র ৯.৩', 1);
  [[2, 2], [3, 3], [4, 4]].forEach(([n, i]) => { s += badge(150, 300, n - 1, S.P(i, 0, 0.12) * (t < S.A(i + 1) || i === 4 ? 1 : 0)); });
  const [cx, cy] = P(...boxW(0.06, ST.BOX.H * 0.2, ST.BOX.W / 2)); u += lab(cx - 170, cy + 120, 'ভেতরটা দেখানো হলো', 'name', S.P(2, 0.3, 0.5));
  const [hx, hy] = P(...boxW(0, ST.BOX.H + 0.004, 0)); u += lab(hx, hy - 90, 'ছোট ছিদ্র', 'name', S.P(3, 0.25, 0.4));
  const [sx, sy] = P(...boxW(-ST.BOX.L / 2, ST.BOX.H * 0.55, 0)); u += lab(sx - 150, sy, 'বড় ছিদ্র', 'name', S.P(3, 0.6, 0.75));
  const [px, py] = P(...boxW(0, 0.015, 0)); u += lab(px + 130, py + 30, 'নুড়ি', 'move', S.P(4, 0.2, 0.35));
  return { gl: true, svg: s, ui: u };
});
