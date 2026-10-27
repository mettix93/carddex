# CardDex – aggiornamenti

Il più recente in alto. Ogni voce è un caricamento sul sito.

## 27 ottobre 2026
- App vera: ora è installabile (manifest, icone) e funziona anche senza rete grazie a un service worker; le immagini delle carte restano salvate dopo la prima visualizzazione. Si aggiorna comunque da sola quando c'è rete.
- Condividi: ora è nel menu a tre puntini (il menu si apre sopra la carta), con voci «Immagine completa» e «Solo carta»; lo sfondo holo viene esportato.
- Ricerca: «holo» mostra solo le carte davvero holo; «e» combina i criteri (veleno e sugimori), «o» li unisce (veleno o sugimori). Campo rinominato «Effettua una ricerca», senza suggerimento.
- Nuovo pulsante «Condividi» nella carta aperta: esporta un'immagine completa (sfondo colorato + scritte) oppure solo la carta, con gli effetti holo e riflesso.
- Gesti: la carta aperta si chiude scorrendo verso l'alto o il basso; doppio tocco per lo schermo intero.
- Ricerca estesa: oltre al nome, accetta tipo, rarità (comune/non comune/rara), holo, illustratore (es. «sugimori») e numero Pokédex.
- Rarità e illustratore ora sono dati offline, senza attese di rete.

- Hitmontop: tolto il ritaglio holo della miniatura (non ha miniatura di evoluzione).
- Schermo intero: niente più giri a vuoto se avevi girato la carta più volte (gira solo se era sul retro).
- Carta aperta: zoom temporaneo pizzicando con due dita (non a schermo intero); al rilascio la carta torna a posto.
- Holo: ritaglio del badge del Pokémon base tracciato automaticamente pixel per pixel sui tuoi screenshot (segue anche le punte della stella nei set Base/Jungle/Fossil/Rocket e il cerchio dei Neo); lo stesso contorno vale per il buco nel riflesso di luce.
- Versi: audio in modalità «ambient» (segue l'interruttore silenzioso dell'iPhone) e tolto lo sblocco che poteva forzare l'audio anche col silenzioso; con versi disattivati non parte nulla.
- Holo: trovata la causa del rettangolo sopra la miniatura (era il buco nel riflesso di luce): ora ha la stessa forma del ritaglio. Ritaglio misurato sulle carte vere.
- Holo: riquadro dell'effetto allargato di un soffio verso l'esterno per assorbire piccole differenze tra carte.
- Holo: ritaglio della miniatura del Pokémon base rifatto misurando le carte vere (Base/Jungle/Fossil/Rocket e Neo); in più la miniatura viene ridisegnata sopra l'effetto, così non si vede più il rettangolo quando la carta è inclinata.
- Sfondo holo: compare e scompare con dissolvenza quando scorri tra carte holo e normali.
- Carta aperta: lo sfondo cambia con una dissolvenza morbida (circa mezzo secondo) quando scorri da una carta all'altra, sia per le Topps sia per le carte TCG.
- Topps: tolta la texture ripetuta dallo sfondo (creava righe/divisioni); resta lo sfondo sfocato della carta.
- Topps: immagini salvate in modo permanente nella memoria dell'app (se il sito lo permette), così alle aperture successive non si riscaricano; altrimenti resta la cache normale.
- Topps: il precaricamento parte subito all'avvio dell'app (prima le carte ottenute, poi le altre), 4 scaricamenti in parallelo.
- Topps: sfondo della carta aperta più immediato (usa la miniatura già in memoria) e base neutra al posto del colore dei tipi TCG.
- Versi più affidabili: audio sbloccato al primo tocco, versi delle carte vicine caricati in anticipo, doppia sorgente scaricata in parallelo.
- Topps più veloci: immagini piccole e grandi precaricate in background, anteprima subito visibile mentre arriva quella grande.
- Luce in movimento: sempre spenta all'apertura dell'app; all'attivazione chiede il permesso e avvisa se negato o se non arrivano dati dai sensori.
- Logo Promo ora in stile con gli altri loghi dei set (sagoma monocromatica, stessa dimensione e colore del testo).
- Carte promo: riga «simbolo Promo · numero (se presente) · Holo (se holo)».
- Simboli di rarità (cerchio, rombo, stella) disegnati con la stessa dimensione, nel colore del testo e allineati ad esso.
- Carte promo: simbolo stella Promo + «Promo» al posto del simbolo di rarità (Mew antico mostra «Promo Holo»).
- Carta aperta: sotto il nome ora c'è «set · numero · simbolo rarità (● comune, ◆ non comune, ★ rara) + Holo». La rarità viene letta da tcgdex alla prima apertura di ogni carta e poi salvata sul telefono.
- "Non ottenute" rinominato in "Mancanti" (filtro, titolo e messaggio di conferma).
- Topps: lo sfondo dietro la carta aperta è ora la grafica della carta stessa, ingrandita e sfocata, che continua oltre i bordi (colori e disegni propri di ogni carta).
- Luce in movimento più fluida con il telefono in verticale (calcolo basato sulla gravità + smussatura dei movimenti).
- Mew antico: effetto holo su tutta la carta leggermente più intenso (luci delle carte normali invariate).
- Auto-aggiornamento: all'apertura e quando torni sull'app, controlla se c'è una versione nuova e si ricarica da sola (se non hai una carta aperta).
- Carta aperta: aggiunto un angolo leggermente stondato (minimo) su tutte le carte.
- Carta aperta: niente più ritaglio sugli angoli, si vedono quelli originali dell'immagine della carta (Topps mantengono un angolo arrotondato).
- Carta aperta e schermo intero: angoli più fedeli alla carta reale (raggio calibrato, bordo completo visibile). Le pagine dell'album restano invariate.- Carta aperta: bottone schermo intero (sfondo nero, carta a tutta larghezza, rotazione col dito disattivata, luce col movimento attiva)
- Orizzontale: la pagina che lasci non sparisce più nel nero, resta visibile finché la nuova non è arrivata sopra
- Fix: in verticale mancava un pezzo di pagina a destra mentre sfogli
- Fix: in orizzontale il colore delle pagine in arrivo non cambia più a giro finito
- Trasparente chiaro: la pagina che gira ora è una luce diffusa che sbiadisce le carte sotto (invece del velo opaco)
- Fix: il colore della pagina non cambia più appena la giri (la pagina successiva non traspare più da sotto)
- Trasparente chiaro: pagina che gira più opaca sopra l'altra
- Fix: carte Neo schiacciate e non muovibili da aperte
- Trasparente chiaro: un po' più opaco
- Stili pagina: "Trasparente scuro" primo e predefinito, "Trasparente" chiaro secondo; bordi tasche sottili; alone dalle carte stesse; ombre di piega leggere
- Holo ritagliato esattamente sul riquadro dell'illustrazione (misurato sugli screenshot, Base e Neo)
- Riflesso bianco più tenue sulle carte holo, con maschera allineata

## 26 ottobre 2026
- Holo: brillantini fermi con riflessi che cambiano, velo arcobaleno leggero, anche sullo sfondo
- Sfondo carta aperta in base al tipo; Topps: colore e trama dal bordo della carta
- Menu Stile (pennello): versi, luce in movimento, colore pagine per collezione
- Animazione di apertura carta e scorrimento tra carte
- Luce in movimento solo col telefono, spenta di default; versi che rispettano il silenzioso
- Barra in basso più alta; carte non ottenute più scure
