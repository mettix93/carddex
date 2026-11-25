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
N=lambda m:440*2**((m-69)/12);P='proposte_v3/'
V=lambda x:x

def sq(f,d,v=.05,duty=.25):
    n=int((d+.02)*SR);tt=np.arange(n)/SR;ph=(f*tt)%1.0;w=np.where(ph<duty,1.0,-1.0)*v
    e=np.minimum(1,tt/.004)*np.minimum(1,np.maximum(0,(d-tt)/.03+.0));return w*e
def gb(f,d,v=.2):  # timbro misto: triangolo morbido + ottava + pizzico di onda quadra (linea Game Boy + vetro)
    x=tone(f,d,v,ov=.35);y=sq(f,d,.05)
    n=min(len(x),len(y));return x[:n]+y[:n]
# 13 taglio busta: crepitii più morbidi e bassi + piccola nota che sale a fine taglio
o=buf(1.2);add(o,0,noise(.5,.5,900,2600,1))
for i in range(22):add(o,rng.random()*.45,noise(.02+rng.random()*.02,.3,1200+rng.random()*1500,2500+rng.random()*1500,1))
add(o,.46,tone(N(79),.2,.18));add(o,.52,tone(N(84),.4,.16));save(P+'13b_taglio_busta_NUOVO.wav',o,1.0)
# 14 sblocco: arpeggio pentatonico che sale, luccichio morbido
o=buf(1.4)
for i,m in enumerate([84,88,91,96]):add(o,i*.08,tone(N(m),.7,.2))
add(o,.1,hp(.9,.05));save(P+'14b_sblocco_NUOVO.wav',o,1.2)
# 15 sblocco oro: arpeggio ampio su due ottave, chiusura piena
o=buf(2.4)
for i,m in enumerate([72,76,79,84,88,91,96,100]):add(o,i*.085,tone(N(m),1.1,.19))
for m in (84,91,96):add(o,.85,tone(N(m),1.2,.12))
add(o,.15,hp(1.4,.06));save(P+'15b_sblocco_oro_NUOVO.wav',o,2.2)
# 16 scambio partenza: stessa melodia 8-bit in timbro misto
o=buf(.9)
for i,m in enumerate([72,76,79,84,79,84,88]):add(o,i*.075,gb(N(m),.16,.2))
save(P+'16b_scambio_partenza_NUOVO.wav',o,.8)
# 17 scambio attesa: salita ritmica con pedale grave morbido
o=buf(2.4);seq=[67,72,67,74,67,76,69,79,72,81,74,83,76,84,79,86,81,88]
for i,m in enumerate(seq):add(o,i*.085,gb(N(m),.14,.17))
add(o,0,tone(N(43),1.6,.14,ov=.2));save(P+'17b_scambio_attesa_NUOVO.wav',o,2.2)
# 18 scambio lampo: glissando che scende + soffio filtrato, poi scintilla
o=buf(1.1);add(o,0,noise(.45,.35,5000,500,1));add(o,0,tone(N(96),.4,.16,f1=N(60)));add(o,.04,tone(N(103),.4,.1,f1=N(67)));add(o,.34,hp(.6,.05))
save(P+'18b_scambio_lampo_NUOVO.wav',o,1.0)
# 19 scambio fanfara: stessa fanfara in timbro misto + chiusura luminosa
M=[(79,.09),(79,.09),(79,.09),(84,.34),(81,.1),(84,.1),(88,.5),(86,.1),(88,.1),(91,.1),(96,.9)]
o=buf(3.4);x=0
for m,d in M:add(o,x,gb(N(m),d*1.5,.2));add(o,x,tone(N(m-12),d*1.2,.08,ov=.1));x+=d
add(o,x-.9,hp(1.0,.05));save(P+'19b_scambio_fanfara_NUOVO.wav',o,3.2)
