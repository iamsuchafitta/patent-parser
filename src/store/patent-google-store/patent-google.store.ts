import { Injectable } from '@nestjs/common';
import { difference, chunk } from 'lodash-es';
import type { PatentGoogleCreateInput, PatentGoogleTempCreateInput, PatentGoogleEntity } from './patent-google.types.js';
import { CHUNK_CLICKHOUSE_LIMIT, CHUNK_PRISMA_LIMIT } from '../../app.constants.js';
import { omitEmptyStructures } from '../../common/utils.js';
import { clickhouseClient } from '../clickhouse-client.js';
import { PrismaService } from '../prisma.service.js';


@Injectable()
export class PatentGoogleStore {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Метод сохранения патента в БД.
   * @param patent Данные патента.
   * @returns void - Ничего не возвращает.
   */
  async patentUpsert(patent: PatentGoogleCreateInput) {
    const temp = await this.prisma.patentGoogleTemp.findUnique({ where: { url: patent.url } });
    const insertData: PatentGoogleCreateInput = omitEmptyStructures({ ...patent, ...temp });
    await clickhouseClient.insert({ table: 'patent_google', values: insertData, format: 'JSON' });
    if (temp) {
      await this.prisma.patentGoogleTemp.delete({ where: { id: temp.id } });
    }
  }

  public async filterNotExisting(urls: string[]): Promise<string[]> {
    const urlsExisting = await Promise.all(chunk(urls, CHUNK_CLICKHOUSE_LIMIT).map(async (urlsChunk) => {
      return clickhouseClient.query({
        // language=ClickHouse
        query: `SELECT url
                FROM patent_google
                WHERE url IN {urls: Array(String)}`,
        query_params: { urls: urlsChunk },
        format: 'JSONEachRow',
      }).then(data => data.json<Pick<PatentGoogleEntity, 'url'>>());
    })).then(results => results.flat().map(({ url }) => url));
    return difference(urls, urlsExisting);
  }

  async patentTempCreateMany(input: PatentGoogleTempCreateInput[]) {
    await this.prisma.$transaction(async tr => await Promise.all(chunk(input, CHUNK_PRISMA_LIMIT).map(async (inputChunk) => {
      await tr.patentGoogleTemp.deleteMany({ where: { id: { in: inputChunk.map(p => p.id) } } });
      await tr.patentGoogleTemp.createMany({ data: inputChunk });
    })));
  }
}
