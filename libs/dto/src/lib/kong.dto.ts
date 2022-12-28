import * as Yup from 'yup';

export type KongDto = {
  id?: string;
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

export const kongDtoValdiator = Yup.object({
  id: Yup.string().uuid(),
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
