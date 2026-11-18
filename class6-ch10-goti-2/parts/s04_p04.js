/* ৪ঘ: the wrong belief "one motion is only one kind". The fan turns about its centre (ঘূর্ণন) and every turn takes the
   same time (পর্যাবৃত্ত): a mark on a blade passes the same spot once per turn, the turn times are shown equal.
   The pendulum goes to both sides of one position (দোলন), and repeats in equal times, so it is also পর্যাবৃত্ত. */
part('s04_p04', { scene: 4, label: '৪ঘ', last: true, title: "ভুল ধারণা: একটা গতি এক রকমই?",
  screen: "নেভি পটভূমি। প্রশ্ন-কার্ড: \"অনেকে ভাবে: একটা গতি শুধু এক রকমের\", তারপর লাল ক্রস। বাঁয়ে ঘুরন্ত পাখা, একটা ব্লেডে দাগ; ট্যাগ \"ঘূর্ণন গতি\" আর \"পর্যাবৃত্ত গতি\", প্রতি পাকের সময় সমান দেখায়। ডানে দেয়ালঘড়ির দোলক, ট্যাগ \"দোলন গতি\" ও \"পর্যাবৃত্ত গতি\", সবুজ টিক।" }, [
  { c: "অনেকে ভাবে, একটা গতি শুধু এক রকমেরই হয়।" },
  { c: "আসলে ঘটনা ঠিক উল্টো।" },
  { c: "পাখা কেন্দ্রের চারদিকে ঘোরে, তাই ঘূর্ণন গতি। আবার প্রতিটা পাক একই সময়ে, তাই পর্যাবৃত্ত গতিও।" },
  { c: "আর দোলন গতি তো একরকম পর্যাবৃত্ত গতিই।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  if (t < S.A(2)) {
    u += card('অনেকে ভাবে: একটা গতি শুধু এক রকমের', S.P(0, 0.05, 0.3), 1 - S.P(1, 0.8, 1), 360, 1400, 70);
    s += cross(960, 700, 60, S.P(1, 0.1, 0.4));
    return { svg: s, ui: u };
  }
  // fan, slowed: one turn every 2.4 s on screen (a real fan ≈ 0.2 s)
  const TT = 2.4, t2 = t - S.A(2), ang = 30 + 360 * t2 / TT;
  const FX = 560, FY = 430, FR = 340;
  s += fanCircle(FX, FY, FR * 0.9, Y, 1, 0);
  s += fan2d(FX, FY, FR, ang, { rodTop: 0, canopy: false });
  const [mx, my] = fanPt(FX, FY, FR, ang, 0, 0.9);
  s += `<circle cx="${F(mx)}" cy="${F(my)}" r="15" fill="${Y}" stroke="#0f1b3d" stroke-width="4"/>`;
  u += lab(FX, 700, 'ঘূর্ণন গতি', 'move', S.P(2, 0.1, 0.25));
  if (S.P(2, 0.55, 0.7) > 0) {
    const laps = Math.floor(t2 / TT);
    u += lab(FX, 790, 'পর্যাবৃত্ত গতি', 'move', S.P(2, 0.55, 0.7));
    u += readout(FX - 250, 230 - 40, 'প্রতি পাক', BN(laps > 0 ? 'সমান সময়' : '...'), S.P(2, 0.55, 0.7));
  }
  if (t >= S.A(3)) {
    const th = 7 * Math.sin(2 * Math.PI * (t - S.A(3)) / 1.0);
    s += `<g opacity="${S.P(3, 0, 0.15).toFixed(2)}">` + pendulumClock(1400, 250, 1.0, th, 40 + t) + `</g>`;
    u += lab(1400, 790, 'দোলন গতি', 'move', S.P(3, 0.1, 0.25)) + lab(1400, 880 - 0, 'পর্যাবৃত্ত গতি', 'move', S.P(3, 0.45, 0.6));
    s += tick(1640, 880, 26, S.P(3, 0.6, 0.75));
  }
  return { svg: s, ui: u };
});
