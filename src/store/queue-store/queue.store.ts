import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PROCESSING_TIMEOUT } from '../../app.constants';
import { merge } from 'lodash';
import type { QueueElementCreateInput, QueueElement } from './queue-store.types';

@Injectable()
export class QueueStore {
  constructor(private readonly prisma: PrismaService) {}

  async queueCreateMany(elements: QueueElementCreateInput[]): Promise<void> {
    const existing = await this.prisma.queueElement.findMany({
      where: { url: { in: elements.map((elem) => elem.url) } },
    }).then((rows) => new Set(rows.map((row) => row.url)))
    await this.prisma.queueElement.createMany({
      data: elements.filter((elem) => !existing.has(elem.url)),
    });
  }

  async queueNearestElement(): Promise<QueueElement | null> {
    return this.prisma.queueElement.findFirst({
      orderBy: { createdAt: 'asc' },
    });
  }

  async queueGetElements(count: number): Promise<QueueElement[]> {
    return this.prisma.$transaction(async tr => {
      // Извлекаем необходимо кол-во элементов и блокируем их в БД.
      // Игнорируем элементы, которые уже обрабатываются больше чем PROCESSING_TIMEOUT.
      const elements = await tr.$queryRaw<QueueElement[]>`
          SELECT *
          FROM "QueueElement"
          WHERE "startedAt" IS NULL
             OR "startedAt" <= ${PROCESSING_TIMEOUT.getDate()}::TIMESTAMPTZ
          ORDER BY "createdAt"
          LIMIT ${count} FOR UPDATE SKIP LOCKED;
      `;
      // Обновляем время начала обработки и кол-во попыток.
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

  async queueElementParsed(url: string) {
    await this.prisma.queueElement.delete({ where: { url } }).catch(() => null);
  }
}
