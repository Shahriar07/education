/* Part registry and frame renderer for this video.
   Reuses core.js (mkScene, ctx, cards, eye, ...) unchanged. One part = one clip. */
const PARTS = {}, ORDER = [];
const CHIP = 'ষষ্ঠ শ্রেণি · বিজ্ঞান · অধ্যায় <span class="cn">১০</span>';   // number in its own span: a clear gap after অধ্যায় even on a phone
const FADE = 0.4; // seconds, through navy, only at scene boundaries

/* meta: {scene, label, title, first, last}  first/last = first/last part of its scene */
function part(name, meta, segs, draw) {
  const sc = mkScene(segs, draw); sc.name = name; sc.meta = meta;
  PARTS[name] = sc; ORDER.push(name);
}

function renderPart(name, t) {
  const sc = PARTS[name]; const S = ctx(sc, t);
  const r = sc.draw(t, S) || {};
  document.getElementById('gl').style.display = r.gl ? 'block' : 'none';
  let u = r.ui || '';
  if (!r.noChip) u += `<div class="abs" style="left:50px;top:40px"><span class="chip">${CHIP}</span></div>`;
  sc.segs.forEach(sg => (sg.caps || []).forEach(c => {
    if (t >= c.a && t < c.b) {
      const o = Math.min(pr(t, c.a, c.a + 0.2), 1 - pr(t, c.b - 0.15, c.b));
      u += `<div class="abs capw"><div class="cap" style="opacity:${o.toFixed(2)}">${c.c}</div></div>`;
    }
  }));
  const f = Math.max(sc.meta.first ? 1 - pr(t, 0, FADE) : 0, sc.meta.last ? pr(t, sc.dur - FADE, sc.dur) : 0);
  document.getElementById('svg').innerHTML = r.svg || '';
  document.getElementById('ui').innerHTML = u;
  const fd = document.getElementById('fade'); fd.style.background = NAVY; fd.style.opacity = f.toFixed(3);
}
window.setTime = renderPart;
window.partInfo = () => ORDER.map(n => {
  const p = PARTS[n];
  return { name: n, scene: p.meta.scene, label: p.meta.label, title: p.meta.title, screen: p.meta.screen || '', dur: p.dur,
           caps: [].concat(...p.segs.map(g => g.caps || [])) };
});
/* fonts must be loaded before any canvas texture or frame is drawn */
window.ready = Promise.all([400, 600, 700].map(w => document.fonts.load(`${w} 40px "Hind Siliguri"`, 'অআ')))
  .then(() => document.fonts.ready);

/* ---------- 2D overlay helpers (drawn over the 3D canvas) ---------- */
/* map pin: its point sits exactly on (x,y). "This thing has not changed position." */
function pin(x, y, s = 1, o = 1) {
  if (o <= 0) return '';
  return `<g transform="translate(${F(x)},${F(y)}) scale(${(s * back(cl(o))).toFixed(3)})" opacity="${cl(o).toFixed(2)}">
    <ellipse cx="0" cy="0" rx="16" ry="5" fill="#000" opacity=".28"/>
    <path d="M0 0 C-10 -22 -30 -34 -30 -58 A30 30 0 1 1 30 -58 C30 -34 10 -22 0 0 Z" fill="#e63946" stroke="#fff" stroke-width="5"/>
    <circle cx="0" cy="-58" r="11" fill="#fff"/></g>`;
}
/* velocity arrow: tail (x,y), length len px (negative = pointing left) */
function varrow(x, y, len, o = 1, c = Y) {
  if (o <= 0 || Math.abs(len) < 2) return '';
  const d = Math.sign(len), x2 = x + len;
  return `<g opacity="${cl(o).toFixed(2)}"><line x1="${F(x)}" y1="${F(y)}" x2="${F(x2 - d * 30)}" y2="${F(y)}" stroke="#1a1a2e" stroke-width="22" stroke-linecap="round"/>
    <polygon points="${F(x2 + d * 6)},${F(y)} ${F(x2 - d * 44)},${F(y - 30)} ${F(x2 - d * 44)},${F(y + 30)}" fill="#1a1a2e"/>
    <line x1="${F(x)}" y1="${F(y)}" x2="${F(x2 - d * 30)}" y2="${F(y)}" stroke="${c}" stroke-width="12" stroke-linecap="round"/>
    <polygon points="${F(x2)},${F(y)} ${F(x2 - d * 38)},${F(y - 22)} ${F(x2 - d * 38)},${F(y + 22)}" fill="${c}"/></g>`;
}
/* arrow between two screen points (used when a 3D direction is projected onto the screen) */
function arrow2(x1, y1, x2, y2, o = 1, c = Y) {
  const dx = x2 - x1, dy = y2 - y1, n = Math.hypot(dx, dy); if (o <= 0 || n < 30) return '';
  const a = Math.atan2(dy, dx) * 180 / Math.PI;
  return `<g opacity="${cl(o).toFixed(2)}" transform="translate(${F(x1)},${F(y1)}) rotate(${F(a)})">
    <line x1="0" y1="0" x2="${F(n - 34)}" y2="0" stroke="#1a1a2e" stroke-width="22" stroke-linecap="round"/><polygon points="${F(n + 6)},0 ${F(n - 44)},-30 ${F(n - 44)},30" fill="#1a1a2e"/>
    <line x1="0" y1="0" x2="${F(n - 34)}" y2="0" stroke="${c}" stroke-width="12" stroke-linecap="round"/><polygon points="${F(n)},0 ${F(n - 38)},-22 ${F(n - 38)},22" fill="${c}"/></g>`;
}
function lab(x, y, s, cls, o = 1) {
  if (o <= 0) return '';
  return `<div class="abs" style="left:${F(x)}px;top:${F(y)}px;opacity:${cl(o).toFixed(2)}"><span class="lab ${cls}">${s}</span></div>`;
}
/* named observer: a labelled eye (people are never drawn) */
function observer(x, y, name, o = 1, s = 0.42) {
  if (o <= 0) return { svg: '', ui: '' };
  return { svg: `<g opacity="${cl(o).toFixed(2)}"><circle cx="${F(x)}" cy="${F(y)}" r="${F(58 * s / 0.42)}" fill="#fff" stroke="#0f1b3d" stroke-width="5"/></g>` + eye(x, y, s * back(cl(o)), 0, 0, o),
           ui: lab(x, y + 84 * s / 0.42, name, 'name', o) };
}
/* observer marker held above a place in the 3D world, with a dotted leader down to it.
   P = projector from W3.frame; (x, z) the place, y the marker height, yObj where the leader ends */
