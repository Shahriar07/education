/* Scene 3: light travels in straight lines; shadows */
SCENES.push(mkScene([
 {c:"এবার বলো তো, আলো কি সোজা পথে চলে, নাকি এঁকেবেঁকে?"},
 {c:"তোমার ঘরে যদি টিনের চাল থাকে, তাহলে হয়তো দেখেছ, চালের ছোট্ট ফুটো দিয়ে সকালে রোদ ঢোকে।"},
 {c:"ধুলোর মধ্যে আলোর রেখাটা স্পষ্ট দেখা যায়। একদম সোজা, যেন কেউ স্কেল দিয়ে এঁকেছে!"},
 {c:"আর যদি শহরের ফ্ল্যাটে থাকো, তাহলে জানালার পর্দার ফাঁক দিয়ে ঢোকা আলোটা খেয়াল কোরো। সেটাও একদম সোজা।"},
 {c:"গ্রাম হোক বা শহর, আলো সব জায়গায় একই নিয়ম মানে। আলো চলে সরলরেখায়।"},
 {c:"আলোর এই সোজা পথটাকে বলে আলোকরশ্মি।"},
 {c:"আর আলো সোজা চলে বলেই ছায়া তৈরি হয়। রোদে একটা কলসি রাখলে কলসিটা আলোর পথ আটকে দেয়।"},
 {c:"আলো তো আর বেঁকে কলসির পেছনে যেতে পারে না। তাই পেছনে পড়ে একটা অন্ধকার জায়গা।"},
 {c:"সেটাই কলসির ছায়া। তোমার নিজের ছায়াও ঠিক এভাবেই তৈরি হয়।"}
],function(t,S){
  let s='',u='';
  if(S.on(0)){ // straight or wiggly?
    s+=bg(NAVY); const p=S.P(0,0.1,0.55), q=S.P(0,0.45,0.9);
    s+=`<circle cx="330" cy="330" r="22" fill="${Y}"/>`+ray(330,330,1590,330,p,{w:11});
    s+=txt(960,250,'সোজা পথে?',70,{op:pr(p,0.1,0.4)});
    s+=`<circle cx="330" cy="640" r="22" fill="${Y}"/>`;
    const xe=330+1260*q; s+=wave(330,xe,640,60,x=>(x-330)/55,{w:11});
    if(q>0&&q<1) s+=`<circle cx="${F(xe)}" cy="${F(640+60*Math.sin((xe-330)/55))}" r="13" fill="#fff6c2"/>`;
    s+=txt(960,560,'নাকি এঁকেবেঁকে?',70,{op:pr(q,0.1,0.4)});
  }
  else if(S.on(1,2)){ // village room with tin roof
    s+=bg('#4a3526')+`<rect y="800" width="1920" height="280" fill="#6b4f37"/><rect y="792" width="1920" height="12" fill="#3b2a1c"/>`;
    s+=`<polygon points="0,0 1920,0 1920,150 0,330" fill="#8e9aa3"/>`;
    for(let i=1;i<26;i++){ const x=i*76; s+=`<line x1="${x}" y1="0" x2="${x-40}" y2="${F(330-180*(x-40)/1920)}" stroke="#737f88" stroke-width="5"/>`; }
    s+=`<polygon points="0,330 1920,150 1920,172 0,356" fill="#5e4a36"/>`;
    // things in the room
    s+=kolshi(300,800,0.85)+`<rect x="1450" y="640" width="260" height="26" rx="8" fill="#8a5a30"/><rect x="1470" y="666" width="24" height="134" fill="#6b4324"/><rect x="1666" y="666" width="24" height="134" fill="#6b4324"/>`;
    s+=`<rect x="1500" y="560" width="170" height="80" rx="6" fill="#c0392b"/><rect x="1510" y="530" width="150" height="34" rx="6" fill="#2e86ab"/>`;
    const hx=760,hy=235, fx=1160,fy=820; const p=S.P(1,0.35,0.7);
    s+=`<ellipse cx="${hx}" cy="${hy+6}" rx="26" ry="12" fill="#fff6c2"/>`;
    const ex=hx+(fx-hx)*p, ey=hy+(fy-hy)*p;
    s+=`<polygon points="${hx-14},${hy+6} ${hx+14},${hy+6} ${F(ex+52*p)},${F(ey)} ${F(ex-52*p)},${F(ey)}" fill="#ffe680" opacity=".42"/>`;
    s+=`<line x1="${hx}" y1="${hy+6}" x2="${F(ex)}" y2="${F(ey)}" stroke="#fff6c2" stroke-width="6" opacity=".8"/>`;
    if(p>=1) s+=`<ellipse cx="${fx}" cy="${fy+6}" rx="86" ry="22" fill="#ffe680" opacity=".75"/>`;
    for(let i=0;i<22;i++){ const k=((i*0.137+t*0.05*(1+i%3))%1); if(k<p){ const cx=hx+(fx-hx)*k+ (30*k+6)*Math.sin(i*5+t*0.8), cy=hy+(fy-hy)*k; s+=`<circle cx="${F(cx)}" cy="${F(cy)}" r="${2.5+(i%3)}" fill="#fff" opacity="${(0.5+0.4*Math.sin(t*3+i)).toFixed(2)}"/>`; } }
    if(S.on(2)){ const q=ease(S.P(2,0.45,0.62)); const ang=Math.atan2(fy-hy,fx-hx)*180/Math.PI;
      s+=g(q,`<g transform="translate(${hx+90+(1-q)*200},${hy+10-(1-q)*120}) rotate(${F(ang)})"><rect x="0" y="-70" width="640" height="56" rx="6" fill="#f2c94c" stroke="#8a6d1a" stroke-width="4"/>`+Array.from({length:32},(_,i)=>`<line x1="${12+i*20}" y1="-70" x2="${12+i*20}" y2="${i%5==0?-40:-52}" stroke="#5c480f" stroke-width="3"/>`).join('')+`</g>`);
      u+=card('একদম সোজা!',S.P(2,0.5,0.62),S.fade(2),330,560,76).replace('left:0;width:1920px','left:1120px;width:700px'); }
  }
  else if(S.on(3)){ // city flat with curtain gap
    s+=bg('#b9c4d6')+`<rect y="800" width="1920" height="280" fill="#8d7a66"/><rect y="792" width="1920" height="12" fill="#6e5d4c"/>`;
    s+=`<rect x="230" y="150" width="620" height="560" fill="#7a8aa0"/><rect x="250" y="170" width="580" height="520" fill="#bfe3ff"/>`;
    [[270,430,150],[400,360,120],[520,470,110],[650,400,160]].forEach(([x,y,w],i)=>{ s+=`<rect x="${x}" y="${y}" width="${w}" height="${690-y}" fill="${['#8fa2b8','#a3b3c6','#7f93aa','#98a9bd'][i]}"/>`; for(let r=0;r<5;r++)for(let c=0;c<3;c++) s+=`<rect x="${x+14+c*((w-28)/3)}" y="${y+18+r*44}" width="${(w-28)/3-8}" height="22" fill="#e9f3fb" opacity=".8"/>`; });
    s+=`<circle cx="760" cy="250" r="46" fill="#ffd966"/>`;
    const sw=6*Math.sin(t*1.2);
    s+=`<path d="M230 140 L500 140 Q${488+sw} 430 ${504+sw} 720 L230 720 Z" fill="#c0564b"/><path d="M850 140 L560 140 Q${572+sw} 430 ${556+sw} 720 L850 720 Z" fill="#c0564b"/>`;
    for(let i=0;i<4;i++){ s+=`<path d="M${270+i*60} 140 Q${262+i*60} 430 ${276+i*60} 720" stroke="#a3443a" stroke-width="5" fill="none"/><path d="M${810-i*60} 140 Q${818-i*60} 430 ${804-i*60} 720" stroke="#a3443a" stroke-width="5" fill="none"/>`; }
    s+=`<rect x="200" y="120" width="680" height="24" rx="10" fill="#5b4a3a"/>`;
    s+=`<rect x="1250" y="560" width="470" height="150" rx="30" fill="#4f6d8f"/><rect x="1220" y="660" width="530" height="110" rx="30" fill="#5d7ea3"/><rect x="1250" y="770" width="30" height="34" fill="#3b2a1c"/><rect x="1690" y="770" width="30" height="34" fill="#3b2a1c"/>`;
    const p=S.P(3,0.2,0.5); const x0=530,y0=330,x1=1080,y1=840; const ex=x0+(x1-x0)*p, ey=y0+(y1-y0)*p;
    s+=`<polygon points="${x0-22},${y0-150} ${x0+22},${y0+150} ${F(ex+70*p)},${F(ey+16)} ${F(ex-70*p)},${F(ey-16)}" fill="#ffe680" opacity=".45"/>`;
    s+=`<line x1="${x0}" y1="${y0}" x2="${F(ex)}" y2="${F(ey)}" stroke="#fff6c2" stroke-width="6" opacity=".85"/>`;
    if(p>=1) s+=`<ellipse cx="${x1}" cy="${y1+8}" rx="110" ry="24" fill="#ffe680" opacity=".7"/>`;
    u+=card('এটাও সোজা!',S.P(3,0.72,0.8),S.fade(3),300,560,76).replace('left:0;width:1920px','left:1180px;width:640px');
  }
  else if(S.on(4,5)){ // rule + term
    s+=bg(NAVY);
    s+=g(S.fin(4), `<g transform="translate(330,250) scale(0.5)">${tinHouse(-165,230,330,230)}</g>`+txt(330,440,'গ্রাম',56)+
       `<rect x="1500" y="170" width="70" height="190" fill="#8fa2b8"/><rect x="1580" y="120" width="90" height="240" fill="#a3b3c6"/><rect x="1680" y="200" width="60" height="160" fill="#7f93aa"/>`+txt(1620,440,'শহর',56));
    const p=S.P(4,0.3,0.7); s+=`<circle cx="300" cy="600" r="22" fill="${Y}"/>`+ray(300,600,1620,600,p,{w:12,arrow:p>=1});
    u+=`<div class="abs" style="left:0;width:1920px;top:660px;text-align:center;color:#fff;font-size:84px;font-weight:700;opacity:${S.P(4,0.55,0.7).toFixed(2)}">আলো চলে <span style="color:${Y}">সরলরেখায়</span></div>`;
    if(S.on(5)) u+=termCard('আলোকরশ্মি','Ray of light',S.P(5,0.25,0.4),S.fade(5),960,330);
  }
  else { // shadow of the clay pot
    s+=sky()+`<rect y="800" width="1920" height="280" fill="#dcc08a"/><rect y="800" width="1920" height="12" fill="#c9a96c"/>`;
    s+=sun(230,190,90,t);
    const d={x:0.8,y:0.6}, C={x:1050,y:690}, R=112;
    const sh=ease(S.P(6,0.55,0.95));
    s+=`<polygon points="1010,800 1150,800 1420,812 1385,880 1040,870" fill="#3b3024" opacity="${(0.55*sh).toFixed(2)}"/>`;
    [640,820,1100,1250,1520,1680].forEach((xg,i)=>{ const P0={x:xg-d.x*900,y:812-d.y*900}; let L=900; const dist=Math.abs((C.x-xg)*d.y-(C.y-812)*d.x); let blocked=false;
      if(dist<R){ const fx=P0.x-C.x, fy=P0.y-C.y; const b=fx*d.x+fy*d.y, c=fx*fx+fy*fy-R*R; L=-b-Math.sqrt(b*b-c); blocked=true; }
      const p=S.P(6,0.12+i*0.04,0.5+i*0.04); const drawL=L*(t>=S.A(7)?1:p);
      s+=ray(P0.x,P0.y,P0.x+d.x*drawL,P0.y+d.y*drawL,1,{w:8,op:0.9,arrow:!blocked&&(t>=S.A(7)||p>=1)});
      if(blocked && (t>=S.A(7)||p>=1)) s+=`<circle cx="${F(P0.x+d.x*L)}" cy="${F(P0.y+d.y*L)}" r="14" fill="#fff6c2"/>`; });
    s+=kolshi(1050,808,1);
    if(S.on(7)){ const q=S.P(7,0.05,0.4); const o=S.fade(7);
      s+=g(o,`<path d="M770 400 Q1010 420 1190 560 Q1300 650 1260 780" stroke="#e63946" stroke-width="9" fill="none" stroke-dasharray="18 16" stroke-dashoffset="${F(-t*40)}" pathLength="1" opacity="${q.toFixed(2)}"/>`+cross(1245,700,44,S.P(7,0.3,0.42)));
      s+=txt(1500,640,'আলো বাঁকে না',58,{c:'#b02a37',op:o*S.P(7,0.35,0.45)}); }
    if(S.on(8)){ s+=`<line x1="1560" y1="700" x2="1330" y2="840" stroke="${NAVY}" stroke-width="7" stroke-linecap="round" opacity="${S.P(8,0.1,0.2)}"/>`+pill(1600,660,'ছায়া (Shadow)',56,{sc:back(S.P(8,0.05,0.2)),op:1}); }
  }
  return {svg:s,ui:u};
}));
