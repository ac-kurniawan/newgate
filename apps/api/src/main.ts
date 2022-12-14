/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata';
import * as express from 'express';
import * as path from 'path';
import { config } from './environments/config';
import bodyParser = require('body-parser');
import { accountApplication } from './app/account/account.application';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.json());

accountApplication(app);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const server = app.listen(config.server.port, config.server.host, () => {
  console.log(
    `Listening at http://${config.server.host}:${config.server.port}/api`
  );
});
server.on('error', console.error);
