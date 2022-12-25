export type KongModel = {
  id?: string;
  accountId: string;
  baseUrl: string;
  port: number;
  key?: string;
  name: string;
  alias?: string;
  group?: string;
  tags?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
