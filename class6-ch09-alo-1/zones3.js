/* Video 3: new 3D places, each far along x, built through the hooks world3d.js calls (buildV3 once, frameV3 every frame).
   HWY     straight highway 2200..2900 (acceleration, braking, speed-limit sign)
   BEND    a bend of radius 30 m at 3700 (centre of the curve at z = +30)
   NARROW  a road 4.4 m wide between brick walls at 4500
   BRIDGE  a bridge over a canal at 5000
   VILL    two tin houses and a school on one straight village path at 5500 (40 m and 50 m: 1 m stands for 40 m)
   LANES   three chalk lanes of 100 m in the school field, x = FIELD.X - 50 .. + 50 */
const Z3 = { HWY: 2200, HWY_L: 700, SIGN: 520, BEND: 3700, BR: 30, NARROW: 4500, BRIDGE: 5000, VILL: 5500, LZ: [44, 48, 52], LX: 1450 };
let V3 = null;

function buildV3(k) {
  const { scene, box, cyl, mat, canvasTex, mkCar } = k, G = new THREE.Group(); scene.add(G);
  const asphalt = mat('#3f4247', { roughness: 0.95 }), white = new THREE.MeshBasicMaterial({ color: '#f2f2ee' }), earth = mat('#b99a6a', { roughness: 1 });
  const flat = (x, z, w, d, m, y = 0.012) => { const q = new THREE.Mesh(new THREE.PlaneGeometry(w, d), m); q.rotation.x = -Math.PI / 2; q.position.set(x, y, z); q.receiveShadow = true; G.add(q); return q; };
  const steel = mat('#8f999f', { roughness: 0.45, metalness: 0.5 });
  const lampPost = (x, z, dir) => { cyl(0.07, 0.1, 7, steel, x, 3.5, z, G, 10); box(0.07, 0.07, 1.6, steel, x, 6.95, z + dir * 0.8, G); box(0.22, 0.1, 0.6, mat('#e9edf0'), x, 6.88, z + dir * 1.5, G, false); };
  /* a tin-roofed house: walls of bamboo mat, gable roof of corrugated tin, door and window on the +z side */
  const matT = canvasTex(256, 128, g => { g.fillStyle = '#c9a66b'; g.fillRect(0, 0, 256, 128); g.strokeStyle = 'rgba(90,60,25,.4)'; g.lineWidth = 3; for (let i = 0; i < 256; i += 12) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 128); g.stroke(); } for (let j = 0; j < 128; j += 12) { g.beginPath(); g.moveTo(0, j); g.lineTo(256, j); g.stroke(); } });
  const tinT = canvasTex(256, 64, g => { for (let i = 0; i < 256; i++) { const q = 0.5 + 0.5 * Math.sin(i / 256 * Math.PI * 40); g.fillStyle = `rgb(${120 + 60 * q},${130 + 60 * q},${138 + 60 * q})`; g.fillRect(i, 0, 1, 64); } });
  const tinM = new THREE.MeshStandardMaterial({ map: tinT, roughness: 0.5, metalness: 0.4, side: THREE.DoubleSide });
  const house = (x, z) => { const H = new THREE.Group(); H.position.set(x, 0, z); G.add(H);
    box(8, 2.8, 5, new THREE.MeshStandardMaterial({ map: matT, roughness: 1 }), 0, 1.7, 0, H); box(8.4, 0.3, 5.4, mat('#8a6a45'), 0, 0.15, 0, H);
    box(1.1, 2, 0.06, mat('#6b4324'), -1.5, 1.3, 2.52, H, false); box(1.1, 0.9, 0.06, mat('#3d2a18'), 1.8, 1.9, 2.52, H, false);
    const gs = new THREE.Shape(); gs.moveTo(-2.5, 0); gs.lineTo(2.5, 0); gs.lineTo(0, 1.6); gs.closePath();
    [-4, 4].forEach(q => { const m = new THREE.Mesh(new THREE.ShapeGeometry(gs), new THREE.MeshStandardMaterial({ color: '#a98a55', side: THREE.DoubleSide })); m.rotation.y = Math.PI / 2; m.position.set(q, 3.1, 0); H.add(m); });
    [-1, 1].forEach(s => { const a = Math.atan2(1.6, 2.5), r = new THREE.Mesh(new THREE.PlaneGeometry(9, 3.5), tinM); r.rotation.order = 'YXZ'; r.rotation.x = -Math.PI / 2 + s * a; r.position.set(0, 3.12 + 1.6 - 1.75 * Math.sin(a) + 0.02, s * 1.75 * Math.cos(a)); r.castShadow = true; H.add(r); }); };
  const school = (x, z) => { const t = canvasTex(1024, 320, (g, w, h) => { g.fillStyle = '#e8d5a8'; g.fillRect(0, 0, w, h);
      for (let f = 0; f < 2; f++) for (let i = 0; i < 8; i++) { const X = 40 + i * 124, Yy = 90 + f * 118; g.fillStyle = '#5b4632'; g.fillRect(X - 5, Yy - 5, 78, 86); g.fillStyle = '#2f6b8f'; g.fillRect(X, Yy, 68, 76); }
      g.fillStyle = '#1f7a4d'; g.fillRect(262, 4, 500, 76); g.fillStyle = '#fff'; g.font = '700 58px "Hind Siliguri"'; g.textAlign = 'center'; g.fillText('উচ্চ বিদ্যালয়', 512, 62); });
    const bm = mat('#d9c494'), b = new THREE.Mesh(new THREE.BoxGeometry(18, 6, 6), [bm, bm, mat('#9a948a'), bm, new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }), bm]); b.position.set(x, 3, z); b.castShadow = b.receiveShadow = true; G.add(b); };

  // ---- highway
  { const cx = Z3.HWY + Z3.HWY_L / 2, L = Z3.HWY_L;
    box(L + 300, 0.1, 400, earth, cx, -0.12, -60, G, false); box(L, 0.1, 9, asphalt, cx, -0.05, 0, G, false);
    [-1, 1].forEach(s => flat(cx, s * 4.1, L, 0.15, white));
    for (let x = Z3.HWY; x < Z3.HWY + L; x += 9) flat(x + 1.5, 0, 3, 0.15, white);
    for (let x = Z3.HWY; x < Z3.HWY + L; x += 25) lampPost(x, -6.2, 1);
    for (let x = Z3.HWY + 30, i = 0; x < Z3.HWY + L; x += 46, i++) house(x, -24 - (i % 3) * 6);
    box(L, 1.4, 0.25, mat('#b56b4a', { roughness: 1 }), cx, 0.7, -14, G);                              // brick boundary wall
    const sg = canvasTex(256, 256, g => { g.fillStyle = '#fff'; g.beginPath(); g.arc(128, 128, 124, 0, 7); g.fill(); g.strokeStyle = '#d32020'; g.lineWidth = 30; g.beginPath(); g.arc(128, 128, 108, 0, 7); g.stroke(); g.fillStyle = '#111'; g.font = '700 120px "Hind Siliguri"'; g.textAlign = 'center'; g.fillText('৪০', 128, 172); });
    const sx = Z3.HWY + Z3.SIGN; cyl(0.04, 0.04, 2.6, steel, sx, 1.3, -5.4, G, 10);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(0.62, 40), new THREE.MeshBasicMaterial({ map: sg, side: THREE.DoubleSide })); disc.position.set(sx - 0.06, 2.7, -5.4); disc.rotation.y = -0.6; G.add(disc); }

  // ---- bend: straight along +x to BEND, then a quarter circle (centre (BEND, 30)) turning towards +z, then straight along +z
  { const X = Z3.BEND, R = Z3.BR; box(900, 0.1, 900, earth, X, -0.12, 30, G, false);
    const pts = r => { const p = []; for (let x = -110; x <= 0; x += 5) p.push([X + x, R - r]); for (let i = 1; i <= 40; i++) { const a = i / 40 * Math.PI / 2; p.push([X + r * Math.sin(a), R - r * Math.cos(a)]); } for (let z = 5; z <= 110; z += 5) p.push([X + r, R + z]); return p; };
    const ribbon = (r1, r2, m, y) => { const A = pts(r1), B = pts(r2), pos = [], idx = []; A.forEach((a, i) => { pos.push(a[0], y, a[1], B[i][0], y, B[i][1]); if (i) { const q = 2 * i; idx.push(q - 2, q, q - 1, q - 1, q, q + 1); } });
      const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals(); const q = new THREE.Mesh(geo, m); q.receiveShadow = true; G.add(q); };
    ribbon(R - 4.5, R + 4.5, new THREE.MeshStandardMaterial({ color: '#4a4d52', roughness: 0.95, side: THREE.DoubleSide }), 0.005);
    const wd = new THREE.MeshBasicMaterial({ color: '#f2f2ee', side: THREE.DoubleSide });
    ribbon(R - 4.25, R - 4.1, wd, 0.02); ribbon(R + 4.1, R + 4.25, wd, 0.02); ribbon(R - 0.07, R + 0.07, wd, 0.02);
    house(X - 42, -22); house(X - 70, -24); house(X - 22, 42); house(X - 40, 50); }

  // ---- narrow road
  { const X = Z3.NARROW; box(400, 0.1, 300, earth, X, -0.12, 0, G, false); box(140, 0.1, 4.4, asphalt, X, -0.05, 0, G, false);
    box(140, 1.5, 0.25, mat('#b56b4a', { roughness: 1 }), X, 0.75, -2.75, G); box(140, 0.35, 0.25, mat('#b56b4a', { roughness: 1 }), X, 0.17, 2.75, G);
    for (let i = -2; i <= 2; i++) house(X + i * 22 + 4, -8); lampPost(X - 8, -3.1, 1); lampPost(X + 22, -3.1, 1); }

  // ---- bridge: land on both sides of a 26 m canal
  { const X = Z3.BRIDGE; [-1, 1].forEach(s => { box(290, 4, 400, earth, X + s * 158, -2.06, 0, G, false); box(90, 0.1, 8, asphalt, X + s * 58, -0.045, 0, G, false); });
    box(60, 0.1, 400, mat('#4f93b8', { roughness: 0.2, metalness: 0.1 }), X, -2.6, 0, G, false);
    box(26.4, 0.5, 8, mat('#9d9a92'), X, -0.25, 0, G); flat(X, 0, 26.4, 7, asphalt, 0.006);
    [-6, 6].forEach(x => [-3, 3].forEach(z => cyl(0.5, 0.5, 2.6, mat('#8d897f'), X + x, -1.6, z, G, 16)));
    [-1, 1].forEach(s => { box(27, 0.14, 0.16, mat('#e9e6dc'), X, 1.05, s * 3.85, G); box(27, 0.1, 0.12, mat('#e9e6dc'), X, 0.6, s * 3.85, G); for (let x = -13; x <= 13; x += 2.6) box(0.2, 1.1, 0.2, mat(Math.abs(x) % 5.2 < 1 ? '#222' : '#f3f0e6'), X + x, 0.55, s * 3.85, G); });
    for (let x = -100; x <= 100; x += 9) if (Math.abs(x) > 14) flat(X + x, 0, 3, 0.15, white, 0.02);
    house(X - 34, -14); house(X + 36, -16); }

  // ---- village path: Robin's house (x -46), school gates (-6 and +6), Shahin's house (+56)
  { const X = Z3.VILL; box(500, 0.1, 400, earth, X, -0.12, 0, G, false);
    flat(X + 5, 2, 108, 3, mat('#a3583f', { roughness: 1 }), 0.01); house(X - 49, -4); house(X + 59, -4); school(X + 1, -5);
    const bm = mat('#b08948'); cyl(0.05, 0.05, 2.2, bm, X - 34, 1.1, -3, G, 8); cyl(0.05, 0.05, 2.2, bm, X - 28, 1.1, -3, G, 8); box(6, 0.02, 0.02, mat('#4a3b2c'), X - 31, 2.1, -3, G, false);
    [['#c0392b', -32.6], ['#2e86ab', -30.4]].forEach(([c, x]) => box(1.1, 0.9, 0.02, mat(c, { roughness: 1 }), X + x, 1.6, -3, G)); }

  // ---- lanes
  { const lime = new THREE.MeshBasicMaterial({ color: '#f4f0e4' }), X = Z3.LX;
    box(240, 0.1, 100, mat('#c7a676', { roughness: 1 }), ROAD.FIELD.X, -0.06, 125, G, false);
    Z3.LZ.forEach(z => { flat(X + 50, z, 100, 0.12, lime, 0.013); for (let m = 0; m <= 100; m += 10) flat(X + m, z, 0.2, 1.6, lime, 0.014); });
    for (let m = 0; m <= 20; m++) flat(X + m, Z3.LZ[0], 0.06, 0.6, lime, 0.014); }

  // ---- things that move
  const cars = ['#b3261e', '#1f5fa8', '#e9ecef'].map(c => { const q = mkCar(c); scene.add(q); q.visible = false; return q; });
  const mT = canvasTex(64, 32, g => { g.fillStyle = '#1f8f6b'; g.fillRect(0, 0, 64, 32); g.fillStyle = '#f4d35e'; for (let i = 0; i < 4; i++) { g.beginPath(); g.ellipse(8 + i * 16, 16, 3, 13, 0.6, 0, 7); g.fill(); } });
  const marble = new THREE.Mesh(new THREE.SphereGeometry(0.0125, 32, 20), new THREE.MeshStandardMaterial({ map: mT, roughness: 0.12, metalness: 0.1 })); marble.castShadow = true; scene.add(marble);
  const chalk = new THREE.Group(); scene.add(chalk); [0, 2].forEach(x => { const q = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 0.5), new THREE.MeshBasicMaterial({ color: '#ffffff' })); q.rotation.x = -Math.PI / 2; q.position.set(x, 0.012, 0); chalk.add(q); });
  chalk.position.set(MB.X0, MB.FLOOR, MB.Z);
  V3 = { cars, marble, chalk };
}
/* o.v3 = { cars: [{x, z, h (heading, radians, 0 = +x, + = towards +z), d (metres rolled)}], marble: metres rolled } */
function frameV3(o) {
  const q = o.v3 || {};
  V3.cars.forEach((c, i) => { const a = (q.cars || [])[i]; c.visible = !!a; if (!a) return; c.position.set(a.x, 0, a.z); c.rotation.y = -(a.h || 0); c.userData.wheels.forEach(w => { w.rotation.z = -(a.d === undefined ? a.x : a.d) / ROAD.CAR_R; }); });
  V3.marble.visible = V3.chalk.visible = q.marble !== undefined;
  if (q.marble !== undefined) { V3.marble.position.set(MB.X0 + q.marble, MB.FLOOR + 0.0125, MB.Z); V3.marble.rotation.z = -q.marble / 0.0125; }
}
/* the marble run in the lab: two chalk lines 2 m apart on the floor */
const MB = { X0: ROAD.LAB.X - 1.2, FLOOR: 0.0, Z: -0.6 };

