/* 2D drawings for the parts that are not on the 3D street (SVG, 1920x1080).
   Real objects are shaded and proportioned like the real thing; diagram marks stay plain. */

/* ---------- study desk, side view at eye level ---------- */
const DESK = { TOP: 640, X0: 260, X1: 1660 };   // table top y and ends, in px; 1 cm ≈ 7.5 px
function wallBg() {
  return `<defs><linearGradient id="wallg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e3c4"/><stop offset="1" stop-color="#e3cfa8"/></linearGradient>
    <linearGradient id="woodg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8703d"/><stop offset="1" stop-color="#7d4e27"/></linearGradient></defs>
    <rect width="1920" height="1080" fill="url(#wallg)"/><rect y="930" width="1920" height="150" fill="#b48a5f"/><rect y="926" width="1920" height="8" fill="#8f6a44"/>`;
}
function desk() {
  const { TOP, X0, X1 } = DESK;
  return `<rect x="${X0}" y="${TOP}" width="${X1 - X0}" height="34" rx="6" fill="url(#woodg)"/>
    <rect x="${X0}" y="${TOP}" width="${X1 - X0}" height="6" rx="3" fill="#c48a52"/>
    <rect x="${X0 + 40}" y="${TOP + 34}" width="34" height="${930 - TOP - 34}" fill="#6b4120"/><rect x="${X1 - 74}" y="${TOP + 34}" width="34" height="${930 - TOP - 34}" fill="#6b4120"/>
    <rect x="${X0 + 74}" y="${TOP + 34}" width="${X1 - X0 - 148}" height="70" fill="#8a5a30"/><rect x="${(X0 + X1) / 2 - 40}" y="${TOP + 62}" width="80" height="12" rx="6" fill="#d9b27a"/>
    <ellipse cx="${(X0 + X1) / 2}" cy="${930 + 22}" rx="${(X1 - X0) / 2}" ry="14" fill="#000" opacity=".12"/>`;
}
/* a closed hardback book lying flat, seen from the side: spine towards the viewer */
function bookSide(x, w = 300, h = 46, c = '#1f5fa8') {
  const y = DESK.TOP - h;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c}"/>
    <rect x="${x + 6}" y="${y + 7}" width="${w - 12}" height="${h - 14}" rx="2" fill="#f6f1e2"/>
    ${[0.3, 0.5, 0.7].map(k => `<line x1="${x + 8}" y1="${F(y + 7 + (h - 14) * k)}" x2="${x + w - 8}" y2="${F(y + 7 + (h - 14) * k)}" stroke="#d8cfb6" stroke-width="2"/>`).join('')}
    <rect x="${x}" y="${y}" width="${w}" height="8" rx="4" fill="${c}"/><rect x="${x}" y="${y + h - 8}" width="${w}" height="8" rx="4" fill="${c}"/>
    <rect x="${x + w * 0.3}" y="${y + 1}" width="${w * 0.4}" height="5" fill="#f2c230" opacity=".9"/>`;
}
/* an exercise book (khata) lying flat: thin, soft cover */
function khataSide(x, w = 260, h = 14) {
  const y = DESK.TOP - h;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#f7f4ea"/><rect x="${x}" y="${y}" width="${w}" height="4" rx="2" fill="#c0392b"/><rect x="${x}" y="${y + h - 4}" width="${w}" height="4" rx="2" fill="#c0392b"/>
    <line x1="${x + 6}" y1="${y + h / 2}" x2="${x + w - 6}" y2="${y + h / 2}" stroke="#d8cfb6" stroke-width="2"/>`;
}
/* ballpoint pen, drawn along +x from (0,0), 150 mm ≈ 300 px */
function penShape() {
  return `<path d="M0 0 L22 -6 L22 6 Z" fill="#c9ced2"/><circle cx="1" cy="0" r="2.5" fill="#1a1a2e"/>
    <rect x="22" y="-8" width="40" height="16" rx="4" fill="#2b2f36"/>${[28, 34, 40, 46, 52].map(x => `<line x1="${x}" y1="-8" x2="${x}" y2="8" stroke="#45494f" stroke-width="2"/>`).join('')}
    <rect x="60" y="-9" width="230" height="18" rx="9" fill="#2e86de"/><rect x="66" y="-7" width="218" height="5" rx="2.5" fill="#fff" opacity=".35"/>
    <rect x="210" y="-12" width="70" height="7" rx="3.5" fill="#1b5fa8"/><rect x="284" y="-9" width="14" height="18" rx="6" fill="#1b5fa8"/>`;
}
/* dotted measuring line with a length readout in the middle */
function measure(x1, y1, x2, y2, c = '#0f1b3d', o = 1) {
  if (o <= 0) return '';
  return `<g opacity="${cl(o).toFixed(2)}"><line x1="${F(x1)}" y1="${F(y1)}" x2="${F(x2)}" y2="${F(y2)}" stroke="${c}" stroke-width="6" stroke-dasharray="3 14" stroke-linecap="round"/>
    <circle cx="${F(x1)}" cy="${F(y1)}" r="9" fill="${c}"/><circle cx="${F(x2)}" cy="${F(y2)}" r="9" fill="${c}"/></g>`;
}
/* analogue wall clock; sec = seconds elapsed (the minute hand moves 6° a minute, the second hand 6° a second) */
function clock(x, y, r, sec, o = 1) {
  if (o <= 0) return '';
  const sa = sec * 6, ma = 60 + sec * 0.1, ha = 300 + sec / 120;
  let s = `<g opacity="${cl(o).toFixed(2)}" transform="translate(${x},${y})"><circle r="${r + 10}" fill="#6b4324"/><circle r="${r}" fill="#fffdf6"/>`;
  for (let i = 0; i < 12; i++) s += `<line x1="0" y1="${-r * 0.82}" x2="0" y2="${-r * 0.95}" stroke="#1a1a2e" stroke-width="${i % 3 ? 3 : 6}" transform="rotate(${i * 30})"/>`;
  s += `<line x1="0" y1="0" x2="0" y2="${-r * 0.5}" stroke="#1a1a2e" stroke-width="9" stroke-linecap="round" transform="rotate(${F(ha)})"/>
    <line x1="0" y1="0" x2="0" y2="${-r * 0.75}" stroke="#1a1a2e" stroke-width="6" stroke-linecap="round" transform="rotate(${F(ma)})"/>
    <line x1="0" y1="${r * 0.15}" x2="0" y2="${-r * 0.82}" stroke="#e63946" stroke-width="3" stroke-linecap="round" transform="rotate(${F(sa)})"/><circle r="7" fill="#e63946"/></g>`;
  return s;
}
/* ---------- video 2: floor, carton, pushing hand ---------- */
/* room wall above a wooden plank floor seen slightly from above; yF = where the wall meets the floor */
function plankRoom(yF = 700) {
  let s = `<defs><linearGradient id="wall2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe0c0"/><stop offset="1" stop-color="#dcc79f"/></linearGradient>
    <linearGradient id="floor2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9c6a3c"/><stop offset="1" stop-color="#c08a55"/></linearGradient></defs>
    <rect width="1920" height="${yF}" fill="url(#wall2)"/><rect y="${yF}" width="1920" height="${1080 - yF}" fill="url(#floor2)"/>
    <rect y="${yF - 26}" width="1920" height="26" fill="#f6efe0"/><rect y="${yF - 4}" width="1920" height="6" fill="#7a5230"/>`;
  // planks run left-right; rows get taller towards the viewer (perspective), joints staggered
  let y = yF, hRow = 26, row = 0;
  while (y < 1080) {
    s += `<line x1="0" y1="${F(y)}" x2="1920" y2="${F(y)}" stroke="#7d5330" stroke-width="2" opacity=".55"/>`;
    for (let x = (row % 2 ? -220 : -40); x < 1920; x += 520) s += `<line x1="${x}" y1="${F(y)}" x2="${x}" y2="${F(y + hRow)}" stroke="#7d5330" stroke-width="2" opacity=".45"/>`;
    if (row % 3 === 1) s += `<rect x="0" y="${F(y + 2)}" width="1920" height="${F(hRow - 4)}" fill="#fff" opacity=".05"/>`;
    y += hRow; hRow *= 1.18; row++;
  }
  return s;
}
/* corrugated cardboard carton, front face w x h px standing on yFloor with its front-left corner at x;
   a thin top face shows that we look slightly from above */
