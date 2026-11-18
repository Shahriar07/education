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
    ['fLen', 1, 0.04, 0.85, 1.2], ['fWid', 1, 0.04, 0.75, 1.35], ['pW', 1, 0.04, 0.8, 1.2], ['armW', 1, 0.05, 0.8, 1.6], ['armF', 0.66, 0.04, 0.45, 1.0],
    ['tWid', 1, 0.04, 0.7, 1.3], ['rlLen', 1, 0.04, 0.8, 1.3], ['web', 1, 0.08, 0.6, 2.2], ['armT', 1.12, 0.04, 0.6, 1.4], ['palmT', 1, 0.05, 0.6, 1.3],
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
    const v = n => x[IDX[n]], K = v('size'), G = HAND.geom(K, { len: v('fLen'), wid: v('fWid'), palmW: v('pW'), tWid: v('tWid'), rlLen: v('rlLen'), web: v('web'), palmT: v('palmT') });
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
    return { K, G, F, fdir, W, tb, arm: { w: v('armW'), flat: v('armF'), taper: v('armT') }, pen: { tip, dir: pdir, end: add(tip, mul(pdir, 148)), r: 4.7 } };
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
    return { th, s, map, qx, qy, px, py };
  }
  function onPen(pen, q) { const w = sub(q, pen.tip), s = dot(w, pen.dir), perp = sub(w, mul(pen.dir, s)); return { d: len(perp), s }; }
  function pierce(pen, a, b, ra, rb) {
    let e = 0;
    for (let i = 0; i <= 4; i++) { const t = i / 4, q = add(a, mul(sub(b, a), t)), r = (ra + (rb - ra) * t) * 0.9, o = onPen(pen, q); if (o.s > -3 && o.s < 148) e += Math.max(0, pen.r + r - o.d) ** 2; }
    return e;
  }
  /* ---- outline: the photo's hand-and-pen mask (everything that is not white background), and the model's outline
     drawn in photo pixels from the same round cones and ellipsoids as the skin (skin.js) ---- */
  const SIL = { on: false, W: 460, H: 360, photo: null, model: null, lambda: 2000 };
  async function setPhoto(url) {
    const img = new Image(); img.src = url; await img.decode();
    const c = document.createElement('canvas'); c.width = SIL.W; c.height = SIL.H;
    const g = c.getContext('2d'); g.drawImage(img, 0, 0, SIL.W, SIL.H);
    const d = g.getImageData(0, 0, SIL.W, SIL.H).data, msk = new Uint8Array(SIL.W * SIL.H);
    let n = 0;
    for (let i = 0; i < msk.length; i++) {
      const r = d[4 * i], gg = d[4 * i + 1], b = d[4 * i + 2], mn = Math.min(r, gg, b), mx = Math.max(r, gg, b);
      if (255 - mn > 28 || mx - mn > 22) { msk[i] = 1; n++; }
    }
    SIL.photo = msk; SIL.model = new Uint8Array(msk.length);
    return n;
  }
  const RS = { index: [9.6, 8.6, 7.9, 7.2], middle: [10, 9, 8.2, 7.4], ring: [9.3, 8.4, 7.7, 7], little: [8.2, 7.5, 6.9, 6.3], thumb: [12, 10.4, 9.6, 8.8] };
  function silhouette(m, cam, pr) {
    const K = m.K, S = m.G.S, P = p => pr.map(cam.q(p)), sc = pr.s, cones = [], ells = [];
    const cone = (a, b, ra, rb) => cones.push([P(a), P(b), ra * sc, rb * sc]);
    for (const k of ['index', 'middle', 'ring', 'little']) {
      const c = m.F[k], r = RS[k].map(z => z * K * S.wid);
      const d3 = nrm(sub(c.p[3], c.p[2])), tipC = add(c.p[2], mul(d3, c.L[2] - r[3] * 0.55)), pts = [c.p[0], c.p[1], c.p[2], tipC];
      for (let i = 0; i < 3; i++) cone(pts[i], pts[i + 1], r[i], r[i + 1]);
      const wb = m.G.wrist[k]; cone([wb[0], wb[1] + 4 * K, wb[2]], c.p[0], 12.5 * K, r[0] * 1.08);
    }
    const th = m.F.thumb, rt = RS.thumb.map(z => z * K * S.wid * S.tWid);
    const dt = nrm(sub(th.p[2], th.p[1])), ttip = add(th.p[1], mul(dt, th.L[1] - rt[3] * 0.55));
    cone(th.meta.a, th.meta.b, rt[0], rt[1]); cone(th.p[0], th.p[1], rt[1], rt[2]); cone(th.p[1], ttip, rt[2], rt[3]);
    const B = m.tb.B, mi = m.G.mcp.index;
    cone(add(m.G.cmc, mv(B, [0, m.G.L.thumb[0] * 0.7, -2 * K])), [mi[0] - 4 * K, mi[1] - 12 * K, mi[2] - 3 * K], 7 * K * S.web, 6.5 * K * S.web);
    const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    ells.push([[-1 * K * S.palmW, 52 * K, -2 * K], I3, [27 * K * S.palmW, 40 * K, 12 * K * S.palmT]]);
    ells.push([[19 * K * S.palmW, 40 * K, -6 * K], I3, [11 * K, 30 * K, 11 * K]]);
    ells.push([add(m.G.cmc, mv(B, [2 * K, 17 * K, -2 * K])), B, [15 * K, 27 * K, 13 * K]]);
    { const ia = add(m.G.cmc, mv(B, [0, m.G.L.thumb[0] * 0.55, 0])), wi = m.G.wrist.index, ib = [(mi[0] + wi[0]) / 2, (mi[1] + wi[1] + 4 * K) / 2, (mi[2] + wi[2]) / 2];
      ells.push([mul(add(ia, ib), 0.5), I3, [10 * K * S.web, 14 * K * S.web, 8 * K * S.web]]); }
    // forearm: an elliptic cone (wider than thick) running on beyond the bottom of the photo
    const piv = [0, 0, -2 * K], Wm = m.W, ax0 = add(piv, mv(Wm, [0, 6 * K, 0])), ax1 = add(piv, mv(Wm, [0, -300 * K, 0]));
    const ex = mv(Wm, [1, 0, 0]), ez = mv(Wm, [0, 0, 1]), nn = nrm(cross(cam.c, nrm(sub(ax1, ax0))));
    const reff = a => Math.sqrt((a * dot(nn, ex)) ** 2 + (a * m.arm.flat * dot(nn, ez)) ** 2);
    cone(ax0, ax1, reff(25 * K * m.arm.w), reff(25 * K * m.arm.w * (1 + (m.arm.taper - 1) * 306 / 156)));
    const pen = m.pen, p12 = add(pen.tip, mul(pen.dir, 12));
    cone(pen.tip, p12, 0.6, 4.7); cone(p12, pen.end, 4.7, 4.7);
    const ct = Math.cos(pr.th), st = Math.sin(pr.th), e1 = cam.r, e2 = mul(cam.u, -1);
    const e2d = ells.map(([c, A, r]) => {
      let s11 = 0, s12 = 0, s22 = 0;
      for (let i = 0; i < 3; i++) { const a = A[i], p1 = dot(a, e1), p2 = dot(a, e2), rr = r[i] * r[i]; s11 += rr * p1 * p1; s12 += rr * p1 * p2; s22 += rr * p2 * p2; }
      const a11 = ct * ct * s11 - 2 * ct * st * s12 + st * st * s22, a22 = st * st * s11 + 2 * ct * st * s12 + ct * ct * s22, a12 = ct * st * (s11 - s22) + (ct * ct - st * st) * s12;
      return [P(c), a11 * sc * sc, a12 * sc * sc, a22 * sc * sc];
    });
    return { cones, e2d };
  }
  function rasterIoU(sh) {
    const Wd = SIL.W, Ht = SIL.H, M = SIL.model; M.fill(0);
    for (const [a, b, ra, rb] of sh.cones) {
      const x0 = Math.max(0, Math.floor(Math.min(a[0] - ra, b[0] - rb))), x1 = Math.min(Wd - 1, Math.ceil(Math.max(a[0] + ra, b[0] + rb)));
      const y0 = Math.max(0, Math.floor(Math.min(a[1] - ra, b[1] - rb))), y1 = Math.min(Ht - 1, Math.ceil(Math.max(a[1] + ra, b[1] + rb)));
      const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy || 1e-9;
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const px = x + 0.5 - a[0], py = y + 0.5 - a[1]; let t = (px * dx + py * dy) / l2; t = t < 0 ? 0 : t > 1 ? 1 : t;
        const qx = px - t * dx, qy = py - t * dy, r = ra + (rb - ra) * t; if (qx * qx + qy * qy <= r * r) M[y * Wd + x] = 1;
      }
    }
    for (const [c, a11, a12, a22] of sh.e2d) {
      const det = a11 * a22 - a12 * a12; if (det <= 0) continue;
      const i11 = a22 / det, i12 = -a12 / det, i22 = a11 / det, hx = Math.sqrt(a11), hy = Math.sqrt(a22);
      const x0 = Math.max(0, Math.floor(c[0] - hx)), x1 = Math.min(Wd - 1, Math.ceil(c[0] + hx)), y0 = Math.max(0, Math.floor(c[1] - hy)), y1 = Math.min(Ht - 1, Math.ceil(c[1] + hy));
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = x + 0.5 - c[0], v = y + 0.5 - c[1]; if (i11 * u * u + 2 * i12 * u * v + i22 * v * v <= 1) M[y * Wd + x] = 1; }
    }
    let inter = 0, uni = 0; const Pm = SIL.photo;
    for (let i = 0; i < M.length; i++) { const a = M[i], b = Pm[i]; if (a & b) inter++; if (a | b) uni++; }
    return inter / uni;
  }
  /* ---- the exact outline: the skin's own field (skin.js), traced along the camera's rays for each photo pixel ---- */
  const V3 = a => new THREE.Vector3(a[0], a[1], a[2]);
  function sdfData(m) {
    const K = m.K, G = m.G, F = m.F, bones = {};
    for (const k of ['index', 'middle', 'ring', 'little']) { const c = F[k], d3 = nrm(sub(c.p[3], c.p[2])); bones[k] = [c.p[0], c.p[1], c.p[2], add(c.p[2], mul(d3, c.L[2] - c.R[3] * 0.55))]; }
    const th = F.thumb, dt = nrm(sub(th.p[2], th.p[1]));
    bones.thumb = [G.cmc, th.p[0], th.p[1], add(th.p[1], mul(dt, th.L[1] - th.R[2] * 0.55))];
    const B = m.tb.B, Wm = m.W;
    const thumbM = new THREE.Matrix4().makeBasis(V3(B[0]), V3(B[1]), V3(B[2])).setPosition(G.cmc[0], G.cmc[1], G.cmc[2]);
    const armM = new THREE.Matrix4().makeBasis(V3(Wm[0]), V3(Wm[1]), V3(Wm[2])).setPosition(0, 0, -2 * K);
    return { bones, thumbM, thumbL0: G.L.thumb[0], armM, AR: m.arm, G, K };
  }
  function sdfIoU(m, cam, pr, stride = 2) {
    const Wd = SIL.W, Ht = SIL.H, M = SIL.model;
    // candidates: the fast outline grown by 7 px; the pen is kept from the fast outline
    const sh = silhouette(m, cam, pr); rasterIoU(sh);
    const cand = new Uint8Array(Wd * Ht), tmp = new Uint8Array(Wd * Ht), R = 7;
    for (let y = 0; y < Ht; y++) { let run = -1e9; for (let x = 0; x < Wd; x++) { if (M[y * Wd + x]) run = x; tmp[y * Wd + x] = x - run <= R ? 1 : 0; } run = 1e9; for (let x = Wd - 1; x >= 0; x--) { if (M[y * Wd + x]) run = x; if (run - x <= R) tmp[y * Wd + x] = 1; } }
    for (let x = 0; x < Wd; x++) { let run = -1e9; for (let y = 0; y < Ht; y++) { if (tmp[y * Wd + x]) run = y; cand[y * Wd + x] = y - run <= R ? 1 : 0; } run = 1e9; for (let y = Ht - 1; y >= 0; y--) { if (tmp[y * Wd + x]) run = y; if (run - y <= R) cand[y * Wd + x] = 1; } }
    M.fill(0);
    const pen = { cones: sh.cones.slice(-2), e2d: [] }; rasterIoU(pen); const penMask = M.slice();
    const fld = SKIN3D.fieldFromData(sdfData(m)), f = (x, y, z) => Math.min(fld.hand(x, y, z), fld.tip(x, y, z));
    let lmin = 1e9, lmax = -1e9;
    for (const cx of [fld.lo[0], fld.hi[0]]) for (const cy of [fld.lo[1], fld.hi[1]]) for (const cz of [fld.lo[2], fld.hi[2]]) { const l = dot([cx, cy, cz], cam.c); lmin = Math.min(lmin, l); lmax = Math.max(lmax, l); }
    const ct = Math.cos(pr.th), st = Math.sin(pr.th), r = cam.r, u = cam.u, c = cam.c;
    M.set(penMask);
    for (let y = 0; y < Ht; y += stride) for (let x = 0; x < Wd; x += stride) {
      if (!cand[y * Wd + x]) continue;
      const dx = x + stride / 2 - pr.px, dy = y + stride / 2 - pr.py;
      const q0 = (ct * dx + st * dy) / pr.s + pr.qx, q1 = (-st * dx + ct * dy) / pr.s + pr.qy;
      const bx = r[0] * q0 - u[0] * q1, by = r[1] * q0 - u[1] * q1, bz = r[2] * q0 - u[2] * q1;
      let lam = lmax, hit = 0;
      for (let it = 0; it < 80 && lam > lmin; it++) {
        const d = f(bx + c[0] * lam, by + c[1] * lam, bz + c[2] * lam);
        if (d < 0.15) { hit = 1; break; }
        lam -= Math.max(d * 0.9, 0.25);
      }
      if (hit) for (let yy = y; yy < Math.min(Ht, y + stride); yy++) for (let xx = x; xx < Math.min(Wd, x + stride); xx++) M[yy * Wd + xx] = 1;
    }
    let inter = 0, uni = 0; const Pm = SIL.photo;
    for (let i = 0; i < M.length; i++) { const a = M[i], b = Pm[i]; if (a & b) inter++; if (a | b) uni++; }
    return inter / uni;
  }
  function evaluate(x, detail) {
    const m = model(x), P3 = points3(m), cam = camera(x[IDX.camAz], x[IDX.camEl]);
    const JOINT = ['indexDIP', 'indexPIP', 'indexMCP', 'thumbIP', 'littleMCP', 'wrist'];
    const names = Object.keys(LM), Q = names.map(n => cam.q(P3[n])), P = names.map(n => LM[n][0]), w = names.map(n => LM[n][1] * (SIL.on && JOINT.includes(n) ? 0.2 : 1));
    const pr = procrustes(Q, P, w);
    let rep = 0; const res = {};
    names.forEach((n, i) => { const z = pr.map(Q[i]), e = (z[0] - P[i][0]) ** 2 + (z[1] - P[i][1]) ** 2; rep += w[i] * e; res[n] = Math.sqrt(e); });
    // forearm direction on the picture
    const fq = cam.q(m.fdir), fang = Math.atan2(fq[1], fq[0]) + pr.th;
    let da = fang - FOREARM_DIR; da = Math.atan2(Math.sin(da), Math.cos(da));
    rep += 1500 * da * da;
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
    let e = rep / 10 + 2 * grip, iou = null;
    if (SIL.on) { iou = SIL.mode === 'sdf' ? sdfIoU(m, cam, pr, SIL.stride || 2) : rasterIoU(silhouette(m, cam, pr)); e += SIL.lambda * (1 - iou); }
    if (!detail) return e;
    return { e, rep, grip, res, th: pr.th, s: pr.s, cam, m, da: da / D, iou };
  }
  const SHAPE = new Set([IDX.fLen, IDX.fWid, IDX.pW, IDX.armW, IDX.armF, IDX.tWid, IDX.rlLen, IDX.web, IDX.armT, IDX.palmT]);
  function descend(x, iters, scale = 1, freezeShape = false) {
    let e = evaluate(x), step = PARAMS.map(p => p[2] * scale);
    for (let it = 0; it < iters; it++) {
      let better = false;
      for (let i = 0; i < N; i++) for (const sg of [1, -1]) {
        if (freezeShape && SHAPE.has(i)) continue;
        const y = x.slice(); y[i] = Math.min(PARAMS[i][4], Math.max(PARAMS[i][3], y[i] + sg * step[i]));
        const f = evaluate(y); if (f < e) { x = y; e = f; better = true; }
      }
      if (!better) { step = step.map(s => s / 2); if (step[0] < 0.05) break; }
    }
    return { x, e };
  }
  function run() {
    // stage 1: the points only, adult proportions, from many camera directions
    SIL.on = false;
    const x0 = PARAMS.map(p => p[1]);
    const starts = [];
    for (let az = 0; az < 360; az += 30) for (let el = -60; el <= 60; el += 30) { const x = x0.slice(); x[IDX.camAz] = az; x[IDX.camEl] = el; starts.push(descend(x, 25, 1, true)); }
    starts.sort((a, b) => a.e - b.e);
    let best = null;
    for (const s of starts.slice(0, 4)) { const r = descend(s.x, 400, 0.5, true); if (!best || r.e < best.e) best = r; }
    const stage1 = evaluate(best.x, true);
    // stage 2: the points and the whole outline, proportions free
    let iou1 = null;
    if (SIL.photo) {
      SIL.on = true; iou1 = evaluate(best.x, true).iou;
      let r = descend(best.x, 300, 0.5); r = descend(r.x, 300, 0.25); best = r;
    }
    // stage 3: the outline of the exact skin (slower), small steps from stage 2
    let iouExact2 = null, t3 = performance.now();
    if (SIL.photo) {
      SIL.mode = 'sdf'; SIL.stride = 2;
      iouExact2 = evaluate(best.x, true).iou;
      best = descend(best.x, SIL.iters3 || 16, 0.25);
    }
    t3 = (performance.now() - t3) / 1000;
    const d = evaluate(best.x, true), v = n => +best.x[IDX[n]].toFixed(['fLen', 'fWid', 'pW', 'size', 'armW', 'armF', 'tWid', 'rlLen', 'web', 'armT', 'palmT'].includes(n) ? 3 : 1);
    return {
      cost: +d.e.toFixed(2), outlineIoU: d.iou === null ? null : +d.iou.toFixed(4), outlineIoUBeforeStage2: iou1 === null ? null : +iou1.toFixed(4), exactOutlineIoUBeforeStage3: iouExact2 === null ? null : +iouExact2.toFixed(4), stage3Seconds: +t3.toFixed(1),
      reprojPx: Object.fromEntries(Object.entries(d.res).map(([k, r]) => [k, +r.toFixed(1)])), gripCost: +d.grip.toFixed(2), forearmErrDeg: +d.da.toFixed(1),
      imageRotDeg: +(d.th / D).toFixed(1), photoPxPerMm: +d.s.toFixed(3), stage1Cost: +stage1.e.toFixed(2),
      x: best.x,
      pose: {
        size: v('size'), shape: { len: v('fLen'), wid: v('fWid'), palmW: v('pW'), tWid: v('tWid'), rlLen: v('rlLen'), web: v('web'), palmT: v('palmT') }, arm: { w: v('armW'), flat: v('armF'), taper: v('armT') }, wrist: { ext: v('wExt'), dev: v('wDev') },
        pen: { tip: [v('pTx'), v('pTy'), v('pTz')], web: [v('pWx'), v('pWy'), v('pWz')] },
        index: { abd: v('iAbd'), flex: [v('i1'), v('i2'), v('i3')] }, middle: { abd: v('mAbd'), flex: [v('m1'), v('m2'), v('m3')] },
        ring: { abd: v('rAbd'), flex: [v('r1'), v('r2'), v('r3')] }, little: { abd: v('lAbd'), flex: [v('l1'), v('l2'), v('l3')] },
        thumb: (() => { const t = thumbBasis(v('tAz'), v('tEl'), v('tRoll')); return { dir: t.dir.map(z => +z.toFixed(4)), up: t.up.map(z => +z.toFixed(4)), flex: [v('t1'), v('t2')] }; })()
      },
      view: { from: d.cam.c.map(z => +z.toFixed(4)), up: d.cam.u.map(z => +z.toFixed(4)) }
    };
  }
  /* the model's outline as a mask (for checking): 1 byte per photo pixel */
  function outline(x) { const was = SIL.on; SIL.on = true; const d = evaluate(x, true); SIL.on = was; return { iou: d.iou, mask: Array.from(SIL.model) }; }
  return { run, LM, setPhoto, outline, SIL };
})();
