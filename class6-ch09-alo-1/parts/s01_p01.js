/* ১ক: hook. Night in your study room in a city flat; you sit at the desk under the bulb. Load-shedding: the bulb goes out. */
const seatCam = () => ({ pos: [ST.X + ST.DESK.x - 0.12, 1.3, ST.DESK.z + 1.15], look: [ST.X + ST.DESK.x + 0.02, 1.0, ST.DESK.z - 0.4], fov: 62 });   // your eyes, on the chair pulled back a little: the desk and the bulb above it
/* labels for the things on the desk */
function deskLabels(P, o) {
  let u = ''; const T = ST.top;
  [['বই', [0.22, T + 0.05, -1.42]], ['খাতা', [-0.17, T + 0.04, -1.35]], ['কলম', [-0.02, T + 0.03, -1.22]]].forEach(([s, p], i) => { const [x, y] = P(ST.X + p[0], p[1], p[2]); u += lab(x, y - 70, s, 'name', o[i]); });
  return u;
}
part('s01_p01', { scene: 1, label: '১ক', first: true, title: "লোডশেডিং",
  screen: "3D শহরের ফ্ল্যাটে পড়ার ঘর, রাত, তোমার চোখে। ঝোলানো বাল্ব জ্বলছে; টেবিলে বই, খাতা, কলম, পাশে নেভানো মোমবাতি ও দেশলাই। হঠাৎ বাল্ব নিভে যায়: ঘর প্রায় কালো, জানালার বাইরে আবছা আকাশ। লেখা ওঠে: \"ফট!\"" }, [
  { c: "ধরো, রাতে তুমি টেবিলে বসে পড়ছ।" },
  { c: "মাথার ওপর বাল্ব জ্বলছে, সামনে বই, খাতা আর কলম।" },
  { c: "হঠাৎ, ফট! লোডশেডিং।" },
  { c: "চারদিক অন্ধকার।" },
  { c: "বইটা কোথায়? কলমটাই বা কোথায়? কিছুই দেখতে পাচ্ছ না।" }
], function (t, S) {
  const off = t >= S.A(2) + 0.35;
  const P = W3.frame({ cam: seatCam(), t, dim: 1, bg: 'night', st: { night: true, bulb: off ? 0 : 1, candle: 0, desk: true } });
  let s = off ? `<rect width="1920" height="1080" fill="#000" opacity="0.62"/>` : '', u = whoTag('কে দেখছে: তুমি', pr(t, 0.3, 0.8));
  if (!off) u += deskLabels(P, [S.P(1, 0.35, 0.45), S.P(1, 0.5, 0.6), S.P(1, 0.65, 0.75)]);
  if (t >= S.A(2) + 0.3 && t < S.A(3) + 0.6) { const p = pr(t, S.A(2) + 0.3, S.A(2) + 0.6); u += `<div class="abs" style="left:0;width:1920px;top:300px;text-align:center;opacity:${(p * (1 - pr(t, S.A(3), S.A(3) + 0.6))).toFixed(2)};transform:scale(${back(p).toFixed(3)})"><span style="font-size:200px;font-weight:700;color:#FFC83D;-webkit-text-stroke:6px #1a1a2e;paint-order:stroke fill">ফট!</span></div>`; }
  if (t >= S.A(4)) ['বই?', 'কলম?'].forEach((q, i) => { u += lab(720 + i * 480, 560, `<span style="font-size:56px">${q}</span>`, 'move', S.P(4, 0.05 + i * 0.25, 0.2 + i * 0.25)); });
  return { gl: true, svg: s, ui: u };
});
