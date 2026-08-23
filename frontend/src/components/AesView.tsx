"use client";
import { useState } from "react";

export default function AesView() {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState<"encrypt" | "decrypt" | null>("encrypt");

  const generateKey = () => {
    // Generate an 16 byte random string
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';
    for ( let i = 0; i < 16; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setKey(result);
  };

  const handleEncrypt = async () => {
    setLoading(true);
    setLastAction("encrypt");
    try {
      const res = await fetch("http://localhost:8000/api/aes/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plaintext, key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Server error");
      setResult({ type: "Encryption", ...data });
    } catch (e: any) { alert(e.message); }
    setLoading(false);
  };

  const handleDecrypt = async () => {
    setLoading(true);
    setLastAction("decrypt");
    try {
      const res = await fetch("http://localhost:8000/api/aes/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ciphertext: plaintext, key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Server error");
      setResult({ type: "Decryption", ...data });
    } catch (e: any) { alert(e.message); }
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-2">
      <div className="flex-shrink-0">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-heading">AES (Advanced Encryption Standard)</h2>
        <p className="text-gray-600 mt-1">Full AES-128 block cipher implementation from scratch.</p>
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
              placeholder="Enter plaintext or hex ciphertext..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5 flex justify-between">
              <span>Key (16 characters)</span>
              <button onClick={generateKey} className="text-blue-700 hover:text-blue-300 text-xs font-semibold uppercase">Auto Generate</button>
            </label>
            <input
              type="text"
              className="w-full bg-white/60 border border-white/80 rounded-xl p-3 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all outline-none font-mono shadow-inner"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              maxLength={16}
            />
          </div>
          
          <div className="flex space-x-4 pt-2">
            <button 
              onClick={handleEncrypt} 
              disabled={loading || key.length !== 16} 
              className={`flex-1 shadow-lg py-2.5 px-4 text-sm rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:transform-none ${
                lastAction === 'encrypt'
                  ? 'bg-gray-900 hover:bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                  : 'bg-white hover:bg-gray-50 border border-gray-200/60 text-gray-900 shadow-sm'
              }`}
            >
              Encrypt
            </button>
            <button 
              onClick={handleDecrypt} 
              disabled={loading || key.length !== 16} 
              className={`flex-1 shadow-lg py-2.5 px-4 text-sm rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:transform-none ${
                lastAction === 'decrypt'
                  ? 'bg-gray-900 hover:bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                  : 'bg-white hover:bg-gray-50 border border-gray-200/60 text-gray-900 shadow-sm'
              }`}
            >
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
            <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
              <div className="inline-block px-3 py-1 bg-blue-900/30 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-1">
                {result.type}
              </div>
              
              {result.ciphertext && (
                <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm relative">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Ciphertext (Hex)</div>
                    <button onClick={() => { setPlaintext(result.ciphertext); setLastAction("decrypt"); }} className="text-[10px] bg-blue-500/20 hover:bg-blue-500/30 active:scale-95 text-blue-700 px-2 py-1 rounded transition-all">Use as Input</button>
                  </div>
                  <div className="font-mono text-emerald-700 break-all text-sm">{result.ciphertext}</div>
                </div>
              )}
              {result.plaintext && (
                <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm relative">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Decrypted Plaintext</div>
                    <button onClick={() => { setPlaintext(result.plaintext); setLastAction("encrypt"); }} className="text-[10px] bg-blue-500/20 hover:bg-blue-500/30 active:scale-95 text-blue-700 px-2 py-1 rounded transition-all">Use as Input</button>
                  </div>
                  <div className="font-mono text-emerald-700 break-all">{result.plaintext}</div>
                </div>
              )}

              {result.round_keys && (
                <div className="mt-4">
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-3">11 Round Keys (Hex)</div>
                  <div className="bg-white/60 p-3 rounded-xl border border-gray-200 text-[10px] font-mono text-gray-900 space-y-2">
                    {result.round_keys.map((rk: string, i: number) => (
                      <div key={i} className="flex border-b border-gray-200 pb-2">
                        <span className="text-gray-500 w-8">R{i}</span>
                        <span className="text-amber-600 break-all">{rk}</span>
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
