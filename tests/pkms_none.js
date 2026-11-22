// Il tasto Missioni resta visibile e cliccabile anche senza bustine da aprire
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const e=[];p.on('pageerror',x=>e.push(x.message));await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app')});await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
await p.evaluate(()=>{try{pkOpen&&pkOpen()}catch(x){}});await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const pk=document.getElementById('pkp');if(!pk)return null;pk.classList.add('none');const b=document.getElementById('pkms');const cs=b&&getComputedStyle(b);return{none:pk.classList.contains('none'),op:cs&&cs.opacity,pe:cs&&cs.pointerEvents,vis:b&&b.getBoundingClientRect().width>0}});
console.log(JSON.stringify(r));ok(r&&r.op==='1'&&r.pe!=='none'&&r.vis,'Missioni visibile con "nessuna bustina"');
const ee=e.filter(x=>!/decode audio/.test(x));ok(!ee.length,'nessun errore '+ee.join('|'));await b.close();process.exit(bad?1:0)})();
