import os from 'node:os';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from './store/prisma.service.js';

@Resolver()
export class AppResolver {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Health check query.
   */
  @Query(() => String)
  async healthz(
    @Args('db', { type: () => Boolean, nullable: true }) dbCheck: boolean,
  ): Promise<string> {
    let message = `alive on ${os.hostname()}`;
    if (dbCheck) {
      const isOk = await this.prisma.$queryRaw<[{ check: boolean }]>`SELECT 1 + 1 = 2 "check"`.then((rows) => rows[0].check);
      message += `, db=${isOk}`;
    }
    return message;
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
