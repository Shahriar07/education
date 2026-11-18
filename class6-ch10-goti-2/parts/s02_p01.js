/* ২ক: the drawer close up. The camera flies from the room view to the table. Three marks on the drawer front
   (left, middle, right); the drawer is pulled 0.25 m (trap(): speeds up, steady, slows), and each mark leaves an arrow
   from where it was; all three are the same 3D length, 25 cm. Term card চলন গতি. */
part('s02_p01', { scene: 2, label: '২ক', first: true, title: "ড্রয়ারের তিন দাগ: চলন গতি",
  screen: "3D। ক্যামেরা ঘর থেকে উড়ে টেবিলের কাছে যায়, একটু ওপর থেকে কোনাকুনি। ড্রয়ারের সামনে বাঁয়ে, মাঝে, ডানে তিনটি রঙিন দাগ। একটা হাত ড্রয়ার টানে; তিন দাগের পেছনে তিনটি সমান তীর, প্রতিটিতে \"২৫ সেমি\"। শব্দ-কার্ড: চলন গতি / Translational motion।" }, [
  { c: "ড্রয়ারটার দিকে আবার তাকাও।" },
  { c: "এর সামনে তিনটা দাগ দিলাম: বাঁয়ে, মাঝে আর ডানে।" },
  { c: "এবার টানো।", d: 3.0 },
  { c: "তিনটা দাগই একসাথে, একই দিকে, সমান দূরত্ব সরে গেল।" },
  { c: "বস্তুর সব বিন্দু যখন একই সময়ে একই দিকে সমান দূরত্ব যায়, তাকে বলে চলন গতি।" }
], function (t, S) {
  const R = ROAD.ROOM, X = R.X, T = R.TABLE, D = 0.25;
  const tp = S.A(2) + 0.6, dr = trap(t - tp, D, 1.6, 0.4);
  const cam = W3.mix(W3.roomWide(), W3.roomTable(), ease(pr(t, 0.2, S.E(0) + 0.6)));
  const P = W3.frame({ cam, room: hookRoom(t + 40, dr) });
  let s = '', u = '';
  const zf = T[2] + 0.30, yf = T[1] - 0.095;
  const xs = [-0.24, 0, 0.24], cols = ['#e63946', Y, '#2e86de'];
  xs.forEach((dx, i) => {
    const p = S.P(1, 0.3 + i * 0.18, 0.4 + i * 0.18);
    const x3 = X + T[0] + dx, y3 = yf + 0.035;
    if (t >= tp) { const [a1, b1] = P(x3, y3, zf), [a2, b2] = P(x3, y3, zf + dr); s += arrow2(a1, b1, a2, b2, 1, cols[i]); s += dot3(P, [x3, y3, zf], '#fff', 8, 0.8); }
    s += dot3(P, [x3, y3, zf + dr], cols[i], 13 * back(p), p > 0 ? 1 : 0);
    if (t >= S.A(3)) { const [a2, b2] = P(x3, y3 - 0.09, zf + D / 2); u += lab(a2 + 40, b2 - 70 + i * 0, '২৫ সেমি', 'move', S.P(3, 0.15 + i * 0.12, 0.3 + i * 0.12)); }
  });
  // the hand pulls the knob
  if (t >= S.A(2) - 0.2) { const [kx, ky] = P(X + T[0], yf, T[2] + 0.33 + dr); s += gripHand(kx + 22, ky + 50, 0.6, ease(pr(t, S.A(2) - 0.2, S.A(2) + 0.3)) * (1 - pr(t, tp + 2.0, tp + 2.6))); }
  if (S.on(4)) u += termCard('চলন গতি', 'Translational motion', S.P(4, 0.72, 0.85), 1, 960, 330, 0.8);
  return { gl: true, svg: s, ui: u };
});
