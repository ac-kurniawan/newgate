import { AccountModel } from '@newgate/model';

export const AccountMock: AccountModel = {
  id: 'fake-id',
  password: 'secret',
  email: 'test@test.test',
  fullName: 'test 1',
  type: 'ADMIN',
  status: 'ACTIVE',
  scopes: [],
};
