/* Textbook Fig 9.1 (three cards, candle, eye): shared drawing used by scenes 5, 6 and 8.
   Geometry is computed from physical constants (cm); screen positions come only from proj(). */

// ---- physical constants (cm) ----
const K=15;                       // px per cm
const X0=520, Y0=700;             // screen position of world origin (table top, centre line)
const OBL_X=0.35, OBL_Y=0.22;     // oblique (raised three-quarter) view, as in the textbook figure
const CARD_W=14, CARD_H=18, CARD_T=0.4;     // notebook-cover cards (z width, height, thickness)
const HOLE_R=1.1;                 // hole radius (drawn larger than a needle hole so it is visible)
const HH=12;                      // height of flame centre = height of all three holes (pierced together)
const CARD_X=[15,30,45];          // positions of cards along the table
const CANDLE_X=60, EYE_X=-12;     // flame x, eye x
const TBL={x0:-24,x1:74,z0:-12,z1:12};
const ZSTART=[4,-3,5];            // sideways offsets (cm) of the cards before they are lined up
const proj=(x,y,z)=>[X0+K*(x+OBL_X*z), Y0-K*(y+OBL_Y*z)];
const polyP=(pts)=>pts.map(p=>proj(...p)).map(q=>F(q[0])+','+F(q[1])).join(' ');
const RAY_Y=Y0-K*HH, SX=x=>X0+K*x;

// Light is blocked by a card when the ray (z=0) does not pass through its hole: |z offset| > hole radius.
function rayEnd(zoff){ for(let i=2;i>=0;i--){ if(Math.abs(zoff[i])>HOLE_R) return CARD_X[i]+CARD_T; } return EYE_X; }

function drawTable(){
  const t=TBL; let s='';
  s+=`<defs><linearGradient id="wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c58d55"/><stop offset=".5" stop-color="#b8804b"/><stop offset="1" stop-color="#c58d55"/></linearGradient></defs>`;
  // legs (behind first, then front). Only the visible faces (-x and -z) are drawn.
  const legs=[[t.x0+3,t.z1-3],[t.x1-7,t.z1-3],[t.x0+3,t.z0+3],[t.x1-7,t.z0+3]];
  legs.forEach(([lx,lz])=>{ const a=proj(lx,-3,lz), b=proj(lx+4,-3,lz);
    s+=`<polygon points="${polyP([[lx+4,-3,lz],[lx+4,-3,lz+4],[lx+4,-60,lz+4],[lx+4,-60,lz]])}" fill="#7d5128"/>`;
    s+=`<rect x="${F(a[0])}" y="${F(a[1])}" width="${F(K*4)}" height="${F(1080-a[1])}" fill="#946134"/>`; });
  // front apron, left apron, top
  s+=`<polygon points="${polyP([[t.x0,0,t.z0],[t.x1,0,t.z0],[t.x1,-3,t.z0],[t.x0,-3,t.z0]])}" fill="#946134"/>`;
  s+=`<polygon points="${polyP([[t.x1,0,t.z0],[t.x1,0,t.z1],[t.x1,-3,t.z1],[t.x1,-3,t.z0]])}" fill="#7d5128"/>`;
  s+=`<polygon points="${polyP([[t.x0,0,t.z0],[t.x1,0,t.z0],[t.x1,0,t.z1],[t.x0,0,t.z1]])}" fill="url(#wood)" stroke="#8a5a30" stroke-width="3"/>`;
  for(let i=1;i<6;i++){ const z=t.z0+(t.z1-t.z0)*i/6; const a=proj(t.x0,0,z), b=proj(t.x1,0,z); s+=`<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="#a9733f" stroke-width="2" opacity=".6"/>`; }
  return s;
}

function drawCard(i,zc,op,hole){ // hole position fixed: centre of card at height HH
  if(op<=0) return '';
  const x=CARD_X[i], zl=zc-CARD_W/2, zr=zc+CARD_W/2;
  // soft contact shadow on the table (light-independent, directly below)
  let s=`<g opacity="${op.toFixed(3)}"><polygon points="${polyP([[x,0,zl],[x+CARD_T,0,zl],[x+CARD_T,0,zr],[x,0,zr]])}" fill="#000" opacity=".18"/>`;
  const outer=[[x,0,zl],[x,0,zr],[x,CARD_H,zr],[x,CARD_H,zl]].map(p=>proj(...p));
  let d='M'+outer.map(q=>F(q[0])+' '+F(q[1])).join('L')+'Z';
  let h=''; for(let a=0;a<24;a++){ const th=a/24*2*Math.PI; const q=proj(x,HH+HOLE_R*Math.cos(th),zc+HOLE_R*Math.sin(th)); h+=(a?'L':'M')+F(q[0])+' '+F(q[1]); }
  d+=h+'Z';
  // paper thickness: strip on the -z... visible top edge
  s+=`<polygon points="${polyP([[x,CARD_H,zl],[x,CARD_H,zr],[x+CARD_T,CARD_H,zr],[x+CARD_T,CARD_H,zl]])}" fill="#cfc7b0"/>`;
  s+=`<path d="${d}" fill="#f6f1e4" fill-rule="evenodd" stroke="#8a8068" stroke-width="3" stroke-linejoin="round"/>`;
  // edge ring of the hole
  s+=`<path d="${h}Z" fill="none" stroke="#6e6650" stroke-width="2"/></g>`;
  return s;
}

