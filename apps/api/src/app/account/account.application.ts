import { Express } from 'express';
import { accountController } from './account.controller';
import { accountService } from './account.service';

export const accountApplication = (app: Express) => {
  accountController(app, accountService());
};
