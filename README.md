# carddex
## Archivio locale di immagini e suoni
Le immagini delle carte (TCGdex, Bulbapedia), le figure del Pokédex e i versi dei Pokémon arrivano da siti esterni. Per non dipenderne:
1. `python3 tools/archivia_immagini.py --prova 50` (prova), poi `python3 tools/archivia_immagini.py` (scarica tutto in `img/`, riprende da dove era rimasto).
2. `git add img && git commit -m "archivio immagini" && git push`.
Il service worker (`sw.js`) usa la copia in `img/` quando l'indirizzo è nell'indice `img/index.json`; se manca o fallisce, va in rete come prima. L'elenco degli indirizzi si rigenera con `node tools/make_manifest.js`.
