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
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-2">
      <div className="flex-shrink-0">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-heading">ECC (Elliptic Curve Cryptography)</h2>
        <p className="text-gray-600 mt-1">Domain parameters over F_p and ECDH Key Exchange.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-2">
        
        {/* Input Area */}
        <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2">
          <div className="bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] space-y-3 overflow-y-auto custom-scrollbar">
            <h3 className="text-xl font-semibold text-gray-900">b) ECC Core</h3>
            
            <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Domain parameters (p, a, b, G, n)</label>
                <div className="grid grid-cols-5 gap-2 bg-white/60 p-3 rounded-xl border border-gray-200">
                    <div>
                        <div className="text-[10px] text-gray-600 uppercase mb-1">p</div>
                        <input type="number" className="w-full bg-transparent border-b border-gray-300 text-gray-900 outline-none focus:border-blue-500 pb-1" value={p} onChange={(e) => setP(Number(e.target.value))} />
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-600 uppercase mb-1">a</div>
                        <input type="number" className="w-full bg-transparent border-b border-gray-300 text-gray-900 outline-none focus:border-blue-500 pb-1" value={a} onChange={(e) => setA(Number(e.target.value))} />
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-600 uppercase mb-1">b</div>
                        <input type="number" className="w-full bg-transparent border-b border-gray-300 text-gray-900 outline-none focus:border-blue-500 pb-1" value={b} onChange={(e) => setB(Number(e.target.value))} />
                    </div>
                    <div className="col-span-2">
                        <div className="text-[10px] text-gray-600 uppercase mb-1">G / P(x,y)</div>
                        <div className="flex space-x-2">
                            <input type="number" className="w-full bg-transparent border-b border-gray-300 text-gray-900 outline-none focus:border-blue-500 pb-1 text-center" value={Gx} onChange={(e) => setGx(Number(e.target.value))} placeholder="x" title="G (x)" />
                            <input type="number" className="w-full bg-transparent border-b border-gray-300 text-gray-900 outline-none focus:border-blue-500 pb-1 text-center" value={Gy} onChange={(e) => setGy(Number(e.target.value))} placeholder="y" title="G (y)" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">n (Order) & Private Key Input</label>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600 text-xs font-mono">n=</div>
                        <input type="number" className="w-full bg-white/60 border border-white/80 rounded-xl pl-8 pr-4 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none shadow-inner" value={n} onChange={(e) => setN(Number(e.target.value))} />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600 text-xs font-mono">Priv=</div>
                        <input type="number" className="w-full bg-white/60 border border-white/80 rounded-xl pl-12 pr-4 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none shadow-inner" value={privKey} onChange={(e) => setPrivKey(Number(e.target.value))} />
                    </div>
                </div>
            </div>

            <div className="flex space-x-4">
                <button onClick={handleGeneratePoints} disabled={loading} className="flex-1 bg-white/10 hover:bg-white/20 border border-gray-200 text-gray-900 py-2 px-3 text-sm rounded-xl font-medium transition-all active:scale-95 text-sm flex items-center justify-center">
                  List all Ps
                </button>
                <button onClick={handleGenerateKeypair} disabled={loading} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 shadow-lg shadow-blue-500/20 text-white py-2 px-3 text-sm rounded-xl font-medium transition-all active:scale-95 text-sm flex items-center justify-center">
                  Generate Keypair
                </button>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] space-y-3 overflow-y-auto custom-scrollbar">
            <h3 className="text-xl font-semibold text-gray-900">Elliptic curve Diffie-Hellman Key exchange</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">a, b (Alice & Bob Private Keys)</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600 text-xs font-mono">a=</div>
                    <input type="number" className="w-full bg-white/60 border border-white/80 rounded-xl pl-8 pr-4 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none shadow-inner" value={privA} onChange={(e) => setPrivA(Number(e.target.value))} />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600 text-xs font-mono">b=</div>
                    <input type="number" className="w-full bg-white/60 border border-white/80 rounded-xl pl-8 pr-4 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none shadow-inner" value={privB} onChange={(e) => setPrivB(Number(e.target.value))} />
                </div>
              </div>
            </div>
            
            <button onClick={handleKeyExchange} disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/20 text-white py-2 px-3 text-sm rounded-xl font-medium transition-all active:scale-95 text-sm">
              Simulate ECDH Exchange
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Output</h3>
          {!result ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-100/50 rounded-xl border border-gray-200 border-dashed">
              Run an operation to see outputs
            </div>
          ) : (
            <div className="space-y-2 overflow-y-auto flex-1 custom-scrollbar pr-2">
              <div className="inline-block px-3 py-1 bg-blue-900/30 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-1">
                {result.type}
              </div>
              
              {result.points && (
                <div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-3">List of all Ps ({result.count})</div>
                  <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                    {result.points.map((p: any, i: number) => (
                      <div key={i} className="bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono text-gray-900 shadow-sm">
                        ({p[0]}, {p[1]})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.public_key && (
                <div className="space-y-4">
                    <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                        <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Private key</div>
                        <div className="font-mono text-emerald-700">{result.private_key}</div>
                    </div>
                    <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                        <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Public key</div>
                        {result.public_key ? (
                            <div className="font-mono text-emerald-700">({result.public_key[0]}, {result.public_key[1]})</div>
                        ) : (
                            <div className="font-mono text-red-600 text-xs">Error: Point at Infinity or Invalid curve params</div>
                        )}
                    </div>
                </div>
              )}

              {result.shared_secret && (
                <div className="space-y-4">
                  <div className="bg-white/60 p-3 rounded-xl border border-gray-200 text-center">
                    <div className="text-xs text-purple-700/70 uppercase tracking-wider mb-1">Shared key</div>
                    <div className="font-mono text-purple-700 text-lg font-bold">
                        {result.shared_secret ? `(${result.shared_secret[0]}, ${result.shared_secret[1]})` : "Invalid"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Alice Public</div>
                      <div className="font-mono text-pink-700">
                          {result.public_a ? `(${result.public_a[0]}, ${result.public_a[1]})` : "Invalid"}
                      </div>
                    </div>
                    <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Bob Public</div>
                      <div className="font-mono text-pink-700">
                          {result.public_b ? `(${result.public_b[0]}, ${result.public_b[1]})` : "Invalid"}
                      </div>
                    </div>
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
