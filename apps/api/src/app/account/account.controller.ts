import { Express } from 'express';
import { AccountService } from './account.service';
import {
  AccountDto,
  accountModelToAccountDto,
  AuthDto,
  signinDtoValidator,
  signupDtoValidator,
} from '@newgate/dto';
import { ErrorApp, Response } from '@newgate/model';
import { findError } from '@newgate/error-apps';
import { accountErrorList } from './account.errors';

export const accountController = (
  app: Express,
  accountService: AccountService
) => {
  app.post('/api/signup', async (req, res) => {
    try {
      const request = await signupDtoValidator.validateAsync(req.body);
      const result = await accountService.signup(request);
      const response: Response<AccountDto> = {
        data: accountModelToAccountDto(result),
      };
      res.send(response);
    } catch (error) {
      const errorApp = findError(error, accountErrorList);
      const errorResponse: Response<ErrorApp> = {
        data: errorApp,
      };
      res.status(200).status(errorApp.httpCode).send(errorResponse);
    }
  });
  app.post('/api/signin', async (req, res) => {
    try {
      const request = await signinDtoValidator.validateAsync(req.body);
      const result = await accountService.signin(
        request.email,
        request.password
      );
      const response: Response<AuthDto> = {
        data: {
          accessToken: result,
        },
      };
      res.status(200).send(response);
    } catch (error) {
      const errorApp = findError(error, accountErrorList);
      const errorResponse: Response<ErrorApp> = {
        data: errorApp,
      };
      res.status(200).status(errorApp.httpCode).send(errorResponse);
    }
  });
};
