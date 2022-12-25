import { Express } from 'express';
import { accountController } from './account.controller';
import { accountService } from './account.service';

export const accountApplication = async (app: Express) => {
  accountController(app, await accountService());
};
