const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();const er=[];
p.on('pageerror',e=>er.push(String(e)));await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());await p.addInitScript(()=>{localStorage.setItem('carddex_env','dev')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
const r=await p.evaluate(async()=>{setMode("g");const ks=GCOLS.map(c=>c.k),pick=k=>{const s=st[k].find(x=>x&&x.id);s.o=1;return s.id};PKAQ=[{k:ks[3],id:pick(ks[3])},{k:ks[1],id:pick(ks[1])}];PKCUR=ks[3].slice(1);pkToAlbum();await new Promise(r=>setTimeout(r,700));return [cur,ks[1],ks[3]]});
console.log(JSON.stringify(r),r[0]===r[1]?'OK':'FAIL',er.join('|'));await b.close()})();
