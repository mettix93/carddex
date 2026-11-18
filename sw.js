/* CardDex: funziona anche senza rete. Pagina sempre aggiornata se c'è rete, altrimenti l'ultima copia; immagini conservate dopo la prima vista. */
const V="carddex-v1",IMG="carddex-img";
/* Copia locale delle immagini/suoni (cartella img/, creata da tools/archivia_immagini.py): se esiste e l'indirizzo è nell'indice, si usa quella; se manca o fallisce, si va in rete come prima. */
let MIR={};fetch(new URL("img/index.json",self.registration.scope),{cache:"no-cache"}).then(x=>x.ok?x.json():{}).then(j=>{if(j&&typeof j==="object")MIR=j}).catch(()=>{});
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(["./carddex-album.html","./collezione.html","./manifest.webmanifest","./collezione.webmanifest","./icon-192.png"])).catch(()=>{}))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==IMG&&k!=="carddex-topps").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(r,{cache:"no-store"}).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match(/collezione/.test(r.url)?"./collezione.html":"./carddex-album.html"))));return}
  const rem=()=>r.destination==="image"&&r.mode==="no-cors"?caches.open(IMG).then(h=>h.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==="opaque")h.put(r,x.clone());return x}))):fetch(r);
  const lp=MIR[r.url];
  if(lp){const lu=new URL(lp,self.registration.scope).href;e.respondWith(caches.open(IMG).then(h=>h.match(lu).then(m=>m||fetch(lu).then(x=>{if(!x.ok)throw 0;h.put(lu,x.clone());return x}))).catch(rem));return}
  if(r.destination==="image"&&r.mode==="no-cors")e.respondWith(rem())
});
