const {chromium}=require('playwright');(async()=>{let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>{if(!/decode audio/.test(x.message))e.push(x.message)});
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==','base64')}));
await p.addInitScript(()=>{if(!localStorage.getItem('carddex_env'))localStorage.setItem('carddex_env','app')});
const st=async()=>p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^carddex(2|_pk|_stats|_ms|_dxq|_aq)/.test(k))o[k]=localStorage.getItem(k).length}return o});
// 1) vecchia versione: apro una bustina
await p.goto('http://localhost:8765/old_album.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{try{goTab("b");pkChoose()}catch(x){}});await p.waitForTimeout(1500);
await p.evaluate(()=>{try{pkStage(0)}catch(x){}});await p.waitForTimeout(1500);
await p.evaluate(()=>{try{pkOpen()}catch(x){}});await p.waitForTimeout(5500);
for(let k=0;k<14;k++){const d=await p.evaluate(()=>{const s=document.getElementById('pksum');if(s&&!s.hidden)return 1;try{pkNext(-1)}catch(x){}return 0});if(d)break;await p.waitForTimeout(1500)}
await p.waitForTimeout(1500);
const A=await st();const oldv=await p.evaluate(()=>APPV);
ok(Object.keys(A).length>3,'vecchia '+oldv+': dati creati '+JSON.stringify(A));
const snapA=await p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o});
// 2) nuova versione sugli stessi dati
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(3000);
const B=await st();
ok(Object.keys(A).every(k=>k in B&&(B[k]>=A[k]*0.9)),'nuova: stessi dati presenti '+JSON.stringify(B));
const m=await p.evaluate(()=>({v:APPV,slots:(typeof st!=='undefined'&&st[cur]||[]).length,err:localStorage.getItem('carddex_err')}));
ok((!m.err||/decode audio/.test(m.err))&&!e.length,'nessun errore dopo aggiornamento '+JSON.stringify(m)+' '+e.join('|'));
await b.close();console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})()
