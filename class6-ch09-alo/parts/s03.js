/* Scene 3: does light go straight or curved? A village example (hole in a tin roof) and a city example (door ajar). */

/* ---- s03_p01 : the question ---- */
PART('s03_p01',SEG('s03_p01'),(t,S)=>{
  let s=navyRays(t), u='';
  u+=banner('আসল প্রশ্ন',S.P(0,0.05,0.35),1,120);
  const y=520;
  // straight arrow (left) and curved arrow (right) draw themselves
  const p1=ease(S.P(1,0.05,0.45)), p2=ease(S.P(1,0.5,0.95));
  const wob=t>=S.A(2)?6*Math.sin(t*5):0;
  s+=g(1,beam(200,y+wob,200+620*p1,y+wob,p1>0?1:0,{w:12,arrow:1,head:0}));
  if(p2>0){ let d=''; const n=Math.round(60*p2); let lx=0,ly=0,px=0,py=0; for(let i=0;i<=n;i++){ const x=1100+620*i/60, yy=y-wob+95*Math.sin(i/60*Math.PI*3); px=lx;py=ly;lx=x;ly=yy; d+=(i?'L':'M')+F(x)+' '+F(yy); }
    const a=Math.atan2(ly-py,lx-px)*180/Math.PI;
    s+=`<path d="${d}" fill="none" stroke="#7fd1ff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><polygon points="6,0 -30,-17 -30,17" fill="#7fd1ff" transform="translate(${F(lx)},${F(ly)}) rotate(${F(a)})"/>`; }
  s+=pill(510,y+150,'সোজা পথ?',52,{op:S.P(1,0.3,0.45),sc:back(S.P(1,0.3,0.45))});
  s+=pill(1410,y+190,'বাঁকা পথ?',52,{op:S.P(1,0.8,0.95),sc:back(S.P(1,0.8,0.95)),b:'#7fd1ff'});
  s+=g(S.P(1,0.45,0.6),txt(960,y+24,'না',80,{c:'#fff'}));
  // "all around you": a tin-roofed house and a block of flats slide up
  const up=ease(S.P(2,0.2,0.7));
  if(up>0){ s+=`<g transform="translate(0,${F((1-up)*420)})"><g transform="translate(250,905) scale(0.55)">${tinHouse(0,0,380,230)}</g>`;
    let b=`<rect x="1640" y="640" width="230" height="270" fill="#8fa3b8"/><rect x="1640" y="640" width="230" height="16" fill="#6f8296"/>`;
    for(let r=0;r<4;r++)for(let c=0;c<3;c++){ const lit=(r*3+c+Math.floor(t*1.5))%4!==0; b+=`<rect x="${1664+c*66}" y="${676+r*58}" width="44" height="36" rx="4" fill="${lit?'#ffe08a':'#4c5d70'}"/>`; }
    s+=b+`</g>`; }
  return {svg:s,ui:u};
},{fadeIn:true});

/* ---- s03_p02 : village. Sunlight through a small hole in the tin roof ---- */
const TH={M:200, ox:560, oy:850,            // px per metre, screen origin (floor, left wall)
  W:4, wallH:2.4, ridgeX:2, ridgeY:3.4, slope:0.5, over:0.3,
  holeX:3.0,                                // hole position on the right slope
  sunElev:60*Math.PI/180};                  // elevation of the Sun (on the right)
TH.holeY=TH.ridgeY-TH.slope*(TH.holeX-TH.ridgeX);            // height of the hole
TH.dir=[-Math.cos(TH.sunElev),-Math.sin(TH.sunElev)];        // direction of every sunray (parallel)
TH.spotX=TH.holeX-TH.holeY/Math.tan(TH.sunElev);             // where the ray through the hole meets the floor
const thX=x=>TH.ox+TH.M*x, thY=y=>TH.oy-TH.M*y;
const roofY=x=>TH.ridgeY-TH.slope*Math.abs(x-TH.ridgeX);

