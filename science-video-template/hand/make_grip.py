"""The rod-gripping hand: the same bones and skin as the pen hand (hand3d.js, skin.js), fingers closed round a rod.

  python make_grip.py                 -> hand_grip.png and grip.json (rod point, rod angle, px per mm)
  python make_grip.py preview out.png -> several views with the rod drawn
The rod (radius 18 mm) lies along the knuckles under the palm. Joint angles are solved so that every segment of each
finger rests on the rod; the thumb closes from the other side. The rod is drawn only into the depth buffer, so the
parts of the hand behind it are hidden. Arrangement: back of the hand up, four fingers over the near side, forearm up.
"""
import sys, json, base64, pathlib
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).parent
JS = r"""
() => {
const T3 = THREE, V3 = HAND.V, R = 18, K = 0.85, G = HAND.geom(K, {wid: 1.14});
// rod axis: just in front of the crease under the knuckles, a little oblique as in a real power grip
const zc = -(R + 11.5 * K), A0 = V3(-27 * K, 93 * K, zc), A1 = V3(26 * K, A1Y * K, zc - 1), ax = A1.clone().sub(A0).normalize();
const dist = p => { const d = p.clone().sub(A0); return d.sub(ax.clone().multiplyScalar(d.dot(ax))).length(); };
const RS = { index: [9.6, 8.6, 7.9, 7.2], middle: [10, 9, 8.2, 7.4], ring: [9.3, 8.4, 7.7, 7], little: [8.2, 7.5, 6.9, 6.3], thumb: [12, 10.4, 9.6, 8.8] };
const base = { size: K, shape: { wid: 1.14 }, arm: { w: 1.0, flat: 0.74, taper: 1.1 }, wrist: { ext: EXT, dev: DEV }, pen: { tip: [400,400,400], web: [400,450,400], roll: 0 } };
const P = Object.assign(base, { index: { abd: 0, flex: [40, 60, 30] }, middle: { abd: 0, flex: [40, 60, 30] }, ring: { abd: 0, flex: [40, 60, 30] }, little: { abd: -1, flex: [40, 60, 30] }, thumb: { dir: [-0.35, 0.55, -0.75], up: [-0.8, 0.2, 0.5], flex: [20, 20] } });
// forward model of a finger: the same joints as hand3d.js
const fk = (k, abd, fx) => { const L = G.L[k], D = Math.PI / 180, j1 = new T3.Object3D(), j2 = new T3.Object3D(), j3 = new T3.Object3D(), e = new T3.Object3D();
  j1.position.set(...G.mcp[k]); j1.rotation.set(-fx[0] * D, 0, abd * D, 'ZXY'); j1.add(j2); j2.position.y = L[0]; j2.rotation.x = -fx[1] * D; j2.add(j3); j3.position.y = L[1]; j3.rotation.x = -fx[2] * D; j3.add(e); e.position.y = L[2] - 5; j1.updateMatrixWorld(true);
  return [j1, j2, j3, e].map(o => new T3.Vector3().setFromMatrixPosition(o.matrixWorld)); };
// 0.8 mm of press: the soft pad gives a little
const segErr = (p, r, from) => { let e = 0; for (let i = from; i < 3; i++) { let m = 1e9; for (let u = 0; u <= 1.001; u += 0.1) { const q = p[i].clone().lerp(p[i + 1], u), g = dist(q) - (R + (r[i] * (1 - u) + r[i + 1] * u) * K * 1.14 - 0.8); m = Math.min(m, g); if (g < 0) e += 3 * g * g; } e += m * m; } return e; };
const solve = (f, x, lo, hi) => { let best = f(x), st = 12; while (st > 0.05) { let imp = false; for (let i = 0; i < x.length; i++) for (const s of [st, -st]) { const y = x.slice(); y[i] = Math.max(lo[i], Math.min(hi[i], y[i] + s)); const v = f(y); if (v < best - 1e-9) { best = v; x = y; imp = true; } } if (!imp) st /= 2; } return [x, best]; };
const err = {};
for (const k of ['index', 'middle', 'ring', 'little']) { const [x, e] = solve(x => segErr(fk(k, P[k].abd, x), RS[k], 0) + 0.002 * (x[2] - 0.6 * x[1]) ** 2, P[k].flex, [0, 10, 5], [92, 105, 70]); P[k].flex = x.map(v => +v.toFixed(1)); err[k] = +e.toFixed(2); }
// thumb: direction as two angles, then its two joints
const tfk = x => { const D = Math.PI / 180, dir = V3(Math.sin(x[0] * D) * Math.cos(x[1] * D), Math.cos(x[0] * D) * Math.cos(x[1] * D), Math.sin(x[1] * D)), up = V3(-0.75, 0.1, 0.65);
  const y = dir.clone().normalize(), z = up.clone().sub(y.clone().multiplyScalar(up.dot(y))).normalize(), g = new T3.Object3D(); const X = y.clone().cross(z); g.quaternion.setFromRotationMatrix(new T3.Matrix4().makeBasis(X, y, z)); g.position.set(...G.cmc);
  const L = G.L.thumb, b = new T3.Object3D(), c = new T3.Object3D(), e = new T3.Object3D(); g.add(b); b.position.y = L[0]; b.rotation.x = -x[2] * D; b.add(c); c.position.y = L[1]; c.rotation.x = -x[3] * D; c.add(e); e.position.y = L[2] - 5; g.updateMatrixWorld(true);
  return { p: [g, b, c, e].map(o => new T3.Vector3().setFromMatrixPosition(o.matrixWorld)), dir: y, up }; };
const [tx, te] = solve(x => { const q = tfk(x); return segErr(q.p, RS.thumb, 1) + 0.03 * (q.p[3].x + 22) ** 2 + 0.004 * ((x[0] + 25) ** 2 + (x[1] + 40) ** 2); }, [-25, -40, 20, 20], [-60, -70, 0, 0], [10, 0, 55, 60]);
{ const q = tfk(tx); P.thumb = { dir: q.dir.toArray(), up: q.up.toArray(), flex: [tx[2], tx[3]] }; err.thumb = +te.toFixed(2); }
Object.assign(POSE, P);
// rebuild
while (scene.children.length) scene.remove(scene.children[0]);
const hem = new T3.HemisphereLight(0xffffff, 0x6e5f56, 0.75); scene.add(hem, key, key.target, fill, fill.target);
const b2 = HAND.build(POSE); b2.arm.children[1].scale.y = 150 / 1275;   // the sleeve ends near the elbow: 275 mm x size = 23 cm from the wrist
scene.add(b2.hand); const sk = SKIN3D.apply(b2, POSE, HAND.M);
sk.tip.layers.set(0); b2.hand.traverse(o => o.layers.set(0));
const rod = new T3.Mesh(new T3.CylinderGeometry(R, R, 900, 48), new T3.MeshStandardMaterial({ color: 0xa9743f, roughness: 0.8 }));
const mid = A0.clone().lerp(A1, 0.45); rod.position.copy(mid); rod.quaternion.setFromUnitVectors(V3(0, 1, 0), ax); scene.add(rod);
scene.traverse(o => { if (o.isLight) o.layers.enableAll(); });
window.gripView = (from, span, showRod) => {
  const cam = new T3.OrthographicCamera(-span / 2, span / 2, span / 2, -span / 2, 1, 4000), tgt = mid.clone().add(V3(...(span > 500 ? [40, -160, 200] : [0, -10, 10]))), d = V3(...from).normalize();
  cam.position.copy(tgt.clone().addScaledVector(d, 1500)); cam.up.set(0, 0, 1); cam.lookAt(tgt); cam.updateMatrixWorld(true);
  const c = i => new T3.Vector3().setFromMatrixColumn(cam.matrixWorld, i);
  key.position.copy(tgt).addScaledVector(c(0), -0.6).addScaledVector(c(1), 0.8).addScaledVector(c(2), 0.9); key.target.position.copy(tgt); key.target.updateMatrixWorld();
  fill.position.copy(tgt).addScaledVector(c(0), 0.9).addScaledVector(c(1), -0.3).addScaledVector(c(2), 0.5); fill.target.position.copy(tgt); fill.target.updateMatrixWorld();
  rod.material.colorWrite = !!showRod; rod.renderOrder = -5; renderer.autoClear = true; renderer.clear(); renderer.render(scene, cam);
  const px = p => { const q = p.clone().project(cam); return [(q.x + 1) * N / 2, (1 - q.y) * N / 2]; };
  const m = px(mid), e = px(mid.clone().addScaledVector(ax, -100)), ang = Math.atan2(e[1] - m[1], e[0] - m[0]) * 180 / Math.PI;
  return { rod: m, ang, pxPerMm: N / span, span, R };
};
return { err, pose: P };
}
"""


