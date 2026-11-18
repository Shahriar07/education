/* ৩ক: your eyes on the station platform; a train passes at uniform velocity V_TRAIN.
   The readout is the true straight-line distance from you to the front of the engine. */
part('s03_p01', { scene: 3, label: '৩ক', first: true, title: 'স্টেশনে: ট্রেন সামনে দিয়ে চলে যায়',
  screen: '3D, তোমার চোখে, স্টেশনের প্ল্যাটফর্ম থেকে। দূর থেকে একটা ট্রেন (ইঞ্জিন ও চারটি বগি) সমান বেগে এসে সামনে দিয়ে চলে যায়। ওপরে লেখা: তোমার থেকে ইঞ্জিনের দূরত্ব, সংখ্যাটা প্রতি মুহূর্তে বদলায়।' }, [
  { c: "এবার চলো রেলস্টেশনে। ধরো, তুমি প্ল্যাটফর্মে দাঁড়িয়ে ট্রেনের জন্য অপেক্ষা করছ।" },
  { c: "হঠাৎ হুইসেল বাজিয়ে একটা ট্রেন তোমার সামনে দিয়ে স্টেশন পার হয়ে গেল।" },
  { c: "প্রতি সেকেন্ডে ট্রেনটা তোমার কাছ থেকে নতুন নতুন জায়গায় সরে যাচ্ছে।" },
  { c: "ঝিকঝিক শব্দে বগিগুলো একটার পর একটা তোমার সামনে দিয়ে চলে যাচ্ছে।" }
], function (t, S) {
  const st = ROAD.ST, V = st.V_TRAIN;
  const tPass = S.A(2) + 0.6;                                 // the engine front draws level with you here
  const front = st.YOU_X + V * (t - tPass);
  const P = W3.frame({ cam: W3.platform(), trainX: front });
  let s = '', u = '';
  u += whoTag('কে দেখছে: তুমি', pr(t, 0.4, 0.9));
  const d = Math.hypot(front - st.YOU_X, 0 - st.YOU_Z);       // track centre line is z = 0
  u += readout(560, 140, 'তোমার থেকে ইঞ্জিনের দূরত্ব:', BNF(d) + ' মি', S.fin(1, 0.5));
  const [cx, cy, ok] = P(Math.min(front - 8, st.YOU_X - 6), 4.9, 0);
  if (ok) u += lab(cl(cx, 260, 1660), cl(cy, 330, 760), 'গতিশীল', 'move', S.fin(2, 0.4));
  return { gl: true, svg: s, ui: u };
});
