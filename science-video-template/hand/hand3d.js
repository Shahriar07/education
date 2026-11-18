/* A right hand holding a pen in the tripod grip, built in 3D from the bones of a real hand (millimetres).
   Hand frame: wrist centre at the origin, +y towards the fingers, +z the back of the hand, -x the thumb side
   (a right hand seen from above with the palm down has its thumb on the left).
   Order along the knuckles from the thumb side: index, middle, ring, little; the thumb grows from the base of the
   palm beside the index finger, so the web between thumb and index finger is where the pen lies.
   Grip: the pen is pinched between the pads of the thumb and the index finger near its tip and rests on the side of
   the middle finger's last segment; ring and little fingers curl into the palm; the pen's shaft lies in the web and
   over the knuckle of the index finger. */
const HAND = (() => {
  const T = THREE, D = Math.PI / 180, V = (x, y, z) => new T.Vector3(x, y, z);
  const M = {
    skin: new T.MeshStandardMaterial({ color: 0x9a6a50, roughness: 0.66, metalness: 0 }),
    nail: new T.MeshStandardMaterial({ color: 0xd9a48c, roughness: 0.3, metalness: 0 }),
    cloth: new T.MeshStandardMaterial({ color: 0x2a6f97, roughness: 0.9 }),
    cuff: new T.MeshStandardMaterial({ color: 0x215a7c, roughness: 0.9 }),
    blue: new T.MeshStandardMaterial({ color: 0x2e86de, roughness: 0.35 }),
    blueD: new T.MeshStandardMaterial({ color: 0x1b5fa8, roughness: 0.35 }),
    grip: new T.MeshStandardMaterial({ color: 0x23262b, roughness: 0.75 }),
    metal: new T.MeshStandardMaterial({ color: 0xc9ced2, roughness: 0.25, metalness: 0.8 }),
    ink: new T.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.4 })
  };
  const sph = (r, m = M.skin) => new T.Mesh(new T.SphereGeometry(r, 32, 20), m);
  /* a rounded, tapered segment along +y from 0 to len, radius r0 -> r1, flattened front-to-back by 'flat' */
  function seg(len, r0, r1, flat = 0.86, m = M.skin) {
    const g = new T.Group();
    const c = new T.Mesh(new T.CylinderGeometry(r1, r0, len, 36, 1, true), m); c.position.y = len / 2; g.add(c);
    const a = sph(r0, m); g.add(a);
    const b = sph(r1, m); b.position.y = len; g.add(b);
    g.scale.z = flat;
    return g;
  }
  /* a group at a whose +y points at b (len returned) */
  function between(a, b) {
    const g = new T.Group(); g.position.copy(a);
    const d = b.clone().sub(a), len = d.length();
    g.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
    return { g, len };
  }
  /* a group whose +y is dir and +z is as close as possible to up */
  function basis(pos, dir, up) {
    const y = dir.clone().normalize(), z = up.clone().sub(y.clone().multiplyScalar(up.dot(y))).normalize(), x = y.clone().cross(z);
    const g = new T.Group(); g.position.copy(pos);
    g.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(x, y, z));
    return g;
  }
  /* a finger: three segments with flexion at each joint (towards the palm, -z), abduction at the knuckle */
  function finger(parent, base, abd, L, R, flex, flat = 0.86) {
    const j1 = new T.Group(); j1.position.copy(base); j1.rotation.set(-flex[0] * D, 0, abd * D, 'ZXY'); parent.add(j1);
    j1.add(seg(L[0], R[0], R[1], flat));
    const j2 = new T.Group(); j2.position.y = L[0]; j2.rotation.x = -flex[1] * D; j1.add(j2);
    j2.add(seg(L[1], R[1], R[2], flat));
    const j3 = new T.Group(); j3.position.y = L[1]; j3.rotation.x = -flex[2] * D; j2.add(j3);
    j3.add(seg(L[2], R[2], R[3], flat));
    // the nail on the back of the last segment
    const n = sph(1, M.nail); n.scale.set(R[3] * 0.78, L[2] * 0.42, R[3] * 0.22); n.position.set(0, L[2] * 0.62, R[3] * flat * 0.86); n.rotation.x = 0.12; j3.add(n);
    return { j1, j2, j3, L, R, flat };
  }
  /* world point on a finger's last segment: along = 0..1 from its joint, side = 'pad' (palm side) or 'radial' */
  function pt(f, along, side) {
    const r = f.R[2] + (f.R[3] - f.R[2]) * along;
    const p = side === 'pad' ? V(0, f.L[2] * along, -r * f.flat) : side === 'radial' ? V(-r, f.L[2] * along, 0) : V(0, f.L[2] * along, 0);
    f.j3.updateWorldMatrix(true, false);
    return f.j3.localToWorld(p);
  }

  /* bone measurements of an adult hand (mm), scaled by K: knuckle (MCP) positions, segment lengths, joint radii,
     the thumb's base (CMC). Shared by the model and by the grip solver (solve.js). */
  /* S = proportions of this hand against the adult table: finger and thumb length, finger width, palm width */
  function geom(K, S) {
    // tWid = thumb width against the fingers, rlLen = ring and little finger length, web = size of the thumb-index web
    S = Object.assign({ len: 1, wid: 1, palmW: 1, tWid: 1, rlLen: 1, web: 1, palmT: 1 }, S || {});   // palmT = thickness of the back of the hand and the knuckles
    const s = (x, y, z) => [x * K * S.palmW, y * K, z * K], k = (a, f) => a.map(x => x * K * f);
    return {
      S,
      mcp: { index: s(-27, 92, 0), middle: s(-8, 96, 1), ring: s(10, 92, 0), little: s(26, 83, -2) },
      wrist: { index: s(-15, 12, 0), middle: s(-5, 12, 1), ring: s(5, 12, 0), little: s(15, 12, -1) },
      mrad: { index: 11.5 * K, middle: 12 * K, ring: 11 * K, little: 10 * K },
      L: { index: k([40, 24, 19], S.len), middle: k([44, 28, 20], S.len), ring: k([41, 27, 20], S.len * S.rlLen), little: k([33, 20, 18], S.len * S.rlLen), thumb: k([44, 31, 25], S.len) },
      R: { index: k([11, 10, 9.2, 8.4], S.wid), middle: k([11.5, 10.5, 9.5, 8.7], S.wid), ring: k([10.8, 9.9, 9, 8.3], S.wid), little: k([9.6, 8.8, 8.1, 7.5], S.wid), thumb: k([13, 12, 11, 10], S.wid * S.tWid) },
      cmc: s(-22, 22, -8)
    };
  }
  const A = a => V(a[0], a[1], a[2]);

  function build(P) {
    const hand = new T.Group();
    const K = P.size, G = geom(K, P.shape);
    const s = (x, y, z) => V(x * K, y * K, z * K);
    // ---- palm: one broad, rounded slab, wider than the wrist, as long as the middle finger; the knuckles of the four
    //      fingers sit along its top edge. Outline in mm (the 6 mm rounding is added all round).
    {
      const o = [[-20, 10], [0, 8], [21, 10], [29, 30], [31, 60], [28, 80], [18, 89], [3, 93], [-12, 93], [-24, 89], [-31, 78], [-33, 58], [-31, 36], [-26, 18]];
      const sh = new T.Shape(); sh.moveTo(o[0][0] * K, o[0][1] * K);
      sh.splineThru(o.slice(1).concat([o[0]]).map(p => new T.Vector2(p[0] * K, p[1] * K)));
      const geo = new T.ExtrudeGeometry(sh, { depth: 14 * K, bevelEnabled: true, bevelThickness: 8 * K, bevelSize: 6 * K, bevelSegments: 8, curveSegments: 64, steps: 1 });
      geo.translate(0, 0, -10 * K); geo.computeVertexNormals();
      hand.add(new T.Mesh(geo, M.skin));
    }
    const ell = (c, r, rot = 0) => { const e = sph(1); e.scale.set(r[0] * K, r[1] * K, r[2] * K); e.position.copy(c); e.rotation.z = rot * D; hand.add(e); };
    ell(s(20, 42, -8), [12, 32, 10], 4);               // hypothenar (the pad on the little-finger side of the palm)
    ell(s(-1, 50, 3), [29, 44, 11.5]);                 // the back of the hand is gently domed
    ell(s(0, 78, -9), [28, 12, 7]);                    // the pad under the knuckles
    // ---- wrist and forearm
    //      the forearm turns at the wrist: extension (back of the hand towards the forearm) and sideways deviation
    const arm = new T.Group(); arm.position.copy(s(0, 0, -2)); hand.add(arm);
    const wr = P.wrist || { ext: 0, dev: 0 }; arm.rotation.set(wr.ext * D, 0, wr.dev * D, 'XZY');
    const AR = P.arm || { w: 1, flat: 0.66 }; arm.userData.shape = AR;   // forearm width and thickness (skin.js)
    const a0 = (x, y, z) => V(x * K, y * K, z * K);       // in the arm group, the wrist at the origin
    const fa = between(a0(0, 4, 0), a0(0, -260, 0)); fa.g.add(seg(fa.len, 27 * K * AR.w, 31 * K * AR.w, AR.flat)); arm.add(fa.g);
    // ---- sleeve with a cuff, always a little wider than the forearm inside it
    const sw = Math.max(1, AR.w * 0.95), sf = Math.max(0.78, AR.flat * 1.1);
    const sl = between(a0(0, -125, 0), a0(0, -1400, 0)); sl.g.add(seg(sl.len, 33 * K * sw, 37 * K * sw, sf, M.cloth)); arm.add(sl.g);
    const cf = between(a0(0, -118, 0), a0(0, -136, 0)); cf.g.add(seg(cf.len, 34 * K * sw, 34 * K * sw, sf, M.cuff)); arm.add(cf.g);
    // ---- fingers
    const F = {};
    for (const k of ['index', 'middle', 'ring', 'little']) F[k] = finger(hand, A(G.mcp[k]), P[k].abd, G.L[k], G.R[k], P[k].flex);
    // ---- thumb: metacarpal from the base of the palm beside the index finger, then two segments with the nail
    const L = G.L.thumb, R = G.R.thumb;
    const tb = basis(A(G.cmc), A(P.thumb.dir), A(P.thumb.up)); hand.add(tb);
    tb.add(seg(L[0], R[0], R[1], 0.9));
    // the ball of the thumb (thenar) wraps the thumb's metacarpal and joins it to the palm
    { const e = sph(1); e.scale.set(17 * K, 30 * K, 15 * K); e.position.set(2 * K, 16 * K, -3 * K); tb.add(e); }
    tb.updateMatrixWorld(true);
    // the web of skin between the thumb and the index finger
    {
      const a = tb.localToWorld(V(0, L[0] * 0.78, 0)), b = A(G.mcp.index).add(V(-6 * K, -14 * K, -4 * K));
      const w = between(a, b); w.g.add(seg(w.len, 8 * K, 7 * K, 1)); hand.add(w.g);
      const a2 = tb.localToWorld(V(0, L[0] * 0.45, 0)), b2 = A(G.mcp.index).add(V(-4 * K, -34 * K, -6 * K));
      const w2 = between(a2, b2); w2.g.add(seg(w2.len, 10 * K, 9 * K, 1)); hand.add(w2.g);
    }
    const t2 = new T.Group(); t2.position.y = L[0]; t2.rotation.x = -P.thumb.flex[0] * D; tb.add(t2); t2.add(seg(L[1], R[1], R[2], 0.9));
    const t3 = new T.Group(); t3.position.y = L[1]; t3.rotation.x = -P.thumb.flex[1] * D; t2.add(t3); t3.add(seg(L[2], R[2], R[3], 0.9));
    { const n = sph(1, M.nail); n.scale.set(R[3] * 0.8, L[2] * 0.42, R[3] * 0.22); n.position.set(0, L[2] * 0.62, R[3] * 0.9 * 0.86); n.rotation.x = 0.12; t3.add(n); }
    F.thumb = { j1: tb, j2: t2, j3: t3, L, R, flat: 0.9 };
    hand.updateMatrixWorld(true);
    return { hand, F, arm };
  }

  /* the pen: tip at the origin, shaft along +y, length 148 mm, diameter 9.4 mm */
  function pen() {
    const g = new T.Group();
    const add = (geo, m, y) => { const o = new T.Mesh(geo, m); o.position.y = y; g.add(o); return o; };
    add(new T.ConeGeometry(2.3, 7, 24), M.metal, 3.5).rotation.x = Math.PI;
    add(new T.SphereGeometry(0.7, 12, 8), M.ink, 0.2);
    add(new T.CylinderGeometry(4.6, 2.3, 7, 32), M.grip, 10.5);
    add(new T.CylinderGeometry(4.7, 4.6, 38, 32), M.grip, 33);
    for (let y = 18; y < 50; y += 4.5) add(new T.TorusGeometry(4.65, 0.45, 8, 32), M.grip, y).rotation.x = Math.PI / 2;
    add(new T.CylinderGeometry(4.5, 4.7, 90, 32), M.blue, 97);
    add(new T.CylinderGeometry(3.6, 4.5, 6, 32), M.blueD, 145);
    const clip = add(new T.BoxGeometry(2.2, 40, 1.6), M.blueD, 120); clip.position.z = 5.2;
    return g;
  }

  /* the pen as the pose defines it: tip and the point where it crosses the web (hand frame, mm) */
  function penLine(P) {
    const tip = A(P.pen.tip), dir = A(P.pen.web).sub(tip).normalize();
    return { tip, dir, r: 4.7, len: 148 };
  }
  function placePen(F, P) {
    const L = penLine(P), g = pen();
    g.position.copy(L.tip);
    g.quaternion.setFromUnitVectors(V(0, 1, 0), L.dir);
    g.rotateY(P.pen.roll * D);
    return { g, tip: L.tip, dir: L.dir, a: pt(F.index, 0.6, 'pad'), b: pt(F.thumb, 0.62, 'pad') };
  }

  return { build, geom, pen, penLine, placePen, pt, V, M };
})();
