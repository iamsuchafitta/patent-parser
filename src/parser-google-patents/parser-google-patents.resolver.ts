import { scheduler } from 'node:timers/promises';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { Semaphore } from 'async-mutex';
import { AxiosError } from 'axios';
import { GraphQLURL, GraphQLPositiveInt, GraphQLJSON } from 'graphql-scalars';
import { flatten } from 'lodash-es';
import ms from 'ms';
import pMap from 'p-map';
import pRetry from 'p-retry';
import { GoogleSearchSettingsInput } from './inputs/google-search-settings.input.js';
import { GoogleSearchInput } from './inputs/google-search.input.js';
import { AnonymousService } from '../anonymous/anonymous.service.js';
import { GoogleSearchUrl } from '../common/models/google-search-url.js';
import { pShouldRetry } from '../common/p-should-retry.js';
import { parseGooglePatentSearchCSV, getFirstAndLastMonthsDaysOfYear } from '../common/utils.js';
import { PatentStore } from '../store/patent-store/patent.store.js';
import { QueueStore } from '../store/queue-store/queue.store.js';
import { QueueElementTypeEnum1, QueueElementTypeEnum } from '../store/queue-store/queue.types.js';

@Resolver()
export class ParserGooglePatentsResolver {
  private readonly logger = new Logger(ParserGooglePatentsResolver.name);

  constructor(
    private readonly patentStore: PatentStore,
    private readonly queueStore: QueueStore,
    private readonly anonymous: AnonymousService,
  ) {}

  @Mutation(() => GraphQLJSON)
  async enqueueGooglePatents(
    @Args('input', { defaultValue: new GoogleSearchInput() }) input: GoogleSearchInput,
    @Args('settings', { defaultValue: new GoogleSearchSettingsInput() }) settings: GoogleSearchSettingsInput,
  ) {
    const urls = GoogleSearchUrl.createPartitioned(input, settings);
    console.log(`enqueueGooglePatents, urls=${urls.length}`);
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
    await this.patentStore.patentTempCreateMany(results);
    const enqueued = await this.queueStore.queueCreateMany(results.map((p) => ({
      url: p.urlGoogle,
      type: QueueElementTypeEnum.GooglePatent,
    })));
    return { parts: urls.length, total: results.length, enqueued };
  }

  /**
   * Добавление патента в очередь на парсинг с приоритетом
   * @param patentUrl - URL патента
   * @param type - Тип задачи парсинга
   */
  @Mutation(() => String, { description: 'Parse patent' })
  public async patentParse(
    @Args('patentUrl', { type: () => GraphQLURL }) patentUrl: URL,
    @Args('type', { type: () => QueueElementTypeEnum1 }) type: QueueElementTypeEnum,
  ) {
    // Getting the nearest patent in the parsing queue
    const nextPatentToParse = await this.queueStore.queueNearestElement()
      .then((first) => first?.createdAt);
    // Adding to the queue before the next
    await this.queueStore.queueCreateMany([{
      url: patentUrl.href,
      type,
      createdAt: nextPatentToParse ? new Date(nextPatentToParse.getTime() - ms('1h')) : undefined,
      startedAt: null,
    }], { ignoreExisting: false });
    return 'Added to the queue with priority';
  }

  /**
   * Добавление патентов в очередь на парсинг по поиску
   * @param search - поисковый запрос
   * @param isOrganisation - Если поиск не по ключевым словам в названии патента, а по имени организации
   * @param ignoreExisting - Игнорировать патенты, которые уже есть в базе
   * @param limit - Максимальное кол-во патентов добавленных в очередь
   */
  @Mutation(() => Int, { description: 'Add patents to parse queue by search' })
  public async patentsSearch(
    @Args('search') search: string,
    @Args('isOrganisation', { defaultValue: false }) isOrganisation: boolean,
    @Args('isIgnoreExisting', { defaultValue: true }) ignoreExisting: boolean = true,
    // @Args('limit', { nullable: true, type: () => GraphQLPositiveInt }) limit?: number | null,
  ): Promise<number> {
    // Запрос на поиск патентов по организации или по запросу
    const param = isOrganisation ? 'assignee' : 'q';
    // https://patents.google.com/xhr/query?url=q%3Dколлайдер%26language%3DRUSSIAN&exp=&download=true
    const url = `https://patents.google.com/xhr/query?url=${param}%3D${search.trim()}%26language%3DRUSSIAN&exp=&download=true`;
    const csvString = await this.anonymous.axios.get<string>(url).then((res) => res.data).catch(async (err: AxiosError) => {
      this.logger.error(`Error on google search req: ${err.message}`);
      throw new InternalServerErrorException(`Error on google search req: ${err.message}`);
    });
    // Парсинг CSV, извлечение id и url патентов
    // const csvParsed = Papa.parse(csvString, { header: false, skipEmptyLines: true });
    let patentsToParse = await parseGooglePatentSearchCSV(csvString);
    // Если нужно игнорировать существующие патенты, то убираем их из полученного списка
    if (ignoreExisting) {
      const patentsExistingIds = await this.patentStore.patentURLsExisting(patentsToParse.map((p) => p.id));
      patentsToParse = patentsToParse.filter((pToParse) => !patentsExistingIds.has(pToParse.id));
    }
    // Добавление патентов в очередь на парсинг
    await this.queueStore.queueCreateMany(patentsToParse.map((p) => ({
      url: p.urlGoogle,
      type: QueueElementTypeEnum.GooglePatent,
    })));
    // Возвращаем количество добавленных патентов в очередь на парсинг
    return patentsToParse.length;
  }

