import { registerEnumType } from '@nestjs/graphql';

export enum GoogleSearchStatusEnum {
  Grant = 'GRANT',
  Application = 'APPLICATION',
}

registerEnumType(GoogleSearchStatusEnum, {
  name: 'GoogleSearchStatusEnum',
});
