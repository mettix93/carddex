## v451 (PullTime)
- Topps fuori da PullTime: non compare più nell'album né nelle statistiche (il totale «carte scoperte» scende di 151, quindi parte da 228 coi set sbloccati). I dati Topps restano nel codice, in stand-by. Test tests/topps_hidden.js.

## v450 (PullTime)
- Statistiche: «Carte scoperte» e «Set completati» (e i totali) contano solo i set attualmente sbloccati e lasciano fuori le carte Promo delle missioni (set Promo e carte extra). Sbloccando un set, le sue carte entrano nel conteggio. Test tests/stats.js.

## v449 (PullTime)
- Schermata Converti/Scambia: la scheda «Scambia» ora apre direttamente Amici (niente più tasto separato). Lo scambio a codici resta come «Scambio con codice» dentro Amici, per chi non ha il cloud. Test tests/scambia_tab.js.

## v448 (PullTime)
- Amici e scambi nel cloud. Nuovo tasto «Amici» accanto a Converti/Scambia: codice amico di 6 caratteri (diverso dal codice di accesso), aggiungi amico con il suo codice (richiesta → accetta), pagina amico con le sue doppie che ti mancano e le tue che gli mancano, sua collezione intera per set, proposta di scambio (stessa regola di rarità di prima), Posta con ricevute/inviate/chiuse, accetta/rifiuta/annulla, scadenza 24 h, pallino rosso sul tasto per le novità.
- Le carte offerte in una proposta in attesa sono riservate (non convertibili né offribili altrove). Lo scambio accettato si applica subito a chi accetta e alla prima apertura a chi ha proposto, una volta sola: gli id applicati stanno anche nel backup e nel cloud.
- Serve eseguire una volta carddex-supabase-3.sql in Supabase (tabelle profiles, collections, friendships, trades con regole di sicurezza). Prova: tests/friends.js con tests/lib_sb.js (finto Supabase con le stesse regole).

## v447 (PullTime)
- Ultima carta → riepilogo (bustine normali): stesso velo dell'apertura. Prima la fascia diventava bianca subito, con le carte scure ancora sotto, e passava per un grigio-azzurro intermedio. Ora una sola variazione, a velo pieno. Il riepilogo di Lucky/God resta com'era.
- Con il velo attivo la fascia non segue più le sfumature intermedie (rampa): cambiava troppo presto. Test tests/wash_summary.js.

## v446 (PullTime)
- Apertura bustina → prima carta (normali, Lucky, God): dal video la fascia in alto cambiava quando il velo bianco era ancora trasparente (si vedeva fascia scura su pagina chiara). Ora il velo diventa opaco in ~130 ms, resta pieno fino a ~440 ms e svanisce entro ~790 ms; la fascia cambia al centro della fase piena, agganciata al tempo del velo (non a un timer fisso), e nello stesso istante il velo prende il colore nuovo della fascia, quindi velo, fascia e sfondo coincidono. Test tests/wash_sync.js (velo ≥0,95 e colore uguale alla fascia al cambio, per bustina normale, Lucky e God).

## v445 (PullTime)
- Backup e cloud: ora includono anche l'ordine «Personalizzato» delle carte (trascinamento di v443), prima non veniva salvato né nel file né nel cloud. Test tests/backup.js (esporta → cancella tutto → importa → stesso ordine, stesse carte e possessi).

## v444 (PullTime) / c19 (PullBinder)
- PullBinder alleggerito: tolto il codice del gioco bustine (missioni, conversione, scambi, riepiloghi: ~100 KB, 1,21 → 1,12 MB). Mantenute le funzioni generali (tema, barra alta, guardia barra in basso, backup, cry) e messi segnaposto neutri per i pochi richiami condivisi. Nessun dato salvato toccato. PullTime resta com'è (il gioco serve, e il codice collezione è poco).
- Uso offline: sw.js v2 (pagine, icone e manifest in anticipo; copia di sicurezza per ogni file) e, una volta, solo con Wi-Fi, scarica in background loghi, sprite e versi (~12 MB, 1158 file). Le carte restano "dopo la prima vista". Test tests/offline.js.

## v443 (PullTime) / c18 (PullBinder)
- Album: carte trascinabili. Tieni premuto ~0,35 s per sollevare la carta, trascinala: una linea blu verticale indica il punto di inserimento tra due carte; dopo una breve pausa le carte slittano in anteprima; rilasciando la carta si inserisce lì (le altre scorrono di una). Vicino ai bordi dello schermo (40 px) la pagina si gira dopo 0,6 s e il trascinamento continua. Disattivato con ricerca/filtri attivi e nel Pokédex.
- Il primo spostamento crea l'ordine «Personalizzato» (PullBinder: «Custom», già gestito da albWatch; PullTime: nuova voce nel menu Ordine, si ritrova quando lo si riseleziona). Toast «tocca per annullare».
- PullBinder: rilasciando una carta sollevata senza spostarla si apre il menu come prima. Test: tests/drag.js.

## c17 (PullBinder)
- Carte Allenatore olografiche: effetto holo e riflesso allineati all'illustrazione (come PullTime v442).

## v442
- Carte Allenatore olografiche: effetto holo e riflesso ora allineati all'illustrazione (che è più bassa e più bassa di altezza rispetto ai Pokémon): viewer, bustine e riepilogo. Test tests/trainer_holo.js.

## v441
- Apertura bustina: il lampo bianco al taglio ora sfuma in ~0,2 s (prima ~0,6 s) e la fascia in alto cambia colore a metà di quella sfumatura (170 ms dopo il taglio): pagina e fascia cambiano insieme, come un taglio netto, invece di una fascia che scatta e una pagina che sfuma piano.

## v440
- Apertura bustina: il lampo azzurro al taglio (#pkwash) ora è bianco/grigio chiaro come lo studio (scuro in tema scuro), quindi la transizione è solo bianco → oro/argento/colore della prima carta.
- Fascia in alto: segue il lampo (non più la sola dissolvenza dello studio); il colore finale scatta a metà della dissolvenza della pagina (450 ms dopo il taglio) invece che prima.

## v439
- Fascia in alto (tutte le bustine): tolto il rimbalzo di colore a fine transizione (la rampa continuava dopo il colore finale); il colore finale arriva dopo la dissolvenza. Aggiunto tests/band_meta.js.

## v438
- Fascia Lucky/God: la pagina passa a oro/argento in 0,16 s (prima ~1 s) e la fascia cambia colore nello stesso momento, così lo scatto di iOS non si nota più.

## v437
- Fascia Lucky/God: l'aggiornamento graduale del colore ora sostituisce il meta theme-color (come fa già il resto dell'app) invece di modificarlo, perché iOS ignorava le modifiche semplici.

## v436
- PullTime: fascia in alto nei Lucky/God Pack: invece di restare bianca e poi scattare al colore finale, ora scorre gradualmente (bianco → argento/oro) insieme alla dissolvenza dello sfondo, aggiornando anche il colore della barra di stato a ogni frame.

## v435
- PullTime: nel riepilogo della bustina le carte olografiche non hanno più il contorno giallo; hanno invece il simbolino olo in alto a destra, come nell’album.

## v434
- Lucky/God Pack: il colore della fascia in alto (sfondo di pagina e colore barra di stato) non cambia più al momento del taglio ma insieme alla dissolvenza dello sfondo da bianco a oro/argento; cambiate solo la classe che decide il colore (gband, aggiunta quando lo sfondo inizia a sfumare) e il ritardo del colore della barra di stato (0,3 s). Le altre fasi non cambiano.

## v432
- Lucky/God Pack: la fascia in alto non diventa più oro di colpo mentre lo sfondo è ancora bianco; ora sfuma insieme allo sfondo (circa 0,6 s). Nel riepilogo resta dorata/argento. Cambiata solo una regola grafica, la logica della fascia è invariata.

## v431
- Lucky/God Pack: nuovo effetto al taglio al posto del fascio rigido: colonna di luce morbida che sale e svanisce in meno di 1 s, lampo al taglio e scintille che salgono (oro per la God, argento per la Lucky); tutto sparisce prima dell’arrivo della prima carta.

## v430
- PullTime: corretto il lampo di luce che compariva lontano dalla carta all’inizio dell’alone d’oro quando una carta entra nella tasca (album e Pokédex): l’alone ora parte invisibile e già centrato sulla carta.

## v429
- DEV: aprendo una bustina normale mentre le carte di prova sono ancora attive, la prova viene chiusa prima (contatore Lucky e carte tornano com’erano) e la bustina normale conta e salva regolarmente.

## v428
- DEV: le carte dei Lucky/God Pack forzati entrano davvero nell’album e nel Pokédex (con le animazioni di ingresso) e spariscono quando, finite le animazioni, esci dalla pagina; se l’app viene chiusa o ricaricata prima, tornano subito come prima. Durante la prova il salvataggio nel cloud è sospeso.

## v427
- PullTime: alone di luce quando una carta entra nella tasca (album e Pokédex) più dorato e un po’ più ampio; ora è un alone radiale uniforme che copre anche le carte vicine, senza il tratto che partiva da lontano.

## v426
- Lucky/God Pack: la scritta è esattamente a metà tra il nome del set e il badge «Nuova carta».

## v425
- Lucky/God Pack: fascia in alto fissa (oro per la God, argento per la Lucky) invece del colore della carta, anche nel riepilogo; fondo oro più scuro con brillantini come nell’effetto olografico; la Lucky ha lo stesso fondo ma argento; scritta «Lucky Pack!» / «God Pack!» sotto il nome del set; fascio di luce più breve e prima carta con ingresso ritardato e più lento (solo in questi pack); riepilogo con lo stesso fondo.

## v424
- PullTime: set EX Deoxys corretto: Pokémon Hoenn, allenatori ed energie erano finiti per errore tra le carte escluse; ora la bustina dà 9 carte (23 comuni, 17 non comuni, 36 rare tra cui le ex) e l’album ha 87 carte ottenibili. Restano escluse solo le carte Kanto/Johto.

## v423
- PullTime: Lucky Pack (1/20, garantita dopo 20 bustine senza) e God Pack (1/100). Lucky: penultima carta come slot raro, ultima olografica garantita. God: tutte rare (con la solita chance di olo), ultima olografica garantita, senza doppioni. Stesso numero di carte della bustina normale.
- Al taglio: fascio d’argento (Lucky) o d’oro (God); nella God fondo oro luccicante durante lo sbusto e nel riepilogo.
- DEV: prima del taglio compaiono Normale/Lucky/God; la bustina forzata è di prova e non salva nulla (né album, né Pokédex, né statistiche, né contatore).
- Test: tests/lucky.js

## v422 / c16
- PullTime: «Album bustine» diventa «Album» con l’icona del libro aperto (quella della collezione personale).
- PullBinder: «Collezione personale» diventa «Album».

## v421
- PullTime: nell’ingresso delle carte nella tasca (album e Pokédex) il suono di scivolamento parte con il movimento; all’arrivo, insieme a luce e riflesso, suona il campanello del Pokémon nuovo dello sbusto.

## v420 / c15
- Icone dei set EX: ultime quattro rimesse nell’ordine giusto (Sandstorm, Dragon, Leggende Nascoste, Deoxys), prima erano invertite.
- PullTime: tenendo premuta una carta nell’album non si apre più il menu opzioni.

## v419 / c14
- Icona del set Rubino e Zaffiro sostituita con quella giusta (ottagono); la gemma rettangolare resta a Smeraldo (non attivo). Ordine dei set EX invariato: R&S, Sandstorm, Dragon, Leggende Nascoste, Deoxys.

## v418
- PullTime: foto reali delle bustine EX (Rubino e Zaffiro, Tempesta di Sabbia, Drago, Leggende Nascoste, Deoxys), 4 per set, ordinate per numero di Pokédex del Pokémon raffigurato. Immagini in packs/.

## v402
- Riepilogo sbusto: pkKick (scroll a 0, ricalcolo viewport con +1px su html, riallineamento ripetuto, evento resize) per evitare la barra in basso abbassata su iOS. Non riproducibile in Chromium: da verificare su iPhone. Ripiego: v401

