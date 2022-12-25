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
  const getError = (error: any) => {
    if (error.name && error.name === 'ValidationError') {
      const errorResponse: Response<ErrorApp> = {
        data: {
          code: "VALIDATION_ERROR",
          httpCode: 400,
          message: error.message,
          payload: error.errors
        },
      };
      return errorResponse
    } else {
      const errorApp = findError(error, accountErrorList);
      const errorResponse: Response<ErrorApp> = {
        data: errorApp,
      };
      return errorResponse
    }
  }
  app.post('/api/signup', async (req, res) => {
    try {
      const request = await signupDtoValidator.validate(req.body);
      const result = await accountService.signup({
        ...request,
        scopes: "",
        status: undefined,
        type: undefined
      });
      const response: Response<AccountDto> = {
        data: accountModelToAccountDto(result),
      };
      res.send(response);
    } catch (error) {
      const err = getError(error)
      res.status(err.data.httpCode).send(err);
    }
  });
  app.post('/api/signin', async (req, res) => {
    try {
      const request = await signinDtoValidator.validate(req.body);
      const result = await accountService.signing(
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
      const err = getError(error)
      res.status(err.data.httpCode).send(err);
    }
  });
};
