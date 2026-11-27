/* Chapter 11, video 1, scene 6: tools on a workbench at x = 6600 and a well with a pulley at x = 6610.
   Lever arms (metres) decide every arrow and every path:
   - pincers (সাঁড়াশি): handle 0.16 from the pivot, jaw 0.032: the jaws press 0.16 / 0.032 = 5 times as hard as the hand
   - tongs (চিমটা): 0.30 long, fingers 0.12 from the joint: the tips move 0.30 / 0.12 = 2.5 times as far as the fingers
   - fixed pulley: the rope goes over the wheel: pull down d, the bucket rises d, the force only turns round
   - scissors: blades 0.09, handles 0.08 from the pivot */
/* offset of each finger bow from the blade line (m): bow outer radius 0.023; with the blades closed to -2 degrees the two bows
   are 0.047 m apart, centre to centre: they just touch and cannot pass each other */
const SC_BOW = 0.0247;
const TL = { X: 6600, TY: 0.78, Z: 0, PIN: { H: 0.16, J: 0.032 }, TONG: { L: 0.30, F: 0.12 }, SC: { B: 0.09, H: 0.08 }, WELL: { X: 6610, Z: 0, R: 0.55, BEAM: 2.05, PR: 0.11 } };
let V15 = null;
const _b14 = buildV3, _f14 = frameV3;
buildV3 = function (k) {
  _b14(k);
  const { scene, mat, box, cyl, canvasTex } = k, G = new THREE.Group(); scene.add(G);
  const steel = mat('#8f999f', { roughness: 0.35, metalness: 0.7 }), dk = mat('#4a5056', { roughness: 0.4, metalness: 0.6 }), wood = mat('#8a5a30'), red = mat('#c0392b', { roughness: 0.5 });
  /* room: floor, wall, a workbench */
  box(14, 0.1, 10, mat('#cbbfa6', { roughness: 0.8 }), TL.X + 3, -0.05, 0, G, false); box(8, 3, 0.12, mat('#e9dcc0'), TL.X, 1.5, -1.2, G);
  box(1.6, 0.05, 0.7, mat('#a0693a'), TL.X, TL.TY - 0.025, TL.Z, G); [[-0.75, -0.3], [0.75, -0.3], [-0.75, 0.3], [0.75, 0.3]].forEach(([x, z]) => box(0.05, TL.TY - 0.05, 0.05, wood, TL.X + x, (TL.TY - 0.05) / 2, TL.Z + z, G));
  /* a wooden block with a nail standing in it (for the pincers) */
  box(0.12, 0.05, 0.08, mat('#c79a62'), TL.X - 0.45, TL.TY + 0.025, TL.Z, G); cyl(0.0022, 0.0022, 0.05, steel, TL.X - 0.45, TL.TY + 0.065, TL.Z, G, 10); cyl(0.0045, 0.0045, 0.002, steel, TL.X - 0.45, TL.TY + 0.091, TL.Z, G, 14);
  /* an arm of a pivoted tool, lying in the x-y plane: from the pivot, a jaw of length j to +x, a handle of length h to -x */
  const arm = (j, h, w, m, grip) => { const a = new THREE.Group(); box(j, w, 0.008, m, j / 2, 0, 0, a); box(h, w * 0.8, 0.009, m, -h / 2, 0, 0, a); if (grip) box(h * 0.7, w * 1.2, 0.014, grip, -h * 0.62, 0, 0, a); return a; };
  /* pincers: two arms crossing at a rivet; their jaws hold the nail's head */
  const pin = new THREE.Group(); scene.add(pin); const p1 = arm(TL.PIN.J, TL.PIN.H, 0.012, dk, red), p2 = arm(TL.PIN.J, TL.PIN.H, 0.012, dk, red); p2.position.z = 0.01; pin.add(p1, p2); cyl(0.006, 0.006, 0.024, steel, 0, 0, 0.005, pin, 14).rotation.x = Math.PI / 2;
  /* tongs: two thin steel strips joined at the back end (x = 0), opening towards +x */
  const tong = new THREE.Group(); scene.add(tong); const t1 = new THREE.Group(), t2 = new THREE.Group(); tong.add(t1, t2); [t1, t2].forEach(t => { box(TL.TONG.L, 0.003, 0.016, steel, TL.TONG.L / 2, 0, 0, t); box(0.03, 0.006, 0.018, steel, TL.TONG.L - 0.015, 0, 0, t); }); cyl(0.012, 0.012, 0.018, steel, -0.004, 0, 0, tong, 16).rotation.x = Math.PI / 2;
  /* a small potato held by the tongs, lying on the table until lifted */
  const pot = new THREE.Mesh(new THREE.SphereGeometry(0.022, 20, 14), mat('#b88a4e', { roughness: 0.9 })); pot.scale.set(1.3, 0.9, 1); pot.castShadow = true; scene.add(pot);
  /* scissors: two blades and two ring handles, the cloth lying on the table */
  const sci = new THREE.Group(); scene.add(sci);
  const blade = (s) => { const g = new THREE.Group(), sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(TL.SC.B, s * 0.002); sh.lineTo(TL.SC.B * 0.2, s * 0.016); sh.lineTo(0, s * 0.012); sh.closePath();
    const b = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.003, bevelEnabled: false }), steel); g.add(b); const r = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.005, 10, 28), mat('#2e6fbf', { roughness: 0.5 })); r.position.set(-TL.SC.H + 0.012, -s * SC_BOW, 0); g.add(r);
    /* the shank bends from the pivot down (or up) to the bow, so the bows sit SC_BOW off the blade line: closed, they just touch */
    const sk = box(Math.hypot(0.045, SC_BOW - 0.004), 0.008, 0.006, mat('#2e6fbf'), -0.0275, -s * (SC_BOW - 0.004) / 2 - s * 0.002, 0, g); sk.rotation.z = s * Math.atan2(SC_BOW - 0.004, 0.045); return g; };
  const s1 = blade(1), s2 = blade(-1); s2.position.z = 0.004; sci.add(s1, s2);
  const clothT = canvasTex(256, 256, c => { c.fillStyle = '#2f6fb8'; c.fillRect(0, 0, 256, 256); c.fillStyle = '#f4d35e'; for (let y = 0; y < 256; y += 32) for (let x = (y / 32) % 2 * 16; x < 256; x += 32) { c.beginPath(); c.arc(x + 8, y + 8, 6, 0, 7); c.fill(); } });
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.22), new THREE.MeshStandardMaterial({ map: clothT, roughness: 1, side: THREE.DoubleSide })); cloth.rotation.x = -Math.PI / 2; cloth.position.set(TL.X + 0.42, TL.TY + 0.002, TL.Z); scene.add(cloth);
  /* well with a fixed pulley: a round brick wall, two posts, a beam, the wheel on a hook, a rope and a bucket */
  const W = TL.WELL, wl = new THREE.Group(); wl.position.set(W.X, 0, W.Z); scene.add(wl);
  const bt = canvasTex(256, 128, c => { c.fillStyle = '#a9583c'; c.fillRect(0, 0, 256, 128); c.strokeStyle = '#d8c7a8'; c.lineWidth = 3; for (let y = 0; y <= 128; y += 21) { c.beginPath(); c.moveTo(0, y); c.lineTo(256, y); c.stroke(); for (let x = (y / 21) % 2 * 21; x < 256; x += 42) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 21); c.stroke(); } } }); bt.wrapS = THREE.RepeatWrapping; bt.repeat.set(6, 1);
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(W.R, W.R, 0.75, 48, 1, true), new THREE.MeshStandardMaterial({ map: bt, roughness: 1, side: THREE.DoubleSide })); ring.position.y = 0.375; ring.castShadow = true; wl.add(ring);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(W.R, 0.06, 10, 48), mat('#b9aa90')); lip.rotation.x = Math.PI / 2; lip.position.y = 0.75; wl.add(lip);
  const hole = new THREE.Mesh(new THREE.CircleGeometry(W.R - 0.02, 40), mat('#14110e')); hole.rotation.x = -Math.PI / 2; hole.position.y = 0.55; wl.add(hole);
  box(4, 0.1, 3, mat('#b99a6a', { roughness: 1 }), 0, -0.04, 0, wl, false);
  [-1, 1].forEach(s => box(0.12, W.BEAM + 0.2, 0.12, wood, s * (W.R + 0.15), (W.BEAM + 0.2) / 2, 0, wl)); box(2 * W.R + 0.5, 0.12, 0.12, wood, 0, W.BEAM + 0.1, 0, wl);
  cyl(0.008, 0.008, 0.12, steel, 0, W.BEAM - 0.02, 0, wl, 8);
  const wheel = new THREE.Group(); wheel.position.set(0, W.BEAM - 0.1 - W.PR, 0); wl.add(wheel);
  { const t = new THREE.Mesh(new THREE.TorusGeometry(W.PR, 0.014, 10, 40), dk); wheel.add(t); for (let i = 0; i < 6; i++) { const sp = box(0.008, W.PR * 2, 0.006, dk, 0, 0, 0, wheel, false); sp.rotation.z = i * Math.PI / 6; } box(0.04, W.PR * 2 + 0.06, 0.03, mat('#6b7177', { metalness: 0.5 }), 0, 0.03, 0.03, wheel, false); }
  const rope = mat('#c9a66b', { roughness: 1 }); const rL = cyl(0.007, 0.007, 1, rope, 0, 0, 0, wl, 8), rR = cyl(0.007, 0.007, 1, rope, 0, 0, 0, wl, 8);
  const buck = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0], [0.1, 0], [0.13, 0.24], [0.135, 0.245]].map(q => new THREE.Vector2(q[0], q[1])), 32), mat('#6f7a80', { metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide })); buck.castShadow = true; wl.add(buck);
  const bail = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.004, 6, 24, Math.PI), dk); buck.add(bail); bail.position.y = 0.245;
  [pin, tong, pot, sci, cloth].forEach(o => o.visible = false);
  V15 = { G, pin, p1, p2, tong, t1, t2, pot, sci, s1, s2, cloth, wl, rL, rR, buck, wheel };
};
const PINP = [TL.X - 0.45 + TL.PIN.J + 0.002, TL.TY + 0.088, TL.Z + 0.015];     // pivot of the pincers: the jaws reach back to the nail's head
const TONGP = [TL.X + 0.05, TL.TY + 0.07, TL.Z + 0.02];
TL.TONG.PHIB = -Math.asin((TONGP[1] - TL.TY - 0.0015) / TL.TONG.L); TL.TONG.RP = 0.275;
TL.TONG.POTY = TONGP[1] + TL.TONG.RP * Math.sin(TL.TONG.PHIB) + 0.0015 + 0.02;                     // potato centre: on the bottom strip
TL.TONG.AMIN = Math.asin((TL.TONG.POTY + 0.02 + 0.0015 - TONGP[1]) / TL.TONG.RP) - TL.TONG.PHIB;     // the top strip on the potato's top
const tongTop = a => TL.TONG.PHIB + a;
const SCI_UP = { Z: TL.Z + 0.45, Y: TL.TY + 0.0005, EDGE: TL.X + 0.27, A0: 0.52 };
const sciPt = (xp, ang, x, y) => [xp + x * Math.cos(ang) - y * Math.sin(ang), SCI_UP.Y + x * Math.sin(ang) + y * Math.cos(ang), SCI_UP.Z];
const SCIP = [TL.X + 0.25, TL.TY + 0.012, TL.Z + 0.05];
/* o.pin = opening (rad), o.tong = {a: opening (rad), lift}, o.sci = {a, cut (m)}, o.well = d (m of rope pulled) */
frameV3 = function (o) {
  _f14(o);
  V15.G.visible = V15.wl.visible = !!(o.pin !== undefined || o.tong || o.sci || o.well !== undefined);
  V15.pin.visible = o.pin !== undefined; if (V15.pin.visible) { V15.pin.position.set(...PINP); V15.pin.rotation.y = Math.PI; V15.p1.rotation.z = o.pin / 2; V15.p2.rotation.z = -o.pin / 2; }
  V15.tong.visible = V15.pot.visible = !!o.tong; if (o.tong) { const a = o.tong.a, L = o.tong.lift || 0; V15.tong.position.set(TONGP[0], TONGP[1] + L, TONGP[2]); V15.tong.rotation.z = TL.TONG.PHIB + a / 2; V15.t1.rotation.z = a / 2; V15.t2.rotation.z = -a / 2;
    V15.pot.position.set(TONGP[0] + TL.TONG.RP * Math.cos(TL.TONG.PHIB), TL.TONG.POTY + Math.max(0, L), TONGP[2]); }
  V15.sci.visible = !!o.sci && !o.sci.hand; V15.cloth.visible = !!o.sci; if (o.sci) { V15.sci.position.set(SCIP[0] + o.sci.cut, SCIP[1] + 0.012, SCIP[2]); V15.sci.rotation.x = -Math.PI / 2; V15.s1.rotation.z = o.sci.a / 2; V15.s2.rotation.z = -o.sci.a / 2; }
  /* o.sciUp {a, xp}: the scissors upright (blades in the vertical plane, at 90 degrees to the cloth): the lower blade level just
     under the cloth, the upper blade open by a; the cloth overhangs the bench's front edge so the lower blade runs under it */
  if (o.sciUp) { const u = o.sciUp; V15.sci.visible = V15.cloth.visible = true; V15.sci.rotation.set(0, 0, u.a / 2); V15.sci.position.set(u.xp, SCI_UP.Y, SCI_UP.Z); V15.cloth.position.set(TL.X + 0.42, TL.TY + 0.002, TL.Z + 0.40); }
  if (o.well !== undefined) { const W = TL.WELL, d = o.well, top = W.BEAM - 0.1 - W.PR, yb = 0.05 + d, yh = 1.35 - d;
    const seg = (m, x, y1, y2) => { m.position.set(x, (y1 + y2) / 2, 0); m.scale.y = Math.max(0.01, y2 - y1); };
    seg(V15.rL, -W.PR, yb + 0.37, top); seg(V15.rR, W.PR, yh, top); V15.buck.position.set(-W.PR, yb, 0); V15.wheel.rotation.z = d / W.PR; }
};
Object.assign(C11, {
  bench: (x, f = 28) => ({ pos: [x, TL.TY + 0.22, TL.Z + 0.75], look: [x, TL.TY + 0.06, TL.Z], fov: f }),
  well: () => ({ pos: [TL.WELL.X + 0.5, 1.35, 3.0], look: [TL.WELL.X + 0.1, 1.0, 0], fov: 44 }),
});
/* the opening of the pincers' handles shrinks by u; the jaws close by the same angle (rigid arms) */
/* the hand that holds the tongs (make_tongs.py): one picture per gap between the strips at the hand (mm); the nearest one is drawn,
   its top strip on the top strip of the tongs, turned to the strip's angle on the screen */
