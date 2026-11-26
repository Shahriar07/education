/* Scene 8: "নিজে করো" - the textbook's own activity (three note-book covers with a hole, a candle). */

const COVER_C=['#f6f1e4','#efe8d6','#f6f1e4'];
function coverStack(x0,x1,op=1,holeP=0){ if(op<=0) return ''; let s=`<g opacity="${op.toFixed(2)}">`;
  s+=`<polygon points="${polyP([[x0,0,-7.6],[x1+0.8,0,-7.6],[x1+0.8,0,7.6],[x0,0,7.6]])}" fill="#000" opacity=".18"/>`;
  for(let i=0;i<3;i++) s+=boxW(x0+i*0.5,x1+i*0.5-1,i*0.5,(i+1)*0.5,-7+i*0.3,7+i*0.3,'#cfc7b0',COVER_C[i],'#bdb49a','#8a8068');
  if(holeP>0){ const q=proj((x0+x1)/2,1.5,0); s+=`<ellipse cx="${F(q[0])}" cy="${F(q[1])}" rx="${F(9*holeP)}" ry="${F(5*holeP)}" fill="#3a3528"/>`; }
  return s+'</g>'; }
function needleW(x,yTip,len,z=0,op=1){ const a=proj(x,yTip,z), b=proj(x,yTip+len,z);   // upright needle, tip down
  return `<g opacity="${op}"><line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="#9aa3ad" stroke-width="7" stroke-linecap="round"/><line x1="${F(a[0]-1.5)}" y1="${F(a[1])}" x2="${F(b[0]-1.5)}" y2="${F(b[1])}" stroke="#eef2f5" stroke-width="2"/><ellipse cx="${F(b[0])}" cy="${F(b[1]+10)}" rx="2.5" ry="8" fill="#e9d9b5"/></g>`; }
function matchBox(x,op=1){ if(op<=0) return ''; return `<g opacity="${op.toFixed(2)}">`+boxW(x,x+7,0,2.2,-2.6,2.6,'#2a6f97','#f4d35e','#5a3d28','#3d2816')+`<polygon points="${polyP([[x+1,2.2,-1.6],[x+6,2.2,-1.6],[x+6,2.2,1.6],[x+1,2.2,1.6]])}" fill="#e76f51"/></g>`; }
const dropIn=(svg,p)=>p<=0?'':`<g opacity="${cl(p*3).toFixed(2)}" transform="translate(0,${F((1-ease(p))*-360)})">${svg}</g>`;
const stepHead=(n,txtS,p)=>({svg:numC(640,170,n,40,p), ui:`<div class="abs" style="left:700px;top:128px;font-size:60px;font-weight:700;color:#1a1a2e;opacity:${cl(p*2).toFixed(2)}">${txtS}</div>`});

/* ---- s08_p01 : what you need + safety notice ---- */
PART('s08_p01',SEG('s08_p01'),(t,S)=>{
  let u='', s=WALL+drawTable();
  const it=i=>S.P(1,0.02+i*0.22,0.2+i*0.22);
  s+=dropIn(coverStack(-6,12),it(0));
  // needle lying on the table
  const n0=proj(22,0.3,-3), n1=proj(34,0.3,3);
  s+=dropIn(`<line x1="${F(n0[0])}" y1="${F(n0[1])}" x2="${F(n1[0])}" y2="${F(n1[1])}" stroke="#9aa3ad" stroke-width="7" stroke-linecap="round"/><line x1="${F(n0[0])}" y1="${F(n0[1]-2)}" x2="${F(n1[0])}" y2="${F(n1[1]-2)}" stroke="#eef2f5" stroke-width="2"/><ellipse cx="${F(n1[0]-8)}" cy="${F(n1[1]+2)}" rx="7" ry="2.5" fill="#b8804b"/>`,it(1));
  const cb=proj(47,0,0); s+=dropIn(candleG(cb[0],cb[1],137,0,t,'k1'),it(2));
  s+=dropIn(matchBox(60),it(3));
  [['তিনটা কভার',SX(3),0],['সুঁই',SX(28),1],['মোমবাতি',SX(47),2],['দেশলাই',SX(63.5),3]].forEach(([w,x,i])=>{ const p=S.P(1,0.2+i*0.22,0.3+i*0.22); s+=pill(x,Y0+120,w,36,{op:p,sc:back(p)}); });
  u+=banner('নিজে করো',S.P(0,0.05,0.4),1-S.P(2,0,0.12),110);
  const w=S.P(2,0.03,0.22);
  if(w>0) u+=`<div class="abs" style="left:0;width:1920px;top:90px;display:flex;justify-content:center;opacity:${cl(w*3).toFixed(2)}"><div style="width:1240px;background:#fff;border:8px solid #e63946;border-radius:44px;padding:30px 44px 22px;box-sizing:border-box;display:flex;align-items:center;gap:34px;transform:scale(${back(w).toFixed(3)});box-shadow:0 12px 0 rgba(0,0,0,.22)"><div style="flex:none;width:120px;height:120px;border-radius:50%;background:#e63946;color:#fff;font-size:96px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1;padding-top:10px;box-sizing:border-box">!</div><div style="font-size:48px;font-weight:700;color:#1a1a2e;line-height:1.35"><span style="color:#e63946">সাবধান!</span> মোমবাতি জ্বালানোর সময় বড়দের কাউকে পাশে রাখো। সুঁই সাবধানে ধরো।</div></div></div>`;
  return {svg:s,ui:u};
},{fadeIn:true});

