// Converti: titolo "Doppie totali" in cima (numero + pokédollari), set singoli senza numeri
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
const p=await b.newPage({viewport:{width:402,height:874},deviceScaleFactor:1.5});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
await p.evaluate(()=>{["gB","gJ"].forEach(k=>{st[k].filter(x=>x.id).slice(0,6).forEach((x,i)=>{x.o=1;x.q=2+(i%3)})});save();cvOpen()});await p.waitForTimeout(900);
const r=await p.evaluate(()=>{const H=[...document.querySelectorAll("#cvs .cvw>.sgt")].map(e=>({t:e.firstChild.textContent,em:e.querySelectorAll("em").length,txt:e.textContent.replace(/\s+/g," ")}));const L=cvList();return {H,n:L.reduce((a,y)=>a+y.sp,0),v:L.reduce((q,y)=>q+y.sp*cvPt(y.c),0)}});
console.log(JSON.stringify(r));
ok(r.H[0].t==='Doppie totali'&&r.H[0].em===2&&r.H[0].txt.includes(String(r.n))&&r.H[0].txt.includes('('+r.v),'Titolo totale in cima con numero e valore');
ok(r.H.length>=3&&r.H.slice(1).every(h=>h.em===0),'Set singoli senza numero né valore');
await p.screenshot({path:'/tmp/cvt.png'});
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close();process.exit(bad)})();
