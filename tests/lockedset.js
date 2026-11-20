// scambio: carte di set non sbloccati ingrigite e non selezionabili
const {chromium}=require('playwright');const {mock}=require('./lib_sb.js');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:402,height:874}});p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{const ids=[];for(const co of GCOLS)for(const s of st[co.k]){const c=trCard(s.id);if(c&&trK(c)==="C"&&c.sid&&ids.length<3&&!ids.includes(s.id))ids.push(s.id)}
  FR.u="u2";FR.cl.u2=[trCard(ids[0]).sid];FR.tab="give";const a=frLkd(ids[0],true),b2=frLkd(ids[0],false);
  const sid=trCard(ids[0]).sid;return{a,b2,sid,lk:frLk().length,room:(()=>{FR.co.u2={};return frRoom(ids[0],{my:{[ids[0]]:2},fs:{},G:{},T:{},tg:{},tt:{}})})()}});
ok(r.a===1,'set bloccato per l\'amico: carta mia ingrigita ('+JSON.stringify(r)+')');ok(r.room===0,'non selezionabile');
ok(p.errs.length===0,'nessun errore JS');console.log(bad?bad+' FALLITI':'TUTTO OK');await b.close()})();
