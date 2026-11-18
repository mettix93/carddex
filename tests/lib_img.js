// Fa leggere ai test le immagini e i suoni veri dalla cartella img/ (stessa mappa del service worker) invece di quadratini finti.
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
const IDX=JSON.parse(fs.readFileSync(path.join(root,'img/index.json'),'utf8'));
const TYPES={'.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.mp3':'audio/mpeg','.ogg':'audio/ogg'};
const PIX=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==','base64');
async function mirrorRoute(page,stats){stats=stats||{local:0,miss:0};
  await page.route(/^https?:\/\/(?!localhost)/,r=>{const u=r.request().url(),lp=IDX[u];
    if(lp&&fs.existsSync(path.join(root,lp))){stats.local++;return r.fulfill({status:200,contentType:TYPES[path.extname(lp).toLowerCase()]||'application/octet-stream',headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(path.join(root,lp))})}
    stats.miss++;r.fulfill({status:200,contentType:'image/png',headers:{'access-control-allow-origin':'*'},body:PIX})});return stats}
module.exports={mirrorRoute,IDX};
