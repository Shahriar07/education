/* Shared drawing helpers for all scenes. World helpers (proj, polyP, K, X0, Y0 ...) come from fig91.js */

const BNnum=n=>BN(n);
const lakh=n=>{ // Bangla digits with lakh-style commas: 300000 -> ৩,০০,০০০
  let s=String(Math.round(n)); if(s.length>3){ const last=s.slice(-3); let rest=s.slice(0,-3); rest=rest.replace(/\B(?=(\d{2})+(?!\d))/g,','); s=rest+','+last; } return BN(s); };

// candle with a soft radial glow. (x,yb) = centre of base, h = height of wax in px, l = flame size 0..1
function candleG(x,yb,h,l,t,id='c',glowR=190){
  let c=`<ellipse cx="${F(x)}" cy="${F(yb)}" rx="60" ry="14" fill="#b5651d"/><ellipse cx="${F(x)}" cy="${F(yb-5)}" rx="48" ry="10" fill="#d98a3a"/><rect x="${F(x-20)}" y="${F(yb-h)}" width="40" height="${F(h-4)}" rx="6" fill="#fbf7ea" stroke="#d9d2bb" stroke-width="2"/><rect x="${F(x-20)}" y="${F(yb-h)}" width="12" height="${F(h-4)}" rx="6" fill="#fff" opacity=".5"/><line x1="${F(x)}" y1="${F(yb-h)}" x2="${F(x)}" y2="${F(yb-h-16)}" stroke="#333" stroke-width="4"/>`;
  if(l>0){ c=`<defs><radialGradient id="cg${id}"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs><circle cx="${F(x)}" cy="${F(yb-h-45)}" r="${F(glowR*l)}" fill="url(#cg${id})"/>`+c+flame(x,yb-h-16,l,t); }
  return c; }

// box in world coordinates (cm). Visible faces in this view: +x, +y (top), -z (front)
function boxW(x0,x1,y0,y1,z0,z1,cx,ct,cf,st='none'){
  return `<polygon points="${polyP([[x1,y0,z0],[x1,y0,z1],[x1,y1,z1],[x1,y1,z0]])}" fill="${cx}" stroke="${st}" stroke-width="2" stroke-linejoin="round"/>`
        +`<polygon points="${polyP([[x0,y1,z0],[x1,y1,z0],[x1,y1,z1],[x0,y1,z1]])}" fill="${ct}" stroke="${st}" stroke-width="2" stroke-linejoin="round"/>`
        +`<polygon points="${polyP([[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0]])}" fill="${cf}" stroke="${st}" stroke-width="2" stroke-linejoin="round"/>`; }

// thick hard-cover book standing on the table: x = position of the face towards the candle, dz = sideways slide
function bookStand(x,dz=0,op=1){ if(op<=0) return '';
  const x0=x-4, x1=x, h=21, z0=-8+dz, z1=8+dz;
  let s=`<g opacity="${op.toFixed(3)}"><polygon points="${polyP([[x0,0,z0],[x1+1,0,z0],[x1+1,0,z1],[x0,0,z1]])}" fill="#000" opacity=".2"/>`;
  s+=boxW(x0,x1,0,h,z0,z1,'#9c2f2f','#f3ead2','#7d2424','#5e1b1b');
  // pages seen on top, title block on the cover
  for(let i=1;i<5;i++){ const a=proj(x0+0.8*i,h,z0+0.3), b=proj(x0+0.8*i,h,z1-0.3); s+=`<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="#cfc3a2" stroke-width="2"/>`; }
  s+=`<polygon points="${polyP([[x1,12,z0+3],[x1,12,z1-3],[x1,17,z1-3],[x1,17,z0+3]])}" fill="#e9c46a"/>`;
  s+=`<polygon points="${polyP([[x0,2,z0],[x1,2,z0],[x1,3,z0],[x0,3,z0]])}" fill="#e9c46a"/><polygon points="${polyP([[x0,17,z0],[x1,17,z0],[x1,18,z0],[x0,18,z0]])}" fill="#e9c46a"/>`;
  return s+'</g>'; }

const WALL=`<rect width="1920" height="1080" fill="#e9d9b5"/><rect y="0" width="1920" height="330" fill="#efe2c6"/>`;

// darkness with a pool of light around (cx,cy). dark = 0..1 strength, r = radius of the lit pool
function darkPool(cx,cy,r,dark,id='d'){ if(dark<=0) return '';
  return `<defs><radialGradient id="dk${id}" gradientUnits="userSpaceOnUse" cx="${F(cx)}" cy="${F(cy)}" r="${F(r)}"><stop offset="0" stop-color="#05070f" stop-opacity="0"/><stop offset=".35" stop-color="#05070f" stop-opacity="${(0.35*dark).toFixed(3)}"/><stop offset="1" stop-color="#05070f" stop-opacity="${(0.93*dark).toFixed(3)}"/></radialGradient></defs><rect width="1920" height="1080" fill="url(#dk${id})"/>`; }
const darkAll=(o)=>o>0?`<rect width="1920" height="1080" fill="#05070f" opacity="${cl(o).toFixed(3)}"/>`:'';

// yellow circle with a Bangla numeral
function numC(x,y,n,r=34,p=1){ if(p<=0) return ''; return `<g transform="translate(${F(x)},${F(y)}) scale(${back(p).toFixed(3)})"><circle r="${r}" fill="#FFC83D"/>${txt(0,r*0.38,BN(n),r*1.25,{c:NAVY})}</g>`; }

