/* Scene 8: do it yourself - three cards and a candle */
SCENES.push(mkScene([
 {c:"এবার নিজের হাতে পরীক্ষা করার পালা। তোমার বিজ্ঞান বইয়েও এই পরীক্ষাটা আছে।"},
 {c:"লাগবে পুরোনো খাতার তিনটা সমান মাপের শক্ত মলাট, একটা পেরেক আর একটা মোমবাতি।"},
 {c:"মলাট তিনটা একসঙ্গে রেখে পেরেক দিয়ে মাঝখানে একটা ফুটো করো।"},
 {c:"এবার তিনটাকে টেবিলে এক সারিতে খাড়া করে দাঁড় করাও, যেন তিনটা ফুটো একই সোজা লাইনে থাকে।"},
 {c:"পেছনে মোমবাতি জ্বালাও। আগুন জ্বালানোর সময় অবশ্যই বড় কাউকে পাশে রাখবে।"},
 {c:"এখন সামনের ফুটোয় চোখ রাখো। মোমবাতির শিখা দেখা যাচ্ছে, তাই না?"},
 {c:"এবার মাঝের মলাটটা একটু পাশে সরিয়ে দাও। শিখা আর দেখা যাচ্ছে না!"},
 {c:"কেন এমন হলো? উত্তরটা কমেন্টে লিখে জানাও।"}
],function(t,S){
  let s=bg(NAVY),u='';
  const nail=(x,y,rot)=>`<g transform="translate(${F(x)},${F(y)}) rotate(${rot})"><rect x="-7" y="-150" width="14" height="150" fill="#b9c2cc"/><polygon points="-7,0 7,0 0,30" fill="#8b97a3"/><rect x="-26" y="-166" width="52" height="18" rx="6" fill="#8b97a3"/></g>`;
  const cardFront=(x,y,c,hole)=>`<rect x="${x-210}" y="${y-150}" width="420" height="300" rx="14" fill="${c}" stroke="#5c3d1e" stroke-width="5"/>`+(hole?`<circle cx="${x}" cy="${y}" r="16" fill="${NAVY}"/>`:'');
  if(S.on(0)){ u+=banner('নিজে করো',S.P(0,0.08,0.25),1,330); u+=`<div class="abs" style="left:0;width:1920px;top:520px;text-align:center;color:#fff;font-size:64px;font-weight:600;opacity:${S.P(0,0.3,0.45).toFixed(2)}">হাতে-কলমে পরীক্ষা</div>`; }
  else if(S.on(1)){ const a=S.P(1,0.2,0.32), b=S.P(1,0.55,0.67), c=S.P(1,0.75,0.87);
    s+=g(a,cardFront(470,470,'#b98b4e')+cardFront(440,500,'#c99a5b')+cardFront(410,530,'#d9ab6c'),`translate(0,${(1-back(a))*60})`)+txt(440,800,'৩টি শক্ত মলাট',58,{op:a});
    s+=g(b,nail(1010,600,20))+txt(1010,800,'পেরেক',58,{op:b});
    s+=g(c,candle(1500,690,220,0,t))+txt(1500,800,'মোমবাতি',58,{op:c}); }
  else if(S.on(2)){ const p=S.P(2,0.35,0.6), pull=S.P(2,0.7,0.9); const hole=p>=1;
    s+=cardFront(1000,480,'#b98b4e')+cardFront(970,510,'#c99a5b')+cardFront(940,540,'#d9ab6c',hole);
    const ny=250+(540-250)*ease(p)-200*ease(pull); s+=nail(940,ny,0);
    if(hole) s+=pill(1400,540,'ফুটো',60,{sc:back(S.P(2,0.6,0.7))})+`<line x1="1290" y1="540" x2="975" y2="540" stroke="${Y}" stroke-width="7" stroke-linecap="round" opacity="${S.P(2,0.62,0.72)}"/>`; }
  else if(S.on(3,6)){ // top view of the table
    const hy=530;
    s+=`<rect x="200" y="250" width="1290" height="560" rx="40" fill="#a8703d" stroke="#7d4e27" stroke-width="10"/>`;
    u+=`<div class="abs" style="right:60px;top:40px"><span class="chip">ওপর থেকে দেখা</span></div>`;
    const xs=[760,1010,1260]; const shift=S.on(6)?100*ease(S.P(6,0.3,0.5)):0;
    xs.forEach((x,i)=>{ const inn=t>=S.A(4)?1:ease(S.P(3,0.08+i*0.15,0.3+i*0.15)); const cy=hy+(i===1?shift:0)-(1-inn)*700;
      s+=`<rect x="${x-14}" y="${F(cy-175)}" width="28" height="157" rx="4" fill="#e3bd82" stroke="#5c3d1e" stroke-width="4"/><rect x="${x-14}" y="${F(cy+18)}" width="28" height="157" rx="4" fill="#e3bd82" stroke="#5c3d1e" stroke-width="4"/>`; });
    if(S.on(3)){ const p=S.P(3,0.65,0.9); s+=`<line x1="600" y1="${hy}" x2="${F(600+820*p)}" y2="${hy}" stroke="#fff" stroke-width="5" stroke-dasharray="14 14" opacity=".8"/>`; s+=pill(1010,180,'তিনটা ফুটো এক লাইনে',52,{sc:back(S.P(3,0.75,0.88))}); }
    if(t>=S.A(4)){ const lit=cl(pr(t,S.A(4)+0.6,S.A(4)+1.1)); s+=`<circle cx="440" cy="${hy}" r="${F(150*lit)}" fill="#ffb347" opacity="${(0.3+0.05*Math.sin(t*13)).toFixed(2)}"/><circle cx="440" cy="${hy}" r="46" fill="#d98a3a"/><circle cx="440" cy="${hy}" r="34" fill="#fbf7ea" stroke="#d9d2bb" stroke-width="3"/><circle cx="440" cy="${hy}" r="${F(6+12*lit)}" fill="${lit>0?'#ff9a2e':'#333'}"/>`+(lit>0?`<circle cx="440" cy="${hy}" r="${F(7*lit)}" fill="#ffe680"/>`:''); }
    if(S.on(4)){ const q=S.P(4,0.45,0.58); s+=`<g transform="translate(960,180) scale(${back(q).toFixed(3)})"><rect x="-330" y="-90" width="660" height="180" rx="36" fill="#e63946"/><polygon points="-250,40 -200,-46 -150,40" fill="#fff"/>${txt(-200,30,'!',60,{c:'#e63946'})}${txt(70,22,'বড়দের সাথে করো',54)}</g>`; }
    if(t>=S.A(5)){ s+=eye(1690,hy,1.25,-18,0,S.fin(5));
      if(S.on(5)){ const p=S.P(5,0.2,0.55); s+=ray(470,hy,1570,hy,p,{w:10,arrow:p>=1}); s+=tick(1690,360,34,S.P(5,0.6,0.72)); s+=pill(960,180,'শিখা দেখা যাচ্ছে',54,{sc:back(S.P(5,0.62,0.74)),b:'#2a9d5c',c:'#fff'}); }
      else { const blocked=S.P(6,0.3,0.5)>0.2; if(!blocked) s+=ray(470,hy,1570,hy,1,{w:10,arrow:1}); else { s+=ray(470,hy,994,hy,1,{w:10,head:0}); s+=`<circle cx="994" cy="${hy}" r="${F(14+3*Math.sin(t*8))}" fill="#fff6c2"/>`; }
        s+=cross(1690,360,34,S.P(6,0.55,0.68)); s+=pill(960,180,'শিখা দেখা যাচ্ছে না',54,{sc:back(S.P(6,0.6,0.72)),b:'#e63946',c:'#fff'}); } }
  }
  else { u+=card('কেন এমন হলো?',S.P(7,0.05,0.2),1,300,1000,96); u+=`<div class="abs" style="left:0;width:1920px;top:600px;text-align:center;color:${Y};font-size:64px;font-weight:600;opacity:${S.P(7,0.4,0.52).toFixed(2)}">উত্তরটা কমেন্টে লিখে জানাও</div>`; }
  return {svg:s,ui:u};
}));
