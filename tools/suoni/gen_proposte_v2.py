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
N=lambda m:440*2**((m-69)/12);P='proposte_v2/'
V=lambda x:x
o=buf(1);add(o,0,tone(N(79),.3,.26));add(o,.09,tone(N(84),.45,.24));save(P+'01b_nuova_NUOVO.wav',o,.8)
o=buf(1.4)
for i,m in enumerate([84,88,91]):add(o,i*.1,tone(N(m),.6,.22))
save(P+'02b_rara_NUOVO.wav',o,1.1)
o=buf(1.8)
for i,m in enumerate([72,76,79,84,88,91,96]):add(o,i*.075,tone(N(m),.9,.2))
add(o,.2,hp(.9,.07));save(P+'03b_holo_NUOVO.wav',o,1.6)
o=buf(2.4)
for i,m in enumerate([72,74,76,79,81,84,86,88,91]):add(o,i*.12,tone(N(m),.4,.2))
t=9*.12
for m,v in ((84,.22),(88,.16),(91,.16),(96,.12)):add(o,t,tone(N(m),1.1,v))
save(P+'04b_scan_pokedex_NUOVO.wav',o,2.4)
o=buf(.9);add(o,0,noise(.46,.5,600,1400,1));add(o,.3,tone(N(48),.18,.25,ov=.2));add(o,.31,tone(N(72),.4,.12));save(P+'05b_atterraggio_NUOVO.wav',o,.8)
o=buf(.6);add(o,0,noise(.26,.5,700,2000));add(o,.2,tone(N(79),.25,.08));save(P+'06b_pagina_NUOVO.wav',o,.5)
o=buf(.3);add(o,0,noise(.16,.5,700,2500));save(P+'07b_swipe_NUOVO.wav',o,.22)
o=buf(.5);add(o,0,tone(N(72),.14,.2,f1=N(79)));add(o,.06,tone(N(88),.3,.1));save(P+'08b_ottenuta_NUOVO.wav',o,.45)
o=buf(.6);add(o,0,tone(N(79),.12,.2,f1=N(86)));add(o,.07,tone(N(91),.4,.14));save(P+'09b_preferito_NUOVO.wav',o,.5)
o=buf(.4);add(o,0,tone(N(79),.14,.18,f1=N(72)));save(P+'10b_non_preferito_NUOVO.wav',o,.3)
o=buf(.7);add(o,0,tone(N(88),.12,.2));add(o,.08,tone(N(93),.5,.2));save(P+'11b_moneta_NUOVO.wav',o,.6)
o=buf(1.0)
for i,m in enumerate([72,76,79,84]):add(o,i*.09,tone(N(m),.4,.22))
add(o,.27,tone(N(96),.5,.07));save(P+'12b_guadagno_NUOVO.wav',o,.9)
