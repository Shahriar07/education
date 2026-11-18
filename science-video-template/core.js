const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const pr=(t,a,b)=>cl((t-a)/(b-a));
const ease=x=>x*x*(3-2*x);
const back=x=>{x=cl(x);const c=1.70158;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2);};
const Y="#FFC83D", NAVY="#0f1b3d", INK="#1a1a2e";
const BN=n=>String(n).replace(/\d/g,d=>'০১২৩৪৫৬৭৮৯'[d]);
const F=n=>Number(n).toFixed(1);

function bg(c){return `<rect width="1920" height="1080" fill="${c}"/>`;}
function g(o,inner,tr){ if(o<=0.001) return ''; return `<g opacity="${cl(o).toFixed(3)}"${tr?` transform="${tr}"`:''}>${inner}</g>`; }
function txt(x,y,s,size,o={}){ const {c='#fff',w=700,a='middle',op=1}=o;
  return `<text x="${x}" y="${y}" font-family="Hind Siliguri, Arial, sans-serif" font-size="${size}" font-weight="${w}" fill="${c}" text-anchor="${a}" opacity="${cl(op).toFixed(3)}">${s}</text>`; }
function pill(x,y,s,size,o={}){ // centred label with background, width estimated
  const {c=INK,b=Y,op=1,sc=1,wf=0.56}=o; const w=s.length*size*wf+size*1.2, h=size*1.7;
  return `<g opacity="${cl(op).toFixed(3)}" transform="translate(${x},${y}) scale(${sc.toFixed(3)})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="${b}"/>${txt(0,size*0.36,s,size,{c})}</g>`; }
function sky(c1='#9fd4ff',c2='#e9f6ff'){ return `<defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#skyg)"/>`; }
function stars(t,n=60,seed=1){ let s=''; for(let i=0;i<n;i++){ const x=(Math.sin(i*12.9898*seed)*43758.5453%1+1)%1*1920, y=(Math.sin(i*78.233*seed)*12345.678%1+1)%1*1080; const o=0.35+0.4*Math.sin(t*1.5+i); s+=`<circle cx="${F(x)}" cy="${F(y)}" r="${1.5+(i%3)}" fill="#fff" opacity="${o.toFixed(2)}"/>`; } return s; }
function sun(x,y,r,t,o=1){ let s=`<g opacity="${o}" transform="translate(${x},${y})">`;
  s+=`<circle r="${r*1.9}" fill="#ffe27a" opacity=".25"/>`;
  for(let i=0;i<12;i++){ const a=i*30+t*8; const L=r*(1.55+0.12*Math.sin(t*3+i)); s+=`<line x1="0" y1="${-r*1.2}" x2="0" y2="${-L}" stroke="#ffb703" stroke-width="${r*0.12}" stroke-linecap="round" transform="rotate(${F(a)})"/>`; }
  s+=`<circle r="${r}" fill="#ffc83d"/><circle r="${r*0.72}" fill="#ffd966"/></g>`; return s; }
function ray(x1,y1,x2,y2,p,o={}){ const {c=Y,w=9,head=1,op=1,arrow=0,dash=''}=o; if(p<=0) return ''; p=cl(p);
  const x=x1+(x2-x1)*p,y=y1+(y2-y1)*p; let s=`<g opacity="${cl(op).toFixed(3)}"><line x1="${F(x1)}" y1="${F(y1)}" x2="${F(x)}" y2="${F(y)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"${dash?` stroke-dasharray="${dash}"`:''}/>`;
  if(arrow){ const a=Math.atan2(y2-y1,x2-x1)*180/Math.PI; s+=`<polygon points="0,0 -34,-16 -34,16" fill="${c}" transform="translate(${F(x)},${F(y)}) rotate(${F(a)})"/>`; }
  else if(head && p<1){ s+=`<circle cx="${F(x)}" cy="${F(y)}" r="34" fill="${c}" opacity=".28"/><circle cx="${F(x)}" cy="${F(y)}" r="13" fill="#fff6c2"/>`; }
  return s+`</g>`; }
function wave(xa,xb,y,ampF,phF,o={}){ const {c=Y,w=7,op=1}=o; if(xb<=xa) return ''; let d=''; for(let x=xa;x<=xb;x+=6){ const a=typeof ampF==='function'?ampF(x):ampF; d+=(d?'L':'M')+F(x)+' '+F(y+a*Math.sin(phF(x))); }
  return `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${cl(op).toFixed(3)}"/>`; }
