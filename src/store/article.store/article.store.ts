import { Injectable } from '@nestjs/common';
import type { ArticleCreateInput } from './article.types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class ArticleStore {
  constructor(private readonly prisma: PrismaService) {}

  public async articleUpsert(data: ArticleCreateInput) {
    return this.prisma.article.upsert({
      where: { url: data.url },
      create: data,
      update: data,
    });
  }
}
