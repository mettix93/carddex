// CardDex widget per l'app Scriptable: l'illustrazione di una carta ottenuta al giorno, a tutto widget (cambia a mezzanotte).
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
  // ritaglio a tutto widget della sola illustrazione, centrata, con un piccolo margine interno per non far vedere i bordi
  const IW = img.size.width, IH = img.size.height, asp = S.width / S.height;
  let sw, sh, cx, cy;
  if (pick.t) { // Topps: tutta la grafica, ritaglio centrale
    sw = IW * 0.9; sh = sw / asp; if (sh > IH * 0.9) { sh = IH * 0.9; sw = sh * asp; }
    cx = IW / 2; cy = IH / 2;
  } else { // finestra dell'illustrazione: x 11.5-88.5%, y 16-50.5% della carta
    const aw = IW * 0.77, ah = IH * 0.345;
    sh = ah; sw = sh * asp; if (sw > aw) { sw = aw; sh = sw / asp; }
    cx = IW * 0.5; cy = IH * (0.16 + 0.345 / 2);
  }
  const k = S.width / sw;
  ctx.drawImageInRect(img, new Rect(-(cx - sw / 2) * k, -(cy - sh / 2) * k, IW * k, IH * k));
  w.backgroundImage = ctx.getImage();
} catch (e) {
  w.backgroundColor = new Color("#0b0b0e");
  const t = w.addText("Apri CardDex ed esporta le carte per il widget");
  t.textColor = Color.white(); t.font = Font.systemFont(12);
}
if (config.runsInWidget) Script.setWidget(w); else await w.presentSmall();
Script.complete();
