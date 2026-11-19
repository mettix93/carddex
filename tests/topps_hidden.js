// Topps non deve comparire in PullTime (né album, né statistiche, né scambi)
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
const r=await p.evaluate(()=>({cols:COLS.map(c=>c.k),sets:stSets(),tot:stTot(),stx:(()=>{const d=document.createElement('div');d.innerHTML=usrStats();return d.innerText})(),cv:(()=>{try{return cvList0().filter(x=>x.c.sid==="S").length}catch(e){return 'err'}})()}));
console.log(JSON.stringify(r).slice(0,400));
const g=await p.evaluate(()=>{const o=[];document.querySelectorAll('*').forEach(e=>{if(e.children.length===0&&/topps/i.test(e.textContent)&&e.offsetParent!==null)o.push(e.tagName+':'+e.textContent.slice(0,40))});return o});
ok(!g.length,'nessun testo "Topps" visibile nella schermata iniziale '+g.join('|'));
ok(!r.cols.includes("gS"),'Topps non tra le collezioni dell\'album ('+r.cols.join(',')+')');
ok(!/Topps/i.test(r.stx),'statistiche senza Topps');
ok(r.cv===0,'scambi/conversioni: nessuna carta Topps ('+r.cv+')');
ok(!er.length,'nessun errore JS '+er.join('|'));
await b.close();console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})();
