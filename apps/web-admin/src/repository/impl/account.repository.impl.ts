import { AuthDto, SignupDto, AccountDto } from '@newgate/dto';
import { LocalDatasource } from '../../datasource/local.datasouce';
import { DatasourceOption } from '../../datasource/options.datasource';
import { RemoteDatasource } from '../../datasource/remote.datasource';
import { AccountRepository, RepositoryOptions } from '../account.repository';

export class AccountRepositoryImpl implements AccountRepository {
  constructor(
    private readonly remoteDatasource: RemoteDatasource,
    private readonly localDatasource: LocalDatasource
  ) {}
  async saveSession(
    authDto: AuthDto,
    opts?: RepositoryOptions | undefined
  ): Promise<void> {
    return await this.localDatasource.saveSession(authDto);
  }
  async clearSession(): Promise<void> {
    return await this.localDatasource.clearSession();
  }
  async getSession(opts?: RepositoryOptions | undefined): Promise<AuthDto> {
    return await this.localDatasource.getSession();
  }

  async signin(
    email: string,
    password: string,
    opts?: DatasourceOption | undefined
  ): Promise<AuthDto> {
    return await this.remoteDatasource.signin(email, password);
  }
  async signup(
    signupModel: SignupDto,
    opts?: DatasourceOption | undefined
  ): Promise<AccountDto> {
    return await this.remoteDatasource.signup(signupModel);
  }
}
