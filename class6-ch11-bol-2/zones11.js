/* Chapter 11: things added to the world through the same hooks as zones3.js.
   LV = the rod, the small stone it rests on and the heavy stone (textbook fig 11.3), in the village yard. Metres.
   The rod turns about the centre C of the rounded top of the small stone, so it always touches it. */
const LV = { X: ROAD.VIL.X + 1.5, Z: 2.2, A: 1.20, B: 0.30, TAIL: 0.40, R: 0.018, TOP: 0.06, YC: 0.10, ST: [0.19, 0.13, 0.16], RHO: 2416, G: 9.8 };   /* density chosen so the heavy stone is 40 kg, the number in the narration */
LV.M = 4 / 3 * Math.PI * LV.ST[0] * LV.ST[1] * LV.ST[2] * LV.RHO;                 // kg (ellipsoid)
/* start: the tail of the rod touches the ground: YC + (TOP + R)cos th - TAIL sin th = R cos th -> solved by bisection */
const lvTH0 = () => { let lo = 0, hi = 1; for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; LV.YC + LV.TOP * Math.cos(m) - LV.TAIL * Math.sin(m) > 0 ? lo = m : hi = m; } return lo; };
LV.TH0 = lvTH0();
/* video 2: the heavy stone stays at XS; the small stone (fulcrum) can be moved. Arms A (hand) + B (stone) = 1.5 m, so the
   same 1.78 m rod is used: END = rod beyond the hands (two hands, 0.18 m), TAIL = rod beyond the heavy stone (B + 0.10) */
LV.XS = LV.X + LV.B; LV.END = 0.18;
function lvSet(A, B) { LV.A = A; LV.B = B; LV.TAIL = B + 0.10; LV.X = LV.XS - B; LV.TH0 = lvTH0(); }
lvSet(1.20, 0.30);
LV.TH1 = 6 * Math.PI / 180;                                                       // end of the push
/* a point of the rod: u metres along it (+ towards the heavy stone), v metres above its centre line; th = tilt, stone side down */
function lvPt(th, u, v = 0) { const n = LV.TOP + LV.R + v; return [LV.X + u * Math.cos(th) + n * Math.sin(th), LV.YC - u * Math.sin(th) + n * Math.cos(th), LV.Z]; }
const lvStone = th => lvPt(th, LV.B, LV.R + LV.ST[1] * 0.80);
/* force of the hand straight down that balances the weight of the heavy stone: moments about C */
function lvForce(th) { return LV.M * LV.G * (lvStone(th)[0] - LV.X) / (LV.X - lvPt(th, -LV.A)[0]); }

