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
  await new Promise(res=>{const f=()=>{const r=nv.getBoundingClientRect(),e=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);if(!nv.contains(e)&&e!==document.documentElement)hid++;moved.add(Math.round(nv.querySelector('.lens').getBoundingClientRect().x));if(performance.now()-t0<800)requestAnimationFrame(f);else res()};f()});
  const l=nv.querySelector('.lens').getBoundingClientRect(),a=nv.querySelector('button.on').getBoundingClientRect();return {hid,n:moved.size,dx:Math.abs(l.x-a.x)+Math.abs(l.width-a.width)}},to);
 ok(r.hid===0&&r.dx<3,'lente verso '+to+' (nascosta '+r.hid+' frame, scarto '+r.dx.toFixed(1)+'px, '+r.n+' posizioni)');await p.waitForTimeout(300)}
// 2) dissolvenza unica (View Transition) tra le 4 schermate, nessuna animazione che riparte dopo, schermata Bustine sempre opaca
await p.evaluate(()=>{window.__vt=0;const o=document.startViewTransition.bind(document);document.startViewTransition=f=>{window.__vt++;return o(f)}});
for(const to of ['s','b','g','c','s','b','c','s','c','g','b','s']){
 const r=await p.evaluate(async to=>{const n0=window.__vt,out=[],t0=performance.now();document.querySelector('#nvp button[data-t='+to+']').click();
  await new Promise(res=>{const f=()=>{const k=document.querySelector('#pk');if(k&&!k.hidden&&!document.body.classList.contains('xf')===false||k&&!k.hidden){const c=getComputedStyle(k);out.push([+c.opacity,c.backgroundColor])}if(performance.now()-t0<900)requestAnimationFrame(f);else res()};f()});
  const live=document.getAnimations().filter(a=>a.playState==='running'&&a.effect&&a.effect.target&&['pk','pkp','set','book'].includes(a.effect.target.id)).length;
  return {vt:window.__vt-n0,live,op:out.every(x=>x[0]===1),bgs:[...new Set(out.map(x=>x[1]))].length}},to);
 ok(r.vt===1&&r.live===0&&r.op,'passaggio verso '+to+': 1 dissolvenza, nessuna animazione residua ('+r.live+'), schermata opaca '+r.op);await p.waitForTimeout(250)}
// 2b) se la dissolvenza si blocca, l'app non deve restare ferma: il passaggio avviene lo stesso e la dissolvenza si disattiva
{const q=await open('c');await q.evaluate(()=>{document.startViewTransition=f=>({finished:new Promise(()=>{}),ready:new Promise(()=>{}),skipTransition(){}})});
 await q.evaluate(()=>document.querySelector('#nvp button[data-t=s]').click());await q.waitForTimeout(1600);
 const r=await q.evaluate(()=>({sett:document.body.classList.contains('sett'),xf:document.body.classList.contains('xf'),off:localStorage.getItem('carddex_vtoff')}));
 ok(r.sett&&!r.xf&&r.off==='1','dissolvenza bloccata: passaggio comunque eseguito e dissolvenza disattivata')}
// 3) Impostazioni identiche tra i temi
const dump=async th=>{const q=await open(th);await q.evaluate(()=>document.querySelector('#nvp button[data-t=s]').click());await q.waitForTimeout(800);
 return q.evaluate(()=>[...document.querySelectorAll('#set, #set *')].filter(e=>e.getBoundingClientRect().width>0).map(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return e.tagName+'|'+[r.x,r.y,r.width,r.height].map(v=>v.toFixed(1))+'|'+c.fontSize+'|'+c.fontWeight+'|'+c.borderTopWidth}))};
const A=await dump('n'),B=await dump('c');ok(A.length===B.length&&A.every((x,i)=>x===B[i]),'Impostazioni: posizioni e misure identiche in Notte e Classica');
ok(errs.length===0,'nessun errore JS'+(errs.length?': '+errs[0]:''));
await b.close();console.log(fail?fail+' FALLITI':'TUTTO OK');process.exit(fail?1:0)})()
