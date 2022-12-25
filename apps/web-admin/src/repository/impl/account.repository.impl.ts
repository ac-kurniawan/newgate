import { AuthDto, SignupDto, AccountDto } from '@newgate/dto';
import { DatasourceOption } from '../../datasource/datasource.options';
import { RemoteDatasource } from '../../datasource/remote.datasource';
import { AccountRepository } from '../account.repository';

export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly remoteDatasource: RemoteDatasource) {}

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
