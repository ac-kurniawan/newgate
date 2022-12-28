import { AuthDto } from '@newgate/dto';

export interface LocalDatasource {
  getSession(): Promise<AuthDto>;
  saveSession(authDto: AuthDto): Promise<void>;
  clearSession(): Promise<void>;
}
