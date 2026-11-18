/* Scene 6: light shakes electrons - reflection, absorption, transmission */
const SLAB={x0:760,x1:1360,y0:210,y1:830};
function matScene(mode,tt,t,labels=true){ // tt = seconds since the wave was launched (negative = not yet)
  const k=2*Math.PI/150, v=420, om=k*v; const xs=60; const front=xs+v*Math.max(0,tt); const t0=(SLAB.x0-xs)/v; const hit=tt>t0;
  let s='';
  const slabFill={R:'#56657d',A:'#17171d',T:'#7fc8e8'}[mode];
  s+=`<rect x="${SLAB.x0}" y="${SLAB.y0}" width="${SLAB.x1-SLAB.x0}" height="${SLAB.y1-SLAB.y0}" rx="26" fill="${slabFill}" opacity="${mode==='T'?0.32:1}" stroke="${mode==='T'?'#bfe9fa':'#0a0f22'}" stroke-width="6"/>`;
  const cols=5,rows=5; const ax=i=>SLAB.x0+70+i*115, ay=j=>SLAB.y0+70+j*120;
  const heat=mode==='A'?cl((tt-t0)/5):0;
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){ let x=ax(i), y=ay(j);
    if(mode==='R'){ s+=`<circle cx="${x}" cy="${y}" r="27" fill="#c9d1dc" stroke="#eef2f7" stroke-width="4"/>`; }
    else if(mode==='A'){ const amp=3+15*heat*Math.exp(-i*0.35); x+=amp*Math.sin(t*23+i*3+j*5); y+=amp*Math.cos(t*19+i*4+j*2);
      const r=Math.round(90+165*heat*Math.exp(-i*0.3)), gb=Math.round(95-45*heat); s+=`<circle cx="${F(x)}" cy="${F(y)}" r="27" fill="rgb(${r},${gb},${gb+10})" stroke="#555a66" stroke-width="4"/>`; }
    else { s+=`<circle cx="${x}" cy="${y}" r="24" fill="#e9f7fd" stroke="#4c9fc4" stroke-width="4"/>`;
      const ph=k*SLAB.x0+(k/0.6)*(x-SLAB.x0)-om*tt; const reached=tt>t0+(x-SLAB.x0)/(0.6*v); const dy=reached?13*Math.sin(ph):0; const a=t*3+i+j*2;
      s+=`<circle cx="${F(x+36*Math.cos(a))}" cy="${F(y+36*Math.sin(a)+dy)}" r="10" fill="#4cc9f0" stroke="#fff" stroke-width="3"/>`; }
  }
  if(mode==='R'){ for(let i=0;i<18;i++){ const bx=SLAB.x0+60+((i*137)%480), by=SLAB.y0+60+((i*89)%500); const w=hit?0.25:1; const x=bx+38*w*Math.sin(t*0.9+i*1.3), y=by+38*w*Math.cos(t*1.1+i*2.1)+(hit?30*Math.sin(om*tt):0);
      s+=`<circle cx="${F(x)}" cy="${F(y)}" r="11" fill="#4cc9f0" stroke="#fff" stroke-width="3"/>`; } }
  // waves
  if(tt>0){
    if(mode==='R'){ const yi=430, yr=610; s+=wave(xs,Math.min(front,SLAB.x0),yi,58,x=>k*x-om*tt,{w:9});
      if(hit){ const xr=Math.max(xs,SLAB.x0-v*(tt-t0)); s+=wave(xr,SLAB.x0,yr,58,x=>k*(2*SLAB.x0-x)-om*tt,{w:9,c:'#ffe9a6'});
        if(labels){ s+=ray(420,300,700,300,1,{w:8,arrow:1})+ray(700,740,420,740,1,{w:8,arrow:1,c:'#ffe9a6'}); } } }
    else if(mode==='A'){ const y=520; s+=wave(xs,Math.min(front,SLAB.x0),y,58,x=>k*x-om*tt,{w:9});
      if(hit) s+=wave(SLAB.x0,Math.min(front,SLAB.x0+420),y,x=>58*Math.exp(-(x-SLAB.x0)/120),x=>k*x-om*tt,{w:9}); }
    else { const y=520; s+=wave(xs,Math.min(front,SLAB.x0),y,58,x=>k*x-om*tt,{w:9});
      if(hit){ const fin=SLAB.x0+0.6*v*(tt-t0); const k1=k/0.6; s+=wave(SLAB.x0,Math.min(fin,SLAB.x1),y,58,x=>k*SLAB.x0+k1*(x-SLAB.x0)-om*tt,{w:9});
        const t1=t0+(SLAB.x1-SLAB.x0)/(0.6*v); if(tt>t1){ const fo=SLAB.x1+v*(tt-t1); s+=wave(SLAB.x1,Math.min(fo,1880),y,58,x=>k*SLAB.x0+k1*(SLAB.x1-SLAB.x0)+k*(x-SLAB.x1)-om*tt,{w:9}); } } }
  }
  if(mode==='A') s+=thermo(1600,330,300,0.15+0.75*heat);
  if(labels){ s+=txt(400,170,'বাতাস',50,{c:'#9fb0d6',w:600})+txt((SLAB.x0+SLAB.x1)/2,170,{R:'স্টিল (ধাতু)',A:'কালো কাপড়',T:'কাচ'}[mode],54,{c:'#fff'}); if(mode==='T') s+=txt(1640,170,'বাতাস',50,{c:'#9fb0d6',w:600}); }
  return s;
}
function boat(x,y,rot){ return `<g transform="translate(${F(x)},${F(y)}) rotate(${F(rot)})"><polygon points="-90,0 90,0 55,46 -55,46" fill="#fdfdf6" stroke="#b9b39b" stroke-width="4"/><polygon points="0,-88 0,0 58,0" fill="#fff" stroke="#b9b39b" stroke-width="4"/><polygon points="0,-70 0,0 -44,0" fill="#eef0e6" stroke="#b9b39b" stroke-width="4"/></g>`; }
SCENES.push(mkScene([
 {c:"আলো আসলে এক ধরনের ঢেউ। পুকুরে ঢিল ছুড়লে ঢেউ ছড়িয়ে পড়ে।"},
 {c:"সেই ঢেউ এসে পানিতে ভাসা কাগজের নৌকাটাকে দোলায়।"},
 {c:"আলোর ঢেউ এসে ঠিক সেভাবেই ইলেকট্রনকে দোলায়।"},
 {c:"মজার ব্যাপার হলো, দুলতে থাকা ইলেকট্রন নিজেও চারপাশে নতুন আলোর ঢেউ ছড়াতে পারে।"},
 {c:"এরপর কী হবে, তা নির্ভর করে জিনিসটা কী দিয়ে তৈরি তার ওপর। তিন রকম ঘটনা ঘটতে পারে।"},
 {c:"প্রথম ঘটনা, স্টিলের থালা। ধাতুর ভেতরে অনেক ইলেকট্রন মুক্ত।"},
 {c:"তারা কোনো একটা পরমাণুর সঙ্গে বাঁধা নয়, স্কুল ছুটির পর মাঠে নামা ছেলেমেয়েদের মতো।"},
 {c:"আলো পড়তেই এরা সবাই একসঙ্গে দুলে ওঠে আর প্রায় সবটা আলো যেদিক থেকে এসেছিল সেদিকেই ফিরিয়ে দেয়।"},
 {c:"আলো ভেতরে ঢুকতেই পারে না। আলোর এই ফিরে আসাকে বলে প্রতিফলন।"},
 {c:"তাই স্টিলের থালা চকচক করে।"},
 {c:"দ্বিতীয় ঘটনা, কালো ছাতা। এখানে ইলেকট্রন আলোর শক্তি নিয়ে নেয়, কিন্তু আলো হিসেবে আর ফেরত দেয় না।"},
 {c:"সেই শক্তিতে পরমাণুগুলো আরও জোরে কাঁপতে থাকে। পরমাণুর এই কাঁপুনিই হলো তাপ।"},
 {c:"আলো হারিয়ে গেল, ছাতাটা গরম হলো। একে বলে আলোর শোষণ।"},
 {c:"তৃতীয় ঘটনা, কাচ আর পানি। এখানে ইলেকট্রনগুলো নিজের পরমাণুর সঙ্গে শক্ত করে বাঁধা।"},
 {c:"আলো এলে তারা অল্প একটু দোলে, আর সেই দোলা আলো হিসেবেই সামনের পরমাণুর দিকে এগিয়ে দেয়।"},
 {c:"এক পরমাণু থেকে আরেক পরমাণু, এভাবে আলো পুরো কাচ পার হয়ে অন্য পাশ দিয়ে বেরিয়ে যায়।"},
 {c:"তাই কাচের ভেতর দিয়ে আমরা দেখতে পাই। এমন জিনিসকে বলে স্বচ্ছ।"},
 {c:"তবে এই হাতবদলে আলোর গতি একটু কমে যায়। কথাটা মনে রেখো, পরের একটা ভিডিওতে খুব কাজে লাগবে।"},
 {c:"তাহলে দেখলে তো? আলো একই, কিন্তু ইলেকট্রনরা কী করবে তার ওপরই সব নির্ভর করে।"},
 {c:"ফিরিয়ে দিলে প্রতিফলন, রেখে দিলে শোষণ, আর পার করে দিলে স্বচ্ছ।"}
],function(t,S){
  let s='',u='';
  if(S.on(0,1)){ // pond
    s+=sky('#bfe3ff','#eaf6ff')+`<rect y="300" width="1920" height="780" fill="#3f8fc4"/><rect y="290" width="1920" height="26" fill="#c9a96c"/>`;
    const cx=560, cy=640, tt=t-(S.A(0)+S.segs_d0*0.45);
    const drop=S.P(0,0.25,0.45); if(drop>0&&drop<1) s+=`<circle cx="${cx}" cy="${F(150+(cy-150)*drop*drop)}" r="22" fill="#6b5b4b"/>`;
    let hitBoat=0;
    if(tt>0){ for(let i=0;i<5;i++){ const r=(tt-i*0.75)*230; if(r>0&&r<1700){ s+=`<ellipse cx="${cx}" cy="${cy}" rx="${F(r)}" ry="${F(r*0.36)}" fill="none" stroke="#d9f1ff" stroke-width="${F(Math.max(2,9-r/200))}" opacity="${cl(1-r/1700).toFixed(2)}"/>`; } }
      if(tt*230>740) hitBoat=cl((tt*230-740)/200); }
    const bob=hitBoat*Math.sin(t*5);
    s+=boat(1300,640+18*bob,9*bob*Math.cos(t*5+1));
    s+=`<ellipse cx="1300" cy="690" rx="110" ry="14" fill="#2f78a8" opacity=".6"/>`;
  }
  else if(S.on(2,3)){ // wave shakes an electron
    s+=bg(NAVY); const k=2*Math.PI/150; const p=S.P(2,0.08,0.5); const xe=40+(900-40)*(t>=S.A(3)?1:p); const om=7;
    s+=wave(40,xe,520,60,x=>k*x-t*om,{w:9});
    const hit=t>=S.A(3)||p>=1; const ey=520+(hit?60*Math.sin(k*900-t*om):0);
    s+=`<circle cx="1080" cy="520" r="62" fill="#f77f00"/><circle cx="1080" cy="520" r="40" fill="#fcbf49"/>`;
    s+=`<line x1="900" y1="430" x2="900" y2="610" stroke="#6f86c9" stroke-width="4" stroke-dasharray="8 10" opacity=".7"/>`;
    if(S.on(3)){ for(let i=0;i<4;i++){ const r=((t-S.A(3))*160+i*130)%520; s+=`<circle cx="900" cy="${F(ey)}" r="${F(r)}" fill="none" stroke="${Y}" stroke-width="6" opacity="${(S.fin(3)*cl(1-r/520)*0.8).toFixed(2)}"/>`; } }
    s+=`<circle cx="900" cy="${F(ey)}" r="24" fill="#4cc9f0" stroke="#fff" stroke-width="5"/>`;
    s+=txt(900,700,'ইলেকট্রন',54,{c:'#9fe3fa'})+txt(360,380,'আলোর ঢেউ',56,{c:Y});
    if(S.on(3)) s+=txt(1420,330,'নতুন ঢেউ',56,{c:Y,op:S.P(3,0.3,0.45)});
  }
  else if(S.on(4)){ // three cases preview
    s+=bg(NAVY);
    [['১','স্টিলের থালা','#56657d'],['২','কালো ছাতা','#17171d'],['৩','কাচ ও পানি','#3f8fb0']].forEach(([n,nm,c],i)=>{ const q=S.P(4,0.45+i*0.12,0.57+i*0.12); if(q>0){ const x=360+i*600; s+=`<g transform="translate(${x},470) scale(${back(q).toFixed(3)})"><rect x="-240" y="-200" width="480" height="400" rx="44" fill="${c}" stroke="${Y}" stroke-width="6"/><circle cx="0" cy="-60" r="70" fill="${Y}"/>${txt(0,-28,n,96,{c:NAVY})}${txt(0,120,nm,58)}</g>`; } });
    u+=banner('তিন রকম ঘটনা',S.P(4,0.3,0.42),1,90);
  }
  else if(S.on(5,9)){
    s+=bg(NAVY); const tt=t-S.A(7)-0.3; s+=matScene('R',tt,t);
    if(S.on(5)) s+=pill(1060,900-40,'মুক্ত ইলেকট্রন',50,{sc:back(S.P(5,0.5,0.62)),b:'#4cc9f0'});
    if(S.on(8)) u+=termCard('প্রতিফলন','Reflection',S.P(8,0.45,0.58),S.fade(8),410,770,0.7);
    if(S.on(9)){ s+=`<rect width="1920" height="1080" fill="${NAVY}" opacity="${(0.6*S.fade(9)).toFixed(2)}"/><defs><linearGradient id="steel2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".5" stop-color="#9aa6b2"/><stop offset="1" stop-color="#e3e8ec"/></linearGradient></defs>`;
      s+=g(S.fade(9),`<ellipse cx="960" cy="520" rx="330" ry="90" fill="url(#steel2)"/><ellipse cx="960" cy="520" rx="236" ry="60" fill="#c9d1d9" stroke="#8b97a3" stroke-width="5"/>`+[[820,480,50],[1080,500,36],[950,570,28]].map(([x,y,r],i)=>sparkle(x,y,r*(0.7+0.3*Math.sin(t*8+i*2)),1)).join('')); }
  }
  else if(S.on(10,12)){
    s+=bg(NAVY); const tt=t-S.A(10)-S.segs[10].d*0.45; s+=matScene('A',tt,t);
    if(S.on(11)) s+=pill(1600,790,'তাপ বাড়ছে',46,{sc:back(S.P(11,0.5,0.62)),b:'#e63946',c:'#fff'});
    if(S.on(12)) u+=termCard('শোষণ','Absorption',S.P(12,0.5,0.62),S.fade(12),410,770,0.7);
  }
  else if(S.on(13,17)){
    s+=bg(NAVY); const tt=t-S.A(14)-0.3; s+=matScene('T',tt,t);
    if(S.on(13)) s+=pill(1060,900-40,'বাঁধা ইলেকট্রন',50,{sc:back(S.P(13,0.5,0.62)),b:'#4cc9f0'});
    if(S.on(16)) u+=termCard('স্বচ্ছ','Transparent',S.P(16,0.5,0.62),S.fade(16),410,770,0.7);
    if(S.on(17)){ const q=S.P(17,0.1,0.22); s+=pill(400,900-50,'বাতাসে দ্রুত',46,{sc:back(q)})+pill(1060,900-50,'কাচে একটু ধীরে',46,{sc:back(S.P(17,0.2,0.32)),b:'#4cc9f0'}); }
  }
  else { // summary: three panels
    s+=bg(NAVY); const tl=t-S.A(18);
    [['R','প্রতিফলন','ফিরিয়ে দিলে'],['A','শোষণ','রেখে দিলে'],['T','স্বচ্ছ','পার করে দিলে']].forEach(([m,nm,sub],i)=>{ const x=40+i*622, y=300, sc=0.31; const cyc=(tl+0.01)%6.5;
      s+=`<clipPath id="cp${i}"><rect x="${x}" y="${y}" width="${1920*sc}" height="${1080*sc*0.86}" rx="26"/></clipPath><rect x="${x}" y="${y}" width="${1920*sc}" height="${1080*sc*0.86}" rx="26" fill="#0a1330" stroke="#33488c" stroke-width="4"/>`;
      s+=`<g clip-path="url(#cp${i})"><g transform="translate(${x},${y-22}) scale(${sc})">${matScene(m,cyc-0.2,t,false)}</g></g>`;
      const hi=S.on(19)? (S.P(19,i*0.33,i*0.33+0.08)) : 0; const active=S.on(19)&&S.P(19,0,1)>=i*0.33&&S.P(19,0,1)<(i+1)*0.33+0.02;
      s+=txt(x+1920*sc/2,y+1080*sc*0.86+80,sub,48,{c:'#cfd8ee',w:600});
      s+=pill(x+1920*sc/2,y+1080*sc*0.86+170,nm,active?72:60,{b:active?Y:'#1b2b5c',c:active?NAVY:'#fff',sc:active?1+0.05*Math.sin(t*6):1}); });
    u+=banner('আলো একই, ইলেকট্রনের কাজ আলাদা',pr(tl,0.2,0.6),1,120);
  }
  return {svg:s,ui:u};
}));
(function(){ const sc=SCENES[SCENES.length-1]; const d=sc.draw; sc.draw=function(t,S){ S.segs_d0=sc.segs[0].d; S.segs=sc.segs; return d(t,S); }; })();
