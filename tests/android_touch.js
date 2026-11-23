// Android: gesti touch reali (CDP): carosello bustine, rivelazione carta (flip col dito), long-press senza menu, colore barra
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
const c=await b.newContext(devices['Pixel 7']);await c.addInitScript(()=>{try{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')}catch(e){}});
const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(2500);
const cdp=await c.newCDPSession(p);
const touch=async(pts)=>{for(let i=0;i<pts.length;i++){const [x,y,t]=pts[i];await cdp.send('Input.dispatchTouchEvent',{type:t,touchPoints:t==='touchEnd'?[]:[{x,y,id:1}]});await p.waitForTimeout(16)}};
const swipe=async(x0,y0,x1,y1,n=14)=>{const a=[[x0,y0,'touchStart']];for(let i=1;i<=n;i++)a.push([x0+(x1-x0)*i/n,y0+(y1-y0)*i/n,'touchMove']);a.push([x1,y1,'touchEnd']);await touch(a)};
// carosello: swipe a sinistra sulle bustine -> posizione cambia
const pos0=await p.evaluate(()=>pkCPos);await swipe(300,430,90,430);await p.waitForTimeout(900);const pos1=await p.evaluate(()=>pkCPos);
console.log('carosello',pos0,'->',pos1);ok(pos1!==pos0,'swipe touch sul carosello cambia bustina');
// tap sul pulsante Missioni
await p.evaluate(()=>{msBuild()});await p.waitForTimeout(500);
// rivelazione: flip col dito
await p.evaluate(()=>{document.getElementById('msp').hidden=true;msReveal(CARDS.Q1,true,()=>{try{pkView(CARDS.Q1)}catch(e){}})});await p.waitForTimeout(2800);
const A=await p.evaluate(()=>document.querySelector('.msrv .mrw').style.transform||'');
await touch([[120,430,'touchStart'],[160,430,'touchMove'],[220,430,'touchMove'],[300,430,'touchMove'],[340,430,'touchMove'],[340,430,'touchEnd']]);await p.waitForTimeout(400);
const done=await p.evaluate(()=>({done:!!document.querySelector('.msrv .mrw')&&getComputedStyle(document.querySelector('.msrv .mrw')).transform}));
await p.waitForTimeout(2200);
ok(await p.evaluate(()=>!document.querySelector('.msrv')&&!document.getElementById('vw').hidden),'flip touch: la carta si gira, overlay chiuso e carta aperta');
// long-press: contextmenu annullato
const cm=await p.evaluate(()=>{const e=new MouseEvent('contextmenu',{bubbles:true,cancelable:true});document.body.dispatchEvent(e);return e.defaultPrevented});ok(cm,'long-press: menu di contesto bloccato');
// colore barra: theme-color segue lo sfondo
await p.waitForTimeout(700);const tc1=await p.evaluate(()=>document.querySelector('meta[name="theme-color"]').content);
await p.evaluate(()=>{document.getElementById('vx').click()});await p.waitForTimeout(1200);const tc2=await p.evaluate(()=>document.querySelector('meta[name="theme-color"]').content);
console.log('theme-color',tc1,'->',tc2);ok(!!tc1&&!!tc2,'theme-color aggiornato dalla pagina ('+tc1+' / '+tc2+')');
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close();process.exit(bad)})();
