import os

views = [
    {
        "file": "e:/cse721_project/frontend/src/components/AesView.tsx",
        "name": "AesView",
        "title": "AES-256-GCM Configuration",
        "subtitle": "Configure parameters and test encryption payloads in real-time.",
        "state_vars": """  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("3a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d...");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);""",
        "params": """
              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Secret Key (Hex)</label>
                <input
                  type="text"
                  className="w-full bg-surface-container text-primary-fixed-dim border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary outline-none font-mono text-sm"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </div>""",
        "payload": "plaintext",
        "set_payload": "setPlaintext",
        "payload_label": "Input Data (Plaintext / Ciphertext)",
        "encrypt_api": "api/aes/encrypt",
        "decrypt_api": "api/aes/decrypt",
        "encrypt_body": "JSON.stringify({ plaintext, key })",
        "decrypt_body": "JSON.stringify({ ciphertext: plaintext, key })",
        "extra_buttons": ""
    },
    {
        "file": "e:/cse721_project/frontend/src/components/DesView.tsx",
        "name": "DesView",
        "title": "DES Configuration",
        "subtitle": "Data Encryption Standard implementation.",
        "state_vars": """  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("133457799BBCDFF1");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);""",
        "params": """
              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Secret Key (Hex)</label>
                <input
                  type="text"
                  className="w-full bg-surface-container text-primary-fixed-dim border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary outline-none font-mono text-sm uppercase"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  maxLength={16}
                />
              </div>""",
        "payload": "plaintext",
        "set_payload": "setPlaintext",
        "payload_label": "Input Data (Plaintext / Ciphertext)",
        "encrypt_api": "api/des/encrypt",
        "decrypt_api": "api/des/decrypt",
        "encrypt_body": "JSON.stringify({ plaintext, key })",
        "decrypt_body": "JSON.stringify({ ciphertext: plaintext, key })",
        "extra_buttons": ""
    },
    {
        "file": "e:/cse721_project/frontend/src/components/TranspositionView.tsx",
        "name": "TranspositionView",
        "title": "Double Transposition Cipher",
        "subtitle": "Columnar transposition cipher using two permutation keys.",
        "state_vars": """  const [plaintext, setPlaintext] = useState("");
  const [key1, setKey1] = useState("FIRST");
  const [key2, setKey2] = useState("SECOND");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);""",
        "params": """
              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">First Permutation Key</label>
                <input
                  type="text"
                  className="w-full bg-surface-container text-primary-fixed-dim border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary outline-none font-mono text-sm uppercase"
                  value={key1}
                  onChange={(e) => setKey1(e.target.value.toUpperCase())}
                />
              </div>
              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Second Permutation Key</label>
                <input
                  type="text"
                  className="w-full bg-surface-container text-primary-fixed-dim border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary outline-none font-mono text-sm uppercase"
                  value={key2}
                  onChange={(e) => setKey2(e.target.value.toUpperCase())}
                />
              </div>""",
        "payload": "plaintext",
        "set_payload": "setPlaintext",
        "payload_label": "Input Data (Plaintext / Ciphertext)",
        "encrypt_api": "api/transposition/encrypt",
        "decrypt_api": "api/transposition/decrypt",
        "encrypt_body": "JSON.stringify({ plaintext, key1, key2 })",
        "decrypt_body": "JSON.stringify({ ciphertext: plaintext, key1, key2 })",
        "extra_buttons": ""
    },
    {
        "file": "e:/cse721_project/frontend/src/components/SubstitutionView.tsx",
        "name": "SubstitutionView",
        "title": "Substitution Cipher",
        "subtitle": "Classical substitution cipher with 26-letter key.",
        "state_vars": """  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("QWERTYUIOPASDFGHJKLZXCVBNM");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const handleBruteForce = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/substitution/brute_force", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ciphertext: result?.ciphertext || plaintext, key: "" }),
      });
      setResult({ type: "Brute Force Attack", ...(await res.json()) });
    } catch (e) {}
    setLoading(false);
  };""",
        "params": """
              <div>
                <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">Key (26-letter permutation)</label>
                <input
                  type="text"
                  className="w-full bg-surface-container text-primary-fixed-dim border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary outline-none font-mono text-sm uppercase"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  maxLength={26}
                />
              </div>""",
        "payload": "plaintext",
        "set_payload": "setPlaintext",
        "payload_label": "Input Data (Plaintext / Ciphertext)",
        "encrypt_api": "api/substitution/encrypt",
        "decrypt_api": "api/substitution/decrypt",
        "encrypt_body": "JSON.stringify({ plaintext, key })",
        "decrypt_body": "JSON.stringify({ ciphertext: plaintext, key })",
        "extra_buttons": """
            <button onClick={handleBruteForce} disabled={loading} className="w-full mt-4 bg-error-container text-on-error-container border border-error/30 py-3 rounded-lg font-mono text-[12px] uppercase font-bold hover:bg-error transition-colors flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined text-sm">warning</span>
              BRUTE FORCE ATTACK
            </button>"""
    }
]

