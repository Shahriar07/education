/* Chapter 9, video 1 (light): places and objects added to the 3D world through the same hooks as zones3.js
   (buildV3 once, frameV3 every frame). Units: metres. Every place is hidden unless a frame asks for it.

   EXP   x 9000  the textbook activity of lessons 1-2 (fig 9.1): table, three blank notebook covers with pin holes on one
                 line, a lit candle behind them, its flame centre at the height of the holes.
   ST    x 9100  your study room in a city flat: back wall with a window (night or day outside, curtains), a desk under a
                 hanging bulb with a shade, a candle, books; also the food (2ক), the cricket ball (fig 9.2), the shoebox
                 (fig 9.3) and the torch with a mirror and a paper (9গ).
   ROOF  x 9300  a flat city roof with a parapet and a rain puddle; houses, a mobile tower and a pole beyond; the sun low
                 in the west (the textbook's chapter photo), or the Moon at night.
   TIN   x 9500  a village tin house: inside, morning sun through a small hole in the tin roof; outside, a solar panel on
                 the roof, a bulb inside the open window, a clothesline in the yard (white shirt), a black umbrella.
   STAIR x 9700  a dark stairwell in a city flat, a torch lying on a step, its beam on the opposite wall.
   ROAD  zones3 village path (Z3.VILL) at night: a car with its headlights on.

   Light: o.dim (0 = daylight, 1 = night) scales the sun and sky light of world3d.js; o.bg replaces the sky
   ('night', 'sunset', or a colour). Light paths that must be hidden behind objects are 3D tubes (o.ray, o.rays). */

/* ---------------- EXP: fig 9.1 ---------------- */
const EXP = {
  X: 9000, O0: -0.35, TOP: 0.76, Z: 0,
  CARDS: [0.15, 0.30, 0.45], CANDLE: 0.60, EYE: -0.12, H: 0.12,
  CW: 0.15, CH: 0.20, CT: 0.0025,
  HOLE: 0.006, HOLE_REAL: 0.001,            // hole as drawn (enlarged, noted on screen) and a real pin hole
  CAND_R: 0.011, CAND_TOP: 0.098, FLAME_H: 0.034
};
EXP.ox = EXP.X + EXP.O0;
const expPt = (s, h = EXP.H, z = EXP.Z) => [EXP.ox + s, EXP.TOP + h, z];
/* where the light from the flame towards your eye stops: at the first cover (from the candle) moved by more than the
   radius of a real pin hole, or at the eye */
function expStop(shift) { for (let i = EXP.CARDS.length - 1; i >= 0; i--) if (Math.abs(shift[i] || 0) >= EXP.HOLE_REAL) return EXP.CARDS[i] + EXP.CT / 2; return EXP.EYE; }

/* ---------------- ST: study room ---------------- */
const ST = {
  X: 9100, W: 4.4, D: 4.0, H: 3.0,
  WIN: { x: -1.0, y0: 1.0, y1: 2.2, w: 1.3 },          // window in the back wall (z = -D/2)
  DESK: { x: 0.45, z: -1.45, top: 0.76, w: 1.3, d: 0.62 },
  BULB: { x: 0.45, y: 1.62, z: -1.3 },                  // hanging bulb with a shade, low over the desk
  CANDLE: { x: 0.95, z: -1.5 },
  BALL: { x: 0.3, z: -1.35, r: 0.036 },                 // a cricket ball (circumference ≈ 22.6 cm)
  BOX: { x: -0.25, z: -1.4, L: 0.30, W: 0.20, H: 0.12, LID: 0.0025, HOLE_TOP: 0.004, HOLE_SIDE: 0.015 },   // shoebox (fig 9.3), side hole facing the window (-x)
};
ST.top = ST.DESK.top;
const stPt = (x, y, z) => [ST.X + x, y, z];

/* ---------------- ROOF, TIN, STAIR ---------------- */
const RF = { X: 9300, Y: 0, PUD: { x: 0.2, z: 1.6, rx: 1.7, rz: 0.75 }, SUN_AZ: 0, SUN_DIST: 260 };
const TN = { X: 9500, IN: { w: 5, d: 4, h: 2.4, ridge: 3.3 }, HOLE: { x: 0.4, y: 0, z: -0.6 }, SUN_EL: 60, PANEL: { x: 1.2, z: 0 }, OUT_X: 9520 };
const SR = { X: 9700, STEP_H: 0.17, STEP_D: 0.27, WALL_Z: -1.2, TORCH: { x: 0.9, z: 1.8 }, STOOL: 0.45, HALF: 7 };   // torch on the floor, 3 m in front of the back wall (face at z = -1.2)

