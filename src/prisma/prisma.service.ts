import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  constructor() {
    super({
      //     log: [
      //       { level: 'query', emit: 'stdout' },
      //       { level: 'error', emit: 'stdout' },
      //       { level: 'info', emit: 'stdout' },
      //       { level: 'warn', emit: 'stdout' },
      //     ],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
