import { AccountModel } from '@newgate/model';
import { logger } from '@newgate/logger';
import { errorAccountNotFound, errorCreateAccount } from './account.errors';
import { AccountRepository } from './account.repository';
import { AccountUtils } from './account.utils';
import { AccountRepositorySQLImpl } from './impl/account.repository.sql.impl';
import { accountDatasource } from './account.datasource';

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
  async preSignin(email: string, password: string): Promise<AccountModel> {
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
  async signin(email: string, password: string): Promise<string> {
    const result = await this.preSignin(email, password);
    return this.accountUtils.generateJwt(result.id);
  }
  async signup(account: AccountModel): Promise<AccountModel> {
    return await this.createAccount(account);
  }
}

export const accountService = () => {
  const accountRepository = new AccountRepositorySQLImpl(accountDatasource);
  return new AccountService(accountRepository, new AccountUtils());
};
