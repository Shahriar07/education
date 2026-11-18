/* Scene 5: zoom into matter - atoms and electrons */
function atomOne(x,y,sc,t,shake=0){ let s=`<g transform="translate(${x},${y}) scale(${sc})">`;
  [[0,1.0],[60,1.3],[120,0.8]].forEach(([rot,sp],i)=>{ const a=t*sp*2.2+i*2; const ex=250*Math.cos(a), ey=90*Math.sin(a)+shake*Math.sin(t*9);
    s+=`<g transform="rotate(${rot})"><ellipse rx="250" ry="90" fill="none" stroke="#6f86c9" stroke-width="5" opacity=".7"/><circle cx="${F(ex)}" cy="${F(ey)}" r="20" fill="#4cc9f0" stroke="#fff" stroke-width="4"/></g>`; });
  s+=`<circle r="62" fill="#f77f00"/><circle r="40" fill="#fcbf49"/></g>`; return s; }
SCENES.push(mkScene([
 {c:"এবার আরেকটা ধাঁধা। আলো তো সব জিনিসের ওপরই পড়ে।"},
 {c:"তবু স্টিলের থালা চকচক করে, কালো ছাতা রোদে গরম হয়ে যায়, আর কাচের গ্লাসের ভেতর দিয়ে সব দেখা যায়।"},
 {c:"একই আলো, তিন রকম কাণ্ড কেন?"},
 {c:"এর উত্তর পেতে হলে আমাদের জিনিসের ভেতরে ঢুকতে হবে। অনেক, অনেক ভেতরে।"},
 {c:"চলো, থালাটাকে বড় করে দেখি। আরও বড়। আরও বড়!"},
 {c:"এই যে ছোট ছোট গোল দানা দেখছ, এদের নাম পরমাণু।"},
 {c:"থালা, ছাতা, পানি, তুমি, আমি, পৃথিবীর সব জিনিস এই পরমাণু দিয়ে তৈরি।"},
 {c:"এরা এত ছোট যে খালি চোখে তো নয়ই, সাধারণ অণুবীক্ষণ যন্ত্রেও দেখা যায় না।"},
 {c:"প্রতিটি পরমাণুর ভেতরে আছে আরও ছোট কণা, নাম ইলেকট্রন। ইলেকট্রন খুব হালকা আর খুব চঞ্চল।"},
 {c:"আলো যখন কোনো জিনিসের ওপর পড়ে, তখন আসল খেলাটা হয় এই ইলেকট্রনদের সঙ্গে।"}
],function(t,S){
  let s='',u='';
  if(t<S.A(4)){ // three objects on a table
    s+=bg('#f1e3c0')+`<rect y="760" width="1920" height="320" fill="#a8703d"/><rect y="760" width="1920" height="16" fill="#8a5a30"/>`;
    // light from above
    [420,960,1500].forEach((x,i)=>{ const p=S.P(0,0.25+i*0.12,0.6+i*0.12); s+=ray(x-120,70,x-10,470,t>=S.A(1)?1:p,{w:10,op:0.85,arrow:t>=S.A(1)||p>=1}); });
    // steel plate
    s+=`<defs><linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".5" stop-color="#9aa6b2"/><stop offset="1" stop-color="#e3e8ec"/></linearGradient></defs>`;
    s+=`<ellipse cx="420" cy="770" rx="230" ry="62" fill="#7c8894"/><ellipse cx="420" cy="760" rx="230" ry="62" fill="url(#steel)"/><ellipse cx="420" cy="760" rx="165" ry="42" fill="#c9d1d9" stroke="#8b97a3" stroke-width="4"/>`;
    // black umbrella (open, resting)
    s+=`<path d="M720 640 Q960 330 1200 640 Q1140 610 1080 640 Q1020 610 960 640 Q900 610 840 640 Q780 610 720 640 Z" fill="#1d1d24"/><rect x="954" y="420" width="12" height="340" fill="#5b4a3a"/><path d="M960 760 q0 34 -34 34" stroke="#5b4a3a" stroke-width="12" fill="none" stroke-linecap="round"/><rect x="952" y="398" width="16" height="30" rx="6" fill="#333"/>`;
    // glass of water with a red ball behind it
    s+=`<circle cx="1560" cy="690" r="62" fill="#e63946"/>`;
    s+=`<path d="M1400 520 L1600 520 L1575 770 L1425 770 Z" fill="#bfe6f5" opacity=".45" stroke="#7fb9d1" stroke-width="6"/><path d="M1408 600 L1592 600 L1575 770 L1425 770 Z" fill="#69b9dd" opacity=".45"/><ellipse cx="1500" cy="520" rx="100" ry="14" fill="none" stroke="#7fb9d1" stroke-width="6"/>`;
    s+=txt(420,900,'স্টিলের থালা',54,{c:'#fff'})+txt(960,900,'কালো ছাতা',54,{c:'#fff'})+txt(1500,900,'কাচের গ্লাস',54,{c:'#fff'});
    if(S.on(1)){ const a=S.P(1,0.08,0.3), b=S.P(1,0.36,0.6), c=S.P(1,0.66,0.9);
      if(a>0){ [[330,730,40],[480,745,28],[410,790,22]].forEach(([x,y,r],i)=>{ s+=sparkle(x,y,r*(0.7+0.3*Math.sin(t*8+i*2)),a); }); s+=pill(420,640,'চকচক করে',46,{sc:back(a)}); }
      if(b>0){ s+=heatWaves(960,400,4,t,b); s+=pill(960,290,'গরম হয়',46,{sc:back(b),b:'#e63946',c:'#fff'}); }
      if(c>0){ s+=`<circle cx="1560" cy="690" r="${70+6*Math.sin(t*6)}" fill="none" stroke="${Y}" stroke-width="7" stroke-dasharray="14 12" opacity="${c}"/>`; s+=pill(1500,440,'ভেতর দিয়ে দেখা যায়',46,{sc:back(c),b:'#2e86de',c:'#fff'}); } }
    if(S.on(2)) { s+=`<rect width="1920" height="1080" fill="${NAVY}" opacity="${(0.55*S.fade(2)).toFixed(2)}"/>`; u+=card('একই আলো, তিন রকম কাণ্ড কেন?',S.P(2,0.08,0.25),S.fade(2),330,1300,80); }
    if(S.on(3)){ const p=ease(S.P(3,0.1,0.55)); const mx=1300-(1300-420)*p, my=330+(760-330)*p; const r=120+30*Math.sin(t*3)*0+ 0;
      s+=`<g transform="translate(${F(mx)},${F(my)})"><line x1="85" y1="85" x2="210" y2="210" stroke="#5b4a3a" stroke-width="30" stroke-linecap="round"/><circle r="120" fill="#bfe6f5" opacity=".35"/><circle r="120" fill="none" stroke="${NAVY}" stroke-width="18"/></g>`; }
    return {svg:s,ui:u};
  }
  if(S.on(4)){ // zoom sequence
    const p=S.P(4,0.02,0.98); const k=p*3; // three stages
    s+=bg('#c9d1d9');
    const st1=1-pr(k,0.8,1.1), st2=Math.min(pr(k,0.8,1.1),1-pr(k,1.8,2.1)), st3=pr(k,1.8,2.1);
    // stage 1: scratched metal
    let a=''; for(let i=0;i<40;i++){ const x=(i*193)%1920, y=(i*331)%1080, L=80+(i*47)%220, ang=(i*29)%180; a+=`<line x1="${x}" y1="${y}" x2="${F(x+L*Math.cos(ang))}" y2="${F(y+L*Math.sin(ang))}" stroke="#8b97a3" stroke-width="${2+i%4}" opacity=".7"/>`; }
    s+=g(st1,`<rect width="1920" height="1080" fill="#c9d1d9"/>`+a,`translate(960,540) scale(${F(1+cl(k)*2.2)}) translate(-960,-540)`);
    // stage 2: metal grains
    let b=`<rect width="1920" height="1080" fill="#aab4c0"/>`; for(let i=0;i<7;i++)for(let j=0;j<5;j++){ const x=i*300+(j%2)*150-60, y=j*250-40; const sh=['#9eaab8','#b4bec9','#8f9cab','#a7b2be'][(i+j*3)%4]; b+=`<polygon points="${x},${y+60} ${x+150},${y} ${x+300},${y+70} ${x+290},${y+230} ${x+140},${y+290} ${x+10},${y+220}" fill="${sh}" stroke="#6f7c8a" stroke-width="5"/>`; }
    s+=g(st2,b,`translate(960,540) scale(${F(1+cl(k-0.8)*1.6)}) translate(-960,-540)`);
    // stage 3: atoms
    s+=g(st3,bg(NAVY)+atomGrid(-40,60,11,7,200,170,74,t,{c:'#8fa3c4'}),`translate(960,540) scale(${F(0.45+0.55*ease(cl(k-1.9)/1.1))}) translate(-960,-540)`);
    const lab=k<1?'×১০০':(k<2?'×১,০০,০০০':'×১০,০০,০০,০০০'); u+=`<div class="abs" style="right:60px;top:40px"><span class="chip" style="font-size:54px;padding:22px 40px 16px">${lab}</span></div>`;
    return {svg:s,ui:u};
  }
  if(S.on(5,7)){
    s+=bg(NAVY)+atomGrid(-40,60,11,7,200,170,74,t,{c:'#8fa3c4'});
    if(S.on(5)) { s+=`<rect width="1920" height="1080" fill="${NAVY}" opacity="${(0.45*S.fade(5)).toFixed(2)}"/>`; u+=termCard('পরমাণু','Atom',S.P(5,0.4,0.55),S.fade(5),960,420); }
    if(S.on(6)){ const names=['থালা','ছাতা','পানি','তুমি','আমি']; s+=`<rect width="1920" height="1080" fill="${NAVY}" opacity="${(0.5*S.fade(6)).toFixed(2)}"/>`;
      names.forEach((n,i)=>{ const q=S.P(6,0.04+i*0.11,0.14+i*0.11); if(q>0) s+=pill(300+i*330,400,n,70,{sc:back(q),op:S.fade(6)}); });
      u+=`<div class="abs" style="left:0;width:1920px;top:520px;text-align:center;color:#fff;font-size:72px;font-weight:700;opacity:${Math.min(S.P(6,0.6,0.7),S.fade(6)).toFixed(2)}">সবই <span style="color:${Y}">পরমাণু</span> দিয়ে তৈরি</div>`; }
    if(S.on(7)){ s+=`<rect width="1920" height="1080" fill="${NAVY}" opacity="${(0.35*S.fade(7)).toFixed(2)}"/>`; u+=card('ভিডিওতে অনেক বড় করে দেখানো হয়েছে',S.P(7,0.1,0.22),S.fade(7),360,1300,60); }
    return {svg:s,ui:u};
  }
  // single atom with electrons
  s+=bg(NAVY);
  const sh=S.on(9)?40*S.P(9,0.35,0.5):0;
  s+=atomOne(960,470,1,t,sh);
  if(S.on(8)){ s+=`<line x1="1260" y1="230" x2="1150" y2="330" stroke="${Y}" stroke-width="7" stroke-linecap="round" opacity="${S.P(8,0.35,0.45)}"/>`; u+=termCard('ইলেকট্রন','Electron',S.P(8,0.32,0.45),S.fade(8),1480,230).replace(/font-size:120px/,''); }
  else { const p=S.P(9,0.1,0.45); const xe=40+ (700-40)*p; const k=2*Math.PI/150; s+=wave(40,xe,470,60,x=>k*x-t*7,{w:9}); if(p<1) s+=`<circle cx="${F(xe)}" cy="${F(470+60*Math.sin(k*xe-t*7))}" r="13" fill="#fff6c2"/>`; s+=txt(360,330,'আলোর ঢেউ',56,{c:Y,op:pr(p,0.3,0.6)}); }
  return {svg:s,ui:u};
}));
