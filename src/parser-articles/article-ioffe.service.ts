import { Injectable, Logger } from '@nestjs/common';
import pRetry from 'p-retry';
import { AnonymousService } from '../anonymous/anonymous.service.js';
import { ArticleIoffeParser } from '../common/models/article-ioffe-parser.js';
import { pShouldRetry } from '../common/p-should-retry.js';
import { ArticleStore } from '../store/article.store/article.store.js';
import type { QueueElement } from '../store/queue-store/queue.types.js';

@Injectable()
export class ArticleIoffeService {
  private readonly logger = new Logger(ArticleIoffeService.name);

  constructor(
    private readonly anonymous: AnonymousService,
    private readonly articleStore: ArticleStore,
  ) {}

  public async parse(elem: QueueElement) {
    const retries = 2;
    const time = Date.now() / 1000;
    // Request
    const html = await pRetry(async () => await this.anonymous.axios.get(elem.url).then(res => res.data), {
      retries,
      shouldRetry: pShouldRetry(),
      onFailedAttempt: (err) => this.logger.warn(`[${elem.url}] attempt=${err.attemptNumber}/${retries + 1} failed: ${err.message}`),
    });
    // Parse & Save
    await this.articleStore.articleUpsert({
      ...ArticleIoffeParser.parse(html),
      url: elem.url,
    });
    this.logger.log(`[${elem.url}] Done in ${(Date.now() / 1000 - time).toFixed(2)}sec!`);
  }
}