function placed(P, x, y, z, yObj, name, o = 1) {
  const [ax, ay, ok] = P(x, y, z), [rx, ry] = P(x, yObj, z);
  if (!ok || o <= 0 || ax < -150 || ax > 2070 || ay < -100) return { svg: '', ui: '' };
  const ob = observer(ax, ay, name, o);
  return { svg: `<line x1="${F(ax)}" y1="${F(ay + 50)}" x2="${F(rx)}" y2="${F(ry)}" stroke="#0f1b3d" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round" opacity="${cl(o).toFixed(2)}"/>` + ob.svg, ui: ob.ui };
}
/* lamp posts seen from a moving vehicle: each arrow = how far the post moves (backwards) in half a second, V in m/s.
   y = height of the arrow on the post, so it is seen through the window */
function backArrows(P, xa, xb, V, o, label, y = 2.62) {
  let s = '', u = '', best = null;
  if (o <= 0) return { svg: '', ui: '' };
  W3.lamps(xa, xb).forEach(x => {
    const [x1, y1, ok1] = P(x, y, ROAD.LAMP_Z), [x2, y2, ok2] = P(x - V * 0.5, y, ROAD.LAMP_Z);
    if (!ok1 || !ok2 || x1 < 60 || x1 > 1860) return;
    s += arrow2(x1 - 22, y1, x2 - 22, y2, o);
    const n = Math.hypot(x2 - x1, y2 - y1); if (n > 60 && (!best || n > best.n)) best = { n, x: x1, y: y1 };
  });
  if (best && label) u += lab(cl(best.x + 20, 220, 1700), best.y - 78, label, 'move', o);
  return { svg: s, ui: u };
}
/* white figure label at the top centre, e.g. "চিত্র ১০.১: স্থির অবস্থা" */
function figTag(s, o = 1) { return o > 0 ? `<div class="abs" style="left:0;width:1920px;top:128px;text-align:center;opacity:${cl(o).toFixed(2)}"><span class="fig">${s}</span></div>` : ''; }
/* a live readout box, e.g. a distance that the motion keeps changing */
function readout(x, y, label, value, o = 1) {
  return o > 0 ? `<div class="abs" style="left:${x}px;top:${y}px;opacity:${cl(o).toFixed(2)}"><div class="vs">${label} <span class="lab move" style="transform:none;font-size:40px;min-width:150px;text-align:center">${value}</span></div></div>` : '';
}
const BNF = (v, d = 0) => BN(Number(v).toFixed(d));
/* a path given by 3D points (metres), drawn on the overlay through the projector P of the current frame */
function path3(P, pts, c = Y, w = 6, dash = '3 12', o = 1) {
  if (o <= 0 || pts.length < 2) return '';
  const d = pts.map((p, k) => { const [x, y] = P(p[0], p[1], p[2]); return (k ? 'L' : 'M') + F(x) + ' ' + F(y); }).join(' ');
  return `<path d="${d}" fill="none" stroke="#0f1b3d" stroke-width="${w + 5}" stroke-linecap="round" stroke-linejoin="round" opacity="${(0.5 * cl(o)).toFixed(2)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${cl(o).toFixed(2)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}
/* pixels per metre at a 3D point (measured along x), so 2D overlays such as hands get their real size */
function pxpm(P, p) { const [a, b] = P(p[0], p[1], p[2]), [c, d] = P(p[0] + 0.1, p[1], p[2]); return Math.hypot(c - a, d - b) / 0.1; }
/* a dot at a 3D point */
function dot3(P, p, c = Y, r = 12, o = 1) { if (o <= 0) return ''; const [x, y] = P(p[0], p[1], p[2]); return `<circle cx="${F(x)}" cy="${F(y)}" r="${F(r)}" fill="${c}" stroke="#0f1b3d" stroke-width="4" opacity="${cl(o).toFixed(2)}"/>`; }
/* the steady push / pull used everywhere: speeds up evenly for k s, steady, slows evenly for k s; D in T seconds */
function trap(u, D, T, k) { const V = D / (T - k), A = V / k; if (u <= 0) return 0; if (u < k) return 0.5 * A * u * u; if (u < T - k) return 0.5 * A * k * k + V * (u - k); if (u < T) return D - 0.5 * A * (T - u) ** 2; return D; }
function whoTag(s, p, o = 1) {
  if (p <= 0 || o <= 0) return '';
  return `<div class="abs" style="right:50px;top:36px;opacity:${cl(o).toFixed(2)};transform:scale(${back(cl(p)).toFixed(3)});transform-origin:100% 0"><span class="who"><svg width="70" height="50" viewBox="-90 -64 180 128">${eye(0, 0, 1)}</svg>${s}</span></div>`;
}
