/* Scene 6: why it happens. Case 1 (in line: seen), case 2 (moved: not seen), conclusion (ray of light), then side by side. */

const SHIFT_Z=4;   // cm: sideways shift of the middle card in case 2 (larger than the hole radius, so the light is stopped)

/* ---- s06_p01 : case 1, holes in one line ---- */
PART('s06_p01',SEG('s06_p01'),(t,S)=>{
  const st=base(); let u=''; st.lblCard=[1,1,1];
  st.guide=S.P(1,0.1,0.6); st.pulse=S.P(1,0.3,1);
  st.rayOn=t>=S.A(2); const p=ease(S.P(2,0.05,0.55)); st.rayFront=CANDLE_X-(CANDLE_X-EYE_X)*p;
  st.seen=S.P(2,0.6,0.85);
  let s=drawFig(t,st);
  // in the term segment the straight line itself is picked out
  if(t>=S.A(3)){ const k=(t*0.5)%1; s+=`<circle cx="${F(SX(CANDLE_X)+(SX(EYE_X)-SX(CANDLE_X))*k)}" cy="${RAY_Y}" r="16" fill="#fff"/>`; }
  u+=card('কেন এমন হলো?',S.P(0,0.1,0.4)*(t<S.A(1)?1:0),1,130,820,96);
  if(t>=S.A(1)&&t<S.A(3)){ s+=numC(700,170,1,40,S.P(1,0,0.25)); u+=`<div class="abs" style="left:760px;top:128px;font-size:60px;font-weight:700;color:#1a1a2e;opacity:${S.P(1,0.1,0.3).toFixed(2)}">ছিদ্র এক রেখায়</div>`; }
  u+=termCard('সরলরেখা','Straight line',S.P(3,0.1,0.25),1,960,235,0.8);
  return {svg:s,ui:u};
},{fadeIn:true});

/* ---- s06_p02 : case 2, one card moved ---- */
PART('s06_p02',SEG('s06_p02'),(t,S)=>{
  const st=base(); let u=''; st.lblCard=[1,1,1]; st.rayOn=true; st.rayFront=EYE_X;
  const z1=SHIFT_Z*ease(S.P(0,0.35,0.8)); st.zoff=[0,z1,0]; st.zc=[0,z1,0];
  const blocked=Math.abs(z1)>HOLE_R;
  st.seen=blocked?0:1; st.unseen=blocked?ease(S.P(2,0.45,0.7)):0;
  let s=drawFig(t,st);
  const hq=proj(CARD_X[1],HH,z1);
  if(blocked&&t<S.A(1)) s+=`<ellipse cx="${F(hq[0])}" cy="${F(hq[1])}" rx="34" ry="34" fill="none" stroke="#e63946" stroke-width="6" opacity="${(0.6+0.4*Math.sin(t*8)).toFixed(2)}"/>`;
  // the bent path the light would need: flame side -> moved hole -> hole of card 1 -> eye
  if(t>=S.A(1)){ const pts=[[SX(CARD_X[1]+CARD_T+3),RAY_Y],[hq[0],hq[1]],[SX(CARD_X[0]),RAY_Y],[SX(EYE_X)+80,RAY_Y]];
    s+=dreamPath(pts,S.P(1,0.1,0.8),{c:'#e63946',w:7});
    s+=cross(hq[0]-70,hq[1]-70,30,S.P(2,0.1,0.3)); }
  s+=numC(700,170,2,40,S.P(0,0,0.2)); u+=`<div class="abs" style="left:760px;top:128px;font-size:60px;font-weight:700;color:#1a1a2e;opacity:${S.P(0,0.1,0.25).toFixed(2)}">ছিদ্র সরে গেছে</div>`;
  u+=uiPill('আলো বাঁকতে পারে না',1180,790,S.P(2,0.3,0.5),50);
  return {svg:s,ui:u};
});

