// area sicura in basso memorizzata: se iOS la legge a 0 la barra non scende
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();
for(const u of ['carddex-album.html','collezione.html']){
const p=await (await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');localStorage.setItem('col_carddex_env','app');sessionStorage.setItem('cdmode','g');if(!localStorage.getItem('cd_sab'))localStorage.setItem('cd_sab','34')});
await p.goto('http://localhost:8765/'+u);await p.waitForTimeout(1800);
const g=()=>p.evaluate(()=>844-document.querySelector('#nvp').getBoundingClientRect().bottom);
ok(Math.abs(await g()-20)<2,u+': con area sicura memorizzata (34) la barra sta a 20 dal fondo');
await p.evaluate(()=>{document.documentElement.style.removeProperty('--sab');window.dispatchEvent(new Event('resize'))});await p.waitForTimeout(700);
ok(Math.abs(await g()-20)<2,u+': se la variabile sparisce viene resta a 20');
await p.evaluate(()=>document.documentElement.style.setProperty('--vh','900px'));await p.waitForTimeout(1500);ok(Math.abs(await g()-20)<2,u+': altezza pagina sbagliata → corretta da sola');
ok(!errs.length,u+': nessun errore '+errs.join('|'));await p.context().close()}
await b.close();process.exit(bad?1:0)})();
