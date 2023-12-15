import { Module } from '@nestjs/common';
import { QueueResolver } from './queue.resolver';

@Module({
  providers: [QueueResolver]
})
export class QueueModule {}