function carton(x, yFloor, w, h, o = 1, dash = false) {
  const tp = 26, dx = 34, y = yFloor - h;
  if (dash) return `<g opacity="${cl(o).toFixed(2)}" fill="none" stroke="#0f1b3d" stroke-width="4" stroke-dasharray="14 10">
    <rect x="${F(x)}" y="${F(y)}" width="${w}" height="${h}"/><path d="M${F(x)} ${F(y)} L${F(x + dx)} ${F(y - tp)} L${F(x + w + dx)} ${F(y - tp)} L${F(x + w)} ${F(y)}"/></g>`;
  return `<g opacity="${cl(o).toFixed(2)}">
    <ellipse cx="${F(x + w / 2 + 10)}" cy="${F(yFloor + 4)}" rx="${F(w * 0.56)}" ry="12" fill="#000" opacity=".22"/>
    <path d="M${F(x)} ${F(y)} L${F(x + dx)} ${F(y - tp)} L${F(x + w + dx)} ${F(y - tp)} L${F(x + w)} ${F(y)} Z" fill="#d8a96f"/>
    <path d="M${F(x + w * 0.42)} ${F(y)} L${F(x + w * 0.42 + dx)} ${F(y - tp)} L${F(x + w * 0.58 + dx)} ${F(y - tp)} L${F(x + w * 0.58)} ${F(y)} Z" fill="#b8925a" opacity=".8"/>
    <path d="M${F(x + w)} ${F(y)} L${F(x + w + dx)} ${F(y - tp)} L${F(x + w + dx)} ${F(yFloor - tp)} L${F(x + w)} ${F(yFloor)} Z" fill="#9c6c3c"/>
    <rect x="${F(x)}" y="${F(y)}" width="${w}" height="${h}" fill="#c08a52"/>
    <rect x="${F(x)}" y="${F(y)}" width="${w}" height="${F(h * 0.16)}" fill="#cf9a60"/><line x1="${F(x)}" y1="${F(y + h * 0.16)}" x2="${F(x + w)}" y2="${F(y + h * 0.16)}" stroke="#94643a" stroke-width="2"/>
    <rect x="${F(x + w * 0.42)}" y="${F(y)}" width="${F(w * 0.16)}" height="${F(h * 0.3)}" fill="#a98250" opacity=".75"/>
    <rect x="${F(x + w - 22)}" y="${F(y)}" width="22" height="${h}" fill="#000" opacity=".06"/>
    <g transform="translate(${F(x + w * 0.22)},${F(y + h * 0.58)})" fill="none" stroke="#6b4324" stroke-width="4" opacity=".7"><path d="M-14 16 L-14 -10 M-22 -2 L-14 -14 L-6 -2"/><path d="M14 16 L14 -10 M6 -2 L14 -14 L22 -2"/><line x1="-26" y1="22" x2="26" y2="22"/></g>
    <rect x="${F(x)}" y="${F(y)}" width="${w}" height="${h}" fill="none" stroke="#7a5030" stroke-width="2"/></g>`;
}
/* straight yellow arrow from (x1,y) to (x2,y) with a navy outline (for distances on a figure) */
function hArrow(x1, x2, y, p = 1, c = Y) {
  if (p <= 0) return '';
  const x = x1 + (x2 - x1) * cl(p), d = Math.sign(x2 - x1) || 1;
  return `<g><line x1="${F(x1)}" y1="${y}" x2="${F(x - d * 18)}" y2="${y}" stroke="#0f1b3d" stroke-width="16" stroke-linecap="round"/><polygon points="${F(x + d * 6)},${y} ${F(x - d * 34)},${y - 22} ${F(x - d * 34)},${y + 22}" fill="#0f1b3d"/>
    <line x1="${F(x1)}" y1="${y}" x2="${F(x - d * 18)}" y2="${y}" stroke="${c}" stroke-width="8" stroke-linecap="round"/><polygon points="${F(x)},${y} ${F(x - d * 28)},${y - 15} ${F(x - d * 28)},${y + 15}" fill="${c}"/></g>`;
}

/* ---------- ceiling fan seen a little from below (textbook fig 10.6 / 10.8) ----------
   The blades turn in a horizontal plane; seen from below at an angle the plane is squashed by K (= sin of the
   viewing angle). R = blade-tip radius in px. ang = rotation in degrees (counter-clockwise seen from below).
   fanPt(...) gives the screen point of a spot on blade i at radius fraction f, so marks ride exactly on the blades. */
