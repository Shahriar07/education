/* Scene 4: a common wrong belief (light can wind its way round things) and the bent-tube test. */

const BOOK_X=28;                               // candle-side face of the standing book (cm, on the Fig 9.1 table)
const FLAME_S=[SX(CANDLE_X),RAY_Y], EYE_S=[SX(EYE_X),RAY_Y];

function tableScene(t,o={}){ const {eyeP=1,lit=1}=o; const cb=proj(CANDLE_X,0,0), e=proj(EYE_X,HH,0);
  return {back:WALL+drawTable()+candleG(cb[0],cb[1],137,lit,t,'t4'), eye:eyeP>0?eye(e[0],e[1],0.95*back(eyeP),26,0,cl(eyeP*3)):''}; }

/* ---- s04_p01 : "many people think light can wind round things" ---- */
PART('s04_p01',SEG('s04_p01'),(t,S)=>{
  let u=''; const sc=tableScene(t,{eyeP:S.P(0,0.2,0.6)});
  let s=sc.back;
  const bookIn=ease(S.P(2,0.02,0.3));
  // imagined wavy path (no book yet)
  if(t>=S.A(1)&&bookIn<1){ const pts=[FLAME_S]; for(let i=1;i<8;i++) pts.push([FLAME_S[0]+(EYE_S[0]+80-FLAME_S[0])*i/8, RAY_Y+(i%2?-90:90)*(1+0.12*Math.sin(t*5+i))]); pts.push([EYE_S[0]+80,RAY_Y]);
    s+=dreamPath(pts,S.P(1,0.1,0.8),{op:(1-bookIn).toFixed(2),w:7}); }
  if(bookIn>0) s+=bookStand(BOOK_X,(1-bookIn)*26,cl(bookIn*3));
  s+=sc.eye;
  // imagined path that goes round (over) the book
  if(t>=S.A(2)){ const top=proj(BOOK_X-2,30,0); s+=dreamPath([FLAME_S,[SX(44),RAY_Y-30],[top[0],top[1]],[SX(8),RAY_Y-30],[EYE_S[0]+80,RAY_Y]],S.P(2,0.45,0.9),{w:7});
    const q=S.P(2,0.88,0.98); s+=g(q,txt(top[0],top[1]-40,'?',90,{c:'#4a6fa5'})); }
  s+=pill(SX(BOOK_X-2),proj(BOOK_X,0,0)[1]+120,'মোটা বই',36,{op:S.P(2,0.3,0.45),sc:back(S.P(2,0.3,0.45))});
  u+=uiPill('অনেকে যা ভাবে...',960,140,S.P(0,0.3,0.6),60);
  return {svg:s,ui:u};
},{fadeIn:true});

/* ---- s04_p02 : straight tube: flame seen. Bent tube: flame not seen. ---- */
const TU={fy:480, x1:1440, bx:1010, x0:580, r:40, maxDeg:32, tableY:760};
TU.L2=TU.bx-TU.x0;
// A ray along the axis of the straight half meets the wall of the bent half at distance r/sin(phi) from the bend
const tubeHit=phi=>phi<=1e-6?Infinity:TU.r/Math.sin(phi);

