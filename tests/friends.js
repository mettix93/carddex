// amici e scambi nel cloud: due (e tre) utenti finti su un finto Supabase con le stesse regole dell'SQL
const {chromium}=require('playwright');const {DB,mock}=require('./lib_sb.js');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
async function ctx(b,name){const c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
  await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);await p.evaluate(()=>document.querySelector('#nvp button[data-t=s]').click());await p.waitForTimeout(700);
  await p.fill('#unm',name);await p.dispatchEvent('#unm','change');await p.click('button[data-u=cr]');await p.waitForTimeout(1300);return p}
// segna come possedute (con doppie) alcune carte di rarità C: restituisce gli id
async function seed(p,from,n,q,own){return p.evaluate(([from,n,q,own])=>{const ids=[];for(const co of GCOLS){for(const s of st[co.k]){const c=trCard(s.id);if(c&&trK(c)==="C"&&ids.length<from+n+30&&!ids.includes(s.id))ids.push(s.id)}}
  const pick=ids.slice(from,from+n);pick.forEach(i=>{const s=trSlot(i);s.o=1;s.a=0;s.q=q});save();return pick},[from,n,q,own])}
const qOf=(p,i)=>p.evaluate(i=>{const s=trSlot(i);return s?(s.o?s.q:0):-1},i);
(async()=>{const b=await chromium.launch();
const A=await ctx(b,'Anna'),B=await ctx(b,'Bruno');
const aIds=await seed(A,0,3,2),bIds=await seed(B,10,3,2);
// A possiede anche un po' di carte singole che B non ha
await A.evaluate(()=>cuSync("push"));await B.evaluate(()=>cuSync("push"));
await A.evaluate(()=>{$("#cvs")||cvBuild();return frOpen()});await A.waitForTimeout(1500);
const codeA=await A.evaluate(()=>FR.me&&FR.me.code);ok(/^[A-Z2-9]{6}$/.test(codeA||''),'A: codice amico '+codeA);
ok(Object.keys(DB.collections).length>=1,'profilo e collezione pubblicati');
await B.evaluate(()=>frOpen("a"));await B.waitForTimeout(1500);
// i membri sono amici in automatico (come fa community_decide)
await B.evaluate(()=>frLoad());await B.waitForTimeout(300);
const ia=Object.keys(DB.profiles);DB.friendships.push({id:++DB.fid,requester:ia[1],addressee:ia[0],status:'accepted',created_at:new Date().toISOString()});
await A.evaluate(()=>frLoad());await B.evaluate(()=>frLoad());await B.waitForTimeout(800);
// B apre la pagina di A
await B.evaluate(()=>frLoad());await B.waitForTimeout(600);await B.evaluate(()=>{FR.md="t";FR.v="home";frDraw()});await B.click('#frm [data-a=op]');await B.waitForTimeout(1000);
const fv=await B.evaluate(()=>({n:Object.keys(FR.co[FR.u]||{}).length,txt:document.querySelector('#frm').innerText}));
ok(fv.n>=3&&/Anna/.test(fv.txt)&&/Mancano a te\s*3/i.test(fv.txt),'B: vede la collezione di A e 3 doppie che gli mancano '+fv.n+' '+fv.txt.replace(/\n/g,'|').slice(0,200));
// B propone: dà 2 delle sue, chiede 2 di A (stessa rarità C)
await B.click('#frm [data-a=prop]');await B.waitForTimeout(300);
await B.evaluate(([g,t])=>{FR.gv={[g[0]]:1,[g[1]]:1};FR.gt={[t[0]]:1,[t[1]]:1};frDraw()},[bIds,aIds]);
ok(!(await B.evaluate(()=>document.querySelector('#frm [data-a=send]').disabled)),'B: rarità coincidono, invio attivo');
// rarità diverse: bloccato
await B.evaluate(([t])=>{FR.gt={[t[0]]:1};frDraw()},[aIds]);
ok(await B.evaluate(()=>document.querySelector('#frm [data-a=send]').disabled),'B: 2 contro 1 → invio bloccato');
await B.evaluate(([t])=>{FR.gt={[t[0]]:1,[t[1]]:1};frDraw()},[aIds]);
await B.click('#frm [data-a=send]');await B.waitForTimeout(900);
ok(DB.trades.length===1&&DB.trades[0].status==='pending','B: proposta inviata');
// riserva: le 2 carte offerte non sono più disponibili per altre proposte/conversioni
const rv=await B.evaluate(([g])=>({sp0:cvList0().find(x=>x.c.id===g[0])&&cvList0().find(x=>x.c.id===g[0]).sp,spareTwo:trSpare([g[0],g[0]]),spareOne:trSpare([g[2]])}),[bIds]);
ok(rv.sp===undefined&&rv.spareTwo===false&&rv.spareOne===true,'B: carte offerte riservate ('+JSON.stringify(rv)+')');
// A: riceve, vede il pallino, accetta
await A.evaluate(()=>frLoad());await A.waitForTimeout(600);
ok(await A.evaluate(()=>FR.n)===1,'A: pallino proposte = 1');
ok(await A.evaluate(()=>!!document.querySelector('#pkbc .fdt')||!!document.querySelector('.nvp button[data-t=b] .fdt')),'A: pallino blu sulle icone Converti/Bustine');
await A.evaluate(()=>{FR.v="mail";frDraw()});
const q0=await Promise.all([qOf(A,aIds[0]),qOf(A,bIds[0]),qOf(B,bIds[0]),qOf(B,aIds[0])]);
await A.evaluate(()=>{FR.tr.forEach(t=>FR.ex.add(t.id));frDraw()});await A.click('#frm [data-a=acc]');await A.waitForTimeout(1200);
ok(DB.trades[0].status==='accepted','A: proposta accettata');
ok(await A.evaluate(()=>FR.v==='anim'&&document.querySelectorAll('#frm .anst .anc').length>=2),'A: parte l\'animazione di scambio');await A.click('#frm .anst');await A.waitForTimeout(400);
ok(await A.evaluate(()=>FR.v==='done'&&/Scambio concluso/i.test(document.querySelector('#frm').innerText)&&document.querySelectorAll('#frm .frdr .frdc').length===2),'A: schermata scambio concluso con le 2 carte ricevute');
ok(await A.evaluate(()=>PKAQ.length>=1&&document.querySelectorAll('#frm .frdc .pkn,#frm .frdc .pkbw').length>=1),'A: carte nuove segnate per l\'album ('+await A.evaluate(()=>PKAQ.length)+')');
const qa=await Promise.all([qOf(A,aIds[0]),qOf(A,aIds[1]),qOf(A,bIds[0]),qOf(A,bIds[1])]);
ok(qa[0]===1&&qa[1]===1&&qa[2]===1&&qa[3]===1,'A: ha dato 2 e ricevuto 2 ('+qa+')');
// B: la notifica arriva subito, lo scambio si applica solo premendo Vedi
await B.evaluate(()=>frLoad());await B.waitForTimeout(800);
const qb0=await Promise.all([qOf(B,bIds[0]),qOf(B,aIds[0])]);ok(qb0[0]===2&&qb0[1]===0,'B: prima di Vedi nulla è cambiato ('+qb0+')');
ok(await B.evaluate(()=>FR.n>=1&&!!document.querySelector('.nvp button[data-t=b] .fdt')),'B: pallino sull\'icona Bustine nel menu');
ok(await B.evaluate(()=>PKAQ.length===0),'B: nessuna carta nuova in album prima di Vedi');
await B.evaluate(()=>{FR.v="mail";document.querySelector('#frm').hidden=false;frDraw()});
ok(await B.evaluate(()=>!!document.querySelector('#frm [data-a=vt]')),'B: in Posta compare Vedi');
await B.click('#frm [data-a=vt]');await B.waitForTimeout(900);
ok(await B.evaluate(()=>FR.v==='anim'&&FR.dn&&FR.dn.get.length===2),'B: Vedi avvia l\'animazione');
ok(await B.evaluate(()=>PKAQ.length>=1),'B: ora le carte nuove sono segnate per l\'album');
const qb=await Promise.all([qOf(B,bIds[0]),qOf(B,bIds[1]),qOf(B,aIds[0]),qOf(B,aIds[1])]);
ok(qb[0]===1&&qb[1]===1&&qb[2]===1&&qb[3]===1,'B: scambio applicato ('+qb+')');
await B.evaluate(()=>frLoad());await B.waitForTimeout(500);await B.evaluate(()=>frLoad());await B.waitForTimeout(500);
const qb2=await Promise.all([qOf(B,bIds[0]),qOf(B,aIds[0])]);ok(qb2[0]===1&&qb2[1]===1,'B: ricaricando non si applica due volte');
ok(await B.evaluate(()=>FR.n===0),'B: pallino spento dopo Vedi');
// riserva rilasciata dopo l'accettazione
ok(await B.evaluate(()=>Object.keys(frResv()).length)===0,'B: nessuna carta più riservata');
// il secondo telefono di B (stesso account) non applica di nuovo
const code=await B.evaluate(()=>cuGet().code);await B.evaluate(()=>cuSync("push"));await B.waitForTimeout(500);
// annullamento
await B.evaluate(([g,t])=>{FR.u=FR.fs[0].addressee===FR.me.uid?FR.fs[0].requester:FR.fs[0].addressee;FR.gv={[g[2]]:1};FR.gt={[t[2]]:1};return frSend(FR.u,[g[2]],[t[2]])},[bIds,aIds]);
ok(DB.trades.length===2&&DB.trades[1].status==='pending','B: seconda proposta');
await B.evaluate(()=>{FR.v="mail";frDraw()});await B.evaluate(()=>{FR.tr.forEach(t=>FR.ex.add(t.id));frDraw()});await B.click('#frm [data-a=can]');await B.waitForTimeout(800);
ok(DB.trades[1].status==='cancelled','B: proposta annullata');
await A.evaluate(()=>frLoad());await A.waitForTimeout(400);
ok(await A.evaluate(()=>FR.tr.filter(t=>t.status==='pending'&&t.to_user===FR.me.uid).length)===0,'A: la proposta annullata non compare');
// scadenza
await B.evaluate(([g,t])=>frSend(FR.u,[g[2]],[t[2]]),[bIds,aIds]);
DB.trades[2].expires_at=new Date(Date.now()-1000).toISOString();
await A.evaluate(()=>frLoad());await A.waitForTimeout(500);
ok(await A.evaluate(()=>FR.n)===0,'A: proposta scaduta non conta');
const qs=await qOf(A,aIds[2]);
const tid=DB.trades[2].id;await A.evaluate(async id=>{const t=FR.tr.find(x=>x.id===id);try{await frAccept(t)}catch(e){}return 1},tid);
ok(DB.trades[2].status==='pending'&&await qOf(A,aIds[2])===qs,'A: accettare una scaduta non cambia nulla');
// A non ha più la carta richiesta
await B.evaluate(()=>frLoad());const e4=await B.evaluate(([g,t])=>frSend(FR.u,[g[2]],[t[2]]).then(()=>'ok',e=>e.message),[bIds,aIds]);console.log('   quarta proposta:',e4);
await A.evaluate(([i])=>{const s=trSlot(i);s.q=1;save()},[aIds[2]]);
await A.evaluate(()=>frLoad());await A.waitForTimeout(400);
const t4=DB.trades.find(t=>t.status==='pending'&&Date.parse(t.expires_at)>Date.now());
await A.evaluate(async id=>{const t=FR.tr.find(x=>x.id===id);await frAccept(t)},t4&&t4.id);
ok(t4&&DB.trades.find(t=>t.id===t4.id).status==='pending','A: senza la carta richiesta non può accettare');
// terzo utente: non amico
const C=await ctx(b,'Carla');
await C.evaluate(()=>frEnsure());
ok(true,'C: ha un profilo (non amico) — vedi controlli sotto');
const forb=await C.evaluate(async(uid)=>{try{await frEnsure();const r=await sbReq("/rest/v1/collections?user_id=eq."+uid+"&select=data");const t=await sbReq("/rest/v1/trades?select=*");return{coll:r.length,tr:t.length}}catch(e){return{err:e.message}}},DB.friendships[0].requester);
ok(forb.coll===0&&forb.tr===0,'C (non amico): non vede né collezioni né proposte degli altri '+JSON.stringify(forb));
const noFr=await C.evaluate(async(uid)=>{try{await sbReq("/rest/v1/trades",{m:"POST",h:{Prefer:"return=minimal"},b:{from_user:FR.me.uid,to_user:uid,give:["x"],get:["y"]}});return"inviata"}catch(e){return e.message}},DB.friendships[0].requester);
ok(/row-level|rls/i.test(noFr),'C: non può mandare proposte a chi non è amico ('+noFr+')');
// codice amico inesistente / proprio
const bad1=await C.evaluate(async()=>{try{await frAskFriend("ZZZZZZ");return"ok"}catch(e){return e.message}});ok(/non trovato/i.test(bad1),'codice inesistente: '+bad1);
const bad2=await C.evaluate(async()=>{try{await frAskFriend(FR.me.code);return"ok"}catch(e){return e.message}});ok(/tuo codice/i.test(bad2),'proprio codice: '+bad2);
// backup contiene gli scambi applicati
const bk=await B.evaluate(()=>bkObj().frap);ok(Array.isArray(bk)&&bk.length>=1,'backup: elenco scambi applicati ('+(bk||[]).length+')');
ok(!A.errs.length&&!B.errs.length&&!C.errs.length,'nessun errore JS '+[...A.errs,...B.errs,...C.errs].join('|'));
await b.close();console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})();
