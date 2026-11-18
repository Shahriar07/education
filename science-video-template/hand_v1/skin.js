/* One smooth skin over the posed skeleton of hand3d.js: the hand is described as a signed distance field (round cones
   for the finger and thumb bones, ellipsoids for the palm, the ball of the thumb and the little-finger pad, a flattened
   cone for the forearm), blended with a smooth minimum so knuckles, the web and the wrist flow into each other, then
   turned into a mesh with surface nets on a 0.7 mm grid. The last segment of the thumb is a separate mesh so that it can
   be drawn over the pen (it is in front of the pen in the reference photo); the pen is drawn over everything else. */
const SKIN3D = (() => {
  const T = THREE, DBG = { cand: 0, miss: 0, skipSame: 0 };
  function smin(a, b, k) { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * 0.25; }
  /* round cone from a (radius r1) to b (radius r2) - Inigo Quilez */
  function roundCone(a, b, r1, r2) {
    const bax = b[0] - a[0], bay = b[1] - a[1], baz = b[2] - a[2];
    const l2 = bax * bax + bay * bay + baz * baz, rr = r1 - r2, a2 = l2 - rr * rr, il2 = 1 / l2;
    return (px, py, pz) => {
      const pax = px - a[0], pay = py - a[1], paz = pz - a[2];
      const y = pax * bax + pay * bay + paz * baz, z = y - l2;
      const xx = pax * l2 - bax * y, xy = pay * l2 - bay * y, xz = paz * l2 - baz * y;
      const x2 = xx * xx + xy * xy + xz * xz, y2 = y * y * l2, z2 = z * z * l2, k = Math.sign(rr) * rr * rr * x2;
      if (Math.sign(z) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - r2;
      if (Math.sign(y) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - r1;
      return (Math.sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
    };
  }
  /* ellipsoid with radii r in the frame m (Matrix4 from that frame to the hand frame) */
  function ellipsoid(m, c, r) {
    const inv = new T.Matrix4().copy(m).invert(), e = inv.elements;
    return (px, py, pz) => {
      const x = e[0] * px + e[4] * py + e[8] * pz + e[12] - c[0], y = e[1] * px + e[5] * py + e[9] * pz + e[13] - c[1], z = e[2] * px + e[6] * py + e[10] * pz + e[14] - c[2];
      const k0 = Math.hypot(x / r[0], y / r[1], z / r[2]), k1 = Math.hypot(x / (r[0] * r[0]), y / (r[1] * r[1]), z / (r[2] * r[2]));
      return k0 * (k0 - 1) / (k1 || 1e-9);
    };
  }
  /* a round cone in frame m, squashed along that frame's z (forearm: wider than thick) */
  function flatCone(m, a, b, r1, r2, flat) {
    const inv = new T.Matrix4().copy(m).invert(), e = inv.elements, f = roundCone(a, b, r1, r2);
    return (px, py, pz) => {
      const x = e[0] * px + e[4] * py + e[8] * pz + e[12], y = e[1] * px + e[5] * py + e[9] * pz + e[13], z = e[2] * px + e[6] * py + e[10] * pz + e[14];
      return f(x, y, z / flat) * flat;
    };
  }
  const W = (o, v) => { o.updateWorldMatrix(true, false); return o.localToWorld(v.clone()).toArray(); };

  /* the field for the posed hand; part = 'hand' (all but the thumb's last segment) or 'thumbTip' */
  function field(F, G, K, arm) {
    const V = (x, y, z) => new T.Vector3(x, y, z);
    const bones = {};
    for (const k of ['index', 'middle', 'ring', 'little']) {
      const f = F[k];
      bones[k] = [W(f.j1, V(0, 0, 0)), W(f.j2, V(0, 0, 0)), W(f.j3, V(0, 0, 0)), W(f.j3, V(0, f.L[2] - f.R[3] * 0.55, 0))];
    }
    const th = F.thumb;
    bones.thumb = [W(th.j1, V(0, 0, 0)), W(th.j2, V(0, 0, 0)), W(th.j3, V(0, 0, 0)), W(th.j3, V(0, th.L[2] - th.R[3] * 0.55, 0))];
    // slimmer than the joint radii used for the grip: a real finger is about 15-17 mm wide at the knuckle
    const RS = { index: [9.6, 8.6, 7.9, 7.2], middle: [10, 9, 8.2, 7.4], ring: [9.3, 8.4, 7.7, 7], little: [8.2, 7.5, 6.9, 6.3], thumb: [12, 10.4, 9.6, 8.8] };
    const cones = (k, from, to) => { const b = bones[k], r = RS[k].map(x => x * K), out = []; for (let i = from; i < to; i++) out.push(roundCone(b[i], b[i + 1], r[i], r[i + 1])); return out; };
    const I = new T.Matrix4();
    // palm: the metacarpals as fleshy cones from the wrist to each knuckle, a body, the two pads
    const palm = [];
    for (const k of ['index', 'middle', 'ring', 'little']) palm.push(roundCone(G.wrist[k].map((x, i) => i === 1 ? x + 4 * K : x), bones[k][0], 12.5 * K, RS[k][0] * K * 1.08));
    palm.push(ellipsoid(I, [-1 * K, 52 * K, -2 * K], [27 * K, 40 * K, 12 * K]));
    palm.push(ellipsoid(I, [19 * K, 40 * K, -6 * K], [11 * K, 30 * K, 11 * K]));
    th.j1.updateWorldMatrix(true, false);
    palm.push(ellipsoid(th.j1.matrixWorld, [2 * K, 17 * K, -2 * K], [15 * K, 27 * K, 13 * K]));      // ball of the thumb
    arm.updateWorldMatrix(true, false);
    const forearm = flatCone(arm.matrixWorld, [0, 6 * K, 0], [0, -150 * K, 0], 25 * K, 28 * K, 0.66);
    // the web between thumb and index finger
    const webA = W(th.j1, V(0, th.L[0] * 0.7, -2 * K)), webB = [bones.index[0][0] - 4 * K, bones.index[0][1] - 12 * K, bones.index[0][2] - 3 * K];
    const web = roundCone(webA, webB, 7 * K, 6.5 * K);
    const fing = { index: cones('index', 0, 3), middle: cones('middle', 0, 3), ring: cones('ring', 0, 3), little: cones('little', 0, 3) };
    const thumbBase = cones('thumb', 0, 2), thumbTip = cones('thumb', 2, 3);
    const hand = (x, y, z) => {
      let p = palm[0](x, y, z);
      for (let i = 1; i < palm.length; i++) p = smin(p, palm[i](x, y, z), 9 * K);
      p = smin(p, forearm(x, y, z), 12 * K);
      p = smin(p, web(x, y, z), 7 * K);
      let t = thumbBase[0](x, y, z); t = smin(t, thumbBase[1](x, y, z), 3 * K);
      p = smin(p, t, 6 * K);
      let out = p;
      for (const k of ['index', 'middle', 'ring', 'little']) {      // each finger blends into the palm, not into the next finger
        const c = fing[k]; let d = c[0](x, y, z); d = smin(d, c[1](x, y, z), 2.5 * K); d = smin(d, c[2](x, y, z), 2.5 * K);
        out = Math.min(out, smin(p, d, 5 * K));
      }
      return out;
    };
    const tip = (x, y, z) => thumbTip[0](x, y, z);
    // bounds of everything but the forearm beyond the cuff
    const pts = [].concat(...Object.values(bones));
    pts.push(W(arm, V(0, -150 * K, 0)), W(arm, V(0, 6 * K, 0)));
    const lo = [0, 1, 2].map(i => Math.min(...pts.map(p => p[i])) - 35 * K), hi = [0, 1, 2].map(i => Math.max(...pts.map(p => p[i])) + 35 * K);
    return { hand, tip, lo, hi, bones };
  }

  /* surface nets over the box lo..hi with cell size h */
  function mesh(f, lo, hi, h) {
    const nx = Math.ceil((hi[0] - lo[0]) / h) + 1, ny = Math.ceil((hi[1] - lo[1]) / h) + 1, nz = Math.ceil((hi[2] - lo[2]) / h) + 1;
    const sy = nx, sz = nx * ny, val = new Float32Array(nx * ny * nz);
    for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) val[i + j * sy + k * sz] = f(lo[0] + i * h, lo[1] + j * h, lo[2] + k * h);
    const vid = new Int32Array(nx * ny * nz).fill(-1), pos = [], nor = [], idx = [];
    const corner = [], edges = [];
    for (let c = 0; c < 8; c++) corner.push([c & 1, (c >> 1) & 1, (c >> 2) & 1]);
    for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) { const d = a ^ b; if (d === 1 || d === 2 || d === 4) edges.push([a, b]); }
    const off = corner.map(c => c[0] + c[1] * sy + c[2] * sz);
    const grad = (x, y, z) => { const e = h * 0.5; return [f(x + e, y, z) - f(x - e, y, z), f(x, y + e, z) - f(x, y - e, z), f(x, y, z + e) - f(x, y, z - e)]; };
    for (let k = 0; k < nz - 1; k++) for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
      const m = i + j * sy + k * sz; let mask = 0; const v = [];
      for (let c = 0; c < 8; c++) { const q = val[m + off[c]]; v.push(q); if (q < 0) mask |= 1 << c; }
      if (mask === 0 || mask === 255) continue;
      let px = 0, py = 0, pz = 0, n = 0;
      for (const [a, b] of edges) {
        if (((mask >> a) & 1) === ((mask >> b) & 1)) continue;
        const t = v[a] / (v[a] - v[b]), ca = corner[a], cb = corner[b];
        px += ca[0] + (cb[0] - ca[0]) * t; py += ca[1] + (cb[1] - ca[1]) * t; pz += ca[2] + (cb[2] - ca[2]) * t; n++;
      }
      const x = lo[0] + (i + px / n) * h, y = lo[1] + (j + py / n) * h, z = lo[2] + (k + pz / n) * h;
      vid[m] = pos.length / 3; pos.push(x, y, z);
      const g = grad(x, y, z), gl = Math.hypot(g[0], g[1], g[2]) || 1; nor.push(g[0] / gl, g[1] / gl, g[2] / gl);
      // faces across the three edges leaving corner 0
      const ii = [i, j, k], st = [1, sy, sz];
      for (let a = 0; a < 3; a++) {
        const b = 1 << (1 << a);                       // mask bit of the corner one step along axis a (corner 1, 2 or 4)
        if (((mask & 1) !== 0) === ((mask & b) !== 0)) continue;
        const u = (a + 1) % 3, w = (a + 2) % 3;
        if (ii[u] === 0 || ii[w] === 0) continue;
        const du = st[u], dw = st[w], q = [m, m - du, m - du - dw, m - dw].map(c => vid[c]);
        DBG.cand++;
        if (q.some(c => c < 0)) { DBG.miss++; continue; }
        if (mask & 1) idx.push(q[0], q[1], q[2], q[0], q[2], q[3]); else idx.push(q[0], q[2], q[1], q[0], q[3], q[2]);
      }
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
    g.setIndex(idx);
    return g;
  }

  /* replace the blocky skin of a built hand by the smooth one; returns the two meshes */
  function apply(built, P, M, h = 0.7) {
    const K = P.size, G = HAND.geom(K), F = built.F, hand = built.hand;
    // hide the old skin and nails; keep the sleeve
    hand.traverse(o => { if (o.isMesh && (o.material === M.skin || o.material === M.nail)) o.visible = false; });
    const fld = field(F, G, K, built.arm);
    const skin = new T.Mesh(mesh(fld.hand, fld.lo, fld.hi, h), M.skin); skin.renderOrder = 0;
    const tlo = [0, 1, 2].map(i => Math.min(fld.bones.thumb[2][i], fld.bones.thumb[3][i]) - 14 * K), thi = [0, 1, 2].map(i => Math.max(fld.bones.thumb[2][i], fld.bones.thumb[3][i]) + 14 * K);
    // drawing passes (layers): 0 the hand, 1 the pen over it, 2 the thumb's last segment over the pen
    const tip = new T.Mesh(mesh(fld.tip, tlo, thi, h * 0.8), M.skin); tip.layers.set(2);
    hand.add(skin); hand.add(tip);
    // nails on the back of each last segment
    const nailOn = (o, L, r, front) => {
      const n = new T.Mesh(new T.SphereGeometry(1, 24, 16), M.nail);
      n.scale.set(r * 0.72, L * 0.36, r * 0.2); n.position.set(0, L * 0.66, r * 0.86); n.rotation.x = 0.1; if (front) n.layers.set(2); o.add(n);
    };
    const RS = { index: 7.5, middle: 7.8, ring: 7.3, little: 6.6, thumb: 9.2 };
    for (const k of ['index', 'middle', 'ring', 'little']) nailOn(F[k].j3, F[k].L[2], RS[k] * K, false);
    nailOn(F.thumb.j3, F.thumb.L[2], RS.thumb * K, true);
    return { skin, tip };
  }
  return { apply, DBG, mesh };
})();
