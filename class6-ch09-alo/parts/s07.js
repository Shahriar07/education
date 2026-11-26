/* Scene 7: around us. Torch, sunlight through a gap in a bus curtain, hurricane lamp, then a question. */

/* ---- s07_p01 : torch beam and its round spot on the wall ---- */
const TC={x:600, y:540, wallX:1660, lens:40, halfDeg:7};   // torch lens centre, wall position, lens half-height, half-angle of the beam
// where the two edge rays of the beam meet the wall, for torch angle a (radians, + = pointing down)
function torchSpot(a){ const h=TC.halfDeg*Math.PI/180; const e=sgn=>{ const ex=TC.x-sgn*TC.lens*Math.sin(a), ey=TC.y+sgn*TC.lens*Math.cos(a); return [ex,ey,ey+(TC.wallX-ex)*Math.tan(a+sgn*h)]; };
  const up=e(-1), dn=e(1); return {up,dn,cy:(up[2]+dn[2])/2,ry:(dn[2]-up[2])/2}; }

PART('s07_p01',SEG('s07_p01'),(t,S)=>{
  let u='';
  let s=`<rect width="1920" height="1080" fill="#151b30"/><rect y="900" width="1920" height="180" fill="#0f1424"/>`;
  // the far wall, seen at a slant
  s+=`<polygon points="1560,40 1760,0 1760,1000 1560,900" fill="#27304f"/><line x1="1560" y1="40" x2="1560" y2="900" stroke="#3a4570" stroke-width="4"/>`;
  const inn=ease(S.P(0,0.1,0.7));
  const on=t>=S.A(1)+(S.E(1)-S.A(1))*0.55?1:0;
  // the torch is swung up and down in the last segment
  const sw=S.P(3,0,1); const aDeg=t>=S.A(3)?13*Math.sin(sw*Math.PI*2)*(1-0.15*sw):0; const a=aDeg*Math.PI/180;
  const sp=torchSpot(a);
  const grow=on?ease(pr(t,S.A(1)+(S.E(1)-S.A(1))*0.55,S.A(2)+(S.E(2)-S.A(2))*0.35)):0;      // the beam reaches the wall
  if(on){ const X=x=>TC.x+(x-TC.x)*grow; const yAt=(e)=>e[1]+(X(TC.wallX)-e[0])*((e[2]-e[1])/(TC.wallX-e[0]));
    s+=`<defs><linearGradient id="tbm" gradientUnits="userSpaceOnUse" x1="${TC.x}" y1="0" x2="${TC.wallX}" y2="0"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".75"/><stop offset="1" stop-color="#ffe9a0" stop-opacity=".3"/></linearGradient></defs>`;
    s+=`<polygon points="${F(sp.up[0])},${F(sp.up[1])} ${F(X(TC.wallX))},${F(yAt(sp.up))} ${F(X(TC.wallX))},${F(yAt(sp.dn))} ${F(sp.dn[0])},${F(sp.dn[1])}" fill="url(#tbm)"/>`;
    if(grow>=1){ s+=`<ellipse cx="${TC.wallX}" cy="${F(sp.cy)}" rx="${F(sp.ry*0.42+18)}" ry="${F(sp.ry+18)}" fill="#fff3b0" opacity=".3"/><ellipse cx="${TC.wallX}" cy="${F(sp.cy)}" rx="${F(sp.ry*0.42)}" ry="${F(sp.ry)}" fill="#fff6c8"/>`; }
    // straight edges of the beam
    const e=ease(S.P(3,0,0.25)); if(e>0) [sp.up,sp.dn].forEach(q=>{ s+=`<line x1="${F(q[0])}" y1="${F(q[1])}" x2="${TC.wallX}" y2="${F(q[2])}" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" opacity="${(0.9*e).toFixed(2)}"/>`; });
  }
  // hand and torch (a single hand with its sleeve)
  let h=`<g transform="translate(${F(-760*(1-inn))},0)"><g transform="rotate(${F(aDeg)} ${TC.x} ${TC.y})">`;
  h+=`<path d="M${TC.x-150} ${TC.y+40} Q${TC.x-230} ${TC.y+260} ${TC.x-560} ${TC.y+520}" stroke="#2a9d8f" stroke-width="110" fill="none" stroke-linecap="round"/><path d="M${TC.x-150} ${TC.y+30} L${TC.x-196} ${TC.y+150}" stroke="#c98d5e" stroke-width="84" fill="none" stroke-linecap="round"/>`;
  h+=torchSvg(TC.x,TC.y,0,on,0);
  for(let i=0;i<4;i++) h+=`<rect x="${TC.x-212+i*27}" y="${TC.y-38}" width="24" height="80" rx="12" fill="#c98d5e" stroke="#a9744a" stroke-width="2.5"/>`;
  h+=`<rect x="${TC.x-118}" y="${TC.y-52}" width="46" height="26" rx="13" fill="#c98d5e" stroke="#a9744a" stroke-width="2.5"/>`;
  s+=h+`</g></g>`;
  s+=pill(1500,sp.cy+sp.ry+70,'গোল দাগ',38,{op:S.P(2,0.5,0.7)*(1-S.P(3,0,0.2)),sc:back(S.P(2,0.5,0.7))});
  s+=pill(1100,330,'আলোর কিনারা সোজা',40,{op:S.P(3,0.2,0.4),sc:back(S.P(3,0.2,0.4))});
  u+=uiTag('চারপাশে · আলো সরলরেখায় চলে',S.P(0,0.2,0.5));
  return {svg:s,ui:u};
},{fadeIn:true});

