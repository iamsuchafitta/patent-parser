import { Field, InputType } from '@nestjs/graphql';
import { merge } from 'lodash';

@InputType()
export class PaginationInput {
  @Field({ defaultValue: 0 })
  skip: number;

  @Field({ defaultValue: 10 })
  take: number;
}

export const PaginationInputDefault = merge(new PaginationInput(), { skip: 0, take: 10 });