let V9 = null;
const _b9 = buildV3, _f9 = frameV3;
buildV3 = function (k) {
  _b9(k);
  const { scene, box, cyl, mat, canvasTex, mkCar } = k;
  const lights = { sun: null, hemi: null }; scene.traverse(o => { if (o.isDirectionalLight && !lights.sun) lights.sun = o; if (o.isHemisphereLight && !lights.hemi) lights.hemi = o; });
  lights.sunI = lights.sun ? lights.sun.intensity : 1; lights.hemiI = lights.hemi ? lights.hemi.intensity : 0.6;
  const sky0 = scene.background;
  const rnd = (() => { let a = 99; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();
  const grad = (stops, w = 16, h = 512) => canvasTex(w, h, (c, W, H) => { const g = c.createLinearGradient(0, 0, 0, H); stops.forEach(([o, col]) => g.addColorStop(o, col)); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const skies = { night: grad([[0, '#050a1c'], [0.6, '#0d1838'], [1, '#1c2a4f']]), sunset: grad([[0, '#3b5d93'], [0.45, '#c98a6a'], [0.75, '#f2b267'], [1, '#f7d6a0']]) };
  const glowTex = (inner = 'rgba(255,214,140,0.9)', mid = 'rgba(255,170,70,0.35)', outer = 'rgba(255,140,40,0)') => canvasTex(256, 256, (c, w, h) => { const gr = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); gr.addColorStop(0, inner); gr.addColorStop(0.25, mid); gr.addColorStop(1, outer); c.fillStyle = gr; c.fillRect(0, 0, w, h); });
  const glowT = glowTex();
  const sprite = (t, s, col) => { const m = new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }); if (col) m.color = new THREE.Color(col); const q = new THREE.Sprite(m); q.scale.set(s, s, 1); return q; };
  const woodT = (base = '#9a6a3c') => canvasTex(1024, 256, c => { c.fillStyle = base; c.fillRect(0, 0, 1024, 256); for (let i = 0; i < 160; i++) { c.strokeStyle = `rgba(${rnd() < 0.5 ? '70,40,15' : '205,150,95'},${0.06 + rnd() * 0.18})`; c.lineWidth = 0.8 + rnd() * 2; const y = rnd() * 256; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(340, y + 6 * (rnd() - 0.5), 680, y + 6 * (rnd() - 0.5), 1024, y); c.stroke(); } });
  const plasterT = (base) => canvasTex(512, 512, c => { c.fillStyle = base; c.fillRect(0, 0, 512, 512); for (let i = 0; i < 2500; i++) { c.fillStyle = `rgba(${rnd() < 0.5 ? '120,100,70' : '255,255,245'},${0.03 + rnd() * 0.05})`; c.fillRect(rnd() * 512, rnd() * 512, 2 + rnd() * 3, 2 + rnd() * 3); } });
  const floorTex = () => { const t = canvasTex(1024, 1024, c => { for (let i = 0; i < 16; i++) { const v = 150 + Math.floor(rnd() * 30); c.fillStyle = `rgb(${v},${Math.round(v * 0.68)},${Math.round(v * 0.42)})`; c.fillRect(0, i * 64, 1024, 64);
      for (let j = 0; j < 40; j++) { c.strokeStyle = `rgba(70,40,15,${0.08 + rnd() * 0.12})`; c.lineWidth = 1; const y = i * 64 + rnd() * 64; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(300, y + 3, 700, y - 3, 1024, y); c.stroke(); }
      c.fillStyle = 'rgba(40,22,8,.55)'; c.fillRect(0, i * 64, 1024, 2); c.fillRect(rnd() * 1024, i * 64, 2, 64); } }); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };
  const flatQ = (w, d, m, parent) => { const q = new THREE.Mesh(new THREE.PlaneGeometry(w, d), m); q.rotation.x = -Math.PI / 2; q.receiveShadow = true; parent.add(q); return q; };
  const lathe = (pts, m, seg = 40) => { const q = new THREE.Mesh(new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), seg), m); q.castShadow = q.receiveShadow = true; return q; };
  const basic = c => new THREE.MeshBasicMaterial({ color: c });

  /* a candle in a brass dish: wax, wick, flame (outer, inner, blue base), glow sprite, warm point light. Flame centre at fh. */
  function mkCandle(parent, fh = EXP.H, h = EXP.CAND_TOP, r = EXP.CAND_R) {
    const cg = new THREE.Group(); parent.add(cg);
    const brass = mat('#b98a2e', { roughness: 0.35, metalness: 0.7 });
    cyl(0.035, 0.03, 0.008, brass, 0, 0.004, 0, cg, 36); cyl(0.036, 0.036, 0.004, brass, 0, 0.009, 0, cg, 36);
    const wax = new THREE.MeshStandardMaterial({ color: '#f6f1e4', roughness: 0.55, emissive: '#ffb45a', emissiveIntensity: 0 });
    cyl(r, r, h - 0.011, wax, 0, 0.011 + (h - 0.011) / 2, 0, cg, 32);
    { const q = new THREE.Mesh(new THREE.TorusGeometry(r * 0.75, 0.0025, 8, 32), wax); q.rotation.x = Math.PI / 2; q.position.y = h; cg.add(q); }
    const fH = EXP.FLAME_H, wickTop = fh - fH * 0.42;
    cyl(0.0009, 0.0011, wickTop - h + 0.004, mat('#1d1712'), 0, (h + wickTop) / 2, 0, cg, 8);
    const flameG = new THREE.Group(); flameG.position.y = fh; cg.add(flameG);
    const tear = (rr, hh, n = 24) => { const p = []; for (let i = 0; i <= n; i++) { const u = i / n, y = -0.42 * hh + u * hh; const q = rr * Math.sin(Math.PI * Math.pow(u, 0.62)) * (1 - 0.15 * u); p.push(new THREE.Vector2(Math.max(q, 1e-5), y)); } return new THREE.LatheGeometry(p, 32); };
    flameG.add(new THREE.Mesh(tear(0.0062, fH), new THREE.MeshBasicMaterial({ color: '#ffb347', transparent: true, opacity: 0.85, depthWrite: false })));
    const inner = new THREE.Mesh(tear(0.0036, fH * 0.66), new THREE.MeshBasicMaterial({ color: '#fff6d2', transparent: true, opacity: 0.95, depthWrite: false })); inner.position.y = -0.003; flameG.add(inner);
    const blue = new THREE.Mesh(new THREE.SphereGeometry(0.0028, 16, 10), new THREE.MeshBasicMaterial({ color: '#5a7cff', transparent: true, opacity: 0.55, depthWrite: false })); blue.position.y = -0.011; blue.scale.y = 0.7; flameG.add(blue);
    const glow = sprite(glowT, 0.07); flameG.add(glow);
    const fl = new THREE.PointLight('#ffb866', 0, 4, 2); fl.position.set(0, fh + 0.005, 0); fl.castShadow = true; fl.shadow.mapSize.set(1024, 1024); fl.shadow.bias = -0.002; fl.shadow.camera.near = 0.01; cg.add(fl);
    return { G: cg, flameG, glow, fl, wax };
  }
  function setCandle(c, lit, t, glowK = 0.8, power = 1.1) {
    lit = cl(lit); const f = 1 + 0.07 * Math.sin(t * 13.1) + 0.04 * Math.sin(t * 23.7 + 1.3), sway = 0.0012 * Math.sin(t * 5.3) + 0.0006 * Math.sin(t * 11.9);
    c.flameG.visible = lit > 0.01; c.flameG.scale.set(lit, lit * f, lit); c.flameG.position.x = sway; c.glow.material.opacity = glowK * lit;
    c.fl.intensity = power * lit * (0.94 + 0.06 * f); c.wax.emissiveIntensity = 0.12 * lit;
  }

  /* ======================= EXP ======================= */
  const E = new THREE.Group(); scene.add(E);
  {
    const X = EXP.X, T = EXP.TOP, ft = floorTex(); ft.repeat.set(2, 2);
    const fl = flatQ(4, 4, new THREE.MeshStandardMaterial({ map: ft, roughness: 0.7 }), E); fl.position.set(X, 0.002, 0);
    const wallM = new THREE.MeshStandardMaterial({ map: plasterT('#e9dfc9'), roughness: 0.95 });
    box(4, 3, 0.1, wallM, X, 1.5, -1.25, E); box(0.1, 3, 4, wallM, X - 2, 1.5, 0, E); box(0.1, 3, 4, wallM, X + 2, 1.5, 0, E);
    box(4, 0.1, 0.02, mat('#7a5634'), X, 0.05, -1.19, E, false);
    const topM = new THREE.MeshStandardMaterial({ map: woodT(), roughness: 0.55 }), legM = mat('#6f4625', { roughness: 0.7 });
    box(1.0, 0.035, 0.6, topM, X, T - 0.0175, 0, E);
    box(0.94, 0.08, 0.02, legM, X, T - 0.075, -0.27, E); box(0.94, 0.08, 0.02, legM, X, T - 0.075, 0.27, E);
    [[-0.46, -0.26], [0.46, -0.26], [-0.46, 0.26], [0.46, 0.26]].forEach(([dx, dz]) => box(0.04, T - 0.035, 0.04, legM, X + dx, (T - 0.035) / 2, dz, E));
  }
  /* three equal, plain notebook covers (nothing written on them: they are seen from both sides) */
  const coverT = canvasTex(256, 340, (c, w, h) => { c.fillStyle = '#2f6fa8'; c.fillRect(0, 0, w, h); for (let i = 0; i < 1800; i++) { c.fillStyle = `rgba(255,255,255,${0.02 + rnd() * 0.04})`; c.fillRect(rnd() * w, rnd() * h, 2, 2); } c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 3; c.strokeRect(10, 10, w - 20, h - 20); });
  const coverMats = [new THREE.MeshStandardMaterial({ map: coverT, roughness: 0.8 }), mat('#e8e2d2', { roughness: 0.9 })];
  const coverGeo = withHole => { const s = new THREE.Shape(); s.moveTo(-EXP.CW / 2, 0); s.lineTo(EXP.CW / 2, 0); s.lineTo(EXP.CW / 2, EXP.CH); s.lineTo(-EXP.CW / 2, EXP.CH); s.closePath();
    if (withHole) { const hole = new THREE.Path(); hole.absarc(0, EXP.H, EXP.HOLE, 0, Math.PI * 2, true); s.holes.push(hole); }
    const geo = new THREE.ExtrudeGeometry(s, { depth: EXP.CT, bevelEnabled: false, curveSegments: 48 }), uv = geo.attributes.uv, pos = geo.attributes.position;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + EXP.CW / 2) / EXP.CW, pos.getY(i) / EXP.CH); return geo; };
  const geoHole = coverGeo(true), geoPlain = coverGeo(false);
  const covers = EXP.CARDS.map(sx => {
    const g = new THREE.Group(); E.add(g);
    const m = new THREE.Mesh(geoHole, coverMats); m.rotation.y = Math.PI / 2; m.position.set(-EXP.CT / 2, 0, 0); m.castShadow = m.receiveShadow = true; g.add(m);
    const feet = [-1, 1].map(s => box(0.05, 0.022, 0.05, mat('#7a4f2a'), 0, 0.011, s * (EXP.CW / 2 - 0.03), g));
    g.position.set(EXP.ox + sx, EXP.TOP, EXP.Z); g.userData = { m, feet }; return g; });
  /* the pin: a dressmaker's pin with a round head, used in 5ক */
  const pin = new THREE.Group(); E.add(pin);
  cyl(0.0006, 0.0006, 0.032, mat('#c9ced2', { metalness: 0.9, roughness: 0.2 }), 0, 0.016, 0, pin, 8);
  { const q = new THREE.Mesh(new THREE.SphereGeometry(0.0028, 16, 10), mat('#e63946', { roughness: 0.3 })); q.position.y = 0.033; pin.add(q); }
  const expCandle = mkCandle(E); expCandle.G.position.set(EXP.ox + EXP.CANDLE, EXP.TOP, EXP.Z);

  /* ======================= ST: study room ======================= */
  const S0 = new THREE.Group(); S0.position.set(ST.X, 0, 0); scene.add(S0);
  const stParts = {};
  {
    const hw = ST.W / 2, hd = ST.D / 2, H = ST.H, ft = floorTex(); ft.repeat.set(2.2, 2);
    flatQ(ST.W, ST.D, new THREE.MeshStandardMaterial({ map: ft, roughness: 0.7 }), S0).position.y = 0.002;
    const wallM = new THREE.MeshStandardMaterial({ map: plasterT('#e7dcc3'), roughness: 0.95 }), sideM = new THREE.MeshStandardMaterial({ map: plasterT('#e1d2b2'), roughness: 0.95 });
    const W = ST.WIN, wl = W.x - W.w / 2, wr = W.x + W.w / 2, zb = -hd - 0.05;
    box(wl + hw, H, 0.1, wallM, (-hw + wl) / 2, H / 2, zb, S0); box(hw - wr, H, 0.1, wallM, (wr + hw) / 2, H / 2, zb, S0);
    box(W.w, W.y0, 0.1, wallM, W.x, W.y0 / 2, zb, S0); box(W.w, H - W.y1, 0.1, wallM, W.x, (H + W.y1) / 2, zb, S0);
    box(0.1, H, ST.D, sideM, -hw - 0.05, H / 2, 0, S0); box(0.1, H, ST.D, sideM, hw + 0.05, H / 2, 0, S0);
    box(ST.W + 0.2, 0.08, ST.D, mat('#f4efe4'), 0, H + 0.04, 0, S0, false);
    box(ST.W, 0.1, 0.02, mat('#7a5634'), 0, 0.05, -hd + 0.01, S0, false);
    // window frame, grille, glass; the view outside on a far plane (day or night texture)
    const fr = mat('#6b4324'); box(W.w + 0.1, 0.07, 0.12, fr, W.x, W.y0, -hd, S0); box(W.w + 0.1, 0.07, 0.12, fr, W.x, W.y1, -hd, S0);
    box(0.07, W.y1 - W.y0, 0.12, fr, wl, (W.y0 + W.y1) / 2, -hd, S0); box(0.07, W.y1 - W.y0, 0.12, fr, wr, (W.y0 + W.y1) / 2, -hd, S0); box(0.05, W.y1 - W.y0, 0.1, fr, W.x, (W.y0 + W.y1) / 2, -hd, S0);
    for (let x = wl + 0.11; x < wr - 0.05; x += 0.12) cyl(0.007, 0.007, W.y1 - W.y0, mat('#3b3f44', { metalness: 0.5 }), x, (W.y0 + W.y1) / 2, -hd + 0.05, S0, 6);
    const outside = (night) => canvasTex(1024, 768, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); if (night) { g.addColorStop(0, '#060b1e'); g.addColorStop(1, '#16203f'); } else { g.addColorStop(0, '#79b8ec'); g.addColorStop(1, '#d8ecfa'); } c.fillStyle = g; c.fillRect(0, 0, w, h);
      const r2 = (() => { let a = 5; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();
      for (let i = 0; i < 7; i++) { const bx = i * 150 - 20, bw = 120 + r2() * 40, bh = 300 + r2() * 300; c.fillStyle = night ? '#121a30' : ['#d9c2a6', '#cfdccc', '#e6cfc4', '#dcd6cb'][i % 4]; c.fillRect(bx, h - bh, bw, bh);
        for (let yy = h - bh + 24; yy < h - 20; yy += 46) for (let xx = bx + 14; xx < bx + bw - 24; xx += 34) { c.fillStyle = night ? (r2() < 0.12 ? '#ffd98a' : '#0b1124') : '#6f93a8'; c.fillRect(xx, yy, 18, 24); } }
      if (night) for (let i = 0; i < 40; i++) { c.fillStyle = `rgba(255,255,255,${0.3 + r2() * 0.5})`; c.fillRect(r2() * w, r2() * h * 0.4, 2, 2); } });
    const texDay = outside(false), texNight = outside(true);
    const outM = new THREE.MeshBasicMaterial({ map: texNight }), out = new THREE.Mesh(new THREE.PlaneGeometry(9, 6.75), outM); out.position.set(W.x, 2.2, -hd - 4); S0.add(out);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(W.w, W.y1 - W.y0), new THREE.MeshStandardMaterial({ color: '#cfe8f7', transparent: true, opacity: 0.18, roughness: 0.05 })); glass.position.set(W.x, (W.y0 + W.y1) / 2, -hd - 0.02); S0.add(glass);
    // curtains: two panels on a rod, each can close towards the middle (scale x)
    box(W.w + 0.7, 0.025, 0.025, mat('#4a3b2c'), W.x, W.y1 + 0.18, -hd + 0.14, S0, false);
    const curT = canvasTex(256, 512, (c, w, h) => { c.fillStyle = '#9c3b30'; c.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 16) { const g = c.createLinearGradient(x, 0, x + 16, 0); g.addColorStop(0, 'rgba(0,0,0,.18)'); g.addColorStop(0.5, 'rgba(255,255,255,.08)'); g.addColorStop(1, 'rgba(0,0,0,.18)'); c.fillStyle = g; c.fillRect(x, 0, 16, h); } });
    const curM = new THREE.MeshStandardMaterial({ map: curT, roughness: 1, side: THREE.DoubleSide });
    const curtains = [-1, 1].map(s => { const g = new THREE.Group(); g.position.set(s < 0 ? wl - 0.35 : wr + 0.35, 0, -hd + 0.14); S0.add(g); const p = new THREE.Mesh(new THREE.PlaneGeometry(1, W.y1 - W.y0 + 0.5), curM); p.position.set(-s * 0.5, (W.y0 + W.y1) / 2 - 0.05, 0); p.castShadow = true; g.add(p); return g; });
    // desk and chair
    const D = ST.DESK, topM = new THREE.MeshStandardMaterial({ map: woodT('#a0693a'), roughness: 0.55 }), legM = mat('#6f4625', { roughness: 0.7 });
    box(D.w, 0.035, D.d, topM, D.x, D.top - 0.0175, D.z, S0);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => box(0.045, D.top - 0.035, 0.045, legM, D.x + a * (D.w / 2 - 0.04), (D.top - 0.035) / 2, D.z + b * (D.d / 2 - 0.04), S0));
    box(D.w - 0.08, 0.1, 0.02, legM, D.x, D.top - 0.085, D.z - D.d / 2 + 0.03, S0);
    const chair = new THREE.Group(); chair.position.set(D.x - 0.1, 0, D.z + 0.62); S0.add(chair);
    box(0.44, 0.035, 0.42, topM, 0, 0.45, 0, chair); [[-0.19, -0.18], [0.19, -0.18]].forEach(([x, z]) => box(0.04, 0.45, 0.04, legM, x, 0.225, z, chair)); [[-0.19, 0.18], [0.19, 0.18]].forEach(([x, z]) => box(0.04, 0.95, 0.04, legM, x, 0.475, z, chair));
    box(0.42, 0.09, 0.025, topM, 0, 0.88, 0.18, chair);
    // the hanging bulb: cord from the ceiling, a green enamel shade, the bulb (glows when on), a point light
    const B = ST.BULB; cyl(0.004, 0.004, H - B.y - 0.08, mat('#222'), B.x, (H + B.y + 0.08) / 2, B.z, S0, 6);
    const shade = lathe([[0.02, 0.16], [0.03, 0.15], [0.09, 0.1], [0.17, 0.02], [0.175, 0.0], [0.168, 0.0], [0.163, 0.018], [0.085, 0.092], [0.026, 0.14], [0.012, 0.15]], new THREE.MeshStandardMaterial({ color: '#2f6e5a', roughness: 0.4, metalness: 0.2, side: THREE.DoubleSide }));
    shade.position.set(B.x, B.y - 0.05, B.z); S0.add(shade);
    const bulbM = new THREE.MeshStandardMaterial({ color: '#f4f1e6', emissive: '#ffe3a1', emissiveIntensity: 0, roughness: 0.2 });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.035, 24, 16), bulbM); bulb.position.set(B.x, B.y - 0.04, B.z); bulb.scale.y = 1.25; S0.add(bulb);
    const bulbGlow = sprite(glowTex('rgba(255,240,200,0.95)', 'rgba(255,220,150,0.35)', 'rgba(255,200,120,0)'), 0.28); bulbGlow.position.copy(bulb.position); S0.add(bulbGlow);
    const bulbL = new THREE.PointLight('#ffe7b8', 0, 9, 1.6); bulbL.position.set(B.x, B.y - 0.06, B.z); bulbL.castShadow = true; bulbL.shadow.mapSize.set(1024, 1024); bulbL.shadow.bias = -0.002; S0.add(bulbL);
    // things on the desk
    const T = D.top, book = new THREE.Group(); book.position.set(0.22, T, -1.42); book.rotation.y = 0.12; S0.add(book);
    const pageT = canvasTex(512, 360, (c, w, h) => { c.fillStyle = '#fbf8ef'; c.fillRect(0, 0, w, h); c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(w / 2 - 3, 0, 6, h);
      c.fillStyle = '#26221d'; for (let p = 0; p < 2; p++) for (let l = 0; l < 13; l++) { let x = 24 + p * (w / 2); while (x < (p + 1) * w / 2 - 40) { const ww = 12 + rnd() * 38; c.fillRect(x, 26 + l * 25, ww, 6); x += ww + 8; } } });
    const pageM = new THREE.MeshStandardMaterial({ map: pageT, roughness: 0.9 });
    box(0.34, 0.012, 0.24, mat('#7b2a22'), 0, 0.006, 0, book); { const q = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.012, 0.23), [mat('#f3ecd9'), mat('#f3ecd9'), pageM, mat('#f3ecd9'), mat('#f3ecd9'), mat('#f3ecd9')]); q.position.y = 0.018; q.castShadow = q.receiveShadow = true; book.add(q); }
    const khata = new THREE.Group(); khata.position.set(-0.17, T, -1.35); khata.rotation.y = -0.2; S0.add(khata); box(0.17, 0.008, 0.23, mat('#2f6fa8'), 0, 0.004, 0, khata);
    const pen = new THREE.Group(); pen.position.set(-0.02, T + 0.006, -1.22); pen.rotation.y = 0.7; S0.add(pen);
    { const q = cyl(0.0045, 0.0045, 0.14, mat('#1f5fa8', { roughness: 0.4 }), 0, 0, 0, pen, 12); q.rotation.z = Math.PI / 2; const c2 = cyl(0.0048, 0.0048, 0.04, mat('#e9ecef', { roughness: 0.3 }), -0.05, 0.0, 0, pen, 12); c2.rotation.z = Math.PI / 2; }
    const match = box(0.05, 0.016, 0.036, mat('#d8462f'), 0.78, T + 0.008, -1.32, S0); match.rotation.y = 0.3;
    const deskThings = [book, khata, pen, match];
    // food on the desk (2ক): a plate of rice, a ripe mango, a folded shirt on the chair
    const food = new THREE.Group(); S0.add(food);
    { const plate = lathe([[0, 0], [0.11, 0.0], [0.13, 0.018], [0.125, 0.02], [0.105, 0.006], [0, 0.006]], mat('#f2f2ee', { roughness: 0.25 })); plate.position.set(0.15, T, -1.4); food.add(plate);
      const riceT = canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#f7f4ea'; c.fillRect(0, 0, w, h); for (let i = 0; i < 2600; i++) { c.fillStyle = `rgba(${rnd() < 0.5 ? '210,200,180' : '255,255,255'},.8)`; c.save(); c.translate(rnd() * w, rnd() * h); c.rotate(rnd() * 3); c.fillRect(-4, -1.2, 8, 2.4); c.restore(); } });
      const rice = new THREE.Mesh(new THREE.SphereGeometry(0.075, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ map: riceT, roughness: 0.9 })); rice.scale.y = 0.55; rice.position.set(0.15, T + 0.006, -1.4); food.add(rice);
      // mango: fuller at the shoulder, a slight beak near the tip, green to yellow with a red-orange blush, a short stem
      const mg = new THREE.SphereGeometry(1, 48, 32), mp = mg.attributes.position;
      for (let i = 0; i < mp.count; i++) { let x = mp.getX(i), y = mp.getY(i), z = mp.getZ(i); const sh = 1 + 0.18 * Math.max(0, y) - 0.12 * Math.max(0, -y) ** 2; x *= sh; z *= sh * 0.86; if (y < -0.55) x += 0.22 * (-0.55 - y) ** 1.2; mp.setXYZ(i, x * 0.045, y * 0.068, z * 0.045); }
      mg.computeVertexNormals();
      const mT = canvasTex(256, 256, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#5f8f2e'); g.addColorStop(0.35, '#b9b335'); g.addColorStop(0.7, '#f2b227'); g.addColorStop(1, '#f09a22'); c.fillStyle = g; c.fillRect(0, 0, w, h);
        const r = c.createRadialGradient(w * 0.3, h * 0.45, 4, w * 0.3, h * 0.45, w * 0.45); r.addColorStop(0, 'rgba(214,70,40,.75)'); r.addColorStop(1, 'rgba(214,70,40,0)'); c.fillStyle = r; c.fillRect(0, 0, w, h);
        for (let i = 0; i < 260; i++) { c.fillStyle = 'rgba(255,240,190,.45)'; c.fillRect(rnd() * w, rnd() * h, 1.5, 1.5); } });
      const mango = new THREE.Mesh(mg, new THREE.MeshStandardMaterial({ map: mT, roughness: 0.45 })); mango.rotation.z = Math.PI / 2 - 0.25; mango.position.set(0.5, T + 0.045, -1.38); mango.castShadow = true; food.add(mango);
      const stem = cyl(0.003, 0.004, 0.018, mat('#5a3d1e'), 0, 0, 0, food, 8); stem.rotation.z = Math.PI / 2 - 0.25; stem.position.set(0.5 - 0.075, T + 0.064, -1.38);
      const shirt = box(0.36, 0.035, 0.3, mat('#e9eef5', { roughness: 0.95 }), D.x - 0.1, 0.49, D.z + 0.6, food); shirt.rotation.y = 0.15;
      box(0.12, 0.012, 0.05, mat('#dfe6ef'), D.x - 0.1, 0.512, D.z + 0.48, food); }
    // fig 9.2: a cricket ball on the desk (red leather, white seam)
    const ballT = canvasTex(256, 128, (c, w, h) => { c.fillStyle = '#a3161a'; c.fillRect(0, 0, w, h); for (let i = 0; i < 400; i++) { c.fillStyle = `rgba(0,0,0,${0.05 + rnd() * 0.08})`; c.fillRect(rnd() * w, rnd() * h, 2, 2); } c.strokeStyle = '#f3ece0'; c.lineWidth = 3; [0, 6].forEach(d => { c.beginPath(); c.moveTo(0, h / 2 + d - 3); c.lineTo(w, h / 2 + d - 3); c.stroke(); }); c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 1; for (let x = 0; x < w; x += 6) { c.beginPath(); c.moveTo(x, h / 2 - 8); c.lineTo(x + 3, h / 2 - 4); c.moveTo(x, h / 2 + 8); c.lineTo(x + 3, h / 2 + 4); c.stroke(); } });
    const ball = new THREE.Mesh(new THREE.SphereGeometry(ST.BALL.r, 36, 24), new THREE.MeshStandardMaterial({ map: ballT, roughness: 0.45 })); ball.rotation.z = 0.5; ball.position.set(ST.BALL.x, T + ST.BALL.r, ST.BALL.z); ball.castShadow = true; S0.add(ball);
    // the shoebox (fig 9.3), lined with black paper: a lid with a small hole, a large hole in the wall facing the window (-x),
    // a pebble under the lid hole; the wall towards the camera (+z) can be made see-through to show the inside
    const BX = ST.BOX, sb = new THREE.Group(); sb.position.set(BX.x, T, BX.z); sb.rotation.y = -Math.PI / 2; S0.add(sb);   // turned so the side with the big hole faces the window (-z); the see-through wall then faces -x
    const card = new THREE.MeshStandardMaterial({ color: '#c9a777', roughness: 0.9 }), blackM = mat('#111111', { roughness: 1 });
    const wallP = (w, h, holeR, hy) => { const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h); s.lineTo(-w / 2, h); s.closePath(); if (holeR) { const p = new THREE.Path(); p.absarc(0, hy, holeR, 0, Math.PI * 2, true); s.holes.push(p); } return new THREE.ExtrudeGeometry(s, { depth: 0.003, bevelEnabled: false, curveSegments: 40 }); };
    const L = BX.L, Wd = BX.W, Hh = BX.H;
    const bottom = box(L, 0.004, Wd, card, 0, 0.002, 0, sb);
    const wBack = new THREE.Mesh(wallP(L, Hh), [blackM, card]); wBack.position.set(0, 0, -Wd / 2); sb.add(wBack);
    const frontM = new THREE.MeshStandardMaterial({ color: '#c9a777', roughness: 0.9, transparent: true, opacity: 1 });
    const wFront = new THREE.Mesh(wallP(L, Hh), [frontM, frontM]); wFront.position.set(0, 0, Wd / 2 - 0.003); sb.add(wFront);
    const wSide = new THREE.Mesh(wallP(Wd, Hh, BX.HOLE_SIDE, Hh * 0.55), [card, card]); wSide.rotation.y = Math.PI / 2; wSide.position.set(-L / 2, 0, 0); sb.add(wSide);   // the side with the big hole faces -x (the window)
    const wSide2 = new THREE.Mesh(wallP(Wd, Hh), [card, card]); wSide2.rotation.y = Math.PI / 2; wSide2.position.set(L / 2 - 0.003, 0, 0); sb.add(wSide2);
    box(L - 0.01, 0.001, Wd - 0.01, blackM, 0, 0.0045, 0, sb, false);
    const lidS = new THREE.Shape(); lidS.moveTo(-L / 2 - 0.004, -Wd / 2 - 0.004); lidS.lineTo(L / 2 + 0.004, -Wd / 2 - 0.004); lidS.lineTo(L / 2 + 0.004, Wd / 2 + 0.004); lidS.lineTo(-L / 2 - 0.004, Wd / 2 + 0.004); lidS.closePath();
    { const p = new THREE.Path(); p.absarc(0, 0, BX.HOLE_TOP, 0, Math.PI * 2, true); lidS.holes.push(p); }
    const lid = new THREE.Mesh(new THREE.ExtrudeGeometry(lidS, { depth: 0.003, bevelEnabled: false, curveSegments: 32 }), [mat('#b99366', { roughness: 0.9 }), mat('#a88457')]); lid.rotation.x = -Math.PI / 2; lid.position.y = Hh; lid.castShadow = true; sb.add(lid);
    const tape = box(0.04, 0.04, 0.002, blackM, 0, 0, 0, sb, false); tape.rotation.y = Math.PI / 2; tape.position.set(-L / 2 - 0.0025, Hh * 0.55, 0);
    const pg = new THREE.SphereGeometry(1, 40, 28), pp = pg.attributes.position; for (let i = 0; i < pp.count; i++) { const b = 1 + 0.08 * Math.sin(3 * pp.getX(i) + 1) * Math.cos(2.5 * pp.getZ(i)) + 0.05 * Math.sin(5 * pp.getY(i)); pp.setXYZ(i, pp.getX(i) * b * 0.024, Math.max(pp.getY(i), -0.7) * b * 0.014, pp.getZ(i) * b * 0.019); } pg.computeVertexNormals();
    const pebble = new THREE.Mesh(pg, mat('#9b948a', { roughness: 0.8 })); pebble.position.set(0, 0.0045 + 0.0098, 0); pebble.castShadow = true; sb.add(pebble);
    // the torch, the small mirror on a stand and a sheet of paper (9গ)
    const tor = new THREE.Group(); S0.add(tor);
    { const body = cyl(0.016, 0.016, 0.16, mat('#2b2f36', { roughness: 0.4, metalness: 0.3 }), 0, 0, 0, tor, 20); body.rotation.z = Math.PI / 2; const hd2 = cyl(0.026, 0.017, 0.05, mat('#c9ced2', { metalness: 0.8, roughness: 0.25 }), 0.105, 0, 0, tor, 24); hd2.rotation.z = -Math.PI / 2;
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.024, 24), new THREE.MeshBasicMaterial({ color: '#fffbe6' })); lens.rotation.y = Math.PI / 2; lens.position.x = 0.1305; tor.add(lens); box(0.02, 0.006, 0.012, mat('#c0392b'), 0, 0.017, 0, tor, false); }
    const torL = new THREE.SpotLight('#fff4d6', 0, 6, 7 * Math.PI / 180, 0.35, 1.2); torL.position.set(0.13, 0, 0); tor.add(torL); const torT = new THREE.Object3D(); torT.position.set(1, 0, 0); tor.add(torT); torL.target = torT; torL.castShadow = true; torL.shadow.mapSize.set(1024, 1024);
    const mir = new THREE.Group(); S0.add(mir);
    { box(0.004, 0.13, 0.16, mat('#5d4a32'), -0.003, 0.0, 0, mir); const gl = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.12), new THREE.MeshStandardMaterial({ color: '#dfe9ee', roughness: 0.02, metalness: 1 })); gl.rotation.y = Math.PI / 2; gl.position.x = 0.0005; mir.add(gl); box(0.05, 0.01, 0.06, mat('#5d4a32'), -0.02, -0.07, 0, mir); }
    const paper = new THREE.Group(); S0.add(paper);
    { const q = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.13), new THREE.MeshStandardMaterial({ color: '#f7f5ee', roughness: 1, side: THREE.DoubleSide })); q.rotation.y = Math.PI / 2; paper.add(q); box(0.05, 0.01, 0.06, mat('#5d4a32'), -0.02, -0.07, 0, paper); }
    const spot = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshBasicMaterial({ map: glowTex('rgba(255,250,225,0.95)', 'rgba(255,240,200,0.55)', 'rgba(255,230,180,0)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); S0.add(spot);
    const stCandle = mkCandle(S0, 0.135, 0.11, 0.013); stCandle.G.position.set(ST.CANDLE.x, T, ST.CANDLE.z);
    Object.assign(stParts, { outM, texDay, texNight, curtains, bulbM, bulbGlow, bulbL, deskThings, food, ball, sb, frontM, tape, lid, pebble, tor, torL, mir, paper, spot, stCandle, chair });
  }

  /* ======================= ROOF ======================= */
  const RG = new THREE.Group(); RG.position.set(RF.X, 0, 0); scene.add(RG);
  const rfParts = {};
  {
    const concT = canvasTex(512, 512, c => { c.fillStyle = '#9c968c'; c.fillRect(0, 0, 512, 512); for (let i = 0; i < 4000; i++) { c.fillStyle = `rgba(${rnd() < 0.5 ? '60,55,50' : '200,195,185'},${0.05 + rnd() * 0.1})`; c.fillRect(rnd() * 512, rnd() * 512, 2 + rnd() * 4, 2 + rnd() * 4); } c.strokeStyle = 'rgba(60,55,50,.35)'; c.lineWidth = 2; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(rnd() * 512, rnd() * 512); for (let j = 0; j < 5; j++) c.lineTo(rnd() * 512, rnd() * 512); c.stroke(); } });
    concT.wrapS = concT.wrapT = THREE.RepeatWrapping; concT.repeat.set(3, 3);
    flatQ(14, 12, new THREE.MeshStandardMaterial({ map: concT, roughness: 0.95 }), RG).position.set(0, 0.001, 2);
    const parM = mat('#b9b0a2', { roughness: 0.95 }); box(14, 0.9, 0.18, parM, 0, 0.45, -4, RG); box(0.18, 0.9, 12, parM, -7, 0.45, 2, RG); box(0.18, 0.9, 12, parM, 7, 0.45, 2, RG);
    // the puddle: a thin sheet of still water; the sun's reflection is placed where the mirror rule puts it (frameV3)
    const pud = new THREE.Shape(); for (let i = 0; i <= 64; i++) { const a = i / 64 * Math.PI * 2, r = 1 + 0.12 * Math.sin(3 * a) + 0.07 * Math.sin(5 * a + 1); pud.lineTo(RF.PUD.rx * r * Math.cos(a), RF.PUD.rz * r * Math.sin(a)); }
    const pudM = new THREE.MeshStandardMaterial({ color: '#3d4655', roughness: 0.08, metalness: 0.6, transparent: true, opacity: 0.92 }), puddle = new THREE.Mesh(new THREE.ShapeGeometry(pud, 64), pudM); puddle.rotation.x = -Math.PI / 2; puddle.position.set(RF.PUD.x, 0.006, RF.PUD.z); RG.add(puddle);
    const refl = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: glowTex('rgba(255,236,190,1)', 'rgba(255,190,110,0.55)', 'rgba(255,150,70,0)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); refl.rotation.x = -Math.PI / 2; refl.position.y = 0.008; RG.add(refl);
    const skyRefl = new THREE.Mesh(new THREE.ShapeGeometry(pud, 64), new THREE.MeshBasicMaterial({ color: '#e7a978', transparent: true, opacity: 0.35, depthWrite: false })); skyRefl.rotation.x = -Math.PI / 2; skyRefl.position.set(RF.PUD.x, 0.007, RF.PUD.z); RG.add(skyRefl);
    // the city beyond the parapet (west, -z): rows of houses with windows, a mobile tower, an electricity pole with wires
    const bT = (night) => canvasTex(256, 256, (c, w, h) => { c.fillStyle = night ? '#1a2238' : '#8a7f73'; c.fillRect(0, 0, w, h); for (let y = 16; y < h - 10; y += 40) for (let x = 14; x < w - 20; x += 36) { c.fillStyle = night ? (rnd() < 0.15 ? '#ffd98a' : '#0f1528') : 'rgba(40,45,55,.55)'; c.fillRect(x, y, 18, 22); } });
    const bDay = new THREE.MeshStandardMaterial({ map: bT(false), roughness: 1 }), bNight = new THREE.MeshStandardMaterial({ map: bT(true), roughness: 1, emissive: '#ffffff', emissiveMap: bT(true), emissiveIntensity: 0.6 });
    const houses = []; for (let i = 0; i < 26; i++) { const w = 7 + rnd() * 9, h = 4 + rnd() * 9, x = -110 + i * 9 + rnd() * 4, z = -45 - rnd() * 40; const q = box(w, h, 8, bDay, x, h / 2 - 6, z, RG); houses.push(q); }   // the far side of the city: low against the sky, tops 0..7 m above this roof
    const towerM = mat('#5d6168', { metalness: 0.5, roughness: 0.5 }), tower = new THREE.Group(); tower.position.set(10, -6, -70); RG.add(tower);
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + Math.PI / 4, l = cyl(0.12, 0.12, 30, towerM, 0, 0, 0, tower, 6); l.position.set(1.4 * Math.cos(a) * 0.6, 15, 1.4 * Math.sin(a) * 0.6); l.rotation.set(Math.sin(a) * 0.05, 0, -Math.cos(a) * 0.05); }
    for (let y = 2; y < 30; y += 3) box(2.0 - y * 0.03, 0.08, 2.0 - y * 0.03, towerM, 0, y, 0, tower, false);
    [0, 1, 2].forEach(i => box(0.4, 1.4, 0.15, mat('#d9dde0'), Math.cos(i * 2.1) * 0.9, 28, Math.sin(i * 2.1) * 0.9, tower, false));
    const pole = cyl(0.1, 0.14, 9, mat('#6b5d4f'), -4.5, 1.5, -7, RG, 8); box(1.6, 0.08, 0.08, mat('#4a4038'), -4.5, 5.6, -7, RG, false);
    [-0.7, 0, 0.7].forEach(dz => { const wire = cyl(0.008, 0.008, 40, mat('#222'), -4.5 + 0, 5.7, -7 + dz * 0.01, RG, 4); wire.rotation.z = Math.PI / 2; wire.position.x = -4.5 + 5 + dz * 0; });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(4.2, 32, 20), new THREE.MeshBasicMaterial({ color: '#fff1c8' })); RG.add(sun);
    const sunGlow = sprite(glowTex('rgba(255,236,190,0.95)', 'rgba(255,180,100,0.4)', 'rgba(255,150,80,0)'), 70); RG.add(sunGlow);
    const moonT = canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#e8e6dc'; c.beginPath(); c.arc(w / 2, h / 2, w / 2 - 2, 0, 7); c.fill(); for (let i = 0; i < 18; i++) { c.fillStyle = `rgba(120,118,110,${0.15 + rnd() * 0.2})`; c.beginPath(); c.arc(40 + rnd() * 176, 40 + rnd() * 176, 6 + rnd() * 22, 0, 7); c.fill(); } });
    const moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: moonT, transparent: true })); moon.scale.set(13, 13, 1); RG.add(moon);
    const moonGlow = sprite(glowTex('rgba(220,230,255,0.6)', 'rgba(180,200,255,0.18)', 'rgba(150,170,255,0)'), 30); RG.add(moonGlow);
    Object.assign(rfParts, { pudM, refl, skyRefl, houses, bDay, bNight, sun, sunGlow, moon, moonGlow });
  }

  /* ======================= TIN house ======================= */
  const TG = new THREE.Group(); TG.position.set(TN.X, 0, 0); scene.add(TG);
  const tnParts = {};
  {
    const I = TN.IN, matT = canvasTex(512, 256, c => { c.fillStyle = '#c9a66b'; c.fillRect(0, 0, 512, 256); c.strokeStyle = 'rgba(90,60,25,.38)'; c.lineWidth = 3; for (let i = 0; i < 512; i += 12) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i, 256); c.stroke(); } for (let j = 0; j < 256; j += 12) { c.beginPath(); c.moveTo(0, j); c.lineTo(512, j); c.stroke(); } });
    matT.wrapS = matT.wrapT = THREE.RepeatWrapping; matT.repeat.set(3, 1.5);
    const matM = new THREE.MeshStandardMaterial({ map: matT, roughness: 1, side: THREE.DoubleSide });
    const earthT = canvasTex(512, 512, c => { c.fillStyle = '#a8865a'; c.fillRect(0, 0, 512, 512); for (let i = 0; i < 3000; i++) { c.fillStyle = `rgba(${rnd() < 0.5 ? '90,65,35' : '200,170,120'},${0.05 + rnd() * 0.1})`; c.fillRect(rnd() * 512, rnd() * 512, 2 + rnd() * 5, 2 + rnd() * 5); } });
    earthT.wrapS = earthT.wrapT = THREE.RepeatWrapping; earthT.repeat.set(4, 4);
    flatQ(40, 30, new THREE.MeshStandardMaterial({ map: earthT, roughness: 1 }), TG).position.set(0, 0.001, 4);
    // the house: walls of bamboo mat (inside x -2.5..2.5, z -2..2), door and window in the front wall (+z), gable tin roof
    const hw = I.w / 2, hd = I.d / 2, Hh = I.h;
    box(I.w, Hh, 0.06, matM, 0, Hh / 2, -hd, TG); box(0.06, Hh, I.d, matM, -hw, Hh / 2, 0, TG); box(0.06, Hh, I.d, matM, hw, Hh / 2, 0, TG);
    box(1.4, Hh, 0.06, matM, -hw + 0.7, Hh / 2, hd, TG); box(1.0, Hh, 0.06, matM, 0.2, Hh / 2, hd, TG); box(1.2, Hh, 0.06, matM, hw - 0.6, Hh / 2, hd, TG);
    box(1.2, 0.3, 0.06, matM, -0.9 + 0.0, Hh - 0.15, hd, TG); box(1.0, 0.9, 0.06, matM, 1.3, 0.45, hd, TG); box(1.0, 0.6, 0.06, matM, 1.3, Hh - 0.3, hd, TG);   // door gap x -1.5..-0.3, window gap x 0.8..1.8 (y 0.9..1.8)
    for (let i = 0; i < 4; i++) box(0.03, 0.9, 0.04, mat('#5a3a1f'), 0.9 + i * 0.27, 1.35, hd, TG, false);
    const gs = new THREE.Shape(); gs.moveTo(-hd - 0.3, 0); gs.lineTo(hd + 0.3, 0); gs.lineTo(0, I.ridge - Hh); gs.closePath();
    [-hw, hw].forEach(x => { const m = new THREE.Mesh(new THREE.ShapeGeometry(gs), matM); m.rotation.y = Math.PI / 2; m.position.set(x, Hh, 0); TG.add(m); });
    const tinT = canvasTex(256, 64, c => { for (let i = 0; i < 256; i++) { const q = 0.5 + 0.5 * Math.sin(i / 256 * Math.PI * 40); c.fillStyle = `rgb(${120 + 60 * q},${130 + 60 * q},${138 + 60 * q})`; c.fillRect(i, 0, 1, 64); } }); tinT.wrapS = tinT.wrapT = THREE.RepeatWrapping; tinT.repeat.set(1, 4);
    const tinM = new THREE.MeshStandardMaterial({ map: tinT, roughness: 0.5, metalness: 0.4, side: THREE.DoubleSide });
    const slope = Math.atan2(I.ridge - Hh, hd + 0.3), sl = Math.hypot(I.ridge - Hh, hd + 0.3);
    // back slope (z < 0) carries the small hole: built from a shape with a hole; the front slope is plain
    const roofShape = (withHole) => { const s = new THREE.Shape(); s.moveTo(-hw - 0.4, 0); s.lineTo(hw + 0.4, 0); s.lineTo(hw + 0.4, sl); s.lineTo(-hw - 0.4, sl); s.closePath();
      if (withHole) { const p = new THREE.Path(); p.absarc(TN.HOLE.x, sl * 0.55, 0.025, 0, Math.PI * 2, true); s.holes.push(p); } return new THREE.ShapeGeometry(s, 24); };
    // each slope runs from its eave up to the ridge: the back one towards +z, the front one towards -z
    const back = new THREE.Mesh(roofShape(true), tinM); back.rotation.x = Math.PI / 2 - slope; back.position.set(0, Hh, -hd - 0.3); back.castShadow = true; back.receiveShadow = true; TG.add(back);
    const front = new THREE.Mesh(roofShape(false), tinM); front.rotation.x = -(Math.PI / 2 - slope); front.position.set(0, Hh, hd + 0.3); front.castShadow = true; TG.add(front);
    TN.HOLE_P = [TN.X + TN.HOLE.x, Hh + sl * 0.55 * Math.sin(slope), -hd - 0.3 + sl * 0.55 * Math.cos(slope)];
    // inside: a mat bed (chouki), a kolshi, a rope with a gamchha; the sunbeam (a lit cylinder with dust) and its spot on the floor
    box(1.8, 0.45, 1.0, mat('#7a4f2a'), 1.5, 0.225, -1.4, TG); box(1.8, 0.03, 1.0, matM, 1.5, 0.465, -1.4, TG);
    const kol = lathe([[0, 0], [0.16, 0.02], [0.27, 0.12], [0.3, 0.26], [0.27, 0.4], [0.16, 0.5], [0.09, 0.54], [0.09, 0.6], [0.13, 0.63]], mat('#a65a22', { roughness: 0.8 })); kol.position.set(-1.9, 0, -1.5); TG.add(kol);
    const beamM = new THREE.MeshBasicMaterial({ color: '#fff3c4', transparent: true, opacity: 0.38, depthWrite: false, blending: THREE.AdditiveBlending });
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1, 20, 1, true), beamM); scene.add(beam);
    const fspot = new THREE.Mesh(new THREE.CircleGeometry(1, 40), new THREE.MeshBasicMaterial({ map: glowTex('rgba(255,248,215,1)', 'rgba(255,236,180,0.8)', 'rgba(255,230,170,0)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); fspot.rotation.x = -Math.PI / 2; scene.add(fspot);
    const dust = []; for (let i = 0; i < 70; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.0035, 6, 4), new THREE.MeshBasicMaterial({ color: '#fff8dc' })); scene.add(d); dust.push({ m: d, u: rnd(), r: rnd() * 0.022, a: rnd() * 6.28, s: 0.02 + rnd() * 0.04 }); }
    const inLight = new THREE.PointLight('#fff3d0', 0, 5, 1.5); scene.add(inLight);
    // outside: solar panel on the front slope (tilted to the sky), cable down the wall into the window, a bulb inside the window
    const panel = new THREE.Group(); TG.add(panel);
    { const cellT = canvasTex(512, 320, (c, w, h) => { c.fillStyle = '#c9ced2'; c.fillRect(0, 0, w, h); for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) { const g = c.createLinearGradient(0, 0, 0, 70); g.addColorStop(0, '#1d3a6e'); g.addColorStop(1, '#122650'); c.fillStyle = g; c.fillRect(8 + i * 84, 8 + j * 77, 78, 71); c.strokeStyle = 'rgba(200,215,240,.35)'; c.lineWidth = 1; for (let k = 1; k < 3; k++) { c.beginPath(); c.moveTo(8 + i * 84 + k * 26, 8 + j * 77); c.lineTo(8 + i * 84 + k * 26, 79 + j * 77); c.stroke(); } } });
      const p = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.75), [mat('#9aa3a8'), mat('#9aa3a8'), new THREE.MeshStandardMaterial({ map: cellT, roughness: 0.2, metalness: 0.5 }), mat('#555'), mat('#9aa3a8'), mat('#9aa3a8')]); p.castShadow = true; panel.add(p); }
    panel.rotation.x = slope; panel.position.set(TN.PANEL.x, Hh + sl * 0.5 * Math.sin(slope) + 0.06, hd + 0.3 - sl * 0.5 * Math.cos(slope));
    const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(TN.PANEL.x + 0.5, Hh + 0.3, hd + 0.2), new THREE.Vector3(TN.PANEL.x + 0.55, Hh - 0.1, hd + 0.08), new THREE.Vector3(TN.PANEL.x + 0.55, 1.85, hd + 0.05), new THREE.Vector3(1.75, 1.75, hd + 0.04)]), 30, 0.008, 6), mat('#111')); TG.add(cable);
    const inBulbM = new THREE.MeshStandardMaterial({ color: '#f4f1e6', emissive: '#fff0b0', emissiveIntensity: 0 }), inBulb = new THREE.Mesh(new THREE.SphereGeometry(0.04, 20, 14), inBulbM); inBulb.position.set(1.3, 1.65, hd - 0.4); TG.add(inBulb);
    const inBulbGlow = sprite(glowTex('rgba(255,244,200,0.95)', 'rgba(255,225,150,0.4)', 'rgba(255,210,120,0)'), 0.5); inBulbGlow.position.copy(inBulb.position); TG.add(inBulbGlow);
    const inBulbL = new THREE.PointLight('#fff0c0', 0, 5, 1.6); inBulbL.position.copy(inBulb.position); TG.add(inBulbL);
    // yard: clothesline (two bamboo poles) with a white shirt, an open black umbrella on the ground
    const bam = mat('#b08948'), yard = new THREE.Group(); TG.add(yard);
    cyl(0.04, 0.04, 2.1, bam, -2.2, 1.05, 4.2, yard, 10); cyl(0.04, 0.04, 2.1, bam, 1.4, 1.05, 4.2, yard, 10); box(3.6, 0.01, 0.01, mat('#4a3b2c'), -0.4, 2.0, 4.2, yard, false);
    const shirtS = new THREE.Shape(); [[-0.3, 0], [-0.08, 0], [0, -0.05], [0.08, 0], [0.3, 0], [0.48, -0.2], [0.36, -0.3], [0.24, -0.18], [0.24, -0.72], [-0.24, -0.72], [-0.24, -0.18], [-0.36, -0.3], [-0.48, -0.2]].forEach(([x, y], i) => i ? shirtS.lineTo(x, y) : shirtS.moveTo(x, y));
    const shirtW = new THREE.Mesh(new THREE.ShapeGeometry(shirtS), new THREE.MeshStandardMaterial({ color: '#f6f7f8', roughness: 1, side: THREE.DoubleSide })); shirtW.position.set(-1.2, 1.99, 4.2); shirtW.castShadow = true; yard.add(shirtW);
    const umb = new THREE.Group(); umb.position.set(0.6, 0, 3.7); yard.add(umb);
    { const can = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.28, 8, 1, true), new THREE.MeshStandardMaterial({ color: '#141414', roughness: 0.85, side: THREE.DoubleSide })); can.position.y = 0.95; can.castShadow = true; umb.add(can);
      cyl(0.008, 0.008, 0.95, mat('#2a2a2a'), 0, 0.5, 0, umb, 6); const hd3 = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.01, 8, 16, Math.PI), mat('#6b4324')); hd3.position.set(0.05, 0.05, 0); umb.add(hd3); umb.rotation.z = 0.15; }
    Object.assign(tnParts, { beam, beamM, fspot, dust, inLight, panel, inBulbM, inBulbGlow, inBulbL, yard });
  }

  /* ======================= STAIR ======================= */
  const SG = new THREE.Group(); SG.position.set(SR.X, 0, 0); scene.add(SG);
  const srParts = {};
  {
    const wallM = new THREE.MeshStandardMaterial({ map: plasterT('#dcd3c0'), roughness: 0.95 }), stepM = mat('#a8a39a', { roughness: 0.8 }), nose = mat('#8c877e');
    flatQ(8, 4, mat('#b3ada3', { roughness: 0.85 }), SG).position.set(0, 0.001, 0);
    for (let i = 0; i < 9; i++) { box(SR.STEP_D, SR.STEP_H * (i + 1), 1.2, stepM, -1.2 - i * SR.STEP_D, SR.STEP_H * (i + 1) / 2, -0.6, SG); box(SR.STEP_D, 0.02, 1.2, nose, -1.2 - i * SR.STEP_D, SR.STEP_H * (i + 1) + 0.01, -0.6, SG, false); }
    box(8, 3.4, 0.1, wallM, 0, 1.7, -1.25, SG); box(0.1, 3.4, 4, wallM, 3.2, 1.7, 0, SG); box(0.1, 3.4, 4, wallM, -4.2, 1.7, 0, SG);
    box(0.04, 0.9, 0.04, mat('#3b3f44', { metalness: 0.6 }), -1.2, 0.62, 0.02, SG); const rail = box(2.8, 0.04, 0.04, mat('#3b3f44', { metalness: 0.6 }), -2.4, 1.3, 0.02, SG); rail.rotation.z = -Math.atan2(SR.STEP_H, SR.STEP_D);   // rises towards -x, with the stairs
    const door = box(0.9, 2.05, 0.05, mat('#6b4324'), 1.6, 1.03, -1.2, SG); void door; box(0.07, 0.07, 0.03, mat('#c9a24a', { metalness: 0.8 }), 1.95, 1.0, -1.17, SG, false);
    /* a small wooden stool (tool) for the torch to lie on */
    { const st = new THREE.Group(); st.position.set(SR.TORCH.x, 0, SR.TORCH.z); SG.add(st); const sw = mat('#8a5a30', { roughness: 0.7 }); box(0.36, 0.03, 0.3, sw, 0, SR.STOOL - 0.015, 0, st); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => box(0.03, SR.STOOL - 0.03, 0.03, sw, a * 0.15, (SR.STOOL - 0.03) / 2, b * 0.12, st)); }
    const tor = new THREE.Group(); SG.add(tor);
    { const body = cyl(0.02, 0.02, 0.18, mat('#c0392b', { roughness: 0.4 }), 0, 0, 0, tor, 20); body.rotation.z = Math.PI / 2; const hd2 = cyl(0.032, 0.021, 0.055, mat('#c9ced2', { metalness: 0.8, roughness: 0.25 }), 0.117, 0, 0, tor, 24); hd2.rotation.z = -Math.PI / 2;
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.03, 24), new THREE.MeshBasicMaterial({ color: '#fffbe6' })); lens.rotation.y = Math.PI / 2; lens.position.x = 0.1452; tor.add(lens); }
    const torL = new THREE.SpotLight('#fff4d6', 0, 8, SR.HALF * Math.PI / 180, 0.3, 1.0); torL.position.set(0.146, 0, 0); tor.add(torL); const tt = new THREE.Object3D(); tt.position.set(1, 0, 0); tor.add(tt); torL.target = tt;
    const beamM = new THREE.MeshBasicMaterial({ color: '#fff6d6', transparent: true, opacity: 0.1, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 1, 1, 32, 1, true), beamM); scene.add(beam);
    const wspot = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshBasicMaterial({ map: glowTex('rgba(255,250,225,0.95)', 'rgba(255,240,200,0.7)', 'rgba(255,230,180,0)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); scene.add(wspot);
    Object.assign(srParts, { tor, torL, beam, wspot });
  }

  /* ======================= night road: a car with headlights on the zones3 village path ======================= */
  const car = mkCar('#e9ecef'); scene.add(car); car.visible = false;
  const heads = [-1, 1].map(s => { const L = new THREE.SpotLight('#fff6dc', 0, 45, 10 * Math.PI / 180, 0.35, 1.2); L.position.set(2.2, 0.68, s * 0.6); car.add(L); const T = new THREE.Object3D(); T.position.set(12, 0, s * 0.6); car.add(T); L.target = T;
    const lamp = new THREE.Mesh(new THREE.CircleGeometry(0.08, 20), new THREE.MeshBasicMaterial({ color: '#fffbe6' })); lamp.rotation.y = Math.PI / 2; lamp.position.set(2.235, 0.68, s * 0.6); car.add(lamp);
    const gl = sprite(glowT, 0.9, '#fff3d6'); gl.position.set(2.3, 0.68, s * 0.6); car.add(gl);
    const bm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 2.1, 12, 24, 1, true), new THREE.MeshBasicMaterial({ color: '#fff6d6', transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })); bm.rotation.z = -Math.PI / 2 - 0.035; bm.position.set(2.25 + 6, 0.68 - 0.21, s * 0.6); car.add(bm);
    return { L, gl, bm }; });

  /* 3D light paths: up to 6 tubes with a bright head, each {a:[x,y,z], b:[x,y,z], r, c} */
  const tubes = [], rayHead = [];
  for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 14), new THREE.MeshBasicMaterial({ color: '#FFC83D' })); m.visible = false; scene.add(m); tubes.push(m);
    const h = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), new THREE.MeshBasicMaterial({ color: '#fff6d2' })); h.visible = false; scene.add(h); rayHead.push(h); }

  V9 = { lights, scene, sky0, skies, E, covers, geoHole, geoPlain, pin, expCandle, setCandle, S0, st: stParts, RG, rf: rfParts, TG, tn: tnParts, SG, sr: srParts, car, heads, tubes, rayHead };
};

