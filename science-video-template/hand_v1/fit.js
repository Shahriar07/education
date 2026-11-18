/* Fit the 3D hand to landmarks measured on a reference photo of a real writing hand (photo pixels, read on a grid).
   Unknowns: the camera direction, the hand's size against the pen, the bend of the wrist, the joint angles of every
   finger and the thumb, and the pen's line in the hand frame. The cost is the distance between the model's projected
   landmarks and the photo's (after the best 2D scale, rotation and shift), plus the grip: the index and thumb pads and
   the middle finger's side touch the pen, the pen rests in the web, nothing passes through the pen, joints stay in
   their range. Same forward kinematics as hand3d.js. Coordinate descent from many starting camera directions. */
const FIT = (() => {
  const D = Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const len = a => Math.hypot(a[0], a[1], a[2]), nrm = a => mul(a, 1 / (len(a) || 1));
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const mv = (M, p) => add(add(mul(M[0], p[0]), mul(M[1], p[1])), mul(M[2], p[2]));
  const mm = (A, B) => [mv(A, B[0]), mv(A, B[1]), mv(A, B[2])];
  const Rx = t => [[1, 0, 0], [0, Math.cos(t), Math.sin(t)], [0, -Math.sin(t), Math.cos(t)]];
  const Rz = t => [[Math.cos(t), Math.sin(t), 0], [-Math.sin(t), Math.cos(t), 0], [0, 0, 1]];

  /* landmarks on the photo (460 x 360 px): joint centres where a joint is seen, ends of the fingertips, pen ends */
  const LM = {
    penTip: [[140, 122], 2], penEnd: [[331, 186], 2],
    indexTip: [[159, 113], 2], indexDIP: [[188, 116], 1], indexPIP: [[222, 104], 1.5], indexMCP: [[255, 143], 0.7],
    thumbTip: [[152, 133], 2], thumbIP: [[170, 160], 1],
    ringTip: [[168, 205], 1.5], littleTip: [[187, 223], 1.5], littleMCP: [[292, 152], 0.6],     // the two nails under the thumb; the middle finger is hidden behind the thumb, under the pen
    wrist: [[265, 256], 1]
  };
  const FOREARM_DIR = Math.atan2(95, 35);           // forearm axis on the photo, from the wrist towards the elbow

  // parameter vector: [name, start, step, lo, hi]
  const PARAMS = [
    ['camAz', 0, 20, -400, 400], ['camEl', 0, 15, -89, 89],
    ['size', 0.9, 0.05, 0.75, 1.15], ['wExt', 0, 8, -50, 50], ['wDev', 0, 8, -30, 30],
    ['iAbd', 9, 4, -20, 25], ['i1', 34, 8, 0, 95], ['i2', 62, 8, 0, 110], ['i3', -10, 8, -25, 70],
    ['mAbd', 8, 4, -20, 20], ['m1', 48, 8, 0, 95], ['m2', 52, 8, 0, 110], ['m3', 16, 8, -10, 80],
    ['rAbd', -4, 4, -20, 15], ['r1', 78, 8, 0, 100], ['r2', 95, 8, 0, 115], ['r3', 45, 8, 0, 80],
    ['lAbd', -8, 4, -25, 10], ['l1', 82, 8, 0, 100], ['l2', 95, 8, 0, 115], ['l3', 45, 8, 0, 80],
    ['tAz', -20, 8, -90, 20], ['tEl', -20, 8, -80, 20], ['tRoll', 0, 12, -90, 120], ['t1', 0, 8, -10, 60], ['t2', 21, 8, -20, 80],
    ['pTx', -28, 6, -80, 30], ['pTy', 108, 6, 60, 160], ['pTz', -72, 6, -130, 10],
    ['pWx', -30, 6, -70, 20], ['pWy', 68, 6, 30, 110], ['pWz', 4, 6, -30, 40]
  ];
  const N = PARAMS.length, IDX = Object.fromEntries(PARAMS.map((p, i) => [p[0], i]));

  function fk(B, p0, L, R, flex) {
    const R1 = mm(B, Rx(-flex[0] * D)), p1 = add(p0, mv(R1, [0, L[0], 0]));
    const R2 = mm(R1, Rx(-flex[1] * D)), p2 = add(p1, mv(R2, [0, L[1], 0]));
    const R3 = mm(R2, Rx(-flex[2] * D)), p3 = add(p2, mv(R3, [0, L[2], 0]));
    return { R3, p: [p0, p1, p2, p3], R, L };
  }
  function thumbBasis(az, el, roll) {
    const dir = [Math.sin(az * D) * Math.cos(el * D), Math.cos(az * D) * Math.cos(el * D), Math.sin(el * D)];
    const up0 = nrm(sub([0, 0, 1], mul(dir, dir[2]))), side0 = cross(dir, up0);
    const up = nrm(add(mul(up0, Math.cos(roll * D)), mul(side0, Math.sin(roll * D))));
    return { B: [cross(dir, up), dir, up], dir, up };
  }
  /* everything the cost needs, from a parameter vector */
  function model(x) {
    const v = n => x[IDX[n]], K = v('size'), G = HAND.geom(K);
    const fing = (k, a, f) => fk(Rz(a * D), G.mcp[k], G.L[k], G.R[k], f);
    const F = {
      index: fing('index', v('iAbd'), [v('i1'), v('i2'), v('i3')]),
      middle: fing('middle', v('mAbd'), [v('m1'), v('m2'), v('m3')]),
      ring: fing('ring', v('rAbd'), [v('r1'), v('r2'), v('r3')]),
      little: fing('little', v('lAbd'), [v('l1'), v('l2'), v('l3')])
    };
    const tb = thumbBasis(v('tAz'), v('tEl'), v('tRoll')), Lt = G.L.thumb, Rt = G.R.thumb;
    const t0 = add(G.cmc, mv(tb.B, [0, Lt[0], 0]));
    F.thumb = fk(tb.B, t0, [Lt[1], Lt[2], 0.01], [Rt[1], Rt[2], Rt[3], Rt[3]], [v('t1'), v('t2'), 0]);
    F.thumb.meta = { a: G.cmc, b: t0, r: Rt[0] };
    const W = mm(Rx(v('wExt') * D), Rz(v('wDev') * D)), fdir = mv(W, [0, -1, 0]);
    const tip = [v('pTx'), v('pTy'), v('pTz')], web = [v('pWx'), v('pWy'), v('pWz')], pdir = nrm(sub(web, tip));
    return { K, G, F, fdir, pen: { tip, dir: pdir, end: add(tip, mul(pdir, 148)), r: 4.7 } };
  }
  const endOf = (c, k = 0.8) => { const d = nrm(sub(c.p[3], c.p[2])); return add(c.p[3], mul(d, c.R[3] * k)); };
  function points3(m) {
    const F = m.F, th = F.thumb;
    return {
      penTip: m.pen.tip, penEnd: m.pen.end,
      indexTip: endOf(F.index), indexDIP: F.index.p[2], indexPIP: F.index.p[1], indexMCP: F.index.p[0],
      thumbTip: (() => { const d = nrm(sub(th.p[2], th.p[1])); return add(th.p[2], mul(d, th.R[2] * 0.8)); })(), thumbIP: th.p[1],
      middleTip: endOf(F.middle), ringTip: endOf(F.ring), littleTip: endOf(F.little), littleMCP: F.little.p[0],
      wrist: [0, 0, -2 * m.K]
    };
  }
  function camera(az, el) {
    const c = [Math.cos(el * D) * Math.cos(az * D), Math.cos(el * D) * Math.sin(az * D), Math.sin(el * D)];
    let h = Math.abs(c[2]) > 0.95 ? [0, 1, 0] : [0, 0, 1];
    const r = nrm(cross(h, c)), u = cross(c, r);
    return { c, r, u, q: p => [dot(p, r), -dot(p, u)] };
  }
  /* best similarity (scale, rotation, shift) taking model points q onto photo points p */
  function procrustes(Q, P, w) {
    let sw = 0, qx = 0, qy = 0, px = 0, py = 0;
    for (let i = 0; i < Q.length; i++) { sw += w[i]; qx += w[i] * Q[i][0]; qy += w[i] * Q[i][1]; px += w[i] * P[i][0]; py += w[i] * P[i][1]; }
    qx /= sw; qy /= sw; px /= sw; py /= sw;
    let a = 0, b = 0, qq = 0;
    for (let i = 0; i < Q.length; i++) {
      const ux = Q[i][0] - qx, uy = Q[i][1] - qy, vx = P[i][0] - px, vy = P[i][1] - py;
      a += w[i] * (ux * vx + uy * vy); b += w[i] * (ux * vy - uy * vx); qq += w[i] * (ux * ux + uy * uy);
    }
    const th = Math.atan2(b, a), s = Math.hypot(a, b) / qq, cs = Math.cos(th) * s, sn = Math.sin(th) * s;
    const map = q => [cs * (q[0] - qx) - sn * (q[1] - qy) + px, sn * (q[0] - qx) + cs * (q[1] - qy) + py];
    return { th, s, map };
  }
  function onPen(pen, q) { const w = sub(q, pen.tip), s = dot(w, pen.dir), perp = sub(w, mul(pen.dir, s)); return { d: len(perp), s }; }
  function pierce(pen, a, b, ra, rb) {
    let e = 0;
    for (let i = 0; i <= 4; i++) { const t = i / 4, q = add(a, mul(sub(b, a), t)), r = (ra + (rb - ra) * t) * 0.9, o = onPen(pen, q); if (o.s > -3 && o.s < 148) e += Math.max(0, pen.r + r - o.d) ** 2; }
    return e;
  }
  function evaluate(x, detail) {
    const m = model(x), P3 = points3(m), cam = camera(x[IDX.camAz], x[IDX.camEl]);
    const names = Object.keys(LM), Q = names.map(n => cam.q(P3[n])), P = names.map(n => LM[n][0]), w = names.map(n => LM[n][1]);
    const pr = procrustes(Q, P, w);
    let rep = 0; const res = {};
    names.forEach((n, i) => { const z = pr.map(Q[i]), e = (z[0] - P[i][0]) ** 2 + (z[1] - P[i][1]) ** 2; rep += w[i] * e; res[n] = Math.sqrt(e); });
    // forearm direction on the picture
    const fq = cam.q(m.fdir), fang = Math.atan2(fq[1], fq[0]) + pr.th;
    let da = fang - FOREARM_DIR; da = Math.atan2(Math.sin(da), Math.cos(da));
    rep += 400 * da * da;
    // the grip
    const F = m.F, pen = m.pen;
    const pad = (c, a, q) => add(c.p[2], mv(c.R3, [q[0], c.L[2] * a, q[2]]));
    const thPad = (() => { const th = F.thumb, d = nrm(sub(th.p[2], th.p[1])); const n = mv(th.R3, [0, 0, -1]); return add(add(th.p[1], mul(d, th.L[1] * 0.62)), mul(n, th.R[2] * 0.9)); })();
    // the thumb pad: R3 of this chain is the frame after the second flexion = the last real segment's frame
    let grip = 0;
    const touch = (q, lo, hi) => { const o = onPen(pen, q); let e = (o.d - pen.r) ** 2; if (o.s < lo) e += (lo - o.s) ** 2; if (o.s > hi) e += (o.s - hi) ** 2; return e; };
    grip += 3 * touch(pad(F.index, 0.6, [0, 0, -F.index.R[3] * 0.86]), 14, 40);
    grip += 3 * touch(thPad, 14, 48);
    grip += 1.5 * touch(pad(F.middle, 0.55, [-F.middle.R[3], 0, 0]), 6, 36);
    grip += 1 * (onPen(pen, add(m.G.mcp.index, [-9 * m.K, -12 * m.K, 0])).d - (pen.r + 9 * m.K)) ** 2;
    for (const k of ['index', 'middle', 'ring', 'little']) { const c = F[k]; for (let j = 0; j < 3; j++) grip += 2 * pierce(pen, c.p[j], c.p[j + 1], c.R[j], c.R[j + 1]); }
    grip += 2 * pierce(pen, F.thumb.meta.a, F.thumb.meta.b, F.thumb.meta.r, F.thumb.R[0]);
    for (let j = 0; j < 2; j++) grip += 2 * pierce(pen, F.thumb.p[j], F.thumb.p[j + 1], F.thumb.R[j], F.thumb.R[j + 1]);
    // fingers must not pass through each other's segments too much: index vs middle tips apart
    const im = len(sub(F.index.p[3], F.middle.p[3])); grip += Math.max(0, 14 - im) ** 2;
    const e = rep / 10 + 2 * grip;
    if (!detail) return e;
    return { e, rep, grip, res, th: pr.th, s: pr.s, cam, m, da: da / D };
  }
  function descend(x, iters, scale = 1) {
    let e = evaluate(x), step = PARAMS.map(p => p[2] * scale);
    for (let it = 0; it < iters; it++) {
      let better = false;
      for (let i = 0; i < N; i++) for (const sg of [1, -1]) {
        const y = x.slice(); y[i] = Math.min(PARAMS[i][4], Math.max(PARAMS[i][3], y[i] + sg * step[i]));
        const f = evaluate(y); if (f < e) { x = y; e = f; better = true; }
      }
      if (!better) { step = step.map(s => s / 2); if (step[0] < 0.05) break; }
    }
    return { x, e };
  }
  function run() {
    const x0 = PARAMS.map(p => p[1]);
    const starts = [];
    for (let az = 0; az < 360; az += 30) for (let el = -60; el <= 60; el += 30) { const x = x0.slice(); x[IDX.camAz] = az; x[IDX.camEl] = el; starts.push(descend(x, 25)); }
    starts.sort((a, b) => a.e - b.e);
    let best = null;
    for (const s of starts.slice(0, 4)) { const r = descend(s.x, 400, 0.5); if (!best || r.e < best.e) best = r; }
    const d = evaluate(best.x, true), v = n => +best.x[IDX[n]].toFixed(1);
    return {
      cost: +d.e.toFixed(2), reprojPx: Object.fromEntries(Object.entries(d.res).map(([k, r]) => [k, +r.toFixed(1)])), gripCost: +d.grip.toFixed(2), forearmErrDeg: +d.da.toFixed(1),
      imageRotDeg: +(d.th / D).toFixed(1), photoPxPerMm: +d.s.toFixed(3),
      pose: {
        size: v('size'), wrist: { ext: v('wExt'), dev: v('wDev') },
        pen: { tip: [v('pTx'), v('pTy'), v('pTz')], web: [v('pWx'), v('pWy'), v('pWz')] },
        index: { abd: v('iAbd'), flex: [v('i1'), v('i2'), v('i3')] }, middle: { abd: v('mAbd'), flex: [v('m1'), v('m2'), v('m3')] },
        ring: { abd: v('rAbd'), flex: [v('r1'), v('r2'), v('r3')] }, little: { abd: v('lAbd'), flex: [v('l1'), v('l2'), v('l3')] },
        thumb: (() => { const t = thumbBasis(v('tAz'), v('tEl'), v('tRoll')); return { dir: t.dir.map(z => +z.toFixed(4)), up: t.up.map(z => +z.toFixed(4)), flex: [v('t1'), v('t2')] }; })()
      },
      view: { from: d.cam.c.map(z => +z.toFixed(4)), up: d.cam.u.map(z => +z.toFixed(4)) }
    };
  }
  return { run, LM };
})();
