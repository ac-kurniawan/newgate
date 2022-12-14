import { Crypto, PBKDF2 } from '@newgate/crypto';
import { config } from '../../environments/config';
import { sign, verify } from 'jsonwebtoken';
export class AccountUtils {
  crypto: Crypto;
  constructor() {
    this.crypto = new PBKDF2(config.credentials.secretToken);
  }

  generateJwt(sub: string): string {
    return sign({ sub }, config.credentials.secretToken, {
      algorithm: 'HS256',
    });
  }

  verifyJwt(token: string): boolean {
    try {
      verify(token, config.credentials.secretToken, {
        algorithms: ['HS256'],
      });
      return true;
    } catch (error: unknown) {
      return false;
    }
  }
}
