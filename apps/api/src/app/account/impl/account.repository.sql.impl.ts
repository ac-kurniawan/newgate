import {AccountModel, AccountType} from '@newgate/model';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity, accountEntityConverter } from '../account.entity';
import { AccountRepository } from '../account.repository';

export class AccountRepositorySQLImpl implements AccountRepository {
  private repo: Repository<AccountEntity>;
  constructor(private readonly datasource: DataSource) {
    this.repo = this.datasource.getRepository(AccountEntity);
  }
  async getAccountByEmailAndPassword(
    email: string,
    password: string
  ): Promise<AccountModel> {
    const result = await this.repo.findOneByOrFail({
      email,
      password,
    });
    return accountEntityConverter.toModel(result);
  }
  async createAccount(account: AccountModel): Promise<AccountModel> {
    const result = await this.repo.save(account);
    return accountEntityConverter.toModel(result);
  }

  async getAccountsByRole(accountType: AccountType): Promise<AccountModel[]> {
    const result = await this.repo.find({where: {type: accountType}})
    return result.map(data => accountEntityConverter.toModel(data))
  }
}
