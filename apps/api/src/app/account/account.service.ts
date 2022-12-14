import { AccountModel } from '@newgate/model';
import { logger } from '@newgate/logger';
import { errorAccountNotFound, errorCreateAccount } from './account.errors';
import { AccountRepository } from './account.repository';
import { AccountUtils } from './account.utils';

export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountUtils: AccountUtils
  ) {}
  async createAccount(account: AccountModel): Promise<AccountModel> {
    const password = account.password || 'changeme';
    account.password = this.accountUtils.crypto.encrypt(password);
    try {
      const result = await this.accountRepository.createAccount(account);
      return result;
    } catch (error: unknown) {
      logger.log({
        level: 'error',
        message: (error as Error).message,
      });
      throw new Error(errorCreateAccount.code);
    }
  }
  async login(email: string, password: string): Promise<AccountModel> {
    const hashPassword = this.accountUtils.crypto.encrypt(password);
    try {
      const result = await this.accountRepository.getAccountByEmailAndPassword(
        email,
        hashPassword
      );
      return result;
    } catch (error: unknown) {
      logger.log({
        level: 'error',
        message: (error as Error).message,
      });
      throw new Error(errorAccountNotFound.code);
    }
  }
  async signup(account: AccountModel): Promise<AccountModel> {
    return await this.createAccount(account);
  }
}
