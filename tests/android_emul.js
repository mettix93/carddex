// emulazione Android (Pixel 7 / schermo piccolo): errori JS, overflow orizzontale, schermate e gesti touch
const {chromium,devices}=require('playwright');
const DEV=process.argv[2]||'Pixel 7';
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
const cfg=DEV==='small'?{viewport:{width:360,height:640},deviceScaleFactor:2,isMobile:true,hasTouch:true,userAgent:devices['Pixel 7'].userAgent}:devices[DEV];
async function ctx(env){const c=await b.newContext({...cfg,locale:'it-IT'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|ERR_|net::/.test(m.text()))p.errs.push('console:'+m.text())});
 await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(e=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env',e)},env);await p.reload();await p.waitForTimeout(2200);return p}
const ovf=p=>p.evaluate(()=>{const W=innerWidth;const bad=[];document.querySelectorAll('body *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width>0&&r.height>0&&(r.right>W+2||r.left<-2)){let a=e,sc=false;while(a&&a!==document.body){const s=getComputedStyle(a);if(/(auto|scroll|hidden)/.test(s.overflowX)&&a!==e){sc=true;break}if(s.position==='fixed'&&0)break;a=a.parentElement}if(!sc&&!e.closest('#pkg')&&getComputedStyle(e).position!=='fixed'&&getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none'&&e.offsetParent!==null)bad.push((e.id?'#'+e.id:e.tagName+'.'+String(e.className).slice(0,20))+':'+Math.round(r.left)+'-'+Math.round(r.right))}});return {sw:document.documentElement.scrollWidth,W,bad:bad.slice(0,6)}});
const T=DEV.replace(/\W/g,'');
for(const env of ['app','dev']){
 const p=await ctx(env);
 const ua=await p.evaluate(()=>navigator.userAgent);ok(/Android/.test(ua),env+': UA Android');
 const shot=async n=>{await p.screenshot({path:`/tmp/and_${T}_${env}_${n}.png`})};
 await p.waitForTimeout(500);await shot('home');
 let o=await ovf(p);ok(o.sw<=o.W+1,env+': home senza scroll orizzontale ('+o.sw+'/'+o.W+') '+JSON.stringify(o.bad));
 for(const t of ['a','d','s','b']){await p.evaluate(t=>{try{goTab(t)}catch(e){}},t);await p.waitForTimeout(900);await shot('tab_'+t);o=await ovf(p);ok(o.sw<=o.W+1&&!o.bad.length,env+': tab '+t+' senza overflow '+JSON.stringify(o.bad))}
 // missioni
 await p.evaluate(()=>{msBuild()});await p.waitForTimeout(700);await shot('missioni');o=await ovf(p);ok(!o.bad.length,env+': Missioni senza overflow '+JSON.stringify(o.bad));await p.evaluate(()=>{document.getElementById('msp').hidden=true});
 // converti
 await p.evaluate(()=>{["gB","gJ"].forEach(k=>{st[k].filter(x=>x.id).slice(0,8).forEach((x,i)=>{x.o=1;x.q=2+(i%3)})});save();cvOpen()});await p.waitForTimeout(800);await shot('converti');o=await ovf(p);ok(!o.bad.length,env+': Converti senza overflow '+JSON.stringify(o.bad));
 await p.evaluate(()=>{document.getElementById('cvs').hidden=true});
 // pop-up sblocco
 await p.evaluate(()=>{msPop=0;ulShow(1,'s',1)});await p.waitForTimeout(600);await shot('popup_set');o=await ovf(p);ok(!o.bad.length,env+': pop-up set senza overflow '+JSON.stringify(o.bad));
 await p.evaluate(()=>[...document.querySelectorAll('#trm .trbtn')].find(x=>x.textContent==='Più tardi').click());await p.waitForTimeout(900);await shot('popup_missioni');
 await p.evaluate(()=>{const e=document.getElementById('trm');if(e)e.hidden=true;msPop=0});
 // carta aperta (promo + normale)
 await p.evaluate(()=>pkView(CARDS.Q1));await p.waitForTimeout(2000);await shot('carta_promo');o=await ovf(p);ok(!o.bad.length,env+': carta aperta senza overflow '+JSON.stringify(o.bad));
 await p.evaluate(()=>pkView(CARDS.B4||CARDS.B1));await p.waitForTimeout(1500);await shot('carta_holo');
 ok(!p.errs.length,env+': nessun errore JS/console '+p.errs.slice(0,3).join('|'));
 await p.context().close()}
await b.close();process.exit(bad)})();
