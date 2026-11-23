// missioni 41/42 (5 Pokémon per capopalestra, solo carte Pokémon); Pokédex: alternative solo da set giocabili
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
async function open(env){const p=await b.newPage({viewport:{width:402,height:874}});p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));await p.goto('http://localhost:8765/carddex-album.html');await p.evaluate(e=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env',e)},env);await p.reload();await p.waitForTimeout(1800);return p}
let p=await open('dev');
let r=await p.evaluate(()=>{const g=n=>MSB.find(m=>m.num===n);
 const own=re=>{Object.values(CARDS).filter(c=>(c.sid==="Y"||c.sid==="Z")&&re.test(c.name)&&c.kd==="p").slice(0,9).forEach(c=>{const e=st["g"+c.sid].find(x=>x.id===c.id);if(e){e.o=1}})};
 const tr=Object.values(CARDS).filter(c=>(c.sid==="Y"||c.sid==="Z")&&/Brock|Misty|Lt\. Surge|Erika/.test(c.name)&&c.kd==="t").length;
 const n0=g(41).n();own(/Brock/);own(/Misty/);const n1=g(41).n();return {d41:g(41).d,d42:g(42).d,N41:g(41).N(),N42:g(42).N(),n0,n1,tr}});
console.log(JSON.stringify(r));
ok(r.d41==='Completa 5 carte Pokémon ciascuno di Brock, Misty, Lt. Surge ed Erika.'&&r.d42==='Completa 5 carte Pokémon ciascuno di Koga, Sabrina, Blaine e Giovanni.','Testi missioni 41 e 42');
ok(r.N41===20&&r.N42===20,'Obiettivo 20 (4 x 5)');ok(r.n1>r.n0&&r.n1<=10,'Conta solo carte Pokémon, max 5 per allenatore ('+r.n1+')');
await p.close();
p=await open('app');
r=await p.evaluate(()=>{const D=dxData();const pick=d=>{const {cand}=dxScope(D,d);return cand.map(c=>c.sid).join("")};
 const lk=pkLk("R");const a=pick(52);
 // sblocco simulato
 const U={1:{t:1,s:1,m:1}};ulSet(U);const b2=dxScope(dxData(),52).cand.map(c=>c.sid).join("");
 const hidden=Object.values(CARDS).filter(c=>c.kd==="p"&&"GDVTHIKMN".includes(c.sid)).length>0&&dxScope(dxData(),52).cand.every(c=>"BJFRYZQ".includes(c.sid));
 return {lk,a,b2,hidden}});
console.log(JSON.stringify(r));
ok(r.lk===1&&!/[R]/.test(r.a),'App: Rocket bloccato -> le sue carte non compaiono tra le alternative ('+r.a+')');
ok(/R/.test(r.b2)&&r.hidden,'Dopo lo sblocco compaiono quelle di Rocket; Neo/EX sempre nascosti ('+r.b2+')');
ok(!p.errs.length,'nessun errore JS '+p.errs.join('|'));await b.close();process.exit(bad)})();
