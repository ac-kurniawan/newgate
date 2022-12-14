import * as prodEnv from './environment.prod';
import * as nonProdEnv from './environment.prod';

export const config = {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: Number(process.env.SERVER_PORT) || 3000,
  },
  dabatase: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
  },
  credentials: {
    secretToken: process.env.SECRET_TOKEN || 'secret',
  },
  ...(process.env.ENV === 'production'
    ? prodEnv.environment
    : nonProdEnv.environment),
};
