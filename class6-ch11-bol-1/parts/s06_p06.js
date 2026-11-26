/* ৬চ:  */
part('s06_p06', { scene: 6, label: '৬চ', last: true, title: "পাঁচ উপায় একসাথে",
  screen: "পাঁচ কার্ড পাশাপাশি।" }, [
  { c: "একসাথে দেখো। বল বাড়ানো, কম বল, সুবিধার দিক, কঠিন কাজ, আর গতি ও দূরত্ব।" },
  { c: "একটা যন্ত্র এর একটা বা একের বেশি সুবিধা দিতে পারে। শাবলে যেমন কম বলও লাগে, আবার হাত নামে নিচে, পাথর ওঠে উপরে।" }
], function (t, S) {
  let s = bg(NAVY), u = ''; const W = ['বল কয়েকগুণ বাড়ায়', 'কম বলে কাজ', 'সুবিধার দিকে বল', 'কঠিন কাজ সহজ', 'গতি ও দূরত্ব বাড়ায়'], T = ['সাঁড়াশি', 'শাবল', 'কপিকল', 'কাঁচি', 'চিমটা'];
  u += `<div class="abs" style="left:60px;width:1800px;top:300px;display:flex;justify-content:center;gap:22px">` + W.map((w, i) => { const p = S.P(0, 0.05 + i * 0.12, 0.17 + i * 0.12), hi = t >= S.A(1) && (i === 1 || i === 2); return `<div class="card" style="width:330px;height:330px;opacity:${cl(p * 2).toFixed(2)};transform:scale(${back(p).toFixed(3)});${hi ? 'border-color:' + Y + ';border-width:6px' : ''}"><div class="num">${BN(i + 1)}</div>${w}<div style="color:${Y};margin-top:14px">${T[i]}</div></div>`; }).join('') + `</div>`;
  if (t >= S.A(1)) u += lab(960, 740, big('শাবল: কম বল + সুবিধার দিক'), 'move', S.P(1, 0.5, 0.65));
  return { svg: s, ui: u };
});
