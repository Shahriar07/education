/* Video 2 (লিভার): textbook fig 11.5, a plank on a wooden wedge with two bricks as the load. Metres, in the village yard
   3.4 m past the heavy stone of fig 11.4. The plank stays level and in place; the wedge (fulcrum) can move along it.
   Force point: 0.03 m from the left end; load: the bricks' centre, 0.11 m from the right end; so a + b = L - 0.14 = 1.5 m. */
const PL = { X: LV.XS + 3.4, Z: 2.2, L: 1.64, T: 0.035, W: 0.16, H: 0.24, BR: [0.22, 0.07, 0.105], KG: 2.5, G: 9.8 };
PL.XF = PL.X - PL.L / 2 + 0.03; PL.XL = PL.X + PL.L / 2 - 0.11;     // force point and load point (x)
PL.YT = PL.H + PL.T;                                                // top of the plank
PL.Wt = 2 * PL.KG * PL.G;                                           // the load: two bricks, 49 N
/* the effort that holds the plank level: moments about the wedge, F a = W b */
const plForce = a => PL.Wt * (PL.L - 0.14 - a) / a;
let V17 = null;
const _bF = buildV3, _fF = frameV3;
buildV3 = function (k) {
  _bF(k);
  const { scene, canvasTex } = k;
  const rnd = (() => { let a = 11; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();
  const grain = (base, dark, light) => canvasTex(512, 128, c => { c.fillStyle = base; c.fillRect(0, 0, 512, 128); for (let i = 0; i < 90; i++) { c.strokeStyle = `rgba(${rnd() < 0.5 ? dark : light},${0.1 + rnd() * 0.3})`; c.lineWidth = 0.6 + rnd() * 1.8; const y = rnd() * 128; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(170, y + 6 * (rnd() - 0.5), 340, y + 6 * (rnd() - 0.5), 512, y); c.stroke(); } });
  const plank = new THREE.Mesh(new THREE.BoxGeometry(PL.L, PL.T, PL.W), new THREE.MeshStandardMaterial({ map: grain('#c08a52', '80,48,18', '226,180,120'), roughness: 0.8 }));
  plank.position.set(PL.X, PL.H + PL.T / 2, PL.Z); plank.castShadow = plank.receiveShadow = true; scene.add(plank);
  /* the wedge: a triangle 0.26 m wide at the base, apex at the plank's underside, 0.2 m deep */
  const sh = new THREE.Shape(); sh.moveTo(-0.13, 0); sh.lineTo(0.13, 0); sh.lineTo(0.008, PL.H); sh.lineTo(-0.008, PL.H); sh.closePath();
  const wedge = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: true, bevelSize: 0.003, bevelThickness: 0.006, bevelSegments: 2 }), new THREE.MeshStandardMaterial({ map: grain('#8a5a2e', '50,28,10', '170,120,70'), roughness: 0.85 }));
  wedge.position.set(PL.X, 0, PL.Z - 0.1); wedge.castShadow = wedge.receiveShadow = true; scene.add(wedge);
  /* two burnt-clay bricks with a rough, slightly mottled face */
  const bt = canvasTex(256, 128, c => { c.fillStyle = '#a8492c'; c.fillRect(0, 0, 256, 128); for (let i = 0; i < 2600; i++) { c.fillStyle = rnd() < 0.5 ? `rgba(70,22,10,${0.06 + rnd() * 0.16})` : `rgba(230,150,110,${0.05 + rnd() * 0.14})`; c.fillRect(rnd() * 256, rnd() * 128, 1 + rnd() * 3, 1 + rnd() * 3); } });
  const bm = new THREE.MeshStandardMaterial({ map: bt, roughness: 0.95 }), bricks = [0, 1].map(i => { const m = new THREE.Mesh(new THREE.BoxGeometry(...PL.BR), bm); m.position.set(PL.XL + (i ? 0.006 : 0), PL.YT + PL.BR[1] * (i + 0.5) + 0.001 * i, PL.Z); m.rotation.y = i ? 0.04 : 0; m.castShadow = m.receiveShadow = true; scene.add(m); return m; });
  V17 = { plank, wedge, bricks };
};
/* o.plank = { a } : the effort arm in metres (the wedge sits a metres right of the force point); hidden when not given */
frameV3 = function (o) {
  _fF(o);
  const on = !!o.plank; [V17.plank, V17.wedge, ...V17.bricks].forEach(m => m.visible = on); if (!on) return;
  V17.wedge.position.x = PL.XF + o.plank.a;
};
C11.plank = () => ({ pos: [PL.X + 0.05, 0.62, PL.Z + 3.0], look: [PL.X + 0.05, 0.26, PL.Z], fov: 30 });
/* a dashed arrow outline: how big a force would have to be (not a force that acts) */
function dashArrow(x1, y1, x2, y2, o = 1, c = '#ff6b5e') {
  const dx = x2 - x1, dy = y2 - y1, n = Math.hypot(dx, dy); if (o <= 0 || n < 30) return '';
  const a = Math.atan2(dy, dx) * 180 / Math.PI;
  return `<g opacity="${cl(o).toFixed(2)}" transform="translate(${F(x1)},${F(y1)}) rotate(${F(a)})" fill="none" stroke="${c}" stroke-width="7" stroke-dasharray="18 12">
    <path d="M0,-13 L${F(n - 40)},-13 L${F(n - 40)},-32 L${F(n)},0 L${F(n - 40)},32 L${F(n - 40)},13 L0,13 Z" stroke-linejoin="round"/></g>`;
}
/* a measuring bar between two screen points on one level, with end ticks; returns svg */
function armBar(x0, x1, y, c, o = 1) {
  if (o <= 0) return ''; const xe = x0 + (x1 - x0) * ease(cl(o * 1.4));
  return `<g opacity="${cl(o * 2).toFixed(2)}" stroke="${c}" stroke-linecap="round"><line x1="${F(x0)}" y1="${F(y)}" x2="${F(xe)}" y2="${F(y)}" stroke-width="10"/>
    <line x1="${F(x0)}" y1="${F(y - 24)}" x2="${F(x0)}" y2="${F(y + 24)}" stroke-width="7"/><line x1="${F(xe)}" y1="${F(y - 24)}" x2="${F(xe)}" y2="${F(y + 24)}" stroke-width="7"/></g>`;
}
/* the point where the rod rests on the small stone (top of its rounded top, under the rod) */
const lvContact = th => lvPt(th, 0, -LV.R);
function ringDot(x, y, o = 1, c = Y) { return o > 0 ? `<g opacity="${cl(o).toFixed(2)}"><circle cx="${F(x)}" cy="${F(y)}" r="${F(22 * back(cl(o)))}" fill="none" stroke="#1a1a2e" stroke-width="12"/><circle cx="${F(x)}" cy="${F(y)}" r="${F(22 * back(cl(o)))}" fill="none" stroke="${c}" stroke-width="6"/><circle cx="${F(x)}" cy="${F(y)}" r="7" fill="${c}"/></g>` : ''; }
