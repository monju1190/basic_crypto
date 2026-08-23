import sys
import traceback

sys.path.append(r"e:\cse721_project\backend")
from crypto import aes

try:
    key = "THISSUPERKEY1234"
    pt = "HELLO WORLD"
    ct, rk = aes.encrypt(pt, key)
    print("Ciphertext:", ct)
    dec = aes.decrypt(ct, key)
    print("Decrypted:", dec)
    if pt == dec:
        print("SUCCESS")
    else:
        print("FAILED: pt != dec")
except Exception as e:
    traceback.print_exc()
