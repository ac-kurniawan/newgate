import { DataSource } from 'typeorm';
import { config } from '../../environments/config';

const supportedDatabase = ['sqlite3', 'postgres', 'mysql', 'mariadb'];

const findDatabaseType = (type: string): DataSource => {
  switch (type) {
    case supportedDatabase[0]:
      return new DataSource({
        ...config.dabatase,
        type: 'better-sqlite3',
        logging: false,
      });
    case supportedDatabase[1]:
      return new DataSource({
        ...config.dabatase,
        type: 'postgres',
        logging: false,
      });
    case supportedDatabase[2]:
      return new DataSource({
        ...config.dabatase,
        type: 'mysql',
        logging: false,
      });
    case supportedDatabase[3]:
      return new DataSource({
        ...config.dabatase,
        type: 'mariadb',
        logging: false,
      });
    default:
      throw new Error('database is not supported');
  }
};

export const accountDatasource: DataSource = findDatabaseType(
  config.dabatase.type
);
