/* Chapter 11, video 1, scenes 7 to 9, on a second bench at x = 6800 (can, shil-pata, mouse) and the study room table
   (ruler lever).
   Ruler lever (নিজে করো): a 30 cm ruler on a pencil 8 mm thick; the book's edge (0.45 kg book, half its weight on the
   ruler = 2.2 N) on one end, the finger on the other. Balance about the pencil: finger force = 2.2 N x (book arm / finger arm).
   With the pencil in the middle the arms are 15 and 15 cm (2.2 N); near the book 5 and 25 cm (0.44 N); far 25 and 5 (11 N). */
const B7 = { X: 6800, TY: 0.78 };
const RL = { L: 0.30, H: 0.008, W: 0.45 * 9.8 / 2 };
let V16 = null;
const _b15 = buildV3, _f15 = frameV3;
buildV3 = function (k) {
  _b15(k);
  const { scene, mat, box, cyl, canvasTex } = k, G = new THREE.Group(); scene.add(G);
  const steel = mat('#c9ced2', { roughness: 0.3, metalness: 0.8 }), wood = mat('#8a5a30');
  box(12, 0.1, 8, mat('#d9cfbc', { roughness: 0.7 }), B7.X, -0.05, 0, G, false); box(8, 3, 0.12, mat('#efe2c6'), B7.X, 1.5, -1.1, G);
  box(2.4, 0.05, 0.7, mat('#a0693a'), B7.X, B7.TY - 0.025, 0, G); [[-1.1, -0.3], [1.1, -0.3], [-1.1, 0.3], [1.1, 0.3]].forEach(([x, z]) => box(0.05, B7.TY - 0.05, 0.05, wood, B7.X + x, (B7.TY - 0.05) / 2, z, G));
  /* can: 6.6 cm wide, 12 cm tall, a plain red label, a pull ring on the lid */
  const lt = canvasTex(512, 256, c => { const g = c.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#d23a2a'); g.addColorStop(1, '#a8261a'); c.fillStyle = g; c.fillRect(0, 0, 512, 256); c.fillStyle = '#fff'; c.font = '700 70px "Hind Siliguri"'; c.textAlign = 'center'; c.fillText('ঠান্ডা পানীয়', 256, 150); c.fillStyle = '#f4d35e'; c.fillRect(0, 200, 512, 12); });
  const can = new THREE.Group(); can.position.set(B7.X - 0.7, B7.TY, 0); scene.add(can);
  { const body = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.033, 0.11, 40, 1, true), new THREE.MeshStandardMaterial({ map: lt, roughness: 0.35, metalness: 0.4 })); body.position.y = 0.062; body.castShadow = true; can.add(body);
    cyl(0.03, 0.033, 0.007, steel, 0, 0.0035, 0, can, 40); cyl(0.027, 0.033, 0.008, steel, 0, 0.121, 0, can, 40); cyl(0.027, 0.027, 0.002, steel, 0, 0.125, 0, can, 40); }
  const tab = new THREE.Group(); tab.position.set(0, 0.127, 0.004); can.add(tab); { const r = new THREE.Mesh(new THREE.TorusGeometry(0.008, 0.0018, 8, 20), steel); r.rotation.x = Math.PI / 2; r.position.z = 0.01; tab.add(r); box(0.012, 0.0015, 0.018, steel, 0, 0, 0.002, tab, false); }
  const flap = new THREE.Mesh(new THREE.CircleGeometry(0.009, 20), mat('#9aa3a8', { metalness: 0.7, roughness: 0.3, side: THREE.DoubleSide })); flap.rotation.x = -Math.PI / 2; flap.position.set(0, 0.1265, -0.012); can.add(flap);
  const hole = new THREE.Mesh(new THREE.CircleGeometry(0.009, 20), mat('#14110e')); hole.rotation.x = -Math.PI / 2; hole.position.set(0, 0.1262, -0.012); can.add(hole);
  /* shil-pata: a stone slab with chisel marks, the round stone roller (nora), lumps of turmeric and the paste */
  const stT = canvasTex(512, 256, c => { c.fillStyle = '#8b8780'; c.fillRect(0, 0, 512, 256); let s = 5; const r = () => (s = (s * 16807) % 2147483647) / 2147483647; for (let i = 0; i < 3000; i++) { c.fillStyle = `rgba(${r() < 0.5 ? '50,48,44' : '220,214,200'},${0.08 + r() * 0.15})`; c.fillRect(r() * 512, r() * 256, 2, 2); } c.strokeStyle = 'rgba(40,38,34,.35)'; c.lineWidth = 2; for (let i = 0; i < 60; i++) { const x = r() * 512, y = r() * 256; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 8, y + 3); c.stroke(); } });
  const pata = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.26), new THREE.MeshStandardMaterial({ map: stT, roughness: 0.95 })); pata.position.set(B7.X, B7.TY + 0.02, 0); pata.castShadow = pata.receiveShadow = true; scene.add(pata);
  const nora = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.2, 30), new THREE.MeshStandardMaterial({ map: stT, roughness: 0.9 })); nora.rotation.x = Math.PI / 2; nora.castShadow = true; scene.add(nora);
  const lumps = []; for (let i = 0; i < 9; i++) { const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.009, 0), mat('#d99a1e', { roughness: 0.8 })); m.position.set(B7.X - 0.08 + (i % 3) * 0.03, B7.TY + 0.046, -0.04 + Math.floor(i / 3) * 0.04); m.rotation.set(i, i * 2, i * 3); m.castShadow = true; scene.add(m); lumps.push(m); }
  const paste = new THREE.Mesh(new THREE.CircleGeometry(1, 40), mat('#e3a422', { roughness: 0.6 })); paste.rotation.x = -Math.PI / 2; paste.position.set(B7.X - 0.05, B7.TY + 0.0405, 0); paste.scale.set(0.001, 0.001, 1); scene.add(paste);
  /* mouse: a smooth body, two buttons split by a groove, a wheel and a cable */
  const mouse = new THREE.Group(); mouse.position.set(B7.X + 0.75, B7.TY, 0); scene.add(mouse); const pl = mat('#2d3035', { roughness: 0.4 });
  { const b = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2), pl); b.scale.set(0.06, 0.035, 0.032); mouse.add(b); b.castShadow = true; }
  const btn = new THREE.Group(); btn.position.set(0.028, 0.03, 0.008); mouse.add(btn); { const q = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat('#3a3e44', { roughness: 0.35 })); q.scale.set(0.03, 0.008, 0.013); btn.add(q); }
  cyl(0.006, 0.006, 0.004, mat('#888'), 0.03, 0.034, 0, mouse, 16).rotation.x = Math.PI / 2;
  { const c = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([[0.06, 0.006, 0], [0.12, 0.004, 0.02], [0.2, 0.003, -0.03], [0.32, 0.003, 0]].map(p => new THREE.Vector3(...p))), 40, 0.002, 8), mat('#222')); mouse.add(c); }
  /* ruler lever on the study-room table: a pencil, a ruler with marks, a book */
  const T = ROAD.ROOM.TABLE, RX = ROAD.ROOM.X + T[0], TOP = T[1] + 0.025, rset = new THREE.Group(); scene.add(rset);
  const rt = canvasTex(1024, 96, c => { c.fillStyle = '#f2d16b'; c.fillRect(0, 0, 1024, 96); c.fillStyle = '#2c3e50'; for (let i = 0; i <= 300; i++) { const x = 6 + i * 3.37, h = i % 10 ? (i % 5 ? 16 : 24) : 34; c.fillRect(x, 0, 1.4, h); if (i % 50 === 0) { c.font = '700 26px Arial'; c.fillText(String(i / 10), x + 3, 64); } } });
  const ruler = new THREE.Group(); rset.add(ruler); { const q = new THREE.Mesh(new THREE.BoxGeometry(RL.L, 0.003, 0.032), [mat('#e2c25c'), mat('#e2c25c'), new THREE.MeshStandardMaterial({ map: rt, roughness: 0.4 }), mat('#e2c25c'), mat('#e2c25c'), mat('#e2c25c')]); q.castShadow = true; ruler.add(q); }
  const pencil = new THREE.Group(); rset.add(pencil); { const p = cyl(RL.H / 2, RL.H / 2, 0.16, mat('#f2b705', { roughness: 0.5 }), 0, 0, 0, pencil, 6); p.rotation.x = Math.PI / 2; const tip = new THREE.Mesh(new THREE.ConeGeometry(RL.H / 2, 0.02, 6), mat('#e9cfa2')); tip.rotation.x = -Math.PI / 2; tip.position.z = 0.09; pencil.add(tip); const e = cyl(RL.H / 2, RL.H / 2, 0.012, mat('#e98f8a'), 0, 0, -0.086, pencil, 12); e.rotation.x = Math.PI / 2; }
  const book = new THREE.Group(); rset.add(book); box(0.21, 0.025, 0.28, mat('#1f5fa8'), 0.105, 0.0125, 0, book); box(0.2, 0.019, 0.27, mat('#f6f1e2'), 0.1, 0.0125, 0, book, false);
  /* ghosts of the small stone for the puzzle: two other places under the rod */
  const ghosts = [0, 1].map(() => { const q = V11.ful.clone(); q.material = V11.ful.material.clone(); q.material.transparent = true; q.material.opacity = 0.45; q.castShadow = false; scene.add(q); return q; });
  [can, pata, nora, paste, mouse, rset, ...lumps, ...ghosts].forEach(o => o.visible = false);
  V16 = { TZ: T[2], G, can, tab, flap, pata, nora, lumps, paste, mouse, btn, rset, ruler, pencil, book, RX, TOP, ghosts };
};
/* ruler lever: pencil at p (m from the book end of the ruler), finger end pressed by k (0..1) */
function rulerState(p, k) {
  const up = RL.L - p, tb = Math.asin(Math.min(1, RL.H / p)), tf = Math.asin(Math.min(1, RL.H / up));   // book end on the table: tilt tb; finger end on the table: -tf
  const th = tb - (tb + tf) * k;                                                                    // k = 0: the finger end is up; k = 1: it touches the table
  return { th, pivot: RL.H, p };
}
/* o.can (ring lift 0..1) | o.sp {nora x, grind 0..1} | o.mouse (press 0..1) | o.ruler {p, k} | o.ghosts [dx, dx] */
frameV3 = function (o) {
  _f15(o);
  const on = o.can !== undefined || !!o.sp || o.mouse !== undefined; V16.G.visible = on;
  V16.can.visible = o.can !== undefined; if (V16.can.visible) { const a = o.can; V16.tab.rotation.x = -1.2 * a; V16.flap.rotation.x = -Math.PI / 2 + 1.3 * Math.max(0, a - 0.4) / 0.6; V16.flap.position.y = 0.1265 - 0.006 * Math.max(0, a - 0.4); }
  const sp = o.sp; V16.pata.visible = V16.nora.visible = V16.paste.visible = !!sp; V16.lumps.forEach((m, i) => { m.visible = !!sp && sp.grind < 0.15 + i * 0.09; if (m.visible) m.scale.setScalar(1 - sp.grind * 0.5); });
  if (sp) { V16.nora.position.set(B7.X + sp.x, B7.TY + 0.04 + 0.035, 0); V16.nora.rotation.y = 0; V16.nora.rotation.z = -sp.x / 0.035; const r = 0.02 + 0.07 * sp.grind; V16.paste.scale.set(r * 1.6, r, 1); }
  V16.mouse.visible = o.mouse !== undefined; if (V16.mouse.visible) V16.btn.position.y = 0.03 - 0.0018 * o.mouse;
  V16.rset.visible = !!o.ruler; if (o.ruler) { const st = rulerState(o.ruler.p, o.ruler.k), X = V16.RX + 0.12, Y = V16.TOP, Z = V16.TZ, show = o.ruler.show || 7;
    V16.pencil.visible = !!(show & 1); V16.ruler.visible = !!(show & 2); V16.book.visible = !!(show & 4);
    /* th > 0: the finger end is up and the book end down; the ruler turns about the top of the pencil */
    const px = X + st.p, py = Y + RL.H + 0.0015, c = Math.cos(st.th), s = Math.sin(st.th); V16.pencil.position.set(px, Y + RL.H / 2, Z);
    V16.ruler.position.set(px + (RL.L / 2 - st.p) * c, py + (RL.L / 2 - st.p) * s, Z); V16.ruler.rotation.z = st.th;
    const lift = Math.max(0, py - st.p * s - Y - 0.0015); V16.book.position.set(X - 0.2, Y, Z); V16.book.rotation.z = Math.atan2(lift, 0.2); }
  V16.ghosts.forEach((g, i) => { const d = o.ghosts && o.ghosts[i]; g.visible = d !== undefined; if (g.visible) g.position.set(LV.X + d, 0, LV.Z - 0.1); });
};
/* the finger end of the ruler (world), for the hand and the arrows */
function rulerEnd(p, k) { const st = rulerState(p, k), X = V16.RX + 0.12, Y = V16.TOP; return [X + st.p + (RL.L - st.p) * Math.cos(st.th), Y + RL.H + 0.003 + (RL.L - st.p) * Math.sin(st.th), V16.TZ]; }
Object.assign(C11, {
  b7: (x, f = 26, h = 0.3) => ({ pos: [B7.X + x, B7.TY + h, 0.62], look: [B7.X + x, B7.TY + 0.05, 0], fov: f }),
  ruler: () => ({ pos: [ROAD.ROOM.X + ROAD.ROOM.TABLE[0] + 0.24, ROAD.ROOM.TABLE[1] + 0.2, ROAD.ROOM.TABLE[2] + 0.62], look: [ROAD.ROOM.X + ROAD.ROOM.TABLE[0] + 0.24, ROAD.ROOM.TABLE[1] + 0.03, ROAD.ROOM.TABLE[2]], fov: 34 }),
});
