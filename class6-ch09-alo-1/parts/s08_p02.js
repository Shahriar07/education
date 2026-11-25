/* ৮খ: the big hole covered with black tape, lid on: looking through the small hole, only darkness. Physically no light gets
   in, so the view through the hole is drawn black. */
const eyeBox = () => boxW(0, ST.BOX.H + 0.1, 0);
part('s08_p02', { scene: 8, label: '৮খ', title: "পাশের ছিদ্র বন্ধ",
  screen: "কালো টেপ পাশের ছিদ্র ঢেকে দেয়। ঢাকনা বন্ধ। ঢাকনার ছিদ্রের ওপর \"তুমি\" লেখা চোখ; তারপর তোমার চোখে: ছিদ্র দিয়ে শুধু অন্ধকার। লাল ক্রস। নম্বর ৪।" }, [
  { c: "এবার পাশের বড় ছিদ্রটা কালো টেপ দিয়ে ঢেকে দাও।" },
  { c: "ঢাকনা বন্ধ করে ওপরের ছোট ছিদ্র দিয়ে নুড়িটা দেখার চেষ্টা করো।" },
  { c: "দেখতে পাচ্ছ কি? না, ভেতরে শুধু অন্ধকার।" }
], function (t, S) {
  const tape = t >= S.A(0) + (S.A(1) - S.A(0)) * 0.45;
  if (t < S.A(2)) {
    const P = W3.frame({ cam: camBox(), t, dim: 0.25, sunDir: [10, 30, -40], st: { night: false, bulb: 0, desk: false, box: { front: 1, tape, lid: true } } });
    let s = badge(150, 300, 4, S.P(0, 0, 0.12)), u = figTag('চিত্র ৯.৩', 1);
    const [sx, sy] = P(...boxW(-ST.BOX.L / 2, ST.BOX.H * 0.55, 0)); u += lab(sx - 150, sy, 'কালো টেপ', 'name', S.P(0, 0.45, 0.6));
    const [ex, ey] = P(...eyeBox()), ob = observer(ex, ey, 'তুমি', S.P(1, 0.2, 0.4), 0.32); s += ob.svg; u += ob.ui;
    return { gl: true, svg: s, ui: u };
  }
  /* your eye at the small hole: a round view, black inside */
  let s = bg('#0b0b0b') + `<circle cx="960" cy="540" r="360" fill="#000" stroke="#b99366" stroke-width="60"/>`, u = whoTag('কে দেখছে: তুমি', 1);
  s += cross(960, 540, 60, S.P(2, 0.4, 0.6)); u += lab(960, 240, 'নুড়ি দেখা যায় না', 'name', S.P(2, 0.45, 0.6));
  return { svg: s, ui: u };
});
