import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { GraphQLPositiveInt, GraphQLURL } from 'graphql-scalars';
import ms from 'ms';
import Papa from 'papaparse';
import { AnonymousService } from '../anonymous/anonymous.service';
import { AxiosError } from 'axios';
import { PatentStore } from '../store/patent-store/patent.store';
import { QueueStore } from '../store/queue-store/queue.store';
import { QueueElementTypeEnum } from '@prisma/client';
import { QueueElementTypeEnum1 } from '../store/queue-store/queue-store.types';

/**
 * Запросы к приложению на парсинг патентов
 */
@Resolver()
export class PatentResolver {
  private readonly logger = new Logger(PatentResolver.name);

  constructor(
    private readonly patentStore: PatentStore,
    private readonly queueStore: QueueStore,
    private readonly anonymous: AnonymousService,
  ) {}

  /**
   * Добавление патента в очередь на парсинг с приоритетом
   * @param patentUrl - URL патента
   * @param type - Тип задачи парсинга
   */
  @Mutation(() => String, { description: 'Parse patent' })
  public async patentParse(
    @Args('patentUrl', { type: () => GraphQLURL }) patentUrl: string,
    @Args('type', { type: () => QueueElementTypeEnum1 }) type: QueueElementTypeEnum,
  ) {
    // Getting the nearest patent in the parsing queue
    const nextPatentToParse = await this.queueStore.queueNearestElement()
      .then((first) => first?.createdAt);
    // Adding to the queue before the next
    await this.queueStore.queueCreateMany([{
      url: patentUrl,
      type,
      createdAt: nextPatentToParse ? new Date(nextPatentToParse!.getTime() - ms('1h')) : undefined,
      startedAt: null,
    }]);
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
    @Args('limit', { nullable: true, type: () => GraphQLPositiveInt }) limit?: number | null,
  ): Promise<number> {
    // Запрос на поиск патентов по организации или по запросу
    const param = isOrganisation ? 'assignee' : 'q';
    // https://patents.google.com/xhr/query?url=q%3Dколлайдер%26language%3DRUSSIAN&exp=&download=true
    const url = `https://patents.google.com/xhr/query?url=${param}%3D${search.trim()}%26language%3DRUSSIAN&exp=&download=true`;
    const axios = this.anonymous.startAxios();
    const csvString = await axios.get<string>(url).then((res) => res.data)
      .catch(async (err: AxiosError) => {
        // https://icanhazip.com
        // https://api.ipify.org
        // https://jsonip.com
        const ipAddress = await axios.get<string>('https://api.ipify.org').then((res) => res.data);
        await this.anonymous.thereWasException();
        this.logger.error(`Error getting search results from ${ipAddress}: ${err.message}`);
        // console.log(util.inspect(err.request, { colors: true }));
        throw new InternalServerErrorException(`Error getting search results from ${ipAddress}: ${err.message}`);
      });
    // Парсинг CSV, извлечение id и url патентов
    const csvParsed = Papa.parse(csvString, { header: false, skipEmptyLines: true });
    let patentsToParse = csvParsed.data
      .slice(2, limit ? limit + 2 : undefined)
      .map((row: string) => ({ id: row[0], url: row[8] }));
    // Если нужно игнорировать существующие патенты, то убираем их из полученного списка
    if (ignoreExisting) {
      const patentsExistingIds = await this.patentStore.patentIdsExisting(patentsToParse.map((p) => p.id));
      patentsToParse = patentsToParse.filter((pToParse) => !patentsExistingIds.has(pToParse.id));
    }
    // Добавление патентов в очередь на парсинг
    await this.queueStore.queueCreateMany(patentsToParse.map((p) => ({
      url: p.url,
      type: QueueElementTypeEnum.GooglePatent,
    })));
    // Возвращаем количество добавленных патентов в очередь на парсинг
    return patentsToParse.length;
  }
}
