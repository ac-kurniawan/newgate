import { AccountDto, AuthDto, SignupDto } from '@newgate/dto';
import { AccountRepository } from '../repository/account.repository';
import { RemoteDatasourceImpl } from '../datasource/impl/remote.datasource.impl';
import { AccountRepositoryImpl } from '../repository/impl/account.repository.impl';
import { LocalDatasourceImpl } from '../datasource/impl/local.datasource.impl';
import JWT from 'jwt-decode';
import { Claim } from '@newgate/model';

export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async getSession(): Promise<AuthDto> {
    const session = await this.accountRepository.getSession();
    const decoded: Claim = JWT(session.accessToken);
    if (decoded.exp < new Date().getTime() / 1000) {
      await this.signout();
      throw new Error('token expired');
    }
    return await this.accountRepository.getSession();
  }

  async signin(email: string, password: string): Promise<AuthDto> {
    const result = await this.accountRepository.signin(email, password);
    await this.accountRepository.saveSession(result);
    return result;
  }

  async signup(signupModel: SignupDto): Promise<AccountDto> {
    return await this.accountRepository.signup(signupModel);
  }

  async signout(): Promise<void> {
    await this.accountRepository.clearSession();
  }
}

export const newAccountService = (): AccountService => {
  const remoteDatasource = new RemoteDatasourceImpl();
  const localDatasource = new LocalDatasourceImpl();
  const accountRepository = new AccountRepositoryImpl(
    remoteDatasource,
    localDatasource
  );
  return new AccountService(accountRepository);
};
