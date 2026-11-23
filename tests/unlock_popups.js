// sblocco per giocatore: missioni fase 2/3 e pop-up (set, poi missioni); album Promo 55 con carte di prova in fondo
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
async function open(env,page,pre){const p=await b.newPage({viewport:{width:402,height:874},deviceScaleFactor:1.5});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('http://localhost:8765/'+page);await p.evaluate(([e,pre])=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env',e);if(pre)for(const k in pre)localStorage.setItem(k,pre[k])},[env,pre||null]);await p.reload();await p.waitForTimeout(1800);p.errs=errs;return p}
// 1) App nuova: fase 1, nessun pop-up
let p=await open('app','carddex-album.html');
let r=await p.evaluate(()=>({ph:relPh(),ms:msAll().length,lk:pkLk("R"),pend:ulPend()}));console.log(JSON.stringify(r));
ok(r.ph===1&&r.ms===19&&r.lk===1&&!r.pend,'App nuova: fase 1 (19 missioni), Rocket bloccato, nessun pop-up');
// 2) base all'80%: sblocco Rocket+Gym -> fase 2 + pop-up set poi missioni
r=await p.evaluate(()=>{const ids=[...PKIDS[0]||new Set(Object.values(CARDS).filter(c=>PKBLK[0].includes(c.sid)&&!c.go).map(c=>c.id))];
  PKBLK[0].forEach(sid=>{const L=st["g"+sid];let n=0;const tot=L.filter(x=>x.id).length;L.forEach(x=>{if(x.id&&n<tot){x.o=1;n++}})});save();ulCheck();return {ph:relPh(),ms:msAll().length,lk:pkLk("R"),U:JSON.stringify(ulGet())}});
console.log(JSON.stringify(r));ok(r.ph===2&&r.ms===37&&r.lk===0,'Dopo 80%: sbloccati Rocket+Gym, fase 2 (37 missioni)');
await p.evaluate(()=>{msPop=0;msCheck()});await p.waitForTimeout(900);
let t=await p.evaluate(()=>{const e=document.getElementById("trm");return e&&!e.hidden?e.querySelector(".trt").textContent+"|"+e.querySelector(".trn").textContent+"|"+e.querySelectorAll(".ulf img").length:""});
console.log(t);ok(/Nuovi set sbloccati!\|Team Rocket, Gym Heroes e Gym Challenge\|3/.test(t),'Pop-up 1: set sbloccati con 3 bustine');
await p.screenshot({path:'/tmp/ul1.png'});
await p.evaluate(()=>[...document.querySelectorAll("#trm .trbtn")].find(x=>x.textContent==="Più tardi").click());await p.waitForTimeout(1000);
t=await p.evaluate(()=>{const e=document.getElementById("trm");return e&&!e.hidden?e.querySelector(".trt").textContent+"|"+e.querySelector(".trn").textContent+"|"+e.querySelectorAll(".ulf .msmy").length:""});
console.log(t);ok(/Missioni sbloccate!\|18 nuove missioni ti aspettano\|3/.test(t),'Pop-up 2: missioni, 3 carte misteriose');
await p.screenshot({path:'/tmp/ul2.png'});
await p.evaluate(()=>[...document.querySelectorAll("#trm .trbtn")].find(x=>x.textContent==="Più tardi").click());await p.waitForTimeout(700);
r=await p.evaluate(()=>({pend:ulPend(),U:ulGet()[1],pop:msPop}));console.log(JSON.stringify(r));ok(!r.pend&&r.U.s===1&&r.U.m===1&&!r.pop,'Pop-up visti: non si ripetono');
// persistenza dopo ricarica
await p.reload();await p.waitForTimeout(1500);r=await p.evaluate(()=>({ph:relPh(),pend:ulPend()}));ok(r.ph===2&&!r.pend,'Dopo ricarica: fase 2 resta, nessun pop-up');
ok(!p.errs.length,'App: nessun errore JS '+p.errs.join('|'));await p.close();
// 3) Neo (G,D pubblicati): Rocket/Gym all'80% -> fase 3
fs.writeFileSync('_ul_gd.html',fs.readFileSync('carddex-album.html','utf8').replace('const REL_ON=["B","J","F","R","Y","Z"]','const REL_ON=["B","J","F","R","Y","Z","G","D"]'));
p=await open('app','_ul_gd.html');
r=await p.evaluate(()=>{[0,1].forEach(b=>PKBLK[b].forEach(sid=>{st["g"+sid].forEach(x=>{if(x.id)x.o=1})}));save();ulCheck();return {ph:relPh(),ms:msAll().length,dx:DXR.map(x=>x[0]).join(),U:Object.keys(ulGet()).join()}});
console.log(JSON.stringify(r));ok(r.ph===3&&r.ms===55&&r.dx==='Kanto,Johto'&&r.U==='1,2','Neo sbloccati: fase 3 (55 missioni), Johto nel Pokédex');
ok(!p.errs.length,'Neo: nessun errore JS');await p.close();fs.unlinkSync('_ul_gd.html');
// 4) Dev: bottoni prova pop-up, tutto visibile
p=await open('dev','carddex-album.html');
r=await p.evaluate(()=>({ms:msAll().length,gQ:st.gQ.length}));console.log(JSON.stringify(r));
await p.evaluate(()=>{msBuild()});await p.waitForTimeout(500);
ok(await p.evaluate(()=>document.querySelectorAll(".msdvb button").length===2),'Dev: due bottoni di prova pop-up');
await p.evaluate(()=>document.querySelector('.msdvb button[data-u="1"]').click());await p.waitForTimeout(800);await p.screenshot({path:'/tmp/ul_dev.png'});
ok(await p.evaluate(()=>document.querySelectorAll("#trm .ulf img").length===3),'Dev: pop-up di prova mostra 3 bustine');
ok(!p.errs.length,'Dev: nessun errore JS '+p.errs.join('|'));await p.close();
// 5) album Promo: salvataggio vecchio (49 + carta di prova in mezzo) -> 55 slot, prova in fondo
const old={gQ:[{id:"X1",o:1,n:""},...Array.from({length:49},(_,i)=>({id:"Q"+(i+1),o:i===4?1:0,n:""})).slice(0,20),{id:"XT",o:1,n:""},...Array.from({length:49},(_,i)=>({id:"Q"+(i+1),o:0,n:""})).slice(20)]};
p=await open('dev','carddex-album.html',{carddex2g:JSON.stringify(old)});
r=await p.evaluate(()=>{const q=st.gQ.map(x=>x.id);return {n:q.length,first:q[0],last:q.slice(-2).join(),has54:q.includes("Q54"),q5:st.gQ.find(x=>x.id==="Q5").o,xt:q.indexOf("XT")}});
console.log(JSON.stringify(r));ok(r.n===56&&r.first==='X1'&&r.has54&&r.last==='Q54,XT'&&r.q5===1,'Album Promo: 55 slot + carta di prova in fondo, dati conservati');
ok(!p.errs.length,'Album: nessun errore JS');await p.close();
await b.close();process.exit(bad)})();
