/* ২খ: light is a form of energy: a solar panel on a village tin roof; when the sun comes out from behind a cloud, the lamp
   inside lights up. Sunlight drawn as parallel rays along the sun's direction in the scene. */
const SUN9 = [-22, 38, 30];   // world3d.js default sun offset (from the camera's look point): every ray is parallel to it
part('s02_p02', { scene: 2, label: '২খ', title: "আলো এক প্রকার শক্তি",
  screen: "3D গ্রামের উঠোন, টিনের ঘর, দিন। চালে সৌরপ্যানেল। মেঘ সরে রোদ প্যানেলে পড়ে (হলুদ সমান্তরাল রেখা), ঘরের ভেতরের বাতি জ্বলে ওঠে। শব্দ-কার্ড: শক্তি (Energy)।" }, [
  { c: "আলো আসলে এক প্রকার শক্তি।" },
  { c: "কাজ করার সামর্থ্যকেই শক্তি বলে।" },
  { c: "গ্রামের অনেক বাড়ির চালে সৌরপ্যানেল দেখেছ?" },
  { c: "রোদ পড়লেই ঘরের বাতি জ্বলে।" },
  { c: "আলো এখানে কাজ করল।" },
  { c: "তার মানে আলোর কাজ করার সামর্থ্য আছে, অর্থাৎ আলোর আছে শক্তি।" }
], function (t, S) {
  const sunOut = ease(S.P(3, 0, 0.35)), lamp = ease(S.P(3, 0.45, 0.7));
  const P = W3.frame({ cam: C9.tinOut(), t, sunK: 0.35 + 0.65 * sunOut, tin: { solar: lamp, yard: false } });
  let s = `<rect width="1920" height="1080" fill="#5b6777" opacity="${(0.28 * (1 - sunOut)).toFixed(2)}"/>`, u = '';
  /* parallel sunlight rays onto the panel (direction from SUN9), drawn as they arrive */
  const n = Math.hypot(...SUN9), d = SUN9.map(v => v / n), pc = V9.tn.panel.getWorldPosition(new THREE.Vector3());
  if (sunOut > 0) [-0.45, -0.15, 0.15, 0.45].forEach((off, i) => { const end = [pc.x + off, pc.y + 0.05, pc.z + off * 0.2], k = ease(pr(sunOut, i * 0.08, 0.7 + i * 0.08)), st = end.map((v, j) => v + d[j] * 3.2);
    const [x1, y1] = P(...st), [x2, y2] = P(...end.map((v, j) => st[j] + (v - st[j]) * k)); s += arrow2(x1, y1, x2, y2, k > 0.02 ? 1 : 0); });
  const [px, py] = P(pc.x, pc.y + 0.3, pc.z); u += lab(px, py - 40, 'সৌরপ্যানেল', 'name', S.P(2, 0.3, 0.45));
  const [bx, by] = P(TN.X + 1.3, 1.65, TN.IN.d / 2 - 0.4); u += lab(bx + 20, by + 90, 'বাতি জ্বলল', 'rest', S.P(3, 0.65, 0.8));
  u += termCard('শক্তি', 'Energy', S.P(1, 0, 0.2), 1 - S.P(2, 0, 0.12), 960, 470);
  return { gl: true, svg: s, ui: u };
});
