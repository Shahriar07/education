/* ৬খ: narrow road 4.4 m: two cars 1.76 m wide pass at 3 m/s; bridge: 14 -> 7 m/s at 3 m/s² before it, then steady */
part('s06_p02', { scene: 6, label: '৬খ', title: "ঘটনা ২ ও ৩: সরু রাস্তা ও সেতু",
  screen: "3D দুটি দৃশ্য: সরু রাস্তায় মুখোমুখি দুই গাড়ি আস্তে পাশ কাটায়; সেতুর মুখে গাড়ি গতি কমিয়ে ওঠে। প্রতিটির নম্বর ও নাম।" }, [
  { c: "ঘটনা দুই, সরু রাস্তা। দুটো গাড়ির পাশ কাটানোর জায়গা কম, তাই আস্তে যেতে হয়।" },
  { c: "ঘটনা তিন, সেতু। সেতুতেও দুর্ঘটনার আশঙ্কা বেশি, তাই ওঠার আগেই বেগ কমাতে হয়।" }
], function (t, S) {
  let s = '', u = '', P;
  if (t < S.A(1)) { const X = Z3.NARROW; P = W3.frame({ cam: C3.narrow(), v3: { cars: [{ x: X - 13 + 3 * t, z: -1.12 }, { x: X + 13 - 3 * t, z: 1.12, h: Math.PI, d: 3 * t }] } });
    s += badge(760, 190, 2, S.P(0, 0.05, 0.2)); u += lab(1010, 190, '<span style="font-size:52px">সরু রাস্তা</span>', 'move', S.P(0, 0.1, 0.25));
  } else { const X = Z3.BRIDGE, q = t - S.A(1), T = 7 / 3, d = q < T ? 14 * q - 1.5 * q * q : 24.5 + 7 * (q - T), v = q < T ? 14 - 3 * q : 7; P = W3.frame({ cam: C3.bridge(), v3: { cars: [{ x: X - 40 + d, z: -1.8 }] } });
    s += badge(800, 190, 3, S.P(1, 0.05, 0.2)); u += lab(970, 190, '<span style="font-size:52px">সেতু</span>', 'move', S.P(1, 0.1, 0.25)) + readout(1400, 150, 'বেগ', BNF(v) + ' মি./সে.', 1); }
  return { gl: true, svg: s, ui: u };
});
