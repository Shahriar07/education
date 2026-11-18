/* ৪ক: the second hand of the wall clock in your room (3D, close up): 6° a second, one turn in 60 s. Sentence 1 at real
   speed, then 15× faster (noted) so that whole turns can be counted, each 60 s of clock time. The tip's circle is drawn
   on the clock face from the 3D geometry (face centre at y ≈ 2.0 m, tip 0.143 m from the centre). Term card পর্যাবৃত্ত গতি. */
part('s04_p01', { scene: 4, label: '৪ক', first: true, title: "সেকেন্ডের কাঁটা: পর্যাবৃত্ত গতি",
  screen: "3D, তোমার ঘরের দেয়ালঘড়ি কাছ থেকে। সেকেন্ডের লাল কাঁটা প্রথমে আসল গতিতে, তারপর দ্রুত করে দেখানো (লেখা থাকে); কাঁটার মাথা একই বৃত্ত বারবার আঁকে, পাশে পাক-গণনা আর প্রতি পাকে \"৬০ সেকেন্ড\"। নিচে দোলক দোলে। শব্দ-কার্ড: পর্যাবৃত্ত গতি / Periodic motion।" }, [
  { c: "এবার দেয়ালঘড়ির সেকেন্ডের কাঁটাটা দেখো।" },
  { c: "এক মিনিটে সে একবার পুরো ঘুরে আসে। আবার একই পথে ঘোরে, আবার এক মিনিটে।" },
  { c: "নির্দিষ্ট সময় পর পর একই পথে বারবার চলাকে বলে পর্যাবৃত্ত গতি।" }
], function (t, S) {
  const K = 15, t1 = S.A(1), R = ROAD.ROOM, X = R.X, C = R.CLOCK;
  const sec = t < t1 ? 1200 + t : 1200 + t1 + K * (t - t1);
  const P = W3.frame({ cam: W3.roomClock(), room: { fan: 0, pend: 7 * Math.sin(2 * Math.PI * t / 1.14), sec } });
  const fc = [X + C[0], C[1] + 0.17 * 1.3, C[2] + 0.07], rt = 0.143;
  let s = '', u = '';
  if (t >= t1) {
    const lapSec = sec - (1200 + t1), laps = Math.floor(lapSec / 60), done = laps >= 1 ? 1 : (lapSec % 60) / 60;
    const a0 = (1200 + t1) * 6 * Math.PI / 180, pts = [];
    for (let k = 0; k <= 96 * done; k++) { const a = a0 + 2 * Math.PI * k / 96; pts.push([fc[0] + rt * Math.sin(a), fc[1] + rt * Math.cos(a), fc[2]]); }
    s += path3(P, pts, '#e63946', 6, '3 10');
    u += readout(1300, 380, 'পাক', BN(laps), S.fin(1)) + lab(1560, 520, 'প্রতি পাকে ৬০ সেকেন্ড', 'move', S.P(1, 0.4, 0.55)) + speedNote('দ্রুত করে দেখানো (১৫ গুণ)', S.fin(1, 0.3));
  }
  if (S.on(2)) u += termCard('পর্যাবৃত্ত গতি', 'Periodic motion', S.P(2, 0.55, 0.75), 1, 1450, 760, 0.8);
  return { gl: true, svg: s, ui: u };
});
