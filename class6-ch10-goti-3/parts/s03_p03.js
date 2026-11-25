/* ৩গ: term card, then the formula put together piece by piece; a car on the highway moves behind */
part('s03_p03', { scene: 3, label: '৩গ', last: true, title: "দ্রুতি",
  screen: "শব্দ-কার্ড: দ্রুতি (Speed)। তারপর সূত্র টুকরো টুকরো এসে জোড়া লাগে: দ্রুতি = দূরত্ব ÷ সময়। একক: মিটার, সেকেন্ড, মি/সে।" }, [
  { c: "একক সময়ে যতটা দূরত্ব পার হওয়া যায়, সেটাই দ্রুতি।" },
  { c: "এভাবেও বলা যায়: দ্রুতি সমান দূরত্ব ভাগ সেই দূরত্ব যেতে যত সময় লাগল।" },
  { c: "দূরত্ব মাপি মিটারে, সময় সেকেন্ডে। তাই দ্রুতির হিসাব হয় মিটার প্রতি সেকেন্ডে।" }
], function (t, S) {
  const x = Z3.HWY + 40 + 10 * t, P = W3.frame({ cam: C3.hwy(x), v3: { cars: [{ x, z: -2 }] } });
  let u = termCard('দ্রুতি', 'Speed', S.P(0, 0.35, 0.55), 1 - S.P(1, 0, 0.1), 960, 330, 0.8);
  const p = S.P(1, 0.1, 0.25);
  u += eqn(`${yel('দ্রুতি')} = <span style="opacity:${S.P(1, 0.3, 0.45).toFixed(2)}">দূরত্ব</span> <span style="opacity:${S.P(1, 0.45, 0.6).toFixed(2)}">÷</span> <span style="opacity:${S.P(1, 0.55, 0.75).toFixed(2)}">সময়</span>`, p, 170, 88);
  u += lab(560, 400, 'দূরত্ব: মিটার (মি.)', 'name', S.P(2, 0.02, 0.12)) + lab(1360, 400, 'সময়: সেকেন্ড (সে.)', 'name', S.P(2, 0.2, 0.32));
  u += lab(960, 490, '<span style="font-size:60px">দ্রুতি: মি./সে.</span>', 'move', S.P(2, 0.5, 0.65));
  return { gl: true, svg: '', ui: u };
});
