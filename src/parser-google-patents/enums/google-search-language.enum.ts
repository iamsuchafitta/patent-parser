import { registerEnumType } from '@nestjs/graphql';

export enum GoogleSearchLanguageEnum {
  English = 'ENGLISH',
  German = 'GERMAN',
  Chinese = 'CHINESE',
  French = 'FRENCH',
  Spanish = 'SPANISH',
  Arabic = 'ARABIC',
  Japanese = 'JAPANESE',
  Korean = 'KOREAN',
  Portuguese = 'PORTUGUESE',
  Russian = 'RUSSIAN',
  Italian = 'ITALIAN',
  Dutch = 'DUTCH',
  Swedish = 'SWEDISH',
  Finnish = 'FINNISH',
  Norwegian = 'NORWEGIAN',
  Danish = 'DANISH',
}

registerEnumType(GoogleSearchLanguageEnum, {
  name: 'GoogleSearchLanguageEnum',
})
