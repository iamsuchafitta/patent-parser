import { registerEnumType } from '@nestjs/graphql';

export enum GoogleSearchTypeEnum {
  Patent = 'PATENT',
  Design = 'DESIGN',
}

registerEnumType(GoogleSearchTypeEnum, {
  name: 'GoogleSearchTypeEnum',
});
