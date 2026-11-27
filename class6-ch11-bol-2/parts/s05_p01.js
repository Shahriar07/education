/* ৫ক: drawn */
part('s05_p01', { scene: 5, label: '৫ক', first: true, title: "চিত্র ১১.১২: কপিকল",
  screen: "3D কুয়ার কপিকল; চাকা, অক্ষ, ব্লক চিহ্নিত; শব্দ-কার্ড।" }, [
  { c: "কুয়া থেকে পানি তুলতে কপিকল লাগে। খাঁজ কাটা একটা চাকা, তার খাঁজের উপর দিয়ে দড়ি।" },
  { c: "চাকাটা একটা অক্ষদণ্ডকে কেন্দ্র করে ঘোরে, আর অক্ষদণ্ডটা লাগানো থাকে একটা ব্লকে। কপিকল দুই রকম, অনড় আর নড়নক্ষম।" }
], function (t, S) {
  /* the well pulley of video 1: grooved wheel, rope in the groove, axle, block */
  const W = TL.WELL, P = W3.frame({ cam: C11.well(), well: 0, sun: [-14, 34, 26] });
  let s = '', u = '';
  const [wx, wy] = P(W.X, W.BEAM - 0.1 - W.PR, 0.03), [bx, by] = P(W.X, W.BEAM + 0.1, 0), [rx, ry] = P(W.X + W.PR, 1.4, 0);
  u += lab(wx + 230, wy + 20, 'খাঁজ কাটা চাকা', 'name', S.P(0, 0.3, 0.45)) + lab(rx + 140, ry + 60, 'দড়ি', 'name', S.P(0, 0.6, 0.7));
  if (t >= S.A(1)) { s += ringDot(wx, wy, S.P(1, 0.05, 0.2)); u += lab(wx - 230, wy + 20, 'অক্ষদণ্ড', 'name', S.P(1, 0.05, 0.2)) + lab(bx, by - 70, 'ব্লক', 'name', S.P(1, 0.3, 0.45)); }
  u += termCard('কপিকল', 'Pulley', S.P(0, 0.05, 0.25), 1 - S.P(0, 0.4, 0.5), 960, 360, 0.8);
  return { gl: true, svg: s, ui: u };
});
