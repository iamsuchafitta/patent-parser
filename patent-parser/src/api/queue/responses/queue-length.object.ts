import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QueueLengthObject {
  /**
   * Сколько всего элементов в очереди
   */
  @Field()
  total: number;
  /**
   * Сколько из них сейчас обрабатываются
   */
  @Field()
  processing: number;
}