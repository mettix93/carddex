// PullBinder: album/regione completati → contorno oro, effetto una sola volta
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
const c=await b.newContext({...devices['iPhone 13'],serviceWorkers:'block'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')}));
await c.addInitScript(()=>{localStorage['col_carddex_env']='app'});
await p.goto('http://localhost:8765/collezione.html');await p.waitForTimeout(1800);
await p.evaluate(()=>{goTab('c')});await p.waitForTimeout(500);await p.evaluate(()=>{const a=document.querySelector('.asc[data-m=c]');if(a)a.click()});await p.waitForTimeout(900);
// quasi completo: tutte tranne una
const k=await p.evaluate(()=>{const k=cur;st[k].forEach(s=>{if(s.id)s.o=1});const last=st[k].filter(s=>s.id).pop();last.o=0;save();render();return k});await p.waitForTimeout(500);
ok(await p.evaluate(k=>!!document.querySelector('#tabs .tab.on[data-pr]'),k),'anello di avanzamento sulla linguetta');
await p.evaluate(()=>{const last=st[cur].filter(s=>s.id).pop();last.o=1;done(LIST().indexOf(last))});await p.waitForTimeout(1500);
ok(await p.evaluate(()=>document.querySelectorAll('.sdfx').length>3),'effetto di celebrazione');
ok(await p.evaluate(k=>sdGet().includes('s:'+k),k),'flag salvato');
await p.waitForTimeout(3200);
ok(await p.evaluate(()=>!!document.querySelector('#tabs .tab.on.gd')),'contorno oro');
await p.evaluate(()=>{render()});await p.waitForTimeout(1500);
ok(await p.evaluate(()=>document.querySelectorAll('.sdfx').length===0),'non si ripete');
// pokedex: tutto posseduto
await p.evaluate(()=>{PCOLS.forEach(a=>(st[a.k]||[]).forEach(s=>{if(s.id)s.o=1}));save()});
await p.evaluate(()=>goTab('d'));await p.waitForTimeout(3500);
const d=await p.evaluate(()=>({g:DXGD.join(''),sd:sdGet().filter(x=>x[0]==='d').join()}));
console.log('dex',JSON.stringify(d));
ok(!p.errs.length,'nessun errore '+p.errs.join('|'));
await b.close();process.exit(bad)})();
