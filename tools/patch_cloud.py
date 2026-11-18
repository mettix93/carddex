# Semplifica il cloud: unione automatica dei dati, niente "Sincronizza ora", diciture chiare. Applicato a carddex-album.html e collezione.html.
import sys
def patch(path):
    s=open(path).read()
    def rep(x,y):
        nonlocal s
        assert s.count(x)==1,(path,s.count(x),x[:90]);s=s.replace(x,y)
    rep(',snap=cuSnap(),js=JSON.stringify(snap),h=cuH(snap);',';let snap=cuSnap(),h=cuH(snap);')
    # conflitto: unione automatica (mai domande)
    a=s.index('else if(mode!=="push"){fin(u.lr,u.lh);const cn=o=>')
    b=s.index('Se non sei sicuro, tieni quella con più carte.")}',a)+len('Se non sei sicuro, tieni quella con più carte.")}')
    s=s[:a]+'''else if(mode!=="push"){try{localStorage.setItem("carddex_prev",JSON.stringify({ts:Date.now(),data:snap}))}catch(e){}
      bkApplyObj(cuMerge(snap,rm.data));snap=cuSnap();h=cuH(snap);await push();toast("Dati uniti: carte del telefono e del cloud insieme")}'''+s[b:]
    rep('let cuBusy=0;','''/* unione: parte dal lato con più carte e vi aggiunge le carte segnate (e le copie) dell'altro; non toglie mai carte */
function cuMerge(L,R){const cn=o=>(JSON.stringify([o.coll,o.game]).match(/"o":1/g)||[]).length,[B,O]=cn(L)>=cn(R)?[L,R]:[R,L],m=JSON.parse(JSON.stringify(B));
  ["coll","game"].forEach(t=>{const bo=m[t]||(m[t]={}),oo=O[t]||{};Object.keys(oo).forEach(k=>{const ol=oo[k];if(!Array.isArray(ol))return;const bl=bo[k];if(!Array.isArray(bl)){bo[k]=JSON.parse(JSON.stringify(ol));return}
    const pos={},used={};bl.forEach(x=>{if(x&&x.id)(pos[x.id]=pos[x.id]||[]).push(x)});
    ol.forEach(x=>{if(!x||!x.id||!x.o)return;const i=used[x.id]||0;used[x.id]=i+1;const y=(pos[x.id]||[])[i];if(!y)return;if(!y.o)y.o=1;if((x.q||0)>(y.q||0))y.q=x.q;if(x.n&&!y.n)y.n=x.n;if(x.fav&&!y.fav)y.fav=1})})});return m}
let cuBusy=0;''')
    # scheda account più semplice
    rep("""sub=c.er?'Non sincronizzato: '+esc(c.er):!c.ack?'Salva il tuo codice di accesso, serve per ritrovare i dati':(t?'Salvato nel cloud · '+t:'Collegato al cloud');
    rows=R("sy","Sincronizza ora")+R("co","Codice di accesso");""","""sub=c.er?'Non salvato: '+esc(c.er)+' · riprovo da solo':!c.ack?'Salva il tuo codice di accesso, serve per ritrovare i dati':'Tutto salvato nel cloud';
    rows=R("co","Codice di accesso");""")
    rep('rows+=R("hi","Versioni salvate")+R("ex","Esci")}','rows+=R("hi","Cronologia e salvataggio")+R("ex","Esci")}')
    rep('sub="Crea un account per salvare la collezione nel cloud e ritrovarla su un altro telefono";','sub="Salva la tua collezione nel cloud: la ritrovi anche se cambi telefono";')
    rep('const t=c.ts?new Date(c.ts).toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"}):"";sub=','sub=')
    # cronologia: Salva ora + copia prima dell'ultima unione + versioni
    a=s.index('async function cuHist(){');b=s.index('const stKey=()=>',a)
    s=s[:a]+'''async function cuHist(){const u=await cuTok(),f=t=>new Date(t).toLocaleString("it-IT",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});
  let r=[];try{r=await sbReq("/rest/v1/saves_hist?user_id=eq."+u.uid+"&env=eq."+ENV+"&select=data,updated_at,saved_at&order=saved_at.desc&limit=12")||[]}catch(e){}
  const it=[["Salva ora",async()=>{const m=await cuSync("full");toast(m?"Errore: "+m:"Salvato nel cloud")}]];
  let pv=null;try{pv=JSON.parse(localStorage.getItem("carddex_prev"))}catch(e){}
  if(pv&&pv.data)it.push(["Dati di questo telefono prima dell’ultima unione ("+f(pv.ts)+")",()=>confirmSheet("Ripristinare i dati che avevi su questo telefono prima dell’ultima unione? Sostituisce i dati attuali di questo telefono e del cloud.",async()=>{try{bkApplyObj(pv.data);const m=await cuSync("push");toast(m?"Errore: "+m:"Dati ripristinati")}catch(e){toast("Errore: "+(e.message||"ripristino"))}})]);
  r.forEach(x=>it.push(["Versione del "+f(x.updated_at),()=>confirmSheet("Ripristinare la versione del "+f(x.updated_at)+"? Sostituisce i dati attuali di questo telefono e del cloud.",async()=>{try{bkApplyObj(x.data);const m=await cuSync("push");toast(m?"Errore: "+m:"Versione ripristinata")}catch(e){toast("Errore: "+(e.message||"ripristino"))}})]));
  sheet(it,"Cronologia e salvataggio")}
'''+s[b:]
    open(path,'w').write(s)
for p in sys.argv[1:]:patch(p)
