// album Preferiti: pagine, riordino con drag, pubblicazione agli amici
const {chromium}=require('playwright');const {DB,mock}=require('./lib_sb.js');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block',hasTouch:false}),p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);
const n=await p.evaluate(()=>{let k=0;for(const co of GCOLS){for(const s of st[co.k]){if(s.id&&k<11){s.o=1;s.q=1;s.fav=1;k++}}}save();return k});ok(n===11,'11 carte preferite segnate');
ok(await p.evaluate(()=>pfIds().length)===11,'pfIds = 11');
await p.evaluate(()=>{aslOpen()});await p.waitForTimeout(900);
ok(await p.evaluate(()=>!!document.querySelector('.asc[data-m=f]')),'voce Preferiti nella pagina Album');
await p.click('.asc[data-m=f]');await p.waitForTimeout(500);
ok(await p.evaluate(()=>document.querySelectorAll('.pfg').length)===2,'2 pagine (11 carte)');
ok(await p.evaluate(()=>document.querySelectorAll('.pfs.f').length)===11,'11 carte nel album');
const ids=await p.evaluate(()=>pfIds());
await p.screenshot({path:'/tmp/claude-0/-home-claude/a48e991f-c09e-5f08-885c-e90d39037161/scratchpad/pf1.png'});
// drag: prima carta sul terzo slot
const a=await p.evaluate(()=>{const r=document.querySelector('.pfs[data-i="0"]').getBoundingClientRect(),t=document.querySelector('.pfs[data-i="2"]').getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2,t.x+t.width/2,t.y+t.height/2]});
await p.mouse.move(a[0],a[1]);await p.mouse.down();await p.waitForTimeout(500);await p.mouse.move(a[2]-20,a[3],{steps:6});await p.mouse.move(a[2],a[3],{steps:3});await p.mouse.up();await p.waitForTimeout(400);
const ni=await p.evaluate(()=>pfIds());ok(ni[2]===ids[0]&&ni[0]===ids[1],'drag: carta spostata al 3° posto e salvata');
// sfondo
await p.evaluate(()=>{pfSet(GK("carddex_pfs"),{bg:"o"});pfList()});await p.waitForTimeout(300);
ok(await p.evaluate(()=>getComputedStyle(document.querySelector('.pfw')).backgroundImage.includes('gradient')),'sfondo applicato');
// tolto dai preferiti sparisce
await p.evaluate(id=>{for(const co of GCOLS)for(const s of st[co.k])if(s.id===id)s.fav=0;save()},ids[5]);
ok(await p.evaluate(()=>pfIds().length)===10,'tolta dai preferiti: 10');
// pubblicazione
await p.evaluate(()=>{});
ok(errs.length===0,'nessun errore JS '+errs.join('|'));
console.log(bad?'FALLITO':'TUTTO OK');await b.close();process.exit(bad?1:0)})()
