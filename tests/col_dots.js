// PullBinder: slider a pallini + contatore pagina
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
const c=await b.newContext({...devices['iPhone 13'],serviceWorkers:'block'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')}));
await c.addInitScript(()=>{localStorage['col_carddex_env']='app'});
await p.goto('http://localhost:8765/collezione.html');await p.waitForTimeout(1800);
await p.evaluate(()=>{goTab('c')});await p.waitForTimeout(600);await p.evaluate(()=>{const a=document.querySelector('.asc[data-m=c]');if(a)a.click()});await p.waitForTimeout(900);
const r=await p.evaluate(()=>{const d=document.getElementById('sld'),is=[...d.querySelectorAll('i')];return {n:is.length,np,gap:is.length>1?is[1].offsetLeft-is[0].offsetLeft:0,k:!!document.getElementById('sdk')}});
ok(r.n===r.np&&r.n>1,'pallini = pagine ('+r.n+')');ok(Math.abs(r.gap-20)<1.5||r.n>14,'distanza '+r.gap);ok(r.k,'knob presente');
const bb=await p.evaluate(()=>{const e=document.getElementById('sld').getBoundingClientRect();return [e.left,e.width,e.top+e.height/2]});
await p.mouse.click(bb[0]+bb[1]/2+60,bb[2]);await p.waitForTimeout(500);
ok(await p.evaluate(()=>pg)>0,'click sul pallino cambia pagina ('+await p.evaluate(()=>pg)+')');
const pn=await p.evaluate(()=>{const e=document.getElementById('pn').getBoundingClientRect(),k=document.getElementById('book').getBoundingClientRect(),s=document.getElementById('sld').getBoundingClientRect();return [e.top>=k.bottom-2&&e.bottom<=s.top+6,document.getElementById('pn').textContent]});
ok(pn[0],'contatore tra libro e pallini: '+pn[1]);
ok(!p.errs.length,'nessun errore '+p.errs.join('|'));
await p.screenshot({path:'/tmp/cd.png'});
await b.close();process.exit(bad)})();
