import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorResolver } from './monitor.resolver';
import { ParserModule } from '../../parser/parser.module';
import { AnonymousModule } from '../../anonymous/anonymous.module';

@Module({
  providers: [
    MonitorService,
    MonitorResolver,
  ],
  imports: [
    ParserModule,
    AnonymousModule,
  ],
})
export class MonitorModule {}
