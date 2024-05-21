import { scheduler } from 'node:timers/promises';
import { InternalServerErrorException, Logger } from '@nestjs/common';
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
import { parseGooglePatentSearchCSV } from '../common/utils.js';
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
    const urls = GoogleSearchUrl.createPartitioned(input, settings);
    this.logger.log(`enqueueGooglePatents, urls=${urls.length}`);
    const retries = 19;
    const abortController = new AbortController();
    let completed = 0;
    const results = await pMap(urls, async (url, idx) => {
      await scheduler.wait(idx * 0.5 * 1e3);
      const stringCSV = await pRetry<string>(async () => {
        return await this.anonymous.axios.get<string>(url, { signal: abortController.signal }).then((res) => res.data);
      }, {
        retries,
        signal: abortController.signal,
        shouldRetry: pShouldRetry(abortController),
        minTimeout: 10e3,
        maxTimeout: 30e3,
        randomize: true,
        onFailedAttempt: (err) => this.logger.warn(`[${idx + 1}/${urls.length}] attempt=${err.attemptNumber}/${retries + 1} failed: ${err.message}`),
      });
      this.logger.log(`Pages completed: ${++completed}/${urls.length}`);
      return await parseGooglePatentSearchCSV(stringCSV);
    }, { concurrency: 2, signal: abortController.signal }).catch((err) => {
      abortController.abort();
      // throw new InternalServerErrorException(`Error on google patents search: ${err.message}`);
      throw new InternalServerErrorException(err);
    }).then(flatten);
    await this.patentGoogleStore.patentTempCreateMany(results);
    const enqueued = await this.queueStore.queueCreateMany(results.map((p) => ({
      url: p.url,
      type: QueueElementTypeEnum.GooglePatent,
    })));
    return { parts: urls.length, total: results.length, enqueued };
  }
}
