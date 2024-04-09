import fs from 'node:fs/promises';
import process from 'node:process';
import path from 'path';
import { setTimeout } from 'timers/promises';
import { Controller, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { isNil } from 'lodash-es';
import { omitDeepBy } from 'lodash-omitdeep';
import { PrismaService } from './prisma/prisma.service.js';
import type { Patent } from './store/patent-store/patent.types.js';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get('429')
  public async tooManyReq() {
    await setTimeout(3000);
    throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
  }

  constructor(private readonly prisma: PrismaService) {}

  @Get('patents/csv')
  public async getPatentsCsv() {
    let iteration = 0;
    let skip = 0;
    const take = 500; // Количество записей за один запрос
    let patentsCount: number = 0;
    let hasMore = true;
    const dir = path.join(process.cwd(), '..', 'parsed-patents');
    await fs.mkdir(dir, { recursive: true });
    const promises: Promise<void>[] = [];

    while (hasMore) {
      const patentsFound = await this.prisma.patent.findMany({
        take,
        skip,
        orderBy: { id: 'asc' },
      }) as unknown as Patent[];
      if (patentsFound.length < take) hasMore = false;
      patentsCount += patentsFound.length;
      skip += take;
      this.logger.log(`[${++iteration}] Totally etched ${patentsCount} patents, hasMore=${hasMore}`);
      promises.push(...patentsFound.map(async (patent) => {
        // const date = patent.dateOfPublication!.slice(0, 7);
        // const filePath = path.join(dir, date);
        // await fs.mkdir(filePath, { recursive: true });
        await fs.writeFile(path.join(dir, `${patent.id}.json`), JSON.stringify(omitDeepBy(patent, (value, key) => {
          return isNil(value) || value === '' || Array.isArray(value) && value.length === 0
            || key === 'createdAt' || key === 'updatedAt';
        })));
      }));
      // break;
    }
    await Promise.all(promises);
    return 'OK';
  }
}