/* ---- s08_p02 : three numbered steps ---- */
PART('s08_p02',SEG('s08_p02'),(t,S)=>{
  let u='', s='';
  const st=base(); st.eyeIn=0; st.candleIn=0; st.flame=0; st.rayOn=false; st.lblCard=[0,0,0];
  const stand=t>=S.A(1);
  st.cardIn=[0,1,2].map(i=>stand?S.P(1,0.05+i*0.18,0.4+i*0.18):0);
  st.zc=[0,1,2].map(i=>(1-ease(st.cardIn[i]))*22);
  st.guide=S.P(1,0.7,0.95);
  st.candleIn=S.P(2,0,0.4); st.flame=ease(S.P(2,0.4,0.6)); st.lblCandle=0;
  s+=drawFig(t,st);
  // step 1: the three covers lie one on another and are pierced together
  if(!stand||S.P(1,0,0.15)<1){ const o=1-S.P(1,0,0.15); const dn=ease(S.P(0,0.35,0.6)), up=ease(S.P(0,0.7,0.95));
    s+=coverStack(21,39,o,up); s+=needleW(30.5,12-13*dn+13*up,9,0,o); }
  // step 3: the flame is as high as the holes
  if(t>=S.A(2)){ const q=S.P(2,0.6,0.85); if(q>0){ const x=SX(CANDLE_X)+150; s+=`<g opacity="${q.toFixed(2)}"><line x1="${F(SX(CARD_X[0])-60)}" y1="${RAY_Y}" x2="${F(x+30)}" y2="${RAY_Y}" stroke="#4a6fa5" stroke-width="4" stroke-dasharray="12 10"/><line x1="${F(x)}" y1="${RAY_Y}" x2="${F(x)}" y2="${Y0}" stroke="#1a1a2e" stroke-width="5"/><polygon points="${x},${RAY_Y} ${x-12},${RAY_Y+22} ${x+12},${RAY_Y+22}" fill="#1a1a2e"/><polygon points="${x},${Y0} ${x-12},${Y0-22} ${x+12},${Y0-22}" fill="#1a1a2e"/></g>`+pill(x+10,RAY_Y-60,'সমান উঁচু',36,{op:q,sc:back(q)}); } }
  const k=t>=S.A(2)?2:t>=S.A(1)?1:0; const p=S.P(k,0,0.12);
  const hd=stepHead(k+1,['একসাথে ছিদ্র করো','এক সরলরেখায় দাঁড় করাও','পেছনে মোমবাতি জ্বালাও'][k],p); s+=hd.svg; u+=hd.ui;
  u+=uiTag('নিজে করো',1);
  return {svg:s,ui:u};
});

/* ---- s08_p03 : result and the question for the comments ---- */
PART('s08_p03',SEG('s08_p03'),(t,S)=>{
  let u=''; const st=base(); st.lblCard=[0,0,0];
  st.eyeIn=S.P(0,0,0.25);
  st.rayOn=t>=S.A(0)+ (S.E(0)-S.A(0))*0.3; const p=ease(S.P(0,0.3,0.7)); st.rayFront=CANDLE_X-(CANDLE_X-EYE_X)*p;
  const z1=SHIFT_Z*ease(S.P(1,0.3,0.6)); st.zoff=[0,z1,0]; st.zc=[0,z1,0];
  const blocked=Math.abs(z1)>HOLE_R;
  st.seen=blocked?0:S.P(0,0.72,0.9); st.unseen=blocked?ease(S.P(1,0.65,0.85)):0;
  let s=drawFig(t,st);
  u+=uiTag('নিজে করো',1);
  u+=card('কেন এমন হলো?<br>উত্তরটা কমেন্টে লিখে জানাও।',S.P(2,0.05,0.3),1,100,1150,70);
  return {svg:s,ui:u};
},{fadeOut:true});
