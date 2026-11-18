/* ৫ঙ: the same road through your eyes, from your seat inside the bus.
   Physics: the camera rides with the bus (camera x = bus x + const, bus x = x0 + V t), so the window frame
   and the seat in front keep their place in the picture, while every lamp post and the bus stop slide
   backwards at V. Each arrow is the distance a lamp post covers in half a second. */
part('s05_p05', { screen: 'বাইরে থেকে শুরু, ক্যামেরা বাসের জানালা দিয়ে ভেতরে ঢুকে তোমার সিটে বসে। ভেতরে জানালার অ্যালুমিনিয়ামের ফ্রেম, বন্ধ কাচ, পিলারে বাঁধা পর্দা, প্রতিটি জানালার পাশে একটা করে সিট। ওপরে "কে দেখছে: তুমি"। জানালার রেলিং আর সামনের সিটের হাতলে পিন ও "স্থির"। বাইরে ল্যাম্পপোস্ট, বাসস্টপ ও "আরিয়ান" চোখ পেছনে সরে যায়, তীর ও "গতিশীল"। শেষে দুই কার্ড: "আরিয়ানের কাছে স্থির", "তোমার কাছে গতিশীল"।', scene: 5, label: '৫ঙ', title: 'তোমার চোখে: বাস স্থির, ল্যাম্পপোস্ট গতিশীল', last: true }, [
  { c: "এবার দেখি বাসের ভেতর থেকে, তোমার নিজের চোখ দিয়ে।" },
  { c: "তোমার সাপেক্ষে বাসের জানালা আর সামনের সিট একই জায়গায় আছে। ওরা স্থির।" },
  { c: "কিন্তু ল্যাম্পপোস্ট আর বাসস্টপ একটার পর একটা পেছনের দিকে সরে যাচ্ছে।" },
  { c: "একই ল্যাম্পপোস্ট আরিয়ানের কাছে স্থির, আর তোমার কাছে গতিশীল।" }
], function (t, S) {
  const R = ROAD, V = R.V_BUS;
  const tStop = S.A(2) + 0.65 * (S.E(2) - S.A(2));            // you draw level with the bus stop here
  const xb = R.STOP_X - R.SEAT.dx + V * (t - tStop);           // uniform velocity
  const tIn = S.E(0) - 0.8, k = ease(pr(t, 0.6, tIn));         // fly from the outside view into your seat
  const cam = W3.mix(W3.third(xb), W3.seat(xb), k);
  const P = W3.frame({ cam, busX: xb });
  let s = '', u = '';

  const me = placed(P, xb + R.SEAT.dx, 4.5, R.LANE_Z, 3.35, 'তুমি', 1 - pr(k, 0.35, 0.7)); s += me.svg; u += me.ui;
  u += whoTag('কে দেখছে: তুমি', pr(t, tIn - 0.2, tIn + 0.3));
  if (k < 1) return { gl: true, svg: s, ui: u };

  // inside the bus: the window pillar and the seat in front are pinned
  const oB = S.fin(1, 0.4);
  if (oB > 0) {
    const [px, py] = P(xb + 0.4, 2.11, R.LANE_Z - 0.75);       // grab handle of the seat in front of you
    const [qx, qy] = P(xb - 0.24, 1.98, R.LANE_Z - R.BUS_W / 2 + 0.1);    // your window's centre rail, at the sill
    s += pin(px, py, 1.3, oB) + pin(qx, qy, 1.1, oB);
    u += lab(px - 120, py - 60, 'স্থির', 'rest', oB) + lab(qx + 110, qy - 50, 'স্থির', 'rest', S.fade(1, 1, 0.4));   // this label leaves before the arrows arrive
  }

  // outside: lamp posts and the bus stop slide backwards
  const oM = S.fin(2, 0.4);
  if (oM > 0) {
    let best = null;
    W3.lamps(xb - 4, xb + 70).forEach(x => {
      const [x1, y1, ok1] = P(x, 2.62, R.LAMP_Z), [x2, y2, ok2] = P(x - V * 0.5, 2.62, R.LAMP_Z);   // at window height, so the arrow is seen through the glass
      if (!ok1 || !ok2 || x1 < 60 || x1 > 1860) return;
      s += arrow2(x1 - 22, y1, x2 - 22, y2, oM);
      const n = Math.hypot(x2 - x1, y2 - y1); if (n > 60 && (!best || n > best.n)) best = { n, x: x1, y: y1 };
    });
    if (best) u += lab(cl(best.x + 20, 220, 1700), best.y - 78, 'গতিশীল', 'move', oM);
    const [ax, ay, ok] = P(R.ARI.x, 2.2, R.ARI.z);
    if (ok && ax > 120 && ax < 1800) { const o = observer(ax, ay, 'আরিয়ান', 1, 0.36); s += o.svg; u += o.ui; }
  }

  // closing comparison
  const o3 = S.fin(3, 0.4);
  if (o3 > 0) {
    const e = `<svg width="62" height="44" viewBox="-90 -64 180 128">${eye(0, 0, 1)}</svg>`;
    u += `<div class="abs" style="left:0;width:1920px;top:128px;display:flex;justify-content:center;gap:28px;opacity:${o3.toFixed(2)}">
      <div class="vs">${e}আরিয়ানের কাছে <span class="lab rest" style="transform:none;font-size:38px">স্থির</span></div>
      <div class="vs">${e}তোমার কাছে <span class="lab move" style="transform:none;font-size:38px">গতিশীল</span></div></div>`;
  }
  return { gl: true, svg: s, ui: u };
});
