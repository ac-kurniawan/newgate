import { AuthDto } from '@newgate/dto';
import { LocalDatasourceConstant } from '../constant.datasource';
import { LocalDatasource } from '../local.datasouce';

export class LocalDatasourceImpl implements LocalDatasource {
  getSession(): Promise<AuthDto> {
    const result = localStorage.getItem(LocalDatasourceConstant.sessionKey);
    if (result === null) {
      throw Error('no session found');
    }
    return JSON.parse(result);
  }
  async saveSession(authDto: AuthDto): Promise<void> {
    localStorage.setItem(
      LocalDatasourceConstant.sessionKey,
      JSON.stringify(authDto)
    );
  }
  async clearSession(): Promise<void> {
    localStorage.removeItem(LocalDatasourceConstant.sessionKey);
  }
}
