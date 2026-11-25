// Una sola pagina/bacheca: lo slider (pallino) e "1 / 1" restano visibili, la barra in basso non si sposta
const {chromium}=require('playwright');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();
for(const [file,go] of [['carddex-album.html',()=>{goTab("g")}],['collezione.html',()=>{goTab("c")}]]){
 const c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());await p.addInitScript(()=>{localStorage.setItem('carddex_env','dev')});
 await p.goto('http://localhost:8765/'+file);await p.waitForTimeout(1800);
 await p.evaluate(go);await p.waitForTimeout(900);
 const nv0=await p.evaluate(()=>Math.round(document.querySelector('#nv').getBoundingClientRect().top));
 await p.evaluate(()=>{const k=COLS[0].k;cur=k;pg=0;sp=0;st[k].slice(0,3).forEach(s=>{if(s&&s.id){s.o=1;s.q=1}});FLT="o";SR=[];SQ="";tabs();render()});await p.waitForTimeout(600);
 const r=await p.evaluate(()=>({np,vis:getComputedStyle(document.querySelector('#slw')).visibility,dots:document.querySelectorAll('#sld i').length,knob:getComputedStyle(document.querySelector('#sdk')).display,pn:document.querySelector('#pn').textContent,nv:Math.round(document.querySelector('#nv').getBoundingClientRect().top)}));
 ok(r.np===1&&r.vis==='visible'&&r.dots===1&&r.knob!=='none'&&/1 \/ 1/.test(r.pn),file+': una pagina -> pallino e "'+r.pn+'"');
 ok(Math.abs(r.nv-nv0)<=1,file+': barra in basso ferma ('+nv0+' -> '+r.nv+')');
 ok(errs.length===0,file+': nessun errore JS '+errs.join('|'));await c.close()}
await b.close();console.log(bad?'FALLITO':'TUTTO OK');process.exit(bad?1:0)})();
