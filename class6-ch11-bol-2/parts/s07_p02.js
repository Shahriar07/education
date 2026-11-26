/* ৭খ: drawn */
part('s07_p02', { scene: 7, label: '৭খ', title: "সিঁড়ি আর দরজার হাতল",
  screen: "সিঁড়ি, গোল দরজার হাতল; ট্যাগ।" }, [
  { c: "বাড়ির সিঁড়িও হেলানো তল। একবারে খাড়া না উঠে আমরা ধাপে ধাপে অল্প অল্প উঠি।" },
  { c: "গোল দরজার হাতলও চাকা-অক্ষদণ্ড। বড় গোল হাতলটা চাকা, ভেতরের সরু দণ্ডটা অক্ষ। হাতল ঘোরালে দণ্ড ঘোরে, আর দরজার খিল সরে যায়।" }
], function (t, S) {
  let s = '', u = '', P;
  if (t < S.A(1)) { P = W3.frame({ cam: { pos: [BR.X + 7.6, 2.0, 4.0], look: [BR.X + 5.6, 1.3, -2.4], fov: 46 }, yard: true, sun: [-14, 34, 26] });
    const pts = []; for (let i = 0; i <= 14; i++) pts.push(P(BR.X + 4 + (14 - i) * 0.26, BR.H * i / 14 + 0.03, -1.8)); const o = S.P(0, 0.3, 0.5);
    s += `<polyline points="${pts.map(p => F(p[0]) + ',' + F(p[1])).join(' ')}" fill="none" stroke="${Y}" stroke-width="8" stroke-dasharray="18 12" opacity="${cl(o * 2).toFixed(2)}"/>`;
    u += lab(pts[7][0] + 200, pts[7][1], 'সিঁড়ি: হেলানো তল', 'name', S.P(0, 0.1, 0.25)) + lab(960, 220, big('ধাপে ধাপে অল্প অল্প উঠি'), 'move', S.P(0, 0.55, 0.7)); }
  else { const q = Math.max(0, t - S.A(1) - 1.2), turn = -0.9 * Math.sin(Math.min(1, q / 1.4) * Math.PI / 2) * (q > 3.5 ? Math.max(0, 1 - (q - 3.5) / 1.2) : 1);
    P = W3.frame({ cam: C11.door(), door: turn });
    const [kx, ky] = P(DR.X + 0.36, DR.KY, DR.Z + 0.08), [nx, ny] = P(DR.X + 0.36, DR.KY, DR.Z + 0.02), [bx, by] = P(DR.X + 0.47, DR.KY, DR.Z + 0.02), o1 = S.P(1, 0.05, 0.2), o2 = S.P(1, 0.2, 0.35);
    u += lab(kx - 250, ky - 70, 'গোল হাতল: চাকা', 'name', o1);
    s += `<line x1="${F(nx)}" y1="${F(ny)}" x2="${F(bx)}" y2="${F(by)}" stroke="${Y}" stroke-width="8" stroke-dasharray="14 10" opacity="${cl(o2 * 2).toFixed(2)}"/>`; u += lab((nx + bx) / 2 + 40, ny + 90, 'ভেতরের সরু দণ্ড: অক্ষ', 'name', o2);
    u += lab(bx + 120, by - 80, 'খিল সরে যায়', 'move', S.P(1, 0.6, 0.75)) + lab(1640, 170, 'দরজার হাতল', 'name'); }
  return { gl: true, svg: s, ui: u };
});