const FAN = { K: 0.36, ROOT: 0.2 };
function fanPt(cx, cy, R, ang, i, f, K = FAN.K) {
  const a = (ang + i * 120) * Math.PI / 180;
  return [cx + f * R * Math.cos(a), cy + f * R * Math.sin(a) * K];
}
function fan2d(cx, cy, R, ang, o = {}) {
  const K = o.K || FAN.K, rodTop = o.rodTop === undefined ? cy - R * 0.75 : o.rodTop;
  const P = (x, z) => `${F(cx + x)},${F(cy + z * K)}`;
  let s = `<rect x="${F(cx - 7)}" y="${F(rodTop)}" width="14" height="${F(cy - rodTop - R * 0.1)}" fill="#8f979c"/>`;
  if (o.canopy !== false) s += `<path d="M${F(cx - 42)} ${F(rodTop + 2)} L${F(cx + 42)} ${F(rodTop + 2)} L${F(cx + 26)} ${F(rodTop + 26)} L${F(cx - 26)} ${F(rodTop + 26)} Z" fill="#b8b2a3"/>`;
  // motor housing: a short drum
  const hr = R * 0.17, hh = R * 0.11;
  s += `<path d="M${F(cx - hr)} ${F(cy - hh)} L${F(cx - hr)} ${F(cy)} A${F(hr)} ${F(hr * K)} 0 0 0 ${F(cx + hr)} ${F(cy)} L${F(cx + hr)} ${F(cy - hh)} Z" fill="#a39d8c"/>
    <ellipse cx="${F(cx)}" cy="${F(cy - hh)}" rx="${F(hr)}" ry="${F(hr * K)}" fill="#c9c3b2"/>`;
  // blades: tapered boards with rounded tips, on metal arms
  for (let i = 0; i < 3; i++) {
    const a = (ang + i * 120) * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
    const pt = (u, v) => P(u * c - v * sn, u * sn + v * c);
    const r0 = FAN.ROOT * R, w0 = 0.075 * R, w1 = 0.11 * R;
    s += `<path d="M${pt(hr * 0.6, -0.025 * R)} L${pt(r0 + 0.04 * R, -0.03 * R)} L${pt(r0 + 0.04 * R, 0.03 * R)} L${pt(hr * 0.6, 0.025 * R)} Z" fill="#5d6468"/>`;
    s += `<path d="M${pt(r0, -w0)} L${pt(R * 0.93, -w1)} Q${pt(R * 1.02, 0)} ${pt(R * 0.93, w1)} L${pt(r0, w0)} Z" fill="${o.blade || '#e6dfcd'}" stroke="#9e9682" stroke-width="3"/>`;
    s += `<path d="M${pt(r0 + 0.05 * R, -w0 * 0.2)} L${pt(R * 0.9, -w1 * 0.25)}" stroke="#fff" stroke-width="5" opacity=".35" stroke-linecap="round"/>`;
  }
  s += `<ellipse cx="${F(cx)}" cy="${F(cy + 4)}" rx="${F(hr * 0.75)}" ry="${F(hr * 0.75 * K)}" fill="#8a8474"/><ellipse cx="${F(cx)}" cy="${F(cy + 2)}" rx="${F(hr * 0.45)}" ry="${F(hr * 0.45 * K)}" fill="#d8d2c1"/>`;
  return s;
}
/* a dotted circle of radius r (px) in the fan plane, as seen at the viewing angle; p = part drawn (0..1) from angle a0 */
function fanCircle(cx, cy, r, c, p = 1, a0 = 0, K = FAN.K, dash = '4 12') {
  if (p <= 0) return '';
  let d = ''; const n = Math.max(2, Math.round(96 * p));
  for (let k = 0; k <= n; k++) { const a = (a0 + 360 * p * k / n) * Math.PI / 180; d += (k ? 'L' : 'M') + F(cx + r * Math.cos(a)) + ' ' + F(cy + r * Math.sin(a) * K); }
  return `<path d="${d}" fill="none" stroke="${c}" stroke-width="6" stroke-dasharray="${dash}" stroke-linecap="round"/>`;
}
/* table clock in a wooden case with a back stand, like the textbook figure; sec = seconds shown */
function tableClock(x, y, s, sec) {
  return `<g transform="translate(${F(x)},${F(y)}) scale(${s})">
    <path d="M60 150 L130 175 L120 -120 L70 -140 Z" fill="#2b2b2b"/>
    <rect x="-150" y="-160" width="300" height="320" rx="34" fill="#7a4a26"/><rect x="-136" y="-146" width="272" height="292" rx="26" fill="#9b6236"/>
    <rect x="-150" y="-160" width="300" height="24" rx="12" fill="#fff" opacity=".12"/></g>` + clock(x, y, 112 * s, sec);
}
/* plastic ruler resting on a table top (side view), bent by a cantilever's first vibration shape.
   xEdge = table edge (px), yTop = table top, Lout = length outside the edge (px), Lin = length on the table,
   tip = tip displacement in px (down positive). Mode shape of a clamped beam: β = 1.8751, σ = 0.7341. */
