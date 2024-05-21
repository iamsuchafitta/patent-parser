import { Injectable } from '@nestjs/common';
import type { PatentYandex } from './patent-yandex.types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PatentYandexStore {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Метод сохранения патента в БД.
   * @param patent Данные патента.
   * @returns void - Ничего не возвращает.
   */
  async patentUpsert(patent: PatentYandex) {
    await this.prisma.patentYandex.upsert({
      where: { url: patent.url },
      create: patent,
      update: patent,
    });
  }
}
