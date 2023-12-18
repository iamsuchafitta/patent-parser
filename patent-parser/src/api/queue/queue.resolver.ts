import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { PROCESSING_TIMEOUT } from '../../app.constants';
import { QueueLengthObject } from './responses/queue-length.object';
import { WsEvents } from '../../common/pub-sub/pub-sub.constants';
import { AppPubSub } from '../../common/pub-sub/pub-sub';

@Resolver()
export class QueueResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => QueueLengthObject)
  public async queueLength(): Promise<QueueLengthObject> {
    const [processing, total] = await Promise.all([
      this.prisma.monitorStat.findMany({
        where: { createdAt: { gte: PROCESSING_TIMEOUT.getDate() } },
        select: { currentProcessing: true },
        orderBy: { createdAt: 'desc' },
        distinct: ['parserId'],
      }).then(stats => stats.reduce((acc, stat) => acc + (stat.currentProcessing || 0), 0)),
      this.prisma.patentParseQueue.count(),
    ]);
    return { processing, total };
  }

  @Subscription(() => QueueLengthObject, {
    async resolve(this: QueueResolver) {
      const [processing, total] = await Promise.all([
        this.prisma.monitorStat.findMany({
          where: { createdAt: { gte: PROCESSING_TIMEOUT.getDate() } },
          select: { currentProcessing: true },
          orderBy: { createdAt: 'desc' },
          distinct: ['parserId'],
        }).then(stats => stats.reduce((acc, stat) => acc + (stat.currentProcessing || 0), 0)),
        this.prisma.patentParseQueue.count(),
      ]);
      return { processing, total };
    },
  })
  public async queueChanged() {
    return AppPubSub.asyncIterator(WsEvents.QueueLengthChanged);
  }
}
