const {chromium}=require('playwright');(async()=>{let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
const b=await chromium.launch();const p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==','base64')}));
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');localStorage.setItem('carddex_last','g')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const out={mode:MODE,lk:Object.keys(PKSET).filter(s=>pkLkS(s))};doSearch("a");out.n=SR.length;out.bad=SR.filter(x=>{const c=COLS.find(k=>k.k===x.c);return c.s.every(pkLkS)&&!st[x.c][x.i].o}).length;out.sets=[...new Set(SR.map(x=>x.c))];return out});
console.log(JSON.stringify(r));
ok(r.mode==='g','modalità gioco');ok(r.lk.length>0,'ci sono set bloccati ('+r.lk+')');ok(r.n>0,'ci sono risultati');ok(r.bad===0,'nessuna carta di set bloccati');
ok(!r.sets.some(k=>r.lk.includes(k.slice(1))),'nessun set bloccato tra i risultati');ok(!e.length,'nessun errore JS '+e.join('|'));
await b.close();process.exit(bad?1:0)})()
