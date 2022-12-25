import { DataSource } from 'typeorm';
import { config } from '../../environments/config';
import { AccountEntity } from './account.entity';

const supportedDatabase = ['sqlite3', 'postgres', 'mysql', 'mariadb'];

export const findDatabaseType = (type: string): DataSource => {
  const entities = [AccountEntity];
  const opt = {
    ...config.database,
    entities,
    logging: true,
  };
  switch (type) {
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