## v417 / c13
- Icone: cerchio della sveglia e copertina dell’album centrati al pixel nell’icona.

## v416
- PullTime: nuova icona (sveglia blu con tre carte, piedini blu). Per vederla sulla Home: rimuovere e riaggiungere l’app.

## c12
- PullBinder: nuova icona (raccoglitore con tre carte e pokéball); manifest con le icone nuove. Per vederla sulla Home: rimuovere e riaggiungere l’app.

## v415
- Pokédex: pausa tra una carta e l’altra come nell’album (640 ms invece di 420).
- README con i nomi nuovi.

## c11
- PullBinder: tolte le immagini delle bustine del gioco (non usate): da 3,9 MB a 1,2 MB. Copia di sicurezza: tag git pre-cleanup-v414.

## v414 / c10
- Barra in basso (iOS): guardia generale che controlla ogni 1,5 s, a ogni tocco, al rientro e a ogni cambio di viewport; se la pagina è scivolata la riallinea (prima lo faceva solo a fine sbusto). Si ferma da sola se non serve (max 4 interventi in 15 s).

## v413 / c9
- Versi: le fonti si provano in ordine (PokeAPI, poi Showdown solo se manca) invece di una gara: stesso verso a ogni apertura.

## v412 / c8
- Versi: fonte principale PokeAPI (con file locali, script `tools/scarica_versi_pokeapi.py`), Showdown come riserva. Finché lo script non è stato lanciato il suono resta quello di prima.

## v411 / c7
- Versi dei Pokémon riportati esattamente come in v409/c5 (fonte Showdown, volume e filtri originali).

## v410 / c6
- Statistica «Carte uniche» → «Carte scoperte» (entrambe le app).
- Versi: tentata una modifica (livellamento, fonte), annullata in v411/c7.
- PullTime: la ricerca nell’album non mostra più carte non ottenute di set ancora bloccati.

## v409 / c5 — Nuovi nomi
- App 1 ora si chiama **PullTime**, App 2 **PullBinder** (titolo, nome sotto l’icona, manifest, testi che nominavano CardDex).
- Invariati: indirizzi dei file, chiavi dei dati, cache: nessun dato toccato.

## v401
- Suono carta in tasca +16% volume. Album: pausa tra una carta e la successiva 640ms (era 420), +320ms se la prossima è su un'altra pagina (niente sovrapposizione col suono del giro pagina). Ripiego: v400

## v400
- Suoni: taglio busta nuovo (S1, crepitii irregolari su fruscio di fondo); carta in tasca F1 (chiusura più marcata, volume un po' più alto). Ripiego: v399

## v399
- Riscatto missione misteriosa: stessa sequenza della nota (carta girata, attesa, giro) + la carta girata trema (1.4s) prima di girarsi. Ripiego: v398

## v398
- Suono 'carta che entra': volume +20% circa. Ripiego: v397

## v397
- Suono 'carta che entra': nuova versione E3 (struscio morbido che scende e si assesta, nessun tonfo). Ripiego: v396

## v396
- Rara: bagliore circolare esteso come l'holo (alone 120vw/x1.25, anello fino a x2.1).
- Passaggio App/Dev: doppio tap sull'icona Account del menu (se lo sviluppo è sbloccato); tolta la sezione Sviluppo dalle Impostazioni. Ripiego: v395

## v395
- Audio sintetico: corretto un click iniziale in ogni strato dei suoni (guadagno di partenza 1 invece di ~0); tutti gli effetti sonori sintetici ora partono puliti. Ripiego: v394

## v394
- Suono 'carta che entra': chiusura più marcata (assestamento morbido a ~150ms), strusciata leggermente più corta. Ripiego: v393

## v393
- Suono 'carta che entra': aggiunto pochissimo corpo morbido in coda. Ripiego: v392

## v392
- Suono 'carta che entra': solo strusciata di carta (attacco morbido, ~0.25s), senza colpo finale. Ripiego: v391

## v391
- Pokédex: le sagome grigie non vengono più ricreate a fine riempimento (dxPatch le lascia intatte).
- Suono 'carta che entra' più leggero: solo fruscio/strusciata di carta, senza colpo grave.
- Sbusto: precaricamento versi scaglionato (carta corrente+2 invece di tutte e 11 subito), niente doppio layout e niente ripittura dello sfondo se invariato, buffer rumore creato in anticipo. Ripiego: v390

## v390
- Sfondi: il colore segue il tipo stampato sulla CARTA (dati per carta) invece del tipo del Pokémon; ripiego sul tipo del Pokémon dove manca il dato. Ripiego: v389

## v389
- Pokédex: drawDex aggiorna la griglia sul posto (dxPatch) invece di ricrearla: niente flash all'inizio e alla fine del riempimento carte. Ripiego: v388

## v388
- Riepilogo->icona album: ripristinata transizione originale (v386); un solo suono 'carta in tasca' all'arrivo nell'icona (non uno per carta).
- Riflesso rara/holo ancora un po' prima (755/1190ms).
- Pokédex: il ridisegno finale non taglia più bagliore/riflesso dell'ultima carta (attende la fine dell'animazione). Album: scatto non riproducibile in test. Ripiego: v387

## v387
- Riepilogo: suono 'carta in tasca' a ogni carta che entra nell'icona album; a fine volo nessuna pausa/dissolvenza (titolo e bottoni spariscono subito, chiusura immediata).
- Riflesso rara/holo leggermente prima (790/1230ms); verso nello sbusto resta insieme al riflesso.
- Contatori statistiche: frazione sempre centrata (anche 463/1430), font ridotto se serve.
- Account: casella nome con contorno blu 3px senza riempimento, nome in blu. Ripiego: v386

## v386
- Suono carta che entra in tasca (album/Pokédex): da thud sintetico a 'scivolata + schiocco' di carta (rumore filtrato). Ripiego: v385

## v385
- Visore (album, Pokédex, bacheche): verso di nuovo ai tempi originali; il riflesso resta dopo l'effetto di luce. Nello sbusto verso e riflesso restano insieme dopo gli effetti. Ripiego: v384

## v384
- Rara/Holo: il riflesso sulla carta parte dopo gli effetti circolari (rara 850ms, holo 1300ms) e il verso parte insieme al riflesso; vale per sbusto e visore. Ripiego: v383

## v383
- Account: Carte uniche / Set completati come frazione: numero, linea, totale; linea larga come "429" in entrambi. Ripiego: v382

