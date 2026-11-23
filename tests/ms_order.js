// missioni da riscattare in cima, dalla più vecchia
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)process.exitCode=1};
const f=async()=>p.evaluate(()=>{msBuild();return [...document.querySelectorAll('#msp .msi')].map(e=>({id:e.dataset.x,cl:e.classList.contains('cl')}))});
let a=await f();ok(a.length>5&&!a.some(x=>x.cl),'nessuna da riscattare all\'inizio');
// forza due missioni pronte in ordine: prima Pikachu x25 (m1), poi la 'dev3'
await p.evaluate(()=>{const M=msSt();M.rt_m15=Date.now()-5000;M.tn=1;msSv(M)}); // Baratto cibernetico pronto (più vecchia)
await p.evaluate(()=>{msDev3();msDev3();msDev3()}); // dev3 pronta dopo
await p.waitForTimeout(600);a=await f();
const cl=a.filter(x=>x.cl).map(x=>x.id);console.log(JSON.stringify(a.slice(0,4)));
ok(cl.length>=2&&a.slice(0,cl.length).every(x=>x.cl),'le da riscattare sono in cima: '+cl.join(','));
ok(cl[0]==="dev3",'la più nuova (dev3) per prima, poi '+cl.slice(1).join(','));
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close()})();
