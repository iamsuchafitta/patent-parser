import { Module } from '@nestjs/common';
import { PatentModule } from './patent/patent.module';
import { ParserModule } from '../parser/parser.module';
import { AnonymousModule } from '../anonymous/anonymous.module';

@Module({
  imports: [
    PatentModule,
    ParserModule,
    AnonymousModule,
  ],
})
export class ApiModule {}
