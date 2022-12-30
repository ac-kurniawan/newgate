import * as Yup from 'yup';

export type CreateKongDto = {
  accountId: string;
  baseUrl: string;
  port: number;
  key: string;
  name: string;
  alias?: string;
  group?: string;
  tags?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export const createKongDtoValdiator = Yup.object({
  accountId: Yup.string().uuid().required(),
  baseUrl: Yup.string().required(),
  port: Yup.number().required(),
  key: Yup.string().required(),
  name: Yup.string().required(),
  alias: Yup.string(),
  group: Yup.string(),
  tags: Yup.string(),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
});

export type QuickCreateKongDto = {
  accountId: string;
  baseUrl: string;
  port: number;
  name: string;
  alias?: string;
  group?: string;
  tags?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export const quickCreateKongDtoValdiator = Yup.object({
  accountId: Yup.string().uuid().required(),
  baseUrl: Yup.string().required(),
  port: Yup.number().required(),
  name: Yup.string().required(),
  alias: Yup.string(),
  group: Yup.string(),
  tags: Yup.string(),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
});

export type CreateKongQueryParams = {
  isQuickSetup?: boolean;
};
export const createKongQueryParamsValidator = Yup.object({
  isQuickSetup: Yup.boolean().default(false),
});
