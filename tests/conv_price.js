// prezzo bustina da conversione = 40 Pokédollari; missioni Giorno di paga (5) e Piccolo sgraffignatore (200)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)process.exitCode=1};
ok(await p.evaluate(()=>PKCOST)===40,'PKCOST 40');
const d=await p.evaluate(()=>{ptOpen();return {txt:$("#ptt").textContent,btn:$("#ptx").innerText.trim()}});
ok(/Puoi scambiare 25 bustine/.test(d.txt)&&d.btn.split('\n')[0]==='40','Dev 1000 Pokédollari = 25 bustine, tasto 40: '+JSON.stringify(d));
const q=await b.newPage({viewport:{width:402,height:874}});await q.goto('http://localhost:8765/carddex-album.html');await q.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','app')});await q.reload();await q.waitForTimeout(1800);
const r=await q.evaluate(()=>{const o=pkSt();o.pts=95;pkSv(o);ptDone=0;ptOpen();const a={txt:$("#ptt").textContent,dis:$("#ptx").disabled};$("#ptx").click();return {a,pts:pkSt().pts}});
ok(/Puoi scambiare 2 bustine/.test(r.a.txt)&&!r.a.dis,'App: 95 = 2 bustine');ok(r.pts===55,'conversione toglie 40 (restano '+r.pts+')');
const r2=await q.evaluate(()=>{const o=pkSt();o.pts=25;pkSv(o);ptDone=0;ptDraw();return {txt:$("#ptt").textContent,dis:$("#ptx").disabled,w:$("#ptf").style.width}});
ok(/mancano 15 Pokédollari/.test(r2.txt)&&r2.dis&&parseFloat(r2.w)===62.5,'25 Pokédollari: mancano 15, barra 62.5% '+JSON.stringify(r2));
await p.evaluate(()=>{msBuild()});await p.waitForTimeout(400);
const t=await p.evaluate(()=>[...document.querySelectorAll('#msp .msi')].map(e=>e.innerText.replace(/\s+/g,' ')).filter(x=>/Giorno di paga|sgraffignatore/.test(x)));
console.log(t.join('\n'));
ok(t.length===2&&/5 bustine/.test(t[0])&&/\d \/ 5/.test(t[0])&&/200 Pokédollari/.test(t[1])&&/0 \/ 200/.test(t[1]),'missioni aggiornate');
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close()})();
