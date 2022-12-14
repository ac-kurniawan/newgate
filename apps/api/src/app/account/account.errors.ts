import { ErrorApp } from '@newgate/model';

export const errorAccountNotFound: ErrorApp = {
  code: 'ERROR_ACCOUNT_NOT_FOUND',
  httpCode: 404,
  message: 'account not found',
};

export const accountErrorList: ErrorApp[] = [errorAccountNotFound];
