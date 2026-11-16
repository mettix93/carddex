const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));p.on('console',m=>{if(m.type()==='error')e.push(m.text())});
await p.route(/\.(png|jpg|webp)(\?.*)?$/,r=>{if(r.request().url().includes('localhost'))return r.continue();r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')})});
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{const o=pkSt();pkSync(o);o.dl=6;pkSv(o)});await p.evaluate(async()=>{PKCUR='B';pkBusy=0;pkOpen();await new Promise(r=>setTimeout(r,700));pkBusy=0;pkSummary()});await p.waitForTimeout(900);await p.evaluate(()=>document.querySelector('#pks1').click());await p.waitForTimeout(4500);
console.log(await p.evaluate(()=>JSON.stringify({aqRun,n:PKAQ.length,ls:Object.keys(localStorage)})));
await p.reload();await p.waitForTimeout(2500);console.log(e.filter(x=>!/TUNNEL/.test(x)));
console.log(await p.evaluate(()=>JSON.stringify({MODE,cur,pg,aqRun,n:PKAQ.length,body:document.body.className})));
await p.evaluate(()=>document.querySelector('#nvp button[data-t=c]').click());await p.waitForTimeout(1000);await p.evaluate(()=>document.querySelector('.asc[data-m=g]').click());await p.waitForTimeout(1500);await p.screenshot({path:'/tmp/r1.png'});await p.waitForTimeout(6000);await p.screenshot({path:'/tmp/r2.png'});console.log(e.filter(x=>!/TUNNEL/.test(x)));await b.close()})()
