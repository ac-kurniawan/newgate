import { ErrorApp } from '@newgate/model';

export const findError = (code: Error, errorList: ErrorApp[]): ErrorApp => {
  const find = errorList.find((x) => x.code === code.message);
  if (!find) {
    return {
      code: 'UNEXPECTED_ERROR',
      httpCode: 500,
      message: 'internal server error',
    };
  }
  return find;
};
