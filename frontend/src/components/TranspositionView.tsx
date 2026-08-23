"use client";
import { useState } from "react";

export default function TranspositionView() {
  const [plaintext, setPlaintext] = useState("");
  const [key1, setKey1] = useState("FIRST");
  const [key2, setKey2] = useState("SECOND");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleEncrypt = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/api/transposition/encrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plaintext, key1, key2 }),
    });
    const data = await res.json();
    setResult({ type: "Encryption", ...data });
    setLoading(false);
  };

  const handleDecrypt = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/api/transposition/decrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ciphertext: plaintext, key1, key2 }),
    });
    const data = await res.json();
    setResult({ type: "Decryption", ...data });
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-2">
      <div className="flex-shrink-0">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-heading">Double Transposition</h2>
        <p className="text-gray-600 mt-1">Columnar transposition applied twice with two different keys.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-2">
        <div className="space-y-3 bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-y-auto custom-scrollbar">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Input Text</label>
            <textarea
              className="w-full bg-white/60 border border-white/80 rounded-xl p-3 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all outline-none resize-none shadow-inner"
              rows={2}
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="Enter text here..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">First Key</label>
              <input
                type="text"
                className="w-full w-full bg-white/60 border border-white/60 rounded-xl p-3 text-gray-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none uppercase font-mono tracking-widest shadow-sm"
                value={key1}
                onChange={(e) => setKey1(e.target.value.toUpperCase())}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">Second Key</label>
              <input
                type="text"
                className="w-full w-full bg-white/60 border border-white/60 rounded-xl p-3 text-gray-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none uppercase font-mono tracking-widest shadow-sm"
                value={key2}
                onChange={(e) => setKey2(e.target.value.toUpperCase())}
              />
            </div>
          </div>
          
          <div className="flex space-x-4 pt-2">
            <button onClick={handleEncrypt} disabled={loading} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 shadow-lg shadow-blue-500/20 text-white py-2 px-3 text-sm rounded-xl font-medium transition-all transform hover:-translate-y-0.5">
              Encrypt
            </button>
            <button onClick={handleDecrypt} disabled={loading} className="flex-1 bg-white/10 hover:bg-white/20 border border-gray-200 text-gray-900 py-2 px-3 text-sm rounded-xl font-medium transition-all transform hover:-translate-y-0.5">
              Decrypt
            </button>
          </div>
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
                <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Ciphertext</div>
                  <div className="font-mono text-emerald-700 break-all">{result.ciphertext}</div>
                </div>
              )}
              {result.plaintext && (
                <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Decrypted Plaintext</div>
                  <div className="font-mono text-emerald-700 break-all">{result.plaintext}</div>
                </div>
              )}

              {result.frequency_analysis && (
                <div className="mt-2">
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-3">Frequency Analysis (Transposition does not change freq)</div>
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
