import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AccountEntity } from '../account.entity';
import { AccountRepositorySQLImpl } from '../impl/account.repository.sql.impl';
import { AccountService } from '../account.service';
import { AccountUtils } from '../account.utils';
import { AccountModel } from '@newgate/model';
import { errorAccountNotFound, errorCreateAccount } from '../account.errors';

describe('ACCOUNT APPLICATION', () => {
  let datasource: DataSource;

  let accountRepository: AccountRepositorySQLImpl;
  const accountUtils = new AccountUtils();
  let accountService: AccountService;

  beforeAll(async () => {
    datasource = new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      entities: [AccountEntity],
      synchronize: true,
      logging: false,
    });
    await datasource
      .initialize()
      .catch((e) => console.error('Error initialize', e));
    accountRepository = new AccountRepositorySQLImpl(datasource);

    accountService = new AccountService(accountRepository, accountUtils);
  });
  afterAll(async () => {
    await datasource.getRepository(AccountEntity).clear();
    await datasource.destroy();
  });

  describe('# create account', () => {
    afterEach(() => {
      datasource.getRepository(AccountEntity).clear();
    });
    it('should create new account with custom password', async () => {
      const mockAccount: AccountModel = {
        fullName: 'test 1',
        email: 'test1@test.id',
        type: 'ADMIN',
        status: 'ACTIVE',
        scopes: 'test',
        createdAt: undefined,
        updatedAt: undefined,
      };

      const result = await accountService.createAccount(mockAccount);

      expect(result.id).toBeDefined();
      expect(result.password).toBe(accountUtils.crypto.encrypt('changeme'));
      expect(result.createdAt).toBeDefined();
    });

    it('should create new account with default password', async () => {
      const mockAccount: AccountModel = {
        fullName: 'test 1',
        email: 'test1@test.id',
        password: 'rahasia',
        type: 'ADMIN',
        status: 'ACTIVE',
        scopes: 'test',
        createdAt: undefined,
        updatedAt: undefined,
      };

      const result = await accountService.createAccount(mockAccount);

      expect(result.id).toBeDefined();
      expect(result.password).toBe(accountUtils.crypto.encrypt('rahasia'));
      expect(result.createdAt).toBeDefined();
    });

    it('should throw error when create non unique email account', async () => {
      const mockAccount: AccountModel = {
        fullName: 'test 1',
        email: 'test1@test.id',
        password: 'rahasia',
        type: 'ADMIN',
        status: 'ACTIVE',
        scopes: 'test',
        createdAt: undefined,
        updatedAt: undefined,
      };

      await accountService.createAccount(mockAccount);

      try {
        await accountService.createAccount(mockAccount);
      } catch (e: unknown) {
        expect((e as Error).message).toBe(errorCreateAccount.code);
      }
    });
  });

  describe('# preSignin', () => {
    afterEach(() => {
      datasource.getRepository(AccountEntity).clear();
    });

    it('should success to preSignin use default password', async () => {
      const mockAccount: AccountModel = {
        fullName: 'test 1',
        email: 'test1@test.id',
        type: 'ADMIN',
        status: 'ACTIVE',
        scopes: 'test',
        createdAt: undefined,
        updatedAt: undefined,
      };
      await accountService.createAccount(mockAccount);
      const result = await accountService.preSigning(
        'test1@test.id',
        'changeme'
      );

      expect(result.id).toBeDefined();
      expect(result.email).toBe(mockAccount.email);
      expect(result.password).toBe(accountUtils.crypto.encrypt('changeme'));
      expect(result.createdAt).toBeDefined();
    });

    it('should success to preSignin use custom password', async () => {
      const mockAccount: AccountModel = {
        fullName: 'test 1',
        email: 'test1@test.id',
        type: 'ADMIN',
        password: 'rahasia',
        status: 'ACTIVE',
        scopes: 'test',
        createdAt: undefined,
        updatedAt: undefined,
      };
      await accountService.createAccount(mockAccount);
      const result = await accountService.preSigning('test1@test.id', 'rahasia');

      expect(result.id).toBeDefined();
      expect(result.email).toBe(mockAccount.email);
      expect(result.password).toBe(accountUtils.crypto.encrypt('rahasia'));
      expect(result.createdAt).toBeDefined();
    });

    it('should failed to preSignin', async () => {
      const mockAccount: AccountModel = {
        fullName: 'test 1',
        email: 'test1@test.id',
        type: 'ADMIN',
        password: 'rahasia',
        status: 'ACTIVE',
        scopes: 'test',
        createdAt: undefined,
        updatedAt: undefined,
      };
      await accountService.createAccount(mockAccount);

      try {
        await accountService.preSigning('test1@test.id', 'changeme');
      } catch (e: unknown) {
        expect((e as Error).message).toBe(errorAccountNotFound.code);
      }
    });
  });

  describe('# signin', () => {
    afterEach(() => {
      datasource.getRepository(AccountEntity).clear();
    });

    it('should return valid jwt', async () => {
      const mockAccount: AccountModel = {
        fullName: 'test 1',
        email: 'test1@test.id',
        type: 'ADMIN',
        status: 'ACTIVE',
        scopes: 'test',
        createdAt: undefined,
        updatedAt: undefined,
      };
      await accountService.createAccount(mockAccount);
      const result = await accountService.signing('test1@test.id', 'changeme');

      expect(accountUtils.verifyJwt(result)).toBeTruthy();
    });
  });
});
