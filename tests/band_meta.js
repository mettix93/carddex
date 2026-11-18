// fascia (meta theme-color): niente rimbalzi tra rampa e colore finale, in nessun tipo di bustina
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const k of['n','l','g']){const p=await b.newPage({viewport:{width:402,height:874}});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
await p.mouse.click(201,400);await p.waitForTimeout(2000);await p.evaluate(()=>pkZoom());await p.waitForTimeout(800);
if(k!=='n')await p.click('#pkdv button[data-k='+k+']');
await p.evaluate(()=>{window.__t=[];let l="";const t0=performance.now();(function f(){const v=document.querySelector('meta[name=theme-color]').content;if(v!==l){l=v;window.__t.push(v)}if(performance.now()-t0<3000)requestAnimationFrame(f)})();pkOpen()});
await p.waitForTimeout(3200);const t=await p.evaluate(()=>window.__t);
// la luminosità deve andare in un solo verso dal bianco al colore finale (nessun ritorno indietro)
const L=v=>{const n=parseInt(v.slice(1),16);return((n>>16)&255)+((n>>8)&255)+(n&255)};
let back=0;for(let i=2;i<t.length;i++)if(L(t[i])>L(t[i-1])+3)back++;
console.log((back?'FAIL':'OK  ')+' '+k+' '+t.length+' cambi, ritorni indietro: '+back+' '+t.slice(-4).join(' '));if(back)process.exitCode=1;await p.close()}
await b.close()})();
