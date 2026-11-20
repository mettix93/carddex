// ricerca dentro Preferiti: solo tra i preferiti
const {chromium}=require('playwright');const {mock}=require('./lib_sb.js');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);
const nm=await p.evaluate(()=>{let k=0,n1,n2;for(const co of GCOLS){for(const s of st[co.k]){if(s.id&&k<30){s.o=1;s.q=1;if(k<5){s.fav=1;n1=n1||CARDS[s.id].name}else if(!n2&&CARDS[s.id].name!==n1)n2=CARDS[s.id].name;k++}}}save();return [n1,n2]});
await p.evaluate(()=>aslOpen());await p.waitForTimeout(700);await p.click('.asc[data-m=f]');await p.waitForTimeout(1000);
ok(await p.evaluate(()=>getComputedStyle(document.querySelector('#sq')).display!=='none'),'tasto cerca visibile in Preferiti');
const r=await p.evaluate(q=>{doSearch(q);return {n:SR.length,all:SR.every(x=>x.c==='zPF'),cur,pfm:PFM}},nm[0].split(' ')[0]);
ok(r.n>=1&&r.all&&r.pfm===1,'ricerca solo tra i preferiti '+JSON.stringify(r));
const r2=await p.evaluate(q=>{doSearch(q);return SR.length},nm[1].split(' ')[0]);console.log('non-fav term hits',r2);
await p.evaluate(()=>exitSearch());await p.waitForTimeout(500);
ok(await p.evaluate(()=>cur==='zPF'&&PFM===1),'esci dalla ricerca: torno in Preferiti');
ok(!errs.length,'nessun errore '+errs.join('|'));await b.close();process.exit(bad?1:0)})();
