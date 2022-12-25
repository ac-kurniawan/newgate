import { KongModel } from '@newgate/model';

export interface KongRepository {
  findByAccountId(accountId: string): Promise<KongModel[]>;
  findByIdAndAccountId(id: string, accountId: string): Promise<KongModel>;
  create(kong: KongModel): Promise<KongModel>;
}
