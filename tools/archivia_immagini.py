#!/usr/bin/env python3
"""Scarica una copia locale di tutte le immagini e i suoni usati da CardDex / Collezione.

Uso (dalla cartella del progetto, quella con carddex-album.html):
    python3 tools/archivia_immagini.py            # scarica tutto in ./img (riprende da dove era rimasto)
    python3 tools/archivia_immagini.py --prova 20 # prova con 20 file

Crea ./img/... e ./img/index.json. Dopo, pubblica la cartella img sul sito (git add img; git commit; git push).
Se un file non si scarica (rete, sito giù) viene saltato: rilancia lo script, riprende solo i mancanti.
"""
import sys, os, re, json, time, hashlib, argparse, urllib.request, urllib.parse, urllib.error
from concurrent.futures import ThreadPoolExecutor

ap = argparse.ArgumentParser()
ap.add_argument("--manifest", default="tools/assets_manifest.json")
ap.add_argument("--out", default="img")
ap.add_argument("--prova", type=int, default=0, help="scarica solo i primi N")
ap.add_argument("--thread", type=int, default=5, help="download in parallelo (gentile coi siti: non esagerare)")
a = ap.parse_args()

def local_path(url):
    """Percorso locale stabile e sicuro per ogni indirizzo."""
    u = urllib.parse.urlsplit(url)
    path = re.sub(r"[^A-Za-z0-9._/-]", "_", urllib.parse.unquote(u.path)).strip("/")
    if u.query:
        h = hashlib.sha1(u.query.encode()).hexdigest()[:8]
        root, ext = os.path.splitext(path)
        path = f"{root}__{h}{ext}"
    return f"{a.out}/{u.netloc.replace(':','_')}/{path}"

def fetch(url, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "CardDex-archivio-personale/1.0"})
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
                if r.status == 200 and data:
                    return data
        except urllib.error.HTTPError as e:
            if e.code in (404, 410):      # non esiste: inutile riprovare
                return None
            time.sleep(1.5 * (i + 1))
        except Exception:
            time.sleep(1.5 * (i + 1))
    return None

def job(group):
    # group = elenco di indirizzi alternativi per la stessa cosa (es. due fonti per lo stesso verso)
    for url in group:
        p = local_path(url)
        if os.path.exists(p) and os.path.getsize(p) > 0:
            return group, p
        data = fetch(url)
        if data:
            os.makedirs(os.path.dirname(p), exist_ok=True)
            with open(p + ".tmp", "wb") as f:
                f.write(data)
            os.replace(p + ".tmp", p)
            return group, p
    return group, None

groups = json.load(open(a.manifest))
if a.prova:
    groups = groups[: a.prova]
print(f"{len(groups)} elementi da archiviare in {a.out}/ ...")
index, fail, done = {}, [], 0
with ThreadPoolExecutor(a.thread) as ex:
    for group, p in ex.map(job, groups):
        done += 1
        if p:
            for url in group:           # ogni indirizzo alternativo punta allo stesso file
                index[url] = p
        else:
            fail.append(group[0])
        if done % 100 == 0:
            print(f"  {done}/{len(groups)}", flush=True)

# indice: indirizzo originale -> percorso relativo alla cartella del sito
old = {}
ip = os.path.join(a.out, "index.json")
if os.path.exists(ip):
    try: old = json.load(open(ip))
    except Exception: old = {}
old.update(index)
os.makedirs(a.out, exist_ok=True)
json.dump(old, open(ip, "w"), separators=(",", ":"))
size = sum(os.path.getsize(os.path.join(d, f)) for d, _, fs in os.walk(a.out) for f in fs)
print(f"Fatto: {len(index)} ok, {len(fail)} falliti. Cartella {a.out}: {size/1e6:.0f} MB, {len(old)} indirizzi nell'indice.")
if fail:
    print("Non scaricati (non esistono sul sito o la rete ha fallito; rilancia per riprovare):")
    for u in fail[:20]: print("  ", u)
