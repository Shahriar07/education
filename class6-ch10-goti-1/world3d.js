/* 3D street for the motion videos (three.js r149). World units are metres.
   Road runs along x. Traffic keeps left (Bangladesh): a bus heading +x uses the far lane (z < 0),
   so the kerb, the bus stop and the lamp posts on the far footpath are on its left.
   The camera stands on the near side and looks across the road, like a textbook side view. */
const ROAD = {
  V_BUS: 5,            // m/s, uniform: a city bus on a busy street (18 km/h)
  ARI: { x: 3.6, y: 1.5, z: -4.1 },        // Ariyan's eyes: standing at the bus stop beside the sign, near the kerb
  SEAT: { dx: -0.45, y: 2.28, dz: -0.3 },  // your eyes, seated in the row of window 4 (x -0.78..0.30 from the bus centre), 0.9 m from the glass
  LANE_Z: -1.75,       // centre of the far lane
  HALF_W: 3.5,         // half road width
  PATH_W: 3.0,         // footpath width
  LAMP_GAP: 12,        // m between lamp posts
  LAMP_X0: 6,          // one lamp post stands at x = 6
  LAMP_Z: -4.3, LAMP_H: 7.0,
  STOP_X: 0, STOP_Z: -5.3,
  BUS_L: 10.4, BUS_W: 2.5, BUS_H: 3.3, WHEEL_R: 0.5,
  X_MIN: -110, X_MAX: 150,
  CAM: { dx: -10, y: 6.2, z: 19, lookDx: 1.5, lookY: 2.1, lookZ: -3, fov: 36 },  // raised three-quarter view
  NEAR_Z: 1.75,        // centre of the near lane (traffic heading -x)
  /* car: a small sedan */
  V_CAR: 8,            // m/s (29 km/h), uniform
  CAR_L: 4.4, CAR_W: 1.76, CAR_R: 0.32,
  CAR_YOU: { dx: -0.75, y: 1.12, dz: 0.42 },     // your eyes on the rear seat, lake side
  CAR_FRIEND: { dx: -0.75, y: 1.12, dz: -0.42 }, // the friend beside you, kerb side
  /* railway station, built at x 380..660 */
  ST: { X0: 380, X1: 660, RAIL_G: 1.676, PLAT_Z: -1.95, PLAT_H: 0.95, V_TRAIN: 12, YOU_X: 520, YOU_Z: -3.4 },
  /* village yard, built at x 800..880 */
  VIL: { X: 840, BALL_R: 0.11, BALL_U: 3.2, BALL_A: -0.8 },   // a kicked football: u = 3.2 m/s, friction slows it at 0.8 m/s²
  BALCONY: { x: 36, y: 7.3, z: -6.75 }                        // eyes on a third-floor balcony on the far side of the street
};

