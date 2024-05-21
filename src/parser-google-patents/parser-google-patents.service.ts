/* eslint-disable @typescript-eslint/ban-ts-comment */
import { setTimeout } from 'node:timers/promises';
import { Injectable, Logger } from '@nestjs/common';
import ms from 'ms';
import pRetry from 'p-retry';
import { AnonymousService } from '../anonymous/anonymous.service.js';
import { GooglePatentParser } from '../common/models/google-patent-parser.js';
import { pShouldRetry } from '../common/p-should-retry.js';
import { PatentGoogleStore } from '../store/patent-google-store/patent-google.store.js';
import type { QueueElement } from '../store/queue-store/queue.types.js';

/**
 * Сервис парсинга Google патентов.
 * Парсит страницы патентов и сохраняет данные в БД.
 */
@Injectable()
export class ParserGooglePatentsService {
  private readonly logger = new Logger(ParserGooglePatentsService.name);

  constructor(
    private readonly anonymous: AnonymousService,
    private readonly patentGoogleStore: PatentGoogleStore,
  ) {
    this.parse = this.parse.bind(this);
  }

  /**
   * Метод парсинга патента с Google Patents.
   * Делает запрос по url, парсит страницу и сохраняет данные в БД.
   * @param elem Элемент очереди парсинга.
   * @returns void - Ничего не возвращает.
   */
  public async parse(elem: QueueElement) {
    const time = Date.now() / 1000;
    const retries = 2;
    // Request
    const result = await pRetry(async (attempt) => {
      this.logger.log(`[${elem.url}] attempt=${attempt}/${retries + 1}...`);
      const { browser, page } = await this.anonymous.startPuppeteer({ blockCSS: true, blockImg: true });
      try {
        // Intercept csv concepts file
        let conceptsCSVStr: string | undefined;
        await page.exposeFunction('conceptsResolve', (result: string) => void (conceptsCSVStr = result));
        await page.evaluateOnNewDocument(() => {
          URL.createObjectURL = (blob: Blob): any => {
            const reader = new FileReader();
            reader.onload = () => (window as any).conceptsResolve(reader.result);
            reader.readAsText(blob);
            return undefined; // Broke function to prevent file download
          };
        });
        // Open page
        await page.goto(elem.url, { waitUntil: 'load', timeout: ms('60s') });
        await page.$('classification-viewer.patent-result div.more:not([hidden])')
          .then((moreClassificationsBtn) => moreClassificationsBtn?.click());
        // Click on "show more concepts" button
        await page.$('[id=concepts]+div a.patent-result[href]')
          .then((conceptsBtn) => conceptsBtn?.click());
        await setTimeout(1000);
        return { html: await page.content(), conceptsCSVStr };
      } finally {
        await browser.close();
      }
    }, {
      retries,
      shouldRetry: pShouldRetry(),
      onFailedAttempt: (err) => this.logger.warn(`[${elem.url}] attempt=${err.attemptNumber}/${retries + 1} failed: ${err.message}`),
    });
    // Parse
    const patent = await GooglePatentParser.parse({ ...result, url: elem.url });
    // Save
    await this.patentGoogleStore.patentUpsert(patent);
    // Log: Done
    this.logger.log(`[${elem.url}] Done in ${(Date.now() / 1000 - time).toFixed(2)}sec!`);
  }
}
