// il pallino compare da solo (senza aprire Scambia) quando arriva una proposta
const {chromium}=require('playwright');const {DB,mock}=require('./lib_sb.js');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
async function ctx(b,name){const c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
  await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);await p.evaluate(()=>document.querySelector('#nvp button[data-t=s]').click());await p.waitForTimeout(700);
  await p.fill('#unm',name);await p.dispatchEvent('#unm','change');await p.selectOption('#ubdd','15');await p.selectOption('#ubdm','6');await p.click('button[data-u=cr]');await p.waitForTimeout(1300);return p}
(async()=>{const b=await chromium.launch();const A=await ctx(b,'Anna'),B=await ctx(b,'Bruno');
await A.evaluate(()=>cuSync("push"));await B.evaluate(()=>cuSync("push"));
await A.evaluate(()=>frOpen());await A.waitForTimeout(1200);const codeA=await A.evaluate(()=>FR.me.code);
await B.evaluate(()=>frOpen("a"));await B.waitForTimeout(1200);await B.fill('#frin',codeA);await B.click('#frm [data-a=add]');await B.waitForTimeout(800);
// A riapre l'app (sessione nuova) e resta sulla pagina Bustine, senza aprire Scambia
await A.reload();await A.waitForTimeout(1500);
await A.evaluate(()=>{var f=document.querySelector('#frm');if(f)f.hidden=true;document.querySelector('#nvp button[data-t=b]').click()});await A.waitForTimeout(6500);
const r=await A.evaluate(()=>({n:FR.n,nav:!!document.querySelector('#nvp button[data-t=s] .fdt'),bc:!!document.querySelector('#pkbc .fdt'),tab:!!document.querySelector('.cvtb button[data-m=f].dot'),acc:!!document.querySelector('#nvp .fdt')}));
console.log(JSON.stringify(r));
ok(r.n===1,'A: conteggio novità');ok(await A.evaluate(()=>!!document.querySelector('#nvp button[data-t=b] .fdt')),'A: pallino sull\'icona Bustine nel menu');ok(r.bc,'A: pallino su Converti/Scambia in Bustine');
await A.evaluate(()=>{document.querySelector('#nvp button[data-t=c]').click()});await A.waitForTimeout(1200);ok(await A.evaluate(()=>!!document.querySelector('#nvp button[data-t=b] .fdt')),'A: il pallino resta dopo aver cambiato pagina');ok(r.nav,'A: pallino sull\'icona Account nel menu');
await b.close();process.exit(bad?1:0)})();
