/* Scene 2: light is a kind of energy; how fast it goes; the Sun as the source of all light (textbook p. 73) */

// ---- physical constants ----
const C_LIGHT=300000;        // km per second (textbook: "প্রায় ৩ লক্ষ কিলোমিটার")
const EARTH_ROUND=40000;     // km, circumference of the Earth (used only to check "more than 7 times")
const LAPS_PER_SEC=C_LIGHT/EARTH_ROUND;   // = 7.5

function torchSvg(x,y,ang,on,beamLen=0,halfDeg=8){ // lens centre at (x,y); points along +x when ang=0
  let s=`<g transform="translate(${F(x)},${F(y)}) rotate(${F(ang)})">`;
  if(on>0&&beamLen>0){ const h=40+beamLen*Math.tan(halfDeg*Math.PI/180); s+=`<defs><linearGradient id="tb${Math.round(x)}" x1="0" x2="1"><stop offset="0" stop-color="#ffe9a0" stop-opacity="${(0.75*on).toFixed(2)}"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="${(0.2*on).toFixed(2)}"/></linearGradient></defs><polygon points="0,-40 ${F(beamLen)},${F(-h)} ${F(beamLen)},${F(h)} 0,40" fill="url(#tb${Math.round(x)})"/>`; }
  s+=`<rect x="-250" y="-30" width="22" height="60" rx="8" fill="#9aa3ad"/><rect x="-232" y="-28" width="176" height="56" rx="8" fill="#c0392b"/><rect x="-232" y="-28" width="176" height="16" rx="8" fill="#e05a4b"/>`;
  for(let i=0;i<5;i++) s+=`<rect x="${-215+i*16}" y="-28" width="5" height="56" fill="#962d22" opacity=".6"/>`;
  s+=`<rect x="-130" y="-38" width="46" height="12" rx="5" fill="#2b2b2b"/><polygon points="-58,-28 -8,-48 -8,48 -58,28" fill="#b8c2cc"/><polygon points="-58,-28 -8,-48 -8,-30 -58,-14" fill="#dfe6ec"/><rect x="-10" y="-50" width="12" height="100" rx="5" fill="#8f99a3"/><ellipse cx="2" cy="0" rx="7" ry="44" fill="${on>0.5?'#fff6c2':'#cfd8dc'}"/>`;
  return s+'</g>'; }

/* ---- s02_p01 : without light we see nothing; light is a kind of energy ---- */
PART('s02_p01',SEG('s02_p01'),(t,S)=>{
  let u='';
  const outP=ease(S.P(0,0.45,0.9)), backP=ease(S.P(2,0.15,0.7));
  const dark=outP*(1-backP);
  let s=studyRoom(t,{bulbOn:dark>0.5?0:1})+darkAll(0.97*dark);
  if(dark>0.9) for(let i=0;i<4;i++){ const ph=(t*0.5+i*0.27)%1; s+=txt(480+i*320,600-ph*160,'?',90,{c:'#5b6ea8',op:0.55*Math.sin(ph*Math.PI)}); }
  // close-up: the bulb and its light
  const z=ease(S.P(3,0,0.3));
  if(z>0){ s+=`<rect width="1920" height="1080" fill="${NAVY}" opacity="${(0.94*z).toFixed(3)}"/>`;
    const cx=960, cy=300;
    for(let i=0;i<14;i++){ const a=(i/14)*2*Math.PI+0.22; if(Math.sin(a)<-0.8) continue; const ph=(t*0.6+i*0.13)%1; const r0=170+ph*380, r1=r0+90;
      s+=`<line x1="${F(cx+r0*Math.cos(a))}" y1="${F(cy+r0*Math.sin(a))}" x2="${F(cx+r1*Math.cos(a))}" y2="${F(cy+r1*Math.sin(a))}" stroke="${Y}" stroke-width="9" stroke-linecap="round" opacity="${(z*Math.sin(ph*Math.PI)*0.9).toFixed(2)}"/>`; }
    s+=`<g opacity="${z.toFixed(2)}" transform="translate(${cx},-120) scale(2)">${hangingBulb(0,0,1,t)}</g>`;
    u+=uiPill('আলো = এক প্রকার শক্তি',960,640,S.P(3,0.35,0.6)*(1-S.P(4,0,0.12)),60);
    u+=termCard('শক্তি','Energy',S.P(4,0.08,0.22),1,960,700);
  }
  return {svg:s,ui:u};
},{fadeIn:true});

