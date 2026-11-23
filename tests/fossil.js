// recupero Fossil dalla cronologia cloud
const {chromium}=require('playwright');const {mock}=require('./lib_sb.js');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);
await p.evaluate(()=>document.querySelector('#nvp button[data-t=s]').click());await p.waitForTimeout(600);await p.fill('#unm','Tester');await p.dispatchEvent('#unm','change');await p.selectOption('#ubdd','15');await p.selectOption('#ubdm','6');await p.click('button[data-u=cr]');await p.waitForTimeout(1300);
const fos=await p.evaluate(()=>st.gF.filter(x=>x.id).slice(0,3).map(x=>({id:x.id,o:1,q:2,n:""})));
await p.route(/saves_hist/,r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify([{data:{game:{gF:fos}},updated_at:new Date().toISOString()}])}));
await p.evaluate(()=>{localStorage.removeItem('carddex_fosfix');st.gF.forEach(x=>{x.o=0;x.q=0});save()});
await p.evaluate(()=>fosRecover());await p.waitForTimeout(1200);
ok(await p.evaluate(()=>st.gF.filter(x=>x.o&&x.q===2).length)===3,'Fossil ripristinato dalla cronologia (3 carte)');
ok(await p.evaluate(()=>JSON.parse(localStorage.getItem(SKEY)).gF.filter(x=>x.o).length)===3,'e salvato sul telefono');
ok(errs.length===0,'nessun errore JS '+errs.join('|'));console.log(bad?'FALLITO':'TUTTO OK');await b.close();process.exit(bad?1:0)})()
