// pressione lunga su carta: 350ms solleva, 800ms senza muovere = menu (dito giù), nessun click-through
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
for(const app of ['carddex-album.html','collezione.html']){
const c=await b.newContext({...devices['iPhone 13'],serviceWorkers:'block'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')}));
await c.addInitScript(()=>{try{sessionStorage.cdmode='c';localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev');localStorage.setItem('col_carddex_env','app')}catch(x){}});
await p.goto('http://localhost:8765/'+app);await p.waitForTimeout(2000);
await p.evaluate(()=>{try{goTab('c')}catch(e){}});await p.waitForTimeout(500);console.log(app,await p.evaluate(()=>MODE));
await p.evaluate(()=>{const a=document.querySelector('.asc[data-m=c]');if(a)a.click();else{try{aslGo('g')}catch(e){}}});await p.waitForTimeout(900);
const n0=await p.evaluate(()=>LIST().length);
const pos=await p.evaluate(()=>{const e=document.querySelector('#book .slot[data-i="3"]').getBoundingClientRect();return [e.left+e.width/2,e.top+e.height/2]});
// rilascio a 500ms: niente menu
await p.mouse.move(...pos);await p.mouse.down();await p.waitForTimeout(500);
ok(await p.evaluate(()=>!!document.querySelector('.dgg')&&document.getElementById('sh').hidden),app+': a 500ms carta sollevata, menu non ancora');
await p.mouse.up();await p.waitForTimeout(400);
ok(await p.evaluate(()=>document.getElementById('sh').hidden&&!document.querySelector('.dgg')),app+': rilascio breve = niente menu, carta rimessa');
// tenuta 1000ms: menu mentre il dito è giù
await p.mouse.move(...pos);await p.mouse.down();await p.waitForTimeout(1000);
const G=app==='carddex-album.html';ok(await p.evaluate(g=>g?document.getElementById('sh').hidden:!document.getElementById('sh').hidden,G),app+(G?': PullTime (modalità Gioco) senza menu':': menu a dito premuto'));
await p.mouse.up();await p.waitForTimeout(150);
ok(await p.evaluate(g=>g?document.getElementById('sh').hidden:!document.getElementById('sh').hidden,G),app+': il rilascio non attiva voci');
ok(await p.evaluate(n=>LIST().length===n,n0),app+': nessuno slot aggiunto');
ok(!p.errs.length,app+': nessun errore '+p.errs.join('|'));
await c.close()}
await b.close();process.exit(bad)})();