function cantShape(xi) { const b = 1.8751 * xi, sg = 0.7341; return (Math.cosh(b) - Math.cos(b) - sg * (Math.sinh(b) - Math.sin(b))) / 2.7242; }   // 1 at the tip
function rulerSide(xEdge, yTop, Lin, Lout, tip, o = 1) {
  const th = 10; let top = '', bot = '';
  const pts = [];
  for (let k = 0; k <= 30; k++) { const xi = k / 30; pts.push([xEdge + xi * Lout, yTop - th + tip * cantShape(xi)]); }
  top = `M${F(xEdge - Lin)} ${F(yTop - th)} ` + pts.map(p => `L${F(p[0])} ${F(p[1])}`).join(' ');
  bot = pts.slice().reverse().map(p => `L${F(p[0])} ${F(p[1] + th)}`).join(' ') + ` L${F(xEdge - Lin)} ${F(yTop)} Z`;
  let ticks = '';
  for (let k = 1; k < 30; k++) { const xx = xEdge - Lin + (Lin + Lout) * k / 30; if (xx < xEdge) ticks += `<line x1="${F(xx)}" y1="${F(yTop - th)}" x2="${F(xx)}" y2="${F(yTop - th + (k % 5 ? 4 : 7))}" stroke="#2c3e50" stroke-width="2"/>`; }
  return `<g opacity="${cl(o).toFixed(2)}"><path d="${top} ${bot}" fill="#f2d16b" stroke="#c9a53a" stroke-width="2"/>${ticks}</g>`;
}
/* a table seen from the side at eye level: top surface from x0 to xEdge at height yTop, legs to the floor yFloor */
function tableSide(x0, xEdge, yTop, yFloor) {
  return `<rect x="${F(x0)}" y="${F(yTop)}" width="${F(xEdge - x0)}" height="30" rx="5" fill="url(#woodg)"/><rect x="${F(x0)}" y="${F(yTop)}" width="${F(xEdge - x0)}" height="6" rx="3" fill="#c48a52"/>
    <rect x="${F(xEdge - 70)}" y="${F(yTop + 30)}" width="30" height="${F(yFloor - yTop - 30)}" fill="#6b4120"/><rect x="${F(x0 + 40)}" y="${F(yTop + 30)}" width="30" height="${F(yFloor - yTop - 30)}" fill="#6b4120"/>
    <rect x="${F(x0 + 70)}" y="${F(yTop + 30)}" width="${F(xEdge - x0 - 140)}" height="50" fill="#8a5a30"/>`;
}
/* a smooth grey river pebble (nuri pathor), r = half width in px, lit from the upper left */
function pebble(x, y, r, rot = 0) {
  return `<g transform="translate(${F(x)},${F(y)}) rotate(${F(rot)})"><ellipse cx="0" cy="0" rx="${F(r)}" ry="${F(r * 0.78)}" fill="#7d8287"/>
    <ellipse cx="${F(r * 0.12)}" cy="${F(r * 0.14)}" rx="${F(r * 0.82)}" ry="${F(r * 0.58)}" fill="#6b7075"/>
    <ellipse cx="${F(-r * 0.32)}" cy="${F(-r * 0.3)}" rx="${F(r * 0.34)}" ry="${F(r * 0.2)}" fill="#c3c7ca" opacity=".8"/>
    <circle cx="${F(r * 0.3)}" cy="${F(r * 0.1)}" r="${F(r * 0.06)}" fill="#55595d"/><circle cx="${F(-r * 0.1)}" cy="${F(r * 0.4)}" r="${F(r * 0.05)}" fill="#55595d"/></g>`;
}

/* a clay brick seen from the side (23 x 7 cm face), bottom-left corner at (x, yb) */
function brickSide(x, yb, w, h) {
  let s = `<rect x="${F(x)}" y="${F(yb - h)}" width="${F(w)}" height="${F(h)}" rx="4" fill="#b5532f"/>
    <rect x="${F(x)}" y="${F(yb - h)}" width="${F(w)}" height="${F(h * 0.18)}" rx="3" fill="#c96a43"/>
    <rect x="${F(x)}" y="${F(yb - h * 0.2)}" width="${F(w)}" height="${F(h * 0.2)}" rx="3" fill="#9a4426"/>`;
  [[0.12, 0.45], [0.33, 0.62], [0.57, 0.38], [0.78, 0.55], [0.9, 0.3]].forEach(([fx, fy]) => s += `<ellipse cx="${F(x + w * fx)}" cy="${F(yb - h * fy)}" rx="${F(w * 0.03)}" ry="${F(h * 0.06)}" fill="#8f3f22" opacity=".7"/>`);
  return s + `<ellipse cx="${F(x + w / 2)}" cy="${F(yb + 3)}" rx="${F(w * 0.52)}" ry="7" fill="#000" opacity=".18"/>`;
}
/* a size-5 football seen from the side; rot = turn in degrees (a rolling ball turns in the picture plane) */
function football2d(x, y, r, rot = 0) {
  const pent = (cx, cy, k) => { let d = ''; for (let i = 0; i < 5; i++) { const a = (i * 72 - 90) * Math.PI / 180; d += (i ? 'L' : 'M') + F(cx + k * Math.cos(a)) + ' ' + F(cy + k * Math.sin(a)); } return `<path d="${d}Z" fill="#1d1d1d"/>`; };
  let p = pent(0, 0, r * 0.3);
  for (let i = 0; i < 5; i++) { const a = (i * 72 - 90 + 36) * Math.PI / 180; p += pent(Math.cos(a) * r * 0.86, Math.sin(a) * r * 0.86, r * 0.22); }
  for (let i = 0; i < 5; i++) { const a = (i * 72 - 90) * Math.PI / 180; p += `<line x1="${F(Math.cos(a) * r * 0.3)}" y1="${F(Math.sin(a) * r * 0.3)}" x2="${F(Math.cos(a) * r * 0.62)}" y2="${F(Math.sin(a) * r * 0.62)}" stroke="#555" stroke-width="2"/>`; }
  return `<g transform="translate(${F(x)},${F(y)})"><clipPath id="fb${Math.round(r)}"><circle r="${F(r)}"/></clipPath><circle r="${F(r)}" fill="#f7f6f1"/>
    <g clip-path="url(#fb${Math.round(r)})"><g transform="rotate(${F(rot)})">${p}</g>
    <circle r="${F(r)}" cx="${F(r * 0.25)}" cy="${F(r * 0.3)}" fill="#000" opacity=".16"/><ellipse cx="${F(-r * 0.38)}" cy="${F(-r * 0.4)}" rx="${F(r * 0.28)}" ry="${F(r * 0.18)}" fill="#fff" opacity=".65"/></g>
    <circle r="${F(r)}" fill="none" stroke="#9a9a94" stroke-width="2"/></g>`;
}
/* an old bicycle rim (tyre gone or worn), seen from the side; ang = turn in degrees; mark = yellow spot on the rim */
function rim2d(x, y, r, ang, mark = true) {
  let sp = '';
  for (let i = 0; i < 18; i++) { const a = (ang + i * 20) * Math.PI / 180, b = (ang + i * 20 + 34) * Math.PI / 180; sp += `<line x1="${F(Math.cos(a) * r * 0.08)}" y1="${F(Math.sin(a) * r * 0.08)}" x2="${F(Math.cos(b) * r * 0.9)}" y2="${F(Math.sin(b) * r * 0.9)}" stroke="#b8bec4" stroke-width="2.5"/>`; }
  const ma = ang * Math.PI / 180;
  return `<g transform="translate(${F(x)},${F(y)})"><circle r="${F(r)}" fill="none" stroke="#2a2a2a" stroke-width="${F(r * 0.09)}"/>
    <circle r="${F(r * 0.92)}" fill="none" stroke="#a7adb3" stroke-width="${F(r * 0.06)}"/><circle r="${F(r * 0.92)}" fill="none" stroke="#e4e8ea" stroke-width="2" opacity=".7"/>${sp}
    <circle r="${F(r * 0.1)}" fill="#7d858b"/><circle r="${F(r * 0.05)}" fill="#c9ced2"/>
    ${mark ? `<circle cx="${F(Math.cos(ma) * r * 0.95)}" cy="${F(Math.sin(ma) * r * 0.95)}" r="${F(r * 0.1)}" fill="${Y}" stroke="#0f1b3d" stroke-width="4"/>` : ''}</g>`;
}
/* an electric drill seen from the side, bit pointing to +x, tip at (x,y); spin = bit turn in degrees (shown by the
   flutes sliding along the bit), feed = how far the tip has gone in (px, drawn by the caller as a hole) */
