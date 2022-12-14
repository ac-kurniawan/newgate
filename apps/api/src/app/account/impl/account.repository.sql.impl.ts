import { AccountModel } from '@newgate/model';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from '../account.entity';
import { AccountRepository } from '../account.repository';

export class AccountRepositorySQLImpl implements AccountRepository {
  repo: Repository<AccountEntity>;
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
    return result.toModel();
  }
  async createAccount(account: AccountModel): Promise<AccountModel> {
    const result = await this.repo.save(account);
    return result.toModel();
  }
}
