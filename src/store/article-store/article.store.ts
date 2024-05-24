import { Injectable } from '@nestjs/common';
import { difference, chunk } from 'lodash-es';
import type { ArticleCreateInput, ArticleEntity } from './article.types.js';
import { CHUNK_CLICKHOUSE_LIMIT } from '../../app.constants.js';
import { omitEmptyStructures } from '../../common/utils.js';
import { clickhouseClient } from '../clickhouse-client.js';


@Injectable()
export class ArticleStore {
  public async articleUpsert(data: ArticleCreateInput) {
    await clickhouseClient.insert({ table: 'article', values: omitEmptyStructures(data), format: 'JSON' });
  }

  public async filterNotExisting(urls: string[]): Promise<string[]> {
    const urlsExisting = await Promise.all(chunk(urls, CHUNK_CLICKHOUSE_LIMIT).map(async (urlsChunk) => {
      return clickhouseClient.query({
        // language=ClickHouse
        query: `SELECT url
                FROM article
                WHERE url IN {urls: Array(String)}`,
        query_params: { urls: urlsChunk },
        format: 'JSONEachRow',
      }).then(data => data.json<Pick<ArticleEntity, 'url'>>());
    })).then(results => results.flat().map(({ url }) => url));
    return difference(urls, urlsExisting);
  }
}
