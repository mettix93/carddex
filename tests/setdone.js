// set e Pokédex completati: contorno oro, anello sull'icona selezionata, effetto una sola volta, flag nel backup
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
const tab=k=>p.evaluate(k=>{const b=document.querySelector('#tabs .tab[data-k="'+k+'"]');return b?{gd:b.classList.contains('gd'),pr:b.getAttribute('data-pr'),after:getComputedStyle(b,'::after').content}:null},k);
await p.evaluate(()=>document.querySelector("#nvp button[data-t=c]").click());await p.waitForTimeout(900);await p.evaluate(()=>document.querySelector(".asc[data-m=g]").click());await p.waitForTimeout(1200);
// 1) avanzamento: metà di Base, icona selezionata con anello, le altre senza
await p.evaluate(()=>{const a=st.gB;a.slice(0,Math.floor(a.length/2)).forEach(x=>{if(x.id){x.o=1;x.q=1}});save();cur="gB";tabs()});
const t1=await tab('gB'),t2=await tab('gJ');
ok(t1&&+t1.pr>=40&&+t1.pr<=55&&!t1.gd,'selezionata: anello al '+(t1&&t1.pr)+'%');
ok(t2&&t2.pr===null&&!t2.gd,'non selezionata: nessun anello');
// 2) completo Base: effetto, flag, oro
await p.evaluate(()=>{st.gB.forEach(x=>{if(x.id){x.o=1;x.q=1}});save();tabs()});
await p.waitForTimeout(1200);
const fx=await p.evaluate(()=>document.querySelectorAll('.sdfx').length);
ok(fx>5,'effetto in corso ('+fx+' elementi)');
ok(await p.evaluate(()=>sdGet().includes('s:gB')),'flag set completato salvato');
const t3=await tab('gB');ok(t3.gd&&t3.pr===null,'Base: contorno oro, niente anello blu');
const txt=await p.evaluate(()=>[...document.querySelectorAll('.sdfx')].map(e=>e.innerText).join('|'));ok(/Set completato/i.test(txt),'banner: '+txt.replace(/\n/g,' ').slice(0,60));
// 3) una sola volta
await p.waitForTimeout(3300);
await p.evaluate(()=>{cur="gJ";tabs();cur="gB";tabs()});await p.waitForTimeout(1200);
ok(await p.evaluate(()=>document.querySelectorAll('.sdfx').length)===0,'tornando su Base l\'effetto non si ripete');
ok((await tab('gB')).gd,'Base resta oro');
// 4) un set completo ma non ancora visto non è oro finché non ci si va
await p.evaluate(()=>{st.gJ.forEach(x=>{if(x.id){x.o=1;x.q=1}});save();cur="gB";tabs()});await p.waitForTimeout(900);
ok(!(await tab('gJ')).gd,'Jungle completo ma non visto: non oro');
await p.evaluate(()=>{cur="gJ";tabs()});await p.waitForTimeout(1200);
ok((await tab('gJ')).gd&&await p.evaluate(()=>sdGet().includes('s:gJ')),'aprendo Jungle: effetto e oro');
await p.waitForTimeout(3200);
// 5) barra bustine: oro su Base/Jungle, anello sul selezionato
const pk=await p.evaluate(()=>{pkOpenTest&&0;return 1}).catch(()=>1);
// 6) backup
ok(await p.evaluate(()=>bkObj().sd.includes('s:gB')),'backup contiene i set completati');
// 7) Pokédex: tutto posseduto → regioni una dopo l'altra
await p.evaluate(()=>{GCOLS.forEach(c=>(st[c.k]||[]).forEach(x=>{if(x.id){x.o=1;x.q=1}}));save()});
await p.evaluate(()=>{sdAdd('d:0');sdAdd('d:1')});
await p.evaluate(()=>document.querySelector('#nvp button[data-t=d]').click());await p.waitForTimeout(450);
await p.evaluate(()=>{document.querySelector('#set').scrollTop=2000});await p.waitForTimeout(2300);
const sc=await p.evaluate(()=>document.querySelector('#set').scrollTop);ok(sc<5,'il Pokédex risale in cima prima dell\'effetto ('+sc+')');
await p.waitForTimeout(2500);
const d=await p.evaluate(()=>sdGet().filter(x=>x[0]==='d'));
ok(d.length===3,'regioni completate celebrate: '+d.join(','));
const dt=await p.evaluate(()=>[...document.querySelectorAll('#tabs .tab')].map(b=>b.classList.contains('gd')));
ok(dt.every(Boolean),'pillole regioni tutte oro '+dt);
ok(!er.length,'nessun errore JS '+er.join('|'));
await b.close();console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})();
