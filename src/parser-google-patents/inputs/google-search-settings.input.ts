import { InputType, Field } from '@nestjs/graphql';
import { GraphQLPositiveInt } from 'graphql-scalars';
import { GoogleSearchUrl } from '../../common/models/google-search-url.js';
import { nullable } from '../../common/utils.js';

const { default: _DEFAULT } = GoogleSearchUrl;

@InputType()
export class GoogleSearchSettingsInput {
  @Field(() => GraphQLPositiveInt, {
    nullable,
    defaultValue: _DEFAULT.splitDateIntervalByDays,
    description: 'Результат поиска делится на временные маленькие интервалы, так как Google урезает результаты на больших интервалах',
  })
  splitDateIntervalByDays: number | null = _DEFAULT.splitDateIntervalByDays;
}
