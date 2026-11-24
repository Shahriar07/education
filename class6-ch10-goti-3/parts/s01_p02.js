/* ১খ: hook, continued still speeding up, your eyes; the three questions, then the question card */
part('s01_p02', { scene: 1, label: '১খ', title: "প্রশ্ন: চলাকে মাপব কীভাবে?",
  screen: "একই দৃশ্য, তোমার চোখে। তিনটি প্রশ্ন একে একে: কত দূর? কত জোরে? কোন দিকে? প্রশ্ন-কার্ড: \"চলাকে মাপব কীভাবে?\"" }, [
  { c: "গাড়িটা কত দূর এলো? কত জোরে চলছে? কোন দিকে যাচ্ছে?" },
  { c: "আর এই যে জোরটা বাড়ছে, তারই বা নাম কী?" },
  { c: "চলাকে আমরা মাপব কীভাবে?" }
], function (t, S) {
  const xc = HOOK.X0 + hookS(PARTS.s01_p01.dur - PARTS.s01_p01.st[1] - 0.2 + t), P = W3.frame({ cam: hookCam(xc), car1: { x: xc, z: ROAD.LANE_Z, dir: 1 } });
  let u = whoTag('কে দেখছে: তুমি', 1);
  ['কত দূর?', 'কত জোরে?', 'কোন দিকে?'].forEach((q, i) => { u += lab(420 + i * 540, 250, `<span style="font-size:60px">${q}</span>`, 'move', S.P(0, 0.05 + i * 0.32, 0.2 + i * 0.32) * (1 - S.P(2, 0, 0.15))); });
  u += lab(960, 360, '<span style="font-size:52px">জোর বাড়ছে: এর নাম কী?</span>', 'name', S.P(1, 0.1, 0.3) * (1 - S.P(2, 0, 0.15)));
  if (t >= S.A(2)) u += card('চলাকে মাপব কীভাবে?', S.P(2, 0.05, 0.3), 1, 330, 1300, 100);
  return { gl: true, svg: '', ui: u };
});
