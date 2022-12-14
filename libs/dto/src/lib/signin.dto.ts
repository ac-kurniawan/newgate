import * as Joi from 'joi';

export type SigninDto = {
  email: string;
  password: string;
};

export const signinDtoValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
});
