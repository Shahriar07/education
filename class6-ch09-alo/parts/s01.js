/* Scene 1: hook (load-shedding, candle) and title card. Side view of a study table. */

const R1={floor:880, top:640, x1:420, x2:1500, candleX:1180, candleH:150, bulb:[820,70]};
const R1_FLAME_Y=R1.top-R1.candleH-45;      // centre of the candle flame on screen

function hangingBulb(x,y,on,t){ // y = ceiling. Ordinary filament bulb on a wire.
  const L=150, by=y+L;
  let s=`<line x1="${x}" y1="${y}" x2="${x}" y2="${by-34}" stroke="#333" stroke-width="5"/><rect x="${x-17}" y="${by-40}" width="34" height="34" rx="5" fill="#3b3b3b"/>`;
  if(on>0) s+=`<defs><radialGradient id="bg1"><stop offset="0" stop-color="#fff3b0" stop-opacity="${(0.75*on).toFixed(2)}"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${by+34}" r="${(250+6*Math.sin(t*9)).toFixed(1)}" fill="url(#bg1)"/>`;
  s+=`<path d="M${x-15} ${by-8} C${x-52} ${by+22} ${x-46} ${by+78} ${x} ${by+80} C${x+46} ${by+78} ${x+52} ${by+22} ${x+15} ${by-8} Z" fill="${on>0.5?'#fff2a8':'#d9dde2'}" stroke="${on>0.5?'#e8b93a':'#9aa3ad'}" stroke-width="4"/>`;
  s+=`<path d="M${x-9} ${by+2} L${x-5} ${by+36} L${x+5} ${by+36} L${x+9} ${by+2}" fill="none" stroke="${on>0.5?'#ff9a2e':'#7a828c'}" stroke-width="3"/><ellipse cx="${x-16}" cy="${by+34}" rx="7" ry="16" fill="#fff" opacity=".55"/>`;
  return s; }

function studyRoom(t,o={}){ const {bulbOn=1,candle=0,lit=0}=o; const r=R1;
  let s=`<rect width="1920" height="1080" fill="#ead9b4"/><rect width="1920" height="300" fill="#f0e3c8"/><rect y="${r.floor}" width="1920" height="200" fill="#b9966a"/><rect y="${r.floor}" width="1920" height="10" fill="#8f6e45"/>`;
  s+=hangingBulb(r.bulb[0],0,bulbOn,t);
  // clay water pot on the floor
  s+=`<ellipse cx="1700" cy="${r.floor+4}" rx="96" ry="14" fill="#000" opacity=".15"/>`+kolshi(1700,r.floor,0.8);
  // table (side view)
  s+=`<rect x="${r.x1+40}" y="${r.top+26}" width="40" height="${r.floor-r.top-26}" fill="#8a5a30"/><rect x="${r.x2-80}" y="${r.top+26}" width="40" height="${r.floor-r.top-26}" fill="#8a5a30"/>`;
  s+=`<rect x="${r.x1+30}" y="${r.top+26}" width="${r.x2-r.x1-60}" height="34" fill="#9a683a"/><rect x="${r.x1}" y="${r.top}" width="${r.x2-r.x1}" height="28" rx="6" fill="#c08a52"/><rect x="${r.x1}" y="${r.top}" width="${r.x2-r.x1}" height="8" rx="4" fill="#d3a067"/>`;
  // pile of books and an open exercise book with a pencil
  const bx=560, by=r.top;
  [['#2a6f97',230,34],['#bc4749',200,30],['#588157',214,32]].forEach(([c,w,h],i)=>{ const y=by-[34,64,96][i]; s+=`<rect x="${bx+(i%2)*14}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c}"/><rect x="${bx+(i%2)*14+6}" y="${y+5}" width="${w-12}" height="${h-10}" fill="#f6f1e4"/><rect x="${bx+(i%2)*14}" y="${y}" width="22" height="${h}" rx="5" fill="${c}"/>`; });
  s+=`<path d="M860 ${by-6} Q925 ${by-30} 990 ${by-6} Q1055 ${by-30} 1120 ${by-6} L1120 ${by} L860 ${by} Z" fill="#fdfaf0" stroke="#b9b29b" stroke-width="3"/><line x1="990" y1="${by-6}" x2="990" y2="${by}" stroke="#b9b29b" stroke-width="3"/>`;
  for(let i=0;i<3;i++) s+=`<path d="M${880+i*4} ${by-10-i*1.5} Q925 ${by-28} 975 ${by-9}" fill="none" stroke="#9db4c0" stroke-width="2" opacity=".0"/>`;
  s+=`<g transform="rotate(-9 1000 ${by-22})"><rect x="930" y="${by-30}" width="150" height="11" rx="3" fill="#f2b632"/><polygon points="1080,${by-30} 1100,${by-24.5} 1080,${by-19}" fill="#e8caa0"/><polygon points="1093,${by-26.5} 1100,${by-24.5} 1093,${by-22.5}" fill="#333"/><rect x="930" y="${by-30}" width="16" height="11" rx="3" fill="#e76f51"/></g>`;
  if(candle>0) s+=`<g opacity="${cl(candle).toFixed(2)}">${candleG(r.candleX,r.top,r.candleH,lit,t,'r1',230)}</g>`;
  return s; }

