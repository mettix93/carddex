const {chromium}=require('playwright');(async()=>{let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
for(const f of ['carddex-album.html','collezione.html']){
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:402,height:874}});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.goto('http://localhost:8765/'+f);await p.waitForTimeout(2500);
await p.evaluate(()=>navigator.serviceWorker.ready.then(r=>r.active.postMessage({t:'warm'})));
const n=await p.evaluate(()=>new Promise(res=>{const t=setTimeout(()=>res(-1),90000);navigator.serviceWorker.addEventListener('message',m=>{if(m.data&&m.data.t==='warmed'){clearTimeout(t);res(m.data.n+'/'+m.data.tot)}})}));
ok(n!==-1,f+': precache immagini piccole '+n);
const cnt=await p.evaluate(async()=>(await (await caches.open('carddex-img')).keys()).length);ok(cnt>100,f+': in cache '+cnt);
const pc=await p.evaluate(async()=>(await (await caches.open('carddex-v2')).keys()).map(r=>r.url.split('/').pop()));ok(pc.includes('icon-512.png')&&pc.includes('collezione.html'),f+': pagine/icone in cache '+pc.length);
await ctx.setOffline(true);await p.reload();await p.waitForTimeout(2500);
const t=await p.evaluate(()=>document.body.innerText.length);ok(t>20&&!e.length,f+': offline si apre ('+t+' car., errori '+e.length+')');
await b.close()}
console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})()
