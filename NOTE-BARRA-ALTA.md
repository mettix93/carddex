# Note tecniche: barra in alto su iPhone (iOS 27, web app)

Cosa abbiamo scoperto (da riusare):
- L'app è abbassata di 14px (`body{position:fixed;top:14px}` in verticale): senza questo iOS non aggiornava la barra.
- iOS segue lo sfondo di `html` (non il meta theme-color): cambia colore entro 1 fotogramma. Per seguire una dissolvenza si aggiorna `html` a ogni fotogramma (requestAnimationFrame).
- Carta aperta, scorrimento tra carte (v227): `vwTheme()` copia a ogni fotogramma il valore animato di `--cc` (dissolvenza .26s con classe `ccfast`; NON chiamarla `sw`, collide con l'interruttore).
- Sbusto (v228): `pkMirror()` copia a ogni fotogramma il colore reale di `#pk` più il velo `#pkstudio`.
- I pulsanti della carta aperta usano `color-mix(var(--cc))` (v224), non il vetro con sfocatura (saltava subito al colore nuovo).
- Pulsanti in alto: `--hbt`/`--tbt` vanno calcolati rispetto al body (v221), non al viewport.
- Cose che hanno rotto la barra: transizione CSS su `html`, `overflow:visible` sul body nello sbusto, togliere l'abbassamento di 14px, pkTheme('#000000') forzato all'inizio dello sbusto.
- Ripieghi salvati come tag git: v214-ok, v218-ok, v221-ok, v222-ok, v223-ok, v224-ok, v226-ok, v227-ok.
