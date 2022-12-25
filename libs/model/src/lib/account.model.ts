export type AccountType = 'ADMIN' | 'DEVELOPER';

export type AccountStatus = 'ACTIVE' | 'INACTIVE';

export type AccountModel = {
  id?: string;
  email: string;
  fullName: string;
  password?: string;
  type: AccountType;
  status: AccountStatus;
  scopes: string;
  createdAt?: Date;
  updatedAt?: Date;
};
