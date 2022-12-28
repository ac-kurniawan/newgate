import { ErrorApp, Response } from '@newgate/model';

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

export const handleResponseError = (error: any, errorList: ErrorApp[]) => {
  if (error.name && error.name === 'ValidationError') {
    const errorResponse: Response<ErrorApp> = {
      data: {
        code: 'VALIDATION_ERROR',
        httpCode: 400,
        message: error.message,
        payload: error.errors,
      },
    };
    return errorResponse;
  } else {
    const errorApp = findError(error, errorList);
    const errorResponse: Response<ErrorApp> = {
      data: errorApp,
    };
    return errorResponse;
  }
};
