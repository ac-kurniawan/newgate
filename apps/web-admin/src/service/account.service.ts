import { AccountDto, AuthDto, SignupDto } from '@newgate/dto';
import { AccountRepository } from '../repository/account.repository';
import {RemoteDatasourceImpl} from "../datasource/impl/remote.datasource.impl";
import {AccountRepositoryImpl} from "../repository/impl/account.repository.impl";

export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async signin(email: string, password: string): Promise<AuthDto> {
    return await this.accountRepository.signin(email, password);
  }

  async signup(signupModel: SignupDto): Promise<AccountDto> {
    return await this.accountRepository.signup(signupModel);
  }
}

export const newAccountService = (): AccountService => {
  const remoteDatasource = new RemoteDatasourceImpl()
  const accountRepository = new AccountRepositoryImpl(remoteDatasource)
  return new AccountService(accountRepository)
}
