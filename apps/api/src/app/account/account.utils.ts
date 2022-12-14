import { Crypto, PBKDF2 } from '@newgate/crypto';
import { config } from '../../environments/config';

export class AccountUtils {
  crypto: Crypto;
  constructor() {
    this.crypto = new PBKDF2(config.credentials.secretToken);
  }
}
