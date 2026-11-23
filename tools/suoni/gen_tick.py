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
N=lambda m:440*2**((m-69)/12)
SC=[72,74,76,79,81,84]
def tkA(i):return tone(N(84),.05,.22)
def tkB(i):return tone(N(SC[i%6]+(12 if (i//6)%2 else 0)),.07,.2)
def tkC(i):return tone(N(88),.06,.2,f1=N(81))
def seq(f):
    o=buf(4.6);t=.15;i=0;add(o,t,f(i));i+=1;t+=1.0;iv=.30
    while iv>.045:add(o,t,f(i));i+=1;t+=iv;iv*=.85
    for _ in range(18):add(o,t,f(i));i+=1;t+=iv
    while iv<.35:add(o,t,f(i));i+=1;t+=iv;iv*=1.16
    return o
import os;os.makedirs('tick',exist_ok=True)
for k,f in (('A_tok',tkA),('B_marimba',tkB),('C_bolla',tkC)):save('tick/'+k+'.wav',seq(f),4.6)
