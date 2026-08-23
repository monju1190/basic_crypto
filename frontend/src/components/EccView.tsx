"use client";
import { useState } from "react";

export default function EccView() {
  // ECC Domain Parameters
  const [p, setP] = useState(17);
  const [a, setA] = useState(2);
  const [b, setB] = useState(2);
  const [n, setN] = useState(19);
  
  const [Gx, setGx] = useState(5);
  const [Gy, setGy] = useState(1);
  const [privKey, setPrivKey] = useState(3);
  
  // ECDH Inputs
  const [privA, setPrivA] = useState(3);
  const [privB, setPrivB] = useState(10);
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePoints = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:8000/api/ecc/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p, a, b }),
      });
      const data = await res.json();
      setResult({ type: "Points on Curve", ...data });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleGenerateKeypair = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:8000/api/ecc/keypair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p, a, b, Gx, Gy, private_key: privKey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Server Error");
      setResult({ type: "Keypair Generation", ...data });
    } catch (e: any) {
      alert(e.message);
    }
    setLoading(false);
  };

  const handleKeyExchange = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:8000/api/ecc/ecdh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p, a, b, Gx, Gy, private_a: privA, private_b: privB }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Server Error");
      setResult({ type: "ECDH Key Exchange", ...data });
    } catch (e: any) {
      alert(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[32px] font-bold font-headline text-on-surface mb-1">ECC Configuration</h1>
          <p className="text-on-surface-variant text-[16px]">Elliptic Curve Cryptography Domain parameters over F_p and ECDH Key Exchange.</p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/20">
          <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
          <span className="font-mono text-xs text-on-surface-variant font-medium">API: Online</span>
          <span className="text-on-surface-variant opacity-50 px-2">|</span>
          <span className="font-mono text-xs text-primary-fixed-dim font-medium">Latency: 12ms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <section className="glass-panel rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
            <h3 className="text-[18px] font-semibold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container">tune</span>
              Domain Parameters
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Prime (p) & Curve Coeffs (a, b)</label>
                <div className="grid grid-cols-3 gap-2 bg-surface-container p-3 rounded-lg border border-outline-variant/30">
                    <div>
                        <div className="text-[10px] text-on-surface-variant uppercase mb-1 font-mono">p</div>
                        <input type="number" className="w-full bg-background border border-outline-variant/30 rounded px-2 py-1 text-primary-fixed-dim outline-none font-mono focus:border-primary text-sm" value={p} onChange={(e) => setP(Number(e.target.value))} />
                    </div>
                    <div>
                        <div className="text-[10px] text-on-surface-variant uppercase mb-1 font-mono">a</div>
                        <input type="number" className="w-full bg-background border border-outline-variant/30 rounded px-2 py-1 text-primary-fixed-dim outline-none font-mono focus:border-primary text-sm" value={a} onChange={(e) => setA(Number(e.target.value))} />
                    </div>
                    <div>
                        <div className="text-[10px] text-on-surface-variant uppercase mb-1 font-mono">b</div>
                        <input type="number" className="w-full bg-background border border-outline-variant/30 rounded px-2 py-1 text-primary-fixed-dim outline-none font-mono focus:border-primary text-sm" value={b} onChange={(e) => setB(Number(e.target.value))} />
                    </div>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Base Point G (x, y) & Order n</label>
                <div className="grid grid-cols-3 gap-2 bg-surface-container p-3 rounded-lg border border-outline-variant/30">
                    <div>
                        <div className="text-[10px] text-on-surface-variant uppercase mb-1 font-mono">Gx</div>
                        <input type="number" className="w-full bg-background border border-outline-variant/30 rounded px-2 py-1 text-primary-fixed-dim outline-none font-mono focus:border-primary text-sm" value={Gx} onChange={(e) => setGx(Number(e.target.value))} />
                    </div>
                    <div>
                        <div className="text-[10px] text-on-surface-variant uppercase mb-1 font-mono">Gy</div>
                        <input type="number" className="w-full bg-background border border-outline-variant/30 rounded px-2 py-1 text-primary-fixed-dim outline-none font-mono focus:border-primary text-sm" value={Gy} onChange={(e) => setGy(Number(e.target.value))} />
                    </div>
                    <div>
                        <div className="text-[10px] text-on-surface-variant uppercase mb-1 font-mono">n (Order)</div>
                        <input type="number" className="w-full bg-background border border-outline-variant/30 rounded px-2 py-1 text-primary-fixed-dim outline-none font-mono focus:border-primary text-sm" value={n} onChange={(e) => setN(Number(e.target.value))} />
                    </div>
                </div>
              </div>
              
              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Private Key Input</label>
                <input type="number" className="w-full bg-surface-container text-primary-fixed-dim border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary outline-none font-mono text-sm" value={privKey} onChange={(e) => setPrivKey(Number(e.target.value))} placeholder="Priv" />
              </div>

              <div className="flex gap-4">
                <button onClick={handleGeneratePoints} disabled={loading} className="flex-1 bg-surface-variant text-on-surface border border-outline-variant/30 py-3 rounded-lg text-[12px] font-mono uppercase font-bold hover:bg-surface-bright transition-colors flex items-center justify-center gap-2 active:scale-95">
                  <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
                  LIST Ps
                </button>
                <button onClick={handleGenerateKeypair} disabled={loading} className="flex-1 bg-primary text-on-primary py-3 rounded-lg text-[12px] font-mono uppercase font-bold glow-button inner-glow flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-sm">key</span>
                  GEN KEYPAIR
                </button>
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary/50 group-hover:bg-secondary transition-colors"></div>
            <h3 className="text-[18px] font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">sync_alt</span>
              ECDH Key Exchange
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Alice & Bob Private Keys</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant text-xs font-mono">a=</div>
                      <input type="number" className="w-full bg-surface-container text-secondary-fixed-dim border border-outline-variant/30 rounded-lg pl-8 pr-4 py-2.5 focus:border-secondary outline-none font-mono text-sm" value={privA} onChange={(e) => setPrivA(Number(e.target.value))} />
                  </div>
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant text-xs font-mono">b=</div>
                      <input type="number" className="w-full bg-surface-container text-secondary-fixed-dim border border-outline-variant/30 rounded-lg pl-8 pr-4 py-2.5 focus:border-secondary outline-none font-mono text-sm" value={privB} onChange={(e) => setPrivB(Number(e.target.value))} />
                  </div>
                </div>
              </div>
              
              <button onClick={handleKeyExchange} disabled={loading} className="w-full bg-secondary text-on-secondary py-3 rounded-lg text-[12px] font-mono uppercase font-bold shadow-[0_0_15px_rgba(206,189,255,0)] hover:shadow-[0_0_15px_rgba(206,189,255,0.3)] transition-shadow inner-glow flex items-center justify-center gap-2 active:scale-95">
                <span className="material-symbols-outlined text-sm">wifi_protected_setup</span>
                SIMULATE ECDH
              </button>
            </div>
          </section>
        </div>

        <div className="lg:col-span-7 h-full">
          <section className="glass-panel rounded-xl flex flex-col h-full min-h-[500px]">
            <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/30">
              <h3 className="text-[18px] font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">terminal</span>
                Execution Results
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 font-mono text-[10px] uppercase border border-green-500/20">{result ? "200 OK" : "IDLE"}</span>
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto bg-surface-container-lowest/50 custom-scrollbar">
              {!result ? (
                 <div className="h-full flex items-center justify-center text-on-surface-variant/50 font-mono text-sm">Waiting for execution...</div>
              ) : (
                <div className="space-y-6">
                  
                  {result.points && (
                    <div>
                      <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest flex justify-between">List of all Ps ({result.count})</h4>
                      <div className="bg-background border border-outline-variant/30 rounded-lg p-4 max-h-64 overflow-y-auto custom-scrollbar">
                        <div className="flex flex-wrap gap-2">
                          {result.points.map((p: any, i: number) => (
                            <div key={i} className="bg-surface-container border border-outline-variant/30 px-2 py-1 rounded text-xs font-mono text-primary-fixed-dim">
                              ({p[0]}, {p[1]})
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {result.public_key && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest">Private Key</h4>
                        <div className="bg-background border border-outline-variant/30 rounded-lg p-3">
                          <p className="font-mono text-sm text-secondary-fixed-dim break-all leading-relaxed">
                            {result.private_key}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest">Public Key Point</h4>
                        <div className="bg-background border border-outline-variant/30 rounded-lg p-3">
                          {result.public_key ? (
                            <p className="font-mono text-sm text-primary-fixed break-all leading-relaxed">
                              ({result.public_key[0]}, {result.public_key[1]})
                            </p>
                          ) : (
                            <p className="font-mono text-xs text-error">Error: Point at Infinity</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {result.shared_secret && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-mono text-[11px] text-secondary mb-2 uppercase tracking-widest">Shared Secret Key</h4>
                        <div className="bg-secondary-container/20 border border-secondary/30 rounded-lg p-4 text-center">
                          <p className="font-mono text-lg font-bold text-secondary-fixed-dim break-all leading-relaxed">
                            {result.shared_secret ? `(${result.shared_secret[0]}, ${result.shared_secret[1]})` : "Invalid"}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest">Alice Public</h4>
                          <div className="bg-background border border-outline-variant/30 rounded-lg p-3">
                            <p className="font-mono text-sm text-on-surface break-all leading-relaxed">
                              {result.public_a ? `(${result.public_a[0]}, ${result.public_a[1]})` : "Invalid"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest">Bob Public</h4>
                          <div className="bg-background border border-outline-variant/30 rounded-lg p-3">
                            <p className="font-mono text-sm text-on-surface break-all leading-relaxed">
                              {result.public_b ? `(${result.public_b[0]}, ${result.public_b[1]})` : "Invalid"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest">Process Log</h4>
                    <div className="bg-background border border-outline-variant/30 rounded-lg p-4 font-mono text-[12px] text-on-surface-variant space-y-1">
                      <div className="flex gap-4"><span className="text-primary-fixed-dim/70 w-20">[OK]</span> <span>Executing operation...</span></div>
                      {result?.type && <div className="flex gap-4"><span className="text-primary-fixed-dim/70 w-20">[OK]</span> <span className="text-green-400">{result.type} successful.</span></div>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
