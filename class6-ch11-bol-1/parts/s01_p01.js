/* ১ক:  */
part('s01_p01', { scene: 1, label: '১ক', first: true, title: "ভারী পাথর নড়ে না",
  screen: "উঠানে ভারী পাথর, ঠেলা হাত; তীর আছে, পাথর স্থির।" }, [
  { c: "ধরো, তোমাদের উঠানে একটা ভারী পাথর পড়ে আছে। তুমি ওটা সরাতে চাও।" },
  { c: "দুই হাতে ঠেললে। আবার ঠেললে। পাথর একটুও নড়ল না!" },
  { c: "ঘাম ছুটে গেল, তবু পাথর যেখানে ছিল, সেখানেই। এখন কী করবে?" }
], function (t, S) {
  const on = Math.max(S.P(1, 0, 0.12) * (1 - S.P(1, 0.42, 0.52)), S.P(1, 0.55, 0.66) * (1 - S.P(2, 0.55, 0.7))), a20 = 20 * Math.PI / 180, dir = [Math.cos(a20), -Math.sin(a20), 0], up = [Math.sin(a20), Math.cos(a20), 0];
  const hands = t >= S.A(1) - 0.4 && on > 0.02 ? [-0.075, 0.075].map(dz => H3.push(H3.back([LV.X - 0.167, LV.ST[1] * 0.8 + 0.031, LV.Z + dz], dir, 0.09 * (1 - ease(on))), dir, up)) : [];
  const P = W3.frame({ cam: C11.boulder(), boulder: 0, hands, sun: [-14, 34, 26] });
  let s = '', u = ''; const pm = pxpm(P, [LV.X, 0.15, LV.Z]), [px, py] = P(LV.X - 0.186, LV.ST[1] * 0.8 + 0.031, LV.Z);
  /* three pushes: the hands come, press, go back; the stone never moves */
  
  if (on > 0.9) { const y = py - 205; s += arrow2(px - 190, y, px + 20, y); u += lab(px - 90, y - 66, big('ধাক্কা'), 'move'); }
  const [sx, sy] = P(LV.X, 0.3, LV.Z); u += lab(sx, sy - 40, 'ভারী পাথর', 'name', S.P(0, 0.4, 0.55)); if (t >= S.A(2)) u += lab(sx + 300, sy + 120, big('নড়ল না!'), 'move', S.P(2, 0.1, 0.25));
  return { gl: true, svg: s, ui: u };
});
