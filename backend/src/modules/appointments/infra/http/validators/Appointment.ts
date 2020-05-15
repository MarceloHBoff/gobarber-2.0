import { celebrate, Segments, Joi } from 'celebrate';

export const AppointmentPost = celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date().required(),
  },
});
