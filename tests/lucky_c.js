// v565: Lucky Pack = una comune in meno, 3 non comuni, 2 rare (ultima holo garantita)
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();
p.on('pageerror',e=>{console.log('ERR',e.message);bad=1});await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());await p.addInitScript(()=>localStorage.setItem('carddex_env','app'));
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
const r=await p.evaluate(()=>{const out=[];for(const sid of Object.keys(PKSET)){let n=0,N=0,pat={},lastH=0,penH=0,T=300,dup=0;for(let i=0;i<T;i++){const a=pkDrawK(sid,"n"),l=pkDrawK(sid,"l");if(!l.length)continue;N=a.length;const R=x=>(rdOf(x)||{}).r||"";const s=l.map(x=>x.kd==="e"?"E":R(x)).join("");pat[s]=1;if(l[l.length-1].h)lastH++;if(l[l.length-2].h)penH++;if(new Set(l.map(pkKey)).size!==l.length)dup++}out.push({sid,N,len:Object.keys(pat).length,pat:Object.keys(pat).slice(0,2),lastH:lastH/T,penH:+(penH/T).toFixed(2),dup,nl:pkDrawK(sid,"l").length})}return out});
r.forEach(x=>{console.log(JSON.stringify(x))});
r.forEach(x=>{ok(x.nl===x.N&&/UUURR/.test(x.pat.join('|').replace(/E/g,'U')),x.sid+': stesse carte, 3 non comuni + 2 rare');ok(x.lastH===1,x.sid+': ultima rara sempre holo');ok(x.dup===0,x.sid+': nessun doppione')});
await b.close();process.exit(bad)})();
