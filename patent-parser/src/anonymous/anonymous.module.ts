import { Module } from '@nestjs/common';
import { AnonymousService } from './anonymous.service';
import { AnonymousResolver } from './anonymous.resolver';

@Module({
  providers: [AnonymousService, AnonymousResolver],
  exports: [AnonymousService],
})
export class AnonymousModule {}
