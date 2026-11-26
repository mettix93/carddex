// Scambi: riepilogo, animazione, Posta, Offri/Chiedi, preferiti dell'amico in sola lettura, niente "scambio con codice"
const {chromium}=require('playwright');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();const errs=[];
p.on('pageerror',e=>errs.push(String(e)));await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());await p.addInitScript(()=>{localStorage.setItem('carddex_env','dev')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
await p.evaluate(()=>{frOpen("t")});await p.waitForTimeout(300);await p.click('#frm [data-a=sim]');await p.waitForTimeout(300);
await p.evaluate(()=>{FR.v="home";frDraw()});
ok(await p.evaluate(()=>!document.querySelector('#frm [data-a=cod]')&&!/codice/i.test(document.querySelector('#frm').textContent)),'nessun "scambio con codice"');
// animazione: tutte le carte presenti, dritte a inizio e fine
await p.evaluate(()=>{FR.v="sim";frDraw()});await p.click('#frm [data-a=sx][data-k=a10]');await p.waitForTimeout(1200);
const rot=()=>p.evaluate(()=>{const f=s=>{const e=document.querySelector(s+' .anc');const m=getComputedStyle(e).transform.match(/matrix\(([^)]+)\)/)[1].split(',').map(Number);return Math.round(Math.atan2(m[1],m[0])*180/Math.PI)};return{m:f('.anMine'),t:f('.anTheirs'),nm:document.querySelectorAll('.anMine .anc').length,nt:document.querySelectorAll('.anTheirs .anc').length,xs:[...document.querySelectorAll('.anMine .anc')].map(e=>Math.round(new DOMMatrix(getComputedStyle(e).transform).e))}});
const a0=await rot();
ok(a0.nm===10&&a0.nt===10,'animazione: tutte le carte presenti ('+a0.nm+' e '+a0.nt+')');
ok(Math.abs(a0.m)<2&&Math.abs(Math.abs(a0.t)-180)<2,'all\'inizio le carte guardano il proprietario (mie '+a0.m+'°, sue '+a0.t+'°)');
ok(a0.xs[0]<a0.xs[1]&&a0.xs[1]<a0.xs[9]&&Math.abs(a0.xs[0]+a0.xs[9])<4,'ventaglio centrato: prima carta (più rara) a sinistra, le altre a destra '+a0.xs.join(','));
{const g=await p.evaluate(()=>{const q=s=>document.querySelector(s).getBoundingClientRect(),me=q('.annm.anme'),th=q('.annm.anth'),cm=q('.anMine .anc'),ct=q('.anTheirs .anc');return[Math.round(me.top-cm.bottom),Math.round(ct.top-th.bottom)]});ok(Math.abs(g[0]-g[1])<=2&&g[0]>10,'nomi utente a distanza uguale dalle carte, sopra e sotto ('+g+')')}
await p.evaluate(()=>FR.anA.forEach(a=>a.finish()));await p.waitForTimeout(300);
const a1=await rot();
ok(Math.abs(Math.abs(a1.m)-180)<2&&Math.abs(a1.t)<2,'alla fine guardano il nuovo proprietario (mie '+a1.m+'°, sue '+a1.t+'°)');
ok(a1.xs.every(x=>Math.abs(x)<2),'a fine corsa le pile sono compatte e centrate');
await p.evaluate(()=>frSkip());await p.waitForTimeout(500);
ok(await p.evaluate(()=>{const f=document.querySelectorAll('#frm .frft.frpk .frb2');return f.length===2&&/album/i.test(f[0].textContent)&&/Fatto/.test(f[1].textContent)}),'riepilogo: "Vai all\'album" + "Fatto"');
await p.click('#frm [data-a=alb]');await p.waitForTimeout(700);
ok(await p.evaluate(()=>document.querySelector('#frm').hidden&&!!cur&&cur!=="zPF"),'"Vai all\'album" apre l\'album ('+await p.evaluate(()=>cur)+')');
// Posta
await p.evaluate(()=>{frOpen("t")});await p.waitForTimeout(300);await p.evaluate(()=>{FRS.on||FRS.setup();FR.v="sim";frDraw()});
await p.evaluate(()=>{const t=FR.tr;t.forEach((x,i)=>x.created_at=new Date(Date.now()-i*36e5*30).toISOString());FR.tr.filter(x=>x.status==="accepted").forEach(x=>{});FR.v="mail";frDraw()});await p.waitForTimeout(200);
const ch=await p.evaluate(()=>{const R=[...document.querySelectorAll('#frm .frr')];const x=R.map(r=>{const b=r.querySelector('.frs,.frpl');return b?Math.round(b.getBoundingClientRect().right):null}).filter(v=>v!=null);return x});
ok(ch.length>=3&&new Set(ch).size===1,'Posta: tastini allineati a destra '+ch.join(','));
const dt=await p.evaluate(()=>[...document.querySelectorAll('#frm .frxw small')].map(e=>e.textContent));
ok(dt.every(t=>!/completato|rifiutata|annullata|scaduta/.test(t)),'Posta: niente testo di stato nel sottotitolo ('+dt.join(' / ')+')');
ok(await p.evaluate(()=>{const o=[...FR.tr].filter(t=>t.status!=="pending").sort(frByT);return o.length&&Date.parse(o[0].created_at)>=Date.parse(o[o.length-1].created_at)}),'ordine cronologico (più recente in cima)');
// Offri / Chiedi
await p.evaluate(()=>{FR.u="sim-g";FR.v="fr";frDraw();FR.gv={};FR.gt={};FR.tab="give";FR.v="pr";frDraw()});await p.waitForTimeout(200);
const g1=await p.evaluate(()=>({t:[...document.querySelectorAll('#frm .cvtot .sgt')].map(e=>e.firstChild.textContent),dots:document.querySelectorAll('#frm .frnw').length}));
ok(g1.t.some(x=>/Mancanti per Giulia/.test(x))&&g1.t.some(x=>/Le ha già/.test(x))&&g1.dots===0,'Offri: sezioni '+g1.t.join(' / ')+', pallini '+g1.dots);
await p.evaluate(()=>{FR.tab="get";frDraw()});await p.waitForTimeout(150);
const g2=await p.evaluate(()=>[...document.querySelectorAll('#frm .cvtot .sgt')].map(e=>e.firstChild.textContent));
ok(g2.some(x=>/Mancanti per te/.test(x))&&g2.some(x=>/Le hai già/.test(x)),'Chiedi: sezioni '+g2.join(' / '));
// preferiti dell'amico
await p.evaluate(()=>{FR.u="sim-g";FR.v="fr";frDraw()});await p.click('#frm [data-a=coll]');await p.waitForTimeout(2200);
const f1=await p.evaluate(()=>({ro:!!PFRO,pfm:PFM,n:document.querySelectorAll('.slot.on').length,hid:['#sty','#so','#sq','#mo'].map(s=>{const e=document.querySelector(s);return !e||getComputedStyle(e).visibility==='hidden'}).concat([getComputedStyle(document.querySelector('#acx')).display!=='none']),ttl:document.querySelector('#ttl').textContent}));
ok(f1.ro&&f1.pfm&&f1.n>0&&f1.hid.every(Boolean),'preferiti amico: sola lettura, '+f1.n+' carte, comandi nascosti, titolo "'+f1.ttl+'"');
const mine0=await p.evaluate(()=>JSON.stringify([localStorage.getItem('carddex_gord_d')||localStorage.getItem('carddex_gord'),localStorage.getItem('carddex_gcu_d')||localStorage.getItem('carddex_gcu')]));
await p.evaluate(()=>{toggle(0);save();menu(0);dgOk()&&0});await p.waitForTimeout(200);
ok(await p.evaluate(()=>document.querySelector('#sh').hidden&&st.zPF.every(x=>x.o===1)),'nessuna modifica possibile (menu, doppio tocco)');
await p.click('#acx');await p.waitForTimeout(500);
ok(await p.evaluate(()=>!PFRO&&!PFM&&FR.v==="fr"&&!document.querySelector('#frm').hidden),'la X torna alla pagina dell\'amico');
ok(mine0===await p.evaluate(()=>JSON.stringify([localStorage.getItem('carddex_gord_d')||localStorage.getItem('carddex_gord'),localStorage.getItem('carddex_gcu_d')||localStorage.getItem('carddex_gcu')])),'i miei preferiti non sono cambiati');
// Vai all'album: primo set (da sinistra) con carte da aggiungere
await p.evaluate(()=>{FRS.on||FRS.setup();const e=frEl();e.hidden=false;const ks=GCOLS.map(c=>c.k),pick=k=>{const s=st[k].find(x=>x&&x.id);s.o=1;return s.id};
  PKAQ=[{k:ks[3],id:pick(ks[3])},{k:ks[1],id:pick(ks[1])}];window.__ks=ks;FR.dn={who:"Giulia",give:[],get:[st[ks[3]].find(x=>x&&x.id).id],nw:[st[ks[3]].find(x=>x&&x.id).id],dx:[]};FR.v="done";frDraw()});
await p.evaluate(()=>{goTab("b")});await p.waitForTimeout(800);
const pk0=await p.evaluate(()=>!document.querySelector('#pk').hidden);
await p.evaluate(()=>{const e=frEl();e.hidden=false;FR.v="done";frDraw()});await p.waitForTimeout(200);
await p.click('#frm [data-a=alb]');await p.waitForTimeout(1800);
ok(pk0&&await p.evaluate(()=>document.querySelector('#pk').hidden&&!document.body.classList.contains('pkNv')&&!!document.querySelector('#book').offsetParent&&document.querySelector('#frm').hidden),'"Vai all\'album" da Bustine: si vede davvero l\'album');
ok(await p.evaluate(()=>cur===__ks[1]),'"Vai all\'album" apre il primo set con carte da aggiungere ('+await p.evaluate(()=>cur+' invece di '+__ks[3])+')');
// pagina amico: tasti fissi + scambi sotto l'amico
await p.evaluate(()=>{frOpen("t")});await p.waitForTimeout(300);await p.evaluate(()=>{FRS.on||FRS.setup();FR.u="sim-g";FR.v="fr";frDraw()});
ok(await p.evaluate(()=>!document.querySelector('#frm .cvbk')&&document.querySelector('#frm .cvx').dataset.a==='bk'&&!!document.querySelector('#frm .frft.frpk [data-a=prop]')&&!!document.querySelector('#frm .frft.frpk [data-a=coll]')&&document.querySelectorAll('#frm .frxw,#frm [data-a=vt]').length>0),'pagina amico: scambi sotto, tasti fissi in fondo');
ok(await p.evaluate(()=>{FR.v="home";frDraw();return !document.querySelector('#frm [data-a=mail]')&&!!document.querySelector('#frm .frb')}),'elenco amici: niente Posta, numerino sull\'amico');
ok(errs.length===0,'nessun errore JS '+errs.join('|'));
await b.close();console.log(bad?'FALLITO':'TUTTO OK');process.exit(bad?1:0)})();
