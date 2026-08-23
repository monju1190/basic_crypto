from collections import Counter
import string
import itertools

def get_frequency_analysis(text):
    text = text.upper()
    text = ''.join([c for c in text if c in string.ascii_uppercase])
    total = len(text)
    freq = {}
    if total > 0:
        counts = Counter(text)
        for char in string.ascii_uppercase:
            freq[char] = counts.get(char, 0) / total * 100
    else:
        for char in string.ascii_uppercase:
            freq[char] = 0
    return freq

def encrypt(plaintext, key):
    """
    Encrypts using a 26-letter permutation key.
    Key is a string of 26 unique uppercase letters.
    """
    plaintext = plaintext.upper()
    key = key.upper()
    alphabet = string.ascii_uppercase
    
    mapping = {alphabet[i]: key[i] for i in range(26)}
    
    ciphertext = ""
    for char in plaintext:
        if char in mapping:
            ciphertext += mapping[char]
        else:
            ciphertext += char # keep spaces and punctuation
            
    return ciphertext

def decrypt(ciphertext, key):
    """
    Decrypts using a 26-letter permutation key.
    """
    ciphertext = ciphertext.upper()
    key = key.upper()
    alphabet = string.ascii_uppercase
    
    mapping = {key[i]: alphabet[i] for i in range(26)}
    
    plaintext = ""
    for char in ciphertext:
        if char in mapping:
            plaintext += mapping[char]
        else:
            plaintext += char
            
    return plaintext

def brute_force_attack(ciphertext, max_attempts=10000):
    """
    Demonstrates a brute-force attack. 
    Since 26! is too large, this function will try permutations and return early.
    In a real scenario, this would check against a dictionary.
    """
    alphabet = string.ascii_uppercase
    attempts = 0
    
    # We will just yield a few permutations to demonstrate the concept.
    # We return the first few attempted decrypted strings.
    results = []
    
    for perm in itertools.permutations(alphabet):
        if attempts >= max_attempts:
            break
        
        current_key = "".join(perm)
        # To make it simple, we just record a few attempts to show the UI
        if attempts < 5:
            decrypted = decrypt(ciphertext, current_key)
            results.append({
                "key": current_key,
                "decrypted": decrypted
            })
        attempts += 1
        
    return {
        "message": f"Attempted {max_attempts} keys out of 26! ({26*25*24*23*22*21*20*19*18*17*16*15*14*13*12*11*10*9*8*7*6*5*4*3*2*1}). Brute force is computationally infeasible.",
        "sample_attempts": results
    }
