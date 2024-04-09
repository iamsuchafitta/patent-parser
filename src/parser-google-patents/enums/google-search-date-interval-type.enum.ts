import { registerEnumType } from '@nestjs/graphql';

export enum GoogleSearchDateIntervalType {
  Priority = 'priority',
  Filing = 'filing',
  Publication = 'publication',
}

registerEnumType(GoogleSearchDateIntervalType, {
  name: 'GoogleSearchDateIntervalType',
});
