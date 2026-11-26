// v566: il suggerimento "Trascina ogni carta" compare solo al primo set della sessione
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');sessionStorage.setItem('cdmode','g')});await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{aslOpen()});await p.waitForTimeout(500);await p.evaluate(()=>{aslGo("g")});await p.waitForTimeout(900);
const run=async i=>{await p.evaluate(i=>{const k=COLS[i].k,L=st[k].filter(s=>s.id);PKAQ=[];[L[1],L[3]].forEach(s=>{s.o=1;s.q=1;PKAQ.push({k,id:s.id})});aqSave();cur=k;pg=0;sp=0;tabs();render();setTimeout(()=>aqAnim0(k),50)},i);await p.waitForTimeout(1600);return p.evaluate(()=>!!document.querySelector('#aqh'))};
ok(await run(0),'primo set: messaggio visibile');
await p.evaluate(()=>{aqpOff();const h=document.querySelector('#aqh');if(h)h.remove()});await p.waitForTimeout(500);
ok(!(await run(1)),'secondo set: messaggio non ricompare');
await b.close();process.exit(bad)})();
