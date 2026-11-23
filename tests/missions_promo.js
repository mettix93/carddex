// Missioni promo v491: 55 missioni a fasi, tutte segrete, contatori, avviso di completamento con "Vai alla missione"
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const e=[];p.on('pageerror',x=>e.push(x.message));await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app')});await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(2200);
const A=await p.evaluate(()=>{const L=MSB;const ph=[1,2,3].map(k=>L.filter(x=>x.ph===k).length);const ids=new Set(L.map(x=>x.id));
 const miss=L.filter(x=>!x.off&&!CARDS[x.r]).map(x=>x.id);const bad=[];L.forEach(x=>{try{const n=x.n(),N=x.N();if(!(typeof n==="number"&&isFinite(n))||!(N>=1))bad.push(x.id+":"+n+"/"+N)}catch(er){bad.push(x.id+" ERR "+er.message)}});
 return{len:L.length,ph,uniq:ids.size,miss,bad,vis:msAll().map(x=>x.num),allsec:L.every(x=>x.sec===1)}});
console.log(JSON.stringify(A));
ok(A.len===55&&A.uniq===55,'55 missioni con id unici');ok(A.ph.join()==='19,18,18','fasi 19/18/18: '+A.ph);ok(!A.miss.length,'ogni missione ha la sua carta promo: '+A.miss);ok(!A.bad.length,'contatori validi: '+A.bad.join('|'));
ok(A.allsec,'tutte segrete');ok(A.vis.length===19&&A.vis.every((n,i,a)=>!i||n>a[i-1]),'visibili solo quelle di Fase 1, in ordine di numero: '+A.vis.join());
// Missione 1: 25 Pikachu (anche ripetute) -> avviso
await p.evaluate(()=>{const c=Object.values(CARDS).find(c=>c.sid==="B"&&c.kd==="p"&&c.dex===25);const x=(st.gB||[]).find(y=>y.id===c.id);x.o=1;x.q=25;save()});
await p.waitForTimeout(1600);
const P=await p.evaluate(()=>{const t=document.getElementById('trm');return{vis:!!t&&!t.hidden,txt:t?t.textContent:'',badge:(document.querySelector('#pkms .msbn')||{}).textContent||'',rdy:msReady().map(x=>x.id)}});
console.log(JSON.stringify(P));ok(P.rdy.includes('m1'),'Mascotte completata con 25 Pikachu ripetute');ok(P.vis&&/completat/.test(P.txt)&&/Mascotte/.test(P.txt)&&/Vai alle? mission/.test(P.txt),'pop-up con nomi e bottone');ok(P.badge==='2','numerino sul tasto Missioni = '+P.badge);
// bottone: apre Missioni e inquadra la missione al centro
await p.evaluate(()=>{[...document.querySelectorAll('#trm .trbtn')].find(b=>/Vai alle? mission/.test(b.textContent)).click()});await p.waitForTimeout(2200);
const G=await p.evaluate(()=>{const m=document.getElementById('msp'),w=m&&m.querySelector('.msw2'),el=w&&w.querySelector('.msi[data-x="m1"]');if(!el)return null;const a=el.getBoundingClientRect(),c=w.getBoundingClientRect();return{open:!m.hidden,mid:Math.abs((a.top+a.height/2)-(c.top+c.height/2)),hl:el.classList.contains('msfl'),sealed:!!el.querySelector('.mys'),cl:el.classList.contains('cl')}});
console.log(JSON.stringify(G));ok(G&&G.open&&G.sealed,'Missioni aperte, carta segreta senza anteprima');ok(G&&(G.mid<60||G.cl),'missione inquadrata: scarto dal centro '+(G&&G.mid));
// scambi
const T=await p.evaluate(()=>{msTrade(['B1','B2'],['B3'],'t1');msTrade(['B1'],['B3'],'t1');msTrade(['B20'],['B21'],'t2');const M=msSt();return{tn:M.tn,tc:M.tc,r15:MSB.find(x=>x.num===15).n(),r5:MSB.find(x=>x.num===5).n()}});
ok(T.tn===2&&T.tc===3&&T.r15===1&&T.r5===3,'contatori scambi senza doppi conteggi '+JSON.stringify(T));
const D=await p.evaluate(()=>{const M=msSt();M.hs=0;M.hm=0;msSv(M);const a=MSB.find(x=>x.num===16).n();M.hm=6;msSv(M);return[a,MSB.find(x=>x.num===16).n()]});ok(D[0]===0&&D[1]===6,'serie senza holo');
// compleanno
const B=await p.evaluate(()=>{const t=new Date(),y=new Date(t.getTime()-864e5),f=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');localStorage.setItem('carddex_user',JSON.stringify({n:'T',bd:String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0'),bs:f(y)}));const M=msSt();delete M.bdok;msSv(M);return MSB.find(x=>x.num===24).n()});ok(B===1,'compleanno: ricevuta alla prima apertura dal giorno');
const B2=await p.evaluate(()=>{const t=new Date(),f=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');localStorage.setItem('carddex_user',JSON.stringify({n:'T',bd:String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0'),bs:f(t)}));const M=msSt();delete M.bdok;msSv(M);return MSB.find(x=>x.num===24).n()});ok(B2===1,'compleanno oggi, account creato oggi: vale');
// riscatto: la carta promo entra nell'album, la missione risulta completata
const C=await p.evaluate(()=>{const a=msClaim("m1");const e=(st.gQ||[]).find(x=>x.id==="Q1");return{a,own:!!(e&&e.o),done:msDone(MSB.find(x=>x.num===1)),c50:["Q50","Q51","Q52","Q53"].map(i=>CARDS[i]&&CARDS[i].name),q54:!!CARDS.Q54}});
console.log(JSON.stringify(C));ok(C.a&&C.own&&C.done,'riscatto: carta promo nell\'album e missione completata');ok(C.c50.join()==='Celebi,Rapidash,Ho-Oh,Suicune','promo 50-53 presenti: '+C.c50);
// l'account non si crea senza compleanno
await p.evaluate(()=>{localStorage.removeItem('carddex_user')});await p.reload();await p.waitForTimeout(2200);await p.evaluate(()=>document.querySelector('#nvp button[data-t=s]').click());await p.waitForTimeout(700);
await p.evaluate(()=>{const t=document.getElementById('trm');if(t)t.hidden=true});await p.fill('#unm','Anna');await p.dispatchEvent('#unm','change');await p.click('button[data-u=cr]');await p.waitForTimeout(900);
const NB=await p.evaluate(()=>({acc:!!cuGet(),sel:!!document.querySelector('#ubdd')}));ok(!NB.acc&&NB.sel,'senza compleanno l\'account non si crea');
// fasi 2 e 3: visibili solo in Dev, bloccate in App
const DV=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),q=await DV.newPage();await q.route(/^https?:\/\/(?!localhost)/,r=>r.abort());await q.addInitScript(()=>{localStorage.setItem('carddex_env','dev')});await q.goto('http://localhost:8765/carddex-album.html');await q.waitForTimeout(2200);
const dv=await q.evaluate(()=>({n:msAll().filter(x=>x.ph).length,ph:[...new Set(msAll().filter(x=>x.ph).map(x=>x.ph))].join()}));ok(dv.n===54&&dv.ph==='1,2,3','Dev: tutte le fasi visibili ('+JSON.stringify(dv)+')');
const ap=await p.evaluate(()=>({n:msAll().filter(x=>x.ph).length,ph:[...new Set(msAll().filter(x=>x.ph).map(x=>x.ph))].join()}));ok(ap.n===19&&ap.ph==='1','App: solo Fase 1 ('+JSON.stringify(ap)+')');
// numerino blu
await q.close();
const ee=e.filter(x=>!/decode audio/.test(x));ok(!ee.length,'nessun errore '+ee.join('|'));await b.close();process.exit(bad?1:0)})();
