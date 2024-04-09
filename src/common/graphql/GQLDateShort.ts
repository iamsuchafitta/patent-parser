import { RegularExpression } from 'graphql-scalars';

export const GQLDateShort = new RegularExpression('GQLDateShort', /^[12]\d{3}[01]\d[0-3]\d$/, {
  description: 'Date in format "YYYYMMDD"',
});
