"""Export the hand poses as 3D meshes, so the videos can put the real 3D hand into the 3D scene (2026-11-26).
A flat picture of a hand pasted over a scene never matches the scene's perspective; a mesh placed with coordinates does.
Each pose is built by the same code as its picture (the JS of make_grip.py, make_pose.py, make_pose2.py), the skin
on a 1.0 mm grid. Every visible part (skin with its crease shading, nails, sleeve, cuff) is baked into the hand frame
(mm: wrist at the origin, +y towards the fingers, +z the back of the hand, -x the thumb side) and written to
mesh_<name>.js as HANDMESH[name] = { anchor, parts: { skin: {p, n, c, i}, nail, cloth, cuff } } with positions as
Int16 (0.1 mm), normals as Int8, colours as Uint8, indices as Uint32, each base64.
  anchors: grip* = a point on the rod's axis under the middle of the palm, with the rod's direction (axis);
           push, cup = the middle of the palm's surface; hook = inside of the hooked finger; pad = the index pad;
           mouse = the centre of the mouse's base (the mouse: half-ellipsoid, half-axes 32 x 62 x 35 mm, long axis +y).
Run: python make_meshes.py [name ...]"""
import sys, re, json, pathlib
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).parent
js = lambda f: re.search(r'JS = r"""(.*?)"""', (HERE / f).read_text(encoding="utf-8"), re.S).group(1)
K = 0.85
ZC = -(18 + 11.5 * K); A0 = [-27 * K, 93 * K, ZC]; A1 = [26 * K, 82 * K, ZC - 1]
GRIP = {"anchor": [A0[i] + 0.45 * (A1[i] - A0[i]) for i in range(3)], "axis": [A1[i] - A0[i] for i in range(3)]}
B1 = [26 * K, 52 * K, ZC - 1]   # the diagonal grip: the rod from the index knuckle down across the palm towards the heel
GRIPX = {"anchor": [A0[i] + 0.45 * (B1[i] - A0[i]) for i in range(3)], "axis": [B1[i] - A0[i] for i in range(3)]}
POSES = {   # name: (script, js argument, replacements, anchor)
    "grip": ("make_grip.py", None, {"EXT": "-38", "DEV": "26", "A1Y": "82"}, GRIP),
    "grip0": ("make_grip.py", None, {"EXT": "0", "DEV": "0", "A1Y": "82"}, GRIP),
    "gripD": ("make_grip.py", None, {"EXT": "0", "DEV": "35", "A1Y": "82"}, GRIP),
    "gripX": ("make_grip.py", None, {"EXT": "-55", "DEV": "-15", "A1Y": "52"}, GRIPX),   # a diagonal power grip, the forearm along the rod
    "gripR": ("make_grip.py", None, {"EXT": "-30", "DEV": "-35", "A1Y": "82"}, GRIP),   # wrist bent to the thumb side: the forearm goes along the rod, past the thumb
    "push": ("make_pose.py", "push", {}, {"anchor": [0, 72 * K, -14 * K]}),
    "cup": ("make_pose.py", "cup", {}, {"anchor": [0, 72 * K, -14 * K]}),
    "hook": ("make_pose2.py", "hook", {"SPAN": "520"}, None),
    "pad": ("make_pose2.py", "pad", {"SPAN": "520"}, None),
    "mouse": ("make_pose2.py", "mouse", {"SPAN": "520"}, None),
}
EXPORT = r"""
() => {
  const out = {}, b64 = u8 => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
  scene.updateMatrixWorld(true);
  const acc = {};
  scene.traverse(o => { if (!o.isMesh) return; for (let q = o; q; q = q.parent) if (!q.visible) return;
    const m = o.material; let k = null;
    if (m.vertexColors) k = 'skin'; else if (m === HAND.M.nail) k = 'nail'; else if (m === HAND.M.cloth) k = 'cloth'; else if (m === HAND.M.cuff) k = 'cuff';
    if (!k) return;
    let g = o.geometry.index ? o.geometry.clone() : o.geometry.clone(); g.applyMatrix4(o.matrixWorld);
    const a = acc[k] || (acc[k] = { p: [], n: [], c: [], i: [], v: 0 }), P = g.attributes.position, N = g.attributes.normal, C = g.attributes.color;
    for (let j = 0; j < P.count; j++) { a.p.push(P.getX(j), P.getY(j), P.getZ(j)); a.n.push(N.getX(j), N.getY(j), N.getZ(j)); if (k === 'skin') a.c.push(C ? C.getX(j) : 1, C ? C.getY(j) : 1, C ? C.getZ(j) : 1); }
    if (g.index) for (let j = 0; j < g.index.count; j++) a.i.push(a.v + g.index.getX(j)); else for (let j = 0; j < P.count; j++) a.i.push(a.v + j);
    a.v += P.count; });
  for (const k in acc) { const a = acc[k];
    const p = new Int16Array(a.p.map(x => Math.round(x * 10))), n = new Int8Array(a.n.map(x => Math.round(x * 127))), c = new Uint8Array(a.c.map(x => Math.round(x * 255))), i = new Uint32Array(a.i);
    out[k] = { p: b64(new Uint8Array(p.buffer)), n: b64(new Uint8Array(n.buffer)), c: k === 'skin' ? b64(c) : '', i: b64(new Uint8Array(i.buffer)), verts: a.v }; }
  return { parts: out, anchor3: window.ANCHOR3 || null };
}
"""
names = sys.argv[1:] or list(POSES)
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    for name in names:
        f, arg, rep, anc = POSES[name]
        pg = b.new_page(viewport={"width": 2400, "height": 2400}); pg.set_default_timeout(0); pg.on("pageerror", lambda e: print("ERR", e))
        pg.goto((HERE / "hand3d.html").as_uri(), timeout=0); pg.wait_for_function("window.READY === true", timeout=0)
        pg.evaluate("() => { const ap = SKIN3D.apply; SKIN3D.apply = (b, P, M) => ap(b, P, M, 1.0); }")
        code = js(f)
        for k, v in rep.items(): code = code.replace(k, v)
        pg.evaluate(code, arg) if arg is not None else pg.evaluate(code)
        r = pg.evaluate(EXPORT)
        meta = anc or {"anchor": r["anchor3"]}
        data = {"anchor": [round(x, 2) for x in meta["anchor"]], **({"axis": meta["axis"]} if "axis" in meta else {}), "parts": r["parts"]}
        (HERE / f"mesh_{name}.js").write_text("window.HANDMESH = window.HANDMESH || {};\nHANDMESH[%s] = %s;\n" % (json.dumps(name), json.dumps(data)), encoding="utf-8")
        print(name, {k: v["verts"] for k, v in r["parts"].items()}, round((HERE / f"mesh_{name}.js").stat().st_size / 1e6, 2), "MB")
        pg.close()
    b.close()