PART('s04_p02',SEG('s04_p02'),(t,S)=>{
  const T=TU; let u='';
  let s=WALL+`<rect y="${T.tableY}" width="1920" height="${1080-T.tableY}" fill="#b8804b"/><rect y="${T.tableY}" width="1920" height="14" fill="#c99864"/>`;
  // candle on two books so that the flame is at the height of the tube
  s+=`<rect x="1450" y="${T.tableY-34}" width="220" height="34" rx="5" fill="#2a6f97"/><rect x="1456" y="${T.tableY-29}" width="208" height="24" fill="#f6f1e4"/><rect x="1462" y="${T.tableY-65}" width="200" height="31" rx="5" fill="#588157"/><rect x="1468" y="${T.tableY-60}" width="188" height="21" fill="#f6f1e4"/>`;
  s+=candleG(1560,T.tableY-65,170,1,t,'t5');
  const flameX=1540;
  const tin=ease(S.P(1,0,0.5));
  const phi=T.maxDeg*Math.PI/180*ease(S.P(3,0.1,0.9));
  const deg=phi*180/Math.PI;
  const d=tubeHit(phi); const blocked=d<T.L2;
  // the eye sits at the end of the tube and turns with it
  const ex=T.bx-(T.L2+105)*Math.cos(phi), ey=T.fy+(T.L2+105)*Math.sin(phi);
  // light: travels left from the flame along one straight line
  const rayOn=t>=S.A(2); const endX=blocked?T.bx-d:ex+75; const p=ease(S.P(2,0.05,0.6)); const front=flameX+(endX-flameX)*(t>=S.E(2)?1:p);
  const paper='#efe7d2', inside='#b9ad90';
  const half=(x,w,fill,op=1)=>`<rect x="${F(x)}" y="${T.fy-T.r}" width="${F(w)}" height="${2*T.r}" fill="${fill}" opacity="${op}"/>`;
  const edges=(x,w)=>`<line x1="${F(x)}" y1="${T.fy-T.r}" x2="${F(x+w)}" y2="${T.fy-T.r}" stroke="#8a8068" stroke-width="5"/><line x1="${F(x)}" y1="${T.fy+T.r}" x2="${F(x+w)}" y2="${T.fy+T.r}" stroke="#8a8068" stroke-width="5"/>`;
  const rot=`rotate(${F(-deg)} ${T.bx} ${T.fy})`;
  if(tin>0){ let tb=`<g opacity="${cl(tin*2).toFixed(2)}" transform="translate(0,${F((1-tin)*-420)})">`;
    // inside (far wall) of both halves
    tb+=`<g transform="${rot}">${half(T.x0,T.L2,inside)}<ellipse cx="${T.x0}" cy="${T.fy}" rx="12" ry="${T.r}" fill="#8f8468"/></g>`+half(T.bx,T.x1-T.bx,inside)+`<circle cx="${T.bx}" cy="${T.fy}" r="${T.r}" fill="${inside}"/>`;
    s+=tb+'</g>'; }
  if(rayOn) s+=beam(flameX,T.fy,front,T.fy,1,{w:9,head:front>endX+1});
  if(rayOn&&blocked){ const pls=1+0.25*Math.sin(t*14); s+=`<circle cx="${F(endX)}" cy="${T.fy}" r="${F(24*pls)}" fill="#FFC83D" opacity=".4"/><circle cx="${F(endX)}" cy="${T.fy}" r="9" fill="#fff6c2"/>`; }
  if(tin>0){ let tb=`<g opacity="${cl(tin*2).toFixed(2)}" transform="translate(0,${F((1-tin)*-420)})">`;
    // near wall: see-through paper, so the light inside stays visible
    let stripes=''; for(let i=1;i<6;i++) stripes+=`<line x1="${T.x0+i*70}" y1="${T.fy-T.r}" x2="${T.x0+i*70-30}" y2="${T.fy+T.r}" stroke="#9db4c0" stroke-width="3" opacity=".7"/>`;
    let stripes2=''; for(let i=0;i<6;i++) stripes2+=`<line x1="${T.bx+40+i*70}" y1="${T.fy-T.r}" x2="${T.bx+10+i*70}" y2="${T.fy+T.r}" stroke="#9db4c0" stroke-width="3" opacity=".7"/>`;
    tb+=`<g transform="${rot}">${half(T.x0,T.L2,paper,0.5)}${stripes}${edges(T.x0,T.L2)}<ellipse cx="${T.x0}" cy="${T.fy}" rx="12" ry="${T.r}" fill="none" stroke="#8a8068" stroke-width="5"/></g>`;
    tb+=half(T.bx,T.x1-T.bx,paper,0.5)+stripes2+edges(T.bx,T.x1-T.bx)+`<ellipse cx="${T.x1}" cy="${T.fy}" rx="12" ry="${T.r}" fill="${inside}" stroke="#8a8068" stroke-width="5"/>`;
    if(deg>0.5) tb+=`<path d="M${T.bx} ${T.fy-T.r} L${T.bx} ${T.fy+T.r}" stroke="#8a8068" stroke-width="4" opacity=".8"/>`;
    s+=tb+'</g>'; }
  s+=`<g transform="rotate(${F(-deg)} ${F(ex)} ${F(ey)})">${eye(ex,ey,0.9,24,0,1)}</g>`;
  // what the eye sees
  const seen=rayOn&&!blocked&&front<=endX+1;
  s+=seeBubble(300,260,seen?S.P(2,0.6,0.85):0,blocked?ease(S.P(4,0,0.4)):0,t);
  // the bent path light would have to take: it cannot
  if(t>=S.A(5)){ const q=S.P(5,0.05,0.5); const a=[T.bx-d,T.fy], b=[T.bx-(T.L2+20)*Math.cos(phi),T.fy+(T.L2+20)*Math.sin(phi)];
    s+=`<line x1="${F(T.bx)}" y1="${T.fy}" x2="${F(T.bx+(b[0]-T.bx)*q)}" y2="${F(T.fy+(b[1]-T.fy)*q)}" stroke="#e63946" stroke-width="7" stroke-dasharray="14 16" stroke-linecap="round"/>`;
    s+=cross((T.bx+b[0])/2,(T.fy+b[1])/2-70,30,S.P(5,0.5,0.75)); }
  s+=pill(1010,T.fy-110,'কাগজের নল',38,{op:S.P(1,0.5,0.7)*(1-S.P(2,0,0.3)),sc:back(S.P(1,0.5,0.7))});
  u+=banner('ঠিক উল্টো!',S.P(0,0.05,0.4),1-S.P(1,0,0.2),130);
  u+=uiPill('বাঁকা পথে আলো চোখে আসে না',1180,160,S.P(5,0.4,0.6),52);
  return {svg:s,ui:u};
});

