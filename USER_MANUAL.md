# Cryptography Project - User Manual & Testing Guide

This document explains how to use the UI to test each cryptographic algorithm. You can use this guide during your presentation to ensure everything works perfectly and to explain the functionality to your teacher.

## General Overview
- **Left Sidebar:** Used to navigate between the different cryptographic algorithms.
- **Main Area:** Contains the input fields (top section) and the results (bottom section).
- **Backend Connection:** Whenever you click a button, the Next.js frontend sends the input data to the Python FastAPI backend, which runs the pure cryptographic math and sends back the result.

---

## 1. Substitution Cipher
This is a classical cipher where each letter in the plaintext is replaced by another letter based on a 26-letter key.

### How to Test:
1. **Input Text:** Type a simple message like `HELLO WORLD`.
2. **Key:** Enter any 26-letter permutation of the alphabet (e.g., `QWERTYUIOPASDFGHJKLZXCVBNM`).
3. **Encrypt:** Click **Encrypt**.
   - **Expected Result:** The ciphertext will appear. For the QWERTY key, `HELLO` becomes `ITSSG`.
   - **Frequency Analysis:** Scroll down to see the frequency of letters in your text.
4. **Decrypt:** Click **Decrypt** while the ciphertext is in the Input box.
   - **Expected Result:** It should turn back into `HELLO WORLD`.
5. **Brute Force Attack:** 
   - Enter a short ciphertext.
   - Click **Brute Force Attack**.
   - **Expected Result:** Because 26! is too large to fully brute-force, the app simulates a dictionary-based attack and shows you a few sample key permutations and their resulting decryptions.

---

## 2. Double Transposition
A classical cipher where the text is written in a grid and the columns are rearranged according to a keyword. This happens twice (hence "Double").

### How to Test:
1. **Input Text:** Type `DEFEND THE EAST WALL OF THE CASTLE`.
2. **First Key:** Type a short word like `APPLE`.
3. **Second Key:** Type another word like `BANANA`.
4. **Encrypt:** Click **Encrypt**.
   - **Expected Result:** The ciphertext will appear scrambled.
   - **Frequency Analysis:** Note that the frequency analysis *does not change* from the plaintext to the ciphertext. Transposition only moves letters around; it doesn't replace them.
5. **Decrypt:** Put the ciphertext into the Input box and click **Decrypt**.
   - **Expected Result:** Your original message will be restored.

---

## 3. DES (Data Encryption Standard)
A modern symmetric-key block cipher that uses a 64-bit (8-character) key and 16 rounds of Feistel network operations.

### How to Test:
1. **Input Text:** Type `SECRET MESSAGE`.
2. **Key:** Click the **Auto Generate** button, or type exactly 8 characters (e.g., `MYKEY123`).
3. **Encrypt:** Click **Encrypt**.
   - **Expected Result:** The ciphertext will be displayed in Hexadecimal format (e.g., `8a5c...`).
   - **16 Round Keys:** Scroll down. You will see 16 different subkeys (R1 to R16). This proves to your teacher that the full DES key schedule is implemented!
4. **Decrypt:** Put the Hex ciphertext in the input box, keep the same key, and click **Decrypt**.
   - **Expected Result:** Your text is restored.

---

## 4. AES (Advanced Encryption Standard)
A highly secure symmetric-key algorithm (AES-128) using a 128-bit (16-character) key and 10 rounds of substitution-permutation network operations.

### How to Test:
1. **Input Text:** Type `TOP SECRET AES`.
2. **Key:** Click **Auto Generate**, or type exactly 16 characters (e.g., `THISSUPERKEY1234`).
3. **Encrypt:** Click **Encrypt**.
   - **Expected Result:** The ciphertext will appear in Hexadecimal.
   - **11 Round Keys:** You will see 11 round keys (the initial key + 10 round keys). This shows the AES key expansion works properly.
4. **Decrypt:** Put the Hex ciphertext back into the input box and click **Decrypt**.
   - **Expected Result:** The original text comes back.

---

## 5. RSA (Rivest–Shamir–Adleman)
A public-key cryptosystem where encryption is done with a public key and decryption with a private key.

### How to Test:
1. **Generate Keys:** Click **Generate Keypair**.
   - **Expected Result:** It will generate a Public Key (e, n) and a Private Key (d, n).
2. **Encrypt:** Type a message like `HELLO` in the input box and click **Encrypt**.
   - **Expected Result:** The ciphertext will be shown as an array of large integers. In textbook RSA, each character is converted to a number and raised to the power of `e (mod n)`.
3. **Decrypt:** Click **Decrypt**.
   - **Expected Result:** The array of integers is converted back to text.
4. **Factorization Attack:**
   - Click **Factorization Attack (Factor N)**.
   - **Expected Result:** The app will attempt to find the prime factors `p` and `q` of the modulus `n`. Since we are using small modulus values for demonstration purposes, the attack will succeed and show how RSA can be broken if the keys are too small.

---

## 6. ECC (Elliptic Curve Cryptography)
Demonstrates finding points on a curve, generating a keypair, and Elliptic Curve Diffie-Hellman Key Exchange.

### How to use:
#### b) ECC Core
1. You can tweak the **Domain parameters (p, a, b)**, but for a simple demo, leave them as `p=17`, `a=2`, `b=2`. 
2. Set a **Base Point G (x, y)**, like `x=5, y=1`.
3. Provide an **n (Order)** and a **Private Key Input**.
4. Click **List all Ps** to see every valid point on the elliptic curve.
5. Click **Generate Keypair** to calculate the **Public key** by performing scalar multiplication on the base point G using your private key.

#### Elliptic curve Diffie-Hellman Key exchange
1. Set **Alice's Private Key (a)** and **Bob's Private Key (b)**.
2. Click **Simulate ECDH Exchange**.
3. **Expected Result:** The app will output Alice's public key, Bob's public key, and finally the **Shared key**. This shared key is computed independently by both parties to prove the Diffie-Hellman protocol works perfectly. This proves the math is correct.
