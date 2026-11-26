/* Chapter 11, video 1, scene 5: the rubber of fig 11.2 on the lab table, and the khata.
   The rubber is a block 5 x 12 x 3 cm. Its shape is computed for every vertex:
   - twist: the cross-section at height y turns by TW (y/H - 1/2): the two ends turn opposite ways, the middle stays
   - bend: the bottom is held in a clamp; the top is pushed sideways; the centre line follows the clamped-beam shape
     (cantShape, the same curve as the ruler of video 2) and every cross-section turns with its slope
   - press: height x 0.6, width and depth x 1/sqrt(0.6) = 1.29, so the volume stays the same, with a slight bulge
   - stretch: height x 1.3, width and depth x 1/sqrt(1.3) = 0.88 */
const RB = { X: ROAD.LAB.X - 3.55, Z: -3.4, Y0: 0.775, W: 0.05, H: 0.12, D: 0.03, TW: 70 * Math.PI / 180, BEND: 0.045, PRESS: 0.6, STRETCH: 1.3, CLAMP: 0.022 };
let V14 = null;
const _b13 = buildV3, _f13 = frameV3;
buildV3 = function (k) {
  _b13(k);
  const { scene, mat, box, canvasTex } = k;
  const g = new THREE.BoxGeometry(RB.W, RB.H, RB.D, 10, 60, 6); g.translate(0, RB.H / 2, 0);
  const tex = canvasTex(256, 512, c => { c.fillStyle = '#ef9a92'; c.fillRect(0, 0, 256, 512); let s = 9; const r = () => (s = (s * 16807) % 2147483647) / 2147483647; for (let i = 0; i < 2500; i++) { c.fillStyle = `rgba(${r() < 0.5 ? '170,70,70' : '255,215,205'},${0.08 + r() * 0.12})`; c.fillRect(r() * 256, r() * 512, 2, 2); } });
  const rub = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85 })); rub.castShadow = rub.receiveShadow = true; scene.add(rub);
  rub.userData.base = Float32Array.from(g.attributes.position.array);
  /* a small wooden clamp that holds the bottom of the rubber */
  const cl = new THREE.Group(); scene.add(cl); const wd = mat('#7a4a26'), st = mat('#9aa3a8', { metalness: 0.6, roughness: 0.3 });
  box(0.1, 0.012, 0.07, wd, 0, 0.006, 0, cl); [-1, 1].forEach(s => box(0.016, RB.CLAMP + 0.004, 0.06, wd, s * (RB.W / 2 + 0.008), 0.012 + RB.CLAMP / 2, 0, cl)); const sc = k.cyl(0.003, 0.003, 0.09, st, 0, 0.012 + RB.CLAMP * 0.6, 0, cl, 10); sc.rotation.z = Math.PI / 2;
  V14 = { rub, cl };
};
/* shape of the rubber: o.rubber = {mode: 'twist'|'bend'|'press'|'stretch', k: 0..1} */
function rubShape(mode, k, x, y, z) {
  const H = RB.H, u = y / H;
  if (mode === 'twist') { const a = RB.TW * k * (u - 0.5), c = Math.cos(a), s = Math.sin(a); return [x * c - z * s, y, x * s + z * c]; }
  if (mode === 'bend') { const y0 = RB.CLAMP; if (y <= y0) return [x, y, z]; const L = H - y0, xi = (y - y0) / L, d = RB.BEND * k, sl = d * (cantShape(Math.min(1, xi + 1e-3)) - cantShape(Math.max(0, xi - 1e-3))) / (2e-3 * L), a = Math.atan(sl);
    return [d * cantShape(xi) + x * Math.cos(a), y - x * Math.sin(a), z]; }
  if (mode === 'press') { const sy = 1 - (1 - RB.PRESS) * k, sw = 1 / Math.sqrt(sy), b = 1 + 0.12 * k * Math.sin(Math.PI * u) - 0.12 * k * 2 / Math.PI; return [x * sw * b, y * sy, z * sw * b]; }
  if (mode === 'stretch') { const sy = 1 + (RB.STRETCH - 1) * k, sw = 1 / Math.sqrt(sy); return y <= RB.CLAMP ? [x, y, z] : [x * sw, RB.CLAMP + (y - RB.CLAMP) * sy, z * sw]; }
  return [x, y, z];
}
frameV3 = function (o) {
  _f13(o);
  const r = o.rubber; V14.rub.visible = !!r; V14.cl.visible = !!(r && (r.mode === 'bend' || r.mode === 'stretch'));
  if (!r) return;
  const g = V14.rub.geometry, p = g.attributes.position, b = V14.rub.userData.base;
  for (let i = 0; i < p.count; i++) { const q = rubShape(r.mode, r.k, b[3 * i], b[3 * i + 1], b[3 * i + 2]); p.setXYZ(i, q[0], q[1], q[2]); }
  p.needsUpdate = true; g.computeVertexNormals();
  V14.rub.position.set(RB.X, RB.Y0 + (V14.cl.visible ? 0.012 : 0), RB.Z); V14.cl.position.set(RB.X, RB.Y0, RB.Z);
};
C11.rub = (f = 30, dy = 0) => ({ pos: [RB.X + 0.02, RB.Y0 + 0.13 + dy, RB.Z + 0.5], look: [RB.X, RB.Y0 + 0.085 + dy, RB.Z], fov: f });
/* the side outline of the rubber in a shape, as points [x, y] in metres (z = 0 plane), for drawing it on paper */
function rubOutline(mode) { const n = 24, L = [], Rr = [];
  for (let i = 0; i <= n; i++) { const y = RB.H * i / n;
    if (mode === 'twist') { const a = RB.TW * (y / RB.H - 0.5), w = RB.W / 2 * Math.abs(Math.cos(a)) + RB.D / 2 * Math.abs(Math.sin(a)); L.push([-w, y]); Rr.push([w, y]); }
    else { const a = rubShape(mode, 1, -RB.W / 2, y, 0), b = rubShape(mode, 1, RB.W / 2, y, 0); L.push([a[0], a[1]]); Rr.push([b[0], b[1]]); } }
  return L.concat(Rr.reverse(), [L[0]]); }
/* the world point of the rubber's surface point (x, y, z) in its rest shape */
const rubPt = (r, x, y, z) => { const q = rubShape(r.mode, r.k, x, y, z), lift = r.mode === 'bend' || r.mode === 'stretch' ? 0.012 : 0; return [RB.X + q[0], RB.Y0 + lift + q[1], RB.Z + q[2]]; };
/* a curved arrow round the rubber's long axis at height y (m), from angle a0 to a1 (radians, seen from above, + = anticlockwise) */
function turnArrow3(P, y, a0, a1, c = Y, o = 1) { if (o <= 0) return ''; const R = 0.045, pts = []; for (let i = 0; i <= 24; i++) { const a = a0 + (a1 - a0) * i / 24; pts.push([RB.X + R * Math.cos(a), y, RB.Z + R * Math.sin(a)]); }
  const n = pts.length, [x1, y1] = P(...pts[n - 4]), [x2, y2] = P(...pts[n - 1]); return path3(P, pts.slice(0, n - 2), c, 9, '', o) + arrow2(x1 - (x2 - x1) * 2, y1 - (y2 - y1) * 2, x2, y2, o, c); }
