/* Solve the grip: given the pen (a line in the hand frame), search each finger's joint angles so that
   - the index pad touches the pen near the pinch, from the back-of-hand side,
   - the thumb pad touches it from the thumb side, a little further back,
   - the middle finger's last segment touches it with its thumb-side face, from below,
   - no finger passes through the pen, and the joints stay near a relaxed pose.
   Plain vector maths (forward kinematics as in hand3d.js), brute-force grid search. */
const SOLVE = (() => {
  const D = Math.PI / 180;
  const v = (x, y, z) => [x, y, z], add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], len = a => Math.hypot(a[0], a[1], a[2]);
  const nrm = a => mul(a, 1 / len(a)), cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  // 3x3 matrices as arrays of columns
  const mv = (M, p) => add(add(mul(M[0], p[0]), mul(M[1], p[1])), mul(M[2], p[2]));
  const mm = (A, B) => [mv(A, B[0]), mv(A, B[1]), mv(A, B[2])];
  const Rx = t => [[1, 0, 0], [0, Math.cos(t), Math.sin(t)], [0, -Math.sin(t), Math.cos(t)]];
  const Rz = t => [[Math.cos(t), Math.sin(t), 0], [-Math.sin(t), Math.cos(t), 0], [0, 0, 1]];
  const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  /* forward kinematics of a three-segment chain from base frame B at p0 */
  function fk(B, p0, L, R, flex, flat) {
    const R1 = mm(B, Rx(-flex[0] * D)), p1 = add(p0, mv(R1, [0, L[0], 0]));
    const R2 = mm(R1, Rx(-flex[1] * D)), p2 = add(p1, mv(R2, [0, L[1], 0]));
    const R3 = mm(R2, Rx(-flex[2] * D)), p3 = add(p2, mv(R3, [0, L[2], 0]));
    return { R1, R2, R3, p: [p0, p1, p2, p3], L, R, flat };
  }
  const local = (c, a, q) => add(c.p[2], mv(c.R3, [q[0], c.L[2] * a, q[2]]));
  /* distance from point to the pen axis, and position along it */
  function onPen(pen, q) { const w = sub(q, pen.tip), s = dot(w, pen.dir), perp = sub(w, mul(pen.dir, s)); return { d: len(perp), s, n: nrm(perp) }; }
  function penetration(pen, c, rp) {
    let e = 0;
    for (let k = 0; k < 3; k++) for (let i = 0; i <= 4; i++) {
      const a = i / 4, q = add(c.p[k], mul(sub(c.p[k + 1], c.p[k]), a)), r = (c.R[k] + (c.R[k + 1] - c.R[k]) * a) * 0.92;
      const o = onPen(pen, q);
      if (o.s > -5 && o.s < pen.len) e += Math.max(0, rp + r - o.d) ** 2;
    }
    return e;
  }
  /* desired direction (from the axis to the finger) perpendicular to the pen */
  const want = (pen, d) => nrm(sub(d, mul(pen.dir, dot(d, pen.dir))));
  function fingerCost(pen, c, contact, sRange, side, nominal, flex) {
    const q = local(c, contact.a, contact.q), o = onPen(pen, q);
    let e = 4 * (o.d - pen.r) ** 2;
    if (o.s < sRange[0]) e += 2 * (sRange[0] - o.s) ** 2; if (o.s > sRange[1]) e += 2 * (o.s - sRange[1]) ** 2;
    e += 60 * (1 - dot(o.n, want(pen, side)));
    e += 3 * penetration(pen, c, pen.r);
    for (let i = 0; i < flex.length; i++) e += 0.004 * (flex[i] - nominal[i]) ** 2;
    return e;
  }
  function range(a, b, st) { const r = []; for (let x = a; x <= b + 1e-9; x += st) r.push(x); return r; }
  function solve(H, pen) {
    const out = {};
    // index: pad (palm side of the last segment) on the pen near the pinch, from the back-of-hand side
    {
      let best = null;
      for (const abd of range(-6, 18, 3)) for (const f1 of range(10, 80, 4)) for (const f2 of range(10, 100, 4)) for (const f3 of range(-10, 50, 4)) {
        const B = Rz(abd * D), c = fk(B, H.mcp.index, H.L.index, H.R.index, [f1, f2, f3], 0.86);
        const e = fingerCost(pen, c, { a: 0.6, q: [0, 0, -H.R.index[3] * 0.86] }, pen.idx, [0.15, 0.3, 1], [35, 50, 15], [f1, f2, f3]) + 0.004 * (abd - 6) ** 2;
        if (!best || e < best.e) best = { e, abd, flex: [f1, f2, f3] };
      }
      out.index = best;
    }
    // middle: thumb-side face of its last segment under the pen
    {
      let best = null;
      for (const abd of range(-10, 10, 3)) for (const f1 of range(20, 90, 4)) for (const f2 of range(20, 110, 4)) for (const f3 of range(0, 60, 4)) {
        const B = Rz(abd * D), c = fk(B, H.mcp.middle, H.L.middle, H.R.middle, [f1, f2, f3], 0.86);
        const e = fingerCost(pen, c, { a: 0.55, q: [-H.R.middle[3], 0, 0] }, pen.mid, [0.4, -0.2, -1], [50, 70, 25], [f1, f2, f3]) + 0.004 * abd ** 2;
        if (!best || e < best.e) best = { e, abd, flex: [f1, f2, f3] };
      }
      out.middle = best;
    }
    // thumb: metacarpal direction (azimuth, elevation), roll of the nail, two flexions; pad on the pen from the thumb side
    {
      let best = null;
      for (const az of range(-80, 10, 5)) for (const el of range(-70, 10, 5)) for (const roll of range(-60, 90, 15)) for (const f1 of range(0, 50, 7)) for (const f2 of range(0, 50, 7)) {
        // dir: az rotates from +y towards -x in the palm plane, el tilts towards the palm (-z)
        const dir = [-Math.sin(az * -D) * Math.cos(el * D), Math.cos(az * D) * Math.cos(el * D), Math.sin(el * D)];
        const up0 = nrm(sub([0, 0, 1], mul(dir, dir[2])));
        const side0 = cross(dir, up0);
        const up = nrm(add(mul(up0, Math.cos(roll * D)), mul(side0, Math.sin(roll * D)))), x = cross(dir, up);
        const B = [x, dir, up];
        const c = fk(B, add(H.cmc, mv(B, [0, H.L.thumb[0], 0])), [H.L.thumb[1], H.L.thumb[2], 0.01], [H.R.thumb[1], H.R.thumb[2], H.R.thumb[3], H.R.thumb[3]], [f1, f2, 0], 0.9);
        // the pad is on the last real segment (the second of this chain)
        const cc = { p: c.p, R3: c.R2, L: [0, 0, H.L.thumb[2]], R: c.R };
        cc.p = [c.p[0], c.p[0], c.p[1], c.p[2]];
        const q = add(c.p[1], mv(c.R2, [0, H.L.thumb[2] * 0.62, -H.R.thumb[3] * 0.9])), o = onPen(pen, q);
        let e = 4 * (o.d - pen.r) ** 2;
        if (o.s < pen.thb[0]) e += 2 * (pen.thb[0] - o.s) ** 2; if (o.s > pen.thb[1]) e += 2 * (o.s - pen.thb[1]) ** 2;
        e += 60 * (1 - dot(o.n, want(pen, [-1, 0, 0.1])));
        // metacarpal + two segments must stay out of the pen
        const meta = { p: [H.cmc, c.p[0], c.p[1], c.p[2]], R: [H.R.thumb[0], H.R.thumb[1], H.R.thumb[2], H.R.thumb[3]] };
        e += 3 * penetration(pen, meta, pen.r);
        e += 0.004 * (f1 - 15) ** 2 + 0.004 * (f2 - 20) ** 2;
        if (!best || e < best.e) best = { e, dir: nrm(dir), up, flex: [f1, f2] };
      }
      out.thumb = best;
    }
    return out;
  }
  return { solve, v, nrm, sub, add, mul };
})();