let V11 = null;
const _build3 = buildV3, _frame3 = frameV3;
buildV3 = function (k) {
  _build3(k);
  const { scene, mat, canvasTex, cyl } = k;
  const rnd = (() => { let a = 7; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();
  const stoneT = (base, seed) => canvasTex(512, 512, c => { c.fillStyle = base; c.fillRect(0, 0, 512, 512); for (let i = 0; i < 5200 + seed; i++) { const g = rnd(), r = 1 + rnd() * 3.2; c.fillStyle = g < 0.5 ? `rgba(40,36,32,${0.05 + rnd() * 0.16})` : `rgba(235,228,214,${0.05 + rnd() * 0.15})`; c.beginPath(); c.arc(rnd() * 512, rnd() * 512, r, 0, 7); c.fill(); } });
  /* heavy stone: an ellipsoid with smooth bumps and a flattened underside */
  const geo = new THREE.SphereGeometry(1, 72, 48), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const b = 1 + 0.055 * Math.sin(3.1 * x + 1.3) * Math.cos(2.7 * z) + 0.045 * Math.sin(4.3 * y + 2.2 * z + 0.6) + 0.03 * Math.sin(6.1 * x - 5.2 * z + 1) + 0.012 * Math.sin(13 * x + 9 * y) * Math.sin(11 * z - 5 * y);
    x *= b; z *= b; y *= b; if (y < -0.80) y = -0.80 - (-0.80 - y) * 0.2; p.setXYZ(i, x * LV.ST[0], y * LV.ST[1], z * LV.ST[2]); }
  geo.computeVertexNormals();
  const stone = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: stoneT('#8d8880', 1), roughness: 0.95 })); stone.castShadow = stone.receiveShadow = true; scene.add(stone);
  /* small stone: rounded top of radius TOP about C, spreading to a flat base, 0.2 m deep */
  const sh = new THREE.Shape(), a0 = 0.95; sh.moveTo(-0.135, 0); sh.quadraticCurveTo(-0.11, 0.06, -LV.TOP * Math.sin(a0), LV.YC + LV.TOP * Math.cos(a0));
  for (let i = 0; i <= 24; i++) { const a = -a0 + 2 * a0 * i / 24; sh.lineTo(LV.TOP * Math.sin(a), LV.YC + LV.TOP * Math.cos(a)); }
  sh.quadraticCurveTo(0.12, 0.07, 0.14, 0); sh.closePath();
  const st2 = stoneT('#6f6a66', 2); st2.wrapS = st2.wrapT = THREE.RepeatWrapping; st2.repeat.set(4, 4);
  const ful = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: true, bevelSize: 0.004, bevelThickness: 0.015, bevelSegments: 4 }), new THREE.MeshStandardMaterial({ map: st2, roughness: 0.95 }));
  ful.position.set(LV.X, 0, LV.Z - 0.1); ful.castShadow = ful.receiveShadow = true; scene.add(ful);
  /* the rod: wood with grain, lying along x before it is tilted */
  const wt = canvasTex(512, 64, c => { c.fillStyle = '#a9743f'; c.fillRect(0, 0, 512, 64); for (let i = 0; i < 70; i++) { c.strokeStyle = `rgba(${rnd() < 0.5 ? '70,40,14' : '214,164,104'},${0.1 + rnd() * 0.3})`; c.lineWidth = 0.6 + rnd() * 1.6; const y = rnd() * 64; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(170, y + 4 * (rnd() - 0.5), 340, y + 4 * (rnd() - 0.5), 512, y); c.stroke(); } });
  wt.center.set(0.5, 0.5); wt.rotation = Math.PI / 2;
  const L = LV.A + LV.END + LV.TAIL, rod = cyl(LV.R, LV.R, L, new THREE.MeshStandardMaterial({ map: wt, roughness: 0.75 }), 0, 0, 0, undefined, 28); rod.rotation.order = 'ZYX'; scene.add(rod);
  V11 = { stone, ful, rod, scene };
};
/* o.lever = tilt of the rod in radians (the three objects are hidden when it is not given);
   o.hands = 3D hands placed by coordinates (science-video-template/hand/hands3d.js) */
frameV3 = function (o) {
  _frame3(o);
  HANDS3D.place(V11.scene, o.hands);
  const on = o.lever !== undefined; V11.stone.visible = V11.ful.visible = V11.rod.visible = on; if (!on) return;
  const th = o.lever; V11.mid = (LV.TAIL - LV.A - LV.END) / 2; V11.ful.position.x = LV.X; V11.rod.position.set(...lvPt(th, V11.mid)); V11.rod.rotation.z = Math.PI / 2 - th;
  V11.stone.position.set(...lvStone(th)); V11.stone.rotation.z = -th;
  if (!V11.wood) { V11.wood = V11.rod.material; V11.ironM = new THREE.MeshStandardMaterial({ color: '#3d4247', roughness: 0.45, metalness: 0.7 }); } V11.rod.material = o.iron ? V11.ironM : V11.wood;
};
/* 3D hands by coordinates (world metres). dir = the way the palm pushes (the palm faces it); up = the way the fingers point */
const H3 = {
  push: (at, dir, up = [0, 1, 0], n = 'push') => ({ n, at, y: up, z: dir.map(v => -v) }),
  grip: (at, rod, back, n = 'grip0') => ({ n, at, rod, back }),
  hook: (at, fingers, back = [0, 1, 0]) => ({ n: 'hook', at, y: fingers, z: back }),
  pad: (at, fingers, back) => ({ n: 'pad', at, y: fingers, z: back }),
  mouse: (at, forward) => ({ n: 'mouse', at, y: forward, z: [0, 1, 0] }),
  cup: (at, dir, up = [0, 1, 0]) => ({ n: 'cup', at, y: up, z: dir.map(v => -v) }),
  back: (at, dir, d) => at.map((v, i) => v - dir[i] * d),   // a point d metres back from at, against dir (a hand coming in)
};
/* the 3D hand gripping the rod at its end (tilt th): the person stands behind the rod, the fingers curl over it towards
   the camera, the thumb points along the rod to the fulcrum; drop = metres above the rod while the hand comes in */
