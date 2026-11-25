import numpy as np, wave
SR=44100;rng=np.random.default_rng(7)
def buf(d):return np.zeros(int(SR*d))
def add(o,s,x):
    s=int(s*SR);n=min(len(x),len(o)-s);o[s:s+n]+=x[:n]
def tri(ph):return (2/np.pi)*np.arcsin(np.sin(2*np.pi*ph))
def env(n,d,v,at=.01):
    tt=np.arange(n)/SR;a=np.minimum(1,tt/at);dec=np.power(.0001/v,np.minimum(1,tt/d)) if v>0 else 0
    return a*dec
def tone(f,d,v=.17,f1=None,ov=.35,dur_extra=.0):
    n=int((d+.03)*SR);tt=np.arange(n)/SR
    fr=np.linspace(f,f1,n) if f1 else np.full(n,f);ph=np.cumsum(fr)/SR
    w=tri(ph)+ov*np.sin(2*np.pi*np.cumsum(fr*2)/SR)*.6
    e=np.minimum(1,tt/.01)*np.power(.0001/v,np.minimum(1,tt/d))
    return w*e*v/ v*1.0 if False else w*e
def noise(d,v,f0,f1,shape=2):
    n=int(d*SR);tt=np.arange(n)/SR;x=rng.standard_normal(n);out=np.zeros(n);lp=lp2=0
    for i in range(n):
        f=f0+(f1-f0)*i/n;a=min(1,2*np.pi*f/SR);lp+=a*(x[i]-lp);lp2+=a*(lp-lp2);out[i]=lp-lp2
    out/=np.max(np.abs(out));return v*out*np.sin(np.pi*np.minimum(1,tt/d))**shape
def hp(d,v):
    n=int(d*SR);tt=np.arange(n)/SR;x=rng.standard_normal(n);y=np.diff(x,prepend=0);y/=np.max(np.abs(y));return v*y*np.minimum(1,tt/.05)*np.exp(-tt*(3/d))
def save(name,o,dur):
    o=o[:int(SR*dur)].copy();o/=max(1e-9,np.max(np.abs(o)));o*=.75
    f=int(.01*SR);o[-f:]*=np.linspace(1,0,f)
    with wave.open(name,'w') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((o*32767).astype(np.int16).tobytes())
N=lambda m:440*2**((m-69)/12);P='proposte_v4/'
V=lambda x:x

def sn(f,d,v=.2,at=.008,f1=None):  # sinusoide morbida (come i toni "vetro" attuali)
    n=int((d+.03)*SR);tt=np.arange(n)/SR;fr=np.linspace(f,f1,n) if f1 else np.full(n,f);ph=np.cumsum(fr)/SR
    e=np.minimum(1,tt/at)*np.power(.0001/v,np.minimum(1,tt/d))
    return np.sin(2*np.pi*ph)*e
def bell(f,d,v=.2):  # campanella di vetro: fondamentale + parziali che muoiono prima
    return sn(f,d,v)+.35*sn(f*2,d*.55,v*.5)[:int((d+.03)*SR)]*0+0
def glass(f,d,v=.2):
    a=sn(f,d,v);b=sn(f*2,d*.55,v*.45);c=sn(f*2.76,d*.3,v*.2)
    n=len(a);o=a.copy();o[:len(b)]+=b[:n];o[:len(c)]+=c[:n];return o
def air(d,v,f0,f1):return noise(d,v,f0,f1,2)
F=lambda m:m  # frequenze in Hz
# 04 scansione Pokedex: stessi 11 passi crescenti, sinusoidi di vetro + soffio d'aria che sale (al posto dell'onda quadra)
o=buf(2.4);NN=[659,784,880,988,1175,1319,1568,1760,1976,2349,2637]
for k,f in enumerate(NN):
    add(o,k*.118,sn(f,.14,.2,.006))
    if k%2==0:add(o,k*.118,sn(f/2,.14,.07,.006))
add(o,0,air(1.4,.12,1500,4200));add(o,NN.__len__()*.118-.1,glass(2637,.6,.12));save(P+'04b_scan_pokedex_VETRO.wav',o,2.4)
# 11 moneta: due note a campanella di vetro
o=buf(.7);add(o,0,sn(1318,.13,.2));add(o,.08,glass(1760,.55,.2));save(P+'11b_moneta_VETRO.wav',o,.6)
# 16 scambio partenza: stessa melodia, sinusoidi morbide con ottava leggera
o=buf(.9)
for i,f in enumerate([523,659,784,1047,784,1047,1319]):
    add(o,i*.075,sn(f,.11,.2,.006));add(o,i*.075,sn(f*2,.07,.05,.006))
add(o,.3,air(.4,.05,3000,7000));save(P+'16b_scambio_partenza_VETRO.wav',o,.8)
# 17 scambio attesa: stessa salita, pedale grave morbido, scintilla d'aria che cresce
o=buf(2.4);seq=[392,523,392,587,392,659,440,784,523,880,587,988,659,1047,784,1175,880,1319]
for i,f in enumerate(seq):
    add(o,i*.085,sn(f,.12,.17,.006));add(o,i*.085,sn(f*2,.07,.04,.006))
add(o,0,sn(98,1.6,.1,.05));add(o,.05,sn(131,1.6,.06,.05))
add(o,.4,air(1.2,.05,3000,8000));save(P+'17b_scambio_attesa_VETRO.wav',o,2.2)
# 19 scambio fanfara: stessa melodia (con basso all'ottava sotto), nota finale a campanella, pioggia d'aria
M=[(784,.09),(784,.09),(784,.09),(1047,.34),(880,.1),(1047,.1),(1319,.5),(1175,.1),(1319,.1),(1568,.1),(2093,.9)]
o=buf(3.4);x=0
for i,(f,d) in enumerate(M):
    if i==len(M)-1:add(o,x,glass(f,1.4,.22))
    else:add(o,x,sn(f,d*1.4,.2,.006))
    add(o,x,sn(f/2,d*1.2,.08,.006));x+=d
add(o,x-.9,air(1.2,.06,4000,9500));save(P+'19b_scambio_fanfara_VETRO.wav',o,3.2)
