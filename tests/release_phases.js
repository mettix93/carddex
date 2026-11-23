// uscite a fasi: in App solo i set pubblicati (REL_ON); fasi missioni promo derivate; in Dev tutto aperto
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad=1};
async function run(env,fn,page){const p=await b.newPage({viewport:{width:402,height:874}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('http://localhost:8765/'+(page||'carddex-album.html'));await p.evaluate(e=>{localStorage.setItem('carddex_devok','1');localStorage.setItem('carddex_env',e)},env);await p.reload();await p.waitForTimeout(1800);
 const r=await fn(p);ok(!errs.length,env+': nessun errore JS '+errs.join('|'));await p.close();return r}
const F=()=>({gc:GCOLS.map(c=>c.k).join(),pk:Object.keys(PKSET).join(),dx:DXR.map(r=>r[0]).join(),ph:relPh(),ms:msAll().length,blk:PKBLK.length,lk:{G:pkLk("G"),V:pkLk("V"),R:pkLk("R")}});
const a=await run('app',p=>p.evaluate(F));console.log(JSON.stringify(a));
ok(a.gc==='gB,gJ,gF,gR,gY,gZ,gQ,gS','App: album solo base/Jungle/Fossil/Rocket/Gym/Promo/Topps');
ok(a.pk==='B,J,F,R,Y,Z','App: bustine solo set pubblicati');ok(a.dx==='Kanto','App: Pokédex solo Kanto');
ok(a.ph===2&&a.ms===37,'App: fase 2 (37 missioni: 19+18)');ok(a.blk===6&&a.lk.R===1&&a.lk.G===2&&a.lk.V===3,'Lock a catena: Rocket<-base, Neo1<-Rocket, Neo2<-Neo1');
require('fs').writeFileSync('_rel_gd.html',require('fs').readFileSync('carddex-album.html','utf8').replace('const REL_ON=["B","J","F","R","Y","Z"]','const REL_ON=["B","J","F","R","Y","Z","G","D"]'));
const a3=await run('app',p=>p.evaluate(()=>({ph:relPh(),ms:msAll().length,dx:DXR.map(r=>r[0]).join(),gc:GCOLS.length,pk:Object.keys(PKSET).join()})),'_rel_gd.html');require('fs').unlinkSync('_rel_gd.html');
console.log(JSON.stringify(a3));
const d=await run('dev',p=>p.evaluate(F));console.log(JSON.stringify(d));
ok(d.gc.split(',').length===17&&d.dx==='Kanto,Johto,Hoenn'&&d.pk.split(',').length>=15,'Dev: tutto aperto');
ok(a3.dx==='Kanto,Johto'&&a3.gc===10&&a3.ph===3&&a3.ms===55&&a3.pk==='B,J,F,R,Y,Z,G,D','Con Neo G+D pubblicati: compare Johto, fase 3');
await b.close();process.exit(bad)})();