/* ---- s02_p02 : how fast? about 3 lakh km every second ---- */
PART('s02_p02',SEG('s02_p02'),(t,S)=>{
  let s=bg(NAVY)+stars(t,50,3), u='';
  const q0=S.fade(0,1,0.4);
  s+=g(q0,txt(960,300,'আলো কত জোরে ছোটে?',110,{c:'#fff'})+`<g transform="translate(960,470) rotate(${F(8*Math.sin(t*3))})">${txt(0,40,'?',190,{c:Y})}</g>`);
  // three everyday things cross the screen, each faster than the one before (order only, no numbers)
  [['সাইকেল?',600,0.9],['বাস?',700,1.7],['উড়োজাহাজ?',800,3.2]].forEach(([w,y,v],i)=>{ const p=S.P(1,i*0.3,1.15); if(p<=0||t>=S.A(2)+0.4) return;
    const x=-260+2500*cl(p*v*0.55); const o=1-pr(t,S.A(2),S.A(2)+0.4);
    s+=`<g opacity="${o.toFixed(2)}"><line x1="${F(x-360)}" y1="${y}" x2="${F(x-150)}" y2="${y}" stroke="#7f93c9" stroke-width="${6+i*3}" stroke-linecap="round" opacity=".5"/>${pill(x,y,w,48,{b:'#22305e',c:'#fff'})}</g>`; });
  // light: crosses the whole screen at once, then the number counts up
  if(t>=S.A(2)){ const f=S.P(2,0,0.04); const o=1-0.6*S.P(2,0.2,0.5);
    s+=g(o,beam(-40,330,1960,330,f,{w:12,head:1}));
    const n=C_LIGHT*ease(S.P(2,0.3,0.72));
    s+=g(S.P(2,0.1,0.25),txt(960,470,'আলো এক সেকেন্ডে যায় প্রায়',64,{c:'#fff',w:600})+txt(960,690,lakh(n),210,{c:Y})+txt(960,810,'কিলোমিটার',80,{c:'#fff'}));
  }
  return {svg:s,ui:u};
});

/* ---- s02_p03 : more than seven times round the Earth in one second ---- */
PART('s02_p03',SEG('s02_p03'),(t,S)=>{
  let s=bg(NAVY)+stars(t,70,5), u='';
  const cx=960, cy=470, RE=150, RO=255;
  const ein=back(S.P(0,0,0.2));
  s+=`<g transform="translate(${cx},${cy}) scale(${ein.toFixed(3)}) translate(${-cx},${-cy})">${earth(cx,cy,RE)}</g>`;
  s+=g(S.P(0,0.2,0.4),`<circle cx="${cx}" cy="${cy}" r="${RO}" fill="none" stroke="#7f93c9" stroke-width="4" stroke-dasharray="6 16" transform="rotate(${F(t*3)} ${cx} ${cy})"/>`);
  // tau = time shown on the stop-watch (seconds). laps = c * tau / circumference
  const tau=S.P(1,0.02,0.8);                 // linear: the dot moves at uniform speed
  const laps=LAPS_PER_SEC*tau;
  const ang=-Math.PI/2+laps*2*Math.PI;
  const dx=cx+RO*Math.cos(ang), dy=cy+RO*Math.sin(ang);
  const dotOn=S.P(0,0.45,0.6);
  if(dotOn>0){
    if(tau>0&&tau<1){ let d=''; for(let k=0;k<=20;k++){ const a=ang-(k/20)*1.6; if(a<-Math.PI/2-0.001&&laps<1&&(ang-a)>laps*2*Math.PI) break; d+=(d?'L':'M')+F(cx+RO*Math.cos(a))+' '+F(cy+RO*Math.sin(a)); } s+=`<path d="${d}" fill="none" stroke="${Y}" stroke-width="12" stroke-linecap="round" opacity=".55"/>`; }
    const pls=1+0.2*Math.sin(t*9);
    s+=g(dotOn,`<circle cx="${F(dx)}" cy="${F(dy)}" r="${F(34*pls)}" fill="${Y}" opacity=".3"/><circle cx="${F(dx)}" cy="${F(dy)}" r="15" fill="#fff6c2"/>`);
  }
  s+=g(S.P(0,0.5,0.7),txt(1060,172,'আলোর বেগে ছুটলে ১ সেকেন্ডে পৃথিবীকে কত বার ঘোরা যায়?',44,{c:'#fff',w:600}));
  // lap counter (left) and stop-watch (right)
  const pan=S.P(0,0.7,0.9);
  s+=g(pan,`<rect x="170" y="330" width="420" height="280" rx="36" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>`+txt(380,400,'ঘোরা হলো',48,{c:'#fff',w:600})+txt(380,540,BN(Math.floor(laps+1e-6))+' বার',120,{c:Y}));
  s+=g(pan,`<rect x="1330" y="330" width="420" height="280" rx="36" fill="#1b2b5c" stroke="#33488c" stroke-width="3"/>`+txt(1540,400,'সময়',48,{c:'#fff',w:600})+txt(1540,520,BN(tau.toFixed(2)),110,{c:Y})+txt(1540,585,'সেকেন্ড',44,{c:'#fff',w:600}));
  s+=noteScale(380,670,'স্কেল অনুযায়ী নয়','#9fb0dd')+noteScale(1540,670,'ধীর করে দেখানো','#9fb0dd');
  u+=uiPill('১ সেকেন্ডে ৭ বারেরও বেশি!',960,770,S.P(1,0.82,0.95)*(1-S.P(2,0,0.1)),56);
  u+=uiPill('আলোর চেয়ে বেশি বেগে কিছুই চলতে পারে না',960,770,S.P(2,0.12,0.3),52);
  return {svg:s,ui:u};
});

