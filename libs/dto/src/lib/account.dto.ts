import * as Yup from 'yup';
import { AccountModel } from '@newgate/model';

export type AccountDto = {
  id?: string;
  email: string;
  fullName: string;
  type: 'ADMIN' | 'DEVELOPER';
  status: 'ACTIVE' | 'INACTIVE';
  scopes: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const accountDtoValidator = Yup.object({
  id: Yup.string().uuid(),
  email: Yup.string().email("email format was wrong").required("email is required"),
  fullName: Yup.string().required(),
  type: Yup.string().oneOf(['ADMIN', 'DEVELOPER'], "type value is either ADMIN, DEVELOPER").required("type is required"),
  status: Yup.string().oneOf(['ACTIVE', 'INACTIVE'], "status value is either ACTIVE, INACTIVE"),
  scopes: Yup.string(),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
});

export const accountModelToAccountDto = (data: AccountModel): AccountDto => {
  return {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    type: data.type,
    status: data.status,
    scopes: data.scopes,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
