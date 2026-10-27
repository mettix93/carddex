/* CardDex: funziona anche senza rete. Pagina sempre aggiornata se c'è rete, altrimenti l'ultima copia; immagini conservate dopo la prima vista. */
const V="carddex-v1",IMG="carddex-img";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(["./carddex-album.html","./manifest.webmanifest","./icon-192.png"])).catch(()=>{}))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==IMG&&k!=="carddex-topps").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(r,{cache:"no-store"}).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("./carddex-album.html"))));return}
  if(r.destination==="image"&&r.mode==="no-cors"){
    e.respondWith(caches.open(IMG).then(h=>h.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==="opaque")h.put(r,x.clone());return x}))))}
});
