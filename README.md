# CSE721 Cryptography Project

Implementation and Security Analysis of Classical and Modern Cryptographic Algorithms.
This project fulfills the requirements of the course project without using built-in crypto libraries for core operations (e.g. OpenSSL). 

## Architecture
- **Backend**: Python (FastAPI). Contains all cryptographic algorithm implementations written from scratch.
- **Frontend**: Next.js (React + Tailwind CSS). Provides a beautiful, modern UI to interact with the algorithms.

## Prerequisites
- Node.js (for Next.js)
- Python 3.8+ (for FastAPI backend)

## How to Run

### 1. Start the Python Backend
The backend runs the API on `http://127.0.0.1:8000`.

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### 2. Start the Next.js Frontend
The frontend runs on `http://localhost:3000`.

```bash
cd frontend
npm install
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:3000` to view the UI and test all algorithms.

## Implemented Algorithms
1. **Classical Cryptography**
   - Substitution Cipher (with Brute force simulation & Frequency Analysis)
   - Double Transposition Cipher (with Frequency Analysis)
2. **Symmetric-key Cryptography**
   - DES (16-rounds from scratch, auto-generates round keys)
   - AES (AES-128 from scratch, auto-generates round keys)
3. **Public-key Cryptography**
   - RSA (Key Generation, Encryption, Decryption, and Factorization attack demonstration)
   - ECC (Domain parameters, Points on curve, ECDH Key Exchange)
