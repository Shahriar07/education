/* ৩গ: the question: straight or bent? */
part('s03_p03', { scene: 3, label: '৩গ', last: true, title: "প্রশ্ন: সোজা না বাঁকা?",
  screen: "আগের দুই জায়গা পাশাপাশি ছোট করে (রোদের রেখা, টর্চের আলো)। মাঝে প্রশ্ন-কার্ড: \"আলো কি সোজা পথে চলে, না বাঁকা পথে?\" নিচে ব্যানার: \"চলো, পরীক্ষা করি\"।" }, [
  { c: "তাহলে কী মনে হয়? আলো কি সোজা পথে চলে, নাকি বাঁকা পথে?" },
  { c: "শুধু দেখে বললে হবে না। বিজ্ঞানে আমরা পরীক্ষা করে দেখি।" },
  { c: "চলো, বইয়ের পরীক্ষাটা করি।" }
], function (t, S) {
  /* the two places, rendered once each into small pictures (cached), side by side on navy */
  if (!window._q3) { const cv = document.getElementById('gl'), shot = (o) => { W3.frame(o); return cv.toDataURL('image/jpeg', 0.9); };
    window._q3 = [shot({ cam: tinSide(), t: 3, dim: 0.62, sunDir: TIN_SUN(), tin: { beam: 1, yard: false } }), shot({ cam: C9.stair(), t: 3, dim: 1, bg: '#05070d', stair: { yaw: 0, on: 1 } })]; }
  let s = bg(NAVY), u = '';
  window._q3.forEach((src, i) => { const p = pr(t, 0.1 + i * 0.25, 0.6 + i * 0.25), x = 150 + i * 860; s += g(p, `<rect x="${x - 8}" y="472" width="796" height="456" rx="22" fill="#fff"/><image href="${src}" x="${x}" y="480" width="780" height="439" preserveAspectRatio="xMidYMid slice"/>`); });
  u += card('আলো কি সোজা পথে চলে, না বাঁকা পথে?', S.P(0, 0.05, 0.25), 1, 150, 1500, 76);
  u += banner('চলো, পরীক্ষা করি', S.P(2, 0.05, 0.25), 1, 330);
  return { svg: s, ui: u };
});
