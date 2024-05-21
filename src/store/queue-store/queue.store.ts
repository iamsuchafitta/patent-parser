import { Injectable } from '@nestjs/common';
import { merge, uniqBy } from 'lodash-es';
import { type QueueElementCreateInput, type QueueElement, QueueElementTypeEnum } from './queue.types.js';
import { PROCESSING_TIMEOUT } from '../../app.constants.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class QueueStore {
  constructor(private readonly prisma: PrismaService) {}

  async queueCreateMany(
    elements: QueueElementCreateInput[],
    { ignoreExisting = true }: { ignoreExisting?: boolean } = {},
  ): Promise<number> {
    elements = uniqBy(elements, el => el.url);
    if (ignoreExisting) {
      const existing = await this.prisma.queueElement.findMany({
        where: { url: { in: elements.map(({ url }) => url) } },
      }).then((rows) => new Set(rows.map(({ url }) => url)));
      elements = elements.filter((elem) => !existing.has(elem.url));
    } else {
      await this.prisma.queueElement.deleteMany({ where: { url: { in: elements.map(({ url }) => url) } } });
    }
    await this.prisma.queueElement.createMany({ data: elements });
    return elements.length;
  }

  async queueNearestElement(): Promise<QueueElement | null> {
    return this.prisma.queueElement.findFirst({
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Захват элементов из очереди.
   * Метод безопасен при запуске приложения в несколько реплик
   *    за счёт использования транзакции с пессимистичной блокировкой.
   */
  async queueElementsGrab(
    args: {
      // Total of the maximum number of elements to be retrieved:
      totalMaxCount: number;
      // Maximum number of elements of each type:
    } & Record<QueueElementTypeEnum, number>,
  ): Promise<QueueElement[]> {
    return this.prisma.$transaction(async (tr) => {
      const timeout = PROCESSING_TIMEOUT.getDate();
      const elements = await tr.$queryRaw<QueueElement[]>`
        WITH
          "GooglePatentElements" AS (
            SELECT * FROM "QueueElement"
            WHERE "type" = ${QueueElementTypeEnum.GooglePatent}::"QueueElementTypeEnum"
              AND ("startedAt" IS NULL OR "startedAt" <= ${timeout}::TIMESTAMPTZ)
            ORDER BY "priority" DESC, "createdAt"
            LIMIT ${Math.min((args[QueueElementTypeEnum.GooglePatent]), args.totalMaxCount)} FOR UPDATE SKIP LOCKED
          ), "YandexPatentElements" AS (
            SELECT * FROM "QueueElement"
            WHERE "type" = ${QueueElementTypeEnum.YandexPatent}::"QueueElementTypeEnum"
              AND ("startedAt" IS NULL OR "startedAt" <= ${timeout}::TIMESTAMPTZ)
            ORDER BY "priority" DESC, "createdAt"
            LIMIT ${Math.min((args[QueueElementTypeEnum.YandexPatent]), args.totalMaxCount)} FOR UPDATE SKIP LOCKED
          ), "ArticleRUElements" AS (
            SELECT * FROM "QueueElement"
            WHERE "type" = ${QueueElementTypeEnum.ArticleRU}::"QueueElementTypeEnum"
              AND ("startedAt" IS NULL OR "startedAt" <= ${timeout}::TIMESTAMPTZ)
            ORDER BY "priority" DESC, "createdAt"
            LIMIT ${Math.min((args[QueueElementTypeEnum.ArticleRU]), args.totalMaxCount)} FOR UPDATE SKIP LOCKED
          ), "ArticleENElements" AS (
            SELECT * FROM "QueueElement"
            WHERE "type" = ${QueueElementTypeEnum.ArticleEN}::"QueueElementTypeEnum"
              AND ("startedAt" IS NULL OR "startedAt" <= ${timeout}::TIMESTAMPTZ)
            ORDER BY "priority" DESC, "createdAt"
            LIMIT ${Math.min((args[QueueElementTypeEnum.ArticleEN]), args.totalMaxCount)} FOR UPDATE SKIP LOCKED
          )
        SELECT * FROM (
          SELECT * FROM "GooglePatentElements" UNION ALL
          SELECT * FROM "YandexPatentElements" UNION ALL
          SELECT * FROM "ArticleRUElements" UNION ALL
          SELECT * FROM "ArticleENElements"
        ) AS "combined"
        ORDER BY 
          "priority" DESC,
          RANDOM() -- Равномерное распределение между множеством выборок
        LIMIT ${(args.totalMaxCount)};
      `;

      for (const elem of elements) {
        merge(elem, await tr.queueElement.update({
          where: { url: elem.url },
          data: {
            startedAt: new Date(),
            tries: { increment: 1 },
          },
        }));
      }

      return elements;
    });
  }

  async queueDelete(url: string) {
    await this.prisma.queueElement.delete({ where: { url } }).catch(() => null);
  }
}
