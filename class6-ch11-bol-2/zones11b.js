/* Chapter 11, video 1, scenes 3 and 4: marbles on earth, toy car, cricket bat and ball, microbus. Metres, seconds.
   Physics (named constants, every position computed per frame):
   - marbles: equal masses, e = 0.95: the shooter arrives at 0.80 m/s rolling; the hit leaves it 0.02 m/s but still spinning,
     the target 0.78 m/s without spin; rolling again they go (5/7)0.78 = 0.557 and (5/7)0.02 + (2/7)0.80 = 0.243 m/s;
     rolling friction on earth slows both at mu g = 0.05 x 9.8 = 0.49 m/s²: target 0.32 m in 1.14 s, shooter 0.06 m in 0.50 s
   - cart: a steady push adds a = 0.30 m/s² to its 0.45 m/s; toy car 0.6 m/s stopped by a hand in 0.5 s (a = 1.2 m/s²)
   - cricket ball: in at 12 m/s, out at (14, 8) m/s, parabolas with g = 9.8; shown at 1/5 speed
   - microbus 1800 kg: resistance 0.03 x 1800 x 9.8 = 529 N; one person 200 N (friction matches it: no motion);
     five people 1000 N: a = (1000 - 529) / 1800 = 0.26 m/s² */
const MB2 = { R: 0.0125, E: 0.95, U: 0.80, A: 0.05 * 9.8, X: 836, Z: 3.2 };
MB2.V2 = 5 / 7 * MB2.U * (1 + MB2.E) / 2; MB2.V1 = 5 / 7 * MB2.U * (1 - MB2.E) / 2 + 2 / 7 * MB2.U;   // rolling after the hit (spin taken into account)
MB2.T2 = MB2.V2 / MB2.A; MB2.S2 = MB2.V2 * MB2.V2 / (2 * MB2.A);
MB2.D0 = 0.4; MB2.U0 = Math.sqrt(MB2.U * MB2.U + 2 * MB2.A * MB2.D0); MB2.TIN = (MB2.U0 - MB2.U) / MB2.A;          // the throw: 1.02 m/s, 0.44 s to the hit
/* positions (centre x) of the shooter and the target, tau seconds after the hit (negative = before) */
function marbles(tau) {
  const hitX = MB2.X - 2 * MB2.R;
  if (tau < 0) { const q = Math.max(0, tau + MB2.TIN); return { m1: tau < -MB2.TIN ? null : hitX - MB2.D0 + MB2.U0 * q - MB2.A * q * q / 2, m2: MB2.X, v1: MB2.U0 - MB2.A * q, v2: 0 }; }
  const q2 = Math.min(tau, MB2.T2), q1 = Math.min(tau, MB2.V1 / MB2.A);
  return { m1: hitX + MB2.V1 * q1 - MB2.A * q1 * q1 / 2, m2: MB2.X + MB2.V2 * q2 - MB2.A * q2 * q2 / 2, v1: Math.max(0, MB2.V1 - MB2.A * tau), v2: Math.max(0, MB2.V2 - MB2.A * tau) };
}
const BAT = { X: 1560, Z: 20, SLOW: 0.2, VIN: [-12, 2.52], VOUT: [9, 12], HIT: [0.075, 0.5], G: 9.8, W: 0.31 };          // ball 7.5 cm in front of the bat's centre line
BAT.TIN = 8 / 12;
/* the ball tau real seconds after the hit */
function batBall(tau) { const [vx, vy] = tau < 0 ? BAT.VIN.map((v, i) => i ? v - BAT.G * BAT.TIN : v) : BAT.VOUT, q = tau < 0 ? tau : tau;
  if (tau < 0) { const s = tau + BAT.TIN; return [BAT.X + BAT.HIT[0] + 8 + BAT.VIN[0] * s, 1.2 + BAT.VIN[1] * s - BAT.G * s * s / 2]; }
  void vx; void vy; return [BAT.X + BAT.HIT[0] + BAT.VOUT[0] * q, BAT.HIT[1] + BAT.VOUT[1] * q - BAT.G * q * q / 2]; }