function drill2d(x, y, s, spin) {
  let fl = ''; const L = 120, off = ((spin % 90) / 90) * 30;
  for (let k = -1; k < 5; k++) { const xx = -L + k * 30 + off; if (xx > -L && xx < -6) fl += `<path d="M${F(xx)} -8 L${F(xx + 12)} 8" stroke="#6b737a" stroke-width="5"/>`; }
  return `<g transform="translate(${F(x)},${F(y)}) scale(${s})">
    <path d="M0 0 L-14 -9 L-${L} -9 L-${L} 9 L-14 9 Z" fill="#c9ced2"/>${fl}
    <rect x="-${L + 48}" y="-22" width="52" height="44" rx="8" fill="#3a3f44"/>
    <path d="M-${L + 48} -46 L-${L + 260} -46 C-${L + 290} -46 -${L + 300} -30 -${L + 300} 0 L-${L + 300} 26 L-${L + 48} 26 Z" fill="#e0a21b"/>
    <path d="M-${L + 250} 26 L-${L + 200} 26 L-${L + 220} 160 L-${L + 290} 160 Z" fill="#2f3438"/>
    <rect x="-${L + 296}" y="150" width="104" height="36" rx="10" fill="#e0a21b"/>
    <rect x="-${L + 230}" y="-40" width="60" height="10" rx="5" fill="#2f3438"/>${[0, 1, 2, 3].map(i => `<rect x="-${L + 286 - i * 14}" y="-36" width="6" height="40" rx="3" fill="#b9840f"/>`).join('')}
    </g>`;
}
/* a wall clock with a pendulum in a wooden case; th = pendulum angle (degrees), sec = clock seconds */
function pendulumClock(x, y, s, th, sec) {
  const Lr = 250;
  return `<g transform="translate(${F(x)},${F(y)}) scale(${s})">
    <rect x="-130" y="-140" width="260" height="560" rx="24" fill="#6b3f1f"/><rect x="-112" y="110" width="224" height="290" rx="14" fill="#2a1a0e"/>
    <rect x="-130" y="-140" width="260" height="24" rx="12" fill="#fff" opacity=".1"/>
    <g transform="translate(0,120) rotate(${F(-th)})"><rect x="-4" y="0" width="8" height="${Lr - 40}" fill="#c9a24a"/><circle cx="0" cy="${Lr - 30}" r="34" fill="#d9b04f" stroke="#a07a28" stroke-width="4"/><circle cx="-10" cy="${Lr - 40}" r="10" fill="#fff" opacity=".45"/></g></g>`
    + clock(x, y, 100 * s, sec);
}

/* a curved arrow round (x,y) at radius r, turning clockwise on screen (the way a ball rolling to the right turns) */
function turnArrow(x, y, r, c = Y) {
  const a0 = 200 * Math.PI / 180, a1 = 320 * Math.PI / 180;
  const p0 = [x + r * Math.cos(a0), y + r * Math.sin(a0)], p1 = [x + r * Math.cos(a1), y + r * Math.sin(a1)];
  const tg = a1 + Math.PI / 2, hx = p1[0] + 16 * Math.cos(tg), hy = p1[1] + 16 * Math.sin(tg);
  const n = [Math.cos(a1), Math.sin(a1)];
  return `<path d="M${F(p0[0])} ${F(p0[1])} A${F(r)} ${F(r)} 0 0 1 ${F(p1[0])} ${F(p1[1])}" fill="none" stroke="#0f1b3d" stroke-width="16" stroke-linecap="round"/>
    <path d="M${F(p0[0])} ${F(p0[1])} A${F(r)} ${F(r)} 0 0 1 ${F(p1[0])} ${F(p1[1])}" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>
    <polygon points="${F(hx + 14 * Math.cos(tg))},${F(hy + 14 * Math.sin(tg))} ${F(p1[0] + 20 * n[0])},${F(p1[1] + 20 * n[1])} ${F(p1[0] - 20 * n[0])},${F(p1[1] - 20 * n[1])}" fill="${c}" stroke="#0f1b3d" stroke-width="3"/>`;
}
/* "ধীর করে দেখানো" / "দ্রুত করে দেখানো": a small white note at the top right (HTML) */
function speedNote(s, o = 1) {
  return o > 0 ? `<div class="abs" style="right:50px;top:40px;opacity:${cl(o).toFixed(2)}"><span class="lab" style="transform:none;background:#fff;color:#0f1b3d;border:3px solid #0f1b3d">${s}</span></div>` : '';
}
/* ceiling and upper wall of a room, for the fan seen from below */
function ceilingBg() {
  return `<defs><linearGradient id="ceil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4eee1"/><stop offset=".55" stop-color="#e9dfca"/><stop offset=".56" stop-color="#d9c7a3"/><stop offset="1" stop-color="#cdb890"/></linearGradient></defs>
    <rect width="1920" height="1080" fill="url(#ceil)"/>`;
}

/* ---------- hands (v2, realistic): skin with light and shade, five fingers with knuckles and nails, the thumb from
   the right place, a wrist and a shirt cuff. Only a hand doing the action is ever drawn. ---------- */
