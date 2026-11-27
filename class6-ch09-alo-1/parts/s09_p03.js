/* ৯গ: the puzzle for the next video: a torch lying on the desk in a dark room shines on a small mirror at 45°: the light goes
   off it in one direction and makes a bright spot on the wall; on a sheet of white paper in the same place there is no such
   spot. Mirror: normal n = (cos 225°, 0, sin 225°); the beam (+x) turns to -z; the wall is 0.65 m behind the mirror. */
const TOR9 = { x: -0.35, z: -1.35 }, MIR9 = { x: 0.15, z: -1.35, yaw: 225 };
part('s09_p03', { scene: 9, label: '৯গ', last: true, title: "ধাঁধা ও পরের ভিডিও",
  screen: "3D অন্ধকার ঘর। টেবিলে রাখা একটা টর্চ একটা আয়নায় আলো ফেলে: আয়না থেকে দেয়ালে উজ্জ্বল দাগ। তারপর আয়নার জায়গায় সাদা কাগজ: কোনো স্পষ্ট দাগ নেই। প্রশ্ন-কার্ড: \"কেন?\" তারপর \"পরের ভিডিও\" কার্ড: আলোর প্রতিফলন ও শোষণ।" }, [
  { c: "যাওয়ার আগে একটা ধাঁধা।" },
  { c: "অন্ধকার ঘরে টর্চের আলো আয়নায় ফেললে দেয়ালে একটা উজ্জ্বল দাগ পড়ে।" },
  { c: "কিন্তু সাদা কাগজে ফেললে তেমন দাগ পড়ে না।" },
  { c: "কেন?" },
  { c: "জানব পরের ভিডিওতে: আলোর প্রতিফলন ও শোষণ।" },
  { d: 1.0 }
], function (t, S) {
  const paper = t >= S.A(2) + 0.4, on = ease(S.P(1, 0.15, 0.3)), y = ST.top + 0.026;
  const lens = [ST.X + TOR9.x + 0.13, y, TOR9.z], M = [ST.X + MIR9.x, y, MIR9.z], W = [ST.X + MIR9.x, y, -2.0 + 0.004];
  const rays = []; if (on > 0.5 && !paper) { rays.push({ a: lens, b: M, r: 0.003, head: false }); rays.push({ a: M, b: W, r: 0.003, head: false }); }
  if (on > 0.5 && paper) rays.push({ a: lens, b: M, r: 0.003, head: false });
  const spotR = (0.37 + 0.65) * Math.tan(7 * Math.PI / 180);
  const st = { night: true, bulb: 0, desk: false, torch: { x: TOR9.x, z: TOR9.z, yaw: 0, on }, mirror: paper ? undefined : MIR9, paper: paper ? MIR9 : undefined, spot: (!paper && on > 0.5) ? { p: [W[0], W[1] + 0.04, W[2]], n: [0, 0, 1], r: spotR } : undefined };
  const P = W3.frame({ cam: { pos: [ST.X + 0.0, 1.15, -0.35], look: [ST.X - 0.02, 0.84, -1.55], fov: 52 }, t, dim: 1, bg: 'night', st, rays });
  let s = `<rect width="1920" height="1080" fill="#000" opacity="0.3"/>`, u = '';
  const [mx, my] = P(...M); u += lab(mx + 40, my + 110, paper ? 'সাদা কাগজ' : 'আয়না', 'name', paper ? S.P(2, 0.2, 0.35) : S.P(1, 0.2, 0.35));
  if (!paper) { const [wx, wy] = P(...W); u += lab(wx, wy - 150, 'দেয়ালে উজ্জ্বল দাগ', 'move', S.P(1, 0.55, 0.7)); }
  else { const [wx, wy] = P(...W); u += lab(wx, wy - 150, 'দাগ নেই', 'name', S.P(2, 0.55, 0.7)); }
  if (t >= S.A(3)) u += card('কেন?', S.P(3, 0.05, 0.3), 1 - S.P(4, 0, 0.15), 330, 500, 100);
  if (t >= S.A(4)) u += `<div class="abs" style="left:0;width:1920px;top:300px;display:flex;justify-content:center;opacity:${S.P(4, 0.05, 0.25).toFixed(2)}"><div class="qcard" style="width:1200px;font-size:60px;transform:scale(${back(S.P(4, 0.05, 0.3)).toFixed(3)})"><span style="font-size:44px;color:#5b6b8c">পরের ভিডিও</span><br>আলোর প্রতিফলন ও শোষণ</div></div>`;
  return { gl: true, svg: s, ui: u };
});
