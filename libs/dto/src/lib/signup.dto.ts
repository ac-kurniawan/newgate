import Joi = require('joi');

export type SignupDto = {
  email: string;
  fullName: string;
  password: string;
};

export const signupDtoValidator = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
});
