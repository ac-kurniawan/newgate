import CryptoJS = require('crypto-js');

export interface Crypto {
  encrypt(str: string): string;
  validate(str: string, hash: string): boolean;
}

export class PBKDF2 implements Crypto {
  constructor(private readonly salt: string) {}
  validate(str: string, hash: string): boolean {
    const newHash = this.encrypt(str);
    return newHash === hash;
  }
  encrypt(str: string): string {
    return CryptoJS.PBKDF2(str, this.salt, {
      keySize: 128 / 32,
      iterations: 1000,
    }).toString();
  }
}
