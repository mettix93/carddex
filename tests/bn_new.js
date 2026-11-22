// PullBinder: carta nuova -> effetto + numerino Pokédex -> animazione al tocco
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')}));
await p.addInitScript(()=>{localStorage['col_carddex_env']='app'});await p.goto('http://localhost:8765/collezione.html');await p.waitForTimeout(1800);
const i0=await p.evaluate(()=>{const L=LIST();return L.findIndex((s,i)=>s.id&&!s.o&&CARDS[s.id].kd==="p"&&CARDS[s.id].dex&&!CARDS[s.id].opts&&!(CARDS[s.id].alt&&twOf(s)))});
ok(i0>=0,'trovata carta pokémon non ottenuta '+i0);
await p.evaluate(i=>{window.__g=0;const o=Element.prototype.animate;Element.prototype.animate=function(...a){if(this.classList&&this.classList.contains('aqgl'))window.__g++;return o.apply(this,a)};toggle(i)},i0);await p.waitForTimeout(500);
const r=await p.evaluate(i=>({o:LIST()[i].o,q:PKDQ.length,b:!!document.querySelector('.nvp button[data-t=d] .dxb,#nvp button[data-t=d] .dxb'),g:window.__g}),i0);
ok(r.o===1,'carta segnata');ok(r.q===1,'Pokémon nuovo in coda Pokédex');ok(r.b,'numerino sul Pokédex');ok(r.g>=1,'luce dietro alla carta');
// seconda carta dello stesso pokémon: nessun nuovo numerino
await p.evaluate(()=>{const L=LIST();const s0=L.findIndex(s=>s.o);});
await p.click('#nvp button[data-t=d]');await p.waitForTimeout(700);
ok(await p.evaluate(()=>dxFilling===1||PKDQ.length===0),'animazione Pokédex avviata');
await p.waitForTimeout(6000);
ok(await p.evaluate(()=>PKDQ.length===0&&!dxFilling),'animazione finita, coda vuota');
ok(await p.evaluate(()=>!document.querySelector('.dxb')),'numerino sparito');
ok(!e.length,'nessun errore JS '+e.join('|'));await b.close();process.exit(bad?1:0)})();
