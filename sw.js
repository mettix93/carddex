/* CardDex: funziona anche senza rete. Pagina sempre aggiornata se c'è rete, altrimenti l'ultima copia; immagini conservate dopo la prima vista. */
const V="carddex-v2",IMG="carddex-img";
/* Copia locale delle immagini/suoni (cartella img/, creata da tools/archivia_immagini.py): se esiste e l'indirizzo è nell'indice, si usa quella; se manca o fallisce, si va in rete come prima. */
let MIR={};fetch(new URL("img/index.json",self.registration.scope),{cache:"no-cache"}).then(x=>x.ok?x.json():{}).then(j=>{if(j&&typeof j==="object")MIR=j}).catch(()=>{});
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>Promise.all(["./carddex-album.html","./collezione.html","./manifest.webmanifest","./collezione.webmanifest","./icon-192.png","./icon-512.png","./icon-binder-192.png","./icon-binder-512.png","./apple-touch-icon.png","./apple-touch-icon-binder.png","./img/index.json"].map(u=>c.add(u).catch(()=>{})))).catch(()=>{}))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==IMG&&k!=="carddex-topps").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(r,{cache:"no-store"}).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(h=>h.put(r,c));return x}return caches.match(r,{ignoreSearch:true}).then(m=>m||x)}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match(/collezione/.test(r.url)?"./collezione.html":"./carddex-album.html"))));return}
  const rem=()=>r.destination==="image"&&r.mode==="no-cors"?caches.open(IMG).then(h=>h.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==="opaque")h.put(r,x.clone());return x}))):fetch(r);
  const lp=MIR[r.url];
  if(lp){const lu=new URL(lp,self.registration.scope).href;e.respondWith(caches.open(IMG).then(h=>h.match(lu).then(m=>m||fetch(lu).then(x=>{if(!x.ok)throw 0;h.put(lu,x.clone());return x}))).catch(rem));return}
  if(r.destination==="image"&&r.mode==="no-cors")e.respondWith(rem())
});

/* Uso offline: su richiesta della pagina (solo Wi-Fi) scarica in anticipo, con calma, le immagini/suoni piccoli dell'archivio locale (loghi, icone, versi, sprite): una alla volta, a piccoli blocchi per apertura, e si ferma al primo rifiuto del sito (troppe richieste). Le carte (tcgdex, ~150 MB) restano a "dopo la prima vista". */
self.addEventListener("message",e=>{if(!e.data||e.data.t!=="warm")return;e.waitUntil((async()=>{let n=0,tot=0,done=0;try{
  const j=await fetch(new URL("img/index.json",self.registration.scope)).then(x=>x.json());MIR=j;
  const h=await caches.open(IMG),L=Object.values(j).filter(p=>!/^img\/assets\.tcgdex\.net\//.test(p)).map(p=>new URL(p,self.registration.scope).href);tot=L.length;
  let stop=0;for(const u of L){if(stop||n>=120)break;try{if(await h.match(u))continue;const x=await fetch(u);if(x.ok){await h.put(u,x);n++}else{stop=1;break}}catch(_){stop=1;break}await new Promise(r=>setTimeout(r,350))}
  if(!stop){let miss=0;for(const u of L){if(!(await h.match(u))){miss++;break}}done=miss?0:1}
 }catch(_){}
  const cs=await self.clients.matchAll();cs.forEach(c=>c.postMessage({t:"warmed",n,tot,done}))})())});
