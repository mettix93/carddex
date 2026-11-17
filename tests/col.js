// Collezione: avvio, import dati, isolamento chiavi, navigazione
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')}));
await p.addInitScript(()=>{localStorage['col_carddex_env']='app'});await p.goto('http://localhost:8765/collezione.html');await p.waitForTimeout(1500);
const ids=await p.evaluate(()=>st[cur].slice(0,5).map(x=>x.id));
await p.evaluate(d=>{localStorage["carddex2"]=JSON.stringify({a:d.map((id,i)=>({id,o:i<3?1:0,n:""}))});delete localStorage["col_imp"];delete localStorage["col_carddex2"];localStorage["carddex2g_a"]='{"gB":[{"id":"B1","o":1}]}'},ids);
await p.reload();await p.waitForTimeout(1800);
ok(await p.evaluate(()=>st.a.filter(x=>x.o).length)===3,'dati già segnati importati (3)');
ok(await p.evaluate(()=>localStorage['col_carddex2g_a']===undefined),'dati del gioco non copiati');
ok(await p.evaluate(()=>[...document.querySelectorAll('#nvp button')].map(b=>b.dataset.t).join())==='c,d,s','nav: Album, Pokédex, Account');
ok(await p.evaluate(()=>MODE)==='c','modalità collezione');
await p.evaluate(()=>{const i=LIST().findIndex(x=>!x.o&&x.id&&!CARDS[x.id].opts&&!CARDS[x.id].alt);toggle(i)});await p.waitForTimeout(400);
const raw=await p.evaluate(()=>({orig:JSON.parse(localStorage['carddex2']).a.filter(x=>x.o).length,col:JSON.parse(localStorage['col_carddex2']).a.filter(x=>x.o).length}));
ok(raw.orig===3&&raw.col===4,'modifiche salvate solo in col_ (orig '+raw.orig+', col '+raw.col+')');
for(const t of ['d','s','c','d','c'])await p.evaluate(t=>goTab(t),t),await p.waitForTimeout(700);
await p.evaluate(()=>{goTab("c");});await p.waitForTimeout(600);
await p.evaluate(()=>{document.querySelector('.asc[data-m=c]').click()});await p.waitForTimeout(900);
ok(await p.evaluate(()=>document.querySelectorAll('.slot').length)>0,'album visibile');
await p.evaluate(()=>openCard(0));await p.waitForTimeout(700);ok(await p.evaluate(()=>!document.querySelector('#vw').hidden),'visore apre');
ok(await p.evaluate(()=>cuSync.toString().includes('ENVC')),'cloud su riga separata');
const E=e.filter(x=>!/decode audio/.test(x));ok(E.length===0,'nessun errore JS '+E.join('|'));
await b.close();console.log(bad?'ERRORI':'TUTTO OK');process.exit(bad?1:0)})()
