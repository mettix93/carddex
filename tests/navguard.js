const {chromium}=require('playwright');(async()=>{let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
for(const url of ['carddex-album.html','collezione.html']){
const b=await chromium.launch();const p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==','base64')}));
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');localStorage.setItem('col_carddex_env','app')});
await p.goto('http://localhost:8765/'+url);await p.waitForTimeout(1500);
const idle=await p.evaluate(()=>new Promise(r=>{const n0=ngN;setTimeout(()=>r(ngN-n0),5000)}));
ok(idle===0,url+': a riposo nessun riallineamento inutile ('+idle+')');
const r=await p.evaluate(()=>new Promise(res=>{document.documentElement.style.overflow='auto';document.documentElement.style.height='calc(100% + 40px)';document.documentElement.scrollTop=30;const n0=ngN;setTimeout(()=>{document.documentElement.style.overflow='';document.documentElement.style.height='';res({kicks:ngN-n0,st:document.documentElement.scrollTop})},2500)}));
ok(r.kicks>=1&&r.st===0,url+': pagina scivolata → riportata a 0 '+JSON.stringify(r));
ok(!e.length,url+': nessun errore JS '+e.join('|'));await b.close()}
process.exit(bad?1:0)})()
