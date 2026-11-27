/* ২ঘ: the textbook's chapter photo in 3D: the sun setting beyond the city roofs, its reflection in the rain water on the roof.
   The reflection is placed by the mirror rule (frameV3); the sun sinks from 7° to 1.5° above the horizon. */
part('s02_p04', { scene: 2, label: '২ঘ', last: true, title: "সকল আলোর উৎস সূর্য",
  screen: "বইয়ের প্রথম পাতার ছবি চলমান, 3D: শহরের ছাদ, বিকেল। দূরে বাড়ির সারি, একটা টাওয়ার, বিদ্যুতের খুঁটি। সূর্য ধীরে নিচে নামে; ছাদে জমে থাকা পানিতে সূর্য আর আকাশের ছবি। ট্যাগ: \"বইয়ের প্রথম পাতার ছবি\"।" }, [
  { c: "বইয়ের অধ্যায়ের প্রথম পাতায় এমন একটা ছবি আছে।" },
  { c: "শহরের ছাদের ওপারে সূর্য ডুবছে, আর ছাদের জমা পানিতে তার আলো ঝিকমিক করছে।" },
  { c: "আমরা যেখান থেকেই আলো পাই না কেন, বই বলছে, সকল আলোর উৎস হলো সূর্য।" }
], function (t, S) {
  const el = 9 - 5 * pr(t, 0, S.dur);
  const P = W3.frame({ cam: C9.roof(), t, bg: 'sunset', dim: 0.3, sunDir: [0, 10, -60], roof: { sunEl: el } });
  let u = figTag('বইয়ের প্রথম পাতার ছবি', S.P(0, 0.1, 0.3));
  if (t >= S.A(2)) u += card('সকল আলোর উৎস সূর্য', S.P(2, 0.45, 0.65), 1, 300, 1000, 80);
  return { gl: true, svg: '', ui: u };
});
