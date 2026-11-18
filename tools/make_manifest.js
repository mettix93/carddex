// Elenca tutti gli indirizzi esterni (immagini carte, retri, figure Pokédex, versi) che l'app usa.
// Uso: node tools/make_manifest.js [file.html]  ->  tools/assets_manifest.json (server su :8765)
const {chromium}=require('playwright'),fs=require('fs');
(async()=>{const f=process.argv[2]||'carddex-album.html';const b=await chromium.launch();const p=await b.newPage();
await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.goto('http://localhost:8765/'+f);await p.waitForTimeout(1500);
const L=await p.evaluate(()=>{const G=new Map();const add=a=>{a=a.filter(u=>/^https?:\/\//.test(u));if(a.length)G.set(a[0],a)};
 const src=h=>{const m=/ src="([^"]+)"/.exec(h||"");return m?m[1].replace(/&amp;/g,"&"):""};
 Object.values(CARDS).forEach(c=>{[0,1].forEach(hi=>{try{add([src(face(c,hi))])}catch(e){}});const bk=c.back;(Array.isArray(bk)?bk:bk?[bk]:[]).forEach(u=>{if(typeof u==="string")add([u])})});
 for(let d=1;d<=386;d++){try{add([dxArt(d)])}catch(e){}try{const u=cryUrls({kd:"p",dex:d});if(u)add(u)}catch(e){}}
 return [...G.values()]});
const seen=new Set(),out=[];L.forEach(a=>{const k=a.join('|');if(!seen.has(k)){seen.add(k);out.push(a)}});
fs.writeFileSync('tools/assets_manifest.json',JSON.stringify(out));
const by={};out.forEach(a=>{const h=new URL(a[0]).host;by[h]=(by[h]||0)+1});console.log(out.length,'voci',by);await b.close()})()
