import { KongModel } from '@newgate/model';
import { DataSource, Repository } from 'typeorm';
import { KongEntity, kongEntityCoverter } from '../kong.entity';
import { KongRepository } from '../kong.repository';

export class KongRepositorySQLImpl implements KongRepository {
  private repo: Repository<KongEntity>;
  constructor(private readonly datasource: DataSource) {
    this.repo = this.datasource.getRepository(KongEntity);
  }
  async findByAccountId(accountId: string): Promise<KongModel[]> {
    const results = await this.repo.findBy({ accountId });
    return results.map((result) => kongEntityCoverter.toModel(result));
  }
  async findByIdAndAccountId(
    id: string,
    accountId: string
  ): Promise<KongModel> {
    const result = await this.repo.findOneByOrFail({ id, accountId });
    return kongEntityCoverter.toModel(result);
  }
  async create(kong: KongModel): Promise<KongModel> {
    const result = await this.repo.save(kongEntityCoverter.fromModel(kong));
    return kongEntityCoverter.toModel(result);
  }
}
