// Pokédex scorre anche arrivando da un album aperto sulle pagine
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
const c=await b.newContext({...devices['iPhone 13'],serviceWorkers:'block'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')}));
await c.addInitScript(()=>{localStorage['col_carddex_env']='app'});
await p.goto('http://localhost:8765/collezione.html');await p.waitForTimeout(1800);
for(let k=0;k<4;k++){
await p.evaluate(()=>{goTab('c')});await p.waitForTimeout(500);await p.evaluate(()=>{const a=document.querySelector('.asc[data-m=c]');if(a)a.click()});await p.waitForTimeout(800);
await p.evaluate(()=>goTab('d'));await p.waitForTimeout(k%2?60:900);
const r=await p.evaluate(()=>{const e=document.getElementById('set');return {ov:e.style.overflowY,sh:e.scrollHeight,ch:e.clientHeight}});
await p.waitForTimeout(400);
const r2=await p.evaluate(()=>{const e=document.getElementById('set');return {ov:getComputedStyle(e).overflowY,sh:e.scrollHeight,ch:e.clientHeight}});
ok(r2.ov!=='hidden'&&r2.sh>r2.ch,'giro '+k+': scorrevole '+JSON.stringify(r)+JSON.stringify(r2));
}
ok(!p.errs.length,'nessun errore '+p.errs.join('|'));
await b.close();process.exit(bad)})();
