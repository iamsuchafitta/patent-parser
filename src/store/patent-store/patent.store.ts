import { Injectable } from '@nestjs/common';
import { isUndefined } from 'lodash-es';
import { omitDeepBy } from 'lodash-omitdeep';
import type { PatentCreateInput, PatentTempCreateInput } from './patent.types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PatentStore {
  constructor(private readonly prisma: PrismaService) {
  }

  /**
   * Метод сохранения патента в БД.
   * @param patent Данные патента.
   * @returns void - Ничего не возвращает.
   */
  async patentUpsert(patent: PatentCreateInput) {
    const temp = patent.urlGoogle || patent.urlYandex
      ? await this.prisma.patentTemp.findUnique({ where: { urlGoogle: patent.urlGoogle!, urlYandex: patent.urlYandex! } })
      : undefined;
    const clean = (v: any) => isUndefined(v) || v?.length === 0;
    const insertData = omitDeepBy({
      ...patent,
      ...(temp ? temp : {}),
    } satisfies PatentCreateInput, clean) as PatentCreateInput;
    await this.prisma.$transaction(async tr => {
      await this.prisma.patent.upsert({
        where: { id: patent.id },
        create: insertData,
        update: insertData,
      });
      if (temp) {
        await tr.patentTemp.delete({ where: { id: temp.id } });
      }
    }).catch(err => {
      console.error(err.message, insertData);
      throw err;
    });
  }

  async patentTempCreateMany(input: PatentTempCreateInput[]) {
    return this.prisma.$transaction(async tr => {
      await tr.patentTemp.deleteMany({ where: { id: { in: input.map(p => p.id) } } });
      return tr.patentTemp.createMany({ data: input });
    });
  }

  async patentURLsExisting(searchURLs: string[]): Promise<Set<string>> {
    return this.prisma.patent.findMany({
      where: { urlGoogle: { in: searchURLs } },
      select: { urlGoogle: true },
    }).then((rows) => new Set(rows.map((row) => row.urlGoogle!)));
  }
}
