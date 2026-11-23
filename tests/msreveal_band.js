// fascia alta durante il reveal missione: scura mentre l'overlay è visibile, poi torna come prima
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
const m=()=>p.evaluate(()=>document.querySelector('meta[name=theme-color]').content);
const hb=()=>p.evaluate(()=>getComputedStyle(document.documentElement).backgroundColor);const a=await m();const ha=await hb();
await p.evaluate(()=>{window.__d=0;msReveal(CARDS.XC||Object.values(CARDS)[0],0,()=>{window.__d=1})});
await p.waitForTimeout(500);const mid=await m();const hm=await hb();const ov=await p.evaluate(()=>!!document.querySelector('.msrv'));
await p.click('.msrv');await p.waitForTimeout(1500);const z=await m();const hz=await hb();const gone=await p.evaluate(()=>!document.querySelector('.msrv'));
const ok=ov&&mid==='#06070e'&&gone&&z===a&&hm==='rgb(6, 7, 14)'&&hz===ha;
console.log((ok?'OK  ':'FAIL')+' prima '+a+' durante '+mid+' dopo '+z+' | html prima '+ha+' durante '+hm+' dopo '+hz);if(!ok)process.exitCode=1;await b.close()})();
