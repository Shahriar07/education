"""Render the 3D pen hand to transparent PNGs.

  python make_hand.py                 -> hand_side.png and hand.json (pen tip and end in pixels, pen angle, scale)
  python make_hand.py preview out.png [view ...] -> views of the pose side by side, pinch points marked
  python make_hand.py solve           -> finger angles that put the pads on the pen (copy into pose.js)
Run with the project's .venv python from anywhere.
"""
import sys, json, base64, pathlib
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).parent


def page(p):
    b = p.chromium.launch(channel="chrome", args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
    pg = b.new_page(viewport={"width": 2400, "height": 2400})
    pg.goto((HERE / "hand3d.html").as_uri() + ("?flat" if "--flat" in sys.argv else ""))
    pg.wait_for_function("window.READY === true")
    return b, pg


def shot(pg, name, marks=False):
    meta = pg.evaluate("([n, m]) => window.renderView(n, {marks: m})", [name, marks])
    png = pg.locator("#c").screenshot(omit_background=True)
    return meta, png


def main():
    with sync_playwright() as p:
        b, pg = page(p)
        if len(sys.argv) > 1 and sys.argv[1] == "solve":
            print(json.dumps(pg.evaluate("window.solveGrip()"), indent=1))
        elif len(sys.argv) > 1 and sys.argv[1] == "fit":
            r = pg.evaluate("FIT.run()")
            (HERE / "fit_result.json").write_text(json.dumps(r, indent=1), encoding="utf-8")
            p = r["pose"]
            (HERE / "fit_pose.js").write_text(
                "/* The pose fitted to the reference photo (make_hand.py fit); loaded after pose.js and overrides it. */\n"
                f"Object.assign(POSE, {json.dumps({k: p[k] for k in ('size', 'wrist', 'index', 'middle', 'ring', 'little', 'thumb')})});\n"
                f"Object.assign(POSE.pen, {json.dumps(p['pen'])});\n"
                f"VIEWS.photo = {{ from: HAND.V(...{json.dumps(r['view']['from'])}), up: HAND.V(...{json.dumps(r['view']['up'])}), target: HAND.V(-10, -250, -20), span: 800 }};\n"
                "VIEWS.side = VIEWS.photo;\n", encoding="utf-8")
            print(json.dumps(r, indent=1))
        elif len(sys.argv) > 1 and sys.argv[1] == "preview":
            clean = "--clean" in sys.argv
            names = [a for a in sys.argv[3:] if a not in ("--clean", "--flat")] or ["side", "front", "top", "palm", "thumbside"]
            cells = ""
            for n in names:
                meta, png = shot(pg, n, True)
                dots = ""
                if clean:
                    meta["marks"] = {}
                    meta["tip"] = None
                for k, c in [("a", "#e00"), ("b", "#00c"), ("web", "#0a0")]:
                    if k not in meta["marks"]:
                        continue
                    x, y = meta["marks"][k]
                    dots += f'<circle cx="{x/2400*700:.0f}" cy="{y/2400*700:.0f}" r="5" fill="{c}"/>'
                if meta["tip"]:
                    x, y = meta["tip"]
                    dots += f'<circle cx="{x/2400*700:.0f}" cy="{y/2400*700:.0f}" r="6" fill="none" stroke="#000" stroke-width="2"/>'
                label = n.replace("roll", "") + "°" if clean and n.startswith("roll") else n
                cells += (f'<div style="position:relative;width:700px;height:700px;background:#f4ead6;border:1px solid #999">'
                          f'<img src="data:image/png;base64,{base64.b64encode(png).decode()}" style="width:700px;height:700px;position:absolute">'
                          f'<svg width="700" height="700" style="position:absolute">{dots}</svg>'
                          f'<div style="position:absolute;left:8px;top:6px;font:bold 40px sans-serif">{label}</div></div>')
            v = b.new_page(viewport={"width": 700 * min(3, len(names)), "height": 700 * -(-len(names) // 3)})
            v.set_content(f'<html><body style="margin:0;display:grid;grid-template-columns:repeat(3,700px)">{cells}</body></html>')
            v.screenshot(path=sys.argv[2])
        else:
            out = {}
            for n in ["side"]:
                meta, png = shot(pg, n)
                (HERE / f"hand_{n}.png").write_bytes(png)
                out[n] = {k: meta[k] for k in ("tip", "end", "ang", "pxPerMm", "penPx")}
                out[n]["size"] = [2400, 2400]
            (HERE / "hand.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
            print(json.dumps(out, indent=1))
        b.close()


if __name__ == "__main__":
    main()
