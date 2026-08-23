import os

files = [
    "e:/cse721_project/frontend/src/components/SubstitutionView.tsx",
    "e:/cse721_project/frontend/src/components/TranspositionView.tsx",
    "e:/cse721_project/frontend/src/components/DesView.tsx",
    "e:/cse721_project/frontend/src/components/AesView.tsx",
    "e:/cse721_project/frontend/src/components/RsaView.tsx",
    "e:/cse721_project/frontend/src/components/EccView.tsx",
]

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Header
    content = content.replace('text-3xl font-light text-gray-800 tracking-tight', 'text-3xl font-extrabold text-gray-900 tracking-tight font-heading')
    
    # Panels
    content = content.replace('bg-white/70 backdrop-blur-xl p-5 rounded-xl border border-white/80 shadow-lg shadow-gray-200/50', 'bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]')
    content = content.replace('bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/80 shadow-lg shadow-gray-200/50', 'bg-white/40 backdrop-blur-2xl p-6 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]')
    
    # Inputs
    content = content.replace('bg-white/60 border border-white/80 rounded-xl p-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all outline-none resize-none shadow-inner', 'w-full bg-white/60 border border-white/60 rounded-xl p-3 text-gray-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none shadow-sm')
    content = content.replace('bg-white/60 border border-white/80 rounded-xl p-3 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all outline-none uppercase font-mono tracking-widest shadow-inner', 'w-full bg-white/60 border border-white/60 rounded-xl p-3 text-gray-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none uppercase font-mono tracking-widest shadow-sm')
    content = content.replace('bg-white/60 border border-white/80 rounded-xl pl-8 pr-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500/50 outline-none shadow-inner', 'w-full bg-white/60 border border-white/60 rounded-xl pl-8 pr-3 py-2 text-gray-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none shadow-sm')
    content = content.replace('bg-white/60 border border-white/80 rounded-xl pl-12 pr-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500/50 outline-none shadow-inner', 'w-full bg-white/60 border border-white/60 rounded-xl pl-12 pr-3 py-2 text-gray-900 text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none shadow-sm')

    # Buttons
    content = content.replace('bg-gradient-to-r from-blue-500 to-indigo-500 shadow-blue-500/20 text-white', 'bg-gray-900 hover:bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]')
    content = content.replace('bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/20 text-white', 'bg-gray-900 hover:bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]')
    content = content.replace('bg-white/10 hover:bg-white/20 border border-gray-200 text-gray-700', 'bg-white hover:bg-gray-50 border border-gray-200/60 text-gray-700 shadow-sm')
    
    # Generic button replacements for specific active/inactive logic
    content = content.replace('py-2 px-3 text-sm rounded-xl font-medium transition-all transform hover:-translate-y-0.5 active:scale-95', 'py-2.5 px-4 text-sm rounded-xl font-semibold transition-all active:scale-95')

    # Fix Brute force buttons
    content = content.replace('bg-gradient-to-r from-red-600 to-orange-600 shadow-lg shadow-red-500/20 text-white', 'bg-red-600 hover:bg-red-700 text-white shadow-[0_4px_12px_rgba(220,38,38,0.2)]')
    content = content.replace('bg-red-50 hover:bg-red-100 text-red-600 border border-red-200', 'bg-white hover:bg-red-50 text-red-600 border border-red-200 shadow-sm')

    # Inner boxes
    content = content.replace('bg-white/60 p-3 rounded-xl border border-gray-200 relative', 'bg-white/60 p-4 rounded-xl border border-white/80 shadow-sm relative')
    
    # Typographies (small cleanups)
    content = content.replace('text-gray-800', 'text-gray-900')
    content = content.replace('text-gray-700', 'text-gray-900')
    
    # Labels
    content = content.replace('block text-sm font-medium text-gray-900 mb-1', 'block text-sm font-semibold text-gray-900 mb-1.5')

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Premium theme applied.")