PART('s03_p02',SEG('s03_p02'),(t,S)=>{
  const h=TH; let u='';
  let s=sky('#8fcbff','#e6f4ff')+`<rect y="${thY(0)}" width="1920" height="${1080-thY(0)}" fill="#c9a66b"/>`;
  s+=sun(1720,190,85,t,ease(S.P(0,0.2,0.6)));
  const hin=ease(S.P(0,0,0.5));
  let hs='';
  // dim inside of the house (cut open so we can look in)
  hs+=`<polygon points="${thX(0)},${thY(0)} ${thX(0)},${thY(h.wallH)} ${thX(h.ridgeX)},${thY(h.ridgeY)} ${thX(h.W)},${thY(h.wallH)} ${thX(h.W)},${thY(0)}" fill="#54473a"/>`;
  hs+=`<rect x="${thX(0)}" y="${thY(0)}" width="${h.M*h.W}" height="46" fill="#8f6b43"/>`;
  // things inside: a low wooden stool and a clay pot
  hs+=`<rect x="${thX(0.35)}" y="${thY(0.34)}" width="130" height="16" rx="4" fill="#9a683a"/><rect x="${thX(0.35)+10}" y="${thY(0.34)+16}" width="14" height="${h.M*0.34-16}" fill="#7d5128"/><rect x="${thX(0.35)+106}" y="${thY(0.34)+16}" width="14" height="${h.M*0.34-16}" fill="#7d5128"/>`;
  hs+=kolshi(thX(3.45),thY(0),0.5);
  // walls (tin sheets seen edge-on). The right wall faces the Sun, so its outer face is bright.
  hs+=`<rect x="${thX(0)-14}" y="${thY(h.wallH)}" width="14" height="${h.M*h.wallH+46}" fill="#7f8b94"/><rect x="${thX(h.W)}" y="${thY(h.wallH)}" width="14" height="${h.M*h.wallH+46}" fill="#aeb9c1"/><rect x="${thX(h.W)+10}" y="${thY(h.wallH)}" width="4" height="${h.M*h.wallH+46}" fill="#eef3f6"/>`;
  // roof: two slopes. Brightness follows how squarely each slope faces the Sun (cosine of the angle to the rays)
  const nL=[-0.447,0.894], nR=[0.447,0.894], toSun=[-h.dir[0],-h.dir[1]];
  const cL=nL[0]*toSun[0]+nL[1]*toSun[1], cR=nR[0]*toSun[0]+nR[1]*toSun[1];
  const tin=c=>{ const v=Math.round(120+115*c); return `rgb(${v-12},${v},${v+8})`; };
  const lx=h.ridgeX-(h.W/2+h.over), rx=h.ridgeX+(h.W/2+h.over), gap=0.045;
  hs+=`<line x1="${thX(lx)}" y1="${thY(roofY(lx))}" x2="${thX(h.ridgeX)}" y2="${thY(h.ridgeY)}" stroke="${tin(cL)}" stroke-width="18" stroke-linecap="round"/>`;
  hs+=`<line x1="${thX(h.ridgeX)}" y1="${thY(h.ridgeY)}" x2="${thX(h.holeX-gap)}" y2="${thY(roofY(h.holeX-gap))}" stroke="${tin(cR)}" stroke-width="18" stroke-linecap="round"/><line x1="${thX(h.holeX+gap)}" y1="${thY(roofY(h.holeX+gap))}" x2="${thX(rx)}" y2="${thY(roofY(rx))}" stroke="${tin(cR)}" stroke-width="18" stroke-linecap="round"/>`;
  for(let i=1;i<24;i++){ const x=lx+(rx-lx)*i/24; if(Math.abs(x-h.holeX)<0.09) continue; hs+=`<circle cx="${thX(x)}" cy="${thY(roofY(x))}" r="3.5" fill="#5f6b74"/>`; }
  s+=`<g opacity="${hin.toFixed(2)}" transform="translate(0,${F((1-hin)*60)})">${hs}</g>`;
  // sunrays outside: all parallel. Those that meet the tin stop there; only the one at the hole goes in.
  const rp=ease(S.P(1,0,0.6));
  [2.35,2.7,3.0,3.35,3.7,4.05].forEach((x,i)=>{ const y=roofY(x), L=(4.45-y)/Math.sin(h.sunElev); const x0=x-h.dir[0]*L, y0=y-h.dir[1]*L;
    if(rp>0) s+=beam(thX(x0),thY(y0),thX(x),thY(y),rp,{w:x===h.holeX?9:7,op:x===h.holeX?1:0.7,head:1}); });
  // the ray that passes through the hole travels on in the same straight line to the floor
  const ip=ease(S.P(2,0.1,0.6));
  if(ip>0){ s+=beam(thX(h.holeX),thY(h.holeY),thX(h.spotX),thY(0),ip,{w:9});
    const sp=ease(S.P(2,0.6,0.9)); if(sp>0) s+=`<ellipse cx="${F(thX(h.spotX))}" cy="${thY(0)+6}" rx="${F(46*sp)}" ry="${F(11*sp)}" fill="#fff3b0"/><ellipse cx="${F(thX(h.spotX))}" cy="${thY(0)+6}" rx="${F(80*sp)}" ry="${F(20*sp)}" fill="#fff3b0" opacity=".35"/>`;
    // dust specks drifting inside the beam
    if(ip>=1) for(let i=0;i<9;i++){ const k=((t*0.12+i*0.113)%1); const bx=h.holeX+(h.spotX-h.holeX)*k, by=h.holeY*(1-k); s+=`<circle cx="${F(thX(bx)+5*Math.sin(t*3+i))}" cy="${F(thY(by)+4*Math.cos(t*2.3+i))}" r="3" fill="#fffbe0" opacity=".8"/>`; } }
  // labels
  const hp=S.P(1,0.55,0.8); s+=`<circle cx="${thX(h.holeX)}" cy="${thY(h.holeY)}" r="${F(20+16*Math.sin(t*6)**2)}" fill="none" stroke="#e63946" stroke-width="5" opacity="${(hp*(1-S.P(3,0,0.2))).toFixed(2)}"/>`;
  s+=pill(thX(h.holeX)+170,thY(h.holeY)-40,'ফুটো',40,{op:hp,sc:back(hp)});
  s+=pill(thX(h.spotX)-10,thY(0)+70,'আলোর দাগ',38,{op:S.P(2,0.8,0.95),sc:back(S.P(2,0.8,0.95))});
  // a ruler laid beside the beam: the beam is exactly as straight as the ruler
  const rl=ease(S.P(3,0.3,0.65));
  if(rl>0){ const ang=Math.atan2(thY(0)-thY(h.holeY),thX(h.spotX)-thX(h.holeX))*180/Math.PI; const len=Math.hypot(thX(h.spotX)-thX(h.holeX),thY(0)-thY(h.holeY));
    let r=`<rect x="20" y="-74" width="${F(len-60)}" height="46" rx="6" fill="#f2c94c" stroke="#b58a1b" stroke-width="3"/>`; for(let i=0;i<18;i++) r+=`<line x1="${F(40+i*(len-100)/17)}" y1="-28" x2="${F(40+i*(len-100)/17)}" y2="${i%5?-42:-52}" stroke="#7a5c12" stroke-width="3"/>`;
    s+=`<g opacity="${rl.toFixed(2)}" transform="translate(${F(thX(h.holeX)+(1-rl)*-120)},${F(thY(h.holeY)+(1-rl)*-80)}) rotate(${F(ang)})">${r}</g>`; }
  u+=uiPill('একদম সোজা!',1500,560,S.P(3,0.62,0.8),60);
  s+=noteScale(250,800,'স্কেল অনুযায়ী নয়');
  return {svg:s,ui:u};
});