def main():
    with sync_playwright() as p:
        b = p.chromium.launch(channel="chrome", args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
        pg = b.new_page(viewport={"width": 2400, "height": 2400})
        pg.set_default_timeout(0); pg.on("pageerror", lambda e: print("ERR", e))
        pg.goto((HERE / "hand3d.html").as_uri(), timeout=0); pg.wait_for_function("window.READY === true", timeout=0)
        print(json.dumps(pg.evaluate(JS.replace("EXT", "-38").replace("DEV", "26").replace("A1Y", "82")), indent=None))
        shot = lambda: pg.locator("#c").screenshot(omit_background=True)
        if len(sys.argv) > 1:
            cells = ""
            for f in ([0.1, .85, .5], [.3, .7, .65], [-.2, .9, .35], [0, 0, 1], [0, -.2, -1], [-1, 0.1, .1]):
                print(f, pg.evaluate("f => gripView(f, 300, true)", f))
                cells += f'<div style="background:#e8dcc4;border:1px solid #888"><img style="width:600px" src="data:image/png;base64,{base64.b64encode(shot()).decode()}"></div>'
            v = b.new_page(viewport={"width": 1810, "height": 1230}); v.set_content(f'<body style="margin:0;display:grid;grid-template-columns:repeat(3,602px)">{cells}')
            v.screenshot(path=sys.argv[2])
        else:
            m = pg.evaluate("gripView([0.3, 0.7, 0.65], 900, false)")
            (HERE / "hand_grip.png").write_bytes(shot()); (HERE / "grip.json").write_text(json.dumps(m, indent=1), encoding="utf-8"); print(m)
        b.close()


main()