const TONG_IMG = [{"g": 43, "anchor": [1166.6666666666667, 1148.6133333333332], "ang": 0, "pxPerMm": 6.666666666666667}, {"g": 36, "anchor": [1166.6666666666667, 1148.6133333333332], "ang": 0, "pxPerMm": 6.666666666666667}, {"g": 29, "anchor": [1166.6666666666667, 1148.6133333333332], "ang": 0, "pxPerMm": 6.666666666666667}, {"g": 22, "anchor": [1166.6666666666667, 1148.6133333333332], "ang": 0, "pxPerMm": 6.666666666666667}, {"g": 15, "anchor": [1166.6666666666667, 1148.6133333333332], "ang": 0, "pxPerMm": 6.666666666666667}, {"g": 8, "anchor": [1166.6666666666667, 1148.6133333333332], "ang": 0, "pxPerMm": 6.666666666666667}];
function handTong(P, a, lift = 0, o = 1) { const g = 2 * TL.TONG.F * Math.sin(a / 2) * 1000; let i = 0; TONG_IMG.forEach((q, k) => { if (Math.abs(q.g - g) < Math.abs(TONG_IMG[i].g - g)) i = k; });
  const q = TONG_IMG[i], ang = tongTop(a), at = r => P(TONGP[0] + r * Math.cos(ang), TONGP[1] + lift + r * Math.sin(ang) + 0.0015, TONGP[2] + 0.01), [x, y] = at(TL.TONG.F), [x2, y2] = at(TL.TONG.F + 0.1);
  return handImg('hand_tong_' + i + '.png', q.anchor, q.pxPerMm, x, y, Math.atan2(y2 - y, x2 - x) * 180 / Math.PI - q.ang, pxpm(P, [TONGP[0] + TL.TONG.F, TONGP[1], TONGP[2]]), o, false); }
