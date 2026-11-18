/* Scene 1: the dark room, then the title card */
(function(){
const CANDLE={x:1345,y:640};
function room(t,T){
  const on = t<T.off-0.5 ? 1 : (t<T.off ? ((Math.floor((t-(T.off-0.5))*14)%2)?0.15:0.9) : 0);
  const st=[[230,230],[300,280],[410,225],[250,380],[440,330],[350,430],[215,460]];
  let s='';
  s+=`<rect width="1920" height="1080" fill="#ead9ae"/><rect y="0" width="1920" height="70" fill="#d8c594"/><rect y="860" width="1920" height="220" fill="#9a7550"/><rect y="850" width="1920" height="16" fill="#7c5a3a"/>`;
  s+=`<rect x="170" y="170" width="330" height="360" rx="10" fill="#6b4324"/><rect x="190" y="190" width="290" height="320" fill="#12204a"/><circle cx="400" cy="270" r="38" fill="#f6f1d5"/><circle cx="416" cy="260" r="34" fill="#12204a"/>`;
  st.forEach(([x,y],i)=>{const o=0.5+0.5*Math.sin(t*2+i*1.7);s+=`<circle cx="${x}" cy="${y}" r="3.5" fill="#fff" opacity="${o.toFixed(2)}"/>`;});
  s+=`<rect x="328" y="190" width="14" height="320" fill="#6b4324"/><rect x="190" y="343" width="290" height="14" fill="#6b4324"/>`;
  s+=`<rect x="1440" y="330" width="340" height="18" fill="#6b4324"/>`;
  [["#c0392b",1460,70],["#2e86ab",1495,90],["#27ae60",1532,60],["#8e44ad",1566,82],["#e67e22",1602,74]].forEach(([c,x,h])=>{s+=`<rect x="${x}" y="${330-h}" width="30" height="${h}" rx="3" fill="${c}"/>`;});
  s+=`<circle cx="1710" cy="290" r="38" fill="#fff" stroke="#6b4324" stroke-width="8"/><line x1="1710" y1="290" x2="1710" y2="266" stroke="#333" stroke-width="5" stroke-linecap="round"/><line x1="1710" y1="290" x2="1728" y2="296" stroke="#333" stroke-width="5" stroke-linecap="round"/>`;
  s+=`<line x1="960" y1="0" x2="960" y2="130" stroke="#3a3a3a" stroke-width="6"/><rect x="942" y="126" width="36" height="30" rx="5" fill="#555"/>`;
  if(on>0) s+=`<circle cx="960" cy="190" r="${300+8*Math.sin(t*5)}" fill="url(#bulbglow)" opacity="${on}"/>`;
  s+=`<circle cx="960" cy="190" r="38" fill="${on>0.5?'#fff6c2':(on>0?'#b9b28a':'#8d8d8d')}" stroke="#777" stroke-width="3"/>`;
  // empty chair
  s+=`<rect x="868" y="560" width="22" height="200" rx="8" fill="#6b4324"/><rect x="1030" y="560" width="22" height="200" rx="8" fill="#6b4324"/><rect x="868" y="566" width="184" height="30" rx="10" fill="#8a5a30"/><rect x="868" y="630" width="184" height="24" rx="10" fill="#8a5a30"/><rect x="868" y="688" width="184" height="24" rx="10" fill="#8a5a30"/>`;
  // table
  s+=`<polygon points="470,735 1450,735 1560,830 360,830" fill="#a8703d"/><rect x="360" y="830" width="1200" height="42" fill="#7d4e27"/><rect x="400" y="872" width="46" height="208" fill="#6b4120"/><rect x="1474" y="872" width="46" height="208" fill="#6b4120"/>`;
  // open book
  s+=`<polygon points="800,812 955,800 955,752 815,762" fill="#fdfdf6" stroke="#b9b39b" stroke-width="3"/><polygon points="1120,812 965,800 965,752 1105,762" fill="#fdfdf6" stroke="#b9b39b" stroke-width="3"/>`;
  for(let i=0;i<4;i++){s+=`<line x1="${828+i*2}" y1="${772+i*9}" x2="940" y2="${763+i*9}" stroke="#9aa3b5" stroke-width="3"/><line x1="${1092-i*2}" y1="${772+i*9}" x2="980" y2="${763+i*9}" stroke="#9aa3b5" stroke-width="3"/>`;}
  s+=`<rect x="955" y="750" width="10" height="52" fill="#2e86ab"/>`;
  { const cyc=(t%3.0); if(t<T.off-0.6 && cyc>1.4 && cyc<2.2){ const k=Math.cos(Math.PI*(cyc-1.4)/0.8), lift=26*Math.sin(Math.PI*(cyc-1.4)/0.8); const xo=960+k*150;
      s+=`<polygon points="960,800 ${xo.toFixed(1)},${(808-lift).toFixed(1)} ${(xo-k*14).toFixed(1)},${(760-lift).toFixed(1)} 960,752" fill="#f4f2e6" stroke="#b9b39b" stroke-width="3"/>`; } }
  s+=`<polygon points="520,812 700,812 680,760 545,760" fill="#2e86ab"/><polygon points="560,800 665,800 655,772 572,772" fill="#fff" opacity=".9"/>`;
  s+=`<g transform="rotate(-18 1215 795)"><rect x="1150" y="788" width="130" height="14" rx="7" fill="#27ae60"/><polygon points="1280,788 1304,795 1280,802" fill="#333"/></g>`;
  s+=`<ellipse cx="${CANDLE.x}" cy="800" rx="62" ry="15" fill="#b5651d"/><ellipse cx="${CANDLE.x}" cy="795" rx="50" ry="11" fill="#d98a3a"/><rect x="${CANDLE.x-20}" y="680" width="40" height="116" rx="6" fill="#fbf7ea" stroke="#d9d2bb" stroke-width="2"/><line x1="${CANDLE.x}" y1="680" x2="${CANDLE.x}" y2="664" stroke="#333" stroke-width="4"/>`;
  return s;
}
function titleCard(t,T){
  let s=`<rect width="1920" height="1080" fill="${NAVY}"/>`;
  const rot=(t-T.card)*4;
  s+=`<g transform="translate(960,360) rotate(${rot.toFixed(2)})" opacity=".07">`; for(let i=0;i<12;i++) s+=`<polygon points="0,0 1500,-110 1500,110" fill="${Y}" transform="rotate(${i*30})"/>`; s+=`</g>`;
  s+=`<rect y="540" width="1920" height="540" fill="${NAVY}" opacity=".75"/>`;
  const p=ease(pr(t,T.card+1.5,T.card+2.4)), x0=330,x1=1590,y=535;
  if(p>0){ const hx=x0+(x1-x0)*p; s+=`<line x1="${x0}" y1="${y}" x2="${hx.toFixed(1)}" y2="${y}" stroke="${Y}" stroke-width="10" stroke-linecap="round"/><circle cx="${hx.toFixed(1)}" cy="${y}" r="${(46*(1+0.15*Math.sin(t*8))).toFixed(1)}" fill="${Y}" opacity=".22"/><circle cx="${hx.toFixed(1)}" cy="${y}" r="18" fill="#fff6c2"/><circle cx="${x0}" cy="${y}" r="14" fill="${Y}"/>`; }
  let u=`<div class="abs trow">`;
  [["ষষ্ঠ শ্রেণি","",0.3],["বিজ্ঞান","",0.5],["অধ্যায় ৯: আলোর ঘটনা","o",0.7]].forEach(([x,c,d])=>{ const q=t>=T.card+d?back(pr(t,T.card+d,T.card+d+0.35)):0; u+=`<div class="tchip ${c}" style="transform:scale(${q.toFixed(3)})">${x}</div>`; });
  u+=`</div>`;
  const tp=ease(pr(t,T.card+0.9,T.card+1.5));
  u+=`<div class="abs title" style="opacity:${tp.toFixed(2)};transform:translateY(${((1-tp)*40).toFixed(1)}px)"><b>আলো</b> কী ও কীভাবে চলে</div>`;
  u+=`<div class="abs learn" style="opacity:${ease(pr(t,T.learn,T.learn+0.4)).toFixed(2)}">আজ যা জানব</div>`;
  u+=`<div class="abs cards">`;
  [["১","আলো আসলে কী",T.c1],["২","আলো কীভাবে চলে",T.c2],["৩","আলো পড়লে জিনিসের<br>ভেতরে কী ঘটে",T.c3]].forEach(([n,x,t0])=>{ const q=t>=t0?back(pr(t,t0,t0+0.4)):0; u+=`<div class="card" style="transform:scale(${q.toFixed(3)});opacity:${t>=t0?1:0}"><div class="num">${n}</div><div>${x}</div></div>`; });
  u+=`</div>`;
  return {svg:s,ui:u};
}
SCENES.push(mkScene([
 {c:"ধরো, সন্ধ্যাবেলা তুমি পড়ার টেবিলে বসে বিজ্ঞান বই পড়ছ।"},
 {c:"হঠাৎ, ফট! কারেন্ট চলে গেল। পুরো ঘর অন্ধকার।"},
 {c:"তোমার বই টেবিলেই আছে। কলম আছে, খাতাও আছে।"},
 {c:"কিন্তু তুমি কিছুই দেখতে পাচ্ছ না।"},
 {c:"একটু পরে কেউ একটা মোমবাতি জ্বালাল।"},
 {c:"আর সঙ্গে সঙ্গে বই, কলম, খাতা, সব আবার ফিরে এল!"},
 {c:"এবার একটু ভাবো তো। জিনিসগুলো তো ঘরেই ছিল, কোথাও যায়নি।"},
 {c:"তাহলে অন্ধকারে তুমি সেগুলো দেখতে পেলে না কেন?"},
 {c:"চলো, আজ আমরা একসঙ্গে আলোর রহস্য খুঁজে বের করি।"},
 {d:3.4},
 {c:"আজ আমরা জানব তিনটি বিষয়।"},
 {c:"এক, আলো আসলে কী।"},
 {c:"দুই, আলো কীভাবে চলে।"},
 {c:"আর তিন, কোনো জিনিসের ওপর আলো পড়লে তার ভেতরে কী ঘটে।"},
 {d:1.6}
],function(t,S){
  const T={off:S.A(1)+0.9, armIn:S.A(4)+0.2, lit:S.A(4)+1.5, tags:S.A(5)+0.5, tagsOut:S.A(6), q:S.A(7), qOut:S.E(8)-0.4, wipe:S.E(8)-0.2, card:S.E(8)+0.5,
           learn:S.A(10), c1:S.A(11), c2:S.A(12), c3:S.A(13)};
  if(t>=T.card){ const r=titleCard(t,T); const k=ease(pr(t,T.card,T.card+0.6)); r.svg+=`<rect width="1920" height="1080" fill="${Y}" opacity="${(1-k).toFixed(3)}"/>`; r.ui=`<div style="opacity:${k.toFixed(3)}">${r.ui}</div>`; r.noChip=true; return r; }
  let s=`<defs><radialGradient id="bulbglow"><stop offset="0" stop-color="#fff4b8" stop-opacity=".85"/><stop offset="1" stop-color="#fff4b8" stop-opacity="0"/></radialGradient>
  <radialGradient id="cglow" gradientUnits="userSpaceOnUse" cx="${CANDLE.x}" cy="${CANDLE.y}" r="${Math.max(1,ease(pr(t,T.lit,T.lit+2.3))*1500).toFixed(1)}"><stop offset="0" stop-color="#05070f" stop-opacity="0"/><stop offset=".5" stop-color="#05070f" stop-opacity=".22"/><stop offset="1" stop-color="#05070f" stop-opacity=".93"/></radialGradient>
  <radialGradient id="warm" gradientUnits="userSpaceOnUse" cx="${CANDLE.x}" cy="${CANDLE.y}" r="700"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
  <radialGradient id="mglow"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient></defs>`;
  s+=room(t,T);
  if(t>=T.off && t<T.lit){
    s+=`<rect width="1920" height="1080" fill="#05070f" opacity=".93"/><rect x="190" y="190" width="290" height="320" fill="#1b2d66" opacity=".35"/><circle cx="400" cy="270" r="38" fill="#f6f1d5" opacity=".5"/><circle cx="416" cy="260" r="34" fill="#0a1026" opacity=".8"/>`;
  } else if(t>=T.lit){
    s+=`<rect width="1920" height="1080" fill="#ff9a2e" opacity=".10"/><rect width="1920" height="1080" fill="url(#cglow)"/>`;
    s+=`<circle cx="${CANDLE.x}" cy="${CANDLE.y}" r="${(700*ease(pr(t,T.lit,T.lit+1.1))).toFixed(1)}" fill="url(#warm)" opacity="${(0.8+0.12*Math.sin(t*13)).toFixed(2)}"/>`;
  }
  if(t>=T.armIn && t<T.lit+1.6){
    const inn=ease(pr(t,T.armIn,T.armIn+0.9)), out=ease(pr(t,T.lit+0.7,T.lit+1.5)); const off=(1-inn)*620+out*620; const hx=CANDLE.x+52+off, hy=CANDLE.y+8;
    s+=`<g><path d="M${1960+off} ${hy+150} Q${hx+260} ${hy+110} ${hx+60} ${hy+22}" stroke="#2a9d8f" stroke-width="80" fill="none" stroke-linecap="round"/><path d="M${hx+110} ${hy+48} L${hx+38} ${hy+14}" stroke="#c98d5e" stroke-width="54" fill="none" stroke-linecap="round"/><rect x="${hx+96}" y="${hy+14}" width="16" height="64" rx="6" fill="#e9c46a" transform="rotate(-24 ${hx+104} ${hy+46})"/><line x1="${hx+34}" y1="${hy+8}" x2="${hx-44}" y2="${hy-18}" stroke="#d9b98a" stroke-width="7" stroke-linecap="round"/>`;
    if(t<T.lit+0.7) s+=`<circle cx="${hx-46}" cy="${hy-26}" r="110" fill="url(#mglow)"/>`+flame(hx-46,hy-16,0.45,t+1);
    s+=`</g>`;
  }
  if(t>=T.lit) s+=flame(CANDLE.x,664,back(pr(t,T.lit,T.lit+0.5)),t);
  if(t>=T.q) s+=`<rect width="1920" height="1080" fill="#05070f" opacity="${(0.5*ease(pr(t,T.q-0.0,T.q+0.5))).toFixed(2)}"/>`;
  if(t>=T.wipe) s+=`<circle cx="${CANDLE.x}" cy="${CANDLE.y}" r="${(ease(pr(t,T.wipe,T.card))*2400).toFixed(1)}" fill="${Y}"/>`;
  let u='';
  const f0=S.A(1)+0.35;
  if(t>=f0 && t<f0+1.5){ u+=`<div class="abs fot" style="transform:scale(${back(pr(t,f0,f0+0.3)).toFixed(3)}) rotate(-6deg);opacity:${(1-pr(t,f0+1.1,f0+1.5)).toFixed(2)}">ফট!</div>`; }
  if(t>=T.tags && t<T.tagsOut+0.4){ const o=1-pr(t,T.tagsOut,T.tagsOut+0.4);
    [["বই",960,845,0],["কলম",1215,845,0.6],["খাতা",612,845,1.2]].forEach(([x,px,py,d])=>{ if(t>=T.tags+d) u+=`<div class="abs" style="left:${px-150}px;width:300px;top:${py}px;display:flex;justify-content:center;opacity:${o.toFixed(2)}"><div class="tag" style="transform:scale(${back(pr(t,T.tags+d,T.tags+d+0.35)).toFixed(3)})">${x}</div></div>`; }); }
  if(t>=T.q+0.2 && t<T.qOut+0.3){ const o=1-pr(t,T.qOut,T.qOut+0.3);
    u+=card('অন্ধকারে দেখা যায় না কেন',pr(t,T.q+0.2,T.q+0.65),o,120,1260,84);
    if(t>=T.q+0.8) u+=`<div class="abs qmark" style="transform:translateY(${(10*Math.sin((t-T.q)*4)).toFixed(1)}px) scale(${back(pr(t,T.q+0.8,T.q+1.2)).toFixed(3)}) rotate(10deg);opacity:${o.toFixed(2)}">?</div>`; }
  return {svg:s,ui:u};
}));
})();
