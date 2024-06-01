import util from 'node:util';
import { Logger } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { flatten } from 'lodash-es';
import pMap from 'p-map';
import pRetry from 'p-retry';
import { GoogleSearchSettingsInput } from './inputs/google-search-settings.input.js';
import { GoogleSearchInput } from './inputs/google-search.input.js';
import { AnonymousService } from '../anonymous/anonymous.service.js';
import { GoogleSearchUrl } from '../common/models/google-search-url.js';
import { pShouldRetry } from '../common/p-should-retry.js';
import { parseGooglePatentSearchCSV, nullable } from '../common/utils.js';
import { PatentGoogleStore } from '../store/patent-google-store/patent-google.store.js';
import { QueueStore } from '../store/queue-store/queue.store.js';
import { QueueElementTypeEnum } from '../store/queue-store/queue.types.js';

@Resolver()
export class ParserGooglePatentsResolver {
  private readonly logger = new Logger(ParserGooglePatentsResolver.name);

  constructor(
    private readonly patentGoogleStore: PatentGoogleStore,
    private readonly queueStore: QueueStore,
    private readonly anonymous: AnonymousService,
  ) {}

  @Mutation(() => GraphQLJSON)
  async enqueueGooglePatents(
    @Args('input', { defaultValue: new GoogleSearchInput() }) input: GoogleSearchInput,
    @Args('settings', { defaultValue: new GoogleSearchSettingsInput() }) settings: GoogleSearchSettingsInput,
  ) {
    const searchUrls = GoogleSearchUrl.createPartitioned(input, settings);
    this.logger.log(`enqueueGooglePatents(${util.inspect(input, { depth: null })}, parts=${searchUrls.length})`);
    const retries = 19;
    const abortController = new AbortController();
    let completed = 0;
    let results = await pMap(searchUrls, async (url, idx) => {
      const csvString = await pRetry<string>(async () => {
        this.logger.log(`Search part loading ${completed + 1}/${searchUrls.length}...`);
        return await this.anonymous.axios.get<string>(url, { signal: abortController.signal }).then((res) => res.data);
      }, {
        retries,
        signal: abortController.signal,
        shouldRetry: pShouldRetry(abortController),
        minTimeout: 10e3,
        maxTimeout: 30e3,
        randomize: true,
        onFailedAttempt: (err) => this.logger.warn(`[${idx + 1}/${searchUrls.length}] attempt=${err.attemptNumber}/${retries + 1} failed: ${err.message}`),
      });
      ++completed;
      return await parseGooglePatentSearchCSV(csvString);
    }, { concurrency: 1, signal: abortController.signal }).then(flatten);
    const patentsFound = results.length;
    if (settings.isIgnoreExisting) {
      const urls = results.map((p) => p.url);
      const filtered = await this.patentGoogleStore.filterNotExisting(urls);
      results = results.filter((r) => filtered.includes(r.url));
    }
    await this.patentGoogleStore.patentTempCreateMany(results);
    const patentsEnqueued = await this.queueStore.queueCreateMany(results.map((p) => ({
      url: p.url,
      type: QueueElementTypeEnum.GooglePatent,
    })));
    const response = { searchParts: searchUrls.length, patentsFound, patentsEnqueued };
    this.logger.log(`Finished: ${util.inspect(response)}`);
    return response;
  }

  @Mutation(() => GraphQLJSON)
  async enqueueGooglePatentsByCsv(
    @Args('csvUrl') csvUrl: string,
    @Args('isIgnoreExisting', { defaultValue: true }) isIgnoreExisting: boolean,
    @Args('limit', { nullable }) limit?: number,
  ) {
    this.logger.log(`enqueueGooglePatentsByCsv(${csvUrl}, isIgnoreExisting=${isIgnoreExisting}, limit=${limit})`);
    const csvString = await pRetry(async () => {
      return await this.anonymous.axios.get<string>(csvUrl).then((res) => res.data);
    }, {
      retries: 19,
      shouldRetry: pShouldRetry(),
      minTimeout: 10e3,
      maxTimeout: 30e3,
      randomize: true,
      onFailedAttempt: (err) => this.logger.warn(`[${csvUrl}] attempt=${err.attemptNumber}/${err.attemptNumber + err.retriesLeft} failed: ${err.message}`),
    });
    let results = await parseGooglePatentSearchCSV(csvString);
    const patentsFound = results.length;
    if (limit) {
      results = results.slice(0, limit);
    }
    if (isIgnoreExisting) {
      const urls = results.map(({ url }) => url);
      const filtered = await this.patentGoogleStore.filterNotExisting(urls);
      results = results.filter(({ url }) => filtered.includes(url));
    }
    await this.patentGoogleStore.patentTempCreateMany(results);
    const patentsEnqueued = await this.queueStore.queueCreateMany(results.map(({ url }) => ({
      url: url,
      type: QueueElementTypeEnum.GooglePatent,
    })));
    const response = { patentsFound, patentsEnqueued };
    this.logger.log(`Finished: ${util.inspect(response)}`);
    return response;
  }
}
