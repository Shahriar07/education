/* ৬ঘ: the book's group activity: writing causes of accidents in a khata; only the first is written */
part('s06_p04', { scene: 6, label: '৬ঘ', last: true, title: "বইয়ের কাজ: দুর্ঘটনার কারণ",
  screen: "ওপর থেকে খাতা, লেখার হাত লেখে: \"১. অতিরিক্ত বেগ\"। ২, ৩, ৪ ফাঁকা, পাশে \"?\"।" }, [
  { c: "বইয়ের একটা কাজ করো। পাঁচ-ছয়জন বন্ধু মিলে দল বানাও।" },
  { c: "যানবাহনের দুর্ঘটনার কারণগুলো খাতায় লেখো। একটা আমি লিখলাম, বাকিগুলো তোমরা।" },
  { c: "লেখা শেষে একজন সবার সামনে পড়ে শোনাও।" },
  { d: 1.0 }
], function (t, S) {
  const X = ROAD.LAB.X, P = W3.frame({ cam: W3.labCam.khata(), lab: {} }), at = (x, z) => [X + KH3.XC + x, KH3.Y, z];
  let s = '', u = ''; const p = S.P(1, 0.5, 0.85), [x0, y0] = P(...at(-0.13, -3.515)), k = pxpm(P, at(0, -3.5)), fs = Math.max(44, 0.024 * k), W = 0.16 * k;
  s += `<defs><clipPath id="wr"><rect x="${F(x0 - 10)}" y="${F(y0 - fs * 1.4)}" width="${F(W * p + 8)}" height="${F(fs * 2.4)}"/></clipPath></defs><g clip-path="url(#wr)"><text x="${F(x0)}" y="${F(y0)}" textLength="${F(W)}" lengthAdjust="spacingAndGlyphs" font-family="Hind Siliguri" font-weight="600" font-size="${F(fs)}" fill="#1b3f8f">১. অতিরিক্ত বেগ</text></g>`;
  [2, 3, 4].forEach((n, i) => { const [a, b] = P(...at(-0.13, -3.515 + (i + 1) * 0.045)); s += txt(F(a), F(b), BN(n) + '. ?', F(fs), { c: '#1b3f8f', a: 'start', w: 600, op: S.P(1, 0.85, 1) + (t >= S.A(2) ? 1 : 0) }); });
  const tip = t < S.A(1) ? [x0 + 60, y0 + 150] : p < 1 ? [x0 + W * p, y0 - fs * 0.25 + fs * 0.22 * Math.sin(t * 16) * (p > 0 ? 1 : 0)] : [x0 + W + 60 * S.P(2, 0, 0.3), y0 + 30];
  s += handWrite(tip[0], tip[1], 0.17 * k / 300, 1);
  u += banner('বইয়ের কাজ', S.P(0, 0.05, 0.3), 1 - S.P(1, 0, 0.1), 140) + lab(960, 190, 'দুর্ঘটনার কারণ', 'move', S.P(1, 0.05, 0.2));
  return { gl: true, svg: s, ui: u };
});
