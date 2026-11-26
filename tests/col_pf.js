const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();p.on('pageerror',e=>{console.log('ERR',e.message);bad=1});await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());await p.addInitScript(()=>localStorage.setItem('carddex_env','app'));await p.goto('http://localhost:8765/collezione.html');await p.waitForTimeout(1800);
await p.evaluate(()=>{pfOn()});await p.waitForTimeout(1000);
const r=await p.evaluate(()=>{const n=document.querySelector('#sn');return{h:n.innerHTML,hid:n.hidden,pfm:PFM}});console.log(JSON.stringify(r));
ok(r.pfm&&!r.hid&&/ALBUM PREFERITI<\/b><em>\d+<\/em>/.test(r.h),'Preferiti: ALBUM PREFERITI + numero');
await b.close();process.exit(bad)})()