/* a point given in the shoebox's own frame (metres; x along its length, the big side hole at x = -L/2, y up from its floor) */
function boxW(x, y, z) { if (!V9) W3.frame({ cam: { pos: [0, 2, 5], look: [0, 0, 0], fov: 40 } });   // the world is built on the first frame
  const v = new THREE.Vector3(x, y, z); V9.st.sb.updateMatrixWorld(true); return V9.st.sb.localToWorld(v).toArray(); }

/* light path tubes: o.rays = [{a, b, r, c, head}] in world coordinates; o.ray = {a, b} along the fig 9.1 line (positions) */
function _tubes(o) {
  const list = (o.rays || []).slice(); if (o.ray && Math.abs(o.ray.b - o.ray.a) > 1e-4) list.push({ a: expPt(o.ray.a), b: expPt(o.ray.b), r: o.ray.r || 0.0018, head: true });
  V9.tubes.forEach((m, i) => { const q = list[i]; m.visible = !!q; V9.rayHead[i].visible = !!q && q.head !== false; if (!q) return;
    const a = new THREE.Vector3(...q.a), b = new THREE.Vector3(...q.b), d = b.clone().sub(a), len = d.length(), r = q.r || 0.0018; if (len < 1e-5) { m.visible = V9.rayHead[i].visible = false; return; }
    m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); m.scale.set(r, len, r); m.material.color.set(q.c || '#FFC83D');
    V9.rayHead[i].position.copy(b); V9.rayHead[i].scale.setScalar(r * 2.4); });
}

