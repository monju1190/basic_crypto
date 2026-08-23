import sys
import os
sys.path.append(os.path.dirname(__file__))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crypto import substitution, double_transposition, des, aes, rsa, ecc

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CryptoRequest(BaseModel):
    plaintext: str = ""
    ciphertext: str = ""
    key: str = ""
    key1: str = ""
    key2: str = ""

@app.post("/api/substitution/encrypt")
def sub_encrypt(req: CryptoRequest):
    ciphertext = substitution.encrypt(req.plaintext, req.key)
    freq = substitution.get_frequency_analysis(ciphertext)
    return {"ciphertext": ciphertext, "frequency_analysis": freq}

@app.post("/api/substitution/decrypt")
def sub_decrypt(req: CryptoRequest):
    plaintext = substitution.decrypt(req.ciphertext, req.key)
    freq = substitution.get_frequency_analysis(req.ciphertext)
    return {"plaintext": plaintext, "frequency_analysis": freq}

@app.post("/api/substitution/brute_force")
def sub_brute_force(req: CryptoRequest):
    return substitution.brute_force_attack(req.ciphertext)

@app.post("/api/transposition/encrypt")
def trans_encrypt(req: CryptoRequest):
    ciphertext = double_transposition.encrypt(req.plaintext, req.key1, req.key2)
    freq = double_transposition.get_frequency_analysis(ciphertext)
    return {"ciphertext": ciphertext, "frequency_analysis": freq}

@app.post("/api/transposition/decrypt")
def trans_decrypt(req: CryptoRequest):
    plaintext = double_transposition.decrypt(req.ciphertext, req.key1, req.key2)
    freq = double_transposition.get_frequency_analysis(req.ciphertext)
    return {"plaintext": plaintext, "frequency_analysis": freq}

@app.post("/api/des/encrypt")
def des_encrypt(req: CryptoRequest):
    ciphertext, round_keys = des.encrypt(req.plaintext, req.key)
    return {"ciphertext": ciphertext, "round_keys": round_keys}

@app.post("/api/des/decrypt")
def des_decrypt(req: CryptoRequest):
    try:
        plaintext = des.decrypt(req.ciphertext, req.key)
        return {"plaintext": plaintext}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid hex string. Please provide valid hex ciphertext from the encryption step.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/aes/encrypt")
def aes_encrypt(req: CryptoRequest):
    ciphertext, round_keys = aes.encrypt(req.plaintext, req.key)
    return {"ciphertext": ciphertext, "round_keys": round_keys}

@app.post("/api/aes/decrypt")
def aes_decrypt(req: CryptoRequest):
    try:
        plaintext = aes.decrypt(req.ciphertext, req.key)
        return {"plaintext": plaintext}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid hex string. Please provide valid hex ciphertext from the encryption step.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class RSAGenRequest(BaseModel):
    bits: int

@app.post("/api/rsa/generate")
def rsa_gen(req: RSAGenRequest):
    public_key, private_key = rsa.generate_keypair(req.bits)
    return {"public_key": public_key, "private_key": private_key}

class RSAEncryptRequest(BaseModel):
    plaintext: str
    public_key: list

@app.post("/api/rsa/encrypt")
def rsa_encrypt_route(req: RSAEncryptRequest):
    ciphertext = rsa.encrypt(req.public_key, req.plaintext)
    return {"ciphertext": ciphertext}

class RSADecryptRequest(BaseModel):
    ciphertext: list
    private_key: list

@app.post("/api/rsa/decrypt")
def rsa_decrypt_route(req: RSADecryptRequest):
    plaintext = rsa.decrypt(req.private_key, req.ciphertext)
    return {"plaintext": plaintext}

class RSAFactorRequest(BaseModel):
    n: int

@app.post("/api/rsa/factorize")
def rsa_factorize(req: RSAFactorRequest):
    return rsa.factorization_attack(req.n)

class ECCRequest(BaseModel):
    p: int
    a: int
    b: int

@app.post("/api/ecc/points")
def ecc_points(req: ECCRequest):
    points = ecc.generate_all_points(req.p, req.a, req.b)
    return {"points": points}

class ECCKeypairRequest(BaseModel):
    p: int
    a: int
    b: int
    Gx: int
    Gy: int
    private_key: int

@app.post("/api/ecc/keypair")
def ecc_keypair(req: ECCKeypairRequest):
    curve = ecc.EllipticCurve(req.p, req.a, req.b)
    G = (req.Gx, req.Gy)
    public_key = ecc.scalar_multiply(curve, req.private_key, G)
    return {"private_key": req.private_key, "public_key": public_key}

class ECDHRequest(BaseModel):
    p: int
    a: int
    b: int
    Gx: int
    Gy: int
    private_a: int
    private_b: int

@app.post("/api/ecc/ecdh")
def ecc_ecdh(req: ECDHRequest):
    curve = ecc.EllipticCurve(req.p, req.a, req.b)
    G = (req.Gx, req.Gy)
    result = ecc.ecdh_key_exchange(curve, G, req.private_a, req.private_b)
    return result
