/* ৭ক: hints for MCQ 1 (a displacement arrow that grows with time) and MCQ 2 (the second hand, shown 12 times faster) */
part('s07_p01', { scene: 7, label: '৭ক', first: true, title: "হিন্ট: বহুনির্বাচনি ১ ও ২",
  screen: "ব্যানার: নমুনা প্রশ্নের হিন্ট। প্রশ্ন ১: শুরু থেকে শেষ পর্যন্ত নীল তীর বাড়তে থাকে, পাশে চলন্ত ঘড়ি। প্রশ্ন ২: 3D ঘড়ির সেকেন্ডের কাঁটা পাক দেয়। উত্তর দেখানো হয় না।" }, [
  { c: "এবার বইয়ের নমুনা প্রশ্ন। উত্তর দেব না, শুধু হিন্ট!" },
  { c: "সময়ের সাথে সরণের পরিবর্তনের হারকে কী বলে? ভাবো, সরণের দিক আছে। তারও দিক থাকবে।" },
  { d: 2.0 },
  { c: "সেকেন্ডের কাঁটার গতি কোন ধরনের? দেখো, এক পাক শেষে কাঁটা কী করে, আর কত সময় পর পর করে।" },
  { d: 2.0 }
], function (t, S) {
  let s = '', u = '', P;
  if (t < S.A(3)) { const X = ROAD.NS.X, Z = ROAD.NS.Z, tA = S.A(1) + 0.3, d = cl(1.2 * (t - tA), 0, 10); P = W3.frame({ cam: W3.nsSide(), sun: ANI.SUN });
    s += nsHeadSvg() + dot3(P, [X, 0.02, Z], '#fff', 13) + (d > 0.4 ? dispArrow(P, 0, d, 1, 0) : ''); const ob = placed(P, X + d, 1.4, Z, 0.02, 'তুমি'); s += ob.svg; u += ob.ui;
    if (t >= S.A(1)) { s += clock(1720, 330, 95, Math.max(0, t - tA)); u += qTop('সময়ের সাথে সরণের পরিবর্তনের হার = ?', S.P(1, 0.02, 0.12), 190, 50) + hintCard('সরণের দিক আছে, তারও দিক থাকবে', S.P(1, 0.6, 0.72), 800); }
    u += banner('নমুনা প্রশ্নের হিন্ট', S.P(0, 0.05, 0.25), 1 - S.P(1, 0, 0.06), 200);
  } else { const q = t - S.A(3); P = W3.frame({ cam: { pos: [ROAD.ROOM.X + 0.25, 1.85, ROAD.ROOM.CLOCK[2] + 1.75], look: [ROAD.ROOM.X + 0.25, 1.88, ROAD.ROOM.CLOCK[2]], fov: 40 }, room: { sec: 12 * q } }); u += speedNote('দ্রুত করে দেখানো (১২ গুণ)', 1) + qTop('সেকেন্ডের কাঁটার গতি কোন ধরনের?', S.P(3, 0.02, 0.15), 140, 46) + hintCard('এক পাক শেষে কী করে? কত সময় পর পর?', S.P(3, 0.5, 0.65), 800); }
  return { gl: true, svg: s, ui: u };
});
