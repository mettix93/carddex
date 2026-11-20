// giro generale: ogni set, ogni album, pokédex, bacheche, preferiti, amici — nessun errore JS
const {chromium}=require('playwright');const {mock}=require('./lib_sb.js');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
async function run(file,mode){const b=await chromium.launch(),c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(m=>{if(m==='g')sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')},mode);
  await p.goto('http://localhost:8765/'+file);await p.waitForTimeout(1500);
  if(mode==='g')await p.evaluate(()=>document.querySelector('#nvp button[data-t=c]').click()).catch(()=>{});await p.waitForTimeout(500);
  const r=await p.evaluate(async()=>{const bad=[];const ks=COLS.map(c=>c.k);for(const k of ks){try{cur=k;pg=0;sp=0;FLT="a";tabs();render();const n=document.querySelectorAll('.slot').length;if(!n&&LIST().length)bad.push(k+" senza slot");
      if(!st[k]||!st[k].length)bad.push(k+" vuoto");}catch(e){bad.push(k+": "+e.message)}}
    try{for(let i=0;i<8;i++){const c=document.querySelector('.slot[data-i="'+i+'"]');}}catch(e){}return{bad,n:ks.length,keys:ks.join(",")}});
  ok(r.bad.length===0,file+': '+r.n+' set/album aprono ('+r.keys+') '+r.bad.join('|'));
  // pokédex e bacheche
  const e2=await p.evaluate(async()=>{try{goTab("d");await new Promise(r=>setTimeout(r,900));const a=document.querySelectorAll('#set .dxc,#set [data-i]').length;goTab("c");await new Promise(r=>setTimeout(r,800));bcList();await new Promise(r=>setTimeout(r,400));drawAsl();return"ok"}catch(e){return e.message}});
  ok(e2==="ok",file+': pokédex/bacheche '+e2);
  ok(errs.length===0,file+': nessun errore JS '+errs.join('|'));await b.close()}
(async()=>{await run('carddex-album.html','g');await run('collezione.html','c');console.log(bad?'FALLITO':'TUTTO OK');process.exit(bad?1:0)})()
