import { AuthDto, SignupDto, AccountDto } from '@newgate/dto';

export interface RemoteDatasource {
  signin(email: string, password: string): Promise<AuthDto>;
  signup(accountModel: SignupDto): Promise<AccountDto>;
}
