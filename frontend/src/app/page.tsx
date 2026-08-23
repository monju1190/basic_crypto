"use client";
import { useState } from "react";
import SubstitutionView from "@/components/SubstitutionView";
import TranspositionView from "@/components/TranspositionView";
import DesView from "@/components/DesView";
import AesView from "@/components/AesView";
import RsaView from "@/components/RsaView";
import EccView from "@/components/EccView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("aes");

  return (
    <>
      
      
      <div className="flex flex-1 h-screen">
        {/* SideNavBar */}
        <nav className="hidden md:flex flex-col py-6 bg-surface-container-low/50 backdrop-blur-2xl w-64 z-40 border-r border-outline-variant/10 h-full flex-shrink-0">
          <div className="px-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="material-symbols-outlined text-primary text-sm">hub</span>
              </div>
              <div>
                <h2 className="text-xs font-bold text-primary uppercase tracking-wider">Encryption Labs</h2>
                <p className="text-[10px] text-on-surface-variant mt-0.5">API Testing Suite</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 px-4 space-y-1">
            <button onClick={() => setActiveTab('substitution')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all active:translate-x-1 duration-200 ${activeTab === 'substitution' ? 'text-primary bg-primary-container/10 border-l-4 border-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
              <span className="material-symbols-outlined">sort_by_alpha</span>
              <span className="text-sm">Substitution</span>
            </button>
            <button onClick={() => setActiveTab('transposition')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all active:translate-x-1 duration-200 ${activeTab === 'transposition' ? 'text-primary bg-primary-container/10 border-l-4 border-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
              <span className="material-symbols-outlined">swap_horiz</span>
              <span className="text-sm">Transposition</span>
            </button>
            <button onClick={() => setActiveTab('des')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all active:translate-x-1 duration-200 ${activeTab === 'des' ? 'text-primary bg-primary-container/10 border-l-4 border-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
              <span className="material-symbols-outlined">enhanced_encryption</span>
              <span className="text-sm">DES</span>
            </button>
            <button onClick={() => setActiveTab('aes')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all active:translate-x-1 duration-200 ${activeTab === 'aes' ? 'text-primary bg-primary-container/10 border-l-4 border-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
              <span className="material-symbols-outlined">security</span>
              <span className="text-sm">AES</span>
            </button>
            <button onClick={() => setActiveTab('rsa')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all active:translate-x-1 duration-200 ${activeTab === 'rsa' ? 'text-primary bg-primary-container/10 border-l-4 border-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
              <span className="material-symbols-outlined">key</span>
              <span className="text-sm">RSA</span>
            </button>
            <button onClick={() => setActiveTab('ecc')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all active:translate-x-1 duration-200 ${activeTab === 'ecc' ? 'text-primary bg-primary-container/10 border-l-4 border-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
              <span className="material-symbols-outlined">lock</span>
              <span className="text-sm">ECC</span>
            </button>
            
          </div>
          
          </nav>
        
        <main className="flex-1 p-4 md:p-6 overflow-hidden w-full relative flex flex-col">
          <div className="max-w-[1440px] w-full h-full mx-auto flex flex-col min-h-0">
            {activeTab === "substitution" && <SubstitutionView />}
            {activeTab === "transposition" && <TranspositionView />}
            {activeTab === "des" && <DesView />}
            {activeTab === "aes" && <AesView />}
            {activeTab === "rsa" && <RsaView />}
            {activeTab === "ecc" && <EccView />}
          </div>
        </main>
      </div>
    </>
  );
}