const SKIN = { base: '#d39a70', light: '#e6b38e', dark: '#b0744c', deep: '#9a6340', line: '#8a5232', nail: '#f3d3bd' };
function skinDefs() {
  return `<defs><linearGradient id="hsk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${SKIN.light}"/><stop offset=".6" stop-color="${SKIN.base}"/><stop offset="1" stop-color="${SKIN.dark}"/></linearGradient>
    <linearGradient id="hsk2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${SKIN.dark}"/><stop offset=".5" stop-color="${SKIN.base}"/><stop offset="1" stop-color="${SKIN.light}"/></linearGradient></defs>`;
}
const sleeve = (d, cuff) => `<path d="${d}" fill="#2a6f97" stroke="#1f5577" stroke-width="2"/>` + (cuff ? `<path d="${cuff}" fill="#215a7c"/>` : '');
const nail = d => `<path d="${d}" fill="${SKIN.nail}" stroke="${SKIN.line}" stroke-width="1.2"/>`;
const crease = d => `<path d="${d}" stroke="${SKIN.line}" stroke-width="2.2" fill="none" opacity=".55" stroke-linecap="round"/>`;

/* an open right hand pushing to the right, seen from the thumb side: palm flat on the object (contact plane x = 0),
   fingers up, wrist bent back, forearm level from the left. (x,y) = middle of the palm on the object.
   Local length heel to fingertip ≈ 230, so s = 0.62 at 600 px/m ≈ 23 cm. */
function handPush(x, y, s = 0.62, o = 1) {
  if (o <= 0) return '';
  const L = SKIN.line;
  return `<g transform="translate(${F(x)},${F(y)}) scale(${s})" opacity="${cl(o).toFixed(2)}" stroke-linejoin="round">${skinDefs()}
    ${sleeve('M-240 0 L-72 -2 L-68 74 L-240 78 Z', 'M-86 -4 L-66 -4 L-64 76 L-84 76 Z')}
    <path d="M-68 6 C-52 0 -38 -2 -30 -4 L-28 68 C-42 72 -56 72 -68 70 Z" fill="url(#hsk2)" stroke="${L}" stroke-width="2"/>
    <path d="M-42 -56 L-42 -126 C-42 -138 -28 -138 -28 -126 L-28 -56 Z" fill="${SKIN.deep}" stroke="${L}" stroke-width="1.5"/>
    <path d="M-35 -58 L-35 -146 C-35 -158 -20 -158 -20 -146 L-20 -58 Z" fill="${SKIN.dark}" stroke="${L}" stroke-width="1.5"/>
    <path d="M-27 -60 L-27 -160 C-27 -173 -10 -173 -10 -160 L-10 -60 Z" fill="#c4865c" stroke="${L}" stroke-width="1.5"/>
    <path d="M-48 -62 C-48 -70 -38 -72 -22 -70 L0 -68 L0 54 C0 66 -12 72 -26 70 C-40 68 -50 56 -50 36 Z" fill="url(#hsk)" stroke="${L}" stroke-width="2.5"/>
    <path d="M-17 -62 L-17 -150 C-17 -165 1 -165 1 -150 L1 -62 Z" fill="url(#hsk2)" stroke="${L}" stroke-width="2.5"/>
    ${nail('M-17 -149 C-16 -158 -10 -161 -7 -159 L-7 -141 L-17 -141 Z')}
    ${crease('M-17 -116 C-12 -112 -8 -112 -4 -116')}${crease('M-17 -90 C-12 -86 -8 -86 -4 -90')}${crease('M-26 -126 C-22 -122 -18 -122 -14 -126')}
    <path d="M-42 -22 C-54 -46 -64 -78 -66 -98 C-68 -112 -54 -117 -48 -106 C-40 -86 -28 -60 -18 -38 Z" fill="${SKIN.light}" stroke="${L}" stroke-width="2.5"/>
    ${nail('M-64 -101 C-63 -110 -56 -112 -52 -107 L-55 -97 Z')}${crease('M-56 -74 C-50 -72 -46 -76 -44 -80')}
    ${crease('M-42 -40 C-36 -10 -36 22 -42 46')}</g>`;
}

/* a right hand lying flat and pressing down, seen from the thumb side; (x,y) = where the palm meets the surface,
   middle of the hand; fingers point to +x. Local length heel to fingertip ≈ 200. */
function handFlat(x, y, s = 1, o = 1, flip = false) {
  if (o <= 0) return '';
  const L = SKIN.line;
  return `<g transform="translate(${F(x)},${F(y)}) scale(${flip ? -s : s},${s})" opacity="${cl(o).toFixed(2)}" stroke-linejoin="round">${skinDefs()}
    ${sleeve('M-252 -98 L-152 -66 L-132 -14 L-234 -42 Z', 'M-162 -70 L-142 -64 L-124 -12 L-144 -16 Z')}
    <path d="M-150 -62 C-128 -58 -110 -52 -96 -44 L-92 -2 L-140 -10 Z" fill="url(#hsk2)" stroke="${L}" stroke-width="2"/>
    <path d="M-4 -40 C32 -42 70 -34 102 -20 C112 -14 108 0 98 0 L-4 0 Z" fill="${SKIN.dark}" stroke="${L}" stroke-width="1.5"/>
    <path d="M-106 -50 C-82 -62 -32 -60 2 -44 L10 0 L-108 0 C-114 -18 -114 -38 -106 -50 Z" fill="url(#hsk)" stroke="${L}" stroke-width="2.5"/>
    ${crease('M-14 -50 C-10 -54 -4 -54 0 -48')}${crease('M-30 -56 C-26 -60 -20 -60 -16 -54')}
    <path d="M-2 -38 C28 -38 60 -30 88 -17 C98 -11 96 0 86 0 L2 0 Z" fill="url(#hsk)" stroke="${L}" stroke-width="2.5"/>
    ${nail('M72 -21 C79 -22 86 -17 89 -12 L78 -9 Z')}
    ${crease('M30 -35 C33 -29 33 -23 30 -17')}${crease('M56 -29 C58 -24 58 -19 56 -14')}
    <path d="M-62 -8 C-38 -20 -8 -20 16 -11 C24 -7 22 2 13 2 L-62 2 Z" fill="${SKIN.light}" stroke="${L}" stroke-width="2.2"/>
    ${nail('M6 -10 C12 -12 18 -9 19 -5 L10 -3 Z')}</g>`;
}

/* a right hand with the index finger pointing straight down, the other fingers curled, the thumb across them;
   (x,y) = the fingertip. Local height ≈ 220. */
