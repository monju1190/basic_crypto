import os
import re

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
    
    # Global layout spacing
    content = content.replace('className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500"', 'className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-2"')
    content = content.replace('mt-6"', 'mt-2"')
    
    # Card padding
    content = content.replace('p-8 rounded-2xl', 'p-5 rounded-xl')
    
    # Inner vertical spacing
    content = content.replace('space-y-5 ', 'space-y-3 ')
    content = content.replace('space-y-6 ', 'space-y-3 ')
    content = content.replace('space-y-4 ', 'space-y-2 ')
    
    # Input paddings (p-4 -> p-3)
    content = content.replace('p-4 text-white', 'p-3 text-white text-sm')
    content = content.replace('py-4 text-white', 'py-2 text-white text-sm')
    
    # Textarea rows (rows={4} -> rows={3}, rows={3} -> rows={2})
    content = content.replace('rows={4}', 'rows={3}')
    content = content.replace('rows={3}', 'rows={2}')
    
    # Button paddings (py-3 -> py-2)
    content = content.replace('py-3 px-4', 'py-2 px-3 text-sm')
    
    # Remove some bottom margins
    content = content.replace('mb-6', 'mb-3')
    content = content.replace('mb-4', 'mb-2')
    content = content.replace('mb-2', 'mb-1')
    
    # ECC specific
    content = content.replace('pl-8 pr-4 py-4', 'pl-8 pr-3 py-2')
    content = content.replace('pl-12 pr-4 py-4', 'pl-12 pr-3 py-2')
    
    # Results Area inner spacing
    content = content.replace('p-4 rounded-xl', 'p-3 rounded-xl')

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Layout compacted.")
