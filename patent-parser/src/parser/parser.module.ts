import { Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import { AnonymousModule } from '../anonymous/anonymous.module';

@Module({
  imports: [AnonymousModule],
  providers: [ParserService],
})
export class ParserModule {
}
