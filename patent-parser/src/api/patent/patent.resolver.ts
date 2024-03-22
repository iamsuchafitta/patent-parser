import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import {GraphQLPositiveInt, GraphQLURL} from 'graphql-scalars';
import ms from 'ms';
import Papa from 'papaparse';
import { AnonymousService } from '../../anonymous/anonymous.service';
import { AxiosError } from 'axios';

/**
 * Запросы к приложению на парсинг патентов
 */
@Resolver()
export class PatentResolver {
  private readonly logger = new Logger(PatentResolver.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly anonymous: AnonymousService,
  ) {}

  /**
   * Добавление патента в очередь на парсинг с приоритетом
   * @param patentUrl - URL патента
   */
  @Mutation(() => String, { description: 'Parse patent' })
  public async patentParse(
    @Args('patentUrl', { type: () => GraphQLURL }) patentUrl: string,
  ) {
    // Getting the nearest patent in the parsing queue
    const nextPatentToParse = await this.prisma.patentParseQueue.findFirst({
      orderBy: { createdAt: 'asc' },
    }).then((first) => first?.createdAt);
    // Adding to the queue before the next
    const data: Prisma.PatentParseQueueCreateInput = {
      url: patentUrl,
      createdAt: nextPatentToParse ? new Date(nextPatentToParse!.getTime() - ms('1h')) : undefined,
      startedAt: null,
    };
    await this.prisma.patentParseQueue.upsert({
      where: { url: patentUrl },
      create: data,
      update: data,
    });
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
    @Args('limit', { nullable: true, type: ()=> GraphQLPositiveInt }) limit?: number | null,
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
      const patentsExisting = await this.prisma.patent.findMany({
        where: { id: { in: patentsToParse.map((p) => p.id) } },
        select: { id: true, urlGoogle: true },
      }).then((rows) => new Set(rows.map((row) => row.id)));
      patentsToParse = patentsToParse.filter((pToParse) => !patentsExisting.has(pToParse.id));
    }
    const alreadyInQueue = await this.prisma.patentParseQueue.findMany({
      where: { url: { in: patentsToParse.map((p) => p.url) } },
      select: { url: true },
    }).then((rows) => new Set(rows.map((row) => row.url)));
    patentsToParse = patentsToParse.filter((pToParse) => !alreadyInQueue.has(pToParse.url));
    // Добавление патентов в очередь на парсинг
    await this.prisma.$transaction(patentsToParse.map((p) => this.prisma.patentParseQueue.upsert({
      where: { url: p.url },
      create: { url: p.url },
      update: { url: p.url },
    })));
    // Возвращаем количество добавленных патентов в очередь на парсинг
    return patentsToParse.length;
  }
}