function handMatch(hx,hy,lit,t,o=1){ // (hx,hy) = tip of the match. A single hand and forearm, entering from the right.
  const ax=hx+44, ay=hy+18;
  let s=`<g opacity="${o}"><path d="M2000 ${ay+170} Q${ax+270} ${ay+110} ${ax+66} ${ay+24}" stroke="#2a9d8f" stroke-width="84" fill="none" stroke-linecap="round"/><path d="M${ax+112} ${ay+46} L${ax+38} ${ay+14}" stroke="#c98d5e" stroke-width="58" fill="none" stroke-linecap="round"/>`;
  s+=`<path d="M${ax+50} ${ay-14} q-26 -4 -34 12 q-4 12 10 16" fill="#c98d5e" stroke="#a9744a" stroke-width="3"/><ellipse cx="${ax+26}" cy="${ay+26}" rx="20" ry="13" fill="#b9804f"/>`;
  s+=`<line x1="${ax+34}" y1="${ay+10}" x2="${hx+4}" y2="${hy+2}" stroke="#e3c08f" stroke-width="7" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="7" fill="${lit>0?'#3a2a20':'#b23a2e'}"/>`;
  if(lit>0) s+=`<circle cx="${hx}" cy="${hy-16}" r="${F(70*lit)}" fill="#ffb347" opacity=".25"/>`+flame(hx,hy-2,0.55*lit,t);
  return s+'</g>'; }

