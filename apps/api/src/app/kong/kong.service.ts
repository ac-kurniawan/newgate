import { KongModel } from '@newgate/model';
import { randomUUID } from 'crypto';
import { kongAdminClient, kongClient } from './kong.client';
import { errorKeyIsMandatory } from './kong.errors';
import { KongRepository } from './kong.repository';

export class KongService {
  constructor(private readonly kongRepository: KongRepository) {}

  async kongAdminProxy(
    accountId: string,
    kongId: string,
    path: string,
    request: unknown
  ): Promise<unknown> {
    const kong = await this.kongRepository.findByIdAndAccountId(
      kongId,
      accountId
    );
    return await kongClient(kong.baseUrl, path, request, kong.key);
  }

  async createKongConnection(kongModel: KongModel): Promise<KongModel> {
    if (!kongModel.key) {
      throw new Error(errorKeyIsMandatory.code);
    }
    const result = await this.kongRepository.create(kongModel);
    return result;
  }

  async quickCreateKongConnection(kongModel: KongModel): Promise<KongModel> {
    const kongAdmin = kongAdminClient(kongModel.baseUrl);
    await kongAdmin.createService({
      name: kongModel.name,
      host: kongModel.baseUrl,
      port: kongModel.port,
    });
    await kongAdmin.createRoute(kongModel.name, {
      paths: [`/${kongModel.name}`],
    });
    await kongAdmin.addKeyauthPlugins(kongModel.name, {
      name: 'key-auth',
    });
    const consumerCreated = await kongAdmin.createConsumer({
      username: kongModel.name,
      custom_id: randomUUID(),
    });
    const pluginsAdded = await kongAdmin.registerPluginToConsumer(
      consumerCreated.id
    );
    kongModel.key = pluginsAdded.key;

    const result = await this.kongRepository.create(kongModel);

    return result;
  }

  async createNewKong(
    kongModel: KongModel,
    isQuickSetup?: boolean
  ): Promise<KongModel> {
    if (isQuickSetup) {
      return await this.quickCreateKongConnection(kongModel);
    } else {
      return await this.createKongConnection(kongModel);
    }
  }
}
