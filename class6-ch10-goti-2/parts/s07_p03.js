/* ৭গ: the answer. The same bouncing continues (bounceScene from ৭খ, 3D); a time line on the right gets one mark per
   bounce, all BNC.T = 0.56 s apart → পর্যাবৃত্ত গতি. The hand's up-and-down repeats too. */
part('s07_p03', { scene: 7, label: '৭গ', last: true, title: "উত্তর: পর্যাবৃত্ত গতি",
  screen: "একই 3D দৃশ্য চলতে থাকে; ডানে একটা সময়-রেখা, প্রতিবার বল মেঝেতে লাগলে একটা দাগ, দাগগুলোর ফাঁক সমান। ট্যাগ \"পর্যাবৃত্ত গতি\", সবুজ টিক; হাতের ওপরেও ট্যাগ \"হাতের ওঠানামাও পর্যাবৃত্ত\"। শেষে প্রশ্ন-কার্ড: \"চারপাশে আর কী কী দেখো?\"" }, [
  { c: "উত্তর: পর্যাবৃত্ত গতি। একই পথের অংশ বারবার ফিরে ফিরে আসছে।" },
  { c: "আর তোমার হাতের ওঠানামাও পর্যাবৃত্ত গতি।" },
  { c: "তোমার চারপাশে আর কী কী দেখো? খুঁজে বের করো।" }
], function (t, S) {
  const b = bounceScene(t, -0.2);
  let s = b.s, u = '';
  const X0 = 1100, Y0 = 520, PXs = 250;
  s += `<rect x="${X0 - 40}" y="${Y0 - 110}" width="790" height="220" rx="26" fill="#0f1b3d" opacity=".85"/>`;
  s += `<line x1="${X0}" y1="${Y0}" x2="${X0 + 700}" y2="${Y0}" stroke="#cfd8ee" stroke-width="5"/>`;
  const tb0 = -0.2 + BNC.TF, win = 700 / PXs, tStart = Math.max(0, t - win);
  for (let k = 0; ; k++) { const tk = tb0 + k * BNC.T; if (tk > t) break; if (tk < tStart) continue; s += `<circle cx="${F(X0 + (tk - tStart) * PXs)}" cy="${Y0}" r="13" fill="${Y}"/>`; }
  s += `<circle cx="${F(X0 + (t - tStart) * PXs)}" cy="${Y0}" r="8" fill="#fff"/>`;
  u += lab(X0 + 350, Y0 - 62, 'প্রতিবার সমান সময় পর মেঝেতে লাগে', 'name', 1);
  u += lab(X0 + 350, Y0 + 70, 'পর্যাবৃত্ত গতি', 'move', S.P(0, 0.05, 0.2));
  s += tick(X0 + 640, Y0 + 70, 24, S.P(0, 0.2, 0.35));
  if (t >= S.A(1)) { const [hx, hy] = b.P(ROAD.LAB.X + BNC.XB, BNC.H + BNC.R + 0.12, BNC.Z); u += lab(hx + 40, hy - 40, 'হাতের ওঠানামাও পর্যাবৃত্ত', 'move', S.P(1, 0.2, 0.4)); }
  if (t >= S.A(2)) u += `<div class="abs" style="left:1060px;width:780px;top:720px;opacity:${S.fin(2).toFixed(2)}"><div class="qcard" style="font-size:56px;padding:28px 40px 22px;transform:scale(${back(S.P(2, 0, 0.3)).toFixed(3)})">চারপাশে আর কী কী দেখো?</div></div>`;
  return { gl: true, svg: s, ui: u };
});