// small "what the eye sees" bubble: mode 'seen' shows a flame + tick, 'unseen' shows a cross
function seeBubble(bx,by,seen,unseen,t){ const o=Math.max(seen||0,unseen||0); if(o<=0) return '';
  let s=`<g opacity="${cl(o*2).toFixed(2)}"><circle cx="${bx}" cy="${by}" r="84" fill="#fffaf0" stroke="#1a1a2e" stroke-width="6"/><circle cx="${bx-50}" cy="${by+105}" r="14" fill="#fffaf0" stroke="#1a1a2e" stroke-width="5"/><circle cx="${bx-20}" cy="${by+142}" r="8" fill="#fffaf0" stroke="#1a1a2e" stroke-width="4"/>`;
  if(seen>0) s+=`<rect x="${bx-8}" y="${by+30}" width="16" height="40" rx="4" fill="#fbf7ea" stroke="#d9d2bb" stroke-width="2"/>`+flame(bx,by+30,1.0,t);
  s+='</g>'; if(seen>0) s+=tick(bx+95,by-70,26,seen); if(unseen>0) s+=cross(bx,by,40,unseen); return s; }

// glowing light line between two screen points, p = how far the light has travelled (0..1)
function beam(x1,y1,x2,y2,p,o={}){ const {w=9,op=1,arrow=0,head=1}=o; if(p<=0) return ''; p=cl(p);
  const x=x1+(x2-x1)*p, y=y1+(y2-y1)*p;
  let s=`<g opacity="${op}"><line x1="${F(x1)}" y1="${F(y1)}" x2="${F(x)}" y2="${F(y)}" stroke="#ffd34d" stroke-width="${w*2.9}" stroke-linecap="round" opacity=".25"/><line x1="${F(x1)}" y1="${F(y1)}" x2="${F(x)}" y2="${F(y)}" stroke="#FFC83D" stroke-width="${w}" stroke-linecap="round"/><line x1="${F(x1)}" y1="${F(y1)}" x2="${F(x)}" y2="${F(y)}" stroke="#fff6c2" stroke-width="${w/3}" stroke-linecap="round"/>`;
  if(arrow&&p>0.05){ const a=Math.atan2(y2-y1,x2-x1)*180/Math.PI; s+=`<polygon points="6,0 -30,-17 -30,17" fill="#FFC83D" transform="translate(${F(x)},${F(y)}) rotate(${F(a)})"/>`; }
  else if(head&&p<1) s+=`<circle cx="${F(x)}" cy="${F(y)}" r="30" fill="#FFC83D" opacity=".3"/><circle cx="${F(x)}" cy="${F(y)}" r="12" fill="#fff6c2"/>`;
  return s+'</g>'; }

// dashed "imagined" path through screen points (smooth curve), drawn up to progress p
function dreamPath(pts,p,o={}){ const {c='#4a6fa5',w=6,op=1}=o; if(p<=0) return '';
  const q=[]; for(let i=1;i<pts.length;i++){ const a=pts[i-1], b=pts[i], mx=(a[0]+b[0])/2; for(let k=(i===1?0:1);k<=24;k++){ const u=k/24, v=1-u;
      q.push([v*v*v*a[0]+3*v*v*u*mx+3*v*u*u*mx+u*u*u*b[0], v*v*v*a[1]+3*v*v*u*a[1]+3*v*u*u*b[1]+u*u*u*b[1]]); } }
  const n=Math.max(2,Math.ceil(cl(p)*q.length)); const d=q.slice(0,n).map((e,i)=>(i?'L':'M')+F(e[0])+' '+F(e[1])).join('');
  return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="14 18" opacity="${op}"/>`; }

// HTML helpers
const uiPill=(s,x,y,p,size=44)=>p>0?`<div class="abs" style="left:${x-600}px;width:1200px;top:${y}px;display:flex;justify-content:center;opacity:${cl(p*3).toFixed(2)}"><div style="background:#FFC83D;color:#1a1a2e;font-weight:700;font-size:${size}px;line-height:1.2;padding:14px 34px 8px;border-radius:40px;box-shadow:0 6px 0 rgba(0,0,0,.25);transform:scale(${back(p).toFixed(3)})">${s}</div></div>`:'';
const uiTag=(s,p)=>p>0?`<div class="abs" style="right:50px;top:40px;opacity:${cl(p*3).toFixed(2)}"><div style="background:#FFC83D;color:#1a1a2e;font-weight:700;font-size:36px;line-height:1;padding:16px 28px 12px;border-radius:40px;transform:scale(${back(p).toFixed(3)});transform-origin:100% 50%">${s}</div></div>`:'';
const noteScale=(x,y,s='স্কেল অনুযায়ী নয়',c='#6b5a3a')=>txt(x,y,s,30,{c,w:600,a:'middle',op:0.95});

// slowly rotating faint rays on navy (title / recap backgrounds)
function navyRays(t,o=0.07){ let s=bg(NAVY)+`<g transform="translate(960,360) rotate(${(t*4).toFixed(2)})" opacity="${o}">`; for(let i=0;i<12;i++) s+=`<polygon points="0,0 1500,-110 1500,110" fill="${Y}" transform="rotate(${i*30})"/>`; return s+`</g>`; }
