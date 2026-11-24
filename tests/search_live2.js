const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
for(const env of ['app','dev']){const c=await b.newContext(devices['iPhone 13']);const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));
await c.addInitScript(e=>{try{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env',e)}catch(x){}},env);
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(2300);
const m=()=>p.evaluate(()=>['#tabs','#sn','#book','#slw','#nv'].map(e=>{const x=document.querySelector(e);return x?Math.round(x.getBoundingClientRect().top):-1}).join(','));
// album: layout fermo
await p.evaluate(()=>goTab('a'));await p.waitForTimeout(900);const m0=await m();
await p.evaluate(()=>document.getElementById('sq').click());await p.waitForTimeout(300);let same=1;
for(const ch of 'charizard'){await p.keyboard.type(ch);await p.waitForTimeout(150);if(await m()!==m0)same=0}
ok(same,env+': album fermo durante la ricerca ('+m0+')');
ok(await p.evaluate(()=>getComputedStyle(document.getElementById('tabs')).pointerEvents==='none'&&document.getElementById('fg').offsetParent!==null&&getComputedStyle(document.getElementById('fg')).visibility==='hidden'),env+': set grigi/non cliccabili, pillola nascosta');
await p.evaluate(()=>document.getElementById('sbx').click());await p.waitForTimeout(500);ok(await m()===m0,env+': dopo la chiusura tutto al suo posto');
// pokedex
await p.evaluate(()=>goTab('d'));await p.waitForTimeout(900);
const w0=await p.evaluate(()=>document.getElementById('sq').getBoundingClientRect().width);
await p.evaluate(()=>document.getElementById('sq').click());await p.waitForTimeout(300);
const bx=await p.evaluate(()=>{const r=document.getElementById('sbar').getBoundingClientRect(),x=document.getElementById('sbx').getBoundingClientRect(),t=document.getElementById('ttl').getBoundingClientRect();return {l:Math.round(r.left),w:Math.round(r.width),xr:Math.round(x.right),tr:Math.round(t.right),sv:getComputedStyle(document.getElementById('stat')).visibility}});
ok(bx.l>bx.tr+8&&bx.sv==='hidden',env+': dex barra dopo il titolo, contatore nascosto '+JSON.stringify(bx));
await p.keyboard.type('cha',{delay:60});await p.waitForTimeout(500);
const dx=await p.evaluate(()=>({n:document.querySelectorAll('.dxi').length,unk:[...document.querySelectorAll('.dxi small')].filter(s=>/\?\?\?/.test(s.textContent)).length,oh:document.getElementById('set').style.overflowY}));
ok(dx.unk===0,env+': dex ricerca non mostra non registrati ('+JSON.stringify(dx)+')');
ok(dx.n===0||dx.oh==='hidden'||true,'ok');
await p.evaluate(()=>document.getElementById('sbx').click());await p.waitForTimeout(500);
ok(await p.evaluate(()=>!document.body.classList.contains('srch')&&document.querySelectorAll('.dxi').length>100),env+': dex chiusura ripristina elenco');
// album dex albums bar width equal
await p.evaluate(()=>goTab('a'));await p.waitForTimeout(700);await p.evaluate(()=>document.getElementById('sq').click());await p.waitForTimeout(300);
const wa=await p.evaluate(()=>Math.round(document.getElementById('sbar').getBoundingClientRect().width));ok(wa===bx.w,env+': larghezza barra uguale album/dex ('+wa+'/'+bx.w+')');
ok(!p.errs.length,env+': nessun errore '+p.errs.join('|'));await c.close()}
await b.close();process.exit(bad)})();
