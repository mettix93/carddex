// Lucky / God Pack: composizione, garanzia alla 21ª, DEV forzato non salva nulla
const {chromium}=require('playwright');
const ok=(c,m)=>{console.log((c?"OK   ":"FAIL ")+m);if(!c)process.exitCode=1};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
const r=await p.evaluate(()=>{const R=c=>{const d=rdOf(c);return d?d.r:""},o={};
  for(const sid of['B','J','F','R','Y','Z','G','D','V','T','H','I','K','M']){const n=pkDraw(sid).length;let bad=0;
    for(let i=0;i<100;i++){const l=pkDrawK(sid,'l'),g=pkDrawK(sid,'g');
      if(l.length!==n||g.length!==n)bad++;
      for(const d of[l,g]){const x=d[d.length-1];if(!(R(x)==="R"&&x.h))bad++}
      if(R(l[l.length-2])!=="R")bad++;
      if(g.some(c=>R(c)!=="R"))bad++;
      if(new Set(g.map(pkKey)).size!==g.length)bad++}
    o[sid]=bad}
  return o});
ok(Object.values(r).every(v=>v===0),"composizione Lucky/God in tutti i set "+JSON.stringify(r));
const pity=await p.evaluate(()=>{const o=pkSt();o.lk=20;pkSv(o);let n=0;for(let i=0;i<300;i++)if(pkRoll().k==="n")n++;o.lk=0;pkSv(o);return n});
ok(pity===0,"con 20 bustine senza Lucky la successiva è garantita");
const keep=()=>p.evaluate(()=>JSON.stringify({pk:localStorage.getItem(GK("carddex_pk")),own:Object.values(st).flat().filter(x=>x.o).length,dq:PKDQ.length,aq:PKAQ.length}));
await p.mouse.click(201,400);await p.waitForTimeout(1800);await p.waitForTimeout(300);
const s0=await keep();
await p.evaluate(()=>pkZoom());await p.waitForTimeout(700);
ok(await p.evaluate(()=>{const d=document.querySelector("#pkdv");return !!d&&!d.hidden&&d.offsetHeight>0}),"DEV: comandi Normale/Lucky/God visibili prima del taglio");
await p.click('#pkdv button[data-k=g]');await p.evaluate(()=>pkOpen());await p.waitForTimeout(600);
ok(await p.evaluate(()=>document.querySelector(".pkcol")!==null),"fascio di luce al taglio");
ok(await p.evaluate(()=>document.querySelector("#pk").classList.contains("god")&&!!document.querySelector("#pkgold")),"fondo oro attivo durante lo sbusto");
await p.waitForTimeout(2200);
ok(await p.evaluate(()=>getComputedStyle(document.documentElement).backgroundColor)==="rgb(160, 108, 18)","fascia in alto dorata (non del colore della carta)");
ok(await p.evaluate(()=>document.querySelector("#pklg")&&document.querySelector("#pklg").textContent==="God Pack!"),"scritta God Pack! durante lo sbusto");
const s1=JSON.parse(await keep()),s00=JSON.parse(s0);
ok(s1.own>s00.own&&s1.aq>0,"DEV forzato: le carte entrano davvero (album "+s00.own+"→"+s1.own+", in coda "+s1.aq+")");
await p.evaluate(()=>pkSummary());await p.waitForTimeout(800);
await p.evaluate(()=>{const b=document.querySelector("#pk");b.hidden=true;try{pkClose&&0}catch(e){}});
await p.click('#nvp button[data-t=c]').catch(()=>{});await p.waitForTimeout(600);
await p.evaluate(()=>{const e=document.querySelector('.asc[data-m=g]');e&&e.click()});
await p.waitForTimeout(500);
await p.evaluate(()=>{const k=PKAQ[0]&&PKAQ[0].k;if(k)aqAnim0(k)});
for(let i=0;i<60&&await p.evaluate(()=>aqRun);i++)await p.waitForTimeout(500);
const mid=JSON.parse(await keep());
ok(mid.own>s00.own,"dopo l'animazione le carte sono ancora lì finché resti nella pagina");
await p.click('#nvp button[data-t=d]');await p.waitForTimeout(400);
const mid2=JSON.parse(await keep());
if(mid2.dq>0){for(let i=0;i<80&&await p.evaluate(()=>dxFilling||PKDQ.length);i++)await p.waitForTimeout(500);await p.click('#nvp button[data-t=c]');await p.waitForTimeout(900)}
else{await p.click('#nvp button[data-t=c]');await p.waitForTimeout(900)}
const e1=JSON.parse(await keep());
ok(e1.own===s00.own&&e1.dq===0&&e1.aq===0&&e1.pk===s00.pk,"uscendo dalla pagina le carte spariscono e lo stato torna come prima");
ok(await p.evaluate(()=>!localStorage.getItem("carddex_tsnap")),"istantanea di prova rimossa");
ok(errs.length===0,"nessun errore JS "+errs.join("|"));
await b.close()})()
