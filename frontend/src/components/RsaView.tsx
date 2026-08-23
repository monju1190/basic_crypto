"use client";
import { useState } from "react";

export default function RsaView() {
  const [choice, setChoice] = useState("generate");
  const [plaintext, setPlaintext] = useState("");
  const [bits, setBits] = useState(512);

  const [keypair, setKeypair] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    try {
      if (choice === "generate") {
        const actualBits = bits === 0 ? Math.floor(Math.random() * (1024 - 128 + 1)) + 128 : bits;
        const res = await fetch("/api/rsa/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bits: actualBits }),
        });
        const data = await res.json();
        setKeypair(data);
        setResult({ type: "Key Generation", ...data });
      } else if (choice === "encrypt") {
        if (!keypair) { alert("Generate keys first"); setLoading(false); return; }
        const res = await fetch("/api/rsa/encrypt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plaintext, public_key: keypair.public_key }),
        });
        const data = await res.json();
        setResult({ type: "Encryption", ...data });
      } else if (choice === "decrypt") {
        if (!keypair) { alert("Generate keys first"); setLoading(false); return; }

        let cipherArray = [];
        try {
          cipherArray = JSON.parse(plaintext);
          if (!Array.isArray(cipherArray)) throw new Error("Not an array");
        } catch {
          alert("For decryption, please enter the ciphertext as a JSON array of integers (e.g., [123, 456]).");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/rsa/decrypt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ciphertext: cipherArray, private_key: keypair.private_key }),
        });
        const data = await res.json();
        setResult({ type: "Decryption", ...data });
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleFactorization = async () => {
    if (!keypair) return alert("Generate keys first");
    setLoading(true);
    const res = await fetch("/api/rsa/factorize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ n: keypair.public_key[1] }),
    });
    const data = await res.json();
    setResult({ type: "Factorization Attack", ...data });
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3 flex-shrink-0">
        <div>
          <h1 className="text-[24px] font-bold font-headline text-on-surface mb-1">RSA Configuration</h1>
          <p className="text-on-surface-variant text-[16px]">Public-key encryption algorithm with Factorization attack demonstration.</p>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden">
        <div className="w-full lg:w-5/12 h-full overflow-y-auto custom-scrollbar pr-2 pb-2 flex flex-col space-y-4">
          <section className="glass-panel rounded-xl p-4 relative flex-shrink-0 overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
            <h3 className="text-[18px] font-semibold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container">tune</span>
              Parameters
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Operation Mode</label>
                <div className="space-y-2 bg-surface-container p-3 rounded-lg border border-outline-variant/30">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="radio" value="generate" checked={choice === "generate"} onChange={() => setChoice("generate")} className="form-radio text-primary bg-surface border-outline-variant/50" />
                    <span className="text-on-surface text-sm">1. Generate keys</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="radio" value="encrypt" checked={choice === "encrypt"} onChange={() => setChoice("encrypt")} className="form-radio text-primary bg-surface border-outline-variant/50" />
                    <span className="text-on-surface text-sm">2. Encrypt</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="radio" value="decrypt" checked={choice === "decrypt"} onChange={() => setChoice("decrypt")} className="form-radio text-primary bg-surface border-outline-variant/50" />
                    <span className="text-on-surface text-sm">3. Decrypt</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Key Size (Bits)</label>
                <select
                  className={`w-full bg-surface-container text-on-surface border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary outline-none font-mono text-sm appearance-none ${choice !== "generate" ? "opacity-50 cursor-not-allowed" : ""}`}
                  value={bits}
                  onChange={(e) => setBits(Number(e.target.value))}
                  disabled={choice !== "generate"}
                >
                  <option value={16}>16 bits (Factorizable for attack)</option>
                  <option value={512}>512 bits</option>
                  <option value={1024}>1024 bits</option>
                  <option value={0}>Randomly generated</option>
                </select>
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-xl p-4 flex flex-col">
            <h3 className="text-[18px] font-semibold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">data_object</span>
              Payload
            </h3>
            <div className="mb-4 flex flex-col">
              <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Input Data (Plaintext / Ciphertext)</label>
              <textarea
                className={`w-full bg-surface-container text-on-surface border border-outline-variant/30 rounded-lg p-4 focus:border-primary outline-none font-mono text-sm resize-none custom-scrollbar min-h-[120px] ${choice === "generate" ? "opacity-50 cursor-not-allowed" : ""}`}
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                disabled={choice === "generate"}
                placeholder={choice === "decrypt" ? "Enter ciphertext integer array e.g. [123, 456]" : "Enter plaintext string"}
              />
            </div>

            <button onClick={handleExecute} disabled={loading} className="w-full bg-primary text-on-primary py-3 rounded-lg text-[12px] font-mono uppercase font-bold glow-button inner-glow flex items-center justify-center gap-2 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              EXECUTE OPERATION
            </button>
          </section>
        </div>

        <div className="w-full lg:w-7/12 flex flex-col h-full overflow-hidden">
          <section className="glass-panel rounded-xl flex flex-col h-full min-h-[500px]">
            <div className="p-3 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high/30">
              <h3 className="text-[18px] font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">terminal</span>
                Execution Results
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 font-mono text-[10px] uppercase border border-green-500/20">{result || keypair ? "200 OK" : "IDLE"}</span>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-surface-container-lowest/50 custom-scrollbar">
              {!keypair && !result ? (
                <div className="h-full flex items-center justify-center text-on-surface-variant/50 font-mono text-sm">Waiting for execution...</div>
              ) : (
                <div className="space-y-6">
                  {keypair && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest">Public Key (e, n)</h4>
                        <div className="bg-background border border-outline-variant/30 rounded-lg p-3">
                          <p className="font-mono text-sm text-primary-fixed-dim break-all leading-relaxed">
                            ({keypair.public_key[0]}, {keypair.public_key[1]})
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest">Private Key (d, n)</h4>
                        <div className="bg-background border border-outline-variant/30 rounded-lg p-3">
                          <p className="font-mono text-sm text-secondary-fixed-dim break-all leading-relaxed">
                            ({keypair.private_key[0]}, {keypair.private_key[1]})
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {result?.ciphertext && (
                    <div>
                      <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest flex justify-between">
                        Ciphertext (Array)
                        <button onClick={() => { setPlaintext(JSON.stringify(result.ciphertext)); setChoice("decrypt"); }} className="text-primary hover:text-primary-container normal-case tracking-normal">Use as Input for Decrypt</button>
                      </h4>
                      <div className="bg-background border border-outline-variant/30 rounded-lg p-4 relative group">
                        <p className="font-mono text-sm text-primary-fixed break-all leading-relaxed">[{result.ciphertext.join(", ")}]</p>
                      </div>
                    </div>
                  )}

                  {result?.plaintext && (
                    <div>
                      <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest flex justify-between">
                        Decrypted Message
                      </h4>
                      <div className="bg-background border border-outline-variant/30 rounded-lg p-4">
                        <p className="font-mono text-sm text-secondary-fixed-dim break-all leading-relaxed">{result.plaintext}</p>
                      </div>
                    </div>
                  )}

                  {result?.message && (
                    <div>
                      <h4 className="font-mono text-[11px] text-error mb-2 uppercase tracking-widest flex justify-between">Attack Details</h4>
                      <div className="bg-error-container/20 border border-error/30 rounded-lg p-4">
                        <p className="font-mono text-sm text-error break-all leading-relaxed">{result.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 mt-6 border-t border-outline-variant/10">
                    <button onClick={handleFactorization} disabled={loading || !keypair} className="w-full bg-error-container text-on-error-container border border-error/30 py-3 rounded-lg font-mono text-[12px] uppercase font-bold hover:bg-error transition-colors flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50">
                      <span className="material-symbols-outlined text-sm">warning</span>
                      FACTORIZATION ATTACK
                    </button>
                  </div>

                  <div>
                    <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest">Process Log</h4>
                    <div className="bg-background border border-outline-variant/30 rounded-lg p-4 font-mono text-[12px] text-on-surface-variant space-y-1">
                      <div className="flex gap-4"><span className="text-primary-fixed-dim/70 w-20">[OK]</span> <span>Executing choice '{choice}'...</span></div>
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