/* ---- s07_p02 : in a bus. Sunlight through the gap between the window curtains ---- */
const BU={k:380, X0:70, Y0:900, ax:0.25, ay:0.4,            // raised three-quarter view of the bus side wall, from inside
  win:[1.3,3.4,0.9,1.65],                                  // window opening: x0,x1,y0,y1 (metres)
  gap0:2.2, gapW:0.12,                                      // gap between the two curtains
  seatY:0.45,
  sunElev:55*Math.PI/180, sunAz:10*Math.PI/180};
BU.d=[Math.cos(BU.sunElev)*Math.sin(BU.sunAz), -Math.sin(BU.sunElev), -Math.cos(BU.sunElev)*Math.cos(BU.sunAz)];   // direction of every sunray
const buP=(x,y,z)=>[BU.X0+BU.k*(x+BU.ax*z), BU.Y0-BU.k*(y+BU.ay*z)];
const buPoly=pts=>pts.map(p=>buP(...p)).map(q=>F(q[0])+','+F(q[1])).join(' ');
// a sunray through wall point (x,y,0) lands on the seat (height seatY) at:
function buLand(x,y){ const s=(y-BU.seatY)/-BU.d[1]; return [x+BU.d[0]*s, BU.seatY, BU.d[2]*s]; }
function buBox(x0,x1,y0,y1,z0,z1,cx,ct,cf){ // visible faces: +x, top, front (z0)
  return `<polygon points="${buPoly([[x1,y0,z0],[x1,y0,z1],[x1,y1,z1],[x1,y1,z0]])}" fill="${cx}"/><polygon points="${buPoly([[x0,y1,z0],[x1,y1,z0],[x1,y1,z1],[x0,y1,z1]])}" fill="${ct}"/><polygon points="${buPoly([[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0]])}" fill="${cf}"/>`; }
function busSeat(x){ return buBox(x-0.12,x,0.25,1.15,-0.85,-0.05,'#3f77ad','#5a93c9','#2f5d8a')+buBox(x,x+0.55,0.25,0.45,-0.85,-0.05,'#2f5d8a','#3f77ad','#274e75')
  +buBox(x+0.05,x+0.12,0,0.25,-0.8,-0.72,'#6b747c','#8f99a3','#7d8790')+buBox(x+0.42,x+0.49,0,0.25,-0.8,-0.72,'#6b747c','#8f99a3','#7d8790'); }

