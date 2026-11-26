// v562: caption Pop Pack sparisce al tocco; Preferiti mostra ALBUM PREFERITI + conteggio
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();
p.on('pageerror',e=>{console.log('ERR',e.message);bad=1});await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());await p.addInitScript(()=>localStorage.setItem('carddex_env','app'));
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1800);
await p.evaluate(()=>{const o=pkSt();o.pts=30;o.pp=3;pkSv(o);goTab("b")});await p.waitForTimeout(900);
await p.click('#pkbp');await p.waitForTimeout(600);await p.click('#cvpp');await p.waitForTimeout(1200);
ok(await p.evaluate(()=>+getComputedStyle(document.querySelector('#pkpop5')).opacity===1),'caption visibile prima del tocco');
await p.evaluate(()=>pkSelect(0));await p.waitForTimeout(250);
ok(await p.evaluate(()=>+getComputedStyle(document.querySelector('#pkpop5')).opacity<.05),'caption sparita subito dopo il tocco');
await p.waitForTimeout(1500);
// Preferiti
await p.evaluate(()=>{PKPOP=0;document.querySelector('#pk').hidden=true;const f=CARDS?Object.keys(CARDS).slice(0,3):[];const s=st;(s.g&&s.g[0]?s.g:[]);});
await p.evaluate(()=>{goTab("g");pfOn()});await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{const n=document.querySelector('#sn');return{h:n.innerHTML,hid:n.hidden,pfm:PFM}});
console.log(JSON.stringify(r));
ok(r.pfm&&!r.hid&&/ALBUM PREFERITI/.test(r.h)&&/<em>\d+<\/em>/.test(r.h)&&!/\//.test(r.h.replace(/<\/?(b|em)>/g,'')),'Preferiti: ALBUM PREFERITI + solo numero');
await b.close();process.exit(bad)})();
