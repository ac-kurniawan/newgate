import * as Yup from 'yup'

export type SignupDto = {
  email: string;
  fullName: string;
  password: string;
};

export const signupDtoValidator = Yup.object({
  email: Yup.string().email().required(),
  fullName: Yup.string().required(),
  password: Yup.string().matches(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
});
