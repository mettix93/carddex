// PullBinder: passando da una carta aperta all'altra la fascia in alto segue il colore dello sfondo
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64')}));
await p.addInitScript(()=>{localStorage['col_carddex_env']='app'});await p.goto('http://localhost:8765/collezione.html');await p.waitForTimeout(1800);
const bg=()=>p.evaluate(()=>({h:getComputedStyle(document.documentElement).backgroundColor,m:document.querySelector('meta[name=theme-color]').content,cc:getComputedStyle(document.getElementById('vw')).getPropertyValue('--cc').trim()}));
const idx=await p.evaluate(()=>{const L=LIST(),r=[];for(let i=0;i<L.length&&r.length<60;i++){const s=L[i];if(s.id&&CARDS[s.id].kd==="p"){s.o=1;r.push(i)}}return r});
await p.evaluate(()=>{render()});await p.waitForTimeout(300);
let a=null,c=null,first=null;
for(const i of idx){await p.evaluate(i=>openCard(i),i);await p.waitForTimeout(700);const x=await bg();if(!a){a=x;continue}if(x.cc!==a.cc){c=x;break}}
console.log(JSON.stringify(a),JSON.stringify(c));
ok(a.cc!==c.cc,'colori carta diversi');ok(a.h!==c.h,'fascia in alto cambia con la carta');
const ee=e.filter(x=>!/decode audio/.test(x));ok(!ee.length,'nessun errore '+ee.join('|'));await b.close();process.exit(bad?1:0)})();
