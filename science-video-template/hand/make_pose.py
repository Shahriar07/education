"""Open hands from the same bones and skin as the pen hand: hand_push.png (palm flat against something, seen from the
thumb side; mirrored when drawn, so that it pushes to the right) and hand_point.png (index finger pressing down).
poses.json holds the anchor (middle of the palm's contact line / fingertip) in pixels and the scale.
Run: python make_pose.py"""
import json, pathlib
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).parent
JS = r"""
(which) => {
const T3 = THREE, V3 = HAND.V, K = 0.85;
const C = { size: K, shape: { wid: 1.14 }, arm: { w: 1.0, flat: 0.74, taper: 1.1 }, pen: { tip: [400,400,400], web: [400,450,400], roll: 0 } };
const Q = which === 'push' ? Object.assign(C, { wrist: { ext: -72, dev: 0 }, index: { abd: 6, flex: [-4, 5, 3] }, middle: { abd: 1, flex: [-4, 4, 3] }, ring: { abd: -4, flex: [-4, 5, 3] }, little: { abd: -10, flex: [-4, 7, 4] }, thumb: { dir: [-0.72, 0.69, 0.06], up: [-0.3, 0, 0.95], flex: [2, 4] } })
 : Object.assign(C, { wrist: { ext: -25, dev: 0 }, index: { abd: 0, flex: [12, 14, 10] }, middle: { abd: 0, flex: [72, 98, 50] }, ring: { abd: 0, flex: [78, 98, 50] }, little: { abd: 0, flex: [82, 95, 50] }, thumb: { dir: [-0.3, 0.78, -0.55], up: [-0.8, 0.1, 0.55], flex: [28, 42] } });
Object.assign(POSE, Q);
while (scene.children.length) scene.remove(scene.children[0]);
scene.add(new T3.HemisphereLight(0xffffff, 0x6e5f56, 0.75), key, key.target, fill, fill.target);
const b2 = HAND.build(POSE); b2.arm.children[1].scale.y = 150 / 1275;
scene.add(b2.hand); SKIN3D.apply(b2, POSE, HAND.M); b2.hand.traverse(o => o.layers.set(0));
const push = which === 'push', span = 640, from = push ? V3(-1, 0.03, 0.06) : V3(-0.92, -0.1, 0.4), up = push ? V3(0, 1, 0) : V3(0, -1, 0);
const cam = new T3.OrthographicCamera(-span / 2, span / 2, span / 2, -span / 2, 1, 4000), tgt = push ? V3(0, 20, 90) : V3(0, -60, 60);
cam.position.copy(tgt).addScaledVector(from.normalize(), 1500); cam.up.copy(up); cam.lookAt(tgt); cam.updateMatrixWorld(true);
// the push picture is mirrored when drawn, so its light comes from the other side
const c = i => new T3.Vector3().setFromMatrixColumn(cam.matrixWorld, i), sx = push ? 0.6 : -0.6;
key.position.copy(tgt).addScaledVector(c(0), sx).addScaledVector(c(1), 0.8).addScaledVector(c(2), 0.9); key.target.position.copy(tgt); key.target.updateMatrixWorld();
fill.position.copy(tgt).addScaledVector(c(0), -1.5 * sx).addScaledVector(c(1), -0.3).addScaledVector(c(2), 0.5); fill.target.position.copy(tgt); fill.target.updateMatrixWorld();
renderer.autoClear = true; scene.traverse(o => { if (o.isLight) o.layers.enableAll(); }); renderer.clear(); renderer.render(scene, cam);
const px = p => { const q = p.clone().project(cam); return [(q.x + 1) * N / 2, (1 - q.y) * N / 2]; };
return { anchor: push ? px(V3(0, 72 * K, -14 * K)) : px(HAND.pt(b2.F.index, 0.98, 'mid')), pxPerMm: N / span };
}
"""
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 2400, "height": 2400}); pg.set_default_timeout(0); pg.on("pageerror", lambda e: print("ERR", e))
    pg.goto((HERE / "hand3d.html").as_uri(), timeout=0); pg.wait_for_function("window.READY === true", timeout=0)
    out = {}
    for w in ("push", "point"):
        out[w] = pg.evaluate(JS, w); (HERE / f"hand_{w}.png").write_bytes(pg.locator("#c").screenshot(omit_background=True))
    (HERE / "poses.json").write_text(json.dumps(out, indent=1)); print(out); b.close()
