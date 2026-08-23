import glob
import re

# 1. Update page.tsx
page_file = "frontend/src/app/page.tsx"
with open(page_file, "r", encoding="utf-8") as f:
    page_content = f.read()

# Remove header
page_content = re.sub(r'\{/\* TopNavBar \*/\}.*?</header>', '', page_content, flags=re.DOTALL)
# Remove pt-16
page_content = page_content.replace('pt-16 h-screen', 'h-screen')

# Remove Dashboard button
dashboard_regex = r'<button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high/50 transition-all active:translate-x-1 duration-200 mt-4">.*?</button>'
page_content = re.sub(dashboard_regex, '', page_content, flags=re.DOTALL)

# Remove footer buttons (Generate Key, Docs, Support)
footer_regex = r'<div className="px-4 mt-auto pb-4">.*?</div>\s*</nav>'
page_content = re.sub(footer_regex, '</nav>', page_content, flags=re.DOTALL)

with open(page_file, "w", encoding="utf-8") as f:
    f.write(page_content)


# 2. Update all View components
api_online_regex = r'<div className="flex items-center gap-3 bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/20">.*?</div>'

for filepath in glob.glob("frontend/src/components/*View.tsx"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    content = re.sub(api_online_regex, '', content, flags=re.DOTALL)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("UI cleanup complete.")
