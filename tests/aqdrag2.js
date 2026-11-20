const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');sessionStorage.setItem('cdmode','g')});await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{aslOpen()});await p.waitForTimeout(500);await p.evaluate(()=>{aslGo("g")});await p.waitForTimeout(900);
await p.evaluate(()=>{const k=COLS[0].k,L=st[k].filter(s=>s.id);const picks=[L[30]];PKAQ=[];picks.forEach(s=>{s.o=1;s.q=1;PKAQ.push({k,id:s.id})});aqSave();cur=k;pg=0;sp=0;tabs();render();setTimeout(()=>aqAnim0(k),50)});await p.waitForTimeout(900);
const c0=await p.evaluate(()=>{const r=document.querySelector('#aqp .aqc').getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]});
await p.mouse.move(...c0);await p.mouse.down();await p.waitForTimeout(250);await p.mouse.move(200,400,{steps:6});await p.mouse.move(395,400,{steps:6});
await p.waitForTimeout(2300);const pg1=await p.evaluate(()=>pg);console.log('pagina dopo bordo',pg1);ok(pg1>=3,'pagina girata dal bordo');
await p.mouse.move(200,400,{steps:6});
let s=null;for(let i=0;i<3&&!s;i++){s=await p.evaluate(()=>{const e=aqpSlot(30);if(!e)return null;const r=e.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]});if(!s){await p.mouse.move(395,400,{steps:3});await p.waitForTimeout(800);await p.mouse.move(200,400,{steps:3})}}
console.log('slot',s,await p.evaluate(()=>pg));
if(s){await p.mouse.move(s[0],s[1],{steps:6});await p.waitForTimeout(150);await p.mouse.up();await p.waitForTimeout(1500);ok(await p.evaluate(()=>PKAQ.length===0&&[...document.querySelectorAll('.slot[data-i="30"]')].some(e=>e.classList.contains('on'))),'inserita dopo cambio pagina');ok(await p.evaluate(()=>!document.querySelector('#aqp')&&!document.body.classList.contains('aqpm')),'barra set ripristinata')}
ok(!errs.length,'nessun errore '+errs.join('|'));await b.close();process.exit(bad?1:0)})();
