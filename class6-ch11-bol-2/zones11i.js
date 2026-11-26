/* Video 2, scenes 6 to 8.
   3D on the workshop bench: a bottle and a bottle opener (BO), a door with a round knob on the workshop wall (DR), and the
   book's activity (CN): a 30 cm ruler on a pencil (tied with a rubber band) with 5-taka coins.
   - bottle opener: fulcrum = where the opener rests on the far edge of the cap; its lip lifts the near edge 0.034 m away;
     the handle end is 0.118 m from the fulcrum: the cap edge is lifted with 0.118 / 0.034 = 3.5 times the hand's force
   - ruler and coins (the ruler's own weight is left out, as in the book): coins at the 5 cm and 25 cm marks;
     5 against 5 balance with the pencil at 15 cm; 5 against 10 balance with the pencil at 18.3 cm (arms 13.3 and 6.7 cm)
   2D (SVG): skull with the jaw, the bones of the foot, the bones of the arm. */
const BO = { X: WS.X + 1.25, CR: 0.016, H: 0.23, LIP: 0.034, HND: 0.118 };
const DR = { X: WS.X + 4.2, Z: -1.12, KY: 0.95 };
const CN = { X: WS.X - 1.15, Z: 0.05, L: 0.30, R: 0.0035, CR: 0.012, CT: 0.0019 };
let V20 = null;
const _bI = buildV3, _fI = frameV3;
buildV3 = function (k) {
  _bI(k);
  const { scene, mat, box, cyl, canvasTex } = k;
  const steel = mat('#c4c9cd', { roughness: 0.3, metalness: 0.8 }), brass = mat('#c9a44a', { roughness: 0.3, metalness: 0.8 });
  /* bottle: brown glass, a crown cap with crimps */
  const bt = new THREE.Group(); bt.position.set(BO.X, WS.TY, 0); scene.add(bt);
  const prof = [[0.001, 0], [0.03, 0], [0.032, 0.005], [0.032, 0.14], [0.028, 0.165], [0.015, 0.195], [0.0135, 0.215], [0.0145, 0.222], [0.0135, BO.H - 0.004], [0.001, BO.H - 0.004]].map(q => new THREE.Vector2(q[0], q[1]));
  bt.add(new THREE.Mesh(new THREE.LatheGeometry(prof, 40), new THREE.MeshStandardMaterial({ color: '#5a2d0c', roughness: 0.08, metalness: 0.1, transparent: true, opacity: 0.9 })));
  const lbl = canvasTex(256, 128, c => { c.fillStyle = '#f2e6c8'; c.fillRect(0, 0, 256, 128); c.fillStyle = '#b5322b'; c.fillRect(0, 18, 256, 16); c.fillRect(0, 94, 256, 16); });
  const lb = new THREE.Mesh(new THREE.CylinderGeometry(0.0325, 0.0325, 0.07, 40, 1, true), new THREE.MeshStandardMaterial({ map: lbl, roughness: 0.6 })); lb.position.y = 0.075; bt.add(lb);
  const cap = new THREE.Group(); scene.add(cap); cyl(BO.CR, BO.CR * 1.06, 0.006, mat('#c23b2b', { roughness: 0.4, metalness: 0.5 }), 0, 0.003, 0, cap, 21);
  /* opener: a flat steel bar with a wooden grip; its far end rests on the cap, its lip hooks under the near edge */
  const op = new THREE.Group(); scene.add(op);
  /* its own frame: origin = the fulcrum (the far end, on the cap's far edge), bar along +x, lip under the bar at 0.034 m, grip to 0.12 m */
  box(0.125, 0.004, 0.026, steel, 0.0575, 0.002, 0, op); box(0.05, 0.016, 0.03, mat('#7a4a22'), 0.098, 0.006, 0, op);
  box(0.004, 0.012, 0.022, steel, 2 * BO.CR + 0.002, -0.006, 0, op);
  /* door with a round knob; the latch bolt slides in when the knob turns */
  const dr = new THREE.Group(); dr.position.set(DR.X, 0, DR.Z); scene.add(dr);
  box(0.9, 2.0, 0.04, mat('#8a5a30'), 0, 1.0, 0, dr); box(1.0, 2.08, 0.03, mat('#5e3a1c'), 0, 1.04, -0.015, dr);
  box(0.08, 0.16, 0.006, brass, 0.36, DR.KY, 0.023, dr);
  const knob = new THREE.Group(); knob.position.set(0.36, DR.KY, 0.026); dr.add(knob);
  { const n = cyl(0.01, 0.012, 0.04, brass, 0, 0, 0.02, knob, 16); n.rotation.x = Math.PI / 2; const b = new THREE.Mesh(new THREE.SphereGeometry(0.032, 28, 18), brass); b.scale.z = 0.75; b.position.z = 0.055; knob.add(b);
    const m = box(0.005, 0.03, 0.003, mat('#7a5a1a'), 0, 0.012, 0.079, knob, false); void m; }
  const bolt = box(0.03, 0.02, 0.012, brass, 0.46, DR.KY, 0, dr);
  /* ruler, pencil and coins */
  const cn = new THREE.Group(); cn.position.set(CN.X, WS.TY, CN.Z); scene.add(cn);
  const pen = new THREE.Group(); cn.add(pen); { const p = cyl(CN.R, CN.R, 0.17, mat('#f2c12e', { roughness: 0.5 }), 0, CN.R, 0, pen, 6); p.rotation.x = Math.PI / 2; }
  const rt = canvasTex(1024, 64, c => { c.fillStyle = '#f4efe2'; c.fillRect(0, 0, 1024, 64); c.strokeStyle = '#2b2b2b'; for (let i = 0; i <= 300; i++) { const x = 4 + i * 1016 / 300, L = i % 10 === 0 ? 24 : i % 5 === 0 ? 16 : 9; c.lineWidth = i % 10 === 0 ? 2 : 1; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, L); c.stroke(); }
    c.fillStyle = '#2b2b2b'; c.font = '700 20px "Hind Siliguri"'; c.textAlign = 'center'; for (let i = 0; i <= 30; i += 5) c.fillText(String(i), 4 + i * 1016 / 30, 48); });
  const rul = new THREE.Group(); cn.add(rul); const rm = [new THREE.MeshStandardMaterial({ color: '#e8e2d2' }), new THREE.MeshStandardMaterial({ color: '#e8e2d2' }), new THREE.MeshStandardMaterial({ map: rt, roughness: 0.5 }), new THREE.MeshStandardMaterial({ color: '#e8e2d2' }), new THREE.MeshStandardMaterial({ color: '#e8e2d2' }), new THREE.MeshStandardMaterial({ color: '#e8e2d2' })];
  const rb = new THREE.Mesh(new THREE.BoxGeometry(CN.L, 0.003, 0.03), rm); rb.castShadow = true; rul.add(rb);
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.009, 0.0012, 6, 20), mat('#c0392b')); band.rotation.y = Math.PI / 2; scene.add(band);
  const coinT = canvasTex(128, 128, c => { c.fillStyle = '#c9ccce'; c.beginPath(); c.arc(64, 64, 64, 0, 7); c.fill(); c.strokeStyle = '#9a9ea2'; c.lineWidth = 6; c.beginPath(); c.arc(64, 64, 56, 0, 7); c.stroke(); c.fillStyle = '#6f7478'; c.font = '700 64px "Hind Siliguri"'; c.textAlign = 'center'; c.fillText('৫', 64, 86); });
  const coinM = [mat('#b9bdc0', { metalness: 0.7, roughness: 0.35 }), new THREE.MeshStandardMaterial({ map: coinT, metalness: 0.5, roughness: 0.4 }), mat('#b9bdc0', { metalness: 0.7, roughness: 0.35 })];
  const stack = n => { const g = new THREE.Group(); for (let i = 0; i < n; i++) { const m = new THREE.Mesh(new THREE.CylinderGeometry(CN.CR, CN.CR, CN.CT, 28), coinM); m.position.set((i % 3 - 1) * 0.0006, CN.CT * (i + 0.5), 0); m.rotation.y = i; m.castShadow = true; g.add(m); } rul.add(g); return g; };
  const sL = stack(5), sR = stack(5), sR2 = stack(5);
  V20 = { bt, cap, op, dr, knob, bolt, cn, pen, rul, band, sL, sR, sR2 };
};
/* o.bopen = angle (rad) of the opener | o.door = turn of the knob (rad) | o.coins = { p: pencil mark (cm), nR: 5 or 10, show: 0 none, 1 ruler only, 2 coins } */
frameV3 = function (o) {
  _fI(o);
  const b = o.bopen; V20.bt.visible = V20.cap.visible = V20.op.visible = b !== undefined;
  if (b !== undefined) { const fx = BO.X - BO.CR, cb = WS.TY + BO.H - 0.004; V20.op.position.set(fx, cb + 0.006, 0); V20.op.rotation.z = b;
    /* the cap turns about the same far edge by the same angle: its near edge rides on the lip */
    V20.cap.position.set(fx + BO.CR * Math.cos(b), cb + BO.CR * Math.sin(b), 0); V20.cap.rotation.z = b; }
  V20.dr.visible = o.door !== undefined; if (o.door !== undefined) { V20.knob.rotation.z = o.door; V20.bolt.position.x = 0.46 - 0.012 * Math.min(1, Math.abs(o.door) / 0.8); }
  const c = o.coins; V20.cn.visible = V20.band.visible = !!c;
  if (c) { const p = c.p / 100, th = coinTilt(c), x0 = CN.L / 2; V20.rul.position.set(-(p - x0) * 0, 2 * CN.R + 0.0015, 0);
    V20.rul.position.x = (x0 - p) * Math.cos(th); V20.rul.position.y = 2 * CN.R + 0.0015 - (x0 - p) * Math.sin(th); V20.rul.rotation.z = -th;
    V20.band.position.set(CN.X, WS.TY + CN.R, CN.Z); V20.band.visible = c.show >= 1;
    const on = c.show >= 2; [[V20.sL, 0.05], [V20.sR, 0.25], [V20.sR2, 0.25]].forEach(([g, m], i) => { g.visible = on && (i < 2 || c.nR > 5); g.position.set(m - x0, 0.0015 + (i === 2 ? 5 * CN.CT : 0), 0); }); }
};
/* the ruler's tilt (rad, + = right end down): balanced -> 0, otherwise it turns until its lower end touches the bench */
function coinTilt(c) { const p = c.p / 100, mL = 5 * (0.05 - p), mR = (c.nR || 5) * (0.25 - p), net = mL + mR; if (Math.abs(net) < 1e-4 || c.show < 2) return 0;
  const arm = net > 0 ? 0.30 - p : p, a = Math.asin((2 * CN.R + 0.0015) / arm); return (net > 0 ? 1 : -1) * a * (c.k === undefined ? 1 : c.k); }
