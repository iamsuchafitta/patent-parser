import { Module } from '@nestjs/common';
import { PatentResolver } from './patent.resolver';
import { AnonymousModule } from '../../anonymous/anonymous.module';

@Module({
  providers: [PatentResolver],
  imports: [AnonymousModule],
})
export class PatentModule {}
