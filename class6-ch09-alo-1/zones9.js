/* Chapter 9, video 1: things added to the 3D world through the same hooks as zones3.js (buildV3 once, frameV3 every frame).
   Units: metres. Everything is hidden unless a frame asks for it.

   EXP  the textbook activity of lessons 1-2 (fig 9.1), in a room at x = EXP.X:
        a table; three equal notebook covers standing on it, one behind the other along +x, their pin holes on one straight
        line; a lit candle behind them, its flame at the height of the holes. You look from the other end (-x).
        Positions along the line are measured from O = EXP.X + EXP.O0 on the table top:
          eye -0.12, covers 0.15, 0.30, 0.45, candle 0.60; holes and the centre of the flame 0.12 above the table.
        A cover moved sideways by more than the radius of its hole stops the light (a straight line from the flame to the
        eye then meets the paper, not the hole).

   Light: o.dim (0 = daylight as in the other videos, 1 = an evening room lit only by the candle) scales the sun and the sky
   light of world3d.js, which this file finds in the scene once it is built. */
const EXP = {
  X: 9000, O0: -0.35,           // O, the zero of the measuring line, on the table top
  TOP: 0.76,                    // table top height
  Z: 0,                         // the line of the holes, the flame and the eye runs along x at z = 0
  CARDS: [0.15, 0.30, 0.45],    // positions of the covers along the line
  CANDLE: 0.60,                 // position of the candle
  EYE: -0.12,                   // position of your eye
  H: 0.12,                      // height of the holes and of the centre of the flame above the table
  CW: 0.15, CH: 0.20, CT: 0.0025, // a cover: 15 cm wide (along z), 20 cm tall, 2.5 mm board
  HOLE: 0.006,                  // hole radius as drawn (a pin hole is about 1 mm: drawn larger so it can be seen; noted on screen)
  HOLE_REAL: 0.001,
  CAND_R: 0.011, CAND_TOP: 0.098, // candle: radius, top of the wax above the table (dish included)
  FLAME_H: 0.034                // flame height; its centre sits at H
};
EXP.ox = EXP.X + EXP.O0;
/* a point on the measuring line: s along it, h above the table top, z sideways */
const expPt = (s, h = EXP.H, z = EXP.Z) => [EXP.ox + s, EXP.TOP + h, z];
/* does the straight line from the flame centre to the eye pass through every hole? shift[i] = sideways move of cover i (m) */
function expClear(shift) { return shift.every(d => Math.abs(d || 0) < EXP.HOLE_REAL); }
/* where the light from the flame towards the eye stops: the position along the line (the eye, or the first blocking cover) */
function expStop(shift) { let s = EXP.EYE; for (let i = EXP.CARDS.length - 1; i >= 0; i--) if (Math.abs(shift[i] || 0) >= EXP.HOLE_REAL) return EXP.CARDS[i] + EXP.CT / 2; return s; }

