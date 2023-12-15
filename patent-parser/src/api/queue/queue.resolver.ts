import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { PROCESSING_TIMEOUT } from '../../app.constants';
import { QueueLengthObject } from './responses/queue-length.object';

@Resolver()
export class QueueResolver {
  constructor(private readonly prisma: PrismaService) {
  }

  @Query(() => QueueLengthObject)
  public async queueLength(): Promise<QueueLengthObject> {
    const [total, processing] = await Promise.all([
      this.prisma.patentParseQueue.count(),
      this.prisma.patentParseQueue.count({
        where: {
          AND: [
            { startedAt: { lte: new Date() } },
            { startedAt: { gte: PROCESSING_TIMEOUT.getDate() } },
          ],
        },
      }),
    ]);
    return { total, processing };
  }
}
