/* Video 2, new machines. Metres, newtons. Every arrow follows the lever arms named here.
   WS = a workshop at x = 7200 (floor, wall, a long bench), for the hand tools of scenes 3, 5, 7 and 8.
   - জাঁতি (JT): hinge at the left end, handles 0.17 m from the hinge; a betel nut at d = 0.10 or 0.035 m: F = R d / 0.17
   - হাতুড়ি (HM): head rests on the board at the fulcrum; claw holds the nail 0.05 m from it; hand on the handle 0.30 m away:
     the nail is pulled with 0.30 / 0.05 = 6 times the hand's force
   - ঢেঁকি (DK) in the village yard: beam 2.4 m on a pivot 0.8 m from the foot end; pestle head 1.6 m from the pivot
   - নিক্তি (NK) on a shop counter: equal arms 0.16 m, pans on three strings */
const WS = { X: 7200, TY: 0.80 };
const JT = { L: 0.20, H: 0.17, X: WS.X - 0.80, OPEN: 0.42 };
const HM = { X: WS.X - 0.10, Y: WS.TY + 0.05, H: 0.30, C: 0.05 };
const DK = { X: 852, Z: 4.4, PIV: 0.8, L: 2.4, PH: 0.42 };
const NK = { X: 7206, Y: 1.00, ARM: 0.16 };
let V18 = null;
const _bG = buildV3, _fG = frameV3;
buildV3 = function (k) {
  _bG(k);
  const { scene, mat, box, cyl, canvasTex } = k, G = new THREE.Group(); scene.add(G);
  const rnd = (() => { let a = 23; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();
  const grain = (base, dark, light, w = 512, h = 128) => canvasTex(w, h, c => { c.fillStyle = base; c.fillRect(0, 0, w, h); for (let i = 0; i < 90; i++) { c.strokeStyle = `rgba(${rnd() < 0.5 ? dark : light},${0.1 + rnd() * 0.3})`; c.lineWidth = 0.6 + rnd() * 1.8; const y = rnd() * h; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(w / 3, y + 6 * (rnd() - 0.5), 2 * w / 3, y + 6 * (rnd() - 0.5), w, y); c.stroke(); } });
  const steel = mat('#c4c9cd', { roughness: 0.3, metalness: 0.8 }), iron = mat('#4a4f55', { roughness: 0.45, metalness: 0.7 }), woodM = new THREE.MeshStandardMaterial({ map: grain('#8a5a30', '50,28,10', '170,120,70'), roughness: 0.8 });
  /* workshop: tiled floor, plastered wall, a long wooden bench */
  box(14, 0.1, 8, mat('#cfc6b4', { roughness: 0.8 }), WS.X, -0.05, 0, G, false); box(14, 3.2, 0.12, mat('#e6dcc6'), WS.X, 1.6, -1.2, G);
  box(3.2, 0.05, 0.75, new THREE.MeshStandardMaterial({ map: grain('#a8743f', '80,48,18', '226,180,120'), roughness: 0.75 }), WS.X, WS.TY - 0.025, 0, G);
  [[-1.5, -0.3], [1.5, -0.3], [-1.5, 0.3], [1.5, 0.3]].forEach(([x, z]) => box(0.06, WS.TY - 0.05, 0.06, woodM, WS.X + x, (WS.TY - 0.05) / 2, z, G));
  /* জাঁতি: two iron arms hinged at the left, the top arm carries the blade; wooden grips on the handle ends */
  const jt = new THREE.Group(); jt.position.set(JT.X, WS.TY + 0.03, 0); scene.add(jt);
  const jarm = (top) => { const g = new THREE.Group(); box(JT.L, 0.012, 0.016, iron, JT.L / 2, 0, 0, g); box(0.07, 0.022, 0.024, woodM, JT.H + 0.005, 0, 0, g);
    if (top) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.016, 0.004), steel); b.position.set(0.075, -0.012, 0); g.add(b); } return g; };
  const jLow = jarm(false), jTop = jarm(true); jt.add(jLow, jTop); cyl(0.009, 0.009, 0.03, steel, 0, 0, 0, jt, 16).rotation.x = Math.PI / 2;
  box(0.012, 0.03, 0.03, iron, 0, -0.018, 0, jt);
  const nutT = canvasTex(128, 128, c => { c.fillStyle = '#8a4b22'; c.fillRect(0, 0, 128, 128); for (let i = 0; i < 400; i++) { c.fillStyle = rnd() < 0.5 ? 'rgba(60,28,10,.35)' : 'rgba(200,140,90,.3)'; c.fillRect(rnd() * 128, rnd() * 128, 1 + rnd() * 5, 1 + rnd() * 2); } });
  const nut = new THREE.Mesh(new THREE.SphereGeometry(0.010, 22, 16), new THREE.MeshStandardMaterial({ map: nutT, roughness: 0.8 })); nut.scale.set(1, 0.85, 1); scene.add(nut);
  /* হাতুড়ি: a board with a nail; the claw hammer turns about the bend of its head that rests on the board */
  box(0.5, 0.05, 0.14, new THREE.MeshStandardMaterial({ map: grain('#c79a62', '90,58,24', '235,196,140'), roughness: 0.8 }), HM.X, WS.TY + 0.025, 0, G);
  const nail = new THREE.Group(); scene.add(nail); cyl(0.0022, 0.0022, 0.07, steel, 0, -0.035, 0, nail, 10); cyl(0.0055, 0.0055, 0.002, steel, 0, 0.001, 0, nail, 18);
  /* claw hammer pulling a nail, in its own frame: origin = the fulcrum, where the curved back of the claw rests on the board.
     The claw (two prongs with a slot) curves from the head down through the origin to its tips at x = -0.05 m, which hold
     the nail head; the head's neck and round striking face sit up to the right; the handle stands upright from the neck */
  const hm = new THREE.Group(), cr = 0.0055; scene.add(hm);
  const cpts = [[0.026, 0.044], [0.012, 0.012], [0, cr], [-0.026, cr + 0.004], [-0.046, cr + 0.016], [-0.056, cr + 0.024]].map(([x, y]) => new THREE.Vector3(x, y, 0));
  [-0.0055, 0.0055].forEach(z => { const tb = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cpts.map(p => p.clone().setZ(z))), 40, cr, 10), iron); tb.castShadow = true; hm.add(tb); });
  box(0.03, 0.05, 0.024, iron, 0.036, 0.062, 0, hm); cyl(0.0125, 0.0145, 0.04, iron, 0.068, 0.068, 0, hm, 24).rotation.z = Math.PI / 2; cyl(0.015, 0.015, 0.006, iron, 0.091, 0.068, 0, hm, 24).rotation.z = Math.PI / 2;
  cyl(0.014, 0.012, 0.03, iron, 0.036, 0.1, 0, hm, 18); const hd = cyl(0.0125, 0.0145, HM.H - 0.07, woodM, 0.036, 0.1 + (HM.H - 0.07) / 2, 0, hm, 20); void hd;
  /* ঢেঁকি in the village yard: two posts and a pin, the beam, an iron-shod pestle and the mortar hole with paddy */
  const dk = new THREE.Group(); dk.position.set(DK.X, 0, DK.Z); scene.add(dk);
  [-0.09, 0.09].forEach(z => box(0.08, 0.5, 0.07, woodM, 0, 0.25, z, dk));
  const beam = new THREE.Group(); beam.position.set(0, DK.PH, 0); dk.add(beam);
  box(DK.L, 0.11, 0.12, new THREE.MeshStandardMaterial({ map: grain('#7a4e2a', '45,25,8', '160,110,60'), roughness: 0.85 }), DK.L / 2 - DK.PIV, 0, 0, beam);
  cyl(0.045, 0.05, 0.42, woodM, DK.L - DK.PIV - 0.12, -0.24, 0, beam, 16); cyl(0.05, 0.05, 0.05, iron, DK.L - DK.PIV - 0.12, -0.46, 0, beam, 16);
  const mort = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.02, 24), mat('#5a4632')); mort.position.set(DK.L - DK.PIV - 0.12, 0.005, 0); dk.add(mort);
  const pad = new THREE.Mesh(new THREE.CircleGeometry(0.11, 24), mat('#d7b45a', { roughness: 1 })); pad.rotation.x = -Math.PI / 2; pad.position.set(DK.L - DK.PIV - 0.12, 0.017, 0); dk.add(pad);
  /* নিক্তি on a shop counter: jars of lentils and rice behind it, a sack; a sugar packet and an iron weight in the pans */
  const nk = new THREE.Group(); scene.add(nk);
  box(1.4, 0.95, 0.5, mat('#6d4a2b'), NK.X, 0.475, 0.1, nk); box(1.45, 0.04, 0.55, mat('#9a6a3a'), NK.X, 0.97, 0.1, nk);
  box(1.6, 0.04, 0.3, woodM, NK.X, 1.42, -0.95, nk); ['#d8a13a', '#f2ede0', '#b5552c', '#8a9a3a'].forEach((c, i) => { const x = NK.X - 0.5 + i * 0.33;
    const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.2, 24), new THREE.MeshStandardMaterial({ color: '#dfe8ee', transparent: true, opacity: 0.35, roughness: 0.1 })); jar.position.set(x, 1.54, -0.95); nk.add(jar);
    cyl(0.066, 0.066, 0.15, mat(c, { roughness: 1 }), x, 1.515, -0.95, nk, 20); cyl(0.074, 0.074, 0.03, mat('#c23b2b'), x, 1.655, -0.95, nk, 20); });
  const sack = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), mat('#c9b48a', { roughness: 1 })); sack.scale.set(1, 1.3, 0.9); sack.position.set(NK.X + 0.95, 0.28, 0.1); nk.add(sack);
  const stand = new THREE.Group(); stand.position.set(NK.X, NK.Y - 0.01, 0.15); nk.add(stand); box(0.16, 0.012, 0.1, iron, 0, 0, 0, stand); cyl(0.008, 0.008, 0.3, steel, 0, 0.15, 0, stand, 12);
  const nbeam = new THREE.Group(); nbeam.position.set(NK.X, NK.Y + 0.3, 0.15); nk.add(nbeam); box(2 * NK.ARM + 0.02, 0.01, 0.01, steel, 0, 0, 0, nbeam); box(0.01, 0.06, 0.004, steel, 0, 0.03, 0.007, nbeam);
  const pan = () => { const g = new THREE.Group(); nk.add(g); const p = new THREE.Mesh(new THREE.SphereGeometry(0.075, 28, 10, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), steel); p.position.y = 0.075; g.add(p); p.material.side = THREE.DoubleSide;
    const strs = [0, 1, 2].map(i => { const s = cyl(0.0012, 0.0012, 1, mat('#e8e2cf'), 0, 0, 0, g, 4); s.userData.a = i * 2.094; return s; }); g.userData.strs = strs; return g; };
  const panL = pan(), panR = pan();
  const sug = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.045, 0.05), mat('#f4f1ea')); panL.add(sug); sug.position.y = 0.035;
  const wt = cyl(0.025, 0.03, 0.035, iron, 0, 0.03, 0, panR, 20); cyl(0.008, 0.008, 0.012, iron, 0, 0.052, 0, panR, 10);
  V18 = { G, jt, jTop, nut, nail, hm, dk, beam, nk, nbeam, panL, panR, wt };
};
/* o.jati {a: opening rad, d: nut distance from the hinge} | o.ham {phi: turn of the hammer (rad, + = handle down)} |
   o.dheki {th: beam tilt (rad, + = pestle up)} | o.nikti {th: beam tilt} */