PART('s07_p02',SEG('s07_p02'),(t,S)=>{
  const b=BU; let u='';
  const jig=2.2*Math.sin(t*11)+1.2*Math.sin(t*17);               // the bus is moving
  let s=`<rect width="1920" height="1080" fill="#3d7a6a"/><g transform="translate(0,${F(jig)})">`;
  s+=`<rect y="0" width="1920" height="${buP(0,0.85,0)[1]}" fill="#e3ebe4"/><rect y="${buP(0,0.85,0)[1]}" width="1920" height="14" fill="#9fb3a8"/>`;
  s+=`<polygon points="0,${b.Y0} 1920,${b.Y0} 1920,1080 0,1080" fill="#4b4f57"/>`;
  const gw=b.gapW*ease(S.P(1,0.02,0.35)); const g0=b.gap0, g1=b.gap0+gw;
  const drawWin=(x0,x1,gapA,gapB)=>{ const A=buP(x0,b.win[3],0), B=buP(x1,b.win[2],0); let w='';
    w+=`<rect x="${A[0]-12}" y="${A[1]-12}" width="${B[0]-A[0]+24}" height="${B[1]-A[1]+24}" rx="16" fill="#aab4bd"/><rect x="${A[0]}" y="${A[1]}" width="${B[0]-A[0]}" height="${B[1]-A[1]}" fill="#bfe3ff"/>`;
    // buildings sliding past outside
    w+=`<clipPath id="wc${Math.round(x0*10)}"><rect x="${A[0]}" y="${A[1]}" width="${B[0]-A[0]}" height="${B[1]-A[1]}"/></clipPath><g clip-path="url(#wc${Math.round(x0*10)})">`;
    for(let i=0;i<9;i++){ const bx=((i*310-t*520)%2790+2790)%2790-400; const bh=90+((i*67)%120); w+=`<rect x="${F(bx)}" y="${F(B[1]-bh)}" width="210" height="${bh}" fill="${['#9fb3c8','#c8b89f','#b0c4b1'][i%3]}"/>`; }
    w+=`</g>`;
    // curtains (cloth, with folds) on a rail
    const cur=(xa,xb)=>{ if(xb-xa<0.01) return ''; const P=buP(xa,b.win[3]+0.05,0), Q=buP(xb,b.win[2]-0.04,0); let c=`<rect x="${F(P[0])}" y="${F(P[1])}" width="${F(Q[0]-P[0])}" height="${F(Q[1]-P[1])}" fill="#8e2f3f"/>`; const n=Math.max(2,Math.round((Q[0]-P[0])/38)); for(let i=0;i<n;i++){ const fx=P[0]+(Q[0]-P[0])*(i+0.5)/n; c+=`<rect x="${F(fx-5)}" y="${F(P[1])}" width="10" height="${F(Q[1]-P[1])}" fill="#6f2231" opacity=".7"/>`; } return c; };
    w+=cur(x0,gapA)+cur(gapB,x1);
    const R=buP(x0-0.1,b.win[3]+0.08,0), R2=buP(x1+0.1,b.win[3]+0.08,0); w+=`<line x1="${R[0]}" y1="${R[1]}" x2="${R2[0]}" y2="${R2[1]}" stroke="#7d8790" stroke-width="9" stroke-linecap="round"/>`;
    return w; };
  s+=drawWin(b.win[0],b.win[1],g0,g1)+drawWin(3.75,5.85,4.8,4.8);
  s+=`<line x1="0" y1="${buP(0,1.95,0)[1]}" x2="1920" y2="${buP(0,1.95,0)[1]}" stroke="#c9ced3" stroke-width="16"/>`;      // hand rail
  s+=busSeat(1.97)+busSeat(3.7);
  // stripe of sunlight on the seat: the gap edges carried along the (parallel) ray direction
  if(gw>0.003){ const y0=b.win[2], y1=b.win[3]; const q=[buLand(g0,y0),buLand(g1,y0),buLand(g1,y1),buLand(g0,y1)];
    s+=`<polygon points="${buPoly(q)}" fill="#fff3b0"/><polygon points="${buPoly(q)}" fill="none" stroke="#fff3b0" stroke-width="12" opacity=".35" stroke-linejoin="round"/>`;
    // the rays themselves, side by side and all straight
    const e=ease(S.P(2,0,0.5)); const n=5;
    for(let i=0;i<n;i++){ const y=y0+(y1-y0)*(i+0.5)/n, x=(g0+g1)/2; const a=buP(x,y,0), l=buP(...buLand(x,y)); const ph=(t*0.6+i*0.2)%1;
      s+=`<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(l[0])}" y2="${F(l[1])}" stroke="#fff6c8" stroke-width="${3+5*e}" opacity="${(0.35+0.5*e).toFixed(2)}" stroke-linecap="round"/>`;
      s+=`<circle cx="${F(a[0]+(l[0]-a[0])*ph)}" cy="${F(a[1]+(l[1]-a[1])*ph)}" r="6" fill="#fff"/>`; } }
  s+=`</g>`;
  s+=pill(buP(g0,b.win[3],0)[0]+30,buP(0,b.win[3],0)[1]-80,'পর্দার ফাঁক',38,{op:S.P(1,0.3,0.5)*(1-S.P(2,0,0.3)),sc:back(S.P(1,0.3,0.5))});
  s+=pill(1330,800,'রোদের দাগ',38,{op:S.P(1,0.6,0.8),sc:back(S.P(1,0.6,0.8))});
  u+=uiTag('চারপাশে · সরলরেখা',1);
  u+=uiPill('রেখাগুলো পাশাপাশি ও সোজা',1300,560,S.P(2,0.35,0.55),46);
  return {svg:s,ui:u};
});