let V9 = null;
const _b9 = buildV3, _f9 = frameV3;
buildV3 = function (k) {
  _b9(k);
  const { scene, box, cyl, mat, canvasTex } = k, G = new THREE.Group(); scene.add(G);
  /* the lights of world3d.js: the sun and the sky light, so a frame can dim them */
  const lights = { sun: null, hemi: null }; scene.traverse(o => { if (o.isDirectionalLight && !lights.sun) lights.sun = o; if (o.isHemisphereLight && !lights.hemi) lights.hemi = o; });
  lights.sunI = lights.sun ? lights.sun.intensity : 1; lights.hemiI = lights.hemi ? lights.hemi.intensity : 0.6;
  const rnd = (() => { let a = 99; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();
  const X = EXP.X, T = EXP.TOP;

  /* ---- room: wooden floor, plastered walls on three sides (back, left, right), a skirting board ---- */
  const floorT = canvasTex(1024, 1024, c => { for (let i = 0; i < 16; i++) { const v = 150 + Math.floor(rnd() * 30); c.fillStyle = `rgb(${v},${Math.round(v * 0.68)},${Math.round(v * 0.42)})`; c.fillRect(0, i * 64, 1024, 64);
      for (let j = 0; j < 40; j++) { c.strokeStyle = `rgba(70,40,15,${0.08 + rnd() * 0.12})`; c.lineWidth = 1; const y = i * 64 + rnd() * 64; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(300, y + 3, 700, y - 3, 1024, y); c.stroke(); }
      c.fillStyle = 'rgba(40,22,8,.55)'; c.fillRect(0, i * 64, 1024, 2); const off = rnd() * 1024; c.fillRect(off, i * 64, 2, 64); } });
  floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping; floorT.repeat.set(2, 2);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshStandardMaterial({ map: floorT, roughness: 0.7 })); floor.rotation.x = -Math.PI / 2; floor.position.set(X, 0.002, 0); floor.receiveShadow = true; G.add(floor);
  const plaster = canvasTex(512, 512, c => { c.fillStyle = '#e9dfc9'; c.fillRect(0, 0, 512, 512); for (let i = 0; i < 2500; i++) { c.fillStyle = `rgba(${rnd() < 0.5 ? '120,100,70' : '255,255,245'},${0.03 + rnd() * 0.05})`; c.fillRect(rnd() * 512, rnd() * 512, 2 + rnd() * 3, 2 + rnd() * 3); } });
  const wallM = new THREE.MeshStandardMaterial({ map: plaster, roughness: 0.95 });
  box(4, 3, 0.1, wallM, X, 1.5, -1.25, G); box(0.1, 3, 4, wallM, X - 2, 1.5, 0, G); box(0.1, 3, 4, wallM, X + 2, 1.5, 0, G);
  box(4, 0.1, 0.02, mat('#7a5634'), X, 0.05, -1.19, G, false);

  /* ---- table: a plain wooden study table, 1.0 x 0.6 m, top at 0.76 m ---- */
  const grain = canvasTex(1024, 256, c => { c.fillStyle = '#9a6a3c'; c.fillRect(0, 0, 1024, 256); for (let i = 0; i < 160; i++) { c.strokeStyle = `rgba(${rnd() < 0.5 ? '70,40,15' : '205,150,95'},${0.06 + rnd() * 0.18})`; c.lineWidth = 0.8 + rnd() * 2; const y = rnd() * 256; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(340, y + 6 * (rnd() - 0.5), 680, y + 6 * (rnd() - 0.5), 1024, y); c.stroke(); } });
  const topM = new THREE.MeshStandardMaterial({ map: grain, roughness: 0.55 }), legM = mat('#6f4625', { roughness: 0.7 });
  box(1.0, 0.035, 0.6, topM, X, T - 0.0175, 0, G);
  box(0.94, 0.08, 0.02, legM, X, T - 0.075, -0.27, G); box(0.94, 0.08, 0.02, legM, X, T - 0.075, 0.27, G);
  [[-0.46, -0.26], [0.46, -0.26], [-0.46, 0.26], [0.46, 0.26]].forEach(([dx, dz]) => box(0.04, T - 0.035, 0.04, legM, X + dx, (T - 0.035) / 2, dz, G));

  /* ---- three equal notebook covers, each with a pin hole, standing in a small wooden foot ---- */
  const coverT = canvasTex(256, 340, (c, w, h) => { c.fillStyle = '#2f6fa8'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 1800; i++) { c.fillStyle = `rgba(255,255,255,${0.02 + rnd() * 0.04})`; c.fillRect(rnd() * w, rnd() * h, 2, 2); }
    // a plain cover: nothing written or printed on it (the board is seen from both sides)
    c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 3; c.strokeRect(10, 10, w - 20, h - 20); });
  const edgeM = mat('#e8e2d2', { roughness: 0.9 });
  const coverShape = () => { const s = new THREE.Shape(); s.moveTo(-EXP.CW / 2, 0); s.lineTo(EXP.CW / 2, 0); s.lineTo(EXP.CW / 2, EXP.CH); s.lineTo(-EXP.CW / 2, EXP.CH); s.closePath();
    const hole = new THREE.Path(); hole.absarc(0, EXP.H, EXP.HOLE, 0, Math.PI * 2, true); s.holes.push(hole); return s; };
  const covers = EXP.CARDS.map((sx) => {
    const g = new THREE.Group(); G.add(g);
    const geo = new THREE.ExtrudeGeometry(coverShape(), { depth: EXP.CT, bevelEnabled: false, curveSegments: 48 });
    // map the cover picture onto both faces: u across z (−CW/2..CW/2), v up (0..CH)
    const uv = geo.attributes.uv, pos = geo.attributes.position; for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + EXP.CW / 2) / EXP.CW, pos.getY(i) / EXP.CH);
    const m = new THREE.Mesh(geo, [new THREE.MeshStandardMaterial({ map: coverT, roughness: 0.8 }), edgeM]);
    m.rotation.y = Math.PI / 2; m.position.set(-EXP.CT / 2, 0, 0); m.castShadow = m.receiveShadow = true; g.add(m);   // the board's faces look along ±x
    box(0.05, 0.022, 0.05, mat('#7a4f2a'), 0, 0.011, -EXP.CW / 2 + 0.03, g); box(0.05, 0.022, 0.05, mat('#7a4f2a'), 0, 0.011, EXP.CW / 2 - 0.03, g);   // two small wooden feet
    g.position.set(EXP.ox + sx, T, EXP.Z); return g; });

  /* ---- candle in a brass dish: wax, wick, flame (inner and outer), glow, and a warm point light ---- */
  const cg = new THREE.Group(); cg.position.set(EXP.ox + EXP.CANDLE, T, EXP.Z); G.add(cg);
  const brass = mat('#b98a2e', { roughness: 0.35, metalness: 0.7 });
  cyl(0.035, 0.03, 0.008, brass, 0, 0.004, 0, cg, 36); cyl(0.036, 0.036, 0.004, brass, 0, 0.009, 0, cg, 36);
  const wax = new THREE.MeshStandardMaterial({ color: '#f6f1e4', roughness: 0.55, emissive: '#ffb45a', emissiveIntensity: 0 });
  cyl(EXP.CAND_R, EXP.CAND_R, EXP.CAND_TOP - 0.011, wax, 0, 0.011 + (EXP.CAND_TOP - 0.011) / 2, 0, cg, 32);
  { const q = new THREE.Mesh(new THREE.TorusGeometry(EXP.CAND_R * 0.75, 0.0025, 8, 32), wax); q.rotation.x = Math.PI / 2; q.position.y = EXP.CAND_TOP; cg.add(q); }   // soft rim of melted wax
  const wickTop = EXP.H - EXP.FLAME_H * 0.42;
  cyl(0.0009, 0.0011, wickTop - EXP.CAND_TOP + 0.004, mat('#1d1712'), 0, (EXP.CAND_TOP + wickTop) / 2, 0, cg, 8);
  const flameG = new THREE.Group(); flameG.position.y = EXP.H; cg.add(flameG);
  const tear = (r, h, n = 24) => { const p = []; for (let i = 0; i <= n; i++) { const u = i / n, y = -0.42 * h + u * h; const rr = r * Math.sin(Math.PI * Math.pow(u, 0.62)) * (1 - 0.15 * u); p.push(new THREE.Vector2(Math.max(rr, 1e-5), y)); } return new THREE.LatheGeometry(p, 32); };
  const outerF = new THREE.Mesh(tear(0.0062, EXP.FLAME_H), new THREE.MeshBasicMaterial({ color: '#ffb347', transparent: true, opacity: 0.85, depthWrite: false }));
  const innerF = new THREE.Mesh(tear(0.0036, EXP.FLAME_H * 0.66), new THREE.MeshBasicMaterial({ color: '#fff6d2', transparent: true, opacity: 0.95, depthWrite: false })); innerF.position.y = -0.003;
  const blueF = new THREE.Mesh(new THREE.SphereGeometry(0.0028, 16, 10), new THREE.MeshBasicMaterial({ color: '#5a7cff', transparent: true, opacity: 0.55, depthWrite: false })); blueF.position.y = -0.011; blueF.scale.y = 0.7;
  flameG.add(outerF); flameG.add(innerF); flameG.add(blueF);
  const glowT = canvasTex(256, 256, (c, w, h) => { const gr = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); gr.addColorStop(0, 'rgba(255,214,140,0.9)'); gr.addColorStop(0.25, 'rgba(255,170,70,0.35)'); gr.addColorStop(1, 'rgba(255,140,40,0)'); c.fillStyle = gr; c.fillRect(0, 0, w, h); });
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowT, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); glow.scale.set(0.07, 0.07, 1); flameG.add(glow);
  const fl = new THREE.PointLight('#ffb866', 0, 3.5, 2); fl.position.set(0, EXP.H + 0.005, 0); fl.castShadow = true; fl.shadow.mapSize.set(1024, 1024); fl.shadow.bias = -0.002; fl.shadow.camera.near = 0.01; cg.add(fl);

  /* the light's path as a 3D tube, so the covers hide the parts of it that are behind them: it shows in the gaps and
     through the holes only. Unit length along y, stretched each frame. */
  const rayM = new THREE.MeshBasicMaterial({ color: '#FFC83D' }), ray = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 16), rayM); ray.visible = false; scene.add(ray);
  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), new THREE.MeshBasicMaterial({ color: '#fff6d2' })); head.visible = false; scene.add(head);
  V9 = { G, lights, covers, cg, flameG, outerF, innerF, glow, fl, wax, ray, head };
};

