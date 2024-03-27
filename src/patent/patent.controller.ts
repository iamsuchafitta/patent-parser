import { Controller, Get, Logger } from '@nestjs/common';
import fs from 'node:fs/promises';
import process from 'node:process';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class PatentController {
  private readonly logger = new Logger(PatentController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get('patents/csv')
  public async getPatentsCsv() {
    let iteration = 0;
    let skip = 0;
    const take = 2000; // Количество записей за один запрос
    let patents: unknown[] = [];
    let hasMore = true;
    const dir = path.join(process.cwd(), '..', 'data');
    await fs.mkdir(dir, { recursive: true });
    const promises: Promise<void>[] = [];

    while (hasMore) {
      const fetched = await this.prisma.patent.findMany({
        take: 10,
        skip,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          title: true,
          description: true,
          abstract: true,
          urlGoogle: true,
          relations: true,
          concepts: true,
          applicationEvents: true,
          classifications: true,
          claims: true,
        },
      });
      if (fetched.length < take) {
        hasMore = false;
      }
      patents = [...patents, ...fetched];
      skip += take;
      this.logger.log(`[${++iteration}] Fetched ${patents.length} patents, hasMore=${hasMore}`);

      const fileName = path.join(dir, `patents-${iteration}-${fetched.length}.json`);
      promises.push(fs.writeFile(fileName, JSON.stringify(fetched)).then());
    }
    await Promise.all(promises);
    return 'OK';
  }
}