/* ---- s04_p03 : so light goes straight. But we want proof: the textbook experiment ---- */
PART('s04_p03',SEG('s04_p03'),(t,S)=>{
  let u=''; const sc=tableScene(t,{});
  let s=sc.back;
  // wrong: winding path, crossed out.  right: straight beam from flame to eye
  const pts=[FLAME_S]; for(let i=1;i<8;i++) pts.push([FLAME_S[0]+(EYE_S[0]+80-FLAME_S[0])*i/8, RAY_Y-190+(i%2?-55:55)]); pts.push([EYE_S[0]+80,RAY_Y]);
  s+=dreamPath(pts,S.P(0,0,0.25),{w:7,op:0.8});
  s+=cross(SX(24),RAY_Y-190,34,S.P(0,0.25,0.4));
  const p=ease(S.P(0,0.4,0.8));
  s+=beam(FLAME_S[0],RAY_Y,EYE_S[0]+78,RAY_Y,p,{w:9});
  s+=sc.eye;
  s+=tick(SX(24),RAY_Y+90,34,S.P(0,0.8,0.95));
  u+=uiPill('আলো চলে সোজা পথে',960,140,S.P(0,0.7,0.9)*(1-S.P(1,0,0.15)),60);
  u+=card('প্রমাণ চাই!',S.P(1,0.1,0.35)*(t<S.A(2)?1:0),1,130,760,110);
  // the textbook comes up, open at Fig 9.1
  const up=ease(S.P(2,0,0.45));
  if(up>0){ s+=`<rect width="1920" height="1080" fill="${NAVY}" opacity="${(0.8*up).toFixed(2)}"/>`;
    let b=`<g transform="translate(960,${F(470+(1-up)*900)}) rotate(${F(-3+3*up)})">`;
    b+=`<rect x="-560" y="-330" width="1120" height="660" rx="18" fill="#1f5c4d"/><rect x="-540" y="-318" width="540" height="636" rx="6" fill="#fdfaf0"/><rect x="0" y="-318" width="540" height="636" rx="6" fill="#fbf7ea"/><line x1="0" y1="-318" x2="0" y2="318" stroke="#cfc7b0" stroke-width="5"/>`;
    for(let i=0;i<9;i++) b+=`<rect x="-500" y="${-270+i*62}" width="${i%3===2?330:460}" height="14" rx="7" fill="#d5cdb6"/>`;
    // right page: little drawing of the three cards and the candle
    b+=`<rect x="40" y="-270" width="300" height="16" rx="8" fill="#d5cdb6"/><rect x="40" y="-230" width="440" height="14" rx="7" fill="#d5cdb6"/>`;
    b+=`<rect x="60" y="60" width="430" height="12" fill="#8a5a30"/><rect x="80" y="72" width="12" height="90" fill="#8a5a30"/><rect x="458" y="72" width="12" height="90" fill="#8a5a30"/>`;
    [150,235,320].forEach(x=>{ b+=`<polygon points="${x},60 ${x+30},40 ${x+30},-70 ${x},-50" fill="#f6f1e4" stroke="#6e6650" stroke-width="3"/><ellipse cx="${x+15}" cy="-10" rx="4" ry="6" fill="#6e6650"/>`; });
    b+=`<rect x="414" y="0" width="16" height="60" rx="3" fill="#fbf7ea" stroke="#b9b29b" stroke-width="2"/>`+flame(422,0,0.5,t);
    b+=`<line x1="110" y1="-10" x2="414" y2="-10" stroke="#e0a100" stroke-width="3" stroke-dasharray="6 6"/>`;
    b+=txt(270,230,'চিত্র ৯.১',44,{c:'#3a3a5a'})+`</g>`;
    s+=b; u+=uiPill('বইয়ের পরীক্ষা',960,850,S.P(2,0.5,0.7),50); }
  return {svg:s,ui:u};
},{fadeOut:true});
