// Test di regressione CardDex: node tests/regress.js [url]
// Controlla: lente della barra (sempre visibile e animata verso/da Bustine), dissolvenza tra le 4 schermate,
// nessun album sotto Impostazioni, layout Impostazioni identico tra Notte e Classica, nessun errore JS.
const {chromium}=require('playwright');
const URL=process.argv[2]||'http://localhost:8765/carddex-album.html';
let fail=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)fail++};
(async()=>{const b=await chromium.launch();const errs=[];
const open=async th=>{const ctx=await b.newContext({viewport:{width:402,height:874}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(t=>{localStorage.setItem('carddex_theme',t);sessionStorage.cdmode='c'},th);await p.goto(URL);await p.waitForTimeout(1500);return p};
const p=await open('c');
// 1) lente: per ogni passaggio la barra resta sopra a tutto e la lente finisce sul tasto attivo
const path=[['b'],['g'],['b'],['s'],['b'],['c'],['s'],['b'],['c'],['g'],['c']];
for(const [to] of path){
 const r=await p.evaluate(async to=>{const nv=document.querySelector('#nvp');let hid=0,moved=new Set();const t0=performance.now();document.querySelector('#nvp button[data-t='+to+']').click();
  await new Promise(res=>{const f=()=>{const r=nv.getBoundingClientRect(),e=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);if(!nv.contains(e))hid++;moved.add(Math.round(nv.querySelector('.lens').getBoundingClientRect().x));if(performance.now()-t0<800)requestAnimationFrame(f);else res()};f()});
  const l=nv.querySelector('.lens').getBoundingClientRect(),a=nv.querySelector('button.on').getBoundingClientRect();return {hid,n:moved.size,dx:Math.abs(l.x-a.x)+Math.abs(l.width-a.width)}},to);
 ok(r.hid===0&&r.dx<3,'lente verso '+to+' (nascosta '+r.hid+' frame, scarto '+r.dx.toFixed(1)+'px, '+r.n+' posizioni)');await p.waitForTimeout(300)}
// 2) dissolvenza tra le 4 schermate + nessun album sotto Impostazioni
for(const [to,sett] of [['g',0],['s',1],['c',0]]){
 const r=await p.evaluate(async to=>{const out=[],t0=performance.now();const bk=document.querySelector('#book');document.querySelector('#nvp button[data-t='+to+']').click();
  await new Promise(res=>{const f=()=>{const set=document.querySelector('#set');out.push([+getComputedStyle(bk).opacity,set&&!set.hidden?+getComputedStyle(set).opacity:-1]);if(performance.now()-t0<500)requestAnimationFrame(f);else res()};f()});return out},to);
 if(sett){ok(Math.max(...r.map(x=>x[0]))===0,'impostazioni: album mai visibile sotto');ok(Math.min(...r.filter(x=>x[1]>=0).map(x=>x[1]))<.5,'impostazioni: dissolvenza')}
 else ok(Math.min(...r.map(x=>x[0]))<.5&&r[r.length-1][0]===1,'dissolvenza verso '+to);await p.waitForTimeout(300)}
// 3) Impostazioni identiche tra i temi
const dump=async th=>{const q=await open(th);await q.evaluate(()=>document.querySelector('#nvp button[data-t=s]').click());await q.waitForTimeout(800);
 return q.evaluate(()=>[...document.querySelectorAll('#set, #set *')].filter(e=>e.getBoundingClientRect().width>0).map(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return e.tagName+'|'+[r.x,r.y,r.width,r.height].map(v=>v.toFixed(1))+'|'+c.fontSize+'|'+c.fontWeight+'|'+c.borderTopWidth}))};
const A=await dump('n'),B=await dump('c');ok(A.length===B.length&&A.every((x,i)=>x===B[i]),'Impostazioni: posizioni e misure identiche in Notte e Classica');
ok(errs.length===0,'nessun errore JS'+(errs.length?': '+errs[0]:''));
await b.close();console.log(fail?fail+' FALLITI':'TUTTO OK');process.exit(fail?1:0)})()
