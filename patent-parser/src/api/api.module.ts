import { Module } from '@nestjs/common';
import { PatentModule } from './patent/patent.module';
import { QueueModule } from './queue/queue.module';
import { ParserModule } from '../parser/parser.module';
import { AnonymousModule } from '../anonymous/anonymous.module';
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    PatentModule,
    QueueModule,
    ParserModule,
    AnonymousModule,
    MonitorModule,
  ],
})
export class ApiModule {}
