import * as Yup from 'yup';

export type SigninDto = {
  email: string;
  password: string;
};

export const signinDtoValidator = Yup.object({
  email: Yup.string().email("email format was wrong").required("email is required"),
  password: Yup.string().matches(new RegExp('^[a-zA-Z0-9]{8,30}$'), "password must containing alphanumeric and at lease has 1 uppercase").required(),
});
