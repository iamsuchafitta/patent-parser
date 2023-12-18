import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Client } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public readonly pg: Client;

  constructor() {
    super({
  //     log: [
  //       { level: 'query', emit: 'stdout' },
  //       { level: 'error', emit: 'stdout' },
  //       { level: 'info', emit: 'stdout' },
  //       { level: 'warn', emit: 'stdout' },
  //     ],
    });
    this.pg = new Client({ connectionString: process.env.DATABASE_URL });
  }

  async onModuleInit() {
    await Promise.all([
      this.$connect(),
      this.pg.connect(),
    ])
  }

  async onModuleDestroy() {
    await Promise.all([
      this.$disconnect(),
      this.pg.end(),
    ])
  }
}
