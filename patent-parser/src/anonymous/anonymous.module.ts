import { Module } from '@nestjs/common';
import { AnonymousService } from './anonymous.service';

@Module({
  providers: [AnonymousService],
  exports: [AnonymousService],
})
export class AnonymousModule {}
