import { RegularExpression } from 'graphql-scalars';


export const GQLDateDotted = new RegularExpression('GQLDateDotted', /^[12]\d{3}\.[01]\d\.[0-3]\d$/, {
  description: 'Date in format "YYYY.MM.DD"',
});
