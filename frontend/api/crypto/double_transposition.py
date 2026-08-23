import math

def get_frequency_analysis(text):
    # Same frequency analysis as substitution to show it doesn't change
    from collections import Counter
    import string
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

def get_order_from_key(key):
    # Example: key = "HACK", order = [1, 0, 2, 3] (A, C, H, K)
    key_chars = list(key.upper())
    sorted_key = sorted(list(enumerate(key_chars)), key=lambda x: x[1])
    order = [0] * len(key)
    for i, (original_index, char) in enumerate(sorted_key):
        order[original_index] = i
    
    # Return mapping from column index to order
    # Actually, we want a list where the element is the original column index, sorted by key character.
    # HACK -> A(1), C(2), H(0), K(3) -> original indices [1, 2, 0, 3]
    return [original_index for original_index, char in sorted_key]

def columnar_transposition_encrypt(plaintext, key):
    plaintext = plaintext.replace(" ", "").upper()
    col_order = get_order_from_key(key)
    cols = len(key)
    rows = math.ceil(len(plaintext) / cols)
    
    # Pad plaintext with X
    padded_len = rows * cols
    if len(plaintext) < padded_len:
        plaintext += 'X' * (padded_len - len(plaintext))
        
    grid = [plaintext[i:i+cols] for i in range(0, len(plaintext), cols)]
    
    ciphertext = ""
    for col_idx in col_order:
        for row in range(rows):
            ciphertext += grid[row][col_idx]
            
    return ciphertext

def columnar_transposition_decrypt(ciphertext, key):
    col_order = get_order_from_key(key)
    cols = len(key)
    rows = len(ciphertext) // cols
    
    # We need to fill the grid column by column according to col_order
    grid = [[''] * cols for _ in range(rows)]
    
    char_index = 0
    for col_idx in col_order:
        for row in range(rows):
            grid[row][col_idx] = ciphertext[char_index]
            char_index += 1
            
    plaintext = ""
    for row in range(rows):
        plaintext += "".join(grid[row])
        
    return plaintext

def encrypt(plaintext, key1, key2):
    """
    Double transposition encryption
    """
    first_pass = columnar_transposition_encrypt(plaintext, key1)
    second_pass = columnar_transposition_encrypt(first_pass, key2)
    return second_pass

def decrypt(ciphertext, key1, key2):
    """
    Double transposition decryption
    We apply the reverse process: decrypt with key2, then key1
    """
    first_pass_decrypt = columnar_transposition_decrypt(ciphertext, key2)
    second_pass_decrypt = columnar_transposition_decrypt(first_pass_decrypt, key1)
    return second_pass_decrypt
