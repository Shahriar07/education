/* Scene 5: textbook Fig 9.1 in motion. Drawing code is in fig91.js */
/* ---- s05_p01 : set-up appears ---- */
PART('s05_p01',SEG('s05_p01'),(t,S)=>{
  const st=base(); st.rayOn=false;
  // 1) cards slide in one after another from behind, to their starting (not yet aligned) places
  st.cardIn=[0,1,2].map(i=>S.P(0,0.1+i*0.22,0.55+i*0.22)); st.zoff=ZSTART;
  st.zc=ZSTART.map((z,i)=>z+(1-ease(st.cardIn[i]))*22);
  st.lblCard=[0,1,2].map(i=>S.P(0,0.6+i*0.1,0.85+i*0.1));
  // 2) holes highlighted
  st.pulse=S.P(1,0.05,1.0); st.lblHole=S.P(1,0.2,0.4)*(1-S.P(2,0,0.1));
  // 3) candle slides in and is lit
  st.candleIn=S.P(2,0,0.55); st.flame=ease(S.P(2,0.5,0.9)); st.lblCandle=S.P(2,0.7,0.9);
  // 4) eye appears
  st.eyeIn=S.P(3,0,0.5); st.lblEye=S.P(3,0.5,0.7);
  return {svg:drawFig(t,st)};
},{fadeIn:true});

/* ---- s05_p02 : holes and flame brought onto one straight line ---- */
PART('s05_p02',SEG('s05_p02'),(t,S)=>{
  const st=base(); st.rayOn=false; st.lblCard=[1,1,1]; st.lblCandle=1; st.lblEye=1;
  const a=ease(S.P(0,0.3,0.9));
  st.zoff=ZSTART.map(z=>z*(1-a)); st.zc=st.zoff.slice();
  st.guide=S.P(0,0,0.25);
  st.thread=S.P(1,0.1,0.6); st.tick=S.P(1,0.7,0.9);
  return {svg:drawFig(t,st)};
});

/* ---- s05_p03 : light travels through the three holes to the eye ---- */
PART('s05_p03',SEG('s05_p03'),(t,S)=>{
  const st=base(); st.lblCard=[1,1,1]; st.lblCandle=1; st.lblEye=1;
  // the light front moves left from the flame; passes holes at x=45,30,15 then reaches the eye
  const p=ease(S.P(1,0.05,0.95)); st.rayOn=S.on(1,2)||t>=S.A(1); st.rayFront=CANDLE_X-(CANDLE_X-EYE_X)*p;
  if(t>=S.E(1)) st.rayFront=EYE_X;
  // each hole lights up as the front passes it
  st.pulse=0;
  st.seen=S.P(2,0.1,0.5);
  let svg=drawFig(t,st);
  // numbered badges at holes (1,2,3) as the front passes: shows the order named in the narration
  CARD_X.forEach((x,i)=>{ const pass=(CANDLE_X-x)/(CANDLE_X-EYE_X); if(p>=pass&&t<S.E(1)){ const q=proj(x,HH,0); const k=cl((p-pass)*8); svg+=`<g opacity="${k.toFixed(2)}" transform="translate(${F(q[0])},${F(q[1]+95)})"><circle r="30" fill="#FFC83D"/>${txt(0,12,BN(3-i),38,{c:NAVY})}</g>`; } });
  svg+=txt(1560,300,'স্কেল ও গতি অনুযায়ী নয়',32,{c:'#6b5a3a',w:600,a:'middle',op:0.95});
  return {svg};
});

/* ---- s05_p04 : one card moved sideways, light is stopped ---- */
PART('s05_p04',SEG('s05_p04'),(t,S)=>{
  const st=base(); st.lblCard=[1,1,1]; st.lblCandle=1; st.lblEye=1; st.rayOn=true; st.rayFront=EYE_X;
  const mv=ease(S.P(0,0.1,0.95)); const z1=4*mv;                 // middle card slides 4 cm sideways
  st.zoff=[0,z1,0]; st.zc=[0,z1,0];
  const blocked=Math.abs(z1)>HOLE_R;
  st.seen=blocked?0:1; st.unseen=0;
  if(blocked){ st.seen=0; st.unseen=ease(S.P(4,0,0.4)); }
  if(t<S.A(2)) st.rayFront=EYE_X;
  // after the card moves the ray stops at the card
  let svg=drawFig(t,st);
  if(t>=S.A(1)&&t<S.A(5)){ const g=ease(S.P(1,0,0.5)); const q=proj(CARD_X[1],HH,st.zc[1]);
    svg+=`<line x1="${F(SX(CANDLE_X))}" y1="${F(RAY_Y)}" x2="${F(SX(EYE_X))}" y2="${F(RAY_Y)}" stroke="#4a6fa5" stroke-width="3" stroke-dasharray="10 9" opacity="${(0.75*g).toFixed(2)}"/>`
         +`<ellipse cx="${F(q[0])}" cy="${F(q[1])}" rx="34" ry="34" fill="none" stroke="#e63946" stroke-width="6" opacity="${(g*(0.6+0.4*Math.sin(t*8))).toFixed(2)}"/>`; }
  if(t>=S.A(1)&&t<S.A(4)){ svg+=`<g transform="translate(${F(SX(CARD_X[1])+150)},${F(RAY_Y+150)})">${pill(0,0,'আলো আটকে গেছে',32,{sc:back(S.P(2,0,0.3)),op:cl(S.P(2,0,0.2)*3)})}</g>`; }
  return {svg};
},{fadeOut:true});
