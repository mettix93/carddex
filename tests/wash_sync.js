// al momento in cui la fascia cambia (meta theme-color), il velo deve essere opaco e già del colore nuovo
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;
for(const k of['n','l','g']){const p=await b.newPage({viewport:{width:402,height:874}});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
await p.mouse.click(201,400);await p.waitForTimeout(2000);await p.evaluate(()=>pkZoom());await p.waitForTimeout(800);
if(k!=='n')await p.click('#pkdv button[data-k='+k+']');
await p.evaluate(()=>{window.__e=[];let l=document.querySelector('meta[name=theme-color]').content;const t0=performance.now();(function f(){const m=document.querySelector('meta[name=theme-color]').content,w=document.querySelector('.pkwash');if(m!==l){l=m;window.__e.push({t:Math.round(performance.now()-t0),m,o:w?+getComputedStyle(w).opacity:null,bg:w?getComputedStyle(w).backgroundColor:null})}if(performance.now()-t0<3500)requestAnimationFrame(f)})();pkOpen()});
await p.waitForTimeout(3700);const e=await p.evaluate(()=>window.__e);
console.log(k,JSON.stringify(e.map(x=>[x.t,x.m,x.o&&+x.o.toFixed(2)])));const last=e[e.length-1]||{};
const hx=v=>{const n=parseInt(v.slice(1),16);return'rgb('+((n>>16)&255)+', '+((n>>8)&255)+', '+(n&255)+')'};
const ok=last.o>=0.95&&last.bg===hx(last.m);
console.log((ok?'OK   ':'FAIL ')+k+' ultimo cambio fascia a '+last.t+'ms: velo opacità '+(last.o&&last.o.toFixed(2))+' colore velo '+last.bg+' fascia '+last.m);if(!ok)bad++;await p.close()}
await b.close();console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})();
