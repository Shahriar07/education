/* ৪গ:  */
part('s04_p03', { scene: 4, label: '৪গ', last: true, title: "বলের সংজ্ঞা",
  screen: "সংজ্ঞা-কার্ড, \"করতে চায়\" হলুদ।" }, [
  { c: "তাই বই বলে, যা স্থির বস্তুকে গতিশীল করে বা করতে চায়," },
  { c: "অথবা গতিশীল বস্তুর গতি, আকার ও আকৃতি বদলায় বা বদলাতে চায়, তা-ই বল।" },
  { c: "খেয়াল করো, না নড়লেও বল থাকতে পারে।" }
], function (t, S) {
  let s = bg(NAVY), u = ''; const hl = (w, p) => `<b style="color:${p > 0 ? Y : '#fff'}">${w}</b>`;
  u += `<div class="abs" style="left:170px;width:1580px;top:200px;color:#fff;font-size:60px;font-weight:600;line-height:1.55;text-align:center;opacity:${S.P(0, 0, 0.2).toFixed(2)}">যা স্থির বস্তুকে গতিশীল করে বা ${hl('করতে চায়', S.P(0, 0.75))},<span style="opacity:${S.P(1, 0, 0.15).toFixed(2)}"><br>অথবা গতিশীল বস্তুর গতি, আকার ও আকৃতি বদলায় বা ${hl('বদলাতে চায়', S.P(1, 0.7))},<br>তা-ই ${hl('বল', S.P(1, 0.9))}।</span></div>`;
  u += `<div class="abs" style="left:0;width:1920px;top:110px;text-align:center"><span class="fig">বইয়ের সংজ্ঞা</span></div>`;
  if (t >= S.A(2)) { const p = S.P(2, 0, 0.2), k = 6 * Math.sin(t * 9) * (S.P(2) < 0.9 ? 1 : 0); s += g(p, `<rect x="1100" y="610" width="70" height="300" fill="#b56b4a" stroke="#7a3f28" stroke-width="5"/>` + [0, 1, 2, 3, 4, 5].map(i => `<line x1="1100" y1="${660 + i * 45}" x2="1170" y2="${660 + i * 45}" stroke="#7a3f28" stroke-width="3"/>`).join(''));
    s += handPush3(1094 + k * 0.1, 800, 4, 1150, p) + arrow2(740, 640, 1000, 640, p); u += lab(870, 580, big('বল আছে'), 'move', p) + lab(1300, 760, big('নড়ে না'), 'rest', S.P(2, 0.4, 0.6)); }
  return { svg: s, ui: u };
});
