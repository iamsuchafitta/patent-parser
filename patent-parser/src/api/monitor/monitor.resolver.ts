import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MonitorLog, MonitorStat } from '../../prisma/prisma-nestjs-graphql';
import { PrismaSelector } from '../../prisma/decorators/prisma-selector.decorator';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationInput } from '../../common/gql/pagination.input';
import { WsEvents } from '../../common/pub-sub/pub-sub.constants';
import { AppPubSub } from '../../common/pub-sub/pub-sub';

@Resolver()
export class MonitorResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [String])
  async parserIds(): Promise<string[]> {
    return this.prisma.monitorStat.groupBy({
      by: ['parserId'],
    }).then((res) => res.map((item) => item.parserId));
  }

  @Query(() => [MonitorStat])
  async monitorStats(
    @PrismaSelector() select: Prisma.MonitorStatSelect,
    @Args('parserId', { nullable: true }) parserId?: string,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ): Promise<MonitorStat[]> {
    return this.prisma.monitorStat.findMany({
      skip: pagination?.skip || 0,
      take: pagination?.take || 100,
      select,
      orderBy: { createdAt: 'desc' },
      where: { parserId },
    });
  }

  @Query(() => [MonitorLog])
  async monitorLogs(
    @PrismaSelector() select: Prisma.MonitorLogSelect,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ): Promise<MonitorLog[]> {
    return this.prisma.monitorLog.findMany({
      skip: pagination?.skip || 0,
      take: pagination?.take || 100,
      select,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Subscription(() => MonitorStat, {
    filter: (payload, { parserId }) => {
      const parserInstanceMonitor = payload[WsEvents.MonitorStatCreated] as MonitorStat;
      return !parserId || parserInstanceMonitor.parserId === parserId;
    },
  })
  monitorStatCreated(@Args('parserId', { nullable: true }) parserId?: string) {
    return AppPubSub.asyncIterator(WsEvents.MonitorStatCreated);
  }

  @Subscription(() => MonitorLog, {
    filter: (payload, { parserId }) => {
      const parserInstanceMonitor = payload[WsEvents.MonitorLogCreated] as MonitorLog;
      return !parserId || parserInstanceMonitor.parserId === parserId;
    },
  })
  monitorLogCreated(@Args('parserId', { nullable: true }) parserId?: string) {
    return AppPubSub.asyncIterator(WsEvents.MonitorLogCreated);
  }
}