template = """"use client";
import { useState } from "react";

export default function __NAME__() {
__STATE_VARS__

  const handleEncrypt = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/__ENCRYPT_API__", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: __ENCRYPT_BODY__,
      });
      const data = await res.json();
      setResult({ type: "Encryption", ...data });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleDecrypt = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/__DECRYPT_API__", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: __DECRYPT_BODY__,
      });
      const data = await res.json();
      setResult({ type: "Decryption", ...data });
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[32px] font-bold font-headline text-on-surface mb-1">__TITLE__</h1>
          <p className="text-on-surface-variant text-[16px]">__SUBTITLE__</p>
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
              Parameters
            </h3>
            <div className="space-y-5">
__PARAMS__
            </div>
          </section>

          <section className="glass-panel rounded-xl p-6">
            <h3 className="text-[18px] font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">data_object</span>
              Payload
            </h3>
            <div className="mb-6">
               <label className="block font-mono text-[12px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">__PAYLOAD_LABEL__</label>
               <textarea
                  className="w-full bg-surface-container text-on-surface border border-outline-variant/30 rounded-lg p-4 focus:border-primary outline-none font-mono text-sm resize-none min-h-[160px]"
                  value={__PAYLOAD__}
                  onChange={(e) => __SET_PAYLOAD__(e.target.value)}
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
            </div>__EXTRA_BUTTONS__
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
                  {result.ciphertext && (
                    <div>
                      <h4 className="font-mono text-[11px] text-on-surface-variant mb-2 uppercase tracking-widest flex justify-between">
                         Ciphertext (Hex/String)
                         <button onClick={() => __SET_PAYLOAD__(result.ciphertext)} className="text-primary hover:text-primary-container normal-case tracking-normal">Use as Input</button>
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
                         <button onClick={() => __SET_PAYLOAD__(result.plaintext)} className="text-primary hover:text-primary-container normal-case tracking-normal">Use as Input</button>
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
"""

for v in views:
    code = template
    code = code.replace("__NAME__", v["name"])
    code = code.replace("__TITLE__", v["title"])
    code = code.replace("__SUBTITLE__", v["subtitle"])
    code = code.replace("__STATE_VARS__", v["state_vars"])
    code = code.replace("__PARAMS__", v["params"])
    code = code.replace("__PAYLOAD_LABEL__", v["payload_label"])
    code = code.replace("__PAYLOAD__", v["payload"])
    code = code.replace("__SET_PAYLOAD__", v["set_payload"])
    code = code.replace("__ENCRYPT_API__", v["encrypt_api"])
    code = code.replace("__DECRYPT_API__", v["decrypt_api"])
    code = code.replace("__ENCRYPT_BODY__", v["encrypt_body"])
    code = code.replace("__DECRYPT_BODY__", v["decrypt_body"])
    code = code.replace("__EXTRA_BUTTONS__", v["extra_buttons"])
    
    with open(v["file"], "w", encoding="utf-8") as f:
        f.write(code)

print("Applied Stitch to simple views.")
