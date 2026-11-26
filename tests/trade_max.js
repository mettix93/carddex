// v568: limite 10 carte per scambio (Offri/Chiedi)
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();p.on('pageerror',e=>{console.log('ERR',e.message);bad=1});await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());await p.addInitScript(()=>localStorage.setItem('carddex_env','app'));
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{frOpen("t")});await p.waitForTimeout(300);await p.evaluate(()=>{FRS.on||FRS.setup();FR.u="sim-g";FR.v="fr";frDraw();FR.gv={};FR.gt={};FR.tab="give";FR.v="pr";frDraw()});await p.waitForTimeout(300);
const n0=await p.evaluate(()=>[...document.querySelectorAll('#frm .frtb button')].map(e=>e.textContent));
ok(n0[0]==='Offri (0/10)'&&n0[1]==='Chiedi (0/10)','contatori 0/10 ('+n0+')');
ok(await p.evaluate(()=>/Massimo 10 carte delle stesse rarità/.test(document.querySelector('#frm .frmx').textContent)),'testo in fondo');
// riempi fino a 10 con le tue doppie
const tot=await p.evaluate(()=>{const X=frCtx();let n=0;for(const id of Object.keys(X.my)){const q=X.my[id];for(let k=0;k<q&&n<10;k++,n++)FR.gv[id]=(FR.gv[id]||0)+1}FR.gv=FR.gv;frDraw();return n});
console.log('selezionate',tot);
if(tot===10){
 const n1=await p.evaluate(()=>document.querySelector('#frm .frtb button').textContent);ok(n1==='Offri (10/10)','contatore 10/10');
 const t=await p.evaluate(()=>{const ids=Object.keys(frCtx().my),b=document.querySelector('#frm .cvt:not(.on) .cvm[data-d="1"]')||document.querySelector('#frm .cvt .cvm[data-d="1"]');b.click();return new Promise(r=>setTimeout(()=>r({n:frCtx().ga.length,toast:(document.querySelector('#toast')||{}).textContent}),200))});
 ok(t.n===10,'non si può aggiungere oltre 10 ('+t.n+') toast: '+t.toast);
 const t2=await p.evaluate(()=>{const b=document.querySelector('#frm .cvt.on .cvm[data-d="-1"]');b.click();return new Promise(r=>setTimeout(()=>r(frCtx().ga.length),200))});
 ok(t2===9,'si può togliere ('+t2+')');
 await p.screenshot({path:'/tmp/tmax.png'});
}else console.log('SKIP: servono >=10 doppie nel simulatore ('+tot+')');
await b.close();process.exit(bad)})();
