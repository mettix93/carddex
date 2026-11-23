// Android: tasto indietro chiude lo strato in primo piano; iPhone invariato
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
async function open(ua){const c=await b.newContext(ua==='ios'?devices['iPhone 13']:devices['Pixel 7']);const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));
 await c.addInitScript(()=>{try{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')}catch(e){}});await p.goto('about:blank');await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(2400);return p}
let p=await open('and');
const st=()=>p.evaluate(()=>({url:location.href.slice(-18),hid:{vw:document.getElementById('vw')&&document.getElementById('vw').hidden,msp:!document.getElementById('msp')||document.getElementById('msp').hidden,cvs:!document.getElementById('cvs')||document.getElementById('cvs').hidden,trm:!document.getElementById('trm')||document.getElementById('trm').hidden},tab:(document.querySelector('#nvp button.on')||{dataset:{}}).dataset.t,cd:history.state&&history.state.cd}));
ok((await st()).cd===1,'Android: voce di cronologia di guardia presente');
await p.evaluate(()=>pkView(CARDS.B4));await p.waitForTimeout(1200);ok((await st()).hid.vw===false,'carta aperta');
await p.goBack();await p.waitForTimeout(900);let s=await st();ok(s.hid.vw===true&&/carddex-album/.test(s.url),'indietro chiude la carta (resta nell\'app)');
await p.evaluate(()=>msBuild());await p.waitForTimeout(500);ok((await st()).hid.msp===false,'missioni aperte');
await p.goBack();await p.waitForTimeout(700);s=await st();ok(s.hid.msp===true&&/carddex-album/.test(s.url),'indietro chiude le Missioni');
await p.evaluate(()=>cvOpen());await p.waitForTimeout(600);await p.goBack();await p.waitForTimeout(700);s=await st();ok(s.hid.cvs===true,'indietro chiude Converti');
await p.evaluate(()=>{msPop=0;ulShow(1,'s',1)});await p.waitForTimeout(500);ok((await st()).hid.trm===false,'pop-up aperto');
const t1=await p.evaluate(()=>document.querySelector('#trm .trt').textContent);await p.goBack();await p.waitForTimeout(1100);s=await st();const t2=await p.evaluate(()=>s0=document.getElementById('trm').hidden?'':document.querySelector('#trm .trt').textContent);ok(s.hid.trm===true||t2!==t1,'indietro chiude il pop-up (poi, come con la X, può comparire il successivo)');if(!s.hid.trm){await p.goBack();await p.waitForTimeout(700);s=await st();ok(s.hid.trm===true,'secondo indietro chiude anche il pop-up missioni')}
await p.evaluate(()=>goTab('a'));await p.waitForTimeout(1000);let t0=(await st()).tab;await p.goBack();await p.waitForTimeout(1000);s=await st();ok(t0==='c'&&s.tab==='b','da Album indietro porta alle Bustine ('+t0+' -> '+s.tab+')');ok(/carddex-album/.test(s.url),'indietro da Album resta nell\'app');
await p.evaluate(()=>goTab('b'));await p.waitForTimeout(900);
await p.goBack();await p.waitForTimeout(700);s=await st();ok(/carddex-album/.test(s.url),'primo indietro alla radice: resta e avvisa');
ok(await p.evaluate(()=>/uscire/.test((document.getElementById('tst')||{}).textContent||'')),'toast "Premi ancora indietro per uscire"');
await p.goBack();await p.waitForTimeout(900);ok(!/carddex-album/.test(await p.evaluate(()=>location.href)),'secondo indietro entro 2 s: esce');
ok(!p.errs.length,'nessun errore JS '+p.errs.join('|'));
// iPhone: nessuna modifica
p=await open('ios');ok(await p.evaluate(()=>!document.documentElement.classList.contains('andr')&&!(history.state&&history.state.cd)),'iPhone: nessun gestore indietro/Android attivo');
await b.close();process.exit(bad)})();