/* o.exp = { shift: [d1, d2, d3] sideways moves of the covers (m, + = towards the camera), lit: 0..1 (the flame), t: seconds (flicker) }
   o.dim = 0..1 */
frameV3 = function (o) {
  _f9(o);
  const L = V9.lights, d = cl(o.dim || 0);
  if (L.sun) L.sun.intensity = L.sunI * (1 - 0.88 * d);
  if (L.hemi) L.hemi.intensity = L.hemiI * (1 - 0.8 * d);
  const e = o.exp; V9.G.visible = !!e; V9.fl.visible = !!e;
  /* o.ray = {a, b, r}: the light's path along the line of the holes from position a to b (m), tube radius r, with a bright head at b */
  const R = o.ray; V9.ray.visible = V9.head.visible = !!R && Math.abs(R.b - R.a) > 1e-4;
  if (V9.ray.visible) { const r = R.r || 0.0018, A = expPt(R.a), B = expPt(R.b), len = Math.abs(R.b - R.a);
    V9.ray.position.set((A[0] + B[0]) / 2, A[1], A[2]); V9.ray.rotation.set(0, 0, Math.PI / 2); V9.ray.scale.set(r, len, r);
    V9.head.position.set(...B); V9.head.scale.setScalar(r * 2.4); }
  if (!e) return;
  (e.shift || []).forEach((s, i) => { V9.covers[i].position.z = EXP.Z + (s || 0); });
  const lit = e.lit === undefined ? 1 : cl(e.lit), t = e.t || 0;
  const f = 1 + 0.07 * Math.sin(t * 13.1) + 0.04 * Math.sin(t * 23.7 + 1.3), sway = 0.0012 * Math.sin(t * 5.3) + 0.0006 * Math.sin(t * 11.9);
  V9.flameG.visible = lit > 0.01; V9.flameG.scale.set(lit * (1 - 0.03 * (f - 1)), lit * f, lit * (1 - 0.03 * (f - 1)));
  V9.flameG.position.x = sway; V9.glow.material.opacity = (o.glow === undefined ? 0.8 : o.glow) * lit;
  V9.fl.intensity = 1.1 * lit * (0.94 + 0.06 * f);
  V9.wax.emissiveIntensity = 0.12 * lit;
};

/* cameras: side view at the height of the holes as in fig 9.1 (raised a little so the table top shows), a raised view from
   your end of the table (who is where), and your eye looking along the line of the holes */
const C9 = {
  side: () => { const [x, y] = expPt(0.24); return { pos: [x - 0.42, y + 0.16, 0.98], look: [x - 0.02, y - 0.03, 0], fov: 29 }; },   // like fig 9.1: from in front and a little from your end, so the faces of the covers and their holes show
  overview: () => { const [x, y] = expPt(0.2); return { pos: [x - 0.95, y + 0.55, 0.95], look: [x, y - 0.04, 0], fov: 36 }; },
  eye: () => { const p = expPt(EXP.EYE), q = expPt(EXP.CANDLE); return { pos: p, look: q, fov: 7.5 }; },
};