## v382
- Account: nei cerchi Carte uniche / Set completati il "/totale" è azzurrino (come l'anello non completato) e la sbarra è alta come le cifre. Ripiego: v381

# CardDex – aggiornamenti

Il più recente in alto. Ogni voce è un caricamento sul sito.

## v381 — Account: sbarretta davanti al totale in grigio (122 sopra, /429 sotto). Ripiego: v380

## v380 — Account: nei contatori a frazione il numero raggiunto resta blu, sbarretta e totale in grigio. Ripiego: v379

## v379 — Account: numero, sbarretta e totale dei due contatori a frazione tutti della stessa dimensione (16px); contatori semplici invariati. Ripiego: v378

## v378 — Account: contatori di completamento scritti nel cerchio come "103/" a capo "429" (tolta la riga "su N"). Ripiego: v377

## v377 — Account: Carte uniche e Set completati con anello di avanzamento e riga "su N" (totali dei soli set sbloccati); Bustine e Carte ottenute con anello pieno. Ripiego: v376

## v376 — Account: spaziature omogenee (titolo → etichetta → blocco identico per Account e Impostazioni; etichetta "Salvataggio"; 26px prima di ogni titolo). Ripiego: v375

## v375 — Account: contorno dei cerchi 3px (stesso spessore dei numeri). Ripiego: v374

## v374 — Account: cerchi statistiche a contorno blu con numero blu (stile icone menu); avatar pieno blu con iniziale bianca. Ripiego: v373

## v373 — Account: statistiche in cerchi blu (stesso stile e dimensione dell avatar) con etichetta sotto; nuova statistica "Set completati". Ripiego: v372

## v372 — Account: tolto il titolone; ordine nome, statistiche, titolo "Account" (stesso stile di Impostazioni), azioni cloud, Impostazioni. Nome e numeri statistiche stessa dimensione dei titoli (22px). Ripiego: v371

## v371 — Scheda Utente rinominata Account; statistiche subito sotto il nome (senza titolo), poi azioni cloud, poi Impostazioni. Ripiego: v370

## v370 — Utente: statistiche (Bustine aperte, Carte ottenute, Carte uniche). Migrazione: bustine già aperte x 11 carte; da ora conteggio reale; missioni vere contano, quelle di prova no. Incluse nel backup e nel cloud. Ripiego: v369

## v369 — Utente: azioni cloud come lista pulita (stile Impostazioni) invece di pulsanti; codice di accesso in riga con Copia e "L ho salvato". Ripiego: v368

## v368 — Cloud: cronologia versioni (ultime 12 sul server, 1 ogni 2h) con ripristino da Utente; promemoria "salva il codice" finché non confermato. Richiede carddex-supabase-2.sql. Ripiego: v367

## v367 — Cloud: se telefono e cloud hanno gli stessi dati (dopo Esci e rientro) ricollega senza chiedere; confronto indipendente dall ordine delle chiavi. Ripiego: v366

## v366 — Cloud (Supabase): account con codice di accesso (16 caratteri), salvataggio automatico di collezione, bustine, missioni, bacheche; accesso da altro telefono; conflitti con scelta. Backup ora include missioni. SQL in carddex-supabase.sql. Ripiego: v365

## v365 — Scheda "Utente" al posto di Impostazioni (icona profilo): scheda con nome utente modificabile (locale) + Impostazioni dentro. Cloud/scambi: da fare. Ripiego: v364

## v364 — Riscatto: retro in attesa più a lungo (~0,95s), passaggio alla carta aperta in dissolvenza (560ms) senza stacco. DEV: seconda missione di prova "Venusaur holo" (set Base) segreta, con animazione. Ripiego: v363

## v363 — Missioni, riscatto: animazione ricompensa. Carte mostrate: retro che sale con raggi dorati, si gira, flash + effetti; carte segrete: sagoma sigillata con ? che trema ed esplode. Tocco per saltare. Poi si apre la carta come prima. Ripiego: v362

## v362 — Missioni: cerchio blu con ! (stesso stile della V) per le missioni completate da riscattare. Ripiego: v361

## v361 — Tolti aptici iOS (interruttore, prova, trucco switch): bloccato da iOS 26.5, non fattibile da web. Resta solo vibrate Android invisibile. Ripiego: v360

## v360 — Impostazioni: tasto "Prova vibrazione" con diagnostica (API vibrate / switch). Ripiego: v359

## v359 — Volumi: versi -30% (.8→.55); nuova, rara, holo, guadagno alzati (circa +80%) per avvicinarli ai versi; effetti secondari invariati. Ripiego: v358

## v358 — Aptici: swipe carte aperte, sbusto, preferiti, conferma bacheca, carta in tasca (album/Pokédex), raggruppo carte dopo riepilogo + ingresso icona Album; interruttore Vibrazione in Impostazioni; Android vibrate, iPhone tick switch (da verificare). Ripiego: v357

## v357 — Carta holo aperta (album/Pokédex/bacheca): animazione identica allo sbusto (aggiunti alone e riflesso). Ripiego: v356

## v356 — Pokédex: in carta aperta si scorre al Pokémon successivo (una carta per Pokémon, non le altre dello stesso); all uscita il Pokédex si centra in verticale sull ultimo Pokémon visto. Ripiego: v355

## v355 — Verso carta aperta (album/Pokédex/bacheca): parte a istante fisso, a carta completamente aperta (330ms apertura, 240ms scorrimento); animazione rarità allineata. Sbustate invariate. Ripiego: v354

## 29 ottobre

- **v245** · Preparazione (invisibile): album personali e album del gioco hanno definizioni separate; salvataggi invariati. Ripiego: v244.
- **v244** · Nomi italiani di allenatori ed energie dei set EX Hoenn presi da tcgdex e salvati sul telefono (se mancano restano in inglese, nuovo tentativo dopo 7 giorni). Ripiego: v243.
- **v243** · Holo EX: leggero offset verso l'esterno solo per la finestra dell'illustrazione, nessun offset per il bordo holo. Ripiego: v242.
- **v242** · Versi dei Pokémon di terza generazione (252–386) nell'album Hoenn. Ripiego: v241.
- **v241** · Holo delle carte EX (Hoenn): finestra misurata per set, bordo con brillantini sulle carte ex, ritaglio del cerchietto dell'evoluzione; vale anche per la condivisione. Ripiego: v240-ok.
- **v240** · Album Hoenn: del set Deoxys restano solo le 6 carte di Deoxys; tolte le altre carte, gli allenatori e le energie di quel set. Ripiego: v239-ok.
- **v239** · Riga dei set: tolto lo scorrimento ad anello, ora si ferma al primo e all’ultimo set. Ripiego: v238-ok.
- **v238** · Riga dei set: tolto il blocco ai tocchi sul contenitore che su iPhone impediva lo scorrimento col dito. Ripiego: v237-ok.
- **v237** · Album Hoenn ridotto a 5 set (Rubino e Zaffiro, Tempesta di Sabbia, Drago, Leggende Nascoste, Deoxys): 135 Pokémon, 45 allenatori, 13 energie. Scelta della carta in ordine di uscita dei set. Ripiego: v236-ok.
- **v236** · Riga dei set: scorrimento continuo ad anello (dopo l’ultimo set ricomincia il primo, in entrambe le direzioni). Ripiego: v235-ok.
- **v235** · Nuovo album Hoenn (terza generazione): 135 Pokémon con scelta della carta tra 7 set EX (Rubino e Zaffiro → Smeraldo), più 73 allenatori e 26 energie (nomi in inglese per ora). Riga dei set scorrevole in orizzontale. Ripiego: v234-ok.
- **v234** · Icone dei set: non selezionate col colore dei tasti della barra in basso, selezionate in blu come il tasto attivo. Ripiego: v233-ok.
- **v233** · In alto a sinistra un solo tasto acceso/spento (icona persona): acceso = album personale, spento = album di gioco. "Pagina x / y" esattamente a metà tra album e pallina dello slider. Ripiego: v232-ok.
- **v232** · Sbusto: il velo chiaro tra bustina e prima carta ora sfuma in 0,15 s (era 0,7 s) e la barra in alto cambia a metà, così lo scarto è di pochi fotogrammi. Ripiego: v231-ok.
- **v231** · Barra in basso a 3 tasti (Bustine · Album · Impostazioni). In alto a sinistra interruttore Collezione/Album di gioco (stessa pagina e stesso set), contatore al centro, testo "Pagina x / y" tra album e slider. Ripiego: v230-ok.
- **v230** · Converti doppie: stesse rarità raggruppate, dentro ciascuna ordine per numero di collezione. Ripiego: v229-ok.
- **v229** · Sbusto: fascia sottile in alto ora cambia insieme alla pagina (prima restava col colore della carta precedente); nell’apertura bustina → prima carta la barra cambia a metà dissolvenza, non all’inizio. Ripiego: v228.
- **v228** · Sbusto: la barra in alto e lo spazio sotto seguono a ogni fotogramma il colore reale dello sfondo (bustina → prima carta e tra le carte). Note tecniche in NOTE-BARRA-ALTA.md. Ripiego: v227.
- **v227** · Carta aperta: scorrendo tra le carte, la barra in alto e lo spazio sotto seguono frame per frame il colore dello sfondo (niente salto a metà). Ripiego: v226.
- **v226** · Corretto errore della v225: il nome della classe collideva con l’interruttore (.sw) e riduceva la carta aperta durante lo scorrimento.
- **v225** · Carta aperta: scorrendo tra le carte la dissolvenza dura 0,26s e la barra cambia a metà (0,12s), così il salto della barra è quasi impercettibile.
- **v224** · Carta aperta: i pulsanti in alto prendono il colore della carta con la stessa dissolvenza della pagina (prima saltavano subito al colore nuovo).
- **v223** · Carta aperta: scorrendo tra le carte la barra cambia colore a metà dissolvenza (0,25s), non prima della pagina.
- **v222** · Carta aperta e full screen: titolo e pulsanti 8px più in basso, sotto la sfumatura che iOS disegna in cima.
- **v221** · Pulsanti in alto (carta aperta, full screen, scelta bustina, sbusto) riallineati alla barra dell’album: erano 14px troppo in basso (doppio abbassamento).
- **v220** · Ripristinata la v218 (l’altezza originale dei componenti rompeva la barra in alto). Il tentativo v219 è annullato.
- **v219** · Componenti riportati all’altezza originale (tolto l’abbassamento di 14px). Ripiego: v218.
- **v218** · Sbusto: lo sfondo della pagina parte subito e la barra cambia colore a metà dissolvenza (0,38s dopo), per evitare la banda gialla in cima tra bustina e prima carta.
- **v217** · Avvio: sfondo del tema applicato subito (niente lampo nero in cima); sbusto: barra e spazio in cima cambiano prima, lo sfondo della pagina dopo 0,23s e con dissolvenza più lunga (0,7s) tra le carte.
- **v216** · Sbusto: tolto il nero forzato all’inizio dell’apertura (causava il lampo scuro tra bustina e prima carta); ritardo cambio colore 0,15s anche per le fasi intermedie.
- **v215** · Sbusto: la barra cambia colore a metà dissolvenza (dall’apertura pacchetto alla prima carta e dall’ultima al riepilogo) invece che subito.
- **v214** · Ripristinato il comportamento della v212 (barra che seguiva bene lo sbusto): tolti transizione sul colore dell’html e ritaglio disattivato nello sbusto, che bloccavano la barra. Solo gli angoli in alto restano dritti.
- **v213** · Angoli in alto dritti; colore dello spazio in cima con transizione (barra più fluida nei cambi schermata); durante lo sbusto le carte non vengono più ritagliate nei 14px in alto.
- **v212** · Esperimento: app abbassata di 14px ma niente fascia nera; lo spazio sopra prende il colore della pagina (come la barra di stato). Ripristinato il colore nello sbusto.
- **v211** · Fascia nera: striscia fissa nera in cima alla finestra e sfondo del body nero (iOS stava leggendo il colore dalla pagina).
- **v210** · Fascia in alto SEMPRE nera in ogni schermata e tema (verticale): l’app inizia 14px più in basso con angoli arrotondati; barra di stato fissa nera, niente più cambi colore.
- **v209** · Sbusto: barra in alto sempre nera con angoli arrotondati sul colore della carta (iOS non aggiornava la barra qui).
- **v208** · Full screen: impulso nero in cima (5px) animato dal colore precedente; sbusto: sfondo e striscia in cima con transizione di colore (come la carta aperta).
- **v207** · Bustine infinite (PKTEST) e sbusto completo incluso nel test automatico.
- **v206** · Test automatico nel pannello debug (▶ AVVIA TEST): nessuna modifica al comportamento dell’app.
- **v205** · Sbusto: barra alta e X seguono lo sfondo sotto (X semitrasparente, striscia dietro i contenuti); impulso fullscreen dietro il titolo; cambio tema in Impostazioni: barra anticipata senza scatto.
- **v204** · album: barre in alto di nuovo fisse (niente sfocatura) ma nascoste mentre sono aperti carta/sbusto/Impostazioni, così iOS non le legge; entrando/uscendo dal tutto schermo un velo di 14px colorato forza iOS a rileggere il colore
- **v203** · carta aperta: tornati i rinforzi del colore della barra (v193) e la barra degli album non è più "fixed" (iOS la leggeva); a schermo intero la barra resta nera
- **v202** · album: la barra fissa in alto (v201) veniva letta da iOS per il colore della barra di stato e restava trasparente → striscia; ora ha il colore corrente
- **v201** · album (verticale): le due barre in alto sono fisse sopra la pagina e senza ritaglio, come nelle Bustine, per togliere la sfocatura; posizioni identiche a prima
- **v200** · carta a schermo intero: barra di stato nera; tolte le riaffermazioni ripetute del colore (facevano ripartire la sfumatura della barra)
- **v199** · sbusto: la regola del tema chiaro batteva il fondo del mazzo (barra restava nera, ora colore carta); la X del mazzo segue subito il colore della carta, senza sfumare dal precedente
- **v198** · Impostazioni: il contenitore della pagina (a schermo intero) ora ha lo stesso colore della barra di stato, così iOS la aggiorna al cambio tema
- **v197** · carta aperta: lo sfondo di base del visualizzatore restava #05060a (una regola più forte batteva la mia) e iOS lo usava per la barra; ora segue il colore della carta
- **v196** · barra di stato dopo il cambio tema: il velo di dissolvenza restava a schermo intero con il colore del tema vecchio e iOS lo usava per la barra; ora è non campionabile (absolute + nascosto a riposo)
- **v195** · barra di stato: anche lo sfondo di <body> segue il colore corrente (iOS lo usava e restava nero)
- **v194** · pannello diagnostico (5 tocchi veloci in alto a sinistra, o ?dbg): mostra standalone, margini, altezze, colore barra di stato e ultimi cambi
- **v193** · barra di stato: il colore (theme-color) viene riaffermato più volte dopo ogni cambio, per evitare che iOS resti sul colore vecchio
- **v192** · fascia in alto: tolto black-translucent (iOS 26.1+ ci disegnava sopra uno scrim nero), il colore della barra di stato ora segue la pagina; Holo più vicino al simbolo rarità
- **v191** · senza bustine: contatore a 0, le 3 bustine sbiadite e non selezionabili, titolo "Prossima bustina tra …", niente più bustina che scende
- **v190** · carta aperta e sbusto: il colore della carta arriva fino in cima al telefono, senza fascia nera/bianca
- **v189** · Limite di 2 bustine al giorno (costante PKDAILY, da portare a 1 più avanti); tolta la modalità prova (bustine illimitate); le bustine partono da 2 oggi; aperture bloccate a 0 disponibili
- **v188** · Moneta come unità più vicina al numero (Converti doppie e Pokédollari)
- **v187** · Converti doppie: i numeri con la moneta centrati sotto le scritte «Pokédollari» e «Da convertire»
- **v186** · Converti: nessun lampo bianco dopo «Converti» (le carte non vengono più ridisegnate, si aggiornano sul posto); messaggi con la spunta al posto del punto esclamativo
- **v185** · «Da convertire»: blu pieno (#0a84ff) subito, senza dissolvenza di opacità
- **v184** · Converti doppie: tolto Azzera; barra con «Pokédollari» (disponibili) a sinistra, «Da convertire» al centro (0 sbiadito, blu e con piccolo ingrandimento a ogni variazione), Converti a destra; dopo la conversione il totale a sinistra si ingrandisce e si aggiorna
- **v183** · Orizzontale: bordo sopra e sotto dell'album entrambi minimi (4px), il sotto non è più allargato dalla barra di sistema
- **v182** · Pannelli Pokédollari e Bustine: tolti i sottotitoli sotto le barre di progresso
- **v181** · Barra Bustine: tolto il contatore dal tasto Pokédollari; scambio scritto «10 Pokédollari → 1 bustina»
- **v180** · Carta aperta: tolti i tre puntini; nome e riga info (set · numero · rarità) alti 44px come i tasti e allineati in cima, con icone e testo sulla stessa linea
- **v179** · Striscia in alto: un'unica funzione aggiorna sfondo, barra di stato e meta a ogni cambio (tema, mazzo, visualizzatore) e il colore della carta arriva da cima a fondo; Pokédollari al posto di «punti» ovunque, scambio «10 ₽ → 1 bustina»; sulle doppie 1/2/3 monetine con logo più fine; +/− visibili in scuro; puntini prima della tavolozza; barra Bustine con tre icone uguali e contatori in basso a destra; angoli del mazzo corretti (la classe .sw delle pareti ereditava gli stili dell'interruttore); alone bianco dietro le bustine in scuro; margine superiore = inferiore in orizzontale
- **v178** · Icone nuove (Untitled UI, tratto 2, 24px, currentColor): Bustine, Album (libro con bustina sulla pagina), Collezione, Impostazioni, stile pagine, opzioni, filtro, cerca, schermo intero/riduci, chiudi, converti, holo, note; moneta con logo ₽ per i punti; cerchio 1/2/3 sulle carte doppie con riempimento bianco
- **v177** · Versi: non partivano durante lo sbusto (c'era un controllo che li bloccava se il visualizzatore era chiuso), ora partono sempre e vengono precaricati all'apertura; moneta con riempimento bianco; tolti i simboli doppie dall'album Gioco; bustine più chiare (+40%) in tutte le viste (nella scelta il filtro non veniva applicato); sfondo scelta/apertura bustina in Classica uguale a Impostazioni (#f2f2f7); striscia in alto: un solo colore sincronizzato (sfondo, meta, barra) a ogni cambio tema
- **v176** · Tolta la View Transition (su Safari rompeva la larghezza della schermata): dissolvenza ora con un velo del colore del tema, uguale per tutti i passaggi; il cambio avviene solo a velo opaco; lente subito reattiva; test su geometria e velo

- **v175** · Dissolvenza più sicura su Safari: niente regole che alterano la barra o la dimensione dello snapshot; se la dissolvenza si blocca (1,2 s) il passaggio avviene comunque e la dissolvenza si disattiva da sola; test del blocco

- **v174** · Passaggi tra i 4 pulsanti: dissolvenza incrociata vera (View Transition), identica per ogni coppia di schermate; la barra resta ferma sopra con la lente animata; risolto l'album che riappariva sotto Bustine (l'animazione di apertura ripartiva a fine passaggio); test aggiornato

- **v173** · Slider: pallino bianco da fermo, vetro trasparente e più grande mentre lo trascini; dissolvenza tra le 4 schermate (ora affidabile anche su Safari); niente album sotto Impostazioni; Impostazioni identiche in Notte e Classica; moneta sulle doppie senza cerchio bianco e grande come la stellina holo; moneta unità con cerchio centrato; aggiunto tests/regress.js (si lancia prima di ogni rilascio)

- **v172** · Barra in basso unica anche in Scegli la tua bustina (prima c'era una copia sotto): la lente scorre sempre, in tutti i passaggi da/verso Bustine; test automatico di tutti i passaggi

- **v171** · Stile Apple Contatti: Classica grigio #f2f2f7 con schede bianche, Notte nero con schede #1c1c1e; Impostazioni identica (titoli di sezione, righe 17px, separatori rientrati, angoli 30px); barre in vetro più fedeli

- **v170** · Lente nav corretta anche verso Bustine; separatori come prima; libro con pagine separate; icona Album meno bianco; moneta in stile icone (anche dopo i totali); slider a margini pagina e senza glitch al cambio; sfondi e dissolvenze del mazzo ripristinati; Impostazioni: titolo all'altezza dei tasti in alto e cornici visibili in Classica

- **v169** · Impostazioni: Effetti sonori, Effetti di luce, Esporta backup; testi allineati ai titoli

- **v168** · Dissolvenza uniforme tra tutte le schermate; moneta con punteggio al posto di rarità e 1x; nav: separatori a tutta altezza, icona Album libro+bustina, via il contatore; slider senza sfondo a tutta larghezza; theme-color corretto e sfondi anti-striscia; bustine più luminose; interruttori blu anche in Classica; carte più spesse; angoli del mazzo arrotondati; verso insieme a Nuova!; doppie: solo +/- cambiano il contatore (area più larga)

- **v167** · Cambio tra le 4 schermate immediato e senza transizioni; slider pagine in vetro; sfondi bianco e nero puri come iOS; icone uniformi (tab piene, spessore 2); barra inferiore unica anche in Scegli la tua bustina con animazione lente; sfondo fisso contro le strisce

- **v166** · Passaggi tra pagine senza scatti né schermate intermedie: un velo uniforme copre il cambio e si dissolve a layout pronto

- **v165** · Stile iOS 27: barra strumenti in cima (44pt, sopra i set), barra inferiore flottante 64pt con effetto liquid glass e lente scorrevole, stessi componenti e posizioni in tutte le pagine, tema Notte e Classica 2026 (quadragies)

- **Transizioni uniformi** tra tutti i tab della barra (dissolvenza del contenuto). Badge nuova/doppia a metà tra titolo e carta. Dal riepilogo la X torna a "Scegli la tua bustina".

- **Widget**: considera solo carte Pokémon da gioco (via Allenatore, Energia e Topps). Va riesportato il file dal menu.

- **Widget**: ora mostra solo l'illustrazione della carta, ritagliata e centrata, a tutto widget senza margini (script `widget/carddex-widget.js` da riaggiornare in Scriptable).

- **Temi Notte / Classica / Auto** per tutte le schermate (anche bustine, converti, punti), indipendenti dalla modalità. **Nuovo tab Impostazioni**: tema, versi (ora anche sulle carte sbustate), modalità lucida, backup. Barra: Bustine · Album | Collezione | Impostazioni. Il pennellino apre direttamente il colore pagine.

- **Struttura nuova, senza Home**: barra unica in basso con tre tab Collezione · Bustine · Gioco. Il cambio è istantaneo (niente ricarica) e l'app si apre sull'ultima modalità usata. Tolti Home e tasto bustina separato.

- **Passaggi più veloci e fluidi**: Home dall'album/bustine senza ricaricare la pagina (dissolvenza), chiusura bustine con dissolvenza, durate ridotte (cambio modalità, apertura bustine). Tolti i punti finali dalle frasi singole.

- **Bustina da aprire**: la X torna alla scelta bustina, tolto "Cambia bustina"; il testo "Tocca la bustina per aprirla" (senza punto) sta sopra la bustina.

- **Backup completo**: un unico file con album Collezione, album Gioco, stato bustine/punti, colore pagine e impostazioni. L'import ripristina tutto; i vecchi backup valgono ancora per l'album corrente.

- **Scegli la bustina con la stessa UI**: barra strumenti in alto (alla stessa altezza di quella dell'album), Home/Album in basso con la bustina evidenziata a destra; tolti i tasti home e X in alto.

- **Nuova UI con barra in basso**: Home e Album al centro (liquid glass), bustina separata in basso a destra solo in Gioco. In cima ora ci sono le espansioni, subito sotto gli strumenti (con contatore carte e pagina). Tolti dall'intestazione nome modalità e tasto Home.
- Mazzo sbustato: simbolo NUOVA/doppia sempre tra titolo e carta (anche in orizzontale), contatore 1/11 centrato nello spazio sotto la carta; posizioni ricalcolate a ogni rotazione.

## 29 ottobre 2026 (novtrigies)
- Messaggi: al posto della spunta ora c'è un punto esclamativo.

## 29 ottobre 2026 (octotrigies)
- Converti doppie: simbolo di rarità in alto a destra.

## 29 ottobre 2026 (septtrigies)
- Simbolo holo negli album tondo; simboli di rarità nelle doppie della stessa dimensione (20px).

## 29 ottobre 2026 (sestrigies)
- Converti doppie: simbolo di rarità in alto a sinistra (cerchio, rombo, stella) e ordine rare → non comuni → comuni (Pokémon, poi Addestramento, poi Energia a parità di rarità).
- Messaggi senza sfocatura (si ridisegnavano male alla chiusura della schermata su iOS).

## 29 ottobre 2026 (cinquetrigies)
- Badge bustine in home spostato sopra l'icona della bustina, come nella barra degli strumenti.

## 29 ottobre 2026 (quattrotrigies)
- Messaggi più visibili: pillola più grande con spunta blu, entrata con piccolo rimbalzo, sfondo più pieno.
- Badge bustine in home: tondo bianco con numero scuro (colore della casella Gioco).

## 29 ottobre 2026 (tretrigies)
- Messaggi dopo conversione e scambio punti: vetro in linea con le barre, centrati sopra la barra, entrambi con punto esclamativo.

## 29 ottobre 2026 (duetrigies)
- Mazzo sbustato: se la carta è girata sul retro non si può passare alla successiva finché non torna di fronte.

## 29 ottobre 2026 (unetrigies)
- Tolta la scritta "carta rara" dall'ultima carta del mazzo.
- Icona punti: numero seguito da "x" (es. 12x), come i contatori delle carte.

## 29 ottobre 2026 (trigies)
- Carta aperta e schermo intero: tasti in alto a destra (…, schermo intero, X) tutti 38px, stessa riga e stesso allineamento dei tasti degli album.

## 29 ottobre 2026 (novvicies)
- Converti doppie: tolta la riga "Tocca una carta…"; testi "Comune 1 punto · Non comune 2 punti · Rara 3 punti".

## 29 ottobre 2026 (octvicies)
- Converti doppie: scorrimento più fluido (tolti maschera e sfocature per carta, sfumatura in basso con un livello fisso, niente ridisegni inutili).

## 29 ottobre 2026 (septvicies)
- Scelta bustina: tolto lo zoom dell'ingresso (spostava la barra giù e poi su); ora solo dissolvenza.

## 29 ottobre 2026 (sexvicies)
- Icona bustina unica (proporzioni 2:3, quadrato centrato) in barre, home e ovunque.
- Barra scelta bustina: niente più scatto su/giù (la posizione è calcolata al caricamento).
- Nuova transizione tra taglio e prima carta: lampo morbido di luce che sfuma sul mazzo, così le animazioni non si mischiano.

## 29 ottobre 2026 (quinvicies)
- Icona bustina con illustrazione centrata più grande; badge bustine in home non più rosso.
- "Apri un'altra": tolto l'effetto in alto; stesso per gli altri tasti blu.
- Tocca l'icona bustina nella schermata di scelta: scheda con bustine apribili, barra che avanza verso la prossima e conto alla rovescia.
- Prima carta: comparsa senza opacità sul contenitore 3D (niente salto finale); il taglio di luce sparisce subito all'apertura.

## 29 ottobre 2026 (quatervicies)
- Icona pennello: punta solo contorno, senza riempimento.

## 29 ottobre 2026 (tervicies)
- Gioco: tutti i tasti (home, contatore, pillole set, barra) con lo stesso stile in vetro bianco; un solo blu per le grafiche (#0a84ff).
- Barra scelta bustina riallineata anche dopo rotazioni/ridimensionamenti.
- Schermata punti senza stella.
- Scegliendo una bustina, titolo e barra sfumano subito.

## 29 ottobre 2026 (duovicies)
- Stile delle pagine album salvato separatamente per Collezione e Gioco (prima cambiarlo in una modalità lo cambiava anche nell'altra).

## 29 ottobre 2026 (unvicies)
- Schermata Converti: barra in basso e tasto X allineati misurando barra e tasti degli album; corretto un conflitto di nome che rimpiccioliva il titolo.

## 29 ottobre 2026 (vicies)
- Barra scelta bustina e barra del riepilogo allineate (misurate) alla barra degli album; riepilogo con tasti in vetro da 38px.
- Tasti home e X con stessa dimensione e posizione dei tasti in alto negli album (anche nel visualizzatore carta).
- Icona bustina senza righe, con quadratino scuro in alto; punta del pennello piena; badge bustine in blu scuro; i punti sostituiscono la stella.

## 29 ottobre 2026 (novodecies)
- Barra scelta bustina identica alla barra degli album (stessa posizione, bottoni tondi da 38px, badge).
- Converti: 0/x grigio finché non si seleziona, poi blu.
- Tolto il lampo ovale all'apertura della bustina; corretto il flash laterale a fine effetto holo (riflesso che tornava visibile per un istante).
- Striscia in alto durante lo sbusto: lo sfondo chiaro dello studio ora viene nascosto del tutto, non solo reso trasparente.

## 29 ottobre 2026 (octodecies)
- Scelta bustina: nomi sotto le tre bustine leggibili (blu scuro, grassetto).

## 29 ottobre 2026 (septendecies)
- Converti doppie: selettore − / n/tot / + in vetro chiaro e più leggero; il numero mostra copie selezionate su copie doppie disponibili.

## 29 ottobre 2026 (sexdecies)
- Barra bustine: i tre tasti hanno la stessa dimensione; frecce dell'icona Converti allineate.
- Converti doppie: carte che scorrono sotto la barra in vetro con sfumatura, − / numero / + su ogni carta, nessun lampeggio al tocco, testo introduttivo su tre righe.

## 29 ottobre 2026 (quindecies)
- Bustine: tolto il pezzetto che usciva dall'angolo alto a destra.
- Prima carta del mazzo: raggi ridisegnati (immagine pre-renderizzata) e effetti sfalsati nel tempo per eliminare scatti.
- Nuova schermata scelta bustina con barra in basso: Converti, Punti, Bustine disponibili.
- Converti doppie: tocca una carta per convertire una copia (comune 1 punto, non comune 2, rara 3); ogni 10 punti si scambia una bustina Set Base.

## 29 ottobre 2026 (quaterdecies)
- Corretto lo spostamento verso il basso delle grafiche (rimossa altezza estesa della pagina).
- Colore della barra di stato: la meta theme-color viene ricreata a ogni cambio, così Safari la aggiorna; sfondo pagina scuro quando è aperto il visualizzatore.
- Dissolvenza leggera all'apertura di visualizzatore, riepilogo, fogli e scelta bustina.

## 29 ottobre 2026 (terdecies)
- Carte sbustate: angoli smussati come nelle carte aperte dall'album.
- Comparsa della prima carta più pulita: arriva dopo che la bustina è sfumata, con entrata più morbida.

## 29 ottobre 2026 (duodecies)
- Bordi delle carte negli album più sottili (tutti gli stili).
- Strisce sopra/sotto: sfondo della pagina esteso a tutto lo schermo senza ripetizioni e colore della barra di stato aggiornato anche nel visualizzatore carta.
- All'avvio non si vede più l'album prima della home.
- Transizioni home↔modalità con dissolvenza; apertura bustine dalla modalità Gioco con dissolvenza morbida.

## 29 ottobre 2026 (undecies)
- Pagine "Trasparente scuro": bordi delle carte da neri a bianchi semitrasparenti, molto più leggeri (tutte le modalità).

## 29 ottobre 2026 (decies)
- Tutti i tasti (home, pillole dei set, contatore, tasti della barra) alti 38px; solo la barra in basso resta più grande. Spaziature ricalcolate in automatico.
- Strisce sopra/sotto le schermate di gioco: lo sfondo della pagina ora prende il colore della schermata aperta.

## 29 ottobre 2026 (nonies)
- Sfondo dietro la carta aperta ora opaco: niente più trasparenze/sfocature che lasciavano passare i colori dell'album sotto; dipende solo dal tipo della carta.

## 29 ottobre 2026 (octies)
- Visualizzatore: sfondo uniforme per tipo, tolto l'alone sfocato dell'illustrazione.
- Mazzo: la carta sotto ha già l'effetto di luce nella posizione giusta quando inizi a sollevare quella sopra (niente scatti al cambio); apertura bustina più leggera (niente riflesso/ombre pesanti, entrata del mazzo più semplice, raggi più piccoli).
- Barra strumenti più in basso (a ridosso della curva dello schermo); gli spazi verticali si riadattano da soli. Tab e barra strumenti hanno la stessa altezza (52 px) e gli stessi margini.

## 29 ottobre 2026 (septies)
- Gioco: titolo e testi del visualizzatore e dei menu di nuovo chiari (ereditavano il blu del tema chiaro).

## 29 ottobre 2026 (sexies)
- Visualizzatore in Gioco: sfondo scuro come prima (con il tema chiaro dietro risultava più chiaro).

## 29 ottobre 2026 (quinquies)
- Modalità Gioco in tema chiaro «liquid glass»: sfondo luminoso come la scena bustina, header, tab, footer e pulsanti in vetro chiaro con testi blu scuro. Le pagine degli album, il visualizzatore e il schermo intero restano invariati.
- Carte energia: sfondo del colore del loro tipo (Fuoco, Acqua, Erba, Lampo, Psico, Lotta, Oscurità, Metallo; le speciali incolore). Le Allenatore restano grigie.
- Spessore carta singola a metà strada tra scala reale e prima (carta aperta 1,8 px; mazzo 1,9 px per carta).
- Holo: effetto rifatto, alone luminoso dietro la carta e riflesso arcobaleno morbido che la attraversa (niente più scatti).
- Colore della barra di stato (theme-color) aggiornato per ogni schermata bustina/mazzo/riepilogo.

## 29 ottobre 2026 (quater)
- Mazzo: sistemato il bug per cui la prima carta sembrava sprofondare ruotando (la faccia non veniva più portata davanti allo spessore) e il bordo chiaro che la incorniciava.
- Spessore intermedio tra le due versioni (carta aperta 1,9 px, mazzo 2,1 px per carta).
- Holo: tolto il secondo lampo di raggi che arrivava fuori tempo; il riflesso arcobaleno ora scorre dentro la carta.

## 29 ottobre 2026 (ter)
- Tolti i riflessi sugli angoli delle carte quando si girano (spigoli del bordo più scuri e senza sporgenze).

## 29 ottobre 2026 (bis)
- Spessore delle carte leggermente aumentato (viewer 2,2 px, mazzo 2,4 px per carta).

## 29 ottobre 2026
- Barra di stato dell'iPhone ora sopra lo sfondo dell'app (niente più fascia di colore diverso nelle schermate bustina, mazzo e riepilogo); se non cambia, ricarica l'app dalla home o riaggiungila.
- Bustina: solo fronte (niente lati/retro/pezzi bianchi). Il raggio azzurro del taglio compare solo dopo il tocco, con una luce più visibile che scorre da sinistra a destra. Tolti pallini e anello all'apertura e sulle holo.
- Dalla scelta bustina la bustina scelta si sposta e ingrandisce fino alla scena, senza stacchi.
- Riepilogo «Carte ottenute»: sfondo luminoso come la scena, dissolvenza dall'ultima carta, titolo in linea con la X, carte più grandi, costruito in anticipo per aprirsi subito.
- Spessore delle carte senza sfarfallio (colori fissi invece di filtri).
- Titoli «Collezione» e «Gioco» al posto di CardDex negli album; home senza luci colorate, pulsanti centrati, icone in stile vetro come le altre e testi su una riga.
- Testi bilanciati per evitare una sola parola a capo.

## 28 ottobre 2026 (tarda sera)
- Spessore reale della carta anche nel visualizzatore (Collezione e Gioco): bordi sottili e angoli arrotondati quando la ruoti; tutti gli effetti restano uguali.

## 28 ottobre 2026 (notte)
- Home: casetta anche entrando da Collezione (prima mancava) e titolo centrato; home ridisegnata con icone nello stile dell'app e testo «Il tuo album personale, carta per carta».
- Scelta bustina con lo stesso sfondo luminoso del taglio.
- Bustina non più ruotabile: si tocca per avvicinarla. Il fascio azzurro di taglio ora ha una luce che scorre da sinistra a destra con dissolvenza.
- Etichetta «NUOVA!» (senza stellina) più in alto sopra la carta.
- Immagini: se una carta non carica in alta qualità prova in bassa e poi in PNG prima del segnaposto (es. Energia Combattimento).
- Riepilogo: carte dimensionate per stare tutte in altezza.
- Menu ⋯ aperto dal riepilogo ora compare sopra la carta.

## 28 ottobre 2026 (sera)
- Bustina: tolti i cloni in cerchio, appare solo quella scelta. Rifatta più semplice e pulita (fronte, retro e bordo sottilissimo come in Pocket); di lato diventa una linea sottile.
- Taglio: al posto del pallino rosa c'è una lama luminosa che scorre sulla linea e la striscia in alto si solleva mentre tagli.
- Niente casetta mentre sbusti: la X porta al riepilogo delle carte di quella bustina.
- Etichetta «NUOVA»/«2x» ferma e con dissolvenza: sparisce appena inizi a trascinare la carta, torna se la riporti al suo posto, e quella della carta sotto compare solo a carta completamente visibile.
- Tolto lo «zoommino» nel passaggio tra le carte del mazzo.
- Carta holo: effetto di festa (raggi, riflesso arcobaleno, scintille, vibrazione) appena è scoperta del tutto.
- Caricamenti più veloci: le carte della bustina vengono pescate e precaricate quando scegli la bustina.
- Riepilogo a 3 colonne; toccando una carta si apre nel visualizzatore.
- Lati delle carte del mazzo più puliti e morbidi.
- Titolo «CardDex» centrato (con «Gioco» accanto in modalità Gioco), casetta a sinistra in stile vetro come gli altri pulsanti (anche in Collezione); tolto «Torna alla home» dal menu dei tre puntini.

## 28 ottobre 2026
- Apertura bustina in stile Pocket: scena luminosa con pavimento lucido e riflessi, anello di bustine dietro, scintille, la bustina cade dall'alto e si fa girare (con inerzia). Toccandola si avvicina e compare la linea luminosa azzurra: trascinando il dito lungo la linea diventa rosa, poi lampo, anello dorato e la saldatura vola via.
- Pulsante casetta per tornare alla home: in alto a sinistra nella schermata bustine e a sinistra del titolo nell'album (Collezione e Gioco). «Cambia bustina» è passato sotto la bustina.

## 27 ottobre 2026
- Bustina: rifatta come sacchetto curvo, sottile alle saldature e bombato al centro; di lato si vede lo spessore vero. All'apertura il taglio stacca la saldatura e parte un lampo con raggi e scintille (dorati se c'è una holo).
- Mazzo: spessore reale di una carta (circa 0,3 mm in scala) con le carte ben distinte di lato e angoli arrotondati; l'apertura del mazzo ha un'entrata con rimbalzo.
- Etichette: «NUOVA» (dorata con stellina) e «2x» in stile album, più in alto sopra la carta.
- Bustine: l'etichetta «NUOVA» / «×N» sta fuori dalla carta, centrata in alto.
- Bustina: niente più lati a scatola; ora è un sacchetto bombato (strati con il contorno vero), con riflesso lucido che passa, leggera fluttuazione e lampo al taglio.
- Mazzo: ogni carta è distinta e con gli angoli arrotondati (prima erano lati squadrati e carte fuse).
- Mazzo delle bustine: rotazione solo orizzontale (l'album resta com'era); si cambia carta con lo swipe su o giù, anche lento: la carta segue il dito e lascia intravedere quella sotto, e se lasci a metà torna al suo posto.
- Bustine: ora sono le vere bustine del Set Base (Blastoise, Charizard, Venusaur) con il retro vero. Quando tocchi il pacchetto scegli quale aprire (il contenuto non cambia); il tasto «Cambia» permette di tornare alla scelta. Corretto anche il retro, che non si vedeva ruotando la bustina.
- Gioco: bustine illimitate per le prove (da disattivare poi con PKTEST=false).
- Bustine: le carte si girano e tornano a posto come nelle carte aperte dell'album, e si cambia carta solo con swipe su o giù; il mazzetto ha lo spessore delle carte rimaste (si vede dai lati) e sotto non si vedono le carte successive.
- Bustine: la bustina ha spessore e un effetto «piena»; ogni carta ha il suo sfondo del colore del tipo con dissolvenza al cambio, e le holo hanno l'effetto holo sia nello sfondo sia sull'illustrazione.
- Home all'apertura: scegli «Collezione» (il tuo album di sempre) oppure «Gioco».
- Gioco (prova con il Set Base): stesso album ma tutto da riempire; una bustina al giorno, che si accumulano; la bustina si ruota in 3D, si taglia col dito, le 11 carte si scorrono una a una (energia, 6 comuni, 3 non comuni, rara/holo per ultima, holo circa 1 volta su 3). Le carte vanno automaticamente nell'album di gioco, i doppioni aumentano le copie.
- Nel menu ••• c'è «Torna alla home».
- Dettagli e note: il pannello compare in basso come gli altri menu e si alza sopra la tastiera quando scrivi.
- Dettagli e note: i tasti Salva e Annulla restano sempre visibili (i campi scorrono), e si può chiudere toccando fuori dal pannello.
- Dettagli carta: nel menu della carta «Dettagli e note» con copie (1x di default), lingua (italiano di default), stato, edizione, valutazione, prezzo, data e note; riepilogo sotto il titolo e badge «2x» sulle copie multiple.
- Ricerca: «2x» trova le carte con almeno due copie; anche lingua, stato, «prima edizione», shadowless, valutata.
- Il menu a tre puntini della carta aperta contiene ora tutte le opzioni della pressione lunga (più Condividi), e la pressione lunga funziona anche a carta aperta.
- Widget: carta un po' più grande, con margine ridotto.
- Widget: una carta al giorno (cambia a mezzanotte), con margine e sfondo del colore del tipo (holo con fasce arcobaleno e brillantini). Serve rifare l'esportazione dal menu •••.
- Widget: nel menu ••• c'è «Esporta carte per il widget»; in widget/carddex-widget.js c'è lo script per l'app Scriptable che mostra una carta ottenuta a caso.
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
- **v246** · Album Bustine riorganizzato: un set completo per pillola, in ordine di uscita, raggruppati per serie (Originale, Neo, EX) con Topps in fondo; carte mancanti dei set Neo/EX aggiunte; nomi italiani anche per Deoxys. Album personale invariato. Ripiego: v245.
- **v247** · Album personalizzati: pillola «+» per crearne di nuovi scegliendo i set (set interi, in ordine di uscita e per numero); pressione lunga su una pillola per modificare nome/set o eliminare; menu «Ordine e opzioni» nel filtro (Numero, Pokédex, ordini custom, una carta per Pokémon sì/no con annulla, addestramento ed energie mostrati/nascosti); i tuoi 5 album esistenti diventano album modificabili con il tuo ordine attuale salvato come custom; backup include gli album. Corretto: nel Gioco le carte holo/non-holo gemelle restano separate anche riaprendo l'app dal Gioco. Ripiego: v246.
- **v248** · Barra in basso: Bustine · Personali · Pokédex · Impostazioni (l'icona personale passa in barra). L'album delle bustine si apre dal pulsante libro nella schermata Bustine; nell'album bustine il pulsante in alto a sinistra torna alla scelta bustina. Nuova vista Pokédex 1–386 per generazione, con selettore Personale · Bustine · Tutti, filtro Tutti/Ottenuti/Mancanti e scheda per Pokémon (carte per set e album, verso). Ripiego: v247.
- **v249** · All'apertura l'app parte sempre dalla pagina principale Bustine (con la voce Bustine attiva), anche se l'ultima volta eri in un album. Corretto un errore JS nel precaricamento Topps al cambio modalità. Ripiego: v248.
- **v250** · Pokédex: sotto ogni carta i simboli dei set disponibili (in ordine di set, più chiari se già ottenuti); barra in alto con contatore, filtro e lente come nell'album (filtri: Tutti/Ottenuti/Mancanti e fonte Personale/Bustine/Entrambi; la ricerca usa le stesse regole dell'album); un tocco apre la carta con effetti e schermo intero (scorri per le altre ottenute), doppio tocco tenuto mostra le carte disponibili di quel Pokémon. Ripiego: v249.
- **v251** · Pokédex: ripristinati numero e nome sotto le carte; il contatore 2x/3x dentro la carta è sostituito dai simboli dei soli set di cui hai quel Pokémon. Ripiego: v250.
- **v252** · Pokédex: pastiglie Kanto · Johto · Hoenn nella stessa posizione e con lo stesso stile di quelle degli album; un tocco porta alla prima carta di quella generazione in cima, scorrendo a mano la pastiglia si seleziona quando la sua prima carta arriva in cima. Tolte le etichette di sezione. Ripiego: v251.
- **v253** · Pokédex: simboli set in nero senza sfondo; segno ♀/♂ riallineato al nome (Nidoran) ovunque. Ripiego: v252.
- **v254** · Pokédex: pillole regioni selezionate come negli album (testo blu), contatore centrato, doppio tap / pressione lunga sulla miniatura apre la lista carte (il tap fantasma chiudeva il foglio). Ripiego: v253.
- **v255** · Pokédex: ripristinati i divisori con il nome della regione all’inizio di ogni sezione. Ripiego: v254.
- **v256** · Titoli di pagina (Collezione, Album, Bustine, Pokédex) come Impostazioni; barra: Collezione · Bustine · Pokédex · Impostazioni, apertura su Collezione; Pokédex: etichetta sopra la carta, regioni fisse con conteggio, niente simboli set, Topps escluse. Ripiego: v255.
- **v257** · Pokédex: esclusa davvero la serie Topps (prima per errore era esclusa Neo Destiny). Ripiego: v256.
- **v258** · Pokédex: i set Neo non contano i Pokémon di Kanto; i set EX non contano quelli di Kanto e Johto. Ripiego: v257.
- **v259** · Set di una generazione senza Pokémon delle precedenti ovunque (Neo senza Kanto, EX senza Kanto/Johto); le carte già possedute vengono messe da parte (carddex_hidx), non cancellate. Ripiego: v258.
- **v260** · Bustine Giungla e Fossile (grafica provvisoria generata), scelta del set con pillole per serie, pool giornaliero unico (3 al giorno, ora illimitate in prova), etichette serie su due righe, tolta la scritta del set sopra le bustine. Ripiego: v259.
- **v261** · fascia che tagliava i simboli dei set nelle Bustine (padding della riga). Ripiego: v260.
- **v262** · doppie: lo scambio ora vede tutti i set (Giungla e Fossile prima no), pagina unica divisa per set con titolo fisso, indicatore quantità nell'Album. Ripiego: v261.
- **v263** · immagini reali delle bustine Giungla (Wigglytuff, Scyther, Flareon) e Fossile (Lapras, Aerodactyl, Zapdos), Fossile schiarite. Ripiego: v262.
- **v264** · luminosità delle tre bustine Fossile resa uguale. Ripiego: v263.
- **v265** · "Vai all'album" e icona album dalle Bustine aprono l'album del set della bustina appena aperta. Ripiego: v264.
- **v266** · scambio doppie con codici (scheda Scambia nella pagina Doppie): stessa rarità, solo carte bustine, offerta→risposta→ricevuta. Ripiego: v265.
- **v267** · pagina Doppie: numeri del footer allineati a sinistra con le etichette, Ricevi/Offri, pulsante blu uguale in Converti e Scambia. Ripiego: v266.
- **v268** · nomi sotto le bustine dritti e allineati; ordine Set Base Venusaur · Charizard · Blastoise. Ripiego: v267.
- **v269** · bustine (grafica generata) per Team Rocket, Gym Heroes, Gym Challenge e i 4 Neo; Gym Heroes e Gym Challenge aggiunti come set dell'Album (non in Collezione né Pokédex). Ripiego: v268.
- **v270** · icone dei set Gym Heroes e Gym Challenge (file forniti). Ripiego: v269.
- **v271** · energia nelle bustine Gym Heroes/Challenge, 20 Pokédollari per bustina + "Apri ora", tetto 6 bustine accumulabili, set a blocchi (sblocco al 80%), apertura multipla ×1/×2/×3 con riepilogo unico. Ripiego: v270.
- **v272** · bustine Hoenn (EX Rubino e Zaffiro, Tempesta di Sabbia, Drago, Leggende Nascoste): 9 carte, blocco 4 (sblocco al 80% del blocco 3), grafica provvisoria. Ripiego: v271.
- **v273** · riepilogo con più bustine: carte alla larghezza solita e pagina scorrevole. Ripiego: v272.
- **v274** · conversione Pokédollari: il popup si trasforma in "+1 bustina" con tasto "Apri ora" (stessa dimensione). Ripiego: v273.
- **v275** · calcolo copertura blocchi in cache (meno lavoro nel disegnare le pillole). Ripiego: v274.
- **v276** · nuovo album Promo (prime 49 carte Wizards Black Star Promos, solo album bustine, in fondo dopo Hoenn; ancora non ottenibili). Ripiego: v275.
- **v277** · bustine reali Team Rocket, Gym Heroes, Gym Challenge (4 per set, luminosità allineata ai set esistenti). Ripiego: v276.
- **v278** · bustine reali Neo (Genesis, Discovery, Revelation, Destiny: 4 per set), ritagliate/raddrizzate; luminosità riallineata su Rocket, Gym e Neo. Ripiego: v277.
- **v279** · Neo Genesis: Meganium raddrizzato (prospettiva), Meganium e Lugia portati a vivacità/luminosità di Typhlosion e Feraligatr. Ripiego: v278.
- **v280** · Bustine: nuova pagina "Scegli la tua bustina" a carosello perpetuo (bustina a grandezza intera, nome del set sotto), pagina "Apri bustina" con pulsante Apri + ×N (massimo apribile). Ripiego: v279.
- **v281** · Bustine: nomi Jungle/Fossil; "×N" bianco circolare con bordo blu; fix pulsanti rimasti tornando a Scegli; bustine più piccole nel carosello (vicine tagliate a metà) con ingrandimento animato; fix flash bustina nelle aperture in serie; pillole set tutte cerchi uguali; titolo = nome del set, nome della bustina sotto ciascuna. Ripiego: v280.
- **v282** · Bustine: "Apri ×1", tolto testo "Apri bustina", scelta più morbida con bustine laterali che escono, nomi sopra le bustine, carosello a inerzia (fling), pillole composte della Collezione e Pokédex tornate a pillola, divisori tra gruppi di set (bustine e album), taglio della bustina regolare. Ripiego: v281.
- **v283** · Doppie: titolo grande a sinistra con Converti/Scambia sulla stessa riga; titoli delle pagine principali allineati al margine sinistro; Pokédex: miniature come in Doppie con divisori orizzontali e righe più vicine; tenendo premuta una carta posseduta nell’elenco si sceglie la carta mostrata nel Pokédex. Ripiego: v282.
- **v284** · Bustine: carosello meno sensibile (inerzia solo da forza maggiore, passaggio alla successiva più facile); X di uscita subito visibile; nome del set in maiuscolo centrato tra pillole e nome bustina; tolta la maschera ellittica sulle pillole; divisori tra serie con lo stesso spazio in Album e Bustine. Ripiego: v283.
- **v285** · Pokédex: popup di scelta carta sopra le miniature (miniatura evidenziata), spazi uguali carta/linea/nome, scorrimento sotto titoli regione e pillole (senza fondo), conteggio nelle pillole delle regioni; icona Promo più grande e centrata. Ripiego: v284.
- **v286** · Pokédex: titoli regione a sinistra e non più fissi; scelta carta Pokédex con foglio sovrapposto alle miniature (restano visibili e evidenziate); carosello meno sensibile, rotazione più veloce solo con colpo forte; carta a tutto schermo a dimensione reale (max 380px); titolo e info della carta allineati ai tasti, a capo solo se serve. Ripiego: v285.
- **v287** · Bustine: nome set in grassetto + completamento, ultima pillola allineata al margine, pillole allineate all'album; Pokédex: miniatura scelta non sparisce più + contorno su quella mostrata; "+" circolare; riga nome set + completamento in Collezione/Album; rinomina album modifica il nome attuale; Missioni (prima pagina) in Bustine; Doppie: nomi set scorrevoli. Ripiego: v286.
- **v288** · Rinomina album: nome intero prefilled, il nome personalizzato compare sopra le pagine; tolto il completamento accanto al numero pagina; spazi uguali fine pagina/numero/slider/menu; Missioni: pillola 44px, stile uniformato, si chiude dal menu; menu in basso fisso in Pokédex/Impostazioni; Pokédex: carte scorrono dietro titolo e menu; cornice blu sulla carta mostrata. Ripiego: v287.
- **v289** · Collezione: tolti i nomi testuali dalle pillole dei set (restano solo i simboli; il nome è sopra le pagine). Ripiego: v288.
- **v290** · Collezione: "+" più grande (icona 22px) nel cerchio. Ripiego: v289.
- **v291** · Apri ×1: larghezza adattata al testo, gruppo centrato. Ripiego: v290.
- **v292** · Ambienti Dev/App: Dev = dati attuali, 6 bustine fisse (non scendono), 1000 Pokédollari, set sbloccati; App = chiavi proprie (parte da zero), limiti normali. Interruttore in Impostazioni > Sviluppo (si attiva con 7 tocchi sul titolo Impostazioni). Collezioni comuni. Ripiego: v291.
- **v293** · Dev e App totalmente separate: App = collezioni e dati attuali (gioco da zero), Dev = copia iniziale delle collezioni (poi indipendente) + dati di gioco di prova; foto separate. Impostazioni: solo le due opzioni. Ripiego: v292.
- **v294** · Set bloccati: ingrigiti senza lucchetto, messaggio rivisto, ingrigiti anche in Album bustine (selezionabili); cambio Dev/App resta in Impostazioni; prima missione Maestro di Kanto (150 Pokémon → Mew Antico in Pokédex e Promo #0); etichetta serie allineata a sinistra; Pokédex: dissolvenza sotto la fascia alta; riepilogo bustine: animazione carte nuove verso il Pokédex. Ripiego: v293.
- **v295** · Pokédex: dissolvenza più dolce (fino a fine pillole); missioni solo su dati bustine; avviso set bloccato con "!"; ricompensa missione nascosta fino al riscatto; animazione carte nuove verso il Pokédex alla chiusura (X) del riepilogo, in ordine di Pokédex. Ripiego: v294.
- **v296** · Avviso blu con "!"; Pokédex: Pokémon mancanti mostrano cornice carta + artwork ufficiale in bianco e nero; animazione Pokédex basata sui Pokémon nuovi del Pokédex delle bustine; tolta etichetta DEV (puntino sull'icona Impostazioni); conversione: "+1" con simbolo bustina. Ripiego: v295.
- **v297** · Pokédex: contorni dei Pokémon mancanti grigi; animazione nuova: dal riepilogo (X) le carte dei Pokémon nuovi si raccolgono rimpicciolendosi nell'icona Pokédex, il numerino resta finché non apri il Pokédex, poi le carte volano nei posti vuoti; conversione bustina: icona senza sfondo, senza "+" e con contorno chiuso. Ripiego: v296.
- **v298** · Icona bustina (conversione, menu in basso, contatore, home): stesso spessore e ingombro, con una linea sopra e una sotto a simulare le estremità argentate. Ripiego: v297.
- **v299** · Animazione riepilogo: le carte in volo mantengono forma e grafica (prima si deformavano) e il volo verso Pokédex è più lungo e visibile; aprendo il Pokédex con carte nuove la vista parte già sulla prima carta da inserire. Ripiego: v298.
- **v300** · Icona bustina rifatta ovunque, senza "+": sagoma da bustina con estremità zigrinate (stesso tratto e ingombro di prima). Ripiego: v299.
- **v301** · Pokédex, segnaposto: cornice esterna un filo più sottile, cornice illustrazione un filo più spessa, area carta con leggerissimo grigio e finestra illustrazione bianca. Ripiego: v300.
- **v302** · Conversione Pokédollari: icona bustina accanto a "+1" allineata a base e altezza delle cifre. Ripiego: v301.
- **v303** · Animazione Pokédex: la carta nuova scende nel suo spazio dall'alto, come nella tasca di un album. Ripiego: v302.
- **v304** · Animazioni carte verso il Pokédex (riepilogo e Pokédex) più lente e fluide. Ripiego: v303.
- **v305** · Pokédex: scroller verticale (compare mentre scorri, sparisce dopo ~1 s, trascinabile); Dev: massimo ×3 bustine insieme; animazione carte nel Pokédex rifatta (entrano dall'alto nella tasca e si fermano esatte, una alla volta); nuove missioni (tutte le illustrazioni Base/Jungle/Fossil → Jigglypuff promo 7, 10 bustine → Meowth promo 10, 20 Pokédollari guadagnati → Meowth Team Rocket promo, scambio Pokédollari→bustina → Dark Persian promo); Mew Antico sempre come carta 0 dell'album Promo. Ripiego: v304.
- **v306** · Scroller Pokédex: corretto lo scatto al tocco (una regola CSS esterna spostava la maniglia); si afferra solo la maniglia e segue il dito esattamente. Ripiego: v305.
- **v307** · Missioni: Meowth promo 10 → una bustina aperta in 10 giorni diversi; Meowth Team Rocket → 60 Pokédollari guadagnati; Dark Persian → 3 bustine ottenute scambiando Pokédollari. Ripiego: v306.
- **v308** · Scroller Pokédex: centrato nel margine tra carte e bordo schermo, sia a riposo sia premuto (si allarga restando centrato). Ripiego: v307.
- **v309** · Animazione carte nel Pokédex rifatta: la carta scende dall'alto direttamente nel suo spazio (stesso riquadro, quindi si ferma esatta), più veloce (0,65 s), si aspetta la fine dello scorrimento prima di ogni carta così si vedono tutte. Ripiego: v308.
- **v310** · Animazione Pokédex: la carta parte da un filo più in alto; appena entra nello spazio fa un piccolo "assestamento" (scala 1,045→1) e un riflesso di luce che attraversa la carta. Ripiego: v309.
- **v311** · Flash di luce dietro la carta quando entra nel Pokédex; icona bustina con estremità leggermente più larghe; pallino Dev → pillola arancione "DEV"; missioni: anteprima grigia, carta allineata al titolo, "Nome – Promo N", completate in fondo in ordine cronologico, Mew segreto con carta misteriosa; Mew Antico sempre prima carta Promo (anche su salvataggi esistenti); album Promo in App: carte non ottenute = carta misteriosa (in Dev restano grigie); Dev: missione di prova (3 tocchi, premio Bulbasaur di prova in fondo ai Promo, si rigenera con 3 tocchi). Ripiego: v310.
- **v340** · Anti-blocco: se una transizione fallisce non resta più il velo fisso (si toglie da solo, al massimo dopo 2 secondi); ogni errore compare in un avviso rosso e si può copiare da Impostazioni › Diagnostica; se un avvio non arriva in fondo, il successivo parte senza le code in sospeso (animazioni carte) e lo segnala; errori d'avvio non più silenziosi. Ripiego: v339.
- **v339** · Bacheche: terza voce nella pagina Album (icona teca). Fino a 3 bacheche, con (+) per crearne; scelta di origine (Album bustine oppure un album della Collezione, mai mischiate), dimensione (singola/doppia/tripla), stile (Vetro, Legno, Museo) e nome. Si trascina per inclinare la teca (riflessi di vetro e holo che seguono l'inclinazione e, con Effetti di luce, il giroscopio). Tocco su slot vuoto = sceglie carta; tocco su carta = apre; tenuto = sostituisci/rimuovi; menu ⋯ = nome e stile / elimina. Incluse nel backup. Ripiego: v338.
- **v338** · Animazioni bustina: rara non holo = alone azzurro, anello e pochi scintillii con suono semplice; holo = lampo dorato, raggi rotanti, tre onde, 34 scintille e carta che pulsa con suono più ricco. Partono subito alla comparsa della carta (nessuna attesa) e spariscono se passi alla carta dopo. Ripiego: v337.
- **v337** · Effetti sonori sintetizzati (12 suoni, nessun file audio, seguono l'interruttore Effetti sonori e il silenzioso): strappo bustina, scorrimento carte, NUOVA!, rara, holo, carta che si posiziona (Album e Pokédex), pagina girata, carta ottenuta, cuore, conversione Pokédollari. Cuore preferito pieno bianco (non rosso). Ripiego: v336.
- **v336** · Preferiti: cuore (tondo, a sinistra di schermo intero e chiudi) nella carta aperta e a schermo intero, pieno e rosso se preferita; cuoricino in alto a sinistra sullo slot; filtro "Preferite" negli album (non nel Pokédex). Ripiego: v335.
- **v335** · FIX CRITICO: con carte in attesa di entrare nell'album, riaprendo l'app lo script andava in errore all'avvio (variabili dichiarate troppo tardi) e restava la pagina vuota. Dichiarazioni spostate prima del primo disegno. Ripiego: v332 (v333/v334 hanno il difetto).
- **v334** · Animazione album: toccando il tab di un set con badge parte sempre, anche se un'altra animazione è in corso (attende la fine); il tocco sui tab non salta più l'animazione. Ripiego: v333.
- **v333** · Riepilogo bustine: tutte le carte volano verso l'icona Album (non più Pokédex); numerino carte nuove su Album (menu), su "Album bustine" (selezione) e su ogni set; entrando nell'Album con carte nuove si apre il primo set (ordine di uscita) a pagina 1, si saltano le pagine senza novità e ogni carta scende dall'alto prendendo il posto di quella in bianco e nero (numerino che scende); gli altri set con numerino partono al tocco; un tocco salta; uscendo a metà restano in sospeso. Pokédex invariato (animazione all'apertura). Ripiego: v332.
- **v332** · Pokédex: silhouette dello stesso grigio dei bordi/"?"; via le linee orizzontali tra le righe e righe più vicine (da 14px a 9px). Ripiego: v331.
- **v331** · Carte nascoste (album Promo e Mew Antico in missione) identiche a quelle del Pokédex: causa della differenza era la regola `.msi i` (barretta di progresso) applicata al bordo interno; sfondo/anello/angoli ora gli stessi. Ripiego: v330.
- **v330** · Carte nascoste: via i puntini; "?" più grande e dello stesso colore dei bordi; bordi proporzionali alla dimensione (Mew Antico in missione identico a quelle del Pokédex, con anello esterno). Ripiego: v329.
- **v329** · Carte nascoste (Mew Antico in missione e promo non ancora prese): stessa grafica delle carte nascoste del Pokédex, con icona "?" nello spazio illustrazione; effetti di luce (stelline e riflesso) mantenuti. Ripiego: v328.
- **v328** · Pokédex: Pokémon mancanti = silhouette (stessa immagine, filtro CSS grigio diverso per Classica/Scura) e nome "???" che diventa il nome quando la carta atterra. Precaricamento immagini solo per i Pokémon non posseduti. Ripiego: v327.
- **v327** · Popup bustine: barra di nuovo sottile (8px); lo slash di N/6 ora alto quanto le cifre. Ripiego: v326.
- **v326** · Barra bustine più alta (18px, come il testo). Ripiego: v325.
- **v325** · Popup bustine: barra unica con sottili divisioni (mask trasparente) invece di 6 segmenti separati. Ripiego: v324.
- **v324** · Popup bustine: barra a 6 tacche = bustine disponibili (piena da 6/6 in su), non più il tempo. Ripiego: v323.
- **v323** · Bustine: contatore unico N/6 (può superare 6 con le conversioni), a mezzanotte +3 solo sotto 6 (tetto 6), da 6 in su "Limite raggiunto"; popup mostra N/6 e "Nuove bustine tra…"; bonus esistenti migrati nel contatore. Ripiego: v322.
- **v322** · Fix "Nuova!/Nuovo Pokémon" falsi: le carte di gruppo (collezione una-per-Pokémon) finivano nei pool delle bustine e non venivano salvate; ora escluse e pkAdd risolve anche gli slot di gruppo. Badge Pokédex subito visibile dopo riepilogo → Album/Apri un'altra. Atterraggio carta nel Pokédex più lento. Ripiego: v321.
- **v321** · Pokédex scuro: tab Kanto/Johto/Hoenn opachi (niente effetto doppio con le carte sotto); finestra illustrazione delle carte mancanti nera. Ripiego: v320.
- **v320** · Riepilogo bustine: «Vai all’album» e «Apri un’altra» ora fanno prima l’animazione delle carte nel Pokédex (con numerino) e poi aprono la pagina scelta; filtri Pokédex: ordine Album · Collezione · Entrambi, default Album. Ripiego: v319.
- **v319** · Pokédex dal riepilogo (tap sul numerino): riparte sempre dall’alto, anche se era rimasto scrollato (reset esplicito prima del riempimento). Ripiego: v318.
- **v318** · Album: da altre pagine il tasto riporta esattamente dov’eri (set e pagina); secondo tocco → scelta modalità, e la scelta riparte dalla prima pagina del primo album; primo avvio sulla scelta. «20 ₽ → +1 bustina»: numeri e icone alla stessa altezza, spazi uguali. Ripiego: v317.
- **v317** · Pokédex: si apre sempre dall’alto e, con carte nuove, scorre velocemente fino alla prima e poi scende; Album nel menu porta sempre alla scelta; icone della scelta in cerchio (stessi spessori/dimensioni del menu); carta aperta da missione senza menu; testi Doppie: «20 ₽ → +1 bustina» (anche nel popup conversione), «Si convertono solo le doppie», «Solo doppie». Ripiego: v316.
- **v316** · Doppie: via il titolo, switch Converti/Scambia centrato (alto come la X), testo di modalità con (i) e pop-up informativi; Missioni: nome carta sempre allineato, scroll mantenuto al tocco, testi toast; «Dark X» ovunque; Bulbasaur prova con sfondo verde; «NUOVO POKÉMON!» maiuscolo. Ripiego: v315.
- **v315** · Missioni: testi accorciati (non troncati), spunta blu anche nella missione Dev, riscatto apre la carta e poi toast; Pokédex: precarico in background di anteprime e carte, coda e contatore coerenti, filtro azzerato durante il riempimento; riepilogo: simbolo Pokédex in cerchio a destra di NUOVA!, in apertura pillola «Nuovo Pokémon!»; app parte da Bustine, menu: Bustine · Album · Pokédex · Impostazioni; titolo Album allineato. Ripiego: v314.
- **v314** · Menu: «Album» (ex Collezione) apre la scelta Album bustine / Collezione personale; ricliccando in un album torna alla scelta, da altre pagine riapre l’ultima modalità; X rotonda negli album, via l’icona album dalle Bustine; titolo e X fissi nelle Missioni; Pokédex: secondo tap sull’icona → torna in cima; Bustine: secondo tap → Set Base, primo pacchetto. Ripiego: v313.
- **v313** · Missioni completate compatte (spunta blu, testo max 2 righe); nomi italiani (Meowth del Team Rocket…); Pokédex: precarico immagini prima di ogni carta e anteprime più leggere/anticipate; bustine senza doppioni di nome e max 1 Unown; simbolo Pokédex vicino a NUOVA!; Bulbasaur promo in alta definizione; holo promo 9,10,11,13,15,17,24,34,35 (34/35 senza illustrazione e cornice). Ripiego: v312.
- **v312** · FIX avvio da iPhone: v311 si bloccava all'apertura (pagine vuote) perché l'album Promo leggeva `PKDEV` prima della sua definizione quando l'ultima modalità era «Bustine»; ora usa `ENV`. Aggiunto test di avvio `tests/startg.js` (App/Dev × Bustine/Collezione). Ripiego: v310 (v311 difettosa).

## v341
- Album (animazione riempimento): carta ferma in posizione con lo stesso bordo della tasca (niente "sotto la tasca"), luce dorata dietro la carta come nel Pokédex, pagina che si gira (curl + suono) quando si cambia pagina durante l'inserimento.
- Verso del Pokémon anche aprendo la carta promo appena riscattata da missione (precarico + ritentativo); XT (Bulbasaur) ora ha il verso.
- Sbustinare: effetto "Nuova!"/"NUOVO POKÉMON!" dalle scritte (pop, anelli, stelle) insieme al suono, poi il verso; per rare/holo prima effetto+suono, poi il verso.
- Album bustine: set non ancora sbloccati non apribili, stesso messaggio di Bustine.
Ripiego: v340

## v342
- Carta aperta: icone set e simbolo rarità (stella) allineati verticalmente al testo (erano ~1 px più in basso) su tutte le carte.
- EX Deoxys bloccato come gli altri set EX finché non si completa Neo (album e bustine).
Ripiego: v341

## v343
- Album: la carta in arrivo atterrava ~14 px più in basso della tasca (il livello fisso non coincideva con le coordinate): ora si corregge e la segue in tempo reale, quindi si ferma esattamente in posizione.
- Album: durante l'inserimento si salta direttamente alla pagina con la carta nuova (un solo giro di pagina, senza passare dalle pagine intermedie).
- Sbustinare: ordine effetto rara/holo → verso → "Nuova!" (animazione + suono) appena finito il verso.
Ripiego: v342

## v344
- Pokédex: doppio tocco / pressione su Pokémon non registrato non apre più il pop-up miniature; le miniature di carte non ottenute non si aprono (restano ferme); aprendo una carta dal pop-up si scorre poi tra i Pokémon con le carte mostrate nel Pokédex.
- Sbusto: le scritte compaiono subito (stessa velocità di x2/x3), animazione e suono "Nuova" alla fine dopo il verso; "NUOVA!" diventa "NUOVA CARTA!" (solo sbusto) e le due pillole stanno nella larghezza della carta.
- Alone dorato rettangolare (forma della carta) in Album e Pokédex.
- Barra che si abbassava dopo la chiusura del riepilogo: riallineamento ripetuto dopo la chiusura (causa non riprodotta qui).
Ripiego: v343

## v345
- Sbusto: pillola singola come prima; solo con "Nuova carta" + "Nuovo Pokémon" insieme si riducono per stare nella larghezza della carta. Effetto rarità/holo anticipato (~300 ms).
- Album (inserimento carte): il giro di pagina ora mostra sotto direttamente la pagina di destinazione (prima si vedeva la pagina successiva e poi si saltava); vale anche all'indietro.
Ripiego: v344

## v346
- Effetto rarità/holo ancora più anticipato (primo pacchetto 500 ms, carte successive 130 ms).
Ripiego: v345

## v346
- Effetto rarità/holo ancora più anticipato (primo pacchetto 500 ms, carte successive 130 ms).
Ripiego: v345

## v347
- Rara/holo: effetto e suono partono nello stesso istante in cui partirebbe il verso su una carta normale (800 ms primo pacchetto, 190 ms poi), anche se la carta è nuova; poi il verso, poi "Nuova!".
Ripiego: v346

## v348
- Bacheche: titolo come le altre pagine con (x) a destra; bacheche a scorrimento orizzontale (come le bustine) con effetto rotazione, nome e opzioni sotto, pallini; massimo 10 (con slide "+" per crearne una nuova).
- Stili ridisegnati: Vetro (acrilico spesso con fondo scuro e basamento), Legno (cornice in noce, feltro verde, targhetta in ottone), Museo (cornice nera con filetto oro e faro dall'alto); fermacarte sotto ogni carta e ombra a terra.
Ripiego: v347

## v349
- Carta rara/holo aperta da Album o Pokédex: stessa animazione di rarità/holo dello sbusto (senza suono di rarità; c'è il verso del Pokémon). Lo sbusto resta invariato.
Ripiego: v348

## v350
- Bacheche: tolti i fermacarte; di nuovo rotazione/tilt col dito (e luce col movimento del telefono, che nella v348 si era interrotta); si passa da una bacheca all'altra scorrendo in verticale.
- Scelta carta: apre l'album scelto (bustine o la collezione della bacheca), tocchi la carta, conferma "Sì, mettila" e la mette; con bacheca doppia/tripla continua direttamente con gli slot vuoti. Barra "Scegli la carta…" con Annulla.
Ripiego: v349

## v351
- Bustine: con 0 bustine, toccare una bustina (sbiadita) apre lo stesso popup dell'icona bustina in alto (disponibili / prossima ricarica).
Ripiego: v350

## v352
- Bacheche: si passa da una all'altra scorrendo in orizzontale (swipe lungo o veloce); un trascinamento breve ruota la bacheca. Pallini sotto.
Ripiego: v351

## v353
- Bacheche: le carte holo mantengono l'effetto holo (come nella carta aperta), che reagisce a rotazione col dito e movimento del telefono.
Ripiego: v352

## v354
- Bacheche: si cambia bacheca scorrendo orizzontalmente sulla zona in basso (scritte e pallini); il trascinamento sulla bacheca la ruota soltanto.
- Rotazione più corretta: la bacheca ruota come un blocco unico (niente profondità interna che faceva muovere le carte l'una rispetto alle altre), prospettiva più morbida, angoli limitati.
Ripiego: v353

## v403
- Scambio: sulle tessere il gettone dei Pokédollari mostra il simbolo di rarità (cerchio, rombo, stella, stella+scintilla, fulmine) al posto della P. Converti invariato (numero di monete).
- Ripiego: v402

## v404
- Album: la carta che entra in tasca usa animazione a transform (come il Pokédex), niente più calcoli di layout a ogni frame.
- Riepilogo→icona album: le copie delle carte partivano 14px più in basso (il body ha un transform e sposta i fixed): ora si allineano all'originale.
- Luce d'ingresso in album/Pokédex: bianco caldo, meno giallo, più luminosa.
- Audio: al rientro nell'app il contesto audio viene riattivato (visibilitychange/pageshow/focus) e ricreato se resta sospeso.
- Sbusto: la carta scorsa non ricompare più per un frame (fill forwards).
- Ripiego: v403

## v405
- Album bustine: i tre puntini sono sostituiti da «Ordine» (icona frecce su/giù, dopo la tavolozza): Numero set / Pokédex, scelta ricordata per ogni set.
- Filtri album bustine: tolto «In arrivo».
- Tolti ovunque «Cambia retro delle carte» e «Esporta carte per il widget».
- Ripiego: v404

## v406
- Cloud: la scelta «telefono o cloud» ora spiega perché compare, mostra le carte di ciascun lato e la data del cloud, e indica quella consigliata (più carte).
- Ripiego: v405

## v407 · Collezione c1 — divisione in due app
- Nuova app **Collezione** (`collezione.html`, manifest e icona propri): solo album collezione, Pokédex e bacheche con carte della collezione. Niente bustine, missioni, scambi né scelta tra modalità. Statistiche: solo «Carte uniche» e «Set completati».
- Collezione usa chiavi proprie (prefisso `col_`) e al primo avvio copia i dati già segnati da CardDex (carte, album personalizzati, ordini, nome, tema); non copia i dati del gioco né la sessione cloud (si rientra col codice di accesso). Cloud: riga separata (`env` = `col`).
- CardDex: tolta la Collezione personale (modalità, selettore Album, scelta nelle bacheche e nel Pokédex). I dati della collezione restano intatti nel telefono e nel cloud, solo non più visibili; le bacheche della collezione restano salvate ma nascoste.
- Generati da `tools/split_apps.py` a partire dalla v406; test `tests/col.js`.
- Ripiego: v406 (`/tmp/base_v406.html` = tag git v406)

## Collezione c2
- Dopo l'accesso col codice, se la riga cloud della Collezione è vuota carica da sola la collezione, il nome e le bacheche della collezione dalla riga di CardDex (utile quando Safari e l'app sulla Home non condividono i dati del telefono).

## Collezione c3
- Account › Dati: «Carica da CardDex (cloud)» mostra quante carte segnate ci sono nel cloud di CardDex e le carica su richiesta; se non ce ne sono, indica di usare il backup.
- Importando un backup le bacheche del gioco non entrano più.

## Archivio immagini (sw.js, tools)
- `sw.js`: se esiste `img/index.json`, immagini e versi esterni vengono serviti dalla copia locale `img/` (con cache); se manca o fallisce, ripiego identico a prima. Senza `img/` non cambia nulla.
- `tools/make_manifest.js` genera `tools/assets_manifest.json` (4190 voci); `tools/archivia_immagini.py` scarica tutto (riprende, gentile coi siti).
- Verificato: con immagini bloccate restano i segnaposto (nome, numero, tipo); con copia locale le carte si vedono anche senza rete esterna.

## v408 · Collezione c4 — cloud semplificato
- Se telefono e cloud hanno dati diversi, niente più domande: l'app li unisce da sola (parte dal lato con più carte e aggiunge le carte segnate dell'altro; non toglie mai carte) e salva. Prima dell'unione tiene una copia dei dati del telefono, recuperabile da Account › Cronologia e salvataggio.
- Account: tolti «Sincronizza ora» e l'orario; stato «Tutto salvato nel cloud». «Versioni salvate» diventa «Cronologia e salvataggio» (con «Salva ora» per le emergenze). Testi più semplici da non collegato.
- Test: `tests/cloud.js` (unione, storico, bottone assente).
- Ripiego: v407 / c3