function drawRayPath(front,endX,t,op=1){ // light travels from flame (x=CANDLE_X) towards the eye; front = current x of its head
  const xe=Math.max(front,endX); if(xe>=CANDLE_X) return '';
  const a=SX(CANDLE_X), b=SX(xe);
  let s=`<g opacity="${op}"><line x1="${F(a)}" y1="${F(RAY_Y)}" x2="${F(b)}" y2="${F(RAY_Y)}" stroke="#ffd34d" stroke-width="26" stroke-linecap="round" opacity=".25"/>`
       +`<line x1="${F(a)}" y1="${F(RAY_Y)}" x2="${F(b)}" y2="${F(RAY_Y)}" stroke="#FFC83D" stroke-width="9" stroke-linecap="round"/>`
       +`<line x1="${F(a)}" y1="${F(RAY_Y)}" x2="${F(b)}" y2="${F(RAY_Y)}" stroke="#fff6c2" stroke-width="3" stroke-linecap="round"/>`;
  if(front>endX) s+=`<circle cx="${F(b)}" cy="${F(RAY_Y)}" r="30" fill="#FFC83D" opacity=".3"/><circle cx="${F(b)}" cy="${F(RAY_Y)}" r="12" fill="#fff6c2"/>`;
  return s+'</g>';
}
function rayFront(xa,xb,front,endX,op=1){ // the part of the ray seen in front of a card (left of its hole)
  const hi=Math.min(xa,CANDLE_X), lo=Math.max(xb,Math.max(front,endX)); if(lo>=hi) return '';
  return `<g opacity="${op}"><line x1="${F(SX(hi))}" y1="${F(RAY_Y)}" x2="${F(SX(lo))}" y2="${F(RAY_Y)}" stroke="#FFC83D" stroke-width="9" stroke-linecap="round"/><line x1="${F(SX(hi))}" y1="${F(RAY_Y)}" x2="${F(SX(lo))}" y2="${F(RAY_Y)}" stroke="#fff6c2" stroke-width="3" stroke-linecap="round"/></g>`;
}

