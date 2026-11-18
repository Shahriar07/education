/* ৭গ: lying in bed. At rest relative to the ground, but the Earth turns (west to east: seen with north up,
   the near face moves left to right), so you turn with it. Sun on the left: left half day. Speed not to scale. */
part('s07_p03', { scene: 7, label: '৭গ', title: 'চারপাশে: বিছানায় শুয়েও গতিশীল',
  screen: 'বাঁয়ে রাতের ঘর: জানালায় চাঁদ, খাট, বালিশ, নকশিকাঁথা (মানুষ আঁকা নেই), পাশে সবুজ লেখা "ভূমির সাপেক্ষে স্থির"। ডানে পৃথিবী অক্ষের চারদিকে ঘোরে, গায়ে লাল বিন্দু (তোমার বাড়ি) পৃথিবীর সাথে ঘুরে যায়, হলুদ লেখা "পৃথিবীর সাথে গতিশীল"। "স্কেল ও গতি অনুযায়ী নয়"।' }, [
  { c: "ধরো, রাতে তুমি বিছানায় শুয়ে আছ। তুমি বলবে, ভূমির সাপেক্ষে আমি তো স্থির।" },
  { c: "ঠিক কথা। কিন্তু পৃথিবী নিজেই তার অক্ষের চারদিকে ঘুরছে।" },
  { c: "তাই পৃথিবীর সাথে সাথে তুমিও ঘুরছ, অর্থাৎ তুমিও গতিশীল।" },
  { c: "ভাবো তো, শুয়ে থেকেও তুমি এই মুহূর্তে চলছ!" }
], function (t, S) {
  let s = bg('#1b2240') + `<rect x="0" y="0" width="960" height="1080" fill="#2a2f52"/><rect x="0" y="860" width="960" height="220" fill="#3b3346"/>`, u = '';
  // window with the night sky
  s += `<rect x="120" y="160" width="300" height="280" rx="8" fill="#6b4324"/><rect x="136" y="176" width="268" height="248" fill="#0b1433"/><circle cx="330" cy="250" r="34" fill="#f1eedb"/><circle cx="344" cy="240" r="30" fill="#0b1433"/>
    <circle cx="190" cy="230" r="3" fill="#fff"/><circle cx="240" cy="330" r="2.5" fill="#fff"/><circle cx="370" cy="380" r="2" fill="#fff"/><rect x="262" y="176" width="16" height="248" fill="#6b4324"/><rect x="136" y="292" width="268" height="16" fill="#6b4324"/>`;
  // bed, side view: frame, mattress, pillow, a nakshi kantha with a running-stitch border
  s += `<rect x="150" y="640" width="26" height="250" rx="6" fill="#6b4120"/><rect x="784" y="700" width="26" height="190" rx="6" fill="#6b4120"/><rect x="150" y="610" width="40" height="120" rx="8" fill="#7d4e27"/>
    <rect x="160" y="730" width="650" height="44" rx="8" fill="#8a5a30"/><rect x="170" y="690" width="630" height="46" rx="16" fill="#f3efe3"/>
    <ellipse cx="270" cy="676" rx="88" ry="30" fill="#fbf8f0" stroke="#d9d2bb" stroke-width="3"/>
    <path d="M360 690 Q520 640 800 690 L800 748 L360 748 Z" fill="#b3261e"/><path d="M372 700 Q520 656 790 700" stroke="#f2c230" stroke-width="5" stroke-dasharray="12 10" fill="none"/>
    <path d="M380 720 L790 720" stroke="#f2c230" stroke-width="4" stroke-dasharray="8 10"/>`;
  const o0 = S.fin(0, 0.4); s += pin(560, 690, 1.2, o0); u += lab(560, 560, 'ভূমির সাপেক্ষে স্থির', 'rest', o0);
  // the Earth, turning
  const ex = 1440, ey = 520, R = 230, lon = t * 25;
  s += `<line x1="${ex}" y1="${ey - R - 70}" x2="${ex}" y2="${ey + R + 70}" stroke="#9fb3d9" stroke-width="4" stroke-dasharray="10 10"/>`;
  s += litSphere(ex, ey, R, earthFace(R, lon), 'ec2');
  const a = (40 + lon) * Math.PI / 180, vis = Math.cos(a);
  if (vis > 0) s += `<circle cx="${F(ex + Math.sin(a) * R * 0.92)}" cy="${ey - 50}" r="16" fill="#e63946" stroke="#fff" stroke-width="4"/>`;
  s += g(S.fin(1, 0.4), `<path d="M${ex - 140} ${ey + R + 40} Q${ex} ${ey + R + 90} ${ex + 140} ${ey + R + 40}" stroke="${Y}" stroke-width="8" fill="none"/><polygon points="${ex + 160},${ey + R + 30} ${ex + 120},${ey + R + 30} ${ex + 140},${ey + R + 64}" fill="${Y}" transform="rotate(-30 ${ex + 140} ${ey + R + 40})"/>`);
  s += txt(ex, ey + R + 140, 'পৃথিবী', 44);
  u += lab(ex, 170, 'পৃথিবীর সাথে গতিশীল', 'move', S.fin(2, 0.4));
  s += txt(1880, 1000 - 40, 'স্কেল ও গতি অনুযায়ী নয়', 40, { c: '#9fb3d9', a: 'end', w: 600 });
  return { svg: s, ui: u };
});
