import 'reflect-metadata';
import { config } from './environments/config';
import { DataSource } from 'typeorm';
import { CreateAccountTable1671625149385 } from './migrations/1671625149385-CreateAccountTable';
import { AccountEntity } from './app/account/account.entity';
import { KongEntity } from './app/kong/kong.entity';

const supportedDatabase = ['sqlite3', 'postgres', 'mysql', 'mariadb'];

const findDatabaseType = (): DataSource => {
  // Put entities here
  const entities = [AccountEntity, KongEntity];

  // register migration script here
  const migrations = [CreateAccountTable1671625149385];

  const opt = {
    ...config.database,
    entities,
    migrations,
    logging: true,
  };

  switch (config.database.type) {
    case supportedDatabase[0]:
      return new DataSource({
        ...opt,
        type: 'better-sqlite3',
      });
    case supportedDatabase[1]:
      return new DataSource({
        ...opt,
        type: 'postgres',
      });
    case supportedDatabase[2]:
      return new DataSource({
        ...opt,
        type: 'mysql',
      });
    case supportedDatabase[3]:
      return new DataSource({
        ...opt,
        type: 'mariadb',
      });
    default:
      throw new Error('database is not supported');
  }
};

const AppDataSource = findDatabaseType();
export default AppDataSource;
