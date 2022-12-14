import { ErrorApp } from '@newgate/model';
import { findError } from './error-apps';

describe('findError', () => {
  it('should found the error', () => {
    const errorList: ErrorApp[] = [
      {
        code: 'ERROR_CODE',
        httpCode: 500,
        message: 'error',
      },
    ];
    const result = findError(new Error('ERROR_CODE'), errorList);

    expect(result).toBe(errorList[0]);
  });

  it('should not found', () => {
    const errorList: ErrorApp[] = [
      {
        code: 'ERROR_CODE',
        httpCode: 500,
        message: 'error',
      },
    ];
    const result = findError(new Error('error'), errorList);

    expect(result).toBeUndefined();
  });
});