function lvHand3(th, drop = 0, du = 0) { const p = lvPt(th, -LV.A + du); return { n: 'grip', at: [p[0], p[1] + drop, p[2]], rod: [-Math.cos(th), Math.sin(th), 0], back: [Math.sin(th), Math.cos(th), 0] }; }
/* fig 11.4: two hands at the end of the rod, 0.18 m apart; the force acts between them (u = -A). The right hand is the outer one
   (the person stands behind the rod facing us, so the right hand is on the far end); the left hand is the right one reflected
   in the plane across the rod at u = -A */
/* The person stands behind the rod (0.42 m back), bent forward, shoulders 0.36 m apart and 0.55 m above the hands, so each
   arm is about 0.7 m long. Each forearm points at its own shoulder (hands3d 'toward'). Measured lean of the forearm along
   the rod: grip0 12 deg, gripV -6 deg; needed: right hand 14 to 25 deg outwards, left hand 0 to -11 deg, so right = grip0,
   left = gripV. The left hand is placed as a right hand at the mirror image of its spot, aimed at the mirror image of the
   left shoulder, then reflected in the plane across the rod at u = -A. */
function lvHands2(th, drop = 0) {
  const c = lvPt(th, -LV.A), n = [Math.cos(th), -Math.sin(th), 0], mir = q => { const d = (q[0] - c[0]) * n[0] + (q[1] - c[1] - drop) * n[1]; return [q[0] - 2 * d * n[0], q[1] - 2 * d * n[1], q[2]]; };
  const hy = c[1] + drop, sR = [c[0] - 0.18, hy + 0.55, LV.Z - 0.42], sL = [c[0] + 0.18, hy + 0.55, LV.Z - 0.42];
  const r = lvHand3(th, drop, -0.09); r.n = 'grip0'; r.toward = sR;
  const l = lvHand3(th, drop, -0.09); l.n = 'gripV'; l.toward = mir(sL); l.mirror = { p: [c[0], hy, c[2]], n };
  return [r, l];
}
const C11 = { lever: () => ({ pos: [LV.XS - 0.58, 0.6, LV.Z + 3.2], look: [LV.XS - 0.58, 0.31, LV.Z], fov: 25.5 }) };
/* placeholder for a part whose narration is ready and drawing is not */
const todoDraw = (label, title) => () => ({ svg: bg(NAVY) + txt(960, 480, label, 120, { c: Y }) + txt(960, 600, title, 60) });
/* the rod-gripping hand (science-video-template/hand/make_grip.py): rod centre under the palm at (x, y), the rod at a degrees
   on screen, pm = pixels per metre there */
const GRIP_IMG = { src: '../science-video-template/hand/hand_grip.png', size: 2400, rod: [1466.1, 1833.0], ang: -8.45, pxPerMm: 2.6667 };
function handGrip(x, y, a, pm, o = 1) { if (o <= 0) return ''; const H = GRIP_IMG, k = pm / 1000 / H.pxPerMm;
  return `<g transform="translate(${F(x)},${F(y)}) rotate(${F(a - H.ang)}) scale(${k.toFixed(4)}) translate(${-H.rod[0]},${-H.rod[1]})" opacity="${cl(o).toFixed(2)}"><image href="${H.src}" width="${H.size}" height="${H.size}"/></g>`; }