/* ---- s07_p03 : hurricane lamp, rays in every direction, each one straight ---- */
function hurricane(x,yb,sc,lit,t){
  let s=`<g transform="translate(${x},${yb}) scale(${sc})">`;
  s+=`<path d="M-104 -150 C-150 -372 150 -372 104 -150" fill="none" stroke="#9aa3ad" stroke-width="6"/>`;                           // carrying handle
  s+=`<path d="M-86 -44 C-124 -120 -116 -236 -40 -270" fill="none" stroke="#2f6f8f" stroke-width="14" stroke-linecap="round"/><path d="M86 -44 C124 -120 116 -236 40 -270" fill="none" stroke="#2f6f8f" stroke-width="14" stroke-linecap="round"/>`;   // side tubes
  s+=`<path d="M-34 -92 C-80 -130 -72 -212 -30 -238 L30 -238 C72 -212 80 -130 34 -92 Z" fill="#fff3c4" fill-opacity="${(0.18+0.3*lit).toFixed(2)}" stroke="#efe9d6" stroke-width="4"/>`;   // glass chimney
  if(lit>0) s+=flame(0,-98,0.95*lit,t);
  s+=`<path d="M-50 -110 C-66 -150 -60 -200 -44 -222" fill="none" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/>`;
  s+=`<path d="M-66 -150 Q0 -138 66 -150" fill="none" stroke="#8f99a3" stroke-width="3"/><path d="M-62 -196 Q0 -184 62 -196" fill="none" stroke="#8f99a3" stroke-width="3"/>`;   // wire guards
  s+=`<rect x="-38" y="-266" width="76" height="30" rx="5" fill="#2f6f8f"/><path d="M-46 -264 Q0 -316 46 -264 Z" fill="#3b86ab"/><circle cx="0" cy="-306" r="11" fill="none" stroke="#9aa3ad" stroke-width="5"/>`;   // hood
  for(let i=-2;i<=2;i++) s+=`<rect x="${i*13-3}" y="-258" width="6" height="14" rx="3" fill="#1d4a61"/>`;
  s+=`<rect x="-36" y="-96" width="72" height="34" rx="6" fill="#c9a227"/><rect x="-36" y="-96" width="72" height="10" rx="5" fill="#e6c65a"/><line x1="36" y1="-78" x2="66" y2="-78" stroke="#8a6f1a" stroke-width="6"/><circle cx="72" cy="-78" r="10" fill="#c9a227" stroke="#8a6f1a" stroke-width="3"/>`;   // burner and wick knob
  s+=`<path d="M-96 0 Q-108 -52 -70 -64 L70 -64 Q108 -52 96 0 Z" fill="#2f6f8f"/><path d="M-84 -12 Q-92 -46 -62 -54 L-20 -54 Q-52 -44 -50 -12 Z" fill="#4c95ba" opacity=".7"/><rect x="-102" y="-10" width="204" height="14" rx="6" fill="#245770"/><rect x="-64" y="-74" width="22" height="12" rx="4" fill="#c9a227"/>`;   // oil tank
  return s+'</g>'; }

