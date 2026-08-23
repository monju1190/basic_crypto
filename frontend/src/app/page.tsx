"use client";
import { useState } from "react";
import SubstitutionView from "@/components/SubstitutionView";
import TranspositionView from "@/components/TranspositionView";
import DesView from "@/components/DesView";
import AesView from "@/components/AesView";
import RsaView from "@/components/RsaView";
import EccView from "@/components/EccView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("substitution");

  const tabs = [
    { id: "substitution", name: "Substitution Cipher" },
    { id: "transposition", name: "Double Transposition" },
    { id: "des", name: "DES" },
    { id: "aes", name: "AES" },
    { id: "rsa", name: "RSA" },
    { id: "ecc", name: "ECC" },
  ];

  return (
    <div className="flex h-screen bg-[#FDFDFD] text-gray-900 overflow-hidden font-sans">
      
      {/* Animated Subtle Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-50/50 blur-[120px] mix-blend-multiply" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-purple-50/40 blur-[120px] mix-blend-multiply" />
      </div>

      {/* Sidebar */}
      <div className="w-72 bg-white/40 backdrop-blur-3xl border-r border-gray-200/60 flex flex-col shadow-[1px_0_12px_rgba(0,0,0,0.02)] relative z-20">
        <div className="p-8 pb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight font-heading flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm shadow-sm">C</span>
            Crypto Kit
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">CSE721 Showcase</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                activeTab === tab.id
                  ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-gray-900 border border-gray-200/60"
                  : "text-gray-500 hover:bg-white/40 hover:text-gray-800 border border-transparent"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative z-10">
        <div className="p-10 max-w-7xl mx-auto w-full h-full flex flex-col">
          {activeTab === "substitution" && <SubstitutionView />}
          {activeTab === "transposition" && <TranspositionView />}
          {activeTab === "des" && <DesView />}
          {activeTab === "aes" && <AesView />}
          {activeTab === "rsa" && <RsaView />}
          {activeTab === "ecc" && <EccView />}
        </div>
      </div>
    </div>
  );
}
