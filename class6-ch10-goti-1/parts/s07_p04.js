/* ৭ঘ: a question for the student. A train passes the platform at 12 m/s; your bag sits on the rack in coach 2.
   The bag marker is tied to a point of the train, so it moves exactly with it. */
part('s07_p04', { scene: 7, label: '৭ঘ', last: true, title: 'প্রশ্ন: ট্রেনের ব্যাগ স্থির, না গতিশীল?',
  screen: '3D, প্ল্যাটফর্মের পাশ থেকে। ট্রেন সমান বেগে যায়; দ্বিতীয় বগির জানালায় একটা ব্যাগ ও "তুমি" লেখা চোখ, ট্রেনের সাথে সরে। প্রশ্ন-কার্ড: "ব্যাগটি স্থির, না গতিশীল?", কয়েক সেকেন্ড বিরতি। তারপর দুই উত্তর: "তোমার সাপেক্ষে: স্থির", "প্ল্যাটফর্মের সাপেক্ষে: গতিশীল"।' }, [
  { c: "এবার তুমি বলো। চলন্ত ট্রেনের তাকে তোমার ব্যাগটা রাখা আছে।" },
  { c: "ব্যাগটি স্থির, না গতিশীল? একটু ভেবে দেখো।", d: 6.5 },
  { c: "উত্তর হলো, দুটোই। তোমার সাপেক্ষে ব্যাগটি স্থির, আর প্ল্যাটফর্মের সাপেক্ষে গতিশীল।" }
], function (t, S) {
  const st = ROAD.ST, V = 1.2;                                  // the train is just pulling out of the station: 1.2 m/s, uniform
  const bx = st.YOU_X - 6 + V * (t - S.dur / 2);                // the bag, in a window of coach 2, is in mid view half way through
  const front = bx + 16 + 1 + 21 + 10 - 2.5;
  const cam = { pos: [st.YOU_X - 6, 4.2, 15], look: [st.YOU_X - 6, 2.2, -3], fov: 50 };
  const P = W3.frame({ cam, trainX: front });
  let s = '', u = '';
  const [px, py] = P(bx, 3.0, 1.55), [ex, ey] = P(bx - 1.6, 3.0, 1.55);
  s += `<g transform="translate(${F(px)},${F(py)})"><rect x="-34" y="-30" width="68" height="54" rx="10" fill="#c0392b" stroke="#fff" stroke-width="4"/><path d="M-16 -30 Q-16 -48 0 -48 Q16 -48 16 -30" stroke="#fff" stroke-width="6" fill="none"/></g>`;
  u += lab(px, py - 80, 'ব্যাগ', 'name', 1);
  const m = observer(ex, ey, 'তুমি', 1, 0.3); s += m.svg; u += m.ui;
  if (S.on(1)) u += card('ব্যাগটি <span style="color:#2a9d5c">স্থির</span>, না <span style="color:#c77d00">গতিশীল</span>?', S.P(1, 0.02, 0.1), 1, 140, 1100, 66);
  const o2 = S.fin(2, 0.4);
  if (o2 > 0) {
    const e = `<svg width="62" height="44" viewBox="-90 -64 180 128">${eye(0, 0, 1)}</svg>`;
    u += `<div class="abs" style="left:0;width:1920px;top:128px;display:flex;justify-content:center;gap:28px;opacity:${o2.toFixed(2)}">
      <div class="vs">${e}তোমার সাপেক্ষে <span class="lab rest" style="transform:none;font-size:38px">স্থির</span></div>
      <div class="vs">${e}প্ল্যাটফর্মের সাপেক্ষে <span class="lab move" style="transform:none;font-size:38px">গতিশীল</span></div></div>`;
  }
  return { gl: true, svg: s, ui: u };
});