/* bat angle from hanging straight down (+ = swung towards +x), tau real seconds after the hit: 20 rad/s through the hit */
const batPhi = tau => { const w = 20, a = w * tau; return a < -1.7 ? -1.7 : a > 1.25 ? 1.25 : a; };
const MBUS = { X: 40, Z: -1.75, L: 4.7, M: 1800, RES: 529, ONE: 200, FIVE: 1000, R: 0.33 };
MBUS.ACC = (MBUS.FIVE - MBUS.RES) / MBUS.M;
let V13 = null;
const _b12 = buildV3, _f12 = frameV3;
buildV3 = function (k) {
  _b12(k);
  const { scene, box, cyl, mat, canvasTex } = k;
  /* earth under the marbles: a patch with grains, so the close camera sees soil, not a flat colour */
  const soil = canvasTex(1024, 512, c => { c.fillStyle = '#b99a6a'; c.fillRect(0, 0, 1024, 512); let s = 3; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 9000; i++) { c.fillStyle = r() < 0.5 ? `rgba(95,70,40,${0.12 + r() * 0.2})` : `rgba(235,214,170,${0.12 + r() * 0.2})`; c.beginPath(); c.arc(r() * 1024, r() * 512, 0.8 + r() * 2.6, 0, 7); c.fill(); } });
  const pl = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), new THREE.MeshStandardMaterial({ map: soil, roughness: 1 })); pl.rotation.x = -Math.PI / 2; pl.position.set(MB2.X + 0.3, 0.002, MB2.Z); pl.receiveShadow = true; scene.add(pl);
  const glassT = (base, eye) => canvasTex(128, 64, c => { c.fillStyle = base; c.fillRect(0, 0, 128, 64); c.fillStyle = eye; for (let i = 0; i < 4; i++) { c.beginPath(); c.ellipse(16 + i * 32, 32, 4, 26, 0.5, 0, 7); c.fill(); } });
  const mk = (b, e) => { const m = new THREE.Mesh(new THREE.SphereGeometry(MB2.R, 32, 20), new THREE.MeshPhysicalMaterial({ map: glassT(b, e), roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.05, metalness: 0 })); m.castShadow = true; scene.add(m); return m; };
  const m1 = mk('#2f9e7a', '#f4d35e'), m2 = mk('#2f6fb8', '#ff7a59'), ghost = mk('#2f6fb8', '#ff7a59'); ghost.material = ghost.material.clone(); ghost.material.transparent = true; ghost.material.opacity = 0.45;
  /* toy car: the street car scaled to 8 % (35 cm long) */
  const toy = k.mkCar('#e2a21b'); toy.scale.setScalar(0.08); scene.add(toy);
  /* cricket: pitch strip, two sets of stumps, the bat (handle and willow blade) and a red ball */
  const P = new THREE.Group(); scene.add(P);
  { const q = new THREE.Mesh(new THREE.PlaneGeometry(24, 3), new THREE.MeshStandardMaterial({ color: '#d2b98c', roughness: 1 })); q.rotation.x = -Math.PI / 2; q.position.set(BAT.X + 9, 0.006, BAT.Z); P.add(q);
    const wht = new THREE.MeshBasicMaterial({ color: '#f4f0e4' }); [-1.4, 18.7].forEach(x => { const c = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 3), wht); c.rotation.x = -Math.PI / 2; c.position.set(BAT.X + x, 0.008, BAT.Z); P.add(c); });
    const stump = mat('#f2e6c8', { roughness: 0.6 }); [-2.6, 19.9].forEach(x => { [-0.11, 0, 0.11].forEach(z => cyl(0.018, 0.018, 0.71, stump, BAT.X + x, 0.355, BAT.Z + z, P, 12)); box(0.03, 0.02, 0.22, stump, BAT.X + x, 0.72, BAT.Z, P); }); }
  const bat = new THREE.Group(); scene.add(bat);
  { const willow = mat('#e3c98f', { roughness: 0.55 }), grip = mat('#2a2a2a', { roughness: 0.9 });
    cyl(0.017, 0.017, 0.3, grip, 0, -0.15, 0, bat, 16);
    const sh = new THREE.Shape(); sh.moveTo(-0.054, 0); sh.lineTo(0.054, 0); sh.lineTo(0.054, -0.5); sh.quadraticCurveTo(0.054, -0.56, 0, -0.565); sh.quadraticCurveTo(-0.054, -0.56, -0.054, -0.5); sh.closePath();
    const blade = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.035, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006, bevelSegments: 3 }), willow); blade.rotation.y = Math.PI / 2 - 0.8; blade.position.set(-0.02, -0.3, 0); blade.castShadow = true; bat.add(blade);
    const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.012, 0.42, 16), willow); sp.scale.z = 2.2; sp.rotation.y = -0.8; sp.position.set(-0.03, -0.55, 0); bat.add(sp); }
  const seam = canvasTex(256, 128, c => { c.fillStyle = '#a3171a'; c.fillRect(0, 0, 256, 128); c.fillStyle = '#efe6d0'; c.fillRect(0, 60, 256, 8); c.strokeStyle = '#efe6d0'; c.lineWidth = 2; for (let x = 0; x < 256; x += 8) { c.beginPath(); c.moveTo(x, 56); c.lineTo(x + 4, 52); c.moveTo(x, 72); c.lineTo(x + 4, 76); c.stroke(); } });
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.036, 28, 18), new THREE.MeshStandardMaterial({ map: seam, roughness: 0.4 })); ball.castShadow = true; scene.add(ball);
  /* microbus: a white van with a blue stripe, dark windows, sliding door, rear door */
  const bus = new THREE.Group(); scene.add(bus); const wl = [];
  { const paint = mat('#f2f2ee', { roughness: 0.35, metalness: 0.2 }), dark = mat('#1f2226'), glass = mat('#1b2631', { roughness: 0.1, metalness: 0.4, side: THREE.DoubleSide }), W = 1.7;
    const prof = [[-2.35, 0.3], [2.35, 0.3], [2.4, 0.8], [2.3, 1.02], [1.78, 1.85], [1.5, 1.96], [-2.28, 1.96], [-2.36, 1.88], [-2.38, 0.42]];
    const sh = new THREE.Shape(); prof.forEach((p, i) => i ? sh.lineTo(p[0], p[1]) : sh.moveTo(p[0], p[1]));
    const body = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: W, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 3 }), paint); body.position.z = -W / 2; body.castShadow = body.receiveShadow = true; bus.add(body);
    const win = (pts, z) => { const s2 = new THREE.Shape(); pts.forEach((p, i) => i ? s2.lineTo(p[0], p[1]) : s2.moveTo(p[0], p[1])); const m = new THREE.Mesh(new THREE.ShapeGeometry(s2), glass); m.position.z = z; bus.add(m); };
    [-1, 1].forEach(s => { const z = s * (W / 2 + 0.056); win([[1.15, 1.22], [1.68, 1.22], [1.55, 1.78], [1.15, 1.78]], z); [[-2.1, -1.15], [-1.05, -0.1], [0, 1.0]].forEach(([a, b]) => win([[a, 1.22], [b, 1.22], [b, 1.78], [a, 1.78]], z));
      box(4.75, 0.12, 0.02, mat('#1f5fa8'), 0, 0.95, s * (W / 2 + 0.06), bus, false); box(0.012, 1.4, 0.02, dark, 1.08, 1.02, s * (W / 2 + 0.058), bus, false); box(0.012, 1.4, 0.02, dark, 0.0, 1.02, s * (W / 2 + 0.058), bus, false);
      box(0.22, 0.035, 0.03, mat('#9aa3a8', { metalness: 0.6 }), 0.12, 1.08, s * (W / 2 + 0.07), bus, false); box(0.1, 0.12, 0.16, paint, 1.95, 1.45, s * (W / 2 + 0.12), bus);
      box(0.1, 0.13, 0.3, mat('#fff8d0', { emissive: '#fff2a8', emissiveIntensity: 0.5 }), 2.37, 0.78, s * 0.55, bus, false); box(0.06, 0.3, 0.16, mat('#d62828', { emissive: '#d62828', emissiveIntensity: 0.3 }), -2.4, 1.0, s * 0.7, bus, false); });
    const ws = new THREE.Mesh(new THREE.PlaneGeometry(0.88, W - 0.16).rotateX(-Math.PI / 2), glass); ws.rotation.z = Math.atan2(1.85 - 1.02, 1.78 - 2.3); ws.position.set(2.06, 1.46, 0); bus.add(ws);
    const rw = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.5), glass); rw.rotation.y = -Math.PI / 2; rw.position.set(-2.44, 1.5, 0); bus.add(rw); box(0.02, 1.5, 0.012, dark, -2.44, 1.1, 0, bus, false);
    box(0.18, 0.22, W + 0.06, dark, 2.4, 0.42, 0, bus); box(0.18, 0.22, W + 0.06, dark, -2.42, 0.42, 0, bus);
    const tg = new THREE.CylinderGeometry(MBUS.R, MBUS.R, 0.22, 28).rotateX(Math.PI / 2), rg = new THREE.CylinderGeometry(MBUS.R * 0.6, MBUS.R * 0.6, 0.24, 20).rotateX(Math.PI / 2);
    [1.55, -1.55].forEach(x => [-1, 1].forEach(s => { const w = new THREE.Group(); w.position.set(x, MBUS.R, s * (W / 2 - 0.08)); bus.add(w); const t = new THREE.Mesh(tg, mat('#151515', { roughness: 0.95 })); t.castShadow = true; w.add(t); w.add(new THREE.Mesh(rg, mat('#b9bfc4', { metalness: 0.7, roughness: 0.3 }))); w.add(new THREE.Mesh(new THREE.BoxGeometry(MBUS.R * 1.05, 0.05, 0.25), mat('#6b7177'))); wl.push(w); })); }
  V13 = { m1, m2, ghost, pl, toy, P, bat, ball, bus, wl };
};
/* o.marbles {m1, m2, ghost} (centre x, null = hidden) | o.toy x (in the study room) | o.cricket {phi, ball [x, y]} | o.mbus x (centre) */
frameV3 = function (o) {
  _f12(o);
  const q = o.marbles; V13.pl.visible = !!q;
  [['m1', V13.m1], ['m2', V13.m2], ['ghost', V13.ghost]].forEach(([k, m]) => { const x = q && q[k]; m.visible = x !== undefined && x !== null; if (m.visible) { m.position.set(x, MB2.R + 0.002, MB2.Z); m.rotation.z = -(x - MB2.X) / MB2.R; } });
  V13.toy.visible = o.toy !== undefined; if (V13.toy.visible) { V13.toy.position.set(o.toy, 0, 0.9); V13.toy.userData.wheels.forEach(w => { w.rotation.z = -o.toy / (ROAD.CAR_R * 0.08); }); }
  const c = o.cricket; V13.P.visible = V13.bat.visible = V13.ball.visible = !!c;
  if (c) { V13.bat.position.set(BAT.X - 0.02, 1.05, BAT.Z); V13.bat.rotation.z = c.phi; V13.ball.visible = !!c.ball; if (c.ball) { V13.ball.position.set(c.ball[0], c.ball[1], BAT.Z); V13.ball.rotation.z = -c.ball[0] * 8; } }
  V13.bus.visible = o.mbus !== undefined; if (V13.bus.visible) { V13.bus.position.set(o.mbus, 0, MBUS.Z); V13.wl.forEach(w => { w.rotation.z = -o.mbus / MBUS.R; }); }
};
Object.assign(C11, {
  marble: cx => ({ pos: [cx, 0.075, MB2.Z + 0.55], look: [cx, 0.012, MB2.Z], fov: 30 }),
  toy: cx => ({ pos: [cx, 0.36, 2.0], look: [cx, 0.06, 0.9], fov: 34 }),
  bat: () => ({ pos: [BAT.X + 1.1, 0.95, BAT.Z + 2.7], look: [BAT.X + 1.1, 0.85, BAT.Z], fov: 58 }),
  mbus: cx => ({ pos: [cx - 6.4, 1.9, MBUS.Z + 5.2], look: [cx - 1.0, 1.0, MBUS.Z], fov: 38 }),
});
/* pushing hands at the back of something, (x, y) = palms, n pairs spread over the height dy px */
function pushHands(x, y, pm, n, o = 1, a = 8) { let s = ''; for (let i = 0; i < n; i++) { const yy = y + (n > 1 ? (i - (n - 1) / 2) * 62 : 0), xx = x - (i % 2) * 10; s += handPush3(xx - 5, yy - 18, a, pm, o) + handPush3(xx, yy + 6, a, pm, o); } return s; }
/* a hand facing left (the push picture unmirrored), palm at (x, y) */
const handStop = (x, y, a, pm, o = 1) => handImg('hand_push.png', [818.6, 1044.9], 3.75, x, y, a, pm, o, false);
const RED = '#ff6b5e';
/* n people side by side behind the microbus (rear face x = cx - 2.44), two palms each */
const mbusHands = (cx, n, d = 0) => { const out = []; for (let i = 0; i < n; i++) { const zc = MBUS.Z + (n > 1 ? -0.62 + 1.24 * i / (n - 1) : 0); [-0.11, 0.11].forEach(dz => out.push(H3.push([cx - 2.44 - d, 1.08, zc + dz], [1, 0, 0]))); } return out; };
