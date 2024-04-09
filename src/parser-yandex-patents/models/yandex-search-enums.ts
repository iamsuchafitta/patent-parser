import { registerEnumType } from '@nestjs/graphql';

export enum YandexSearchTypeEnum {
  Application = 'Application',
  Patent = 'Patent',
}

export enum YandexSearchCountryEnum {
  RussianFederation = 'RussianFederation',
  SovietUnion = 'SovietUnion',
}

export enum YandexSearchDateTypeEnum {
  // Дата подача заявки
  ApplicationDate = 'ApplicationDate',
  // Дата публикация документа
  PublicationDate = 'PublicationDate',
  // Дата публикация заявки
  ApplicationPublicationDate = 'ApplicationPublicationDate',
  // Дата начала действия патента
  PatentFilingStartDate = 'PatentFilingStartDate',
}

export enum YandexSearchOrderByEnum {
  /** Самые релевантные */
  Relevant = 'Relevant',
  /** Новые */
  Newest = 'Newest',
  /** Старые */
  Oldest = 'Oldest',
}

registerEnumType(YandexSearchTypeEnum, { name: 'YandexSearchTypeEnum' });
registerEnumType(YandexSearchCountryEnum, { name: 'YandexSearchCountryEnum' });
registerEnumType(YandexSearchDateTypeEnum, { name: 'YandexSearchDateTypeEnum' });
registerEnumType(YandexSearchOrderByEnum, { name: 'YandexSearchOrderByEnum' });
