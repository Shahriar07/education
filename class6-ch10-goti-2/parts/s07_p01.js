/* ৭ক: quick examples around us, five short 3D shots, each named and tagged as it is spoken.
   Bus on the straight road: 5 m/s (চলন). Train on a curve of radius 40 m: 10 m/s, each coach turned along the curve
   (বক্রগতি). Ferris wheel at a fair: 18°/s, the cars hang straight down (ঘূর্ণন). Vehicle wheel: a bus moves at 1.5 m/s and its
   rear wheel rolls without slipping, turn = x / r, r = 0.5 m (জটিল). Sewing-machine needle: up and down, y = A sin(2πft),
   shown slowed (স্পন্দন). */
part('s07_p01', { scene: 7, label: '৭ক', first: true, title: "চারপাশের গতি",
  screen: "ব্যানার: চারপাশে। পাঁচটি ছোট 3D দৃশ্য পরপর, প্রতিটিতে নাম আর ট্যাগ: সোজা রাস্তায় চলা বাস (চলন গতি), রেললাইনের বাঁকে বাঁক নেওয়া ট্রেন (বক্রগতি), মেলার নাগরদোলার ঘুরন্ত বড় চাকা (ঘূর্ণন গতি), গড়িয়ে চলা গাড়ির চাকা, চাকার দাগ ঘোরে আর এগোয় (জটিল গতি), সেলাই মেশিনের ওঠানামা করা সুঁই (স্পন্দন গতি)।" }, [
  { c: "এবার চারপাশে খুঁজি।" },
  { c: "সোজা রাস্তায় বাস: চলন গতি। রেললাইনের বাঁকে ট্রেন: বক্রগতি।" },
  { c: "মেলার নাগরদোলার বড় চাকা: ঘূর্ণন গতি। গাড়ির চাকা: জটিল গতি।" },
  { c: "সেলাই মেশিনের সুঁই: স্পন্দন গতি।", d: 3.6 }
], function (t, S) {
  const half1 = (S.A(1) + S.E(1)) / 2, half2 = (S.A(2) + S.E(2)) / 2;
  let s = '', u = '', name = '', kind = '', pk = 0, P;
  if (t < half1) {                                   // bus, steady 5 m/s on the straight road
    P = W3.frame({ cam: W3.third(6), busX: -10 + 5 * t });
    name = 'সোজা রাস্তায় বাস'; kind = 'চলন গতি'; pk = t >= S.A(1) ? S.P(1, 0.0, 0.12) : 0;
  } else if (t < S.A(2)) {                           // train on a curve, 10 m/s
    const tt = t - half1; P = W3.frame({ cam: W3.aroundCam.train(), around: { train: -18 + 10 * tt } });
    name = 'রেললাইনের বাঁকে ট্রেন'; kind = 'বক্রগতি'; pk = pr(t, half1 + 0.2, half1 + 0.6);
  } else if (t < half2) {                            // Ferris wheel, 18°/s
    P = W3.frame({ cam: W3.aroundCam.wheel(), around: { wheel: 18 * (t - S.A(2)) } });
    name = 'মেলার নাগরদোলা'; kind = 'ঘূর্ণন গতি'; pk = S.P(2, 0.0, 0.12);
  } else if (t < S.A(3)) {                           // a bus's rear wheel rolling: bus at 1.5 m/s, wheel r = 0.5 m, turn = x / r
    const tt = t - half2, bx = 4.6 + 1.5 * tt, R = ROAD.WHEEL_R, zf = ROAD.LANE_Z + ROAD.BUS_W / 2 - 0.1 + 0.18, x0 = 4.6;
    P = W3.frame({ cam: { pos: [3.9, 0.95, 5.6], look: [3.9, 0.75, ROAD.LANE_Z], fov: 40 }, busX: bx });
    const mk = x => { const th = -x / R, wx = x - 3.0; return [wx + 0.4 * Math.sin(th), R - 0.4 * Math.cos(th), zf]; };
    const pts = []; for (let k = 0; k <= 60; k++) pts.push(mk(x0 + (bx - x0) * k / 60));
    s += path3(P, pts, Y, 5, '2 10') + dot3(P, mk(bx), Y, 11);
    name = 'গাড়ির চাকা'; kind = 'জটিল গতি'; pk = pr(t, half2 + 0.2, half2 + 0.6);  } else {                                           // sewing machine needle, shown slowed
    const tt = t - S.A(3); P = W3.frame({ cam: W3.aroundCam.sew(), around: { needle: 0.018 * Math.sin(2 * Math.PI * 1.5 * tt) } });
    name = 'সেলাই মেশিনের সুঁই'; kind = 'স্পন্দন গতি'; pk = S.P(3, 0.0, 0.15);
    u += speedNote('ধীর করে দেখানো', 1);
  }
  u += banner('চারপাশে', S.P(0, 0.1, 0.4), 1 - S.P(1, 0.0, 0.1), 140);
  if (name && pk > 0) u += lab(960, 170, name, 'name', pk) + lab(960, 240, kind, 'move', pk);
  return { gl: true, svg: s, ui: u };
});
