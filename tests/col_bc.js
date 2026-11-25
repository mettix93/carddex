// PullBinder: bacheche (3 stili, fullscreen, modal, persistenza, swipe)
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
const c=await b.newContext({...devices['iPhone 13'],viewport:{width:390,height:844},serviceWorkers:'block'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')}));
await c.addInitScript(()=>{localStorage['col_carddex_env']='app'});
await p.goto('http://localhost:8765/collezione.html');await p.waitForTimeout(1800);
await p.evaluate(()=>{const ids=Object.keys(CARDS).filter(k=>/^B\d/.test(k)).slice(0,12);BCH.length=0;for(let i=0;i<6;i++)BCH.push({id:'t'+i,nm:'B'+i,o:'c',al:'a',st:'gwm'[i%3],sz:1+i%3,cards:Array(1+i%3).fill(null).map((_,j)=>ids[i+j])});bcSave()});
await p.reload();await p.waitForTimeout(1800);
ok(await p.evaluate(()=>BCH.length)===6,'6 bacheche dopo riavvio');
await p.evaluate(()=>{aslOpen()});await p.waitForTimeout(700);
await p.evaluate(()=>{BCI=1;bcList()});await p.waitForTimeout(700);
ok(await p.evaluate(()=>!!document.querySelector('.bcpn')&&/Bacheca 2\/6/.test(document.querySelector('.bcpn').textContent)),'contatore Bacheca 2/6');
ok(await p.evaluate(()=>!!document.querySelector('.bcase.bsw_ .tbw')),'stile Legno 3D (tempio)');
await p.screenshot({path:'/tmp/cb1.png'});
await p.evaluate(()=>{document.querySelector('.bcfsb').click()});await p.waitForTimeout(500);
ok(await p.evaluate(()=>!!document.querySelector('#bcfs')&&document.querySelector('meta[name=theme-color]').content.toLowerCase().includes('000')),'fullscreen + fascia nera');
await p.evaluate(()=>document.querySelector('#bcfs .bfx').click());await p.waitForTimeout(400);
ok(await p.evaluate(()=>!document.querySelector('#bcfs')),'X chiude fullscreen');
// modale nuova bacheca con scelta album
await p.evaluate(()=>bcModal());await p.waitForTimeout(300);
ok(await p.evaluate(()=>{const m=document.querySelector('#bcm .bcmd');return !!m&&m.classList.contains('ptc')&&!!m.querySelector('.bcal')&&m.querySelector('.p').disabled}),'modale: scelta album, Crea disabilitato');
await p.evaluate(()=>{document.querySelector('#bcm .bcal').click()});await p.waitForTimeout(300);
await p.screenshot({path:'/tmp/cb2.png'});
ok(!p.errs.length,'nessun errore '+p.errs.join('|'));
await b.close();process.exit(bad)})();
