import util from 'node:util';
import { Logger } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { ceil, range, flow } from 'lodash-es';
import ms from 'ms';
import pMap from 'p-map';
import pRetry from 'p-retry';
import { YandexSearchInput } from './models/yandex-search.input.js';
import { AnonymousService } from '../anonymous/anonymous.service.js';
import { YandexSearchPageParser } from '../common/models/yandex-search-page-parser.js';
import { YandexSearchUrl } from '../common/models/yandex-search-url.js';
import { pShouldRetry } from '../common/p-should-retry.js';
import { QueueStore } from '../store/queue-store/queue.store.js';
import { QueueElementTypeEnum } from '../store/queue-store/queue.types.js';

@Resolver()
export class ParserYandexPatentsResolver {
  private readonly logger = new Logger(ParserYandexPatentsResolver.name);

  constructor(
    private readonly queueStore: QueueStore,
    private readonly anonymous: AnonymousService,
  ) {}

  @Mutation(() => GraphQLJSON)
  async enqueueYandexPatents(@Args('input', { defaultValue: new YandexSearchInput() }) input: YandexSearchInput) {
    this.logger.log(`enqueueYandexPatents(${util.inspect(input, { depth: null })})`);
    const url = new YandexSearchUrl(input);
    const abortController = new AbortController();
    let pageTo = NaN;
    const retries = 9;
    const LogName = '[YandexSearch]';
    /**
     * Fetches a single page of search results
     */
    const fetchPage = async (_url: YandexSearchUrl): Promise<YandexSearchPageParser> => pRetry(async (attempt) => {
      this.logger.log(`${LogName}${isNaN(pageTo) ? ' Initial' : ''} page=${_url.getPage()}/${pageTo ? pageTo : 'unknown'} attempt=${attempt}/${retries + 1}`);
      const { browser, page } = await this.anonymous.startPuppeteer({ blockImg: true });
      try {
        await page.goto(_url.href, { waitUntil: 'load', timeout: ms('60s') });
        await YandexSearchPageParser.puppeteerWait(page, { timeout: ms('60s'), signal: abortController.signal });
        return new YandexSearchPageParser({ htmlStr: await page.content() });
      } finally {
        await browser.close();
      }
    }, {
      retries,
      shouldRetry: pShouldRetry(abortController),
      signal: abortController.signal,
      onFailedAttempt: (err) => this.logger.error(`[${_url.href}] retriesLeft=${err.retriesLeft}/${retries + 1} Error: name=${err.name} msg=${err.message}`),
    });
    /**
     * Fetch first page to get total count of documents and calc total pages
     */
    const pageInitial = await fetchPage(url);
    pageTo = flow(
      (totalFoundedDocs: number) => Math.min(totalFoundedDocs, input.parserSettings.maxCount),
      rez => ceil(rez / input.parserSettings.perPage),
      rez => Math.min(rez, input.parserSettings.pageTo),
    )(pageInitial.totalFoundedDocs);
    const pageNums: number[] = range(input.parserSettings.pageFrom, pageTo + 1);
    this.logger.log(`${LogName} totalDocs=${pageInitial.totalFoundedDocs}, pages=${pageNums.at(0)}..=${pageNums.at(-1)}`);
    const takeFromLastPage = input.parserSettings.maxCount - (pageNums.length - 1) * input.parserSettings.perPage;
    /**
     * Fetch all pages except the first one.
     * Then concat with the first page and flatten the array of arrays with docs.
     */
    const docs = await pMap(
      pageNums.slice(1), async (page, idx) => {
        const parser = await fetchPage(url.setPage(page));
        return parser.documents.slice(0, idx === pageNums.length - 1 ? takeFromLastPage : undefined);
      },
      { concurrency: input.parserSettings.concurrent },
    ).then(documentsPerPage => [pageInitial.documents, ...documentsPerPage].flat());
    /**
     * Enqueue all fetched documents.
     */
    const docsEnqueued = await this.queueStore.queueCreateMany(docs.map(doc => ({
      url: doc.href,
      type: QueueElementTypeEnum.YandexPatent,
    })), { ignoreExisting: true });
    const response = {
      pageFrom: input.parserSettings.pageFrom,
      pageTo,
      docsTotal: pageInitial.totalFoundedDocs,
      docsTaken: docs.length,
      docsEnqueued,
    };
    this.logger.log(`${LogName} Finished: ${util.inspect(response)}`);
    return response;
  }
}
