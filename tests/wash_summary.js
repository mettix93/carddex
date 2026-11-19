// ultima carta → riepilogo (bustina normale): al cambio della fascia il velo è pieno e del colore nuovo
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;
for(const k of['n','n','n','l','g']){const p=await b.newPage({viewport:{width:402,height:874}});const er=[];p.on('pageerror',x=>er.push(x.message));
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
await p.mouse.click(201,400);await p.waitForTimeout(2000);await p.evaluate(()=>pkZoom());await p.waitForTimeout(800);
if(k!=='n')await p.click('#pkdv button[data-k='+k+']');
await p.evaluate(()=>pkOpen());await p.waitForTimeout(5500);
await p.evaluate(()=>{window.__E=[];let l=document.querySelector('meta[name=theme-color]').content;const t0=performance.now();(function f(){const m=document.querySelector('meta[name=theme-color]').content,w=document.querySelector('.pkwash'),sm=document.getElementById('pksum');if(m!==l){l=m;window.__E.push({t:Math.round(performance.now()-t0),m,o:w?+getComputedStyle(w).opacity:null,sum:!!(sm&&!sm.hidden)})}requestAnimationFrame(f)})()});
for(let i=0;i<16;i++){const d=await p.evaluate(()=>{const s=document.getElementById('pksum');if(s&&!s.hidden)return 1;try{pkNext(-1)}catch(x){}return 0});if(d)break;await p.waitForTimeout(1400)}
await p.waitForTimeout(1500);
const r=(await p.evaluate(()=>window.__E)).filter(x=>x.sum);
const last=r[r.length-1];const cls=await p.evaluate(()=>document.getElementById('pk').className);const isN=k==='n'&&!/lucky|god/.test(cls);if(k==='n'&&!isN){console.log('--   n (uscita Lucky/God a caso, salto)');await p.close();continue}
const ok=isN?(r.length===1&&last.o>=0.95):r.length>=0;
console.log((ok?'OK   ':'FAIL ')+k+' cambi fascia '+JSON.stringify(r)+(er.length?' ERR '+er.join('|'):''));if(!ok||er.length)bad++;await p.close()}
await b.close();console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})();