/* cameras */
const C3 = {
  hwy: x => ({ pos: [x - 3, 3.0, 13], look: [x + 2.5, 1.2, -2], fov: 40 }),
  hwyFar: x => ({ pos: [x, 50, 130], look: [x, 0, 2], fov: 44 }),
  bend: () => ({ pos: [Z3.BEND - 22, 34, 64], look: [Z3.BEND + 14, 0, 8], fov: 38 }),
  narrow: () => ({ pos: [Z3.NARROW - 7, 5.5, 15], look: [Z3.NARROW, 0.6, -0.5], fov: 42 }),
  bridge: () => ({ pos: [Z3.BRIDGE - 18, 8, 25], look: [Z3.BRIDGE - 4, -0.2, 0], fov: 46 }),
  sign: () => ({ pos: [Z3.HWY + Z3.SIGN - 17, 3.4, 8.5], look: [Z3.HWY + Z3.SIGN - 4, 1.5, -3], fov: 46 }),
  vill: () => ({ pos: [Z3.VILL + 5, 22, 80], look: [Z3.VILL + 5, 1.0, 0], fov: 46 }),
  lanes: () => ({ pos: [Z3.LX + 50, 27, 132], look: [Z3.LX + 50, 0, 46], fov: 43 }),
  lane15: () => ({ pos: [Z3.LX + 7.5, 3.9, Z3.LZ[0] + 15.6], look: [Z3.LX + 7.5, 1.75, Z3.LZ[0]], fov: 37 }),
  marble: () => ({ pos: [MB.X0 + 1.0, 0.62, MB.Z + 2.7], look: [MB.X0 + 1.0, 0.1, MB.Z], fov: 32 }),
};
/* ---- shared overlay helpers of video 3 ---- */
const BLUE = '#4db2ff';
function hintCard(text, p, top = 770) {
  if (p <= 0) return '';
  return `<div class="abs" style="left:0;width:1920px;top:${top}px;display:flex;justify-content:center;opacity:${cl(p * 2).toFixed(2)}"><div style="display:flex;align-items:center;gap:30px;background:#fff;border-radius:44px;padding:16px 46px 12px 18px;box-shadow:0 9px 0 rgba(0,0,0,.25);transform:scale(${back(p).toFixed(3)})"><span style="background:${Y};color:#0f1b3d;font-weight:700;font-size:48px;line-height:1;padding:18px 34px 12px;border-radius:34px">হিন্ট</span><span style="color:#0f1b3d;font-weight:700;font-size:48px;line-height:1.25">${text}</span></div></div>`;
}
/* a question row at the top centre */
function qTop(text, p, top = 150, size = 54) { return p <= 0 ? '' : `<div class="abs" style="left:0;width:1920px;top:${top}px;display:flex;justify-content:center;opacity:${cl(p * 2).toFixed(2)}"><div class="qcard" style="font-size:${size}px;padding:22px 50px 14px;transform:scale(${back(p).toFixed(3)})">${text}</div></div>`; }
/* formula line: navy pill, big text */
function eqn(html, p, top, size = 58) { return p <= 0 ? '' : `<div class="abs" style="left:0;width:1920px;top:${top}px;display:flex;justify-content:center;opacity:${cl(p * 2).toFixed(2)}"><div style="background:rgba(15,27,61,.94);border:3px solid ${Y};border-radius:36px;color:#fff;font-weight:700;font-size:${size}px;line-height:1.25;padding:20px 50px 12px;transform:scale(${back(p).toFixed(3)})">${html}</div></div>`; }
const yel = s => `<b style="color:${Y}">${s}</b>`;
/* displacement arrow on the ground, from a to b metres along the north-south line, dy px below it */
function dispArrow(P, a, b, p, dy = 0) { const N = ROAD.NS, [x1, y1] = P(N.X + a, 0.02, N.Z), [x2, y2] = P(N.X + a + (b - a) * p, 0.02, N.Z); return arrow2(x1, y1 + dy, x2, y2 + dy, p > 0 ? 1 : 0, BLUE); }