/* the hand holding the scissors (make_scissors.py): one picture per opening of the blades (degrees); the scissors are in the picture.
   The pivot goes on (x, y) and the picture is turned so that its lower blade lies along the table (screen angle ang). */
const SCI_IMG = [{"th": 36, "anchor": [1491.428571428571, 1194.1367975429887], "low": 21.745863051883855, "pxPerMm": 4.285714285714286}, {"th": 28, "anchor": [1491.428571428571, 1194.1367975429887], "low": 17.929616079797896, "pxPerMm": 4.285714285714286}, {"th": 20, "anchor": [1491.428571428571, 1194.1367975429887], "low": 14.132722749603479, "pxPerMm": 4.285714285714286}, {"th": 12, "anchor": [1491.428571428571, 1194.1367975429887], "low": 10.351403536837557, "pxPerMm": 4.285714285714286}, {"th": 5, "anchor": [1491.428571428571, 1194.1367975429887], "low": 7.052392929348749, "pxPerMm": 4.285714285714286}];
function handSci(x, y, ang, th, pm, o = 1) { let i = 0; SCI_IMG.forEach((q, k) => { if (Math.abs(q.th - th) < Math.abs(SCI_IMG[i].th - th)) i = k; }); const q = SCI_IMG[i];
  return handImg('hand_sci_' + i + '.png', q.anchor, q.pxPerMm, x, y, ang - q.low, pm, o, false); }
/* the hand squeezing the pincers: the same fist as on the tongs (the top handle under the palm, the fingers round the bottom handle),
   its thumb towards the jaws. The top handle leaves the pivot at +a/2 (the pincers are turned round, handles to +x). */
function handPin(P, a, o = 1) { const r = 0.1, g = 2 * r * Math.sin(a / 2) * 1000; let i = 0; TONG_IMG.forEach((q, k) => { if (Math.abs(q.g - g) < Math.abs(TONG_IMG[i].g - g)) i = k; });
  const q = TONG_IMG[i], at = d => P(PINP[0] + d * Math.cos(a / 2), PINP[1] + d * Math.sin(a / 2) + 0.006, PINP[2]), [x, y] = at(r), [x2, y2] = at(r - 0.1);
  return handImg('hand_tong_' + i + '.png', q.anchor, q.pxPerMm, x, y, Math.atan2(y2 - y, x2 - x) * 180 / Math.PI - 180 + q.ang, pxpm(P, [PINP[0] + r, PINP[1], PINP[2]]), o, true); }   // mirrored: the thumb points to the jaws, the palm stays on top
