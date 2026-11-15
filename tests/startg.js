const {chromium}=require('playwright');(async()=>{let bad=0;for(const env of ['app','dev']){for(const mode of ['g','c']){const b=await chromium.launch();const p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.addInitScript(([env,mode])=>{localStorage.setItem('carddex_env',env);localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_last',mode)},[env,mode]);
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
const r=await p.evaluate(()=>({m:MODE,slots:document.querySelectorAll('.slot').length,nav:document.querySelectorAll('#nvp button').length}));
const ok=!e.length&&r.slots>0&&r.nav>=4;if(!ok)bad++;console.log(ok?'OK':'FAIL','start',env,mode,JSON.stringify(r),e.join('|'));await b.close()}}process.exit(bad?1:0)})()
