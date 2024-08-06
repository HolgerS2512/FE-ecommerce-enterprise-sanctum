import CryptoJS from 'crypto-js';

class AesCryptographer {
  constructor() {
    this.key = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(import.meta.env.VITE_API_CRYPTO_KEY).toString(CryptoJS.enc.Hex).slice(0, 32 * 2)); // 32 Byte für AES-256
  }

  encrypt(data) {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, this.key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
  }

  decrypt(encryptedData) {
    try {
      const data = CryptoJS.enc.Base64.parse(encryptedData);
      const ivSize = 16; // 16 Bytes
      const iv = CryptoJS.lib.WordArray.create(data.words.slice(0, ivSize / 4), ivSize);
      const encrypted = CryptoJS.lib.WordArray.create(data.words.slice(ivSize / 4));

      // console.log('IV (Hex):', iv.toString(CryptoJS.enc.Hex));
      // console.log('Encrypted (Hex):', encrypted.toString(CryptoJS.enc.Hex));
      // console.log('IV Länge:', iv.sigBytes, 'Bytes');
      // console.log('Encrypted Länge:', encrypted.sigBytes, 'Bytes');

      const decrypted = CryptoJS.AES.decrypt({ ciphertext: encrypted }, this.key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Debugging: Show before converting to UTF-8
      // console.log('Decrypted (WordArray):', decrypted.toString());

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      // if (!decryptedText) {
      //   console.error('Decryption failed. The result is an empty string.');
      // }

      return decryptedText;
    } catch (error) {
      // console.error('Decryption error:', error.message);
      return null;
    }
  }
}

export default AesCryptographer;
