/* Scene 2: light is energy, and very fast */
SCENES.push(mkScene([
 {c:"আগে একটা প্রশ্ন। রোদে দাঁড়ালে তোমার গা গরম লাগে কেন?"},
 {c:"একটু ভাবো। রোদে ভেজা কাপড় শুকায়।"},
 {c:"উঠানে মেলে দেওয়া ধান রোদে শুকায়।"},
 {c:"ছাদের সোলার প্যানেল রোদ থেকে বিদ্যুৎ বানায়।"},
 {c:"তার মানে আলো কাজ করতে পারে। আর যা কাজ করতে পারে, তাকে আমরা বলি শক্তি।"},
 {c:"আলো এক প্রকার শক্তি।"},
 {c:"এই শক্তি এক জায়গায় বসে থাকে না। সে ছোটে। আর কী তার গতি!"},
 {c:"আলো এক সেকেন্ডে চলে প্রায় তিন লক্ষ কিলোমিটার।"},
 {c:"তুমি যদি এই গতিতে ছুটতে পারতে, তাহলে এক সেকেন্ডে পুরো পৃথিবীকে সাতবারেরও বেশি ঘুরে আসতে পারতে!"},
 {c:"তবু সূর্য এত দূরে যে সেখান থেকে আলো পৃথিবীতে পৌঁছাতে সময় লাগে প্রায় আট মিনিট বিশ সেকেন্ড।"},
 {c:"তার মানে, এখন যে রোদটা তোমার গায়ে লাগছে, সেটা প্রায় আট মিনিট আগে সূর্য থেকে রওনা দিয়েছিল!"}
],function(t,S){
  let s='',u='';
  const SX=250,SY=215;
  if(t<S.A(6)+0.5){
    s+=sky()+`<rect y="780" width="1920" height="300" fill="#dcc08a"/><rect y="780" width="1920" height="14" fill="#c9a96c"/>`;
    s+=sun(SX,SY,92,t);
    // seg 0: thermometer and question
    const o0=S.fade(0);
    s+=g(o0, thermo(960,250,330,0.15+0.75*ease(S.P(0,0.15,0.9)))+heatWaves(1130,470,3,t,S.P(0,0.4,0.7)));
    u+=card('রোদে গা গরম লাগে কেন?',S.P(0,0.08,0.22),o0,690,1000,64);
    // seg 1: clothesline
    const o1=S.fin(1); if(t>=S.A(1)){
      let c=clothesline(430,900,470,800); const dry=S.P(1,0.2,1);
      c+=shirt(665,478, dry<1? '#cfe3f7':'#f4f8ff');
      for(let i=0;i<3;i++){ const ph=((t*0.9+i*0.33)%1); c+=`<path d="M0 0 q-9 16 0 22 q9 -6 0 -22Z" fill="#4aa3df" opacity="${((1-dry)*(1-ph)).toFixed(2)}" transform="translate(${610+i*55},${735+ph*50})"/>`; }
      c+=heatWaves(665,470,3,t,(S.on(1)?0.9:0)*dry,'#7fb7e6');
      s+=g(o1,c); s+=ray(SX+70,SY+50,640,520,S.P(1,0.05,0.4),{op:S.fade(1)});
    }
    // seg 2: grain mat
    if(t>=S.A(2)){ let c=`<polygon points="1010,830 1330,830 1390,930 950,930" fill="#b98b4e"/><polygon points="1040,842 1305,842 1350,918 995,918" fill="#e8c14a"/>`;
      for(let i=0;i<60;i++){ const x=1010+((i*97)%320), y=850+((i*53)%62); c+=`<ellipse cx="${x}" cy="${y}" rx="6" ry="3" fill="#c99a1e" transform="rotate(${(i*37)%180} ${x} ${y})"/>`; }
      c+=heatWaves(1170,838,3,t,(S.on(2)?0.8:0)*S.P(2,0.3,0.6),'#e8a13a');
      s+=g(S.fin(2),c); s+=ray(SX+80,SY+40,1160,860,S.P(2,0.05,0.4),{op:S.fade(2)}); }
    // seg 3: house with solar panel
    if(t>=S.A(3)){ let c=tinHouse(1470,780,330,230); const lit=S.P(3,0.45,0.6);
      c+=`<polygon points="1560,438 1700,438 1715,535 1545,535" fill="#1f4e8c" stroke="#dfe9f5" stroke-width="5"/>`;
      for(let i=1;i<4;i++) c+=`<line x1="${1560+i*35}" y1="438" x2="${1545+i*42.5}" y2="535" stroke="#dfe9f5" stroke-width="3"/>`;
      c+=`<line x1="1552" y1="486" x2="1708" y2="486" stroke="#dfe9f5" stroke-width="3"/>`;
      c+=`<path d="M1715 535 L1760 560 L1760 640" stroke="#333" stroke-width="5" fill="none"/>`;
      c+=`<circle cx="1760" cy="664" r="${60*lit}" fill="#fff4b8" opacity=".7"/><circle cx="1760" cy="664" r="24" fill="${lit>0.5?'#fff6c2':'#9a9a9a'}" stroke="#666" stroke-width="3"/>`;
      s+=g(S.fin(3),c); s+=ray(SX+85,SY+20,1620,480,S.P(3,0.05,0.4),{op:S.fade(3)}); }
    // seg 4-5: term card
    if(t>=S.A(4)){ const o=Math.min(S.fin(4),1-pr(t,S.E(5)-0.4,S.E(5))); s+=`<rect width="1920" height="1080" fill="${NAVY}" opacity="${(0.72*o).toFixed(2)}"/>`;
      u+=termCard('শক্তি','Energy',S.P(4,0.45,0.6),o,960,400);
      if(t>=S.A(5)) u+=`<div class="abs" style="left:0;width:1920px;top:620px;text-align:center;color:#fff;font-size:76px;font-weight:700;opacity:${Math.min(S.fin(5),o).toFixed(2)}">আলো এক প্রকার <span style="color:${Y}">শক্তি</span></div>`; }
    if(t>S.A(6)) s+=`<rect width="1920" height="1080" fill="#070b1c" opacity="${pr(t,S.A(6),S.A(6)+0.5).toFixed(2)}"/>`;
    if(t<S.A(6)) return {svg:s,ui:u};
  }
  // ---- space part ----
  if(t>=S.A(6)+0.5) s+=bg('#070b1c')+stars(t,70,3);
  else s+=g(pr(t,S.A(6),S.A(6)+0.5),stars(t,70,3));
  // seg 6-7: speed streaks + number
  if(t<S.A(8)+0.4){ const o=1-pr(t,S.A(8),S.A(8)+0.4);
    let c=''; for(let i=0;i<4;i++){ const ph=((t-S.A(6))*1.1+i*0.27)%1; const y=330+i*120; const x=-300+ph*2600; c+=`<line x1="${F(x-360)}" y1="${y}" x2="${F(x)}" y2="${y}" stroke="${Y}" stroke-width="10" stroke-linecap="round" opacity=".85"/><circle cx="${F(x)}" cy="${y}" r="15" fill="#fff6c2"/>`; }
    s+=g(o*(t<S.A(7)?1:0.35),c);
    if(t>=S.A(7)){ const p=S.fin(7,0.5); s+=g(o*p,`<rect x="360" y="330" width="1200" height="330" rx="50" fill="#0f1b3d" stroke="${Y}" stroke-width="6"/>`+txt(960,490,'৩,০০,০০০ কিলোমিটার',120,{c:Y})+txt(960,600,'প্রতি সেকেন্ডে',64)); } }
  // seg 8: around the earth
  if(t>=S.A(8) && t<S.A(9)+0.4){ const o=Math.min(S.fin(8),1-pr(t,S.A(9),S.A(9)+0.4)); const p=S.P(8,0.12,0.86); const laps=7.5*p; const a=laps*2*Math.PI-Math.PI/2; const R=300;
    let c=earth(960,470,200);
    c+=`<ellipse cx="960" cy="470" rx="${R}" ry="${R*0.42}" fill="none" stroke="${Y}" stroke-width="5" stroke-dasharray="10 14" opacity=".5"/>`;
    const ex=960+R*Math.cos(a), ey=470+R*0.42*Math.sin(a);
    for(let k=1;k<10;k++){ const aa=a-k*0.09; c+=`<circle cx="${F(960+R*Math.cos(aa))}" cy="${F(470+R*0.42*Math.sin(aa))}" r="${14-k}" fill="${Y}" opacity="${(0.7-k*0.07).toFixed(2)}"/>`; }
    c+=`<circle cx="${F(ex)}" cy="${F(ey)}" r="18" fill="#fff6c2"/>`;
    c+=`<rect x="1380" y="330" width="400" height="280" rx="40" fill="#0f1b3d" stroke="${Y}" stroke-width="5"/>`+txt(1580,470,BN(Math.min(7,Math.floor(laps)))+' বার',130,{c:Y})+txt(1580,560,'ঘোরা হলো',50);
    c+=`<rect x="140" y="370" width="400" height="200" rx="40" fill="#0f1b3d" stroke="#fff" stroke-width="4"/>`+txt(340,460,'সময়',46)+txt(340,535,'১ সেকেন্ড',70,{c:Y});
    s+=g(o,c); }
  // seg 9-10: sun to earth
  if(t>=S.A(9)){ const o=S.fin(9); const p=S.P(9,0.18,0.88); const secs=Math.round(500*p); const mm=Math.floor(secs/60), ss=secs%60;
    let c=`<circle cx="60" cy="470" r="420" fill="#ffb703" opacity=".25"/><circle cx="60" cy="470" r="330" fill="#ffc83d"/><circle cx="60" cy="470" r="250" fill="#ffd966"/>`;
    c+=earth(1700,470,70);
    c+=`<line x1="400" y1="470" x2="1620" y2="470" stroke="#fff" stroke-width="3" stroke-dasharray="6 16" opacity=".4"/>`;
    c+=ray(400,470,1625,470,p,{w:12});
    c+=txt(170,490,'সূর্য',70,{c:NAVY})+txt(1700,610,'পৃথিবী',56);
    c+=txt(1010,410,'প্রায় ১৫ কোটি কিলোমিটার',52,{c:'#cfd8ee',w:600});
    const hi=t>=S.A(10)?1:0; const pulse=hi?1+0.04*Math.sin(t*5):1;
    c+=`<g transform="translate(1010,690) scale(${pulse.toFixed(3)})"><rect x="-330" y="-110" width="660" height="210" rx="44" fill="#0f1b3d" stroke="${Y}" stroke-width="${hi?10:5}"/>`+txt(0,-30,'সময়',44)+txt(0,60,BN(mm)+' মিনিট '+BN(String(ss).padStart(2,'0'))+' সেকেন্ড',76,{c:Y})+`</g>`;
    s+=g(o,c); }
  return {svg:s,ui:u};
}));
