/* ৬খ:  */
part('s06_p02', { scene: 6, label: '৬খ', title: "শব্দ-কার্ড: সরল যন্ত্র",
  screen: "শব্দ-কার্ড সরল যন্ত্র (Simple machine)।" }, [
  { c: "এভাবে কৌশলে বল প্রয়োগ করে যা কাজকে সহজ করে, তা-ই সরল যন্ত্র।" },
  { c: "কাঁচি, সাঁড়াশি, হাতুড়ি, শাবল, কপিকল, লিভার, সবই সরল যন্ত্র। ঘরেই এগুলো আছে, তাই না?" }
], function (t, S) {
  let s = bg(NAVY), u = termCard('সরল যন্ত্র', 'Simple machine', S.P(0, 0.55, 0.75), 1, 960, 380);
  const names = ['কাঁচি', 'সাঁড়াশি', 'হাতুড়ি', 'শাবল', 'কপিকল', 'লিভার'];
  if (t >= S.A(1)) u += `<div class="abs" style="left:160px;width:1600px;top:660px;display:flex;justify-content:center;gap:28px;flex-wrap:wrap">` + names.map((n, i) => { const p = S.P(1, 0.04 + i * 0.09, 0.12 + i * 0.09); return `<span class="tchip" style="opacity:${cl(p * 2).toFixed(2)};transform:scale(${back(p).toFixed(3)});font-size:52px">${n}</span>`; }).join('') + `</div>`;
  return { svg: s, ui: u };
});
