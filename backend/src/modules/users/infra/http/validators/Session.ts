import { celebrate, Segments, Joi } from 'celebrate';

export const SessionPost = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    passworf: Joi.string().required(),
  },
});
