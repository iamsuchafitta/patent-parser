import { Injectable, Logger } from '@nestjs/common';
import ms from 'ms';
import pRetry from 'p-retry';
import { AnonymousService } from '../anonymous/anonymous.service.js';
import { YandexPatentParser } from '../common/models/yandex-patent-parser.js';
import { pShouldRetry } from '../common/p-should-retry.js';
import { PatentYandexStore } from '../store/patent-yandex-store/patent-yandex.store.js';
import type { QueueElement } from '../store/queue-store/queue.types.js';

@Injectable()
export class ParserYandexPatentsService {
  private readonly logger = new Logger(ParserYandexPatentsService.name);

  constructor(
    private readonly anonymous: AnonymousService,
    private readonly patentYandexStore: PatentYandexStore,
  ) {
    this.parse = this.parse.bind(this);
  }

  public async parse(elem: QueueElement) {
    const time = Date.now() / 1000;
    const retries = 2;
    // Request
    const html = await pRetry(async (attempt) => {
      this.logger.log(`[${elem.url}] attempt=${attempt}/${retries + 1}...`);
      const { browser, page } = await this.anonymous.startPuppeteer({ blockCSS: true, blockImg: true });
      try {
        // Open page
        await page.goto(elem.url, { waitUntil: 'networkidle2', timeout: ms('60s') });
        await YandexPatentParser.puppeteerWait(page, { timeout: ms('60s') });
        return await page.content();
      } finally {
        await browser.close();
      }
    }, {
      retries,
      shouldRetry: pShouldRetry(),
      onFailedAttempt: (err) => {
        this.logger.warn(`[${elem.url}] attempt=${err.attemptNumber}/${retries + 1} failed: ${err.message}`);
        this.anonymous.thereWasException();
      },
    });
    // Parse
    const patent = YandexPatentParser.parse({ html, url: elem.url });
    // Save
    await this.patentYandexStore.patentUpsert(patent);
    // Log: Done
    this.logger.log(`[${elem.url}] Done in ${(Date.now() / 1000 - time).toFixed(2)}sec!`);
  }
}
