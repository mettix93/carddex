// set non pubblicati (App): le missioni "tutte le carte" usano il totale vero, niente completamento anticipato; nessuna carta fantasma nei CARDS
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
async function open(env){const p=await b.newPage({viewport:{width:402,height:874}});p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(e=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env',e)},env);await p.reload();await p.waitForTimeout(1800);return p}
const f=p=>p.evaluate(()=>{const g=n=>MSB.find(m=>m.num===n);const before=Object.keys(CARDS).length;const r={N54:g(54).N(),n54:g(54).n(),N52:g(52).N(),N38:g(38).N(),after:0};const L=Object.keys(CARDS).length;r.same=before===L;r.neo=Object.values(CARDS).filter(c=>"GDVT".includes(c.sid)).length;return r});
const a=await open('app'),d=await open('dev');
const ra=await f(a),rd=await f(d);console.log(JSON.stringify(ra),JSON.stringify(rd));
ok(ra.N54===rd.N54&&ra.N54>0&&ra.N52===rd.N52&&ra.N38===rd.N38,'App: obiettivi delle missioni Neo uguali a Dev (totale vero, '+ra.N54+')');
ok(ra.n54===0,'App: nessun progresso falso');ok(ra.same,'CARDS invariato dopo il calcolo dei contatori');
ok(!a.errs.length&&!d.errs.length,'nessun errore JS');await b.close();process.exit(bad)})();
