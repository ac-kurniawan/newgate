import { KongModel } from '@newgate/model';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { KongRepositorySQLImpl } from '../impl/kong.repository.sql.impl';
import { KongEntity } from '../kong.entity';
import { errorKeyIsMandatory } from '../kong.errors';
import { KongService } from '../kong.service';

describe('KONG APPLICATION', () => {
  let datasource: DataSource;
  let kongRepository: KongRepositorySQLImpl;
  let kongService: KongService;
  const mockUUID = '94550c32-075b-4e2b-806c-1c5c75fd52a7';
  beforeAll(async () => {
    datasource = new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      entities: [KongEntity],
      synchronize: true,
      logging: false,
    });
    await datasource
      .initialize()
      .catch((e) => console.error('Error initialize', e));
    kongRepository = new KongRepositorySQLImpl(datasource);

    kongService = new KongService(kongRepository);
  });
  afterAll(async () => {
    await datasource.getRepository(KongEntity).clear();
    await datasource.destroy();
  });
  describe('# create kong connection', () => {
    afterEach(async () => {
      await datasource.getRepository(KongEntity).clear();
    });

    it('should throw error when key is undefined', async () => {
      const mockKong: KongModel = {
        accountId: mockUUID,
        baseUrl: 'http://localhost',
        port: 1234,
        name: 'test-kong',
        alias: 'aliastest',
        group: 'grouptest',
        tags: 'tagstest',
      };
      try {
        await kongService.createNewKong(mockKong, false);
      } catch (e: unknown) {
        expect((e as Error).message).toBe(errorKeyIsMandatory.code);
      }
    });
    it('should create new kong record', async () => {
      const mockKong: KongModel = {
        accountId: mockUUID,
        baseUrl: 'http://localhost',
        port: 1234,
        name: 'test-kong',
        key: 'test123',
        alias: 'aliastest',
        group: 'grouptest',
        tags: 'tagstest',
      };

      const result = await kongService.createNewKong(mockKong, false);

      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
    });
  });
});