PART('s07_p03',SEG('s07_p03'),(t,S)=>{
  let u='';
  const lx=960, yb=800, sc=1.25, fx=lx, fy=yb-135*sc;
  let s=`<rect width="1920" height="1080" fill="#6b5437"/><rect y="800" width="1920" height="280" fill="#7d5f3c"/><rect y="800" width="1920" height="10" fill="#5e4629"/>`;
  s+=`<rect x="560" y="800" width="800" height="26" rx="10" fill="#b5894f"/>`+kolshi(300,812,0.85);     // mat and clay pot
  const lit=ease(S.P(0,0.25,0.6));
  s+=darkPool(fx,fy,1250,1-0.25*lit,'h')+darkAll(0.5*(1-lit));
  s+=`<defs><radialGradient id="hg"><stop offset="0" stop-color="#ffd27a" stop-opacity="${(0.6*lit).toFixed(2)}"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs><circle cx="${fx}" cy="${fy}" r="330" fill="url(#hg)"/>`;
  // rays: every one a straight line from the flame
  const N=16, R0=125;
  for(let i=0;i<N;i++){ const a=(i/N)*2*Math.PI+0.2; if(Math.sin(a)>0.55) continue;                       // the lamp's own tank is below the flame
    const q=ease(S.P(1,0.05+i*0.02,0.6+i*0.02)); if(q<=0) continue; const len=(430+70*Math.sin(i*1.9))*q;
    const x1=fx+R0*Math.cos(a), y1=fy+R0*Math.sin(a), x2=fx+(R0+len)*Math.cos(a), y2=fy+(R0+len)*Math.sin(a);
    s+=beam(x1,y1,x2,y2,1,{w:7,arrow:1,head:0,op:0.9});
    const ph=(t*0.5+i*0.11)%1; s+=`<circle cx="${F(x1+(x2-x1)*ph)}" cy="${F(y1+(y2-y1)*ph)}" r="7" fill="#fff"/>`;
    if(t>=S.A(2)&&i%4===1){ const e=ease(S.P(2,0,0.4)); s+=`<line x1="${F(x1)}" y1="${F(y1)}" x2="${F(x1+(x2-x1)*e)}" y2="${F(y1+(y2-y1)*e)}" stroke="#fff" stroke-width="4" stroke-dasharray="14 12" transform="translate(${F(-16*Math.sin(a))},${F(16*Math.cos(a))})"/>`; } }
  s+=hurricane(lx,yb,sc,lit,t);
  s+=pill(lx,yb+70,'হারিকেন',38,{op:S.P(0,0.5,0.7)*(1-S.P(1,0,0.3)),sc:back(S.P(0,0.5,0.7))});
  u+=uiTag('চারপাশে · আলোকরশ্মি',1);
  u+=uiPill('প্রতিটা রশ্মি সোজা',1480,820,S.P(2,0.3,0.5),48);
  return {svg:s,ui:u};
});

/* ---- s07_p04 : question for the student: candle, thick book, eye ---- */
PART('s07_p04',SEG('s07_p04'),(t,S)=>{
  let u=''; const sc=tableScene(t,{});
  let s=sc.back;
  const bookIn=ease(S.P(1,0.02,0.3));
  s+=bookStand(BOOK_X,(1-bookIn)*26,cl(bookIn*3));
  // the light goes straight from the flame and is stopped by the book (it meets the face at x = BOOK_X)
  if(t>=S.A(3)){ const p=ease(S.P(3,0.05,0.5)); const xe=SX(BOOK_X); s+=beam(FLAME_S[0],RAY_Y,xe,RAY_Y,p,{w:9});
    if(p>=1){ const pls=1+0.25*Math.sin(t*14); s+=`<circle cx="${F(xe)}" cy="${RAY_Y}" r="${F(26*pls)}" fill="#FFC83D" opacity=".4"/><circle cx="${F(xe)}" cy="${RAY_Y}" r="10" fill="#fff6c2"/>`; } }
  s+=sc.eye;
  if(t>=S.A(4)){ const top=proj(BOOK_X-2,30,0); s+=dreamPath([[SX(BOOK_X+6),RAY_Y],[SX(BOOK_X+3),top[1]+40],[top[0]-20,top[1]],[SX(8),RAY_Y-30],[EYE_S[0]+80,RAY_Y]],S.P(4,0.3,0.7),{c:'#e63946',w:7});
    s+=cross(SX(10),RAY_Y-110,32,S.P(4,0.7,0.85)); }
  s+=seeBubble(250,345,0,ease(S.P(3,0.55,0.8)),t);
  // thinking dots
  if(t>=S.A(2)&&t<S.A(3)) for(let i=0;i<3;i++){ const k=0.5+0.5*Math.sin(t*6-i*1.1); s+=`<circle cx="${900+i*60}" cy="330" r="${F(12+8*k)}" fill="#1a1a2e" opacity="${(0.4+0.6*k).toFixed(2)}"/>`; }
  u+=uiTag('এবার তুমি বলো',S.P(0,0.1,0.5));
  u+=card('মাঝখানে মোটা বই দাঁড় করালে<br>শিখাটা কি দেখা যাবে?',S.P(1,0.35,0.55)*(t<S.A(3)?1:0),1,110,1150,62);
  if(t>=S.A(3)) u+=banner('না, দেখা যাবে না!',S.P(3,0.5,0.8),1,120);
  u+=uiPill('আলো বইয়ে আটকে যায়',1250,800,S.P(4,0.05,0.25),48);
  return {svg:s,ui:u};
},{fadeOut:true});
