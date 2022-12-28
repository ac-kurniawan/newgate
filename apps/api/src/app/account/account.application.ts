import { Express } from 'express';
import { DataSource } from 'typeorm';
import { accountController } from './account.controller';
import { accountService } from './account.service';

export const accountApplication = (app: Express, datasource: DataSource) => {
  accountController(app, accountService(datasource));
};