/* ---- motions used by more than one part ---- */
const HOOK = { X0: -92, A: 1.0, VM: 14 };
const hookS = q => q <= 0 ? 0 : q < HOOK.VM / HOOK.A ? 0.5 * HOOK.A * q * q : HOOK.VM * HOOK.VM / HOOK.A / 2 + HOOK.VM * (q - HOOK.VM / HOOK.A);
const hookCam = x => { const p = [x - 0.6, 1.1, ROAD.LANE_Z + 0.05]; return { pos: p, look: [p[0] + 0.75, 1.15, p[2] - 1.7], fov: 66 }; };   // your eyes, kerb-side rear seat, 0.9 m from the glass
const hookV = q => cl(HOOK.A * q, 0, HOOK.VM);
const accS = q => q <= 5 ? 20 * q + 2.5 * q * q : 162.5 + 45 * (q - 5);
const marbleS = q => 0.64 * q - 0.035 * q * q;                                  // 2 m in 4 s, slowing 0.07 m/s²
const marbleSlow = q => (2 / 6 + 0.035 * 6) * q - 0.035 * q * q;                // 2 m in 6 s, the same 0.07 m/s²
const KH3 = { XC: 5, Y: 0.7768 };
/* the walked trail on the north-south line: d metres walked, turning back after `turn` metres */
const nsZ = (d, turn) => d <= turn ? 0 : ANI.ZB * Math.min(1, (d - turn) / 0.7);
function nsTrail(P, d, turn, o = 1) {
  const X = ROAD.NS.X, Z = ROAD.NS.Z; if (d <= 0.02) return '';
  let s = path3(P, [[X, 0.02, Z], [X + Math.min(d, turn), 0.02, Z]], Y, 11, '', o);
  if (d > turn) { const p = []; for (let k = 0; k <= 16; k++) { const u = turn + (d - turn) * k / 16; p.push([X + 2 * turn - u, 0.02, Z + nsZ(u, turn)]); } s += path3(P, p, Y, 11, '', o); }
  return s;
}
const nsHeadSvg = () => `<g transform="translate(200,0)">${nsCompass(80)}</g>`;
const nsHead = f => f ? `<div class="abs" style="right:60px;top:48px"><span class="fig">${f}</span></div>` : '';
/* the bend: cars keep left, lane radius 32 m round (BEND, 30); s = metres along the lane, 0 where the curve begins */
function bendSafe(s) { const R = 32, X = Z3.BEND, a = cl(s / R, 0, Math.PI / 2), ex = Math.max(0, s - R * Math.PI / 2);
  return { x: X + Math.min(s, 0) + R * Math.sin(a), z: 30 - R * Math.cos(a) + ex, h: a, d: s }; }
