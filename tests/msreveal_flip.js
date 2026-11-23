// rivelazione carta da missione segreta: niente bip, la carta si gira col dito, fascia che sfuma dal nero al colore della carta
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874},hasTouch:true});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)process.exitCode=1};
await p.evaluate(()=>{window.__s=[];const o=window.sfx;window.sfx=function(n,d){window.__s.push(n);return o.apply(this,arguments)};});
await p.evaluate(()=>{msDev3();msDev3();msDev3();msClaim('dev3');});
// in dev il test 'dev3' è segreto: lo apriamo direttamente
await p.evaluate(()=>{msBuild();const c=CARDS.XC||CARDS.Q1;window.__cc=c;msReveal(c,true,()=>{try{pkView(c)}catch(e){}})});
await p.waitForTimeout(2600);
let st=await p.evaluate(()=>({ov:!!document.querySelector('.msrv'),s:window.__s.slice(),hint:!!document.querySelector('.msrv .mrh'),bg:getComputedStyle(document.querySelector('.msrv')).backgroundImage,anim:document.querySelector('.msrv .mrw').getAnimations().length}));
ok(st.ov,'overlay presente');ok(!st.s.includes('rare'),'nessun bip (rare) all\'inizio: '+st.s.join(','));ok(st.hint,'scritta "Gira la carta"');ok(!/rgba/.test(st.bg),'sfondo overlay opaco');
// tap: non deve chiudere
await p.touchscreen.tap(200,430);await p.waitForTimeout(500);
ok(await p.evaluate(()=>!!document.querySelector('.msrv')),'tap non salta la rivelazione');
// continua a tremare dopo un po' (serie con pause)
let shakes=0;for(let i=0;i<14;i++){await p.waitForTimeout(250);const a=await p.evaluate(()=>document.querySelector('.msrv .mrw').getAnimations().length);if(a>0)shakes++}
ok(shakes>3&&shakes<14,'trema a serie con pause ('+shakes+'/14 campioni con animazione)');
// trascino col dito
await p.mouse.move(120,430);await p.mouse.down();for(let x=120;x<=300;x+=15){await p.mouse.move(x,430);await p.waitForTimeout(16)}
const mid=await p.evaluate(()=>document.querySelector('.msrv .mrw').style.transform);
await p.mouse.up();
ok(/rotateY/.test(mid),'la carta ruota col dito: '+mid);
const cols=[];for(let i=0;i<30;i++){await p.waitForTimeout(100);cols.push(await p.evaluate(()=>({o:!!document.querySelector('.msrv'),h:getComputedStyle(document.documentElement).backgroundColor,vw:!document.getElementById('vw').hidden})))}
console.log(JSON.stringify(cols.filter((_,i)=>i%3===0).map(c=>c.h+(c.o?'*':'')+(c.vw?'v':''))));
ok(await p.evaluate(()=>!document.querySelector('.msrv')),'overlay rimosso dopo la rivelazione');
ok(await p.evaluate(()=>!document.getElementById('vw').hidden),'carta aperta');
const fin=await p.evaluate(()=>({h:getComputedStyle(document.documentElement).backgroundColor,m:document.querySelector('meta[name=theme-color]').content}));
console.log(JSON.stringify(fin));
ok(!errs.length,'nessun errore JS '+errs.join('|'));
await b.close()})();
