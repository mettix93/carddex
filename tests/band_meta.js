// la fascia (meta theme-color) deve scorrere gradualmente bianco->argento/oro, non scattare
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const k of['l','g','n']){const p=await b.newPage({viewport:{width:402,height:874}});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
await p.mouse.click(201,400);await p.waitForTimeout(2000);
await p.evaluate(()=>pkZoom());await p.waitForTimeout(800);
await p.evaluate(()=>{window.__t=[];const m=()=>document.querySelector('meta[name=theme-color]').content;let l="";const t0=performance.now();(function f(){const v=m();if(v!==l){l=v;window.__t.push(Math.round(performance.now()-t0)+" "+v)}if(performance.now()-t0<3000)requestAnimationFrame(f)})()});
if(k!=='n')await p.click('#pkdv button[data-k='+k+']');await p.evaluate(()=>pkOpen());await p.waitForTimeout(3300);
const t=await p.evaluate(()=>window.__t);console.log(k,t.length,'cambi\n'+t.join('\n'));
const ok=t.length>8&&t.every((v,j)=>j<2||true);if(k!=='n'&&t.length<8){console.log('FAIL scatto');process.exitCode=1}
await p.close()}
await b.close()})();
