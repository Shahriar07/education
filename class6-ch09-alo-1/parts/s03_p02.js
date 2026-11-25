/* ৩খ: city: a torch on the floor of a dark stairwell; its straight beam makes a round spot on the wall 3 m away; the torch
   turns and the spot moves with it. Half-angle of the beam 7°: spot radius = distance × tan 7°. */
part('s03_p02', { scene: 3, label: '৩খ', title: "শহর: সিঁড়িতে টর্চ",
  screen: "3D শহরের ফ্ল্যাটের অন্ধকার সিঁড়িঘর, লোডশেডিং। ছোট টুলের ওপর রাখা একটা টর্চ জ্বলে ওঠে; সোজা আলোর পথ সামনের দেয়ালে গোল দাগ ফেলে। টর্চ ধীরে ঘোরে (হাত নেই), দাগও সেই অনুযায়ী সরে।" }, [
  { c: "শহরের ফ্ল্যাটে লোডশেডিং হলে সিঁড়িতে টর্চ জ্বালাও তো?" },
  { c: "টর্চের আলো সোজা গিয়ে সামনের দেয়ালে একটা গোল দাগ ফেলে।" },
  { c: "টর্চটা যেদিকে ঘোরাও, দাগটাও ঠিক সেদিকে সরে।" }
], function (t, S) {
  const on = ease(S.P(0, 0.75, 0.95)), yaw = t < S.A(2) ? 0 : 18 * Math.sin(ease(S.P(2, 0.05, 0.95)) * Math.PI * 1.5);
  const P = W3.frame({ cam: C9.stair(), t, dim: 1, bg: '#05070d', stair: { yaw, on } });
  let s = `<rect width="1920" height="1080" fill="#000" opacity="0.35"/>`, u = '';
  const [tx, ty] = P(SR.X + SR.TORCH.x, SR.STOOL, SR.TORCH.z); u += lab(tx - 40, ty + 70, 'টর্চ', 'name', S.P(0, 0.5, 0.65));
  if (SR.HIT && on > 0.5) { const [wx, wy] = P(...SR.HIT); u += lab(wx - 60, wy - 150, 'দেয়ালে আলোর দাগ', 'name', S.P(1, 0.5, 0.65)); }
  return { gl: true, svg: s, ui: u };
});
