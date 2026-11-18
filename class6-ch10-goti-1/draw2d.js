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
const SKIN = { base: '#d39a70', light: '#e6b38e', dark: '#b0744c', deep: '#9a6340', line: '#8a5232', nail: '#f3d3bd' };
function skinDefs() {
  return `<defs><linearGradient id="hsk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${SKIN.light}"/><stop offset=".6" stop-color="${SKIN.base}"/><stop offset="1" stop-color="${SKIN.dark}"/></linearGradient>
    <linearGradient id="hsk2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${SKIN.dark}"/><stop offset=".5" stop-color="${SKIN.base}"/><stop offset="1" stop-color="${SKIN.light}"/></linearGradient></defs>`;
}
const sleeve = (d, cuff) => `<path d="${d}" fill="#2a6f97" stroke="#1f5577" stroke-width="2"/>` + (cuff ? `<path d="${cuff}" fill="#215a7c"/>` : '');
const nail = d => `<path d="${d}" fill="${SKIN.nail}" stroke="${SKIN.line}" stroke-width="1.2"/>`;
const crease = d => `<path d="${d}" stroke="${SKIN.line}" stroke-width="2.2" fill="none" opacity=".55" stroke-linecap="round"/>`;

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
