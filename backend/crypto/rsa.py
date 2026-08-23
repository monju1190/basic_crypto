import random
import math

def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def multiplicative_inverse(e, phi):
    d = 0
    x1, x2, x3 = 0, 1, phi
    y1, y2, y3 = 1, 0, e
    while y3 != 0:
        q = x3 // y3
        y1, y2, y3, x1, x2, x3 = (x1 - q * y1), (x2 - q * y2), (x3 - q * y3), y1, y2, y3
    if x3 == 1:
        return x2 % phi
    return None

def is_prime(num, test_count=40):
    if num == 2 or num == 3:
        return True
    if num <= 1 or num % 2 == 0:
        return False
    
    # Miller-Rabin Primality Test
    s = 0
    d = num - 1
    while d % 2 == 0:
        d //= 2
        s += 1
        
    for _ in range(test_count):
        a = random.randrange(2, num - 1)
        x = pow(a, d, num)
        if x == 1 or x == num - 1:
            continue
        for _ in range(s - 1):
            x = pow(x, 2, num)
            if x == num - 1:
                break
        else:
            return False
    return True

def generate_prime(bits):
    while True:
        p = random.getrandbits(bits)
        # Ensure it's odd and has the right number of bits
        p |= (1 << bits - 1) | 1
        if is_prime(p):
            return p

def generate_keypair(bits):
    # For a total key size of N bits, p and q should be N//2 bits
    p = generate_prime(bits // 2)
    q = generate_prime(bits // 2)
    n = p * q
    phi = (p - 1) * (q - 1)

    e = 65537
    g = gcd(e, phi)
    while g != 1:
        e = random.randrange(1, phi)
        g = gcd(e, phi)

    d = multiplicative_inverse(e, phi)
    
    return ((e, n), (d, n))

def encrypt(pk, plaintext):
    key, n = pk
    # Convert each character to ASCII, then to ciphertext
    cipher = [pow(ord(char), key, n) for char in plaintext]
    return cipher

def decrypt(pk, ciphertext):
    key, n = pk
    # Decrypt each integer back to a character
    plain = [chr(pow(char, key, n)) for char in ciphertext]
    return ''.join(plain)

def factorization_attack(n):
    """
    Attempts to factor N.
    Works only for very small keys (e.g., up to 32-40 bits).
    For larger keys (512, 1024), it returns a message indicating it's infeasible.
    """
    if n > 2**40:
        return {
            "success": False,
            "message": f"N is too large ({n.bit_length()} bits). Factorization attack is computationally infeasible on a standard computer."
        }
    
    # Simple trial division for small keys
    limit = math.isqrt(n) + 1
    if limit % 2 == 0:
        limit += 1
        
    for i in range(3, limit, 2):
        if n % i == 0:
            q = n // i
            return {
                "success": True,
                "message": f"Successfully factored N! p = {i}, q = {q}",
                "p": i,
                "q": q
            }
            
    return {
        "success": False,
        "message": "Failed to factor N."
    }
