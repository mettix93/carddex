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
ok(await p.evaluate(()=>document.querySelector(".pkbeam")!==null),"fascio di luce al taglio");
ok(await p.evaluate(()=>document.querySelector("#pk").classList.contains("god")&&!!document.querySelector("#pkgold")),"fondo oro attivo durante lo sbusto");
await p.waitForTimeout(2200);
ok(s0===await keep(),"pacchetto di prova DEV: nulla salvato (contatore, album, Pokédex)");
ok(errs.length===0,"nessun errore JS "+errs.join("|"));
await b.close()})()
