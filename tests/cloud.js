const {chromium}=require('playwright');
const DB={users:{},saves:{}};let N=0;
function mock(p){return p.route(/supabase\.co/,async r=>{const q=r.request(),u=new URL(q.url()),m=q.method(),b=q.postData()?JSON.parse(q.postData()):null,H=q.headers();const J=(o,s=200)=>r.fulfill({status:s,contentType:"application/json",body:JSON.stringify(o)});
 if(u.pathname==="/auth/v1/signup"){const id="uid"+(++N);DB.users[b.email]={id,pw:b.password};return J({access_token:"t."+id,refresh_token:"r."+id,expires_in:3600,user:{id}})}
 if(u.pathname==="/auth/v1/token"){const g=u.searchParams.get("grant_type");if(g==="password"){const x=DB.users[b.email];if(!x||x.pw!==b.password)return J({error_description:"Invalid login credentials"},400);return J({access_token:"t."+x.id,refresh_token:"r."+x.id,expires_in:3600,user:{id:x.id}})}return J({access_token:"t2",refresh_token:b.refresh_token,expires_in:3600})}
 if(u.pathname==="/rest/v1/saves_hist"){return J([{data:DB.saves[Object.keys(DB.saves)[0]].data,updated_at:new Date(Date.now()-3600e3).toISOString(),saved_at:new Date().toISOString()}])}
 if(u.pathname==="/rest/v1/saves"){const au=H.authorization||"";if(!au.startsWith("Bearer t."))return J({message:"no auth"},401);const uid=au.slice(9);
  if(m==="GET"){const k=u.searchParams.get("user_id").slice(3)+"|"+u.searchParams.get("env").slice(3);const r0=DB.saves[k];return J(r0?[{data:r0.data,updated_at:r0.updated_at}]:[])}
  if(m==="POST"){if(b.user_id!==uid)return J({message:"rls"},403);const jb=v=>Array.isArray(v)?v.map(jb):v&&typeof v==="object"?Object.keys(v).sort((a,b)=>a.length-b.length||(a<b?-1:1)).reduce((o,k)=>(o[k]=jb(v[k]),o),{}):v;DB.saves[b.user_id+"|"+b.env]={data:jb(b.data),updated_at:b.updated_at};return r.fulfill({status:201,body:""})}}
 return J({error:"x"},404)})}
async function ctx(b){const c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g'});await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);await p.evaluate(()=>document.querySelector('#nvp button[data-t=s]').click());await p.waitForTimeout(700);return p}
(async()=>{const b=await chromium.launch();
 const A=await ctx(b);
 // owned card on A
 await A.evaluate(()=>{const raw=Object.values(st)[0];raw.slice(0,3).forEach(x=>{if(x&&x.id)x.o=1});save()});
 await A.fill('#unm','Matteo');await A.dispatchEvent('#unm','change');
 await A.click('button[data-u=cr]');await A.waitForTimeout(1200);
 const code=await A.evaluate(()=>cuGet().code);
 console.log('A creato',await A.evaluate(()=>({code:cuGet().code,er:cuGet().er,ts:!!cuGet().ts,shown:!!document.querySelector('.ucc b')})),Object.keys(DB.saves));
 // A: esci e rientra con gli stessi dati: nessun dialogo
 await A.evaluate(()=>{cuSet(null)});await A.evaluate(()=>cuUi());await A.click('button[data-u=lg]');await A.fill('#ulc',code);await A.click('button[data-u=go]');await A.waitForTimeout(1500);
 console.log('A rientro, dialogo?',await A.evaluate(()=>/Tieni questo telefono/.test(document.body.innerText)),await A.evaluate(()=>!!cuGet()&&!!cuGet().lr));
 // B login
 const B=await ctx(b);
 await B.click('button[data-u=lg]');await B.fill('#ulc','sbagliato-codice1');await B.click('button[data-u=go]');await B.waitForTimeout(600);
 console.log('B codice errato:',await B.evaluate(()=>document.body.innerText.match(/Codice non valido|16 caratteri/)+""));
 await B.fill('#ulc',code.replace(/(.{4})(?=.)/g,'$1-').toLowerCase());await B.click('button[data-u=go]');await B.waitForTimeout(1500);
 console.log('B login',await B.evaluate(()=>({own:Object.values(st)[0].filter(x=>x&&x.o).length,name:usrGet().n,lr:!!cuGet().lr})),B.errs);
 // B changes -> push; A pull
 await B.evaluate(()=>{const raw=Object.values(st)[0];raw.slice(3,6).forEach(x=>{if(x&&x.id)x.o=1});save();cuSync("push")});await B.waitForTimeout(800);
 await A.evaluate(()=>cuSync("full"));await A.waitForTimeout(1200);
 console.log('A dopo pull',await A.evaluate(()=>Object.values(st)[0].filter(x=>x&&x.o).length));
 // conflict
 await A.evaluate(()=>{const raw=Object.values(st)[0];raw[7]&&(raw[7].o=1);save()});
 await B.evaluate(()=>{const raw=Object.values(st)[0];raw[8]&&(raw[8].o=1);save();cuSync("push")});await B.waitForTimeout(600);
 await A.evaluate(()=>cuSync("full"));await A.waitForTimeout(800);
 console.log('conflitto: dialogo?',await A.evaluate(()=>/Tieni questo telefono|Usa il cloud/.test(document.body.innerText)),'unione A (7 e 8 segnate):',await A.evaluate(()=>{const r=Object.values(st)[0];return !!(r[7]&&r[7].o&&r[8]&&r[8].o)}),'cloud:',(()=>{const r=Object.values(Object.values(DB.saves)[0].data.game||{})[0]||[];return !!(r[7]&&r[7].o&&r[8]&&r[8].o)})(),'copia di sicurezza:',await A.evaluate(()=>!!localStorage.getItem('carddex_prev')),'toast:',await A.evaluate(()=>/Dati uniti/.test(document.body.innerText)));
 await A.evaluate(()=>{document.querySelectorAll('.sb, #sh').forEach(x=>0)});
 const ack0=await A.evaluate(()=>({ack:cuGet().ack,warn:/Salva il tuo codice/.test(document.body.innerText)}));
 await A.evaluate(()=>{USV="code";cuUi()});await A.evaluate(()=>document.querySelector('button[data-u=ok]').click());await A.waitForTimeout(300);
 console.log('ack',ack0,await A.evaluate(()=>cuGet().ack));
 await A.evaluate(()=>document.querySelector('button[data-u=hi]')||0);await A.evaluate(()=>document.querySelector('button[data-u=hi]').click());await A.waitForTimeout(700);
 console.log('storico sheet:',await A.evaluate(()=>/Salva ora/.test(document.body.innerText)&&/Versione del/.test(document.body.innerText)&&/prima dell’ultima unione/.test(document.body.innerText)),'bottone Sincronizza assente:',await A.evaluate(()=>!document.querySelector('button[data-u=sy]')));
 console.log(A.errs,B.errs);await b.close()})()
