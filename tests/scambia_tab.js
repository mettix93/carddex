// schermata Converti/Scambia: «Scambia» apre Amici; da lì «Scambio con codice» apre il vecchio scambio a codici
const {chromium}=require('playwright');const {mock}=require('./lib_sb.js');
let bad=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)bad++};
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:402,height:874},serviceWorkers:'block'}),p=await c.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.route(/^https?:\/\/(?!localhost|.*supabase)/,r=>r.abort());await mock(p);await p.addInitScript(()=>{sessionStorage.cdmode='g';localStorage.setItem('carddex_env','app')});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
await p.evaluate(()=>cvOpen());await p.waitForTimeout(500);
const tabs=await p.evaluate(()=>[...document.querySelectorAll('#cvs .cvtb button')].map(b=>b.textContent.trim()));ok(tabs.join()==='Converti,Scambia','schede: '+tabs);
await p.click('#cvs .cvtb button[data-m=f]');await p.waitForTimeout(500);
ok(await p.evaluate(()=>!document.querySelector('#frm').hidden&&/account nel cloud/.test(document.querySelector('#frm').innerText)),'senza account: Amici chiede di creare l\'account');
// con account
await p.evaluate(()=>document.querySelector('#frm').hidden=true);
await p.evaluate(()=>{document.querySelector('#cvs').hidden=true;document.querySelector('#nvp button[data-t=s]').click()});await p.waitForTimeout(800);
await p.fill('#unm','Anna');await p.dispatchEvent('#unm','change');await p.click('button[data-u=cr]');await p.waitForTimeout(1300);
await p.evaluate(()=>cvOpen());await p.waitForTimeout(400);await p.click('#cvs .cvtb button[data-m=f]');await p.waitForTimeout(1500);
ok(await p.evaluate(()=>/Posta/.test(document.querySelector('#frm').innerText)&&/Scegli un amico/i.test(document.querySelector('#frm').innerText)&&!/Il tuo codice amico/.test(document.querySelector('#frm').innerText)),'Scambia: Posta e lista amici (la gestione è in Account)');
await p.click('#frm [data-a=cod]');await p.waitForTimeout(500);
ok(await p.evaluate(()=>document.querySelector('#frm').hidden&&document.querySelector('#cvs').classList.contains('tr')&&document.querySelector('#cvs .cvtb button[data-m=f]').classList.contains('on')),'«Scambio con codice»: vecchia schermata, scheda Scambia evidenziata');
await p.evaluate(()=>{document.querySelector('#cvs').hidden=true;document.querySelector('#nvp button[data-t=s]').click()});await p.waitForTimeout(800);await p.click('button[data-u=fr]');await p.waitForTimeout(1200);
ok(await p.evaluate(()=>/Il tuo codice amico/.test(document.querySelector('#frm').innerText)&&/I tuoi amici/i.test(document.querySelector('#frm').innerText)),'Account › Gestione amici: codice, aggiungi, elenco');
await p.evaluate(()=>{document.querySelector('#frm').hidden=true;cvOpen()});await p.waitForTimeout(400);await p.click('#cvs .cvtb button[data-m=c]');await p.waitForTimeout(400);
ok(await p.evaluate(()=>!document.querySelector('#cvs').classList.contains('tr')),'si torna a Converti');
ok(!er.length,'nessun errore JS '+er.join('|'));
await b.close();console.log(bad?bad+' FALLITI':'TUTTO OK');process.exit(bad?1:0)})();