/* ---- s01_p01 : load-shedding, then a candle is lit ---- */
PART('s01_p01',SEG('s01_p01'),(t,S)=>{
  const r=R1; let u='';
  const off=t>=S.A(1)+0.25;                         // power goes at "ফট!"
  const candleOn=t>=S.A(4)+ (S.E(4)-S.A(4))*0.6;     // wick catches at 60% of "দেশলাই জ্বাললে"
  const lit=candleOn?ease(pr(t,S.A(4)+(S.E(4)-S.A(4))*0.6,S.E(4))):0;
  let s=studyRoom(t,{bulbOn:off?0:1,candle:t>=S.A(3)?1:0,lit});
  // hand: gropes along the table in seg 3, strikes and lights in seg 4, leaves in seg 5
  const wickX=r.candleX, wickY=r.top-r.candleH-18;
  let hx,hy,hOp=0,mLit=0;
  if(t>=S.A(3)&&t<S.E(5)){
    const g=S.P(3,0,1); const grope=wickX+420*(1-ease(g))+26*Math.sin(g*18)*(1-g);
    hx=grope+60; hy=wickY+70-70*ease(S.P(4,0.15,0.55)); if(t>=S.A(4)) hx=wickX+60-52*ease(S.P(4,0.15,0.55));
    mLit=ease(S.P(4,0.05,0.2)); const leave=ease(S.P(5,0,0.35)); hx+=1300*leave; hy+=160*leave; hOp=leave<1?1:0; }
  // darkness: total after the power cut, a small pool at the match, then the candle lights the room
  let dark='';
  if(off){
    if(t<S.A(4)) dark=darkAll(0.965*pr(t,S.A(1)+0.25,S.A(1)+0.45));
    else { const grow=ease(S.P(5,0,0.8)); const cx=mLit>0&&!candleOn?hx:wickX, cy=candleOn?R1_FLAME_Y:hy;
      const rad=260*mLit+ (candleOn?260*lit:0) + 1500*grow; dark=darkPool(cx,cy,Math.max(60,rad),1-0.5*grow,'a'); } }
  s+=dark;
  // things that glow are drawn above the darkness
  if(off&&t>=S.A(3)&&t<S.A(4)) s+=`<g opacity="${(0.16*S.fin(3,0.8)).toFixed(3)}">${handMatch(hx,hy,0,t)}</g>`;
  if(t>=S.A(4)&&hOp>0) s+=handMatch(hx,hy,mLit,t);
  if(candleOn) s+=`<g>${flame(wickX,wickY+2,lit,t)}</g>`;
  // floating question marks in the dark
  if(t>=S.A(2)&&t<S.A(4)) for(let i=0;i<4;i++){ const ph=(t*0.5+i*0.27)%1; s+=txt(520+i*300,620-ph*160,'?',90,{c:'#5b6ea8',op:0.55*Math.sin(ph*Math.PI)}); }
  if(t>=S.A(1)+0.2&&t<S.A(1)+1.6){ const f0=S.A(1)+0.2; u+=`<div class="abs fot" style="left:0;transform:scale(${back(pr(t,f0,f0+0.3)).toFixed(3)}) rotate(-6deg);opacity:${(1-pr(t,f0+1.0,f0+1.4)).toFixed(2)}">ফট!</div>`; }
  if(t>=S.A(4)+1.0&&t<S.A(4)+2.2){ const f0=S.A(4)+1.0; u+=`<div class="abs fot" style="left:-420px;top:120px;font-size:150px;transform:scale(${back(pr(t,f0,f0+0.3)).toFixed(3)}) rotate(5deg);opacity:${(1-pr(t,f0+0.8,f0+1.2)).toFixed(2)}">ফস!</div>`; }
  return {svg:s,ui:u};
},{fadeIn:true});

/* ---- s01_p02 : the puzzle: by which path does the light reach the eye? ---- */
PART('s01_p02',SEG('s01_p02'),(t,S)=>{
  const r=R1; let u='';
  let s=studyRoom(t,{bulbOn:0,candle:1,lit:1});
  s+=darkPool(r.candleX,R1_FLAME_Y,1500,0.5,'b');
  s+=flame(r.candleX,r.top-r.candleH-16,1,t);
  const ex=520, ey=R1_FLAME_Y, fx=r.candleX-30;
  s+=eye(ex,ey,0.95*back(S.P(0,0.5,0.8)),26,0,cl(S.P(0,0.5,0.8)*3));
  s+=seeBubble(ex-110,ey-190,S.P(1,0.1,0.5)*(1-S.P(3,0,0.2)),0,t);
  // a spark of light leaves the flame, disappears into a "?" cloud and comes out at the eye
  const cx0=700, cx1=1010;
  if(t>=S.A(2)&&t<S.A(3)){ const p=(S.P(2,0,1)*1.6)%1; const x=fx+(ex+80-fx)*p; if(x>cx1||x<cx0) s+=`<circle cx="${F(x)}" cy="${ey}" r="26" fill="#FFC83D" opacity=".35"/><circle cx="${F(x)}" cy="${ey}" r="11" fill="#fff6c2"/>`; }
  if(t>=S.A(2)&&t<S.A(3)){ const o=S.fade(2,2,0.35); s+=`<g opacity="${o.toFixed(2)}"><rect x="${cx0}" y="${ey-70}" width="${cx1-cx0}" height="140" rx="70" fill="#22305e"/>${txt((cx0+cx1)/2,ey+34,'?',100,{c:Y})}</g>`; }
  // three candidate paths
  if(t>=S.A(3)){
    const a=[fx,ey], b=[ex+90,ey];
    s+=dreamPath([a,b],S.P(3,0.02,0.3),{c:'#ffffff',w:7});
    const zig=[a]; for(let i=1;i<8;i++) zig.push([fx+(b[0]-fx)*i/8, ey+(i%2?-95:95)]); zig.push(b);
    s+=dreamPath(zig,S.P(3,0.3,0.62),{c:'#7fd1ff',w:7});
    s+=dreamPath([a,[fx-150,ey-250],[(fx+b[0])/2,ey-330],[b[0]+140,ey-250],b],S.P(3,0.6,0.95),{c:'#ff9db0',w:7});
    [['?',860,ey-22,0.3,'#fff'],['?',770,ey+150,0.62,'#7fd1ff'],['?',850,ey-350,0.95,'#ff9db0']].forEach(([q,x,y,at,c])=>{ const p=S.P(3,at,at+0.05); if(p>0) s+=txt(x,y,q,70,{c,op:p}); });
  }
  u+=card('আলো কোন পথে চোখে আসে?',S.P(4,0,0.25),1,150,1100,76);
  return {svg:s,ui:u};
});

