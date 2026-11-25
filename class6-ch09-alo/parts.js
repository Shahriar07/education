/* Part registry: every part is its own scene (one clip). Uses mkScene/ctx/splitCap from ../science-video-template/core.js */
const PARTS={}, ORDER=[];
function PART(name,segs,draw,opt={}){ const sc=mkScene(segs,draw); sc.name=name; sc.opt=opt; PARTS[name]=sc; ORDER.push(name); }
function renderPart(name,t){
  const sc=PARTS[name]; const S=ctx(sc,t); const r=sc.draw(t,S); let s=r.svg, u=r.ui||'';
  if(!r.noChip) u+=`<div class="abs" style="left:50px;top:40px"><span class="chip">ষষ্ঠ শ্রেণি · বিজ্ঞান · অধ্যায় ৯</span></div>`;
  sc.segs.forEach(sg=>{ (sg.caps||[]).forEach(c=>{ if(t>=c.a&&t<c.b){ const o=Math.min(pr(t,c.a,c.a+0.2),1-pr(t,c.b-0.15,c.b)); u+=`<div class="abs capw"><div class="cap" style="opacity:${o.toFixed(2)}">${c.c}</div></div>`; } }); });
  const fi=sc.opt.fadeIn?0.4:0, fo=sc.opt.fadeOut?0.4:0;
  const f=Math.max(fi?1-pr(t,0,fi):0, fo?pr(t,sc.dur-fo,sc.dur):0);
  document.getElementById('svg').innerHTML=s;
  document.getElementById('ui').innerHTML=u;
  const fd=document.getElementById('fade'); fd.style.background=NAVY; fd.style.opacity=f.toFixed(3);
}
window.setPart=renderPart;
window.partInfo=()=>ORDER.map(n=>({name:n,dur:PARTS[n].dur,caps:[].concat(...PARTS[n].segs.map(g=>g.caps||[])).map(c=>({a:c.a,b:c.b,c:c.c}))}));
