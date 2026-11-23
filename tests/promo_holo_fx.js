// promo holo: cornice dorata + scia dorata all'apertura (carta aperta); nessun effetto su carte non promo
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)process.exitCode=1};
const ids=await p.evaluate(()=>{const PN=Object.values(CARDS).filter(c=>c.sid==='Q'&&!c.h&&c.kd==='p').map(c=>c.id);window.__PN=PN;const P=Object.values(CARDS).filter(c=>msPr(c)&&c.h&&c.kd==="p").map(c=>c.id),N=Object.values(CARDS).filter(c=>!msPr(c)&&c.h&&c.kd==="p"&&c.sid==="B").map(c=>c.id);return {PN:PN.slice(0,2),P:P.slice(0,3),N:N.slice(0,2),np:P.length}});
console.log(JSON.stringify(ids));ok(ids.P.length>0,'esistono promo holo ('+ids.np+')');
const open=async id=>{await p.evaluate(i=>{const c=CARDS[i];[...document.querySelectorAll('#vw .pkpf')].forEach(e=>e.remove());window.__vc=c;st[(COLS.find(co=>st[co.k].some(x=>x.id===i))||{}).k]&&0;try{pkView(c)}catch(e){window.__e=String(e)}},id)};
await open(ids.P[0]);await p.waitForTimeout(1500);
let f=await p.evaluate(()=>({fr:document.querySelectorAll('#vw .pkpf').length,vw:!document.getElementById('vw').hidden,e:window.__e}));console.log(JSON.stringify(f));
ok(f.vw&&f.fr>=1,'luce dorata presente su promo holo');
await p.screenshot({path:'/tmp/promo1.png'});await p.waitForTimeout(300);
await p.waitForTimeout(1800);await p.screenshot({path:'/tmp/promo2.png'});
f=await p.evaluate(()=>({fr:document.querySelectorAll('#vw .pkpf').length,sw:document.querySelectorAll('#vw .pkhs').length}));
ok(f.fr>=1,'la luce resta dopo l\'animazione');
await p.evaluate(()=>{const x=document.querySelector('#vw .vx,#vw button[aria-label=Chiudi]');if(x)x.click()});await p.waitForTimeout(500);
await open(ids.N[0]);await p.waitForTimeout(2500);
f=await p.evaluate(()=>document.querySelectorAll('#vw .pkpf').length);ok(f===0,'nessuna cornice su holo non promo');
await p.evaluate(()=>{const x=document.querySelector('#vw .vx,#vw button[aria-label=Chiudi]');if(x)x.click()});await p.waitForTimeout(500);
if(ids.PN.length){await open(ids.PN[0]);await p.waitForTimeout(1800);const g=await p.evaluate(()=>({n:document.querySelectorAll('#vw .pkpf').length,pm:document.getElementById('card').classList.contains('pkpm'),sh:getComputedStyle(document.querySelector('#card>.ft')).boxShadow}));ok(g.n>=3&&g.pm&&g.sh==='none','promo NON holo: luce presente, ombra nera sotto la carta tolta '+JSON.stringify(g));await p.screenshot({path:'/tmp/promo_nh.png'})}else console.log('nessuna promo non holo')
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close()})();
