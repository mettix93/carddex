# Suoni: proposte v2
Proposte nello stile «guadagno» (triangolo morbido con ottava sopra, arpeggi ascendenti, scala Do pentatonica). `*_ATTUALE.wav` = suono nell'app al 22/11/2026, `*_NUOVO.wav` = proposta. Rigenerabili con gen_proposte_v2.py (numpy). Non ancora applicate alle app.

## Tic bustine (23/11/2026)
`gen_tick.py` → `tick/`: A tok (nota fissa), B marimba (sale sulla pentatonica a ogni bustina), C bolla (nota che scende). Ogni file: un tocco singolo, poi giro che accelera e rallenta.

## Giro v3 (25/11/2026)
`proposte_v3/` = tutti i suoni attuali (ATTUALE, renderizzati dal codice vero dell'app con `render_attuali.js`) affiancati ai nuovi (NUOVO). 01–12 = proposte v2, 13–19 = suoni aggiunti dopo (taglio busta, sblocco set, scambio) generati con `gen_proposte_v3.py`. Timbro dei nuovi: triangolo morbido + ottava, scala Do pentatonica; per i suoni di scambio timbro misto Game Boy + vetro. Il tic delle bustine è già nello stile v2 (variante C). Non ancora applicati alle app.
