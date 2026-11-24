// album Promo: 55 carte (Mew antico + Promo 1-54), con la jumbo Articuno/Moltres/Zapdos come Promo 54 collegata alla missione
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874},deviceScaleFactor:1.5});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)process.exitCode=1};
const r=await p.evaluate(()=>{const col=GCOLS.find(c=>c.k==="gQ");const L=order(col);const miss=MSB.map(m=>m.r).filter(x=>!CARDS[x]);const nums=L.map(x=>CARDS[x.id].num);return {n:L.length,miss,dup:nums.length-new Set(nums).size,last:L.map(x=>x.id).filter(i=>i!=='X1').pop(),nm:MSB.length,m54:MSB.some(m=>m.num===54&&!m.off),img:!!CARDS.Q54.img,name:CARDS.Q54.name,dex:CARDS.Q54.dex}});
console.log(JSON.stringify(r));
ok(r.n===55,'album Promo con 55 carte ('+r.n+')');ok(!r.miss.length,'tutte le 55 missioni hanno la carta premio');ok(r.dup===0,'nessun numero duplicato');
ok(r.last==='Q54'&&r.img,'Promo 54 in fondo, con immagine jumbo incorporata');ok(r.m54,'missione 54 non più disattivata');
await p.evaluate(()=>{window.__vc=CARDS.Q54;pkView(CARDS.Q54)});await p.waitForTimeout(2200);await p.screenshot({path:'/tmp/q54.png'});
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close()})();
