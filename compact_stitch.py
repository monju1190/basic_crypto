import glob
import re

for filepath in glob.glob("frontend/src/components/*View.tsx"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Main container: <div className="space-y-6"> -> <div className="flex flex-col h-full space-y-4">
    content = content.replace('<div className="space-y-6">', '<div className="flex flex-col h-full space-y-4">', 1)

    # 2. Header: mb-8 -> mb-4 flex-shrink-0
    content = content.replace(' gap-4 mb-8">', ' gap-4 mb-4 flex-shrink-0">')
    
    # Header title: text-[32px] -> text-[24px]
    content = content.replace('text-[32px]', 'text-[24px]')

    # 3. Grid: gap-6 -> gap-4 flex-1 min-h-0
    content = content.replace('<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">', '<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">')
    
    # 4. Left Column: space-y-6 -> flex flex-col space-y-4 h-full overflow-hidden
    content = content.replace('<div className="lg:col-span-5 space-y-6">', '<div className="lg:col-span-5 flex flex-col space-y-4 h-full overflow-hidden">')
    
    # 5. Parameters Section (first section): p-6 -> p-4 flex-shrink-0
    # We can just replace all `rounded-xl p-6` with `rounded-xl p-4 flex-shrink-0` but payload needs flex-1.
    content = content.replace('rounded-xl p-6 relative', 'rounded-xl p-4 relative flex-shrink-0')
    content = content.replace('mb-6 flex', 'mb-3 flex')
    content = content.replace('space-y-5', 'space-y-3')
    
    # 6. Payload Section (second section): p-6 -> p-4 flex-1 flex flex-col min-h-0
    content = content.replace('rounded-xl p-6"', 'rounded-xl p-4 flex-1 flex flex-col min-h-0"')
    content = content.replace('mb-4 flex', 'mb-3 flex')
    
    # Textarea container: <div className="mb-6"> -> <div className="mb-4 flex-1 flex flex-col min-h-0">
    content = content.replace('<div className="mb-6">', '<div className="mb-4 flex-1 flex flex-col min-h-0">')
    
    # Textarea itself: remove min-h-[160px] or min-h-[120px], add flex-1 min-h-0
    content = re.sub(r'min-h-\[1[26]0px\]', 'flex-1 min-h-0', content)
    
    # 7. Right Column: remove min-h-[500px]
    content = content.replace('min-h-[500px]', '')
    
    # 8. Execution Results header: p-4 -> p-3
    content = content.replace('p-4 border-b', 'p-3 border-b')
    
    # 9. Execution Results body: p-6 -> p-4
    content = content.replace('flex-1 p-6 overflow-y-auto', 'flex-1 p-4 overflow-y-auto')
    
    # 10. Also need to ensure page.tsx has h-full for the main workspace so *View can be h-full
    # We will do page.tsx separately below

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

# Update page.tsx
page_file = "frontend/src/app/page.tsx"
with open(page_file, "r", encoding="utf-8") as f:
    page_content = f.read()

# Make main workspace flex flex-col so child can be flex-1
page_content = page_content.replace('<main className="flex-1 p-6 md:p-10 overflow-y-auto w-full relative custom-scrollbar">', '<main className="flex-1 p-4 md:p-6 overflow-hidden w-full relative flex flex-col">')
# Make the max-w container flex-1 min-h-0
page_content = page_content.replace('<div className="max-w-[1440px] mx-auto">', '<div className="max-w-[1440px] w-full mx-auto flex-1 min-h-0">')

with open(page_file, "w", encoding="utf-8") as f:
    f.write(page_content)

print("Layout compacted.")
