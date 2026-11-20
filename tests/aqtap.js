const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');sessionStorage.setItem('cdmode','g')});await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{aslOpen()});await p.waitForTimeout(500);await p.evaluate(()=>{aslGo("g")});await p.waitForTimeout(900);
await p.evaluate(()=>{const k=COLS[0].k,L=st[k].filter(s=>s.id);PKAQ=[];[L[1],L[30]].forEach(s=>{s.o=1;s.q=1;PKAQ.push({k,id:s.id})});aqSave();cur=k;pg=0;sp=0;tabs();render();setTimeout(()=>aqAnim0(k),50)});await p.waitForTimeout(900);
// tap the 2nd card (slot 30, page 3)
const c=await p.evaluate(()=>{const r=document.querySelectorAll('#aqp .aqc')[1].getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]});
await p.mouse.move(...c);await p.mouse.down();await p.waitForTimeout(60);await p.mouse.up();await p.waitForTimeout(3500);
console.log(await p.evaluate(()=>JSON.stringify({pg,q:PKAQ.length,on:[...document.querySelectorAll('.slot[data-i="30"]')].some(e=>e.classList.contains('on'))})));
ok(await p.evaluate(()=>PKAQ.length===1&&pg===3&&[...document.querySelectorAll('.slot[data-i="30"]')].some(e=>e.classList.contains('on'))),'tocco: pagina giusta e carta entrata da sola');
ok(await p.evaluate(()=>!!document.querySelector('#aqp .aqc')&&document.querySelectorAll('#aqp .aqc').length===1),'resta una carta nel mazzetto');
await p.screenshot({path:'/tmp/tp.png'});
const c2=await p.evaluate(()=>{const r=document.querySelector('#aqp .aqc').getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]});
await p.mouse.move(...c2);await p.mouse.down();await p.waitForTimeout(60);await p.mouse.up();await p.waitForTimeout(3500);
ok(await p.evaluate(()=>PKAQ.length===0&&!document.querySelector('#aqp')),'ultima carta toccata: finito e barra ripristinata');
ok(!errs.length,'nessun errore '+errs.join('|'));await b.close();process.exit(bad?1:0)})();
