import os

page_path = "e:/cse721_project/frontend/src/app/page.tsx"
with open(page_path, "r", encoding="utf-8") as f:
    content = f.read()

# page.tsx background replacements
content = content.replace("bg-[#050510]", "bg-[#F9F9FA]")
content = content.replace("text-white", "text-gray-900")
content = content.replace("bg-gradient-to-br from-[#0a0a1a] via-[#050510] to-[#1a0b2e]", "bg-gradient-to-br from-[#F5F5F7] via-[#FAF9F6] to-[#F0F0F3]")
content = content.replace("from-blue-900/20", "from-blue-200/50")
content = content.replace("bg-white/5 backdrop-blur-xl border-white/10", "bg-white/70 backdrop-blur-2xl border-white/60") # Sidebar
content = content.replace("bg-blue-600/20 text-blue-400 border-blue-500/30", "bg-blue-100 text-blue-700 border-blue-300")
content = content.replace("text-gray-400 hover:bg-gray-800 hover:text-gray-200", "text-gray-600 hover:bg-gray-100 hover:text-gray-900")

with open(page_path, "w", encoding="utf-8") as f:
    f.write(content)

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
    
    # 1. Text colors
    content = content.replace('text-white', 'text-gray-800')
    content = content.replace('text-gray-400', 'text-gray-600')
    content = content.replace('text-gray-300', 'text-gray-700')
    content = content.replace('text-green-400', 'text-emerald-700')
    content = content.replace('text-blue-400', 'text-blue-700')
    content = content.replace('text-pink-400', 'text-pink-700')
    content = content.replace('text-purple-400', 'text-purple-700')
    content = content.replace('text-yellow-500', 'text-amber-600')
    content = content.replace('text-red-400', 'text-red-600')
    content = content.replace('text-red-300', 'text-red-800')
    
    # 2. Backgrounds and borders for Cards
    content = content.replace('bg-white/5', 'bg-white/70')
    content = content.replace('border-white/10', 'border-white/80')
    content = content.replace('shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]', 'shadow-lg shadow-gray-200/50')
    
    # 3. Backgrounds for Inputs
    content = content.replace('bg-black/20', 'bg-white/60')
    
    # 4. Inactive buttons (lastAction toggles)
    content = content.replace('bg-white/10 hover:bg-white/20 border border-white/5 text-gray-300', 'bg-white/80 hover:bg-white border border-gray-200 text-gray-700')
    content = content.replace('bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20', 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200')
    
    # 5. Fix text color inside active buttons/tags which should remain white
    # e.g. text-white -> text-gray-800 globally, so buttons now say text-gray-800.
    content = content.replace('shadow-blue-500/20 text-gray-800', 'shadow-blue-500/20 text-white')
    content = content.replace('shadow-red-500/20 text-gray-800', 'shadow-red-500/20 text-white')
    content = content.replace('shadow-purple-500/20 text-gray-800', 'shadow-purple-500/20 text-white')
    # EccView active button text fix
    content = content.replace('text-gray-800 py-2 px-3 text-sm flex items-center justify-center', 'text-white py-2 px-3 text-sm flex items-center justify-center')
    
    # 6. Gradients
    content = content.replace('from-blue-600 to-indigo-600', 'from-blue-500 to-indigo-500')
    content = content.replace('hover:from-blue-500 hover:to-indigo-500', 'hover:from-blue-400 hover:to-indigo-400')
    
    # 7. Other specific backgrounds (results boxes, empty states)
    content = content.replace('bg-black/10', 'bg-gray-100/50')
    content = content.replace('bg-black/40', 'bg-gray-100')
    content = content.replace('bg-black/50', 'bg-gray-200')
    content = content.replace('bg-red-900/20', 'bg-red-50')
    content = content.replace('bg-green-500/10', 'bg-green-50')
    content = content.replace('border-white/5', 'border-gray-200')
    content = content.replace('border-white/20', 'border-gray-300')
    content = content.replace('border-green-500/20', 'border-green-200')
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Light Theme applied.")