/* world point of the ruler mark m (cm), on its top face */
function coinPt(c, m, up = 0.0015) { const th = coinTilt(c), p = c.p / 100, d = m / 100 - p; return [CN.X + d * Math.cos(th) + up * Math.sin(th), WS.TY + 2 * CN.R + 0.0015 - d * Math.sin(th) + up * Math.cos(th), CN.Z]; }
Object.assign(C11, {
  bopen: () => ({ pos: [BO.X + 0.04, WS.TY + 0.3, 0.42], look: [BO.X + 0.03, WS.TY + 0.21, 0], fov: 30 }),
  door: () => ({ pos: [DR.X + 0.36, 1.05, DR.Z + 0.75], look: [DR.X + 0.36, 0.95, DR.Z], fov: 34 }),
  coins: () => ({ pos: [CN.X, WS.TY + 0.12, 0.62], look: [CN.X, WS.TY + 0.03, CN.Z], fov: 30 }),
});
/* ---------- 2D bones (bone colour, brown outline, soft shading); all in a local box, placed by translate/scale ---------- */
const BONE = '#efe4cc', BONE_D = '#cdbb96', BONE_L = '#6b5a43';
const grp = (p, d) => p > 0 ? `<g opacity="${cl(p * 2).toFixed(2)}">${d}</g>` : '';
const bp = (d, extra = '') => `<path d="${d}" fill="${BONE}" stroke="${BONE_L}" stroke-width="5" stroke-linejoin="round" ${extra}/>`;
/* skull facing right, 500 x 420 box; the jaw turns by a (rad, + = open) about the joint J (215, 282) */
const SK = { J: [215, 282], MOL: [345, 322], INC: [445, 322], MUS: [268, 360] };
function skull2d(a = 0) {
  let s = bp('M70,232 C46,142 102,42 232,30 C352,20 432,82 440,160 L447,186 L440,198 C452,214 466,232 466,246 L452,252 L456,292 L452,318 L332,318 L300,286 L252,274 L212,278 L180,284 L112,287 C92,276 76,258 70,232 Z');
  s += `<path d="M120,120 C170,70 260,60 330,80" fill="none" stroke="${BONE_D}" stroke-width="5"/><path d="M300,130 C320,170 330,210 330,240" fill="none" stroke="${BONE_D}" stroke-width="4"/>`;
  s += `<ellipse cx="386" cy="202" rx="40" ry="34" fill="#3b3027" stroke="${BONE_L}" stroke-width="4"/><path d="M437,226 L456,250 L436,262 Z" fill="#3b3027"/>`;
  s += `<path d="M360,252 C320,258 270,262 228,266 L228,280 C270,276 322,272 360,270 Z" fill="${BONE}" stroke="${BONE_L}" stroke-width="4"/><circle cx="200" cy="262" r="11" fill="#3b3027"/>`;
  for (let x = 336; x < 452; x += 16) s += `<rect x="${x}" y="302" width="14" height="17" rx="4" fill="#fbf7ec" stroke="${BONE_L}" stroke-width="2.5"/>`;
  let j = bp('M206,270 C222,268 232,280 228,292 L238,372 C242,388 262,396 290,396 L438,392 C452,390 458,378 454,364 L452,326 L334,326 L306,300 L286,288 L268,300 L248,296 Z');
  for (let x = 336; x < 450; x += 16) j += `<rect x="${x}" y="323" width="14" height="16" rx="4" fill="#fbf7ec" stroke="${BONE_L}" stroke-width="2.5"/>`;
  s += `<g transform="rotate(${F(a * 180 / Math.PI)} ${SK.J[0]} ${SK.J[1]})">${j}</g>`;
  return s;
}
/* a point of the jaw (local box) after it has turned by a */
const jawPt = (p, a) => { const [x, y] = p, dx = x - SK.J[0], dy = y - SK.J[1], c = Math.cos(a), s = Math.sin(a); return [SK.J[0] + dx * c - dy * s, SK.J[1] + dx * s + dy * c]; };
/* foot facing right (inner side), 520 x 520 box, ground at y = 470. The foot turns by b (rad) about the ball F so that the
   heel goes up; the toes stay flat on the ground and the shin bones stay upright on the ankle (talus top, ANK) */
