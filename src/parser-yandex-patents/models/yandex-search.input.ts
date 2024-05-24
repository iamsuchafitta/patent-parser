import { InputType, Field } from '@nestjs/graphql';
import { GraphQLPositiveInt, GraphQLNonNegativeInt } from 'graphql-scalars';
import { YandexSearchTypeEnum, YandexSearchCountryEnum, YandexSearchDateTypeEnum, YandexSearchOrderByEnum } from './yandex-search-enums.js';
import { GQLDateDotted } from '../../common/graphql/GQLDateDotted.js';
import { YandexSearchUrl } from '../../common/models/yandex-search-url.js';
import { nullable } from '../../common/utils.js';

const { default: _DEFAULT } = YandexSearchUrl;

@InputType()
export class YandexSearchSettings {
  @Field(() => GraphQLPositiveInt, {
    description: 'Пагинация при запросе страниц с результатами. Больше: меньше запросов - быстрее, но больше вероятность отказов',
    defaultValue: _DEFAULT.perPage,
  })
  perPage: number = _DEFAULT.perPage;

  @Field(() => GraphQLPositiveInt, { nullable, description: 'Усечь до кол-ва патентов' })
  maxCount?: number;

  @Field(() => GraphQLNonNegativeInt, { description: 'Начиная со страницы', defaultValue: _DEFAULT.pageFrom })
  pageFrom: number = _DEFAULT.pageFrom;

  @Field(() => GraphQLPositiveInt, { nullable, description: 'Заканчивая страницей (включительно)' })
  pageTo?: number;

  @Field(() => GraphQLPositiveInt, { description: 'Кол-во параллельных запросов', defaultValue: _DEFAULT.concurrent })
  concurrent: number = _DEFAULT.concurrent;

  @Field(() => Boolean, { description: 'Игнорировать существующие патенты в БД', defaultValue: _DEFAULT.isIgnoreExisting })
  isIgnoreExisting: boolean = _DEFAULT.isIgnoreExisting;
}

@InputType()
export class YandexSearchInput {
  @Field(() => YandexSearchOrderByEnum, { description: 'Сначала идут', defaultValue: _DEFAULT.orderBy })
  orderBy: YandexSearchOrderByEnum = _DEFAULT.orderBy;

  @Field(() => [YandexSearchTypeEnum], { description: 'Тип', defaultValue: _DEFAULT.types })
  types: YandexSearchTypeEnum[] = _DEFAULT.types;

  @Field(() => [YandexSearchCountryEnum], { description: 'Страна', defaultValue: _DEFAULT.countries })
  countries: YandexSearchCountryEnum[] = _DEFAULT.countries;

  @Field(() => String, { nullable, description: 'Заявка' })
  applicationTitle?: string;

  @Field(() => String, { nullable, description: 'Документ' })
  documentTitle?: string;

  @Field(() => String, { nullable, description: 'Поисковая строка' })
  text?: string;

  @Field(() => String, { nullable, description: 'Название' })
  name?: string;

  @Field(() => String, { nullable, description: 'Авторы' })
  authors?: string;

  @Field(() => String, { nullable, description: 'Патентообладатели' })
  patentOwners?: string;

  @Field(() => YandexSearchDateTypeEnum, { description: 'Тип даты', defaultValue: _DEFAULT.dateIntervalType })
  dateIntervalType: YandexSearchDateTypeEnum = _DEFAULT.dateIntervalType;

  @Field(() => GQLDateDotted, { nullable, description: 'YYYY.MM.DD' })
  dateFrom?: string;

  @Field(() => GQLDateDotted, { nullable, description: 'YYYY.MM.DD' })
  dateTo?: string;

  @Field(() => YandexSearchSettings, { description: 'Настройки парсинга результатов', defaultValue: new YandexSearchSettings() })
  parserSettings: YandexSearchSettings = new YandexSearchSettings();
}
