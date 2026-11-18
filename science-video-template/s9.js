/* Scene 9: recap, questions, teaser */
SCENES.push(mkScene([
 {c:"চলো, এক নজরে মনে করে নিই।"},
 {c:"এক। আলো এক প্রকার শক্তি। এটি সেকেন্ডে প্রায় তিন লক্ষ কিলোমিটার বেগে সরলরেখায় চলে।"},
 {c:"দুই। কোনো জিনিস থেকে আলো চোখে এলে তবেই আমরা সেটা দেখি।"},
 {c:"তিন। আলো জিনিসের ইলেকট্রনকে দোলায়। তারপর আলো হয় ফিরে আসে, নয় শোষিত হয়, নয়তো পার হয়ে যায়।"},
 {c:"এবার তোমার জন্য তিনটি প্রশ্ন। ভিডিও থামিয়ে ভেবে দেখো।"},
 {c:"এক। চাঁদের নিজের আলো নেই, তবু আমরা চাঁদ দেখি কীভাবে?"},
 {c:"দুই। ছায়া তৈরি হয় আলোর কোন নিয়মের কারণে?"},
 {c:"তিন। রোদে কালো ছাতা গরম হয়ে যায় কেন?"},
 {c:"শেষ করার আগে আরেকটা ধাঁধা। রাতে পুকুরের পানি যখন স্থির থাকে, তখন পানিতে চাঁদটা পরিষ্কার দেখা যায়।"},
 {c:"কিন্তু ঢিল ছুড়লেই চাঁদটা ভেঙে যায়। কেন?"},
 {c:"সেই রহস্য নিয়েই আমাদের পরের ভিডিও, আলোর প্রতিফলন। দেখা হবে!"},
 {d:2.2}
],function(t,S){
  let s='',u='';
  const rows=(items,first)=>{ items.forEach(([n,x],i)=>{ const t0=S.A(first+i); if(t>=t0){ const q=back(pr(t,t0,t0+0.4)); u+=`<div class="abs rrow" style="top:${290+i*190}px;transform:scale(${q.toFixed(3)})"><div class="num">${n}</div><div>${x}</div></div>`; } }); };
  if(S.on(0,3)){ s+=bg(NAVY); u+=banner('আজ যা শিখলাম',S.P(0,0.1,0.35),1,90);
    rows([['১','আলো এক প্রকার শক্তি। সেকেন্ডে প্রায় ৩ লক্ষ কিলোমিটার বেগে সরলরেখায় চলে।'],['২','কোনো জিনিস থেকে আলো চোখে এলে তবেই আমরা সেটা দেখি।'],['৩','আলো ইলেকট্রনকে দোলায়: প্রতিফলন, শোষণ, অথবা পার হয়ে যাওয়া।']],1); }
  else if(S.on(4,7)){ s+=bg(NAVY); u+=banner('ভেবে বলো',S.P(4,0.1,0.3),1,90);
    rows([['১','চাঁদের নিজের আলো নেই, তবু আমরা চাঁদ দেখি কীভাবে?'],['২','ছায়া তৈরি হয় আলোর কোন নিয়মের কারণে?'],['৩','রোদে কালো ছাতা গরম হয়ে যায় কেন?']],5); }
  else { // night pond with the moon
    s+=bg('#0a1230')+stars(t,60,7)+`<rect y="520" width="1920" height="560" fill="#12305c"/><rect y="508" width="1920" height="22" fill="#0a0f22"/>`;
    const mx=1240;
    s+=`<circle cx="${mx}" cy="230" r="150" fill="#f6f1d5" opacity=".12"/><circle cx="${mx}" cy="230" r="96" fill="#f6f1d5"/><circle cx="${mx-30}" cy="205" r="18" fill="#d9d3b4"/><circle cx="${mx+34}" cy="262" r="24" fill="#d9d3b4"/>`;
    const tt=t-(S.A(9)+S.E(9)*0+ (S.E(9)-S.A(9))*0.3); const brk=t>=S.A(9)?cl(tt/0.6):0;
    // reflection as slices
    for(let i=0;i<16;i++){ const y=730+(i-8)*11; const w=Math.sqrt(Math.max(0,1-Math.pow((i-7.5)/8,2)))*96; const dx=brk*( 46*Math.sin(t*6+i*1.3) ) + 3*Math.sin(t*2+i); const o=0.85-brk*0.25*Math.abs(Math.sin(t*5+i));
      s+=`<rect x="${F(mx-w+dx)}" y="${y}" width="${F(w*2)}" height="9" rx="4" fill="#f6f1d5" opacity="${o.toFixed(2)}"/>`; }
    if(t>=S.A(9)){ const dp=S.P(9,0.1,0.3); if(dp>0&&dp<1) s+=`<circle cx="${mx}" cy="${F(300+(730-300)*dp*dp)}" r="18" fill="#6b5b4b"/>`;
      if(tt>0) for(let i=0;i<4;i++){ const r=(tt-i*0.6)*210; if(r>0&&r<1100) s+=`<ellipse cx="${mx}" cy="730" rx="${F(r)}" ry="${F(r*0.3)}" fill="none" stroke="#cfe6ff" stroke-width="6" opacity="${cl(1-r/1100).toFixed(2)}"/>`; } }
    if(S.on(9)) u+=card('কেন?',S.P(9,0.6,0.72),S.fade(9),560,420,110).replace('left:0;width:1920px','left:260px;width:600px');
    if(t>=S.A(10)){ const o=pr(t,S.A(10),S.A(10)+0.5); s+=`<rect width="1920" height="1080" fill="${NAVY}" opacity="${(0.82*o).toFixed(2)}"/>`;
      u+=`<div class="abs" style="left:0;width:1920px;top:230px;text-align:center;color:${Y};font-size:64px;font-weight:600;opacity:${o.toFixed(2)}">পরের ভিডিও</div>`;
      u+=`<div class="abs" style="left:0;width:1920px;top:330px;text-align:center;color:#fff;font-size:150px;font-weight:700;opacity:${o.toFixed(2)};transform:translateY(${((1-ease(o))*40).toFixed(1)}px)">আলোর <span style="color:${Y}">প্রতিফলন</span></div>`;
      u+=`<div class="abs trow" style="top:600px;opacity:${pr(t,S.A(10)+0.5,S.A(10)+0.9).toFixed(2)}"><div class="tchip">ষষ্ঠ শ্রেণি</div><div class="tchip">বিজ্ঞান</div><div class="tchip o">অধ্যায় ৯: আলোর ঘটনা</div></div>`; }
  }
  return {svg:s,ui:u};
}));
