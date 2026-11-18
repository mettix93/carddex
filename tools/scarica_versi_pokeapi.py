#!/usr/bin/env python3
"""Scarica i versi dei Pokémon da PokeAPI (qualità migliore di Showdown) nella cartella img/
e aggiorna img/index.json così l'app li usa da lì. Solo libreria standard.
Uso (dalla cartella del progetto):  python3 tools/scarica_versi_pokeapi.py
"""
import json, os, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor

BASE = "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/%d.ogg"
OUT = "img/raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/%d.ogg"
IDX = "img/index.json"
if not os.path.exists(IDX):
    sys.exit("Lancia il comando dalla cartella del progetto (quella che contiene la cartella img).")

def get(n):
    url, dest = BASE % n, OUT % n
    if os.path.exists(dest) and os.path.getsize(dest) > 500:
        return n, True
    for i in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "CardDex-archivio-personale/1.0"})
            with urllib.request.urlopen(req, timeout=40) as r:
                d = r.read()
            if len(d) > 500 and d[:4] == b"OggS":
                os.makedirs(os.path.dirname(dest), exist_ok=True)
                open(dest, "wb").write(d)
                return n, True
        except urllib.error.HTTPError as e:
            if e.code in (404, 410):
                return n, False
        except Exception:
            pass
        time.sleep(1.5 * (i + 1))
    return n, False

with ThreadPoolExecutor(4) as ex:
    res = list(ex.map(get, range(1, 387)))
ok = [n for n, g in res if g]
idx = json.load(open(IDX))
for n in ok:
    idx[BASE % n] = OUT % n
json.dump(idx, open(IDX, "w"), ensure_ascii=False, indent=0)
size = sum(os.path.getsize(OUT % n) for n in ok) / 1e6
print(f"Fatto: {len(ok)} versi scaricati su 386 ({size:.1f} MB).")
if len(ok) < 386:
    print("Mancanti:", [n for n, g in res if not g][:40], "- non è un problema: per quelli resta il verso di prima.")
