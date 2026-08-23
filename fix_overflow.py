import glob

for filepath in glob.glob("frontend/src/components/*View.tsx"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace overflow-hidden with overflow-y-auto in the left column
    content = content.replace(
        '<div className="lg:col-span-5 flex flex-col space-y-4 h-full overflow-hidden">',
        '<div className="lg:col-span-5 flex flex-col space-y-4 h-full overflow-y-auto custom-scrollbar pr-2 pb-2">'
    )
    
    # In EccView, the second section was changed to flex-1 min-h-0 by the previous script because it matched the payload regex.
    # We should ensure none of the left side sections compress so small they hide content if they have fixed inputs.
    # Actually, overflow-y-auto on the parent is enough.
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Overflow fixed.")
