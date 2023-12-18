import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field({ defaultValue: 0, nullable: true })
  skip: number;

  @Field({ defaultValue: 25, nullable: true })
  take: number;
}
