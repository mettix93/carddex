// Renderizza i suoni ATTUALI dell'app (stesso codice dell'app, via OfflineAudioContext) in WAV, normalizzati a 0.75
const {chromium}=require('playwright');const fs=require('fs');
const LIST={'01a_nuova':['nuova',.8],'02a_rara':['rare',1.1],'03a_holo':['holo',1.6],'04a_scan_pokedex':['scan',2.4],'05a_atterraggio':['land',.8],'06a_pagina':['page',.5],'07a_swipe':['swipe',.22],'08a_ottenuta':['own',.45],'09a_preferito':['fav',.5],'10a_non_preferito':['unfav',.3],'11a_moneta':['coin',.6],'12a_guadagno':['gain',.9],
'13a_taglio_busta':['rip',1.1],'14a_sblocco':['lkc',1.2],'15a_sblocco_oro':['gdc',2.2],'16a_scambio_partenza':['trs',.8],'17a_scambio_attesa':['trw',2.2],'18a_scambio_lampo':['trf',1.0],'19a_scambio_fanfara':['trj',3.2]};
(async()=>{const out=process.argv[2];fs.mkdirSync(out,{recursive:true});const b=await chromium.launch();const p=await b.newPage();
await p.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await p.goto('http://localhost:8765/carddex-album.html');await p.waitForTimeout(1500);
for(const [name,[sfx,dur]] of Object.entries(LIST)){
 const arr=await p.evaluate(async([n,d])=>{const SR=44100;const oc=new OfflineAudioContext(1,Math.ceil(SR*d),SR);const old=AC;AC=oc;SFXN.b=null;try{SFX[n](0)}catch(e){return null}const r=await oc.startRendering();AC=old;SFXN.b=null;return Array.from(r.getChannelData(0))},[sfx,dur]);
 if(!arr){console.log('skip',name);continue}
 let m=0;for(const v of arr)m=Math.max(m,Math.abs(v));const f=Math.round(.01*44100);const o=Int16Array.from(arr.map((v,i)=>{let x=v/(m||1)*.75;if(i>=arr.length-f)x*=(arr.length-i)/f;return Math.round(x*32767)}));
 const h=Buffer.alloc(44);h.write('RIFF',0);h.writeUInt32LE(36+o.length*2,4);h.write('WAVEfmt ',8);h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);h.writeUInt32LE(44100,24);h.writeUInt32LE(88200,28);h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(o.length*2,40);
 fs.writeFileSync(out+'/'+name+'_ATTUALE.wav',Buffer.concat([h,Buffer.from(o.buffer)]));console.log('ok',name)}
await b.close()})();
