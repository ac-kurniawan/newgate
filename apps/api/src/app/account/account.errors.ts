import { ErrorApp } from '@newgate/model';

export const errorAccountNotFound: ErrorApp = {
  code: 'ERROR_ACCOUNT_NOT_FOUND',
  httpCode: 404,
  message: 'account not found',
};

export const errorCreateAccount: ErrorApp = {
  code: 'ERROR_CREATE_ACCOUNT',
  httpCode: 500,
  message: 'failed to create account',
};

export const errorSigning: ErrorApp = {
  code: 'ERROR_SIGNING',
  httpCode: 500,
  message: 'failed to sign in',
};

export const accountErrorList: ErrorApp[] = [errorAccountNotFound, errorCreateAccount, errorSigning];
