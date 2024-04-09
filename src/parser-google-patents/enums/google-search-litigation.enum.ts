import { registerEnumType } from '@nestjs/graphql';

export enum GoogleSearchLitigationEnum {
  HasRelatedLitigation = 'YES',
  NoKnownLitigation = 'NO',
}

registerEnumType(GoogleSearchLitigationEnum, {
  name: 'GoogleSearchLitigationEnum',
});
