import { ErrorApp } from '@newgate/model';

export const errorKeyIsMandatory: ErrorApp = {
  code: 'VALIDATION_ERROR',
  httpCode: 401,
  message: 'key is manadatory for this method',
};

export const kongErrorList: ErrorApp[] = [errorKeyIsMandatory];
