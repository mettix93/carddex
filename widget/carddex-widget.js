// CardDex widget per l'app Scriptable: una carta ottenuta al giorno (cambia a mezzanotte).
// Prima volta: in CardDex, menu ••• > "Esporta carte per il widget" > "Salva su File" > iCloud Drive > cartella Scriptable.
const fm = FileManager.iCloud();
const path = fm.joinPath(fm.documentsDirectory(), "carddex-widget.json");
const now = new Date();
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const day = Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / 86400000);
const rnd = (n) => { let x = Math.sin(day * 9301 + n * 49297) * 233280; return x - Math.floor(x); };
const w = new ListWidget();
w.url = "https://mettix93.github.io/carddex/carddex-album.html";
w.refreshAfterDate = midnight;
w.setPadding(0, 0, 0, 0);
const fam = config.widgetFamily || "small";
const S = fam === "medium" ? new Size(720, 340) : fam === "large" ? new Size(720, 760) : new Size(340, 340);
function hex(h, a) { h = h.replace("#", ""); return new Color(h, a); }
function hsl(hh, a) { // arcobaleno
  const f = (n) => { const k = (n + hh * 12) % 12; return 0.5 + 0.5 * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
  return new Color(((f(0) * 255 << 16) | (f(8) * 255 << 8) | (f(4) * 255)).toString(16).padStart(6, "0"), a);
}
try {
  if (!fm.fileExists(path)) throw new Error("File non trovato");
  await fm.downloadFileFromiCloud(path);
  const list = JSON.parse(fm.readString(path)).c;
  const pick = list[Math.floor(rnd(1) * list.length)];
  const img = await new Request(pick.u).loadImage();
  const ctx = new DrawContext();
  ctx.size = S; ctx.opaque = true; ctx.respectScreenScale = true;
  ctx.setFillColor(new Color("#05060a")); ctx.fillRect(new Rect(0, 0, S.width, S.height));
  if (pick.t) { // Topps: grafica della carta sfocata
    const tiny = new DrawContext(); tiny.size = new Size(10, 14); tiny.respectScreenScale = false;
    tiny.drawImageInRect(img, new Rect(0, 0, 10, 14));
    ctx.drawImageInRect(tiny.getImage(), new Rect(-S.width * 0.1, -S.height * 0.1, S.width * 1.2, S.height * 1.2));
  }
  // alone del colore del tipo, dal centro verso i bordi
  const c0 = pick.k || "#556", cx = S.width / 2, cy = S.height * 0.46, R = Math.max(S.width, S.height) * 0.75;
  for (let i = 0; i < 36; i++) {
    const r = R * (1 - i / 36);
    ctx.setFillColor(hex(c0, pick.t ? 0.045 : 0.07));
    ctx.fillEllipse(new Rect(cx - r, cy - r * 0.85, r * 2, r * 1.7));
  }
  if (pick.h) { // sfondo holo: fasce arcobaleno + brillantini
    for (let x = 0; x < S.width + S.height; x += 6) {
      ctx.setFillColor(hsl(((x / (S.width + S.height)) * 1.0) % 1, 0.2));
      const p = new Path(); p.addLines([new Point(x, 0), new Point(x + 6, 0), new Point(x + 6 - S.height * 0.45, S.height), new Point(x - S.height * 0.45, S.height)]); ctx.addPath(p); ctx.fillPath();
    }
    ctx.setFillColor(new Color("#ffffff", 0.7));
    for (let i = 0; i < 70; i++) {
      const sx = rnd(10 + i) * S.width, sy = rnd(200 + i) * S.height, sz = 1.5 + rnd(400 + i) * 3;
      ctx.fillEllipse(new Rect(sx, sy, sz, sz));
    }
  }
  // carta con margine e ombra morbida
  const ar = img.size.width / img.size.height, m = 0.07;
  let ch = S.height * (1 - 2 * m), cw = ch * ar;
  if (cw > S.width * (1 - 2 * m)) { cw = S.width * (1 - 2 * m); ch = cw / ar; }
  const cr = new Rect((S.width - cw) / 2, (S.height - ch) / 2, cw, ch);
  for (let i = 8; i > 0; i--) {
    ctx.setFillColor(new Color("#000000", 0.05));
    ctx.fillRect(new Rect(cr.x - i * 1.5, cr.y - i * 1.0 + 6, cr.width + i * 3, cr.height + i * 2));
  }
  ctx.drawImageInRect(img, cr);
  w.backgroundImage = ctx.getImage();
} catch (e) {
  w.backgroundColor = new Color("#0b0b0e");
  const t = w.addText("Apri CardDex ed esporta le carte per il widget");
  t.textColor = Color.white(); t.font = Font.systemFont(12);
}
if (config.runsInWidget) Script.setWidget(w); else await w.presentSmall();
Script.complete();
