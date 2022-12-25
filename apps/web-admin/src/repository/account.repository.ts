import { AccountDto, AuthDto, SignupDto } from '@newgate/dto';
import { DatasourceOption } from '../datasource/datasource.options';

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
}