function handFinger(x, y, s = 1, o = 1) {
  if (o <= 0) return '';
  const L = SKIN.line;
  let curl = '';
  [[-150, SKIN.base], [-127, '#c98b5f'], [-105, SKIN.dark]].forEach(([yy, c]) => curl += `<rect x="6" y="${yy}" width="44" height="23" rx="11" fill="${c}" stroke="${L}" stroke-width="2"/>`);
  return `<g transform="translate(${F(x)},${F(y)}) scale(${s})" opacity="${cl(o).toFixed(2)}" stroke-linejoin="round">${skinDefs()}
    ${sleeve('M-12 -234 L58 -332 L104 -302 L40 -200 Z', 'M-12 -234 L40 -200 L48 -212 L-2 -246 Z')}
    <path d="M-38 -204 C-44 -154 -40 -114 -18 -88 L34 -86 C50 -112 54 -164 46 -210 C24 -226 -18 -224 -38 -204 Z" fill="url(#hsk)" stroke="${L}" stroke-width="2.5"/>
    ${curl}
    <path d="M-12 -96 L-12 -10 C-12 5 10 5 10 -10 L10 -96 Z" fill="url(#hsk2)" stroke="${L}" stroke-width="2.5"/>
    ${nail('M-12 -28 L-12 -9 C-9 -3 -4 -3 -2 -7 L-2 -28 Z')}
    ${crease('M-12 -62 C-6 -58 4 -58 10 -62')}${crease('M-12 -40 C-6 -37 4 -37 10 -40')}
    <path d="M-40 -170 C-58 -150 -52 -118 -22 -116 C0 -114 20 -120 28 -132 C30 -142 20 -148 8 -144 C-6 -138 -22 -142 -28 -158 Z" fill="${SKIN.light}" stroke="${L}" stroke-width="2.2"/>
    ${nail('M14 -142 C22 -146 30 -142 29 -134 L18 -134 Z')}</g>`;
}

/* a right hand gripping an upright handle, seen from the thumb side; (x,y) = middle of the grip */
function gripHand(x, y, s = 1, o = 1) {
  if (o <= 0) return '';
  const L = SKIN.line;
  let f = '';
  for (let i = 0; i < 4; i++) f += `<rect x="-6" y="${-48 + i * 30}" width="62" height="30" rx="14" fill="${['#e0a982', SKIN.base, '#c98b5f', SKIN.dark][i]}" stroke="${L}" stroke-width="2.2"/>` + crease(`M18 ${-46 + i * 30} C20 ${-40 + i * 30} 20 ${-26 + i * 30} 18 ${-20 + i * 30}`);
  return `<g transform="translate(${F(x)},${F(y)}) scale(${s})" opacity="${cl(o).toFixed(2)}" stroke-linejoin="round">${skinDefs()}
    ${sleeve('M-40 60 L-150 170 L-110 210 L0 96 Z', 'M-40 60 L-6 92 L-18 104 L-52 72 Z')}
    <path d="M-46 -60 C-62 -20 -62 40 -42 80 L10 86 L10 -62 Z" fill="url(#hsk)" stroke="${L}" stroke-width="2.5"/>
    ${f}
    <path d="M-42 -62 C-22 -86 22 -88 46 -72 C56 -64 50 -50 38 -53 C16 -58 -8 -56 -30 -42 Z" fill="${SKIN.light}" stroke="${L}" stroke-width="2.5"/>
    ${nail('M38 -68 C46 -70 52 -64 49 -57 L40 -58 Z')}</g>`;
}

/* ---------- the pen hand: a 3D model of a right hand in the tripod grip, built from the bones of a real hand
   (science-video-template/hand: hand3d.js, pose.js, make_hand.py) and rendered once from the thumb side. The thumb and
   the index finger pinch the pen near its tip, the middle finger supports it, ring and little fingers curl into the palm.
   HAND_IMG = the pen tip and the pen's angle in that picture (from hand.json; update both after make_hand.py). ---------- */
const HAND_IMG = { src: '../science-video-template/hand/hand_side.png', size: 2400, tip: [245.6, 1086.0], ang: -54.30, penPx: 326.8 };
/* pen tip at (x,y), the pen pointing at a degrees from the tip (0 = to the right, -90 = straight up); s = 1: the pen
   is 300 px long on screen */
function handPen(x, y, a, s = 1, o = 1) {
  if (o <= 0) return '';
  const H = HAND_IMG, k = 300 * s / H.penPx;
  return `<g transform="translate(${F(x)},${F(y)}) rotate(${F(a - H.ang)}) scale(${k.toFixed(4)}) translate(${-H.tip[0]},${-H.tip[1]})" opacity="${cl(o).toFixed(2)}"><image href="${H.src}" width="${H.size}" height="${H.size}"/></g>`;
}
/* the same hand writing on a page seen from above: the pen points down to the right from its tip, towards the
   writer's shoulder, and the forearm comes up from the bottom of the picture */
const WRITE_ANG = 12;
function handWrite(x, y, s = 1, o = 1) { return handPen(x, y, WRITE_ANG, s, o); }

/* number badge (yellow circle with a Bangla numeral) */
function badge(x, y, n, p = 1) {
  if (p <= 0) return '';
  return `<g transform="translate(${x},${y}) scale(${back(cl(p)).toFixed(3)})"><circle r="48" fill="${Y}" stroke="#fff" stroke-width="6"/>${txt(0, 18, BN(n), 56, { c: NAVY })}</g>`;
}