const FT = { F: [385, 450], HEEL: [64, 372], ANK: [200, 306] };
const footPt = (p, b) => { const [x, y] = p, dx = x - FT.F[0], dy = y - FT.F[1], c = Math.cos(b), s = Math.sin(b); return [FT.F[0] + dx * c - dy * s, FT.F[1] + dx * s + dy * c]; };
function foot2d(b = 0) {
  const tr = pts => pts.map(p => footPt(p, b)).map(([x, y]) => F(x) + ',' + F(y)).join(' '), poly = (pts, w = 5) => `<polygon points="${tr(pts)}" fill="${BONE}" stroke="${BONE_L}" stroke-width="${w}" stroke-linejoin="round"/>`;
  let s = `<line x1="-20" y1="470" x2="560" y2="470" stroke="#8a7a5a" stroke-width="6"/>`;
  const [ax, ay] = footPt(FT.ANK, b), [hx, hy] = footPt(FT.HEEL, b);
  /* Achilles tendon from the back of the heel up to the calf (out of the picture) */
  s += `<path d="M${F(hx)},${F(hy)} C${F(hx + 10)},${F(hy - 120)} ${F(ax - 70)},${F(ay - 200)} ${F(ax - 62)},-60" fill="none" stroke="#c98a6a" stroke-width="16" stroke-linecap="round" opacity="0.9"/>`;
  /* fibula (thin, behind) and tibia, standing on the talus */
  s += bp(`M${F(ax - 52)},${F(ay + 14)} L${F(ax - 46)},-60 L${F(ax - 30)},-60 L${F(ax - 34)},${F(ay + 6)} Z`) + bp(`M${F(ax - 28)},${F(ay + 4)} C${F(ax - 34)},${F(ay - 40)} ${F(ax - 26)},${F(ay - 80)} ${F(ax - 22)},-60 L${F(ax + 22)},-60 C${F(ax + 26)},${F(ay - 80)} ${F(ax + 34)},${F(ay - 40)} ${F(ax + 30)},${F(ay + 4)} Z`);
  /* heel bone, talus, navicular, cuneiform, three metatarsals to the ball */
  s += poly([[58, 402], [60, 372], [80, 352], [110, 346], [190, 352], [206, 372], [200, 404], [168, 428], [110, 440], [74, 432]]);
  s += poly([[150, 352], [158, 322], [182, 304], [214, 302], [240, 314], [252, 336], [244, 358], [200, 366], [168, 364]]);
  s += poly([[248, 334], [282, 340], [288, 374], [244, 376]]) + poly([[288, 342], [318, 348], [322, 382], [290, 380]]);
  for (let i = 0; i < 3; i++) s += poly([[318, 350 + i * 12], [374, 428 + i * 4], [380, 446 + i * 2], [320, 372 + i * 12]], 4);
  s += `<circle cx="${FT.F[0]}" cy="${FT.F[1]}" r="17" fill="${BONE}" stroke="${BONE_L}" stroke-width="4"/>`;
  [[398, 452, 438, 458], [442, 459, 478, 463]].forEach(([x1, y1, x2, y2]) => s += `<rect x="${x1}" y="${y1 - 8}" width="${x2 - x1}" height="14" rx="7" fill="${BONE}" stroke="${BONE_L}" stroke-width="4"/>`);
  return s;
}
/* arm: elbow E, forearm along +x at 12 px per cm: wrist at 26 cm, fingertips at 45 cm; biceps tendon 4 cm from the elbow */
const AR = { E: [330, 610], PX: 12, INS: 4 };
function arm2d() {
  const [ex, ey] = AR.E, X = cm => ex + cm * AR.PX;
  let s = bp(`M${ex - 26},${ey - 6} C${ex - 40},${ey - 200} ${ex - 50},${ey - 360} ${ex - 64},${ey - 470} L${ex - 20},${ey - 474} C${ex - 12},${ey - 360} ${ex + 2},${ey - 200} ${ex + 18},${ey - 14} Z`);
  s += `<path d="M${ex - 34},${ey - 440} C${ex + 70},${ey - 380} ${ex + 80},${ey - 120} ${X(AR.INS)},${ey - 14}" fill="#c76b55" fill-opacity="0.55" stroke="#9a4a3a" stroke-width="4"/>`;
  s += bp(`M${ex - 18},${ey - 16} L${X(26)},${ey - 10} L${X(26)},${ey + 4} L${ex - 10},${ey + 2} Z`) + bp(`M${ex - 6},${ey + 6} L${X(26)},${ey + 8} L${X(26)},${ey + 22} L${ex - 2},${ey + 24} Z`);
  s += `<circle cx="${ex - 6}" cy="${ey}" r="30" fill="${BONE}" stroke="${BONE_L}" stroke-width="5"/>`;
  for (let i = 0; i < 4; i++) s += `<rect x="${X(26.3) + (i % 2) * 18}" y="${ey - 12 + Math.floor(i / 2) * 18}" width="16" height="16" rx="5" fill="${BONE}" stroke="${BONE_L}" stroke-width="3"/>`;
  for (let i = 0; i < 4; i++) { const y = ey - 12 + i * 9; s += `<rect x="${X(29.5)}" y="${y}" width="${8 * AR.PX}" height="8" rx="4" fill="${BONE}" stroke="${BONE_L}" stroke-width="3"/><rect x="${X(37.8)}" y="${y}" width="${3.6 * AR.PX}" height="8" rx="4" fill="${BONE}" stroke="${BONE_L}" stroke-width="3"/><rect x="${X(41.6)}" y="${y + 1}" width="${3.2 * AR.PX}" height="7" rx="3.5" fill="${BONE}" stroke="${BONE_L}" stroke-width="3"/>`; }
  return s;
}
/* a stone (1 kg) resting at d cm from the elbow, drawn on top of the arm */
function stone2d(d) { const x = AR.E[0] + d * AR.PX, y = AR.E[1] - 22; return `<ellipse cx="${F(x)}" cy="${F(y - 34)}" rx="46" ry="36" fill="#8d8880" stroke="#4a4642" stroke-width="5"/><ellipse cx="${F(x - 14)}" cy="${F(y - 48)}" rx="14" ry="8" fill="#b8b2a8"/>`; }
