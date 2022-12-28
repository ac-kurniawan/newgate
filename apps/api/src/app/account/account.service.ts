import { AccountModel } from '@newgate/model';
import { logger } from '@newgate/logger';
import { errorAccountNotFound, errorCreateAccount } from './account.errors';
import { AccountRepository } from './account.repository';
import { AccountUtils } from './account.utils';
import { AccountRepositorySQLImpl } from './impl/account.repository.sql.impl';
import { defaultAdminScopes, defaultDeveloperScopes } from './account.constant';
import { DataSource } from 'typeorm';

export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountUtils: AccountUtils
  ) {}
  async createAccount(account: AccountModel): Promise<AccountModel> {
    const password = account.password || 'changeme';
    const accountByRoles = await this.accountRepository
      .getAccountsByRole('ADMIN')
      .catch((error: unknown) => {
        logger.log({
          level: 'error',
          message: (error as Error).message,
        });
        throw new Error(errorCreateAccount.code);
      });

    account.password = this.accountUtils.crypto.encrypt(password);
    account.type = accountByRoles.length === 0 ? 'ADMIN' : 'DEVELOPER';

    switch (account.type) {
      case 'ADMIN':
        account.scopes = defaultAdminScopes;
        break;
      case 'DEVELOPER':
        account.scopes = defaultDeveloperScopes;
        break;
    }

    try {
      return await this.accountRepository.createAccount(account);
    } catch (error: unknown) {
      logger.log({
        level: 'error',
        message: (error as Error).message,
      });
      throw new Error(errorCreateAccount.code);
    }
  }
  async preSigning(email: string, password: string): Promise<AccountModel> {
    const hashPassword = this.accountUtils.crypto.encrypt(password);
    try {
      return await this.accountRepository.getAccountByEmailAndPassword(
        email,
        hashPassword
      );
    } catch (error: unknown) {
      logger.log({
        level: 'error',
        message: (error as Error).message,
      });
      throw new Error(errorAccountNotFound.code);
    }
  }
  async signing(email: string, password: string): Promise<string> {
    const result = await this.preSigning(email, password);
    return this.accountUtils.generateJwt(
      result.id,
      result.email,
      result.fullName,
      result.scopes
    );
  }
  async signup(account: AccountModel): Promise<AccountModel> {
    account.status = 'ACTIVE';
    return await this.createAccount(account);
  }
}

export const accountService = (datasource: DataSource) => {
  const accountRepository = new AccountRepositorySQLImpl(datasource);
  return new AccountService(accountRepository, new AccountUtils());
};
