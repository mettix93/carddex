// c43: la barra in basso non deve mai spostarsi (né la fascia in alto) passando tra Album/Pokédex/Bustine/Impostazioni
const {chromium}=require('playwright');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
(async()=>{for(const url of ['collezione.html','carddex-album.html']){
const b=await chromium.launch(),c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block',hasTouch:true,isMobile:true}),p=await c.newPage();p.on('pageerror',e=>{console.log('ERR',e.message);bad=1});await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('carddex_env','app');localStorage.setItem('col_carddex_env','app');localStorage.setItem('cd_sab','34')});await p.goto('http://localhost:8765/'+url);await p.waitForTimeout(2000);
const m=()=>p.evaluate(()=>{const q=s=>{const e=document.querySelector(s);if(!e)return'-';const r=e.getBoundingClientRect();return Math.round(r.top)+'/'+Math.round(r.bottom)};return q('#nvp')+'|'+q('footer')});
await p.evaluate(()=>goTab('c'));await p.waitForTimeout(900);const S={};
for(let i=0;i<5;i++)for(const t of ['d','c','s','c','b','c']){await p.evaluate(t=>goTab(t),t);await p.waitForTimeout(500);if(i%2)await p.evaluate(()=>dispatchEvent(new Event('resize')));await p.waitForTimeout(300);{(S[t]=S[t]||new Set()).add(await m())}}
for(const t in S)ok(S[t].size===1,url+' ['+t+']: barra e fascia in alto ferme dopo molti cambi ('+[...S[t]].join(' ; ')+')');
await b.close()}process.exit(bad)})();
