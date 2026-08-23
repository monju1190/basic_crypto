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
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface-dim/80 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center h-16 px-10">
        <div className="flex items-center gap-4">
          <span className="font-headline font-bold text-xl text-primary">Crypto Kit</span>
        </div>
        <div className="flex items-center gap-6">
          <button aria-label="notifications" className="text-on-surface-variant hover:text-primary-container transition-colors active:scale-95 duration-150">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button aria-label="settings" className="text-on-surface-variant hover:text-primary-container transition-colors active:scale-95 duration-150">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold glow-button inner-glow active:scale-95 duration-150">
            Run Test
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-outline-variant/30 flex items-center justify-center">
             <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 pt-16 h-screen">
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
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high/50 transition-all active:translate-x-1 duration-200 mt-4">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm">Dashboard</span>
            </button>
          </div>
          
          <div className="px-4 mt-auto pb-4">
            <button className="w-full py-2 mb-4 rounded-lg bg-surface-variant text-on-surface border border-outline-variant/30 text-xs font-semibold hover:bg-surface-bright transition-colors">
              Generate Key
            </button>
            <div className="pt-4 border-t border-outline-variant/10 space-y-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-sm">description</span>
                <span className="text-xs font-semibold">Docs</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-sm">help</span>
                <span className="text-xs font-semibold">Support</span>
              </a>
            </div>
          </div>
        </nav>
        
        {/* Main Workspace */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full relative custom-scrollbar">
          <div className="max-w-[1440px] mx-auto">
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
