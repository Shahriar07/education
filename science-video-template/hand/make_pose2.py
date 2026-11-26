"""More hands from the same bones and skin, for how real hands actually hold, pull and press (2026-11-26):
  hook   index finger bent into a hook under a can's ring, the other fingers loosely curled, thumb resting beside them
  mouse  the whole hand over a computer mouse: the palm on its back, the fingers lying along it (each segment solved to
         rest on the mouse's surface), the index finger's pad on the left button, the thumb against its left side
  pad    pressing a switch with the pad of a slightly bent index finger, the other fingers curled
Every picture is seen from the thumb side and a little above (the camera of the scenes), light from the upper left.
poses2.json: anchor in pixels (hook: inside of the hook; mouse: index pad; pad: index pad) and px per mm.
Run: python make_pose2.py [preview out.png]"""
import sys, json, base64, pathlib
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).parent
JS = r"""
(which) => {
const T3 = THREE, V3 = HAND.V, K = 0.85, G = HAND.geom(K, { wid: 1.14 });
const base = { size: K, shape: { wid: 1.14 }, arm: { w: 1.0, flat: 0.74, taper: 1.1 }, pen: { tip: [400,400,400], web: [400,450,400], roll: 0 } };
const D = Math.PI / 180, RS = { index: [9.6, 8.6, 7.9, 7.2], middle: [10, 9, 8.2, 7.4], ring: [9.3, 8.4, 7.7, 7], little: [8.2, 7.5, 6.9, 6.3] };
const fk = (k, abd, fx) => { const L = G.L[k], j1 = new T3.Object3D(), j2 = new T3.Object3D(), j3 = new T3.Object3D(), e = new T3.Object3D();
  j1.position.set(...G.mcp[k]); j1.rotation.set(-fx[0] * D, 0, abd * D, 'ZXY'); j1.add(j2); j2.position.y = L[0]; j2.rotation.x = -fx[1] * D; j2.add(j3); j3.position.y = L[1]; j3.rotation.x = -fx[2] * D; j3.add(e); e.position.y = L[2] - 5; j1.updateMatrixWorld(true);
  return [j1, j2, j3, e].map(o => new T3.Vector3().setFromMatrixPosition(o.matrixWorld)); };
const solve = (f, x, lo, hi) => { let best = f(x), st = 12; while (st > 0.05) { let imp = false; for (let i = 0; i < x.length; i++) for (const s of [st, -st]) { const y = x.slice(); y[i] = Math.max(lo[i], Math.min(hi[i], y[i] + s)); const v = f(y); if (v < best - 1e-9) { best = v; x = y; imp = true; } } if (!imp) st /= 2; } return x; };
let P, occ = null, anchor, view;
if (which === 'mouse') {
  /* the mouse in hand coordinates (mm): half-ellipsoid, centre of its base c, half-axes r; its top touches the palm */
  var r = [32, 62, 35], mc = V3(-6, 50, -11 - 35);
  const dist = p => { const q = p.clone().sub(mc), n = Math.hypot(q.x / r[0], q.y / r[1], Math.max(q.z, 0) / r[2]); return (n - 1) * Math.min(...r) * 0.92; };
  const err = (k, x) => { const p = fk(k, x.abd, x.flex); let e = 0; for (let i = 0; i < 3; i++) for (let u = 0; u <= 1.001; u += 0.2) { const q = p[i].clone().lerp(p[i + 1], u), g = dist(q) - (RS[k][i] * (1 - u) + RS[k][i + 1] * u) * K * 1.14 + 0.6; e += g < 0 ? 6 * g * g : g * g; } return e; };
  P = Object.assign(base, { wrist: { ext: 8, dev: 4 }, thumb: { dir: [-0.28, 0.89, -0.34], up: [-0.8, 0, 0.6], flex: [4, 6] } });
  const abd = { index: 2, middle: 0, ring: -3, little: -7 };
  for (const k of ['index', 'middle', 'ring', 'little']) P[k] = { abd: abd[k], flex: solve(x => err(k, { abd: abd[k], flex: x }), [10, 10, 5], [-5, 0, 0], [60, 70, 50]).map(v => +v.toFixed(1)) };
  occ = new T3.Mesh(new T3.SphereGeometry(1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), new T3.MeshStandardMaterial({ color: 0x2d3035, roughness: 0.4 })); occ.userData.show = true; occ.scale.set(r[0], r[2], r[1]); occ.rotation.x = Math.PI / 2; occ.position.copy(mc);
  anchor = () => { const p = fk('index', P.index.abd, P.index.flex); return p[2].clone().lerp(p[3], 0.5).add(V3(0, 0, -8)); };
  view = { from: V3(-1, 0, 0.34), up: V3(0, 0, 1), tgt: V3(0, 40, -10), span: SPAN };
} else if (which === 'hook') {
  P = Object.assign(base, { wrist: { ext: -10, dev: 0 }, index: { abd: 2, flex: [40, 95, 70] }, middle: { abd: 0, flex: [70, 100, 60] }, ring: { abd: -2, flex: [78, 100, 60] }, little: { abd: -5, flex: [84, 98, 55] }, thumb: { dir: [-0.45, 0.85, -0.25], up: [-0.6, 0.1, 0.8], flex: [10, 15] } });
  anchor = () => { const p = fk('index', P.index.abd, P.index.flex); return p[2].clone().lerp(p[3], 0.45).add(V3(0, 0, -7)); };
  view = { from: V3(-1, -0.2, 0.35), up: V3(0, 0, 1), tgt: V3(0, 30, 0), span: SPAN };
} else {
  P = Object.assign(base, { wrist: { ext: -15, dev: 0 }, index: { abd: 0, flex: [20, 25, 12] }, middle: { abd: 0, flex: [75, 98, 55] }, ring: { abd: 0, flex: [80, 98, 55] }, little: { abd: 0, flex: [84, 95, 55] }, thumb: { dir: [-0.35, 0.75, -0.55], up: [-0.8, 0.1, 0.55], flex: [25, 40] } });
  anchor = () => { const p = fk('index', 0, P.index.flex); return p[2].clone().lerp(p[3], 0.6).add(V3(0, 0, -7)); };
  view = { from: V3(-1, -0.05, 0.25), up: V3(0, 0, 1), tgt: V3(0, 20, 0), span: SPAN };
}
Object.assign(POSE, P);
while (scene.children.length) scene.remove(scene.children[0]);
scene.add(new T3.HemisphereLight(0xffffff, 0x6e5f56, 0.75), key, key.target, fill, fill.target);
const b2 = HAND.build(POSE); b2.arm.children[1].scale.y = 150 / 1275; scene.add(b2.hand); SKIN3D.apply(b2, POSE, HAND.M); b2.hand.traverse(o => o.layers.set(0));
if (occ) { occ.material.colorWrite = !!occ.userData.show; occ.renderOrder = -5; scene.add(occ); { const g = new T3.Mesh(new T3.BoxGeometry(1.2, 60, 3), new T3.MeshStandardMaterial({ color: 0x15171a })); g.position.copy(mc).add(V3(0, 75, 2)); scene.add(g); } }
const cam = new T3.OrthographicCamera(-view.span / 2, view.span / 2, view.span / 2, -view.span / 2, 1, 4000);
cam.position.copy(view.tgt).addScaledVector(view.from.clone().normalize(), 1500); cam.up.copy(view.up); cam.lookAt(view.tgt); cam.updateMatrixWorld(true);
const c = i => new T3.Vector3().setFromMatrixColumn(cam.matrixWorld, i);
key.position.copy(view.tgt).addScaledVector(c(0), -0.6).addScaledVector(c(1), 0.8).addScaledVector(c(2), 0.9); key.target.position.copy(view.tgt); key.target.updateMatrixWorld();
fill.position.copy(view.tgt).addScaledVector(c(0), 0.9).addScaledVector(c(1), -0.3).addScaledVector(c(2), 0.5); fill.target.position.copy(view.tgt); fill.target.updateMatrixWorld();
window.showOcc = v => { if (occ) occ.material.colorWrite = v; };
window.draw2 = () => { renderer.autoClear = true; scene.traverse(o => { if (o.isLight) o.layers.enableAll(); }); renderer.clear(); renderer.render(scene, cam); };
draw2();
const px = p => { const q = p.clone().project(cam); return [(q.x + 1) * N / 2, (1 - q.y) * N / 2]; };
window.ANCHOR3 = (which === 'mouse' ? mc.clone() : anchor()).toArray();   // for make_meshes.py: the anchor in hand coordinates (mm)
return { anchor: px(anchor()), pxPerMm: N / view.span, flex: { index: P.index.flex, middle: P.middle.flex, ring: P.ring.flex, little: P.little.flex } };
}
"""
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 2400, "height": 2400}); pg.set_default_timeout(0); pg.on("pageerror", lambda e: print("ERR", e))
    pg.goto((HERE / "hand3d.html").as_uri(), timeout=0); pg.wait_for_function("window.READY === true", timeout=0)
    out, cells = {}, ""
    for w in ("hook", "mouse", "pad"):
        out[w] = pg.evaluate(JS.replace("SPAN", "260" if len(sys.argv) > 2 else "520"), w); png = pg.locator("#c").screenshot(omit_background=True); (HERE / f"hand_{w}.png").write_bytes(png)
        if len(sys.argv) > 2:
            if w == "mouse": pg.evaluate("showOcc(true); draw2()"); png = pg.locator("#c").screenshot(omit_background=True)
            x, y = out[w]["anchor"]; cells += f'<div style="position:relative;width:700px;height:700px;background:#e8dcc4"><img style="width:700px" src="data:image/png;base64,{base64.b64encode(png).decode()}"><div style="position:absolute;left:{x/2400*700-8:.0f}px;top:{y/2400*700-8:.0f}px;width:16px;height:16px;border-radius:8px;background:red"></div></div>'
    (HERE / "poses2.json").write_text(json.dumps(out, indent=1)); print(json.dumps(out))
    if cells:
        v = b.new_page(viewport={"width": 2100, "height": 700}); v.set_content(f'<body style="margin:0;display:flex">{cells}'); v.screenshot(path=sys.argv[2])
    b.close()
