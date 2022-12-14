import * as prodEnv from './environment.prod';
import * as nonProdEnv from './environment.prod';

export const config = {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: Number(process.env.SERVER_PORT) || 3000,
  },
  dabatase: {
    type: process.env.DB_HOST || 'better-sqlite3',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || ':memory:',
    synchronize:
      process.env.DB_SYNCHRONIZE == 'true'
        ? true
        : process.env.DB_SYNCHRONIZE == 'false'
        ? false
        : true,
  },
  credentials: {
    secretToken: process.env.SECRET_TOKEN || 'secret',
  },
  ...(process.env.ENV === 'production'
    ? prodEnv.environment
    : nonProdEnv.environment),
};
