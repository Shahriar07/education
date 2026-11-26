"""A right hand holding scissors as people do (2026-11-26): the thumb through the upper ring, the middle finger through
the lower ring, the index finger resting along the lower handle, ring and little fingers curled under it. The scissors
are drawn in the picture (steel blades, blue plastic rings), in the plane of the back of the hand, blades forward.
For each opening (degrees between the blades) the thumb and the middle finger are solved so that their segments pass
through the centres of the rings. Frames hand_sci_0.png ... and scissors.json: pivot (anchor) in pixels, the angle of the
lower blade in the picture (to turn it flat onto the table), px per mm.
Seen from the back of the hand, 20 degrees from above (the camera of part 6gha). Run: python make_scissors.py [preview out.png]"""
import sys, json, base64, pathlib
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).parent
OPEN = [36, 28, 20, 12, 5]
JS = r"""
(th) => {
const T3 = THREE, V3 = HAND.V, K = 0.85, W = 1.14, G = HAND.geom(K, { wid: W }), D = Math.PI / 180;
/* scissors in the hand's x-y plane at z = Z0: pivot PV, ring centres 62 mm behind the pivot, blades 90 mm in front */
const Z0 = -24, PV = V3(-20, 128, Z0), RR = 62, BL = 90, mid = -95 * D, h = th / 2 * D;
const ringU = PV.clone().add(V3(RR * Math.cos(mid - h), RR * Math.sin(mid - h), 0)), ringL = PV.clone().add(V3(RR * Math.cos(mid + h), RR * Math.sin(mid + h), 0));
const fk = (k, abd, fx) => { const L = G.L[k], j1 = new T3.Object3D(), j2 = new T3.Object3D(), j3 = new T3.Object3D(), e = new T3.Object3D();
  j1.position.set(...G.mcp[k]); j1.rotation.set(-fx[0] * D, 0, abd * D, 'ZXY'); j1.add(j2); j2.position.y = L[0]; j2.rotation.x = -fx[1] * D; j2.add(j3); j3.position.y = L[1]; j3.rotation.x = -fx[2] * D; j3.add(e); e.position.y = L[2] - 5; j1.updateMatrixWorld(true);
  return [j1, j2, j3, e].map(o => new T3.Vector3().setFromMatrixPosition(o.matrixWorld)); };
const solve = (f, x, lo, hi) => { let best = f(x), st = 12; while (st > 0.05) { let imp = false; for (let i = 0; i < x.length; i++) for (const s of [st, -st]) { const y = x.slice(); y[i] = Math.max(lo[i], Math.min(hi[i], y[i] + s)); const v = f(y); if (v < best - 1e-9) { best = v; x = y; imp = true; } } if (!imp) st /= 2; } return x; };
/* the middle finger: its middle segment's centre in the lower ring */
const midF = solve(x => { const p = fk('middle', x[3], x); const c = p[1].clone().lerp(p[2], 0.5); return c.distanceToSquared(ringL) + 0.001 * x[2] * x[2]; }, [60, 70, 30, 0], [0, 0, 0, -15], [100, 110, 80, 15]);
/* the thumb: direction (two angles) and its two joints, its last segment through the upper ring */
const tfk = x => { const dir = V3(Math.sin(x[0] * D) * Math.cos(x[1] * D), Math.cos(x[0] * D) * Math.cos(x[1] * D), Math.sin(x[1] * D)), up = V3(-0.75, 0.1, 0.65);
  const y = dir.clone().normalize(), z = up.clone().sub(y.clone().multiplyScalar(up.dot(y))).normalize(), g = new T3.Object3D(); g.quaternion.setFromRotationMatrix(new T3.Matrix4().makeBasis(y.clone().cross(z), y, z)); g.position.set(...G.cmc);
  const L = G.L.thumb, b = new T3.Object3D(), c = new T3.Object3D(), e = new T3.Object3D(); g.add(b); b.position.y = L[0]; b.rotation.x = -x[2] * D; b.add(c); c.position.y = L[1]; c.rotation.x = -x[3] * D; c.add(e); e.position.y = L[2] - 4; g.updateMatrixWorld(true);
  return { p: [g, b, c, e].map(o => new T3.Vector3().setFromMatrixPosition(o.matrixWorld)), dir: y, up }; };
const tx = solve(x => { const q = tfk(x), c = q.p[2].clone().lerp(q.p[3], 0.45); return c.distanceToSquared(ringU) + 0.002 * (x[2] * x[2] + x[3] * x[3]); }, [-40, -30, 20, 20], [-85, -70, -10, -10], [20, 20, 70, 80]);
const tq = tfk(tx);
const P = { size: K, shape: { wid: W }, arm: { w: 1.0, flat: 0.74, taper: 1.1 }, wrist: { ext: 0, dev: -8 }, pen: { tip: [400,400,400], web: [400,450,400], roll: 0 },
  index: { abd: 4, flex: [32, 28, 12] }, middle: { abd: midF[3], flex: midF.slice(0, 3) }, ring: { abd: -4, flex: [80, 95, 50] }, little: { abd: -8, flex: [84, 95, 50] },
  thumb: { dir: tq.dir.toArray(), up: tq.up.toArray(), flex: [tx[2], tx[3]] } };
Object.assign(POSE, P);
while (scene.children.length) scene.remove(scene.children[0]);
scene.add(new T3.HemisphereLight(0xffffff, 0x6e5f56, 0.75), key, key.target, fill, fill.target);
const b2 = HAND.build(POSE); b2.arm.children[1].scale.y = 150 / 1275; scene.add(b2.hand); SKIN3D.apply(b2, POSE, HAND.M); b2.hand.traverse(o => o.layers.set(0));
/* the scissors: each piece is a ring, a handle to the pivot and the blade beyond it (a straight piece) */
const steel = new T3.MeshStandardMaterial({ color: 0xd5dade, metalness: 0.35, roughness: 0.3 }), blue = new T3.MeshStandardMaterial({ color: 0x2e6fbf, roughness: 0.45 });
const piece = (ring, zoff, bladeDown) => { const g = new T3.Group(); scene.add(g); const dv = ring.clone().sub(PV), a = Math.atan2(dv.y, dv.x);
  const r = new T3.Mesh(new T3.TorusGeometry(12, 3.2, 12, 32), blue); r.position.copy(ring).setZ(Z0 + zoff); g.add(r);
  const hd = new T3.Mesh(new T3.BoxGeometry(RR - 12, 6, 3), blue); hd.position.copy(PV.clone().add(dv.clone().multiplyScalar((RR / 2 + 6) / RR))).setZ(Z0 + zoff); hd.rotation.z = a; g.add(hd);
  const sh = new T3.Shape(); sh.moveTo(0, -6); sh.lineTo(BL, bladeDown ? 0.5 : -0.5); sh.lineTo(BL * 0.2, 7); sh.lineTo(0, 6); sh.closePath();
  const bl = new T3.Mesh(new T3.ExtrudeGeometry(sh, { depth: 1.6, bevelEnabled: false }), steel); bl.position.set(PV.x, PV.y, Z0 + zoff - 0.8); bl.rotation.z = a + Math.PI; if (bladeDown) bl.scale.y = -1; g.add(bl); return { g, a }; };
const pU = piece(ringU, 2.2, true), pL = piece(ringL, -2.2, false);
const pv = new T3.Mesh(new T3.CylinderGeometry(3, 3, 9, 16), steel); pv.rotation.x = Math.PI / 2; pv.position.copy(PV); scene.add(pv);
const el = 20 * D, view = { from: V3(-Math.sin(el), 0, Math.cos(el)), up: V3(-1, 0, 0), tgt: V3(-20, 60, -20), span: 560 };
const cam = new T3.OrthographicCamera(-view.span / 2, view.span / 2, view.span / 2, -view.span / 2, 1, 4000);
cam.position.copy(view.tgt).addScaledVector(view.from.clone().normalize(), 1500); cam.up.copy(view.up); cam.lookAt(view.tgt); cam.updateMatrixWorld(true);
const c = i => new T3.Vector3().setFromMatrixColumn(cam.matrixWorld, i);
key.position.copy(view.tgt).addScaledVector(c(0), -0.6).addScaledVector(c(1), 0.8).addScaledVector(c(2), 0.9); key.target.position.copy(view.tgt); key.target.updateMatrixWorld();
fill.position.copy(view.tgt).addScaledVector(c(0), 0.9).addScaledVector(c(1), -0.3).addScaledVector(c(2), 0.5); fill.target.position.copy(view.tgt); fill.target.updateMatrixWorld();
renderer.autoClear = true; scene.traverse(o => { if (o.isLight) o.layers.enableAll(); }); renderer.clear(); renderer.render(scene, cam);
const px = p => { const q = p.clone().project(cam); return [(q.x + 1) * N / 2, (1 - q.y) * N / 2]; };
/* the thumb's piece has the lower blade (bladeDown): its edge from the pivot, at the angle of the thumb ring + 180 degrees */
const a0 = px(PV), tip = PV.clone().add(V3(BL * Math.cos(pU.a + Math.PI), BL * Math.sin(pU.a + Math.PI), 0)), a1 = px(tip);
const tipU = PV.clone().add(V3(BL * Math.cos(pL.a + Math.PI), BL * Math.sin(pL.a + Math.PI), 0)), a2 = px(tipU);
return { th, anchor: a0, low: Math.atan2(a1[1] - a0[1], a1[0] - a0[0]) * 180 / Math.PI, tipLow: a1, tipUp: a2, pxPerMm: N / view.span, err: { thumb: tq.p[2].clone().lerp(tq.p[3], 0.45).distanceTo(ringU).toFixed(1) } };
}
"""
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 2400, "height": 2400}); pg.set_default_timeout(0); pg.on("pageerror", lambda e: print("ERR", e))
    pg.goto((HERE / "hand3d.html").as_uri(), timeout=0); pg.wait_for_function("window.READY === true", timeout=0)
    out, cells = [], ""
    for i, th in enumerate(OPEN):
        r = pg.evaluate(JS, th); out.append(r); png = pg.locator("#c").screenshot(omit_background=True); (HERE / f"hand_sci_{i}.png").write_bytes(png)
        if len(sys.argv) > 2 and i in (0, len(OPEN) - 1): cells += f'<div style="background:#e8dcc4"><img style="width:800px" src="data:image/png;base64,{base64.b64encode(png).decode()}"></div>'
    (HERE / "scissors.json").write_text(json.dumps(out, indent=1)); print(json.dumps([(o["th"], round(o["low"], 1), o["err"]) for o in out]))
    if cells:
        v = b.new_page(viewport={"width": 1600, "height": 800}); v.set_content(f'<body style="margin:0;display:flex">{cells}'); v.screenshot(path=sys.argv[2])
    b.close()