/* ---- s03_p03 : city. Light from the next room through a door that is slightly open ---- */
const DR={k:200, X0:360, Y0:640, ax:0.25, ay:0.5,     // raised three-quarter view (a door gap cannot be seen from the side)
  wallW:6, wallH:2.8, d0:2.4, d1:3.3, doorH:2.1,       // door opening x from d0 to d1 (metres); hinge at d1
  bulb:[1.6,2.5,2.0],                                  // lamp in the next room: x, height, distance behind the wall
  openDeg:12};
const drP=(x,y,z)=>[DR.X0+DR.k*(x+DR.ax*z), DR.Y0-DR.k*(y+DR.ay*z)];
const drPoly=pts=>pts.map(p=>drP(...p)).map(q=>F(q[0])+','+F(q[1])).join(' ');
// edge of the light on the wall plane: the ray from the lamp that just passes the free edge of the door leaf
function doorSlit(phi){ const L=DR.d1-DR.d0, ex=DR.d1-L*Math.cos(phi), ez=L*Math.sin(phi), [xb,,zb]=DR.bulb;
  const xe=xb+(ex-xb)*zb/(zb-ez); return {ex,ez,xe:Math.min(DR.d1,xe)}; }
// straight line from the lamp through wall point x0 reaches depth z (in our room) at:
const floorX=(x0,z)=>DR.bulb[0]+(x0-DR.bulb[0])*(DR.bulb[2]-z)/DR.bulb[2];

