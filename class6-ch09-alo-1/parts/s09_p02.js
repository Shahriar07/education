/* ৯খ: think and tell: the textbook's sample questions (MCQ 2, creative 2খ) and one more, hints only, no answers */
part('s09_p02', { scene: 9, label: '৯খ', title: "ভেবে বলো, হিন্টসহ",
  screen: "ব্যানার \"ভেবে বলো\"। তিনটি প্রশ্নের সারি, প্রতিটির নিচে হলুদ হিন্ট ও ভাবার বিরতি।" }, [
  { c: "ভেবে বলো। এক, কোনো বস্তু আমরা দেখতে পাই কখন? হিন্ট: আলো কোন দিক থেকে কোন দিকে যায়?" },
  { d: 1.5 },
  { c: "দুই, কোনো বস্তু দেখার জন্য আলোর কোন ঘটনা অপরিহার্য? হিন্ট: বইয়ের পাতা থেকে আলো কী করে?" },
  { d: 1.5 },
  { c: "তিন, আবছা ঘরে কালো ছাতা খুঁজে পাওয়া কঠিন কেন? হিন্ট: কালো আলো নিয়ে কী করে?" },
  { d: 1.5 }
], function (t, S) {
  let s = bg(NAVY), u = banner('ভেবে বলো', S.P(0, 0.02, 0.1), 1, 130);
  [['কোনো বস্তু আমরা দেখতে পাই কখন?', 'আলো কোন দিক থেকে কোন দিকে যায়?'], ['কোনো বস্তু দেখার জন্য আলোর কোন ঘটনা অপরিহার্য?', 'বইয়ের পাতা থেকে আলো কী করে?'], ['আবছা ঘরে কালো ছাতা খুঁজে পাওয়া কঠিন কেন?', 'কালো আলো নিয়ে কী করে?']].forEach(([a, b], i) => { const p = i ? S.P(i * 2, 0, 0.12) : S.P(0, 0.12, 0.24); if (p <= 0) return; const h = S.P(i * 2, 0.6, 0.75);
    u += `<div class="abs rrow" style="left:110px;width:1700px;top:${300 + i * 205}px;padding:16px 40px 12px;opacity:${cl(p * 2).toFixed(2)};transform:translateX(${F(-80 * (1 - ease(p)))}px)"><div class="num">${BN(i + 1)}</div><div>${a}<br><span style="opacity:${h.toFixed(2)};color:${Y};font-size:46px">হিন্ট: ${b}</span></div></div>`; });
  return { svg: s, ui: u };
});
