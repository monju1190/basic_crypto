"use client";
import { useState } from "react";

export default function SubstitutionView() {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("QWERTYUIOPASDFGHJKLZXCVBNM");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState<"encrypt" | "decrypt" | "bruteforce" | null>("encrypt");

  const handleEncrypt = async () => {
    setLoading(true);
    setLastAction("encrypt");
    try {
      const res = await fetch("http://localhost:8000/api/substitution/encrypt", {
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
    setLastAction("decrypt");
    try {
      const res = await fetch("http://localhost:8000/api/substitution/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ciphertext: plaintext, key }), // passing input as ciphertext
      });
      const data = await res.json();
      setResult({ type: "Decryption", ...data });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleBruteForce = async () => {
    setLoading(true);
    setLastAction("bruteforce");
    try {
      const res = await fetch("http://localhost:8000/api/substitution/brute_force", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ciphertext: result?.ciphertext || plaintext, key: "" }),
      });
      const data = await res.json();
      setResult({ type: "Brute Force Attack", ...data });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-2">
      <div className="flex-shrink-0">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-heading">Substitution Cipher</h2>
        <p className="text-gray-600 mt-1">A simple substitution cipher with a 26-letter key.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-2">
        <div className="space-y-3 bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-y-auto custom-scrollbar">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Input Text (Plaintext / Ciphertext)</label>
            <textarea
              className="w-full w-full bg-white/60 border border-white/60 rounded-xl p-3 text-gray-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none shadow-sm"
              rows={2}
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="Enter text here..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Key (26-letter permutation)</label>
            <input
              type="text"
              className="w-full w-full bg-white/60 border border-white/60 rounded-xl p-3 text-gray-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none uppercase font-mono tracking-widest shadow-sm"
              value={key}
              onChange={(e) => setKey(e.target.value.toUpperCase())}
              maxLength={26}
            />
          </div>
          
          <div className="flex space-x-4 pt-2">
            <button 
              onClick={handleEncrypt} 
              disabled={loading} 
              className={`flex-1 shadow-lg py-2.5 px-4 text-sm rounded-xl font-semibold transition-all active:scale-95 ${
                lastAction === 'encrypt'
                  ? 'bg-gray-900 hover:bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                  : 'bg-white hover:bg-gray-50 border border-gray-200/60 text-gray-900 shadow-sm'
              }`}
            >
              Encrypt
            </button>
            <button 
              onClick={handleDecrypt} 
              disabled={loading} 
              className={`flex-1 shadow-lg py-2.5 px-4 text-sm rounded-xl font-semibold transition-all active:scale-95 ${
                lastAction === 'decrypt'
                  ? 'bg-gray-900 hover:bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                  : 'bg-white hover:bg-gray-50 border border-gray-200/60 text-gray-900 shadow-sm'
              }`}
            >
              Decrypt
            </button>
          </div>
          <button 
            onClick={handleBruteForce} 
            disabled={loading} 
            className={`w-full py-2 px-3 text-sm rounded-xl font-medium transition-all transform hover:-translate-y-0.5 mt-2 active:scale-95 ${
              lastAction === 'bruteforce'
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_4px_12px_rgba(220,38,38,0.2)]'
                : 'bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/20'
            }`}
          >
            Brute Force Attack
          </button>
        </div>

        {/* Results Area */}
        <div className="bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Results</h3>
          {!result ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-100/50 rounded-xl border border-gray-200 border-dashed">
              Run an operation to see results
            </div>
          ) : (
            <div className="space-y-2 overflow-y-auto flex-1">
              <div className="inline-block px-3 py-1 bg-blue-900/30 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-1">
                {result.type}
              </div>
              
              {result.ciphertext && (
                <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm relative">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Ciphertext</div>
                    <button onClick={() => setPlaintext(result.ciphertext)} className="text-[10px] bg-blue-500/20 hover:bg-blue-500/30 active:scale-95 text-blue-700 px-2 py-1 rounded transition-all">Use as Input</button>
                  </div>
                  <div className="font-mono text-emerald-700 break-all">{result.ciphertext}</div>
                </div>
              )}
              {result.plaintext && (
                <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm relative">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Decrypted Plaintext</div>
                    <button onClick={() => setPlaintext(result.plaintext)} className="text-[10px] bg-blue-500/20 hover:bg-blue-500/30 active:scale-95 text-blue-700 px-2 py-1 rounded transition-all">Use as Input</button>
                  </div>
                  <div className="font-mono text-emerald-700 break-all">{result.plaintext}</div>
                </div>
              )}
              {result.message && (
                <div className="bg-red-50 border border-red-500/20 p-3 rounded-xl">
                  <div className="text-xs text-red-600/70 uppercase tracking-wider mb-1">Attack Note</div>
                  <div className="text-red-800 text-sm leading-relaxed">{result.message}</div>
                </div>
              )}
              {result.sample_attempts && (
                 <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                 <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Sample Attack Attempts</div>
                 <div className="text-xs text-gray-900 font-mono space-y-2">
                    {result.sample_attempts.map((a: any, i: number) => (
                      <div key={i}>
                        <span className="text-amber-600">Key:</span> {a.key.substring(0, 8)}... <span className="text-blue-700">Result:</span> {a.decrypted}
                      </div>
                    ))}
                 </div>
               </div>
              )}

              {result.frequency_analysis && (
                <div className="mt-2">
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-3">Frequency Analysis (Top letters)</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(result.frequency_analysis)
                      .sort((a: any, b: any) => b[1] - a[1])
                      .slice(0, 10)
                      .map(([char, freq]: any) => (
                        <div key={char} className="bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/80 flex flex-col items-center min-w-[3.5rem] shadow-sm">
                          <span className="font-bold text-gray-900 text-lg">{char}</span>
                          <span className="text-[10px] text-blue-700 mt-1 font-medium">{freq.toFixed(1)}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
