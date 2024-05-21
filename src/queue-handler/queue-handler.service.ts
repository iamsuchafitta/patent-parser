import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { QueueElementTypeEnum } from '@prisma/client';
import { Mutex } from 'async-mutex';
import { shallowEqual } from 'fast-equals';
import { values, sum, fromPairs, keys, flow, throttle } from 'lodash-es';
import ms from 'ms';
import { AppConfig } from '../common/app-config.js';
import { ArticleIoffeService } from '../parser-articles/article-ioffe.service.js';
import { ArticleRajpubService } from '../parser-articles/article-rajpub.service.js';
import { ParserGooglePatentsService } from '../parser-google-patents/parser-google-patents.service.js';
import { ParserYandexPatentsService } from '../parser-yandex-patents/parser-yandex-patents.service.js';
import { QueueStore } from '../store/queue-store/queue.store.js';
import type { QueueElement } from '../store/queue-store/queue.types.js';

@Injectable()
export class QueueHandlerService implements OnModuleInit {
  private readonly logger = new Logger(QueueHandlerService.name);

  /** Счетчик текущих обрабатываемых запросов */
  public currentProcessing = fromPairs(keys(QueueElementTypeEnum).map(key => [key, 0])) as Record<QueueElementTypeEnum, number>;

  /** Mutex для атомарного захвата новых элементов очереди и увеличения счётчика */
  private mutex = new Mutex();

  constructor(
    private readonly googlePatents: ParserGooglePatentsService,
    private readonly yandexPatents: ParserYandexPatentsService,
    private readonly articleIoffe: ArticleIoffeService,
    private readonly articleRajpub: ArticleRajpubService,
    private readonly queueStore: QueueStore,
  ) {
    // this.logProcessing = throttle(this.logProcessing.bind(this), ms('5s'), { trailing: true });
    this.processQueue = throttle(this.processQueue.bind(this), 500, { leading: false, trailing: true }) as typeof this.processQueue;
    setInterval(this.processQueue, ms('5s'));
  }

  /** Метод инициализации сервиса */
  async onModuleInit() {
    // Мгновенно запускаем обработку очереди парсинга, чтобы не ждать 5 секунд.
    this.processQueue()?.then();
  }

  /**
   * Метод обработки очереди парсинга патентов.
   * Вызывается при инициализации сервиса (в onModuleInit()) и каждые 5 секунд.
   * @returns void - Ничего не возвращает.
   */
  @Interval(ms('5s'))
  async processQueue() {
    // Mutex необходим для атомарного контроля над счётчиком и запросом к БД.
    // Пример при запуске более 1 processQueue() без Mutex:
    //    Обрабатывается 10 элементов из максимума в 20.
    //    processQueue_1 запросил от бд 10 шт. и ждёт ответа;
    //    processQueue_2 запросил тоже 10 и ждёт ответа;
    //    processQueue_1 получил ответ и увеличил счётчик на 10, тогда сейчас 20/20;
    //    processQueue_2 получил ответ и увеличил счётчик ещё на 10, итого: 30/20!
    const queueElements = await this.mutex.runExclusive(async () => {
      // Проверяем, сколько элементов нам нужно взять из очереди.
      const needQueueElements = AppConfig.concurrent.summaryLimit - this.currentProcessingSum;
      // Если нечего брать, выходим.
      if (needQueueElements <= 0) return [];
      // Запрашиваем из БД элементы очереди.
      const queueElements = await this.queueStore.queueElementsGrab({
        totalMaxCount: needQueueElements,
        ...this.freeSlots,
      });
      // Увеличиваем счётчики обрабатываемых запросов.
      queueElements.forEach((element) => ++this.currentProcessing[element.type]);
      // Возвращаем полученные элементы очереди, освобождая Mutex.
      return queueElements;
    });
    if (this.currentProcessingSum > AppConfig.concurrent.summaryLimit) {
      this.logger.error(`CONCURRENCY OVERFLOW: current=${this.currentProcessingSum} > config=${AppConfig.concurrent.summaryLimit}`);
    }
    this.logProcessing();
    // По каждому полученному элементу очереди начинаем парсинг.
    queueElements.forEach((qElement) => this.startProcessing(qElement).then(async () => {
      // При успешном завершении удаляем элемент из очереди.
      await this.queueStore.queueDelete(qElement.url);
    }).catch(async (err: Error) => {
      this.logger.error(`[${qElement.url}] Error: ${err.message}`, err.stack);
    }).finally(() => {
      // В finally, независимо от успеха или ошибки: уменьшаем счетчик текущих обрабатываемых запросов.
      --this.currentProcessing[qElement.type];
      this.processQueue()?.then();
    }));
  }

  private get currentProcessingSum(): number {
    return sum(values(this.currentProcessing));
  }

  private startProcessing(qElement: QueueElement) {
    switch (qElement.type) {
      case QueueElementTypeEnum.GooglePatent:
        return this.googlePatents.parse(qElement);
      case QueueElementTypeEnum.YandexPatent:
        return this.yandexPatents.parse(qElement);
      case QueueElementTypeEnum.ArticleRU:
        return this.articleIoffe.parse(qElement);
      case QueueElementTypeEnum.ArticleEN:
        return this.articleRajpub.parse(qElement);
      default:
        return Promise.reject(new Error(`Unimplemented type ${qElement.type satisfies never}`));
    }
  }

  private get freeSlots() {
    return flow(
      () => keys(this.currentProcessing) as QueueElementTypeEnum[],
      (types) => types.map((type) => [type, AppConfig.concurrent[type] - this.currentProcessing[type]]),
      (pairs) => fromPairs(pairs) as Record<QueueElementTypeEnum, number>,
    )();
  }

  private logProcessingMemory: typeof this.currentProcessing | null = null;

  private logProcessing() {
    if (shallowEqual(this.currentProcessing, this.logProcessingMemory)) return;
    this.logProcessingMemory = { ...this.currentProcessing };
    this.logger.log(`processing=${JSON.stringify(this.currentProcessing)}, sum=${this.currentProcessingSum}`);
  }
}
