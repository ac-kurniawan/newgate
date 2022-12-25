import { Crypto, PBKDF2 } from '@newgate/crypto';
import { config } from '../../environments/config';
import { sign, verify } from 'jsonwebtoken';
import {errorSigning} from "./account.errors";
export class AccountUtils {
  crypto: Crypto;
  constructor() {
    this.crypto = new PBKDF2(config.credentials.secretToken);
  }

  generateJwt(sub: string, email: string, fullName: string, scopes: string): string {
    try {
      return sign({ scopes, email, fullName }, config.credentials.secretToken, {
        algorithm: 'HS256',
        expiresIn: "1d",
        issuer: "@newgate/api",
        subject: sub
      });
    } catch (e: unknown) {
      throw new Error(errorSigning.code)
    }
  }

  verifyJwt(token: string): boolean {
    try {
      verify(token, config.credentials.secretToken, {
        algorithms: ['HS256'],
        issuer: "@newgate/api"
      });
      return true;
    } catch (error: unknown) {
      return false;
    }
  }
}
