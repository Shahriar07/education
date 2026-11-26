"""A hand holding kitchen tongs (চিমটা) and squeezing them with two fingers (2026-11-26).
The hand holds the tongs from above, palm down: the top strip lies under the palm, the index and middle fingers curl
under the bottom strip and pull it up; the ring and little fingers curl loosely, the thumb lies along the top strip.
For each opening g (gap between the strips at the hand, mm) the finger joints are solved so that every segment of the
index and middle fingers wraps the bottom strip. Frames hand_tong_0.png ... (g from 43 to 8 mm) and tongs.json
(anchor = the top strip under the middle of the palm, px per mm, g of each frame).
Seen from the fingertips' side and a little above (the bench camera), light from the upper left.
Run: python make_tongs.py [preview out.png]"""
import sys, json, base64, pathlib
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).parent
GAPS = [43, 36, 29, 22, 15, 8]
JS = r"""
(g) => {
const T3 = THREE, V3 = HAND.V, K = 0.85, W = 1.14, G = HAND.geom(K, { wid: W }), D = Math.PI / 180;
const RS = { index: [9.6, 8.6, 7.9, 7.2], middle: [10, 9, 8.2, 7.4], ring: [9.3, 8.4, 7.7, 7], little: [8.2, 7.5, 6.9, 6.3] };
/* strips run along hand x (across the knuckles); the top one 2 mm under the palm's pad, the bottom one g lower */
const zTop = -(13 * K + 3.5), yS = 78 * K, zBot = zTop - g, half = 8;   // strip 16 mm wide (along y), 3 mm thick
const fk = (k, abd, fx) => { const L = G.L[k], j1 = new T3.Object3D(), j2 = new T3.Object3D(), j3 = new T3.Object3D(), e = new T3.Object3D();
  j1.position.set(...G.mcp[k]); j1.rotation.set(-fx[0] * D, 0, abd * D, 'ZXY'); j1.add(j2); j2.position.y = L[0]; j2.rotation.x = -fx[1] * D; j2.add(j3); j3.position.y = L[1]; j3.rotation.x = -fx[2] * D; j3.add(e); e.position.y = L[2] - 5; j1.updateMatrixWorld(true);
  return [j1, j2, j3, e].map(o => new T3.Vector3().setFromMatrixPosition(o.matrixWorld)); };
/* distance from a point (y, z) to the bottom strip's cross-section, a rounded rectangle 16 x 3 mm */
const dStrip = (p, z0) => { const dy = Math.max(Math.abs(p.y - yS) - half, 0), dz = Math.max(Math.abs(p.z - z0) - 1.5, 0); return Math.hypot(dy, dz) - (Math.abs(p.y - yS) < half && Math.abs(p.z - z0) < 1.5 ? 1 : 0); };
const err = (k, fx, z0, wrap) => { const p = fk(k, 0, fx); let e = 0, best = 1e9;
  for (let i = 0; i < 3; i++) for (let u = 0; u <= 1.001; u += 0.1) { const q = p[i].clone().lerp(p[i + 1], u), r = (RS[k][i] * (1 - u) + RS[k][i + 1] * u) * K * W, d = dStrip(q, z0) - r, dt = dStrip(q, zTop) - r; best = Math.min(best, d);
    if (d < 0) e += 8 * d * d; if (dt < 0) e += 8 * dt * dt; if (wrap && i === 2 && q.z > z0 - 1) e += 0.02 * (q.z - z0 + 1) ** 2; }
  return e + 3 * best * best; };
const solve = (f, x, lo, hi) => { let best = f(x), st = 12; while (st > 0.05) { let imp = false; for (let i = 0; i < x.length; i++) for (const s of [st, -st]) { const y = x.slice(); y[i] = Math.max(lo[i], Math.min(hi[i], y[i] + s)); const v = f(y); if (v < best - 1e-9) { best = v; x = y; imp = true; } } if (!imp) st /= 2; } return x; };
const P = { size: K, shape: { wid: W }, arm: { w: 1.0, flat: 0.74, taper: 1.1 }, wrist: { ext: -18, dev: 0 }, pen: { tip: [400,400,400], web: [400,450,400], roll: 0 },
  thumb: { dir: [-0.82, 0.5, -0.28], up: [-0.3, 0, 0.95], flex: [4, 8] } };
for (const k of ['index', 'middle']) P[k] = { abd: 0, flex: solve(x => err(k, x, zBot, true), [30, 80, 50], [0, 20, 10], [95, 110, 80]) };
for (const k of ['ring', 'little']) P[k] = { abd: k === 'ring' ? -2 : -6, flex: solve(x => err(k, x, zBot - 6, false), [50, 90, 60], [20, 40, 20], [100, 110, 80]) };
Object.assign(POSE, P);
while (scene.children.length) scene.remove(scene.children[0]);
scene.add(new T3.HemisphereLight(0xffffff, 0x6e5f56, 0.75), key, key.target, fill, fill.target);
const b2 = HAND.build(POSE); b2.arm.children[1].scale.y = 150 / 1275; scene.add(b2.hand); SKIN3D.apply(b2, POSE, HAND.M); b2.hand.traverse(o => o.layers.set(0));
/* the strips as depth-only blockers (the scene draws the real tongs), so what is behind them is hidden */
const steel = new T3.MeshStandardMaterial({ color: 0x9aa3a8, metalness: 0.7, roughness: 0.35 });
const strips = [zTop, zBot].map(z => { const m = new T3.Mesh(new T3.BoxGeometry(600, 16, 3), steel); m.position.set(0, yS, z); scene.add(m); return m; });
window.showStrips = v => strips.forEach(m => { m.material.colorWrite = v; });
showStrips(false);
const view = { from: V3(0, 0.96, 0.28), up: V3(0, 0, 1), tgt: V3(-10, 70, -20), span: 360 };
const cam = new T3.OrthographicCamera(-view.span / 2, view.span / 2, view.span / 2, -view.span / 2, 1, 4000);
cam.position.copy(view.tgt).addScaledVector(view.from.clone().normalize(), 1500); cam.up.copy(view.up); cam.lookAt(view.tgt); cam.updateMatrixWorld(true);
const c = i => new T3.Vector3().setFromMatrixColumn(cam.matrixWorld, i);
key.position.copy(view.tgt).addScaledVector(c(0), -0.6).addScaledVector(c(1), 0.8).addScaledVector(c(2), 0.9); key.target.position.copy(view.tgt); key.target.updateMatrixWorld();
fill.position.copy(view.tgt).addScaledVector(c(0), 0.9).addScaledVector(c(1), -0.3).addScaledVector(c(2), 0.5); fill.target.position.copy(view.tgt); fill.target.updateMatrixWorld();
window.draw3 = () => { renderer.autoClear = true; scene.traverse(o => { if (o.isLight) o.layers.enableAll(); }); renderer.clear(); renderer.render(scene, cam); };
draw3();
const px = p => { const q = p.clone().project(cam); return [(q.x + 1) * N / 2, (1 - q.y) * N / 2]; };
/* anchor: the top strip's upper face under the middle of the palm; and a second point 100 mm along the strip (hand -x) for its angle */
const a = px(V3(-5, yS, zTop + 1.5)), b = px(V3(-105, yS, zTop + 1.5));
return { g, anchor: a, ang: Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI, pxPerMm: N / view.span, flex: { index: P.index.flex, middle: P.middle.flex } };
}
"""
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 2400, "height": 2400}); pg.set_default_timeout(0); pg.on("pageerror", lambda e: print("ERR", e))
    pg.goto((HERE / "hand3d.html").as_uri(), timeout=0); pg.wait_for_function("window.READY === true", timeout=0)
    out, cells = [], ""
    for i, gap in enumerate(GAPS):
        r = pg.evaluate(JS, gap); out.append(r); (HERE / f"hand_tong_{i}.png").write_bytes(pg.locator("#c").screenshot(omit_background=True))
        if len(sys.argv) > 2 and i in (0, len(GAPS) - 1):
            pg.evaluate("showStrips(true); draw3()"); png = pg.locator("#c").screenshot(omit_background=True)
            cells += f'<div style="background:#e8dcc4"><img style="width:800px" src="data:image/png;base64,{base64.b64encode(png).decode()}"></div>'
    (HERE / "tongs.json").write_text(json.dumps(out, indent=1)); print(json.dumps([(o["g"], o["flex"]) for o in out]))
    if cells:
        v = b.new_page(viewport={"width": 1600, "height": 800}); v.set_content(f'<body style="margin:0;display:flex">{cells}'); v.screenshot(path=sys.argv[2])
    b.close()
