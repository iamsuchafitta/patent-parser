import { Injectable } from '@nestjs/common';
import { difference, chunk } from 'lodash-es';
import type { PatentYandexEntity } from './patent-yandex.types.js';
import { clickhouseClient } from '../clickhouse-client.js';
import { omitEmptyStructures } from '../../common/utils.js';
import { CHUNK_CLICKHOUSE_LIMIT } from '../../app.constants.js';

@Injectable()
export class PatentYandexStore {
  /**
   * Метод сохранения патента в БД.
   * @param patent Данные патента.
   * @returns void - Ничего не возвращает.
   */
  async patentUpsert(patent: PatentYandexEntity) {
    await clickhouseClient.insert({ table: 'patent_yandex', values: omitEmptyStructures(patent), format: 'JSON' });
  }

  public async filterNotExisting(urls: string[]): Promise<string[]> {
    const urlsExisting = await Promise.all(chunk(urls, CHUNK_CLICKHOUSE_LIMIT).map(async (urlsChunk) => {
      return clickhouseClient.query({
        // language=ClickHouse
        query: `SELECT url
                FROM patent_yandex
                WHERE url IN {urls: Array(String)}`,
        query_params: { urls: urlsChunk },
        format: 'JSONEachRow',
      }).then(data => data.json<Pick<PatentYandexEntity, 'url'>>());
    })).then(results => results.flat().map(({ url }) => url));
    return difference(urls, urlsExisting);
  }
}
