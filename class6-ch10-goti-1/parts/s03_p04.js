/* ৩ঘ: definition of motion, term card গতি. A bus icon moves at uniform speed and leaves a mark every second. */
part('s03_p04', { scene: 3, label: '৩ঘ', last: true, title: 'সংজ্ঞা: গতি',
  screen: 'নেভি পটভূমি। নিচে একটা চোখ (পর্যবেক্ষক)। একটা বাস সমান বেগে বাঁ থেকে ডানে যায়, প্রতি সেকেন্ডে রাস্তায় একটা দাগ, দাগগুলো সমান দূরে। টার্ম-কার্ড: গতি / Motion।' }, [
  { c: "কোনো বস্তু যদি পর্যবেক্ষকের সাপেক্ষে অবস্থান পরিবর্তন করে, তখন বস্তুটিকে বলি গতিশীল।" },
  { c: "আর বস্তুর এই অবস্থার নাম গতি।" },
  { c: "ট্রেন, ফুটবল, বাস, আর তোমার নড়তে থাকা কলম, সবাই তখন গতিশীল।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  const v = 105, x = 200 + v * t;                               // px per second, uniform; stays on screen for the whole part
  s += `<rect x="0" y="770" width="1920" height="10" fill="#33488c"/>`;
  for (let k = 0; k <= Math.floor(t); k++) s += `<circle cx="${F(200 + v * k + 260)}" cy="775" r="11" fill="${Y}"/>` + txt(200 + v * k + 260, 830, BN(k) + ' সে', 40, { c: '#cfd8ee', w: 600 });
  s += g(1, busIcon(x, 760, 0.55)) + eye(170, 600, 0.75) + txt(170, 690, 'পর্যবেক্ষক', 42, { c: '#fff', w: 700 });
  if (S.on(1)) u += termCard('গতি', 'Motion', S.P(1, 0.1, 0.35), 1, 960, 360);
  return { svg: s, ui: u };
});
