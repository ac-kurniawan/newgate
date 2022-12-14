import Joi = require('joi');

export type AuthDto = {
  accessToken: string;
};

export const authDtoValidator = Joi.object({
  accessToken: Joi.string().required(),
});
