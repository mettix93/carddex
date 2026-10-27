// CardDex widget per l'app Scriptable: mostra una carta ottenuta a caso.
// Prima volta: in CardDex, menu ••• > "Esporta carte per il widget" > "Salva su File" > iCloud Drive > cartella Scriptable.
const fm = FileManager.iCloud();
const path = fm.joinPath(fm.documentsDirectory(), "carddex-widget.json");
const w = new ListWidget();
w.backgroundColor = new Color("#0b0b0e");
w.url = "https://mettix93.github.io/carddex/carddex-album.html";
w.refreshAfterDate = new Date(Date.now() + 30 * 60 * 1000);
try {
  if (!fm.fileExists(path)) throw new Error("File non trovato");
  await fm.downloadFileFromiCloud(path);
  const list = JSON.parse(fm.readString(path)).c;
  const pick = list[Math.floor(Math.random() * list.length)];
  const img = await new Request(pick.u).loadImage();
  w.setPadding(0, 0, 0, 0);
  const wi = w.addImage(img);
  wi.centerAlignImage();
  wi.applyFittingContentMode();
} catch (e) {
  const t = w.addText("Apri CardDex ed esporta le carte per il widget");
  t.textColor = Color.white();
  t.font = Font.systemFont(12);
}
if (config.runsInWidget) Script.setWidget(w); else await w.presentSmall();
Script.complete();
