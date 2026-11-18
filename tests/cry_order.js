const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await(await b.newContext({serviceWorkers:'block'})).newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
const order=[];await p.route(/pokemonshowdown|PokeAPI/,r=>{order.push(r.request().url().includes('PokeAPI')?'pokeapi':'showdown');r.fulfill({status:404,body:''})});
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1200);
const r=await p.evaluate(async()=>{acUnlock();const b=await cryLoad(["https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/5.ogg","https://play.pokemonshowdown.com/audio/cries/charmeleon.mp3"]);return b===null});
console.log('null atteso (entrambe 404):',r,'ordine richieste:',order.join('>'),'errori:',e.length);await b.close()})()
