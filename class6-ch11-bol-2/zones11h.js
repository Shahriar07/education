/* Video 2, scenes 4 and 5: an open yard at x = 7300 with a truck, a ramp and a drum, a bridge ramp and stairs, a jack screw,
   a flag pole, a movable pulley and a wheel and axle; two screwdrivers on the workshop bench. Metres, newtons.
   - ramp: plank 3 m long to the truck bed 1 m up: sin a = 1/3; rolling drum (no slipping, friction ignored):
     push along the ramp = W sin a = W / 3, mechanical advantage = length / height = 3
   - jack screw: pitch 6 mm, handle 0.30 m: one turn = 2 pi 0.30 = 1.88 m of handle path for 6 mm of rise
   - flag pulley (fixed): rope down d, flag up d; movable pulley: rope end up d, load up d / 2, pull = W / 2
   - wheel and axle: R = 0.30 m, r = 0.05 m: a 1 kg pull on the wheel rope holds 6 kg on the axle rope; rope out d, load up d / 6
   - screwdrivers: thin handle radius 9 mm, thick 21 mm; the same turning effect needs a 21 / 9 = 2.3 times smaller push on the thick */
const TR = { X: 7300, H: 1.0, L: 3.0, R: 0.29, DL: 0.88, KG: 200, G: 9.8 };
TR.SIN = TR.H / TR.L; TR.COS = Math.sqrt(1 - TR.SIN * TR.SIN); TR.FOOT = TR.X - TR.L * TR.COS; TR.W = TR.KG * TR.G;
const BR = { X: 7322, H: 2.5, RL: 10 };
const JK = { X: TR.X + 0.18, Z: 0.55, P: 0.006, HR: 0.30, TOP0: 0.53 };
const FL = { X: 7345, Z: 0, H: 5.0 };
const MP = { X: 7355, H: 2.5, R: 0.14 };
const WA = { X: 7364, Y: 1.35, R: 0.30, r: 0.05 };
const SD = { X: WS.X + 0.55, X2: WS.X + 0.85, P: 0.0015 };
let V19 = null;
const _bH = buildV3, _fH = frameV3;
buildV3 = function (k) {
  _bH(k);
  const { scene, mat, box, cyl, canvasTex } = k, G = new THREE.Group(); scene.add(G);
  const rnd = (() => { let a = 31; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();
  const grain = (base, dark, light) => canvasTex(512, 128, c => { c.fillStyle = base; c.fillRect(0, 0, 512, 128); for (let i = 0; i < 90; i++) { c.strokeStyle = `rgba(${rnd() < 0.5 ? dark : light},${0.1 + rnd() * 0.3})`; c.lineWidth = 0.6 + rnd() * 1.8; const y = rnd() * 128; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(170, y + 6 * (rnd() - 0.5), 340, y + 6 * (rnd() - 0.5), 512, y); c.stroke(); } });
  const steel = mat('#c4c9cd', { roughness: 0.3, metalness: 0.8 }), iron = mat('#4a4f55', { roughness: 0.45, metalness: 0.7 }), woodM = new THREE.MeshStandardMaterial({ map: grain('#8a5a30', '50,28,10', '170,120,70'), roughness: 0.8 });
  const conc = mat('#b8b2a6', { roughness: 0.95 }), black = mat('#1d1d1f', { roughness: 0.8 });
  /* the yard: packed earth and a boundary wall */
  box(90, 0.1, 40, mat('#b99a6a', { roughness: 1 }), 7330, -0.05, 0, G, false); box(90, 2.2, 0.25, mat('#d8cdb8'), 7330, 1.1, -9, G);
  /* truck: painted wooden body (geometric bands), bed floor 1 m up, rear end at x = TR.X; cab at the front */
  const tk = new THREE.Group(); scene.add(tk);
  const paint = canvasTex(512, 128, c => { const b = ['#e0442e', '#f2c12e', '#2f8f4e', '#2b6cb0', '#f2c12e', '#e0442e']; b.forEach((col, i) => { c.fillStyle = col; c.fillRect(0, i * 128 / 6, 512, 128 / 6 + 1); }); c.fillStyle = '#fff'; for (let x = 8; x < 512; x += 32) { c.beginPath(); c.moveTo(x, 64); c.lineTo(x + 10, 54); c.lineTo(x + 20, 64); c.lineTo(x + 10, 74); c.closePath(); c.fill(); } });
  const pm = new THREE.MeshStandardMaterial({ map: paint, roughness: 0.6 });
  box(3.0, 0.08, 2.2, woodM, TR.X + 1.5, TR.H - 0.04, 0, tk); [-1.07, 1.07].forEach(z => box(3.0, 0.62, 0.06, pm, TR.X + 1.5, TR.H + 0.31, z, tk)); box(0.06, 0.9, 2.2, pm, TR.X + 3.0, TR.H + 0.45, 0, tk);
  [-0.5, 0.5].forEach(z => box(4.4, 0.18, 0.12, iron, TR.X + 2.2, 0.62, z, tk));
  const wheel = (x, z) => { const w = cyl(0.48, 0.48, 0.3, black, x, 0.48, z, tk, 28); w.rotation.x = Math.PI / 2; const h = cyl(0.2, 0.2, 0.31, mat('#8b8f94', { metalness: 0.6, roughness: 0.4 }), x, 0.48, z, tk, 20); h.rotation.x = Math.PI / 2; };
  [-0.88, 0.88].forEach(z => { wheel(TR.X + 0.85, z); wheel(TR.X + 3.9, z); });
  const cab = mat('#c0392b', { roughness: 0.5 }), glass = new THREE.MeshStandardMaterial({ color: '#7fa7bf', roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.75 });
  box(1.5, 1.0, 2.1, cab, TR.X + 3.8, 1.25, 0, tk); box(1.2, 0.7, 2.06, cab, TR.X + 3.65, 2.1, 0, tk); box(0.04, 0.55, 1.8, glass, TR.X + 4.27, 2.1, 0, tk); [-1.04, 1.04].forEach(z => box(0.7, 0.45, 0.02, glass, TR.X + 3.65, 2.12, z, tk));
  box(0.15, 0.2, 2.2, mat('#d9d9d9', { metalness: 0.6, roughness: 0.3 }), TR.X + 4.6, 0.7, 0, tk);
  /* ramp: two planks 3 m long from the earth to the bed edge */
  const rp = new THREE.Group(); scene.add(rp); [-0.3, 0.3].forEach(z => { const p = box(TR.L, 0.05, 0.3, new THREE.MeshStandardMaterial({ map: grain('#b8854d', '80,48,18', '226,180,120'), roughness: 0.8 }), 0, 0, z, rp); p.position.set((TR.FOOT + TR.X) / 2 + 0.025 * TR.SIN, TR.H / 2 - 0.025 * TR.COS, z); p.rotation.z = Math.asin(TR.SIN); });
  /* oil drum: blue steel with two rolling ribs, lying on its side (axis along z) */
  const dr = new THREE.Group(); scene.add(dr); const dm = mat('#1f5fa8', { roughness: 0.45, metalness: 0.5 });
  { const b = cyl(TR.R, TR.R, TR.DL, dm, 0, 0, 0, dr, 32); b.rotation.x = Math.PI / 2; [-0.29, 0.29].forEach(z => { const r = new THREE.Mesh(new THREE.TorusGeometry(TR.R, 0.012, 8, 32), dm); r.position.z = z; dr.add(r); });
    [-1, 1].forEach(s => { const e = cyl(TR.R * 0.97, TR.R * 0.97, 0.01, mat('#2a6fbf', { metalness: 0.6, roughness: 0.4 }), 0, 0, s * TR.DL / 2, dr, 32); e.rotation.x = Math.PI / 2; }); cyl(0.03, 0.03, 0.02, mat('#d8d8d8'), 0.15, 0.1, TR.DL / 2 + 0.005, dr, 12).rotation.x = Math.PI / 2; }
  /* bridge end: a deck 2.5 m up with a 10 m ramp road on its left and stairs on its right */
  const br = new THREE.Group(); scene.add(br); const ra = Math.asin(BR.H / BR.RL), rh = BR.RL * Math.cos(ra);
  box(4, BR.H, 3, conc, BR.X + 2, BR.H / 2, -3, br); box(4.1, 0.15, 3.1, mat('#5a5a5e'), BR.X + 2, BR.H + 0.07, -3, br);
  { const s = new THREE.Shape(); s.moveTo(-rh, 0); s.lineTo(0, 0); s.lineTo(0, BR.H); s.closePath(); const m = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 3, bevelEnabled: false }), conc); m.position.set(BR.X, 0, -4.5); m.castShadow = m.receiveShadow = true; br.add(m);
    const road = box(BR.RL, 0.04, 3.02, mat('#4a4a4e'), BR.X - rh / 2, BR.H / 2 + 0.02, -3, br); road.rotation.z = ra; }
  /* stairs down the right side: 14 steps of 17.9 cm rise and 26 cm going, a lighter tread on each; railings on the ramp and deck */
  const tread = mat('#e2ddd2', { roughness: 0.9 }), railM = mat('#6d7378', { metalness: 0.5, roughness: 0.4 });
  for (let i = 0; i < 14; i++) { const h = BR.H * (i + 1) / 14, x = BR.X + 4.13 + (13 - i) * 0.26; box(0.26, h, 1.2, conc, x, h / 2, -2.4, br); box(0.27, 0.03, 1.22, tread, x, h + 0.015, -2.4, br); }
  for (let i = 0; i <= 10; i++) { const x = BR.X - rh + i * rh / 10, y = BR.H * i / 10; box(0.05, 1.0, 0.05, railM, x, y + 0.5, -1.55, br); }
  { const r = box(BR.RL, 0.05, 0.05, railM, BR.X - rh / 2, BR.H / 2 + 1.0, -1.55, br); r.rotation.z = ra; } box(4, 0.05, 0.05, railM, BR.X + 2, BR.H + 1.0, -1.55, br); [0, 1, 2, 3, 4].forEach(i => box(0.05, 1.0, 0.05, railM, BR.X + i, BR.H + 0.5, -1.55, br));
  /* jack screw under the truck's rail: iron base, the nut column, the screw with its thread, the head with the bar */
  const jk = new THREE.Group(); jk.position.set(JK.X, 0, JK.Z); scene.add(jk);
  cyl(0.04, 0.085, 0.14, iron, 0, 0.07, 0, jk, 28); cyl(0.034, 0.04, 0.09, iron, 0, 0.185, 0, jk, 24);
  const sc = new THREE.Group(); jk.add(sc); cyl(0.017, 0.017, 0.22, steel, 0, -0.11, 0, sc, 18);
  { const pts = []; for (let i = 0; i <= 36 * 24; i++) { const a = i / 24 * 2 * Math.PI; pts.push(new THREE.Vector3(0.0175 * Math.cos(a), -0.22 + i / 24 * JK.P, 0.0175 * Math.sin(a))); } sc.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 900, 0.0028, 6), steel)); }
  cyl(0.032, 0.032, 0.05, iron, 0, 0.025, 0, sc, 20); const bar = cyl(0.008, 0.008, 2 * JK.HR, steel, 0, 0.025, 0, sc, 12); bar.rotation.z = Math.PI / 2; box(0.08, 0.016, 0.08, iron, 0, 0.058, 0, sc);
  /* flag pole: a pulley wheel at the top, the rope down both sides, the flag of Bangladesh on one side */
  const fl = new THREE.Group(); fl.position.set(FL.X, 0, FL.Z); scene.add(fl);
  box(0.6, 0.25, 0.6, conc, 0, 0.125, 0, fl); cyl(0.035, 0.045, FL.H, mat('#d8dde0', { metalness: 0.6, roughness: 0.35 }), 0, FL.H / 2, 0, fl, 16);
  const fw = cyl(0.06, 0.06, 0.03, iron, 0.07, FL.H + 0.02, 0, fl, 20); fw.rotation.x = Math.PI / 2;
  const ropeM = mat('#f1ead8'), flagRope = mat('#5a4630'), fr1 = cyl(0.012, 0.012, 1, flagRope, 0, 0, 0, fl, 6), fr2 = cyl(0.012, 0.012, 1, flagRope, 0, 0, 0, fl, 6);
  const flagT = canvasTex(300, 180, c => { c.fillStyle = '#006a4e'; c.fillRect(0, 0, 300, 180); c.fillStyle = '#f42a41'; c.beginPath(); c.arc(135, 90, 60, 0, 7); c.fill(); });
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.6), new THREE.MeshStandardMaterial({ map: flagT, side: THREE.DoubleSide, roughness: 0.9 })); fl.add(flag);
  /* movable pulley: a wooden gantry, the rope tied to the beam, down round the pulley, up to the free end; a 20 kg sack on its hook */
  const mp = new THREE.Group(); mp.position.set(MP.X, 0, 0); scene.add(mp);
  [-0.9, 0.9].forEach(x => box(0.1, MP.H, 0.1, woodM, x, MP.H / 2, 0, mp)); box(2.0, 0.12, 0.12, woodM, 0, MP.H, 0, mp);
  const mpw = new THREE.Group(); mp.add(mpw); { const w = cyl(MP.R, MP.R, 0.05, mat('#c0392b', { roughness: 0.5 }), 0, 0, 0, mpw, 28); w.rotation.x = Math.PI / 2; box(0.05, 0.34, 0.09, iron, 0, -0.06, 0, mpw); const hk = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.007, 8, 16, 4.5), steel); hk.position.y = -0.26; mpw.add(hk); }
  const sack = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 14), mat('#c9b48a', { roughness: 1 })); sack.scale.set(1, 1.35, 0.85); mpw.add(sack); sack.position.y = -0.55;
  const mr1 = cyl(0.011, 0.011, 1, ropeM, 0, 0, 0, mp, 6), mr2 = cyl(0.011, 0.011, 1, ropeM, 0, 0, 0, mp, 6);
  /* wheel and axle on a stand: wheel R = 0.30 m with spokes, axle drum r = 0.05 m behind it; a 1 kg weight on the wheel rope, a 6 kg bucket on the axle rope */
  const wa = new THREE.Group(); wa.position.set(WA.X, WA.Y, 0); scene.add(wa);
  box(0.09, WA.Y + 0.06, 0.09, woodM, 0, -WA.Y / 2 + 0.03, -0.22, wa); box(0.6, 0.06, 0.5, woodM, 0, -WA.Y + 0.03, -0.1, wa);   // one post behind the wheel, so nothing stands in front of it
  const rot = new THREE.Group(); wa.add(rot); { const rim = new THREE.Mesh(new THREE.TorusGeometry(WA.R, 0.018, 10, 48), mat('#b0412e', { roughness: 0.5 })); rim.position.z = 0.1; rot.add(rim);
    for (let i = 0; i < 6; i++) { const s = box(WA.R * 2, 0.02, 0.02, mat('#b0412e'), 0, 0, 0.1, rot); s.rotation.z = i * Math.PI / 6; }
    const ax = cyl(WA.r, WA.r, 0.16, woodM, 0, 0, -0.06, rot, 24); ax.rotation.x = Math.PI / 2; const sh = cyl(0.012, 0.012, 0.5, steel, 0, 0, 0, rot, 10); sh.rotation.x = Math.PI / 2; }
  const wr1 = cyl(0.008, 0.008, 1, ropeM, 0, 0, 0, wa, 6), wr2 = cyl(0.008, 0.008, 1, ropeM, 0, 0, 0, wa, 6);
  const kg1 = new THREE.Group(); wa.add(kg1); cyl(0.03, 0.035, 0.05, iron, 0, 0, 0, kg1, 18); cyl(0.006, 0.006, 0.025, iron, 0, 0.035, 0, kg1, 8);
  const bk = new THREE.Group(); wa.add(bk); { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.17, 24, 1, true), mat('#8f979c', { metalness: 0.7, roughness: 0.35, side: THREE.DoubleSide })); bk.add(b); cyl(0.07, 0.07, 0.005, mat('#8f979c'), 0, -0.085, 0, bk, 24); cyl(0.086, 0.086, 0.13, mat('#3d78b8', { roughness: 0.2 }), 0, -0.015, 0, bk, 24); }
  /* screwdrivers in a wooden block on the workshop bench: thin handle 9 mm radius, thick 21 mm; fluted handles so the turn shows */
  const blk = box(0.55, 0.06, 0.12, new THREE.MeshStandardMaterial({ map: grain('#c79a62', '90,58,24', '235,196,140'), roughness: 0.8 }), (SD.X + SD.X2) / 2, WS.TY + 0.03, 0, G);
  void blk;
  const hT = canvasTex(128, 64, c => { for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#d9472b' : '#f2c12e'; c.fillRect(i * 16, 0, 16, 64); } });
  const mkSD = (x, r) => { const g = new THREE.Group(); g.position.set(x, WS.TY + 0.06, 0); scene.add(g);
    const h = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.05, 0.1, 8), new THREE.MeshStandardMaterial({ map: hT, roughness: 0.5 })); h.position.y = 0.17; g.add(h);
    cyl(0.003, 0.003, 0.12, steel, 0, 0.06, 0, g, 10); cyl(0.0045, 0.0045, 0.003, steel, 0, 0.001, 0, g, 10); return g; };
  const sd1 = mkSD(SD.X, 0.009), sd2 = mkSD(SD.X2, 0.021);
  V19 = { G, tk, rp, dr, br, jk, sc, fl, fr1, fr2, flag, mp, mpw, mr1, mr2, wa, rot, wr1, wr2, kg1, bk, sd1, sd2 };
};
/* a rope between two points of a group's own frame */
function ropeSeg(m, a, b) { const d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), L = d.length(); m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); m.scale.y = Math.max(0.001, L); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); }
/* the drum's centre g metres along its path: earth (g < 0), ramp (0..3), bed (g > 3) */
function drumPos(g) { if (g < 0) return [TR.FOOT + g, TR.R, 0]; if (g <= TR.L) return [TR.FOOT + g * TR.COS - TR.R * TR.SIN, g * TR.SIN + TR.R * TR.COS, 0]; return [TR.X + (g - TR.L), TR.H + TR.R, 0]; }
/* o.yard: show the truck site | o.drum g | o.jack turns | o.flag d (rope pulled) | o.mpul d | o.wax d | o.sd [turns1, turns2] */
frameV3 = function (o) {
  _fH(o);
  const yard = o.drum !== undefined || o.jack !== undefined || o.yard; V19.tk.visible = yard; V19.rp.visible = o.drum !== undefined; V19.dr.visible = o.drum !== undefined; V19.jk.visible = o.jack !== undefined;
  const lift = o.jack !== undefined ? JK.P * o.jack : 0; V19.tk.position.y = lift;
  if (o.drum !== undefined) { V19.dr.position.set(...drumPos(o.drum)); V19.dr.rotation.z = -o.drum / TR.R; }
  if (o.jack !== undefined) { V19.sc.position.y = JK.TOP0 - 0.058 - 0.008 + lift; V19.sc.rotation.y = 2 * Math.PI * o.jack; }
  V19.fl.visible = o.flag !== undefined; if (o.flag !== undefined) { const top = FL.H + 0.02, fy = 1.3 + o.flag; ropeSeg(V19.fr1, [0.13, 1.0, 0], [0.13, top, 0]); ropeSeg(V19.fr2, [0.01, 1.0 + 0, 0.0], [0.01, top, 0]); V19.flag.position.set(0.63, fy, 0); }
  V19.mp.visible = o.mpul !== undefined; if (o.mpul !== undefined) { const yp = 1.1 + o.mpul / 2; V19.mpw.position.set(0, yp, 0); ropeSeg(V19.mr1, [-MP.R, MP.H - 0.06, 0], [-MP.R, yp, 0]); ropeSeg(V19.mr2, [MP.R, yp, 0], [MP.R, MP.H + 0.4 + o.mpul, 0]); }
  V19.wa.visible = o.wax !== undefined; if (o.wax !== undefined) { const d = o.wax; V19.rot.rotation.z = -d / WA.R; const yw = -0.45 - d, yb = -0.55 + d / 6;
    ropeSeg(V19.wr1, [WA.R, 0, 0.1], [WA.R, yw + 0.045, 0.1]); V19.kg1.position.set(WA.R, yw, 0.1); ropeSeg(V19.wr2, [-WA.r, 0, -0.06], [-WA.r, yb + 0.09, -0.06]); V19.bk.position.set(-WA.r, yb, -0.06); }
  V19.sd1.visible = V19.sd2.visible = !!o.sd; if (o.sd) { [[V19.sd1, o.sd[0]], [V19.sd2, o.sd[1]]].forEach(([g, n]) => { g.rotation.y = -2 * Math.PI * n; g.position.y = WS.TY + 0.06 + 0.0075 - SD.P * n; }); }
};
Object.assign(C11, {
  ramp: () => ({ pos: [TR.FOOT - 2.6, 2.4, 4.6], look: [TR.X - 1.1, 0.75, 0], fov: 44 }),
  bridge: () => ({ pos: [BR.X - 0.8, 2.6, 8.5], look: [BR.X - 0.8, 1.4, -3], fov: 52 }),
  jack: () => ({ pos: [JK.X - 1.0, 0.62, JK.Z + 1.0], look: [JK.X, 0.38, JK.Z], fov: 36 }),
  flag: () => ({ pos: [FL.X + 0.4, 2.8, 8.5], look: [FL.X + 0.4, 2.8, 0], fov: 40 }),
  mpul: () => ({ pos: [MP.X, 2.0, 4.8], look: [MP.X, 2.0, 0], fov: 46 }),
  wax: () => ({ pos: [WA.X, 1.15, 2.9], look: [WA.X, 1.05, 0], fov: 36 }),
  sd: () => ({ pos: [(SD.X + SD.X2) / 2, WS.TY + 0.3, 0.85], look: [(SD.X + SD.X2) / 2, WS.TY + 0.15, 0], fov: 32 }),
});
