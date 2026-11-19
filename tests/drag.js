// drag delle carte nell'album: node tests/drag.js [url]
const {chromium}=require('playwright');
let fail=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)fail++};
(async()=>{const b=await chromium.launch();
for(const URL of process.argv[2]?[process.argv[2]]:['http://localhost:8765/carddex-album.html','http://localhost:8765/collezione.html']){
const tag=URL.split('/').pop().replace('.html','');
const p=await (await b.newContext({viewport:{width:402,height:874}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{localStorage.setItem('carddex_theme','c');sessionStorage.cdmode='c';localStorage['col_carddex_env']='app'});
await p.goto(URL);await p.waitForTimeout(1500);
await p.evaluate(()=>{const b=document.querySelector('#nvp button[data-t=c]');if(b)b.click()});await p.waitForTimeout(900);await p.evaluate(()=>{const a=document.querySelector('.asc[data-m=g]')||document.querySelector('.asc[data-m=c]');if(a)a.click()});await p.waitForTimeout(1500);
const ids=()=>p.evaluate(()=>st[cur].map(s=>s.id||"").slice(0,12).join(","));
const cen=async i=>p.evaluate(i=>{const e=document.querySelector('.slot[data-i="'+i+'"]');const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,l:r.left,r:r.right,w:r.width}},i);
const before=await ids();const a=await cen(0),d=await cen(4);
// tengo premuto la carta 0, la porto sul bordo destro della carta 4 (dopo la 4)
await p.mouse.move(a.x,a.y);await p.mouse.down();await p.waitForTimeout(500);
ok(await p.evaluate(()=>!!document.querySelector('.dgg')),tag+': carta sollevata dopo la pressione');
await p.mouse.move(d.x+d.w*.3,d.y,{steps:8});await p.waitForTimeout(450);
const line=await p.evaluate(()=>{const l=document.getElementById('dgl');return l&&getComputedStyle(l).opacity==='1'});ok(line,tag+': linea blu visibile');
const moved=await p.evaluate(()=>[...document.querySelectorAll('.slot[data-i]')].filter(e=>e.style.transform).length);ok(moved>=4,tag+': anteprima slittamento ('+moved+' carte)');
await p.mouse.up();await p.waitForTimeout(700);
const after=await ids();const A=before.split(','),B=after.split(',');
ok(B[4]===A[0]&&B[0]===A[1]&&B.length===A.length,tag+': ordine aggiornato (0 → dopo la 4)');
const meta=await p.evaluate(()=>MODE==="g"?{g:GORD[cur]}:{o:PCOLS.find(a=>a.k===cur).ord,n:PCOLS.find(a=>a.k===cur).cu.length});console.log('     ',JSON.stringify(meta));
ok(meta.g==="cu"||(meta.o&&meta.o!=="num"&&meta.o!=="dex"),tag+': ordine personalizzato attivo');
// annulla toccando il toast
await p.evaluate(()=>document.querySelector('#tst').click());await p.waitForTimeout(500);
ok(await ids()===before,tag+': annulla ripristina');
// pressione senza spostamento: nessun errore, nessun cambio
await p.mouse.move(a.x,a.y);await p.mouse.down();await p.waitForTimeout(500);await p.mouse.up();await p.waitForTimeout(500);
ok(await ids()===before,tag+': rilascio senza spostamento non cambia nulla');
await p.evaluate(()=>{const s=document.querySelector('#sheet,.sheetx');});await p.mouse.click(200,40);await p.waitForTimeout(500);
// cambio pagina dal bordo
const pg0=await p.evaluate(()=>pg);await p.mouse.move(a.x,a.y);await p.mouse.down();await p.waitForTimeout(500);await p.mouse.move(398,a.y,{steps:6});await p.waitForTimeout(1000);
const pg1=await p.evaluate(()=>pg);ok(pg1===pg0+1,tag+': bordo destro cambia pagina ('+pg0+'→'+pg1+')');
await p.mouse.move(200,300,{steps:5});
const lineEdge=await p.evaluate(()=>{const l=document.getElementById('dgl');return !!l&&getComputedStyle(l).opacity==='1'});
await p.mouse.up();await p.waitForTimeout(700);
ok(!errs.length,tag+': nessun errore JS '+errs.join('|'));
await p.context().close()}
await b.close();process.exit(fail?1:0)})();
