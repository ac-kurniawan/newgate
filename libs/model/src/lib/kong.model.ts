export type KongKeyAuthModel = {
  loopbackApiUrl: string;
  key: string;
  name: string;
};

export type Kong = {
  id?: string;
  keyauth?: KongKeyAuthModel;
};
