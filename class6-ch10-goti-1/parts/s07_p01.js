/* ৭ক: around us. A car passes your house; the house is the frame of reference. Car 8 m/s, +x, far lane.
   (The textbook says rickshaw; a rickshaw cannot be drawn without its puller, so a car is used, as in ৬.) */
part('s07_p01', { scene: 7, label: '৭ক', first: true, title: 'চারপাশে: বাড়ির সাপেক্ষে গাড়ি',
  screen: '3D, বাইরে থেকে। একটা বাড়ির সামনের রাস্তা দিয়ে লাল গাড়ি সমান বেগে যায়, গায়ে তীর। বাড়ির গায়ে পিন ও ট্যাগ "প্রসঙ্গ-কাঠামো: বাড়ি"। (বইয়ে রিকশা; রিকশাচালক আঁকা যায় না বলে গাড়ি।)' }, [
  { c: "এবার চারপাশে তাকাই। তোমার বাড়ির সামনের রাস্তা দিয়ে একটা গাড়ি যাচ্ছে।" },
  { c: "বাড়ির সাপেক্ষে গাড়িটার গতি মাপতে চাইলে, তোমার বাড়িই হবে প্রসঙ্গ-কাঠামো।" },
  { c: "বইয়ে এখানে রিকশার কথা আছে, ব্যাপারটা একই।" }
], function (t, S) {
  const R = ROAD, xc = -42 + R.V_CAR * (t - S.A(1) - 0.3);   // in front of the house as the second sentence starts
  const P = W3.frame({ cam: W3.third(-42), car1: { x: xc } });
  let s = '', u = '';
  const [a1, b1] = P(xc + R.CAR_L / 2 + 0.3, 0.7, R.LANE_Z), [a2] = P(xc + R.CAR_L / 2 + 0.3 + R.V_CAR * 0.5, 0.7, R.LANE_Z);
  s += arrow2(a1, b1, a2, b1, S.fin(0, 0.5));
  const [hx, hy] = P(-46, 4.2, -6.45), o = S.fin(1, 0.4);
  s += pin(hx, hy, 1.4, o); u += lab(hx, hy - 150, 'প্রসঙ্গ-কাঠামো: বাড়ি', 'name', o);
  return { gl: true, svg: s, ui: u };
});