frameV3 = function (o) {
  _f9(o);
  const L = V9.lights, d = cl(o.dim || 0), t = o.t || 0;
  if (L.sun) L.sun.intensity = L.sunI * (1 - 0.92 * d) * (o.sunK === undefined ? 1 : o.sunK);
  if (L.hemi) L.hemi.intensity = L.hemiI * (1 - 0.85 * d);
  if (o.sunDir && L.sun) { const lx = Math.round(o.cam.look[0]); L.sun.position.set(lx + o.sunDir[0], o.sunDir[1], o.sunDir[2]); L.sun.target.position.set(lx, 0, 0); L.sun.target.updateMatrixWorld(); }
  V9.scene.background = o.bg === 'night' ? V9.skies.night : o.bg === 'sunset' ? V9.skies.sunset : o.bg ? new THREE.Color(o.bg) : V9.sky0;
  _tubes(o);
  /* EXP: o.exp = {shift:[...], lit, glow, pinY (m above the stack; undefined = no pin), stack (0..1: covers lying in a stack -> standing)} */
  const e = o.exp; V9.E.visible = !!e; V9.expCandle.fl.visible = !!e;
  if (e) {
    V9.covers.forEach((g, i) => { const st = e.stack === undefined ? 1 : e.stack; g.userData.m.geometry = e.holes === false ? V9.geoPlain : V9.geoHole;
      if (st >= 1) { g.position.set(EXP.ox + EXP.CARDS[i], EXP.TOP, EXP.Z + ((e.shift || [])[i] || 0)); g.rotation.set(0, 0, 0); g.userData.feet.forEach(f => f.visible = true); }
      else { /* lying flat in a stack on the table (cover i at height i * CT), the hole up */ const k = ease(cl(st)); const sx = EXP.ox + 0.3, sy = EXP.TOP + 0.002 + i * EXP.CT, s2 = EXP.ox + EXP.CARDS[i];
        /* e.n (covers placed so far, may be fractional): cover i shows when i < n, the newest one dropping from 8 cm above */
        const n = e.n === undefined ? 3 : e.n, drop = i < Math.floor(n) ? 0 : 0.08 * (1 - ease(cl(n - i)));
        g.visible = i < n;
        g.position.set(sx + (s2 - sx) * k, sy + (EXP.TOP - sy) * k + drop, EXP.Z); g.rotation.set(0, 0, (1 - k) * Math.PI / 2); g.userData.feet.forEach(f => f.visible = k > 0.98); }
      if (st >= 1) g.visible = true; });
    V9.pin.visible = e.pinY !== undefined; if (V9.pin.visible) V9.pin.position.set(EXP.ox + 0.3 - EXP.H, EXP.TOP + 3 * EXP.CT + e.pinY, EXP.Z);
    V9.expCandle.G.visible = e.candle !== false; V9.setCandle(V9.expCandle, e.lit === undefined ? 1 : e.lit, t, e.glow === undefined ? 0.8 : e.glow);
  }
  /* ST: objects in the room are room-local (the room group stands at x = ST.X); s.spot.p is given in world coordinates.
     o.st = {night, bulb 0..1, candle 0..1, desk (book, khata, pen, matches), food, ball, box: {front opacity, tape, lid}, curtain 0..1,
     torch: {x, z, yaw (deg)}, mirror: {x, z, yaw}, paper: {x, z, yaw}, spot: {p:[x,y,z], n:[nx,ny,nz], r}} */
  const s = o.st, P = V9.st; V9.S0.visible = !!s; P.bulbL.visible = P.stCandle.fl.visible = P.torL.visible = !!s;
  if (s) {
    P.outM.map = s.night ? P.texNight : P.texDay;
    const b = cl(s.bulb || 0); P.bulbM.emissiveIntensity = 2.2 * b; P.bulbGlow.material.opacity = 0.9 * b; P.bulbL.intensity = 1.6 * b;
    V9.setCandle(P.stCandle, s.candle || 0, t, 0.8, 1.3); P.stCandle.G.visible = s.candle !== undefined;
    P.deskThings.forEach(q => q.visible = s.desk !== false); P.food.visible = !!s.food; P.ball.visible = !!s.ball;
    const c2 = cl(s.curtain || 0); P.curtains.forEach((g, i) => { g.scale.x = 0.35 + 0.65 * c2; });
    P.sb.visible = !!s.box; if (s.box) { P.frontM.opacity = s.box.front === undefined ? 1 : s.box.front; P.frontM.depthWrite = P.frontM.opacity > 0.99; P.tape.visible = !!s.box.tape; P.lid.visible = s.box.lid !== false; }
    P.tor.visible = !!s.torch; P.torL.intensity = s.torch ? 2.2 * (s.torch.on === undefined ? 1 : s.torch.on) : 0;
    if (s.torch) { P.tor.position.set(s.torch.x, ST.top + 0.026, s.torch.z); P.tor.rotation.set(0, -(s.torch.yaw || 0) * Math.PI / 180, 0); }
    P.mir.visible = !!s.mirror; if (s.mirror) { P.mir.position.set(s.mirror.x, ST.top + 0.075, s.mirror.z); P.mir.rotation.set(0, -(s.mirror.yaw || 0) * Math.PI / 180, 0); }
    P.paper.visible = !!s.paper; if (s.paper) { P.paper.position.set(s.paper.x, ST.top + 0.075, s.paper.z); P.paper.rotation.set(0, -(s.paper.yaw || 0) * Math.PI / 180, 0); }
    P.spot.visible = !!s.spot; if (s.spot) { P.spot.position.set(s.spot.p[0] - ST.X, s.spot.p[1], s.spot.p[2]); P.spot.lookAt(s.spot.p[0] + s.spot.n[0], s.spot.p[1] + s.spot.n[1], s.spot.p[2] + s.spot.n[2]); P.spot.scale.set(s.spot.r, s.spot.ry || s.spot.r, 1); P.spot.material.opacity = s.spot.o === undefined ? 1 : s.spot.o; }
  }
  /* ROOF: o.roof = {sunEl (deg above the horizon), night, moonEl} */
  const r = o.roof, R = V9.rf; V9.RG.visible = !!r;
  if (r) {
    const night = !!r.night; R.houses.forEach(h => h.material = night ? R.bNight : R.bDay);
    R.sun.visible = R.sunGlow.visible = !night; R.moon.visible = R.moonGlow.visible = night; R.refl.visible = !night; R.skyRefl.material.color.set(night ? '#2a3858' : '#e7a978');
    const el = (night ? (r.moonEl || 30) : (r.sunEl || 6)) * Math.PI / 180, D = RF.SUN_DIST, az = night ? 0.35 : 0;
    const SP = [RF.X + D * Math.cos(el) * Math.sin(az), D * Math.sin(el), -D * Math.cos(el) * Math.cos(az)];
    (night ? [R.moon, R.moonGlow] : [R.sun, R.sunGlow]).forEach(q => q.position.set(SP[0] - RF.X, SP[1], SP[2]));
    if (!night) { /* mirror rule: the reflection is where the line from the eye to the image of the sun (below the water) meets the water */
      const c = o.cam.pos, I = [SP[0], -SP[1], SP[2]], k = c[1] / (c[1] - I[1]), px = c[0] + (I[0] - c[0]) * k, pz = c[2] + (I[2] - c[2]) * k;
      const inside = ((px - RF.X - RF.PUD.x) / RF.PUD.rx) ** 2 + ((pz - RF.PUD.z) / RF.PUD.rz) ** 2 < 0.8;
      R.refl.visible = inside; R.refl.position.set(px - RF.X, 0.008, pz); const dist = Math.hypot(px - c[0], pz - c[2]); R.refl.scale.set(0.35, 0.35 * (1 + 2.5 * dist / Math.max(0.3, c[1])) , 1); }
  }
  /* TIN: o.tin = {beam 0..1 (inside, sun through the hole, elevation TN.SUN_EL from -z... see below), solar 0..1 (bulb on), sun:[..]} */
  const q = o.tin, N = V9.tn; V9.TG.visible = !!q; N.beam.visible = N.fspot.visible = N.inLight.visible = !!(q && q.beam); N.dust.forEach(dd => dd.m.visible = !!(q && q.beam)); N.inBulbL.visible = !!q;
  if (q) {
    if (q.beam) { const el = TN.SUN_EL * Math.PI / 180, H = TN.HOLE_P, dir = [0, -Math.sin(el), Math.cos(el)], tf = H[1] / Math.sin(el), F2 = [H[0], 0.004, H[2] + tf * Math.cos(el)], k = cl(q.beam);
      const len = tf * k, end = [H[0], H[1] + dir[1] * len, H[2] + dir[2] * len];
      N.beam.position.set((H[0] + end[0]) / 2, (H[1] + end[1]) / 2, (H[2] + end[2]) / 2); N.beam.scale.set(1, Math.max(len, 1e-4), 1); N.beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...dir));
      N.fspot.visible = k > 0.98; N.fspot.position.set(...F2); N.fspot.scale.set(0.05, 0.05 / Math.sin(el), 1);
      N.inLight.position.set(F2[0], 0.3, F2[2]); N.inLight.intensity = 0.25 * (k > 0.98 ? 1 : 0);
      N.dust.forEach(dd => { const u = (dd.u + t * dd.s) % 1, rr = dd.r, a = dd.a + t * 0.3; const px = H[0] + rr * Math.cos(a), base = [H[0], H[1] + dir[1] * tf * u, H[2] + dir[2] * tf * u]; dd.m.position.set(px, base[1] + rr * Math.sin(a) * 0.5, base[2] + rr * Math.sin(a) * 0.5); dd.m.visible = u * tf <= len; });
      TN.FLOOR = F2; }
    const sb = cl(q.solar || 0); N.inBulbM.emissiveIntensity = 2.4 * sb; N.inBulbGlow.material.opacity = 0.95 * sb; N.inBulbL.intensity = 1.2 * sb;
    N.yard.visible = q.yard !== false;
  }
  /* STAIR: o.stair = {yaw (deg, + = turns to the left, towards -z... ), on 0..1} */
  const w = o.stair, Q = V9.sr; V9.SG.visible = !!w; Q.torL.visible = Q.beam.visible = Q.wspot.visible = !!w;
  if (w) { const on = cl(w.on === undefined ? 1 : w.on), yaw = (w.yaw || 0) * Math.PI / 180, tp = [SR.X + SR.TORCH.x, SR.STOOL + 0.021, SR.TORCH.z];
    /* yaw 0: the torch points straight at the back wall (-z); + turns it towards +x. The torch body's axis is its local +x. */
    const dir = [Math.sin(yaw), 0, -Math.cos(yaw)]; Q.tor.position.set(...tp); Q.tor.rotation.set(0, Math.PI / 2 - yaw, 0); Q.torL.intensity = 3 * on;
    const lens = [tp[0] + 0.146 * dir[0], tp[1], tp[2] + 0.146 * dir[2]], dist = (lens[2] - SR.WALL_Z) / Math.cos(yaw);
    const hit = [lens[0] + dir[0] * dist, lens[1], lens[2] + dir[2] * dist], hr = dist * Math.tan(SR.HALF * Math.PI / 180);
    Q.beam.visible = Q.wspot.visible = on > 0.01; Q.beam.material.opacity = 0.05 * on; Q.beam.scale.set(hr, dist, hr); Q.beam.position.set((lens[0] + hit[0]) / 2, lens[1], (lens[2] + hit[2]) / 2);
    Q.beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), new THREE.Vector3(...dir));
    /* the spot on the wall: round when the torch points straight at it, stretched sideways (1 / cos yaw) when it is turned; half of it is below the floor line and hidden */
    Q.wspot.position.set(hit[0], hit[1], SR.WALL_Z + 0.003); Q.wspot.rotation.set(0, 0, 0); Q.wspot.scale.set(hr / Math.cos(yaw), hr, 1); Q.wspot.material.opacity = on;
    SR.HIT = hit; SR.HR = hr; }
  /* night road: o.car = {x, z, lights 0..1} on the zones3 village path */
  const c = o.car9; V9.car.visible = !!c; V9.heads.forEach(h => { h.L.visible = !!c; });
  if (c) { V9.car.position.set(c.x, 0, c.z); V9.car.rotation.y = 0; const on = cl(c.lights === undefined ? 1 : c.lights); V9.heads.forEach(h => { h.L.intensity = 5 * on; h.gl.material.opacity = on; h.bm.material.opacity = 0.12 * on; }); }
};