function eye(x,y,s=1,lx=0,ly=0,o=1){ return `<g transform="translate(${x},${y}) scale(${s})" opacity="${cl(o).toFixed(3)}"><path d="M-84 0 Q0 -66 84 0 Q0 66 -84 0 Z" fill="#fff" stroke="#1c1410" stroke-width="8" stroke-linejoin="round"/><circle cx="${lx}" cy="${ly}" r="30" fill="#6b4423"/><circle cx="${lx}" cy="${ly}" r="14" fill="#111"/><circle cx="${lx-9}" cy="${ly-10}" r="6" fill="#fff"/></g>`; }
function mango(x,y,s=1,c1='#f5b921',c2='#e58a1f'){ return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-10 -95 C60 -100 105 -30 85 40 C70 95 -20 110 -70 70 C-115 30 -90 -70 -10 -95 Z" fill="${c1}"/><path d="M40 -60 C85 -30 90 40 55 75 C100 30 95 -40 40 -60Z" fill="${c2}" opacity=".55"/><path d="M-10 -95 Q-14 -112 -4 -124" stroke="#6b4324" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="-38" cy="-28" rx="13" ry="26" fill="#fff" opacity=".35" transform="rotate(25 -38 -28)"/></g>`; }
function flame(x,y,sc,t){ if(sc<=0) return ''; const f=1+0.08*Math.sin(t*17)+0.05*Math.sin(t*29+1), sway=3*Math.sin(t*6);
  return `<g transform="translate(${x},${y}) scale(${sc.toFixed(3)},${(sc*f).toFixed(3)})"><path d="M0 0 C-22 -18 -14 -48 ${F(sway)} -72 C14 -48 22 -18 0 0 Z" fill="#ff9a2e"/><path d="M0 -4 C-11 -16 -7 -34 ${F(sway*0.6)} -48 C7 -34 11 -16 0 -4 Z" fill="#ffe680"/></g>`; }
function candle(x,yBase,h,lit,t){ // yBase = bottom
  let s=`<ellipse cx="${x}" cy="${yBase}" rx="60" ry="14" fill="#b5651d"/><ellipse cx="${x}" cy="${yBase-5}" rx="48" ry="10" fill="#d98a3a"/><rect x="${x-20}" y="${yBase-h}" width="40" height="${h-4}" rx="6" fill="#fbf7ea" stroke="#d9d2bb" stroke-width="2"/><line x1="${x}" y1="${yBase-h}" x2="${x}" y2="${yBase-h-16}" stroke="#333" stroke-width="4"/>`;
  if(lit>0) s+=`<circle cx="${x}" cy="${yBase-h-40}" r="${150*lit}" fill="#ffb347" opacity="${(0.22+0.04*Math.sin(t*13)).toFixed(2)}"/>`+flame(x,yBase-h-16,lit,t);
  return s; }
function thermo(x,y,h,level,o=1){ level=cl(level); const fh=(h-30)*level;
  return `<g opacity="${cl(o).toFixed(3)}"><rect x="${x-22}" y="${y}" width="44" height="${h}" rx="22" fill="#fff" stroke="#55606e" stroke-width="6"/><circle cx="${x}" cy="${y+h+18}" r="42" fill="#fff" stroke="#55606e" stroke-width="6"/><circle cx="${x}" cy="${y+h+18}" r="30" fill="#e63946"/><rect x="${x-10}" y="${F(y+h-fh)}" width="20" height="${F(fh+12)}" rx="8" fill="#e63946"/>`+[0.25,0.5,0.75].map(k=>`<line x1="${x+26}" y1="${y+h*k}" x2="${x+44}" y2="${y+h*k}" stroke="#55606e" stroke-width="5"/>`).join('')+`</g>`; }
function sparkle(x,y,s,o=1){ return `<path d="M0 ${-s} Q${s*0.15} ${-s*0.15} ${s} 0 Q${s*0.15} ${s*0.15} 0 ${s} Q${-s*0.15} ${s*0.15} ${-s} 0 Q${-s*0.15} ${-s*0.15} 0 ${-s} Z" fill="#fff" opacity="${cl(o).toFixed(3)}" transform="translate(${x},${y})"/>`; }
function heatWaves(x,y,n,t,o=1,c='#e63946'){ let s=''; for(let i=0;i<n;i++){ const xx=x+(i-(n-1)/2)*46, ph=t*3+i; const yy=y-((t*40+i*30)%70);
  s+=`<path d="M${xx} ${F(yy)} q14 -18 0 -36 q-14 -18 0 -36" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round" opacity="${(cl(o)*(0.5+0.4*Math.sin(ph))).toFixed(2)}"/>`; } return s; }
function cross(x,y,s,p){ if(p<=0) return ''; const k=back(p)*s; return `<g transform="translate(${x},${y})"><line x1="${-k}" y1="${-k}" x2="${k}" y2="${k}" stroke="#e63946" stroke-width="${s*0.28}" stroke-linecap="round"/><line x1="${k}" y1="${-k}" x2="${-k}" y2="${k}" stroke="#e63946" stroke-width="${s*0.28}" stroke-linecap="round"/></g>`; }
function tick(x,y,s,p){ if(p<=0) return ''; const k=back(p)*s; return `<g transform="translate(${x},${y})"><circle r="${k*1.5}" fill="#2a9d5c"/><path d="M${-k*0.7} 0 L${-k*0.15} ${k*0.55} L${k*0.75} ${-k*0.5}" stroke="#fff" stroke-width="${s*0.3}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
function earth(x,y,r){ return `<g transform="translate(${x},${y})"><clipPath id="ec${x}${y}"><circle r="${r}"/></clipPath><circle r="${r}" fill="#2e86de"/><g clip-path="url(#ec${x}${y})" fill="#3bb273"><ellipse cx="${-r*0.35}" cy="${-r*0.3}" rx="${r*0.42}" ry="${r*0.3}"/><ellipse cx="${r*0.45}" cy="${r*0.1}" rx="${r*0.35}" ry="${r*0.48}"/><ellipse cx="${-r*0.3}" cy="${r*0.6}" rx="${r*0.3}" ry="${r*0.2}"/></g><circle r="${r}" fill="none" stroke="#bfe0ff" stroke-width="${r*0.05}" opacity=".6"/></g>`; }
function kolshi(x,y,s=1){ // clay water pot, y = ground contact
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-110" rx="112" ry="108" fill="#b5651d"/><ellipse cx="-34" cy="-140" rx="30" ry="48" fill="#d98a3a" opacity=".55"/><rect x="-38" y="-248" width="76" height="46" fill="#a65a18"/><ellipse cx="0" cy="-250" rx="56" ry="14" fill="#8a4a12"/><ellipse cx="0" cy="-250" rx="40" ry="8" fill="#3d1f08"/></g>`; }
function tinHouse(x,y,w,h){ // x,y = bottom-left of wall
  let s=`<rect x="${x}" y="${y-h}" width="${w}" height="${h}" fill="#e8d9b5"/><rect x="${x+w*0.4}" y="${y-h*0.72}" width="${w*0.2}" height="${h*0.72}" fill="#8a5a30"/>`;
  const rx0=x-40, rx1=x+w+40, ry=y-h, rt=ry-h*0.55; s+=`<polygon points="${rx0},${ry} ${rx1},${ry} ${rx1-60},${rt} ${rx0+60},${rt}" fill="#9aa7b0"/>`;
  for(let i=1;i<14;i++){ const k=i/14; s+=`<line x1="${F(rx0+60+(rx1-rx0-120)*k)}" y1="${rt}" x2="${F(rx0+(rx1-rx0)*k)}" y2="${ry}" stroke="#7d8a93" stroke-width="4"/>`; }
  return s; }
function shirt(x,y,c,st='#aab'){ return `<g transform="translate(${x},${y})"><path d="M-70 0 L-30 0 Q0 26 30 0 L70 0 L130 60 L96 100 L74 78 L74 250 L-74 250 L-74 78 L-96 100 L-130 60 Z" fill="${c}" stroke="${st}" stroke-width="5" stroke-linejoin="round"/></g>`; }
function clothesline(x1,x2,y,yg){ return `<rect x="${x1-9}" y="${y-30}" width="18" height="${yg-y+30}" rx="6" fill="#b08948"/><rect x="${x2-9}" y="${y-30}" width="18" height="${yg-y+30}" rx="6" fill="#b08948"/><path d="M${x1} ${y} Q${(x1+x2)/2} ${y+26} ${x2} ${y}" stroke="#5b4a3a" stroke-width="5" fill="none"/>`; }
function atomGrid(x0,y0,cols,rows,dx,dy,r,t,o={}){ const {c='#8fa3c4',jig=3,st='#c9d6ee'}=o; let s=''; for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){ const off=(j%2)*dx/2; const jx=jig*Math.sin(t*7+i*1.7+j*2.3), jy=jig*Math.cos(t*6+i*2.1+j*1.3);
  s+=`<circle cx="${F(x0+i*dx+off+jx)}" cy="${F(y0+j*dy+jy)}" r="${r}" fill="${c}" stroke="${st}" stroke-width="4"/>`; } return s; }

