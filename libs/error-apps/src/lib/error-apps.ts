import { ErrorApp } from '@newgate/model';

export const findError = (code: Error, errorList: ErrorApp[]) => {
  return errorList.find((x) => x.code === code.message);
};