/* ---- scenes 1 and 2 ---- */
/* hand_push.png (mirrored: pushes to the right), palm at (x, y), turned by a degrees; hand_point.png, fingertip at (x, y), a = 0: pointing down */
function handImg(src, anc, ppm, x, y, a, pm, o, flip, flipY) { if (o <= 0) return ''; const k = pm / 1000 / ppm;
  return `<g transform="translate(${F(x)},${F(y)}) rotate(${F(a)}) scale(${(flip ? -k : k).toFixed(4)},${(flipY ? -k : k).toFixed(4)}) translate(${-anc[0]},${-anc[1]})" opacity="${cl(o).toFixed(2)}"><image href="../science-video-template/hand/${src}" width="2400" height="2400"/></g>`; }
const handPush3 = (x, y, a, pm, o = 1) => handImg('hand_push.png', [818.6, 1044.9], 3.7500, x, y, a, pm, o, true);
const handPoint = (x, y, a, pm, o = 1) => handImg('hand_point.png', [1527.7, 1951.2], 3.7500, x, y, a, pm, o, false);
/* tilt of the rod after the fraction k of the hand's way down (the hand's height falls evenly with k) */
function lvTilt(k) { const yA = th => lvPt(th, -LV.A)[1], yh = yA(LV.TH0) + (yA(LV.TH1) - yA(LV.TH0)) * k; let lo = LV.TH1, hi = LV.TH0; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; yA(m) < yh ? lo = m : hi = m; } return k <= 0 ? LV.TH0 : (lo + hi) / 2; }
/* the gripping hand on the rod at tilt th */
function lvHand(P, th, o, lift = 0) { const pm = pxpm(P, [LV.X, 0.2, LV.Z]), [gx, gy] = P(...lvPt(th, -LV.A)), [ex, ey] = P(...lvPt(th, -LV.A + 0.3)); return handGrip(gx, gy - lift, Math.atan2(ey - gy, ex - gx) * 180 / Math.PI, pm, o); }
const ST = { X: 6400, CART: 5500 - 40, CZ: 2.0, TW: [846.6, 1.2], WR: 0.42 };
let V12 = null;
const _b11 = buildV3, _f11 = frameV3;
buildV3 = function (k) {
  _b11(k);
  const { scene, box, cyl, mat, canvasTex } = k, G = new THREE.Group(); scene.add(G);
  const steel = mat('#8f999f', { roughness: 0.4, metalness: 0.55 }), wood = mat('#8a5a30'), wood2 = mat('#a0693a');
  const grain = canvasTex(512, 256, c => { c.fillStyle = '#9a6234'; c.fillRect(0, 0, 512, 256); for (let i = 0; i < 260; i++) { c.strokeStyle = `rgba(${i % 2 ? '60,32,10' : '210,150,90'},${0.05 + (i * 37 % 20) / 100})`; c.lineWidth = 1 + (i * 13 % 3); const x = (i * 71) % 256; c.beginPath(); c.moveTo(0, x); c.bezierCurveTo(170, x + (i * 17 % 12) - 6, 340, x - (i * 29 % 12) + 6, 512, x); c.stroke(); } });
  const gm = new THREE.MeshStandardMaterial({ map: grain, roughness: 0.75 });
  /* --- a room corner: floor, back wall, side wall with the switchboard, door, chair --- */
  const X = ST.X;
  box(9, 0.1, 8, mat('#d9cfbc', { roughness: 0.6 }), X, -0.05, 0, G, false); box(9, 3.2, 0.12, mat('#efe2c6'), X, 1.6, -2.56, G); box(0.12, 3.2, 8, mat('#e4d3ae'), X + 4.06, 1.6, 0, G);
  box(9, 0.12, 0.03, mat('#8a6a45'), X, 0.06, -2.49, G, false);
  /* door in the back wall: frame, dark opening behind it, leaf hinged on the left, opening into the room */
  const D = X - 2; box(0.96, 2.12, 0.02, mat('#3d3428'), D, 1.06, -2.495, G, false);
  box(0.09, 2.2, 0.12, wood, D - 0.52, 1.1, -2.47, G); box(0.09, 2.2, 0.12, wood, D + 0.52, 1.1, -2.47, G); box(1.13, 0.09, 0.12, wood, D, 2.18, -2.47, G);
  const door = new THREE.Group(); door.position.set(D - 0.47, 0, -2.44); G.add(door);
  { const q = box(0.94, 2.1, 0.045, gm, 0.47, 1.06, 0, door); void q; [[0.47, 1.6], [0.47, 0.6]].forEach(([x, y]) => { box(0.66, 0.74, 0.012, mat('#7a4a26'), x, y, 0.026, door); box(0.56, 0.64, 0.012, gm, x, y, 0.034, door); });
    box(0.035, 0.2, 0.02, steel, 0.86, 1.06, 0.03, door); cyl(0.012, 0.012, 0.06, steel, 0.86, 1.0, 0.06, door, 12).rotation.x = Math.PI / 2; cyl(0.012, 0.012, 0.06, steel, 0.86, 1.14, 0.06, door, 12).rotation.x = Math.PI / 2; cyl(0.013, 0.013, 0.18, steel, 0.86, 1.07, 0.09, door, 12); }
  /* switchboard on the side wall (faces -x) and a bulb in a holder above it */
  const sy = 1.35, sz = 0; box(0.03, 0.2, 0.28, mat('#f5f2ea', { roughness: 0.4 }), X + 3.985, sy, sz, G);
  const rock = [-0.08, 0, 0.08].map(z => { const q = new THREE.Group(); q.position.set(X + 3.965, sy, sz + z); G.add(q); box(0.012, 0.085, 0.05, mat('#d9d5c8', { roughness: 0.35 }), 0, 0, 0, q, false); box(0.016, 0.07, 0.036, mat('#fffdf6', { roughness: 0.3 }), -0.004, 0, 0, q, false); return q; });
  cyl(0.06, 0.06, 0.03, mat('#f5f2ea'), X + 3.98, sy + 0.42, sz, G, 24).rotation.z = Math.PI / 2; cyl(0.022, 0.026, 0.08, mat('#e8e2d2'), X + 3.93, sy + 0.42, sz, G, 16).rotation.z = Math.PI / 2;
  const bm = new THREE.MeshStandardMaterial({ color: '#f4f1e6', emissive: '#ffd970', emissiveIntensity: 0, roughness: 0.2 }), bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 28, 20), bm); bulb.position.set(X + 3.86, sy + 0.42, sz); G.add(bulb);
  const bl = new THREE.PointLight('#ffdf95', 0, 4, 1.5); bl.position.set(X + 3.6, sy + 0.42, sz + 0.1); G.add(bl);
  /* wooden chair; its front faces +z; a table stands behind it */
  const chair = new THREE.Group(); scene.add(chair);
  box(0.44, 0.035, 0.42, gm, 0, 0.45, 0, chair); [[-0.19, 0.18], [0.19, 0.18]].forEach(([x, z]) => box(0.04, 0.45, 0.04, wood, x, 0.225, z, chair)); [[-0.19, -0.18], [0.19, -0.18]].forEach(([x, z]) => box(0.04, 0.95, 0.04, wood, x, 0.475, z, chair));
  box(0.42, 0.09, 0.025, gm, 0, 0.88, -0.18, chair); box(0.42, 0.07, 0.02, gm, 0, 0.7, -0.18, chair); box(0.38, 0.025, 0.025, wood, 0, 0.2, 0.18, chair, false); box(0.025, 0.025, 0.36, wood, -0.19, 0.16, 0, chair, false); box(0.025, 0.025, 0.36, wood, 0.19, 0.16, 0, chair, false);
  /* drawer lining and geometry box (video 1, part 2ক), placed on the study room's drawer */
  const T = ROAD.ROOM.TABLE, din = new THREE.Group(); scene.add(din);
  box(0.5, 0.006, 0.5, mat('#4a2f18'), 0, 0, 0, din, false);
  const gt = canvasTex(256, 128, c => { c.fillStyle = '#c62f2f'; c.fillRect(0, 0, 256, 128); c.strokeStyle = '#ffd24a'; c.lineWidth = 6; c.strokeRect(10, 10, 236, 108); c.fillStyle = '#fff'; c.font = '700 44px "Hind Siliguri"'; c.textAlign = 'center'; c.fillText('জ্যামিতি বক্স', 128, 78); });
  { const sd = mat('#a92626', { metalness: 0.3 }); const q = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.014, 0.1), [sd, sd, new THREE.MeshStandardMaterial({ map: gt, roughness: 0.4 }), sd, sd, sd]); q.position.set(0, 0.01, 0.12); din.add(q); }
  /* tubewell */
  const W = ST.TW, tw = new THREE.Group(); tw.position.set(W[0], 0, W[1]); scene.add(tw); const iron = mat('#3f6b4f', { roughness: 0.5, metalness: 0.35 });
  box(1.8, 0.1, 1.3, mat('#b3aea3', { roughness: 1 }), 0.15, 0.05, 0, tw); cyl(0.055, 0.06, 0.6, iron, 0, 0.4, 0, tw, 24); cyl(0.095, 0.085, 0.3, iron, 0, 0.82, 0, tw, 28); cyl(0.11, 0.11, 0.03, iron, 0, 0.98, 0, tw, 28); cyl(0.1, 0.1, 0.03, iron, 0, 0.12, 0, tw, 24);
  { const sp = cyl(0.032, 0.038, 0.26, iron, 0.2, 0.8, 0, tw, 18); sp.rotation.z = Math.PI / 2; cyl(0.032, 0.032, 0.09, iron, 0.32, 0.765, 0, tw, 18); box(0.03, 0.2, 0.03, iron, -0.09, 1.06, 0.035, tw); box(0.03, 0.2, 0.03, iron, -0.09, 1.06, -0.035, tw); }
  const arm = new THREE.Group(); arm.position.set(-0.09, 1.13, 0); tw.add(arm); { const q = cyl(0.018, 0.016, 0.86, iron, -0.33, 0, 0, arm, 18); q.rotation.z = Math.PI / 2; cyl(0.02, 0.02, 0.1, iron, 0, 0, 0, arm, 14).rotation.x = Math.PI / 2; }
  const rodp = cyl(0.01, 0.01, 0.3, steel, 0, 1.06, 0, tw, 10);
  const water = cyl(0.016, 0.02, 0.4, new THREE.MeshStandardMaterial({ color: '#8fd0f2', transparent: true, opacity: 0.8, roughness: 0.1 }), 0.32, 0.5, 0, tw, 16);
  { const b = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0.01], [0.12, 0.01], [0.16, 0.26], [0.17, 0.26], [0.165, 0.27], [0.15, 0.26], [0.11, 0.03], [0.001, 0.03]].map(q => new THREE.Vector2(q[0], q[1])), 40), mat('#2a77b8', { roughness: 0.4, side: THREE.DoubleSide })); b.position.set(0.33, 0.1, 0); b.castShadow = true; tw.add(b); }
  /* hand cart (fig 11.1): plank deck, two big spoked wheels, sacks, two shafts to the front (+x) */
  const cart = new THREE.Group(); scene.add(cart), cart.position.z = ST.CZ;
  for (let i = 0; i < 6; i++) box(2.2, 0.035, 0.165, i % 2 ? gm : wood2, 0, 0.72, -0.43 + i * 0.172, cart);
  [-0.46, 0.46].forEach(z => { const q = cyl(0.03, 0.035, 3.3, wood, 0.5, 0.68, z, cart, 16); q.rotation.z = Math.PI / 2; }); [-0.8, 0, 0.8].forEach(x => box(0.07, 0.06, 1.0, wood, x, 0.66, 0, cart));
  { const q = cyl(0.025, 0.025, 1.2, steel, 0, ST.WR, 0, cart, 12); q.rotation.x = Math.PI / 2; [-0.35, 0.35].forEach(z => box(0.07, 0.28, 0.07, wood, 0, 0.55, z, cart)); }
  const wheels = [-0.6, 0.6].map(z => { const w = new THREE.Group(); w.position.set(0, ST.WR, z); cart.add(w); const t = new THREE.Mesh(new THREE.TorusGeometry(ST.WR - 0.035, 0.035, 14, 56), mat('#232323', { roughness: 0.9 })); t.castShadow = true; w.add(t); const r = new THREE.Mesh(new THREE.TorusGeometry(ST.WR - 0.075, 0.016, 10, 48), steel); w.add(r);
    cyl(0.055, 0.055, 0.12, wood, 0, 0, 0, w, 20).rotation.x = Math.PI / 2; for (let i = 0; i < 12; i++) { const s = cyl(0.012, 0.012, ST.WR - 0.1, wood2, 0, 0, 0, w, 8), a = i * Math.PI / 6; s.position.set(-Math.sin(a) * (ST.WR - 0.1) / 2, Math.cos(a) * (ST.WR - 0.1) / 2, 0); s.rotation.z = a; } return w; });
  const jute = canvasTex(256, 256, c => { c.fillStyle = '#c9a66e'; c.fillRect(0, 0, 256, 256); for (let i = 0; i < 256; i += 4) { c.fillStyle = `rgba(90,62,25,${i % 8 ? 0.16 : 0.3})`; c.fillRect(i, 0, 1.5, 256); c.fillRect(0, i, 256, 1.5); } });
  const sackM = new THREE.MeshStandardMaterial({ map: jute, roughness: 1 });
  [[-0.62, 0.86, -0.22], [0.1, 0.86, -0.22], [0.75, 0.85, -0.2], [-0.62, 0.86, 0.24], [0.1, 0.86, 0.24], [0.75, 0.85, 0.22], [-0.25, 1.08, 0], [0.45, 1.08, 0.02]].forEach(([x, y, z], i) => { const g = new THREE.SphereGeometry(1, 36, 24), q = g.attributes.position; for (let j = 0; j < q.count; j++) { const f = v => Math.sign(v) * Math.pow(Math.abs(v), 0.55); q.setXYZ(j, f(q.getX(j)), f(q.getY(j)) * (1 + 0.04 * Math.sin(7 * q.getX(j) + i)), f(q.getZ(j))); } g.computeVertexNormals(); const m = new THREE.Mesh(g, sackM); m.scale.set(0.35, 0.125, 0.22); m.position.set(x, y, z); m.rotation.y = 0.06 * Math.sin(i * 2.1); m.castShadow = m.receiveShadow = true; cart.add(m); });
  V12 = { G, door, rock, bm, bl, chair, din, tw, arm, rodp, water, cart, wheels };
};
/* o: boulder (x offset, m) | drawer lining with o.room.drawer | o.set {door deg, sw 0..1, chair m} | o.pump deg (+ = handle end down) | o.cart m along x */
frameV3 = function (o) {
  _f11(o);
  if (o.boulder !== undefined) { V11.stone.visible = true; V11.stone.rotation.z = 0; V11.stone.position.set(LV.X + o.boulder, LV.ST[1] * 0.80, LV.Z); }
  const T = ROAD.ROOM.TABLE, d = o.room && o.room.drawer; V12.din.visible = d !== undefined && !!o.geo; if (V12.din.visible) V12.din.position.set(ROAD.ROOM.X + T[0], T[1] - 0.042, T[2] + d);
  const q = o.set || {}; V12.G.visible = !!o.set; V12.door.rotation.y = -(q.door || 0) * Math.PI / 180; V12.rock[1].rotation.z = (q.sw ? 0.16 : -0.16); V12.rock[0].rotation.z = V12.rock[2].rotation.z = -0.16;   // off: all alike; on: the middle one flipped V12.bm.emissiveIntensity = q.sw ? 1.4 : 0; V12.bl.intensity = q.sw ? 0.9 : 0;
  V12.chair.visible = q.chair !== undefined; if (V12.chair.visible) V12.chair.position.set(ST.X + 1, 0, -1.6 + q.chair);
  V12.tw.visible = o.pump !== undefined; if (V12.tw.visible) { const a = o.pump * Math.PI / 180; V12.arm.rotation.z = a; V12.rodp.position.y = 1.06 + 0.09 * Math.sin(a); V12.water.visible = !!o.water; }
  V12.cart.visible = o.cart !== undefined; if (V12.cart.visible) { V12.cart.position.x = ST.CART + o.cart; V12.wheels.forEach(w => { w.rotation.z = -o.cart / ST.WR; }); }
};
Object.assign(C11, {
  boulder: () => ({ pos: [LV.X - 0.22, 0.42, LV.Z + 2.6], look: [LV.X - 0.22, 0.2, LV.Z], fov: 21 }),
  door: () => ({ pos: [ST.X - 0.9, 1.4, 1.6], look: [ST.X - 1.75, 1.05, -2.4], fov: 34 }),
  sw: () => ({ pos: [ST.X + 2.85, 1.52, 1.25], look: [ST.X + 3.82, 1.45, -0.02], fov: 29 }),
  chair: () => ({ pos: [ST.X + 2.6, 1.4, 2.0], look: [ST.X + 1.05, 0.42, -0.9], fov: 30 }),
  pump: () => ({ pos: [ST.TW[0] - 0.25, 1.15, ST.TW[1] + 4.2], look: [ST.TW[0] - 0.25, 0.86, ST.TW[1]], fov: 35 }),
  cart: x => ({ pos: [ST.CART + x + 0.4, 1.45, ST.CZ + 5.6], look: [ST.CART + x + 0.4, 0.8, ST.CZ - 1], fov: 36 }),
});
/* the cart's hands at cart position C (world x of its centre); rear = pushing palms, front = the puller's fist from above: the back of the hand up, the four fingers round the shaft's outer side, the thumb on its inner side, the person stands between the shafts, a right hand on the right (+z) shaft and the mirrored left hand on the other; the arms hang from the shoulders, so each forearm rises nearly upright, a little inwards */
const cartHands = (C, rear = true, front = true) => [...(rear ? [-0.22, 0.22].map(dz => H3.push([C - 1.11, 0.72, ST.CZ + dz], [1, 0, 0])) : []), ...(front ? [H3.grip([C + 1.75, 0.68, ST.CZ + 0.46], [-1, 0, 0], [0, 1, 0], 'gripV'), Object.assign(H3.grip([C + 1.75, 0.68, ST.CZ + 0.46], [-1, 0, 0], [0, 1, 0], 'gripV'), { mirrorZ: ST.CZ })] : [])];
const big = (s) => `<span style="font-size:52px">${s}</span>`;
/* ---- new hands (2026-11-26) ---- */
/* how real hands do it: a hooked index finger pulls a ring; the whole hand rests on a mouse; a bent finger's pad presses a switch */
const handHook = (x, y, a, pm, o = 1) => handImg('hand_hook.png', [928.9, 1397.5], 4.6154, x, y, a, pm, o, false);
const handMouse = (x, y, a, pm, o = 1) => handImg('hand_mouse.png', [843.5, 1412.0], 4.6154, x, y, a, pm, o, false);
const handPad = (x, y, a, pm, o = 1, flip = false) => handImg('hand_pad.png', [695.9, 1392.7], 4.6154, x, y, a, pm, o, flip);
/* the open palm turned upside down: the fingers hang down and their pads push sideways (to the right) */
const handFingersPush = (x, y, pm, o = 1) => handImg('hand_push.png', [818.6, 1044.9], 3.75, x, y - 0.055 * pm, 0, pm, o, true, true);
/* the palm pressing straight down, fingers to the right (the heel of the hand on the contact point) */
const handPalmDown = (x, y, pm, o = 1) => handPush3(x + 0.03 * pm, y, 90, pm, o);
/* a cupped hand, palm to the left (catching); flipY: the other hand, fingers down */
const handCup = (x, y, a, pm, o = 1, flipY = false) => handImg('hand_cup.png', [818.6, 1044.9], 3.7500, x, y, a, pm, o, false, flipY);
