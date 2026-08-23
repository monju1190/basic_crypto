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
    
    # 1. Outer container
    content = content.replace(
        '<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">',
        '<div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">'
    )
    
    # 2. Header div
    content = content.replace(
        '  return (\n    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">\n      <div>',
        '  return (\n    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">\n      <div className="flex-shrink-0">'
    )

    # 3. Grid container
    content = content.replace(
        '<div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">',
        '<div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-6">'
    )
    
    # 4. Left Panel scrolling
    content = content.replace(
        '<div className="space-y-5 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">',
        '<div className="space-y-5 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-y-auto custom-scrollbar">'
    )
    
    content = content.replace(
        '<div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] space-y-5">',
        '<div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] space-y-5 overflow-y-auto custom-scrollbar">'
    )
    
    content = content.replace(
        '<div className="space-y-6">\n          <div className="bg-white/5',
        '<div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">\n          <div className="bg-white/5'
    )
    
    # 5. Remove max-h-[500px] from right panel in Aes and Des views
    content = content.replace(
        'overflow-hidden flex flex-col max-h-[500px]',
        'overflow-hidden flex flex-col'
    )

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Layout updated.")
