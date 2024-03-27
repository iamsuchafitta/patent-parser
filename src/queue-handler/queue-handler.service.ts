import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ParserGooglePatentsService } from '../parser-google-patents/parser-google-patents.service';
import { Interval } from '@nestjs/schedule';
import ms from 'ms';
import { AppConfig } from '../common/app-config';
import { QueueStore } from '../store/queue-store/queue.store';

@Injectable()
export class QueueHandlerService implements OnModuleInit {
  private readonly logger = new Logger(QueueHandlerService.name);
  /**
   * Счетчик текущих обрабатываемых запросов.
   */
  public currentProcessing: number = 0;

  constructor(
    private readonly parser: ParserGooglePatentsService,
    private readonly queueStore: QueueStore,
  ) {}

  /**
   * Метод инициализации сервиса.
   */
  async onModuleInit() {
    // Мгновенно запускаем обработку очереди парсинга, чтобы не ждать 5 секунд.
    this.processQueue().then();
  }

  /**
   * Метод обработки очереди парсинга патентов.
   * Вызывается при инициализации сервиса (в onModuleInit()) и каждые 5 секунд.
   * @returns void - Ничего не возвращает.
   */
  @Interval(ms('5s'))
  async processQueue() {
    // Получаем количество элементов очереди, которые можем обработать.
    // Если количество обрабатываемых запросов превышает лимит, то ничего делать не нужно.
    const needQueueElements = AppConfig.concurrentRequests - this.currentProcessing;
    if (needQueueElements <= 0) return;
    // Получение элементов очереди парсинга.
    const queueElements = await this.queueStore.queueGetElements(needQueueElements);
    // Увеличиваем счетчик текущих обрабатываемых запросов.
    this.currentProcessing += queueElements.length;
    // По каждому полученному элементу очереди начинаем парсинг.
    for (const qElement of queueElements) {
      this.logger.log(`Processing... ${qElement.url}`);
      // parseGooglePatent - асинхронный метод, но здесь мы не ждём конца его выполнения.
      this.parser.parseGooglePatent(qElement).then(async () => {
        this.logger.log(`DONE! ${qElement.url}`);
        // При успешном завершении удаляем элемент из очереди.
        await this.queueStore.queueElementParsed(qElement.url).catch(() => null);
      }).catch(async (err) => {
        this.logger.error(`Error processing ${qElement.url}, ${err.message}`);
      }).finally(() => {
        // В finally, независимо от успеха или ошибки: уменьшаем счетчик текущих обрабатываемых запросов.
        --this.currentProcessing;
        this.processQueue().then();
      });
      // Во избежание перегрузки делаем паузу в 1 секунду перед обработкой следующего элемента.
      await new Promise((resolve) => setTimeout(resolve, ms('1s')));
    }
  }
}
