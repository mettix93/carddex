// aprendo una carta promo e poi un'altra carta (non promo): nessun alone promo residuo, nemmeno per un istante
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
const p=await b.newPage({viewport:{width:402,height:874}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
await p.evaluate(()=>pkView(CARDS.Q1));await p.waitForTimeout(2300);
ok(await p.evaluate(()=>document.getElementById("card").classList.contains("pkpm")&&document.querySelectorAll("#card .vwfx").length>0),'promo: alone presente');
// cambio carta: controllo subito e a intervalli brevi
await p.evaluate(()=>{window.__bad=[];const t0=performance.now();const chk=()=>{const n=document.querySelectorAll("#card .pkpf").length,k=document.getElementById("card").classList.contains("pkpm");if(n||k)window.__bad.push(Math.round(performance.now()-t0)+"ms n="+n+" pkpm="+k);if(performance.now()-t0<700)requestAnimationFrame(chk)};pkView(CARDS.B1||CARDS.J1);requestAnimationFrame(chk)});
await p.waitForTimeout(1100);
const bd=await p.evaluate(()=>window.__bad);console.log(JSON.stringify(bd));
ok(bd.length===0,'cambio carta: nessun alone promo residuo');
// cambio rapido promo -> altra mentre il timer è in corso
await p.evaluate(()=>{pkView(CARDS.Q2);setTimeout(()=>pkView(CARDS.B1||CARDS.J1),60)});await p.waitForTimeout(2600);
ok(await p.evaluate(()=>!document.getElementById("card").classList.contains("pkpm")&&document.querySelectorAll("#card .pkpf").length===0),'cambio rapido: nessun alone sulla carta non promo');
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close();process.exit(bad)})();
