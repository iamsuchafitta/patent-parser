import { Module } from '@nestjs/common';
import { PatentModule } from './patent/patent.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [PatentModule, QueueModule]
})
export class ApiModule {}