frameV3 = function (o) {
  _fG(o);
  const J = o.jati; V18.jt.visible = V18.nut.visible = !!J;
  if (J) { V18.jTop.rotation.z = J.a; V18.nut.position.set(JT.X + J.d, WS.TY + 0.03 + 0.006 + 0.0085, 0); }
  const H = o.ham; V18.hm.visible = V18.nail.visible = !!H;
  if (H) { V18.hm.position.set(HM.X, WS.TY + 0.05, 0); V18.hm.rotation.z = -H.phi; V18.nail.position.set(HM.X - HM.C, WS.TY + 0.05 + hmNailY(H.phi), 0); }
  V18.dk.visible = o.dheki !== undefined; if (o.dheki !== undefined) V18.beam.rotation.z = o.dheki;
  V18.nk.visible = o.nikti !== undefined;
  if (o.nikti !== undefined) { const th = o.nikti; V18.nbeam.rotation.z = th;
    [[V18.panL, -1], [V18.panR, 1]].forEach(([p, s]) => { const hx = NK.X + s * NK.ARM * Math.cos(th), hy = NK.Y + 0.3 + s * NK.ARM * Math.sin(th), bot = NK.Y + 0.06; p.position.set(hx, bot, 0.15);
      p.userData.strs.forEach(st => { const ax = 0.065 * Math.cos(st.userData.a), az = 0.065 * Math.sin(st.userData.a), L = Math.hypot(ax, hy - bot - 0.08, az); st.position.set(ax / 2, 0.08 + (hy - bot - 0.08) / 2, az / 2); st.scale.y = L;
        st.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-ax, hy - bot - 0.08, -az).normalize()); }); }); }
};
Object.assign(C11, {
  ws: (x, f = 26, h = 0.28, d = 0.7) => ({ pos: [WS.X + x, WS.TY + h, d], look: [WS.X + x, WS.TY + 0.05, 0], fov: f }),
  dheki: () => ({ pos: [DK.X + 0.45, 0.95, DK.Z + 3.0], look: [DK.X + 0.45, 0.42, DK.Z], fov: 34 }),
  nikti: () => ({ pos: [NK.X, 1.45, 1.6], look: [NK.X, 1.2, 0], fov: 34 }),
});
/* screen point of a point given in a part's own frame (origin o, turned by th about z) */
/* height of the nail head above the board when the hammer has turned by phi: the claw's centre line (its outer points, turned
   clockwise about the fulcrum) is followed to the nail at x = -0.05 m; the head sits on top of the prongs (+ tube radius) */
const HM_CLAW = [[0, 0.0055], [-0.026, 0.0095], [-0.046, 0.0215], [-0.056, 0.0295]];
function hmNailY(phi) { const c = Math.cos(phi), s = Math.sin(phi), q = HM_CLAW.map(([x, y]) => [x * c + y * s, -x * s + y * c]);
  for (let i = 0; i < q.length - 1; i++) { const [x0, y0] = q[i], [x1, y1] = q[i + 1]; if ((x0 - -HM.C) * (x1 - -HM.C) <= 0) return y0 + (y1 - y0) * (-HM.C - x0) / (x1 - x0) + 0.0055; }
  return q[q.length - 1][1] + 0.0055; }
const rotPt = (o, th, x, y, z = 0) => [o[0] + x * Math.cos(th) - y * Math.sin(th), o[1] + x * Math.sin(th) + y * Math.cos(th), o[2] + z];
