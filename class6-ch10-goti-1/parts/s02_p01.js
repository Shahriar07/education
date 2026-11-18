/* ২ক: your eyes at the bus stand. The camera turns slowly from up the road to the bus stop;
   a minute passes on the clock and nothing changes place. */
part('s02_p01', { scene: 2, label: '২ক', first: true, title: 'বাসস্ট্যান্ডে: সবকিছু নিজের জায়গায়',
  screen: '3D, তোমার চোখে, বাসস্ট্যান্ড থেকে। ক্যামেরা ধীরে রাস্তা থেকে বাসস্টপের ছাউনি ও দালানের দিকে ঘোরে। ল্যাম্পপোস্ট, বাসস্টপের ফলক ও দালানে একে একে পিন বসে। কোণে ঘড়ি: এক মিনিট পার হয়, পিনগুলো নড়ে না, তারপর "স্থির" লেখা।' }, [
  { c: "ধরো, এবার তুমি রাস্তার পাশে বাসস্ট্যান্ডে দাঁড়িয়ে বাসের জন্য অপেক্ষা করছ।" },
  { c: "চারপাশে তাকাও। দালানকোঠা, ল্যাম্পপোস্ট, বাসস্টপের ছাউনি, সবাই নিজের নিজের জায়গায় দাঁড়িয়ে আছে।" },
  { c: "ঘড়ির কাঁটা ঘুরছে, এক মিনিট পার হয়ে গেল।" },
  { c: "তবু ওরা ঠিক আগের জায়গাতেই আছে। তোমার সাপেক্ষে ওদের অবস্থান একটুও বদলায়নি।" }
], function (t, S) {
  const R = ROAD, A = R.ARI, k = ease(pr(t, S.A(1), S.A(2)));
  const cam = W3.mix({ pos: [A.x, A.y, A.z], look: [A.x - 10, A.y + 0.9, A.z + 3.6], fov: 58 },
                     { pos: [A.x + 0.6, A.y, A.z + 0.4], look: [A.x - 9, A.y + 1.1, A.z - 2.4], fov: 58 }, k);
  const P = W3.frame({ cam });
  let s = '', u = '';
  u += whoTag('কে দেখছে: তুমি', pr(t, 0.4, 0.9));
  const spots = [[-6, 0.2, R.LAMP_Z + 0.4, 0.15], [R.STOP_X + 2.9, 0.2, R.STOP_Z + 0.9, 0.4], [-18, 0.2, R.LAMP_Z + 0.4, 0.6], [-9, 2.6, -6.45, 0.8]];
  const o3 = S.fin(3, 0.4);
  spots.forEach(([x, y, z, a]) => { const [px, py, ok] = P(x, y, z); if (!ok || px < 30 || px > 1890) return; s += pin(px, py, 1.15, S.P(1, a, a + 0.12)); u += lab(px + 90, py - 52, 'স্থির', 'rest', o3); });
  // a minute passes during segment 2: the second hand turns once
  const sec = 60 * ease(S.P(2, 0.05, 0.95)) + (t >= S.E(2) ? 0 : 0);
  s += clock(160, 270, 80, sec, S.fin(2, 0.4) || (t > S.E(2) ? 1 : 0));
  return { gl: true, svg: s, ui: u };
});
