# CardDex – aggiornamenti

Il più recente in alto. Ogni voce è un caricamento sul sito.

## 29 ottobre

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