  @Mutation(() => GraphQLJSON, { description: 'Add patents to parse queue by search' })
  async patentsOfYear(
    @Args('year', { type: () => GraphQLPositiveInt }) year: number,
    @Args('maxPerMonth', { type: () => GraphQLPositiveInt, nullable: true }) maxPerMonth?: number | null,
  ) {
    // https://patents.google.com/xhr/query?url=before%3Dpublication%3A20230131%26after%3Dpublication%3A20230101%26language%3DRUSSIAN%26type%3DPATENT&exp=&download=true
    // https://patents.google.com/xhr/query?url=before=publication:20230201&after=publication:20230101&language=RUSSIAN&type=PATENT&exp=&download=true
    const semaphore = new Semaphore(2);
    const abortController = new AbortController();
    const results = await Promise.all(getFirstAndLastMonthsDaysOfYear(year).map(async ([after, before], i, arr) => {
      const csvString = await semaphore.runExclusive(async () => {
        if (abortController.signal.aborted) throw new Error('Aborted');
        this.logger.log(`${after}-${before} [${i + 1}/${arr.length}]: Fetching...`);
        const url = `https://patents.google.com/xhr/query?url=before%3Dpublication%3A${before}%26after%3Dpublication%3A${after}%26language%3DRUSSIAN%26type%3DPATENT&exp=&download=true`;
        const maxRetries = 20;
        for (let retry = 1; retry <= maxRetries; ++retry) {
          const [resData, error] = await this.anonymous.axios.get<string>(url, { signal: abortController.signal })
            .then((res) => [res.data, undefined] as const)
            .catch(async (err: AxiosError) => [undefined, err] as const);
          if (resData) return resData;
          if (retry === maxRetries && error!.code !== 'ERR_CANCELED') {
            abortController.abort();
            this.logger.error(`Error on google patents search: ${url}, ${error?.code}, ${error?.message}`);
            throw new InternalServerErrorException(`Error on google patents search: ${url}, ${error?.message}`);
          } else {
            this.logger.warn(`${after}-${before} [${i + 1}/${arr.length}]: Retry ${retry}/${maxRetries}: ${error!.message}`);
            await new Promise((resolve) => setTimeout(resolve, 10e3 + 1e3 * retry));
          }
        }
        throw new Error('Unknown error on google patents search');
      });
      const result = await parseGooglePatentSearchCSV(csvString);
      this.logger.log(`Year=${year} [${i + 1}/${arr.length}]: ${after}-${before}, ${result.length - 2} patents found`);
      return result;
    }));
    const patentsToParse = results.map((r) => r.slice(0, maxPerMonth || undefined)).flat();
    const patentsExistingURLs = await this.patentStore.patentURLsExisting(patentsToParse.map((p) => p.urlGoogle));
    const patentsToParseFiltered = patentsToParse.filter((pToParse) => !patentsExistingURLs.has(pToParse.urlGoogle));
    await this.patentStore.patentTempCreateMany(patentsToParseFiltered);
    await this.queueStore.queueCreateMany(patentsToParseFiltered.map((p) => ({
      url: p.urlGoogle,
      type: QueueElementTypeEnum.GooglePatent,
    })));
    return {
      perMonth: results.map((r) => r.length),
      totalFound: results.flat().length,
      added: patentsToParseFiltered.length,
    };
  }
}