/* One frame of the whole figure. st: state object (all progress values 0..1) */
function drawFig(t,st){
  const bgc=`<rect width="1920" height="1080" fill="#e9d9b5"/><rect y="0" width="1920" height="330" fill="#efe2c6"/>`;
  const ID=st.id||''; let s=(st.noBg?'':bgc)+drawTable();
  // candle (screen position comes from the world position of the flame base)
  const cb=proj(CANDLE_X,0,0), slide=(1-ease(st.candleIn||0))*320, lit=st.flame||0;
  const candleOp=cl(st.candleIn*3);
  const candleSvg=(x,yb,h,l)=>{ let c=`<ellipse cx="${x}" cy="${yb}" rx="60" ry="14" fill="#b5651d"/><ellipse cx="${x}" cy="${yb-5}" rx="48" ry="10" fill="#d98a3a"/><rect x="${x-20}" y="${yb-h}" width="40" height="${h-4}" rx="6" fill="#fbf7ea" stroke="#d9d2bb" stroke-width="2"/><line x1="${x}" y1="${yb-h}" x2="${x}" y2="${yb-h-16}" stroke="#333" stroke-width="4"/>`;
    if(l>0){ c=`<defs><radialGradient id="glow${ID}"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${yb-h-45}" r="${190*l}" fill="url(#glow${ID})"/>`+c+flame(x,yb-h-16,l,t); } return c; };
  if(candleOp>0){ s+=`<g opacity="${candleOp.toFixed(3)}" transform="translate(${F(slide)},0)">${candleSvg(cb[0],cb[1],137,lit)}</g>`; }
  // ray behind the cards
  const front=st.rayFront===undefined?CANDLE_X:st.rayFront;
  const endX=rayEnd(st.zoff);
  if(st.rayOn) s+=drawRayPath(front,endX,t);
  let lineSvg='';
  // guide line / thread
  if(st.guide>0){ const a=SX(CANDLE_X), b=SX(CANDLE_X-(CANDLE_X-EYE_X)*ease(st.guide));
    lineSvg+=`<line x1="${F(a)}" y1="${F(RAY_Y)}" x2="${F(b)}" y2="${F(RAY_Y)}" stroke="#4a6fa5" stroke-width="3" stroke-dasharray="10 9" opacity=".75"/>`; }
  if(st.thread>0){ const a=SX(CANDLE_X), b=SX(CANDLE_X-(CANDLE_X-EYE_X)*ease(st.thread));
    lineSvg+=`<line x1="${F(a)}" y1="${F(RAY_Y)}" x2="${F(b)}" y2="${F(RAY_Y)}" stroke="#7a4b24" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 11"/>`; }
  s+=lineSvg;
  // cards, far to near: the viewer looks along -x, so the card nearest the eye (x=15) is the farthest
  for(let i=0;i<3;i++){ s+=drawCard(i,st.zc[i],cl(st.cardIn[i]*3)); }
  // On the candle side of a card (x > card x) the ray / thread is in front of the card: redraw it there, clipped to the card's right half
  { let cr=''; for(let i=0;i<3;i++){ const w=OBL_X*K*(st.zc[i]+CARD_W/2); if(st.cardIn[i]>0.3&&w>0) cr+=`<rect x="${F(SX(CARD_X[i]))}" y="${F(RAY_Y-20)}" width="${F(w)}" height="40"/>`; }
    s+=`<clipPath id="fclip${ID}">${cr}</clipPath><g clip-path="url(#fclip${ID})">`+(st.rayOn?drawRayPath(front,endX,t):'')+lineSvg+`</g>`; }
  // eye
  if(st.eyeIn>0){ const e=proj(EYE_X,HH,0); s+=eye(e[0],e[1],0.95*back(st.eyeIn),26,0,cl(st.eyeIn*3)); }
  // blocked-light flash at the card
  if(st.rayOn && endX>EYE_X && front<=endX+0.01){ const ci=CARD_X.findIndex(x=>Math.abs(x+CARD_T-endX)<1e-6); const zc=st.zc[ci];
    const q=[SX(endX),RAY_Y]; // the ray ends on the candle-side face of the blocking card
    const pls=1+0.25*Math.sin(t*14); s+=`<circle cx="${F(q[0])}" cy="${F(RAY_Y)}" r="${F(26*pls)}" fill="#FFC83D" opacity=".35"/><circle cx="${F(q[0])}" cy="${F(RAY_Y)}" r="10" fill="#fff6c2"/>`; }
  // pulses around the holes
  if(st.pulse>0){ for(let i=0;i<3;i++){ const a=pr(st.pulse,i*0.18,i*0.18+0.5); if(a<=0||a>=1) continue; const q=proj(CARD_X[i],HH,st.zc[i]);
      s+=`<ellipse cx="${F(q[0])}" cy="${F(q[1])}" rx="${F(14+40*a)}" ry="${F(14+40*a)}" fill="none" stroke="#FFC83D" stroke-width="6" opacity="${(1-a).toFixed(2)}"/>`; } }
  // labels
  const lab=(txtS,x,y,p)=>p>0?pill(x,y,txtS,34,{sc:back(p),op:cl(p*3)}):'';
  for(let i=0;i<3;i++){ const q=proj(CARD_X[i],CARD_H,st.zc[i]); s+=lab('কার্ড '+BN(i+1),q[0]+10,q[1]-52,(st.lblCard||[0,0,0])[i]); }
  s+=lab('ছিদ্র',proj(CARD_X[0],HH,st.zc[0])[0]+0,proj(CARD_X[0],HH,st.zc[0])[1]+110,st.lblHole||0);
  s+=lab('মোমবাতি',proj(CANDLE_X,0,0)[0],proj(CANDLE_X,0,0)[1]+120,st.lblCandle||0);
  s+=lab('চোখ',proj(EYE_X,HH,0)[0],proj(EYE_X,HH,0)[1]+90,st.lblEye||0);
  // "what the eye sees" bubble
  if((st.seen||0)>0||(st.unseen||0)>0){ const bx=250, by=345; const o=Math.max(st.seen||0,st.unseen||0);
    s+=`<g opacity="${cl(o*2).toFixed(2)}"><circle cx="${bx}" cy="${by}" r="84" fill="#fffaf0" stroke="#1a1a2e" stroke-width="6"/>`
      +`<circle cx="${bx-50}" cy="${by+105}" r="14" fill="#fffaf0" stroke="#1a1a2e" stroke-width="5"/><circle cx="${bx-20}" cy="${by+142}" r="8" fill="#fffaf0" stroke="#1a1a2e" stroke-width="4"/>`;
    if(st.seen>0) s+=`<g transform="translate(0,${F(0)})">${`<rect x="${bx-8}" y="${by+30}" width="16" height="40" rx="4" fill="#fbf7ea" stroke="#d9d2bb" stroke-width="2"/>`}${flame(bx,by+30,1.0,t)}</g>`;
    s+='</g>';
    if(st.seen>0) s+=tick(bx+95,by-70,26,st.seen);
    if(st.unseen>0) s+=cross(bx,by,40,st.unseen); }
  if(st.tick>0){ const q=proj(EYE_X+8,HH,0); s+=tick(q[0]+10,q[1]-100,30,st.tick); }
  return s;
}

const base=()=>({cardIn:[1,1,1],zc:[0,0,0],candleIn:1,flame:1,eyeIn:1,zoff:[0,0,0]});

