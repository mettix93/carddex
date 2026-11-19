const {chromium}=require('playwright');(async()=>{let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{if(!localStorage.getItem('carddex_env'))localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(2500);
// stato: segno carte, ordine personalizzato
const A=await p.evaluate(()=>{const L=st[cur];let n=0;L.forEach((s,i)=>{if(s.id&&n<5){s.o=1;s.q=1+n;n++}});const r=L.slice().reverse();st[cur]=r;GORD[cur]="cu";GCU[cur]=r.map(s=>s.id||"");localStorage.setItem("carddex_gord",JSON.stringify(GORD));localStorage.setItem("carddex_gcu",JSON.stringify(GCU));save();return {k:cur,ids:st[cur].map(s=>s.id||"").join(","),own:st[cur].filter(s=>s.o).length,gord:GORD[cur]}});
const bk=await p.evaluate(()=>JSON.parse(JSON.stringify(bkObj())));
ok(bk.ord&&bk.ord.o[A.k]==="cu"&&bk.ord.u[A.k],'esportazione contiene ordine personalizzato');
// cancello tutto e ricarico
await p.evaluate(()=>{const k=[];for(let i=0;i<localStorage.length;i++)k.push(localStorage.key(i));k.filter(x=>x!=='carddex_env').forEach(x=>localStorage.removeItem(x))});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(2500);
const E=await p.evaluate(k=>({own:Object.values(st).flat().filter(s=>s.o).length,gord:GORD[k]}),A.k);
ok(E.own===0&&!E.gord,'dopo cancellazione: vuoto '+JSON.stringify(E));
await p.evaluate(o=>bkApplyObj(o),bk);await p.waitForTimeout(500);
const R=await p.evaluate(k=>({ids:st[k].map(s=>s.id||"").join(","),own:st[k].filter(s=>s.o).length,gord:GORD[k],ls:localStorage.getItem('carddex_gord')}),A.k);
ok(R.ids===A.ids&&R.own===A.own,'importazione: stessa carte, stesso ordine, stessi possessi ('+R.own+')');
ok(R.gord==="cu"&&/"cu"/.test(R.ls),'ordine «Personalizzato» ripristinato e salvato');
// dopo ricarico resta
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(2500);
const R2=await p.evaluate(k=>({ids:st[k].map(s=>s.id||"").join(","),gord:GORD[k]}),A.k);
ok(R2.ids===A.ids&&R2.gord==="cu",'dopo riapertura resta');
ok(!e.length,'nessun errore JS '+e.join('|'));
await b.close();console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})()
