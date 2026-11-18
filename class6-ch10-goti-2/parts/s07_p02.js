/* ৭খ: the textbook activity (p. 87) in the 3D lab: a hand pushes a football straight down again and again. Side view,
   real speed. Hand at H = 0.80 m (ball centre), the floor keeps e = 0.8 of the speed, ball radius 0.11 m (size 5).
   For the ball to come back to the hand: after the bounce v = √(2g·0.69) = 3.68 m/s, so it hits at 4.60 m/s and the
   hand must start it at u = √(4.60² − 2g·0.69) = 2.76 m/s. Fall 0.19 s + rise 0.38 s: one cycle every 0.56 s. */
const BNC = { G: 9.8, H: 0.80, R: 0.11, E: 0.8, XB: 7, Z: -1.0 };
BNC.DROP = BNC.H - BNC.R; BNC.VB = Math.sqrt(2 * BNC.G * BNC.DROP); BNC.VI = BNC.VB / BNC.E;
BNC.U = Math.sqrt(BNC.VI ** 2 - 2 * BNC.G * BNC.DROP);
BNC.TF = (BNC.VI - BNC.U) / BNC.G; BNC.TR = BNC.VB / BNC.G; BNC.T = BNC.TF + BNC.TR;
/* ball centre height (m) τ seconds into a cycle that starts at the hand */
function hBall(tau) { const { H, R, U, G, TF, VB } = BNC; return tau < TF ? H - (U * tau + 0.5 * G * tau * tau) : R + VB * (tau - TF) - 0.5 * G * (tau - TF) ** 2; }
/* the whole picture, shared with ৭গ. t0 = when the first push happens. Returns {s, P, n, tau, h} */
function bounceScene(t, t0) {
  const { H, R, T, XB, Z } = BNC, X = ROAD.LAB.X;
  const n = Math.floor((t - t0) / T), tau = t < t0 ? -1 : (t - t0) - n * T;
  const h = tau < 0 ? H : hBall(tau);
  const P = W3.frame({ cam: W3.labCam.ball(), lab: { ball: { h, rot: -(t - t0) * 0.7 } } });
  // the hand: palm on the ball top at the top of each cycle, follows it 4 cm down, then waits for it
  const top = H + R, ballTop = h + R;
  let hm = top, ho = 1;
  if (tau < 0) { const p = ease(pr(t, t0 - 1.0, t0)); hm = top + 0.12 * (1 - p); ho = p; }
  else hm = Math.max(ballTop, top - 0.04 * Math.max(0, 1 - Math.abs(tau - 0.04) / 0.06));
  const hp = [X + XB, hm, Z], [hx, hy] = P(...hp), k = pxpm(P, hp), sc = 0.19 * k / 200;
  const s = handFlat(hx + 48 * sc, hy, sc, ho);
  return { s, P, n, tau, h };
}

part('s07_p02', { scene: 7, label: '৭খ', title: "বইয়ের কাজ: ফুটবল নিচে ঠেলা (প্রশ্ন)",
  screen: "3D, পাশ থেকে চোখের উচ্চতায়, আসল গতিতে। একটা হাত ফুটবলটা সোজা নিচে ঠেলে, বল কাঠের মেঝেতে লেগে ঠিক হাতের কাছে ফেরে, হাত আবার ঠেলে; বারবার, মেঝেতে বলের ছায়া। প্রশ্ন-কার্ড: \"বলের এই গতি কোন ধরনের?\"" }, [
  { c: "বইয়ের আরেকটা কাজ। একটা ফুটবল হাত দিয়ে সোজা নিচে ঠেলে দাও।" },
  { c: "মেঝেতে ধাক্কা খেয়ে বল ওপরে ফেরে, তুমি আবার ঠেলো। বারবার।" },
  { c: "বলো তো, বলের এই গতি কোন ধরনের?" },
  { d: 2.5 }
], function (t, S) {
  const b = bounceScene(t, S.A(0) + 3.0);
  let u = '';
  if (t >= S.A(2)) u += `<div class="abs" style="left:1060px;width:780px;top:300px;opacity:${S.fin(2).toFixed(2)}"><div class="qcard" style="font-size:64px;transform:scale(${back(S.P(2, 0, 0.3)).toFixed(3)})">বলের এই গতি কোন ধরনের?</div></div>`;
  return { gl: true, svg: b.s, ui: u };
});
