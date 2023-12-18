import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Patent, QueryMode } from '../../prisma/prisma-nestjs-graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaSelector } from '../../prisma/decorators/prisma-selector.decorator';
import { Prisma } from '@prisma/client';
import { PaginationInput } from '../../common/gql/pagination.input';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { GraphQLURL } from 'graphql-scalars';
import ms from 'ms';
import Papa from 'papaparse';
import { AnonymousService } from '../../anonymous/anonymous.service';
import { WsEvents } from '../../common/pub-sub/pub-sub.constants';
import { AppPubSub } from '../../common/pub-sub/pub-sub';

@Resolver()
export class PatentResolver {
  private readonly logger = new Logger(PatentResolver.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly anonymous: AnonymousService,
  ) {}

  @Query(() => [Patent])
  async patents(
    @PrismaSelector() select: Prisma.PatentSelect,
    @Args('search', { nullable: true }) search?: string,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ): Promise<Patent[]> {
    return this.prisma.patent.findMany({
      skip: pagination?.skip || 0,
      take: pagination?.take || 25,
      select,
      where: search ? {
        OR: [
          { id: { contains: search, mode: QueryMode.insensitive } },
          { title: { contains: search, mode: QueryMode.insensitive } },
          { abstract: { contains: search, mode: QueryMode.insensitive } },
          { description: { contains: search, mode: QueryMode.insensitive } },
        ],
      } : undefined,
    });
  }

  @Query(() => Int)
  async patentsCount(): Promise<number> {
    return this.prisma.patent.count();
  }

  @Query(() => Patent)
  async patent(
    @Args('id') id: string,
    @PrismaSelector() select: Prisma.PatentSelect,
  ): Promise<Patent> {
    return this.prisma.patent.findUniqueOrThrow({ where: { id }, select }).catch(() => {
      throw new NotFoundException('Patent not found');
    });
  }

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

  @Mutation(() => Int, { description: 'Add patents to parse queue by search' })
  public async patentsSearch(
    @Args('search') search: string,
    @Args('isOrganisation', { defaultValue: false }) isOrganisation: boolean,
    @Args('isIgnoreExisting', { defaultValue: true }) ignoreExisting: boolean = true,
  ): Promise<number> {
    const param = isOrganisation ? 'assignee' : 'q';
    // https://patents.google.com/xhr/query?url=q%3Dколлайдер%26language%3DRUSSIAN&exp=&download=true
    const url = `https://patents.google.com/xhr/query?url=${param}%3D${search.trim()}%26language%3DRUSSIAN&exp=&download=true`;
    const axios = this.anonymous.startAxios();
    const csvString = await axios.get<string>(url).then((res) => res.data)
      .catch(async (err) => {
        // https://icanhazip.com
        // https://api.ipify.org
        // https://jsonip.com
        const ipAddress = await axios.get<string>('https://api.ipify.org').then((res) => res.data);
        this.logger.error(`Error getting search results from ${ipAddress}: ${err.message}`);
        await this.anonymous.thereWasException();
        throw new InternalServerErrorException(`Error getting search results from ${ipAddress}: ${err.message}`);
      });
    const csvParsed = Papa.parse(csvString, { header: false, skipEmptyLines: true });
    let patentsToParse = csvParsed.data.slice(2).map((row: string) => ({ id: row[0], url: row[8] }));
    if (ignoreExisting) {
      const patentsExisting = await this.prisma.patent.findMany({
        where: { id: { in: patentsToParse.map((p) => p.id) } },
        select: { id: true, urlGoogle: true },
      }).then((rows) => rows.map((row) => row.id));
      patentsToParse = patentsToParse.filter((pToParse) => !patentsExisting.includes(pToParse.id));
    }
    await this.prisma.$transaction(patentsToParse.map((p) => this.prisma.patentParseQueue.upsert({
      where: { url: p.url },
      create: { url: p.url },
      update: { url: p.url },
    })));
    return patentsToParse.length;
  }

  @Subscription(() => Int)
  patentsCountChanged() {
    return AppPubSub.asyncIterator(WsEvents.PatentsCountChanged);
  }
}