/* ---- s06_p03 : conclusion and the term "আলোকরশ্মি" ---- */
PART('s06_p03',SEG('s06_p03'),(t,S)=>{
  let s=navyRays(t), u='';
  if(t<S.A(1)+0.3) s+=g(1-pr(t,S.A(1),S.A(1)+0.3),numC(960,150,3,46,S.P(0,0,0.3)));
  u+=card('আমাদের সিদ্ধান্ত কী?',S.P(0,0.2,0.5)*(t<S.A(1)?1:0),1,300,1000,90);
  // crooked: no.  straight: yes.
  if(t>=S.A(1)&&t<S.A(2)+0.4){ const o=1-pr(t,S.A(2),S.A(2)+0.4);
    let r=''; const p1=ease(S.P(1,0,0.3)); let d=''; const n=Math.round(60*p1); for(let i=0;i<=n;i++){ d+=(i?'L':'M')+F(420+760*i/60)+' '+F(400+60*Math.sin(i/60*Math.PI*5)); }
    if(n>1) r+=`<path d="${d}" fill="none" stroke="#7fd1ff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`;
    r+=cross(1300,400,36,S.P(1,0.3,0.45))+txt(1390,420,'বাঁকা পথ',60,{c:'#fff',a:'start',op:S.P(1,0.3,0.45)});
    r+=beam(420,640,1180,640,ease(S.P(1,0.5,0.8)),{w:11});
    r+=tick(1300,640,36,S.P(1,0.8,0.95))+txt(1390,660,'সরলরেখা',60,{c:'#fff',a:'start',op:S.P(1,0.8,0.95)});
    s+=g(o,r); }
  // a candle and its rays
  if(t>=S.A(2)){ const mv=ease(S.P(4,0,0.25)); const cx=330+(960-330)*mv, base_y=760, fy=base_y-170-45;
    s+=g(S.fin(2,0.4),candleG(cx,base_y,170,1,t,'s6',240));
    // one ray first
    const one=ease(S.P(2,0.2,0.8))*(1-mv);
    if(one>0&&mv<1) s+=g(1-mv,beam(cx+30,fy,cx+30+1250*one,fy,1,{w:11,arrow:1,head:0}));
    s+=pill(cx+700,fy-80,'আলোর সরলরৈখিক পথ',44,{op:S.P(2,0.6,0.8)*(1-S.P(3,0,0.3)),sc:back(S.P(2,0.6,0.8))});
    // then rays in every direction, each one straight
    if(t>=S.A(4)){ const N=14; for(let i=0;i<N;i++){ const a=(i/N)*2*Math.PI+0.2; if(Math.sin(a)>0.75) continue;   // the candle itself is below the flame
        const q=ease(S.P(4,0.2+i*0.02,0.55+i*0.02)); if(q<=0) continue; const r0=70, r1=70+ (330+60*Math.sin(i*2.1))*q;
        s+=beam(cx+r0*Math.cos(a),fy+r0*Math.sin(a),cx+r1*Math.cos(a),fy+r1*Math.sin(a),1,{w:8,arrow:1,head:0}); }
      s+=pill(cx,fy-470+60,'অসংখ্য আলোকরশ্মি',46,{op:0,sc:1}); }
  }
  u+=termCard('আলোকরশ্মি','Ray of light',t>=S.A(3)?S.P(3,0,0.25):0,t<S.A(4)?1:1-S.P(4,0,0.15),1180,330,0.9);
  return {svg:s,ui:u};
});

/* ---- s06_p04 : the three pictures side by side ---- */
PART('s06_p04',SEG('s06_p04'),(t,S)=>{
  let s=navyRays(t), u='';
  const PW=590, PH=260, PY=330, PX=[45,665,1285], VB='130 180 1660 731';
  const act=t>=S.A(3)?-1:t>=S.A(2)?1:t>=S.A(1)?0:-2;
  const frame=(i,inner,lab,mark)=>{ const p=S.P(0,0.1+i*0.25,0.45+i*0.25); if(p<=0) return ''; const hi=act===i||act===-1;
    let r=`<g transform="translate(${PX[i]+PW/2},${PY+PH/2}) scale(${back(p).toFixed(3)}) translate(${-PX[i]-PW/2},${-PY-PH/2})">`;
    r+=`<rect x="${PX[i]-10}" y="${PY-10}" width="${PW+20}" height="${PH+20}" rx="26" fill="${hi?Y:'#33488c'}"/>`;
    r+=`<svg x="${PX[i]}" y="${PY}" width="${PW}" height="${PH}" viewBox="${VB}" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
    r+=numC(PX[i]+20,PY+10,i+1,34)+txt(PX[i]+PW/2+ (mark?30:0),PY+PH+90,lab,54,{c:'#fff'})+(mark==='t'?tick(PX[i]+PW/2-190,PY+PH+72,22,1):mark==='x'?cross(PX[i]+PW/2-225,PY+PH+72,22,1):'');
    return r+'</g>'; };
  // 1: in line -> seen
  const a=base(); a.id='pa'; a.rayOn=true; a.rayFront=EYE_X; a.seen=1;
  let in1=drawFig(t,a); const k1=(t*0.45)%1; in1+=`<circle cx="${F(SX(CANDLE_X)+(SX(EYE_X)-SX(CANDLE_X))*k1)}" cy="${RAY_Y}" r="14" fill="#fff"/>`;
  s+=frame(0,in1,'শিখা দেখা যায়','t');
  // 2: one card moved -> stopped
  const b=base(); b.id='pb'; b.rayOn=true; b.rayFront=EYE_X; b.zoff=[0,SHIFT_Z,0]; b.zc=[0,SHIFT_Z,0]; b.unseen=1;
  let in2=drawFig(t,b); const xe=SX(rayEnd(b.zoff)); in2+=`<circle cx="${F(SX(CANDLE_X)+(xe-SX(CANDLE_X))*k1)}" cy="${RAY_Y}" r="14" fill="#fff"/>`;
  s+=frame(1,in2,'শিখা দেখা যায় না','x');
  // 3: the straight path of light = a ray
  let in3=`<rect x="0" y="0" width="1920" height="1080" fill="#16224d"/>`+candleG(960,760,170,1,t,'pc',240);
  for(let i=0;i<12;i++){ const an=(i/12)*2*Math.PI+0.26; if(Math.sin(an)>0.75) continue; const ph=(t*0.35+i*0.09)%1; in3+=beam(960+90*Math.cos(an),545+90*Math.sin(an),960+(90+380*ph)*Math.cos(an),545+(90+380*ph)*Math.sin(an),1,{w:11,arrow:1,head:0,op:(1-ph*0.6).toFixed(2)}); }
  s+=frame(2,in3,'আলোকরশ্মি','');
  u+=uiPill('এক নজরে',960,150,S.P(0,0,0.25),64);
  u+=uiPill('আলো সরলরেখায় চলে',960,790,S.P(3,0.15,0.35),70);
  return {svg:s,ui:u};
},{fadeOut:true});