/* ---- s01_p03 : title card + "আজ যা জানব" ---- */
PART('s01_p03',SEG('s01_p03'),(t,S)=>{
  let s=navyRays(t)+`<rect y="540" width="1920" height="540" fill="${NAVY}" opacity=".75"/>`;
  const k=ease(pr(t,0,0.6)); s+=`<rect width="1920" height="1080" fill="${Y}" opacity="${(1-k).toFixed(3)}"/>`;
  const p=ease(S.P(1,0.35,0.85)), x0=330,x1=1590,y=535;
  if(p>0){ const hx=x0+(x1-x0)*p; s+=`<line x1="${x0}" y1="${y}" x2="${hx.toFixed(1)}" y2="${y}" stroke="${Y}" stroke-width="10" stroke-linecap="round"/><circle cx="${hx.toFixed(1)}" cy="${y}" r="${(46*(1+0.15*Math.sin(t*8))).toFixed(1)}" fill="${Y}" opacity=".22"/><circle cx="${hx.toFixed(1)}" cy="${y}" r="18" fill="#fff6c2"/><circle cx="${x0}" cy="${y}" r="14" fill="${Y}"/>`; }
  let u=`<div style="opacity:${k.toFixed(3)}"><div class="abs trow">`;
  [["ষষ্ঠ শ্রেণি","",0.3],["বিজ্ঞান","",0.5],["অধ্যায় ৯: আলোর ঘটনা","o",0.7]].forEach(([x,c,d])=>{ const q=t>=d?back(pr(t,d,d+0.35)):0; u+=`<div class="tchip ${c}" style="transform:scale(${q.toFixed(3)})">${x}</div>`; });
  u+=`</div>`;
  const tp=ease(S.P(1,0,0.35));
  u+=`<div class="abs title" style="opacity:${tp.toFixed(2)};transform:translateY(${((1-tp)*40).toFixed(1)}px)">আলো কী ও <b>কীভাবে চলে</b></div>`;
  u+=`<div class="abs learn" style="opacity:${ease(S.P(2,0,0.3)).toFixed(2)}">আজ যা জানব</div><div class="abs cards">`;
  [["১","আলো কী,<br>কত জোরে ছোটে",3],["২","আলো কোন পথে<br>চলে",4],["৩","সেই পথের<br>নাম কী",5]].forEach(([n,x,i])=>{ const t0=S.A(i); const q=t>=t0?back(pr(t,t0,t0+0.4)):0; u+=`<div class="card" style="transform:scale(${q.toFixed(3)});opacity:${t>=t0?1:0}"><div class="num">${n}</div><div>${x}</div></div>`; });
  u+=`</div></div>`;
  return {svg:s,ui:u,noChip:true};
},{fadeOut:true});
