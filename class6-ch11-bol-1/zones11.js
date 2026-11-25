/* Chapter 11: things added to the world through the same hooks as zones3.js.
   LV = the rod, the small stone it rests on and the heavy stone (textbook fig 11.3), in the village yard. Metres.
   The rod turns about the centre C of the rounded top of the small stone, so it always touches it. */
const LV = { X: ROAD.VIL.X + 1.5, Z: 2.2, A: 1.20, B: 0.30, TAIL: 0.40, R: 0.018, TOP: 0.06, YC: 0.10, ST: [0.19, 0.13, 0.16], RHO: 2500, G: 9.8 };
LV.M = 4 / 3 * Math.PI * LV.ST[0] * LV.ST[1] * LV.ST[2] * LV.RHO;                 // kg (ellipsoid)
/* start: the tail of the rod touches the ground: YC + (TOP + R)cos th - TAIL sin th = R cos th -> solved by bisection */
LV.TH0 = (() => { let lo = 0, hi = 1; for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; LV.YC + LV.TOP * Math.cos(m) - LV.TAIL * Math.sin(m) > 0 ? lo = m : hi = m; } return lo; })();
LV.TH1 = 6 * Math.PI / 180;                                                       // end of the push
/* a point of the rod: u metres along it (+ towards the heavy stone), v metres above its centre line; th = tilt, stone side down */
function lvPt(th, u, v = 0) { const n = LV.TOP + LV.R + v; return [LV.X + u * Math.cos(th) + n * Math.sin(th), LV.YC - u * Math.sin(th) + n * Math.cos(th), LV.Z]; }
const lvStone = th => lvPt(th, LV.B, LV.R + LV.ST[1] * 0.80);
/* force of the hand straight down that balances the weight of the heavy stone: moments about C */
function lvForce(th) { return LV.M * LV.G * (lvStone(th)[0] - LV.X) / (LV.X - lvPt(th, -LV.A)[0]); }

let V11 = null;
const _build3 = buildV3, _frame3 = frameV3;
buildV3 = function (k) {
  _build3(k);
  const { scene, mat, canvasTex, cyl } = k;
  const rnd = (() => { let a = 7; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();
  const stoneT = (base, seed) => canvasTex(512, 512, c => { c.fillStyle = base; c.fillRect(0, 0, 512, 512); for (let i = 0; i < 5200 + seed; i++) { const g = rnd(), r = 1 + rnd() * 3.2; c.fillStyle = g < 0.5 ? `rgba(40,36,32,${0.05 + rnd() * 0.16})` : `rgba(235,228,214,${0.05 + rnd() * 0.15})`; c.beginPath(); c.arc(rnd() * 512, rnd() * 512, r, 0, 7); c.fill(); } });
  /* heavy stone: an ellipsoid with smooth bumps and a flattened underside */
  const geo = new THREE.SphereGeometry(1, 72, 48), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const b = 1 + 0.055 * Math.sin(3.1 * x + 1.3) * Math.cos(2.7 * z) + 0.045 * Math.sin(4.3 * y + 2.2 * z + 0.6) + 0.03 * Math.sin(6.1 * x - 5.2 * z + 1) + 0.012 * Math.sin(13 * x + 9 * y) * Math.sin(11 * z - 5 * y);
    x *= b; z *= b; y *= b; if (y < -0.80) y = -0.80 - (-0.80 - y) * 0.2; p.setXYZ(i, x * LV.ST[0], y * LV.ST[1], z * LV.ST[2]); }
  geo.computeVertexNormals();
  const stone = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: stoneT('#8d8880', 1), roughness: 0.95 })); stone.castShadow = stone.receiveShadow = true; scene.add(stone);
  /* small stone: rounded top of radius TOP about C, spreading to a flat base, 0.2 m deep */
  const sh = new THREE.Shape(), a0 = 0.95; sh.moveTo(-0.135, 0); sh.quadraticCurveTo(-0.11, 0.06, -LV.TOP * Math.sin(a0), LV.YC + LV.TOP * Math.cos(a0));
  for (let i = 0; i <= 24; i++) { const a = -a0 + 2 * a0 * i / 24; sh.lineTo(LV.TOP * Math.sin(a), LV.YC + LV.TOP * Math.cos(a)); }
  sh.quadraticCurveTo(0.12, 0.07, 0.14, 0); sh.closePath();
  const st2 = stoneT('#6f6a66', 2); st2.wrapS = st2.wrapT = THREE.RepeatWrapping; st2.repeat.set(4, 4);
  const ful = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: true, bevelSize: 0.004, bevelThickness: 0.015, bevelSegments: 4 }), new THREE.MeshStandardMaterial({ map: st2, roughness: 0.95 }));
  ful.position.set(LV.X, 0, LV.Z - 0.1); ful.castShadow = ful.receiveShadow = true; scene.add(ful);
  /* the rod: wood with grain, lying along x before it is tilted */
  const wt = canvasTex(512, 64, c => { c.fillStyle = '#a9743f'; c.fillRect(0, 0, 512, 64); for (let i = 0; i < 70; i++) { c.strokeStyle = `rgba(${rnd() < 0.5 ? '70,40,14' : '214,164,104'},${0.1 + rnd() * 0.3})`; c.lineWidth = 0.6 + rnd() * 1.6; const y = rnd() * 64; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(170, y + 4 * (rnd() - 0.5), 340, y + 4 * (rnd() - 0.5), 512, y); c.stroke(); } });
  wt.center.set(0.5, 0.5); wt.rotation = Math.PI / 2;
  const L = LV.A + 0.08 + LV.TAIL, rod = cyl(LV.R, LV.R, L, new THREE.MeshStandardMaterial({ map: wt, roughness: 0.75 }), 0, 0, 0, undefined, 28); rod.rotation.order = 'ZYX'; scene.add(rod);
  V11 = { stone, ful, rod, mid: (LV.TAIL - LV.A - 0.08) / 2 };
};
/* o.lever = tilt of the rod in radians (the three objects are hidden when it is not given) */
frameV3 = function (o) {
  _frame3(o);
  const on = o.lever !== undefined; V11.stone.visible = V11.ful.visible = V11.rod.visible = on; if (!on) return;
  const th = o.lever; V11.rod.position.set(...lvPt(th, V11.mid)); V11.rod.rotation.z = Math.PI / 2 - th;
  V11.stone.position.set(...lvStone(th)); V11.stone.rotation.z = -th;
};
const C11 = { lever: () => ({ pos: [LV.X - 0.3, 0.62, LV.Z + 3.2], look: [LV.X - 0.3, 0.33, LV.Z], fov: 30 }) };
/* placeholder for a part whose narration is ready and drawing is not */
const todoDraw = (label, title) => () => ({ svg: bg(NAVY) + txt(960, 480, label, 120, { c: Y }) + txt(960, 600, title, 60) });
