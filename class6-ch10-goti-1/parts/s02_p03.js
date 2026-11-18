/* ২গ: the definitions, with term cards for পর্যবেক্ষক and স্থিতি */
part('s02_p03', { scene: 2, label: '২গ', last: true, title: 'সংজ্ঞা: পর্যবেক্ষক ও স্থিতি',
  screen: 'নেভি পটভূমি। টার্ম-কার্ড: পর্যবেক্ষক / Observer, পাশে একটা চোখ। তারপর ল্যাম্পপোস্টের ছবি, গোড়ায় পিন, পাশে ঘড়ির কাঁটা ঘোরে। শেষে টার্ম-কার্ড: স্থিতি / Rest।' }, [
  { c: "তাহলে নিয়মটা দাঁড়াল এরকম।" },
  { c: "যে দেখছে, তাকে বলি পর্যবেক্ষক।" },
  { c: "সময়ের সাথে পর্যবেক্ষকের সাপেক্ষে কোনো বস্তুর অবস্থান না বদলালে, বস্তুটি স্থির।" },
  { c: "আর স্থির থাকার এই অবস্থার নাম স্থিতি।" }
], function (t, S) {
  let s = bg(NAVY), u = '';
  s += g(S.fade(0, 1), eye(960, 300, 1.6 * back(S.P(0, 0.2, 0.6)), 0, 0));
  if (S.on(1)) u += termCard('পর্যবেক্ষক', 'Observer', S.P(1, 0.1, 0.3), 1, 960, 620);
  if (t >= S.A(2)) {
    const o = Math.min(S.fin(2), 1 - 0.75 * S.P(3, 0.05, 0.3));      // stays, dimmed, under the last term card
    s += g(o, lampIcon(760, 900, 1.1) + eye(1360, 420, 1.1) + `<line x1="1260" y1="430" x2="900" y2="560" stroke="${Y}" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round"/>`);
    s += pin(760, 900, 1.4, o) + clock(1360, 760, 90, 30 * pr(t, S.A(2), S.dur), o);
  }
  if (S.on(3)) u += termCard('স্থিতি', 'Rest', S.P(3, 0.15, 0.35), 1, 960, 470);
  return { svg: s, ui: u };
});