/* ---------- UI (HTML) helpers ---------- */
function termCard(bn,en,p,o=1,x=960,y=420,k=1){ if(p<=0||o<=0) return ''; return `<div class="abs" style="left:${x-420}px;width:840px;top:${y-150}px;display:flex;justify-content:center;opacity:${cl(o).toFixed(2)}"><div class="term" style="transform:scale(${(back(p)*k).toFixed(3)})"><div class="tb">${bn}</div><div class="te">${en}</div></div></div>`; }
function banner(s,p,o=1,y=110){ if(p<=0||o<=0) return ''; return `<div class="abs" style="left:0;width:1920px;top:${y}px;display:flex;justify-content:center;opacity:${cl(o).toFixed(2)}"><div class="banner" style="transform:scale(${back(p).toFixed(3)})">${s}</div></div>`; }
function card(s,p,o=1,y=300,w=1300,size=72){ if(p<=0||o<=0) return ''; return `<div class="abs" style="left:0;width:1920px;top:${y}px;display:flex;justify-content:center;opacity:${cl(o).toFixed(2)}"><div class="qcard" style="width:${w}px;font-size:${size}px;transform:scale(${back(p).toFixed(3)})">${s}</div></div>`; }

/* ---------- scene / caption machinery ---------- */
function splitCap(c){ let parts=c.match(/[^।!?]+[।!?]+|[^।!?]+$/g).map(s=>s.trim()).filter(Boolean); let out=[];
  parts.forEach(p=>{ if(out.length && (out[out.length-1].length+p.length)<=64) out[out.length-1]+=' '+p; else out.push(p); });
  let res=[]; out.forEach(p=>{ if(p.length>92){ const mid=p.length/2; let best=-1; for(let i=0;i<p.length;i++){ if(p[i]===','&&(best<0||Math.abs(i-mid)<Math.abs(best-mid))) best=i; } if(best>0){ res.push(p.slice(0,best+1).trim()); res.push(p.slice(best+1).trim()); return; } } res.push(p); });
  return res; }