/* ---- s02_p04 : many lamps, but the source of all light is the Sun ---- */
PART('s02_p04',SEG('s02_p04'),(t,S)=>{
  let s='', u='';
  const day=ease(S.P(2,0,0.35));
  if(day<1){
    s+=`<rect width="1920" height="1080" fill="#1b2340"/><rect y="720" width="1920" height="360" fill="#3a2c22"/><rect y="720" width="1920" height="12" fill="#5a4332"/>`;
    const on=i=>ease(S.P(1,i*0.3,i*0.3+0.12));
    const inn=i=>ease(S.P(0,0.1+i*0.2,0.5+i*0.2));
    // candle
    s+=`<g transform="translate(0,${F((1-inn(0))*-700)})">${candleG(430,720,170,on(0),t,'s2',260)}</g>`;
    // bulb
    s+=`<g transform="translate(0,${F((1-inn(1))*-700)})"><line x1="960" y1="0" x2="960" y2="300" stroke="#333" stroke-width="5"/>${hangingBulb(960,290,on(1),t)}</g>`;
    // torch lying on the table, pointing right
    s+=`<g transform="translate(${F((1-inn(2))*900)},0)">${torchSvg(1500,690,0,on(2),400,9)}</g>`;
    [['মোমবাতি',430,0],['বাল্ব',960,1],['টর্চ',1400,2]].forEach(([w,x,i])=>{ s+=pill(x,800,w,40,{op:on(i),sc:back(on(i))}); });
    s+=g(S.fade(0,0,0.4),txt(960,230,'এত আলো আসে কোথা থেকে?',84,{c:'#fff'}));
  }
  if(day>0){ // daytime: the Sun, a tin-roofed house, a pond. Sun on the right; all rays parallel; shadow away from the Sun.
    const SUN_ELEV=38*Math.PI/180;             // elevation of the Sun
    let d=sky('#8fcbff','#e6f4ff')+`<rect y="760" width="1920" height="320" fill="#c9a66b"/><rect y="760" width="1920" height="10" fill="#b08f58"/>`;
    const sy=260+420*(1-ease(S.P(2,0,0.6)));
    d+=sun(1560,sy,105,t);
    // house (left). Shadow on the ground, on the side away from the Sun: length = height / tan(elevation)
    const hx=250,hw=380,hh=230, top=hh*1.55, L=top/Math.tan(SUN_ELEV);
    d+=`<polygon points="${hx-40},762 ${hx+hw+40},762 ${hx+hw+40-L*0.35},800 ${hx-40-L},800" fill="#000" opacity=".22"/>`;
    d+=tinHouse(hx,760,hw,hh);
    d+=`<rect x="${hx+hw-26}" y="${760-hh}" width="26" height="${hh}" fill="#fff" opacity=".28"/>`;       // sunlit edge of the wall (faces the Sun)
    // pond with glitter
    d+=`<ellipse cx="1180" cy="870" rx="430" ry="78" fill="#3f8fc4"/><ellipse cx="1180" cy="862" rx="430" ry="72" fill="#5db0e0"/><ellipse cx="1180" cy="930" rx="430" ry="12" fill="#3f8fc4" opacity="0"/>`;
    for(let i=0;i<16;i++){ const px=860+((i*137)%640), py=830+((i*53)%62); d+=sparkle(px,py,10+6*Math.sin(t*5+i*1.7),0.35+0.5*Math.sin(t*4+i*2.1)); }
    // parallel sunrays coming down from the right
    const dxr=-Math.cos(SUN_ELEV), dyr=Math.sin(SUN_ELEV);
    for(let i=0;i<5;i++){ const x0=1320-i*230+120, y0=150; const len=560; const ph=(t*0.35+i*0.2)%1; const a=ph*len*0.75, b=a+len*0.25;
      d+=`<line x1="${F(x0+dxr*a)}" y1="${F(y0+dyr*a)}" x2="${F(x0+dxr*b)}" y2="${F(y0+dyr*b)}" stroke="#fff3b0" stroke-width="10" stroke-linecap="round" opacity="${(0.75*Math.sin(ph*Math.PI)*S.P(2,0.5,0.8)).toFixed(2)}"/>`; }
    s+=g(day,d);
    u+=uiPill('সকল আলোর উৎস: সূর্য',820,190,S.P(2,0.6,0.8),64);
  }
  return {svg:s,ui:u};
},{fadeOut:true});
