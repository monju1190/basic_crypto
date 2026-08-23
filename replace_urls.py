import glob
import os

for filepath in glob.glob("frontend/src/components/*.tsx"):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('http://localhost:8000/', '/')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replaced http://localhost:8000/ with / in all components.")
