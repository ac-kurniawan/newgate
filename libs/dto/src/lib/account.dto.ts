import Joi = require('joi');
import { AccountModel } from '@newgate/model';

export type AccountDto = {
  id?: string;
  email: string;
  fullName: string;
  type: 'ADMIN' | 'DEVELOPER';
  status: 'ACTIVE' | 'INACTIVE';
  scopes: string;
  createdAt: Date;
  updatedAt?: Date;
};

export const accountDtoValidator = Joi.object({
  id: Joi.string().uuid(),
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  type: Joi.string().allow(['ADMIN', 'DEVELOPER']).required(),
  status: Joi.string().allow(['ACTIVE', 'INACTIVE']),
  scopes: Joi.string(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date(),
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
