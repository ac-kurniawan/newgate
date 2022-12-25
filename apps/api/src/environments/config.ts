import * as prodEnv from './environment.prod';
import * as nonProdEnv from './environment.prod';

export const config = {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: Number(process.env.SERVER_PORT) || 3000,
  },
  database: {
    type: process.env.DB_DIALECT || 'better-sqlite3',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || ':memory:'
  },
  credentials: {
    secretToken: process.env.SECRET_TOKEN || 'secret',
  },
  ...(process.env.ENV === 'production'
    ? prodEnv.environment
    : nonProdEnv.environment),
};
