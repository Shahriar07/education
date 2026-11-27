/* ৭খ: by day, sunlight comes in through the window and the room is bright; the curtains close, less light falls on things
   and less comes back to the eye */
part('s07_p02', { scene: 7, label: '৭খ', title: "জানালার পর্দা",
  screen: "3D পড়ার ঘর, দিন। জানালা দিয়ে রোদ ঢোকে, ঘরের সব জিনিস পরিষ্কার। ধীরে পর্দা নিজে টেনে যায় (হাত নেই), ঘর আবছা, জিনিসগুলো কম দেখা যায়। ট্যাগ: \"বস্তু থেকে আলো চোখে এলে দেখি\"।" }, [
  { c: "দিনে জানালা খোলা থাকলে ঘরের সব কিছু পরিষ্কার দেখা যায়।" },
  { c: "পর্দা টেনে দিলে ঘর আবছা হয়ে যায়।" },
  { c: "জিনিসে কম আলো পড়ে, চোখেও কম আলো ফিরে আসে।" }
], function (t, S) {
  const c = ease(S.P(1, 0.05, 0.8));
  const P = W3.frame({ cam: C9.stWide(), t, dim: 0.35 + 0.55 * c, sunDir: [10, 30, -40], st: { night: false, bulb: 0, desk: true, curtain: c } });
  let s = `<rect width="1920" height="1080" fill="#000" opacity="${(0.4 * c).toFixed(2)}"/>`, u = '';
  u += lab(960, 270, 'বস্তু থেকে আলো চোখে এলে দেখি', 'move', S.P(2, 0.15, 0.3));
  return { gl: true, svg: s, ui: u };
});
