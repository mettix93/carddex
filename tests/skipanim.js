// salto delle animazioni di ingresso nelle tasche: tocco ovunque → carte già dentro, pagina dell'ultima
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');sessionStorage.setItem('cdmode','g')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
// ALBUM: 3 carte nuove sparse su pagine diverse
const info=await p.evaluate(()=>{aslOpen();return 1});await p.waitForTimeout(500);
await p.evaluate(()=>{aslGo("g")});await p.waitForTimeout(900);
const r=await p.evaluate(()=>{const k=COLS[0].k,L=st[k].filter(s=>s.id);const picks=[L[1],L[12],L[30]].filter(Boolean);PKAQ=[];picks.forEach(s=>{s.o=1;s.q=1;PKAQ.push({k,id:s.id})});aqSave();cur=k;pg=0;sp=0;render();setTimeout(()=>aqAnim0(k),50);return{k,idx:picks.map(s=>st[k].indexOf(s))}});
await p.waitForTimeout(1400);
ok(await p.evaluate(()=>aqRun===1&&!!document.querySelector('.sksp')),'ALBUM: animazione in corso con icona salta');
await p.mouse.click(200,400);await p.waitForTimeout(500);
const st1=await p.evaluate(()=>({run:aqRun,n:PKAQ.length,pg,ico:!!document.querySelector('.sksp'),g:document.querySelectorAll('.aqg').length}));
const lastPg=Math.floor(r.idx[2]/9);
ok(st1.run===0&&st1.n===0&&!st1.ico&&st1.g===0,'ALBUM: dopo il tocco tutto inserito, nessun residuo '+JSON.stringify(st1));
ok(st1.pg===lastPg,'ALBUM: pagina '+st1.pg+' (ultima carta a pagina '+lastPg+')');
await p.waitForTimeout(2500);ok(await p.evaluate(()=>aqRun===0&&PKAQ.length===0),'ALBUM: stato stabile dopo il salto');
// POKEDEX
await p.evaluate(()=>{document.querySelector('.nvp button[data-t=d],.nvp [data-t=d]').click()});await p.waitForTimeout(1200);
const dd=await p.evaluate(()=>{const ds=[];for(const c of COLS)for(const s of st[c.k]){const cd=CARDS[s.id];if(cd&&cd.kd==="p"&&cd.dex&&!ds.includes(cd.dex)&&ds.length<40){s.o=1;s.q=1;ds.push(cd.dex)}}save();PKDQ=ds.slice(0,3).concat([ds[39]]).filter(Boolean);dxQSave();return PKDQ.slice()});
await p.evaluate(()=>{drawDex(1);dxFillAnim()});await p.waitForTimeout(1600);
ok(await p.evaluate(()=>dxFilling===1&&!!document.querySelector('.sksp')),'POKEDEX: animazione in corso con icona salta');
await p.mouse.click(200,420);await p.waitForTimeout(600);
const s2=await p.evaluate(()=>({f:dxFilling,q:PKDQ.length,ico:!!document.querySelector('.sksp'),gh:document.querySelectorAll('.dxgl').length}));
ok(s2.f===0&&s2.q===0&&!s2.ico&&s2.gh===0,'POKEDEX: dopo il tocco tutto inserito '+JSON.stringify(s2));
const vis=await p.evaluate(d=>{const sl=document.querySelector('.dxi[data-d="'+d+'"]');if(!sl)return -1;const r=sl.getBoundingClientRect();return r.top>0&&r.bottom<innerHeight?1:0},Math.max(...dd));
console.log(JSON.stringify(await p.evaluate(d=>{const e=document.querySelector('#set'),sl=document.querySelector('.dxi[data-d="'+d+'"]'),r=sl.getBoundingClientRect();return{st:e.scrollTop,sh:e.scrollHeight,top:r.top,bot:r.bottom,ih:innerHeight,pt:e.style.paddingTop}},Math.max(...dd))));ok(vis===1,'POKEDEX: ultima registrata visibile ('+vis+')');
await p.waitForTimeout(2500);ok(await p.evaluate(()=>dxFilling===0&&PKDQ.length===0),'POKEDEX: stato stabile');
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close();process.exit(bad?1:0)})();
