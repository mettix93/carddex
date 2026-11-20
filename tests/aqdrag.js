const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block',hasTouch:false})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');sessionStorage.setItem('cdmode','g')});await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{aslOpen()});await p.waitForTimeout(500);await p.evaluate(()=>{aslGo("g")});await p.waitForTimeout(900);
await p.evaluate(()=>{const k=COLS[0].k,L=st[k].filter(s=>s.id);const picks=[L[1],L[3],L[12],L[30],L[50]].filter(Boolean);PKAQ=[];picks.forEach(s=>{s.o=1;s.q=1;PKAQ.push({k,id:s.id})});aqSave();cur=k;pg=0;sp=0;tabs();render();setTimeout(()=>aqAnim0(k),50)});await p.waitForTimeout(1000);
ok(await p.evaluate(()=>aqpOn===1&&!!document.querySelector('#aqp .aqc')),'mazzetto aperto');
console.log(await p.evaluate(()=>{const a=document.querySelector('#aqp').getBoundingClientRect();return 'aqp '+Math.round(a.top)+'-'+Math.round(a.bottom)+' ttl '+Math.round(document.querySelector('#ttl').getBoundingClientRect().bottom)+' book '+Math.round(document.querySelector('#book').getBoundingClientRect().top)}));console.log(await p.evaluate(()=>[...document.querySelectorAll('#aqp .aqc')].map(c=>c.dataset.i+':'+Math.round(c.getBoundingClientRect().left)+','+Math.round(c.getBoundingClientRect().top)+','+Math.round(c.getBoundingClientRect().width)).join(' ')));
await p.screenshot({path:'/tmp/d0.png'});
const c0=await p.evaluate(()=>{const r=document.querySelector('#aqp .aqc').getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]});
const slot=await p.evaluate(()=>{const e=document.querySelector('.slot[data-i="1"]').getBoundingClientRect();return[e.left+e.width/2,e.top+e.height/2]});
// card with i=1 is first: drag to slot 1
await p.mouse.move(...c0);await p.mouse.down();await p.waitForTimeout(250);await p.mouse.move(c0[0],c0[1]+60,{steps:5});await p.mouse.move(slot[0]-30,slot[1]-30,{steps:10});await p.waitForTimeout(200);
ok(await p.evaluate(()=>!!document.querySelector('.aqg.aqf')&&!!document.querySelector('.slot.aqt')),'in volo e slot evidenziato');
await p.screenshot({path:'/tmp/d1.png'});
await p.mouse.up();await p.waitForTimeout(380);console.log('landing',await p.evaluate(()=>{const g=document.querySelector('.aqg.aqf'),s=document.querySelector('.slot[data-i="1"]');if(!g)return 'gone';const a=g.getBoundingClientRect(),b=s.getBoundingClientRect();return [a.left-b.left,a.top-b.top,a.width-b.width,a.height-b.height].map(x=>Math.round(x*10)/10).join(',')}));await p.waitForTimeout(1200);
ok(await p.evaluate(()=>document.querySelector('.slot[data-i="1"]').classList.contains('on')&&PKAQ.length===4),'carta inserita nel suo slot, '+await p.evaluate(()=>PKAQ.length+' rimaste'));
// drag next card to a wrong place -> returns
const c1=await p.evaluate(()=>{const r=document.querySelector('#aqp .aqc').getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2,document.querySelector('#aqp .aqc').dataset.i]});
const wrong=await p.evaluate(()=>{const e=document.querySelector('.slot[data-i="8"]').getBoundingClientRect();return[e.left+e.width/2,e.top+e.height/2]});
await p.mouse.move(c1[0],c1[1]);await p.mouse.down();await p.waitForTimeout(250);await p.mouse.move(wrong[0],wrong[1],{steps:12});await p.waitForTimeout(350);
ok(await p.evaluate(()=>!document.querySelector('.slot.aqt')),'slot sbagliato non evidenziato');
await p.mouse.up();await p.waitForTimeout(700);
ok(await p.evaluate(()=>PKAQ.length===4&&!document.querySelector('.aqg.aqf')&&document.querySelectorAll('#aqp .aqc').length===4&&getComputedStyle(document.querySelector('#aqp .aqc')).opacity==='1'),'carta tornata nel mazzetto');
// Metti tutte
await p.click('#aqp .aqpa');await p.waitForTimeout(800);
ok(await p.evaluate(()=>aqpOn===0&&aqRun===1&&!document.querySelector('#aqp')),'Metti tutte avvia animazione automatica');
await p.waitForTimeout(15000);
console.log(await p.evaluate(()=>JSON.stringify({run:aqRun,q:PKAQ.length,pg})));
ok(await p.evaluate(()=>PKAQ.length===0),'tutte inserite');
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close();process.exit(bad?1:0)})();
