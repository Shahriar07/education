/* ২গ: writing in a khata, 3D: the khata on a desk, seen from above as the writer sees it. The pen first draws a straight
   line (সরল রৈখিক গতি), then a wave (বক্রগতি); the tip moves at a steady speed. The writing hand is upright, the pen in
   the tripod grip, drawn at its real size (≈ 17 cm) where the pen tip is. Page 34 x 24 cm at lab (5, 0.7765, −3.45). */
const KH = { XC: 5, Y: 0.7768, XA: -0.11, XB: 0.12, Z1: -3.505, Z2: -3.415, AMP: 0.016 };
/* ink on the page: a plain stroke along 3D points */
function ink3(P, pts) {
  const d = pts.map((p, k) => { const [x, y] = P(p[0], p[1], p[2]); return (k ? 'L' : 'M') + F(x) + ' ' + F(y); }).join(' ');
  return `<path d="${d}" fill="none" stroke="#1b3f8f" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
}

part('s02_p03', { scene: 2, label: '২গ', title: "খাতায় কলম: সরল রৈখিক ও বক্রগতি",
  screen: "3D, টেবিলে খোলা খাতা, ওপর থেকে লেখার সময় যেমন দেখি। খাড়া হয়ে থাকা লেখার হাত, কলম ঠিকভাবে ধরা। কলম প্রথমে একটা সোজা দাগ টানে, শব্দ-কার্ড: সরল রৈখিক গতি / Rectilinear motion। তারপর ঢেউয়ের মতো বাঁকা দাগ, শব্দ-কার্ড: বক্রগতি / Curvilinear motion। শেষে দুটো দাগের পাশে \"চলন গতি\"।" }, [
  { c: "লেখার সময় তোমার হাতের কলমটা দেখো। খাতায় একটা সোজা দাগ টানো, তারপর একটা ঢেউ আঁকো।" },
  { c: "কখনো সে সোজা পথে চলে। একে বলে সরল রৈখিক গতি।" },
  { c: "কখনো চলে বাঁকা পথে। একে বলে বক্রগতি।" },
  { c: "দুটোই চলন গতির ভাগ।" }
], function (t, S) {
  const X = ROAD.LAB.X, { XC, Y: YP, XA, XB, Z1, Z2, AMP } = KH;
  const P = W3.frame({ cam: W3.labCam.khata(), lab: {} });
  const wave = xx => Z2 + AMP * Math.sin((xx - XA) / (XB - XA) * 2 * Math.PI * 2.5);
  const p1 = S.P(1, 0.0, 0.55), p2 = S.P(2, 0.0, 0.7);
  let tx, tz;
  if (t < S.A(2)) { tx = XA + (XB - XA) * p1; tz = Z1; } else { tx = XA + (XB - XA) * p2; tz = wave(tx); }
  if (t < S.A(1)) { const p = ease(S.P(0, 0.5, 0.9)); tx = XA + 0.06 * (1 - p); tz = Z1 + 0.05 * (1 - p); }
  let s = '', u = '';
  const at = (xx, zz) => [X + XC + xx, YP, zz];
  if (t >= S.A(1)) s += ink3(P, [at(XA, Z1), at(t < S.A(2) ? tx : XB, Z1)]);
  if (t >= S.A(2)) { const pts = []; for (let xx = XA; xx <= tx + 1e-6; xx += 0.002) pts.push(at(xx, wave(xx))); if (pts.length > 1) s += ink3(P, pts); }
  const tip = at(tx, tz), [hx, hy] = P(...tip), k = pxpm(P, tip);
  s += handWrite(hx, hy, 0.17 * k / 300, 1);
  if (t >= S.A(3)) {
    const [ax, ay] = P(...at(XB + 0.02, Z1)), [bx, by] = P(...at(XB + 0.02, Z2));
    s += `<path d="M${F(ax)} ${F(ay)} Q${F(ax + 50)} ${F(ay)} ${F(ax + 50)} ${F(ay + 40)} L${F(bx + 50)} ${F(by - 40)} Q${F(bx + 50)} ${F(by)} ${F(bx)} ${F(by)}" fill="none" stroke="${Y}" stroke-width="8" opacity="${S.P(3, 0.1, 0.4).toFixed(2)}"/>`;
    u += lab(ax + 190, (ay + by) / 2, 'চলন গতি', 'move', S.P(3, 0.3, 0.5));
  }
  if (t >= S.A(1)) { const [lx, ly] = P(...at(XB - 0.03, Z1 - 0.012)); u += lab(lx, ly - 30, 'সোজা পথ', 'name', S.P(1, 0.5, 0.65)); }
  if (t >= S.A(2)) { const [lx, ly] = P(...at(XB - 0.03, Z2 + 0.03)); u += lab(lx, ly + 30, 'বাঁকা পথ', 'name', S.P(2, 0.6, 0.75)); }
  if (S.on(1)) u += termCard('সরল রৈখিক গতি', 'Rectilinear motion', S.P(1, 0.6, 0.8), 1, 960, 820, 0.8);
  if (S.on(2)) u += termCard('বক্রগতি', 'Curvilinear motion', S.P(2, 0.72, 0.9), 1, 960, 250, 0.8);
  return { gl: true, svg: s, ui: u };
});
