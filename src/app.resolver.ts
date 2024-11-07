import os from 'node:os';
import { Query, Resolver } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { clickhouseClient } from './store/clickhouse-client.js';
import { PrismaService } from './store/prisma.service.js';

@Resolver()
export class AppResolver {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Health check query.
   */
  @Query(() => GraphQLJSON)
  async healthz(): Promise<unknown> {
    const res: Record<string, unknown> = { aliveOn: os.hostname() };

    [res.postgres, res.clickhouse] = await Promise.all([

      this.prisma.$queryRaw<[{ check: unknown }]>`SELECT 1 + 1 = 2 "check"`
        .then((rows) => rows[0].check === true ? 'ready' : 'ERROR')
        .catch(() => 'ERROR'),

      clickhouseClient.query({
        query: 'SELECT (1 + 1 = 2)::Boolean "check"',
        format: 'JSONEachRow',
      }).then((data) => data.json<{ check: unknown }>())
        .then((rows) => rows[0].check === true ? 'ready' : 'ERROR')
        .catch(() => 'ERROR'),

    ]);

    return res;
  }

  // @Query(() => GraphQLJSON)
  // async export() {
  //   const data = await clickhouseClient.query({
  //     // language=ClickHouse
  //     query: 'SELECT * FROM patent_google',
  //     format: 'JSONEachRow',
  //   }).then(data => data.json<PatentGoogleEntity>());
  //   await fs.mkdir('dev-utils/temp/results/jsons', { recursive: true });
  //   await Promise.all(data.map(async (row) => {
  //     await fs.writeFile(`dev-utils/temp/results/jsons/${row.id}.json`, JSON.stringify(omitEmptyStructures(row)));
  //   }));
  //   return data.length;
  // }
}