THREE.ColorManagement.legacyMode = false;   // treat material colours as sRGB, so they are not washed out
const W3 = (function () {
  let renderer, scene, camera, sun, bus, interior, wheels = [], built = false;
  let car1, car2, carIn, train, ball, balcony;
  const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

  function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const mat = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.85, metalness: 0 }, o));
  function box(w, h, d, m, x, y, z, parent, shadow = true) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z);
    b.castShadow = shadow; b.receiveShadow = true; (parent || scene).add(b); return b;
  }
  function cyl(rt, rb, h, m, x, y, z, parent, seg = 20) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); c.position.set(x, y, z);
    c.castShadow = true; c.receiveShadow = true; (parent || scene).add(c); return c;
  }
  function tex(cv) { const t = new THREE.CanvasTexture(cv); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8; return t; }

  /* ---------- building facade drawn on a canvas ---------- */
  const SHOPS = ['বই ঘর', 'মুদি দোকান', 'চা ঘর', 'ফার্মেসি', 'স্টেশনারি', 'মিষ্টি ঘর', 'টেইলার্স', 'হার্ডওয়্যার', 'ফল ঘর', 'স্টুডিও'];
  const WALLS = ['#e9dcc0', '#d9c2a6', '#cfdccc', '#c9d8e6', '#e6cfc4', '#dcd6cb', '#e3d39a', '#c7c9bd'];
  const SIGNS = ['#b3261e', '#1f5fa8', '#1f7a4d', '#7a3f98', '#c2571a'];
  function facade(w, h, floors, wall, r, shopName) {
    const S = 56, cv = document.createElement('canvas'); cv.width = Math.round(w * S); cv.height = Math.round(h * S);
    const g = cv.getContext('2d'), W = cv.width, H = cv.height, fh = H / floors;
    g.fillStyle = wall; g.fillRect(0, 0, W, H);
    // weathering streaks, light
    for (let i = 0; i < 26; i++) { g.fillStyle = `rgba(60,50,40,${0.02 + 0.03 * r()})`; const x = r() * W; g.fillRect(x, 0, 6 + r() * 26, H); }
    const n = Math.max(2, Math.round(w / 2.6)), cw = W / n;
    for (let f = 1; f < floors; f++) {
      const top = H - (f + 1) * fh;
      g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(0, top + fh - 7, W, 7);          // floor slab shadow
      g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(0, top + fh - 13, W, 6);    // slab edge
      for (let i = 0; i < n; i++) {
        const ww = cw * 0.56, wh = fh * 0.5, x = i * cw + (cw - ww) / 2, y = top + fh * 0.2;
        g.fillStyle = '#5b4632'; g.fillRect(x - 5, y - 5, ww + 10, wh + 10);          // frame
        const lit = r();
        g.fillStyle = lit > 0.8 ? '#8fb4c9' : lit > 0.4 ? '#6f93a8' : '#557a90'; g.fillRect(x, y, ww, wh);
        g.fillStyle = 'rgba(255,255,255,.22)'; g.beginPath(); g.moveTo(x, y + wh); g.lineTo(x + ww * 0.45, y); g.lineTo(x + ww * 0.7, y); g.lineTo(x + ww * 0.25, y + wh); g.fill();
        g.fillStyle = '#5b4632'; g.fillRect(x + ww / 2 - 2, y, 4, wh);                // mullion
        g.fillStyle = '#b9b2a2'; g.fillRect(x - 9, y + wh + 5, ww + 18, 7);            // sill
        if (r() > 0.6) { g.fillStyle = ['#c0392b', '#2e86ab', '#e0b84c', '#ffffff'][Math.floor(r() * 4)]; g.fillRect(x + 3, y + wh * 0.02, ww * 0.42, wh * 0.96); } // curtain
      }
    }
    // ground floor: shop with roller shutter and signboard
    const gy = H - fh;
    g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(0, gy, W, fh);
    const sh = fh * 0.3, sc = SIGNS[Math.floor(r() * SIGNS.length)];
    g.fillStyle = sc; g.fillRect(W * 0.04, gy + 6, W * 0.92, sh);
    g.strokeStyle = '#fff'; g.lineWidth = 4; g.strokeRect(W * 0.04 + 5, gy + 11, W * 0.92 - 10, sh - 10);
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = `700 ${Math.round(sh * 0.62)}px "Hind Siliguri"`; g.fillText(shopName, W / 2, gy + 6 + sh * 0.56);
    const open = r() > 0.45, sx = W * 0.08, sw = W * 0.84, sy = gy + sh + 14, shh = fh - sh - 14;
    g.fillStyle = open ? '#3b2f25' : '#9aa3a8'; g.fillRect(sx, sy, sw, shh);
    if (open) { // shelves with goods
      for (let k = 0; k < 3; k++) { const yy = sy + shh * (0.18 + k * 0.27); g.fillStyle = '#7a5a3a'; g.fillRect(sx + 8, yy + shh * 0.16, sw - 16, 6);
        for (let x = sx + 14; x < sx + sw - 30; x += 16 + r() * 14) { g.fillStyle = ['#e0b84c', '#c0392b', '#2e86ab', '#3bb273', '#f2f2f2', '#d98a3a'][Math.floor(r() * 6)]; const bh = shh * (0.08 + 0.07 * r()); g.fillRect(x, yy + shh * 0.16 - bh, 12, bh); } }
      g.fillStyle = '#9aa3a8'; g.fillRect(sx, sy, sw, shh * 0.1);
    } else { g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2; for (let y = sy + 6; y < sy + shh; y += 9) { g.beginPath(); g.moveTo(sx, y); g.lineTo(sx + sw, y); g.stroke(); } }
    // every shop is open and shows what its sign says (drawn over the generic shelves above, which are kept only so
    // that the shared random numbers, and with them the street layout, stay exactly as before)
    shopGoods(g, shopName, sx, sy, sw, shh);
    return tex(cv);
  }

  /* the goods of each kind of shop, drawn in the shop opening (x, y, w, h in canvas pixels, ≈ 56 px per metre) */
  function shopGoods(g, name, x, y, w, h) {
    const rr = rng([...name].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0);
    const C = (cx, cy, r, c, st) => { g.beginPath(); g.arc(cx, cy, r, 0, 2 * Math.PI); g.fillStyle = c; g.fill(); if (st) { g.strokeStyle = st; g.lineWidth = 1; g.stroke(); } };
    const E = (cx, cy, rx, ry, c, rot = 0) => { g.beginPath(); g.ellipse(cx, cy, rx, ry, rot, 0, 2 * Math.PI); g.fillStyle = c; g.fill(); };
    const R = (a, b, c, d, col) => { g.fillStyle = col; g.fillRect(a, b, c, d); };
    const shelf = yy => R(x + 4, yy, w - 8, 3, '#8a6a45');
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
    R(x, y, w, h, '#4a3a2c'); R(x, y + h - 4, w, 4, '#2a2018');
    const H = h, X = x, Yb = y + h;                                     // bottom of the opening
    switch (name) {
      case 'ফল ঘর': {
        // bunches of bananas hanging from a rod, a sloping wooden display with heaps of fruit, a basket in front
        R(X, y + 6, w, 2, '#9a8a70');
        for (let bx = X + 18; bx < X + w - 10; bx += 46) for (let k = 0; k < 7; k++) {
          g.beginPath(); g.strokeStyle = k % 3 ? '#f2d22e' : '#d9b81f'; g.lineWidth = 4; g.lineCap = 'round';
          const ox = bx + (k - 3) * 3.2; g.moveTo(ox, y + 12 + k % 2 * 3); g.quadraticCurveTo(ox + (k - 3) * 3, y + 26, ox + (k - 3) * 1.5 + 4, y + 36); g.stroke(); }
        g.fillStyle = '#7a5530'; g.beginPath(); g.moveTo(X, Yb); g.lineTo(X, Yb - H * 0.32); g.lineTo(X + w, Yb - H * 0.5); g.lineTo(X + w, Yb); g.fill();
        const kinds = [['#f2b91e', '#7cb342', 'mango'], ['#f39c12', null, 'orange'], ['#c0392b', null, 'apple'], ['#8bc34a', null, 'malta'], ['#6a1b9a', null, 'grape']];
        const n = 5, cw = w / n;
        kinds.forEach(([c1, c2, kind], i) => {
          const x0 = X + i * cw, base = Yb - H * (0.3 + 0.18 * (i + 0.5) / n);
          for (let row = 0; row < 3; row++) for (let j = 0; j < 6 - row; j++) {
            const fx = x0 + 8 + j * (cw - 16) / 5 + row * 3, fy = base - row * 7 - 4;
            if (kind === 'grape') { for (let q = 0; q < 4; q++) C(fx + (q % 2) * 3, fy - (q > 1 ? 3 : 0), 2.4, c1); }
            else if (kind === 'mango') { E(fx, fy, 5.5, 4, c1, 0.4); E(fx + 2, fy - 1, 2.6, 2, '#e8572a', 0.4); E(fx - 2.5, fy + 1, 2, 1.6, c2, 0.4); }
            else { C(fx, fy, 4.4, c1); C(fx - 1.4, fy - 1.4, 1.3, 'rgba(255,255,255,.55)'); }
          }
        });
        // a big watermelon and a bamboo basket on the ground
        E(X + w * 0.12, Yb - 9, 13, 8, '#2e7d32'); for (let k = -2; k <= 2; k++) { g.strokeStyle = '#a5d6a7'; g.lineWidth = 1.5; g.beginPath(); g.ellipse(X + w * 0.12 + k * 4, Yb - 9, 2, 7.5, 0, 0, 2 * Math.PI); g.stroke(); }
        g.fillStyle = '#b08948'; g.beginPath(); g.moveTo(X + w * 0.78, Yb - 16); g.lineTo(X + w * 0.95, Yb - 16); g.lineTo(X + w * 0.92, Yb - 2); g.lineTo(X + w * 0.81, Yb - 2); g.fill();
        for (let k = 0; k < 5; k++) C(X + w * 0.8 + k * 6, Yb - 19, 4.5, '#f39c12');
        break; }
      case 'বই ঘর': {
        for (let s2 = 0; s2 < 3; s2++) { const yy = y + 10 + s2 * (H * 0.26); shelf(yy + H * 0.22);
          for (let bx = X + 8; bx < X + w - 10; ) { const bw = 4 + rr() * 4, bh = H * (0.14 + rr() * 0.07); R(bx, yy + H * 0.22 - bh, bw, bh, ['#1f5fa8', '#c0392b', '#27ae60', '#e0b84c', '#8e44ad', '#ecf0f1', '#d35400'][Math.floor(rr() * 7)]); R(bx, yy + H * 0.22 - bh + 3, bw, 1.5, 'rgba(255,255,255,.5)'); bx += bw + 1; } }
        for (let k = 0; k < 4; k++) { const sx2 = X + 30 + k * (w - 60) / 4; for (let j = 0; j < 5; j++) R(sx2, Yb - 8 - j * 5, 34, 4.5, ['#1f5fa8', '#c0392b', '#f2f2f2', '#27ae60', '#e0b84c'][(j + k) % 5]); }
        break; }
      case 'মুদি দোকান': {
        for (let s2 = 0; s2 < 2; s2++) { const yy = y + 8 + s2 * H * 0.24; shelf(yy + H * 0.2);
          for (let bx = X + 10; bx < X + w - 16; bx += 16) { if ((bx / 16 | 0) % 2) { R(bx, yy + H * 0.2 - 18, 8, 18, 'rgba(242,194,48,.85)'); R(bx + 2, yy + H * 0.2 - 22, 4, 4, '#c0392b'); } else { R(bx, yy + H * 0.2 - 13, 12, 13, 'rgba(220,235,245,.6)'); R(bx + 1, yy + H * 0.2 - 9, 10, 8, ['#e74c3c', '#f39c12', '#8e44ad', '#27ae60'][(bx / 32 | 0) % 4]); } } }
        // open sacks of rice, lentils, onions, potatoes
        const fill = [['#f4f1e6', 'চাল'], ['#e67e22', 'ডাল'], ['#8e3a59', 'পেঁয়াজ'], ['#a0763c', 'আলু']];
        fill.forEach(([c], i) => { const cx = X + w * (0.14 + i * 0.24), top = Yb - 24;
          g.fillStyle = '#d8c7a0'; g.beginPath(); g.moveTo(cx - 20, Yb); g.lineTo(cx - 18, top); g.lineTo(cx + 18, top); g.lineTo(cx + 20, Yb); g.fill();
          E(cx, top, 18, 5, '#c4b089'); E(cx, top + 1, 15, 3.6, c);
          if (i >= 2) for (let k = 0; k < 6; k++) C(cx - 11 + k * 4.4, top - 1, 3, c);
          else for (let k = 0; k < 14; k++) C(cx - 12 + rr() * 24, top - 1 + rr() * 2, 0.9, 'rgba(0,0,0,.25)'); });
        break; }
      case 'চা ঘর': {
        shelf(y + H * 0.3); for (let bx = X + 12; bx < X + w - 20; bx += 22) { R(bx, y + H * 0.3 - 16, 14, 16, '#c9ced2'); R(bx, y + H * 0.3 - 16, 14, 4, '#c0392b'); }
        R(X, Yb - H * 0.38, w, H * 0.38, '#6b4324'); R(X, Yb - H * 0.38, w, 3, '#a0693a');
        const cy = Yb - H * 0.38;
        // aluminium kettle on a stove, glass cups of tea, biscuit jars
        R(X + 20, cy - 8, 34, 8, '#2b2b2b'); E(X + 37, cy - 22, 16, 13, '#c9ced2'); E(X + 32, cy - 26, 5, 6, '#eef1f3');
        g.strokeStyle = '#9aa3a8'; g.lineWidth = 3; g.beginPath(); g.moveTo(X + 51, cy - 24); g.lineTo(X + 64, cy - 33); g.stroke(); g.beginPath(); g.arc(X + 37, cy - 36, 9, Math.PI, 0); g.stroke();
        for (let k = 0; k < 3; k++) { g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(X + 64 + k * 3, cy - 38 - k * 6); g.quadraticCurveTo(X + 70 + k * 3, cy - 46 - k * 6, X + 64 + k * 3, cy - 54 - k * 6); g.stroke(); }
        for (let k = 0; k < 6; k++) { const gx = X + 84 + k * 14; R(gx, cy - 12, 9, 12, 'rgba(230,240,245,.55)'); R(gx + 1, cy - 9, 7, 8, '#8d5524'); }
        for (let k = 0; k < 3; k++) { const jx = X + w - 70 + k * 22; R(jx, cy - 22, 18, 22, 'rgba(220,235,245,.5)'); R(jx, cy - 25, 18, 4, '#c0392b'); for (let q = 0; q < 4; q++) C(jx + 5 + (q % 2) * 8, cy - 15 + (q > 1 ? 7 : 0), 3.4, '#d9a35b'); }
        break; }
      case 'ফার্মেসি': {
        for (let s2 = 0; s2 < 3; s2++) { const yy = y + 8 + s2 * H * 0.2; shelf(yy + H * 0.17); for (let bx = X + 8; bx < X + w - 10; bx += 11) { R(bx, yy + H * 0.17 - 10, 9, 10, '#f4f6f7'); R(bx, yy + H * 0.17 - 6, 9, 2.4, ['#e74c3c', '#2e86de', '#27ae60', '#f39c12'][(bx / 11 | 0) % 4]); } }
        const gx = X + w * 0.5, gy2 = y + H * 0.08; R(gx - 4, gy2, 8, 22, '#27ae60'); R(gx - 11, gy2 + 7, 22, 8, '#27ae60');
        R(X + 6, Yb - H * 0.3, w - 12, H * 0.3, 'rgba(190,225,240,.55)'); R(X + 6, Yb - H * 0.3, w - 12, 2, '#eef6fa');
        for (let bx = X + 14; bx < X + w - 20; bx += 13) R(bx, Yb - 13, 10, 8, '#f4f6f7');
        break; }
      case 'স্টেশনারি': {
        for (let s2 = 0; s2 < 2; s2++) { const yy = y + 8 + s2 * H * 0.25; shelf(yy + H * 0.21);
          for (let bx = X + 10; bx < X + w - 30; bx += 30) for (let j = 0; j < 6; j++) R(bx, yy + H * 0.21 - 3 - j * 3, 24, 2.6, ['#c0392b', '#2e86de', '#27ae60', '#f39c12', '#f4f1e6'][(j + Math.round(bx / 30)) % 5]); }
        R(X, Yb - H * 0.3, w, H * 0.3, '#7a5530');
        for (let k = 0; k < 5; k++) { const px = X + 20 + k * (w - 40) / 5; R(px, Yb - H * 0.3 - 12, 10, 12, '#555'); for (let q = 0; q < 4; q++) R(px + 1 + q * 2.2, Yb - H * 0.3 - 22, 1.6, 12, ['#1f5fa8', '#c0392b', '#111', '#27ae60'][q]); }
        for (let k = 0; k < 4; k++) { g.save(); g.translate(X + w - 30 - k * 9, Yb - H * 0.3); g.rotate(-0.25); R(-3, -40, 6, 40, ['#f4f1e6', '#f9e79f', '#aed6f1', '#f5b7b1'][k]); g.restore(); }
        break; }
      case 'মিষ্টি ঘর': {
        // a glass showcase with trays of rasgulla, kalojam, sandesh and chamcham; a big aluminium pot on top
        const top = y + H * 0.22; R(X + 6, top, w - 12, H * 0.78, 'rgba(200,230,245,.35)'); R(X + 6, top, w - 12, 2, '#eef6fa');
        const rows = [['#fbf7ea', 'circle'], ['#5d2e0c', 'oval'], ['#f4d35e', 'square'], ['#f5b7b1', 'oval']];
        rows.forEach(([c, sh2], i) => { const ty = top + 8 + i * H * 0.18; R(X + 12, ty + 9, w - 24, 2.5, '#c9ced2');
          for (let k = 0; k < (w - 30) / 12; k++) { const cx = X + 18 + k * 12, cy = ty + 5; if (sh2 === 'circle') C(cx, cy, 4.5, c, '#d9d2bb'); else if (sh2 === 'square') R(cx - 4, cy - 3, 8, 7, c); else E(cx, cy, 5, 3.6, c); } });
        E(X + w * 0.5, y + 12, 26, 9, '#c9ced2'); R(X + w * 0.5 - 26, y + 3, 52, 9, '#b8bec4');
        break; }
      case 'টেইলার্স': {
        shelf(y + H * 0.52);
        for (let bx = X + 10; bx < X + w * 0.6; bx += 13) { const c = ['#c0392b', '#2e86de', '#27ae60', '#8e44ad', '#f4f1e6', '#34495e', '#e67e22'][(bx / 13 | 0) % 7]; R(bx, y + 10, 11, H * 0.42, c); R(bx + 2, y + 10, 2, H * 0.42, 'rgba(255,255,255,.25)'); }
        // a sewing machine on the cutting table
        R(X, Yb - H * 0.3, w, H * 0.3, '#7a5530');
        const mx = X + w * 0.78, my = Yb - H * 0.3; R(mx - 26, my - 6, 52, 6, '#2b2b2b'); R(mx + 14, my - 28, 10, 24, '#2b2b2b'); R(mx - 24, my - 30, 46, 8, '#2b2b2b'); R(mx - 22, my - 22, 4, 14, '#2b2b2b'); C(mx + 26, my - 20, 6, '#555');
        // cloth on a rail, folded shirts on the table
        for (let k = 0; k < 4; k++) R(X + w * 0.66 + k * 12 - 70, my - 8, 10, 6, ['#f4f1e6', '#aed6f1', '#f5b7b1', '#d5f5e3'][k]);
        break; }
      case 'হার্ডওয়্যার': {
        R(X + 6, y + 6, w * 0.5, H * 0.55, '#8d7b62');
        for (let k = 0; k < 6; k++) { const tx = X + 16 + k * (w * 0.5 - 20) / 6, ty = y + 14 + (k % 2) * 16;
          if (k % 3 === 0) { R(tx, ty, 3, 18, '#7a5530'); R(tx - 5, ty - 3, 13, 6, '#6d767b'); } else if (k % 3 === 1) { R(tx, ty, 4, 18, '#9aa3a8'); C(tx + 2, ty, 5, '#9aa3a8'); C(tx + 2, ty, 2.4, '#8d7b62'); } else { R(tx - 4, ty, 14, 9, '#b8bec4'); R(tx + 10, ty + 1, 5, 7, '#7a5530'); } }
        for (let k = 0; k < 3; k++) { g.strokeStyle = ['#2e86de', '#27ae60', '#e67e22'][k]; g.lineWidth = 3; g.beginPath(); g.arc(X + w * 0.62 + k * 26, y + H * 0.32, 11, 0, 2 * Math.PI); g.stroke(); }
        for (let k = 0; k < 3; k++) { const bx = X + 14 + k * 30; g.fillStyle = ['#e74c3c', '#2e86de', '#f1c40f'][k]; g.beginPath(); g.moveTo(bx, Yb - 22); g.lineTo(bx + 22, Yb - 22); g.lineTo(bx + 19, Yb - 2); g.lineTo(bx + 3, Yb - 2); g.fill(); }
        for (let k = 0; k < 4; k++) for (let j = 0; j < 2; j++) { const px = X + w * 0.6 + k * 17, py = Yb - 14 - j * 13; R(px, py, 14, 12, '#b8bec4'); R(px, py + 4, 14, 4, ['#c0392b', '#2e86de', '#f1c40f', '#ecf0f1'][(k + j) % 4]); }
        break; }
      case 'স্টুডিও': {
        // framed landscape photos (sky, hills, river and a boat), a camera on a tripod, a white umbrella light
        for (let k = 0; k < 4; k++) { const fx = X + 12 + k * (w * 0.6) / 4, fy = y + 10 + (k % 2) * 8, fw = 34, fh2 = 26;
          R(fx - 2, fy - 2, fw + 4, fh2 + 4, '#c9a24a'); R(fx, fy, fw, fh2 * 0.55, '#8fc3ea'); R(fx, fy + fh2 * 0.55, fw, fh2 * 0.45, '#4f93b8');
          g.fillStyle = '#7f8c8d'; g.beginPath(); g.moveTo(fx, fy + fh2 * 0.55); g.lineTo(fx + fw * 0.35, fy + fh2 * 0.25); g.lineTo(fx + fw * 0.7, fy + fh2 * 0.55); g.fill(); C(fx + fw * 0.8, fy + 6, 3, '#f9e79f'); }
        const cx = X + w * 0.8, cy = Yb - H * 0.55;
        g.strokeStyle = '#2b2b2b'; g.lineWidth = 2; [-12, 0, 12].forEach(d => { g.beginPath(); g.moveTo(cx, cy + 8); g.lineTo(cx + d, Yb - 2); g.stroke(); });
        R(cx - 11, cy - 8, 22, 15, '#1d1d1d'); C(cx + 11, cy, 5, '#3b3f44'); C(cx + 11, cy, 2.5, '#8fc3ea');
        g.fillStyle = '#f4f6f7'; g.beginPath(); g.arc(X + w * 0.95, y + H * 0.3, 18, Math.PI * 0.6, Math.PI * 1.4); g.fill();
        break; }
    }
    g.restore();
  }

  function buildings() {
    const r = rng(20261117); let x = ROAD.X_MIN, i = 0;
    const front = -(ROAD.HALF_W + ROAD.PATH_W);
    while (x < ROAD.X_MAX) {
      const w = 7 + Math.floor(r() * 6), floors = 2 + Math.floor(r() * 3), h = floors * 3.2, d = 9;
      const wall = WALLS[Math.floor(r() * WALLS.length)];
      const side = mat(new THREE.Color(wall).multiplyScalar(0.82)), roof = mat('#8d8a83');
      const fm = new THREE.MeshStandardMaterial({ map: facade(w, h, floors, wall, r, SHOPS[i % SHOPS.length]), roughness: 0.9 });
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [side, side, roof, roof, fm, side]);
      b.position.set(x + w / 2, h / 2, front - d / 2); b.castShadow = true; b.receiveShadow = true; scene.add(b);
      box(w + 0.3, 0.35, d + 0.3, mat(new THREE.Color(wall).multiplyScalar(0.7)), x + w / 2, h + 0.17, front - d / 2);       // parapet
      if (r() > 0.45) { cyl(0.75, 0.75, 1.5, mat('#1c1c1c', { roughness: 0.5 }), x + w * (0.25 + 0.5 * r()), h + 1.25, front - d * 0.6); } // rooftop water tank
      x += w + (r() > 0.7 ? 1.2 : 0); i++;
    }
  }

  function ground() {
    const len = ROAD.X_MAX - ROAD.X_MIN, cx = (ROAD.X_MAX + ROAD.X_MIN) / 2, hw = ROAD.HALF_W, pw = ROAD.PATH_W;
    box(len, 0.1, 80, mat('#a39f93'), cx, -0.06, -30, null, false);                    // land under buildings
    box(len, 0.1, 2 * hw, mat('#3f4247', { roughness: 0.95 }), cx, -0.05, 0, null, false); // asphalt
    [-1, 1].forEach(s => {
      box(len, 0.18, pw, mat('#c2bcae'), cx, 0.09, s * (hw + pw / 2), null, false);      // footpath
      box(len, 0.2, 0.22, mat('#e8e4d8'), cx, 0.1, s * (hw + 0.11), null, false);       // kerb
      box(len, 0.012, 0.14, mat('#f2f2ee'), cx, 0.007, s * (hw - 0.45), null, false);   // edge line
    });
    // near side: a lake beside the road, with a railing, and a far bank with distant buildings
    const zr = hw + pw - 0.12, rail = mat('#e9e6dc', { roughness: 0.5 });
    box(len, 0.07, 0.07, rail, cx, 1.2, zr); box(len, 0.05, 0.05, rail, cx, 0.72, zr);
    const pg = new THREE.BoxGeometry(0.1, 1.05, 0.1);
    for (let x = ROAD.X_MIN; x < ROAD.X_MAX; x += 2) { const m = new THREE.Mesh(pg, rail); m.position.set(x, 0.7, zr); m.castShadow = true; scene.add(m); }
    box(len + 300, 0.1, 150, mat('#4f93b8', { roughness: 0.25, metalness: 0.1 }), cx, -0.9, hw + pw + 75, null, false);   // water
    box(len, 1.1, 0.5, mat('#8f8a7e'), cx, -0.4, hw + pw + 0.2, null, false);                                             // bank wall
    const r = rng(77), far = hw + pw + 150;
    box(len + 300, 1.2, 30, mat('#8a9a86'), cx, -0.3, far + 15, null, false);
    for (let x = ROAD.X_MIN - 140; x < ROAD.X_MAX + 140; ) { const w = 10 + r() * 16, h = 8 + r() * 30;
      box(w, h, 12, mat(['#9fb3c4', '#b3bfc9', '#a9b6ad', '#c2bfb5'][Math.floor(r() * 4)]), x + w / 2, h / 2, far + 8 + r() * 10, null, false); x += w + r() * 5; }
    const dash = new THREE.BoxGeometry(3, 0.012, 0.16), dm = mat('#f2f2ee');
    for (let x = ROAD.X_MIN; x < ROAD.X_MAX; x += 6) { const m = new THREE.Mesh(dash, dm); m.position.set(x + 1.5, 0.007, 0); m.receiveShadow = true; scene.add(m); }
    // kerb paint: alternate black/white blocks every 1 m, as on Bangladeshi roads
    const kb = new THREE.BoxGeometry(1, 0.205, 0.225), km = mat('#2a2a2a');
    for (let x = ROAD.X_MIN; x < ROAD.X_MAX; x += 2) [-1, 1].forEach(s => { const m = new THREE.Mesh(kb, km); m.position.set(x + 0.5, 0.1, s * (hw + 0.11)); scene.add(m); });
  }

  function lampPosts() {
    const steel = mat('#8f999f', { roughness: 0.45, metalness: 0.5 }), H = ROAD.LAMP_H, z = ROAD.LAMP_Z;
    const glow = new THREE.MeshStandardMaterial({ color: '#fff7d6', emissive: '#ffe9a3', emissiveIntensity: 0.6 });
    for (let x = lampXs().first; x < ROAD.X_MAX; x += ROAD.LAMP_GAP) {
      cyl(0.24, 0.28, 0.5, mat('#6d767b'), x, 0.43, z);
      cyl(0.085, 0.13, H, steel, x, 0.18 + H / 2, z);
      const arm = cyl(0.06, 0.07, 1.9, steel, x, H + 0.3, z + 0.85); arm.rotation.x = Math.PI / 2 - 0.22;
      box(0.34, 0.14, 0.8, mat('#59626a'), x, H + 0.5, z + 1.95);
      box(0.26, 0.05, 0.6, glow, x, H + 0.41, z + 1.95, null, false);
    }
  }
  function lampXs() { const first = ROAD.LAMP_X0 - ROAD.LAMP_GAP * Math.ceil((ROAD.LAMP_X0 - ROAD.X_MIN) / ROAD.LAMP_GAP) + ROAD.LAMP_GAP; return { first }; }

  function busStop() {
    const x = ROAD.STOP_X, z = ROAD.STOP_Z, G = new THREE.Group(); G.position.set(x, 0.18, z); scene.add(G);
    const post = mat('#2f5d8a', { roughness: 0.5, metalness: 0.3 });
    [[-1.9, -0.6], [1.9, -0.6], [-1.9, 0.6], [1.9, 0.6]].forEach(p => cyl(0.06, 0.06, 2.5, post, p[0], 1.25, p[1], G));
    box(4.4, 0.12, 1.9, mat('#d7dde2', { roughness: 0.4 }), 0, 2.56, 0, G);          // roof
    box(4.4, 0.16, 0.1, mat('#1f5fa8'), 0, 2.42, 0.9, G);                               // roof fascia
    box(3.8, 1.5, 0.05, new THREE.MeshStandardMaterial({ color: '#bcd9ea', transparent: true, opacity: 0.55, roughness: 0.2 }), 0, 1.35, -0.6, G, false);
    box(3.2, 0.08, 0.42, mat('#8a5a30'), 0, 0.5, -0.25, G);                             // bench seat
    [[-1.3], [1.3]].forEach(p => box(0.08, 0.5, 0.36, mat('#4a4a4a'), p[0], 0.25, -0.25, G));
    // stop sign: blue disc on a pole, with the word on a plate
    cyl(0.05, 0.05, 3.0, mat('#6d767b', { metalness: 0.4 }), 2.9, 1.5, 0.9, G);
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 256; const g = cv.getContext('2d');
    g.fillStyle = '#1f5fa8'; g.beginPath(); g.arc(128, 128, 124, 0, 7); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 12; g.beginPath(); g.arc(128, 128, 108, 0, 7); g.stroke();
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '700 54px "Hind Siliguri"'; g.fillText('বাস', 128, 104); g.fillText('স্টপ', 128, 162);
    const sm = new THREE.MeshStandardMaterial({ map: tex(cv), transparent: true, roughness: 0.6 });
    const disc = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), sm); disc.position.set(2.9, 2.95, 0.96); G.add(disc);
  }

  function mkBus() {
    const G = new THREE.Group(), L = ROAD.BUS_L, Wd = ROAD.BUS_W, R = ROAD.WHEEL_R;
    const green = mat('#1f7a4d', { roughness: 0.45 }), cream = mat('#f1e7cf', { roughness: 0.5 }), glass = mat('#1d2a36', { roughness: 0.15, metalness: 0.4 });
    const dark = mat('#26282b'), chrome = mat('#c9ced2', { roughness: 0.3, metalness: 0.7 });
    box(L, 1.15, Wd, green, 0, 0.98, 0, G);                         // lower body  y 0.40..1.55
    box(L + 0.02, 0.13, Wd + 0.02, mat('#f2c230', { roughness: 0.5 }), 0, 1.62, 0, G);   // yellow belt line
    box(L, 1.55, Wd, cream, 0, 2.46, 0, G);                         // upper body  y 1.69..3.24
    box(L - 0.5, 0.1, Wd - 0.3, mat('#fbfbf7'), 0, 3.29, 0, G);     // roof panel
    box(2.2, 0.22, 1.3, mat('#dfe3e6'), -1.2, 3.42, 0, G);          // roof hatch / AC unit
    // side windows on both sides (dark tinted, so nobody is seen inside)
    const n = 6, pw = 1.08, gap = 0.16, x0 = -L / 2 + 0.7;
    [-1, 1].forEach(s => {
      for (let i = 0; i < n; i++) box(pw, 0.86, 0.05, glass, x0 + pw / 2 + i * (pw + gap), 2.38, s * (Wd / 2 + 0.012), G, false);
      box(1.3, 0.86, 0.05, glass, L / 2 - 1.05, 2.38, s * (Wd / 2 + 0.012), G, false);         // driver's window
      box(L - 0.6, 0.07, 0.03, chrome, 0, 1.9, s * (Wd / 2 + 0.02), G, false);                 // window sill trim
      box(0.5, 0.16, 0.06, mat('#f2a33a', { emissive: '#f2a33a', emissiveIntensity: 0.2 }), L / 2 - 0.3, 1.25, s * (Wd / 2 + 0.01), G, false); // indicator
    });
    box(0.05, 1.3, Wd - 0.3, glass, L / 2 + 0.012, 2.25, 0, G, false);    // windshield
    box(0.05, 0.9, Wd - 0.5, glass, -L / 2 - 0.012, 2.45, 0, G, false);   // rear window
    box(0.05, 0.3, 1.7, mat('#f6d84a', { emissive: '#f6d84a', emissiveIntensity: 0.35 }), L / 2 + 0.014, 3.02, 0, G, false); // destination board
    box(0.2, 0.3, Wd + 0.04, dark, L / 2 + 0.05, 0.56, 0, G); box(0.2, 0.3, Wd + 0.04, dark, -L / 2 - 0.05, 0.56, 0, G);       // bumpers
    box(0.3, 0.42, 1.3, dark, L / 2 + 0.01, 1.05, 0, G, false);          // radiator grille
    [-1, 1].forEach(s => {
      box(0.06, 0.2, 0.34, mat('#fff8d0', { emissive: '#fff2a8', emissiveIntensity: 0.7 }), L / 2 + 0.02, 1.02, s * 0.95, G, false);   // headlights
      box(0.06, 0.26, 0.2, mat('#d62828', { emissive: '#d62828', emissiveIntensity: 0.4 }), -L / 2 - 0.02, 1.1, s * 1.0, G, false);    // tail lights
      box(0.08, 0.34, 0.2, dark, L / 2 - 0.25, 2.55, s * (Wd / 2 + 0.22), G);                 // mirrors
    });
    // wheels: tyre + rim + five lug marks so that rolling is visible
    const tyreG = new THREE.CylinderGeometry(R, R, 0.34, 28).rotateX(Math.PI / 2), rimG = new THREE.CylinderGeometry(R * 0.58, R * 0.58, 0.36, 24).rotateX(Math.PI / 2);
    [[3.3], [-3.0]].forEach(ax => [-1, 1].forEach(s => {
      const w = new THREE.Group(); w.position.set(ax[0], R, s * (Wd / 2 - 0.1)); G.add(w);
      const t = new THREE.Mesh(tyreG, mat('#151515', { roughness: 0.95 })); t.castShadow = true; w.add(t);
      w.add(new THREE.Mesh(rimG, chrome));
      for (let k = 0; k < 5; k++) { const a = k * 2 * Math.PI / 5; const b = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.38), dark); b.position.set(Math.cos(a) * R * 0.34, Math.sin(a) * R * 0.34, 0); w.add(b); }
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(R * 1.05, 0.05, 0.37), mat('#8b9297')); w.add(spoke);
      wheels.push(w);
      const arch = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.32, R * 1.32, 0.03, 28).rotateX(Math.PI / 2), mat('#101214'));
      arch.position.set(ax[0], R + 0.04, s * (Wd / 2 + 0.006)); G.add(arch);                 // wheel arch
    }));
    return G;
  }

  /* the inside of the bus, shown only while the camera is inside it (kerb-side wall, seats, rails) */
  function mkInterior() {
    /* Window openings use exactly the outside spacing (6 windows, 1.08 m wide, 0.16 m pillars).
       Each double seat has its backrest on a pillar line and faces forward (+x), so seat rows and windows
       repeat together: one window beside every seat row. Floor at y = 0.9. */
    const G = new THREE.Group(), L = ROAD.BUS_L, Wd = ROAD.BUS_W, zw = -(Wd / 2 - 0.05);
    const FL = 0.9, SILL = 1.93, HEAD = 2.81, MID = (SILL + HEAD) / 2, WH = HEAD - SILL;
    const wall = mat('#d8d2c3', { roughness: 0.7 }), trim = mat('#3a4046', { roughness: 0.5 });
    const alu = mat('#aeb5ba', { roughness: 0.35, metalness: 0.6 }), chrome = mat('#c9ced2', { roughness: 0.3, metalness: 0.7 });
    const rex = mat('#1f4e79', { roughness: 0.75 }), rexD = mat('#173c5e', { roughness: 0.8 }), cloth = mat('#f4f1e8', { roughness: 0.95 });
    const curtain = mat('#8c2f39', { roughness: 0.95 });
    const glass = new THREE.MeshStandardMaterial({ color: '#8fb8cf', transparent: true, opacity: 0.32, roughness: 0.05, metalness: 0.2, depthWrite: false });
    const shine = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.16, depthWrite: false });
    box(L - 0.4, 0.06, Wd - 0.1, mat('#4b5157'), 0, FL, 0, G, false);                          // floor
    box(L - 0.4, SILL - FL, 0.06, wall, 0, (FL + SILL) / 2, zw, G, false);                     // wall under the windows
    box(L - 0.4, 3.23 - HEAD, 0.06, wall, 0, (HEAD + 3.23) / 2, zw, G, false);                 // wall over the windows
    box(L - 0.4, 0.05, Wd - 0.1, mat('#efebe1'), 0, 3.24, 0, G, false);                        // ceiling
    box(L - 0.4, 0.05, 0.16, trim, 0, SILL + 0.02, zw + 0.08, G, false);                       // inner sill ledge
    box(L - 0.4, 0.12, 0.05, mat('#c8b98f'), 0, FL + 0.55, zw + 0.04, G, false);               // dado stripe
    const n = 6, pw = 1.08, gap = 0.16, P = pw + gap, x0 = -L / 2 + 0.7;
    const pillarX = i => x0 + i * P - gap / 2;
    for (let i = 0; i <= n; i++) {
      box(gap, WH, 0.09, wall, pillarX(i), MID, zw + 0.01, G, false);                          // pillar
      const c = cyl(0.07, 0.09, 0.62, curtain, pillarX(i), HEAD - 0.36, zw + 0.12, G, 10);       // curtain tied back on the pillar
    }
    for (let i = 0; i < n; i++) {
      const xa = x0 + i * P, xc = xa + pw / 2, zf = zw + 0.03;
      // aluminium frame round the opening, and a centre rail where the two panes meet
      box(pw, 0.05, 0.05, alu, xc, SILL + 0.025, zf, G, false); box(pw, 0.05, 0.05, alu, xc, HEAD - 0.025, zf, G, false);
      box(0.04, WH, 0.05, alu, xa + 0.02, MID, zf, G, false); box(0.04, WH, 0.05, alu, xa + pw - 0.02, MID, zf, G, false);
      box(0.035, WH, 0.06, alu, xc, MID, zf - 0.02, G, false);
      // sliding glass: the rear pane is shut, the front half is open
      const g = new THREE.Mesh(new THREE.PlaneGeometry(pw / 2 - 0.04, WH - 0.08), glass); g.position.set(xa + pw / 4, MID, zw - 0.005); G.add(g);
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(0.07, WH - 0.12), shine); sh.rotation.z = -0.35; sh.position.set(xa + pw / 4 - 0.08, MID, zw + 0.0); G.add(sh);
      const sh2 = new THREE.Mesh(new THREE.PlaneGeometry(0.03, WH - 0.2), shine); sh2.rotation.z = -0.35; sh2.position.set(xa + pw / 4 + 0.04, MID, zw + 0.0); G.add(sh2);
    }
    const rail = cyl(0.022, 0.022, L - 1.2, chrome, 0, 3.02, -0.3, G, 10); rail.rotation.z = Math.PI / 2;     // overhead grab rail
    // double seats on the kerb side, facing forward; backrest on each pillar line
    for (let i = 1; i <= n; i++) {
      const xb = pillarX(i) + 0.04, z = -0.72, w = 0.9;
      box(0.46, 0.1, w, rexD, xb + 0.26, FL + 0.45, z, G, false);                              // cushion
      const back = box(0.08, 0.66, w, rex, xb, FL + 0.82, z, G, false); back.rotation.z = 0.1;   // backrest y 1.39..2.05, leaning back a little
      box(0.1, 0.16, w - 0.06, cloth, xb - 0.04, FL + 1.07, z, G, false);                      // white headrest cover
      const h = cyl(0.018, 0.018, w - 0.1, chrome, xb - 0.07, FL + 1.2, z, G, 10); h.rotation.x = Math.PI / 2;   // grab handle
      box(0.05, 0.4, 0.05, alu, xb + 0.26, FL + 0.2, z + w / 2 - 0.05, G, false);              // leg on the aisle side
    }
    box(0.5, 1.1, Wd - 0.2, trim, L / 2 - 0.35, 1.45, 0, G, false);                           // dashboard
    G.traverse(o => { o.castShadow = false; });
    return G;
  }

  function skyTexture() {
    const cv = document.createElement('canvas'); cv.width = 16; cv.height = 512; const g = cv.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 0, 512); gr.addColorStop(0, '#6fb6f2'); gr.addColorStop(0.55, '#bfe2fb'); gr.addColorStop(1, '#eef7fd');
    g.fillStyle = gr; g.fillRect(0, 0, 16, 512); return tex(cv);
  }


  /* ---------- canvas text sign ---------- */
  function sign(text, w, h, bg, fg, px) {
    const cv = document.createElement('canvas'); cv.width = Math.round(w * 100); cv.height = Math.round(h * 100); const g = cv.getContext('2d');
    g.fillStyle = bg; g.fillRect(0, 0, cv.width, cv.height); g.strokeStyle = fg; g.lineWidth = 8; g.strokeRect(10, 10, cv.width - 20, cv.height - 20);
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `700 ${px}px "Hind Siliguri"`; g.fillText(text, cv.width / 2, cv.height * 0.56);
    return new THREE.MeshStandardMaterial({ map: tex(cv), roughness: 0.7 });
  }

  /* ---------- a small sedan, drawn from its side profile ---------- */
  function mkCar(color) {
    const G = new THREE.Group(), L = ROAD.CAR_L, W = ROAD.CAR_W, R = ROAD.CAR_R, wl = [];
    const paint = mat(color, { roughness: 0.35, metalness: 0.25 }), dark = mat('#1f2226'), glass = mat('#1b2631', { roughness: 0.12, metalness: 0.4, side: THREE.DoubleSide });
    const prof = [[-2.2, 0.32], [2.2, 0.32], [2.22, 0.78], [2.05, 0.9], [1.25, 0.98], [0.55, 1.42], [-0.95, 1.44], [-1.75, 1.0], [-2.2, 0.94]];
    const sh = new THREE.Shape(); prof.forEach((p, i) => i ? sh.lineTo(p[0], p[1]) : sh.moveTo(p[0], p[1]));
    const body = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: W, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 2 }), paint);
    body.position.z = -W / 2; body.castShadow = true; body.receiveShadow = true; G.add(body);
    // side windows (dark tint, nobody seen inside), with a B pillar
    const win = [[-1.62, 1.0], [1.18, 1.0], [0.58, 1.38], [-0.9, 1.38]], ws = new THREE.Shape(); win.forEach((p, i) => i ? ws.lineTo(p[0], p[1]) : ws.moveTo(p[0], p[1]));
    [-1, 1].forEach(s => {
      const m = new THREE.Mesh(new THREE.ShapeGeometry(ws), glass); m.position.z = s * (W / 2 + 0.056); G.add(m);
      box(0.09, 0.42, 0.02, paint, -0.2, 1.19, s * (W / 2 + 0.06), G, false);
      box(0.32, 0.04, 0.03, mat('#c9ced2', { metalness: 0.7, roughness: 0.3 }), 0.55, 0.82, s * (W / 2 + 0.06), G, false);    // front door handle
      box(0.32, 0.04, 0.03, mat('#c9ced2', { metalness: 0.7, roughness: 0.3 }), -0.75, 0.82, s * (W / 2 + 0.06), G, false);   // rear door handle
      box(0.012, 0.5, 0.02, dark, -0.2, 0.62, s * (W / 2 + 0.055), G, false);                                               // door gap
      box(0.1, 0.12, 0.3, mat('#fff8d0', { emissive: '#fff2a8', emissiveIntensity: 0.6 }), 2.2, 0.72, s * 0.6, G, false);   // headlights
      box(0.08, 0.14, 0.32, mat('#d62828', { emissive: '#d62828', emissiveIntensity: 0.35 }), -2.22, 0.78, s * 0.58, G, false); // tail lights
      box(0.1, 0.08, 0.16, paint, 1.05, 1.05, s * (W / 2 + 0.12), G);                                                       // mirrors
    });
    // windscreen and rear screen lie on the sloping parts of the profile: (1.25,0.98)-(0.55,1.42) and (-0.95,1.44)-(-1.75,1.0)
    const screen = (x1, y1, x2, y2) => { const len = Math.hypot(x2 - x1, y2 - y1) - 0.1, gm = new THREE.PlaneGeometry(len, W - 0.2).rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(gm, glass); m.rotation.z = Math.atan2(y2 - y1, x2 - x1); m.position.set((x1 + x2) / 2, (y1 + y2) / 2 + 0.06, 0); G.add(m); };
    screen(0.55, 1.42, 1.25, 0.98); screen(-1.75, 1.0, -0.95, 1.44);
    box(0.16, 0.2, W + 0.06, dark, 2.24, 0.42, 0, G); box(0.16, 0.2, W + 0.06, dark, -2.24, 0.42, 0, G);                   // bumpers
    box(0.05, 0.12, 0.42, sign('ঢাকা মেট্রো', 0.42, 0.12, '#ffffff', '#111111', 7), -2.3, 0.6, 0, G, false);                // number plate
    const tg = new THREE.CylinderGeometry(R, R, 0.22, 26).rotateX(Math.PI / 2), rg = new THREE.CylinderGeometry(R * 0.6, R * 0.6, 0.24, 20).rotateX(Math.PI / 2);
    [1.35, -1.35].forEach(x => [-1, 1].forEach(s => {
      const w = new THREE.Group(); w.position.set(x, R, s * (W / 2 - 0.08)); G.add(w);
      const t = new THREE.Mesh(tg, mat('#151515', { roughness: 0.95 })); t.castShadow = true; w.add(t); w.add(new THREE.Mesh(rg, mat('#b9bfc4', { metalness: 0.7, roughness: 0.3 })));
      w.add(new THREE.Mesh(new THREE.BoxGeometry(R * 1.05, 0.05, 0.25), mat('#6b7177'))); wl.push(w);
    }));
    G.userData.wheels = wl; return G;
  }

  /* the cabin of car1, shown only while the camera is inside it */
  function mkCarInterior() {
    const G = new THREE.Group(), W = ROAD.CAR_W, zk = -(W / 2 - 0.04);
    const trim = mat('#4a4f57', { roughness: 0.7 }), beige = mat('#ddd5c4', { roughness: 0.8 }), seatM = mat('#5d6f86', { roughness: 0.9 });
    const lamp = new THREE.PointLight('#fff6e6', 0.9, 5, 1.5); lamp.position.set(-0.5, 1.3, 0.1); G.add(lamp);    // daylight coming in through the glass
    const glass = new THREE.MeshStandardMaterial({ color: '#7fa6bd', transparent: true, opacity: 0.22, roughness: 0.05, depthWrite: false });
    const rubber = mat('#15171a', { roughness: 0.6 });
    box(4.0, 0.05, W - 0.1, mat('#2c2f33'), 0, 0.42, 0, G, false);                          // floor
    box(3.0, 0.04, W - 0.1, beige, -0.2, 1.42, 0, G, false);                                // roof lining
    box(0.55, 0.14, W - 0.25, seatM, -0.75, 0.66, 0, G, false);                             // rear bench cushion
    const rb = box(0.12, 0.62, W - 0.25, seatM, -1.12, 0.98, 0, G, false); rb.rotation.z = 0.18;   // rear backrest
    [-0.42, 0.42].forEach(z => {                                                             // front seat backs and headrests
      const fb = box(0.12, 0.66, 0.6, seatM, 0.28, 0.98, z, G, false); fb.rotation.z = 0.16;
      box(0.1, 0.2, 0.3, seatM, 0.18, 1.38, z, G, false);
      box(0.02, 0.1, 0.02, mat('#9aa0a6', { metalness: 0.6 }), 0.2, 1.27, z - 0.1, G, false); box(0.02, 0.1, 0.02, mat('#9aa0a6', { metalness: 0.6 }), 0.2, 1.27, z + 0.1, G, false);
    });
    // kerb-side doors: lower panel, window openings with rubber frames, pillars, and glass
    // window openings y 0.96..1.38, matching the outside glass; door panel below, roof rail above
    box(3.4, 0.56, 0.05, trim, -0.15, 0.68, zk, G, false);                                  // door panels  y 0.40..0.96
    box(3.4, 0.05, 0.12, beige, -0.15, 0.97, zk + 0.05, G, false);                          // window sill
    box(3.4, 0.05, 0.08, beige, -0.15, 1.395, zk + 0.03, G, false);                         // roof rail
    box(0.5, 0.06, 0.05, mat('#9aa0a6', { metalness: 0.6 }), -0.75, 0.8, zk + 0.04, G, false);   // rear door pull
    [[-1.62, -0.25], [-0.15, 1.15]].forEach(([a, b]) => {
      const c = (a + b) / 2, w = b - a;
      box(w, 0.03, 0.04, rubber, c, 0.985, zk + 0.02, G, false); box(w, 0.03, 0.04, rubber, c, 1.37, zk + 0.02, G, false);
      box(0.03, 0.4, 0.04, rubber, a + 0.015, 1.175, zk + 0.02, G, false); box(0.03, 0.4, 0.04, rubber, b - 0.015, 1.175, zk + 0.02, G, false);
      const g = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.04, 0.38), glass); g.position.set(c, 1.175, zk - 0.01); G.add(g);
    });
    box(0.1, 0.42, 0.08, beige, -0.2, 1.17, zk + 0.02, G, false);                           // B pillar
    box(0.16, 0.42, 0.08, beige, -1.7, 1.17, zk + 0.02, G, false);                          // C pillar
    box(0.1, 0.42, 0.08, beige, 1.22, 1.17, zk + 0.02, G, false);                           // A pillar
    box(0.5, 0.35, W - 0.2, trim, 1.55, 0.82, 0, G, false);                                 // dashboard
    G.traverse(o => { o.castShadow = false; });
    return G;
  }

  /* ---------- railway station ---------- */
  function station() {
    const S = ROAD.ST, cx = (S.X0 + S.X1) / 2, len = S.X1 - S.X0;
    box(len, 0.1, 90, mat('#a8a08f'), cx, -0.06, 0, null, false);                          // ground
    box(len, 0.25, 3.6, mat('#7d776c', { roughness: 1 }), cx, 0.08, 0, null, false);        // ballast
    const sl = new THREE.BoxGeometry(0.25, 0.14, 2.6), sm = mat('#6b6158');
    for (let x = S.X0; x < S.X1; x += 0.65) { const m = new THREE.Mesh(sl, sm); m.position.set(x, 0.25, 0); m.receiveShadow = true; scene.add(m); }
    const rail = mat('#8d949a', { metalness: 0.7, roughness: 0.35 });
    [-1, 1].forEach(s => box(len, 0.16, 0.08, rail, cx, 0.39, s * S.RAIL_G / 2, null, false));
    // platform on the far side
    const pz0 = S.PLAT_Z, pz1 = -10, pH = S.PLAT_H;
    box(len - 40, pH, pz0 - pz1, mat('#bdb5a5'), cx, pH / 2, (pz0 + pz1) / 2);
    box(len - 40, 0.02, 0.35, mat('#f2c230'), cx, pH + 0.01, pz0 - 0.5, null, false);       // yellow safety line
    box(len - 40, 0.2, 0.25, mat('#e8e4d8'), cx, pH - 0.1, pz0 + 0.1, null, false);         // coping stone
    const post = mat('#5d6d7e', { metalness: 0.4, roughness: 0.5 });
    for (let x = S.X0 + 30; x <= S.X1 - 30; x += 8) { cyl(0.12, 0.12, 3.4, post, x, pH + 1.7, -6.2); }
    box(len - 60, 0.18, 6.4, mat('#8e2b2b', { roughness: 0.6 }), cx, pH + 3.5, -6.0);       // roof
    box(len - 60, 0.3, 0.1, mat('#f2c230'), cx, pH + 3.35, -2.82, null, false);             // roof fascia
    // station building and its name board
    box(len - 60, 6, 6, mat('#e6d3b3'), cx, 3, -13.2);
    for (let x = S.X0 + 34; x < S.X1 - 34; x += 6) { box(1.4, 2.2, 0.05, mat('#4a6a7d', { roughness: 0.2 }), x, pH + 1.8, -10.18, null, false); box(1.6, 0.12, 0.08, mat('#8a5a30'), x, pH + 3.0, -10.16, null, false); }
    const nb = sign('স্টেশন', 6, 1.2, '#ffffff', '#1f5fa8', 78);
    const b1 = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.2), nb); b1.position.set(S.YOU_X - 9, pH + 2.6, -5.9); scene.add(b1);
    box(0.08, 1.0, 0.08, post, S.YOU_X - 11.6, pH + 3.1, -5.95); box(0.08, 1.0, 0.08, post, S.YOU_X - 6.4, pH + 3.1, -5.95);
    box(2.2, 0.08, 0.6, mat('#8a5a30'), S.YOU_X + 6, pH + 0.48, -7.5); box(2.2, 0.08, 0.06, mat('#8a5a30'), S.YOU_X + 6, pH + 0.9, -7.8);   // bench
    // near side: a fence and low buildings far away
    const fz = 7, fp = mat('#9aa3a8', { metalness: 0.3 });
    box(len, 0.06, 0.06, fp, cx, 1.1, fz); box(len, 0.06, 0.06, fp, cx, 0.6, fz);
    for (let x = S.X0; x < S.X1; x += 2.5) box(0.08, 1.2, 0.08, fp, x, 0.6, fz);
    const r = rng(9);
    for (let x = S.X0 - 40; x < S.X1 + 40;) { const w = 8 + r() * 10, h = 5 + r() * 12; box(w, h, 8, mat(WALLS[Math.floor(r() * WALLS.length)]), x + w / 2, h / 2, 30 + r() * 6, null, false); x += w + 2; }
    for (let x = S.X0 - 40; x < S.X1 + 40;) { const w = 9 + r() * 10, h = 7 + r() * 14; box(w, h, 8, mat(WALLS[Math.floor(r() * WALLS.length)]), x + w / 2, h / 2, -24 - r() * 6, null, false); x += w + 2; }
  }
  /* a train: an engine and four coaches. Its position is the front of the engine, moving +x */
  function mkTrain() {
    const G = new THREE.Group(), wl = [];
    const blue = mat('#23468a', { roughness: 0.45 }), cream = mat('#efe4c8', { roughness: 0.5 }), glass = mat('#18222c', { roughness: 0.15, metalness: 0.4 });
    const dark = mat('#26282b'), roof = mat('#9aa3a8', { roughness: 0.5 });
    const bogie = (x, parent) => { [-0.9, 0.9].forEach(dx => [-1, 1].forEach(s => { const w = cyl(0.46, 0.46, 0.14, dark, x + dx, 0.85, s * 0.84, parent, 20); w.rotation.x = Math.PI / 2; wl.push(w); })); box(2.6, 0.35, 2.2, dark, x, 1.0, 0, parent); };
    // engine: 16 m, green with yellow bands
    const E = new THREE.Group(); G.add(E); const eL = 16, green = mat('#1e6b45', { roughness: 0.45 }), yel = mat('#f2c230', { roughness: 0.5 });
    box(eL, 2.5, 2.9, green, -eL / 2, 2.55, 0, E); box(eL, 0.3, 2.92, yel, -eL / 2, 1.5, 0, E); box(eL - 0.4, 0.25, 2.6, roof, -eL / 2, 3.95, 0, E);
    box(0.06, 1.0, 2.2, glass, 0.01, 3.0, 0, E, false); box(0.1, 0.5, 2.92, yel, 0.02, 1.9, 0, E, false);
    box(0.08, 0.25, 0.3, mat('#fff8d0', { emissive: '#fff2a8', emissiveIntensity: 0.8 }), 0.05, 3.7, 0, E, false);
    [-1, 1].forEach(s => { for (let i = 0; i < 3; i++) box(0.9, 0.7, 0.04, glass, -1.6 - i * 1.3, 3.0, s * 1.47, E, false); for (let x = -5; x > -15; x -= 0.9) box(0.5, 1.1, 0.04, mat('#164f33'), x, 2.6, s * 1.47, E, false); });
    bogie(-3.5, E); bogie(-12.5, E);
    // coaches: 20 m each, 1 m gap
    for (let c = 0; c < 4; c++) {
      const C = new THREE.Group(); C.position.x = -eL - 1 - c * 21 - 10; G.add(C);
      box(20, 2.8, 3.0, blue, 0, 2.6, 0, C); box(20, 0.75, 3.02, cream, 0, 2.95, 0, C, false); box(19.6, 0.3, 2.7, roof, 0, 4.1, 0, C);
      [-1, 1].forEach(s => { for (let x = -8.5; x <= 8.5; x += 1.55) box(1.05, 0.62, 0.04, glass, x, 2.95, s * 1.52, C, false);
        box(0.9, 2.0, 0.04, mat('#1b3466'), -9.2, 2.3, s * 1.52, C, false); box(0.9, 2.0, 0.04, mat('#1b3466'), 9.2, 2.3, s * 1.52, C, false); });
      bogie(-6.5, C); bogie(6.5, C);
      box(1.2, 2.4, 2.0, dark, 10.4, 2.5, 0, C);                                       // gangway
    }
    G.userData.wheels = wl; G.userData.len = eL + 4 * 21; return G;
  }

  /* ---------- village yard ---------- */
  function village() {
    const V = ROAD.VIL, x = V.X;
    box(140, 0.1, 90, mat('#b99a6a', { roughness: 1 }), x, -0.06, 0, null, false);           // packed earth yard
    // a tin-roofed house with bamboo-mat walls
    const H = new THREE.Group(); H.position.set(x - 2, 0, -9); scene.add(H);
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 256; const g = cv.getContext('2d');
    g.fillStyle = '#c9a66b'; g.fillRect(0, 0, 512, 256); g.strokeStyle = 'rgba(90,60,25,.35)'; g.lineWidth = 3;
    for (let i = 0; i < 512; i += 12) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 256); g.stroke(); } for (let j = 0; j < 256; j += 12) { g.beginPath(); g.moveTo(0, j); g.lineTo(512, j); g.stroke(); }
    const mt = tex(cv); mt.wrapS = mt.wrapT = THREE.RepeatWrapping; mt.repeat.set(3, 1.5);
    box(10, 3.0, 6, new THREE.MeshStandardMaterial({ map: mt, roughness: 1 }), 0, 1.5, 0, H);
    box(10.2, 0.4, 6.2, mat('#8a6a45'), 0, 0.2, 0, H);                                     // raised earth plinth
    box(1.2, 2.1, 0.06, mat('#6b4324'), -1.5, 1.45, 3.01, H, false); box(1.0, 0.8, 0.06, mat('#3d2a18'), 2.5, 1.9, 3.01, H, false);   // door, window
    for (let i = 0; i < 4; i++) box(0.06, 0.8, 0.07, mat('#6b4324'), 2.1 + i * 0.27, 1.9, 3.03, H, false);                            // window bars
    const tin = document.createElement('canvas'); tin.width = 256; tin.height = 64; const t2 = tin.getContext('2d');
    for (let i = 0; i < 256; i++) { const k = 0.5 + 0.5 * Math.sin(i / 256 * Math.PI * 24); t2.fillStyle = `rgb(${120 + 60 * k},${130 + 60 * k},${138 + 60 * k})`; t2.fillRect(i, 0, 1, 64); }
    const tt = tex(tin); tt.wrapS = tt.wrapT = THREE.RepeatWrapping; tt.repeat.set(4, 1);
    const tm = new THREE.MeshStandardMaterial({ map: tt, roughness: 0.45, metalness: 0.5, side: THREE.DoubleSide });
    [-1, 1].forEach(s => { const r = new THREE.Mesh(new THREE.PlaneGeometry(11.4, 4.1), tm); r.position.set(0, 3.95, s * 1.75); r.rotation.x = -Math.PI / 2 + s * -0.52; r.rotation.order = 'YXZ'; r.castShadow = true; r.receiveShadow = true; H.add(r); });
    // clay water pot (kolshi) by the wall, turned on a lathe
    const pts = [[0, 0], [0.16, 0.02], [0.27, 0.12], [0.3, 0.26], [0.27, 0.4], [0.16, 0.5], [0.09, 0.54], [0.09, 0.6], [0.13, 0.63]].map(p => new THREE.Vector2(p[0], p[1]));
    const k = new THREE.Mesh(new THREE.LatheGeometry(pts, 32), mat('#a65a22', { roughness: 0.8 })); k.position.set(x + 4.2, 0, -5.4); k.castShadow = true; scene.add(k);
    // clothesline with two bamboo poles and drying clothes
    const bam = mat('#b08948');
    cyl(0.05, 0.05, 2.2, bam, x - 6, 1.1, -3.2); cyl(0.05, 0.05, 2.2, bam, x + 2, 1.1, -3.2);
    box(8, 0.015, 0.015, mat('#4a3b2c'), x - 2, 2.05, -3.2, null, false);
    [['#c0392b', -4.6], ['#2e86ab', -2.8], ['#f2c230', -1.0]].forEach(([c, dx]) => box(1.1, 0.9, 0.02, mat(c, { roughness: 1 }), x + dx, 1.6, -3.2));
    // the football: white with black patches, size 5
    const bc = document.createElement('canvas'); bc.width = 256; bc.height = 128; const b2 = bc.getContext('2d');
    b2.fillStyle = '#f7f7f2'; b2.fillRect(0, 0, 256, 128); b2.fillStyle = '#111';
    [[20, 30], [84, 30], [148, 30], [212, 30], [52, 92], [116, 92], [180, 92], [244, 92]].forEach(([u, v]) => { b2.beginPath(); for (let i = 0; i < 5; i++) { const a = i * 2 * Math.PI / 5 - Math.PI / 2; b2.lineTo(u + 14 * Math.cos(a), v + 14 * Math.sin(a)); } b2.fill(); });
    ball = new THREE.Mesh(new THREE.SphereGeometry(V.BALL_R, 32, 20), new THREE.MeshStandardMaterial({ map: tex(bc), roughness: 0.5 })); ball.castShadow = true; scene.add(ball);
  }

  /* balcony railing, shown only for the shot from the flat */
  function mkBalcony() {
    const B = ROAD.BALCONY, G = new THREE.Group(); G.position.set(B.x, B.y - 1.5, B.z); scene.add(G);
    const m = mat('#e9e6dc', { roughness: 0.5 }), dark = mat('#4b4f54', { metalness: 0.5, roughness: 0.4 });
    box(4.4, 0.18, 1.4, mat('#bdb6a8'), 0, 0, 0.75, G, false);                       // balcony floor
    box(4.4, 0.08, 0.1, m, 0, 1.05, 1.45, G, false);                                 // hand rail
    for (let x = -2.1; x <= 2.1; x += 0.14) box(0.025, 1.0, 0.025, dark, x, 0.55, 1.45, G, false);   // grille bars
    box(0.08, 1.1, 1.4, m, -2.2, 0.55, 0.75, G, false); box(0.08, 1.1, 1.4, m, 2.2, 0.55, 0.75, G, false);
    const pot = cyl(0.16, 0.12, 0.3, mat('#a65a22'), 1.6, 0.25, 1.15, G, 16);         // an empty flower pot
    return G;
  }

  function build() {
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gl'), antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(1); renderer.setSize(1920, 1080, false);
    renderer.outputEncoding = THREE.sRGBEncoding; renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene = new THREE.Scene(); scene.background = skyTexture();
    camera = new THREE.PerspectiveCamera(ROAD.CAM.fov, 16 / 9, 0.12, 600);
    scene.add(new THREE.HemisphereLight('#dff0ff', '#8a8272', 0.62));
    // the sun: one distant source, so every shadow in the scene is parallel and falls away from it
    sun = new THREE.DirectionalLight('#fff4dc', 1.05); sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096);
    const sc = sun.shadow.camera; sc.left = -46; sc.right = 46; sc.top = 34; sc.bottom = -34; sc.near = 1; sc.far = 150; sun.shadow.bias = -0.0006;
    scene.add(sun); scene.add(sun.target);
    ground(); buildings(); lampPosts(); busStop(); station(); village();
    bus = mkBus(); scene.add(bus);
    interior = mkInterior(); scene.add(interior);
    car1 = mkCar('#b3261e'); scene.add(car1); car2 = mkCar('#e9ecef'); scene.add(car2);
    carIn = mkCarInterior(); scene.add(carIn);
    train = mkTrain(); scene.add(train);
    balcony = mkBalcony();
    built = true;
  }

  /* camera descriptions: {pos:[x,y,z], look:[x,y,z], fov} */
  const third = camX => { const C = ROAD.CAM; return { pos: [camX + C.dx, C.y, C.z], look: [camX + C.lookDx, C.lookY, C.lookZ], fov: C.fov }; };
  /* Ariyan's eyes at the bus stop: looking up the road towards the coming bus, the next lamp post on his right */
  const ariyan = () => { const A = ROAD.ARI; return { pos: [A.x, A.y, A.z], look: [A.x - 10, A.y + 0.9, A.z + 3.6], fov: 58 }; };
  /* your eyes in the bus: looking out of the kerb-side window, a little towards the front */
  const seat = busX => { const s = ROAD.SEAT, x = busX + s.dx, z = ROAD.LANE_Z + s.dz; return { pos: [x, s.y, z], look: [x + 1.8, s.y - 0.22, z - 2.7], fov: 64 }; };
  const mix = (a, b, k) => ({ pos: a.pos.map((v, i) => v + (b.pos[i] - v) * k), look: a.look.map((v, i) => v + (b.look[i] - v) * k), fov: a.fov + (b.fov - a.fov) * k });
  function setCam(c) { camera.fov = c.fov; camera.updateProjectionMatrix(); camera.position.set(...c.pos); camera.lookAt(...c.look); camera.updateMatrixWorld(); }
  /* world x where a screen edge (ndcX = -1 left, +1 right) meets the bus lane at height y, for the third-person camera */
  function edgeX(camX, ndcX, y = 1.6) {
    if (!built) build(); setCam(third(camX));
    let lo = camX - 80, hi = camX + 80;                 // screen x grows with world x, so bisect
    for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2, p = v3(m, y, ROAD.LANE_Z).project(camera); if (p.x < ndcX) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  /* is the camera inside a vehicle box at (x, laneZ)? The margin is only on the lake side (+z), where cameras fly in */
  function inBox(c, x, L, W, H, laneZ, margin) {
    const [cx, cy, cz] = c.pos, dz = cz - laneZ;
    return Math.abs(cx - x) < L / 2 && dz > -W / 2 && dz < W / 2 + margin && cy > 0.2 && cy < H + 0.6;
  }
  /* place a vehicle: x = centre, dir = +1 (heading +x) or -1, wheels roll without slipping (angle = distance / radius) */
  function place(v, x, z, dir, R) { v.visible = true; v.position.set(x, 0, z); v.rotation.y = dir > 0 ? 0 : Math.PI; v.userData.wheels.forEach(w => { w.rotation.z = -x * dir / R; }); }

  /* o: {cam, busX, car1:{x,dir,z}, car2:{x,dir,z}, trainX (front of engine), ballS (metres rolled), balcony}
     ->  projector P(x,y,z) = [sx, sy, inFront] in stage pixels */
  function frame(o) {
    if (!built) build();
    setCam(o.cam);
    const lx = Math.round(o.cam.look[0]);               // light follows the view in whole metres: its direction never changes
    sun.position.set(lx - 22, 38, 30); sun.target.position.set(lx, 0, -4); sun.target.updateMatrixWorld();
    if (o.busX === undefined) { bus.visible = false; interior.visible = false; }
    else {
      const inside = inBox(o.cam, o.busX, ROAD.BUS_L, ROAD.BUS_W, ROAD.BUS_H, ROAD.LANE_Z, 1.6);
      bus.visible = !inside; interior.visible = inside;   // from inside, the outer shell is swapped for the cabin
      bus.position.set(o.busX, 0, ROAD.LANE_Z); interior.position.set(o.busX, 0, ROAD.LANE_Z);
      wheels.forEach(w => { w.rotation.z = -o.busX / ROAD.WHEEL_R; });
    }
    carIn.visible = false;
    if (o.car1) {
      const c = o.car1, z = c.z === undefined ? ROAD.LANE_Z : c.z;
      place(car1, c.x, z, c.dir || 1, ROAD.CAR_R);
      if (inBox(o.cam, c.x, ROAD.CAR_L, ROAD.CAR_W, 1.45, z, 1.2)) { car1.visible = false; carIn.visible = true; carIn.position.set(c.x, 0, z); }
    } else car1.visible = false;
    if (o.car2) { const c = o.car2; place(car2, c.x, c.z === undefined ? ROAD.NEAR_Z : c.z, c.dir || -1, ROAD.CAR_R); } else car2.visible = false;
    if (o.trainX === undefined) train.visible = false;
    else { train.visible = true; train.position.set(o.trainX, 0.08, 0); train.userData.wheels.forEach(w => { w.rotation.y = -o.trainX / 0.46; }); }
    if (o.ballS === undefined) ball.visible = false;
    else { const V = ROAD.VIL; ball.visible = true; ball.position.set(V.X - 5 + o.ballS, V.BALL_R, 1.2); ball.rotation.set(0, 0, -o.ballS / V.BALL_R); }
    balcony.visible = !!o.balcony;
    renderer.render(scene, camera);
    return (x, y, z) => { const p = v3(x, y, z).project(camera); return [(p.x + 1) * 960, (1 - p.y) * 540, p.z < 1 && p.z > -1]; };
  }
  /* more eye positions */
  const atStop = (x, z, lookDx, lookDy, lookDz, fov = 58) => ({ pos: [x, 1.5, z], look: [x + lookDx, 1.5 + lookDy, z + lookDz], fov });
  const carYou = carX => { const s = ROAD.CAR_YOU, x = carX + s.dx, z = ROAD.LANE_Z + s.dz; return { pos: [x, s.y - 0.04, z], look: [x + 0.1, s.y + 0.06, z - 3], fov: 70 }; };
  const platform = () => { const S = ROAD.ST; return { pos: [S.YOU_X, S.PLAT_H + 1.5, S.YOU_Z], look: [S.YOU_X - 9, S.PLAT_H + 1.2, 6], fov: 60 }; };
  const yard = () => { const V = ROAD.VIL; return { pos: [V.X - 1.5, 1.5, 7.2], look: [V.X - 1.5, 0.7, -3], fov: 44 }; };
  const flat = () => { const B = ROAD.BALCONY; return { pos: [B.x, B.y + 0.1, B.z + 1.2], look: [B.x - 10, 0.5, 2.5], fov: 64 }; };   // looking down and along the road
  return { frame, edgeX, third, ariyan, seat, mix, atStop, carYou, platform, yard, flat,
    lamps(xa, xb) { const out = []; for (let x = lampXs().first; x < ROAD.X_MAX; x += ROAD.LAMP_GAP) if (x >= xa && x <= xb) out.push(x); return out; } };
})();
