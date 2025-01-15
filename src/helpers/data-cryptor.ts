"use server";

import CryptoJS from "crypto-js";

const saltLength = 16;
const ivLength = 16;
const iterations = 1000;
const keySize = 256 / 32; // 256-bit key

const getSecretKey = () => {
  const secretKey = process.env.ENCRYPT_KEY;
  if (!secretKey) {
    throw new Error("Encrypt Key Failed");
  }
  return new TextEncoder().encode(secretKey);
};

const generateKey = (password: Uint8Array, salt: string) => {
  return CryptoJS.PBKDF2(
    CryptoJS.enc.Utf8.parse(password.toString()),
    CryptoJS.enc.Hex.parse(salt),
    {
      keySize: keySize,
      iterations: iterations,
    }
  );
};

export const DataCrypt = async (text: string) => {
  try {
    const salt = CryptoJS.lib.WordArray.random(saltLength).toString();
    const iv = CryptoJS.lib.WordArray.random(ivLength).toString();
    const key = generateKey(getSecretKey(), salt);

    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
    }).toString();

    const hmac = CryptoJS.HmacSHA256(encrypted, key).toString();

    const payload = {
      salt: salt,
      iv: iv,
      encrypted: encrypted,
      hmac: hmac,
    };

    return CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(JSON.stringify(payload))
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Encryption error:", error.message);
    }

    //console.error("Encryption error:", error);
    return "";
  }
};

export const DataDecrypt = async (ciphertext: string) => {
  try {
    const payloadString = CryptoJS.enc.Base64.parse(ciphertext).toString(
      CryptoJS.enc.Utf8
    );
    const payload = JSON.parse(payloadString);

    const key = generateKey(getSecretKey(), payload.salt);
    const hmac = CryptoJS.HmacSHA256(payload.encrypted, key).toString();

    if (hmac !== payload.hmac) {
      throw new Error("HMAC verification failed");
    }

    const decrypted = CryptoJS.AES.decrypt(payload.encrypted, key, {
      iv: CryptoJS.enc.Hex.parse(payload.iv),
    }).toString(CryptoJS.enc.Utf8);

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};
