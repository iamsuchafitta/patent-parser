import { Injectable } from '@nestjs/common';
import type { PatentCreateInput } from './patent-store.types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PatentStore {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Метод сохранения патента в БД.
   * @param patent Данные патента.
   * @returns void - Ничего не возвращает.
   */
  async patentUpsert(patent: PatentCreateInput) {
    await this.prisma.patent.upsert({
      where: { id: patent.id },
      create: patent,
      update: patent,
    });
  }

  async patentIdsExisting(searchIds: string[]): Promise<Set<string>> {
    return this.prisma.patent.findMany({
      where: { id: { in: searchIds } },
      select: { id: true, urlGoogle: true },
    }).then((rows) => new Set(rows.map((row) => row.id)));
  }
}
