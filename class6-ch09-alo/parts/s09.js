/* Scene 9: recap, "ভেবে বলো", and the teaser for the next video (how we see: textbook Fig 9.2 arrangement). */

function rowsUI(items,t,S,first,top=270,gap=180){ let u=''; items.forEach(([n,x],i)=>{ const t0=S.A(first+i); if(t>=t0){ const q=back(pr(t,t0,t0+0.4)); u+=`<div class="abs rrow" style="top:${top+i*gap}px;transform:scale(${q.toFixed(3)})"><div class="num">${n}</div><div>${x}</div></div>`; } }); return u; }

/* ---- s09_p01 : what we learned ---- */
PART('s09_p01',SEG('s09_p01'),(t,S)=>{
  let u=banner('আজ যা শিখলাম',S.P(0,0.05,0.35),1,80);
  u+=rowsUI([['১','আলো এক প্রকার শক্তি। সেকেন্ডে প্রায় ৩ লক্ষ কিলোমিটার চলে।'],['২','আলো বাঁকা পথে চলে না, সরলরেখায় চলে।'],['৩','আলোর সরলরৈখিক পথের নাম আলোকরশ্মি।']],t,S,1);
  return {svg:navyRays(t),ui:u};
},{fadeIn:true});

/* ---- s09_p02 : think and tell ---- */
PART('s09_p02',SEG('s09_p02'),(t,S)=>{
  let u=banner('ভেবে বলো',S.P(0,0.05,0.35),1,80);
  u+=rowsUI([['১','আলো এক সেকেন্ডে প্রায় কত কিলোমিটার যায়?'],['২','একটা কার্ড সরালে শিখা আর দেখা যায় না কেন?'],['৩','আলোর সরলরৈখিক পথকে কী বলে?']],t,S,1);
  u+=uiPill('উত্তর কমেন্টে লিখে ফেলো!',960,815,S.P(4,0.05,0.3),50);
  return {svg:navyRays(t),ui:u};
});

/* ---- s09_p03 : puzzle that leads to the next video ---- */
function cricketBall(x,y,r){ return `<defs><radialGradient id="cb" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e2574c"/><stop offset=".6" stop-color="#b3261e"/><stop offset="1" stop-color="#7a120d"/></radialGradient></defs><ellipse cx="${x}" cy="${y+r}" rx="${r*0.9}" ry="${r*0.16}" fill="#000" opacity=".25"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#cb)"/>`
  +`<g transform="rotate(18 ${x} ${y})"><path d="M${x-7} ${y-r+3} Q${x-16} ${y} ${x-7} ${y+r-3}" fill="none" stroke="#f3e9d2" stroke-width="3" stroke-dasharray="5 4"/><path d="M${x+7} ${y-r+3} Q${x-2} ${y} ${x+7} ${y+r-3}" fill="none" stroke="#f3e9d2" stroke-width="3" stroke-dasharray="5 4"/></g><ellipse cx="${x-r*0.38}" cy="${y-r*0.42}" rx="${r*0.2}" ry="${r*0.12}" fill="#fff" opacity=".45"/>`; }

