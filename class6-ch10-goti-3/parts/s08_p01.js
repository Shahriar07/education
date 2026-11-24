/* ৮ক: do it yourself: materials (2D), then the marble on the floor, from the side: 2 m in 4 s, v from 0.64 to 0.36 m/s (0.07 m/s²), rolls without slipping */
part('s08_p01', { scene: 8, label: '৮ক', first: true, title: "নিজে করো: উপকরণ ও ধাপ",
  screen: "ব্যানার: নিজে করো। উপকরণ ছবি-সহ: মার্বেল, চক, মাপার ফিতা, ঘড়ি। তারপর 3D মেঝে, পাশ থেকে: ধাপ ১ দুটি চকের দাগ ২ মিটার দূরে, ধাপ ২ আঙুল মার্বেল গড়িয়ে দেয়, ধাপ ৩ ঘড়িতে সেকেন্ড গোনা।" }, [
  { c: "এবার নিজে করো। লাগবে মার্বেল, চক, মাপার ফিতা আর সেকেন্ডের কাঁটাওয়ালা ঘড়ি।" },
  { c: "এক, মেঝেতে ২ মিটার দূরে দুটো দাগ দাও।" },
  { c: "দুই, মার্বেলটা আলতো করে গড়িয়ে দাও।" },
  { c: "তিন, এক দাগ থেকে আরেক দাগে যেতে কত সেকেন্ড লাগল, দেখো।" }
], function (t, S) {
  if (t < S.A(1)) { let s = bg(NAVY), u = banner('নিজে করো', S.P(0, 0.02, 0.15), 1, 140); const p = i => S.P(0, 0.2 + i * 0.17, 0.32 + i * 0.17);
    s += g(p(0), `<defs><radialGradient id="mg" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#d9fff0"/><stop offset=".35" stop-color="#35b58a"/><stop offset="1" stop-color="#0d4d3a"/></radialGradient></defs><circle cx="340" cy="530" r="90" fill="url(#mg)"/><path d="M290 480 Q350 530 320 605 Q300 560 290 480Z" fill="#f4d35e" opacity=".85"/><ellipse cx="310" cy="490" rx="22" ry="14" fill="#fff" opacity=".8"/>`);
    s += g(p(1), `<g transform="rotate(-20 760 530)"><rect x="650" y="505" width="220" height="50" rx="22" fill="#fdfdf8" stroke="#cfcabb" stroke-width="4"/><ellipse cx="858" cy="530" rx="14" ry="24" fill="#e6e1d2"/></g>`);
    s += g(p(2), `<circle cx="1160" cy="520" r="95" fill="#f2b705" stroke="#b58600" stroke-width="8"/><circle cx="1160" cy="520" r="34" fill="#444"/><rect x="1160" y="580" width="220" height="38" fill="#f8efc2" stroke="#b58600" stroke-width="4"/>` + Array.from({ length: 10 }, (_, k) => `<line x1="${1250 + k * 13}" y1="580" x2="${1250 + k * 13}" y2="${k % 5 ? 594 : 604}" stroke="#333" stroke-width="3"/>`).join(''));
    s += g(p(3), clock(1620, 530, 100, t * 1)); ['মার্বেল', 'চক', 'মাপার ফিতা', 'ঘড়ি'].forEach((n, i) => { u += lab([340, 760, 1180, 1620][i], 700, `<span style="font-size:50px">${n}</span>`, 'name', p(i)); }); return { svg: s, ui: u }; }
  const tR = S.A(2) + 1.2, T = 4, q = cl(t - tR, 0, T), st = marbleS(q), P = W3.frame({ cam: C3.marble(), lab: {}, v3: { marble: st } });
  let s = '', u = ''; const k = t >= S.A(3) ? 2 : t >= S.A(2) ? 1 : 0;
  const [x0, y0] = P(MB.X0, 0.012, MB.Z + 0.2), [x1] = P(MB.X0 + 2, 0.012, MB.Z + 0.2); s += arrow2((x0 + x1) / 2, y0 + 70, x0, y0 + 70, S.P(1, 0.4, 0.6), '#fff') + arrow2((x0 + x1) / 2, y0 + 70, x1, y0 + 70, S.P(1, 0.4, 0.6), '#fff'); u += lab((x0 + x1) / 2, y0 + 70, '২ মিটার', 'move', S.P(1, 0.5, 0.7));
  const [mx, my] = P(MB.X0 + st, 0.0125, MB.Z); s += `<circle cx="${F(mx)}" cy="${F(my)}" r="40" fill="none" stroke="${Y}" stroke-width="6"/>`; u += lab(mx, my - 80, 'মার্বেল', 'name', t < S.A(2) || t > tR + 0.7 ? 1 : 0);
  if (t > tR) s += path3(P, [[MB.X0, 0.01, MB.Z], [MB.X0 + st, 0.01, MB.Z]], Y, 6, '3 12');
  const fo = t >= S.A(2) ? pr(t, S.A(2), S.A(2) + 0.4) * (1 - pr(t, tR + 0.2, tR + 0.7)) : 0; if (fo > 0) s += `<g opacity="${fo.toFixed(2)}">` + marbleHand(mx - 12 - 40 * (1 - pr(t, tR - 0.4, tR)), my - 2) + `</g>`;
  const steps = ['২ মিটার দূরে দুটো দাগ', 'আলতো করে গড়িয়ে দাও', 'কত সেকেন্ড লাগল?']; s += badge(600, 200, k + 1, S.P(1 + k, 0, 0.15)); u += lab(960, 200, `<span style="font-size:50px">${steps[k]}</span>`, 'move', S.P(1 + k, 0.05, 0.2));
  if (t > tR) { s += clock(1640, 300, 95, q); u += lab(1640, 440, BNF(Math.floor(q + 1e-6)) + ' সে.', 'move'); }
  return { gl: true, svg: s, ui: u };
});
