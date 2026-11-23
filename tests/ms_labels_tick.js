// etichetta set nelle missioni Collezionista/Unown, bordo blu su missioni da riscattare, tick bustine
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:402,height:874}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(()=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env','dev')});await p.reload();await p.waitForTimeout(1800);
const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)process.exitCode=1};
await p.evaluate(()=>msBuild());await p.waitForTimeout(500);
const t=await p.evaluate(()=>[...document.querySelectorAll('#msp .msi')].map(e=>e.innerText.replace(/\s+/g,' ')).filter(x=>/Collezionista|incantesimo/.test(x)));
console.log(t.join('\n'));
ok(t.length===2&&t.every(x=>/(Base|Giungla|Jungle|Fossil|Neo \w+) · \d+ \/ \d+/.test(x)),'contatori con nome del set');
const bd=await p.evaluate(()=>{msDev3();msDev3();msDev3();msBuild();const e=document.querySelector('#msp .msi.cl');return e?getComputedStyle(e).borderColor:null});
ok(bd==='rgb(10, 132, 255)','bordo blu su missione da riscattare: '+bd);
await p.evaluate(()=>{window.__s=[];const o=window.sfx;window.sfx=function(n,d){window.__s.push(n);return o.apply(this,arguments)}});
await p.evaluate(()=>{document.getElementById('msp').hidden=true;pkCarGo(pkCPos+3,null,1)});await p.waitForTimeout(2200);
const s=await p.evaluate(()=>window.__s);console.log(s.length,'tick');const tk=s.filter(x=>/^tick/.test(x));ok(tk.length>=2&&tk.every(x=>x==="tickC"),'tick durante la rotazione del carosello');
// cambio set: nessun tic
await p.evaluate(()=>{window.__s=[];const b=document.querySelector('#pkst .tab[data-s="J"]');if(b)b.click()});await p.waitForTimeout(1800);
const tk2=(await p.evaluate(()=>window.__s)).filter(x=>/^tick/.test(x));ok(tk2.length===0,'cambio set senza tic ('+tk2.length+')');
await p.evaluate(()=>{window.__s=[];pkCarGo(2,null,0,1)});await p.waitForTimeout(900);
ok((await p.evaluate(()=>window.__s)).filter(x=>/^tick/.test(x)).length===0,'spostamento da codice (quiet) senza tic');
ok(!errs.length,'nessun errore JS '+errs.join('|'));await b.close()})();
