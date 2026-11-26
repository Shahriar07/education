/* ২খ:  */
part('s02_p02', { scene: 2, label: '২খ', title: "নলকূপ, সুইচ, দরজা, চেয়ার",
  screen: "চারটি 3D বস্তু একে একে (দরজা টানে খোলে, ধাক্কায় বন্ধ হয়); ধাক্কা না টান, চিহ্ন।" }, [
  { c: "সারাদিন তুমি এভাবেই কাজ করো। নলকূপের হাতলে চাপ দাও। এটা ধাক্কা।" },
  { c: "বাতির সুইচ টেপো। এটাও ধাক্কা।" },
  { c: "দরজা খুলতে নিজের দিকে টানো। এটা টান। বন্ধ করতে ঠেলে দাও। এটা ধাক্কা।" },
  { c: "বসার জন্য চেয়ারটা কাছে আনো। এটা কী? ঠিক, টান।" },
  { c: "আর ফুটবলে লাথি? সেটা অল্প সময়ের একটা জোরালো ধাক্কা।" }
], function (t, S) {
  let s = '', u = '', P; const tag = (x, y, w, p) => lab(x, y, big(w), 'move', p);
  if (t < S.A(1)) { const L = S.E(0), a0 = 4, cyc = Math.max(0, t - L * 0.45), a = a0 + 16 - 32 * (0.5 - 0.5 * Math.cos(cyc * Math.PI / 1.1)), ang = t < L * 0.45 ? -(a0 + 16) : -a, down = t > L * 0.45 && Math.sin(cyc * Math.PI / 1.1) > 0;
    P = W3.frame({ cam: C11.pump(), pump: ang, water: down && cyc > 0.3, sun: [-14, 34, 26] }); const r = ang * Math.PI / 180, pt = d => P(ST.TW[0] - 0.09 - d * Math.cos(r), 1.13 - d * Math.sin(r), ST.TW[1]), [gx, gy] = pt(0.64), [ex, ey] = pt(0.3), pm = pxpm(P, [ST.TW[0], 1, ST.TW[1]]);
    const o = S.P(0, 0.3, 0.42); s += handGrip(gx, gy - 90 * (1 - ease(o)), Math.atan2(ey - gy, ex - gx) * 180 / Math.PI, pm, o);
    if (down) { s += arrow2(gx, gy + 0.07 * pm, gx, gy + 0.07 * pm + 110); } u += tag(gx - 210, gy + 120, 'ধাক্কা', S.P(0, 0.75, 0.85)); const [nx, ny] = P(ST.TW[0], 1.2, ST.TW[1]); u += lab(nx + 150, ny - 10, 'নলকূপ', 'name', S.P(0, 0.4, 0.5)); }
  else if (t < S.A(2)) { const on = S.P(1, 0.4) > 0.15; P = W3.frame({ cam: C11.sw(), set: { sw: on ? 1 : 0 } }); const pm = pxpm(P, [ST.X + 3.95, 1.35, 0]), [x, y] = P(ST.X + 3.955, 1.325, 0), k = 1 - ease(S.P(1, 0.15, 0.45));
    s += handPad(x - 90 * k, y + 10 * k, 8, pm, S.P(1, 0.1, 0.2), true); const [ax, ay] = P(ST.X + 3.72, 1.24, 0), [bx, by] = P(ST.X + 3.93, 1.24, 0); s += arrow2(ax, ay - 6, bx, by - 6, on ? 1 : 0); u += tag(ax - 130, ay - 6, 'ধাক্কা', S.P(1, 0.55, 0.7)); const [nx, ny] = P(ST.X + 3.95, 1.5, 0); u += lab(nx + 230, ny + 40, 'সুইচ', 'name', S.P(1, 0, 0.1)); }
  else if (t < S.A(3)) { const a = 62 * (ease(S.P(2, 0.08, 0.4)) - ease(S.P(2, 0.62, 0.9))), op = S.P(2) < 0.5; P = W3.frame({ cam: C11.door(), set: { door: a } }); const r = a * Math.PI / 180, dx = ST.X - 2.47, hp = (d, off) => P(dx + d * Math.cos(r) + off * -Math.sin(-r) * -1, 1.07, -2.44 + d * Math.sin(r) + off * Math.cos(r)), A = hp(0.86, 0.13), B = hp(0.86, 0.5);
    if (op) s += arrow2(...A.slice(0, 2), ...B.slice(0, 2), S.P(2, 0.06, 0.12)); else s += arrow2(...B.slice(0, 2), ...A.slice(0, 2), S.P(2, 0.55, 0.62), '#7fd1ff'); u += tag(op ? B[0] - 130 : B[0] - 150, B[1] - 10, op ? 'টান' : 'ধাক্কা', op ? S.P(2, 0.3, 0.36) : S.P(2, 0.75, 0.82)); }
  else if (t < S.A(4)) { const d = trap(t - S.A(3) - 0.7, 0.7, 2.0, 0.5); P = W3.frame({ cam: C11.chair(), set: { chair: d } }); const A = P(ST.X + 1, 0.47, -1.35 + d), B = P(ST.X + 1, 0.47, -0.95 + d); s += arrow2(...A.slice(0, 2), ...B.slice(0, 2), S.P(3, 0.15, 0.25)); u += lab(B[0] - 190, B[1] + 10, big('?'), 'name', S.P(3, 0.35, 0.45) * (1 - S.P(3, 0.75, 0.78))) + tag(B[0] - 190, B[1] + 10, 'টান', S.P(3, 0.78, 0.88)); }
  else { const q = Math.max(0, t - S.A(4) - 0.9), st = q < 4 ? 3.2 * q - 0.4 * q * q : 6.4; P = W3.frame({ cam: { pos: [ROAD.VIL.X - 3, 0.75, 4.8], look: [ROAD.VIL.X - 3, 0.4, 1.2], fov: 46 }, ballS: st, sun: [-14, 34, 26] }); const [bx, by] = P(ROAD.VIL.X - 5 + st, 0.11, 1.2); if (q < 0.25) s += arrow2(bx - 250, by, bx - 48, by); u += tag(P(ROAD.VIL.X - 5, 0.11, 1.2)[0] - 40, by - 130, 'ধাক্কা', S.P(4, 0.2, 0.3)); }
  return { gl: true, svg: s, ui: u };
});
