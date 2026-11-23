// pop-up sblocco: "Più tardi", ventaglio allineato, stessa altezza; reveal: raggio continuo, verso del dito
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
const p=await b.newPage({viewport:{width:402,height:874},deviceScaleFactor:1.5});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
const M=async k=>{await p.evaluate(()=>{const e=document.getElementById("trm");if(e)e.hidden=true;msPop=0});await p.evaluate(()=>ulShow(1,"s",1));await p.waitForTimeout(500)};
await M();
let a=await p.evaluate(()=>{const r=[...document.querySelectorAll("#trm .ulf img")].map(i=>{const q=i.getBoundingClientRect();return [Math.round(q.top+q.height/2),Math.round(q.width)]});const e=document.querySelector("#trm .ptc").getBoundingClientRect();return {c:r,btn:[...document.querySelectorAll("#trm .trbtn")].map(x=>x.textContent),h:Math.round(e.height),t:document.querySelector("#trm .trt").getBoundingClientRect().height|0}});
console.log(JSON.stringify(a));await p.screenshot({path:'/tmp/p1.png'});
ok(a.c.length===3&&new Set(a.c.map(x=>x[0])).size===1,'Bustine sullo stesso asse orizzontale');ok(a.btn.join()==='Vai alle bustine,Più tardi','Pulsanti: Vai alle bustine / Più tardi');
await p.evaluate(()=>[...document.querySelectorAll("#trm .trbtn")].find(x=>x.textContent==="Più tardi").click());await p.waitForTimeout(1000);
let m=await p.evaluate(()=>{const e=document.querySelector("#trm .ptc").getBoundingClientRect();const r=[...document.querySelectorAll("#trm .ulf .msmy")].map(i=>{const q=i.getBoundingClientRect();return Math.round(q.top+q.height/2)});return {h:Math.round(e.height),t:document.querySelector("#trm .trt").textContent,n:document.querySelector("#trm .trn").textContent,r,btn:[...document.querySelectorAll("#trm .trbtn")].map(x=>x.textContent),th:document.querySelector("#trm .trt").getBoundingClientRect().height|0}});
console.log(JSON.stringify(m));await p.screenshot({path:'/tmp/p2.png'});
ok(m.h===a.h&&m.th===a.t,'Pop-up missioni alto come quello dei set ('+m.h+' = '+a.h+')');ok(m.n==='18 nuove missioni ti aspettano'&&Math.max(...m.r)-Math.min(...m.r)<=2&&m.btn[1]==='Più tardi','Testo, allineamento e Più tardi');
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close();process.exit(bad)})();