PART('s03_p03',SEG('s03_p03'),(t,S)=>{
  const d=DR; let u='';
  const night=ease(S.P(1,0,0.5));
  const mix=(a,b)=>{ const f=i=>Math.round(a[i]+(b[i]-a[i])*night); return `rgb(${f(0)},${f(1)},${f(2)})`; };
  const wallC=mix([214,222,228],[43,48,80]), floorC=mix([190,170,150],[52,46,72]);
  let s=`<rect width="1920" height="1080" fill="${wallC}"/><polygon points="0,${d.Y0} 1920,${d.Y0} 1920,1080 0,1080" fill="${floorC}"/><rect y="${d.Y0-14}" width="1920" height="14" fill="${mix([150,135,120],[34,30,52])}"/>`;
  // wall calendar and switch board (flat-wall things)
  s+=`<g opacity="${(1-0.6*night).toFixed(2)}"><rect x="1250" y="210" width="130" height="170" rx="6" fill="#f6f1e4"/><rect x="1250" y="210" width="130" height="46" rx="6" fill="#c0392b"/>`; for(let r=0;r<3;r++)for(let c=0;c<4;c++) s+=`<rect x="${1264+c*28}" y="${272+r*32}" width="18" height="18" fill="#c9c2ad"/>`;
  s+=`<rect x="700" y="330" width="70" height="90" rx="8" fill="#eceff1" stroke="#b0bec5" stroke-width="3"/><rect x="718" y="350" width="14" height="24" rx="3" fill="#90a4ae"/><rect x="740" y="350" width="14" height="24" rx="3" fill="#90a4ae"/></g>`;
  // door: opens by angle phi about its hinge
  const phi=d.openDeg*Math.PI/180*ease(S.P(2,0.05,0.5));
  const sl=doorSlit(phi); const open=sl.xe>d.d0+1e-4;
  const a=drP(d.d0,0,0), b=drP(d.d1,d.doorH,0);
  const leak=night*(0.5+0.2*Math.sin(t*3));
  s+=`<rect x="${a[0]-16}" y="${b[1]-16}" width="${b[0]-a[0]+32}" height="${a[1]-b[1]+16}" fill="#4a3320"/>`;
  s+=`<rect x="${a[0]}" y="${b[1]}" width="${b[0]-a[0]}" height="${a[1]-b[1]}" fill="#fff1b8"/>`;                 // the lit room seen through the opening
  s+=`<clipPath id="dclip"><rect x="${a[0]}" y="${b[1]}" width="${b[0]-a[0]}" height="${a[1]-b[1]}"/></clipPath>`;
  s+=`<g clip-path="url(#dclip)"><polygon points="${drPoly([[d.d1,0,0],[d.d1,d.doorH,0],[sl.ex,d.doorH,sl.ez],[sl.ex,0,sl.ez]])}" fill="${mix([150,104,62],[86,58,36])}"/>`;
  s+=`<rect x="${F(drP(sl.xe,0,0)[0])}" y="${b[1]}" width="${F(b[0]-drP(sl.xe,0,0)[0])}" height="${a[1]-b[1]}" fill="${mix([150,104,62],[86,58,36])}"/>`;
  const hx=drP(sl.xe+0.1,1.05,0); s+=`<circle cx="${F(hx[0])}" cy="${F(hx[1])}" r="11" fill="#c9b27a"/><rect x="${F(drP(sl.xe+0.25,0,0)[0])}" y="${b[1]+40}" width="${F(b[0]-drP(sl.xe+0.25,0,0)[0]-30)}" height="170" fill="none" stroke="#3d2816" stroke-width="5" opacity=".6"/><rect x="${F(drP(sl.xe+0.25,0,0)[0])}" y="${b[1]+240}" width="${F(b[0]-drP(sl.xe+0.25,0,0)[0]-30)}" height="150" fill="none" stroke="#3d2816" stroke-width="5" opacity=".6"/></g>`;
  // light leaking round the closed door shows that the next room is lit
  s+=`<rect x="${a[0]}" y="${b[1]}" width="${b[0]-a[0]}" height="${a[1]-b[1]}" fill="none" stroke="#ffe9a0" stroke-width="5" opacity="${leak.toFixed(2)}"/>`;
  // strip of light on our floor: bounded by two straight lines from the lamp through the two edges of the gap
  if(open){ const zf=-3.2; const pts=[[d.d0,0,0],[sl.xe,0,0],[floorX(sl.xe,zf),0,zf],[floorX(d.d0,zf),0,zf]];
    s+=`<polygon points="${drPoly(pts)}" fill="#ffe08a" opacity=".9"/><polygon points="${drPoly(pts)}" fill="none" stroke="#fff3b0" stroke-width="14" opacity=".25" stroke-linejoin="round"/>`;
    const e=ease(S.P(3,0,0.7));
    if(e>0){ [[d.d0,-1],[sl.xe,1]].forEach(([x0,sd])=>{ const p=drP(x0,0,0), q=drP(floorX(x0,zf*e),0,zf*e); s+=`<line x1="${F(p[0]+sd*10)}" y1="${F(p[1])}" x2="${F(q[0]+sd*10)}" y2="${F(q[1])}" stroke="#fff" stroke-width="5" stroke-dasharray="16 12"/>`; }); } }
  s+=pill(drP(2.85,0,0)[0],drP(0,d.doorH,0)[1]-60,'পাশের ঘরে আলো',40,{op:S.P(1,0.5,0.7)*(1-S.P(3,0,0.2)),sc:back(S.P(1,0.5,0.7))});
  s+=pill(1500,780,'আলোর কিনারা সোজা',42,{op:S.P(3,0.5,0.7)*(1-S.P(4,0,0.15)),sc:back(S.P(3,0.5,0.7))});
  u+=card('গ্রামে আর শহরে, আলো কেমন পথে এল?',S.P(4,0.05,0.25)*(t<S.A(5)?1:0),1,110,1300,64);
  if(t>=S.A(5)){ u+=banner('সোজা পথে!',S.P(5,0,0.35),1,150); s+=tick(1420,205,40,S.P(5,0.3,0.6)); }
  return {svg:s,ui:u};
},{fadeOut:true});
