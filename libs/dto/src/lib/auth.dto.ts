import * as Yup from 'yup';

export type AuthDto = {
  accessToken: string;
};

export const authDtoValidator = Yup.object({
  accessToken: Yup.string().required(),
});
