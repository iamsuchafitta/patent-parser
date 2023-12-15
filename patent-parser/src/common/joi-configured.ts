/* eslint-disable no-underscore-dangle */
import Joi from 'joi';
import ms from 'ms';

/**
 * Configured instance of Joi.
 */
export const joi: Joi.Root = Joi.defaults((schema) => schema.options({
  stripUnknown: true,
  allowUnknown: false,
  convert: true,
  abortEarly: false,
  presence: 'required',
}));

/**
 * Validator for https://www.npmjs.com/package/ms
 */
export const vercelMsValidator: Joi.CustomValidator = (value: string, helpers) => {
  if (helpers.schema._flags.presence === 'optional' && value === undefined) {
    return value;
  }
  const convertResult = ms(value) as number | string | undefined;
  if (typeof convertResult !== 'number' || Number.isNaN(convertResult)) {
    throw Error('value must be a string in vercel/ms format');
  }
  return value;
};
