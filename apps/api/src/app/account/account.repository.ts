import {AccountModel, AccountType} from '@newgate/model';

export interface AccountRepository {
  getAccountByEmailAndPassword(
    email: string,
    password: string
  ): Promise<AccountModel>;
  createAccount(account: AccountModel): Promise<AccountModel>;
  getAccountsByRole(accountType: AccountType): Promise<AccountModel[]>;
}
