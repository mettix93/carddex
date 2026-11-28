// v573: promo in attesa = tasche "?" con numero (niente anteprima); messaggio sparisce al tocco; ricompare dopo PopPack
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');sessionStorage.setItem('cdmode','g')});await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{aslOpen()});await p.waitForTimeout(500);await p.evaluate(()=>{aslGo("g")});await p.waitForTimeout(900);
const r=await p.evaluate(()=>{const c=COLS.find(c=>c.k==="gQ");if(!c)return null;const L=st.gQ.filter(s=>s.id);PKAQ=[];const s=L[0];s.o=1;s.q=1;PKAQ.push({k:"gQ",id:s.id});aqSave();cur="gQ";pg=0;sp=0;FLT="a";tabs();render();setTimeout(()=>aqAnim0("gQ"),50);return{n:L.length,id:s.id,i:LIST().findIndex(x=>x.id===s.id)}});
ok(!!r,'set gQ presente');await p.waitForTimeout(1500);
const q=await p.evaluate(r=>{const sl=[...document.querySelectorAll('.slot.my')];const e=document.querySelector('.slot[data-i="'+r.i+'"]');const vis=x=>{const u=x&&x.querySelector('u.sn');return !!u&&getComputedStyle(u).display!=='none'};return{n:sl.length,allNum:sl.every(vis),pendMy:!!e&&e.classList.contains('my'),pendImg:!!(e&&e.querySelector('img')),pendNum:e&&e.querySelector('u.sn')&&e.querySelector('u.sn').textContent,hint:!!document.querySelector('#aqh')}},r);
console.log(JSON.stringify(q));
ok(q.n>0&&q.allNum,'tutte le tasche ? mostrano il numero');ok(q.pendMy&&!q.pendImg,'carta in attesa: resta ?, nessuna anteprima');ok(+q.pendNum===r.i+1,'numero corretto');ok(q.hint,'messaggio visibile');
await p.mouse.click(200,500);await p.waitForTimeout(500);
ok(!(await p.evaluate(()=>!!document.querySelector('#aqh'))),'messaggio sparisce al tocco ovunque');
await p.evaluate(()=>{document.querySelector('#aqp .aqpa').click()});await p.waitForTimeout(4500);
const z=await p.evaluate(r=>{const e=document.querySelector('.slot[data-i="'+r.i+'"]');return{my:e.classList.contains('my'),img:!!e.querySelector('img,.ph'),on:e.classList.contains('on'),left:PKAQ.length}},r);console.log(JSON.stringify(z));
ok(!z.my&&z.img&&z.on&&z.left===0,'dopo il posizionamento: carta vera visibile');
// nuovo lotto (PopPack -> album): il messaggio ricompare nella stessa sessione
const h=await p.evaluate(()=>{const L=st.gQ.filter(s=>s.id);PKAQ=[];const s=L[1];s.o=1;s.q=1;PKAQ.push({k:"gQ",id:s.id});aqSave();return window.AQHS});
await p.evaluate(()=>{aqpOff();tabs();render();setTimeout(()=>aqAnim0("gQ"),50)});await p.waitForTimeout(1800);
ok(await p.evaluate(()=>!!document.querySelector('#aqh')),'nuovo lotto di carte: messaggio ricompare');
// tocco subito (prima dei 700ms) -> non compare
await p.evaluate(()=>{aqpOff();const h=document.querySelector('#aqh');if(h)h.remove();window.AQHS=0;tabs();render();setTimeout(()=>aqAnim0("gQ"),50)});await p.waitForTimeout(200);await p.mouse.click(200,500);await p.waitForTimeout(1500);
ok(!(await p.evaluate(()=>!!document.querySelector('#aqh'))),'tocco prima della comparsa: non compare');
await b.close();process.exit(bad)})();