/* the fast car, q seconds after it starts 44 m before the bend */
function bendFast(_, q) { const X = Z3.BEND, v = 20, Rf = v * v / (0.7 * 9.8), t1 = 2.2, aOff = 0.345, t2 = t1 + Rf * aOff / v, b = 6;
  if (q < t1) return { x: X - 44 + v * q, z: -2, h: 0, v, d: v * q };
  if (q < t2) { const a = v * (q - t1) / Rf; return { x: X + Rf * Math.sin(a), z: -2 + Rf * (1 - Math.cos(a)), h: a + 0.12 * (a / aOff), v, d: v * q }; }
  const w = Math.min(q - t2, v / b), l = v * w - 0.5 * b * w * w; return { x: X + Rf * Math.sin(aOff) + l * Math.cos(aOff), z: -2 + Rf * (1 - Math.cos(aOff)) + l * Math.sin(aOff), h: aOff + 0.12 + 0.25 * (l / 33.3), v: v - b * w, d: v * t2 + l }; }
/* the one-second marks seen from far above the road, gaps in metres between them; rev = braking */
function accMarks(t, p, rev, S) {
  const xA = Z3.HWY + 260, pos = k => rev ? 45 * k - 2.5 * k * k : accS(k), P = W3.frame({ cam: C3.hwyFar(xA + 81) }); let s = '', u = '';
  for (let k = 0; k <= 5; k++) { const q = pr(p, k / 7, k / 7 + 0.1); s += dot3(P, [xA + pos(k), 0.03, -2], Y, 17, q); const [x, y] = P(xA + pos(k), 0.03, -2); u += lab(x, y + 64, BN(k) + ' সে.', 'name', q);
    if (k) { const [x0] = P(xA + pos(k - 1), 0.03, -2); s += path3(P, [[xA + pos(k - 1), 0.03, -2], [xA + pos(k), 0.03, -2]], Y, 8, '', q); u += lab((x + x0) / 2, y - 62, BNF(pos(k) - pos(k - 1), 1) + ' মি.', 'move', q); } }
  return { s, u };
}
/* a hand letting the marble go: the pushing finger of the approved hand, its tip at (x, y) */
function marbleHand(x, y) { return handFinger(x, y, 0.7, 1); }
