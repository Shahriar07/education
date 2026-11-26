"""Builds narration.js from narration.json and prints word counts / estimated part lengths."""
import json, os, sys
H=os.path.dirname(os.path.abspath(__file__))
N=json.load(open(os.path.join(H,'narration.json'),encoding='utf-8'))
open(os.path.join(H,'narration.js'),'w',encoding='utf-8').write('const NARR='+json.dumps(N,ensure_ascii=False)+';\nconst SEG=n=>NARR[n].map(c=>({c}));\n')
tot=0
for k,v in N.items():
    w=sum(len(s.split()) for s in v); tot+=w
    d=sum(max(2.4,len(s.split())/2.1+0.45) for s in v)
    if '-v' in sys.argv: print(k,w,'words',round(d,1),'s')
print('TOTAL',tot,'words,',len(N),'parts')