const wc=s=>s.trim().split(/\s+/).length;
function mkScene(segs,draw){ let t=0; const st=[]; segs.forEach(s=>{ if(!s.d){ s.d=Math.max(2.4, wc(s.c)/2.1+0.45); } st.push(t); t+=s.d;
    if(s.c){ const ch=splitCap(s.c); const tot=ch.reduce((a,c)=>a+wc(c),0); let a=0; s.caps=ch.map(c=>{ const o={c,a:st[st.length-1]+s.d*a/tot}; a+=wc(c); o.b=st[st.length-1]+s.d*a/tot; return o; }); } });
  return {segs,st,dur:t,draw}; }
function ctx(sc,t){ const A=i=>sc.st[i], E=i=>sc.st[i]+sc.segs[i].d;
  return {A,E,dur:sc.dur,
    P:(i,a=0,b=1)=>{ const s=A(i),d=sc.segs[i].d; return pr(t,s+d*a,s+d*b); },
    on:(i,j=i)=>t>=A(i)&&t<E(j),
    fade:(i,j=i,f=0.45)=>Math.min(pr(t,A(i),A(i)+f),1-pr(t,E(j)-f,E(j))),
    fin:(i,f=0.45)=>pr(t,A(i),A(i)+f) }; }
const SCENES=[];
function renderScene(k,t){ const sc=SCENES[k]; const S=ctx(sc,t); const r=sc.draw(t,S); let s=r.svg, u=r.ui||'';
  if(!r.noChip) u+=`<div class="abs" style="left:50px;top:40px"><span class="chip">ষষ্ঠ শ্রেণি · বিজ্ঞান · অধ্যায় ৯</span></div>`;
  sc.segs.forEach(sg=>{ (sg.caps||[]).forEach(c=>{ if(t>=c.a&&t<c.b){ const o=Math.min(pr(t,c.a,c.a+0.2),1-pr(t,c.b-0.15,c.b)); u+=`<div class="abs capw"><div class="cap" style="opacity:${o.toFixed(2)}">${c.c}</div></div>`; } }); });
  const fi=k===0?0.8:0.4, fo=k===SCENES.length-1?1.2:0.4;
  const f=Math.max(1-pr(t,0,fi), pr(t,sc.dur-fo,sc.dur)); const fc=(k===0&&t<1)||(k===SCENES.length-1&&t>1)?'#000':NAVY;
  document.getElementById('svg').innerHTML=s;
  document.getElementById('ui').innerHTML=u;
  const fd=document.getElementById('fade'); fd.style.background=fc; fd.style.opacity=f.toFixed(3);
}
window.setTime=renderScene;
window.sceneInfo=()=>SCENES.map(s=>({dur:s.dur,caps:[].concat(...s.segs.map(g=>g.caps||[]))}));