/* ---------- icons for the explanation cards (navy background) ---------- */
function lampIcon(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-26" y="-12" width="52" height="24" rx="6" fill="#6d767b"/><rect x="-8" y="-420" width="16" height="410" fill="#9aa3a8"/>
    <path d="M0 -416 Q0 -450 60 -452 L110 -452" stroke="#9aa3a8" stroke-width="14" fill="none"/><rect x="92" y="-466" width="70" height="22" rx="6" fill="#59626a"/><rect x="100" y="-446" width="54" height="8" rx="3" fill="#fff4b0"/></g>`;
}
function seatIcon(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-70 -260 L-40 -260 L-20 -40 L-70 -40 Z" fill="#1f4e79"/><rect x="-74" y="-272" width="58" height="34" rx="8" fill="#f4f1e8"/>
    <rect x="-80" y="-60" width="170" height="40" rx="10" fill="#173c5e"/><rect x="60" y="-20" width="14" height="20" fill="#aeb5ba"/><rect x="-66" y="-20" width="14" height="20" fill="#aeb5ba"/></g>`;
}
function carIcon(x, y, s = 1, c = '#b3261e') {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-220 -30 L-220 -80 L-170 -86 L-110 -150 L60 -152 L130 -88 L210 -78 L220 -30 Z" fill="${c}"/>
    <path d="M-150 -90 L-100 -140 L-20 -140 L-20 -90 Z M0 -90 L0 -140 L52 -140 L104 -90 Z" fill="#1b2631"/>
    <circle cx="-130" cy="-28" r="40" fill="#151515"/><circle cx="-130" cy="-28" r="20" fill="#b9bfc4"/><circle cx="130" cy="-28" r="40" fill="#151515"/><circle cx="130" cy="-28" r="20" fill="#b9bfc4"/></g>`;
}
function busIcon(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-260" y="-210" width="520" height="190" rx="22" fill="#f1e7cf"/><rect x="-260" y="-100" width="520" height="80" rx="10" fill="#1f7a4d"/>
    <rect x="-260" y="-104" width="520" height="10" fill="#f2c230"/>${[-230, -150, -70, 10, 90].map(x => `<rect x="${x}" y="-190" width="66" height="62" rx="6" fill="#1d2a36"/>`).join('')}<rect x="180" y="-190" width="62" height="90" rx="6" fill="#1d2a36"/>
    <circle cx="-160" cy="-20" r="36" fill="#151515"/><circle cx="-160" cy="-20" r="16" fill="#c9ced2"/><circle cx="160" cy="-20" r="36" fill="#151515"/><circle cx="160" cy="-20" r="16" fill="#c9ced2"/></g>`;
}
/* ceiling fan seen slightly from below; ang in degrees */
function fanIcon(x, y, s, ang) {
  let b = '';
  for (let i = 0; i < 3; i++) { const a = (ang + i * 120) * Math.PI / 180, ex = Math.cos(a) * 210, ey = Math.sin(a) * 210 * 0.32;
    b += `<path d="M0 0 L${F(ex * 0.25 - ey * 0.6)} ${F(ey * 0.25 + ex * 0.06)} L${F(ex - ey * 0.5)} ${F(ey + ex * 0.1)} L${F(ex + ey * 0.4)} ${F(ey - ex * 0.08)} Z" fill="#d9d3c2" stroke="#9e9787" stroke-width="3"/>`; }
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-6" y="-170" width="12" height="150" fill="#9aa3a8"/><ellipse cx="0" cy="-170" rx="34" ry="10" fill="#9aa3a8"/>${b}<ellipse cx="0" cy="0" rx="44" ry="22" fill="#b9b2a2"/><ellipse cx="0" cy="-6" rx="30" ry="12" fill="#d9d3c2"/></g>`;
}
/* swing: two ropes from a beam, plank at the end; th = angle from the vertical, degrees */
function swingIcon(x, y, s, th) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-12" width="300" height="24" rx="6" fill="#8a5a30"/>
    <g transform="rotate(${F(th)})"><line x1="-70" y1="0" x2="-70" y2="300" stroke="#6b5640" stroke-width="7"/><line x1="70" y1="0" x2="70" y2="300" stroke="#6b5640" stroke-width="7"/><rect x="-96" y="296" width="192" height="22" rx="6" fill="#b5651d"/></g></g>`;
}
/* a village swing seen from the side, looking along its beam: the bamboo A-frame at this end, the beam end-on at the
   top, the two ropes one behind the other, the seat plank end-on. It swings forward and back, which on screen is left and
   right. (x,y) = beam axis, L = rope length in px, th = angle from the vertical (degrees), yG = ground */
function swingSide(x, y, L, th, yG) {
  const leg = (dx) => `<line x1="${F(x)}" y1="${F(y)}" x2="${F(x + dx)}" y2="${F(yG)}" stroke="#b08948" stroke-width="20" stroke-linecap="round"/>`;
  return leg(-0.62 * (yG - y)) + leg(0.62 * (yG - y)) +
    `<line x1="${F(x - 0.33 * (yG - y))}" y1="${F(y + 0.53 * (yG - y))}" x2="${F(x + 0.33 * (yG - y))}" y2="${F(y + 0.53 * (yG - y))}" stroke="#9c7a40" stroke-width="12" stroke-linecap="round"/>` +
    `<g transform="translate(${F(x)},${F(y)}) rotate(${F(-th)})">
      <line x1="5" y1="0" x2="5" y2="${F(L)}" stroke="#4e3f30" stroke-width="5"/><line x1="0" y1="0" x2="0" y2="${F(L)}" stroke="#6b5640" stroke-width="6"/>
      <rect x="-34" y="${F(L - 4)}" width="68" height="16" rx="4" fill="#b5651d" stroke="#7a4417" stroke-width="3"/></g>` +
    `<circle cx="${F(x)}" cy="${F(y)}" r="22" fill="#c39a5b" stroke="#8a6a3a" stroke-width="4"/><circle cx="${F(x)}" cy="${F(y)}" r="9" fill="#8a6a3a"/>`;
}
/* sphere lit from the left (sun to the left, off screen): the left half is day */
function litSphere(x, y, r, inner, id) {
  return `<g transform="translate(${x},${y})"><clipPath id="${id}"><circle r="${r}"/></clipPath><g clip-path="url(#${id})">${inner}<rect x="0" y="${-r}" width="${r}" height="${2 * r}" fill="#020617" opacity=".62"/></g>
    <circle r="${r}" fill="none" stroke="#ffffff" stroke-opacity=".25" stroke-width="2"/></g>`;
}
/* the Earth turning: lon = rotation angle in degrees; continents slide across; returns inner content */
function earthFace(r, lon) {
  let s = `<circle r="${r}" fill="#2e86de"/>`;
  [[0, -0.3, 0.42, 0.3], [70, 0.1, 0.35, 0.5], [150, 0.55, 0.3, 0.2], [220, -0.5, 0.25, 0.22], [290, 0.3, 0.3, 0.35]].forEach(([l, yy, rx, ry]) => {
    const a = (l + lon) * Math.PI / 180, cx = Math.sin(a) * r * 0.9, vis = Math.cos(a);
    if (vis > 0) s += `<ellipse cx="${F(cx)}" cy="${F(yy * r)}" rx="${F(rx * r * (0.35 + 0.65 * vis))}" ry="${F(ry * r)}" fill="#3bb273"/>`;
  });
  return s;
}
