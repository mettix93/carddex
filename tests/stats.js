// statistiche: carte scoperte e set completati contano solo i set sbloccati, senza le carte Promo delle missioni
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
const S=()=>p.evaluate(()=>({u:stUniq(),s:stSets(),t:stTot()}));
const s0=await S();ok(s0.u===0&&s0.s===0,'partenza: 0 scoperte, 0 set '+JSON.stringify(s0));
// il totale non include il set Promo né i set bloccati
const tot=await p.evaluate(()=>{let n=0;GCOLS.forEach(c=>{if(c.s[0]!=="Q"&&c.s[0]!=="X"&&c.s[0]!=="S"&&!pkLkS(c.s[0]))n+=(st[c.k]||[]).length});return n});
ok(s0.t.sl===tot,'totale carte = solo set sbloccati senza Promo ('+s0.t.sl+')');
// possiedo tutte le carte Promo + Mew antico: non contano
await p.evaluate(()=>{GCOLS.filter(c=>c.s[0]==="Q").forEach(c=>st[c.k].forEach(s=>{if(s.id){s.o=1;s.q=1}}));save()});
const s1=await S();ok(s1.u===0&&s1.s===0&&s1.t.sl===s0.t.sl,'carte Promo possedute: non contano '+JSON.stringify(s1));
// carte di un set bloccato (Team Rocket): non contano
const locked=await p.evaluate(()=>{const c=GCOLS.find(x=>x.s[0]==="R");const l=!!pkLkS("R");st[c.k].slice(0,5).forEach(s=>{if(s.id){s.o=1;s.q=1}});save();return l});
const s2=await S();ok(locked&&s2.u===0,'set bloccato: carte possedute non contano (bloccato='+locked+')');
// completo Base: 1 set, tutte le sue carte
await p.evaluate(()=>{const c=GCOLS.find(x=>x.s[0]==="B");st[c.k].forEach(s=>{if(s.id){s.o=1;s.q=1}});save()});
const s3=await S();ok(s3.s===1&&s3.u===st_len(s3),'Base completo: 1 set e '+s3.u+' scoperte');
function st_len(){return s3.u}
const nb=await p.evaluate(()=>st[GCOLS.find(x=>x.s[0]==="B").k].filter(s=>s.id).length);ok(s3.u===nb,'scoperte = carte di Base ('+nb+')');
// sblocco: copertura 80% del blocco 1 (Base, Jungle, Fossil) → Rocket si sblocca e le sue carte contano
await p.evaluate(()=>{["B","J","F"].forEach(k=>{const c=GCOLS.find(x=>x.s[0]===k);st[c.k].forEach(s=>{if(s.id){s.o=1;s.q=1}})});save()});
const s4=await p.evaluate(()=>({lock:!!pkLkS("R"),u:stUniq(),sets:stSets(),sl:stTot().sl}));
ok(!s4.lock&&s4.sets>=3&&s4.u>=102+64+62+5,'Rocket sbloccato: le sue carte ora contano '+JSON.stringify(s4));
ok(s4.sl>s0.t.sl,'e anche il totale cresce ('+s0.t.sl+' → '+s4.sl+')');
// le statistiche si disegnano
const txt=await p.evaluate(()=>{const d=document.createElement('div');d.innerHTML=usrStats();return d.innerText.replace(/\s+/g,' ')});
ok(/Carte scoperte/.test(txt)&&/Set completati/.test(txt),'tessere statistiche presenti: '+txt.slice(0,120));
ok(!er.length,'nessun errore JS '+er.join('|'));
await b.close();console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})();
