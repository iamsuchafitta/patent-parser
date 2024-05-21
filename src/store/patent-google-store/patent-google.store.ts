import { Injectable } from '@nestjs/common';
import { isUndefined } from 'lodash-es';
import { omitDeepBy } from 'lodash-omitdeep';
import type { PatentGoogleCreateInput, PatentGoogleTempCreateInput } from './patent-google.types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PatentGoogleStore {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Метод сохранения патента в БД.
   * @param patent Данные патента.
   * @returns void - Ничего не возвращает.
   */
  async patentUpsert(patent: PatentGoogleCreateInput) {
    const temp = patent.url
      ? await this.prisma.patentGoogleTemp.findUnique({ where: { url: patent.url! } })
      : undefined;
    const clean = (v: any) => isUndefined(v) || v?.length === 0;
    const insertData = omitDeepBy({
      ...patent,
      ...(temp ? temp : {}),
    } satisfies PatentGoogleCreateInput, clean) as PatentGoogleCreateInput;
    await this.prisma.$transaction(async tr => {
      await this.prisma.patentGoogle.upsert({
        where: { id: patent.id },
        create: insertData,
        update: insertData,
      });
      if (temp) {
        await tr.patentGoogleTemp.delete({ where: { id: temp.id } });
      }
    }).catch(err => {
      console.error(err.message, insertData);
      throw err;
    });
  }

  async patentTempCreateMany(input: PatentGoogleTempCreateInput[]) {
    return this.prisma.$transaction(async tr => {
      await tr.patentGoogleTemp.deleteMany({ where: { id: { in: input.map(p => p.id) } } });
      return tr.patentGoogleTemp.createMany({ data: input });
    });
  }

  async patentURLsExisting(searchURLs: string[]): Promise<Set<string>> {
    return this.prisma.patentGoogle.findMany({
      where: { url: { in: searchURLs } },
      select: { url: true },
    }).then((rows) => new Set(rows.map((row) => row.url!)));
  }
}
