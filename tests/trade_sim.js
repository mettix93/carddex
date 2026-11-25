// Dev: simulatore scambi — nessun errore, nessuna rete, collezione invariata, flusso completo
const {chromium}=require('playwright');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();const errs=[],net=[];
p.on('pageerror',e=>errs.push(String(e)));p.on('request',r=>{if(/supabase/.test(r.url()))net.push(r.url())});
await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());await p.addInitScript(()=>{localStorage.setItem('carddex_env','dev')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
const snap=()=>p.evaluate(()=>JSON.stringify(Object.keys(localStorage).filter(k=>/^carddex2/.test(k)).sort().map(k=>localStorage[k])));
const s0=await snap();
await p.evaluate(()=>{frOpen("t")});await p.waitForTimeout(400);
ok(await p.evaluate(()=>FR.v==="need"&&!!document.querySelector('#frm [data-a=sim]')),'senza account: compare il bottone Simulatore');
await p.click('#frm [data-a=sim]');await p.waitForTimeout(300);
ok(await p.evaluate(()=>FR.v==="sim"&&FR.tr.length===4&&FR.fs.length===2),'simulazione attiva: 2 amici, 4 scambi preimpostati');
// animazioni
for(const k of['a1','a3','a8','an']){await p.click('#frm [data-a=sx][data-k='+k+']');await p.waitForTimeout(600);
  const o=await p.evaluate(()=>({v:FR.v,g:FR.dn.give.length,t:FR.dn.get.length,st:!!document.querySelector('#frm .anst')}));
  ok(o.v==='anim'&&o.st&&o.g===o.t&&o.g>0,'animazione '+k+': '+o.g+' vs '+o.t);
  await p.evaluate(()=>frSkip());await p.waitForTimeout(500);
  ok(await p.evaluate(()=>FR.v==="done"&&!!document.querySelector('#frm .frdr .frdc')),'  -> schermata finale '+k);
  await p.click('#frm [data-a=dn]');await p.waitForTimeout(300);
  ok(await p.evaluate(()=>FR.v==="sim"),'  -> torna al simulatore');
  await p.evaluate(()=>{FR.v="sim";frDraw()});}
// flusso: proposta in arrivo -> Posta -> accetto -> animazione
await p.click('#frm [data-a=sx][data-k=ri]');await p.waitForTimeout(300);
await p.click('#frm [data-a=sx][data-k=og]');await p.waitForTimeout(300);
const nrc=await p.evaluate(()=>FR.tr.filter(t=>t.status==="pending"&&t.to_user==="sim-me").length);
ok(nrc>=2,'Pagina amico: '+nrc+' proposte da rispondere');
await p.evaluate(()=>{const t=FR.tr.find(t=>t.status==="pending"&&t.to_user==="sim-me");FR.ex.add(t.id);frDraw()});await p.waitForTimeout(200);
await p.click('#frm [data-a=acc]');await p.waitForTimeout(700);
ok(await p.evaluate(()=>FR.v==="anim"&&!!document.querySelector('#frm .anst')),'accetta -> parte l\'animazione');
await p.evaluate(()=>frSkip());await p.waitForTimeout(400);await p.click('#frm [data-a=dn]');await p.waitForTimeout(300);
// la mia proposta viene accettata -> Vedi
await p.evaluate(()=>{FR.v="sim";frDraw()});
await p.click('#frm [data-a=sx][data-k=ac]');await p.waitForTimeout(300);
await p.click('#frm [data-a=sx][data-k=og]');await p.waitForTimeout(300);
ok(await p.evaluate(()=>!!document.querySelector('#frm [data-a=vt]')),'Pagina amico: compare "Vedi" per lo scambio accettato');
await p.click('#frm [data-a=vt]');await p.waitForTimeout(700);
ok(await p.evaluate(()=>FR.v==="anim"),'Vedi -> animazione');
await p.evaluate(()=>frSkip());await p.waitForTimeout(400);await p.click('#frm [data-a=dn]');await p.waitForTimeout(300);
// proposta inviata da me a un amico
const r=await p.evaluate(async()=>{FR.v="sim";frDraw();FR.u="sim-g";FR.v="fr";frDraw();await frCo("sim-g");frDraw();return{can:!document.querySelector('#frm [data-a=prop]').disabled}});
ok(r.can,'Proponi uno scambio abilitato con Giulia');
await p.click('#frm [data-a=prop]');await p.waitForTimeout(300);
const sel=await p.evaluate(()=>{const X=frCtx();const k=Object.keys(X.my)[0],c=trCard(k),kk=trK(c);FR.gv[k]=1;const g=Object.keys(X.fs).find(i=>trK(trCard(i))===kk);FR.gt[g]=1;FR.tab="give";frDraw();return !!document.querySelector('#frm [data-a=send]:not([disabled])')});
ok(sel,'Invia abilitato dopo la scelta delle carte');
await p.click('#frm [data-a=send]');await p.waitForTimeout(500);
ok(await p.evaluate(()=>FR.tr.some(t=>t.from_user==="sim-me"&&t.status==="pending"&&t.to_user==="sim-g")),'proposta inviata registrata (in sim)');
await p.evaluate(()=>{FR.v="sim";frDraw()});
await p.click('#frm [data-a=sx][data-k=ann]');await p.waitForTimeout(300);
ok(await p.evaluate(()=>FR.v==="ann"),'annuncio scambio concluso');
await p.evaluate(()=>{FR.v="sim";frDraw()});
await p.click('#frm [data-a=sx][data-k=x]');await p.waitForTimeout(300);
ok(await p.evaluate(()=>!FRS.on&&FR.me===null),'uscita dalla simulazione');
ok((await snap())===s0,'collezione/archivio invariati');
ok(net.length===0,'nessuna richiesta di rete: '+net.length);
ok(errs.length===0,'nessun errore JS '+errs.join('|'));
await b.close();console.log(bad?'FALLITO':'TUTTO OK');process.exit(bad?1:0)})();
