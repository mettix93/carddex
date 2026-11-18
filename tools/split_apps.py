# Genera collezione.html (solo collezione) e aggiorna carddex-album.html (senza collezione) dalla base v406.
import sys,re
base=open(sys.argv[1]).read()
def mk(app):
    s=base
    def rep(x,y,n=1):
        nonlocal s
        c=s.count(x)
        assert c==n,(app,c,x[:90])
        s=s.replace(x,y)
    col=app=="col"
    # --- identità app
    marker='<script>\n/* diagnostica: ogni errore'
    shim=r'''<script>
const APPK="%s";
%s
/* diagnostica: ogni errore''' % (app, r'''(function(){if(APPK!=="col")return;
  /* Collezione: chiavi proprie (prefisso col_) così non si mescola a CardDex; al primo avvio copia i dati della collezione già segnati */
  const P="col_",S=Storage.prototype,g=S.getItem,st=S.setItem,rm=S.removeItem,kf=S.key,L=window.localStorage;
  try{if(!g.call(L,P+"imp")){
    const keep=/^(carddex2(a|u)?(_d)?|carddex_(rar|pgc|itt|itn|hidx)(_d)?|carddex_bch(_a)?|carddex_user|carddex_theme|carddex_cry|carddex_luce|carddex_devok|carddex_env)$/;
    const ks=[];for(let i=0;i<L.length;i++)ks.push(kf.call(L,i));
    ks.forEach(k=>{if(keep.test(k)&&g.call(L,P+k)===null)st.call(L,P+k,g.call(L,k))});
    st.call(L,P+"imp","1")}}catch(e){}
  S.getItem=function(k){return this===L||this===window.sessionStorage?g.call(this,P+k):g.call(this,k)};
  S.setItem=function(k,v){return this===L||this===window.sessionStorage?st.call(this,P+k,v):st.call(this,k,v)};
  S.removeItem=function(k){return this===L||this===window.sessionStorage?rm.call(this,P+k):rm.call(this,k)};
})();''')
    rep(marker,shim)
    if col:
        rep('<link rel="manifest" href="manifest.webmanifest">','<link rel="manifest" href="collezione.webmanifest">')
        rep('<title>CardDex</title>','<title>Collezione</title>')
        s=s.replace('const APPV="v406";','const APPV="c3";')
        # solo modalità collezione, niente bustine
        rep('let MODE=(()=>{try{return sessionStorage.getItem("cdmode")||localStorage.getItem("carddex_last")||"c"}catch(e){return"c"}})()','let MODE="c"')
        rep('function setMode(m,keep){if(m===MODE)return;','function setMode(m,keep){if(m===MODE||(APPK==="col"&&m==="g"))return;')
        rep('try{NAVB=1;document.body.classList.add("pkNv");setMode("g");pkScreen();navSync()}catch(e){errRep(e,"avvio 2")}','')
        rep('return \'<i class="lens"></i>\'+B("b","Bustine",PKI0,"")+S+B("c","Album",ALI)','return \'<i class="lens"></i>\'+B("c","Album",ALI)')
        rep('if(t==="m"||t==="a")t=t==="a"?MODE:"b";','if(t==="m"||t==="a")t=t==="a"?MODE:"b";if(t==="b")return;')
        # Pokédex: solo carte della collezione
        rep('let DXS=(()=>{try{return localStorage.getItem("carddex_dxs2")||"g"}catch(e){return"g"}})()','let DXS="c"')
        # statistiche: solo carte uniche e set completati (dalla collezione)
        rep("return '<div class=\"stg\">'+T(o.p||0,\"Bustine aperte\")+T(o.c||0,\"Carte ottenute\")+T(stUniq(),\"Carte uniche\",tt.sl)+T(stSets(),\"Set completati\",tt.st)+'</div>'}",
            "const q=stCol();return '<div class=\"stg stg2\">'+T(q.n,\"Carte uniche\",q.t)+T(q.sets,\"Set completati\",q.ts)+'</div>'}\nfunction stCol(){const raw=dxRaw(\"c\"),ids=new Set(),own=new Set();let sets=0,ts=0;try{PCOLS.forEach(a=>{const L=raw[a.k]||[];if(!L.length)return;ts++;let all=true;L.forEach(x=>{if(!x||!x.id){all=false;return}ids.add(x.id);if(x.o)own.add(x.id);else all=false});if(all)sets++})}catch(e){}return{n:own.size,t:ids.size,sets,ts}}")
        rep('.stg{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:14px 0 4px}','.stg{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:14px 0 4px}.stg2{grid-template-columns:repeat(2,1fr)}')
        # cloud: riga propria
        rep('const SBU="https://umhfivxekjfqsydxgcni.supabase.co"','const ENVC=APPK==="col"?"col"+(ENV==="dev"?"_d":""):ENV,SBU="https://umhfivxekjfqsydxgcni.supabase.co"')
        rep('const u=await cuTok(),env=ENV,snap=cuSnap()','const u=await cuTok(),env=ENVC,snap=cuSnap()')
        rep('&env=eq."+ENV+"&select=data,updated_at,saved_at','&env=eq."+ENVC+"&select=data,updated_at,saved_at')
        # primo accesso: se la riga cloud della Collezione è vuota, carica la collezione dalla riga di CardDex
        rep('    if(!rm)await push();\n','''    if(APPK==="col"&&!mine&&(!rm||!/"o":1/.test(JSON.stringify([rm.data&&rm.data.coll])))){
      const src=await sbReq("/rest/v1/saves?user_id=eq."+u.uid+"&env=eq."+ENV+"&select=data"),sd=src&&src[0]&&src[0].data;
      if(sd&&/"o":1/.test(JSON.stringify(sd.coll||{}))){bkApplyObj({...sd,game:{},pk:undefined,ms:undefined,stats:undefined,bch:(sd.bch||[]).filter(b=>b&&b.o==="c")});toast("Collezione caricata da CardDex");cuBusy=0;return await cuSync(mode)}}
    if(!rm)await push();\n''')
        # import manuale dal cloud di CardDex (mostra quante carte ci sono) e bacheche solo della collezione
        rep('<button class="row act" data-a="bke">Esporta backup</button>','<button class="row act" data-a="cdi">Carica da CardDex (cloud)</button><button class="row act" data-a="bke">Esporta backup</button>')
        rep('else if(a==="bke")bkExport();','else if(a==="cdi")cdImport();else if(a==="bke")bkExport();')
        rep('if(Array.isArray(j.bch)){BCH=j.bch.filter(b=>b&&b.id&&b.sz>=1&&b.sz<=3&&Array.isArray(b.cards)).slice(0,3);bcSave()}','if(Array.isArray(j.bch)){BCH=j.bch.filter(b=>b&&b.id&&b.sz>=1&&b.sz<=3&&Array.isArray(b.cards)&&b.o!=="g").slice(0,3);bcSave()}')
        rep('function cuUi(){','''async function cdImport(){try{const u=await cuTok(),src=await sbReq("/rest/v1/saves?user_id=eq."+u.uid+"&env=eq."+ENV+"&select=data,updated_at"),r=src&&src[0];
  if(!r){toast("Nel cloud di CardDex non c’è nulla per questo account");return}
  const sd=r.data||{},cnt=o=>(JSON.stringify(o||{}).match(/"o":1/g)||[]).length,n=cnt(sd.coll),m=cnt(dxRaw("c")),d=new Date(r.updated_at),dt=d.toLocaleDateString("it-IT",{day:"numeric",month:"short"})+" "+d.toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"});
  if(!n){sheet([],"Nel cloud di CardDex non ci sono carte della collezione (ultimo salvataggio "+dt+"). Usa «Esporta backup» da CardDex e «Importa backup» qui.");return}
  confirmSheet("Nel cloud di CardDex ci sono "+n+" carte segnate (salvate il "+dt+"). Qui ne hai "+m+". Caricare quelle di CardDex al posto di queste?",()=>{try{bkApplyObj({...sd,game:{},pk:undefined,ms:undefined,stats:undefined});toast("Caricate "+n+" carte");cuSync("push")}catch(e){toast("Errore nel caricamento")}})}catch(e){toast(e.message||"Errore")}}
function cuUi(){''')
        # bacheche: solo carte della collezione
        rep('let M=ed?{nm:ed.nm,st:ed.st}:{nm:"Bacheca "+(BCH.length+1),o:"g",al:null,st:"g",sz:1};','let M=ed?{nm:ed.nm,st:ed.st}:{nm:"Bacheca "+(BCH.length+1),o:"c",al:null,st:"g",sz:1};')
        rep('<label>Carte da</label>${seg("o",[["g","Album bustine"],["c","Collezione"]])}${M.o==="c"?`<button class="bcal">','<label>Album</label>${M.o==="c"?`<button class="bcal">')
        # niente scelta modalità: tolgo la voce «Album bustine» dal selettore Album
        rep('<button class="asc" data-m="g"><span class="aic">\'+PKI+\'</span><div><b>Album bustine</b><span>Le carte che ottieni aprendo le bustine, set per set.</span></div></button>','')
        s=s.replace('#acx{','#acx{',1)
        s=s.replace('</style>','html body #acx{display:none!important}</style>',1)
    else:
        # CardDex senza collezione personale
        rep('let MODE=(()=>{try{return sessionStorage.getItem("cdmode")||localStorage.getItem("carddex_last")||"c"}catch(e){return"c"}})()','let MODE="g"')
        s=s.replace('const APPV="v406";','const APPV="v407";')
        rep('function setMode(m,keep){if(m===MODE)return;','function setMode(m,keep){if(m===MODE||m==="c")return;')
        rep('try{if(MODE!=="c")setMode("c");NAVB=0;navSync()}catch(e){errRep(e,"avvio 1")}','')
        rep('let DXS=(()=>{try{return localStorage.getItem("carddex_dxs2")||"g"}catch(e){return"g"}})()','let DXS="g"')
        rep('<button class="asc" data-m="c"><span class="aic">\'+ALI+\'</span><div><b>Collezione personale</b><span>Le tue carte reali: segna quelle che possiedi.</span></div></button>','')
        rep('let BCH=(()=>{try{const a=JSON.parse(localStorage.getItem(GK("carddex_bch")));return Array.isArray(a)?a.filter(b=>b&&b.id&&b.sz>=1&&b.sz<=3&&Array.isArray(b.cards)).slice(0,3):[]}catch(e){return[]}})();',
            'let BCHX=[];let BCH=(()=>{try{const a=JSON.parse(localStorage.getItem(GK("carddex_bch")));if(!Array.isArray(a))return[];const v=a.filter(b=>b&&b.id&&b.sz>=1&&b.sz<=3&&Array.isArray(b.cards));BCHX=v.filter(b=>b.o==="c");return v.filter(b=>b.o!=="c").slice(0,3)}catch(e){return[]}})();')
        rep('const bcSave=()=>{try{localStorage.setItem(GK("carddex_bch"),JSON.stringify(BCH))}catch(e){}};','const bcSave=()=>{try{localStorage.setItem(GK("carddex_bch"),JSON.stringify(BCH.concat(BCHX)))}catch(e){}};')
        rep('<label>Carte da</label>${seg("o",[["g","Album bustine"],["c","Collezione"]])}${M.o==="c"?`<button class="bcal">${M.al?"Album: "+esc(bcAlN(M.al)):"Scegli l’album…"} ›</button>`:""}','')
    rep('sostituisce lo stato attuale di entrambi gli album (Collezione e Gioco) e delle bustine. I backup vecchi sostituiscono solo questo album.','sostituisce lo stato attuale '+('della collezione.' if col else 'dell’album e delle bustine.'))
    # filtro Pokédex: nessuna scelta «Carte: ...»
    rep('S=[["g","Album"],["c","Collezione"],["t","Entrambi"]];','S=[];')
    rep('$("#ft").classList.toggle("on",DXF!=="a"||DXS!=="t");','$("#ft").classList.toggle("on",DXF!=="a");')
    return s
open(sys.argv[2],"w").write(mk(sys.argv[3]) if False else mk("col"))
open(sys.argv[4],"w").write(mk("cd"))
