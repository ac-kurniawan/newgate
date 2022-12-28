import { AccountDto, AuthDto, SignupDto } from '@newgate/dto';
import { DatasourceOption } from '../datasource/options.datasource';

export type RepositoryOptions = DatasourceOption & {
  token: string;
};

export interface AccountRepository {
  signin(
    email: string,
    password: string,
    opts?: RepositoryOptions
  ): Promise<AuthDto>;
  signup(signupModel: SignupDto, opts?: RepositoryOptions): Promise<AccountDto>;
  getSession(opts?: RepositoryOptions): Promise<AuthDto>;
  saveSession(authDto: AuthDto, opts?: RepositoryOptions): Promise<void>;
  clearSession(): Promise<void>;
}
