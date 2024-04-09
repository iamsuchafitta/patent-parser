import { InputType, Field } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { GoogleSearchUrl } from '../../common/models/google-search-url.js';
import { nullable } from '../../common/utils.js';
import { GoogleSearchCountryEnum } from '../enums/google-search-coontry.enum.js';
import { GoogleSearchDateIntervalType } from '../enums/google-search-date-interval-type.enum.js';
import { GoogleSearchLanguageEnum } from '../enums/google-search-language.enum.js';
import { GoogleSearchLitigationEnum } from '../enums/google-search-litigation.enum.js';
import { GoogleSearchStatusEnum } from '../enums/google-search-status.enum.js';
import { GoogleSearchTypeEnum } from '../enums/google-search-type.enum.js';

const { default: _DEFAULT } = GoogleSearchUrl;

@InputType()
export class GoogleSearchInput {
  @Field(() => [String], { nullable })
  searchTerms?: string[];

  @Field(() => GoogleSearchDateIntervalType, { defaultValue: _DEFAULT.dateIntervalType })
  dateIntervalType: GoogleSearchDateIntervalType = _DEFAULT.dateIntervalType;

  @Field(() => GraphQLDate, { description: 'Дата с' })
  dateFrom: Date;

  @Field(() => GraphQLDate, { description: 'Дата до (включительно)' })
  dateTo: Date;

  @Field(() => [String], { nullable })
  inventors?: string[];

  @Field(() => [String], { nullable })
  assignee?: string[];

  @Field(() => [GoogleSearchCountryEnum], { nullable })
  countries?: GoogleSearchCountryEnum[];

  @Field(() => [GoogleSearchLanguageEnum], { nullable, defaultValue: _DEFAULT.languages })
  languages?: GoogleSearchLanguageEnum[] = _DEFAULT.languages;

  @Field(() => GoogleSearchStatusEnum, { nullable, defaultValue: _DEFAULT.status })
  status?: GoogleSearchStatusEnum = _DEFAULT.status;

  @Field(() => GoogleSearchTypeEnum, { nullable, defaultValue: _DEFAULT.type })
  type?: GoogleSearchTypeEnum = _DEFAULT.type;

  @Field(() => GoogleSearchLitigationEnum, { nullable })
  litigation?: GoogleSearchLitigationEnum;
}
