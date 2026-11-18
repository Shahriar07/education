/* Scene 4: how we see */
SCENES.push(mkScene([
 {c:"এবার শুরুর প্রশ্নে ফিরে যাই। অন্ধকারে আমরা দেখি না কেন?"},
 {c:"অনেকে ভাবে, চোখ থেকে কিছু একটা বের হয়ে জিনিসের গায়ে লাগে, তাই আমরা দেখি।"},
 {c:"আসলে ঘটনা ঠিক উল্টো।"},
 {c:"ধরো, জানালার পাশে টেবিলে একটা পাকা আম রাখা আছে। সূর্যের আলো এসে আমের গায়ে পড়ল।"},
 {c:"সেই আলোর কিছুটা আমের গা থেকে ফিরে এসে ঢুকল তোমার চোখে। তখনই তুমি আমটা দেখতে পেলে।"},
 {c:"অর্থাৎ কোনো জিনিস থেকে আলো আমাদের চোখে এলে তবেই আমরা সেটা দেখি।"},
 {c:"কারেন্ট চলে যাওয়ার পর তোমার ঘরে কোনো আলোই ছিল না। বইয়ের গায়ে আলো পড়েনি, তাই বই থেকে কোনো আলো তোমার চোখেও আসেনি।"},
 {c:"মোমবাতি জ্বলতেই আলো বইয়ে পড়ল, ফিরে এল তোমার চোখে, আর বইটা দেখা গেল।"},
 {c:"চাঁদের বেলায়ও তাই। চাঁদের নিজের আলো নেই।"},
 {c:"সূর্যের আলো চাঁদের গায়ে পড়ে ফিরে আসে বলেই আমরা চাঁদ দেখি।"}
],function(t,S){
  let s='',u='';
  const book=(x,y,o=1)=>`<g opacity="${o}"><polygon points="${x-170},${y+10} ${x-5},${y} ${x-5},${y-60} ${x-155},${y-50}" fill="#fdfdf6" stroke="#b9b39b" stroke-width="4"/><polygon points="${x+170},${y+10} ${x+5},${y} ${x+5},${y-60} ${x+155},${y-50}" fill="#fdfdf6" stroke="#b9b39b" stroke-width="4"/><rect x="${x-6}" y="${y-62}" width="12" height="64" fill="#2e86ab"/></g>`;
  if(S.on(0,2)){
    s+=bg(NAVY);
    if(S.on(0)){ s+=g(S.fade(0),`<rect x="560" y="330" width="800" height="430" rx="40" fill="#05070f"/>`+book(960,620,0.18)+txt(960,470,'?',200,{c:Y})); u+=card('অন্ধকারে দেখি না কেন?',S.P(0,0.4,0.55),S.fade(0),120,1100,76); }
    else { const o=S.fin(1);
      s+=g(o,`<rect x="330" y="700" width="420" height="26" rx="8" fill="#8a5a30"/><rect x="360" y="726" width="26" height="120" fill="#6b4324"/><rect x="694" y="726" width="26" height="120" fill="#6b4324"/>`+mango(540,600,1)+eye(1450,560,1.5,-14,4));
      const p=S.P(1,0.3,0.7);
      s+=g(o,`<line x1="1310" y1="566" x2="${F(1310-(1310-650)*p)}" y2="${F(566+(590-566)*p)}" stroke="#ff8fa3" stroke-width="10" stroke-dasharray="26 20" stroke-dashoffset="${F(t*60)}" stroke-linecap="round"/>`+(p>=1?`<polygon points="0,0 34,-16 34,16" fill="#ff8fa3" transform="translate(650,590) rotate(-2)"/>`:''));
      s+=txt(980,500,'চোখ থেকে কিছু বের হয়?',54,{c:'#ffb3c1',op:o*pr(p,0.3,0.6)});
      if(S.on(2)){ s+=cross(980,578,70,S.P(2,0.1,0.3)); u+=card('ভুল ধারণা',S.P(2,0.3,0.45),S.fade(2),170,620,84); }
    }
  }
  else if(S.on(3,5)){ // sunny room, mango, eye
    s+=bg('#f1e3c0')+`<rect y="820" width="1920" height="260" fill="#a07c57"/>`;
    s+=`<rect x="120" y="110" width="430" height="450" rx="10" fill="#6b4324"/><rect x="140" y="130" width="390" height="410" fill="#aee0ff"/>`+sun(300,290,70,t)+`<rect x="326" y="130" width="16" height="410" fill="#6b4324"/><rect x="140" y="326" width="390" height="16" fill="#6b4324"/>`;
    s+=`<polygon points="540,700 1180,700 1260,780 460,780" fill="#a8703d"/><rect x="460" y="780" width="800" height="36" fill="#7d4e27"/><rect x="500" y="816" width="40" height="264" fill="#6b4120"/><rect x="1180" y="816" width="40" height="264" fill="#6b4120"/>`;
    s+=`<ellipse cx="860" cy="748" rx="150" ry="26" fill="#e9eef2"/><ellipse cx="860" cy="744" rx="110" ry="16" fill="#cfd8de"/>`+mango(860,650,0.95);
    s+=eye(1560,430,1.5,-16,8);
    const p1=S.P(3,0.5,0.85), p2=S.P(4,0.05,0.4);
    const done1=t>=S.A(4), done2=t>=S.A(5);
    s+=ray(352,322,790,600,done1?1:p1,{w:12,arrow:done1||p1>=1});
    if(done1||p1>=1) s+=`<circle cx="560" cy="430" r="40" fill="${NAVY}"/>`+txt(560,452,'১',54,{c:Y});
    if(t>=S.A(4)){ s+=ray(930,610,1425,450,done2?1:p2,{w:12,arrow:done2||p2>=1}); if(done2||p2>=1) s+=`<circle cx="1180" cy="500" r="40" fill="${NAVY}"/>`+txt(1180,522,'২',54,{c:Y}); }
    if(S.on(5)) u+=card('জিনিস থেকে আলো <span style="color:#c77d00">চোখে এলে</span> তবেই দেখি',S.P(5,0.1,0.22),S.fade(5),70,1320,64);
  }
  else if(S.on(6,7)){ // dark room, book, candle, eye
    const lit=S.on(7)?back(S.P(7,0.02,0.12)):0; const br=S.on(7)?ease(S.P(7,0.05,0.3)):0;
    s+=bg('#0a0d1a')+`<rect y="820" width="1920" height="260" fill="#11131d"/>`;
    s+=`<polygon points="330,720 1230,720 1330,810 230,810" fill="#a8703d" opacity="${0.12+0.88*br}"/><rect x="230" y="810" width="1100" height="40" fill="#7d4e27" opacity="${0.12+0.88*br}"/>`;
    s+=book(820,790,0.14+0.86*br);
    s+=g(0.25+0.75*br,candle(430,790,150,0,t)); if(lit>0) s+=candle(430,790,150,lit,t);
    s+=eye(1560,430,1.5,-16,10);
    if(S.on(6)){ u+=card('আলো নেই',S.P(6,0.1,0.2),S.fade(6),140,560,84); s+=txt(820,600,'?',150,{c:'#39405c',op:S.fade(6)}); }
    else { const p1=S.P(7,0.15,0.4), p2=S.P(7,0.42,0.7);
      s+=ray(450,612,760,735,p1,{w:11,arrow:p1>=1}); if(p1>=1) s+=ray(880,725,1425,455,p2,{w:11,arrow:p2>=1});
      s+=tick(1560,250,34,S.P(7,0.72,0.82)); }
  }
  else { // moon
    s+=bg('#070b1c')+stars(t,80,5);
    s+=`<circle cx="-120" cy="820" r="520" fill="#ffb703" opacity=".22"/><circle cx="-120" cy="820" r="420" fill="#ffc83d"/><circle cx="-120" cy="820" r="330" fill="#ffd966"/>`+txt(150,1000-60,'সূর্য',64,{c:NAVY});
    const litm=S.on(9)?ease(S.P(9,0.25,0.45)):0;
    s+=`<clipPath id="mclip"><circle cx="1060" cy="270" r="120"/></clipPath><circle cx="1060" cy="270" r="120" fill="#4a5063"/><g clip-path="url(#mclip)"><circle cx="${1060-70}" cy="${270+50}" r="150" fill="#f1eedb" opacity="${litm.toFixed(2)}"/><circle cx="1020" cy="240" r="24" fill="#000" opacity=".12"/><circle cx="1100" cy="310" r="32" fill="#000" opacity=".12"/><circle cx="1090" cy="210" r="16" fill="#000" opacity=".12"/></g>`+txt(1060,130-10,'চাঁদ',56);
    s+=earth(1640,760,120)+txt(1640,940,'পৃথিবী',56);
    if(S.on(8)) u+=card('চাঁদের নিজের আলো নেই',S.P(8,0.3,0.45),S.fade(8),460,900,64).replace('left:0;width:1920px','left:260px;width:1100px');
    else { const p1=S.P(9,0.05,0.3), p2=S.P(9,0.32,0.6);
      s+=ray(250,560,955,320,p1,{w:12,arrow:p1>=1}); if(p1>=1){ s+=`<circle cx="600" cy="440" r="40" fill="${Y}"/>`+txt(600,462,'১',54,{c:NAVY}); s+=ray(1150,345,1560,670,p2,{w:12,arrow:p2>=1}); }
      if(p2>=1) s+=`<circle cx="1360" cy="508" r="40" fill="${Y}"/>`+txt(1360,530,'২',54,{c:NAVY}); }
  }
  return {svg:s,ui:u};
}));
