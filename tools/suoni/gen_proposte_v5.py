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
N=lambda m:440*2**((m-69)/12);P='proposte_v5/'
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
# 18 scambio lampo: attuale = soffio che scende + due sweep quadri 1568->90 / 2093->180 + soffio acuto
# A: stessa forma (sweep discendente), ma sinusoidi morbide con ottava, soffio d'aria
o=buf(1.0);add(o,0,air(.5,.2,6000,300));add(o,0,sn(1568,.45,.1,.004,f1=90));add(o,0,sn(2093,.5,.06,.004,f1=180));add(o,.04,air(.7,.09,9000,3000));save(P+'18a_lampo_VETRO_A_sweep.wav',o,1.0)
# B: colpo di campanella di vetro + coda d'aria che scende (piu' tintinnante)
o=buf(1.0);add(o,0,glass(1568,.7,.16));add(o,.0,sn(784,.5,.07));add(o,0,air(.5,.16,7000,500));add(o,.05,air(.7,.07,9000,3500));save(P+'18b_lampo_VETRO_B_campana.wav',o,1.0)
# C: scintilla: due note di vetro veloci discendenti (2093 -> 1568) con sweep morbido sotto
o=buf(1.0);add(o,0,glass(2093,.35,.14));add(o,.07,glass(1568,.6,.16));add(o,0,sn(1200,.45,.07,.004,f1=120));add(o,0,air(.55,.14,6500,400));save(P+'18c_lampo_VETRO_C_scintilla.wav',o,1.0)
