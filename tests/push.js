// notifiche: riga in Account, attivazione/disattivazione con servizi finti
const {chromium}=require('playwright');const {DB,mock}=require('./lib_sb.js');let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:402,height:874}});p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);
const rows=[];await p.route(/supabase\.co\/rest\/v1\/push_subs/,r=>{rows.push(r.request().method()+' '+(r.request().postData()||''));r.fulfill({status:204,headers:{'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'}})});
await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app');
  let sub=null;const reg={pushManager:{getSubscription:async()=>sub,subscribe:async o=>{sub={toJSON:()=>({endpoint:'https://push.example/abc',keys:{p256dh:'P',auth:'A'}}),unsubscribe:async()=>{sub=null;return true}};return sub}}};
  Object.defineProperty(navigator,'serviceWorker',{value:{ready:Promise.resolve(reg),register:()=>Promise.resolve(reg),addEventListener(){}},configurable:true});
  window.PushManager=function(){};window.Notification={permission:'default',requestPermission:async()=>{window.Notification.permission='granted';return 'granted'}};
  Object.defineProperty(navigator,'standalone',{value:true,configurable:true})});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);
await p.evaluate(()=>document.querySelector('#nvp button[data-t=s]').click());await p.waitForTimeout(600);await p.fill('#unm','Anna');await p.dispatchEvent('#unm','change');await p.selectOption('#ubdd','15');await p.selectOption('#ubdm','6');await p.click('button[data-u=cr]');await p.waitForTimeout(1500);
await p.evaluate(()=>pnRefresh());await p.waitForTimeout(500);
ok(await p.evaluate(()=>/Notifiche/.test(document.querySelector('#set').innerText)&&document.querySelector('#set .sw[data-a=pn]').getAttribute('aria-checked')==='false'),'riga Notifiche: disattivate');
await p.click('#set .sw[data-a=pn]');await p.waitForTimeout(800);
ok(await p.evaluate(()=>document.querySelector('#set .sw[data-a=pn]').getAttribute('aria-checked')==='true'),'attivate');ok(rows.some(x=>/^POST .*abc/.test(x)),'iscrizione salvata');
await p.click('#set .sw[data-a=pn]');await p.waitForTimeout(800);
ok(await p.evaluate(()=>document.querySelector('#set .sw[data-a=pn]').getAttribute('aria-checked')==='false')&&rows.some(x=>/^DELETE/.test(x)),'disattivate e rimosse');
ok(p.errs.length===0,'nessun errore JS '+p.errs.join('|'));console.log(bad?bad+' FALLITI':'TUTTO OK');await b.close()})();
