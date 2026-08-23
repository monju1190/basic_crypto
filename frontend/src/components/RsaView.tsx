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
        const res = await fetch("http://localhost:8000/api/rsa/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bits: actualBits }),
        });
        const data = await res.json();
        setKeypair(data);
        setResult({ type: "Key Generation", ...data });
      } else if (choice === "encrypt") {
        if (!keypair) { alert("Generate keys first"); setLoading(false); return; }
        const res = await fetch("http://localhost:8000/api/rsa/encrypt", {
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
        
        const res = await fetch("http://localhost:8000/api/rsa/decrypt", {
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
    const res = await fetch("http://localhost:8000/api/rsa/factorize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ n: keypair.public_key[1] }),
    });
    const data = await res.json();
    setResult({ type: "Factorization Attack", ...data });
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-2">
      <div className="flex-shrink-0">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-heading">RSA (Rivest–Shamir–Adleman)</h2>
        <p className="text-gray-600 mt-1">Public-key encryption algorithm with Factorization attack demonstration.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-2">
        
        {/* Accept from User */}
        <div className="bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] space-y-3 overflow-y-auto custom-scrollbar">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Accept from User</h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Choice:</label>
            <div className="space-y-2 bg-white/60 p-3 rounded-xl border border-white/80">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="radio" value="generate" checked={choice === "generate"} onChange={() => setChoice("generate")} className="form-radio text-blue-500 bg-gray-200 border-gray-300" />
                <span className="text-gray-900">1. Generate keys</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="radio" value="encrypt" checked={choice === "encrypt"} onChange={() => setChoice("encrypt")} className="form-radio text-blue-500 bg-gray-200 border-gray-300" />
                <span className="text-gray-900">2. Encrypt</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="radio" value="decrypt" checked={choice === "decrypt"} onChange={() => setChoice("decrypt")} className="form-radio text-blue-500 bg-gray-200 border-gray-300" />
                <span className="text-gray-900">3. Decrypt</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Plaintext string (or Ciphertext array)</label>
            <textarea
              className={`w-full bg-white/60 border border-white/80 rounded-xl p-3 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all outline-none resize-none shadow-inner ${choice === "generate" ? "opacity-50 cursor-not-allowed" : ""}`}
              rows={2}
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              disabled={choice === "generate"}
              placeholder={choice === "decrypt" ? "Enter ciphertext integer array e.g. [123, 456]" : "Enter plaintext string"}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Key size</label>
            <select 
              className={`w-full bg-white/60 border border-white/80 rounded-xl p-3 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all outline-none shadow-inner ${choice !== "generate" ? "opacity-50 cursor-not-allowed" : ""}`}
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

          <button onClick={handleExecute} disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 active:from-blue-800 active:to-indigo-800 active:scale-95 shadow-lg shadow-blue-500/20 text-white py-2 px-3 text-sm rounded-xl font-medium transition-all transform hover:-translate-y-0.5">
            Execute Choice
          </button>
        </div>

        {/* Output */}
        <div className="bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Output</h3>
          
          <div className="space-y-2 overflow-y-auto flex-1 custom-scrollbar pr-2">
            
            {!keypair && !result && (
              <div className="text-gray-500 bg-gray-100/50 p-3 rounded-xl border border-gray-200 border-dashed text-center">
                Execute an operation to see outputs
              </div>
            )}

            {keypair && (
              <>
                <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Public key (e, n)</div>
                  <div className="font-mono text-emerald-700 break-all text-sm">({keypair.public_key[0]}, {keypair.public_key[1]})</div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Private key (d, n)</div>
                  <div className="font-mono text-emerald-700 break-all text-sm">({keypair.private_key[0]}, {keypair.private_key[1]})</div>
                </div>
              </>
            )}

            {result?.ciphertext && (
              <div className="bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm relative">
                <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600 uppercase tracking-wider">Ciphertext (as integer)</div>
                    <button onClick={() => { setPlaintext(JSON.stringify(result.ciphertext)); setChoice("decrypt"); }} className="text-[10px] bg-blue-500/20 hover:bg-blue-500/30 active:scale-95 text-blue-700 px-2 py-1 rounded transition-all">Use as Input for Decrypt</button>
                </div>
                <div className="font-mono text-emerald-700 break-all text-sm">[{result.ciphertext.join(", ")}]</div>
              </div>
            )}

            {result?.plaintext && (
              <div className="bg-white/60 p-3 rounded-xl border border-gray-200">
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Decrypted message</div>
                <div className="font-mono text-emerald-700 break-all text-sm">{result.plaintext}</div>
              </div>
            )}

            <div className="pt-4 border-t border-white/80 mt-4">
              <button onClick={handleFactorization} disabled={loading || !keypair} className="w-full bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 active:scale-95 text-red-600 border border-red-500/20 py-2 px-3 text-sm rounded-xl font-medium transition-all transform hover:-translate-y-0.5 mb-1 disabled:opacity-50">
                Show the result of Factorization attack (Optional)
              </button>

              {result?.message && (
                <div className={`p-3 rounded-xl border ${result.success ? "bg-green-50 border-green-200" : "bg-red-500/10 border-red-500/20"}`}>
                    <div className={`text-xs uppercase tracking-wider mb-1 ${result.success ? "text-emerald-700/70" : "text-red-600/70"}`}>Factorization Result</div>
                    <div className={`text-sm leading-relaxed ${result.success ? "text-green-300" : "text-red-800"}`}>
                    {result.message}
                    </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
