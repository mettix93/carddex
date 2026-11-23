// carta aperta da Missioni (bustine visibili sotto): alla chiusura lo sfondo di html torna chiaro come la meta
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
const s=()=>p.evaluate(()=>({html:getComputedStyle(document.documentElement).backgroundColor,meta:document.querySelector('meta[name=theme-color]').content,pkbg:document.documentElement.style.getPropertyValue('--pkbg'),ttc:document.documentElement.style.getPropertyValue('--ttc'),tcs:!!document.getElementById('tcs'),msp:!document.getElementById('msp')?null:!document.getElementById('msp').hidden,vw:!document.getElementById('vw').hidden,pk:!document.getElementById('pk').hidden}));
console.log('start',JSON.stringify(await s()));
await p.evaluate(()=>msBuild());await p.waitForTimeout(800);console.log('missioni',JSON.stringify(await s()));
await p.evaluate(()=>{msDev3();msDev3();msDev3();msClaim('dev3');pkView(CARDS.XC)});await p.waitForTimeout(1500);console.log('carta',JSON.stringify(await s()));
await p.evaluate(()=>{const x=document.querySelector('#vw .vx,#vw [data-act=close],#vw button[aria-label=Chiudi]');window.__x=!!x;if(x)x.click()});await p.waitForTimeout(300);console.log('chiusa+.3s',JSON.stringify(await s()),await p.evaluate(()=>window.__x));
await p.waitForTimeout(2000);const z=await s();const ok=z.html==='rgb(242, 242, 247)'&&z.meta==='#f2f2f7';console.log((ok?'OK  ':'FAIL')+' chiusura carta sopra Missioni: html '+z.html+' meta '+z.meta);if(!ok)process.exitCode=1;
await b.close()})();