/* cameras */
const C9 = {
  side: () => { const [x, y] = expPt(0.24); return { pos: [x - 0.42, y + 0.16, 0.98], look: [x - 0.02, y - 0.03, 0], fov: 29 }; },   // like fig 9.1
  overview: () => { const [x, y] = expPt(0.2); return { pos: [x - 0.95, y + 0.55, 0.95], look: [x, y - 0.04, 0], fov: 36 }; },
  eye: () => ({ pos: expPt(EXP.EYE), look: expPt(EXP.CANDLE), fov: 7.5 }),
  stack: () => { const [x, y] = expPt(0.3, 0); return { pos: [x - 0.25, y + 0.32, 0.42], look: [x, y + 0.01, 0], fov: 32 }; },
  stDesk: () => ({ pos: [ST.X + 0.45, 1.32, 0.55], look: [ST.X + 0.42, 0.88, -1.4], fov: 42 }),
  stWide: () => ({ pos: [ST.X + 1.4, 1.55, 1.75], look: [ST.X - 0.2, 1.05, -1.6], fov: 52 }),
  stFig92: () => ({ pos: [ST.X + 0.05, 1.3, 0.75], look: [ST.X + 0.38, 1.2, -1.35], fov: 46 }),
  stBox: () => ({ pos: [ST.X + ST.BOX.x + 0.15, 1.08, ST.BOX.z + 0.62], look: [ST.X + ST.BOX.x - 0.02, 0.83, ST.BOX.z], fov: 36 }),
  roof: () => ({ pos: [RF.X + 0.6, 1.25, 5.2], look: [RF.X + 0.2, 1.2, -6], fov: 50 }),

  tinOut: () => ({ pos: [TN.X + 2.6, 5.2, 10.5], look: [TN.X + 0.6, 1.9, 0], fov: 40 }),   // raised: the front slope of the roof and the panel on it show
  tinYard: () => ({ pos: [TN.X - 0.3, 1.5, 8.2], look: [TN.X - 0.3, 1.2, 4], fov: 46 }),
  stair: () => ({ pos: [SR.X + 2.4, 1.45, 3.4], look: [SR.X + 0.4, 0.55, -1.0], fov: 56 }),
};
/* hands made from the photo-fitted 3D hand (science-video-template/hand): push (mirrored: pushes to the right), point */
function handImg(src, anc, ppm, x, y, a, pm, o, flip) { if (o <= 0) return ''; const k = pm / 1000 / ppm;
  return `<g transform="translate(${F(x)},${F(y)}) rotate(${F(a)}) scale(${(flip ? -k : k).toFixed(4)},${k.toFixed(4)}) translate(${-anc[0]},${-anc[1]})" opacity="${cl(o).toFixed(2)}"><image href="../science-video-template/hand/${src}" width="2400" height="2400"/></g>`; }
const handPush3 = (x, y, a, pm, o = 1) => handImg('hand_push.png', [818.6, 1044.9], 3.7500, x, y, a, pm, o, true);
const handPoint = (x, y, a, pm, o = 1) => handImg('hand_point.png', [1527.7, 1951.2], 3.7500, x, y, a, pm, o, false);
/* white overlay note in the corner, e.g. "স্কেল অনুযায়ী নয়" */
const note9 = (s, o = 1) => o > 0 ? `<div class="abs" style="right:60px;bottom:170px;opacity:${(cl(o) * 0.95).toFixed(2)}"><span class="lab name" style="transform:none;font-size:40px">${s}</span></div>` : '';
const yel9 = s => `<span style="color:#FFC83D">${s}</span>`;
