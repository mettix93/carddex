// carte Allenatore olografiche: effetto holo/riflesso allineato all'illustrazione (23.45% 8.3% 43.95% 9.8%)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
await p.mouse.click(201,400);await p.waitForTimeout(1500);
await p.evaluate(()=>{DXL=parse("Z").filter(c=>c.kd==="t"&&c.h);openCard(0)});await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{const f=document.querySelector("#card .ft").getBoundingClientRect(),h=document.querySelector("#card .ft .hl").getBoundingClientRect();return{t:(h.y-f.y)/f.height*100,l:(h.x-f.x)/f.width*100,w:h.width/f.width*100,h:h.height/f.height*100,cls:document.querySelector("#card .ft .hl").className,gl:document.querySelector("#card .ft .gl").className}});
console.log(JSON.stringify(r));
const ok=/trh/.test(r.cls)&&/trg/.test(r.gl)&&Math.abs(r.t-23.45)<1&&Math.abs(r.l-9.8)<1&&Math.abs(r.w-81.9)<1&&Math.abs(r.h-32.6)<1&&!errs.length;
console.log(ok?'OK':'FAIL '+errs);if(!ok)process.exitCode=1;await b.close()})();
