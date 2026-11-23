// community: porta d'ingresso, approvazione dell'admin, amicizie automatiche
const {chromium}=require('playwright');const {DB,mock}=require('./lib_sb.js');DB.comm=true;
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
async function open(b){const c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app');localStorage.setItem('cd_gate','on')});
  await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);return p}
const join=async(p,n)=>{await p.fill('#gtn',n);await p.selectOption('#gbdd','15');await p.selectOption('#gbdm','6');await p.click('#gate [data-g=cr]');await p.waitForTimeout(1500)};
(async()=>{const b=await chromium.launch();
const A=await open(b);ok(await A.evaluate(()=>!!document.querySelector('#gate')&&/Community privata/.test(document.querySelector('#gate').innerText)),'senza account: porta chiusa');
await join(A,'Anna');ok(await A.evaluate(()=>!document.querySelector('#gate')),'il primo (admin) entra subito');
const B=await open(b);await join(B,'Bruno');
ok(await B.evaluate(()=>/In attesa/.test(document.querySelector('#gate').innerText)),'Bruno: in attesa di approvazione');
ok(Object.values(DB.profiles).find(x=>x.name==='Bruno').status==='pending','Bruno pending nel DB');
const C=await open(b);await join(C,'Carla');
await A.evaluate(()=>frLoad());await A.waitForTimeout(700);
ok(await A.evaluate(()=>FR.n===2&&FR.pd.length===2),'Anna: 2 richieste, pallino');
ok(await A.evaluate(()=>!!document.querySelector('.ufr .fdt')||!!document.querySelector('#pkbc .fdt')||!!document.querySelector('.nvp button[data-t=b] .fdt')),'Anna: pallino visibile');
await A.evaluate(()=>{frOpen("a")});await A.waitForTimeout(1500);
const tx=await A.evaluate(()=>document.querySelector('#frm').innerText);ok(/Community/.test(tx)&&/Bruno/.test(tx)&&/Carla/.test(tx)&&!/codice amico/i.test(tx),'Anna: pagina Community con le richieste');
await A.click('#frm [data-a=cok]');await A.waitForTimeout(1200);
ok(DB.friendships.length===1&&DB.friendships[0].status==='accepted','Bruno approvato: amicizia automatica');
await A.evaluate(()=>{FR.v="home";frDraw()});await A.click('#frm [data-a=cno]');await A.waitForTimeout(1000);
ok(Object.values(DB.profiles).find(x=>x.name==='Carla').status==='rejected','Carla rifiutata');
await B.waitForTimeout(3500);ok(await B.evaluate(()=>!document.querySelector('#gate')),'Bruno: porta aperta da sola');
await C.waitForTimeout(3500);ok(await C.evaluate(()=>/non approvato/.test(document.querySelector('#gate').innerText)),'Carla: accesso non approvato');
await B.evaluate(()=>frLoad());await B.waitForTimeout(500);ok(await B.evaluate(()=>FR.fs.length===1&&!FR.me.ad),'Bruno: Anna è già sua amica, non è admin');
// riapertura: lo stato è in cache, nessuna porta
await B.reload();await B.waitForTimeout(1200);ok(await B.evaluate(()=>!document.querySelector('#gate')),'Bruno riapre l\'app: niente porta');
for(const p of [A,B,C])ok(p.errs.length===0,'nessun errore JS '+p.errs.join('|'));
console.log(bad?bad+' FALLITI':'TUTTO OK');await b.close()})();
