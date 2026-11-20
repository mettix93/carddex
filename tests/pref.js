// album Preferiti: usa il motore dell'album (pagine, drag, colori), non salva copie
const {chromium}=require('playwright');const {DB,mock}=require('./lib_sb.js');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);
await p.evaluate(()=>{const f=st.gF.find(x=>x.id);f.o=1;f.q=2;save()});
ok(await p.evaluate(()=>JSON.parse(localStorage.getItem(SKEY)).gF.some(x=>x.o&&x.q===2)),'Fossil (gF) salvato regolarmente');
const n=await p.evaluate(()=>{let k=0;for(const co of GCOLS){for(const s of st[co.k]){if(s.id&&k<11){s.o=1;s.q=1;s.fav=1;k++}}}save();return k});ok(n===11,'11 carte preferite');
await p.evaluate(()=>{aslOpen()});await p.waitForTimeout(900);
ok(await p.evaluate(()=>!!document.querySelector('.asc[data-m=f]')),'voce Preferiti nella pagina Album');
await p.click('.asc[data-m=f]');await p.waitForTimeout(1200);
const s1=await p.evaluate(()=>({pfm:PFM,cur,np,ttl:document.querySelector('#ttl').textContent,tabs:document.querySelector('#tabs').children.length,slots:document.querySelectorAll('.pg:first-child .slot').length,ft:getComputedStyle(document.querySelector('#ft')).display,fvb:document.querySelectorAll('.slot .fvb').length}));
ok(s1.pfm===1&&s1.cur==='zPF'&&s1.np===2,'modalità preferiti, 2 pagine '+JSON.stringify(s1));
ok(s1.ttl==='Preferiti'&&s1.tabs===0&&s1.ft==='none','titolo, niente tab set, niente filtro');
ok(s1.fvb>=9,'cuoricino sulle carte preferite');
await p.screenshot({path:'/tmp/claude-0/-home-claude/a48e991f-c09e-5f08-885c-e90d39037161/scratchpad/pf1.png'});
const ids=await p.evaluate(()=>st.zPF.map(x=>x.id));
await p.evaluate(()=>dgCommit(0,3));await p.waitForTimeout(300);
const o2=await p.evaluate(()=>st.zPF.map(x=>x.id));ok(o2[2]===ids[0]&&o2[0]===ids[1],'drag: ordine cambiato');
ok(await p.evaluate(()=>!JSON.parse(localStorage.getItem(SKEY)).zPF),'nessuna copia gF salvata');
// esco e rientro: ordine ricordato
await p.evaluate(()=>goTab("c"));await p.waitForTimeout(900);
ok(await p.evaluate(()=>PFM)===0&&await p.evaluate(()=>!!document.querySelector('.aslw')),'Album dal menu → selezione modalità');
await p.click('.asc[data-m=f]');await p.waitForTimeout(1200);
ok(JSON.stringify(await p.evaluate(()=>st.zPF.map(x=>x.id)))===JSON.stringify(o2),'ordine personalizzato ricordato');
// togliere dai preferiti
await p.evaluate(id=>{const s=st.zPF.find(x=>x.id===id);s.fav=0;save();render()},ids[5]);
ok(await p.evaluate(()=>st.zPF.length)===10,'tolta dai preferiti: 10');
// bacheche -> menu Album torna alla selezione
await p.evaluate(()=>goTab("c"));await p.waitForTimeout(900);await p.click('.asc[data-m=b]');await p.waitForTimeout(700);
ok(await p.evaluate(()=>!document.querySelector('.aslw')),'in Bacheche');
await p.evaluate(()=>goTab("c"));await p.waitForTimeout(700);
ok(await p.evaluate(()=>!!document.querySelector('.aslw')),'da Bacheche, Album → selezione');
// album normale intatto
await p.click('.asc[data-m=g]');await p.waitForTimeout(1200);
ok(await p.evaluate(()=>PFM===0&&cur!=='zPF'&&document.querySelector('#tabs').children.length>3),'album normale: tab set tornate');
ok(await p.evaluate(()=>st.gF.some(x=>x.o&&x.q===2)&&JSON.parse(localStorage.getItem(SKEY)).gF.some(x=>x.o&&x.q===2)),'Fossil intatto dopo uso dei Preferiti');
ok(errs.length===0,'nessun errore JS '+errs.join('|'));
console.log(bad?'FALLITO':'TUTTO OK');await b.close();process.exit(bad?1:0)})()
