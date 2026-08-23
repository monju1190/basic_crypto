"use client";
import { useState } from "react";

export default function SubstitutionView() {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("QWERTYUIOPASDFGHJKLZXCVBNM");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const handleBruteForce = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/substitution/brute_force", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ciphertext: result?.ciphertext || plaintext, key: "" }),
      });
      setResult({ type: "Brute Force Attack", ...(await res.json()) });
    } catch (e) {}
    setLoading(false);
  };

  const handleEncrypt = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/substitution/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plaintext, key }),
      });
      const data = await res.json();
      setResult({ type: "Encryption", ...data });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleDecrypt = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/substitution/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ciphertext: plaintext, key }),
      });
      const data = await res.json();
      setResult({ type: "Decryption", ...data });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full flex-1 min-h-0 space-y-4 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3 flex-shrink-0">
        <div>
          <h1 className="text-[24px] font-bold font-headline text-on-surface mb-1">Substitution Cipher</h1>
          <p className="text-on-surface-variant text-[16px]">Classical substitution cipher with 26-letter key.</p>
        </div>
        
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        <div className="w-full lg:w-5/12 flex flex-col space-y-4 h-full min-h-0 overflow-y-auto custom-scrollbar pr-2 pb-2">
          <section className="glass-panel rounded-xl p-4 relative flex-shrink-0 overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
            <h3 className="text-[18px] font-semibold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container">tune</span>
              Parameters
            </h3>
            <div className="space-y-3">

              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Key (26-letter permutation)</label>
                <input
                  type="text"
                  className="w-full bg-surface-container text-primary-fixed-dim border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary outline-none font-mono text-sm uppercase"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  maxLength={26}
                />
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-xl p-4 flex-1 flex flex-col min-h-0">
            <h3 className="text-[18px] font-semibold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">data_object</span>
              Payload
            </h3>
            <div className="mb-4 flex-1 flex flex-col min-h-0">
               <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Input Data (Plaintext / Ciphertext)</label>
               <textarea
                  className="w-full bg-surface-container text-on-surface border border-outline-variant/30 rounded-lg p-4 focus:border-primary outline-none font-mono text-sm resize-none flex-1 min-h-0"
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  placeholder="Enter text to encrypt/decrypt..."
               />
            </div>
            
            <div className="flex gap-4">
              <button onClick={handleEncrypt} disabled={loading} className="flex-1 bg-primary text-on-primary py-3 rounded-lg text-[12px] font-mono uppercase font-bold glow-button inner-glow flex items-center justify-center gap-2 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-sm">lock</span>
                ENCRYPT
              </button>
              <button onClick={handleDecrypt} disabled={loading} className="flex-1 bg-surface-variant text-on-surface border border-outline-variant/30 py-3 rounded-lg text-[12px] font-mono uppercase font-bold hover:bg-surface-bright transition-colors flex items-center justify-center gap-2 active:scale-95">
                <span className="material-symbols-outlined text-sm">lock_open</span>
                DECRYPT
              </button>
            </div>
            <button onClick={handleBruteForce} disabled={loading} className="w-full mt-4 bg-error-container text-on-error-container border border-error/30 py-3 rounded-lg font-mono text-[12px] uppercase font-bold hover:bg-error transition-colors flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined text-sm">warning</span>
              BRUTE FORCE ATTACK
            </button>
          </section>
        </div>

        <div className="w-full lg:w-7/12 h-full min-h-0">
          <section className="glass-panel rounded-xl flex flex-col h-full ">
            <div className="p-3 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/30">
              <h3 className="text-[18px] font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">terminal</span>
                Execution Results
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 font-mono text-[10px] uppercase border border-green-500/20">{result ? "200 OK" : "IDLE"}</span>
              </div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-surface-container-lowest/50 custom-scrollbar">
              {!result ? (
                 <div className="h-full flex items-center justify-center text-on-surface-variant/50 font-mono text-sm">Waiting for execution...</div>
              ) : (
                <div className="space-y-6">
                  {result.ciphertext && (
                    <div>
                      <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest flex justify-between">
                         Ciphertext (Hex/String)
                         <button onClick={() => setPlaintext(result.ciphertext)} className="text-primary hover:text-primary-container normal-case tracking-normal">Use as Input</button>
                      </h4>
                      <div className="bg-background border border-outline-variant/30 rounded-lg p-4 relative group">
                        <p className="font-mono text-sm text-primary-fixed break-all leading-relaxed">{result.ciphertext}</p>
                      </div>
                    </div>
                  )}
                  {result.plaintext && (
                    <div>
                      <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest flex justify-between">
                         Decrypted Plaintext
                         <button onClick={() => setPlaintext(result.plaintext)} className="text-primary hover:text-primary-container normal-case tracking-normal">Use as Input</button>
                      </h4>
                      <div className="bg-background border border-outline-variant/30 rounded-lg p-4">
                        <p className="font-mono text-sm text-secondary-fixed-dim break-all leading-relaxed">{result.plaintext}</p>
                      </div>
                    </div>
                  )}
                  {result.message && (
                    <div>
                      <h4 className="font-mono text-[11px] text-error mb-2 uppercase tracking-widest flex justify-between">Attack Details</h4>
                      <div className="bg-error-container/20 border border-error/30 rounded-lg p-4">
                        <p className="font-mono text-sm text-error break-all leading-relaxed">{result.message}</p>
                      </div>
                    </div>
                  )}
                  {result.frequency_analysis && (
                    <div>
                      <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest flex justify-between">Frequency Analysis</h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(result.frequency_analysis)
                          .sort((a: any, b: any) => b[1] - a[1])
                          .slice(0, 10)
                          .map(([char, freq]: any) => (
                            <div key={char} className="bg-surface-container border border-outline-variant/30 px-3 py-2 rounded">
                              <span className="font-bold text-on-surface text-lg">{char}</span>
                              <span className="text-[10px] text-primary-fixed-dim block mt-1">{freq.toFixed(1)}%</span>
                            </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest">Process Log</h4>
                    <div className="bg-background border border-outline-variant/30 rounded-lg p-4 font-mono text-[12px] text-on-surface-variant space-y-1">
                      <div className="flex gap-4"><span className="text-primary-fixed-dim/70 w-20">[OK]</span> <span>Initializing context...</span></div>
                      <div className="flex gap-4"><span className="text-primary-fixed-dim/70 w-20">[OK]</span> <span>Processing payload...</span></div>
                      <div className="flex gap-4"><span className="text-primary-fixed-dim/70 w-20">[OK]</span> <span className="text-green-400">{result.type} successful.</span></div>
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
