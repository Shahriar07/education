/* Scene 7: everyday examples */
SCENES.push(mkScene([
 {c:"এবার চারপাশে তাকাও, সব মিলে যাবে।"},
 {c:"দুপুরের রোদে টিনের চাল ঝিকমিক করে। কারণ টিন ধাতু, আলো ফিরিয়ে দেয়।"},
 {c:"গরমের দিনে সাদা জামা পরলে আরাম লাগে, কালো জামায় গরম লাগে।"},
 {c:"কারণ সাদা জামা বেশির ভাগ আলো ফিরিয়ে দেয়, আর কালো জামা প্রায় সব আলো শুষে নেয়।"},
 {c:"বাসের জানালার কাচ দিয়ে বাইরের রাস্তা দেখা যায়। কারণ কাচ আলোকে পার করে দেয়।"},
 {c:"আর বেশির ভাগ জিনিস একসঙ্গে দুটো কাজ করে। পাকা আম সূর্যের আলোর কিছু অংশ শুষে নেয়, আর হলুদ অংশটা ফিরিয়ে দেয়।"},
 {c:"সেই হলুদ আলো চোখে আসে বলেই আমটাকে আমরা হলুদ দেখি।"},
 {c:"এবার তুমি বলো তো, কাঁচা আম কোন রঙের আলো ফিরিয়ে দেয়?"},
 {c:"ঠিক ধরেছ, সবুজ!"}
],function(t,S){
  let s='',u='';
  if(S.on(0)){ s+=bg(NAVY); u+=banner('চারপাশে মিলিয়ে দেখি',S.P(0,0.1,0.3),1,200);
    [['প্রতিফলন','#56657d'],['শোষণ','#17171d'],['স্বচ্ছ','#3f8fb0']].forEach(([n,c],i)=>{ const q=S.P(0,0.35+i*0.12,0.5+i*0.12); if(q>0) s+=`<g transform="translate(${400+i*560},600) scale(${back(q).toFixed(3)})"><rect x="-220" y="-110" width="440" height="220" rx="40" fill="${c}" stroke="${Y}" stroke-width="6"/>${txt(0,24,n,70)}</g>`; }); }
  else if(S.on(1)){ // tin roof glinting
    s+=sky()+`<rect y="800" width="1920" height="280" fill="#dcc08a"/>`+sun(1560,190,90,t);
    s+=`<g transform="translate(260,0) scale(1.9) translate(0,0)">${tinHouse(120,421,330,150)}</g>`;
    const p=S.P(1,0.1,0.35), q=S.P(1,0.35,0.6);
    [[1490,250,960,455],[1500,270,1090,480],[1470,230,820,430]].forEach(([x1,y1,x2,y2],i)=>{ s+=ray(x1,y1,x2,y2,p,{w:9,arrow:p>=1}); if(p>=1) s+=ray(x2,y2,x2-360,y2-330-i*20,q,{w:9,c:'#ffe9a6',arrow:q>=1}); });
    [[900,430,44],[1060,470,32],[740,455,26],[640,490,24]].forEach(([x,y,r],i)=>{ s+=sparkle(x,y,r*(0.55+0.45*Math.sin(t*9+i*2.1)),S.P(1,0.3,0.45)); });
    s+=pill(960,170,'প্রতিফলন',64,{sc:back(S.P(1,0.6,0.7))});
  }
  else if(S.on(2,3)){ // white and black shirts
    s+=sky()+`<rect y="820" width="1920" height="260" fill="#dcc08a"/>`+sun(960,150,80,t);
    s+=clothesline(260,1660,330,820)+shirt(620,345,'#ffffff','#b8c2cc')+shirt(1300,345,'#1d1d24','#000');
    const hot=S.on(3)?ease(S.P(3,0.55,0.95)):0;
    s+=thermo(300,430,250,0.25+0.05*hot)+thermo(1620,430,250,0.25+0.6*hot);
    if(S.on(2)){ s+=pill(620,700,'আরাম',56,{sc:back(S.P(2,0.3,0.42)),b:'#2a9d5c',c:'#fff'})+pill(1300,700,'গরম',56,{sc:back(S.P(2,0.6,0.72)),b:'#e63946',c:'#fff'}); }
    else { const p=S.P(3,0.08,0.3), q=S.P(3,0.3,0.5), p2=S.P(3,0.5,0.7);
      [-60,0,60].forEach((dx,i)=>{ s+=ray(900+dx*0.3,210,640+dx,430,p,{w:9,arrow:p>=1}); if(p>=1) s+=ray(640+dx,430,420+dx*1.5,250-i*10,q,{w:9,c:'#ffe9a6',arrow:q>=1});
        s+=ray(1020+dx*0.3,210,1280+dx,440,p2,{w:9,arrow:0}); if(p2>=1) s+=`<circle cx="${1280+dx}" cy="440" r="${14+4*Math.sin(t*8+i)}" fill="#ff9a2e" opacity=".9"/>`; });
      s+=heatWaves(1300,340,4,t,hot);
      s+=pill(520,720,'ফিরিয়ে দেয়',50,{sc:back(S.P(3,0.42,0.52))})+pill(1300,720,'শুষে নেয়',50,{sc:back(S.P(3,0.72,0.82)),b:'#e63946',c:'#fff'}); }
  }
  else if(S.on(4)){ // bus window
    s+=sky('#bfe3ff','#eef8ff'); const sc=(t-S.A(4))*140;
    for(let i=0;i<9;i++){ const x=((i*330 - sc)%2970+2970)%2970-500; const h=220+((i*97)%220); s+=`<rect x="${F(x)}" y="${700-h}" width="230" height="${h}" fill="${['#8fa2b8','#a3b3c6','#7f93aa','#b7a58f'][i%4]}"/>`; for(let r=0;r<Math.floor(h/60);r++)for(let c=0;c<3;c++) s+=`<rect x="${F(x+24+c*66)}" y="${700-h+22+r*56}" width="44" height="30" fill="#e9f3fb" opacity=".85"/>`; }
    s+=`<rect y="700" width="1920" height="380" fill="#5d6570"/>`; for(let i=0;i<8;i++){ const x=((i*300-sc*1.6)%2400+2400)%2400-300; s+=`<rect x="${F(x)}" y="790" width="150" height="16" fill="#fff" opacity=".8"/>`; }
    s+=`<path fill-rule="evenodd" d="M0 0 H1920 V1080 H0 Z M300 190 H1300 Q1340 190 1340 230 V720 Q1340 760 1300 760 H300 Q260 760 260 720 V230 Q260 190 300 190 Z" fill="#1f6f78"/>`;
    s+=`<rect x="260" y="190" width="1080" height="570" rx="40" fill="#bfe9fa" opacity=".18" stroke="#0f3d42" stroke-width="14"/><line x1="320" y1="250" x2="470" y2="700" stroke="#fff" stroke-width="18" opacity=".18"/>`;
    s+=eye(1640,470,1.4,-16,4);
    const p=S.P(4,0.45,0.75); [380,470,560].forEach((y,i)=>{ s+=ray(700,y,1500,455+i*12,p,{w:9,arrow:p>=1}); });
    s+=pill(800,120,'স্বচ্ছ',64,{sc:back(S.P(4,0.75,0.85))});
  }
  else { // mango and colours
    s+=bg(NAVY); const green=S.on(7,8); const mc=green?['#5cb85c','#3c8d40']:['#f5b921','#e58a1f'];
    s+=mango(760,560,1.9,mc[0],mc[1])+eye(1600,330,1.4,-16,8);
    const cols=[['#ff4d4d',-54],['#4d79ff',-18],[green?'#5cb85c':'#ffd23f',18],[green?'#ffd23f':'#5cb85c',54]]; const refl=green?'#5cb85c':'#ffd23f';
    const seg0=green?7:5; const p=S.P(seg0,green?0.1:0.35,green?0.45:0.6); const done=t>=S.A(seg0+1);
    const showRefl = green ? S.on(8) : true; const q=green? S.P(8,0.1,0.5) : (done?1:S.P(5,0.75,0.95));
    cols.forEach(([c,off],i)=>{ const x1=180+off*0.7, y1=130+off, x2=640+off*0.5, y2=450+off*0.9; const pp=done&&!green?1:(green&&S.on(8)?1:p);
      s+=ray(x1,y1,x2,y2,pp,{w:11,c,head:0}); if(pp>=1 && c!==refl) s+=`<circle cx="${F(x2)}" cy="${F(y2)}" r="${12+3*Math.sin(t*7+i)}" fill="${c}" opacity=".9"/>`; });
    s+=txt(250,90,'সূর্যের আলো',50,{c:'#fff',op:pr(p,0.2,0.5)+(done?1:0)});
    if(showRefl && (done||p>=1)){ s+=ray(900,470,1470,345,q,{w:13,c:refl,arrow:q>=1}); }
    if(!green){ s+=pill(430,640,'বাকিটা শোষণ',48,{sc:back(S.P(5,0.62,0.72)+(done?1:0)),b:'#1b2b5c',c:'#fff'}); if(done) s+=pill(1200,300,'হলুদ আলো',52,{sc:back(S.P(6,0.1,0.25))}); }
    else { if(S.on(7)) { u+=card('কোন রঙের আলো?',S.P(7,0.45,0.58),S.fade(7),640,760,72).replace('left:0;width:1920px','left:1020px;width:820px'); }
      else { s+=pill(1200,300,'সবুজ আলো',56,{sc:back(S.P(8,0.3,0.5)),b:'#5cb85c',c:'#fff'})+tick(1600,560,36,S.P(8,0.4,0.6)); } }
  }
  return {svg:s,ui:u};
}));
