import { celebrate, Segments, Joi } from 'celebrate';

export const ProviderAvailability = celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
});