PART('s09_p03',SEG('s09_p03'),(t,S)=>{
  let u='';
  const tb={x1:560,x2:1300,top:660,floor:880}, bx=930, by=tb.top-46, br=46, ex=1480, ey=420;
  const lampOff=ease(S.P(1,0,0.25)), lampOn=t>=S.A(2)+0.3?1:0;
  const bulbLit=(1-lampOff)+lampOn;
  let s=`<rect width="1920" height="1080" fill="#ead9b4"/><rect width="1920" height="300" fill="#f0e3c8"/><rect y="${tb.floor}" width="1920" height="200" fill="#b9966a"/><rect y="${tb.floor}" width="1920" height="10" fill="#8f6e45"/>`;
  s+=`<rect x="${tb.x1+40}" y="${tb.top+26}" width="40" height="${tb.floor-tb.top-26}" fill="#8a5a30"/><rect x="${tb.x2-80}" y="${tb.top+26}" width="40" height="${tb.floor-tb.top-26}" fill="#8a5a30"/><rect x="${tb.x1+30}" y="${tb.top+26}" width="${tb.x2-tb.x1-60}" height="34" fill="#9a683a"/><rect x="${tb.x1}" y="${tb.top}" width="${tb.x2-tb.x1}" height="28" rx="6" fill="#c08a52"/>`;
  s+=cricketBall(bx,by,br);
  // bulb with a shade, hanging above the table (as in the textbook figure)
  s+=hangingBulb(bx,0,bulbLit>0.5?1:0,t)+`<path d="M${bx-120} 190 Q${bx} 60 ${bx+120} 190 Z" fill="#3d7a6a"/><rect x="${bx-124}" y="184" width="248" height="12" rx="6" fill="#2c5a4e"/>`;
  // darkness: total when the lamp is off; a pool of light under the lamp when it is on
  if(lampOff>0&&!lampOn) s+=darkAll(0.965*lampOff);
  if(lampOn) s+=darkPool(bx,330,1250,0.75,'t');
  // the eye (always drawn; in the dark it cannot see the ball)
  s+=eye(ex,ey,0.95,-24,12,1);
  if(t>=S.A(1)&&!lampOn) s+=seeBubble(ex+150,ey-170,0,ease(S.P(1,0.5,0.8)),t);
  if(lampOn&&t<S.A(4)) s+=tick(ex+110,ey-90,28,pr(t,S.A(2)+0.5,S.A(2)+0.9));
  // puzzle marks
  if(t>=S.A(3)&&t<S.A(5)){ const bob=10*Math.sin(t*4); s+=txt(bx,by-90+bob,'?',110,{c:'#FFC83D',op:S.P(3,0.1,0.3)});
    s+=pill(bx-10,tb.top+100,'বলের নিজের আলো নেই',38,{op:S.P(3,0.2,0.4)*(1-S.P(4,0,0.2)),sc:back(S.P(3,0.2,0.4))}); }
  if(t>=S.A(4)&&t<S.A(5)){ const a=[ex-90,ey+20], b=[bx+br+14,by-18];
    const p1=ease(S.P(4,0.02,0.4)), p2=ease(S.P(4,0.5,0.9));
    const arr=(p,from,to,c,off)=>{ if(p<=0) return ''; const x=from[0]+(to[0]-from[0])*p, y=from[1]+(to[1]-from[1])*p, an=Math.atan2(to[1]-from[1],to[0]-from[0])*180/Math.PI;
      return `<g transform="translate(0,${off})"><line x1="${F(from[0])}" y1="${F(from[1])}" x2="${F(x)}" y2="${F(y)}" stroke="${c}" stroke-width="8" stroke-dasharray="18 14" stroke-linecap="round"/><polygon points="6,0 -30,-17 -30,17" fill="${c}" transform="translate(${F(x)},${F(y)}) rotate(${F(an)})"/></g>`; };
    s+=arr(p1,a,b,'#7fd1ff',-26)+arr(p2,b,a,'#FFC83D',26);
    s+=txt((a[0]+b[0])/2-40,(a[1]+b[1])/2-70,'?',80,{c:'#7fd1ff',op:S.P(4,0.3,0.4)})+txt((a[0]+b[0])/2+60,(a[1]+b[1])/2+110,'?',80,{c:'#FFC83D',op:S.P(4,0.8,0.9)}); }
  u+=banner('যাওয়ার আগে একটা ধাঁধা',S.P(0,0.05,0.5),1-S.P(1,0,0.2),300);
  // next-video card
  if(t>=S.A(5)){ const k=ease(S.P(5,0,0.2)); s+=`<g opacity="${k.toFixed(2)}">${navyRays(t,0.07)}</g>`;
    u+=`<div style="opacity:${k.toFixed(2)}">`+banner('পরের ভিডিও',S.P(5,0.08,0.3),1,190)+card('আমরা কীভাবে দেখি?',S.P(5,0.2,0.42),1,400,1100,110)
      +`<div class="abs trow" style="top:690px;opacity:${S.P(5,0.4,0.55).toFixed(2)}"><div class="tchip">ষষ্ঠ শ্রেণি</div><div class="tchip">বিজ্ঞান</div><div class="tchip o">অধ্যায় ৯: আলোর ঘটনা</div></div></div>`; }
  return {svg:s,ui:u,noChip:t>=S.A(5)+0.3};
},{fadeOut:true});
