import { AuthDto, SignupDto, AccountDto } from '@newgate/dto';
import { ErrorApp, Response } from '@newgate/model';
import { RemoteDatasource } from '../remote.datasource';

export class RemoteDatasourceImpl implements RemoteDatasource {
  async client(
    path: string,
    method: string,
    body?: any,
    headers?: HeadersInit
  ) {
    const result = await fetch(`/api${path}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        ...headers,
        'Content-type': 'application/json',
      },
    });
    if (result.status > 299) {
      const res: Response<ErrorApp> = await result.json();
      throw Error(res.data.message);
    }
    const res: Response<any> = await result.json();
    return res.data;
  }
  async protectedClient(
    path: string,
    method: string,
    token: string,
    body?: any
  ) {
    return this.client(path, method, body, {
      Authorization: `Bearer ${token}`,
    });
  }

  async signin(email: string, password: string): Promise<AuthDto> {
    return await this.client('/signin', 'post', { email, password });
  }
  async signup(accountModel: SignupDto): Promise<AccountDto> {
    return await this.client('/signup', 'post', { ...accountModel });
  }
}
